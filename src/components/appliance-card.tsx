import Link from 'next/link';
import Image from 'next/image';
import { CardAppliance } from '@/types/appliance';
import { BRAND_LABELS, EDITOR_RATING_LABEL } from '@/lib/constants';
import { formatPrice } from '@/lib/utils';
import { CategoryIcon } from '@/components/category-icon';
import { isTraditionalAppliance } from '@/lib/category-config';
import { Star, Zap, Volume2 } from 'lucide-react';

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
          {appliance.status && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-blue-600 text-white font-medium ml-auto">
              {appliance.status === 'new' && '신제품'}
              {appliance.status === 'featured' && '추천'}
              {appliance.status === 'best' && 'BEST'}
              {appliance.status === 'updated' && '업데이트'}
            </span>
          )}
        </div>

        <h3 className="font-semibold text-gray-900 text-sm leading-tight group-hover:text-blue-600 transition-colors">
          {appliance.name}
        </h3>

        {appliance.oneliner && (
          <p className="text-xs text-gray-500 line-clamp-2">{appliance.oneliner}</p>
        )}

        {/* 스펙 뱃지 */}
        <div className="flex items-center gap-3 text-xs text-gray-600 pt-1">
          {/* 축은 카테고리마다 다르고 카드 투영에 이미 계산돼 있다.
              '효율 8/10'을 모든 가전에 붙이던 자리다 — 효율관리기자재 비대상 품목
              (선풍기·공기청정기·정수기·로봇청소기)에는 등급 표기 자체가 없는데
              효율 점수만 붙어 있었다. */}
          {appliance.axes.slice(0, 2).map((ax) => (
            <span key={ax.label} className="flex items-center gap-1">
              <Zap className="w-3 h-3" aria-hidden="true" />
              {ax.label} {ax.value}/10
            </span>
          ))}
          {isTraditionalAppliance(appliance.category) && appliance.specs.noise != null && (
            <span className="flex items-center gap-1">
              <Volume2 className="w-3 h-3" aria-hidden="true" />
              {appliance.specs.noise}dB
            </span>
          )}
        </div>

        {/* 가격 + 별점 */}
        <div className="flex items-center justify-between pt-2">
          <span className="font-bold text-gray-900">
            {appliance.price != null ? formatPrice(appliance.price) : '가격 미확인'}
          </span>
          {/* 숫자만 두면 사용자 평점으로 읽힌다. 평가 주체를 라벨로 붙인다. */}
          <span
            className="flex items-center gap-1 text-yellow-500"
            title={`${EDITOR_RATING_LABEL} ${appliance.rating}/5`}
          >
            <Star className="w-3.5 h-3.5 fill-current" aria-hidden="true" />
            <span className="text-xs font-medium text-gray-600">
              {EDITOR_RATING_LABEL} {appliance.rating}
            </span>
          </span>
        </div>
      </div>
    </Link>
  );
}
