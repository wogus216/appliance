// @vitest-environment jsdom
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import CategoryPage from '@/app/category/[slug]/page';
import BlogPage from '@/app/blog/[slug]/page';
import { getCategoryGuide } from '@/lib/data/category-guides';

const cases = [
  ['refrigerator', '냉장고', '/tools/fridge-fit?model=RF85C90D1AP'],
  ['washer', '세탁기', '/tools/install-check?category=washer&model=WD25DB8995BZ'],
  ['dryer', '건조기', '/tools/care-plan?model=DV17A9720BV'],
  ['robot-vacuum', '로봇청소기', '/products/roborock-s8-proultra#technology-map'],
] as const;

describe('카테고리의 선택표→설치/관리 도식→제품 경로', () => {
  it.each(cases)('%s: 제품 목록 앞에서 표·순서 도식·정확한 모델 링크를 볼 수 있다', async (slug, category, target) => {
    const node = document.createElement('div');
    node.innerHTML = renderToStaticMarkup(await CategoryPage({ params: Promise.resolve({ slug }) }));
    const overview = node.querySelector('section[aria-labelledby="visual-summary-heading"]')!;
    expect(overview).not.toBeNull();
    expect(overview.querySelectorAll('thead th[scope="col"]')).toHaveLength(3);
    expect(overview.querySelectorAll('tbody th[scope="row"]').length).toBeGreaterThanOrEqual(3);
    expect(overview.querySelectorAll('figure[aria-labelledby="decision-flow-heading"] ol li')).toHaveLength(3);
    expect([...overview.querySelectorAll('a')].map((link) => link.getAttribute('href'))).toContain(target);
    expect(overview.querySelector('a[href="#buying-guide"]')).not.toBeNull();
    expect(overview.compareDocumentPosition(node.querySelector('section[aria-labelledby="product-list"]')!) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(node.querySelector('#buying-guide')).not.toBeNull();
    expect(node.querySelector('#guide-1')).not.toBeNull();
    const dates = node.querySelector('[data-guide-dates]')!;
    expect(dates.textContent).toContain('자료 확인');
    expect(dates.querySelector('time')?.getAttribute('datetime')).toBe(getCategoryGuide(category)!.sourcesCheckedAt);
    expect(dates.textContent).toContain('본문 편집');
  });

  it('블로그의 기존 분기와 본문 바로가기 목적지는 유지한다', async () => {
    const node = document.createElement('div');
    node.innerHTML = renderToStaticMarkup(await BlogPage({ params: Promise.resolve({ slug: 'diaper-label-reading' }) }));
    expect(node.querySelectorAll('figure[aria-labelledby="decision-flow-heading"] ul li')).toHaveLength(3);
    expect(node.querySelector('a[href="#guide-detail"]')).not.toBeNull();
  });

  it('TV의 시각 요약과 기존 목록·가이드는 함께 표시한다', async () => {
    const node = document.createElement('div');
    node.innerHTML = renderToStaticMarkup(await CategoryPage({ params: Promise.resolve({ slug: 'tv' }) }));
    expect(node.querySelector('section[aria-labelledby="visual-summary-heading"]')).not.toBeNull();
    expect(node.querySelector('#product-list')).not.toBeNull();
    expect(node.querySelector('#buying-guide')).not.toBeNull();
  });
});
