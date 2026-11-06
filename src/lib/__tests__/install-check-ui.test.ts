// @vitest-environment jsdom
import { act, createElement } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { InstallCheckTool } from '@/components/tools/install-check-tool';
import { INSTALL_MODELS } from '@/lib/data/install-check';
import { localDateLabel } from '@/lib/value-kind';
import { installConsultationRecord } from '@/lib/install-check';

const replace = vi.hoisted(() => vi.fn());
vi.mock('next/navigation', () => ({ useRouter: () => ({ replace }), useSearchParams: () => new URLSearchParams(window.location.search) }));
Object.assign(globalThis, { IS_REACT_ACT_ENVIRONMENT: true });

let root: Root | undefined;
async function mount(url: string) {
  window.history.replaceState(null, '', url);
  document.body.innerHTML = '<div id="test-root"></div>';
  root = createRoot(document.getElementById('test-root')!);
  await act(async () => { root!.render(createElement(InstallCheckTool, { models: INSTALL_MODELS })); });
}
afterEach(async () => {
  if (root) await act(async () => { root!.unmount(); });
  root = undefined;
  replace.mockClear();
  vi.restoreAllMocks();
});

async function change(id: string, value: string) {
  const element = document.getElementById(id) as HTMLInputElement | HTMLSelectElement;
  if (!element) throw new Error(`no #${id}`);
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
const radio = (value: string) => document.querySelector(`input[name="install-category"][value="${value}"]`) as HTMLInputElement;
const button = (name: string) => [...document.querySelectorAll('button')].find((b) => b.textContent?.trim() === name);
const valueOf = (id: string) => (document.getElementById(id) as HTMLInputElement | HTMLSelectElement | null)?.value;
const resultCard = () => document.getElementById('install-result-heading')!.parentElement!.textContent!;
const summaryCard = () => document.getElementById('install-summary-heading')!.closest('section')!;

describe('설치 공간 확인표: 품목·모델 고르기', () => {
  it('주소의 품목·모델을 복원하고, 품목을 바꾸면 입력 칸과 주소가 그 품목으로 바뀐다', async () => {
    await mount('/tools/install-check?category=aircon&model=CTH06QBW');
    expect(radio('aircon').checked).toBe(true);
    expect(valueOf('install-model')).toBe('CTH06QBW');
    expect(document.getElementById('install-indoorWidth')).not.toBeNull();
    expect(document.getElementById('install-threshold')).toBeNull();
    await click(radio('robot'));
    expect(valueOf('install-model')).toBe('RO585HGH');
    expect(document.getElementById('install-indoorWidth')).toBeNull();
    expect(document.getElementById('install-threshold')).not.toBeNull();
    expect(replace).toHaveBeenLastCalledWith('/tools/install-check?category=robot&model=RO585HGH', { scroll: false });
    expect(document.body.textContent).toContain('공식 설치 설명서를 찾지 못함');
  });

  it('같은 품목에서 모델을 바꾸면 같은 치수로 다시 계산하고, 품목별 치수는 따로 남는다', async () => {
    await mount('/tools/install-check?category=washer&model=WF24A9500KE');
    await change('install-width', '750');
    await change('install-height', '1000');
    expect(resultCard()).toContain('기준보다 16mm 큼');
    expect(resultCard()).toContain('이 차이는 본체만 비교했습니다');
    await change('install-model', 'DV17A9720BV');
    expect(valueOf('install-width')).toBe('750');
    expect(resultCard()).toContain('9mm 부족');
    expect(replace).toHaveBeenLastCalledWith('/tools/install-check?category=washer&model=DV17A9720BV', { scroll: false });
    await click(radio('purifier'));
    expect(valueOf('install-width')).toBe('');
    await change('install-width', '400');
    await click(radio('washer'));
    expect(valueOf('install-width')).toBe('750');
    // 주소에는 품목과 모델만 들어간다.
    expect(replace.mock.calls.length).toBeGreaterThan(2);
    for (const [url] of replace.mock.calls) {
      const params = new URL(url, 'https://salimlab.kr').searchParams;
      expect([...params.keys()].sort()).toEqual(['category', 'model']);
      expect(INSTALL_MODELS.some((m) => m.model === params.get('model') && m.category === params.get('category')), url).toBe(true);
    }
  });

  it('지원하지 않는 모델 주소는 목록에서 고르라고 알린다', async () => {
    await mount('/tools/install-check?category=purifier&model=NOPE-1');
    expect(document.body.textContent).toContain('‘NOPE-1’은 이 확인표가 지원하지 않습니다');
    expect(valueOf('install-model')).toBe('');
    const help = document.getElementById('install-unsupported-help') as HTMLDetailsElement;
    expect(help.open).toBe(true);
    expect(help.textContent).toContain('조리대');
    expect(help.textContent).toContain('전체 모델번호');
    expect(help.querySelector('a')?.getAttribute('href')).toBe('#install-measure-guide');
    expect(document.getElementById('install-result-heading')).toBeNull();
    await change('install-model', 'WD523ACB');
    expect(document.getElementById('install-model-heading')?.textContent).toContain('WD523ACB');
  });
});

describe('설치 공간 확인표: 입력 오류와 결과', () => {
  it('설치 요약만 복사하고 입력·모델을 바꾸면 요약과 복사 상태를 갱신한다', async () => {
    await mount('/tools/install-check?category=robot&model=Qrevo%20Curv');
    await change('install-width', '450');
    await change('install-threshold', '40');
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', { value: { writeText }, configurable: true });
    await click(button('설치 요약만 복사'));
    const expected = installConsultationRecord(INSTALL_MODELS.find((m) => m.model === 'Qrevo Curv')!, { width: '450', depth: '', height: '', threshold: '40' }, [], localDateLabel());
    expect(writeText).toHaveBeenCalledWith(expected);
    expect(summaryCard().textContent).toContain('요약해 복사했습니다');
    expect(summaryCard().textContent).toContain('10mm 부족');
    await change('install-width', '500');
    expect(summaryCard().textContent).not.toContain('요약해 복사했습니다');
    expect(summaryCard().textContent).not.toContain('10mm 부족');
    await change('install-model', 'VR50T95935W');
    expect(summaryCard().textContent).toContain('772mm 부족');
    expect(summaryCard().textContent).not.toContain('유럽(CE)');
  });

  it('요약 복사 실패 시 직접 복사할 수 있고 오류 입력은 실측으로 전달하지 않는다', async () => {
    await mount('/tools/install-check?category=robot&model=Qrevo%20Curv');
    await change('install-width', '100cm');
    const writeText = vi.fn().mockRejectedValue(new Error('denied'));
    Object.defineProperty(navigator, 'clipboard', { value: { writeText }, configurable: true });
    await click(button('설치 요약만 복사'));
    const fallback = document.querySelector('textarea[aria-label="직접 복사할 설치 요약"]') as HTMLTextAreaElement;
    expect(fallback.value).toContain('입력 수정 필요');
    expect(fallback.value).not.toContain('100cm');
    expect(fallback.value).toContain('Qrevo Curv');
    await click(button('이 품목의 치수와 체크 비우기'));
    expect(document.querySelector('textarea')).toBeNull();
    expect(summaryCard().textContent).not.toContain('입력 수정 필요');
  });

  it.each([
    ['robot', 'Qrevo Curv', 'threshold', '40', '10mm 넘음'],
    ['aircon', 'CTH06QBW', 'heightDiff', '6000', '1,000mm 넘음'],
  ])('%s의 상한 초과를 공간 부족과 구분한다', async (category, model, field, value, message) => {
    await mount(`/tools/install-check?category=${category}&model=${encodeURIComponent(model)}`);
    await change(`install-${field}`, value);
    expect(resultCard()).toContain('안내 상한 초과');
    expect(resultCard()).toContain('안내 상한을 넘은 항목이 있습니다');
    expect(resultCard()).toContain(message);
    expect(resultCard()).not.toContain('기준보다 작음');
    expect(resultCard()).not.toContain('확보 공간 부족');
  });

  it('공간 부족과 상한 초과가 함께 있거나 하나만 남아도 상태를 맞게 보여 준다', async () => {
    await mount('/tools/install-check?category=robot&model=Qrevo%20Curv');
    await change('install-width', '450');
    await change('install-threshold', '40');
    expect(resultCard()).toContain('확보 공간이 부족하고 안내 상한을 넘은 항목도 있습니다');
    expect(resultCard()).toContain('확보 공간 부족');
    expect(resultCard()).toContain('안내 상한 초과');
    await change('install-threshold', '30');
    expect(resultCard()).not.toContain('안내 상한 초과');
    expect(resultCard()).toContain('차이 0mm');
    await change('install-width', '500');
    expect(resultCard()).not.toContain('확보 공간 부족');
    expect(resultCard()).toContain('설치할 수 있는지는 현장에서 정해집니다');
  });

  it('잘못된 칸에 오류를 붙이고, 엇갈린 원문 값은 두 값을 보여 준다', async () => {
    await mount('/tools/install-check?category=aircon&model=CTH10QBW');
    await change('install-outdoorWidth', '100cm');
    expect(document.getElementById('install-outdoorWidth')?.getAttribute('aria-invalid')).toBe('true');
    expect(document.getElementById('install-outdoorWidth-error')).not.toBeNull();
    expect(resultCard()).toContain('입력 수정');
    expect(resultCard()).toContain('입력 오류를 고치세요');
    await change('install-outdoorWidth', '1000');
    expect(document.getElementById('install-outdoorWidth')?.getAttribute('aria-invalid')).toBe('false');
    expect(resultCard()).toContain('왼쪽 여유 300 + 실외기 폭 700 = 1,000mm');
    expect(resultCard()).toContain('600mm(30쪽 설치도, 배관 연결부 쪽 옆면) / 300mm(6쪽 본문, 좌우 구분 없는 옆면)');
    expect(document.getElementById('install-clearance-heading')!.parentElement!.textContent).toContain('원문 안에서 값이 엇갈림');
  });

  it('자동 복사가 실패하면 값 종류와 기록일이 붙은 기록을 직접 복사할 칸에 보여 준다', async () => {
    await mount('/tools/install-check?category=robot&model=VR50T95935W');
    await change('install-width', '1200');
    await change('install-threshold', '12');
    await click(document.querySelector('input[type="checkbox"]'));
    const writeText = vi.fn().mockRejectedValue(new Error('denied'));
    Object.defineProperty(navigator, 'clipboard', { value: { writeText }, configurable: true });
    await click(button('설치 상담 기록 복사'));
    expect(writeText).toHaveBeenCalledOnce();
    expect(document.body.textContent).toContain('자동 복사에 실패했습니다');
    const record = (document.querySelector('textarea') as HTMLTextAreaElement).value;
    expect(record).toContain(`기록일: ${localDateLabel()}`);
    expect(record).toContain('스테이션 자리 폭: [사용자 실측] 1200mm — [계산값] 72mm 부족');
    expect(record).toContain('[확인 필요] 위 여유는 확인 필요');
    expect(record).toContain('상담 자료 준비: 스테이션 옆 콘센트 위치');
    expect(record).toContain('설치 가능 판정이 아닙니다');
    await change('install-width', '1300');
    expect(document.querySelector('textarea')).toBeNull();
  });
});
