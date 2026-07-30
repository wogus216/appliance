import { Appliance } from '@/types/appliance';
import { BRAND_LABELS, SITE_URL } from '@/lib/constants';
import { isTraditionalAppliance } from '@/lib/category-config';

export function ProductJsonLd({ appliance }: { appliance: Appliance }) {
  const brand = BRAND_LABELS[appliance.brand] || appliance.brand;

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
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'KRW',
      lowPrice: appliance.priceAnalysis.streetPrice || appliance.price,
      highPrice: appliance.price,
      offerCount: appliance.purchaseLinks?.length || 1,
      availability: 'https://schema.org/InStock',
      url: `${SITE_URL}/products/${appliance.slug}`,
    },
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
      ...(isTraditionalAppliance(appliance.category)
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
