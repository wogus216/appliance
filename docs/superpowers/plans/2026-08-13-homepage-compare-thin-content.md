# 홈페이지·Compare Thin Content 해소 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 홈(`/`)·compare(`/compare`) 정적 HTML에 실제 콘텐츠(제품 카드·비교 UI 텍스트)가 실리게 해서, 애드센스 재신청 전 남은 최대 노출 페이지 두 곳의 thin content를 없앤다.

**Architecture:** 두 페이지 모두 실제 콘텐츠가 `useSearchParams()`를 쓰는 클라이언트 컴포넌트 안에 있고 `<Suspense>`로 감싸져 있어, 정적 export 빌드가 Suspense fallback(빈 스켈레톤)만 정적 HTML에 싣는다. `useSearchParams()` 호출을 화면에 아무것도 그리지 않는 작은 자식 컴포넌트로 분리하고, 그리드/비교 UI 본체는 `useState` 기본값만으로 렌더해 정적 HTML에 실제 콘텐츠가 실리게 한다. 여기에 카탈로그 파생 문구를 가볍게 얹는다.

**Tech Stack:** Next.js 16 (`output: "export"`, 순수 정적), React 19, TypeScript, vitest, Tailwind v4

**설계 근거:** `docs/superpowers/specs/2026-08-13-homepage-compare-thin-content-design.md` — 결정의 *이유*가 필요하면 이 스펙을 읽을 것.

## Global Constraints

- **이 저장소의 Next.js는 훈련 데이터와 다르다.** Next 관련 코드를 쓰기 전에 `node_modules/next/dist/docs/`의 해당 가이드를 읽는다 (AGENTS.md). 이 플랜은 이미 `use-search-params.md`·`use-router.md`를 확인해 작성됐다 — `useSearchParams()`는 호출한 컴포넌트부터 가장 가까운 Suspense까지를 정적 렌더링에서 제외시키지만, `useRouter()` 단독 호출은 그런 제약이 없다(NavigationEvents 예제로 확인됨).
- **정적 export다.** `next.config.ts`가 `output: "export"`이므로 서버 런타임에 의존하는 것을 만들지 않는다.
- **주석과 UI 문구는 한국어.** 커밋 메시지는 영어.
- **URL 기반 기능(딥링크·공유 링크)을 하나도 없애지 않는다.** `?category=`, `?brand=`, `?sort=`, `?q=`, `?items=` 전부 기존과 동일하게 동작해야 한다.
- **`parseSelectedParam`의 export 시그니처를 바꾸지 않는다** — `src/components/compare/__tests__/compare-content.test.ts`가 이 함수를 직접 import해서 쓴다.
- **에디토리얼 문구는 가볍게만.** 브랜드 페이지 사이클처럼 여러 라운드짜리 집필이 아니다 — 구조 수정만으로 분량 게이트는 사실상 통과하므로, 문구는 첫인상 품질을 위한 것이다.

---

## File Structure

**신규**
- `src/lib/popular-comparisons.ts` — 카테고리별 평점 상위 2개를 묶는 파생 함수
- `src/lib/__tests__/popular-comparisons.test.ts`

**수정**
- `src/components/category-filter-grid.tsx` — `useSearchParams()`를 `UrlFilterSync` 자식 컴포넌트로 분리
- `src/components/compare/compare-content.tsx` — `useSearchParams()`를 `UrlItemsSync` 자식 컴포넌트로 분리
- `src/app/page.tsx` — 파생 통계 한 줄 + "이렇게 고르세요" 추가
- `src/app/compare/page.tsx` — 비교 포인트 설명 + "자주 비교되는 조합" 추가

---

### Task 1: `getPopularComparisons` 파생 함수

카테고리별 평점 상위 2개를 묶어 비교 링크 후보를 만드는 순수 함수. 저장하지 않고 파생한다 — 브랜드 페이지 사이클의 `computeBrandStats`와 같은 원칙이다. Task 5(compare 페이지 에디토리얼)가 이 함수를 쓴다.

**Files:**
- Create: `src/lib/popular-comparisons.ts`
- Test: `src/lib/__tests__/popular-comparisons.test.ts`

**Interfaces:**
- Consumes: `CardAppliance`, `ApplianceCategory` (`@/types/appliance`)
- Produces:
  - `PopularComparison { category: ApplianceCategory; items: [CardAppliance, CardAppliance] }`
  - `getPopularComparisons(appliances: CardAppliance[], categories: ApplianceCategory[]): PopularComparison[]`
  - `comparisonHref(items: [CardAppliance, CardAppliance]): string`

- [ ] **Step 1: 실패하는 테스트 작성**

`src/lib/__tests__/popular-comparisons.test.ts`:

