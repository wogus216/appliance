'use client';

import { useState, useMemo, useCallback, useEffect, Suspense, type ReactNode } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { Search, X, Check, Link2, Scale } from 'lucide-react';
import type { CardAppliance } from '@/types/appliance';
import type { PopularComparison } from '@/lib/popular-comparisons';
import type { PurifierComparisonMap } from '@/lib/purifier-comparison';
import { BRAND_LABELS } from '@/lib/constants';
import { CompareTable } from './compare-table';
import { CategoryIcon } from '@/components/category-icon';
import { cn, formatPrice } from '@/lib/utils';

/** capacity 값이 크기·용량(평형·kg·L·인용)인 품목 — 바로 비교 버튼에 용량 차이를 적는다 */
const SIZE_CAPACITY_CATEGORIES = new Set<string>([
  '에어컨', '세탁기', '건조기', '냉장고', '식기세척기', '제습기', '공기청정기',
]);

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
 * URL이 선택 상태의 진실 공급원이다. searchParams가 바뀔 때마다(딥링크 최초 진입뿐 아니라
 * 같은 라우트로의 <Link> 이동·router.push도 포함) 다시 읽어 선택 목록에 반영한다.
 * useSearchParams 호출을 이 컴포넌트 하나로 격리해서, 나머지 비교 UI는 정적 export에서도
 * Suspense fallback이 아니라 실제 콘텐츠로 렌더된다.
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
    onSync(parseSelectedParam(searchParams.get('items'), allAppliances));
  }, [searchParams, allAppliances, onSync]);

  return null;
}

