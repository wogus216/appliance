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
import { getCoreAxes } from '@/lib/category-config';

const COLORS = ['#3b82f6', '#f97316', '#10b981', '#8b5cf6'];

export function CompareRadarChart({ appliances }: { appliances: CardAppliance[] }) {
  // 비교 대상 카테고리의 핵심 5축을 사용 (동일 카테고리 비교 전제, 혼합 시 첫 항목 기준)
  const category = appliances[0]?.category ?? '에어컨';
  const axes = getCoreAxes(category);

  const data = axes.map((ax) => {
    const point: Record<string, string | number> = { subject: ax.label };
    appliances.forEach((a, i) => {
      point[`v${i}`] = ax.invert
        ? Math.max(1, Math.round(10 - a.specs.noise / 5))
        : a.specs[ax.key];
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