```ts
import { describe, it, expect } from 'vitest';
import { getPopularComparisons, comparisonHref } from '@/lib/popular-comparisons';
import type { CardAppliance } from '@/types/appliance';

function item(overrides: Pick<CardAppliance, 'id' | 'slug' | 'category' | 'rating'>): CardAppliance {
  return {
    brand: 'LG',
    name: overrides.slug,
    price: 100000,
    tags: [],
    specs: { energyEfficiency: 5, performance: 5, noise: 5, convenience: 5, durability: 5 },
    ...overrides,
  };
}

describe('getPopularComparisons', () => {
  it('카테고리에 제품이 2개 미만이면 후보를 만들지 않는다', () => {
    const appliances = [item({ id: '1', slug: 'a', category: '에어컨', rating: 4.5 })];
    expect(getPopularComparisons(appliances, ['에어컨'])).toEqual([]);
  });

  it('카테고리 안에서 평점 상위 2개를 고른다', () => {
    const appliances = [
      item({ id: '1', slug: 'a', category: '에어컨', rating: 4.0 }),
      item({ id: '2', slug: 'b', category: '에어컨', rating: 4.8 }),
      item({ id: '3', slug: 'c', category: '에어컨', rating: 4.5 }),
    ];
    const result = getPopularComparisons(appliances, ['에어컨']);
    expect(result).toHaveLength(1);
    expect(result[0].items.map((i) => i.slug)).toEqual(['b', 'c']);
  });

  it('categories 인자의 순서를 따른다', () => {
    const appliances = [
      item({ id: '1', slug: 'a', category: '세탁기', rating: 4.5 }),
      item({ id: '2', slug: 'b', category: '세탁기', rating: 4.2 }),
      item({ id: '3', slug: 'c', category: '에어컨', rating: 4.5 }),
      item({ id: '4', slug: 'd', category: '에어컨', rating: 4.2 }),
    ];
    const result = getPopularComparisons(appliances, ['에어컨', '세탁기']);
    expect(result.map((r) => r.category)).toEqual(['에어컨', '세탁기']);
  });

  it('카탈로그에 없는 카테고리는 건너뛴다', () => {
    const appliances = [item({ id: '1', slug: 'a', category: '에어컨', rating: 4.5 })];
    expect(getPopularComparisons(appliances, ['에어컨', '세탁기'])).toEqual([]);
  });
});

describe('comparisonHref', () => {
  it('슬러그를 콤마로 이어 비교 페이지 쿼리스트링을 만든다', () => {
    const items: [CardAppliance, CardAppliance] = [
      item({ id: '1', slug: 'a', category: '에어컨', rating: 4 }),
      item({ id: '2', slug: 'b', category: '에어컨', rating: 4 }),
    ];
    expect(comparisonHref(items)).toBe('/compare?items=a,b');
  });
});
```

- [ ] **Step 2: 테스트를 돌려 실패 확인**

Run: `npx vitest run src/lib/__tests__/popular-comparisons.test.ts`
Expected: FAIL — `Failed to resolve import "@/lib/popular-comparisons"`

- [ ] **Step 3: 구현**

`src/lib/popular-comparisons.ts`:

```ts
import type { CardAppliance, ApplianceCategory } from '@/types/appliance';

export interface PopularComparison {
  category: ApplianceCategory;
  items: [CardAppliance, CardAppliance];
}

/**
 * 카테고리별 평점 상위 2개를 묶어 비교 링크 후보로 삼는다.
 * 순수 파생 데이터라 카탈로그가 바뀌면 저절로 맞는다 — 저장하지 않는다.
 */
export function getPopularComparisons(
  appliances: CardAppliance[],
  categories: ApplianceCategory[],
): PopularComparison[] {
  const comparisons: PopularComparison[] = [];
  for (const category of categories) {
    const inCategory = [...appliances]
      .filter((a) => a.category === category)
      .sort((a, b) => b.rating - a.rating);
    if (inCategory.length >= 2) {
      comparisons.push({ category, items: [inCategory[0], inCategory[1]] });
    }
  }
  return comparisons;
}

export function comparisonHref(items: [CardAppliance, CardAppliance]): string {
  return `/compare?items=${items.map((a) => a.slug).join(',')}`;
}
```

- [ ] **Step 4: 테스트 통과 확인**

Run: `npx vitest run src/lib/__tests__/popular-comparisons.test.ts`
Expected: 전부 PASS

- [ ] **Step 5: 커밋**

```bash
git add src/lib/popular-comparisons.ts src/lib/__tests__/popular-comparisons.test.ts
git commit -m "feat: derive popular comparison pairs from the catalog

Not stored — recomputed from ratings each build, same principle as the
brand-page cycle's computeBrandStats."
```

---

### Task 2: 홈페이지 그리드 — URL 동기화 분리

`useSearchParams()` 호출을 그리드 렌더링에서 분리한다. 이 태스크가 끝나면 `/`의 정적 HTML에 필터 UI와 제품 카드 74개가 실제 텍스트로 실린다.

**Files:**
- Modify: `src/components/category-filter-grid.tsx` (전면 교체)

