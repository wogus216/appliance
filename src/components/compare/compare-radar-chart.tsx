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

function specsToRadar(specs: CardAppliance['specs']) {
  return {
    energyEfficiency: specs.energyEfficiency,
    performance: specs.performance,
    convenience: specs.convenience,
    durability: specs.durability,
    noise: Math.max(1, Math.round(10 - specs.noise / 5)),
  };
}

export function CompareRadarChart({ appliances }: { appliances: CardAppliance[] }) {
  const dimensions = [
    { key: 'energyEfficiency', label: '에너지효율' },
    { key: 'performance', label: '성능' },
    { key: 'convenience', label: '편의기능' },
    { key: 'durability', label: '내구성' },
    { key: 'noise', label: '저소음' },
  ] as const;

  const data = dimensions.map(dim => {
    const point: Record<string, string | number> = { subject: dim.label };
    appliances.forEach((a, i) => {
      const radar = specsToRadar(a.specs);
      point[`v${i}`] = radar[dim.key];
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
