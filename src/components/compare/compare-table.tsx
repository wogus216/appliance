'use client';

import { X } from 'lucide-react';
import Link from 'next/link';
import type { CardAppliance } from '@/types/appliance';
import { BRAND_LABELS } from '@/lib/constants';
import { gradeRank } from '@/lib/energy-grade';
import { isTraditionalAppliance } from '@/lib/category-config';
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
  // 점수 줄은 없다(2026-09-27). 출처가 있는 값만 맞댄다 — 가격·에너지등급·용량·소음(dB).
  const hasGrade = appliances.some((a) => a.energyGrade);

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
                {a.energyGrade && (
                  <div className="rounded-lg bg-gray-50 p-2 text-center">
                    <p className="text-[10px] text-gray-500">에너지등급</p>
                    <p className="font-bold text-xs">{a.energyGrade}</p>
                  </div>
                )}
                {isTraditionalAppliance(a.category) && a.specs.noise != null && (
                  <div className="rounded-lg bg-gray-50 p-2 text-center">
                    <p className="text-[10px] text-gray-500">소음</p>
                    <p className="font-bold text-xs">{a.specs.noise}dB</p>
                  </div>
                )}
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
                가격
              </td>
            </tr>
            <CompareRow
              label="가격"
              values={appliances.map((a): string | number => a.price ?? '—')}
              highlight="min"
              format={v => (typeof v === 'number' ? formatPrice(v) : '—')}
            />

            <tr className="bg-gray-800">
              <td colSpan={appliances.length + 1} className="py-2 px-4 text-xs font-bold text-white uppercase tracking-wider">
                핵심 스펙
              </td>
            </tr>
            {/* 등급 표기가 없는 품목은 '—'로 둔다. 값을 지어내지 않는다. 1등급이 가장 낮은 수라 min을 강조한다 */}
            {hasGrade && (
              <CompareRow
                label="에너지등급"
                values={appliances.map((a): string | number =>
                  a.energyGrade ? gradeRank(a.energyGrade) : '—',
                )}
                highlight="min"
                format={v => (typeof v === 'number' ? `${v}등급` : '—')}
              />
            )}
            <CompareRow label="용량" values={appliances.map((a) => a.capacity || '—')} />
            {/* 소음은 이중 슬롯이다 — 생활가전만 dB이고 TV·무선이어폰의 값은 옛 편집 점수다.
                모바일 카드처럼 생활가전에서만 dB로 읽는다(예전에는 냉장고와 이어폰을 함께 고르면
                이어폰 점수 '9'가 '9dB'로 찍혀 최저값 강조까지 받았다).
                최저값 강조도 하지 않는다 — 측정 조건이 제조사마다 달라 낮은 숫자가 더 조용하다는
                근거가 되지 않는다(/methodology '이 방법의 한계'). */}
            {appliances.some(a => isTraditionalAppliance(a.category) && a.specs.noise != null) && (
              <CompareRow
                label="소음(제조사 표기)"
                values={appliances.map((a): string | number =>
                  isTraditionalAppliance(a.category) && a.specs.noise != null ? a.specs.noise : '—',
                )}
                format={v => (typeof v === 'number' ? `${v}dB` : '—')}
              />
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
