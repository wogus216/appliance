import { allAppliances } from '@/lib/data/appliances';
import { BRAND_LABELS } from '@/lib/constants';
import { FRIDGE_ENERGY_MEASUREMENTS } from '@/lib/data/energy-measurements';
import type { EnergyComparisonProduct } from '@/lib/energy-comparison';

/** 공개 카탈로그의 정확한 모델과 원문을 대조한 신고값만 클라이언트에 전달한다. */
export function getFridgeEnergyProducts(): EnergyComparisonProduct[] {
  return Object.values(FRIDGE_ENERGY_MEASUREMENTS).flatMap((measurement) => {
    const product = allAppliances.find((appliance) => appliance.category === '냉장고' && appliance.modelNumber === measurement.modelNumber);
    if (!product) return [];
    return [{
      slug: product.slug,
      modelNumber: product.modelNumber,
      name: product.name,
      brandLabel: BRAND_LABELS[product.brand] ?? product.brand,
      measurement,
      capacity: product.techSpecs.capacity ?? '미확인',
      dimensions: product.techSpecs.dimensions ?? '미확인',
      installationNote: product.roomFit?.installationNote ?? '모델별 설치 설명서를 확인하세요.',
    }];
  });
}
