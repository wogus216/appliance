// @vitest-environment jsdom
import { act, createElement, type ReactElement } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { EnergyComparison } from '@/components/compare/energy-comparison';
import { HomeEnergyTool } from '@/components/tools/home-energy-tool';
import { getEnergyComparisonProducts } from '@/lib/energy-products';
import { HOME_ENERGY_STORAGE_KEY } from '@/lib/home-energy-record';

// 주소 동기화까지 확인하려고 replace가 실제 주소를 바꾸게 한다.
vi.mock('next/navigation', () => ({
  useRouter: () => ({ replace: (url: string) => window.history.replaceState(null, '', url) }),
  useSearchParams: () => new URLSearchParams(window.location.search),
}));
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
const text = () => document.body.textContent ?? '';
const stored = () => JSON.parse(window.localStorage.getItem(HOME_ENERGY_STORAGE_KEY) ?? '[]');
function readBlob(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsText(blob);
  });
}

describe('/compare 전기량 비교: 품목·항목·용량 조건', () => {
  it('비교할 수 없는 조합은 이유와 비교 가능한 상대를 보여 주고, 상대를 고르면 차이를 계산한다', async () => {
    window.history.replaceState(null, '', '/compare');
    await mount(createElement(EnergyComparison, { products: getEnergyComparisonProducts() }));
    expect(text()).toContain('RF85C90D1AP의 신고값이 월 0.57kWh 낮습니다');

    await change('energy-model-a', 'CTH06QBW');
    expect(text()).toContain('이 두 모델은 비교하지 않습니다');
    expect(text()).toContain('공단 품목이 다릅니다(전기냉방기 · 전기냉장고(냉동냉장고))');
    expect(text()).not.toContain('kWh 낮습니다');
    expect(new URLSearchParams(window.location.search).get('energyA')).toBe('CTH06QBW');

    await click(button('TCL TAC-08CSD/TPH11I'));
    expect(text()).toContain('TAC-08CSD/TPH11I의 신고값이 월 1.70kWh 낮습니다');
    expect(text()).toContain('두 모델의 정격냉방능력 차이는 2.1%입니다');
    expect(text()).toContain('실내기 TAC-08CSD/TPH11I-I · 실외기 TAC-08CSD/TPH11I-O');
    expect(text()).not.toContain('우리 집 치수로 설치 전 확인하기');

    await change('energy-model-b', 'AR07A9170HCN');
    expect(text()).toContain('정격냉방능력이 2,300W와 3,000W로 23.3% 차이 납니다');
    expect(text()).toContain('전력량 차이를 계산하지 않았습니다');
    expect(text()).not.toContain('kWh 낮습니다');
    expect(document.querySelector('table')).toBeNull();
  });

  it('비교 상대가 없는 정수기는 그 사실을 알린다', async () => {
    window.history.replaceState(null, '', '/compare?energyA=CHPI-7400N');
    await mount(createElement(EnergyComparison, { products: getEnergyComparisonProducts() }));
    expect((document.getElementById('energy-model-b') as HTMLSelectElement).value).toBe('WD523ACB');
    expect(text()).toContain('냉수저장탱크 용량이 1.02L와 1.5L로 32.0% 차이 납니다');
    expect(text()).toContain('이 목록에는 CHPI-7400N의 비교 조건을 만족하는 모델이 없습니다');
  });
});

