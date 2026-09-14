import { Metadata } from 'next';
import Link from 'next/link';
import { CompareContent } from '@/components/compare/compare-content';
import { getCardAppliances, getAllCategories } from '@/lib/data/appliances';
import { getPopularComparisons } from '@/lib/popular-comparisons';
import { getComparisonPairs, isComparisonIndexable } from '@/lib/comparisons';
import { BRAND_LABELS, CATEGORY_LABELS } from '@/lib/constants';
import { buildOpenGraph } from '@/lib/metadata';
import { AdSenseScript } from '@/components/adsense-script';

export const metadata: Metadata = {
  title: '가전제품 비교',
  description: '에어컨, 제습기, 세탁기 등 가전제품 스펙을 나란히 비교하세요.',
  alternates: { canonical: '/compare' },
  openGraph: buildOpenGraph({
    title: '가전제품 비교',
    description: '에어컨, 제습기, 세탁기 등 가전제품 스펙을 나란히 비교하세요.',
    url: '/compare',
  }),
};

export default function ComparePage() {
  const allAppliances = getCardAppliances();
  const categories = getAllCategories();
  const popularComparisons = getPopularComparisons(allAppliances, categories);

  // 개별 비교 페이지로 가는 내부 링크. 카테고리별로 묶어 서버에서 렌더한다 —
  // 이 목록이 없으면 /compare/* 가 전부 고아 페이지가 된다(사이트맵에만 있고
  // 어디서도 링크되지 않는 URL). 도구(CompareContent)는 클라이언트 컴포넌트라
  // 정적 HTML에 링크가 남지 않으므로 여기서 따로 낸다.
  const pairsByCategory = new Map<string, ReturnType<typeof getComparisonPairs>>();
  for (const pair of getComparisonPairs().filter(isComparisonIndexable)) {
    const list = pairsByCategory.get(pair.category) ?? [];
    list.push(pair);
    pairsByCategory.set(pair.category, list);
  }

  return (
    <>
        <AdSenseScript />
        <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
          <CompareContent allAppliances={allAppliances} popularComparisons={popularComparisons} />

          {pairsByCategory.size > 0 && (
            <section className="space-y-4 border-t border-gray-200 pt-8">
              <h2 className="text-xl font-semibold text-gray-900">제품끼리 맞대어 보기</h2>
              <p className="text-sm text-gray-600">
                같은 카테고리 안에서 스펙과 평가를 나란히 놓은 비교입니다.
              </p>
              <div className="space-y-5">
                {[...pairsByCategory.entries()].map(([category, pairs]) => (
                  <div key={category}>
                    <h3 className="text-sm font-medium text-gray-700">
                      {CATEGORY_LABELS[category] || category}
                    </h3>
                    <ul className="mt-2 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                      {pairs.map((p) => (
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
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
    </>
  );
}
