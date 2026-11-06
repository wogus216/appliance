// @vitest-environment jsdom
import { act, createElement } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { CompareContent } from '../compare-content';
import type { CardAppliance } from '@/types/appliance';

vi.mock('next/navigation', () => ({
  useRouter: () => ({ replace: (href: string) => window.history.replaceState(null, '', href) }),
  useSearchParams: () => new URLSearchParams(window.location.search),
}));
Object.assign(globalThis, { IS_REACT_ACT_ENVIRONMENT: true });

const products = ['first', 'second', 'third', 'fourth', 'fifth'].map((slug, index) => ({
  id: String(index), slug, name: slug, brand: 'LG', category: '냉장고', specs: {},
})) as CardAppliance[];
let root: Root | undefined;
const links = () => [...document.querySelectorAll<HTMLAnchorElement>('a[href="#selected-comparison-heading"]')];
async function click(element: HTMLElement | undefined | null) {
  if (!element) throw new Error('expected element');
  await act(async () => element.click());
}
async function mount() {
  document.body.innerHTML = '<div id="root"></div>';
  root = createRoot(document.getElementById('root')!);
  await act(async () => root!.render(createElement(CompareContent, {
    allAppliances: products,
    popularComparisons: [{ category: '냉장고', items: [products[0], products[1]], purpose: '냉장고 선택', basis: '설치 조건', kind: '제품 조건 비교' }],
  })));
}
afterEach(async () => {
  if (root) await act(async () => root!.unmount());
  root = undefined;
  window.history.replaceState(null, '', '/');
});

describe('선택한 비교 결과로 이동', () => {
  it('두 제품을 고르면 조합·선택 영역에 결과 링크가 생기고, 눌렀을 때 결과 제목에 초점을 준다', async () => {
    await mount();
    expect(links()).toHaveLength(0);
    await click([...document.querySelectorAll('button')].find((button) => button.textContent?.includes('냉장고 선택')));
    expect(links()).toHaveLength(2);
    expect(links().every((link) => link.textContent === '선택한 제품 비교 결과 보기')).toBe(true);
    expect(new URLSearchParams(window.location.search).get('items')).toBe('first,second');
    const heading = document.getElementById('selected-comparison-heading')!;
    expect(heading.textContent).toBe('상세 비교');
    expect(heading.tabIndex).toBe(-1);
    expect(heading.className).toContain('scroll-mt-24');
    await click(links()[0]);
    expect(document.activeElement).toBe(heading);
    expect(new URLSearchParams(window.location.search).get('items')).toBe('first,second');
    await click(document.querySelector<HTMLButtonElement>('button[aria-label="비교에서 제거"]'));
    expect(links()).toHaveLength(0);
    expect(document.getElementById('selected-comparison-heading')).toBeNull();
  });

  it('주소로 선택한 제품에서도 결과 링크를 제공하며 최대 네 제품 제한을 유지한다', async () => {
    window.history.replaceState(null, '', '/compare?items=first,second,third,fourth,fifth');
    await mount();
    expect(links()).toHaveLength(2);
    expect(document.body.textContent).toContain('(4/4)');
    const heading = document.getElementById('selected-comparison-heading')!;
    expect(heading.parentElement?.getAttribute('aria-labelledby')).toBe(heading.id);
  });
});
