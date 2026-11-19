'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export function MobileNav() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const close = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', close);
    return () => document.removeEventListener('keydown', close);
  }, [open]);
  return <div className="md:hidden">
    <button type="button" aria-label={open ? '메뉴 닫기' : '메뉴 열기'} aria-controls="mobile-menu" aria-expanded={open} onClick={() => setOpen(!open)} className="flex min-h-11 min-w-11 items-center justify-center text-gray-700">
      {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
    </button>
    {open && <nav id="mobile-menu" aria-label="모바일 메뉴" className="absolute inset-x-0 top-16 border-b bg-white px-4 py-3">
      {[
        ['/error-codes', '에러코드 찾기'], ['/tools', '수리·관리 도구'],
        ['/blog/samsung-washer-check-codes', '세탁기 점검 안내'], ['/about', '소개'],
      ].map(([href, label]) => <Link key={href} href={href} onClick={() => setOpen(false)} className="flex min-h-11 items-center py-2 text-gray-800">{label}</Link>)}
    </nav>}
  </div>;
}
