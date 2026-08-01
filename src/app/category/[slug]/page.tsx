import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getCardAppliances } from '@/lib/data/appliances';
import { getCategoryGuide } from '@/lib/data/category-guides';
import { CATEGORY_SLUGS, getCategoryBySlug } from '@/lib/category-config';
import { CATEGORY_LABELS, SITE_NAME, SITE_URL } from '@/lib/constants';
import { buildOpenGraph } from '@/lib/metadata';
import { ApplianceCard } from '@/components/appliance-card';
import { JsonLd, BreadcrumbJsonLd } from '@/components/jsonld';

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return Object.values(CATEGORY_SLUGS).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return { title: '카테고리를 찾을 수 없습니다' };

  const label = CATEGORY_LABELS[category] || category;
  const guide = getCategoryGuide(category);
  const url = `/category/${slug}`;
  const title = `${label} 추천 · 비교 가이드`;
  const description =
    guide?.intro ??
    `${label} 주요 제품 스펙·가격 비교와 선택 기준을 한눈에 — ${SITE_NAME}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: buildOpenGraph({ title, description, url }),
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const label = CATEGORY_LABELS[category] || category;
  const products = getCardAppliances()
    .filter((a) => a.category === category)
    .sort((a, b) => b.rating - a.rating);
  const guide = getCategoryGuide(category);

  return (
    <>
      <BreadcrumbJsonLd items={[{ name: '홈', path: '/' }, { name: label }]} />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: `${label} 추천 제품`,
          numberOfItems: products.length,
          itemListElement: products.map((p, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: `${p.brand} ${p.name}`,
            url: `${SITE_URL}/products/${p.slug}`,
          })),
        }}
      />
      {guide && guide.faqs.length > 0 && (
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: guide.faqs.map((f) => ({
              '@type': 'Question',
              name: f.question,
              acceptedAnswer: { '@type': 'Answer', text: f.answer },
            })),
          }}
        />
      )}

      <section className="bg-gradient-to-b from-blue-50 to-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <nav aria-label="브레드크럼" className="text-sm text-gray-500 mb-3">
            <Link href="/" className="hover:text-gray-900">홈</Link>
            <span className="mx-2" aria-hidden>›</span>
            <span className="text-gray-900">{label}</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            {guide?.title ?? `${label} 추천 · 비교`}
          </h1>
          <p className="text-gray-600 text-lg max-w-3xl">
            {guide?.intro ??
              `${label} ${products.length}개 제품의 스펙·가격·추천 대상을 비교해 정리했습니다.`}
          </p>
          {guide && (
            <p className="mt-2 text-xs text-gray-400">최종 검수 {guide.updated}</p>
          )}
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-10 space-y-14">
        {/* 제품 그리드 (평점순) */}
        <section aria-labelledby="product-list">
          <div className="flex items-baseline justify-between mb-4">
            <h2 id="product-list" className="text-xl font-bold text-gray-900">
              {label} 제품 {products.length}종
            </h2>
            <Link href="/compare" className="text-sm text-blue-600 hover:underline">
              나란히 비교하기 →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p) => (
              <ApplianceCard key={p.id} appliance={p} />
            ))}
          </div>
        </section>

        {/* 선택 가이드 */}
        {guide && guide.sections.length > 0 && (
          <section aria-labelledby="buying-guide" className="max-w-3xl">
            <h2 id="buying-guide" className="text-2xl font-bold text-gray-900 mb-6">
              {label} 선택 가이드
            </h2>
            <div className="space-y-8">
              {guide.sections.map((s, i) => (
                <div key={i}>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{s.heading}</h3>
                  <p className="text-gray-700 leading-relaxed">{s.body}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* FAQ */}
        {guide && guide.faqs.length > 0 && (
          <section aria-labelledby="faq" className="max-w-3xl">
            <h2 id="faq" className="text-2xl font-bold text-gray-900 mb-6">
              자주 묻는 질문
            </h2>
            <div className="space-y-3">
              {guide.faqs.map((f, i) => (
                <details key={i} className="group border rounded-xl p-4">
                  <summary className="font-medium text-gray-900 cursor-pointer list-none flex justify-between items-center">
                    {f.question}
                    <span className="text-gray-400 group-open:rotate-180 transition-transform" aria-hidden>
                      ⌄
                    </span>
                  </summary>
                  <p className="mt-3 text-gray-700 leading-relaxed">{f.answer}</p>
                </details>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
