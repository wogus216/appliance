import { ApplianceCategory, ApplianceSpecs } from '@/types/appliance';
import { getCoreAxes, isTraditionalAppliance } from '@/lib/category-config';

// 레이더 차트 기하 상수
const SIZE = 300;
const CENTER = SIZE / 2;
const MAX_RADIUS = 90;
const LABEL_RADIUS = MAX_RADIUS + 22;
const RING_FRACTIONS = [1 / 3, 2 / 3, 1];

/** 축 인덱스(0..n-1)를 직교 좌표로 변환. angle = -90deg + i*(360/n)deg */
function axisAngle(i: number, n: number): number {
  return (-90 + i * (360 / n)) * (Math.PI / 180);
}
function axisPoint(i: number, radius: number, n: number): { x: number; y: number } {
  const angle = axisAngle(i, n);
  return {
    x: CENTER + radius * Math.cos(angle),
    y: CENTER + radius * Math.sin(angle),
  };
}

/** 주어진 반지름에서 n각형 꼭짓점들의 "x,y x,y ..." points 문자열 생성 */
function polygonPoints(radius: number, n: number): string {
  return Array.from({ length: n }, (_, i) => {
    const { x, y } = axisPoint(i, radius, n);
    return `${x.toFixed(2)},${y.toFixed(2)}`;
  }).join(' ');
}

export function SpecRadar({
  specs,
  category,
}: {
  specs: ApplianceSpecs;
  category: ApplianceCategory;
}) {
  const traditional = isTraditionalAppliance(category);

  const data = getCoreAxes(category).map((ax) => ({
    subject: ax.label,
    value: ax.invert
      ? Math.max(1, 10 - Math.floor(specs.noise / 5))
      : specs[ax.key],
  }));
  // 생활가전은 6번째 축(저전력)을 소비전력에서 파생해 기존 렌더를 그대로 유지
  if (traditional) {
    data.push({
      subject: '저전력',
      value: Math.max(1, 10 - Math.floor(specs.powerConsumption / 400)),
    });
  }

  const n = data.length;

  // 데이터 폴리곤 꼭짓점 (value/10 비율로 반지름 산정)
  const dataVertices = data.map((d, i) => {
    const radius = (Math.max(0, Math.min(10, d.value)) / 10) * MAX_RADIUS;
    return axisPoint(i, radius, n);
  });
  const dataPolygonPoints = dataVertices
    .map((p) => `${p.x.toFixed(2)},${p.y.toFixed(2)}`)
    .join(' ');

  const ariaLabel =
    '스펙 레이더 차트: ' +
    data.map((d) => `${d.subject} ${d.value}/10`).join(', ');

  return (
    <section>
      <h2 className="text-xl font-bold text-gray-900 mb-4">스펙 분석</h2>
      <div className="bg-white border rounded-xl p-6">
        <svg
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          className="w-full h-auto max-w-sm mx-auto"
          role="img"
          aria-label={ariaLabel}
        >
          {/* 배경 격자: 동심 n각형 링 + 중심에서 각 꼭짓점으로 향하는 스포크 */}
          <g aria-hidden="true">
            {RING_FRACTIONS.map((f) => (
              <polygon
                key={f}
                points={polygonPoints(MAX_RADIUS * f, n)}
                fill="none"
                stroke="#e5e7eb"
                strokeWidth={1}
              />
            ))}
            {Array.from({ length: n }, (_, i) => {
              const outer = axisPoint(i, MAX_RADIUS, n);
              return (
                <line
                  key={i}
                  x1={CENTER}
                  y1={CENTER}
                  x2={outer.x}
                  y2={outer.y}
                  stroke="#e5e7eb"
                  strokeWidth={1}
                />
              );
            })}
          </g>

          {/* 데이터 폴리곤 */}
          <polygon
            aria-hidden="true"
            points={dataPolygonPoints}
            fill="#3b82f6"
            fillOpacity={0.2}
            stroke="#3b82f6"
            strokeWidth={2}
            strokeLinejoin="round"
          />

          {/* 꼭짓점 점 */}
          <g aria-hidden="true">
            {dataVertices.map((p, i) => (
              <circle key={i} cx={p.x} cy={p.y} r={3} fill="#3b82f6" />
            ))}
          </g>

          {/* 축 라벨 */}
          <g aria-hidden="true" fontSize={11} fill="#4b5563">
            {data.map((d, i) => {
              const { x, y } = axisPoint(i, LABEL_RADIUS, n);
              const cos = Math.cos(axisAngle(i, n));
              const sin = Math.sin(axisAngle(i, n));
              const textAnchor =
                Math.abs(cos) < 0.15 ? 'middle' : cos > 0 ? 'start' : 'end';
              const baseline =
                Math.abs(sin) < 0.15 ? 'middle' : sin > 0 ? 'hanging' : 'auto';
              return (
                <text
                  key={i}
                  x={x.toFixed(2)}
                  y={y.toFixed(2)}
                  textAnchor={textAnchor}
                  dominantBaseline={baseline}
                >
                  {d.subject}
                </text>
              );
            })}
          </g>
        </svg>

        {/* 수치 테이블 */}
        {traditional ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-500">소비전력</p>
              <p className="font-bold text-gray-900">{specs.powerConsumption}W</p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-500">소음</p>
              <p className="font-bold text-gray-900">{specs.noise}dB</p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-500">에너지효율</p>
              <p className="font-bold text-gray-900">{specs.energyEfficiency}/10</p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-500">성능</p>
              <p className="font-bold text-gray-900">{specs.performance}/10</p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-500">편의기능</p>
              <p className="font-bold text-gray-900">{specs.convenience}/10</p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-500">내구성</p>
              <p className="font-bold text-gray-900">{specs.durability}/10</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
            {data.map((d) => (
              <div key={d.subject} className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-500">{d.subject}</p>
                <p className="font-bold text-gray-900">{d.value}/10</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
