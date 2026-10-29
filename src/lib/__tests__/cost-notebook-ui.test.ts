// @vitest-environment jsdom
import { act, createElement, type ReactElement } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { HouseholdCareTool } from '@/components/tools/household-care-tool';
import { RepairReplaceTool } from '@/components/tools/repair-replace-tool';
import { WaterPurifierCostTool } from '@/components/tools/water-purifier-cost-tool';
import { CARE_PLAN_PRODUCTS } from '@/lib/data/care-plan';

vi.mock('next/navigation', () => ({ useRouter: () => ({ replace: vi.fn() }), useSearchParams: () => new URLSearchParams(window.location.search) }));
Object.assign(globalThis, { IS_REACT_ACT_ENVIRONMENT: true });

let root: Root | undefined;
async function mount(element: ReactElement) {
  document.body.innerHTML = '<div id="test-root"></div>';
  root = createRoot(document.getElementById('test-root')!);
  await act(async () => { root!.render(element); });
}
afterEach(async () => {
  if (root) await act(async () => { root!.unmount(); });
  root = undefined;
  window.localStorage.clear();
  window.history.replaceState(null, '', '/');
  vi.useRealTimers();
  vi.restoreAllMocks();
});

async function changeElement(element: Element | null, value: string) {
  if (!element) throw new Error('element not found');
  const prototype = element instanceof HTMLSelectElement ? HTMLSelectElement.prototype : HTMLInputElement.prototype;
  await act(async () => {
    Object.getOwnPropertyDescriptor(prototype, 'value')!.set!.call(element, value);
    element.dispatchEvent(new Event('input', { bubbles: true }));
    element.dispatchEvent(new Event('change', { bubbles: true }));
  });
}
const change = (id: string, value: string) => changeElement(document.getElementById(id), value);
async function click(element: Element | null | undefined) {
  if (!element) throw new Error('element not found');
  await act(async () => { (element as HTMLElement).click(); });
}
const button = (name: string, scope: ParentNode = document) => [...scope.querySelectorAll('button')].find((b) => b.textContent?.trim() === name);
const text = () => document.body.textContent ?? '';
const failClipboard = () => Object.defineProperty(navigator, 'clipboard', { value: { writeText: vi.fn().mockRejectedValue(new Error('denied')) }, configurable: true });
const labelFor = (id: string) => document.querySelector(`label[for="${id}"]`)?.textContent ?? '';

describe('정수기 렌탈·구매 비용 비교', () => {
  it('공식 값을 기본으로 계산하고, 바꾼 값은 사용자 입력으로 표시하고 되돌릴 수 있다', async () => {
    vi.useFakeTimers({ toFake: ['Date'] });
    vi.setSystemTime(new Date(2026, 9, 29, 12));
    await mount(createElement(WaterPurifierCostTool));
    await change('cost-model', 'CHPI-7400N');
    await change('cost-plan', 'visit4-y7');
    expect(labelFor('cost-monthly')).toContain('공식 자료');
    expect(labelFor('cost-monthly')).toContain('2026-10-29 확인');
    expect(text()).toContain('4,333,600원');
    expect(text()).toContain('부분 합계');
    expect(text()).toContain('1년 무상 서비스가 끝난 뒤의 관리 비용');
    expect(document.querySelector('[role="alert"]')).toBeNull();

    await change('cost-monthly', '48,000');
    expect(labelFor('cost-monthly')).toContain('사용자 입력');
    expect(text()).toContain(`${(48_000 * 84 + 100_000).toLocaleString('ko-KR')}원`);
    await click(button('공식 값으로 되돌리기'));
    expect(labelFor('cost-monthly')).toContain('공식 자료');
    expect(text()).toContain('4,333,600원');
  });

  it('프로모션은 별도 결과로만 보이고, 약관 산식으로 중도해지 비용을 계산해 기록에 남긴다', async () => {
    await mount(createElement(WaterPurifierCostTool));
    await change('cost-model', 'CHPI-7400N');
    await change('cost-plan', 'visit4-y7');
    expect(text()).not.toContain('3,541,200원');
    await click([...document.querySelectorAll('label')].find((label) => label.textContent?.includes('프로모션 조건도 따로 계산'))?.querySelector('input'));
    expect(text()).toContain('3,541,200원');
    expect(text()).toContain('4,333,600원');
    await change('cost-used', '18');
    expect(text()).toContain('332,640원');
    expect(text()).toContain('1372소비자상담센터');
    expect(text()).toContain('법적 판단은 하지 않습니다');
    failClipboard();
    await click(button('기록 복사'));
    const record = (document.querySelector('textarea[aria-label="직접 복사할 비용 기록"]') as HTMLTextAreaElement).value;
    expect(record).toContain('기록일: ');
    expect(record).toContain('[공식 자료][프로모션]');
    expect(record).toContain('[계산값] 332,640원');
  });

  it('LG는 등록비·의무사용기간을 확인 필요로 두고, 계약서 값을 넣으면 위약금을 계산한다', async () => {
    await mount(createElement(WaterPurifierCostTool));
    await change('cost-model', 'WD523ACB');
    await change('cost-plan', 'y6-self');
    expect(labelFor('cost-registration')).toContain('확인 필요');
    expect(labelFor('cost-obligation')).toContain('확인 필요');
    expect(text()).toContain('2,296,800원');
    expect(text()).toContain(`${(1_614_000 + 11 * 73_000 + 5 * 54_600).toLocaleString('ko-KR')}원`);
    await change('cost-used', '18');
    expect(text()).toContain('의무사용기간을 넣어야');
    await change('cost-obligation', '36');
    expect(labelFor('cost-obligation')).toContain('사용자 입력');
    expect(text()).toContain('164,840원');
    expect(text()).toContain('57,420원');
  });

  it('SK매직 WPU-A710C는 계산하지 않는다', async () => {
    await mount(createElement(WaterPurifierCostTool));
    await change('cost-model', 'WPU-A710C');
    expect(text()).toContain('공식 조건 확인 불가');
    expect(document.getElementById('cost-plan')).toBeNull();
    expect(button('기록 복사')).toBeUndefined();
  });

  it('가격 확인일에서 90일이 지나면 재확인 경고를 띄운다', async () => {
    vi.useFakeTimers({ toFake: ['Date'] });
    vi.setSystemTime(new Date(2027, 0, 28, 12));
    await mount(createElement(WaterPurifierCostTool));
    expect(document.querySelector('[role="alert"]')?.textContent).toContain('가격 재확인 필요');
  });
});

