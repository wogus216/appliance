// @vitest-environment jsdom
import { act, createElement } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { HouseholdCareTool } from '@/components/tools/household-care-tool';
import { NOTEBOOK_KEY, PREVIOUS_NOTEBOOK_KEY, newNotebookProduct, importNotebookText } from '@/lib/appliance-notebook';
import { CARE_PLAN_PRODUCTS } from '@/lib/data/care-plan';
import { saveRepairHandoff } from '@/lib/repair-handoff';

Object.assign(globalThis, { IS_REACT_ACT_ENVIRONMENT: true });
let root: Root | undefined;
async function mount() {
  document.body.innerHTML = '<div id="test-root"></div>';
  root = createRoot(document.getElementById('test-root')!);
  await act(async () => { root!.render(createElement(HouseholdCareTool, { products: CARE_PLAN_PRODUCTS })); });
}
async function unmount() { if (root) await act(async () => { root!.unmount(); }); root = undefined; }
afterEach(async () => { await unmount(); localStorage.clear(); sessionStorage.clear(); vi.restoreAllMocks(); });
async function change(id: string, value: string) {
  const element = document.getElementById(id)!;
  const prototype = element instanceof HTMLTextAreaElement ? HTMLTextAreaElement.prototype : element instanceof HTMLSelectElement ? HTMLSelectElement.prototype : HTMLInputElement.prototype;
  await act(async () => {
    Object.getOwnPropertyDescriptor(prototype, 'value')!.set!.call(element, value);
    element.dispatchEvent(new Event('input', { bubbles: true })); element.dispatchEvent(new Event('change', { bubbles: true }));
  });
}
async function click(name: string) { await act(async () => { [...document.querySelectorAll('button')].find((button) => button.textContent === name)!.click(); }); }
const stored = () => JSON.parse(localStorage.getItem(NOTEBOOK_KEY)!);
const oldProduct = { ...newNotebookProduct('p1', 'WF24A9500KE'), purchaseDate: '2025-01-01', repairs: [{ id: 'r1', date: '2026-01-01', description: '배수 펌프 실제 교체', costWon: 100000 }] };
function seed() {
  const raw = JSON.stringify({ version: 2, care: [], products: [oldProduct] });
  localStorage.setItem(PREVIOUS_NOTEBOOK_KEY, raw); return raw;
}

describe('제품별 상담 기록 저장 흐름', () => {
  it('전달 메모를 명시적으로 저장하고 재방문해 답변을 추가·내보내기·삭제한다', async () => {
    const oldRaw = seed();
    saveRepairHandoff(sessionStorage, { version: 1, destination: 'notebook', createdAt: Date.now(), model: 'WF24A9500KE', summary: '배수 호스 확인 뒤에도 E4가 반복됩니다. 출장 진단 비용을 문의합니다.' });
    await mount();
    expect(localStorage.getItem(NOTEBOOK_KEY)).toBeNull();
    await click('이 모델에 상담 메모 저장');
    expect(stored().products).toHaveLength(1);
    expect(stored().products[0]).toMatchObject({ purchaseDate: oldProduct.purchaseDate, repairs: oldProduct.repairs, consultations: [{ answer: '', summary: expect.stringContaining('출장 진단 비용') }] });
    expect(localStorage.getItem(PREVIOUS_NOTEBOOK_KEY)).toBe(oldRaw);
    await unmount(); await mount();
    expect(document.body.textContent).toContain('출장 진단 비용');
    expect(document.getElementById('notebook-consultation')).toBeNull();
    await click('상담 기록 수정');
    await change('nb-p1-consultation-contact', '제조사 고객센터');
    await change('nb-p1-consultation-answer', '방문 후 견적 안내. 출장비는 보증 적용 확인 필요.');
    await click('상담 기록 저장');
    expect(stored().products[0].consultations[0].answer).toContain('출장비');
    expect(stored().products[0].repairs).toEqual(oldProduct.repairs);
    const blobs: Blob[] = [];
    Object.assign(URL, { createObjectURL: vi.fn((blob: Blob) => { blobs.push(blob); return 'blob:qa'; }), revokeObjectURL: vi.fn() });
    vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => {});
    await click('JSON 파일로 내보내기');
    const imported = importNotebookText(await blobs[0].text(), CARE_PLAN_PRODUCTS);
    expect(imported).toMatchObject({ kind: 'ok', notebook: { products: [{ consultations: [{ answer: expect.stringContaining('출장비') }] }] } });
    await click('상담 기록 삭제');
    expect(stored().products[0].consultations).toEqual([]);
    expect(stored().products[0].repairs).toEqual(oldProduct.repairs);
  });

  it('제품이 없는 지원 모델은 제품과 상담을 함께 저장하고 중복 저장을 막는다', async () => {
    saveRepairHandoff(sessionStorage, { version: 1, destination: 'notebook', createdAt: Date.now(), model: 'wf24a9500ke', summary: '설치 여유와 출장비를 문의할 예정' });
    await mount();
    await click('이 모델에 상담 메모 저장');
    expect(stored().products).toHaveLength(1);
    expect(stored().products[0].modelNumber).toBe('WF24A9500KE');
    expect(stored().products[0].consultations).toHaveLength(1);
    expect(stored().products[0].repairs).toEqual([]);
    expect([...document.querySelectorAll('button')].find((button) => button.textContent === '이 상담 메모 저장됨')?.disabled).toBe(true);
  });

  it('저장 실패 시 기존 제품과 원본을 유지하며 작성 중인 답변을 지우지 않는다', async () => {
    const oldRaw = seed();
    await mount();
    await click('상담 기록 작성');
    await change('nb-p1-consultation-summary', '견적에서 설치비가 빠졌는지 질문');
    await change('nb-p1-consultation-answer', '추가 확인 예정');
    const set = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { throw new Error('quota'); });
    await click('상담 기록 저장');
    expect(document.body.textContent).toContain('상담 기록을 저장하지 못했습니다');
    expect((document.getElementById('nb-p1-consultation-answer') as HTMLTextAreaElement).value).toBe('추가 확인 예정');
    expect(localStorage.getItem(NOTEBOOK_KEY)).toBeNull();
    expect(localStorage.getItem(PREVIOUS_NOTEBOOK_KEY)).toBe(oldRaw);
    set.mockRestore();
    await click('상담 기록 저장');
    expect(stored().products[0].consultations).toHaveLength(1);
  });
});
