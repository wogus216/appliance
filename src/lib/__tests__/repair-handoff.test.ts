// @vitest-environment jsdom
import { act, createElement } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { RepairReplaceTool } from '@/components/tools/repair-replace-tool';
import { ApplianceNotebook } from '@/components/tools/appliance-notebook';
import { ErrorActionCard } from '@/components/error-codes/action-card';
import { CARE_PLAN_PRODUCTS } from '@/lib/data/care-plan';
import { CUCKOO_E4_ACTION_GUIDE } from '@/lib/data/error-codes/action-guides';
import { buildErrorActionSummary } from '@/lib/error-action';
import { newNotebookProduct } from '@/lib/appliance-notebook';
import { REPAIR_HANDOFF_KEY, REPAIR_HANDOFF_TTL, consumeRepairHandoff, parseRepairHandoff, repairNotebookModel, saveRepairHandoff, type RepairHandoff } from '@/lib/repair-handoff';

const push = vi.fn();
vi.mock('next/navigation', () => ({ useRouter: () => ({ push }), useSearchParams: () => new URLSearchParams() }));
Object.assign(globalThis, { IS_REACT_ACT_ENVIRONMENT: true });
const summary = buildErrorActionSummary(CUCKOO_E4_ACTION_GUIDE, { model: 'unknown-model', safety: 'clear', outcome: 'cleared', observation: '문 앞 물', timing: '오늘 아침', tried: '작동 중단', temperature: 'unknown' }, 'https://salimlab.kr');
const draft = (destination: RepairHandoff['destination'] = 'repair'): RepairHandoff => ({ version: 1, destination, createdAt: Date.now(), model: 'unknown-model', summary });
let root: Root | undefined;
async function mount(element: React.ReactElement) {
  document.body.innerHTML = '<div id="root"></div>';
  root = createRoot(document.getElementById('root')!);
  await act(async () => { root!.render(element); });
}
afterEach(async () => {
  if (root) await act(async () => root!.unmount());
  root = undefined;
  window.sessionStorage.clear();
  push.mockClear();
  vi.restoreAllMocks();
});

