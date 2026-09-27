import { describe, it, expect } from 'vitest';
import { getPopularComparisons } from '@/lib/popular-comparisons';
import type { CardAppliance } from '@/types/appliance';

function item(overrides: Pick<CardAppliance, 'id' | 'slug' | 'category'>): CardAppliance {
  return {
    brand: 'LG',
    name: overrides.slug,
    price: 100000,
    tags: [],
    capacity: '',
    specs: {},
    ...overrides,
  };
}

describe('getPopularComparisons', () => {
  it('카테고리에 제품이 2개 미만이면 후보를 만들지 않는다', () => {
    const appliances = [item({ id: '1', slug: 'a', category: '에어컨' })];
    expect(getPopularComparisons(appliances, ['에어컨'])).toEqual([]);
  });

  // 예전에는 '평점 상위 2개'였다. 평점(편집 점수)을 걷은 뒤에는 우열로 고르지 않고
  // 넘겨받은 순서의 앞 두 개를 쓴다.
  it('카테고리 안에서 넘겨받은 순서의 앞 두 개를 고른다 — 점수로 고르지 않는다', () => {
    const appliances = [
      item({ id: '1', slug: 'a', category: '에어컨' }),
      item({ id: '2', slug: 'b', category: '에어컨' }),
      item({ id: '3', slug: 'c', category: '에어컨' }),
    ];
    const result = getPopularComparisons(appliances, ['에어컨']);
    expect(result).toHaveLength(1);
    expect(result[0].items.map((i) => i.slug)).toEqual(['a', 'b']);
  });

  it('categories 인자의 순서를 따른다', () => {
    const appliances = [
      item({ id: '1', slug: 'a', category: '세탁기' }),
      item({ id: '2', slug: 'b', category: '세탁기' }),
      item({ id: '3', slug: 'c', category: '에어컨' }),
      item({ id: '4', slug: 'd', category: '에어컨' }),
    ];
    const result = getPopularComparisons(appliances, ['에어컨', '세탁기']);
    expect(result.map((r) => r.category)).toEqual(['에어컨', '세탁기']);
  });

  it('카탈로그에 없는 카테고리는 건너뛴다', () => {
    const appliances = [item({ id: '1', slug: 'a', category: '에어컨' })];
    expect(getPopularComparisons(appliances, ['에어컨', '세탁기'])).toEqual([]);
  });
});
