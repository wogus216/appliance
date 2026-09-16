import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getErrorCodeBrands, getBrandErrorCodes } from '@/lib/error-codes';
import { SITE_URL, BRAND_LABELS } from '@/lib/constants';
import { CATEGORY_SLUGS } from '@/lib/category-config';
import { buildOpenGraph } from '@/lib/metadata';
import { AdSenseScript } from '@/components/adsense-script';
import { ErrorCodeEvidenceSection } from '@/components/error-codes/evidence-section';
import { getErrorCodeEditorial } from '@/lib/data/editorial/error-code-editorial';
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

  // 제목에 제품군을 넣는다.
  //
  // 2026-09-16 네이버 실적: /error-codes/Winix 가 노출 111에 클릭 0이었다. 제목이
  // "위닉스 에러코드 전체"인데 실제로 실린 것은 제습기 6개뿐이고, 위닉스 주력은
  // 공기청정기다. 찾아온 사람이 스니펫에서 자기 제품이 아님을 보고 지나간 셈이다.
  // "전체"는 다섯 카테고리를 덮는 삼성에는 맞지만 한 카테고리뿐인 브랜드에는 과장이다.
  //
  // 검색어 쪽에서도 같은 방향을 가리킨다 — "sk매직 식기세척기 e4", "쿠쿠 식기세척기
  // e4에러"처럼 질의가 대부분 '브랜드 + 제품군 + 코드' 형태다. 제품군이 제목에 있으면
  // 그 질의와 글자가 겹친다.
  const title =
    groups.length <= 2
      ? `${brandLabel} ${cats} 에러코드 — 원인·해결법`
      : `${brandLabel} 에러코드 전체 — 원인·해결법`;

  // 설명에는 실제 코드를 앞에 깐다. 사람들은 코드 하나를 들고 검색하므로,
  // 스니펫에 그 글자가 보이는 것이 "자가진단 해결법" 같은 총론보다 낫다.
  const codeList = groups
    .flatMap((g) => g.entries.map((e) => e.code))
    .slice(0, 8)
    .join('·');
  const description =
    `${brandLabel} ${cats} 에러코드 ${total}개 — ${codeList}${total > 8 ? ' 등' : ''}의 ` +
    `원인과 해결법. 서비스센터에 연락하기 전에 먼저 확인하세요.`;
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
          {/* 제목도 제품군을 밝힌다 — 근거는 generateMetadata의 주석 참조 */}
          <h1 className="text-3xl font-bold text-gray-900">
            {groups.length <= 2
              ? `${brandLabel} ${groups.map((g) => g.category).join('·')} 에러코드`
              : `${brandLabel} 에러코드`}
          </h1>
          <p className="text-gray-600 mt-2">
            {groups.length === 1 ? (
              <>
                {brandLabel} {groups[0].category}에서 표시되는 에러코드 {total}개의 원인과 해결
                방법입니다. 이 브랜드의 다른 제품군은 아직 다루지 않습니다.
              </>
            ) : (
              <>
                {brandLabel} 가전제품에서 표시되는 에러코드 {total}개의 원인과 해결 방법입니다. 같은
                코드라도 제품 종류에 따라 의미가 다르므로 종류별로 나눠 정리했습니다.
              </>
            )}
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

        <ErrorCodeEvidenceSection
          brandLabel={brandLabel}
          meta={getErrorCodeEditorial(brand)}
        />

        <div className="border-t pt-6 mt-12">
          <Link href="/error-codes" className="text-sm text-blue-600 hover:underline">
            ← 전체 에러코드 목록
          </Link>
        </div>
      </div>
    </>
  );
}
