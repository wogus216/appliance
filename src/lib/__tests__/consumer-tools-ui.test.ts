// @vitest-environment jsdom
import { act, createElement, type ReactElement } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { FridgeFitTool } from '@/components/tools/fridge-fit-tool';
import { HomeEnergyTool } from '@/components/tools/home-energy-tool';
import { RepairReplaceTool } from '@/components/tools/repair-replace-tool';
import { DishwasherFitTool } from '@/components/tools/dishwasher-fit-tool';
import { HouseholdCareTool } from '@/components/tools/household-care-tool';
import { FRIDGE_FIT_PRODUCTS } from '@/lib/data/fridge-installation';
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
  vi.restoreAllMocks();
});

async function change(id: string, value: string) {
  const element = document.getElementById(id) as HTMLInputElement | HTMLSelectElement;
  const prototype = element instanceof HTMLSelectElement ? HTMLSelectElement.prototype : HTMLInputElement.prototype;
  await act(async () => {
    Object.getOwnPropertyDescriptor(prototype, 'value')!.set!.call(element, value);
    element.dispatchEvent(new Event('input', { bubbles: true }));
    element.dispatchEvent(new Event('change', { bubbles: true }));
  });
}
async function click(element: Element | null | undefined) {
  if (!element) throw new Error('element not found');
  await act(async () => { (element as HTMLElement).click(); });
}
const button = (name: string) => [...document.querySelectorAll('button')].find((b) => b.textContent?.trim() === name);
const valueOf = (id: string) => (document.getElementById(id) as HTMLInputElement).value;

describe('냉장고 확인표: 실측값과 예시값', () => {
  it('예시 주방을 둘러보고 돌아와도 우리 집 실측값이 남고, 예시 수정은 실측값에 섞이지 않는다', async () => {
    window.history.replaceState(null, '', '/tools/fridge-fit?model=T873MEE111');
    await mount(createElement(FridgeFitTool, { products: FRIDGE_FIT_PRODUCTS }));
    await change('fit-spaceWidth', '1100');
    await change('fit-frontDistance', '1500');
    await click(document.querySelector('input[name="fit-scene"][value="compact"]'));
    expect(valueOf('fit-spaceWidth')).toBe('1050');
    expect(document.body.textContent).toContain('가상 예시 결과입니다');
    expect(document.body.textContent).toContain('우리 집 실측값 2개에는 섞이지 않습니다');
    await change('fit-spaceWidth', '999');
    await click(document.querySelector('input[name="fit-scene"][value="own"]'));
    expect(valueOf('fit-spaceWidth')).toBe('1100');
    expect(valueOf('fit-frontDistance')).toBe('1500');
    expect(document.body.textContent).toContain('우리 집 실측값 2개를 보고 있습니다');
    await click(document.querySelector('input[name="fit-scene"][value="compact"]'));
    expect(valueOf('fit-spaceWidth')).toBe('999');
    await click(button('예시 값을 처음으로 되돌리기'));
    expect(valueOf('fit-spaceWidth')).toBe('1050');
  });

  it('같은 치수로 네 모델의 차이와 공단 신고값을 함께 보여 주고 다른 모델로 바꿀 수 있다', async () => {
    window.history.replaceState(null, '', '/tools/fridge-fit?model=RF85C90D1AP');
    await mount(createElement(FridgeFitTool, { products: FRIDGE_FIT_PRODUCTS }));
    await change('fit-spaceWidth', '1000');
    await change('fit-frontDistance', '1250');
    const table = document.querySelector('table')!;
    expect(table.querySelectorAll('tbody tr')).toHaveLength(4);
    expect(table.textContent).toContain('12 부족');
    expect(table.textContent).toContain('41.38kWh/월');
    expect(document.querySelector('figure')?.textContent).toContain('문 개방 끝부터 -68mm');
    expect(document.querySelector('figure svg')?.getAttribute('aria-label')).toContain('문 개방 범위와 겹침');
    await click([...table.querySelectorAll('button')].find((b) => b.textContent?.includes('T873MEE111')));
    expect((document.getElementById('fit-model') as HTMLSelectElement).value).toBe('T873MEE111');
    expect(valueOf('fit-spaceWidth')).toBe('1000');
  });
});

