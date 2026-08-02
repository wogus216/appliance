import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllErrorCodeParams, getErrorCodeDetail, errorCodeHref } from '@/lib/error-codes';
import { SITE_URL } from '@/lib/constants';

type Props = {
  params: Promise<{ brand: string; code: string }>;
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
  return getAllErrorCodeParams();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { brand, code } = await params;
  const detail = getErrorCodeDetail(brand, code);
  if (!detail) return { title: '에러코드를 찾을 수 없습니다' };

  const cats = [...new Set(detail.occurrences.map((o) => o.category))];
  return {
    title: `${detail.brandLabel} ${detail.code} 에러코드 — 원인과 해결방법`,
    description: `${detail.brandLabel} ${detail.code} 에러코드의 원인과 자가진단 해결법. ${cats.join('·')} 등 ${detail.occurrences.length}개 제품에서 발생하는 ${detail.code} 코드를 확인하세요.`,
  };
}

export default async function ErrorCodeDetailPage({ params }: Props) {
  const { brand, code } = await params;
  const detail = getErrorCodeDetail(brand, code);
  if (!detail) notFound();

  // 카테고리 + 설명 단위로 묶어 중복 제거 (동일 의미는 한 번, 영향 제품은 모아서)
  const groups = new Map<
    string,
    {
      category: string;
      description: string;
      cause: string;
      solution: string;
      severity: string;
      products: { name: string; slug: string }[];
    }
  >();
  for (const o of detail.occurrences) {
    const key = `${o.category}|${o.description}`;
    if (!groups.has(key)) {
      groups.set(key, {
        category: o.category,
        description: o.description,
        cause: o.cause,
        solution: o.solution,
        severity: o.severity,
        products: [],
      });
    }
    groups.get(key)!.products.push({ name: o.productName, slug: o.slug });
  }
  const groupList = [...groups.values()];

  // --- 구조화 데이터(JSON-LD) ---
  // FAQPage: 발생 케이스별 Q&A. description/cause/solution 동일 시 중복 질문 제거
  const faqSeen = new Set<string>();
  const faqMainEntity = [];
  for (const o of detail.occurrences) {
    const key = `${o.description}|${o.cause}|${o.solution}`;
    if (faqSeen.has(key)) continue;
    faqSeen.add(key);
    faqMainEntity.push({
      '@type': 'Question',
      name: `${detail.brandLabel} ${detail.code} 에러코드 — ${o.description}`,
      acceptedAnswer: {
        '@type': 'Answer',
        text: `원인: ${o.cause} 해결: ${o.solution}`,
      },
    });
  }
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqMainEntity,
  };

  // BreadcrumbList: 홈 › 에러코드 › 브랜드 › 현재 코드
  const pageUrl = `${SITE_URL}${errorCodeHref(detail.brand, detail.code)}`;
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '홈', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: '에러코드', item: `${SITE_URL}/error-codes` },
      { '@type': 'ListItem', position: 3, name: detail.brandLabel, item: `${SITE_URL}/brand/${detail.brand}` },
      { '@type': 'ListItem', position: 4, name: detail.code, item: pageUrl },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, '\\u003c') }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, '\\u003c') }}
      />
        <section className="bg-gradient-to-b from-orange-50 to-white py-12">
          <div className="max-w-4xl mx-auto px-4">
            <nav className="text-sm text-gray-500 mb-3">
              <Link href="/error-codes" className="hover:text-gray-900">
                에러코드
              </Link>
              <span className="mx-1.5">/</span>
              <Link href={`/brand/${detail.brand}`} className="hover:text-gray-900">
                {detail.brandLabel}
              </Link>
            </nav>
            <h1 className="text-3xl font-bold text-gray-900">
              {detail.brandLabel} <span className="font-mono text-red-600">{detail.code}</span> 에러코드
            </h1>
            <p className="text-gray-600 mt-2">
              {detail.brandLabel} 제품에서 <span className="font-mono font-medium">{detail.code}</span> 코드가
              뜰 때의 원인과 해결 방법입니다. 서비스센터 연락 전에 먼저 시도해보세요.
            </p>
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-4 py-8 space-y-4">
          {groupList.map((g, i) => (
            <div key={i} className={`border rounded-xl p-5 ${SEVERITY_STYLES[g.severity] || ''}`}>
              <div className="flex items-center justify-between mb-2">
                <h2 className="font-bold text-lg">
                  <span className="text-sm font-medium opacity-70">{g.category}</span> — {g.description}
                </h2>
                <span className="text-xs px-2 py-1 rounded-full border font-medium shrink-0">
                  {SEVERITY_LABELS[g.severity] || g.severity}
                </span>
              </div>
              <div className="space-y-1 text-sm">
                <p><span className="font-medium">원인:</span> {g.cause}</p>
                <p><span className="font-medium">해결:</span> {g.solution}</p>
              </div>
              <div className="mt-3 pt-3 border-t border-black/5">
                <p className="text-xs opacity-70 mb-1.5">이 코드가 표시되는 제품</p>
                <div className="flex flex-wrap gap-2">
                  {g.products.map((p) => (
                    <Link
                      key={p.slug}
                      href={`/products/${p.slug}`}
                      className="text-xs px-2.5 py-1 rounded-full bg-white/70 border hover:border-blue-300 hover:text-blue-600 transition-colors"
                    >
                      {p.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}

          <div className="pt-4">
            <Link href="/error-codes" className="text-sm text-blue-600 hover:underline">
              ← 전체 에러코드 목록
            </Link>
          </div>
        </section>
    </>
  );
}