**Interfaces:**
- Consumes: 없음 (기존 `CardAppliance`, `ApplianceCategory` 타입만)
- Produces: `CategoryFilterGrid({ appliances, categories })` — **props 시그니처 불변**, `src/app/page.tsx`가 그대로 쓴다 (Task 4에서 그 파일을 건드리지만 이 컴포넌트 호출부는 안 바뀐다)

> **먼저 Next 문서를 확인해라.** `node_modules/next/dist/docs/01-app/03-api-reference/04-functions/use-search-params.md`의 "Prerendering" 절을 읽어라 — `useSearchParams`를 호출하면 그 컴포넌트부터 가장 가까운 `Suspense`까지 클라이언트 전용 렌더링이 된다는 설명과, `Suspense`로 감싸는 예제(`SearchBar`/`SearchBarFallback`)가 이번 태스크가 따르는 정확한 패턴이다.

- [ ] **Step 1: 현재 파일과 동작 확인**

`src/components/category-filter-grid.tsx`를 읽고 현재 필터링 로직(`useMemo` 3개: `brands`, `counts`, `filtered`)과 정렬 로직을 파악해라 — 이 로직 자체는 이번 태스크에서 바뀌지 않는다. 바뀌는 것은 상태(`active`/`brand`/`sort`/`search`)의 출처뿐이다: 지금은 `useSearchParams()`에서 매 렌더 직접 읽지만, 이후엔 `useState`가 진실 공급원이 되고 `useSearchParams()`는 마운트 시 한 번만 그 상태를 초기화하는 데 쓰인다.

- [ ] **Step 2: 파일 전면 교체**

`src/components/category-filter-grid.tsx`를 아래 내용으로 통째로 바꿔라:

```tsx
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
 * 딥링크(예: ?category=에어컨)로 들어온 사용자를 위해 마운트 후 한 번 URL을 읽어
 * 부모의 필터 상태에 반영한다. useSearchParams 호출을 이 컴포넌트 하나로 격리해서,
 * 나머지 그리드는 정적 export에서도 Suspense fallback이 아니라 실제 콘텐츠로 렌더된다
 * (useSearchParams는 호출한 컴포넌트부터 가장 가까운 Suspense까지를 클라이언트 전용
 * 렌더링으로 만든다 — Next 공식 문서).
 */
function UrlFilterSync({ onSync }: { onSync: (patch: Partial<FilterState>) => void }) {
  const searchParams = useSearchParams();

  useEffect(() => {
    const category = searchParams.get('category');
    const brand = searchParams.get('brand');
    const sort = searchParams.get('sort') as SortKey | null;
    const q = searchParams.get('q');
    if (category || brand || sort || q) {
      onSync({ category, brand, sort: sort || 'recommended', q: q ?? '' });
    }
    // 마운트 시 딥링크를 한 번만 반영한다. 이후 URL 변경은 사용자 조작(updateFilter)이
    // 상태와 URL을 함께 갱신하므로, 여기서 다시 반영하면 중복이다.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const updateFilter = useCallback(
    (patch: Partial<FilterState>) => {
      setFilter((prev) => {
        const next = { ...prev, ...patch };
        const params = new URLSearchParams();
        if (next.category) params.set('category', next.category);
        if (next.brand) params.set('brand', next.brand);
        if (next.sort !== 'recommended') params.set('sort', next.sort);
        if (next.q) params.set('q', next.q);
        const qs = params.toString();
        router.replace(qs ? `/?${qs}` : '/', { scroll: false });
        return next;
      });
    },
    [router],
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
  }, [appliances, filter.category, filter.brand, filter.sort, filter.q]);

  const chipClass = (isActive: boolean) =>
    cn(
      'px-4 py-2 rounded-full text-sm font-medium transition-colors',
      isActive ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
    );

  return (
    <>
      <Suspense fallback={null}>
        <UrlFilterSync onSync={(patch) => setFilter((prev) => ({ ...prev, ...patch }))} />
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
```

`GridSkeleton`은 삭제됐다 — 더 이상 필요 없다(그리드 자체가 기본 상태로 항상 실제 콘텐츠를 렌더한다).

- [ ] **Step 3: 타입·린트 확인**

Run: `npx tsc --noEmit && npm run lint`
Expected: 둘 다 에러 없음

- [ ] **Step 4: 빌드하고 정적 HTML에 실제 콘텐츠가 실리는지 확인**

Run: `npm run build`
Expected: 성공

Run: `grep -c "animate-pulse" out/index.html`
Expected: `0` (스켈레톤 마커가 완전히 사라짐 — Task 2 이전에는 `6`이었다)

Run: `node scripts/measure-page-length.mjs '^index$' 1200`
Expected: `index` 글자 수가 이전(336자)보다 크게 늘어남 (정확한 통과 여부는 Task 6에서 에디토리얼 문구까지 더해 최종 확인한다 — 이 시점엔 아직 문구가 없어 그리드 콘텐츠만으로 얼마나 늘었는지 보는 것이 목적이다)

- [ ] **Step 5: 전체 테스트 스위트 확인**

