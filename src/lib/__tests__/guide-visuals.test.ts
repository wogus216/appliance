// @vitest-environment jsdom
import { renderToStaticMarkup } from 'react-dom/server';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import BlogPage from '@/app/blog/[slug]/page';

describe('가이드의 한눈 요약과 판단 도식', () => {
  it('dC·dE 요약은 문이 잠긴 증상으로 뒤집어 설명하지 않는다', async () => {
    const node = document.createElement('div');
    node.innerHTML = renderToStaticMarkup(await BlogPage({ params: Promise.resolve({ slug: 'samsung-washer-check-codes' }) }));
    const row = [...node.querySelectorAll('section[aria-labelledby="visual-summary-heading"] tbody tr')].find((entry) => entry.querySelector('th')?.textContent?.includes('dC'))!;
    const meaning = row.querySelector('td')!.textContent;
    expect(meaning).not.toContain('문 잠김');
    expect(meaning).toMatch(/문열림|도어 감지/);
  });
  it.each(['laundry-label-before-drying', 'diaper-label-reading', 'robot-vacuum-auto-water-install', 'samsung-washer-check-codes'])('%s: 긴 본문 앞에 의미 있는 표와 텍스트 분기가 있다', async (slug) => {
    const node = document.createElement('div');
    node.innerHTML = renderToStaticMarkup(await BlogPage({ params: Promise.resolve({ slug }) }));
    const summary = node.querySelector('section[aria-labelledby="visual-summary-heading"]')!;
    expect(summary).not.toBeNull();
    const table = summary.querySelector('table')!;
    expect(table.querySelector('caption')?.textContent?.trim()).toBeTruthy();
    expect(table.querySelectorAll('thead th[scope="col"]')).toHaveLength(3);
    expect(table.querySelectorAll('tbody th[scope="row"]').length).toBeGreaterThanOrEqual(3);
    expect(summary.querySelectorAll('figure[aria-labelledby="decision-flow-heading"] li')).toHaveLength(3);
    expect(summary.compareDocumentPosition(node.querySelector('#answer')!) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it.each(['laundry-label-before-drying', 'diaper-label-reading'])('%s: 설명 사진은 실제 파일·대체텍스트·AI 설명 캡션이 있다', async (slug) => {
    const node = document.createElement('div');
    node.innerHTML = renderToStaticMarkup(await BlogPage({ params: Promise.resolve({ slug }) }));
    const figure = node.querySelector('figure[data-guide-photo]')!;
    expect(figure).not.toBeNull();
    const photo = figure.querySelector('img')!;
    expect(photo.getAttribute('alt')?.trim()).toBeTruthy();
    expect(figure.querySelector('figcaption')?.textContent).toContain('AI');
    const renderedSrc = photo.getAttribute('src')!;
    const assetPath = new URL(renderedSrc, 'https://salimlab.kr').searchParams.get('url') ?? renderedSrc;
    expect(existsSync(join(process.cwd(), 'public', assetPath)), assetPath).toBe(true);
    expect(Number(photo.getAttribute('width'))).toBeGreaterThan(0);
    expect(Number(photo.getAttribute('height'))).toBeGreaterThan(0);
  });
});
