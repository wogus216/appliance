import { Appliance } from '@/types/appliance';
import { isTraditionalAppliance } from '@/lib/category-config';
import { describeAxisBasis, getScoreAxes } from '@/lib/scoring';

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

export function SpecRadar({ appliance }: { appliance: Appliance }) {
  const { specs, category } = appliance;
  const traditional = isTraditionalAppliance(category);

  // 축 구성과 근거 구분은 scoring.ts 한 곳에서 정한다. 종합 5점 점수도 같은 축을
  // 평균해 나오므로, 그래프와 점수가 어긋날 수 없다.
  const axes = getScoreAxes(appliance);
  const data = axes.map((ax) => ({ subject: ax.label, value: ax.value, scope: ax.scope }));

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
      <h3 className="font-bold text-gray-900 mb-1">항목별 평가</h3>
      <p className="text-sm text-gray-500 mb-4">
        {/* 축마다 근거가 다르므로 실제로 그려진 축만 보고 문장을 만든다.
            '카테고리 내 상대 평가'라고 쓰던 자리다 — 공개 카탈로그에 같은 카테고리
            제품이 한 대뿐인 페이지에서도 "제품들과 비교했다"고 말하고 있었다. */}
        {describeAxisBasis(axes)}
      </p>
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

        {/* 수치 테이블 — 그려진 축 + 확인된 원 수치.
            소비전력·소음은 점수로 환산하지 않고 W·dB 그대로 싣는다. 예전에는
            `10 - floor(W/400)`, `10 - floor(dB/5)` 로 축을 만들었는데 카테고리를
            가리지 않는 고정 구간이라 2,955W 정수기와 36dB 냉장고가 나란히 3점이 됐고,
            소음 dB를 확인한 제품만 축이 늘어 평균이 깎였다. */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
          {data.map((d) => (
            <div key={d.subject} className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-500">{d.subject}</p>
              <p className="font-bold text-gray-900">{d.value}/10</p>
              {/* 편집팀 판단 축에는 무엇을 보고 매긴 점수인지 함께 적는다.
                  규칙으로 묶을 수 없는 축이라 최소한 범위는 밝혀야 한다. */}
              {d.scope && <p className="mt-1 text-[11px] leading-snug text-gray-400">{d.scope}</p>}
            </div>
          ))}
          {specs.powerConsumption != null && (
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-500">소비전력</p>
              <p className="font-bold text-gray-900">{specs.powerConsumption}W</p>
            </div>
          )}
          {traditional && specs.noise != null && (
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-500">소음</p>
              <p className="font-bold text-gray-900">{specs.noise}dB</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
