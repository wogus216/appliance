// 소개·편집 원칙·계산 방법 페이지의 사실 문장(2026-10-29 8단계).
// 도구·값 종류·행동 카드·자주 바뀌는 값의 규칙을 데이터에서 읽어 싣는지, 애드센스를 현재 수익처럼 적지 않는지,
// 세 페이지와 /tools가 같은 문장을 복사해 쓰지 않는지 본다.

import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { createElement, type FunctionComponent } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';
import AboutPage from '@/app/about/page';
import EditorialPolicyPage from '@/app/editorial-policy/page';
import MethodologyPage from '@/app/methodology/page';
import ToolsPage from '@/app/tools/page';
import { ADSENSE_NOT_APPROVED_AS_OF } from '@/lib/constants';
import { HUB_ACTION_SETS } from '@/lib/data/error-codes/action-guides';
import { KEPCO_RESIDENTIAL_LOW } from '@/lib/data/kepco-tariff';
import { getErrorCodeDirectory } from '@/lib/error-codes';
import { STORAGE_LABELS, TOOLS } from '@/lib/tool-directory';
import { VALUE_KIND_LABELS } from '@/lib/value-kind';
import { PRICE_RECHECK_DAYS } from '@/lib/water-purifier-cost';

vi.mock('next/navigation', () => ({ useRouter: () => ({ replace: vi.fn() }), useSearchParams: () => new URLSearchParams() }));

const render = (component: FunctionComponent) => renderToStaticMarkup(createElement(component));
const text = (html: string) => html.replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/\s+/g, ' ').trim();

const pages = {
  about: render(AboutPage),
  editorial: render(EditorialPolicyPage),
  methodology: render(MethodologyPage),
  tools: render(ToolsPage),
};
const body = Object.fromEntries(Object.entries(pages).map(([name, html]) => [name, text(html)])) as Record<keyof typeof pages, string>;

const guides = HUB_ACTION_SETS.flatMap((set) => set.guides);

describe('애드센스 상태를 사실대로 적는다', () => {
  it.each(['about', 'editorial'] as const)('%s: 승인 전인 광고를 현재 수익원으로 적지 않는다', (name) => {
    // 9월 점검의 "광고로 운영비를 충당합니다", 10-11의 "수익원은 두 가지입니다"가 같은 종류의 불일치였다.
    expect(body[name]).not.toContain('충당');
    expect(body[name]).not.toContain('수익원은 두 가지');
    expect(body[name]).toContain('AdSense');
    expect(body[name]).toContain(ADSENSE_NOT_APPROVED_AS_OF);
    expect(body[name]).toMatch(/승인을 받지 못해 광고 수익이 없습니다|승인 전이라 광고로 생기는 수익은 아직 없습니다/);
  });

  it('도구 페이지에 광고 코드를 넣지 않는다는 문장이 두 페이지에 있다', () => {
    expect(body.about).toContain('도구 페이지에는 광고 코드를 넣지 않았습니다');
    expect(body.editorial).toContain('도구 페이지에는 광고 코드를 넣지 않습니다');
  });
});

describe('소개 페이지', () => {
  it('도구 수와 행동 카드 수를 데이터에서 센다', () => {
    expect(pages.about).toContain('href="/tools"');
    expect(body.about).toContain(`생활 과제별 도구 ${TOOLS.length}개`);
    expect(body.about).toContain(`행동 카드 ${guides.length}개`);
  });

  it('도구 입력값이 운영자에게 가지 않는다고 밝힌다', () => {
    expect(body.about).toContain('운영자가 볼 수 없습니다');
  });
});

describe('편집 원칙', () => {
  it('행동 카드 절의 숫자가 카드 등록부와 같다', () => {
    const entries = getErrorCodeDirectory().reduce((n, group) => n + group.codeCount, 0);
    const noCard = HUB_ACTION_SETS.reduce((n, set) => n + set.noCard.length, 0);
    const hazard = guides.filter((guide) => guide.hazard);
    expect(pages.editorial).toContain('id="error-actions"');
    expect(body.editorial).toContain(`코드 항목 ${entries}개`);
    expect(body.editorial).toContain(`카드 ${guides.length}개, 안내 ${noCard}개`);
    expect(body.editorial).toContain(`이런 카드 ${hazard.length}개`);
    expect(body.editorial).toContain(`따로 적어 둔 ${hazard.filter((guide) => guide.action.type !== 'contact').length}개`);
    expect(body.editorial).toContain('가스·누수·과열·전기 위험');
  });

  it('도구가 판정하지 않는 네 가지를 적는다', () => {
    for (const phrase of ['설치할 수 있는지', '얼마나 더 버틸지', '다시 고장 날', '위약금·보증']) expect(body.editorial).toContain(phrase);
  });

  it('자주 바뀌는 값의 재확인 절차를 적는다', () => {
    expect(body.editorial).toContain(`${PRICE_RECHECK_DAYS}일이 넘으면`);
    expect(body.editorial).toContain('분기마다');
  });
});

