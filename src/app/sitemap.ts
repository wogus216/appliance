import type { MetadataRoute } from 'next';
import { allAppliances, getAllBrands, getCardAppliances } from '@/lib/data/appliances';
import { getBrandProfile } from '@/lib/data/brands';
import { getErrorCodeBrands, getBrandErrorCodes } from '@/lib/error-codes';
import { getCategoryGuide } from '@/lib/data/category-guides';
import { CATEGORY_SLUGS, getCategoryBySlug } from '@/lib/category-config';
import { SITE_URL } from '@/lib/constants';
import { allMaterials } from '@/lib/data/materials';
import { getProductEditorial } from '@/lib/data/editorial';
import {
  isProductIndexable,
  isCategoryIndexable,
  isBrandIndexable,
  isErrorCodeHubIndexable,
  isMaterialIndexable,
  isMaterialsHubIndexable,
  isBlogHubIndexable,
} from '@/lib/content-quality';
import { getIndexableBlogPosts } from '@/lib/blog';

// output: 'export' 에서 메타데이터 라우트는 정적 생성을 명시해야 한다.
export const dynamic = 'force-static';

/**
 * lastModified 규칙 — 빌드 시각을 넣지 않는다.
 *
 * 예전에는 모든 URL에 `new Date()`를 넣었다. 그러면 내용을 한 글자도 안 고친
 * 페이지도 배포할 때마다 "방금 수정됨"이 되고, 크롤러 입장에서는 lastmod 전체가
 * 신뢰할 수 없는 값이 된다. 그건 그 자체로 저품질 신호다.
 *
 * 그래서:
 *   - 콘텐츠가 실제 검수 날짜를 갖고 있으면 그 날짜를 쓴다.
 *   - 모르면 lastModified를 아예 넣지 않는다(선택 필드다).
 */
function entry(
  url: string,
  opts: {
    lastModified?: string;
    changeFrequency?: MetadataRoute.Sitemap[number]['changeFrequency'];
    priority?: number;
  } = {},
): MetadataRoute.Sitemap[number] {
  return {
    url,
    ...(opts.lastModified ? { lastModified: opts.lastModified } : {}),
    ...(opts.changeFrequency ? { changeFrequency: opts.changeFrequency } : {}),
    ...(opts.priority !== undefined ? { priority: opts.priority } : {}),
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  // 색인 품질 기준을 통과한 제품만. 판정은 products/[slug]/page.tsx의
  // generateMetadata와 같은 함수(isProductIndexable)를 쓴다 —
  // 사이트맵에 있는데 noindex인 URL이 생기지 않도록.
  const products = allAppliances.filter(isProductIndexable).map((a) =>
    entry(`${SITE_URL}/products/${a.slug}`, {
      lastModified: getProductEditorial(a.slug)?.updatedAt,
      changeFrequency: 'monthly',
      priority: 0.8,
    }),
  );

  const cards = getCardAppliances();

  const categories = Object.values(CATEGORY_SLUGS)
    .filter((slug) => {
      const category = getCategoryBySlug(slug);
      if (!category) return false;
      return isCategoryIndexable({
        productCount: cards.filter((a) => a.category === category).length,
        hasGuide: !!getCategoryGuide(category),
      });
    })
    .map((slug) => {
      const category = getCategoryBySlug(slug)!;
      return entry(`${SITE_URL}/category/${slug}`, {
        // 가이드는 'YYYY-MM'까지만 기록한다. 없는 일자를 만들어 붙이지 않고 그대로 쓴다.
        lastModified: getCategoryGuide(category)?.updated,
        changeFrequency: 'monthly',
        priority: 0.9,
      });
    });

  const brands = getAllBrands()
    .filter((b) => {
      const profile = getBrandProfile(b);
      return isBrandIndexable({
        productCount: cards.filter((a) => a.brand === b).length,
        hasProfile: !!profile,
        profileSourceCount: profile?.sources.length ?? 0,
      });
    })
    .map((b) =>
      entry(`${SITE_URL}/brand/${b}`, {
        lastModified: getBrandProfile(b)?.updated,
        changeFrequency: 'monthly',
        priority: 0.6,
      }),
    );

  const errorCodeBrandHubs = getErrorCodeBrands()
    .filter((brand) =>
      isErrorCodeHubIndexable({
        entryCount: getBrandErrorCodes(brand).reduce((n, g) => n + g.entries.length, 0),
      }),
    )
    .map((brand) =>
      entry(`${SITE_URL}/error-codes/${brand}`, {
        changeFrequency: 'monthly',
        priority: 0.7,
      }),
    );

  const materialPages = allMaterials
    .filter((m) =>
      isMaterialIndexable({
        sourceCount: m.sources.length,
        bodyChars: (m.what + m.whyUsed + (m.concern ?? '')).trim().length,
      }),
    )
    .map((m) =>
      entry(`${SITE_URL}/materials/${m.slug}`, {
        lastModified: m.updated,
        changeFrequency: 'monthly',
        priority: 0.6,
      }),
    );

  // 블로그 — 색인 기준을 통과한 글만. 판정은 blog/[slug]/page.tsx와 같은 함수를 쓴다.
  const blogPosts = getIndexableBlogPosts();
  const blogEntries = blogPosts.map((p) =>
    entry(`${SITE_URL}/blog/${p.slug}`, {
      lastModified: p.updatedAt,
      changeFrequency: 'monthly',
      priority: 0.8,
    }),
  );

  return [
    // 홈의 canonical은 '/'이고 Next가 metadataBase와 합쳐 슬래시 없는 SITE_URL을 낸다.
    // 사이트맵도 같은 형태를 써야 한다.
    entry(SITE_URL, { changeFrequency: 'daily', priority: 1 }),
    entry(`${SITE_URL}/compare`, { changeFrequency: 'weekly', priority: 0.7 }),
    entry(`${SITE_URL}/error-codes`, { changeFrequency: 'weekly', priority: 0.7 }),
    // 블로그 허브는 실을 글이 하나라도 있을 때만 싣는다.
    ...(isBlogHubIndexable({ indexablePostCount: blogPosts.length })
      ? [entry(`${SITE_URL}/blog`, { changeFrequency: 'weekly', priority: 0.8 })]
      : []),
    // 성분 사전 허브는 항목이 목록으로 성립할 때만 싣는다.
    ...(isMaterialsHubIndexable({ entryCount: allMaterials.length })
      ? [entry(`${SITE_URL}/materials`, { changeFrequency: 'monthly', priority: 0.7 })]
      : []),
    // 편집 신뢰 문서는 정책 페이지보다 우선순위를 높게 둔다 — 사이트 신뢰도의 근거다.
    ...['editorial-policy', 'methodology'].map((p) =>
      entry(`${SITE_URL}/${p}`, { changeFrequency: 'yearly', priority: 0.5 }),
    ),
    ...['about', 'contact', 'privacy', 'terms'].map((p) =>
      entry(`${SITE_URL}/${p}`, { changeFrequency: 'yearly', priority: 0.3 }),
    ),
    ...blogEntries,
    ...categories,
    ...brands,
    ...errorCodeBrandHubs,
    ...materialPages,
    ...products,
  ];
}
