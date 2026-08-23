'use client';

import { Suspense, useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search } from 'lucide-react';
import type { CardAppliance, ApplianceCategory } from '@/types/appliance';
import { BRAND_LABELS } from '@/lib/constants';
import { ApplianceCard } from './appliance-card';
import { cn } from '@/lib/utils';

type SortKey = 'recommended' | 'price-asc' | 'price-desc' | 'efficiency';

interface FilterState {
  category: string | null;
  brand: string | null;
  sort: SortKey;
  q: string;
}

const DEFAULT_FILTER: FilterState = { category: null, brand: null, sort: 'recommended', q: '' };

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: 'recommended', label: '추천순' },
  { value: 'price-asc', label: '낮은 가격순' },
  { value: 'price-desc', label: '높은 가격순' },
  { value: 'efficiency', label: '에너지효율순' },
];

/**
 * URL이 필터의 진실 공급원이다. searchParams가 바뀔 때마다(딥링크 최초 진입뿐 아니라
 * 같은 라우트로의 <Link> 이동·router.push도 포함) 다시 읽어 부모 상태에 반영한다.
 * useSearchParams 호출을 이 컴포넌트 하나로 격리해서, 나머지 그리드는 정적 export에서도
 * Suspense fallback이 아니라 실제 콘텐츠로 렌더된다(useSearchParams는 호출한 컴포넌트부터
 * 가장 가까운 Suspense까지를 클라이언트 전용 렌더링으로 만든다 — Next 공식 문서).
 */
function UrlFilterSync({ onSync }: { onSync: (next: FilterState) => void }) {
  const searchParams = useSearchParams();

  useEffect(() => {
    const category = searchParams.get('category');
    const brand = searchParams.get('brand');
    const sort = (searchParams.get('sort') as SortKey | null) || 'recommended';
    const q = searchParams.get('q') ?? '';
    onSync({ category, brand, sort, q });
  }, [searchParams, onSync]);

  return null;
}

export function CategoryFilterGrid({
  appliances,
  categories,
}: {
  appliances: CardAppliance[];
  categories: ApplianceCategory[];
}) {
  const router = useRouter();
  const [filter, setFilter] = useState<FilterState>(DEFAULT_FILTER);

  // URL이 진실 공급원이므로 UrlFilterSync가 매번 새 FilterState 객체를 만들어 넘긴다.
  // 값이 실제로 안 바뀌었으면 이전 state를 그대로 반환해 불필요한 리렌더를 막는다.
  const syncFromUrl = useCallback((next: FilterState) => {
    setFilter((prev) =>
      prev.category === next.category &&
      prev.brand === next.brand &&
      prev.sort === next.sort &&
      prev.q === next.q
        ? prev
        : next,
    );
  }, []);

  const updateFilter = useCallback(
    (patch: Partial<FilterState>) => {
      const next = { ...filter, ...patch };
      setFilter(next);
      const params = new URLSearchParams();
      if (next.category) params.set('category', next.category);
      if (next.brand) params.set('brand', next.brand);
      if (next.sort !== 'recommended') params.set('sort', next.sort);
      if (next.q) params.set('q', next.q);
      const qs = params.toString();
      router.replace(qs ? `/?${qs}` : '/', { scroll: false });
    },
    [filter, router],
  );

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
    const q = filter.q.trim().toLowerCase();
    let list = appliances.filter((a) => {
      if (filter.category && a.category !== filter.category) return false;
      if (filter.brand && a.brand !== filter.brand) return false;
      if (q) {
        const hay = `${a.name} ${a.brand} ${BRAND_LABELS[a.brand] ?? ''} ${a.category} ${a.oneliner ?? ''}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
    list = [...list];
    switch (filter.sort) {
      case 'price-asc':
        // 가격 미확인 제품은 정렬 끝으로 보낸다
        list.sort((a, b) => (a.price ?? Infinity) - (b.price ?? Infinity));
        break;
      case 'price-desc':
        list.sort((a, b) => (b.price ?? -1) - (a.price ?? -1));
        break;
      case 'efficiency':
        list.sort((a, b) => b.specs.energyEfficiency - a.specs.energyEfficiency);
        break;
      default:
        list.sort((a, b) => b.rating - a.rating);
    }
    return list;
  }, [appliances, filter.category, filter.brand, filter.sort, filter.q]);

  const chipClass = (isActive: boolean) =>
    cn(
      'px-4 py-2 rounded-full text-sm font-medium transition-colors',
      isActive ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
    );

  return (
    <>
      <Suspense fallback={null}>
        <UrlFilterSync onSync={syncFromUrl} />
      </Suspense>

      {/* 검색 + 브랜드 + 정렬 */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
            aria-hidden="true"
          />
          <input
            type="search"
            value={filter.q}
            onChange={(e) => updateFilter({ q: e.target.value })}
            placeholder="제품명·브랜드 검색"
            aria-label="제품 검색"
            className="w-full rounded-xl border bg-white py-2.5 pl-9 pr-3 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
          />
        </div>
        <div className="flex gap-3">
          <label className="sr-only" htmlFor="brand-filter">브랜드 필터</label>
          <select
            id="brand-filter"
            value={filter.brand ?? ''}
            onChange={(e) => updateFilter({ brand: e.target.value || null })}
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
            value={filter.sort}
            onChange={(e) => updateFilter({ sort: e.target.value as SortKey })}
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
          onClick={() => updateFilter({ category: null })}
          aria-pressed={!filter.category}
          className={chipClass(!filter.category)}
        >
          전체 <span className="opacity-70">{appliances.length}</span>
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => updateFilter({ category: cat })}
            aria-pressed={filter.category === cat}
            className={chipClass(filter.category === cat)}
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
            onClick={() => updateFilter(DEFAULT_FILTER)}
            className="mt-3 text-sm text-blue-600 hover:underline"
          >
            필터 초기화
          </button>
        </div>
      )}
    </>
  );
}
