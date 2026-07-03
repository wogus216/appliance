import { RoomFit, TechSpecs } from '@/types/appliance';
import { ROOM_SIZE_LABELS } from '@/lib/constants';

export function RoomFitSection({
  roomFit,
  techSpecs,
}: {
  roomFit: RoomFit;
  techSpecs: TechSpecs;
}) {
  return (
    <section>
      <h2 className="text-xl font-bold text-gray-900 mb-4">평수별 적합도</h2>
      <div className="bg-white border rounded-xl p-6 space-y-4">
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

        {/* 기술 스펙 */}
        <div className="border-t pt-4 space-y-2">
          <h3 className="font-semibold text-gray-800 text-sm">상세 기술 사양</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex justify-between py-1.5 border-b border-gray-100">
              <span className="text-gray-500">핵심 기술</span>
              <span className="text-gray-900 font-medium">{techSpecs.coreTechnology}</span>
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
          </div>
        </div>

        {roomFit.installationNote && (
          <p className="text-sm text-gray-500 bg-yellow-50 p-3 rounded-lg">
            설치 참고: {roomFit.installationNote}
          </p>
        )}
      </div>
    </section>
  );
}
