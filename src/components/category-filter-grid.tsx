'use client';

import { Suspense, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search } from 'lucide-react';
import type { CardAppliance, ApplianceCategory } from '@/types/appliance';
import { BRAND_LABELS } from '@/lib/constants';
import { ApplianceCard } from './appliance-card';
import { cn } from '@/lib/utils';

type SortKey = 'recommended' | 'price-asc' | 'price-desc' | 'efficiency';

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: 'recommended', label: '추천순' },
  { value: 'price-asc', label: '낮은 가격순' },
  { value: 'price-desc', label: '높은 가격순' },
  { value: 'efficiency', label: '에너지효율순' },
];

export function CategoryFilterGrid({
  appliances,
  categories,
}: {
  appliances: CardAppliance[];
  categories: ApplianceCategory[];
}) {
  return (
    <Suspense fallback={<GridSkeleton />}>
      <CategoryFilterGridInner appliances={appliances} categories={categories} />
    </Suspense>
  );
}

function GridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="animate-pulse rounded-xl border bg-white p-4">
          <div className="aspect-[4/3] bg-gray-100 rounded-lg mb-3" />
          <div className="h-4 bg-gray-100 rounded w-2/3 mb-2" />
          <div className="h-3 bg-gray-100 rounded w-1/2" />
        </div>
      ))}
    </div>
  );
}

function CategoryFilterGridInner({
  appliances,
  categories,
}: {
  appliances: CardAppliance[];
  categories: ApplianceCategory[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const active = searchParams.get('category');
  const brand = searchParams.get('brand');
  const sort = (searchParams.get('sort') as SortKey) || 'recommended';
  const [search, setSearch] = useState(searchParams.get('q') ?? '');

  const setParam = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    const qs = params.toString();
    router.replace(qs ? `/?${qs}` : '/', { scroll: false });
  };

  const brands = useMemo(
    () => [...new Set(appliances.map((a) => a.brand))],
    [appliances],
  );

  const counts = useMemo(() => {
    const m = new Map<string, number>();
    for (const a of appliances) m.set(a.category, (m.get(a.category) ?? 0) + 1);
    return m;
  }, [appliances]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    let list = appliances.filter((a) => {
      if (active && a.category !== active) return false;
      if (brand && a.brand !== brand) return false;
      if (q) {
        const hay = `${a.name} ${a.brand} ${BRAND_LABELS[a.brand] ?? ''} ${a.category} ${a.oneliner ?? ''}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
    list = [...list];
    switch (sort) {
      case 'price-asc':
        list.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        list.sort((a, b) => b.price - a.price);
        break;
      case 'efficiency':
        list.sort((a, b) => b.specs.energyEfficiency - a.specs.energyEfficiency);
        break;
      default:
        list.sort((a, b) => b.rating - a.rating);
    }
    return list;
  }, [appliances, active, brand, sort, search]);

  const chipClass = (isActive: boolean) =>
    cn(
      'px-4 py-2 rounded-full text-sm font-medium transition-colors',
      isActive ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
    );

  return (
    <>
      {/* 검색 + 브랜드 + 정렬 */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
            aria-hidden="true"
          />
          <input
            type="search"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setParam('q', e.target.value || null);
            }}
            placeholder="제품명·브랜드 검색"
            aria-label="제품 검색"
            className="w-full rounded-xl border bg-white py-2.5 pl-9 pr-3 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
          />
        </div>
        <div className="flex gap-3">
          <label className="sr-only" htmlFor="brand-filter">브랜드 필터</label>
          <select
            id="brand-filter"
            value={brand ?? ''}
            onChange={(e) => setParam('brand', e.target.value || null)}
            className="rounded-xl border bg-white px-3 py-2.5 text-sm text-gray-700 outline-none focus:border-blue-400"
          >
            <option value="">전체 브랜드</option>
            {brands.map((b) => (
              <option key={b} value={b}>{BRAND_LABELS[b] ?? b}</option>
            ))}
          </select>
          <label className="sr-only" htmlFor="sort-order">정렬</label>
          <select
            id="sort-order"
            value={sort}
            onChange={(e) => setParam('sort', e.target.value === 'recommended' ? null : e.target.value)}
            className="rounded-xl border bg-white px-3 py-2.5 text-sm text-gray-700 outline-none focus:border-blue-400"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* 카테고리 필터 */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          type="button"
          onClick={() => setParam('category', null)}
          aria-pressed={!active}
          className={chipClass(!active)}
        >
          전체 <span className="opacity-70">{appliances.length}</span>
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setParam('category', cat)}
            aria-pressed={active === cat}
            className={chipClass(active === cat)}
          >
            {cat} <span className="opacity-70">{counts.get(cat) ?? 0}</span>
          </button>
        ))}
      </div>

      {/* 결과 수 */}
      <p className="sr-only" role="status">{filtered.length}개 제품</p>

      {/* 제품 그리드 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((appliance) => (
          <ApplianceCard key={appliance.id} appliance={appliance} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-gray-500">
          <p className="text-lg">조건에 맞는 제품이 없습니다.</p>
          <button
            type="button"
            onClick={() => {
              setSearch('');
              router.replace('/', { scroll: false });
            }}
            className="mt-3 text-sm text-blue-600 hover:underline"
          >
            필터 초기화
          </button>
        </div>
      )}
    </>
  );
}
