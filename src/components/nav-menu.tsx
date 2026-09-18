'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';

type Item = { label: string; href: string };

export function NavMenu({ label, items }: { label: string; items: Item[] }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('mousedown', onDocClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDocClick);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1 hover:text-gray-900 transition-colors"
        aria-expanded={open}
        aria-haspopup="menu"
      >
        {label}
        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
      </button>
      {/* 닫혀 있어도 링크는 HTML에 남기고 CSS로만 숨긴다. 조건부 렌더였을 때는 정적 HTML에
          카테고리·브랜드 링크가 하나도 없어, 홈에서 가장 두꺼운 가이드 12개로 가는 링크가 0개였다 */}
      <div
        className={`absolute right-0 mt-2 w-44 max-h-80 overflow-y-auto rounded-xl border bg-white shadow-lg py-1 z-50 ${open ? '' : 'hidden'}`}
      >
          {items.map((it) => (
            <Link
              key={it.href}
              href={it.href}
              onClick={() => setOpen(false)}
              className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-blue-600 transition-colors"
            >
              {it.label}
            </Link>
          ))}
      </div>
    </div>
  );
}
