import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllErrorCodeParams, getErrorCodeDetail, errorCodeHref } from '@/lib/error-codes';
import { SITE_URL, BRAND_LABELS } from '@/lib/constants';

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
  const brands = [...new Set(getAllErrorCodeParams().map((p) => p.brand))];
  return brands.map((brand) => ({ brand }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { brand } = await params;
  const brandParams = getAllErrorCodeParams().filter((p) => p.brand === brand);
  if (brandParams.length === 0) return { title: '에러코드를 찾을 수 없습니다' };

  const brandLabel = BRAND_LABELS[brand] || brand;
  const title = `${brandLabel} 에러코드 전체 — 원인·해결법`;
  const description = `${brandLabel} 가전제품의 모든 에러코드(${brandParams.length}개) 원인과 자가진단 해결법을 한눈에. 서비스센터 연락 전에 먼저 확인하세요.`;
  const url = `/error-codes/${brand}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url },
  };
}

export default async function BrandErrorCodesPage({ params }: Props) {
  const { brand } = await params;
  const brandParams = getAllErrorCodeParams().filter((p) => p.brand === brand);
  if (brandParams.length === 0) notFound();

  const brandLabel = BRAND_LABELS[brand] || brand;

  const details = brandParams
    .map((p) => getErrorCodeDetail(brand, p.code))
    .filter((d): d is NonNullable<typeof d> => d !== null);

  // --- 구조화 데이터(JSON-LD) ---
  // BreadcrumbList: 홈 › 에러코드 › 브랜드
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '홈', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: '에러코드', item: `${SITE_URL}/error-codes` },
      { '@type': 'ListItem', position: 3, name: brandLabel, item: `${SITE_URL}/error-codes/${brand}` },
    ],
  };

  // ItemList: 브랜드의 전체 에러코드 링크
  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: details.map((d, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${SITE_URL}${errorCodeHref(brand, d.codeSlug)}`,
      name: `${d.brandLabel} ${d.code} 에러코드`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, '\\u003c') }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd).replace(/</g, '\\u003c') }}
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
            {brandLabel} 가전제품에서 발생하는 에러코드 {details.length}개의 원인과 해결 방법입니다.
            코드를 눌러 자세한 자가진단 방법을 확인하세요.
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid gap-3 sm:grid-cols-2">
          {details.map((d) => (
            <Link
              key={d.codeSlug}
              href={errorCodeHref(brand, d.codeSlug)}
              className="block border rounded-xl p-4 bg-white hover:border-blue-300 hover:shadow-sm transition"
            >
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="font-mono font-bold text-red-600 text-lg">{d.code}</span>
                <span
                  className={`text-xs px-2 py-1 rounded-full border font-medium shrink-0 ${
                    SEVERITY_STYLES[d.occurrences[0].severity] || ''
                  }`}
                >
                  {SEVERITY_LABELS[d.occurrences[0].severity] || d.occurrences[0].severity}
                </span>
              </div>
              <p className="text-sm text-gray-700">{d.occurrences[0].description}</p>
            </Link>
          ))}
        </div>

        <div className="pt-6">
          <Link href="/error-codes" className="text-sm text-blue-600 hover:underline">
            ← 전체 에러코드 목록
          </Link>
        </div>
      </section>
    </>
  );
}
