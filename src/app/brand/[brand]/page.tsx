import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ApplianceCard } from '@/components/appliance-card';
import { getAllBrands, getCardAppliances } from '@/lib/data/appliances';
import { BRAND_LABELS } from '@/lib/constants';
import { buildOpenGraph } from '@/lib/metadata';

type Props = {
  params: Promise<{ brand: string }>;
};

export function generateStaticParams() {
  return getAllBrands().map((brand) => ({ brand }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { brand } = await params;
  if (!getAllBrands().includes(brand)) return { title: '브랜드를 찾을 수 없습니다' };
  const label = BRAND_LABELS[brand] || brand;
  const description = `${label} 가전제품 라인업을 한눈에. 카테고리별 스펙·가격·에러코드를 비교하세요.`;
  return {
    title: `${label} 가전 전체 — 스펙·가격 비교`,
    description,
    alternates: { canonical: `/brand/${brand}` },
    openGraph: buildOpenGraph({
      title: `${label} 가전 전체 — 스펙·가격 비교`,
      description,
      url: `/brand/${brand}`,
    }),
  };
}

export default async function BrandPage({ params }: Props) {
  const { brand } = await params;
  if (!getAllBrands().includes(brand)) notFound();

  const label = BRAND_LABELS[brand] || brand;
  const items = getCardAppliances().filter((a) => a.brand === brand);
  const categories = [...new Set(items.map((a) => a.category))];

  return (
    <>
        {/* 브랜드 헤더 */}
        <section className="bg-gradient-to-b from-blue-50 to-white py-12">
          <div className="max-w-6xl mx-auto px-4">
            <p className="text-sm font-medium text-blue-600 mb-1">브랜드</p>
            <h1 className="text-3xl font-bold text-gray-900">{label}</h1>
            <p className="text-gray-600 mt-2">
              {label} 제품 {items.length}개
              {categories.length > 0 && <> · {categories.join(' · ')}</>}
            </p>
          </div>
        </section>

        {/* 제품 그리드 */}
        <section className="max-w-6xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((a) => (
              <ApplianceCard key={a.id} appliance={a} />
            ))}
          </div>

          {items.length === 0 && (
            <div className="text-center py-16 text-gray-400">
              <p className="text-lg">등록된 제품이 없습니다.</p>
            </div>
          )}
        </section>
    </>
  );
}
