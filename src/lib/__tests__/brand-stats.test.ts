import { describe, it, expect } from 'vitest';
import { computeBrandStats, getBrandStats, isNonApplianceBrand } from '@/lib/brand-stats';
import type { BrandStatsInput } from '@/lib/brand-stats';
import { allAppliances, getAllBrands } from '@/lib/data/appliances';

function item(
  category: BrandStatsInput['category'],
  price: number,
  rating: number,
  energyGrade?: BrandStatsInput['techSpecs']['energyGrade'],
): BrandStatsInput {
  return { category, price, rating, techSpecs: { energyGrade } };
}

describe('computeBrandStats', () => {
  it('제품이 없으면 빈 통계를 낸다', () => {
    const s = computeBrandStats([]);
    expect(s.productCount).toBe(0);
    expect(s.categories).toEqual([]);
    expect(s.priceMin).toBe(0);
    expect(s.priceMax).toBe(0);
    expect(s.avgRating).toBeNull();
    expect(s.energyGrades).toEqual([]);
  });

  it('카테고리는 등장 순서대로 중복 없이 모은다', () => {
    const s = computeBrandStats([
      item('에어컨', 100, 4),
      item('세탁기', 200, 4),
      item('에어컨', 300, 4),
    ]);
    expect(s.categories).toEqual(['에어컨', '세탁기']);
  });

  it('가격 최소·최대와 평균 평점을 낸다', () => {
    const s = computeBrandStats([
      item('에어컨', 390_000, 4.2),
      item('세탁기', 3_490_000, 4.4),
    ]);
    expect(s.priceMin).toBe(390_000);
    expect(s.priceMax).toBe(3_490_000);
    expect(s.avgRating).toBe(4.3);
  });

  it('평균 평점을 소수 첫째 자리로 반올림한다', () => {
    const s = computeBrandStats([item('에어컨', 1, 4.25), item('에어컨', 1, 4.25)]);
    expect(s.avgRating).toBe(4.3);
  });

  // 효율관리기자재 비대상 품목(선풍기·공기청정기 등)은 등급이 아예 없다.
  // 빈칸으로 두면 표가 제품 수와 안 맞아 보이므로 '대상 아님'으로 명시한다.
  it('에너지등급을 등급 순으로 세고 없는 것은 대상 아님으로 묶는다', () => {
    const s = computeBrandStats([
      item('에어컨', 1, 4, '2등급'),
      item('세탁기', 1, 4, '1등급'),
      item('냉장고', 1, 4, '1등급'),
      item('선풍기', 1, 4),
    ]);
    expect(s.energyGrades).toEqual([
      { label: '1등급', count: 2 },
      { label: '2등급', count: 1 },
      { label: '대상 아님', count: 1 },
    ]);
  });

  // TV·무선이어폰만 파는 브랜드에서 '대상 아님 1'은 정보가 아니라 잡음이다.
  it('비가전 제품뿐이면 에너지등급을 아예 내지 않는다', () => {
    const s = computeBrandStats([item('무선이어폰', 199_000, 4.5)]);
    expect(s.energyGrades).toEqual([]);
  });
});

describe('getBrandStats / isNonApplianceBrand', () => {
  it('카탈로그의 제품 수와 일치한다', () => {
    for (const brand of getAllBrands()) {
      const expected = allAppliances.filter((a) => a.brand === brand).length;
      expect(getBrandStats(brand).productCount, brand).toBe(expected);
    }
  });

  it('모든 브랜드에서 priceMin이 priceMax 이하다', () => {
    for (const brand of getAllBrands()) {
      const s = getBrandStats(brand);
      expect(s.priceMin, brand).toBeLessThanOrEqual(s.priceMax);
    }
  });

  it('비가전 전용 브랜드를 가려낸다', () => {
    expect(isNonApplianceBrand('QCY')).toBe(true);
    expect(isNonApplianceBrand('LG')).toBe(false);
  });

  it('카탈로그에 없는 브랜드는 비가전으로 치지 않는다', () => {
    expect(isNonApplianceBrand('없는브랜드')).toBe(false);
  });
});
