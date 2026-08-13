import { describe, it, expect } from 'vitest';
import { getPopularComparisons } from '@/lib/popular-comparisons';
import type { CardAppliance } from '@/types/appliance';

function item(overrides: Pick<CardAppliance, 'id' | 'slug' | 'category' | 'rating'>): CardAppliance {
  return {
    brand: 'LG',
    name: overrides.slug,
    price: 100000,
    tags: [],
    specs: { energyEfficiency: 5, performance: 5, noise: 5, convenience: 5, durability: 5 },
    ...overrides,
  };
}

describe('getPopularComparisons', () => {
  it('카테고리에 제품이 2개 미만이면 후보를 만들지 않는다', () => {
    const appliances = [item({ id: '1', slug: 'a', category: '에어컨', rating: 4.5 })];
    expect(getPopularComparisons(appliances, ['에어컨'])).toEqual([]);
  });

  it('카테고리 안에서 평점 상위 2개를 고른다', () => {
    const appliances = [
      item({ id: '1', slug: 'a', category: '에어컨', rating: 4.0 }),
      item({ id: '2', slug: 'b', category: '에어컨', rating: 4.8 }),
      item({ id: '3', slug: 'c', category: '에어컨', rating: 4.5 }),
    ];
    const result = getPopularComparisons(appliances, ['에어컨']);
    expect(result).toHaveLength(1);
    expect(result[0].items.map((i) => i.slug)).toEqual(['b', 'c']);
  });

  it('categories 인자의 순서를 따른다', () => {
    const appliances = [
      item({ id: '1', slug: 'a', category: '세탁기', rating: 4.5 }),
      item({ id: '2', slug: 'b', category: '세탁기', rating: 4.2 }),
      item({ id: '3', slug: 'c', category: '에어컨', rating: 4.5 }),
      item({ id: '4', slug: 'd', category: '에어컨', rating: 4.2 }),
    ];
    const result = getPopularComparisons(appliances, ['에어컨', '세탁기']);
    expect(result.map((r) => r.category)).toEqual(['에어컨', '세탁기']);
  });

  it('카탈로그에 없는 카테고리는 건너뛴다', () => {
    const appliances = [item({ id: '1', slug: 'a', category: '에어컨', rating: 4.5 })];
    expect(getPopularComparisons(appliances, ['에어컨', '세탁기'])).toEqual([]);
  });
});
