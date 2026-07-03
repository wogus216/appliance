import Link from 'next/link';
import { SITE_NAME, BRAND_LABELS } from '@/lib/constants';
import { getAllBrands } from '@/lib/data/appliances';

export function Footer() {
  const brands = getAllBrands();

  return (
    <footer className="border-t bg-gray-50 py-8 mt-16">
      <div className="max-w-6xl mx-auto px-4">
        {/* 브랜드별 보기 */}
        <div className="mb-6">
          <p className="text-xs font-semibold text-gray-500 mb-2 text-center">브랜드별 보기</p>
          <div className="flex flex-wrap justify-center gap-2">
            {brands.map((b) => (
              <Link
                key={b}
                href={`/brand/${b}`}
                className="px-3 py-1 rounded-full bg-white border text-xs text-gray-600 hover:border-blue-300 hover:text-blue-600 transition-colors"
              >
                {BRAND_LABELS[b] || b}
              </Link>
            ))}
          </div>
        </div>

        <div className="border-t pt-6 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.</p>
          <p className="mt-2">
            본 사이트는 제품 비교 정보를 제공하며, 구매 결정은 소비자 본인의 판단에 따릅니다.
          </p>
        </div>
      </div>
    </footer>
  );
}
