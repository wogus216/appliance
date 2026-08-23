import Link from 'next/link';
import { Appliance } from '@/types/appliance';
import { getSectionSlots, isTraditionalAppliance } from '@/lib/category-config';
import { PRICE_TIER_LABELS, BRAND_LABELS, EDITOR_RATING_LABEL } from '@/lib/constants';
import { formatPrice } from '@/lib/utils';
import { getApplianceBySlug } from '@/lib/data/appliances';
import { TcoCalculator } from '@/components/detail/tco-calculator';
import { EnergyGradeImpact } from '@/components/detail/energy-grade-impact';
import { StarRating } from '@/components/detail/star-rating';

/**
 * 슬롯 ④ — "돈이 더 들거나 값어치를 못 하지 않나".
 * 가전은 10년 총비용(TCO)+에너지등급 영향, 비가전은 전기요금이 무의미하므로
 * priceAnalysis(정가·실거래가·가성비·대안)로 대체한다.
 */
export function ValueSection({ appliance }: { appliance: Appliance }) {
  if (isTraditionalAppliance(appliance.category)) {
    const hasEnergyImpact =
      !!appliance.techSpecs.monthlyElectricityCost && !!appliance.techSpecs.energyGrade;
    return (
      <div className="space-y-12">
        <TcoCalculator appliance={appliance} />
        {hasEnergyImpact && (
          <EnergyGradeImpact
            currentGrade={appliance.techSpecs.energyGrade!}
            monthlyElecCost={appliance.techSpecs.monthlyElectricityCost!}
            purchasePrice={appliance.priceAnalysis.streetPrice || appliance.price}
          />
        )}
      </div>
    );
  }

  const slots = getSectionSlots(appliance.category);
  const { msrp, streetPrice, valueRating, priceTier, alternatives } = appliance.priceAnalysis;
  const tier = PRICE_TIER_LABELS[priceTier] ?? priceTier;
  const discount = streetPrice && streetPrice < msrp ? msrp - streetPrice : 0;
  const discountRate = discount ? Math.round((discount / msrp) * 100) : 0;

  const alts = alternatives
    .map((slug) => getApplianceBySlug(slug))
    .filter((a): a is Appliance => !!a);

  return (
    <section>
      <h2 className="text-xl font-bold text-gray-900 mb-4">{slots.value.title}</h2>
      <div className="bg-white border rounded-xl p-6 space-y-5">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <div className="p-3 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-500">정가</p>
            <p className="font-bold text-gray-900">{formatPrice(msrp)}</p>
          </div>
          {streetPrice && (
            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="text-xs text-blue-600">실거래가</p>
              <p className="font-bold text-blue-700">{formatPrice(streetPrice)}</p>
            </div>
          )}
          <div className="p-3 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-500">가격대</p>
            <p className="font-bold text-gray-900">{tier}</p>
          </div>
        </div>

        {discount > 0 && (
          <p className="text-sm text-gray-700 bg-green-50 p-3 rounded-lg">
            정가 대비 <strong>{formatPrice(discount)}</strong> ({discountRate}%) 낮은 가격에
            거래되고 있습니다.
          </p>
        )}

        <div className="flex items-center gap-3 border-t pt-4">
          <span className="text-sm text-gray-500">가성비 ({EDITOR_RATING_LABEL})</span>
          <StarRating rating={valueRating} label={`가성비 ${EDITOR_RATING_LABEL}`} />
        </div>

        {alts.length > 0 && (
          <div className="border-t pt-4">
            <h3 className="font-semibold text-gray-800 text-sm mb-2">같은 값이면 이것도</h3>
            <ul className="space-y-1.5">
              {alts.map((a) => (
                <li key={a.slug}>
                  <Link
                    href={`/products/${a.slug}`}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    {BRAND_LABELS[a.brand] || a.brand} {a.name} — {formatPrice(a.price)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
