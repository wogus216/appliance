// @vitest-environment jsdom
import { act, createElement, type ReactElement } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { CarePlanTool } from '@/components/tools/care-plan-tool';
import { HouseholdCareTool } from '@/components/tools/household-care-tool';
import { WaterPurifierCostTool } from '@/components/tools/water-purifier-cost-tool';
import { HomeEnergyTool } from '@/components/tools/home-energy-tool';
import { CARE_PLAN_PRODUCTS } from '@/lib/data/care-plan';
import { CARE_HANDOFF_KEY, parseCareHandoff } from '@/lib/care-handoff';
import { importPurifierScenario } from '@/lib/purifier-scenario';
import { NOTEBOOK_KEY } from '@/lib/appliance-notebook';
import { HOME_ENERGY_STORAGE_KEY } from '@/lib/home-energy-record';

vi.mock('next/navigation', () => ({ useSearchParams: () => new URLSearchParams(window.location.search) }));
Object.assign(globalThis, { IS_REACT_ACT_ENVIRONMENT: true });
let root: Root | undefined;
async function mount(element: ReactElement) {
  if (root) await act(async () => root!.unmount());
  document.body.innerHTML = '<div id="test-root"></div>';
  root = createRoot(document.getElementById('test-root')!);
  await act(async () => root!.render(element));
}
afterEach(async () => {
  if (root) await act(async () => root!.unmount());
  root = undefined;
  window.localStorage.clear(); window.sessionStorage.clear(); window.history.replaceState(null, '', '/');
  vi.useRealTimers(); vi.restoreAllMocks();
});
async function change(id: string, value: string) {
  const element = document.getElementById(id) as HTMLInputElement | HTMLSelectElement;
  const prototype = element instanceof HTMLSelectElement ? HTMLSelectElement.prototype : HTMLInputElement.prototype;
  await act(async () => { Object.getOwnPropertyDescriptor(prototype, 'value')!.set!.call(element, value); element.dispatchEvent(new Event('input', { bubbles: true })); element.dispatchEvent(new Event('change', { bubbles: true })); });
}
async function click(element: Element | undefined | null) { expect(element).toBeTruthy(); await act(async () => (element as HTMLElement).click()); }
const button = (label: string) => [...document.querySelectorAll('button')].find((b) => b.textContent === label);

