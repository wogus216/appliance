// @vitest-environment jsdom
import { act, createElement } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { InstallCheckTool } from '@/components/tools/install-check-tool';
import { INSTALL_MODELS } from '@/lib/data/install-check';
import { localDateLabel } from '@/lib/value-kind';

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
    await change('install-model', 'WD523ACB');
    expect(document.getElementById('install-model-heading')?.textContent).toContain('WD523ACB');
  });
});

describe('설치 공간 확인표: 입력 오류와 결과', () => {
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
