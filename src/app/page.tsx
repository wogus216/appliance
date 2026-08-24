import { Metadata } from 'next';
import Link from 'next/link';
import { CategoryFilterGrid } from '@/components/category-filter-grid';
import { getCardAppliances, getAllCategories, getAllBrands } from '@/lib/data/appliances';
import { SITE_NAME, SITE_DESCRIPTION } from '@/lib/constants';
import { buildOpenGraph } from '@/lib/metadata';
import { AdSenseScript } from '@/components/adsense-script';
import { getIndexableBlogPosts } from '@/lib/blog';

/** 홈에 직접 걸 최근 글 수. 나머지는 /blog 목록으로 넘긴다 */
const HOME_POST_COUNT = 4;

export const metadata: Metadata = {
  title: SITE_NAME,
  description: SITE_DESCRIPTION,
  alternates: { canonical: '/' },
  openGraph: buildOpenGraph({ title: SITE_NAME, description: SITE_DESCRIPTION, url: '/' }),
};

export default function HomePage() {
  const appliances = getCardAppliances();
  const categories = getAllCategories();
  const brandCount = getAllBrands().length;
  // 홈에서 글 하나까지 한 번에 닿게 한다. 목록을 한 번 거치면 크롤 깊이가 늘고,
  // 방문자에게도 이 사이트가 제품 목록만 있는 곳으로 보인다.
  const posts = getIndexableBlogPosts().slice(0, HOME_POST_COUNT);

  return (
    <>
        <AdSenseScript />
        {/* 히어로 */}
        <section className="bg-gradient-to-b from-blue-50 to-white py-16">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              가전제품, 제대로 비교하고 고르세요
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              에어컨 · 선풍기 · 제습기 · 세탁기 · 건조기 — 스펙 비교, 에러코드 자가진단, 평수별 추천까지
            </p>
            <p className="text-gray-500 text-sm mt-3">
              현재 {categories.length}개 카테고리 · {appliances.length}개 제품 · {brandCount}개 브랜드를 비교할 수 있습니다
            </p>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 py-8">
          {/* 이렇게 고르세요 */}
          <div className="grid sm:grid-cols-3 gap-6 mb-10 text-sm text-gray-600">
            <div>
              <p className="font-semibold text-gray-900 mb-1">에너지효율로</p>
              <p>등급 한 칸 차이가 여름 전기요금에서 실제 금액으로 드러납니다. 정렬을 에너지효율순으로 바꿔 비교하세요.</p>
            </div>
            <div>
              <p className="font-semibold text-gray-900 mb-1">평수로</p>
              <p>냉방·제습 면적이 평수 표기보다 정확한 기준입니다. 제품 상세의 평수별 추천을 함께 확인하세요.</p>
            </div>
            <div>
              <p className="font-semibold text-gray-900 mb-1">가격으로</p>
              <p>
                가격은 조사 시점의 시중가이고 수시로 바뀝니다. 제품마다 언제 확인한 값인지 함께
                적어 두었으니 날짜를 보고 판단하세요.
              </p>
            </div>
          </div>

          {/* 최근 글 — 제품 목록보다 먼저 놓는다.
              이 사이트에서 판단이 담긴 자리는 카탈로그가 아니라 이쪽이다. */}
          {posts.length > 0 && (
            <section aria-labelledby="recent-posts" className="mb-12">
              <div className="flex items-baseline justify-between mb-4">
                <h2 id="recent-posts" className="text-xl font-bold text-gray-900">
                  제품을 나란히 놓고 따져 본 글
                </h2>
                <Link href="/blog" className="text-sm text-blue-600 hover:underline">
                  전체 보기 →
                </Link>
              </div>
              <ul className="grid gap-4 sm:grid-cols-2">
                {posts.map((p) => (
                  <li key={p.slug}>
                    <Link
                      href={`/blog/${p.slug}`}
                      className="block h-full rounded-2xl border p-5 transition-colors hover:border-blue-300"
                    >
                      <div className="mb-2 flex flex-wrap items-center gap-2 text-xs">
                        <span className="rounded-full bg-blue-50 px-2.5 py-0.5 font-semibold text-blue-700">
                          {p.kind}
                        </span>
                        <span className="text-gray-400">
                          최종 검수 <time dateTime={p.updatedAt}>{p.updatedAt}</time>
                        </span>
                      </div>
                      <p className="mb-1.5 font-bold leading-snug text-gray-900">{p.title}</p>
                      <p className="text-sm leading-relaxed text-gray-600">{p.question}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* 카테고리 필터 + 제품 그리드 */}
          <CategoryFilterGrid appliances={appliances} categories={categories} />
        </section>
    </>
  );
}
