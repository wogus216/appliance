import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ApplianceCard } from '@/components/appliance-card';
import { BrandLineupSection } from '@/components/brand/lineup-section';
import { BrandStatsSection } from '@/components/brand/stats-section';
import { BrandErrorCodeSummary } from '@/components/brand/error-code-summary';
import { BrandServiceSection } from '@/components/brand/service-section';
import { BrandSourcesFooter } from '@/components/brand/sources-footer';
import { allAppliances, getAllBrands, getCardAppliances } from '@/lib/data/appliances';
import { getBrandProfile } from '@/lib/data/brands';
import { getProductEditorial } from '@/lib/data/editorial';
import { getBrandStats, isNonApplianceBrand } from '@/lib/brand-stats';
import { getBrandCopy } from '@/lib/brand-copy';
import { countDisplayCodes, getBrandErrorCodes } from '@/lib/error-codes';
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
    errorCodeEntryCount: getBrandErrorCodes(brand).reduce((n, g) => n + g.entries.length, 0),
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
  const singleProduct = items.length === 1 ? items[0] : undefined;

  // 프로필은 아직 없을 수 있다. 17개 원고를 라운드로 나눠 쓰는 동안에도
  // 빌드가 계속 성공해야 하므로, 없으면 헤더와 제품 그리드만 렌더한다.
  const profile = getBrandProfile(brand);
  const stats = getBrandStats(brand);
  // 가격 범위 옆에 붙일 조사일과 '몇 개 중 몇 개' — 날짜 없는 가격은 현재 판매가처럼 읽힌다
  const priced = allAppliances.filter((a) => a.brand === brand && a.price != null);
  const priceInfo = {
    pricedCount: priced.length,
    dates: [
      ...new Set(
        priced
          .map((a) => getProductEditorial(a.slug)?.priceCheckedAt)
          .filter((d): d is NonNullable<typeof d> => !!d),
      ),
    ].sort(),
  };
  const errorCodeCount = getBrandErrorCodes(brand).reduce((n, g) => n + g.entries.length, 0);
  const errorDisplayCodeCount = countDisplayCodes(getBrandErrorCodes(brand).flatMap((g) => g.entries));

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
          {singleProduct && profile.serviceCenter && (
            <>
              <BrandServiceSection serviceCenter={profile.serviceCenter} />
              <section aria-labelledby="brand-service-preparation">
                <h2 id="brand-service-preparation" className="text-xl font-bold text-gray-900 mb-2">구매·접수 전에 준비할 정보</h2>
                <p className="text-gray-700 leading-relaxed">국내 정식 유통·병행수입·해외 구매 중 어느 경로인지 확인하고, 그 경로에서 접수할 수 있는 창구와 보증 적용 조건을 공식 안내에서 대조하세요. 같은 브랜드라는 이유로 국내 판매품과 같은 지원을 받는다고 가정하지 않습니다.</p>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-gray-700 leading-relaxed">
                  <li>정확한 모델명·제조번호와 구매일·판매처·구매 증빙을 준비합니다.</li>
                  <li>문제 발생 시점, 증상이 반복되는 조건, 이미 해 본 조치를 적습니다.</li>
                  <li>접수 창구에 진단·운송 비용 여부와 함께 보낼 구성품을 먼저 확인합니다. 이 페이지가 무상수리를 확약하지는 않습니다.</li>
                </ul>
              </section>
            </>
          )}
          <BrandLineupSection lines={profile.lines} />
          <BrandStatsSection stats={stats} priceInfo={priceInfo} />
          <BrandErrorCodeSummary
            brand={brand}
            label={label}
            count={errorCodeCount}
            displayCodeCount={errorDisplayCodeCount}
            pattern={profile.errorCodePattern}
            isNonAppliance={isNonApplianceBrand(brand)}
            categories={categories}
          />
          {!singleProduct && profile.serviceCenter && (
            <BrandServiceSection serviceCenter={profile.serviceCenter} />
          )}
          {singleProduct ? (
            <section aria-labelledby="brand-model-heading">
              <h2 id="brand-model-heading" className="text-xl font-bold text-gray-900 mb-2">공개 모델의 선택 조건은 상세에서</h2>
              <p className="text-gray-700 leading-relaxed">현재 이 사이트에서 공개한 {label} 제품은 {singleProduct.name} 한 개입니다. 브랜드 전체의 성능이나 다른 라인과의 우열을 이 모델 하나로 판단하지 않습니다. 설치·사용·관리 조건과 추천을 보류할 이유는 모델 상세에서 확인하세요.</p>
              <Link href={`/products/${singleProduct.slug}#verdict`} className="mt-2 inline-flex min-h-11 items-center font-semibold text-blue-700 underline underline-offset-4">{singleProduct.name} 선택 조건·한계 보기</Link>
            </section>
          ) : (
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-2">살림랩 총평</h2>
              <p className="text-gray-700 leading-relaxed">{profile.editorNote}</p>
            </section>
          )}
          {!singleProduct && profile.choosing && (
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-2">이 브랜드 안에서 고르는 기준</h2>
              <p className="text-gray-700 leading-relaxed">{profile.choosing}</p>
            </section>
          )}
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
