import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ApplianceCard } from '@/components/appliance-card';
import { BrandLineupSection } from '@/components/brand/lineup-section';
import { BrandStatsSection } from '@/components/brand/stats-section';
import { BrandErrorCodeSummary } from '@/components/brand/error-code-summary';
import { BrandServiceSection } from '@/components/brand/service-section';
import { BrandSourcesFooter } from '@/components/brand/sources-footer';
import { allAppliances, getAllBrands, getCardAppliances } from '@/lib/data/appliances';
import { getBrandProfile } from '@/lib/data/brands';
import { getBrandStats, isNonApplianceBrand } from '@/lib/brand-stats';
import { getBrandCopy } from '@/lib/brand-copy';
import { getBrandErrorCodes } from '@/lib/error-codes';
import { buildOpenGraph } from '@/lib/metadata';
import { AdSenseScript } from '@/components/adsense-script';
import { isBrandIndexable, isProductIndexable } from '@/lib/content-quality';

/** 색인되는 제품이 있고, 출처가 붙은 프로필 원고가 있어야 색인한다 */
function brandIndexable(brand: string): boolean {
  const profile = getBrandProfile(brand);
  return isBrandIndexable({
    indexableProductCount: allAppliances.filter(
      (a) => a.brand === brand && isProductIndexable(a),
    ).length,
    hasProfile: !!profile,
    profileSourceCount: profile?.sources.length ?? 0,
  });
}

type Props = {
  params: Promise<{ brand: string }>;
};

export function generateStaticParams() {
  return getAllBrands().map((brand) => ({ brand }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { brand } = await params;
  if (!getAllBrands().includes(brand)) return { title: '브랜드를 찾을 수 없습니다' };

  const { title, description } = getBrandCopy(brand);
  return {
    title,
    description,
    alternates: { canonical: `/brand/${brand}` },
    openGraph: buildOpenGraph({ title, description, url: `/brand/${brand}` }),
    ...(brandIndexable(brand) ? {} : { robots: { index: false, follow: true } }),
  };
}

export default async function BrandPage({ params }: Props) {
  const { brand } = await params;
  if (!getAllBrands().includes(brand)) notFound();

  const { label } = getBrandCopy(brand);
  const items = getCardAppliances().filter((a) => a.brand === brand);
  const categories = [...new Set(items.map((a) => a.category))];

  // 프로필은 아직 없을 수 있다. 17개 원고를 라운드로 나눠 쓰는 동안에도
  // 빌드가 계속 성공해야 하므로, 없으면 헤더와 제품 그리드만 렌더한다.
  const profile = getBrandProfile(brand);
  const stats = getBrandStats(brand);
  const errorCodeCount = getBrandErrorCodes(brand).reduce((n, g) => n + g.entries.length, 0);

  return (
    <>
      {brandIndexable(brand) && <AdSenseScript />}
      {/* 브랜드 헤더 */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <p className="text-sm font-medium text-blue-600 mb-1">브랜드</p>
          <h1 className="text-3xl font-bold text-gray-900">{label}</h1>
          <p className="text-gray-600 mt-2">
            {label} 제품 {items.length}개
            {categories.length > 0 && <> · {categories.join(' · ')}</>}
          </p>
          {profile && (
            <p className="text-gray-700 leading-relaxed mt-4 max-w-3xl">{profile.intro}</p>
          )}
        </div>
      </section>

      {profile && (
        <div className="max-w-3xl mx-auto px-4 py-8 space-y-8">
          <BrandLineupSection lines={profile.lines} />
          <BrandStatsSection stats={stats} />
          <BrandErrorCodeSummary
            brand={brand}
            label={label}
            count={errorCodeCount}
            pattern={profile.errorCodePattern}
            isNonAppliance={isNonApplianceBrand(brand)}
            categories={categories}
          />
          {profile.serviceCenter && (
            <BrandServiceSection serviceCenter={profile.serviceCenter} />
          )}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-2">살림랩 총평</h2>
            <p className="text-gray-700 leading-relaxed">{profile.editorNote}</p>
          </section>
        </div>
      )}

      {/* 제품 그리드 */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        {items.length > 0 && (
          <h2 className="text-xl font-bold text-gray-900 mb-4">제품 {items.length}개</h2>
        )}
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

      {profile && (
        <div className="max-w-3xl mx-auto px-4 pb-10">
          <BrandSourcesFooter sources={profile.sources} updated={profile.updated} />
        </div>
      )}
    </>
  );
}
