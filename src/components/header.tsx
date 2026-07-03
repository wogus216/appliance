import Link from 'next/link';
import { SITE_NAME, CATEGORY_LABELS, BRAND_LABELS } from '@/lib/constants';
import { getAllCategories, getAllBrands } from '@/lib/data/appliances';
import { NavMenu } from '@/components/nav-menu';
import { HeaderSearch } from '@/components/header-search';
import { MobileNav } from '@/components/mobile-nav';

export function Header() {
  const categoryItems = getAllCategories().map((c) => ({
    label: CATEGORY_LABELS[c] || c,
    href: `/?category=${encodeURIComponent(c)}`,
  }));
  const brandItems = getAllBrands().map((b) => ({
    label: BRAND_LABELS[b] || b,
    href: `/brand/${b}`,
  }));

  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center gap-4">
        <Link href="/" className="flex items-center gap-2.5 min-w-0">
          {/* 로고 마크 — 스펙 비교 막대그래프 (가전비교 전용) */}
          <svg
            width="34"
            height="34"
            viewBox="0 0 44 44"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            className="flex-shrink-0"
          >
            <defs>
              <linearGradient id="ac-logo" x1="0" y1="44" x2="44" y2="0" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#1e3a8a" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>
            </defs>
            <rect width="44" height="44" rx="11" fill="url(#ac-logo)" />
            <rect x="11" y="23" width="6" height="9" rx="3" fill="#ffffff" opacity="0.55" />
            <rect x="19" y="16" width="6" height="16" rx="3" fill="#ffffff" opacity="0.8" />
            <rect x="27" y="11" width="6" height="21" rx="3" fill="#ffffff" />
          </svg>
          <span className="text-xl font-bold text-gray-900">{SITE_NAME}</span>
        </Link>
        <HeaderSearch className="hidden md:block flex-1 max-w-xs" />
        <nav className="hidden md:flex items-center gap-4 sm:gap-6 text-sm text-gray-600">
          <NavMenu label="카테고리" items={categoryItems} />
          <NavMenu label="브랜드" items={brandItems} />
          <Link href="/compare" className="hover:text-gray-900 transition-colors">
            비교
          </Link>
          <Link href="/error-codes" className="hover:text-gray-900 transition-colors">
            에러코드
          </Link>
        </nav>
        <div className="ml-auto md:hidden">
          <MobileNav categories={categoryItems} brands={brandItems} />
        </div>
      </div>
    </header>
  );
}
