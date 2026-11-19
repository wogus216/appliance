import Link from 'next/link';
import { SITE_NAME } from '@/lib/constants';
import { MobileNav } from '@/components/mobile-nav';

export function Header() {
  return <header className="sticky top-0 z-50 border-b bg-white">
    <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
      <Link href="/" className="text-xl font-bold text-gray-900">{SITE_NAME}</Link>
      <nav aria-label="주 메뉴" className="hidden items-center gap-6 text-sm text-gray-700 md:flex">
        <Link href="/error-codes" className="hover:text-blue-700">에러코드 찾기</Link>
        <Link href="/tools" className="hover:text-blue-700">수리·관리 도구</Link>
        <Link href="/blog/samsung-washer-check-codes" className="hover:text-blue-700">세탁기 점검 안내</Link>
      </nav>
      <MobileNav />
    </div>
  </header>;
}
