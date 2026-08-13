import { Metadata } from 'next';
import { CompareContent } from '@/components/compare/compare-content';
import { getCardAppliances, getAllCategories } from '@/lib/data/appliances';
import { getPopularComparisons } from '@/lib/popular-comparisons';
import { buildOpenGraph } from '@/lib/metadata';

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

  return (
    <>
        <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
          <p className="text-gray-600 text-sm max-w-2xl">
            같은 평형·같은 가격대 제품을 나란히 놓고 스펙 차이를 확인하세요. 소음·에너지효율처럼 숫자로는 비슷해
            보이는 항목도 설치 조건이나 실사용 후기에서는 갈리는 경우가 많습니다.
          </p>

          <CompareContent allAppliances={allAppliances} popularComparisons={popularComparisons} />
        </div>
    </>
  );
}
