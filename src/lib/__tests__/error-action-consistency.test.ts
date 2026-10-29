import { describe, expect, it } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import BrandErrorCodesPage from '@/app/error-codes/[brand]/page';
import { getBrandErrorCodes } from '@/lib/error-codes';
import { getEntryActionGuides, getEntryNoCard, NO_CARD_DEFAULT_NOTE } from '@/lib/data/error-codes/action-guides';
import { getErrorCodeCategoryNote } from '@/lib/data/error-codes/category-notes';
import { LG_FRIDGE_SHARED, SAMSUNG_AC_SHARED } from '@/lib/data/error-codes/standalone';
import { getStaticActionPlan } from '@/lib/error-action';

/**
 * 2026-10-29 「해결 문단 ↔ 행동 카드·안내」 상충 정리(docs/salimlab-review-readiness-2026-10-29.md 높음 1·중간 3).
 * 같은 코드 항목 안에서 해결 문단과 그 아래 카드(또는 「카드 없음」 안내)가 다른 행동을 말하지 않게 고정한다.
 * 원문 대조: research/evidence/2026-10-29/error-actions/solution-card-consistency.md
 */

const entry = (brand: string, category: string, code: string) => {
  const found = getBrandErrorCodes(brand).find((g) => g.category === category)?.entries.find((e) => e.code === code);
  if (!found) throw new Error(`${brand} ${category} ${code} 없음`);
  return found;
};

describe('삼성 에어컨 4개: 해결 문단과 안내가 같은 공용 안내 이름·범위를 쓴다', () => {
  const SOURCES: Record<string, string[]> = {
    E101: [SAMSUNG_AC_SHARED.table100],
    E422: [SAMSUNG_AC_SHARED.wallE422, SAMSUNG_AC_SHARED.table400],
    E458: [SAMSUNG_AC_SHARED.table400],
    E464: [SAMSUNG_AC_SHARED.table400],
  };

  it.each(Object.keys(SOURCES))('%s', (code) => {
    const e = entry('Samsung', '에어컨', code);
    const noCard = getEntryNoCard('Samsung', '에어컨', e)!;
    expect(getEntryActionGuides('Samsung', '에어컨', e)).toEqual([]);
    // 기본 안내(「이 모델의 공식 자료에서 조치를 확인하지 못했습니다」)는 해결 문단의 초기화와 부딪친다
    expect(noCard.note).toBeDefined();
    expect(noCard.note).not.toBe(NO_CARD_DEFAULT_NOTE);
    expect(noCard.note).not.toContain('조치를 확인하지 못했습니다');
    expect(noCard.sharedGuide).toBeTruthy();
    for (const source of SOURCES[code]) {
      expect(e.solution, source).toContain(source);
      expect(noCard.note, source).toContain(source);
    }
    for (const text of [e.solution, noCard.note!]) {
      expect(text).toContain('모델을 적지 않은');
      expect(text).toContain('초기화를 거듭하지 말고');
    }
    // 차단기 초기화를 실으면 원문(39779)의 차단기 내부 조작 금지를 함께 싣는다
    expect(e.solution).toContain('누전 차단기');
    expect(e.solution).toContain('차단기 내부');
  });

  it('E464(압축기 과전류)는 반복 시 사용 중지를 차단기 초기화보다 앞에 둔다', () => {
    const { solution } = entry('Samsung', '에어컨', 'E464');
    const stop = solution.indexOf('사용을 멈춘');
    expect(stop).toBeGreaterThanOrEqual(0);
    expect(stop).toBeLessThan(solution.indexOf('누전 차단기'));
    expect(getEntryNoCard('Samsung', '에어컨', entry('Samsung', '에어컨', 'E464'))!.note).toContain('사용을 멈춘');
  });

  it('에어컨 품목 안내는 차단기 초기화를 일괄 지시하지 않고, 반복 시 멈춤과 차단기 내부 주의를 싣는다', () => {
    const note = getErrorCodeCategoryNote('에어컨', 'Samsung')!;
    expect(note).not.toContain('분전반 차단기나 전원 재시작');
    expect(note).toContain('각 코드에 적힌 안내');
    expect(note).toContain('거듭하지 말고');
    expect(note).toContain('차단기 내부');
  });
});

