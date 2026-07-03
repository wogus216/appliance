'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';

export function HeaderSearch({
  className,
  onSubmit,
}: {
  className?: string;
  onSubmit?: () => void;
}) {
  const router = useRouter();
  const [q, setQ] = useState('');

  return (
    <form
      role="search"
      className={className}
      onSubmit={(e) => {
        e.preventDefault();
        const v = q.trim();
        router.push(v ? `/?q=${encodeURIComponent(v)}` : '/');
        onSubmit?.();
      }}
    >
      <div className="relative">
        <Search
          aria-hidden="true"
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
        />
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="제품 검색"
          aria-label="제품 검색"
          className="w-full rounded-full border bg-gray-50 py-2 pl-9 pr-3 text-sm outline-none focus:border-blue-400 focus:bg-white"
        />
      </div>
    </form>
  );
}
