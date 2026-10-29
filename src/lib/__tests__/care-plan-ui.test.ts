// @vitest-environment jsdom
import { act, createElement } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { CarePlanTool } from '@/components/tools/care-plan-tool';
import { CARE_PLAN_PRODUCTS } from '@/lib/data/care-plan';

vi.mock('next/navigation', () => ({ useSearchParams: () => new URLSearchParams(window.location.search) }));
Object.assign(globalThis, { IS_REACT_ACT_ENVIRONMENT: true });

function change(id: string, value: string) {
  const element = document.getElementById(id) as HTMLInputElement | HTMLSelectElement;
  const prototype = element instanceof HTMLSelectElement ? HTMLSelectElement.prototype : HTMLInputElement.prototype;
  Object.getOwnPropertyDescriptor(prototype, 'value')!.set!.call(element, value);
  element.dispatchEvent(new Event('input', { bubbles: true }));
  element.dispatchEvent(new Event('change', { bubbles: true }));
}

describe('관리 일정 실제 입력 흐름', () => {
  let root: Root;
  beforeEach(async () => {
    window.history.replaceState(null, '', '/tools/care-plan');
    document.body.innerHTML = '<div id="test-root"></div>';
    root = createRoot(document.getElementById('test-root')!);
    await act(async () => { root.render(createElement(CarePlanTool, { products: CARE_PLAN_PRODUCTS })); });
  });
  afterEach(async () => {
    await act(async () => { root.unmount(); });
    vi.restoreAllMocks();
  });

  it('정확 모델·항목을 고르면 관리일로 계산하고 주소에는 모델만 남긴다', async () => {
    await act(async () => { change('care-model', 'CHPI-7400N'); });
    expect(window.location.search).toBe('?model=CHPI-7400N');
    await act(async () => { change('care-item', 'outlet'); });
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    await act(async () => { change('care-last-date', `${year}-${month}-${day}`); });
    expect(document.getElementById('care-plan-result')!.textContent).toContain('출수구');
    expect(document.getElementById('care-plan-result')!.textContent).toContain('출수구 주 1회 청소 안내');
    expect(document.getElementById('care-plan-result')!.querySelector('time')).not.toBeNull();
    expect(window.location.search).not.toContain('date');
  });

  it('주기가 없는 제품은 날짜를 직접 정하고 모델 변경 시 기존 입력을 지운다', async () => {
    await act(async () => { change('care-model', 'CHPI-7400N'); });
    await act(async () => { change('care-item', 'outlet'); });
    await act(async () => { change('care-model', 'HT08'); });
    expect((document.getElementById('care-item') as HTMLSelectElement).value).toBe('');
    expect(document.getElementById('care-last-date')).toBeNull();
    await act(async () => { change('care-item', 'anc'); });
    expect(document.getElementById('care-chosen-date')).not.toBeNull();
    expect(document.getElementById('care-plan-result')!.textContent).toContain('직접 정하세요');
  });

  it('직접 정한 날짜를 달력 파일·인쇄·복사 대안으로 내보낸다', async () => {
    await act(async () => { change('care-model', 'CHPI-7400N'); });
    await act(async () => { change('care-item', 'icebin'); });
    const now = new Date();
    const date = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    await act(async () => { change('care-chosen-date', date); });
    const buttons = [...document.querySelectorAll<HTMLButtonElement>('#care-plan-result button')];
    const button = (label: string) => buttons.find((entry) => entry.textContent === label)!;
    const blobUrl = vi.fn(() => 'blob:test');
    Object.defineProperty(URL, 'createObjectURL', { value: blobUrl, configurable: true });
    Object.defineProperty(URL, 'revokeObjectURL', { value: vi.fn(), configurable: true });
    let fileName = '';
    vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(function (this: HTMLAnchorElement) { fileName = this.download; });
    await act(async () => { button('달력 파일 저장').click(); });
    expect(fileName).toBe('salimlab-coway-handpick-water-purifier-compact-icebin.ics');
    expect(blobUrl).toHaveBeenCalledOnce();
    const print = vi.spyOn(window, 'print').mockImplementation(() => {});
    await act(async () => { button('인쇄하기').click(); });
    expect(print).toHaveBeenCalledOnce();
    await act(async () => { button('일정 내용 복사').click(); });
    expect((document.querySelector('textarea[aria-label="직접 복사할 관리 일정"]') as HTMLTextAreaElement).value).toContain('공식 고정 주기 아님');
  });
});