describe('우리 집 전력 기록: 공단값 병치·요금 차이·저장', () => {
  async function fill() {
    await mount(createElement(HomeEnergyTool));
    await change('measured-device', '거실 에어컨');
    await change('measured-kwh', '35');
    await change('measured-days', '7');
    await change('energy-model', 'CTH06QBW');
  }

  it('월간 kWh 신고 모델 12개를 품목별로 묶어 고르고, 에어컨의 신고 항목을 함께 보여 준다', async () => {
    await mount(createElement(HomeEnergyTool));
    const groups = [...document.querySelectorAll('#energy-model optgroup')].map((group) => group.getAttribute('label'));
    expect(groups).toEqual(['냉장고 4개', '에어컨 5개', '정수기 3개']);
    await change('measured-kwh', '35');
    await change('measured-days', '7');
    await change('energy-model', 'CTH06QBW');
    expect(text()).toContain('150.00');
    expect(text()).toContain('89.50kWh/월');
    expect(text()).toContain('냉방기간월간소비전력량(kWh/월)(1:1기준)');
  });

  it('고지서 사용량과 사용 월을 넣으면 더하기 전후 요금과 차이를 계산값으로 보여 주고, 기간 밖이면 막는다', async () => {
    await fill();
    await change('bill-household-kwh', '200');
    await change('bill-month', '2026-10');
    const status = document.getElementById('home-energy-bill-heading')!.parentElement!;
    expect(status.textContent).toContain('31,220원');
    expect(status.textContent).toContain('70,640원');
    expect(status.textContent).toContain('+39,420원');
    expect(status.textContent).toContain('200kWh 이하 구간에서 201~400kWh 구간으로');
    expect(status.textContent).toContain('계산값');
    expect(status.textContent).toContain('2026-10-01~2026-12-31');

    await change('bill-month', '2026-09');
    expect(status.textContent).toContain('요금표 갱신 필요');
    expect(status.textContent).not.toContain('39,420원');

    await change('bill-month', '2026-10');
    await change('bill-household-kwh', '350.5');
    expect(document.getElementById('bill-household-kwh')?.getAttribute('aria-invalid')).toBe('true');
    expect(document.getElementById('bill-household-kwh-error')?.textContent).toContain('소수점 없이');
  });

  it('여러 기록을 저장·삭제하고 값 종류 태그를 유지한 JSON으로 내보낸다', async () => {
    await fill();
    await change('bill-household-kwh', '200');
    await change('bill-month', '2026-10');
    await click(button('이 기록 저장'));
    expect(text()).toContain('이 기록을 브라우저에 저장했습니다');
    await change('measured-device', '정수기');
    await change('measured-kwh', '3');
    await change('measured-days', '7');
    await change('energy-model', 'WPU-A710C');
    await click(button('이 기록 저장'));
    expect(stored()).toHaveLength(2);
    expect(stored()[0]).toMatchObject({ device: '정수기', declared: { kind: 'official-test', modelNumber: 'WPU-A710C' } });
    expect(stored()[1]).toMatchObject({ device: '거실 에어컨', measuredKwh: { kind: 'measured', value: 35 }, bill: { differenceWon: { kind: 'calculated', value: 39420 }, householdKwh: { kind: 'entered', value: 200 } } });
    const saved = document.getElementById('home-energy-saved-heading')!.parentElement!;
    expect(saved.textContent).toContain('2개');
    expect(saved.textContent).toContain('+39,420원');
    expect(saved.textContent).toContain('사용자 실측');
    expect(saved.textContent).toContain('공식 시험값');

    const blobs: Blob[] = [];
    Object.assign(URL, { createObjectURL: vi.fn((blob: Blob) => { blobs.push(blob); return 'blob:test'; }), revokeObjectURL: vi.fn() });
    const anchorClick = vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => {});
    await click(button('JSON으로 내보내기'));
    expect(anchorClick).toHaveBeenCalledTimes(1);
    const exported = JSON.parse(await readBlob(blobs[0]));
    expect(exported.records).toHaveLength(2);
    expect(exported.records[1].normalizedKwh).toEqual({ kind: 'calculated', value: 150 });
    expect(exported.valueKinds.measured).toBe('사용자 실측');
    expect(saved.textContent).toContain('JSON 파일로 내보냈습니다');

    await click(saved.querySelector('button[aria-label^="거실 에어컨"]'));
    expect(stored()).toHaveLength(1);
    expect(saved.textContent).toContain('기록을 삭제했습니다');
    await click(saved.querySelector('button[aria-label$="기록 삭제"]'));
    expect(stored()).toEqual([]);
    expect(saved.textContent).toContain('아직 저장한 기록이 없습니다');
  });

  it('브라우저 저장이 막히면 안내하고, 파일 내보내기가 안 되면 JSON을 직접 복사할 수 있게 한다', async () => {
    await fill();
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { throw new Error('QuotaExceededError'); });
    await click(button('이 기록 저장'));
    expect(text()).toContain('브라우저에 저장하지 못했습니다');
    expect(window.localStorage.getItem(HOME_ENERGY_STORAGE_KEY)).toBeNull();
    vi.restoreAllMocks();

    await click(button('이 기록 저장'));
    Object.assign(URL, { createObjectURL: () => { throw new Error('unsupported'); } });
    await click(button('JSON으로 내보내기'));
    expect(text()).toContain('파일로 내보내지 못했습니다');
    const fallback = document.querySelector('textarea[aria-label="직접 복사할 기록 JSON"]') as HTMLTextAreaElement;
    expect(JSON.parse(fallback.value).records[0].measuredKwh).toEqual({ kind: 'measured', value: 35 });
  });
});
