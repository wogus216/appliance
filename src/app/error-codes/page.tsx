import { Metadata } from 'next';
import { allAppliances } from '@/lib/data/appliances';
import { BRAND_LABELS } from '@/lib/constants';
import { resolveErrorCodeAnchor } from '@/lib/error-codes';
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
