import { describe, it, expect } from 'vitest';
import { allAppliances } from '@/lib/data/appliances';
import { getBrandErrorCodes } from '@/lib/error-codes';
import { ERROR_CODE_EDITORIAL } from '@/lib/data/editorial/error-code-editorial';
import { getBrandProfile } from '@/lib/data/brands';
import { getBlogPost } from '@/lib/data/blog';

/**
 * 2026-10-29 원문 재확인(research/evidence/2026-10-29/source-fixes.md).
 *
 * - LG 냉장고 5개 코드와 삼성 에어컨 4개 코드는 모델명을 적지 않은 제조사 공용 안내에서 왔다. 공개 모델 상세나
 *   허브의 「이 코드가 표시되는 제품」으로 이어지면 그 모델의 코드처럼 읽힌다.
 * - LG의 해동 시간은 문서마다 8·24·12시간으로 다르다. 한 값으로 정하지 않고 원문별로 나란히 싣는다.
 * - TCL 실내기 치수의 축(W*D*H)은 확인하지 못했으니 숫자를 옮기지 않고 원문 표기를 밝힌다.
 */

const LG_FRIDGE_CODES = ['Er FF', 'Er rF', 'CF', 'dH', 'CO'];
const SAMSUNG_AC_CODES = ['E101', 'E422', 'E458', 'E464'];

const hubEntries = (brand: string, category: string) =>
  getBrandErrorCodes(brand).find((g) => g.category === category)?.entries ?? [];
const entry = (brand: string, category: string, code: string) => {
  const found = hubEntries(brand, category).find((e) => e.code === code);
  if (!found) throw new Error(`${brand} ${category} ${code} 없음`);
  return found;
};

describe('제조사 공용 안내의 코드를 공개 모델에 붙이지 않는다', () => {
  it('LG 냉장고 5개 코드는 어느 공개 제품의 errorCodes에도 없다', () => {
    const attached = allAppliances.flatMap((a) =>
      (a.errorCodes ?? []).filter((c) => a.brand === 'LG' && LG_FRIDGE_CODES.includes(c.code)).map((c) => `${a.slug}:${c.code}`),
    );
    expect(attached).toEqual([]);
  });

  it.each(LG_FRIDGE_CODES)('LG %s: 허브에서 제품 링크 없이 공용 안내 범위로만 표시된다', (code) => {
    const e = entry('LG', '냉장고', code);
    expect(e.products).toEqual([]);
    const scope = e.productLines?.join(' ') ?? '';
    expect(scope).toContain('대표 모델 기준');
    expect(scope).toContain('미확인');
  });

  it('삼성 에어컨 4개 코드는 어느 공개 제품의 errorCodes에도 없다', () => {
    const attached = allAppliances.flatMap((a) =>
      (a.errorCodes ?? []).filter((c) => a.brand === 'Samsung' && SAMSUNG_AC_CODES.includes(c.code)).map((c) => `${a.slug}:${c.code}`),
    );
    expect(attached).toEqual([]);
    expect(allAppliances.find((a) => a.modelNumber === 'AR07A9170HCN')?.errorCodes).toBeUndefined();
  });

  it.each(SAMSUNG_AC_CODES)('삼성 %s: 범위는 모델을 적지 않은 삼성전자서비스 코드표다', (code) => {
    const e = entry('Samsung', '에어컨', code);
    expect(e.products).toEqual([]);
    expect(e.productLines?.[0]).toContain('삼성전자서비스 에어컨 점검 코드표');
    expect(e.productLines?.[0]).toContain('모델 미표기');
  });

  it('삼성 브랜드 소개는 E101을 공개 모델에서 확인한 표시라고 하지 않는다', () => {
    const pattern = getBrandProfile('Samsung')?.errorCodePattern ?? '';
    expect(pattern).not.toContain('공개 모델에서 확인한 표시는');
    expect(pattern).toContain('모델명을 적지 않은 삼성전자서비스 점검 코드표의 E101');
  });
});