describe('우리 집 가전 수첩', () => {
  const purifier = CARE_PLAN_PRODUCTS.find((entry) => entry.modelNumber === 'CHPI-7400N')!;
  const outlet = purifier.items.find((entry) => entry.id === 'outlet')!;
  const aircon = CARE_PLAN_PRODUCTS.find((entry) => entry.category === '에어컨')!;
  const field = (suffix: string, index = 0) => document.querySelectorAll(`[id^="nb-"][id$="-${suffix}"]`)[index] ?? null;

  it('v1 목록을 이어받고, 제품 기록·고시 종료일·수리 기록을 같은 저장소에 남긴다', async () => {
    vi.useFakeTimers({ toFake: ['Date'] });
    vi.setSystemTime(new Date(2026, 9, 29, 12));
    const legacy = JSON.stringify([{ id: 'care-1', modelNumber: purifier.modelNumber, itemId: outlet.id, lastCareDate: '2026-10-20', chosenDate: '' }]);
    window.localStorage.setItem('salimlab-household-care-v1', legacy);
    await mount(createElement(HouseholdCareTool, { products: CARE_PLAN_PRODUCTS }));
    expect(document.getElementById('household-list-heading')?.textContent).toContain('1개 항목');

    await change('notebook-model', purifier.modelNumber);
    await click(button('수첩에 추가'));
    await changeElement(field('purchase'), '2026-03-15');
    expect(text()).toContain('2027-03-15');
    expect(text()).toContain('구입일 2026-03-15');
    expect(text()).toContain('구입일로 대신하지 않습니다');
    await changeElement(field('manufacture'), '2024-03');
    expect(text()).toContain('2031-03-31');
    await changeElement(field('maker-end'), '2026-12-31');
    expect(text()).toContain('4호 가목');

    await changeElement(field('repair-date'), '2026-05-01');
    await changeElement(field('repair-text'), '출수구 수리');
    await changeElement(field('repair-cost'), '45,000');
    await click(button('수리 기록 추가'));
    expect(text()).toContain('입력한 수리비 합계: 45,000원');

    const stored = JSON.parse(window.localStorage.getItem('salimlab-household-care-v2')!);
    expect(stored.version).toBe(2);
    expect(stored.care).toHaveLength(1);
    expect(stored.products[0]).toMatchObject({ modelNumber: purifier.modelNumber, purchaseDate: '2026-03-15', manufactureLabel: '2024-03', makerWarrantyEnd: '2026-12-31' });
    expect(stored.products[0].repairs[0]).toMatchObject({ date: '2026-05-01', description: '출수구 수리', costWon: 45000 });
    expect(window.localStorage.getItem('salimlab-household-care-v1')).toBe(legacy);

    const link = [...document.querySelectorAll('a')].find((anchor) => anchor.textContent?.includes('수리·교체 비교표 열기'));
    expect(link?.getAttribute('href')).toBe('/tools/repair-replace?item=water-purifier');

    failClipboard();
    await click(button('목록 복사'));
    const record = (document.querySelector('textarea[aria-label="직접 복사할 관리표"]') as HTMLTextAreaElement).value;
    expect(record).toContain('[계산값] 고시 기준 품질보증 종료일: 2027-03-15');
    expect(record).toContain('[계산값] 부품보유 종료일: 2031-03-31');
    expect(record).toContain('2026-05-01 · 출수구 수리 · 45,000원');
  });

  it('에어컨은 구분을 고른 뒤에, 판매일을 모르면 제조일 + 3개월로 계산한다', async () => {
    await mount(createElement(HouseholdCareTool, { products: CARE_PLAN_PRODUCTS }));
    await change('notebook-model', aircon.modelNumber);
    await click(button('수첩에 추가'));
    expect(text()).toContain('에어컨 구분을 고르면');
    await changeElement(field('aircon'), 'cooling');
    await changeElement(field('basis'), 'unknown-sale');
    expect(labelFor((field('basis-date') as HTMLElement).id)).toContain('제조일 또는 수입통관일');
    await changeElement(field('basis-date'), '2025-11-30');
    expect(text()).toContain('3개월이 지난 2026-02-28');
    expect(text()).toContain('2028-02-28');
    expect(text()).toContain('에어컨(냉방 전용)');
  });

  it('JSON으로 내보내고, 검증한 파일을 확인한 뒤에만 불러온다', async () => {
    await mount(createElement(HouseholdCareTool, { products: CARE_PLAN_PRODUCTS }));
    await change('notebook-model', purifier.modelNumber);
    await click(button('수첩에 추가'));
    const createObjectURL = vi.fn((blob: Blob) => { void blob; return 'blob:test'; });
    Object.assign(URL, { createObjectURL, revokeObjectURL: vi.fn() });
    vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => {});
    await click(button('JSON 파일로 내보내기'));
    const exported = await (createObjectURL.mock.calls[0][0] as Blob).text();
    expect(JSON.parse(exported)).toMatchObject({ app: 'salimlab-household-notebook', version: 2, products: [{ modelNumber: purifier.modelNumber }] });

    const input = document.getElementById('notebook-import') as HTMLInputElement;
    const choose = async (content: string, name = 'notebook.json') => {
      Object.defineProperty(input, 'files', { value: [new File([content], name, { type: 'application/json' })], configurable: true });
      await act(async () => { input.dispatchEvent(new Event('change', { bubbles: true })); });
      await act(async () => { await new Promise((resolve) => setTimeout(resolve, 0)); });
    };
    await choose('{not json');
    expect(text()).toContain('JSON 파일을 읽지 못했습니다');
    const incoming = JSON.stringify({ app: 'salimlab-household-notebook', version: 2, care: [], products: [{ id: 'p-9', modelNumber: aircon.modelNumber, airconType: 'heat-pump', unknown: true, repairs: [] }, { id: 'p-8', modelNumber: 'NOPE' }] });
    await choose(incoming);
    expect(text()).toContain('형식이 맞지 않아 뺄 기록 1개');
    expect(JSON.parse(window.localStorage.getItem('salimlab-household-care-v2')!).products[0].modelNumber).toBe(purifier.modelNumber);
    await click(button('이 파일로 바꾸기'));
    const stored = JSON.parse(window.localStorage.getItem('salimlab-household-care-v2')!);
    expect(stored.products).toHaveLength(1);
    expect(stored.products[0]).toMatchObject({ modelNumber: aircon.modelNumber, airconType: 'heat-pump' });
    expect(stored.products[0]).not.toHaveProperty('unknown');
    expect(text()).toContain('파일로 수첩을 바꿨습니다');
  });
});

