import { Metadata } from 'next';
import { CategoryFilterGrid } from '@/components/category-filter-grid';
import { getCardAppliances, getAllCategories } from '@/lib/data/appliances';
import { SITE_NAME, SITE_DESCRIPTION } from '@/lib/constants';
import { buildOpenGraph } from '@/lib/metadata';

export const metadata: Metadata = {
  title: SITE_NAME,
  description: SITE_DESCRIPTION,
  alternates: { canonical: '/' },
  openGraph: buildOpenGraph({ title: SITE_NAME, description: SITE_DESCRIPTION, url: '/' }),
};

export default function HomePage() {
  const appliances = getCardAppliances();
  const categories = getAllCategories();

  return (
    <>
        {/* 히어로 */}
        <section className="bg-gradient-to-b from-blue-50 to-white py-16">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              가전제품, 제대로 비교하고 고르세요
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              에어컨 · 선풍기 · 제습기 · 세탁기 · 건조기 — 스펙 비교, 에러코드 자가진단, 평수별 추천까지
            </p>
          </div>
        </section>

        {/* 카테고리 필터 + 제품 그리드 */}
        <section className="max-w-6xl mx-auto px-4 py-8">
          <CategoryFilterGrid appliances={appliances} categories={categories} />
        </section>
    </>
  );
}