describe('입력 오류를 칸에서 알려 주기', () => {
  it('전력 기록은 1,2를 12로 계산하지 않는다', async () => {
    await mount(createElement(HomeEnergyTool));
    await change('measured-kwh', '1,2');
    await change('measured-days', '7');
    expect(document.getElementById('measured-kwh')?.getAttribute('aria-invalid')).toBe('true');
    expect(document.getElementById('measured-kwh-error')?.textContent).toContain('마침표');
    expect(document.body.textContent).not.toContain('30일 환산 사용량');
    await change('measured-kwh', '1.2');
    expect(document.body.textContent).toContain('5.14');
    expect(document.body.textContent).toContain('사용자 실측');
    expect(document.body.textContent).toContain('계산값');
  });

  it('수리·교체 비교는 잘못된 금액 칸만 표시한다', async () => {
    await mount(createElement(RepairReplaceTool));
    await change('repair-quote', '15,00');
    await change('replacement-price', '900,000');
    expect(document.getElementById('repair-quote')?.getAttribute('aria-invalid')).toBe('true');
    expect(document.getElementById('replacement-price')?.getAttribute('aria-invalid')).toBe('false');
    await change('repair-quote', '150,000원');
    expect(document.body.textContent).toContain('750,000원');
  });

  it('식기세척기 확인표는 잘못된 칸에 오류를 붙이고 확인 필요 조건을 보여 준다', async () => {
    await mount(createElement(DishwasherFitTool));
    await change('dishwasher-width', '55cm');
    expect(document.getElementById('dishwasher-width')?.getAttribute('aria-invalid')).toBe('true');
    expect(document.getElementById('dishwasher-width-error')).not.toBeNull();
    await change('dishwasher-model', 'DWA-81R0D');
    expect(document.getElementById('dishwasher-openDepth')).toBeNull();
    expect(document.body.textContent).toContain('모델을 바꿔 입력한 치수와 체크를 비웠습니다');
    expect(document.body.textContent).toContain('문을 연 전체 깊이는 설명서 본문과 도면 이미지에서 찾지 못했습니다');
  });
});

describe('집 전체 관리 목록', () => {
  it('브라우저에 저장하고, 관리한 날을 기록하고, 복사 결과를 목록 옆에 알린다', async () => {
    const product = CARE_PLAN_PRODUCTS.find((entry) => entry.modelNumber === 'CHPI-7400N')!;
    const outlet = product.items.find((entry) => entry.id === 'outlet')!;
    expect(outlet.interval).toBeDefined();
    await mount(createElement(HouseholdCareTool, { products: CARE_PLAN_PRODUCTS }));
    await change('household-model', product.modelNumber);
    await change('household-item', outlet.id);
    await change('household-date', '2026-01-02');
    await click(button('목록에 추가'));
    const stored = JSON.parse(window.localStorage.getItem('salimlab-household-care-v2')!).care;
    expect(stored).toHaveLength(1);
    expect(stored[0].lastCareDate).toBe('2026-01-02');
    await click(button('오늘 관리함'));
    const today = new Date();
    const iso = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    expect(JSON.parse(window.localStorage.getItem('salimlab-household-care-v2')!).care[0].lastCareDate).toBe(iso);
    const writeText = vi.fn().mockRejectedValue(new Error('denied'));
    Object.defineProperty(navigator, 'clipboard', { value: { writeText }, configurable: true });
    await click(button('목록 복사'));
    const list = document.getElementById('household-list-heading')!.parentElement!;
    expect(list.textContent).toContain('자동 복사에 실패했습니다');
    expect(list.querySelector('textarea')?.value).toContain('마지막 관리일: ' + iso);
  });
});
