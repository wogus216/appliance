'use client';

import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import type { CardAppliance } from '@/types/appliance';
import { BRAND_LABELS } from '@/lib/constants';

const COLORS = ['#3b82f6', '#f97316', '#10b981', '#8b5cf6'];

export function CompareRadarChart({ appliances }: { appliances: CardAppliance[] }) {
  // 축은 카드 투영에서 이미 계산돼 있다(scoring.ts). 다만 제품마다 축 구성이 다를 수
  // 있으므로 — 같은 카테고리라도 에너지등급 표기가 없으면 그 축이 빠진다 — 전원이
  // 공통으로 가진 축만 그린다. 한쪽에만 있는 축을 0이나 중간값으로 메우면 비교
  // 차트가 없는 값을 있는 것처럼 보여 준다.
  const first = appliances[0]?.axes ?? [];
  const usableAxes = first.filter((ax) =>
    appliances.every((a) => a.axes.some((x) => x.label === ax.label)),
  );

  const data = usableAxes.map((ax) => {
    const point: Record<string, string | number> = { subject: ax.label };
    appliances.forEach((a, i) => {
      point[`v${i}`] = a.axes.find((x) => x.label === ax.label)!.value;
    });
    return point;
  });

  return (
    <section className="bg-white border rounded-2xl p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">스펙 비교 차트</h2>
      <div className="w-full h-[320px]" role="img" aria-label="제품 비교 레이더 차트">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data}>
            <PolarGrid strokeDasharray="3 3" />
            <PolarAngleAxis dataKey="subject" tick={{ fontSize: 13, fill: '#4b5563' }} />
            <PolarRadiusAxis angle={30} domain={[0, 10]} tick={{ fontSize: 11 }} />
            {appliances.map((a, i) => (
              <Radar
                key={a.id}
                name={`${BRAND_LABELS[a.brand] || a.brand} ${a.name}`}
                dataKey={`v${i}`}
                stroke={COLORS[i]}
                fill={COLORS[i]}
                fillOpacity={0.15}
                strokeWidth={2}
              />
            ))}
            <Legend />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