describe('상담 → 수리 비교 → 수첩의 일회용 초안', () => {
  it('상담 기록을 만든 것만으로 전달하지 않고 사용자가 링크를 눌러야 같은 탭 초안을 쓴다', async () => {
    await mount(createElement(ErrorActionCard, { guide: CUCKOO_E4_ACTION_GUIDE }));
    const input = document.querySelector('input[type="text"]') as HTMLInputElement;
    await act(async () => {
      Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')!.set!.call(input, 'CDW-A0611TW');
      input.dispatchEvent(new Event('input', { bubbles: true }));
      document.querySelector('form')!.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    });
    expect(window.sessionStorage.getItem(REPAIR_HANDOFF_KEY)).toBeNull();
    const link = [...document.querySelectorAll('a')].find((node) => node.textContent === '이 상담으로 수리·교체 비교')!;
    // 실제 이동은 공통 브라우저 점검에서 확인한다. 여기서는 클릭 직전 전달 계약을 검사한다.
    document.addEventListener('click', (event) => event.preventDefault(), { once: true, capture: true });
    await act(async () => { link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true })); });
    const received = consumeRepairHandoff(window.sessionStorage, 'repair');
    expect(received.kind).toBe('ready');
    if (received.kind === 'ready') {
      expect(received.draft.model).toBe('CDW-A0611TW');
      expect(received.draft.summary).toContain('쿠쿠 식기세척기 E4');
    }
    expect(link.getAttribute('href')).toBe('/tools/repair-replace');
  });

  it('만료·미래·잘못된 형식·초과 길이를 거부하고 알 수 없는 확인 상태는 버린다', () => {
    const valid = draft();
    for (const value of [{ ...valid, createdAt: Date.now() - REPAIR_HANDOFF_TTL - 1 }, { ...valid, createdAt: Date.now() + 1000 }, { ...valid, version: 2 }, { ...valid, model: 'a'.repeat(101) }, { ...valid, summary: 'a'.repeat(12_001) }]) {
      expect(parseRepairHandoff(JSON.stringify(value), 'repair')).toBeUndefined();
    }
    expect(parseRepairHandoff('{broken', 'repair')).toBeUndefined();
    expect(parseRepairHandoff(JSON.stringify({ ...valid, diagnosisConfirmed: true, warranty: 'covered' }), 'repair')).toEqual(valid);
  });

  it('다른 목적지에서는 소비하지 않고 해당 화면에서 한 번만 읽는다', () => {
    saveRepairHandoff(window.sessionStorage, draft('notebook'));
    expect(consumeRepairHandoff(window.sessionStorage, 'repair').kind).toBe('none');
    expect(window.sessionStorage.getItem(REPAIR_HANDOFF_KEY)).not.toBeNull();
    expect(consumeRepairHandoff(window.sessionStorage, 'notebook').kind).toBe('ready');
    expect(consumeRepairHandoff(window.sessionStorage, 'notebook').kind).toBe('none');
    window.sessionStorage.setItem(REPAIR_HANDOFF_KEY, '{broken');
    expect(consumeRepairHandoff(window.sessionStorage, 'repair').kind).toBe('invalid');
    expect(window.sessionStorage.getItem(REPAIR_HANDOFF_KEY)).toBeNull();
  });

  it('저장소가 막히면 예외를 넘기거나 기존 수첩을 수정하지 않는다', () => {
    const blocked = { getItem() { throw Error('blocked'); }, setItem() { throw Error('blocked'); }, removeItem() { throw Error('blocked'); } };
    expect(saveRepairHandoff(blocked, draft())).toBe(false);
    expect(consumeRepairHandoff(blocked, 'repair').kind).toBe('blocked');
  });

  it('모델은 이어 받되 설명서 적용 미확인·표시 사라짐을 진단 또는 보증 확인으로 바꾸지 않는다', async () => {
    saveRepairHandoff(window.sessionStorage, draft());
    await mount(createElement(RepairReplaceTool));
    expect((document.getElementById('repair-model') as HTMLInputElement).value).toBe('unknown-model');
    expect((document.getElementById('repair-warranty') as HTMLSelectElement).value).toBe('unknown');
    expect([...document.querySelectorAll('input[type="checkbox"]')].every((node) => !(node as HTMLInputElement).checked)).toBe(true);
    const memo = (document.getElementById('repair-consultation') as HTMLTextAreaElement).value;
    expect(memo).toContain('설명서 적용: 미확인');
    expect(memo).toContain('정상·수리 완료 여부는 미확인');
    expect(memo).toContain('문 앞 물');
    expect(window.sessionStorage.getItem(REPAIR_HANDOFF_KEY)).toBeNull();
    expect(window.location.search).toBe('');
  });

  it('수첩 이동도 명시적인 동작으로만 초안을 쓰고 확인 상태·금액은 넘기지 않는다', async () => {
    saveRepairHandoff(window.sessionStorage, draft());
    await mount(createElement(RepairReplaceTool));
    expect(window.sessionStorage.getItem(REPAIR_HANDOFF_KEY)).toBeNull();
    const button = [...document.querySelectorAll('button')].find((node) => node.textContent === '상담 메모와 제품을 수첩에서 이어 보기')!;
    await act(async () => button.click());
    expect(push).toHaveBeenCalledWith('/tools/household-care#notebook-heading');
    const received = consumeRepairHandoff(window.sessionStorage, 'notebook');
    expect(received.kind).toBe('ready');
    if (received.kind === 'ready') expect(Object.keys(received.draft).sort()).toEqual(['createdAt', 'destination', 'model', 'summary', 'version']);
  });

  it('비교표 모델을 수정해도 원래 상담을 다른 모델의 수첩에 연결하지 않는다', async () => {
    saveRepairHandoff(window.sessionStorage, draft());
    await mount(createElement(RepairReplaceTool));
    const change = async (id: string, value: string) => {
      const node = document.getElementById(id) as HTMLInputElement;
      await act(async () => {
        Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')!.set!.call(node, value);
        node.dispatchEvent(new Event('input', { bubbles: true }));
      });
    };
    await change('repair-model', 'WF24A9500KE');
    await change('repair-quote', '100000');
    await change('replacement-price', '900000');
    expect((document.getElementById('repair-model') as HTMLInputElement).value).toBe('WF24A9500KE');
    expect(document.body.textContent).toContain('원래 모델(unknown-model)의 기록');
    expect((document.getElementById('repair-consultation') as HTMLTextAreaElement).value).toBe(summary);
    const writeText = vi.fn<(text: string) => Promise<void>>().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText } });
    await act(async () => [...document.querySelectorAll('button')].find((node) => node.textContent === '기록 복사')!.click());
    expect(writeText.mock.calls[0][0]).toContain('제품: WF24A9500KE');
    expect(writeText.mock.calls[0][0]).toContain('원래 모델(unknown-model)의 기록');
    await act(async () => [...document.querySelectorAll('button')].find((node) => node.textContent === '상담 메모와 제품을 수첩에서 이어 보기')!.click());
    const received = consumeRepairHandoff(window.sessionStorage, 'notebook');
    expect(received.kind).toBe('ready');
    if (received.kind === 'ready') {
      expect(received.draft.model).toBe('unknown-model');
      expect(received.draft.summary).toBe(summary);
      expect(repairNotebookModel(received.draft.model, CARE_PLAN_PRODUCTS)).toBeUndefined();
    }
  });

  it('지원 모델을 미리 선택해도 기존 기록을 자동 저장·덮어쓰기·중복 추가하지 않는다', async () => {
    const existing = newNotebookProduct('existing', 'WF24A9500KE');
    existing.purchaseDate = '2025-01-01';
    existing.repairs = [{ id: 'r1', date: '2026-01-01', description: '배수 펌프 교체', costWon: 100000 }];
    const onChange = vi.fn(() => true);
    saveRepairHandoff(window.sessionStorage, { ...draft('notebook'), model: ' wf24a9500ke ' });
    await mount(createElement(ApplianceNotebook, { catalog: CARE_PLAN_PRODUCTS, products: [existing], today: '2026-11-01', newId: () => 'new', onChange }));
    expect((document.getElementById('notebook-model') as HTMLSelectElement).value).toBe('WF24A9500KE');
    expect(document.body.textContent).toContain('이 모델은 이미 수첩에 있습니다');
    expect(onChange).not.toHaveBeenCalled();
    await act(async () => [...document.querySelectorAll('button')].find((node) => node.textContent === '수첩에 추가')!.click());
    expect(onChange).not.toHaveBeenCalled();
    expect(existing.repairs[0].description).toBe('배수 펌프 교체');
    expect(existing.purchaseDate).toBe('2025-01-01');
  });

  it('미지원 모델을 비슷한 모델로 대체하지 않고 상담 메모를 남긴다', async () => {
    expect(repairNotebookModel('WF24A9500KE-extra', CARE_PLAN_PRODUCTS)).toBeUndefined();
    const onChange = vi.fn(() => true);
    saveRepairHandoff(window.sessionStorage, draft('notebook'));
    await mount(createElement(ApplianceNotebook, { catalog: CARE_PLAN_PRODUCTS, products: [], today: '2026-11-01', newId: () => 'new', onChange }));
    expect((document.getElementById('notebook-model') as HTMLSelectElement).value).toBe('');
    expect((document.getElementById('notebook-consultation') as HTMLTextAreaElement).value).toBe(summary);
    expect(document.body.textContent).toContain('수첩의 지원 목록에 없습니다');
    expect(onChange).not.toHaveBeenCalled();
  });

  it('임시 메모 복사는 원문만 복사하고 수첩·수리 이력으로 저장하지 않는다', async () => {
    saveRepairHandoff(window.sessionStorage, draft('notebook'));
    const onChange = vi.fn(() => true);
    const setItem = vi.spyOn(Storage.prototype, 'setItem');
    const writeText = vi.fn<(text: string) => Promise<void>>().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText } });
    await mount(createElement(ApplianceNotebook, { catalog: CARE_PLAN_PRODUCTS, products: [], today: '2026-11-01', newId: () => 'new', onChange }));
    expect(document.body.textContent).toContain('별도로 저장하지 않으면 새로고침하거나 다시 방문할 때 이 임시 메모는 사라집니다');
    await act(async () => [...document.querySelectorAll('button')].find((node) => node.textContent === '상담 메모 복사')!.click());
    expect(writeText).toHaveBeenCalledWith(summary);
    expect(document.body.textContent).toContain('상담 메모를 복사했습니다');
    expect(onChange).not.toHaveBeenCalled();
    expect(setItem).not.toHaveBeenCalled();
  });

  it('복사가 막혀도 원문을 직접 선택할 수 있고 실패 이유와 파일 대안을 알려 준다', async () => {
    saveRepairHandoff(window.sessionStorage, draft('notebook'));
    Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: vi.fn().mockRejectedValue(new Error('blocked')) } });
    await mount(createElement(ApplianceNotebook, { catalog: CARE_PLAN_PRODUCTS, products: [], today: '2026-11-01', newId: () => 'new', onChange: () => true }));
    await act(async () => [...document.querySelectorAll('button')].find((node) => node.textContent === '상담 메모 복사')!.click());
    expect(document.body.textContent).toContain('자동 복사에 실패했습니다. 위 원문을 직접 선택해 복사하거나 텍스트 파일로 저장하세요');
    const original = document.getElementById('notebook-consultation') as HTMLTextAreaElement;
    expect(original.value).toBe(summary);
    expect(original.readOnly).toBe(true);
    expect(original.disabled).toBe(false);
  });

  it('텍스트 파일은 원래 모델·증상·근거 원문을 그대로 담고 영구 수첩 기록을 만들지 않는다', async () => {
    saveRepairHandoff(window.sessionStorage, draft('notebook'));
    const onChange = vi.fn(() => true);
    const setItem = vi.spyOn(Storage.prototype, 'setItem');
    const blobs: Blob[] = [];
    Object.assign(URL, { createObjectURL: vi.fn((blob: Blob) => { blobs.push(blob); return 'blob:consultation'; }), revokeObjectURL: vi.fn() });
    const downloaded: { filename: string; href: string }[] = [];
    vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(function (this: HTMLAnchorElement) { downloaded.push({ filename: this.download, href: this.href }); });
    await mount(createElement(ApplianceNotebook, { catalog: CARE_PLAN_PRODUCTS, products: [], today: '2026-11-01', newId: () => 'new', onChange }));
    await act(async () => [...document.querySelectorAll('button')].find((node) => node.textContent === '상담 메모 텍스트 파일 저장')!.click());
    expect(await blobs[0].text()).toBe(summary);
    expect(blobs[0].type).toBe('text/plain;charset=utf-8');
    expect(downloaded).toEqual([{ filename: 'salimlab-consultation-memo.txt', href: 'blob:consultation' }]);
    expect(document.body.textContent).toContain('텍스트 파일 다운로드를 시작했습니다');
    expect(onChange).not.toHaveBeenCalled();
    expect(setItem).not.toHaveBeenCalled();
  });

  it('파일 생성 실패 시 원문을 유지하고 수동 복사 방법을 알린다', async () => {
    saveRepairHandoff(window.sessionStorage, draft('notebook'));
    Object.assign(URL, { createObjectURL: vi.fn(() => { throw Error('blocked'); }) });
    await mount(createElement(ApplianceNotebook, { catalog: CARE_PLAN_PRODUCTS, products: [], today: '2026-11-01', newId: () => 'new', onChange: () => true }));
    await act(async () => [...document.querySelectorAll('button')].find((node) => node.textContent === '상담 메모 텍스트 파일 저장')!.click());
    expect(document.body.textContent).toContain('텍스트 파일을 만들지 못했습니다. 위 원문을 직접 선택해 복사하세요');
    expect((document.getElementById('notebook-consultation') as HTMLTextAreaElement).value).toBe(summary);
  });
});
