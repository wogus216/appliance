import { createElement, type FunctionComponent } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';
import ToolsPage, { metadata as toolsMetadata } from '@/app/tools/page';
import FridgeFitPage from '@/app/tools/fridge-fit/page';
import DishwasherFitPage from '@/app/tools/dishwasher-fit/page';
import InstallCheckPage from '@/app/tools/install-check/page';
import HomeEnergyPage from '@/app/tools/home-energy/page';
import RepairReplacePage from '@/app/tools/repair-replace/page';
import CarePlanPage from '@/app/tools/care-plan/page';
import HouseholdCarePage from '@/app/tools/household-care/page';
import WaterPurifierCostPage from '@/app/tools/water-purifier-cost/page';
import HomePage from '@/app/page';
import sitemap from '@/app/sitemap';
import { SITE_URL } from '@/lib/constants';
import { CARE_PLAN_INTERVALS, CARE_PLAN_PRODUCTS } from '@/lib/data/care-plan';
import { CONSUMER_STANDARD_NOTICE } from '@/lib/data/consumer-standards';
import { ENERGY_MEASUREMENTS } from '@/lib/data/energy-measurements';

const FRIDGE_DECLARATIONS = Object.values(ENERGY_MEASUREMENTS).filter((entry) => entry.productCategory === '냉장고');
import { FRIDGE_FIT_PRODUCTS } from '@/lib/data/fridge-installation';
import { lastRevisionFor } from '@/lib/data/site-revisions';
import { DISHWASHER_FIT_PRODUCTS } from '@/lib/dishwasher-fit';
import { FRIDGE_EXAMPLE_KITCHENS, fitMargin, formatMm } from '@/lib/fridge-fit';
import { calculateHomeEnergy } from '@/lib/home-energy-record';
import { HOUSEHOLD_CARE_LIMIT } from '@/lib/household-care';
import { calculateRepairReplace } from '@/lib/repair-replace';
import { LIFE_TASKS, TOOLS, VALUE_KIND_MEANINGS, type ToolSlug } from '@/lib/tool-directory';
import { VALUE_KIND_LABELS } from '@/lib/value-kind';

vi.mock('next/navigation', () => ({ useRouter: () => ({ replace: vi.fn() }), useSearchParams: () => new URLSearchParams() }));

const render = (component: FunctionComponent) => renderToStaticMarkup(createElement(component));
const escapeHtml = (value: string) => value.replaceAll('&', '&amp;');
const text = (html: string) => html.replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/\s+/g, ' ').trim();

const PAGES: Record<ToolSlug, FunctionComponent> = {
  'fridge-fit': FridgeFitPage,
  'dishwasher-fit': DishwasherFitPage,
  'install-check': InstallCheckPage,
  'home-energy': HomeEnergyPage,
  'repair-replace': RepairReplacePage,
  'care-plan': CarePlanPage,
  'household-care': HouseholdCarePage,
  'water-purifier-cost': WaterPurifierCostPage,
};

/** 설명 절은 도구 아래 하나뿐이고, 안에 다른 section이 없다. */
function guideOf(html: string): string {
  const start = html.indexOf('<section id="tool-guide"');
  expect(start, '설명 절 없음').toBeGreaterThan(-1);
  return html.slice(start, html.indexOf('</section>', start) + '</section>'.length);
}

/** 문단·목록·표 칸의 문장. 짧은 칸(모델번호, 숫자)은 중복 검사에서 뺀다. */
function sentencesOf(guide: string): string[] {
  return [...guide.matchAll(/<(p|li|td|dd)\b[^>]*>([\s\S]*?)<\/\1>/g)].map((m) => text(m[2])).filter((s) => s.length >= 20);
}

const guides = Object.fromEntries(Object.entries(PAGES).map(([slug, page]) => [slug, guideOf(render(page))])) as Record<ToolSlug, string>;

