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
  // 월 전기요금이 없으면 10년 총비용을 계산할 수 없다.
  //
  // 예전에는 이 값이 모든 생활가전에 들어 있었지만 어느 것도 출처가 없었다
  // (docs/spec-audit.md). 근거 없는 숫자로 "10년에 이만큼 든다"를 계산해 보여 주는
  // 것이 이 사이트가 고치려던 문제 그 자체라, 값이 없으면 계산기를 그리지 않고
  // 가격 기반 레이아웃으로 내려간다. 출처를 확인해 값을 채우면 다시 나타난다.
  const monthlyElec = appliance.techSpecs.monthlyElectricityCost;
  if (isTraditionalAppliance(appliance.category) && monthlyElec) {
    return (
      <div className="space-y-12">
        <TcoCalculator appliance={appliance} />
        {appliance.techSpecs.energyGrade && (
          <EnergyGradeImpact
            currentGrade={appliance.techSpecs.energyGrade}
            monthlyElecCost={monthlyElec}
            purchasePrice={appliance.price ?? 0}
          />
        )}
      </div>
    );
  }

  const slots = getSectionSlots(appliance.category);
  // '10년 총비용'은 계산기를 그릴 때만 쓸 수 있는 제목이다.
  const title = monthlyElec ? slots.value.title : '가격 대비 가치';
  const { msrp, valueRating, priceTier, alternatives } = appliance.priceAnalysis;
  const tier = PRICE_TIER_LABELS[priceTier] ?? priceTier;

  const alts = alternatives
    .map((slug) => getApplianceBySlug(slug))
    .filter((a): a is Appliance => !!a);

  return (
    <section>
      <h2 className="text-xl font-bold text-gray-900 mb-4">{title}</h2>
      <div className="bg-white border rounded-xl p-6 space-y-5">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {msrp != null && (
            <div className="p-3 bg-gray-50 rounded-lg">
              {/* '정가'라고 쓰지 않는다 — 조사 시점의 시중 최저가다.
                  확인 날짜는 아래 '이 글의 근거' 블록에 가격 확인일로 적힌다. */}
              <p className="text-xs text-gray-500">조사 시점 가격</p>
              <p className="font-bold text-gray-900">{formatPrice(msrp)}</p>
            </div>
          )}
          <div className="p-3 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-500">가격대</p>
            <p className="font-bold text-gray-900">{tier}</p>
          </div>
        </div>

        {msrp == null && (
          <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
            이 제품은 시중가를 확인하지 못해 가격을 표시하지 않습니다. 렌탈 전용이거나
            일시불 판매가가 형성되지 않은 제품일 수 있습니다.
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
                    {BRAND_LABELS[a.brand] || a.brand} {a.name}
                    {a.price != null && ` — ${formatPrice(a.price)}`}
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
