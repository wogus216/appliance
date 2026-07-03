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
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: appliance.rating,
      bestRating: 5,
      ratingCount: appliance.reviews.length || 1,
    },
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'KRW',
      lowPrice: appliance.priceAnalysis.streetPrice || appliance.price,
      highPrice: appliance.price,
      offerCount: appliance.purchaseLinks?.length || 1,
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
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
