import { existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import HomePage from '@/app/page';
import BlogPage, { generateStaticParams } from '@/app/blog/[slug]/page';
import ToolsPage from '@/app/tools/page';
import { getErrorCodeBrands } from '@/lib/error-codes';

const hasBuild = existsSync(join(process.cwd(), 'out/index.html'));

describe('집중 범위의 실제 진입 경로', () => {
  it('홈에서 기존 에러코드 허브와 수리·관리 기록으로 바로 이동한다', () => {
    const html = renderToStaticMarkup(createElement(HomePage));
    for (const brand of getErrorCodeBrands()) expect(html).toContain(`/error-codes/${brand}`);
    for (const slug of ['repair-replace', 'care-plan', 'household-care']) expect(html).toContain(`href="/tools/${slug}"`);
    expect(html).not.toMatch(/href="\/(?:products|brand|category|compare|materials)(?:\/|"|#)/);
  });
  it('구매 콘텐츠의 slug를 직접 입력해도 다시 게시하지 않는다', async () => {
    expect(generateStaticParams()).toEqual([{ slug: 'samsung-washer-check-codes' }]);
    await expect(BlogPage({ params: Promise.resolve({ slug: 'water-purifier-contract-dates' }) })).rejects.toThrow('404');
  });
  it('도구 모음에 공개하지 않는 도구로 가는 길이 없다', () => {
    const html = renderToStaticMarkup(createElement(ToolsPage));
    for (const slug of ['repair-replace', 'care-plan', 'household-care']) expect(html).toContain(`href="/tools/${slug}"`);
    expect(html).not.toMatch(/href="\/tools\/(?:home-energy|install-check|water-purifier-cost|fridge-fit|dishwasher-fit)/);
    expect(html).not.toContain('href="/compare');
  });
});

describe.skipIf(!hasBuild)('내보낸 자산에 퇴역 페이지가 남지 않는다', () => {
  it('원본을 보관한 폴더와 없앤 라우트가 out에 노출되지 않는다', () => {
    const root = join(process.cwd(), 'out');
    for (const folder of ['archive', 'products', 'brand', 'category', 'compare', 'materials']) {
      expect(existsSync(join(root, folder)), folder).toBe(false);
      expect(existsSync(join(root, `${folder}.html`)), folder).toBe(false);
    }
    expect(readdirSync(join(root, 'tools')).filter((file) => file.endsWith('.html')).sort()).toEqual(['care-plan.html', 'household-care.html', 'repair-replace.html']);
    expect(readdirSync(join(root, 'blog')).filter((file) => file.endsWith('.html'))).toEqual(['samsung-washer-check-codes.html']);
  });
});
