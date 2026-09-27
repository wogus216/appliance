import type { CardAppliance, ApplianceCategory } from '@/types/appliance';

export interface PopularComparison {
  category: ApplianceCategory;
  items: [CardAppliance, CardAppliance];
}

/**
 * 카테고리마다 목록 앞의 두 제품을 묶어 비교 도구의 시작점으로 삼는다.
 *
 * 예전에는 '평점 상위 2개'였고 그 평점은 편집 판단 점수였다. 점수를 걷은 뒤(2026-09-27)에는
 * 우열로 고르지 않는다 — 넘겨받은 순서(기본 순서: compareByDefaultOrder)의 앞 두 개다.
 * 순수 파생 데이터라 카탈로그가 바뀌면 저절로 맞는다 — 저장하지 않는다.
 */
export function getPopularComparisons(
  appliances: CardAppliance[],
  categories: ApplianceCategory[],
): PopularComparison[] {
  const comparisons: PopularComparison[] = [];
  for (const category of categories) {
    const inCategory = appliances.filter((a) => a.category === category);
    if (inCategory.length >= 2) {
      comparisons.push({ category, items: [inCategory[0], inCategory[1]] });
    }
  }
  return comparisons;
}