describe('계산 방법', () => {
  it('모든 도구의 식을 도구 링크와 함께 싣는다', () => {
    for (const tool of TOOLS) expect(pages.methodology, tool.slug).toContain(`href="${tool.href}"`);
    expect(body.methodology).toContain(`${TOOLS.length}개 도구`);
  });

  it('값 종류 일곱 가지를 모두 다루고 /tools의 뜻풀이로 잇는다', () => {
    for (const label of Object.values(VALUE_KIND_LABELS)) expect(body.methodology, label).toContain(label);
    expect(pages.methodology).toContain('href="/tools#value-kinds"');
  });

  it('요금표 기간과 가격 재확인 주기를 데이터에서 읽는다', () => {
    const fuel = KEPCO_RESIDENTIAL_LOW.fuelAdjustment;
    for (const value of [fuel.label, `${fuel.from}~${fuel.to}`, KEPCO_RESIDENTIAL_LOW.checkedAt, `${PRICE_RECHECK_DAYS}일`]) expect(body.methodology, value).toContain(value);
    expect(pages.methodology).toContain(`href="${fuel.sourceUrl}"`);
    expect(pages.methodology).toContain(`href="${KEPCO_RESIDENTIAL_LOW.rateTableUrl}"`);
  });

  it('기록을 브라우저에 남기는 도구를 저장 방식에서 골라 적는다', () => {
    const saving = TOOLS.filter((tool) => tool.storage === 'browser' || tool.storage === 'session-save');
    expect(saving.length).toBeGreaterThan(0);
    for (const tool of saving) expect(body.methodology, tool.slug).toContain(tool.title);
  });
});

describe('/tools의 입력 보관 문구', () => {
  it('브라우저 저장소에 쓰는 도구만 localStorage를 적는다', () => {
    // 2026-10-29: 전력 기록은 ‘이 기록 저장’으로 localStorage에 쓰는데 'session'(새로 열면 비워짐) 문구가 붙어 있었다.
    for (const tool of TOOLS) {
      const source = readFileSync(join(process.cwd(), 'src/components/tools', `${tool.slug}-tool.tsx`), 'utf8');
      const writes = source.includes('localStorage.setItem');
      expect(STORAGE_LABELS[tool.storage].includes('localStorage'), tool.slug).toBe(writes);
    }
  });
});

/** p·li·dd·td 블록을 문장 단위로 나눈다. 20자 미만(라벨·숫자)은 비교하지 않는다. */
function sentencesOf(html: string): string[] {
  return [...html.matchAll(/<(p|li|dd|td)\b[^>]*>([\s\S]*?)<\/\1>/g)]
    .flatMap((m) => text(m[2]).split(/(?<=[.다요])\s+(?=\S)/))
    .map((s) => s.trim())
    .filter((s) => s.length >= 20);
}

/**
 * 일부러 두 페이지에 같은 말로 둔 문장. 2026-10-11 5차 배포 때 사용자가 AI 도구 사용 고지를 소개·편집 원칙
 * 두 곳에 같은 내용으로 싣기로 했다(content-value-review-2026-10-08.md '5차 배포 기록'). 늘어나면 복사가 생긴 것이다.
 */
const INTENTIONALLY_SHARED = new Set(['자료 찾기, 초안 쓰기, 원문 대조에는 생성형 AI 도구를 함께 씁니다.']);

describe('신뢰 페이지끼리 문장을 복사해 쓰지 않는다', () => {
  it('소개·편집 원칙·계산 방법·도구 모음 사이에 같은 문장이 없다', () => {
    const owners = new Map<string, string[]>();
    for (const [name, html] of Object.entries(pages)) {
      for (const sentence of new Set(sentencesOf(html))) owners.set(sentence, [...(owners.get(sentence) ?? []), name]);
    }
    const shared = [...owners]
      .filter(([sentence, names]) => names.length > 1 && !INTENTIONALLY_SHARED.has(sentence))
      .map(([sentence, names]) => `${names.join('+')}: ${sentence}`);
    expect(shared).toEqual([]);
    // 문장을 실제로 모으는지 대조한다.
    expect(sentencesOf(pages.methodology).length).toBeGreaterThan(30);
    expect([...owners].some(([sentence]) => INTENTIONALLY_SHARED.has(sentence))).toBe(true);
  });
});
