import type { CardAppliance, ApplianceCategory } from '@/types/appliance';

export interface PopularComparison {
  category: ApplianceCategory;
  items: [CardAppliance, CardAppliance];
}

/**
 * 카테고리별 평점 상위 2개를 묶어 비교 링크 후보로 삼는다.
 * 순수 파생 데이터라 카탈로그가 바뀌면 저절로 맞는다 — 저장하지 않는다.
 */
export function getPopularComparisons(
  appliances: CardAppliance[],
  categories: ApplianceCategory[],
): PopularComparison[] {
  const comparisons: PopularComparison[] = [];
  for (const category of categories) {
    const inCategory = [...appliances]
      .filter((a) => a.category === category)
      .sort((a, b) => b.rating - a.rating);
    if (inCategory.length >= 2) {
      comparisons.push({ category, items: [inCategory[0], inCategory[1]] });
    }
  }
  return comparisons;
}

export function comparisonHref(items: [CardAppliance, CardAppliance]): string {
  return `/compare?items=${items.map((a) => a.slug).join(',')}`;
}
