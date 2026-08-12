import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { HeroSection } from '@/components/detail/hero-section';
import { VerdictSection } from '@/components/detail/verdict-section';
import { FitSection } from '@/components/detail/fit-section';
import { ValueSection } from '@/components/detail/value-section';
import { RiskSection } from '@/components/detail/risk-section';
import { PerformanceSection } from '@/components/detail/performance-section';
import { ErrorCodeSection } from '@/components/detail/error-code-section';
import { ReviewsSection } from '@/components/detail/reviews-section';
import { PurchaseSection } from '@/components/detail/purchase-section';
import { ProductJsonLd } from '@/components/detail/product-jsonld';
import { ProductTOC } from '@/components/detail/product-toc';
import { allAppliances, getApplianceBySlug, getSimilarProducts } from '@/lib/data/appliances';
import { BRAND_LABELS, CATEGORY_LABELS } from '@/lib/constants';
import { isTraditionalAppliance, getCategorySlug } from '@/lib/category-config';
import { buildProductToc } from '@/lib/detail-sections';
import { buildOpenGraph } from '@/lib/metadata';
import { BreadcrumbJsonLd } from '@/components/jsonld';
import { ApplianceCard } from '@/components/appliance-card';

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
    openGraph: buildOpenGraph({
      title: `${brand} ${appliance.name}`,
      description: appliance.description,
      url,
      images: appliance.image ? [appliance.image] : undefined,
    }),
    ...(appliance.noindex ? { robots: { index: false, follow: true } } : {}),
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const appliance = getApplianceBySlug(slug);
  if (!appliance) notFound();

  const similar = getSimilarProducts(slug);
  const hasErrorCodes = !!appliance.errorCodes?.length;
  const hasPurchase = !!appliance.purchaseLinks?.length;
  const toc = buildProductToc(appliance);

  return (
    <>
      <ProductJsonLd appliance={appliance} />
      <BreadcrumbJsonLd
        items={[
          { name: '홈', path: '/' },
          {
            name: CATEGORY_LABELS[appliance.category] || appliance.category,
            path: `/category/${getCategorySlug(appliance.category)}`,
          },
          { name: `${BRAND_LABELS[appliance.brand] || appliance.brand} ${appliance.name}` },
        ]}
      />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <HeroSection appliance={appliance} />

        <ProductTOC items={toc} />

        {/* 순서는 구매자가 반론을 제기하는 순서를 따른다:
            결론 → 내 환경에 맞나 → 돈이 더 드나 → 기대에 못 미치나 → 근거 → 사회적 증거 → 전환.
            buildProductToc()의 id 순서와 반드시 일치해야 한다. */}
        <div className="space-y-12 pt-8">
          <div id="verdict" className="scroll-mt-32">
            <VerdictSection appliance={appliance} />
          </div>

          <div id="fit" className="scroll-mt-32">
            <FitSection appliance={appliance} />
          </div>

          <div id="value" className="scroll-mt-32">
            <ValueSection appliance={appliance} />
          </div>

          <div id="risk" className="scroll-mt-32">
            <RiskSection appliance={appliance} />
          </div>

          <div id="performance" className="scroll-mt-32">
            <PerformanceSection appliance={appliance} />
          </div>

          <div id="user-reviews" className="scroll-mt-32">
            <ReviewsSection reviews={appliance.reviews} />
          </div>

          {hasPurchase && (
            <div id="purchase" className="scroll-mt-32">
              <PurchaseSection links={appliance.purchaseLinks!} />
            </div>
          )}

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

          {/* 에러코드는 구매 검토자가 아니라 이미 산 사람의 질문이라 맨 끝에 둔다.
              SEO 자산이므로 제거하지 않고 위치만 내린다. */}
          {hasErrorCodes && (
            <div id="errorcodes" className="scroll-mt-32">
              <p className="text-sm text-gray-500 mb-4">구매 후 참고용입니다.</p>
              <ErrorCodeSection
                errorCodes={appliance.errorCodes!}
                brand={appliance.brand}
                category={appliance.category}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
