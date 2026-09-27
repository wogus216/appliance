import Link from 'next/link';
import Image from 'next/image';
import { CardAppliance } from '@/types/appliance';
import { BRAND_LABELS } from '@/lib/constants';
import { formatPrice } from '@/lib/utils';
import { CategoryIcon } from '@/components/category-icon';
import { isTraditionalAppliance } from '@/lib/category-config';
import { Zap, Volume2 } from 'lucide-react';

export function ApplianceCard({ appliance }: { appliance: CardAppliance }) {
  const brandLabel = BRAND_LABELS[appliance.brand] || appliance.brand;

  return (
    <Link
      href={`/products/${appliance.slug}`}
      className="group block rounded-xl border bg-white p-4 hover:shadow-lg transition-shadow"
    >
      {/* 이미지 영역 */}
      <div className="relative aspect-[4/3] bg-gray-50 rounded-lg mb-3 flex flex-col items-center justify-center overflow-hidden">
        {appliance.image ? (
          <Image
            src={appliance.image}
            alt={`${brandLabel} ${appliance.name}`}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover group-hover:scale-105 transition-transform"
          />
        ) : (
          <div className="flex flex-col items-center gap-2 text-gray-300 group-hover:text-gray-400 transition-colors">
            <CategoryIcon category={appliance.category} />
            <span className="text-sm font-medium text-gray-400">{brandLabel}</span>
          </div>
        )}
      </div>

      {/* 정보 */}
      <div className="space-y-1.5">
        <div className="flex items-center gap-1.5">
          <span className="text-xs text-gray-500">{brandLabel}</span>
          <span className="text-xs text-gray-300">|</span>
          <span className="text-xs text-gray-500">{appliance.category}</span>
        </div>

        <h3 className="font-semibold text-gray-900 text-sm leading-tight group-hover:text-blue-600 transition-colors">
          {appliance.name}
        </h3>

        {appliance.oneliner && (
          <p className="text-xs text-gray-500 line-clamp-2">{appliance.oneliner}</p>
        )}

        {/* 스펙 뱃지 */}
        <div className="flex items-center gap-3 text-xs text-gray-600 pt-1">
          {/* 출처가 있는 값만 싣는다 — 점수 축을 붙이던 자리다(2026-09-27에 걷었다).
              등급 표기가 없는 품목(선풍기·공기청정기·정수기·로봇청소기·TV·이어폰)은 비운다. */}
          {appliance.energyGrade && (
            <span className="flex items-center gap-1">
              <Zap className="w-3 h-3" aria-hidden="true" />
              에너지 {appliance.energyGrade}
            </span>
          )}
          {isTraditionalAppliance(appliance.category) && appliance.specs.noise != null && (
            <span className="flex items-center gap-1">
              <Volume2 className="w-3 h-3" aria-hidden="true" />
              {appliance.specs.noise}dB
            </span>
          )}
        </div>

        {/* 가격 */}
        <div className="pt-2">
          <span className="font-bold text-gray-900">
            {appliance.price != null ? formatPrice(appliance.price) : '가격 미확인'}
          </span>
        </div>
      </div>
    </Link>
  );
}
