import { Appliance, CardAppliance, ApplianceCategory } from '@/types/appliance';
import { displayedEnergyGrade } from '@/lib/energy-grade';
import { byCategoryThenName } from '@/lib/catalog-order';
import { samsungAppliances } from './samsung';
import { lgAppliances } from './lg';
import { carrierAppliances } from './carrier';
import { tclAppliances } from './tcl';
import { haierAppliances } from './haier';
import { dysonAppliances } from './dyson';
import { shinilAppliances } from './shinil';
import { xiaomiAppliances } from './xiaomi';
import { cowayAppliances } from './coway';
import { winixAppliances } from './winix';
import { skmagicAppliances } from './skmagic';
import { cuckooAppliances } from './cuckoo';
import { roborockAppliances } from './roborock';
import { appleAppliances } from './apple';
import { sonyAppliances } from './sony';
import { ankerAppliances } from './anker';
import { qcyAppliances } from './qcy';
import { UNVERIFIED_SLUGS } from './unverified';

/**
 * 저장소에 들어 있는 전체 카탈로그 — 공개 여부와 무관하다.
 *
 * 데이터 무결성 검사(슬러그 유일성·상호참조·심층리뷰 커버리지)와 감사 스크립트만
 * 이것을 본다. 화면을 그리는 코드는 절대 이것을 쓰지 말 것.
 */
export const allCatalogAppliances: Appliance[] = [
  ...samsungAppliances,
  ...lgAppliances,
  ...carrierAppliances,
  ...tclAppliances,
  ...haierAppliances,
  ...dysonAppliances,
  ...shinilAppliances,
  ...xiaomiAppliances,
  ...cowayAppliances,
  ...winixAppliances,
  ...skmagicAppliances,
  ...cuckooAppliances,
  ...roborockAppliances,
  ...appleAppliances,
  ...sonyAppliances,
  ...ankerAppliances,
  ...qcyAppliances,
];

/**
 * 공개 카탈로그 — 화면에 나가는 유일한 목록.
 *
 * 모델번호를 확인하지 못한 제품(unverified.ts)은 여기서 빠진다. 페이지 생성,
 * 목록·검색·비교·유사제품·에러코드 집계가 모두 이 배열 하나를 거치므로,
 * 어딘가에서 필터를 빠뜨려 미검증 제품이 새어 나갈 구멍이 없다.
 *
 * 2026-08-23 감사에서 74개 중 39개가 여기서 빠졌다. 사유와 복구 절차는
 * docs/model-number-audit.md 와 unverified.ts 주석에 있다.
 */
export const allAppliances: Appliance[] = allCatalogAppliances.filter(
  (a) => !UNVERIFIED_SLUGS.has(a.slug),
);

export function getApplianceBySlug(slug: string): Appliance | undefined {
  return allAppliances.find((a) => a.slug === slug);
}

export function getAppliancesByCategory(category: ApplianceCategory): Appliance[] {
  return allAppliances.filter((a) => a.category === category);
}

export function getAppliancesByBrand(brand: string): Appliance[] {
  return allAppliances.filter((a) => a.brand === brand);
}

/**
 * 카탈로그 항목을 카드용 경량 타입으로 투영한다.
 *
 * 점수는 싣지 않는다 — 카드에 나가는 수치는 가격·에너지등급·소음(dB)처럼 출처가 있는
 * 값뿐이다(src/lib/energy-grade.ts).
 */
export function toCardAppliance(a: Appliance): CardAppliance {
  return {
    id: a.id,
    slug: a.slug,
    brand: a.brand,
    name: a.name,
    category: a.category,
    energyGrade: displayedEnergyGrade(a),
    capacity: a.techSpecs.capacity,
    image: a.image,
    price: a.price,
    oneliner: a.oneliner,
    status: a.status,
    tags: a.tags,
    specs: { noise: a.specs.noise },
  };
}

/** 목록의 기본 순서 — 카테고리(카탈로그 등장 순) → 제품명. 근거는 src/lib/catalog-order.ts */
export function compareByDefaultOrder(
  a: Pick<CardAppliance, 'category' | 'name'>,
  b: Pick<CardAppliance, 'category' | 'name'>,
): number {
  return byCategoryThenName(getAllCategories())(a, b);
}

export function getCardAppliances(): CardAppliance[] {
  // 가격은 근거를 확인한 제품에만 있다. 값이 없다고 목록에서 빼지는 않는다.
  return allAppliances.map(toCardAppliance).sort(compareByDefaultOrder);
}

export function getSimilarProducts(slug: string): CardAppliance[] {
  const appliance = getApplianceBySlug(slug);
  if (!appliance) return [];
  return appliance.similarProducts
    .map((s) => allAppliances.find((a) => a.slug === s))
    .filter((a): a is Appliance => !!a)
    .map(toCardAppliance);
}

export function getAllCategories(): ApplianceCategory[] {
  return [...new Set(allAppliances.map((a) => a.category))];
}

export function getAllBrands(): string[] {
  return [...new Set(allAppliances.map((a) => a.brand))];
}