describe('LG 2026-10-19 「오류 코드」 안내 반영', () => {
  it('dH는 해동 시간 8·24·12시간을 원문별로 나란히 싣는다', () => {
    const { solution } = entry('LG', '냉장고', 'dH');
    for (const text of ['최소 8시간', '최소 24시간', '최소 12시간', '2026-01-06', '2026-07-08', '2026-10-19', '5분']) {
      expect(solution).toContain(text);
    }
    // 모델 설명서의 전원 유지 지시와 다르다는 사실도 함께 둔다
    expect(solution).toContain('전원을 끄지 말고');
  });

  it.each(['CF', 'CO'])('%s는 10-19 안내의 5분 초기화와 모델 설명서의 전원 유지를 함께 싣는다', (code) => {
    const { solution, links } = entry('LG', '냉장고', code);
    expect(solution).toContain('5분');
    expect(solution).toContain('2026-10-19');
    expect(solution).toContain('전원을 끄지 말고');
    expect(links?.map((l) => l.href)).toContain('https://www.lge.co.kr/support/solutions-20155399741079');
  });

  it.each(['Er FF', 'Er rF'])('%s에는 10-19 안내의 12시간·5분을 옮기지 않는다(그 쪽 목록에 FF·rF가 없다)', (code) => {
    const { solution } = entry('LG', '냉장고', code);
    expect(solution).not.toContain('12시간');
    expect(solution).not.toContain('5분');
  });

  it('dH 카드는 세 원문으로 링크하고, rF의 상호참조는 실제 FF 카드 앵커로 간다', () => {
    const hrefs = entry('LG', '냉장고', 'dH').links?.map((l) => l.href) ?? [];
    for (const id of ['20153810464793', '20153004158622', '20155399741079']) {
      expect(hrefs).toContain(`https://www.lge.co.kr/support/solutions-${id}`);
    }
    const anchor = entry('LG', '냉장고', 'Er rF').links?.find((l) => l.href.startsWith('#'))?.href.slice(1);
    expect(anchor).toBe(entry('LG', '냉장고', 'Er FF').anchorId);
  });

  it('LG 허브 근거는 10-19 안내를 출처로 갖고 해동 시간이 다르다는 사실을 밝힌다', () => {
    const meta = ERROR_CODE_EDITORIAL.LG;
    expect(meta.updatedAt).toBe('2026-10-29');
    expect(meta.covers).toContain('최소 12시간');
    expect(meta.covers).toContain('대표 모델 기준');
    expect(meta.sources.map((s) => s.url)).toEqual(
      expect.arrayContaining([
        'https://www.lge.co.kr/support/solutions-20155399741079',
        'https://www.lge.co.kr/support/solutions-20153004158622',
      ]),
    );
  });
});

describe('TCL 벽걸이 2종', () => {
  const tcl = (model: string) => allAppliances.find((a) => a.modelNumber === model)!;

  it.each(['TAC-08CSD/TPH11I', 'TAC-12CSD/TPH11I'])('%s: 제품 페이지 기능 탭의 R32를 냉매로 싣는다', (model) => {
    expect(tcl(model).techSpecs.refrigerant).toBe('R32');
  });

  it('실내기 치수는 축을 확인하지 못해 원문 숫자 순서 그대로 둔다', () => {
    expect(tcl('TAC-08CSD/TPH11I').techSpecs.dimensions).toBe('788 x 275 x 192mm');
    expect(tcl('TAC-12CSD/TPH11I').techSpecs.dimensions).toBe('788 x 275 x 192mm');
  });

  it('벽걸이 비교 글은 TCL 실내기 값을 가로×높이×깊이로 단정하지 않고 원문 W*D*H 표기임을 밝힌다', () => {
    const post = getBlogPost('wall-aircon-samsung-vs-tcl-vs-haier')!;
    const row = post.comparison!.rows.find((r) => r.label.startsWith('실내기 치수'))!;
    const tclColumns = post.comparison!.columns.flatMap((c, i) => (c.startsWith('TCL') ? [i] : []));
    expect(tclColumns).toHaveLength(2);
    for (const i of tclColumns) expect(row.values[i]).toContain('원문 W*D*H');
    // TCL의 192를 깊이로 읽은 범위(192~217mm)를 쓰지 않는다
    expect(row.note).not.toContain('192~217');
    expect(row.note).toContain('확인하지 못했습니다');
  });
});
