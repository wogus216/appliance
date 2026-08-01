import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/constants';

// output: 'export' 에서 메타데이터 라우트는 정적 생성을 명시해야 한다.
export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
