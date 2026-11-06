// @vitest-environment jsdom
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import CategoryPage, { generateMetadata } from '@/app/category/[slug]/page';
import BlogPage from '@/app/blog/[slug]/page';
import { getCategoryGuide } from '@/lib/data/category-guides';

const categoryDom = async (slug: string) => {
  const node = document.createElement('div');
  node.innerHTML = renderToStaticMarkup(await CategoryPage({ params: Promise.resolve({ slug }) }));
  return node;
};

describe('카테고리 분석에서 해당 글과 모델 도구로 이동', () => {
  it.each([
    ['refrigerator', '/blog/bespoke-rf85-vs-dios-t873', '/tools/fridge-fit?model=RF85C90D1AP'],
    ['washer', '/blog/washer-dryer-combo-vs-separate', '/tools/install-check?category=washer&model=WF24A9500KE'],
    ['dryer', '/blog/washer-dryer-combo-vs-separate', '/tools/care-plan?model=DV17A9720BV'],
    ['robot-vacuum', '/blog/robot-vacuum-suction-numbers', '/products/roborock-s8-proultra#technology-map'],
    ['dishwasher', '/blog/dishwasher-12-vs-6-countertop', '/tools/dishwasher-fit'],
  ])('%s 선택 가이드에 문맥 링크와 바로가기가 있다', async (slug, article, action) => {
    const node = await categoryDom(slug);
    const guide = node.querySelector('section[aria-labelledby="buying-guide"]')!;
    const hrefs = [...guide.querySelectorAll('a')].map((a) => a.getAttribute('href'));
    expect(hrefs).toContain(article);
    expect(hrefs).toContain(action);
    expect(node.querySelector('a[href="#buying-guide"]')).not.toBeNull();
  });

  it.each([
    ['bespoke-rf85-vs-dios-t873', '/tools/fridge-fit?model=RF85C90D1AP'],
    ['washer-dryer-combo-vs-separate', '/tools/install-check?category=washer&model=WD25DB8995BZ'],
    ['robot-vacuum-suction-numbers', '/products/roborock-s8-proultra#technology-map'],
  ])('%s 본문에서도 모델을 유지해 다음 행동으로 간다', async (slug, href) => {
    const node = document.createElement('div');
    node.innerHTML = renderToStaticMarkup(await BlogPage({ params: Promise.resolve({ slug }) }));
    const links = [...node.querySelectorAll('section[aria-labelledby^="section-"] a')];
    expect(links.some((a) => a.getAttribute('href') === href)).toBe(true);
  });

  it.each([['tv', 'TV'], ['fan', '선풍기']] as const)('%s 제목이 실제 분석 범위와 같다', async (slug, category) => {
    const metadata = await generateMetadata({ params: Promise.resolve({ slug }) });
    expect(metadata.title).toBe(getCategoryGuide(category)!.title);
  });
});
