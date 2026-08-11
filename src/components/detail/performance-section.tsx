import { Check } from 'lucide-react';
import { Appliance } from '@/types/appliance';
import { getDetailedReview } from '@/lib/data/detailed-reviews';
import { SpecRadar } from '@/components/detail/spec-radar';

/**
 * 섹션 ⑥ — 근거.
 * 전체 스펙표는 techSpecs 전 필드 + extraSpecs 전량을 담는다.
 * fit·risk 슬롯으로 끌어올린 항목도 여기 중복 표기해 누락을 원천 차단한다.
 */
export function PerformanceSection({ appliance }: { appliance: Appliance }) {
  const { techSpecs, features } = appliance;
  const sections = getDetailedReview(appliance.slug);

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

      <SpecRadar specs={appliance.specs} category={appliance.category} />

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
          {techSpecs.dimensions && (
            <div className="flex justify-between py-1.5 border-b border-gray-100">
              <span className="text-gray-500">크기</span>
              <span className="text-gray-900 font-medium">{techSpecs.dimensions}</span>
            </div>
          )}
          {techSpecs.weight && (
            <div className="flex justify-between py-1.5 border-b border-gray-100">
              <span className="text-gray-500">무게</span>
              <span className="text-gray-900 font-medium">{techSpecs.weight}kg</span>
            </div>
          )}
          {techSpecs.extraSpecs?.map((s) => (
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