export function CompareContent({
  allAppliances,
  popularComparisons,
  purifierFacts = {},
  children,
}: {
  allAppliances: CardAppliance[];
  popularComparisons: PopularComparison[];
  purifierFacts?: PurifierComparisonMap;
  children?: ReactNode;
}) {
  const router = useRouter();
  const [selected, setSelected] = useState<CardAppliance[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [copied, setCopied] = useState(false);

  // URL이 진실 공급원이므로 UrlItemsSync가 매번 새 배열을 만들어 넘긴다.
  // id 목록이 실제로 안 바뀌었으면 이전 state를 그대로 반환해 불필요한 리렌더를 막는다.
  const syncFromUrl = useCallback((items: CardAppliance[]) => {
    setSelected((prev) =>
      prev.length === items.length && prev.every((p, i) => p.id === items[i].id)
        ? prev
        : items,
    );
  }, []);

  const updateUrl = useCallback((items: CardAppliance[]) => {
    setSelected(items);
    const url = new URL(window.location.href);
    if (items.length > 0) url.searchParams.set('items', items.map(a => a.slug).join(','));
    else url.searchParams.delete('items');
    router.replace(`${url.pathname}${url.search}${url.hash}`, { scroll: false });
  }, [router]);

  const copyShareUrl = () => {
    if (selected.length === 0) return;
    const url = new URL(window.location.href);
    url.searchParams.set('items', selected.map(a => a.slug).join(','));
    navigator.clipboard.writeText(url.toString());
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

  const resultLink = selected.length >= 2 ? (
    <a
      href="#selected-comparison-heading"
      onClick={() => document.getElementById('selected-comparison-heading')?.focus({ preventScroll: true })}
      className="inline-flex min-h-11 items-center font-semibold text-blue-700 underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
    >
      선택한 제품 비교 결과 보기
    </a>
  ) : null;

  return (
    <div className="space-y-8">
      <Suspense fallback={null}>
        <UrlItemsSync allAppliances={allAppliances} onSync={syncFromUrl} />
      </Suspense>

      {/* 헤더 */}
      <section className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-blue-700 text-sm font-medium mb-4">
          <Scale className="w-4 h-4" aria-hidden="true" />
          최대 4개 비교
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">가전제품 비교</h1>
        <p className="text-gray-600">스펙, 가격, 에너지효율을 나란히 비교하세요</p>
        {/* 예전 문구는 "실사용 후기에서는 갈리는 경우가 많다"였다 — 이 사이트는 후기를 모으지도
            싣지도 않아 그 말을 뒷받침할 자료가 없다. 표가 실제로 보여 주는 값의 읽는 법만 적는다. */}
        <p className="text-gray-500 text-sm mt-3 max-w-2xl mx-auto">
          성능 수치를 견줄 때는 같은 품목·비슷한 용량(평형·인용·L)을 고르세요. 설치 방식이나 기능 구성을 고르는 비교는 차이가 나는 조건부터 봅니다. 에너지등급은 제조사 표기 그대로이고,
          등급이 같아도 라벨의 소비전력량(kWh)은 모델마다 다를 수 있습니다. 소음(dB)은 측정 조건이
          제조사마다 달라 숫자 차이를 정숙성 차이로 바로 읽지 않습니다. 가격은 제품마다 적힌
          조사일의 값입니다.
        </p>
      </section>

      {children && (
        <details className="rounded-2xl border border-gray-200 bg-white p-4">
          <summary className="cursor-pointer font-semibold text-gray-900">별도 도구: 공단 신고 전기사용량 비교</summary>
          <p className="mt-3 text-sm text-gray-600">아래에서 고른 제품 목록과 별도로 모델 두 개를 선택하는 도구입니다. 상세 스펙 비교는 ‘선택한 제품 비교 결과 보기’에서 확인하세요.</p>
          <div className="mt-5">{children}</div>
        </details>
      )}

      {popularComparisons.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">고민에 맞는 비교 시작하기</h2>
          <p className="text-xs text-gray-500 mb-3">
            구매할 때 갈리는 조건을 기준으로 모델을 골랐습니다. 각 조합의 선정 이유와 비교 범위를 확인하세요.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {popularComparisons.map(({ category, items, purpose, basis, kind }) => (
              <button
                key={category}
                type="button"
                onClick={() => updateUrl(items)}
                className="rounded-xl border border-gray-200 bg-white p-4 text-left text-sm text-gray-700 hover:border-blue-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
              >
                <span className="block font-semibold text-gray-900">{purpose}</span>
                <span className="mt-2 block text-xs font-medium text-blue-700">{category} · {kind}</span>
                <span className="mt-2 block">
                  {category}: {BRAND_LABELS[items[0].brand] ?? items[0].brand} {items[0].name} vs{' '}
                  {BRAND_LABELS[items[1].brand] ?? items[1].brand} {items[1].name}
                </span>
                <span className="mt-2 block text-xs leading-relaxed text-gray-600">선정 이유: {basis}</span>
                {/* capacity 필드가 '용량'인 품목에서만 — 이어폰은 배터리 시간, 로봇청소기는 먼지통이 들어 있다 */}
                {SIZE_CAPACITY_CATEGORIES.has(category) &&
                  items[0].capacity && items[1].capacity && items[0].capacity !== items[1].capacity && (
                  <span className="block text-xs text-gray-500">
                    용량 {items[0].capacity} vs {items[1].capacity}
                  </span>
                )}
              </button>
            ))}
          </div>
          {resultLink && <div className="mt-3">{resultLink}</div>}
        </section>
      )}

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

        {resultLink && <div className="mb-3">{resultLink}</div>}

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
                    className="w-14 h-14 shrink-0 object-contain rounded-lg"
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
                    className="w-12 h-12 object-contain rounded-lg flex-shrink-0"
                  />
                ) : (
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 text-gray-300">
                    <CategoryIcon category={item.category} className="w-6 h-6" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-500">{brand} · {item.category}</p>
                  <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
                  {item.price != null && (
                    <p className="text-xs text-gray-400">{formatPrice(item.price)}</p>
                  )}
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
          <CompareTable appliances={selected} onRemove={removeItem} purifierFacts={purifierFacts} />
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
