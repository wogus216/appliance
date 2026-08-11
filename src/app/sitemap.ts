import type { MetadataRoute } from 'next';
import { allAppliances, getAllBrands } from '@/lib/data/appliances';
import { getAllErrorCodeParams, errorCodeHref } from '@/lib/error-codes';
import { CATEGORY_SLUGS } from '@/lib/category-config';
import { SITE_URL } from '@/lib/constants';
import { allMaterials } from '@/lib/data/materials';

// output: 'export' 에서 메타데이터 라우트는 정적 생성을 명시해야 한다.
export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const products = allAppliances
    .filter(a => !a.noindex)
    .map(a => ({
    url: `${SITE_URL}/products/${a.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const categories = Object.values(CATEGORY_SLUGS).map((slug) => ({
    url: `${SITE_URL}/category/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  const brands = getAllBrands().map(b => ({
    url: `${SITE_URL}/brand/${b}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  const errorCodePages = getAllErrorCodeParams().map(({ brand, code }) => ({
    url: `${SITE_URL}${errorCodeHref(brand, code)}`,
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

  const materialPages = allMaterials.map((m) => ({
    url: `${SITE_URL}/materials/${m.slug}`,
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
    {
      url: `${SITE_URL}/materials`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    ...['about', 'contact', 'privacy', 'terms'].map((p) => ({
      url: `${SITE_URL}/${p}`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    })),
    ...categories,
    ...brands,
    ...errorCodeBrandHubs,
    ...errorCodePages,
    ...materialPages,
    ...products,
  ];
}