describe('수리·교체 비교표의 고시 기준', () => {
  it('주소의 품목만 이어받고, 기산 날짜와 제조일로 종료일을 보여 주며 기록에 남긴다', async () => {
    vi.useFakeTimers({ toFake: ['Date'] });
    vi.setSystemTime(new Date(2026, 9, 29, 12));
    window.history.replaceState(null, '', '/tools/repair-replace?item=water-purifier');
    await mount(createElement(RepairReplaceTool));
    expect((document.getElementById('repair-item') as HTMLSelectElement).value).toBe('water-purifier');
    expect(labelFor('repair-standard-basis-date')).toContain('구입일');
    await change('repair-standard-basis-date', '2026-03-15');
    expect(text()).toContain('2027-03-15');
    await change('repair-standard-manufacture', '2024');
    expect(text()).toContain('2031-12-31');
    await change('repair-quote', '150000');
    await change('replacement-price', '900000');
    failClipboard();
    await click(button('기록 복사'));
    const record = (document.querySelector('textarea[aria-label="직접 복사할 기록"]') as HTMLTextAreaElement).value;
    expect(record).toContain('공정위 소비자분쟁해결기준:');
    expect(record).toContain('[계산값] 고시 기준 품질보증 종료일: 2027-03-15');

    await change('repair-item', 'robot-vacuum');
    expect(window.location.search).toBe('?item=robot-vacuum');
    expect(text()).toContain('고시 표에 해당 분류 없음 — 확인 필요');
    expect(text()).not.toContain('2027-03-15');
  });
});
