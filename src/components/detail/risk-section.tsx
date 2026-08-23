import { Appliance } from '@/types/appliance';
import { getSectionSlots, liftExtraSpecs, isTraditionalAppliance } from '@/lib/category-config';
import { hasRiskSection } from '@/lib/detail-sections';
import { NoiseComparison } from '@/components/detail/noise-comparison';
import { SpecGrid } from '@/components/detail/spec-grid';

/**
 * 슬롯 ⑤ — "기대에 못 미치지 않나".
 * 가전은 소음 비교, 비가전은 slots.risk.liftLabels로 끌어올린 extraSpecs.
 *
 * 소음(dB)은 제조사가 공개하지 않는 경우가 많아 없을 수 있다. 그때는 근거 없는
 * 숫자로 비교 그래프를 그리는 대신 사양 표로 내려가고, 보여 줄 사양조차 없으면
 * 섹션 자체를 그리지 않는다(hasRiskSection이 같은 판단을 공유한다).
 */
export function RiskSection({ appliance }: { appliance: Appliance }) {
  if (!hasRiskSection(appliance)) return null;
  if (isTraditionalAppliance(appliance.category) && appliance.specs.noise != null) {
    return <NoiseComparison noise={appliance.specs.noise} />;
  }

  const slots = getSectionSlots(appliance.category);
  const lifted = liftExtraSpecs(appliance.techSpecs.extraSpecs, slots.risk.liftLabels);
  if (lifted.length === 0) return null;

  return (
    <section>
      <h2 className="text-xl font-bold text-gray-900 mb-4">{slots.risk.title}</h2>
      <div className="bg-white border rounded-xl p-6">
        <SpecGrid items={lifted} />
      </div>
    </section>
  );
}
