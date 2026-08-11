import { ExtraSpec } from '@/types/appliance';

/** 라벨/값 쌍을 카드 그리드로 표기. fit·risk 슬롯이 공유한다. */
export function SpecGrid({ items }: { items: ExtraSpec[] }) {
  if (items.length === 0) return null;
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      {items.map((s) => (
        <div key={s.label} className="p-3 bg-gray-50 rounded-lg">
          <p className="text-xs text-gray-500">{s.label}</p>
          <p className="font-bold text-gray-900">{s.value}</p>
        </div>
      ))}
    </div>
  );
}
