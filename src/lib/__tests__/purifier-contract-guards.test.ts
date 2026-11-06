// @vitest-environment jsdom
import { act, createElement } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { WaterPurifierCostTool } from '@/components/tools/water-purifier-cost-tool';
import { importPurifierScenario } from '@/lib/purifier-scenario';

Object.assign(globalThis, { IS_REACT_ACT_ENVIRONMENT: true });
let root: Root | undefined;
async function mount() {
  if (root) await act(async () => root!.unmount());
  document.body.innerHTML = '<div id="root"></div>';
  root = createRoot(document.getElementById('root')!);
  await act(async () => { root!.render(createElement(WaterPurifierCostTool)); });
}
async function change(id: string, value: string) {
  const el = document.getElementById(id) as HTMLInputElement | HTMLSelectElement;
  const prototype = el instanceof HTMLSelectElement ? HTMLSelectElement.prototype : HTMLInputElement.prototype;
  await act(async () => {
    Object.getOwnPropertyDescriptor(prototype, 'value')!.set!.call(el, value);
    el.dispatchEvent(new Event('input', { bubbles: true })); el.dispatchEvent(new Event('change', { bubbles: true }));
  });
}
const button = (text: string) => [...document.querySelectorAll('button')].find((node) => node.textContent === text)!;
afterEach(async () => { if (root) await act(async () => root!.unmount()); root = undefined; vi.restoreAllMocks(); });

describe('정수기 계약 조건 혼용 방지', () => {
  it('실납부요금 변경만으로 해지 위약금을 내지 않고 정상 기준요금을 넣으면 별도 계산·복사한다', async () => {
    await mount();
    await change('cost-model', 'WD523ACB'); await change('cost-plan', 'y4-self');
    await change('cost-monthly', '29900'); await change('cost-registration', '0'); await change('cost-obligation', '36'); await change('cost-used', '11');
    expect((document.getElementById('cost-penalty-monthly') as HTMLInputElement).value).toBe('');
    expect(document.body.textContent).toContain('중도해지 계산 보류');
    expect(document.body.textContent).not.toContain('274,250원');
    const writeText = vi.fn<(text: string) => Promise<void>>().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText } });
    await act(async () => button('기록 복사').click());
    expect(writeText.mock.calls[0][0]).toContain('해지 산식 기준 월요금: 미입력');
    expect(writeText.mock.calls[0][0]).toContain('중도해지 계산 보류');
    await change('cost-penalty-monthly', '39900');
    expect(document.body.textContent).toContain('349,250원');
    expect(document.body.textContent).not.toContain('중도해지 계산 보류');
    await act(async () => button('기록 복사').click());
    expect(writeText.mock.calls[1][0]).toContain('월 구독료: 29,900원');
    expect(writeText.mock.calls[1][0]).toContain('해지 산식 기준 월요금: 39,900원');
  });

  it('직접 고친 기간·금액에는 원래 프로모션을 적용하지 않고 원래 계획으로 돌아가면 별도 계산한다', async () => {
    await mount(); await change('cost-model', 'CHPI-7400N'); await change('cost-plan', 'visit4-y7');
    await change('cost-obligation', '24'); await change('cost-contract', '24'); await change('cost-monthly', '44400'); await change('cost-registration', '20000');
    const promotion = [...document.querySelectorAll('label')].find((node) => node.textContent?.includes('공식몰 프로모션 조건도'))!.querySelector('input')!;
    await act(async () => promotion.click());
    expect(document.body.textContent).toContain('프로모션 계산을 보류했습니다');
    expect(document.body.textContent).not.toContain('817,200원');
    expect(document.body.textContent).toContain('직접 고친 금액·기간을 사용한 견적');
    await change('cost-plan', 'visit4-y6');
    expect(document.body.textContent).not.toContain('프로모션 계산을 보류했습니다');
    expect(document.body.textContent).toContain('프로모션 조건일 때');
  });

  it('저장 파일은 해지 기준을 별도로 보존하고 예전 v1 파일은 미확인 기준으로 불러온다', async () => {
    await mount(); await change('cost-model', 'WD523ACB'); await change('cost-plan', 'y4-self');
    await change('cost-monthly', '29900'); await change('cost-obligation', '36'); await change('cost-used', '11'); await change('cost-penalty-monthly', '39900');
    const blobs: Blob[] = [];
    Object.assign(URL, { createObjectURL: vi.fn((blob: Blob) => { blobs.push(blob); return 'blob:test'; }), revokeObjectURL: vi.fn() });
    vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => {});
    await act(async () => button('비교 조건 파일 저장').click());
    const parsed = importPurifierScenario(await blobs[0].text());
    if (parsed.kind !== 'ready') throw Error('saved scenario');
    expect(parsed.scenario.inputs.penaltyMonthly).toBe('39900');
    const legacy = { ...parsed.scenario, inputs: { ...parsed.scenario.inputs } };
    delete legacy.inputs.penaltyMonthly;
    expect(importPurifierScenario(JSON.stringify(legacy)).kind).toBe('ready');
    await mount();
    const input = document.getElementById('cost-scenario-import')!;
    const text = JSON.stringify(legacy);
    const file = new File([text], 'legacy.json', { type: 'application/json' });
    Object.defineProperty(file, 'text', { value: async () => text });
    Object.defineProperty(input, 'files', { value: [file], configurable: true });
    await act(async () => { input.dispatchEvent(new Event('change', { bubbles: true })); });
    expect((document.getElementById('cost-monthly') as HTMLInputElement).value).toBe('29900');
    expect(document.body.textContent).toContain('중도해지 계산 보류');
    expect(importPurifierScenario(JSON.stringify({ ...legacy, inputs: { ...legacy.inputs, penaltyMonthly: '-1' } })).kind).toBe('error');
  });
});
