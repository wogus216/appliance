import Link from 'next/link';
import { Appliance } from '@/types/appliance';
import { getSectionSlots, isTraditionalAppliance } from '@/lib/category-config';
import { BRAND_LABELS } from '@/lib/constants';
import { formatPrice } from '@/lib/utils';
import { getApplianceBySlug } from '@/lib/data/appliances';
import { getProductEditorial } from '@/lib/data/editorial';
import { getPriceVariant } from '@/lib/price-source';
import { TcoCalculator } from '@/components/detail/tco-calculator';
import { EnergyGradeImpact } from '@/components/detail/energy-grade-impact';

/**
 * 비교 제품의 가격 한 줄. 차액은 두 가격이 모두 있고 **같은 날 조사한 값일 때만** 계산한다.
 * 조사일이 다르면 차액이 시점 차이까지 섞여 의미가 없어서, 각 가격과 날짜만 적는다.
 */
function describeAltPrice(
  alt: Appliance,
  ownPrice: number | undefined,
  ownCheckedAt: string | undefined,
): string {
  if (alt.price == null) return '가격 미확인';
  const altCheckedAt = getProductEditorial(alt.slug)?.priceCheckedAt;
  // 가격을 확인한 상품이 색상·구성만 다른 상품이면 그 사실을 붙인다(price-source.ts)
  const altVariant = getPriceVariant(alt.slug);
  const tags = [altCheckedAt ? `${altCheckedAt} 조사` : '', altVariant ? `${altVariant} 상품 가격` : '']
    .filter(Boolean)
    .join(', ');
  const priced = `${formatPrice(alt.price)}${tags ? `(${tags})` : ''}`;
  if (ownPrice == null || !ownCheckedAt || altCheckedAt !== ownCheckedAt) return priced;
  const diff = alt.price - ownPrice;
  if (diff === 0) return `${priced}, 이 제품과 같은 조사 가격`;
  return `${priced}, 이 제품보다 ${formatPrice(Math.abs(diff))} ${diff > 0 ? '높음' : '낮음'}`;
}

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
  const { msrp, alternatives } = appliance.priceAnalysis;
  const priceCheckedAt = getProductEditorial(appliance.slug)?.priceCheckedAt;

  // 가격대(보급형·중급·프리미엄·최고급) 칩은 그리지 않는다(2026-10-08).
  // priceTier는 데이터에 손으로 적은 값이고 등급을 가르는 가격 구간이 어디에도 없었다.
  // 가격을 확인하지 못한 제품 9개에도 '프리미엄'·'중급'이 떴고, 조사가 123만원(무빙스타일)은
  // '프리미엄'인데 129만원(스탠바이미2 맥스)은 '최고급'처럼 기준 없이 갈렸다.
  // 대신 같은 날 조사한 가격끼리의 차액을 보여 준다 — 계산할 수 있는 비교만 싣는다.
  const alts = alternatives
    .map((slug) => getApplianceBySlug(slug))
    .filter((a): a is Appliance => !!a);

  return (
    <section>
      <h2 className="text-xl font-bold text-gray-900 mb-4">{title}</h2>
      <div className="bg-white border rounded-xl p-6 space-y-5">
        {msrp != null ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <div className="p-3 bg-gray-50 rounded-lg">
              {/* '정가'라고 쓰지 않는다 — 조사 시점의 시중 최저가다. */}
              <p className="text-xs text-gray-500">
                {priceCheckedAt ? `${priceCheckedAt} 조사 가격` : '조사 시점 가격'}
              </p>
              <p className="font-bold text-gray-900">{formatPrice(msrp)}</p>
              {getPriceVariant(appliance.slug) && (
                <p className="text-xs text-gray-500 mt-0.5">{getPriceVariant(appliance.slug)} 상품 가격</p>
              )}
            </div>
          </div>
        ) : (
          // 왜 가격이 없는지 추측하지 않는다(예전 문구: "렌탈 전용이거나 … 일 수 있습니다").
          // 확인하지 못했다는 사실과, 그 때문에 이 화면이 하지 않는 계산만 적는다.
          // 2026-10-09 4차: "아래 제품과의 가격 차이"는 비교 목록이 있을 때만 쓴다(DV17·AR07은 목록이 없다).
          // "도크·설치"는 로봇청소기 말이라 정수기·냉장고·에어컨에도 나가던 것을 품목 중립 표현으로 바꿨다.
          <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
            이 제품은 일시불 판매가를 확인하지 못해 가격을 싣지 않았습니다
            {alts.length > 0 ? '. 그래서 아래 제품과의 가격 차이도 계산하지 않았습니다' : ''}.
            판매처 가격을 볼 때는 모델번호({appliance.modelNumber})가 정확히 같은지, 구성품과
            설치 포함 여부가 같은지부터 맞춘 뒤 비교하세요.
          </p>
        )}

        {alts.length > 0 && (
          <div className="border-t pt-4">
            {/* '같은 값이면 이것도'라고 쓰지 않는다 — 대안 목록은 가격이 같아서 고른 것이 아니고,
                가격을 모르는 두 제품끼리 묶이기도 했다(R5 ↔ 제트봇 AI). */}
            <h3 className="font-semibold text-gray-800 text-sm mb-2">함께 비교할 제품</h3>
            <ul className="space-y-1.5">
              {alts.map((a) => (
                <li key={a.slug}>
                  <Link
                    href={`/products/${a.slug}`}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    {BRAND_LABELS[a.brand] || a.brand} {a.name}
                  </Link>
                  <span className="text-sm text-gray-600">
                    {' — '}
                    {describeAltPrice(a, msrp, priceCheckedAt)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
