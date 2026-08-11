import { Appliance } from '@/types/appliance';
import { ROOM_SIZE_LABELS } from '@/lib/constants';
import { getSectionSlots, liftExtraSpecs } from '@/lib/category-config';
import { SpecGrid } from '@/components/detail/spec-grid';

/**
 * 슬롯 ③ — "내 환경에 맞나".
 * 가전은 RoomFit(평수·적용면적·설치), 비가전은 slots.fit.liftLabels로 끌어올린 extraSpecs.
 */
export function FitSection({ appliance }: { appliance: Appliance }) {
  const slots = getSectionSlots(appliance.category);
  const { roomFit, techSpecs } = appliance;

  const lifted = liftExtraSpecs(techSpecs.extraSpecs, slots.fit.liftLabels);

  // 치수·무게는 카테고리를 가리지 않고 "들어가나"에 직결되므로 항상 앞에 붙인다.
  const dimensionItems = [
    ...(techSpecs.dimensions ? [{ label: '크기', value: techSpecs.dimensions }] : []),
    ...(techSpecs.weight ? [{ label: '무게', value: `${techSpecs.weight}kg` }] : []),
  ];

  return (
    <section>
      <h2 className="text-xl font-bold text-gray-900 mb-4">{slots.fit.title}</h2>
      <div className="bg-white border rounded-xl p-6 space-y-4">
        {roomFit && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-500">추천 평수</p>
              <p className="font-bold text-gray-900">
                {roomFit.recommendedSize.map((s) => ROOM_SIZE_LABELS[s] || s).join(', ')}
              </p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-500">적용 면적</p>
              <p className="font-bold text-gray-900">{roomFit.coverageArea}m2</p>
            </div>
            {roomFit.installationType && (
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-500">설치 타입</p>
                <p className="font-bold text-gray-900">{roomFit.installationType}</p>
              </div>
            )}
          </div>
        )}

        <SpecGrid items={[...dimensionItems, ...lifted]} />

        {roomFit?.installationNote && (
          <p className="text-sm text-gray-500 bg-yellow-50 p-3 rounded-lg">
            설치 참고: {roomFit.installationNote}
          </p>
        )}
      </div>
    </section>
  );
}
