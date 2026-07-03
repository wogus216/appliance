import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { HeroSection } from '@/components/detail/hero-section';
import { SpecRadar } from '@/components/detail/spec-radar';
import { DetailedReview } from '@/components/detail/detailed-review';
import { ErrorCodeSection } from '@/components/detail/error-code-section';
import { RoomFitSection } from '@/components/detail/room-fit-section';
import { ReviewsSection } from '@/components/detail/reviews-section';
import { PurchaseSection } from '@/components/detail/purchase-section';
import { TcoCalculator } from '@/components/detail/tco-calculator';
import { NoiseComparison } from '@/components/detail/noise-comparison';
import { EnergyGradeImpact } from '@/components/detail/energy-grade-impact';
import { ProductJsonLd } from '@/components/detail/product-jsonld';
import { ProductTOC } from '@/components/detail/product-toc';
import { allAppliances, getApplianceBySlug, getSimilarProducts } from '@/lib/data/appliances';
import { BRAND_LABELS } from '@/lib/constants';
import { isTraditionalAppliance } from '@/lib/category-config';
import { ApplianceCard } from '@/components/appliance-card';
import { Check, X } from 'lucide-react';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return allAppliances.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const appliance = getApplianceBySlug(slug);
  if (!appliance) return { title: '제품을 찾을 수 없습니다' };

  const brand = BRAND_LABELS[appliance.brand] || appliance.brand;
  const url = `/products/${appliance.slug}`;
  const titleTail = isTraditionalAppliance(appliance.category)
    ? '스펙·에러코드·추천'
    : '스펙·가격·추천';
  return {
    title: `${brand} ${appliance.name} 리뷰 — ${titleTail}`,
    description: appliance.description,
    alternates: { canonical: url },
    openGraph: {
      title: `${brand} ${appliance.name}`,
      description: appliance.description,
      url,
      images: appliance.image ? [appliance.image] : undefined,
    },
    ...(appliance.noindex ? { robots: { index: false, follow: true } } : {}),
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const appliance = getApplianceBySlug(slug);
  if (!appliance) notFound();

  const similar = getSimilarProducts(slug);
  const isTraditional = isTraditionalAppliance(appliance.category);
  const hasErrorCodes = !!appliance.errorCodes && appliance.errorCodes.length > 0;
  const hasPurchase = !!appliance.purchaseLinks && appliance.purchaseLinks.length > 0;
  const hasEnergyImpact =
    !!appliance.techSpecs.monthlyElectricityCost && !!appliance.techSpecs.energyGrade;

  const toc = [
    { id: 'spec', label: '스펙' },
    { id: 'review', label: '상세 리뷰' },
    ...(isTraditional
      ? [
          { id: 'cost', label: '비용' },
          { id: 'noise', label: '소음' },
        ]
      : [{ id: 'spec-detail', label: '상세 사양' }]),
    ...(hasErrorCodes ? [{ id: 'errorcodes', label: '에러코드' }] : []),
    { id: 'user-reviews', label: '사용자 리뷰' },
    ...(hasPurchase ? [{ id: 'purchase', label: '구매처' }] : []),
  ];

  return (
    <>
      <ProductJsonLd appliance={appliance} />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <HeroSection appliance={appliance} />

        <ProductTOC items={toc} />

        <div className="space-y-12 pt-8">
          <div id="spec" className="scroll-mt-32">
            <SpecRadar specs={appliance.specs} category={appliance.category} />
          </div>

          <div id="review" className="scroll-mt-32 space-y-12">
            {/* 상세 리뷰 (총평·에디터 분석·핵심 기능) */}
            <DetailedReview appliance={appliance} />

            {/* 추천/비추천 */}
            <section className="grid md:grid-cols-2 gap-4">
              <div className="bg-green-50 rounded-xl p-6">
                <h3 className="font-bold text-green-800 mb-3">이런 분께 추천</h3>
                <ul className="space-y-2">
                  {appliance.targetUsers.recommended.map((r, i) => (
                    <li key={i} className="text-sm text-green-700 flex gap-2">
                      <Check className="w-4 h-4 shrink-0 mt-0.5 text-green-600" aria-hidden="true" />
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-red-50 rounded-xl p-6">
                <h3 className="font-bold text-red-800 mb-3">이런 분께 비추천</h3>
                <ul className="space-y-2">
                  {appliance.targetUsers.notRecommended.map((r, i) => (
                    <li key={i} className="text-sm text-red-700 flex gap-2">
                      <X className="w-4 h-4 shrink-0 mt-0.5 text-red-500" aria-hidden="true" />
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </div>

          {/* 운영비 (10년 총비용 + 에너지등급 영향) — 생활가전 전용 */}
          {isTraditional && (
            <div id="cost" className="scroll-mt-32 space-y-12">
              <TcoCalculator appliance={appliance} />
              {hasEnergyImpact && (
                <EnergyGradeImpact
                  currentGrade={appliance.techSpecs.energyGrade!}
                  monthlyElecCost={appliance.techSpecs.monthlyElectricityCost!}
                  purchasePrice={appliance.priceAnalysis.streetPrice || appliance.price}
                />
              )}
            </div>
          )}

          {isTraditional ? (
            <div id="noise" className="scroll-mt-32 space-y-12">
              <NoiseComparison noise={appliance.specs.noise} />
              <RoomFitSection roomFit={appliance.roomFit} techSpecs={appliance.techSpecs} />
            </div>
          ) : (
            <div id="spec-detail" className="scroll-mt-32">
              <RoomFitSection techSpecs={appliance.techSpecs} />
            </div>
          )}

          {hasErrorCodes && (
            <div id="errorcodes" className="scroll-mt-32">
              <ErrorCodeSection errorCodes={appliance.errorCodes!} brand={appliance.brand} />
            </div>
          )}

          <div id="user-reviews" className="scroll-mt-32">
            <ReviewsSection reviews={appliance.reviews} />
          </div>

          {hasPurchase && (
            <div id="purchase" className="scroll-mt-32">
              <PurchaseSection links={appliance.purchaseLinks!} />
            </div>
          )}

          {/* 비슷한 제품 */}
          {similar.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">비슷한 제품</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {similar.map((s) => (
                  <ApplianceCard key={s.id} appliance={s} />
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  );
}
