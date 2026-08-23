import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getErrorCodeBrands, getBrandErrorCodes } from '@/lib/error-codes';
import { SITE_URL, BRAND_LABELS } from '@/lib/constants';
import { CATEGORY_SLUGS } from '@/lib/category-config';
import { buildOpenGraph } from '@/lib/metadata';
import { AdSenseScript } from '@/components/adsense-script';
import { isErrorCodeHubIndexable } from '@/lib/content-quality';

type Props = {
  params: Promise<{ brand: string }>;
};

const SEVERITY_STYLES: Record<string, string> = {
  low: 'bg-green-50 text-green-800 border-green-200',
  medium: 'bg-yellow-50 text-yellow-800 border-yellow-200',
  high: 'bg-red-50 text-red-800 border-red-200',
};
const SEVERITY_LABELS: Record<string, string> = {
  low: '경미',
  medium: '주의',
  high: '긴급',
};

export function generateStaticParams() {
  return getErrorCodeBrands().map((brand) => ({ brand }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { brand } = await params;
  const groups = getBrandErrorCodes(brand);
  if (groups.length === 0) return { title: '에러코드를 찾을 수 없습니다' };

  const brandLabel = BRAND_LABELS[brand] || brand;
  const total = groups.reduce((s, g) => s + g.entries.length, 0);
  const cats = groups.map((g) => g.category).join('·');
  const title = `${brandLabel} 에러코드 전체 — 원인·해결법`;
  const description = `${brandLabel} ${cats} 에러코드 ${total}개의 원인과 자가진단 해결법. 서비스센터 연락 전에 먼저 확인하세요.`;
  const url = `/error-codes/${brand}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: buildOpenGraph({ title, description, url }),
    ...(isErrorCodeHubIndexable({ entryCount: total }) ? {} : { robots: { index: false, follow: true } }),
  };
}

export default async function BrandErrorCodesPage({ params }: Props) {
  const { brand } = await params;
  const groups = getBrandErrorCodes(brand);
  if (groups.length === 0) notFound();

  const brandLabel = BRAND_LABELS[brand] || brand;
  const total = groups.reduce((s, g) => s + g.entries.length, 0);

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '홈', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: '에러코드', item: `${SITE_URL}/error-codes` },
      {
        '@type': 'ListItem',
        position: 3,
        name: brandLabel,
        item: `${SITE_URL}/error-codes/${brand}`,
      },
    ],
  };

  return (
    <>
      {isErrorCodeHubIndexable({ entryCount: total }) && <AdSenseScript />}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, '\\u003c'),
        }}
      />

      <section className="bg-gradient-to-b from-orange-50 to-white py-12">
        <div className="max-w-4xl mx-auto px-4">
          <nav className="text-sm text-gray-500 mb-3">
            <Link href="/" className="hover:text-gray-900">
              홈
            </Link>
            <span className="mx-1.5">/</span>
            <Link href="/error-codes" className="hover:text-gray-900">
              에러코드
            </Link>
            <span className="mx-1.5">/</span>
            <span className="text-gray-900">{brandLabel}</span>
          </nav>
          <h1 className="text-3xl font-bold text-gray-900">{brandLabel} 에러코드</h1>
          <p className="text-gray-600 mt-2">
            {brandLabel} 가전제품에서 표시되는 에러코드 {total}개의 원인과 해결 방법입니다.
            같은 코드라도 제품 종류에 따라 의미가 다르므로 종류별로 나눠 정리했습니다.
          </p>

          {/* 카테고리 바로가기 */}
          <div className="flex flex-wrap gap-2 mt-5">
            {groups.map((g) => (
              <a
                key={g.category}
                href={`#cat-${CATEGORY_SLUGS[g.category]}`}
                className="rounded-full border bg-white px-3 py-1.5 text-sm text-gray-700 hover:border-blue-300 hover:text-blue-600 transition-colors"
              >
                {g.category} {g.entries.length}
              </a>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-12">
        {groups.map((g) => (
          <section key={g.category} id={`cat-${CATEGORY_SLUGS[g.category]}`} className="scroll-mt-24">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {brandLabel} {g.category} 에러코드
            </h2>

            <div className="space-y-3">
              {g.entries.map((e) => (
                <div
                  key={e.anchorId}
                  id={e.anchorId}
                  className={`scroll-mt-24 border rounded-xl p-5 ${SEVERITY_STYLES[e.severity] || ''}`}
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <h3 className="font-mono font-bold text-lg">{e.code}</h3>
                    <span className="text-xs px-2 py-1 rounded-full border font-medium shrink-0">
                      {SEVERITY_LABELS[e.severity] || e.severity}
                    </span>
                  </div>

                  <p className="font-medium mb-2">{e.description}</p>
                  <div className="space-y-1 text-sm">
                    <p>
                      <span className="font-medium">원인:</span> {e.cause}
                    </p>
                    <p>
                      <span className="font-medium">해결:</span> {e.solution}
                    </p>
                  </div>

                  <p className="mt-3 text-sm">
                    <span className="text-gray-600">이 코드가 표시되는 제품: </span>
                    {e.products.map((p, i) => (
                      <span key={p.slug}>
                        {i > 0 && <span className="text-gray-400"> · </span>}
                        <Link href={`/products/${p.slug}`} className="text-blue-600 hover:underline">
                          {p.name}
                        </Link>
                      </span>
                    ))}
                  </p>
                </div>
              ))}
            </div>
          </section>
        ))}

        <div className="border-t pt-6">
          <Link href="/error-codes" className="text-sm text-blue-600 hover:underline">
            ← 전체 에러코드 목록
          </Link>
        </div>
      </div>
    </>
  );
}