describe('LG 냉장고 5개: 안내가 해결 문단의 해동·초기화 출처와 모델 설명서의 전원 유지를 같이 밝힌다', () => {
  it.each(['CF', 'CO', 'dH', 'Er FF', 'Er rF'])('%s', (code) => {
    const e = entry('LG', '냉장고', code);
    const noCard = getEntryNoCard('LG', '냉장고', e)!;
    expect(noCard.sharedGuide).toBe(LG_FRIDGE_SHARED);
    expect(noCard.note).toContain(LG_FRIDGE_SHARED);
    expect(noCard.note).not.toContain('조치를 확인하지 못했습니다');
    expect(noCard.note).toContain('전원을 끄지 말고');
    expect(e.solution).toMatch(/전원을 끄지 말고|전원을 유지|전원 유지/);
    // 안내가 부르는 조치 이름이 해결 문단에 실제로 있다(FF·rF에는 10-19 안내의 5분 초기화가 없다)
    if (noCard.note!.includes('초기화 방법')) expect(e.solution).toContain('5분');
    if (noCard.note!.includes('해동')) expect(e.solution).toContain('해동');
  });
});

describe('SK매직 F1: 해결 문단이 카드와 같은 「차단 뒤 문의」만 조치로 싣는다', () => {
  it('거름망 분리·「물이 새지 않을 때만」 같은 원문에 없는 조치가 없다', () => {
    const e = entry('SKMagic', '식기세척기', 'F1');
    const [card] = getEntryActionGuides('SKMagic', '식기세척기', e);
    expect(card.action.type).toBe('contact');
    expect(e.description).not.toContain('부터 확인');
    expect(e.solution).not.toMatch(/거름망을 분리|물이 새지 않을 때만/);
    const first = e.solution.split('. ')[0];
    for (const word of ['전원을 끄고', '전원 플러그', '중간밸브를 잠그', '1600-1661']) expect(first).toContain(word);
  });
});

describe('경동나비엔 동결 관련 6개: 해결 문단이 카드의 「직접 하지 말고」와 같은 쪽을 말한다', () => {
  // 예전 해결 문단의 지시 표현. 「직접 녹이지 말고」 같은 금지는 걸리지 않는다
  const SELF_ACTION = /녹이거나|녹여야|녹여 주|퇴수코크[^.]*열어 물이|분리해 녹인 뒤 다시 연결하도록/;

  it.each(['Er02', 'Er51 / E351', 'Er28 / E228', 'Er49 / E049', 'Er50 / E250', 'Er54 / E154'])('%s', (code) => {
    const e = entry('Navien', '가스보일러', code);
    const text = [e.solution, ...(e.steps ?? [])].join(' ');
    expect(text).not.toMatch(SELF_ACTION);
    expect(text).toContain('싣지 않습니다(살림랩 안전 기준)');
    const [card] = getEntryActionGuides('Navien', '가스보일러', e);
    const cardText = [...getStaticActionPlan(card).steps, ...(card.stopConditions ?? [])].join(' ');
    expect(cardText).toMatch(/직접[^.]*(녹이지|열거나|분리)/);
  });

  it('Er50: 재가동 금지·전원 끄기가 설비업체 해빙 요청보다 앞에 있고, 원문 링크 라벨이 퇴수코크 자가조치를 내세우지 않는다', () => {
    const e = entry('Navien', '가스보일러', 'Er50 / E250');
    expect(e.solution.indexOf('다시 가동하지 마세요')).toBeLessThan(e.solution.indexOf('설비업체'));
    expect(e.solution.indexOf('전원을 꺼')).toBeLessThan(e.solution.indexOf('설비업체'));
    for (const link of e.links ?? []) expect(link.label).not.toMatch(/퇴수코크|해빙/);
  });
});

describe('허브 하단 요약이 「조치 없음」과 「공용 안내만 있음」을 나눠 적는다', () => {
  const render = async (brand: string) => renderToStaticMarkup(await BrandErrorCodesPage({ params: Promise.resolve({ brand }) }));

  it.each(['Samsung', 'LG'])('%s: 공용 안내 코드를 「사용자 조치를 확인하지 못한 코드」로 묶지 않는다', async (brand) => {
    const html = await render(brand);
    expect(html).not.toContain('공식 자료에서 사용자 조치를 확인하지 못한 코드');
    expect(html).toContain('제조사 공용 안내에만 조치가 있는 코드');
    expect(html).not.toContain(NO_CARD_DEFAULT_NOTE);
  });

  it('SK매직: DWA-81 E4는 그대로 「사용자 조치를 확인하지 못한 코드」다(대조군)', async () => {
    const html = await render('SKMagic');
    expect(html).toContain('공식 자료에서 사용자 조치를 확인하지 못한 코드');
    expect(html).not.toContain('제조사 공용 안내에만 조치가 있는 코드');
  });
});
