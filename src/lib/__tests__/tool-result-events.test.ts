// @vitest-environment jsdom
import { act, createElement, type ReactElement } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { trackToolResult } from '@/lib/analytics';
import { ErrorActionCard } from '@/components/error-codes/action-card';
import { CarePlanTool } from '@/components/tools/care-plan-tool';
import { DishwasherFitTool } from '@/components/tools/dishwasher-fit-tool';
import { FridgeFitTool } from '@/components/tools/fridge-fit-tool';
import { HomeEnergyTool } from '@/components/tools/home-energy-tool';
import { HouseholdCareTool } from '@/components/tools/household-care-tool';
import { InstallCheckTool } from '@/components/tools/install-check-tool';
import { RepairReplaceTool } from '@/components/tools/repair-replace-tool';
import { WaterPurifierCostTool } from '@/components/tools/water-purifier-cost-tool';
import { CARE_PLAN_PRODUCTS } from '@/lib/data/care-plan';
import { CUCKOO_E4_ACTION_GUIDE } from '@/lib/data/error-codes/action-guides';
import { FRIDGE_FIT_PRODUCTS } from '@/lib/data/fridge-installation';
import { INSTALL_MODELS } from '@/lib/data/install-check';

/**
 * 각 도구에서 "결과 도달"이 언제인지를 고정한다. 정의는 docs/salimlab-tools-entry-measure-2026-10-30.md.
 * 빈 화면과 입력 오류에서는 보내지 않고, 결과가 다시 계산돼도 한 화면에 한 번만 보낸다.
 */
vi.mock('next/navigation', () => ({ useRouter: () => ({ replace: vi.fn() }), useSearchParams: () => new URLSearchParams(window.location.search) }));
vi.mock('@/lib/analytics', () => ({ trackToolResult: vi.fn() }));
Object.assign(globalThis, { IS_REACT_ACT_ENVIRONMENT: true });

const sent = vi.mocked(trackToolResult);
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
  sent.mockClear();
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

describe('도구 결과 이벤트', () => {
  it('수리·교체: 두 금액이 맞게 들어왔을 때 한 번만 보낸다', async () => {
    await mount(createElement(RepairReplaceTool));
    await change('repair-quote', '180000');
    await change('replacement-price', '1,5');
    expect(sent).not.toHaveBeenCalled();
    await change('replacement-price', '890000');
    await change('replacement-price', '900000');
    expect(sent.mock.calls).toEqual([['repair-replace']]);
  });

  it('관리 일정표: 다음 확인일이 나왔을 때 보낸다', async () => {
    await mount(createElement(CarePlanTool, { products: CARE_PLAN_PRODUCTS }));
    await change('care-model', 'CHPI-7400N');
    await change('care-item', 'outlet');
    expect(sent).not.toHaveBeenCalled();
    await change('care-last-date', '2026-10-25');
    expect(sent.mock.calls).toEqual([['care-plan']]);
  });

  it('전력 기록: 30일 환산치가 나왔을 때 보낸다', async () => {
    await mount(createElement(HomeEnergyTool));
    await change('measured-kwh', '10');
    expect(sent).not.toHaveBeenCalled();
    await change('measured-days', '7');
    expect(sent.mock.calls).toEqual([['home-energy']]);
  });

  it('정수기 비용: 모델과 계약 조건을 골라 합계가 나왔을 때 보낸다', async () => {
    await mount(createElement(WaterPurifierCostTool));
    await change('cost-model', 'CHPI-7400N');
    await change('cost-plan', 'visit4-y7');
    expect(sent.mock.calls).toEqual([['water-purifier-cost']]);
  });

  it('냉장고: 우리 집 실측값을 비교했을 때 보내고, 예시 주방을 둘러보기만 하면 보내지 않는다', async () => {
    window.history.replaceState(null, '', '/tools/fridge-fit?model=T873MEE111');
    await mount(createElement(FridgeFitTool, { products: FRIDGE_FIT_PRODUCTS }));
    await click(document.querySelector('input[name="fit-scene"][value="compact"]'));
    expect(sent).not.toHaveBeenCalled();
    await click(document.querySelector('input[name="fit-scene"][value="own"]'));
    await change('fit-spaceWidth', '1100');
    expect(sent.mock.calls).toEqual([['fridge-fit']]);
  });

  it('식기세척기: 잰 값을 비교했을 때 보내고, 확인 필요 칸만 있는 처음 화면에서는 보내지 않는다', async () => {
    await mount(createElement(DishwasherFitTool));
    await change('dishwasher-model', 'DWA-81R0D');
    expect(sent).not.toHaveBeenCalled();
    await change('dishwasher-width', '700');
    expect(sent.mock.calls).toEqual([['dishwasher-fit']]);
  });

  it('설치 공간: 잰 값을 비교했을 때 보낸다', async () => {
    window.history.replaceState(null, '', '/tools/install-check?category=washer&model=WF24A9500KE');
    await mount(createElement(InstallCheckTool, { models: INSTALL_MODELS }));
    expect(sent).not.toHaveBeenCalled();
    const field = document.querySelector('input[id^="install-"][inputmode="decimal"]')!;
    await change(field.id, '700');
    expect(sent.mock.calls).toEqual([['install-check']]);
  });

  it('가전 수첩: 빈 목록에서는 보내지 않고, 항목이 생기면 보낸다', async () => {
    await mount(createElement(HouseholdCareTool, { products: CARE_PLAN_PRODUCTS }));
    expect(sent).not.toHaveBeenCalled();
    await change('household-model', 'CHPI-7400N');
    await change('household-item', 'outlet');
    await change('household-date', '2026-01-02');
    await click(button('목록에 추가'));
    expect(sent.mock.calls).toEqual([['household-care']]);
  });

  it('행동 카드: 상담 기록을 만들었을 때 보내고, 이어서 쓸 도구를 잇는다', async () => {
    await mount(createElement(ErrorActionCard, { guide: CUCKOO_E4_ACTION_GUIDE, sectionId: 'card' }));
    expect(sent).not.toHaveBeenCalled();
    expect(document.querySelector('a[href="/tools/repair-replace"]')).toBeNull();
    await click(button('다음 행동과 상담 기록 만들기'));
    await click(button('다음 행동과 상담 기록 만들기'));
    expect(sent.mock.calls).toEqual([['error-action-card']]);
    expect(document.querySelector('a[href="/tools/repair-replace"]')).not.toBeNull();
  });
});
