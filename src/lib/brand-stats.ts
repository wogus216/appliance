import { allAppliances } from '@/lib/data/appliances';
import { isTraditionalAppliance } from '@/lib/category-config';
import type { Appliance, ApplianceCategory, EnergyGrade, TechSpecs } from '@/types/appliance';

/**
 * 통계에 필요한 최소 입력.
 *
 * Appliance 전체가 아니라 이 조각만 받는 이유는 순수 함수로 만들어 픽스처로 검증하기
 * 위해서다. 모듈 전역(allAppliances)에 묶여 있으면 규칙 자체를 테스트할 수 없다.
 */
export type BrandStatsInput = Pick<Appliance, 'category' | 'price' | 'rating'> & {
  techSpecs: Pick<TechSpecs, 'energyGrade'>;
};

export interface BrandStats {
  productCount: number;
  /** 카탈로그 등장 순, 중복 없음 */
  categories: ApplianceCategory[];
  /** 원 단위. 제품이 없으면 0 */
  priceMin: number;
  priceMax: number;
  /** 소수 첫째 자리 반올림. 제품이 없으면 null */
  avgRating: number | null;
  /** 등급 순 + '대상 아님'. 비가전 전용 브랜드는 빈 배열 */
  energyGrades: { label: string; count: number }[];
}

const GRADE_ORDER: EnergyGrade[] = ['1등급', '2등급', '3등급', '4등급', '5등급'];

/** 효율관리기자재 비대상 품목을 빈칸이 아니라 이 이름으로 묶는다 */
const NOT_APPLICABLE = '대상 아님';

export function computeBrandStats(items: BrandStatsInput[]): BrandStats {
  if (items.length === 0) {
    return {
      productCount: 0,
      categories: [],
      priceMin: 0,
      priceMax: 0,
      avgRating: null,
      energyGrades: [],
    };
  }

  const prices = items.map((a) => a.price);
  const ratingSum = items.reduce((sum, a) => sum + a.rating, 0);

  // 전 제품이 비가전이면 등급표 자체가 성립하지 않는다. '대상 아님 1'은 정보가 아니다.
  const hasAppliance = items.some((a) => isTraditionalAppliance(a.category));

  const counts = new Map<string, number>();
  if (hasAppliance) {
    for (const a of items) {
      const label = a.techSpecs.energyGrade ?? NOT_APPLICABLE;
      counts.set(label, (counts.get(label) ?? 0) + 1);
    }
  }

  const energyGrades = [...GRADE_ORDER, NOT_APPLICABLE]
    .filter((label) => counts.has(label))
    .map((label) => ({ label, count: counts.get(label)! }));

  return {
    productCount: items.length,
    categories: [...new Set(items.map((a) => a.category))],
    priceMin: Math.min(...prices),
    priceMax: Math.max(...prices),
    avgRating: Math.round((ratingSum / items.length) * 10) / 10,
    energyGrades,
  };
}

export function getBrandStats(brand: string): BrandStats {
  return computeBrandStats(allAppliances.filter((a) => a.brand === brand));
}

/**
 * 이 브랜드가 파는 것이 전부 비가전(TV·무선이어폰 등)인지.
 *
 * 브랜드명을 하드코딩하지 않고 카탈로그에서 파생한다 — 나중에 브랜드나 제품이 늘어도
 * 저절로 맞는다. 카탈로그에 없는 브랜드는 판단 근거가 없으므로 false다.
 */
export function isNonApplianceBrand(brand: string): boolean {
  const items = allAppliances.filter((a) => a.brand === brand);
  return items.length > 0 && !items.some((a) => isTraditionalAppliance(a.category));
}
