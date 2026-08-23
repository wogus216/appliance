'use client';

import { X } from 'lucide-react';
import Link from 'next/link';
import type { CardAppliance } from '@/types/appliance';
import { BRAND_LABELS, EDITOR_RATING_LABEL } from '@/lib/constants';
import { getCoreAxes, isTraditionalAppliance } from '@/lib/category-config';
import { cn, formatPrice } from '@/lib/utils';

type CompareTableProps = {
  appliances: CardAppliance[];
  onRemove?: (id: string) => void;
};

function CompareRow({
  label,
  values,
  highlight = 'none',
  format,
}: {
  label: string;
  values: (string | number)[];
  highlight?: 'min' | 'max' | 'none';
  format?: (v: string | number) => string;
}) {
  const nums = values.map(v => (typeof v === 'number' ? v : parseFloat(String(v)) || 0));
  const min = Math.min(...nums.filter(n => n > 0));
  const max = Math.max(...nums);

  return (
    <tr className="border-b border-gray-100">
      <td className="whitespace-nowrap bg-gray-50 py-3 px-4 text-sm font-medium text-gray-600">
        {label}
      </td>
      {values.map((value, idx) => {
        const num = typeof value === 'number' ? value : parseFloat(String(value)) || 0;
        const isBest =
          highlight !== 'none' &&
          num > 0 &&
          ((highlight === 'min' && num === min) || (highlight === 'max' && num === max));

        return (
          <td
            key={idx}
            className={cn(
              "py-3 px-4 text-sm text-center",
              isBest && "bg-blue-50 text-blue-700 font-semibold"
            )}
          >
            {format ? format(value) : value}
          </td>
        );
      })}
    </tr>
  );
}

