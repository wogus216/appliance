import { Check } from 'lucide-react';
import { Appliance } from '@/types/appliance';
import { getDetailedReview } from '@/lib/data/detailed-reviews';
import { getSectionSlots, isTraditionalAppliance, liftExtraSpecs } from '@/lib/category-config';

/**
 * 섹션 ⑥ — 근거.
 * 전체 스펙표는 techSpecs와 extraSpecs를 담되, 위 적합성(fit)·위험(risk) 절에 이미 나온 항목은 다시 싣지 않는다.
 * 2026-10-09 4차: 예전에는 "누락을 원천 차단"하려고 끌어올린 항목(크기·무게·배터리·코덱 등)을 여기 다시
 * 적어, 무빙스타일 등 모든 제품 페이지에 같은 사양 박스가 두 번 나온다는 지적을 받았다. 누락은 위 절이
 * 같은 데이터로 그리므로 생기지 않는다.
 */
export function PerformanceSection({ appliance }: { appliance: Appliance }) {
  const { techSpecs, features } = appliance;
  const sections = getDetailedReview(appliance.slug);
  const slots = getSectionSlots(appliance.category);
  // fit 절(FitSection)이 그리는 extraSpecs, risk 절(RiskSection)이 소음 비교 대신 사양 표를 그릴 때의 extraSpecs
  const shownAbove = new Set([
    ...liftExtraSpecs(techSpecs.extraSpecs, slots.fit.liftLabels).map((s) => s.label),
    ...(isTraditionalAppliance(appliance.category) && appliance.specs.noise != null
      ? []
      : liftExtraSpecs(techSpecs.extraSpecs, slots.risk.liftLabels).map((s) => s.label)),
  ]);
  const remainingExtra = (techSpecs.extraSpecs ?? []).filter((s) => !shownAbove.has(s.label));

  return (
    <section className="space-y-8">
      <h2 className="text-xl font-bold text-gray-900">상세 스펙과 근거</h2>

      {sections && sections.length > 0 && (
        <div className="space-y-5">
          {sections.map((s, i) => (
            <div key={i}>
              <h3 className="font-bold text-gray-900 mb-1.5">{s.heading}</h3>
              <p className="text-gray-700 leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      )}

      {features.length > 0 && (
        <div>
          <h3 className="font-bold text-gray-900 mb-3">핵심 기능</h3>
          <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2.5">
            {features.map((f, i) => (
              <li key={i} className="flex gap-2 text-sm text-gray-700">
                <Check className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" aria-hidden="true" />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="bg-white border rounded-xl p-6">
        <h3 className="font-semibold text-gray-800 text-sm mb-3">상세 기술 사양</h3>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex justify-between py-1.5 border-b border-gray-100">
            <span className="text-gray-500">핵심 기술</span>
            <span className="text-gray-900 font-medium">{techSpecs.coreTechnology}</span>
          </div>
          <div className="flex justify-between py-1.5 border-b border-gray-100">
            <span className="text-gray-500">용량</span>
            <span className="text-gray-900 font-medium">{techSpecs.capacity}</span>
          </div>
          {techSpecs.energyGrade && (
            <div className="flex justify-between py-1.5 border-b border-gray-100">
              <span className="text-gray-500">에너지등급</span>
              <span className="text-gray-900 font-medium">{techSpecs.energyGrade}</span>
            </div>
          )}
          {techSpecs.filterType && (
            <div className="flex justify-between py-1.5 border-b border-gray-100">
              <span className="text-gray-500">필터</span>
              <span className="text-gray-900 font-medium">{techSpecs.filterType}</span>
            </div>
          )}
          {techSpecs.refrigerant && (
            <div className="flex justify-between py-1.5 border-b border-gray-100">
              <span className="text-gray-500">냉매</span>
              <span className="text-gray-900 font-medium">{techSpecs.refrigerant}</span>
            </div>
          )}
          {/* 크기·무게는 적합성 절(FitSection)이 모든 품목에서 그린다 */}
          {remainingExtra.map((s) => (
            <div key={s.label} className="flex justify-between py-1.5 border-b border-gray-100">
              <span className="text-gray-500">{s.label}</span>
              <span className="text-gray-900 font-medium">{s.value}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
