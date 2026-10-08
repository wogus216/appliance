import { Metadata } from 'next';
import Link from 'next/link';
import { CategoryFilterGrid } from '@/components/category-filter-grid';
import { getCardAppliances, getAllCategories, getAllBrands } from '@/lib/data/appliances';
import { SITE_NAME, SITE_DESCRIPTION } from '@/lib/constants';
import { buildOpenGraph } from '@/lib/metadata';
import { AdSenseScript } from '@/components/adsense-script';
import { getIndexableBlogPosts } from '@/lib/blog';
import { getErrorCodeDirectory, resolvePopularCodes } from '@/lib/error-codes';
import { ErrorCodeFinder } from '@/components/home/error-code-finder';

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
  const directory = getErrorCodeDirectory();
  const popular = resolvePopularCodes();
  const codeBrandCount = new Set(directory.flatMap((g) => g.brands.map((b) => b.brand))).size;
  const codeCount = directory.reduce((n, g) => n + g.codeCount, 0);

  return (
    <>
        <AdSenseScript />
        {/* 히어로 — 사람들이 이 사이트에 오는 이유(에러코드)를 먼저 말한다.
            네이버 클릭 상위 4개가 전부 에러코드 허브였다(2026-09-16). */}
        <section className="bg-gradient-to-b from-orange-50 to-white py-16">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              가전이 멈췄을 때, 에러코드부터
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              화면에 뜬 코드가 무슨 뜻인지, 서비스를 부르기 전에 직접 해볼 수 있는 것과 손대지
              말아야 할 것을 정리했습니다. 브랜드마다 어느 제조사 자료와 대조했는지, 대조하지
              못한 것은 무엇인지 함께 밝혀 둡니다.
            </p>
            <p className="text-gray-500 text-sm mt-3">
              {codeBrandCount}개 브랜드 · {directory.length}개 제품군 · 에러코드 {codeCount}개
            </p>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 py-8">
          <ErrorCodeFinder directory={directory} popular={popular} />

          {/* 최근 글 — 제품 목록보다 먼저 놓는다.
              이 사이트에서 판단이 담긴 자리는 카탈로그가 아니라 이쪽이다. */}
          {posts.length > 0 && (
            <section aria-labelledby="recent-posts" className="mb-12">
              <div className="flex items-baseline justify-between mb-4">
                {/* 글이 전부 비교는 아니다 — 18편 중 7편은 라벨 숫자·점검 코드를 푸는 해설·가이드다
                    (2026-10-08, kind 기준 비교 11·해설 6·가이드 1). 그래서 '나란히 놓고'라고 쓰지 않는다. */}
                <h2 id="recent-posts" className="text-xl font-bold text-gray-900">
                  제품과 숫자를 따져 본 글
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

          {/* 카테고리 필터 + 제품 그리드. 고르는 법 세 줄은 제품 목록에 대한 안내라 여기 붙인다 */}
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            제품 스펙 비교 <span className="text-sm font-normal text-gray-400">{categories.length}개 카테고리 · {appliances.length}개 제품 · {brandCount}개 브랜드</span>
          </h2>
          <div className="grid sm:grid-cols-3 gap-6 mb-10 text-sm text-gray-600">
            {/* 세 줄 모두 예전엔 근거 없는 단정이었다(2026-10-08 교정).
                - "등급 한 칸 차이가 여름 전기요금에서 실제 금액으로 드러난다": 사이트는 요금을
                  계산하지 않고(/methodology 3절), 등급이 같아도 라벨 kWh는 모델마다 다르다.
                - "평수별 추천을 함께 확인": 추천 평수 칩은 근거가 제품마다 달라 고르는 기준으로
                  권할 수 없다. 표시 면적(㎡)이 제조사 시험값이다.
                - "수시로 바뀝니다": 카드에 이미 조사일이 붙어 있어 반복이다. */}
            <div>
              <p className="font-semibold text-gray-900 mb-1">에너지등급으로</p>
              <p>
                등급은 제조사 표기 그대로이고 같은 품목 안에서만 견줍니다. 등급이 같아도 라벨의
                소비전력량(kWh)은 다를 수 있으니, 요금을 따질 때는 그 값을 같은 단위로 맞춰 보세요.
              </p>
            </div>
            <div>
              <p className="font-semibold text-gray-900 mb-1">면적으로</p>
              <p>
                에어컨·공기청정기는 평형 이름 대신 제품 상세의 표시 면적(㎡)을 실제 방 면적과 맞춰
                보세요. 6평형 에어컨의 18.7㎡는 약 5.7평입니다. 표시 면적은 그 면적을 보장하는 값이
                아니라 비교의 출발점이라, 창·단열·천장 높이에 따라 여유를 둬야 합니다.
              </p>
            </div>
            <div>
              <p className="font-semibold text-gray-900 mb-1">가격으로</p>
              <p>
                카드의 가격은 옆에 적힌 날짜에 가격비교 DB나 제조사 공식몰에서 확인한 값입니다.
                일시불 판매가를 확인하지 못한 제품은 &lsquo;가격 미확인&rsquo;으로 둡니다.
              </p>
            </div>
          </div>

          <CategoryFilterGrid appliances={appliances} categories={categories} />
        </section>
    </>
  );
}
