import { Appliance, ApplianceCategory } from '@/types/appliance';
import { getSectionSlots, liftExtraSpecs } from '@/lib/category-config';
import { SpecGrid } from '@/components/detail/spec-grid';
import { hasStandIncludedWeight } from '@/lib/comparisons';

/** 1평 = 3.3058㎡ (에어컨 가이드의 "18.7㎡는 약 5.7평"과 같은 환산) */
const M2_PER_PYEONG = 3.3058;

/**
 * 적용 면적 옆에 평 환산을 붙이는 품목. 에어컨(냉방 면적)과 공기청정기(표준사용면적)는
 * 카테고리 가이드가 그 숫자의 뜻과 한계를 설명한다. 로봇청소기 등 다른 품목의 면적 값은
 * 무엇을 잰 값인지 화면에서 정리돼 있지 않아 환산하지 않는다.
 */
const PYEONG_CATEGORIES = new Set<ApplianceCategory>(['에어컨', '공기청정기']);

/**
 * 슬롯 ③ — "내 환경에 맞나".
 * 가전은 RoomFit(적용면적·설치), 비가전은 slots.fit.liftLabels로 끌어올린 extraSpecs.
 */
export function FitSection({ appliance }: { appliance: Appliance }) {
  const slots = getSectionSlots(appliance.category);
  const { roomFit, techSpecs } = appliance;

  const lifted = liftExtraSpecs(techSpecs.extraSpecs, slots.fit.liftLabels);

  // 치수·무게는 카테고리를 가리지 않고 "들어가나"에 직결되므로 항상 앞에 붙인다.
  const dimensionItems = [
    ...(techSpecs.dimensions ? [{ label: '크기', value: techSpecs.dimensions }] : []),
    // 스탠드형 TV(무빙스타일)의 weight는 스탠드를 뺀 화면 무게다 — 전체 무게는 '스탠드 포함 무게'로 따로 뜬다
    ...(techSpecs.weight
      ? [{ label: hasStandIncludedWeight(appliance) ? '무게(스탠드 제외)' : '무게', value: `${techSpecs.weight}kg` }]
      : []),
  ];

  return (
    <section>
      <h2 className="text-xl font-bold text-gray-900 mb-4">{slots.fit.title}</h2>
      <div className="bg-white border rounded-xl p-6 space-y-4">
        {roomFit && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {/* '추천 평수' 칩(원룸 7평 이하~초대형 35평 이상)은 그리지 않는다(2026-10-08).
                recommendedSize는 손으로 적은 값이고 근거 칸이 없다. 냉장고·로봇청소기·정수기처럼
                면적 기준이 없는 품목에도 붙어 있었고, 면적이 있는 품목에서도 제조사 값과 어긋났다 —
                교정 전 렌더 기준 샤오미 공기청정기 4(최대 48㎡ ≈ 14.5평)에 '중형(15~25평)', 다이슨
                TP07(27㎡ ≈ 8.2평)에 '중형', 하이얼 CTH10QBW(33㎡ ≈ 10평)에 '중형'. 데이터를 맞춰도 칩은
                면적을 다시 구간으로 바꾼 것일 뿐이라, 면적은 아래 적용 면적과 평 환산으로만 보인다.
                recommendedSize 데이터는 지우지 않는다(비공개 제품 공유 필드). */}
            {/* 냉장고·세탁기처럼 적용 면적 개념이 없는 카테고리는 이 값이 0이다.
                0을 그대로 찍으면 "적용 면적 0 m2"가 되어, 값이 없는 항목은 감춘다는
                편집 원칙(/about)과 정면으로 어긋난다. */}
            {roomFit.coverageArea !== undefined && roomFit.coverageArea > 0 && (
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-500">적용 면적</p>
                <p className="font-bold text-gray-900">
                  {roomFit.coverageArea}m2
                  {/* 평 환산은 표시 면적의 뜻이 가이드로 정리된 품목에만 붙인다(1평 = 3.3058㎡) */}
                  {PYEONG_CATEGORIES.has(appliance.category) && (
                    <span className="ml-1 text-sm font-normal text-gray-600">
                      (약 {(roomFit.coverageArea / M2_PER_PYEONG).toFixed(1)}평)
                    </span>
                  )}
                </p>
              </div>
            )}
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
          <p className="text-sm text-yellow-900 bg-yellow-50 p-3 rounded-lg">
            설치 참고: {roomFit.installationNote}
          </p>
        )}
      </div>
    </section>
  );
}
