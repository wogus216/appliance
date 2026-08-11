import { Appliance } from '@/types/appliance';
import { getSectionSlots, liftExtraSpecs, isTraditionalAppliance } from '@/lib/category-config';
import { NoiseComparison } from '@/components/detail/noise-comparison';
import { SpecGrid } from '@/components/detail/spec-grid';

/**
 * 슬롯 ⑤ — "기대에 못 미치지 않나".
 * 가전은 소음 비교, 비가전은 slots.risk.liftLabels로 끌어올린 extraSpecs.
 */
export function RiskSection({ appliance }: { appliance: Appliance }) {
  if (isTraditionalAppliance(appliance.category)) {
    return <NoiseComparison noise={appliance.specs.noise} />;
  }

  const slots = getSectionSlots(appliance.category);
  const lifted = liftExtraSpecs(appliance.techSpecs.extraSpecs, slots.risk.liftLabels);

  return (
    <section>
      <h2 className="text-xl font-bold text-gray-900 mb-4">{slots.risk.title}</h2>
      <div className="bg-white border rounded-xl p-6">
        <SpecGrid items={lifted} />
      </div>
    </section>
  );
}