describe('/tools 모음', () => {
  const html = render(ToolsPage);
  const body = text(html);

  it('메타데이터가 canonical과 openGraph를 갖는다', () => {
    expect(toolsMetadata.alternates?.canonical).toBe('/tools');
    expect(toolsMetadata.openGraph).toMatchObject({ url: '/tools', siteName: '살림랩', locale: 'ko_KR' });
    expect(String(toolsMetadata.description)).toContain(`도구 ${TOOLS.length}개`);
  });

  it('모든 도구를 싣고, 각 도구에 답하는 질문·답하지 못하는 질문·범위·값 종류·입력 보관을 적는다', () => {
    expect(TOOLS.map((tool) => tool.slug).sort()).toEqual(Object.keys(PAGES).sort());
    for (const tool of TOOLS) {
      expect(html, tool.slug).toContain(`href="${tool.href}"`);
      const card = html.slice(html.indexOf(`id="tool-${tool.slug}"`), html.indexOf('</article>', html.indexOf(`id="tool-${tool.slug}"`)));
      for (const label of ['답하는 질문', '답하지 못하는 질문', '지원 범위', '결과에 나오는 값', '입력 보관']) expect(card, `${tool.slug} ${label}`).toContain(label);
      expect(tool.answers.length, tool.slug).toBeGreaterThan(0);
      expect(tool.cannotAnswer.length, tool.slug).toBeGreaterThan(0);
      for (const kind of tool.valueKinds) expect(card, `${tool.slug} ${kind}`).toContain(VALUE_KIND_LABELS[kind]);
    }
  });

  it('생활 과제 다섯 개로 묶고, 도구가 없는 과제는 다른 페이지로 잇는다', () => {
    const positions = LIFE_TASKS.map((task) => html.indexOf(`id="task-${task.id}"`));
    expect(positions.every((p) => p > -1)).toBe(true);
    expect([...positions].sort((a, b) => a - b)).toEqual(positions);
    expect(LIFE_TASKS.map((task) => task.title)).toEqual(['고르기', '설치하기', '쓰기·관리하기', '고장 해결하기', '수리·교체하기']);
    for (const task of LIFE_TASKS) {
      if (!TOOLS.some((tool) => tool.task === task.id)) expect('elsewhere' in task, task.id).toBe(true);
    }
    expect(html).toContain('href="/error-codes"');
    expect(html).toContain('href="/compare#energy-compare"');
  });

  it('지원 모델 수가 데이터와 일치한다', () => {
    expect(body).toContain(`냉장고 ${FRIDGE_FIT_PRODUCTS.length}개 모델`);
    for (const product of FRIDGE_FIT_PRODUCTS) expect(body).toContain(product.modelNumber);
    expect(body).toContain(`식기세척기 ${DISHWASHER_FIT_PRODUCTS.length}개 모델`);
    for (const product of DISHWASHER_FIT_PRODUCTS) expect(body).toContain(product.model);
    expect(body).toContain(`냉장고 ${FRIDGE_DECLARATIONS.length}개`);
    const items = CARE_PLAN_PRODUCTS.reduce((n, product) => n + product.items.length, 0);
    // 계산 항목 수는 도구 데이터와 별도로 주기 표(CARE_PLAN_INTERVALS)에서도 맞춰 본다.
    const intervalModels = new Set(Object.keys(CARE_PLAN_INTERVALS).map((key) => key.split(':')[0])).size;
    expect(body).toContain(`공개 제품 ${CARE_PLAN_PRODUCTS.length}개 모델의 관리 항목 ${items}개`);
    expect(body).toContain(`${intervalModels}개 모델의 ${Object.keys(CARE_PLAN_INTERVALS).length}개`);
    expect(body).toContain(`최대 ${HOUSEHOLD_CARE_LIMIT}개`);
  });

  it('값 종류 일곱 가지의 뜻을 모두 풀이한다', () => {
    for (const [kind, label] of Object.entries(VALUE_KIND_LABELS)) {
      expect(body, kind).toContain(label);
      expect(body, kind).toContain(VALUE_KIND_MEANINGS[kind as keyof typeof VALUE_KIND_MEANINGS]);
    }
    expect(html).toContain('id="value-kinds"');
  });

  it('입력값을 서버와 주소에 남기지 않는다고 밝힌다', () => {
    expect(body).toContain('서버로 보내지 않고 주소에도 넣지 않습니다');
    expect(body).toContain('localStorage');
  });

  it('사이트맵과 개편 기록, 홈 링크에 연결된다', () => {
    expect(sitemap().map((entry) => entry.url)).toContain(`${SITE_URL}/tools`);
    expect(lastRevisionFor('/tools')).toBe('2026-10-29');
    const home = render(HomePage);
    expect(home.split('href="/tools"').length - 1).toBe(1);
  });
});