export function CompareTable({ appliances, onRemove }: CompareTableProps) {
  return (
    <section className="bg-white border rounded-2xl p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">상세 비교</h2>

      {/* 모바일 카드 */}
      <div className="space-y-4 md:hidden">
        {appliances.map(a => {
          const brand = BRAND_LABELS[a.brand] || a.brand;
          return (
            <div key={a.id} className="rounded-xl border p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-xs text-gray-500">{brand} · {a.category}</p>
                  <Link href={`/products/${a.slug}`} className="font-bold text-gray-900 hover:text-blue-600">
                    {a.name}
                  </Link>
                </div>
                {onRemove && (
                  <button
                    type="button"
                    onClick={() => onRemove(a.id)}
                    aria-label="비교에서 제거"
                    className="p-2 rounded-full bg-gray-100 text-gray-400 hover:bg-red-100 hover:text-red-500"
                  >
                    <X className="h-4 w-4" aria-hidden="true" />
                  </button>
                )}
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="rounded-lg bg-gray-50 p-2 text-center">
                  <p className="text-[10px] text-gray-500">가격</p>
                  <p className="font-bold text-xs">
                    {a.price != null ? `${Math.round(a.price / 10000)}만원` : '—'}
                  </p>
                </div>
                {isTraditionalAppliance(a.category) ? (
                  <>
                    <div className="rounded-lg bg-gray-50 p-2 text-center">
                      <p className="text-[10px] text-gray-500">효율</p>
                      <p className="font-bold text-xs">{a.specs.energyEfficiency}/10</p>
                    </div>
                    {a.specs.noise != null && (
                      <div className="rounded-lg bg-gray-50 p-2 text-center">
                        <p className="text-[10px] text-gray-500">소음</p>
                        <p className="font-bold text-xs">{a.specs.noise}dB</p>
                      </div>
                    )}
                    <div className="rounded-lg bg-gray-50 p-2 text-center">
                      <p className="text-[10px] text-gray-500">성능</p>
                      <p className="font-bold text-xs">{a.specs.performance}/10</p>
                    </div>
                  </>
                ) : (
                  getCoreAxes(a.category).slice(0, 3).map((ax) => (
                    <div key={ax.label} className="rounded-lg bg-gray-50 p-2 text-center">
                      <p className="text-[10px] text-gray-500">{ax.label}</p>
                      <p className="font-bold text-xs">{a.specs[ax.key]}/10</p>
                    </div>
                  ))
                )}
                <div className="rounded-lg bg-gray-50 p-2 text-center">
                  <p className="text-[10px] text-gray-500">{EDITOR_RATING_LABEL}</p>
                  <p className="font-bold text-xs">{a.rating}</p>
                </div>
              </div>
              <Link
                href={`/products/${a.slug}`}
                className="block mt-3 w-full rounded-lg bg-blue-600 py-2.5 text-center text-sm font-semibold text-white hover:bg-blue-700"
              >
                상세 보기
              </Link>
            </div>
          );
        })}
      </div>

      {/* 데스크톱 테이블 */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full min-w-[600px]">
          <thead>
            <tr className="border-b-2 border-gray-200">
              <th className="w-36 bg-gray-50 py-4 px-4 text-left text-sm font-semibold text-gray-900">항목</th>
              {appliances.map(a => (
                <th key={a.id} className="py-4 px-4 text-center min-w-[160px]">
                  <div className="relative">
                    {onRemove && (
                      <button
                        type="button"
                        onClick={() => onRemove(a.id)}
                        aria-label="비교에서 제거"
                        className="absolute -top-1 -right-1 p-1 rounded-full bg-gray-100 text-gray-400 hover:bg-red-100 hover:text-red-500"
                      >
                        <X className="h-3 w-3" aria-hidden="true" />
                      </button>
                    )}
                    <p className="text-xs text-gray-500">{BRAND_LABELS[a.brand] || a.brand}</p>
                    <Link href={`/products/${a.slug}`} className="text-sm font-bold text-gray-900 hover:text-blue-600">
                      {a.name}
                    </Link>
                    <p className="text-xs text-gray-400 mt-0.5">{a.category}</p>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="bg-gray-800">
              <td colSpan={appliances.length + 1} className="py-2 px-4 text-xs font-bold text-white uppercase tracking-wider">
                가격 / {EDITOR_RATING_LABEL}
              </td>
            </tr>
            <CompareRow
              label="가격"
              values={appliances.map((a): string | number => a.price ?? '—')}
              highlight="min"
              format={v => (typeof v === 'number' ? formatPrice(v) : '—')}
            />
            <CompareRow
              label={EDITOR_RATING_LABEL}
              values={appliances.map(a => a.rating)}
              highlight="max"
              format={v => `${v} / 5`}
            />

            <tr className="bg-gray-800">
              <td colSpan={appliances.length + 1} className="py-2 px-4 text-xs font-bold text-white uppercase tracking-wider">
                핵심 스펙
              </td>
            </tr>
            {isTraditionalAppliance(appliances[0]?.category ?? '에어컨') ? (
              <>
                <CompareRow
                  label="에너지효율"
                  values={appliances.map(a => a.specs.energyEfficiency)}
                  highlight="max"
                  format={v => `${v}/10`}
                />
                <CompareRow
                  label="성능"
                  values={appliances.map(a => a.specs.performance)}
                  highlight="max"
                  format={v => `${v}/10`}
                />
                {appliances.some(a => a.specs.noise != null) && (
                  <CompareRow
                    label="소음"
                    values={appliances.map((a): string | number => a.specs.noise ?? '—')}
                    highlight="min"
                    format={v => (typeof v === 'number' ? `${v}dB` : '—')}
                  />
                )}
              </>
            ) : (
              getCoreAxes(appliances[0]?.category ?? '무선이어폰').map((ax) => (
                <CompareRow
                  key={ax.label}
                  label={ax.label}
                  values={appliances.map((a): string | number => a.specs[ax.key] ?? '—')}
                  highlight="max"
                  format={v => (typeof v === 'number' ? `${v}/10` : '—')}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
