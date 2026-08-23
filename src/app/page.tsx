import { Metadata } from 'next';
import { CategoryFilterGrid } from '@/components/category-filter-grid';
import { getCardAppliances, getAllCategories, getAllBrands } from '@/lib/data/appliances';
import { SITE_NAME, SITE_DESCRIPTION } from '@/lib/constants';
import { buildOpenGraph } from '@/lib/metadata';
import { AdSenseScript } from '@/components/adsense-script';

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
              <p>정가와 실거래가는 다릅니다. 가격순 정렬과 제품별 월 유지비를 함께 보세요.</p>
            </div>
          </div>

          {/* 카테고리 필터 + 제품 그리드 */}
          <CategoryFilterGrid appliances={appliances} categories={categories} />
        </section>
    </>
  );
}
