import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/constants';
import { getErrorCodeBrands } from '@/lib/error-codes';
import { getIndexableBlogPosts } from '@/lib/blog';
import { resolveLastModified } from '@/lib/data/site-revisions';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    '/', '/error-codes', ...getErrorCodeBrands().map((brand) => `/error-codes/${brand}`),
    '/error-codes/Cuckoo/dishwasher/e4', '/error-codes/SKMagic/dishwasher/e4', '/error-codes/Haier/air-conditioner/f25',
    '/tools', '/tools/repair-replace', '/tools/care-plan', '/tools/household-care', '/blog',
    '/about', '/editorial-policy', '/methodology', '/contact', '/privacy', '/terms',
  ];
  return [
    ...paths.map((path) => {
      const lastModified = resolveLastModified(path, undefined);
      return { url: `${SITE_URL}${path === '/' ? '' : path}`, ...(lastModified ? { lastModified } : {}) };
    }),
    ...getIndexableBlogPosts().map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: resolveLastModified(`/blog/${post.slug}`, post.updatedAt),
    })),
  ];
}
