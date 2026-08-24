import Link from 'next/link';
import { SITE_NAME, BRAND_LABELS, EDITOR_RATING_LABEL } from '@/lib/constants';
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

        <div className="border-t pt-6 text-center text-sm text-gray-500 space-y-3">
          <nav className="flex flex-wrap justify-center gap-x-4 gap-y-2">
            <Link href="/blog" className="hover:text-gray-900 transition-colors">블로그</Link>
            <Link href="/about" className="hover:text-gray-900 transition-colors">소개</Link>
            <Link href="/editorial-policy" className="hover:text-gray-900 transition-colors">편집 원칙</Link>
            <Link href="/methodology" className="hover:text-gray-900 transition-colors">평가 방법</Link>
            <Link href="/contact" className="hover:text-gray-900 transition-colors">문의</Link>
            <Link href="/privacy" className="hover:text-gray-900 transition-colors">개인정보처리방침</Link>
            <Link href="/terms" className="hover:text-gray-900 transition-colors">이용약관</Link>
          </nav>
          <p className="text-xs text-gray-400 max-w-2xl mx-auto leading-relaxed">
            모든 점수는 {EDITOR_RATING_LABEL}이며 구매자 평점이 아닙니다. 개별 구매자 후기는
            게시하지 않습니다. 스펙·가격·에러코드는 참고 정보로 변경될 수 있으니 구매·수리 전
            제조사·판매처의 최신 정보를 확인하세요.
          </p>
          <p>&copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