describe('도구별 정적 설명 절', () => {
  it.each(Object.keys(PAGES) as ToolSlug[])('%s: 계산식·예시값·오해·인쇄 숨김을 갖춘다', (slug) => {
    const guide = guides[slug];
    expect(guide).toContain('print:hidden');
    expect(guide.match(/data-formula/g)?.length ?? 0, '계산식').toBeGreaterThan(0);
    const example = guide.slice(guide.indexOf('data-example'));
    expect(guide.indexOf('data-example'), '예시 계산').toBeGreaterThan(-1);
    expect(example).toContain(VALUE_KIND_LABELS.example);
    const myths = guide.slice(guide.indexOf('자주 하는 오해'));
    const mythCount = (myths.slice(0, myths.indexOf('</ul>')).match(/<li>/g) ?? []).length;
    expect(mythCount, '오해 항목 수').toBeGreaterThanOrEqual(3);
    expect(mythCount, '오해 항목 수').toBeLessThanOrEqual(5);
    // 서버 렌더 HTML에 이미 들어 있어야 자바스크립트 없이 읽힌다.
    expect(text(guide).length, '설명 절 본문').toBeGreaterThan(800);
  });

  it('도구 페이지가 도구 모음으로 돌아가는 경로를 갖는다', () => {
    for (const page of Object.values(PAGES)) expect(render(page)).toContain('href="/tools"');
  });

  it('냉장고: 설명서 원문 네 개, 실제 식, 도구와 같은 예시 주방을 쓴다', () => {
    const guide = guides['fridge-fit'];
    for (const product of FRIDGE_FIT_PRODUCTS) expect(guide, product.modelNumber).toContain(`href="${escapeHtml(product.sourceUrl)}"`);
    expect(text(guide)).toContain('뒷벽 거리 기준 = 후면 간격 + 문 개방 깊이');
    expect(text(guide)).toContain('자리 폭 기준 = 본체 폭 + 좌우 간격 × 2');
    const product = FRIDGE_FIT_PRODUCTS[0];
    const scene = FRIDGE_EXAMPLE_KITCHENS.compact;
    expect(text(guide)).toContain(scene.title);
    const expected = fitMargin(product, 'frontDistance', Number(scene.inputs.frontDistance));
    expect(text(guide)).toContain(`= ${formatMm(product.rearGap + product.openDepth)}mm`);
    expect(text(guide)).toContain(expected < 0 ? `${formatMm(-expected)}mm 부족` : `${formatMm(expected)}mm 큼`);
  });

  it('식기세척기: 원문 두 개, 확인 필요 조건 수, 문 개방 깊이가 없는 모델을 데이터대로 적는다', () => {
    const guide = guides['dishwasher-fit'];
    for (const product of DISHWASHER_FIT_PRODUCTS) {
      expect(guide, product.model).toContain(`href="${escapeHtml(product.sourceUrl)}"`);
      expect(text(guide)).toContain(`확인 필요 ${product.conditions.filter((c) => c.status === 'unverified').length}개`);
    }
    const withoutDoor = DISHWASHER_FIT_PRODUCTS.filter((product) => product.openDepth === undefined);
    for (const product of withoutDoor) expect(text(guide)).toContain(`${product.model}도 문 앞 공간을 확인해 준다?`);
    const example = DISHWASHER_FIT_PRODUCTS.find((product) => product.openDepth !== undefined)!;
    expect(text(guide)).toContain(`${example.openDepth}mm`);
  });

  it('전력 기록: 30일 환산 식과 예시가 계산 함수와 같고, 공단 신고 원문을 모두 잇는다', () => {
    const guide = guides['home-energy'];
    expect(text(guide)).toContain('30일 환산 kWh = 측정 기간 누적 kWh × 30 ÷ 측정 일수');
    const result = calculateHomeEnergy({ kwh: '9.8', days: '7' });
    expect(result.kind).toBe('ready');
    if (result.kind === 'ready') expect(text(guide)).toContain(`9.8 × 30 ÷ 7 = ${result.normalizedKwh.toFixed(2)}kWh`);
    for (const entry of FRIDGE_DECLARATIONS) {
      expect(guide, entry.modelNumber).toContain(`href="${escapeHtml(entry.sourceUrl)}"`);
      expect(text(guide)).toContain(`${entry.value.toFixed(2)}kWh/월`);
    }
    expect(text(guide)).toContain('1,000W를 1시간 쓰면 1kWh');
  });

  it('수리·교체: 비교하는 금액 항목과 예시 결과가 계산 함수와 같고, 금액에는 원문이 없고 고시 기간만 원문을 잇는다', () => {
    const guide = guides['repair-replace'];
    for (const label of ['받은 수리 견적', '같은 조건의 새 제품 가격', '새 제품 추가 비용']) expect(text(guide)).toContain(label);
    expect(text(guide)).toContain('입력 금액 차이 = 새 제품 쪽 합계 − 받은 수리 견적');
    const result = calculateRepairReplace({ model: '', repairQuote: '180,000', replacementPrice: '890000', replacementExtra: '50,000원', repairTotalConfirmed: false, replacementTotalConfirmed: false, warranty: 'unknown', diagnosisConfirmed: false });
    expect(result.kind).toBe('ready');
    if (result.kind === 'ready') {
      expect(text(guide)).toContain(`${Math.abs(result.differenceWon).toLocaleString('ko-KR')}원`);
      for (const question of result.questions) expect(text(guide)).toContain(question);
    }
    // 2026-10-29 8단계: 품목을 고르면 고시 [별표 Ⅲ] 기간이 나오므로 "원문 링크가 없습니다"는 사실과 달랐다.
    expect(text(guide)).toContain('금액 계산에는 외부 자료를 쓰지 않습니다');
    expect(text(guide)).not.toContain('원문 링크가 없습니다');
    const outbound = [...guide.matchAll(/href="(https?:[^"]+)"/g)].map(([, href]) => href.replaceAll('&amp;', '&'));
    expect(outbound).toEqual([CONSUMER_STANDARD_NOTICE.table3Url]);
  });

  it('관리 일정: 주기 항목 전부의 원문과 개월 단위 말일 보정 예시를 싣는다', () => {
    const guide = guides['care-plan'];
    const scheduled = CARE_PLAN_PRODUCTS.flatMap((product) => product.items.filter((item) => item.interval));
    expect(scheduled.length).toBe(Object.keys(CARE_PLAN_INTERVALS).length);
    for (const item of scheduled) expect(guide, item.id).toContain(`href="${escapeHtml(item.sourceUrl)}"`);
    expect(text(guide)).toContain('그 달에 없는 날이면 그 달 말일');
    expect(text(guide)).toContain('2025년 10월 31일');
    expect(text(guide)).toContain('2026년 2월 28일');
  });

  it('집 전체 관리: 저장 위치·정렬·‘오늘 관리함’ 재계산 예시와 예시 항목의 원문을 싣는다', () => {
    const guide = guides['household-care'];
    expect(text(guide)).toContain('localStorage');
    expect(text(guide)).toContain(`최대 ${HOUSEHOLD_CARE_LIMIT}개`);
    expect(text(guide)).toContain('정렬 = 날짜가 이른 순');
    // 세탁기 배수 필터(7일)가 먼저 오고, 관리한 뒤에는 에어컨 필터(14일)가 앞선다.
    const body = text(guide);
    expect(body.indexOf('2026-10-31')).toBeLessThan(body.indexOf('2026-11-03'));
    expect(body).toContain('2026-11-07');
    for (const key of ['AR07A9170HCN:filter', 'WF24A9500KE:drain']) {
      const [model, id] = key.split(':');
      const item = CARE_PLAN_PRODUCTS.find((product) => product.modelNumber === model)!.items.find((entry) => entry.id === id)!;
      expect(guide, key).toContain(`href="${escapeHtml(item.sourceUrl)}"`);
    }
  });

  it('도구 사이에 같은 설명 문장을 복사해 쓰지 않는다', () => {
    const owners = new Map<string, ToolSlug[]>();
    for (const [slug, guide] of Object.entries(guides) as [ToolSlug, string][]) {
      for (const sentence of new Set(sentencesOf(guide))) owners.set(sentence, [...(owners.get(sentence) ?? []), slug]);
    }
    const shared = [...owners].filter(([, slugs]) => slugs.length > 1).map(([sentence, slugs]) => `${slugs.join('+')}: ${sentence}`);
    expect(shared).toEqual([]);
    // 문단 단위 검사가 실제로 문장을 모으는지 대조한다.
    expect(sentencesOf(guides['fridge-fit']).length).toBeGreaterThan(10);
  });
});
