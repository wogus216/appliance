import Link from 'next/link';
import { SITE_NAME } from '@/lib/constants';

export function Footer() {
  return <footer className="mt-16 border-t bg-gray-50 py-8">
    <div className="mx-auto max-w-6xl space-y-4 px-4 text-sm text-gray-600">
      <nav aria-label="사이트 안내" className="flex flex-wrap gap-x-5 gap-y-3">
        {[
          ['/error-codes', '에러코드'], ['/tools', '수리·관리 도구'], ['/about', '소개'],
          ['/editorial-policy', '편집 원칙'], ['/methodology', '계산 방법'],
          ['/contact', '문의'], ['/privacy', '개인정보처리방침'], ['/terms', '이용약관'],
        ].map(([href, label]) => <Link key={href} href={href} className="hover:text-blue-700 hover:underline">{label}</Link>)}
      </nav>
      <p className="max-w-prose leading-relaxed">에러코드의 뜻과 조치는 제품군·모델에 따라 다릅니다. 각 문서의 출처와 확인 범위를 살피고, 제품의 정확한 설명서와 제조사 안내를 우선하세요. 고장 원인이나 수리 필요 여부를 확정하는 서비스가 아닙니다.</p>
      <p className="text-xs">&copy; {new Date().getFullYear()} {SITE_NAME}</p>
    </div>
  </footer>;
}
