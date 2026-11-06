// @vitest-environment jsdom
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';
import HomePage from '@/app/page';
import MaterialsPage from '@/app/materials/page';
import MaterialPage from '@/app/materials/[slug]/page';
import BlogPage from '@/app/blog/[slug]/page';
import CategoryPage from '@/app/category/[slug]/page';
import BlogIndexPage from '@/app/blog/page';
import BrandPage from '@/app/brand/[brand]/page';
import { allMaterials } from '@/lib/data/materials';
import { getAllBrands, getCardAppliances } from '@/lib/data/appliances';
import { getBrandProfile } from '@/lib/data/brands';
import { LayerDiagram } from '@/components/materials/layer-diagram';

vi.mock('@/components/category-filter-grid', () => ({ CategoryFilterGrid: () => null }));

function dom(node: Parameters<typeof renderToStaticMarkup>[0]) {
  const element = document.createElement('div');
  element.innerHTML = renderToStaticMarkup(node);
  return element;
}

const guide = '/blog/diaper-label-reading';

describe('빨래 분류에서 정확한 모델과 기존 비교로 이동', () => {
  it('긴 페이지에서 글을 열어도 글 시작 앵커로 이동한다', async () => {
    const destination = '/blog/laundry-label-before-drying#article-start';
    for (const page of [dom(createElement(HomePage)), dom(createElement(BlogIndexPage))]) {
      expect(page.querySelector(`a[href="${destination}"]`)).not.toBeNull();
    }
    const article = dom(await BlogPage({ params: Promise.resolve({ slug: 'laundry-label-before-drying' }) }));
    expect(article.querySelector('article#article-start h1')).not.toBeNull();
  });
  it.each(['washer', 'dryer'])('%s 구매 가이드에서 옷 라벨 가이드로 이어진다', async (slug) => {
    const node = dom(await CategoryPage({ params: Promise.resolve({ slug }) }));
    expect(node.querySelector('section[aria-labelledby="buying-guide"] a[href="/blog/laundry-label-before-drying#article-start"]')).not.toBeNull();
  });

  it('일체형 비교에서 의류 분류를 확인하고 모델 조건과 비교 글로 돌아간다', async () => {
    const comparison = dom(await BlogPage({ params: Promise.resolve({ slug: 'washer-dryer-combo-vs-separate' }) }));
    expect(comparison.querySelector('section[aria-labelledby^="section-"] a[href="/blog/laundry-label-before-drying#article-start"]')).not.toBeNull();
    const article = dom(await BlogPage({ params: Promise.resolve({ slug: 'laundry-label-before-drying' }) }));
    expect(article.querySelector('a[href="/products/samsung-bespoke-grande-dv17a9720#verdict"]')).not.toBeNull();
    expect(article.querySelector('section[aria-labelledby^="section-"] a[href="/blog/washer-dryer-combo-vs-separate#article-start"]')).not.toBeNull();
  });
});

describe('생활용품 해설을 찾고 사전으로 왕복', () => {
  it('형광증백제 시험 표시는 안감에 붙고 첨가라는 층을 만들지 않는다', () => {
    const node = dom(createElement(LayerDiagram));
    const row = [...node.querySelectorAll('svg g')].find((g) => g.textContent?.includes('형광증백제'))!;
    expect(row.textContent).toContain('안감');
    expect(row.textContent).not.toContain('첨가');
    expect(node.textContent).not.toContain('첨가층');
  });
  it('홈과 사전에서 읽는 가이드로 들어갈 수 있다', () => {
    expect(dom(createElement(HomePage)).querySelector('a[href="/materials"]')).not.toBeNull();
    expect(dom(createElement(MaterialsPage)).querySelector(`a[href="${guide}"]`)).not.toBeNull();
  });

  it('해설이 소재/규제 6개 항목을 연결하고 각 항목에서 돌아온다', async () => {
    const article = dom(await BlogPage({ params: Promise.resolve({ slug: 'diaper-label-reading' }) }));
    for (const material of allMaterials) {
      expect(article.querySelector(`a[href="/materials/${material.slug}"]`), material.slug).not.toBeNull();
      const entry = dom(await MaterialPage({ params: Promise.resolve({ slug: material.slug }) }));
      expect(entry.querySelector(`a[href="${guide}"]`), material.slug).not.toBeNull();
    }
    // 생활용품 해설에 무관한 가전 제품을 연결하지 않는다.
    expect(article.querySelector('a[href^="/products/"]')).toBeNull();
  });
});

describe('단일 모델 브랜드의 서비스→제품 경로', () => {
  const items = getCardAppliances();
  const single = getAllBrands().filter((brand) => items.filter((item) => item.brand === brand).length === 1);

  it.each(single)('%s: 공식 서비스 출처와 제품 상세가 있고 반복 총평은 없다', async (brand) => {
    const node = dom(await BrandPage({ params: Promise.resolve({ brand }) }));
    const profile = getBrandProfile(brand)!;
    const service = node.querySelector('section[aria-labelledby="brand-service-heading"]')!;
    expect(service, brand).not.toBeNull();
    expect(service.querySelector(`a[href="${profile.serviceCenter!.sourceUrl}"]`)).not.toBeNull();
    expect(service.querySelector('a[href^="tel:"]')?.getAttribute('href')).toBe(`tel:${profile.serviceCenter!.phone.replace(/[^+\d]/g, '')}`);
    const model = items.find((item) => item.brand === brand)!;
    expect(node.querySelector(`a[href="/products/${model.slug}#verdict"]`)).not.toBeNull();
    expect(node.textContent).not.toContain(profile.editorNote);
    const preparation = node.querySelector('section[aria-labelledby="brand-service-preparation"]')!;
    expect(preparation).not.toBeNull();
    expect(service.compareDocumentPosition(preparation) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it('복수 모델 LG의 기존 총평을 보존한다', async () => {
    const node = dom(await BrandPage({ params: Promise.resolve({ brand: 'LG' }) }));
    expect(node.textContent).toContain(getBrandProfile('LG')!.editorNote);
  });
});
