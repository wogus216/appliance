'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { HeaderSearch } from '@/components/header-search';

type Item = { label: string; href: string };

export function MobileNav({
  categories,
  brands,
}: {
  categories: Item[];
  brands: Item[];
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label={open ? '메뉴 닫기' : '메뉴 열기'}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="-mr-2 p-2 text-gray-700"
      >
        {open ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
      </button>

      {open && (
        <div className="fixed inset-x-0 top-16 z-40 max-h-[calc(100vh-4rem)] overflow-y-auto border-b bg-white shadow-lg">
          <div className="max-w-6xl mx-auto px-4 py-4 space-y-4">
            <HeaderSearch onSubmit={() => setOpen(false)} />

            {/* 4개가 되면서 한 줄로는 글자가 눌린다 — 2×2로 편다 */}
            <div className="grid grid-cols-2 gap-3">
              <Link
                href="/blog"
                onClick={() => setOpen(false)}
                className="rounded-lg border px-3 py-2 text-center text-sm font-medium text-gray-700"
              >
                블로그
              </Link>
              <Link
                href="/compare"
                onClick={() => setOpen(false)}
                className="rounded-lg border px-3 py-2 text-center text-sm font-medium text-gray-700"
              >
                비교
              </Link>
              <Link
                href="/error-codes"
                onClick={() => setOpen(false)}
                className="rounded-lg border px-3 py-2 text-center text-sm font-medium text-gray-700"
              >
                에러코드
              </Link>
              <Link
                href="/materials"
                onClick={() => setOpen(false)}
                className="rounded-lg border px-3 py-2 text-center text-sm font-medium text-gray-700"
              >
                성분 사전
              </Link>
            </div>

            <details>
              <summary className="cursor-pointer py-1 text-sm font-semibold text-gray-900">카테고리</summary>
              <div className="flex flex-wrap gap-2 pt-2">
                {categories.map((c) => (
                  <Link
                    key={c.href}
                    href={c.href}
                    onClick={() => setOpen(false)}
                    className="rounded-full bg-gray-100 px-3 py-1.5 text-sm text-gray-700"
                  >
                    {c.label}
                  </Link>
                ))}
              </div>
            </details>

            <details>
              <summary className="cursor-pointer py-1 text-sm font-semibold text-gray-900">브랜드</summary>
              <div className="flex flex-wrap gap-2 pt-2">
                {brands.map((b) => (
                  <Link
                    key={b.href}
                    href={b.href}
                    onClick={() => setOpen(false)}
                    className="rounded-full bg-gray-100 px-3 py-1.5 text-sm text-gray-700"
                  >
                    {b.label}
                  </Link>
                ))}
              </div>
            </details>
          </div>
        </div>
      )}
    </div>
  );
}