Run: `npm test`
Expected: 기존과 동일하게 전부 PASS (이 컴포넌트에는 전용 테스트가 없다 — 저장소에 컴포넌트 테스트 인프라가 없다)

- [ ] **Step 6: 커밋**

```bash
git add src/components/category-filter-grid.tsx
git commit -m "fix: stop shipping an empty skeleton as the homepage's static HTML

useSearchParams() was called inside the component that renders the
product grid, which forces that whole subtree to be client-only during
static export — the exported HTML had 6 empty skeleton divs and zero
product text. Moving the URL read into a tiny sibling component
(UrlFilterSync, wrapped in its own Suspense) lets the grid itself render
from plain useState defaults, so the static HTML now ships the real
74-card grid. Deep links still work — UrlFilterSync catches up the
filter state once it mounts."
```

---

### Task 3: Compare — URL 동기화 분리

같은 패턴을 compare에 적용한다. `parseSelectedParam`의 export 시그니처는 절대 바꾸지 않는다 — 기존 테스트가 그대로 통과해야 한다.

**Files:**
- Modify: `src/components/compare/compare-content.tsx` (전면 교체)

**Interfaces:**
- Consumes: 없음
- Produces:
  - `parseSelectedParam(param: string | null, allAppliances: CardAppliance[]): CardAppliance[]` — **시그니처 불변**, `src/components/compare/__tests__/compare-content.test.ts`가 그대로 import한다
  - `CompareContent({ allAppliances })` — **props 시그니처 불변**, `src/app/compare/page.tsx`가 그대로 쓴다

> **먼저 기존 테스트를 확인해라.** `src/components/compare/__tests__/compare-content.test.ts`를 읽어라 — `parseSelectedParam`만 직접 테스트하고 컴포넌트는 건드리지 않는다. 이 태스크가 끝나도 이 테스트 파일은 한 글자도 안 바뀐 채 통과해야 한다.

- [ ] **Step 1: 현재 파일 확인**

`src/components/compare/compare-content.tsx`를 읽어라. `CompareContent`(외부, Suspense로 `ComparePageContent`를 감쌈)와 `ComparePageContent`(실제 로직)로 나뉘어 있다. 이번 태스크에서 이 둘을 하나의 `CompareContent`로 합친다.

- [ ] **Step 2: 파일 전면 교체**

`src/components/compare/compare-content.tsx`를 아래 내용으로 통째로 바꿔라:

```tsx
'use client';

import { useState, useMemo, useCallback, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { Search, X, Check, Link2, Scale } from 'lucide-react';
import type { CardAppliance } from '@/types/appliance';
import { BRAND_LABELS } from '@/lib/constants';
import { CompareRadarChart } from './compare-radar-chart';
import { CompareTable } from './compare-table';
import { CategoryIcon } from '@/components/category-icon';
import { cn, formatPrice } from '@/lib/utils';

const MAX_ITEMS = 4;
const VALID_SLUG = /^[a-z0-9-]+$/;

/**
 * ?items= 파라미터를 제품 목록으로 푼다.
 * 선택 상태는 URL이 단일 진실 공급원이므로, 이 함수의 결과가 곧 현재 선택이다.
 */
export function parseSelectedParam(
  param: string | null,
  allAppliances: CardAppliance[]
): CardAppliance[] {
  if (!param) return [];
  return param
    .split(',')
    .slice(0, MAX_ITEMS)
    .filter(s => VALID_SLUG.test(s))
    .map(slug => allAppliances.find(a => a.slug === slug))
    .filter((a): a is CardAppliance => !!a);
}

/**
 * 딥링크(?items=...)로 들어온 사용자를 위해 마운트 후 한 번 URL을 읽어
 * 선택 목록에 반영한다. useSearchParams 호출을 이 컴포넌트 하나로 격리해서,
 * 나머지 비교 UI는 정적 export에서도 Suspense fallback이 아니라 실제 콘텐츠로
 * 렌더된다(useSearchParams는 호출한 컴포넌트부터 가장 가까운 Suspense까지를
 * 클라이언트 전용 렌더링으로 만든다 — Next 공식 문서).
 */
function UrlItemsSync({
  allAppliances,
  onSync,
}: {
  allAppliances: CardAppliance[];
  onSync: (items: CardAppliance[]) => void;
}) {
  const searchParams = useSearchParams();

  useEffect(() => {
    const items = parseSelectedParam(searchParams.get('items'), allAppliances);
    if (items.length > 0) onSync(items);
    // 마운트 시 딥링크를 한 번만 반영한다. 이후 선택 변경은 updateUrl이 상태와
    // URL을 함께 갱신하므로, 여기서 다시 반영하면 중복이다.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}

export function CompareContent({ allAppliances }: { allAppliances: CardAppliance[] }) {
  const router = useRouter();
  const [selected, setSelected] = useState<CardAppliance[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [copied, setCopied] = useState(false);

  const updateUrl = useCallback((items: CardAppliance[]) => {
    setSelected(items);
    if (items.length > 0) {
      router.replace(`/compare?items=${items.map(a => a.slug).join(',')}`, { scroll: false });
    } else {
      router.replace('/compare', { scroll: false });
    }
  }, [router]);

  const copyShareUrl = () => {
    if (selected.length === 0) return;
    const url = `${window.location.origin}/compare?items=${selected.map(a => a.slug).join(',')}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const filtered = useMemo(() => {
    if (!searchQuery) return allAppliances;
    const q = searchQuery.toLowerCase();
    // 제품명에서 브랜드를 분리했으므로(name은 모델명만) 한글 브랜드 라벨을 따로 넣어야
    // "삼성"으로 검색이 된다. a.brand는 'Samsung' 같은 영문 키다.
    return allAppliances.filter(a =>
      `${a.name} ${a.brand} ${BRAND_LABELS[a.brand] ?? ''} ${a.category}`.toLowerCase().includes(q),
    );
  }, [allAppliances, searchQuery]);

  const addItem = (item: CardAppliance) => {
    if (selected.length < MAX_ITEMS && !selected.some(s => s.id === item.id)) {
      updateUrl([...selected, item]);
    }
  };

  const removeItem = (id: string) => {
    updateUrl(selected.filter(s => s.id !== id));
  };

  const clearAll = () => {
    updateUrl([]);
  };

  return (
    <div className="space-y-8">
      <Suspense fallback={null}>
        <UrlItemsSync allAppliances={allAppliances} onSync={setSelected} />
      </Suspense>

      {/* 헤더 */}
      <section className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-blue-700 text-sm font-medium mb-4">
          <Scale className="w-4 h-4" aria-hidden="true" />
          최대 4개 비교
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">가전제품 비교</h1>
        <p className="text-gray-600">스펙, 가격, 에너지효율을 나란히 비교하세요</p>
      </section>

      {/* 선택된 제품 슬롯 */}
      <section className="bg-white border rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-gray-900">
            선택된 제품 <span className="text-blue-600">({selected.length}/{MAX_ITEMS})</span>
          </h2>
          <div className="flex items-center gap-2">
            {selected.length >= 2 && (
              <button
                onClick={copyShareUrl}
                className={cn(
                  "flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium transition",
                  copied ? "bg-green-50 text-green-700" : "bg-blue-50 text-blue-700 hover:bg-blue-100"
                )}
              >
                {copied ? <Check className="w-4 h-4" aria-hidden="true" /> : <Link2 className="w-4 h-4" aria-hidden="true" />}
                {copied ? '복사됨' : 'URL 공유'}
              </button>
            )}
            {selected.length > 0 && (
              <button onClick={clearAll} className="text-sm text-gray-400 hover:text-red-500 transition">
                전체 삭제
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {selected.map(item => (
            <div key={item.id} className="relative rounded-xl border border-blue-100 bg-blue-50/30 p-4">
              <button
                type="button"
                onClick={() => removeItem(item.id)}
                aria-label="비교에서 제거"
                className="absolute -top-2 -right-2 p-1 rounded-full bg-red-500 text-white hover:opacity-80 z-10"
              >
                <X className="h-3 w-3" aria-hidden="true" />
              </button>
              <div className="flex items-center gap-3">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={`${BRAND_LABELS[item.brand] || item.brand} ${item.name}`}
                    width={56}
                    height={56}
                    className="w-14 h-14 object-cover rounded-lg"
                  />
                ) : (
                  <div className="w-14 h-14 bg-gray-100 rounded-lg flex items-center justify-center text-gray-300">
                    <CategoryIcon category={item.category} className="w-8 h-8" />
                  </div>
                )}
                <div className="min-w-0">
                  <p className="text-xs text-gray-500">{BRAND_LABELS[item.brand] || item.brand}</p>
                  <p className="text-sm font-semibold text-gray-900 truncate">{item.name}</p>
                </div>
              </div>
            </div>
          ))}
          {Array.from({ length: MAX_ITEMS - selected.length }).map((_, i) => (
            <div
              key={`empty-${i}`}
              className="flex min-h-[80px] items-center justify-center rounded-xl border-2 border-dashed border-gray-200 text-gray-400 text-sm"
            >
              빈 슬롯
            </div>
          ))}
        </div>
      </section>

      {/* 제품 검색 */}
      <section className="bg-white border rounded-2xl p-6">
        <h2 className="font-bold text-gray-900 mb-4">비교할 제품 찾기</h2>
        <div className="relative mb-4">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" aria-hidden="true" />
          <input
            type="text"
            aria-label="제품 검색"
            placeholder="제품 이름, 브랜드 검색..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full rounded-full border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 text-sm focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-[400px] overflow-y-auto">
          {filtered.map(item => {
            const isSelected = selected.some(s => s.id === item.id);
            const canAdd = selected.length < MAX_ITEMS;
            const brand = BRAND_LABELS[item.brand] || item.brand;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => addItem(item)}
                disabled={isSelected || !canAdd}
                className={cn(
                  "flex w-full items-center gap-3 rounded-xl border p-3 text-left transition cursor-pointer",
                  isSelected
                    ? "border-blue-300 bg-blue-50 cursor-default"
                    : canAdd
                    ? "border-gray-200 bg-white hover:border-blue-300 hover:shadow-sm"
                    : "border-gray-100 bg-gray-50 opacity-50 cursor-not-allowed"
                )}
              >
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={`${brand} ${item.name}`}
                    width={48}
                    height={48}
                    className="w-12 h-12 object-cover rounded-lg flex-shrink-0"
                  />
                ) : (
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 text-gray-300">
                    <CategoryIcon category={item.category} className="w-6 h-6" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-500">{brand} · {item.category}</p>
                  <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
                  <p className="text-xs text-gray-400">{formatPrice(item.price)}</p>
                </div>
                {isSelected && (
                  <span className="flex-shrink-0 rounded-full bg-blue-600 px-2 py-1 text-xs text-white">선택됨</span>
                )}
              </button>
            );
          })}
        </div>
      </section>

      {/* 비교 결과 */}
      {selected.length >= 2 && (
        <>
          <CompareRadarChart appliances={selected} />
          <CompareTable appliances={selected} onRemove={removeItem} />
        </>
      )}

      {selected.length === 1 && (
        <div className="text-center py-12 text-gray-500">
          비교를 위해 1개 이상의 제품을 추가로 선택해주세요
        </div>
      )}

      {selected.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          위에서 비교할 제품을 선택하세요
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 3: 기존 테스트가 그대로 통과하는지 확인**

Run: `npx vitest run src/components/compare/__tests__/compare-content.test.ts`
Expected: 5개 테스트 전부 PASS, 파일 자체는 변경하지 않았음을 `git diff src/components/compare/__tests__/compare-content.test.ts`로 확인 (빈 diff)

- [ ] **Step 4: 타입·린트 확인**

Run: `npx tsc --noEmit && npm run lint`
Expected: 둘 다 에러 없음

- [ ] **Step 5: 빌드하고 정적 HTML에 실제 콘텐츠가 실리는지 확인**

Run: `npm run build`
Expected: 성공

Run: `grep -c "animate-pulse h-96" out/compare.html`
Expected: `0` (Task 3 이전에는 `1`이었다)

Run: `node scripts/measure-page-length.mjs '^compare$' 1200`
Expected: `compare` 글자 수가 이전(269자)보다 크게 늘어남 — "비교할 제품 찾기" 섹션이 카탈로그 74개 전체를 이름·브랜드·카테고리·가격과 함께 나열하므로 이 시점에 이미 1,200자를 넘을 가능성이 높다. 넘지 않아도 Task 5에서 에디토리얼 문구를 더한다.

- [ ] **Step 6: 전체 테스트 스위트 확인**

Run: `npm test`
Expected: 전부 PASS (compare-content.test.ts 포함)

- [ ] **Step 7: 커밋**

```bash
git add src/components/compare/compare-content.tsx
git commit -m "fix: stop shipping an empty skeleton as compare's static HTML

Same root cause as the homepage grid: useSearchParams() lived inside the
component rendering the actual comparison UI, so static export shipped
only the animate-pulse fallback div. UrlItemsSync now owns the URL read
in its own Suspense boundary; the product-picker list (already listing
all 74 catalog items with name/brand/price) renders unconditionally.
parseSelectedParam's signature is untouched — compare-content.test.ts
passes without modification."
```

---

### Task 4: 홈페이지 에디토리얼 문구

**Files:**
- Modify: `src/app/page.tsx`

**Interfaces:**
- Consumes: `getCardAppliances`, `getAllCategories`, `getAllBrands` (`@/lib/data/appliances`), `CategoryFilterGrid` (Task 2, 시그니처 불변)
- Produces: 없음 (최종 페이지)

- [ ] **Step 1: 현재 파일 확인**

`src/app/page.tsx`를 읽어라. 히어로 섹션과 `CategoryFilterGrid` 호출이 있다.

- [ ] **Step 2: 파일 교체**

`src/app/page.tsx`를 아래 내용으로 통째로 바꿔라:

```tsx
import { Metadata } from 'next';
import { CategoryFilterGrid } from '@/components/category-filter-grid';
import { getCardAppliances, getAllCategories, getAllBrands } from '@/lib/data/appliances';
import { SITE_NAME, SITE_DESCRIPTION } from '@/lib/constants';
import { buildOpenGraph } from '@/lib/metadata';

export const metadata: Metadata = {
  title: SITE_NAME,
  description: SITE_DESCRIPTION,
  alternates: { canonical: '/' },
  openGraph: buildOpenGraph({ title: SITE_NAME, description: SITE_DESCRIPTION, url: '/' }),
};

export default function HomePage() {
  const appliances = getCardAppliances();
  const categories = getAllCategories();
  const brandCount = getAllBrands().length;

  return (
    <>
        {/* 히어로 */}
        <section className="bg-gradient-to-b from-blue-50 to-white py-16">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              가전제품, 제대로 비교하고 고르세요
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              에어컨 · 선풍기 · 제습기 · 세탁기 · 건조기 — 스펙 비교, 에러코드 자가진단, 평수별 추천까지
            </p>
            <p className="text-gray-500 text-sm mt-3">
              현재 {categories.length}개 카테고리 · {appliances.length}개 제품 · {brandCount}개 브랜드를 비교할 수 있습니다
            </p>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 py-8">
          {/* 이렇게 고르세요 */}
          <div className="grid sm:grid-cols-3 gap-6 mb-10 text-sm text-gray-600">
            <div>
              <p className="font-semibold text-gray-900 mb-1">에너지효율로</p>
              <p>등급 한 칸 차이가 여름 전기요금에서 실제 금액으로 드러납니다. 정렬을 에너지효율순으로 바꿔 비교하세요.</p>
            </div>
            <div>
              <p className="font-semibold text-gray-900 mb-1">평수로</p>
              <p>냉방·제습 면적이 평수 표기보다 정확한 기준입니다. 제품 상세의 평수별 추천을 함께 확인하세요.</p>
            </div>
            <div>
              <p className="font-semibold text-gray-900 mb-1">가격으로</p>
              <p>정가와 실거래가는 다릅니다. 가격순 정렬과 제품별 월 유지비를 함께 보세요.</p>
            </div>
          </div>

          {/* 카테고리 필터 + 제품 그리드 */}
          <CategoryFilterGrid appliances={appliances} categories={categories} />
        </section>
    </>
  );
}
```

- [ ] **Step 3: 타입·린트 확인**

Run: `npx tsc --noEmit && npm run lint`
Expected: 둘 다 에러 없음

- [ ] **Step 4: 빌드하고 분량 확인**

Run: `npm run build && node scripts/measure-page-length.mjs '^index$' 1200`
Expected: `index`가 1,200자 이상 (exit 0)

- [ ] **Step 5: 커밋**

```bash
git add src/app/page.tsx
git commit -m "content: add derived stats and a short buying-guide to the homepage

The catalog counts (categories/products/brands) are computed at build
time, not written — same principle as the brand-page stats. The
buying-guide is one paragraph, not a per-item writing round; the
character gate is already cleared by Task 2's grid fix, this is for
first-impression quality."
```

---

### Task 5: Compare 페이지 에디토리얼 문구

**Files:**
- Modify: `src/app/compare/page.tsx`

**Interfaces:**
- Consumes: `getCardAppliances`, `getAllCategories` (`@/lib/data/appliances`), `getPopularComparisons`, `comparisonHref` (Task 1), `BRAND_LABELS` (`@/lib/constants`), `CompareContent` (Task 3, 시그니처 불변)
- Produces: 없음 (최종 페이지)

- [ ] **Step 1: 현재 파일 확인**

`src/app/compare/page.tsx`를 읽어라.

- [ ] **Step 2: 파일 교체**

`src/app/compare/page.tsx`를 아래 내용으로 통째로 바꿔라:

```tsx
import { Metadata } from 'next';
import Link from 'next/link';
import { CompareContent } from '@/components/compare/compare-content';
import { getCardAppliances, getAllCategories } from '@/lib/data/appliances';
import { getPopularComparisons, comparisonHref } from '@/lib/popular-comparisons';
import { BRAND_LABELS } from '@/lib/constants';
import { buildOpenGraph } from '@/lib/metadata';

export const metadata: Metadata = {
  title: '가전제품 비교',
  description: '에어컨, 제습기, 세탁기 등 가전제품 스펙을 나란히 비교하세요.',
  alternates: { canonical: '/compare' },
  openGraph: buildOpenGraph({
    title: '가전제품 비교',
    description: '에어컨, 제습기, 세탁기 등 가전제품 스펙을 나란히 비교하세요.',
    url: '/compare',
  }),
};

export default function ComparePage() {
  const allAppliances = getCardAppliances();
  const categories = getAllCategories();
  const popularComparisons = getPopularComparisons(allAppliances, categories);

  return (
    <>
        <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
          <p className="text-gray-600 text-sm max-w-2xl">
            같은 평형·같은 가격대 제품을 나란히 놓고 스펙 차이를 확인하세요. 소음·에너지효율처럼 숫자로는 비슷해
            보이는 항목도 설치 조건이나 실사용 후기에서는 갈리는 경우가 많습니다.
          </p>

          {popularComparisons.length > 0 && (
            <section>
              <h2 className="text-sm font-semibold text-gray-900 mb-3">자주 비교되는 조합</h2>
              <div className="flex flex-wrap gap-2">
                {popularComparisons.map(({ category, items }) => (
                  <Link
                    key={category}
                    href={comparisonHref(items)}
                    className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm text-gray-700 hover:border-blue-300 hover:text-blue-600 transition"
                  >
                    {category}: {BRAND_LABELS[items[0].brand] ?? items[0].brand} {items[0].name} vs{' '}
                    {BRAND_LABELS[items[1].brand] ?? items[1].brand} {items[1].name}
                  </Link>
                ))}
              </div>
            </section>
          )}

          <CompareContent allAppliances={allAppliances} />
        </div>
    </>
  );
}
```

- [ ] **Step 3: 타입·린트 확인**

Run: `npx tsc --noEmit && npm run lint`
Expected: 둘 다 에러 없음

- [ ] **Step 4: 빌드하고 분량 확인**

Run: `npm run build && node scripts/measure-page-length.mjs '^compare$' 1200`
Expected: `compare`가 1,200자 이상 (exit 0)

- [ ] **Step 5: 커밋**

```bash
git add src/app/compare/page.tsx
git commit -m "content: add usage guidance and popular comparison links to compare

Popular comparisons are derived (top-2-by-rating per category with 2+
products), not curated by hand — links are real navigation value, not
padding."
```

---

### Task 6: 최종 검증

**Files:** 없음 (검증만)

- [ ] **Step 1: 명령 순서**

Run: `npm run lint && npx tsc --noEmit && npm test && npm run build`
Expected: 전부 PASS

- [ ] **Step 2: 목표 지표**

Run: `node scripts/measure-page-length.mjs '^(index|compare)$' 1200`
Expected: exit 0, `2개 중 0개가 1200자 미만 (0%)`

- [ ] **Step 3: 사이트 전체 개선폭**

Run: `node scripts/measure-page-length.mjs '' 1200`
Expected: 브랜드 사이클 종료 시점(129개 중 11개, 9%)에서 index·compare 2개가 빠져 129개 중 9개(7%)로 줄어든다.

- [ ] **Step 4: 스켈레톤 마커 완전히 사라졌는지 재확인**

```bash
grep -c "animate-pulse" out/index.html
grep -c "animate-pulse" out/compare.html
```
Expected: 둘 다 `0`

- [ ] **Step 5: 하이드레이션·딥링크·공유 링크 — Playwright로 실제 확인**

정적 export는 서버가 없으므로 `out/`를 로컬 정적 서버로 띄운 뒤 확인한다. `next dev`로는 이 버그가 재현되지 않는다(개발 모드는 라우트를 요청 시점에 렌더해 `useSearchParams`가 서스펜드하지 않는다 — Next 문서에 명시됨) — 반드시 `out/`를 정적으로 서빙해서 확인한다.

```bash
npx serve out -p 4173
```
(백그라운드로 띄운다)

Playwright로 순서대로 확인한다:

1. `http://localhost:4173/`로 이동 → 콘솔에 하이드레이션 관련 에러/경고(`Hydration failed`, `did not match`)가 없는지 `mcp__playwright__browser_console_messages`로 확인
2. `http://localhost:4173/?category=에어컨`으로 이동 → 로드 직후에는 전체 제품이 보이다가, 잠시 후 에어컨만 남는지 스냅샷으로 확인 (카테고리 칩 "에어컨"에 `aria-pressed="true"`가 붙는지도 확인)
3. `http://localhost:4173/compare`로 이동 → "비교할 제품 찾기" 섹션에 제품이 나열되는지 확인. 제품 하나를 클릭해 선택 슬롯에 들어가는지 확인
4. 제품 2개를 선택한 뒤 "URL 공유" 버튼을 눌러 복사가 되는지(버튼 텍스트가 "복사됨"으로 바뀌는지) 확인
5. `http://localhost:4173/compare?items=<3에서 선택한 두 제품의 slug>`로 새로 이동 → 로드 직후 선택 슬롯이 비어 있다가, 잠시 후 두 제품이 채워지는지 확인
6. 홈페이지의 "자주 비교되는 조합" 링크를 하나 클릭해 compare로 이동하고 두 제품이 선택된 채로 뜨는지 확인

확인이 끝나면 정적 서버 프로세스를 종료한다.

- [ ] **Step 6: 결과 보고**

사용자에게 보고한다:
- index·compare 최종 글자 수
- 사이트 전체 미달 페이지 수 변화 (11개 → 실측값)
- Playwright 확인 결과 (하이드레이션 경고 유무, 딥링크·공유 링크 동작 여부)
- 배포 여부 결정 요청

---

## 완료 조건

- [ ] `npm run lint`·`npx tsc --noEmit`·`npm test`·`npm run build` 전부 통과
- [ ] `node scripts/measure-page-length.mjs '^(index|compare)$' 1200` exit 0
- [ ] `out/index.html`·`out/compare.html`에 `animate-pulse` 마커 없음
- [ ] `compare-content.test.ts`가 수정 없이 그대로 통과
- [ ] 딥링크(`?category=`, `?items=`)와 공유 링크가 실제 브라우저에서 정상 동작
