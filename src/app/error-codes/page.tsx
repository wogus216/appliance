import { Metadata } from 'next';
import { allAppliances } from '@/lib/data/appliances';
import { BRAND_LABELS } from '@/lib/constants';
import { getErrorCodeBrands, resolveErrorCodeAnchor } from '@/lib/error-codes';
import { buildOpenGraph } from '@/lib/metadata';
import Link from 'next/link';
import { AdSenseScript } from '@/components/adsense-script';

export const metadata: Metadata = {
  title: '가전 에러코드 자가진단',
  description: '삼성, LG 등 가전제품 에러코드 원인과 해결 방법을 한눈에 확인하세요.',
  alternates: { canonical: '/error-codes' },
  openGraph: buildOpenGraph({
    title: '가전 에러코드 자가진단',
    description: '삼성, LG 등 가전제품 에러코드 원인과 해결 방법을 한눈에 확인하세요.',
    url: '/error-codes',
  }),
};

export default function ErrorCodesPage() {
  const appliancesWithErrors = allAppliances.filter(
    (a) => a.errorCodes && a.errorCodes.length > 0
  );

  const byBrand = appliancesWithErrors.reduce((acc, a) => {
    const brand = BRAND_LABELS[a.brand] || a.brand;
    if (!acc[brand]) acc[brand] = [];
    acc[brand].push(a);
    return acc;
  }, {} as Record<string, typeof appliancesWithErrors>);

  return (
    <>
        <AdSenseScript />
        <section className="bg-gradient-to-b from-orange-50 to-white py-12">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-3">
              가전 에러코드 자가진단
            </h1>
            <p className="text-gray-600">
              에러코드가 떴을 때, 서비스센터 전화 전에 먼저 확인하세요
            </p>
          </div>
        </section>

        {/* 브랜드 허브로 가는 링크. 아래 목록은 제품이 있는 브랜드만 나오므로, 제품 없이
            에러코드만 싣는 브랜드(나비엔·귀뚜라미 등)는 여기가 유일한 입구다 */}
        <nav aria-label="브랜드별 에러코드" className="max-w-4xl mx-auto px-4 pt-8">
          <h2 className="text-sm font-semibold text-gray-500 mb-3">브랜드별 에러코드</h2>
          <div className="flex flex-wrap gap-2">
            {getErrorCodeBrands().map((b) => (
              <Link
                key={b}
                href={`/error-codes/${b}`}
                className="px-3 py-1.5 rounded-full border text-sm text-gray-700 hover:border-orange-300 hover:text-orange-600 transition-colors"
              >
                {BRAND_LABELS[b] || b}
              </Link>
            ))}
          </div>
        </nav>

        <section className="max-w-4xl mx-auto px-4 py-8 space-y-10">
          {Object.entries(byBrand).map(([brand, appliances]) => (
            <div key={brand}>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{brand}</h2>
              {appliances.map((a) => (
                <div key={a.id} className="mb-6">
                  <Link
                    href={`/products/${a.slug}#errorcodes`}
                    className="text-lg font-semibold text-blue-600 hover:underline"
                  >
                    {a.name} ({a.category})
                  </Link>
                  <div className="mt-3 space-y-2">
                    {a.errorCodes!.map((e) => (
                      <div key={e.code} className="flex gap-4 p-3 bg-gray-50 rounded-lg text-sm">
                        <Link
                          href={resolveErrorCodeAnchor(a.brand, a.category, e)}
                          className="font-mono font-bold text-red-600 shrink-0 w-16 hover:underline"
                        >
                          {e.code}
                        </Link>
                        <div>
                          <p className="font-medium text-gray-900">{e.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </section>
    </>
  );
}
