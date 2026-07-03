import type { MetadataRoute } from 'next';
import { allAppliances, getAllBrands } from '@/lib/data/appliances';
import { getAllErrorCodeParams } from '@/lib/error-codes';
import { SITE_URL } from '@/lib/constants';

export default function sitemap(): MetadataRoute.Sitemap {
  const products = allAppliances
    .filter(a => !a.noindex)
    .map(a => ({
    url: `${SITE_URL}/products/${a.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const brands = getAllBrands().map(b => ({
    url: `${SITE_URL}/brand/${b}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  const errorCodePages = getAllErrorCodeParams().map(({ brand, code }) => ({
    url: `${SITE_URL}/error-codes/${brand}/${code}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }));

  const errorCodeBrandHubs = [
    ...new Set(getAllErrorCodeParams().map(({ brand }) => brand)),
  ].map((brand) => ({
    url: `${SITE_URL}/error-codes/${brand}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${SITE_URL}/compare`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/error-codes`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    ...['about', 'contact', 'privacy', 'terms'].map((p) => ({
      url: `${SITE_URL}/${p}`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    })),
    ...brands,
    ...errorCodeBrandHubs,
    ...errorCodePages,
    ...products,
  ];
}
