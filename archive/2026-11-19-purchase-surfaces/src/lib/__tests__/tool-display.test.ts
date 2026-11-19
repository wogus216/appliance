// @vitest-environment jsdom
import { act, createElement, type ReactElement } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { renderToStaticMarkup } from 'react-dom/server';
import { afterEach, describe, expect, it, vi } from 'vitest';
import ToolsPage from '@/app/tools/page';
import { DishwasherFitTool } from '@/components/tools/dishwasher-fit-tool';
import { InstallCheckTool } from '@/components/tools/install-check-tool';
import { ValueBadge } from '@/components/tools/value-badge';
import { INSTALL_MODELS } from '@/lib/data/install-check';
import { TOOLS } from '@/lib/tool-directory';
import { VALUE_KIND_LABELS, type ValueKind } from '@/lib/value-kind';

/**
 * 2026-10-30 정리: 숫자마다 붙은 색 표시와 같은 말의 되풀이가 결과를 덮고 있었다.
 * 출처 구별은 글자로 남기고, 사용자가 실제로 무언가 해야 하는 표시만 눈에 띄게 둔다.
 */
vi.mock('next/navigation', () => ({ useRouter: () => ({ replace: vi.fn() }), useSearchParams: () => new URLSearchParams(window.location.search) }));
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
  window.history.replaceState(null, '', '/');
});
async function change(id: string, value: string) {
  const element = document.getElementById(id) as HTMLSelectElement;
  await act(async () => {
    Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype, 'value')!.set!.call(element, value);
    element.dispatchEvent(new Event('change', { bubbles: true }));
  });
}

describe('값 종류 표시', () => {
  const badge = (kind: ValueKind) => renderToStaticMarkup(createElement(ValueBadge, { kind }));

  it.each(['official', 'official-test', 'measured', 'entered', 'calculated'] as ValueKind[])('%s: 글자는 남기고 색 상자는 없앤다', (kind) => {
    const html = badge(kind);
    expect(html).toContain(VALUE_KIND_LABELS[kind]);
    expect(html).not.toMatch(/(?<!print:)border-[a-z]+-\d+/);
    expect(html).not.toMatch(/(?<!print:)bg-[a-z]+-\d+/);
  });

  it.each(['unverified', 'example'] as ValueKind[])('%s: 눈에 띄는 표시를 유지한다', (kind) => {
    const html = badge(kind);
    expect(html).toContain(VALUE_KIND_LABELS[kind]);
    expect(html).toMatch(/(?<!print:)border-(amber|orange)-300/);
  });
});

describe('같은 말 되풀이', () => {
  it('설치 공간: 확인 필요 칸은 제목의 표시 한 번만 말하고, 설명은 이유부터 적는다', async () => {
    window.history.replaceState(null, '', '/tools/install-check?category=aircon&model=CTH06QBW');
    await mount(createElement(InstallCheckTool, { models: INSTALL_MODELS }));
    const card = document.getElementById('install-result-heading')!.parentElement!.textContent!;
    expect(card).toContain(VALUE_KIND_LABELS.unverified);
    expect(card).not.toContain('확인 필요 · ');
    expect(card).toContain('비교 기준');
    expect(card).not.toContain('미측정 · 비교 기준');
  });

  it('식기세척기: 확인 필요 칸의 설명이 이유부터 시작한다', async () => {
    await mount(createElement(DishwasherFitTool));
    await change('dishwasher-model', 'DWA-81R0D');
    const text = document.body.textContent!;
    expect(text).toContain('이 모델의 문 개방 깊이는 공식 자료에서 확인하지 못했습니다');
    expect(text).not.toContain('확인 필요 · 이 모델의');
  });
});

describe('/tools 카드 순서', () => {
  const html = renderToStaticMarkup(createElement(ToolsPage));
  const card = (slug: string) => {
    const start = html.indexOf(`id="tool-${slug}"`);
    return html.slice(start, html.indexOf('</article>', start));
  };

  it.each(TOOLS.map((tool) => tool.slug))('%s: 여는 단추가 설명보다 먼저 오고, 한계는 펼침 안에 있다', (slug) => {
    const body = card(slug);
    const open = body.indexOf('도구 열기');
    expect(open).toBeGreaterThan(-1);
    expect(open).toBeLessThan(body.indexOf('답하는 질문'));
    expect(body.indexOf('지원 범위')).toBeLessThan(body.indexOf('<details'));
    for (const label of ['답하지 못하는 질문', '결과에 나오는 값', '입력 보관']) {
      expect(body.indexOf(label), label).toBeGreaterThan(body.indexOf('<details'));
    }
  });

  it('첫 문단은 할 수 있는 일로 시작하고, 대신 결정하지 않는다는 말은 뒤에 둔다', () => {
    const first = html.slice(html.indexOf('</h1>'), html.indexOf('</p>', html.indexOf('</h1>')));
    expect(first).toContain('넣으면');
    expect(first).toContain('대신 결정하지');
    expect(first.indexOf('넣으면')).toBeLessThan(first.indexOf('대신 결정하지'));
    expect(html).not.toContain('먼저 읽어 보세요');
  });
});
