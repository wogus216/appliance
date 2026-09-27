import Link from 'next/link';
import Image from 'next/image';
import { Appliance } from '@/types/appliance';
import { BRAND_LABELS, PRICE_TIER_LABELS } from '@/lib/constants';
import { formatPrice } from '@/lib/utils';
import { CategoryIcon } from '@/components/category-icon';
import { isTraditionalAppliance } from '@/lib/category-config';
import { ClipboardCheck } from 'lucide-react';

export function HeroSection({ appliance }: { appliance: Appliance }) {
  const brand = BRAND_LABELS[appliance.brand] || appliance.brand;

  return (
    <section className="flex flex-col md:flex-row gap-8">
      {/* 이미지 */}
      <div className="relative md:w-1/2 aspect-square bg-gray-50 rounded-2xl flex flex-col items-center justify-center gap-3 overflow-hidden">
        {appliance.image ? (
          <Image
            src={appliance.image}
            alt={`${brand} ${appliance.name}`}
            fill
            priority
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        ) : (
          <div className="flex flex-col items-center gap-3 text-gray-300">
            <CategoryIcon category={appliance.category} className="w-20 h-20" />
            <span className="text-lg font-medium text-gray-400">{brand}</span>
            <span className="text-xs text-gray-400">이미지 준비 중</span>
          </div>
        )}
      </div>

      {/* 정보 */}
      <div className="md:w-1/2 flex flex-col justify-center space-y-4">
        <div className="flex items-center gap-2">
          <Link
            href={`/brand/${appliance.brand}`}
            className="text-sm text-gray-500 hover:text-blue-600 transition-colors"
          >
            {brand}
          </Link>
          <span className="text-sm text-gray-300">|</span>
          <span className="text-sm text-gray-500">{appliance.category}</span>
        </div>

        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{appliance.name}</h1>

        {appliance.oneliner && (
          <p className="text-gray-600">{appliance.oneliner}</p>
        )}

        {appliance.price != null && (
          <p className="text-2xl font-bold text-gray-900">{formatPrice(appliance.price)}</p>
        )}

        {/* 결론으로 유도 — 구매처 직행 앵커는 본문 전체를 건너뛰게 하므로 쓰지 않는다 */}
        <a
          href="#verdict"
          className="inline-flex w-fit items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
        >
          <ClipboardCheck className="w-4 h-4" aria-hidden="true" />
          결론부터 보기
        </a>

        {/* 핵심 스펙 뱃지 */}
        <div className="flex flex-wrap gap-2 pt-1">
          <span className="px-3 py-1.5 bg-gray-100 rounded-lg text-sm text-gray-700">
            {PRICE_TIER_LABELS[appliance.priceAnalysis.priceTier] ??
              appliance.priceAnalysis.priceTier}
          </span>
          {appliance.techSpecs.energyGrade && (
            <span className="px-3 py-1.5 bg-gray-100 rounded-lg text-sm text-gray-700">
              {appliance.techSpecs.energyGrade}
            </span>
          )}
          <span className="px-3 py-1.5 bg-gray-100 rounded-lg text-sm text-gray-700">
            {appliance.techSpecs.capacity}
          </span>
          {isTraditionalAppliance(appliance.category) && appliance.specs.noise != null && (
            <span className="px-3 py-1.5 bg-gray-100 rounded-lg text-sm text-gray-700">
              소음 {appliance.specs.noise}dB
            </span>
          )}
          {appliance.techSpecs.monthlyElectricityCost && (
            <span className="px-3 py-1.5 bg-green-50 rounded-lg text-sm text-green-700">
              월 전기요금 ~{formatPrice(appliance.techSpecs.monthlyElectricityCost)}
            </span>
          )}
        </div>
      </div>
    </section>
  );
}
