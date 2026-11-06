// @vitest-environment jsdom
import { act, createElement } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { WaterPurifierCostTool } from '@/components/tools/water-purifier-cost-tool';
import { WATER_PURIFIER_MODELS } from '@/lib/data/water-purifier-cost';
import { importPurifierScenario } from '@/lib/purifier-scenario';
import { purchasePath, rentalPath, type PurifierCostModel } from '@/lib/water-purifier-cost';

Object.assign(globalThis, { IS_REACT_ACT_ENVIRONMENT: true });
const lg = WATER_PURIFIER_MODELS.find((model) => model.modelNumber === 'WD523ACB') as PurifierCostModel;
const official = (value: number) => ({ value, kind: 'official' as const });
const entered = (value: number) => ({ value, kind: 'entered' as const });
let root: Root | undefined;
async function mount() {
  if (root) await act(async () => root!.unmount());
  document.body.innerHTML = '<div id="root"></div>';
  root = createRoot(document.getElementById('root')!);
  await act(async () => { root!.render(createElement(WaterPurifierCostTool)); });
}
async function change(id: string, value: string) {
  const node = document.getElementById(id) as HTMLInputElement | HTMLSelectElement;
  const prototype = node instanceof HTMLSelectElement ? HTMLSelectElement.prototype : HTMLInputElement.prototype;
  await act(async () => {
    Object.getOwnPropertyDescriptor(prototype, 'value')!.set!.call(node, value);
    node.dispatchEvent(new Event('input', { bubbles: true })); node.dispatchEvent(new Event('change', { bubbles: true }));
  });
}
async function upload(text: string) {
  const node = document.getElementById('cost-scenario-import')!;
  const file = new File([text], 'comparison.json', { type: 'application/json' });
  Object.defineProperty(file, 'text', { value: async () => text });
  Object.defineProperty(node, 'files', { configurable: true, value: [file] });
  await act(async () => { node.dispatchEvent(new Event('change', { bubbles: true })); });
}
const button = (text: string) => [...document.querySelectorAll('button')].find((node) => node.textContent === text)!;
afterEach(async () => { if (root) await act(async () => root!.unmount()); root = undefined; vi.restoreAllMocks(); });

describe('정수기 경로별 추가 견적비', () => {
  it('각 경로에 한 번 더하고 미확인과 확인된 0원을 구분하며 기존 누락 항목은 유지한다', () => {
    const base = { monthly: official(39900), registration: entered(0) };
    expect(rentalPath(lg, { ...base, rentalExtra: entered(228000) }, 48).totalWon).toBe(2143200);
    const unknown = rentalPath(lg, { ...base, rentalExtra: null }, 48);
    const free = rentalPath(lg, { ...base, rentalExtra: entered(0) }, 48);
    expect(unknown.partial).toBe(true);
    expect(unknown.missing[0].reason).toContain('무료로 간주하지 않으며');
    expect(free.partial).toBe(false);
    expect(free.lines.at(-1)).toMatchObject({ won: 0, kind: 'entered' });
    const buyValues = { purchase: official(lg.purchase.listWon), filters: lg.purchase.filters.map((filter) => official(filter.listWon)) };
    const buyBase = purchasePath(lg, buyValues, 48, '구입가');
    const buyQuote = purchasePath(lg, { ...buyValues, purchaseExtra: entered(130000) }, 48, '구입가');
    expect(buyQuote.totalWon - buyBase.totalWon).toBe(130000);
    expect(buyQuote.missing).toEqual(buyBase.missing);
    expect(buyQuote.missing.some((item) => item.label === '필터 배송비')).toBe(true);
  });

  it('합계·복사·파일 왕복이 같은 견적을 쓰고 짧은 의무사용기간과 해지에는 더하지 않는다', async () => {
    await mount(); await change('cost-model', 'WD523ACB'); await change('cost-plan', 'y4-self');
    await change('cost-registration', '0'); await change('cost-obligation', '36'); await change('cost-used', '11');
    await change('cost-rental-extra', '228000'); await change('cost-purchase-extra', '0');
    expect(document.body.textContent).toContain('2,143,200원');
    expect(document.body.textContent).toContain('총기간 추가 견적비 제외');
    expect(document.body.textContent).toContain('349,250원');
    const writeText = vi.fn<(text: string) => Promise<void>>().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText } });
    await act(async () => button('기록 복사').click());
    expect(writeText.mock.calls[0][0]).toContain('[사용자 입력] 렌탈·구독 추가 견적비 (설치·이전·철거 등): 228,000원');
    expect(writeText.mock.calls[0][0]).toContain('[사용자 입력] 구매 추가 견적비 (설치·이전·철거 등): 0원');
    expect(writeText.mock.calls[0][0]).toContain('총 계약기간 48개월 합계: [계산값] 2,143,200원');
    const blobs: Blob[] = [];
    Object.assign(URL, { createObjectURL: vi.fn((blob: Blob) => { blobs.push(blob); return 'blob:test'; }), revokeObjectURL: vi.fn() });
    vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => {});
    await act(async () => button('비교 조건 파일 저장').click());
    const raw = await blobs[0].text();
    const parsed = importPurifierScenario(raw);
    if (parsed.kind !== 'ready') throw Error('scenario');
    expect(parsed.scenario.inputs).toMatchObject({ rentalExtra: '228000', purchaseExtra: '0' });
    await mount(); await upload(raw);
    expect((document.getElementById('cost-rental-extra') as HTMLInputElement).value).toBe('228000');
    expect((document.getElementById('cost-purchase-extra') as HTMLInputElement).value).toBe('0');
    expect(document.body.textContent).toContain('2,143,200원');
    const legacy = { ...parsed.scenario, inputs: { ...parsed.scenario.inputs } };
    delete legacy.inputs.rentalExtra; delete legacy.inputs.purchaseExtra;
    await upload(JSON.stringify(legacy));
    expect((document.getElementById('cost-rental-extra') as HTMLInputElement).value).toBe('');
    expect((document.getElementById('cost-purchase-extra') as HTMLInputElement).value).toBe('');
    expect(document.body.textContent).toContain('견적을 입력하지 않았습니다');
    expect(document.body.textContent).not.toContain('2,143,200원');
    expect(importPurifierScenario(JSON.stringify({ ...legacy, inputs: { ...legacy.inputs, rentalExtra: '-1' } })).kind).toBe('error');
    expect(importPurifierScenario(JSON.stringify({ ...legacy, inputs: { ...legacy.inputs, purchaseExtra: '15만원' } })).kind).toBe('error');
  });

  it('잘못된 추가비로 기존 합계를 결과처럼 유지하지 않고 모델 변경 때 이전 견적을 비운다', async () => {
    await mount(); await change('cost-model', 'WD523ACB'); await change('cost-plan', 'y4-self');
    await change('cost-rental-extra', '-100');
    expect(document.body.textContent).toContain('표시된 칸을 고치면 다시 계산합니다');
    expect((button('비교 조건 파일 저장') as HTMLButtonElement).disabled).toBe(true);
    await change('cost-rental-extra', '228000'); await change('cost-purchase-extra', '130000');
    await change('cost-model', 'CHPI-7400N');
    expect((document.getElementById('cost-rental-extra') as HTMLInputElement).value).toBe('');
    expect((document.getElementById('cost-purchase-extra') as HTMLInputElement).value).toBe('');
  });
});
