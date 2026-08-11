import Link from 'next/link';
import type { MaterialRole } from '@/types/material';
import { getMaterialsByRole } from '@/lib/data/materials';

/** 위에서 아래로 쌓이는 순서. 피부에 닿는 쪽이 위다 */
const LAYERS: { role: MaterialRole; label: string; hint: string; fill: string }[] = [
  { role: '표면', label: '표면층', hint: '피부에 직접 닿는다', fill: '#eff6ff' },
  { role: '확산', label: '확산층', hint: '소변을 아래로 퍼뜨린다', fill: '#f0f9ff' },
  { role: '흡수', label: '흡수층', hint: '빨아들여 가둔다', fill: '#ecfdf5' },
  { role: '방수', label: '방수층', hint: '겉으로 새지 않게 막는다', fill: '#f5f3ff' },
  { role: '결합', label: '부속', hint: '붙이고 조인다', fill: '#fafafa' },
  { role: '첨가', label: '첨가', hint: '표시·향 등 부가 요소', fill: '#fefce8' },
];

const ROW_H = 62;
const GAP = 6;
const WIDTH = 560;

export function LayerDiagram() {
  const height = LAYERS.length * (ROW_H + GAP);

  // 층마다 '소재'(실제 구성 물질)와 '규제항목'(시험 대상이지 구성 물질이 아님)을 분리한다.
  // 규제항목을 소재와 나란히 나열하면 "이 층은 이것으로 만들어졌다"로 읽혀,
  // 이 사전이 하지 않기로 한 안전 판정처럼 보이게 된다.
  const rows = LAYERS.map((layer) => {
    const items = getMaterialsByRole(layer.role);
    const materialItems = items.filter((m) => m.kind === '소재');
    const regulatedItems = items.filter((m) => m.kind === '규제항목');
    return { layer, materialItems, regulatedItems };
  });

  const ariaLabel =
    '기저귀 층 구조, 피부에 닿는 쪽부터: ' +
    rows
      .map(({ layer, materialItems, regulatedItems }) => {
        const contents =
          materialItems.length > 0 ? materialItems.map((m) => m.name).join(', ') : '준비 중';
        const tested =
          regulatedItems.length > 0
            ? `, 이 층에서 시험: ${regulatedItems.map((m) => m.name).join(', ')}`
            : '';
        return `${layer.label} ${contents}${tested}`;
      })
      .join(' / ');

  return (
    <figure className="my-6">
      <svg
        viewBox={`0 0 ${WIDTH} ${height}`}
        className="w-full h-auto"
        role="img"
        aria-label={ariaLabel}
      >
        {rows.map(({ layer, materialItems, regulatedItems }, i) => {
          const y = i * (ROW_H + GAP);
          const contents =
            materialItems.length > 0 ? materialItems.map((m) => m.name).join(' · ') : '준비 중';
          const tested =
            regulatedItems.length > 0
              ? `이 층에서 시험: ${regulatedItems.map((m) => m.name).join(', ')}`
              : null;
          return (
            <g key={layer.role}>
              <rect
                x={0}
                y={y}
                width={WIDTH}
                height={ROW_H}
                rx={8}
                fill={layer.fill}
                stroke="#e5e7eb"
              />
              <text x={16} y={y + 26} fontSize={14} fontWeight={700} fill="#111827">
                {layer.label}
              </text>
              <text x={16} y={y + 46} fontSize={11} fill="#6b7280">
                {layer.hint}
              </text>
              <text
                x={WIDTH - 16}
                y={y + (tested ? 28 : 36)}
                fontSize={12}
                fill="#374151"
                textAnchor="end"
              >
                {contents}
              </text>
              {tested && (
                <text x={WIDTH - 16} y={y + 48} fontSize={10} fill="#9ca3af" textAnchor="end">
                  {tested}
                </text>
              )}
            </g>
          );
        })}
      </svg>

      {/* SVG 안의 텍스트는 링크로 만들기 어렵고 접근성도 나빠, 링크는 아래 목록으로 따로 낸다.
          소재와 규제항목(시험 대상)을 같은 줄에 섞지 않고 라벨로 구분해, SVG·aria-label과
          같은 구분을 유지한다. */}
      <figcaption className="mt-3 space-y-1.5 text-sm">
        {rows.map(({ layer, materialItems, regulatedItems }) => {
          if (materialItems.length === 0 && regulatedItems.length === 0) return null;
          return (
            <div key={layer.role} className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
              <span className="text-gray-500">{layer.label}</span>
              {materialItems.map((m) => (
                <Link
                  key={m.slug}
                  href={`/materials/${m.slug}`}
                  className="text-blue-600 hover:underline"
                >
                  {m.name}
                </Link>
              ))}
              {regulatedItems.length > 0 && (
                <>
                  <span className="text-gray-400 text-xs">이 층에서 시험:</span>
                  {regulatedItems.map((m) => (
                    <Link
                      key={m.slug}
                      href={`/materials/${m.slug}`}
                      className="text-blue-600 hover:underline"
                    >
                      {m.name}
                    </Link>
                  ))}
                </>
              )}
            </div>
          );
        })}
      </figcaption>
    </figure>
  );
}
