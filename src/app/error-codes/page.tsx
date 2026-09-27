import { Metadata } from 'next';
import { BRAND_LABELS } from '@/lib/constants';
import { getErrorCodeBrands, getErrorCodeDirectory } from '@/lib/error-codes';
import { buildOpenGraph } from '@/lib/metadata';
import Link from 'next/link';
import { AdSenseScript } from '@/components/adsense-script';

const directory = getErrorCodeDirectory();
const codeCount = directory.reduce((n, g) => n + g.codeCount, 0);
const TITLE = '가전 에러코드 자가진단';
// 설명에 제품군과 개수를 싣는다 — 검색 결과에서 "무엇의 에러코드인지"가 먼저 보여야 한다
const DESCRIPTION =
  `${directory.map((g) => g.category).slice(0, 5).join('·')} 등 ${directory.length}개 제품군, ` +
  `에러코드 ${codeCount}개의 뜻과 직접 해볼 수 있는 조치를 제품군·브랜드별로 정리했습니다.`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/error-codes' },
  openGraph: buildOpenGraph({ title: TITLE, description: DESCRIPTION, url: '/error-codes' }),
};

export default function ErrorCodesPage() {
  return (
    <>
        <AdSenseScript />
        <section className="bg-gradient-to-b from-orange-50 to-white py-12">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-3">{TITLE}</h1>
            <p className="text-gray-600">
              에러코드가 떴을 때, 서비스센터 전화 전에 먼저 확인하세요. 같은 글자라도 제품군과
              모델 계열에 따라 뜻이 다르므로 제품군부터 고르세요.
            </p>
            <p className="text-gray-500 text-sm mt-3">
              {directory.length}개 제품군 · 에러코드 {codeCount}개
            </p>
          </div>
        </section>

        {/* 브랜드 허브로 가는 링크 — 모든 브랜드 허브의 입구를 한 줄에 모은다 */}
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

        <nav aria-label="제품군" className="max-w-4xl mx-auto px-4 pt-6">
          <h2 className="text-sm font-semibold text-gray-500 mb-3">제품군</h2>
          <div className="flex flex-wrap gap-2">
            {directory.map((g) => (
              <a
                key={g.category}
                href={`#${g.slug}`}
                className="px-3 py-1.5 rounded-full bg-gray-100 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-700 transition-colors"
              >
                {g.category} {g.codeCount}
              </a>
            ))}
          </div>
        </nav>

        {/* 제품군 → 브랜드 → 코드. 제품에 붙은 코드와 제품 없이 실린 코드(보일러)를 같은 목록에 싣는다 */}
        <div className="max-w-4xl mx-auto px-4 py-8 space-y-12">
          {directory.map((g) => (
            <section key={g.category} id={g.slug} className="scroll-mt-24">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{g.category} 에러코드</h2>
              <div className="space-y-6">
                {g.brands.map((b) => (
                  <div key={b.brand}>
                    <h3 className="text-lg font-semibold mb-2">
                      <Link href={b.href} className="text-blue-600 hover:underline">
                        {b.label} {g.category} 에러코드 {b.entries.length}개
                      </Link>
                    </h3>
                    <ul className="space-y-1.5">
                      {b.entries.map((e) => (
                        <li key={e.anchorId} className="flex gap-4 p-3 bg-gray-50 rounded-lg text-sm">
                          <Link
                            href={`/error-codes/${b.brand}#${e.anchorId}`}
                            className="font-mono font-bold text-red-600 shrink-0 w-24 hover:underline"
                          >
                            {e.code}
                          </Link>
                          <span className="text-gray-900">{e.description}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
    </>
  );
}
