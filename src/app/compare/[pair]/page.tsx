import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { BRAND_LABELS, CATEGORY_LABELS, EDITOR_RATING_LABEL } from '@/lib/constants';
import { getCategorySlug } from '@/lib/category-config';
import { buildOpenGraph } from '@/lib/metadata';
import { BreadcrumbJsonLd } from '@/components/jsonld';
import {
  getComparisonPairs,
  getComparisonBySlug,
  isComparisonIndexable,
  getSharedAxes,
  getPairScores,
  getRelatedPairs,
  type ComparisonPair,
} from '@/lib/comparisons';
import { PairVerdict, PairAxisTable, PairSpecTable, PairFitLists, PairFaq } from '@/components/compare/pair-sections';

type Props = { params: Promise<{ pair: string }> };

// generateStaticParams가 만든 경로만 낸다. 존재하지 않는 조합이 런타임에
// 렌더되면 카탈로그에 없는 제품 비교가 생길 수 있다.
export const dynamicParams = false;

export async function generateStaticParams() {
  return getComparisonPairs().map((p) => ({ pair: p.slug }));
}

/** "삼성 비스포크 vs LG 디오스" — 조사를 붙이지 않는다(제품명 받침이 제각각이다) */
function pairTitle(pair: ComparisonPair): string {
  const a = `${BRAND_LABELS[pair.a.brand] || pair.a.brand} ${pair.a.name}`;
  const b = `${BRAND_LABELS[pair.b.brand] || pair.b.brand} ${pair.b.name}`;
  return `${a} vs ${b}`;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { pair: slug } = await params;
  const pair = getComparisonBySlug(slug);
  if (!pair) return { title: '비교를 찾을 수 없습니다' };

  const category = CATEGORY_LABELS[pair.category] || pair.category;
  const title = `${pairTitle(pair)} — ${category} 비교`;
  const scores = getPairScores(pair);
  const description =
    `${pairTitle(pair)} 스펙과 ${EDITOR_RATING_LABEL}을 나란히 놓고 비교합니다. ` +
    `종합 ${scores.a.toFixed(1)} 대 ${scores.b.toFixed(1)}, 공통 축 ${getSharedAxes(pair).length}개 기준.`;
  const url = `/compare/${pair.slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: buildOpenGraph({ title, description, url }),
    // 한쪽이라도 색인 자격이 없으면 비교도 색인하지 않는다. 제품 상세에 건 게이트를
    // 비교 페이지로 우회하지 않기 위해서다. 판정은 sitemap.ts와 같은 함수를 쓴다.
    ...(isComparisonIndexable(pair) ? {} : { robots: { index: false, follow: true } }),
  };
}

export default async function ComparePairPage({ params }: Props) {
  const { pair: slug } = await params;
  const pair = getComparisonBySlug(slug);
  if (!pair) notFound();

  const category = CATEGORY_LABELS[pair.category] || pair.category;
  const categorySlug = getCategorySlug(pair.category);
  const axes = getSharedAxes(pair);
  const scores = getPairScores(pair);
  const related = getRelatedPairs(pair);

  const aLabel = `${BRAND_LABELS[pair.a.brand] || pair.a.brand} ${pair.a.name}`;
  const bLabel = `${BRAND_LABELS[pair.b.brand] || pair.b.brand} ${pair.b.name}`;

  // 광고를 싣지 않는다.
  //
  // 본문은 1,890~2,461자로 광고 하한(1,321자)을 넘고 대조군의 같은 형식 페이지
  // (allrunabout.com/vs/*, 2,309자)와도 비슷하다. 그런데도 붙이지 않는 이유는 이 페이지의
  // 목적이 색인 회복이지 수익이 아니기 때문이다. 애드센스 심사가 걸려 있는 동안
  // 데이터에서 자동 파생되는 페이지 26개에 광고를 새로 얹는 것은 얻을 것보다 잃을 것이 크다.
  //
  // 켜려면: AdSenseScript 컴포넌트를 import해 아래 반환문 맨 앞에서 렌더하되
  // isComparisonIndexable(pair)가 참일 때만 렌더하고, adsense.test.ts의
  // AD_BEARING_ROUTES에 'compare/[pair]/page.tsx'를 추가한다.
  // 색인 자격이 없는 조합에는 절대 붙이지 말 것 — 제품 상세와 같은 규칙이다.
  // (이 주석에 컴포넌트를 태그 형태로 적지 않는다. adsense.test.ts가 주석까지
  //  태그 형태로 훑어서 "광고를 싣는 라우트"로 잡는다.)
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: '홈', path: '/' },
          { name: '비교', path: '/compare' },
          { name: pairTitle(pair) },
        ]}
      />

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-10">
        <header className="space-y-3">
          <nav className="text-sm text-gray-500">
            <Link href="/compare" className="hover:underline">
              비교
            </Link>
            {categorySlug && (
              <>
                {' · '}
                <Link href={`/category/${categorySlug}`} className="hover:underline">
                  {category}
                </Link>
              </>
            )}
          </nav>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            {pairTitle(pair)} — {category} 비교
          </h1>
          <p className="text-gray-600 leading-relaxed">
            같은 {category} 두 대를 같은 기준으로 맞댑니다. 아래 숫자는 모두 이 사이트의 제품
            페이지에 실린 값이며, 확인하지 못한 항목은 비워 둡니다.
          </p>
        </header>

        <PairVerdict
          pair={pair}
          scores={scores}
          axes={axes}
          aLabel={aLabel}
          bLabel={bLabel}
        />

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">항목별 비교</h2>
          <PairAxisTable axes={axes} aLabel={aLabel} bLabel={bLabel} />
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">스펙 전체 비교</h2>
          <PairSpecTable pair={pair} aLabel={aLabel} bLabel={bLabel} />
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">어느 쪽이 맞나</h2>
          <PairFitLists pair={pair} aLabel={aLabel} bLabel={bLabel} />
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">자주 묻는 질문</h2>
          <PairFaq pair={pair} axes={axes} scores={scores} aLabel={aLabel} bLabel={bLabel} />
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">각 제품의 상세 리뷰</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {[pair.a, pair.b].map((a) => (
              <Link
                key={a.slug}
                href={`/products/${a.slug}`}
                className="block rounded-lg border border-gray-200 p-4 hover:border-blue-400 hover:bg-blue-50/40 transition"
              >
                <div className="text-sm text-gray-500">
                  {BRAND_LABELS[a.brand] || a.brand}
                </div>
                <div className="font-medium text-gray-900">{a.name}</div>
                {a.oneliner && (
                  <p className="mt-1 text-sm text-gray-600 line-clamp-2">{a.oneliner}</p>
                )}
              </Link>
            ))}
          </div>
        </section>

        {related.length > 0 && (
          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-gray-900">같은 {category}의 다른 비교</h2>
            <ul className="grid gap-2 sm:grid-cols-2">
              {related.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/compare/${p.slug}`}
                    className="text-sm text-blue-700 hover:underline"
                  >
                    {BRAND_LABELS[p.a.brand] || p.a.brand} {p.a.name} vs{' '}
                    {BRAND_LABELS[p.b.brand] || p.b.brand} {p.b.name}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </>
  );
}