describe('생활 도구를 이어 쓴다', () => {
  it('요금 가정을 명시적으로 선택하고 기록 목적으로 돌아가면 이전 요금 결과를 저장하지 않는다', async () => {
    await mount(createElement(HomeEnergyTool));
    await change('measured-kwh', '1.2'); await change('measured-days', '1');
    expect(document.getElementById('bill-household-kwh')).toBeNull();
    await click(document.querySelector('[name="bill-purpose"][value="additional"]'));
    await change('bill-household-kwh', '350'); await change('bill-month', '2026-10');
    expect(document.body.textContent).toContain('+9,280원');
    await click(document.querySelector('[name="bill-purpose"][value="record"]'));
    expect(document.body.textContent).not.toContain('9,280원');
    await click(button('이 기록 저장'));
    const stored = JSON.parse(window.localStorage.getItem(HOME_ENERGY_STORAGE_KEY)!);
    expect(stored[0].bill).toBeUndefined();
    expect(stored[0].normalizedKwh.value).toBe(36);
  });

  it('정수기 파일을 새 화면에서 불러와 같은 견적을 복원하고 잘못된 파일은 현재 입력을 보존한다', async () => {
    await mount(createElement(WaterPurifierCostTool));
    await change('cost-model', 'WD523ACB'); await change('cost-plan', 'y5-self');
    await change('cost-monthly', '32900'); await change('cost-obligation', '36'); await change('cost-purchase', '1290000');
    await change('cost-used', '18');
    const blobs: Blob[] = [];
    Object.assign(URL, { createObjectURL: vi.fn((blob: Blob) => { blobs.push(blob); return 'blob:test'; }), revokeObjectURL: vi.fn() });
    vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => {});
    await click(button('비교 조건 파일 저장'));
    const raw = await blobs[0].text();
    const parsed = importPurifierScenario(raw);
    expect(parsed.kind).toBe('ready');
    if (parsed.kind !== 'ready') throw new Error('scenario');
    expect(parsed.scenario.inputs).toMatchObject({ monthly: '32900', obligation: '36', purchase: '1290000', registration: '', contract: '60' });
    expect(Object.keys(parsed.scenario.inputs).filter((k) => k.startsWith('filter-'))).toHaveLength(2);
    // 화면이 받는 공백·선행 0도 파일에서 거부하지 않는다.
    expect(importPurifierScenario(JSON.stringify({ ...parsed.scenario, usedRaw: '000018', inputs: { ...parsed.scenario.inputs, contract: '000060', registration: '  ' } })).kind).toBe('ready');
    await mount(createElement(WaterPurifierCostTool));
    const upload = async (text: string) => {
      const element = document.getElementById('cost-scenario-import')!;
      const file = new File([text], 'scenario.json', { type: 'application/json' });
      Object.defineProperty(file, 'text', { value: async () => text });
      Object.defineProperty(element, 'files', { value: [file], configurable: true });
      await act(async () => element.dispatchEvent(new Event('change', { bubbles: true })));
    };
    await upload(raw);
    expect((document.getElementById('cost-monthly') as HTMLInputElement).value).toBe('32900');
    expect((document.getElementById('cost-used') as HTMLInputElement).value).toBe('18');
    expect(document.body.textContent).toContain('1,974,000원');
    expect(document.body.textContent).toContain('2,165,400원');
    expect(document.body.textContent).toContain('부분 합계');
    for (const bad of ['{broken', JSON.stringify({ ...parsed.scenario, version: 2 }), JSON.stringify({ ...parsed.scenario, modelNumber: 'WPU-A710C' }), JSON.stringify({ ...parsed.scenario, inputs: { ...parsed.scenario.inputs, monthly: '-1' } })]) {
      await upload(bad);
      expect((document.getElementById('cost-monthly') as HTMLInputElement).value).toBe('32900');
      expect(document.body.textContent).toContain('현재 입력은 바꾸지 않았습니다');
    }
    expect(window.location.search).toBe('');
  });

  it.each([['WF24A9500KE', 'drain', '2026-10-30', '2026-11-06'], ['HT08', 'anc', '2026-11-10', '2026-11-10']])('일정 %s/%s를 수첩에 미리 채우되 확인 전에는 저장하지 않는다', async (model, itemId, date, due) => {
    vi.useFakeTimers({ toFake: ['Date'] }); vi.setSystemTime(new Date(2026, 10, 1, 12));
    const existing = { id: 'existing', modelNumber: 'CHPI-7400N', itemId: 'outlet', lastCareDate: '2026-10-20', chosenDate: '' };
    const notebook = { version: 2, care: [existing], products: [] };
    window.localStorage.setItem(NOTEBOOK_KEY, JSON.stringify(notebook));
    await mount(createElement(CarePlanTool, { products: CARE_PLAN_PRODUCTS }));
    await change('care-model', model); await change('care-item', itemId);
    await change(model === 'WF24A9500KE' ? 'care-last-date' : 'care-chosen-date', date);
    const link = [...document.querySelectorAll('a')].find((a) => a.textContent === '이 항목을 수첩으로 가져가기')!;
    link.addEventListener('click', (e) => e.preventDefault());
    await click(link);
    expect(window.location.search).not.toContain(date);
    expect(window.sessionStorage.getItem(CARE_HANDOFF_KEY)).toContain(date);
    await mount(createElement(HouseholdCareTool, { products: CARE_PLAN_PRODUCTS }));
    expect((document.getElementById('household-model') as HTMLSelectElement).value).toBe(model);
    expect((document.getElementById('household-item') as HTMLSelectElement).value).toBe(itemId);
    expect((document.getElementById('household-date') as HTMLInputElement).value).toBe(date);
    expect(JSON.parse(window.localStorage.getItem(NOTEBOOK_KEY)!).care).toEqual([existing]);
    expect(window.sessionStorage.getItem(CARE_HANDOFF_KEY)).toBeNull();
    await click(button('목록에 추가'));
    const stored = JSON.parse(window.localStorage.getItem(NOTEBOOK_KEY)!);
    expect(stored.care).toHaveLength(2); expect(stored.care[0]).toEqual(existing);
    expect(document.body.textContent).toContain(due);
    await click(button('목록에 추가'));
    expect(JSON.parse(window.localStorage.getItem(NOTEBOOK_KEY)!).care).toHaveLength(2);
  });

  it('만료되거나 모르는 모델의 초안은 수첩에 적용하지 않는다', () => {
    const draft = { version: 1, modelNumber: 'WF24A9500KE', itemId: 'drain', date: '2026-10-30', createdAt: 1000 };
    expect(parseCareHandoff(JSON.stringify(draft), CARE_PLAN_PRODUCTS, '2026-11-01', 1_801_001)).toBeUndefined();
    expect(parseCareHandoff(JSON.stringify({ ...draft, modelNumber: 'unknown' }), CARE_PLAN_PRODUCTS, '2026-11-01', 1001)).toBeUndefined();
    expect(parseCareHandoff('{broken', CARE_PLAN_PRODUCTS, '2026-11-01')).toBeUndefined();
  });
});
