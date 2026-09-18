import { Appliance } from '@/types/appliance';
import { BRAND_LABELS, SITE_URL } from '@/lib/constants';
import { isTraditionalAppliance } from '@/lib/category-config';
import { getValidPurchaseLinks } from '@/lib/purchase-links';

export function ProductJsonLd({ appliance }: { appliance: Appliance }) {
  const brand = BRAND_LABELS[appliance.brand] || appliance.brand;
  const validPurchaseLinks = getValidPurchaseLinks(appliance.purchaseLinks);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `${brand} ${appliance.name}`,
    description: appliance.description,
    brand: {
      '@type': 'Brand',
      name: brand,
    },
    model: appliance.modelNumber,
    category: appliance.category,
    ...(appliance.image && {
      image: `${SITE_URL}${appliance.image}`,
    }),
    // aggregateRating 미표기: 리뷰가 에디터 종합 평가(/about 고지)라 사용자 평점으로
    // 마크업하면 Google 리뷰 스니펫 정책 위반 소지가 있음
    // offers는 가격을 확인했고 화면에 실제 구매처가 있는 제품에만 낸다. 구매처 섹션이
    // 없는 페이지가 "판매 중"을 선언하면 마크업이 화면과 어긋난다(2026-09-18 진단: 12개).
    // 재고(availability)는 우리가 확인할 수 없는 값이라 선언하지 않는다.
    ...(appliance.price == null || validPurchaseLinks.length === 0
      ? {}
      : {
          offers: {
            '@type': 'AggregateOffer',
            priceCurrency: 'KRW',
            lowPrice: appliance.price,
            highPrice: appliance.price,
            offerCount: validPurchaseLinks.length,
            url: `${SITE_URL}/products/${appliance.slug}`,
          },
        }),
    additionalProperty: [
      ...(appliance.techSpecs.energyGrade
        ? [{
            '@type': 'PropertyValue',
            name: '에너지효율등급',
            value: appliance.techSpecs.energyGrade,
          }]
        : []),
      {
        '@type': 'PropertyValue',
        name: '용량',
        value: appliance.techSpecs.capacity,
      },
      ...(isTraditionalAppliance(appliance.category) && appliance.specs.noise != null
        ? [{
            '@type': 'PropertyValue',
            name: '소음',
            value: `${appliance.specs.noise}dB`,
          }]
        : []),
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
    />
  );
}
