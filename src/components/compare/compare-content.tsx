'use client';

import { useState, useMemo, useCallback, Suspense } from 'react';
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

export function CompareContent({ allAppliances }: { allAppliances: CardAppliance[] }) {
  return (
    <Suspense fallback={<div className="animate-pulse h-96 bg-gray-50 rounded-2xl" />}>
      <ComparePageContent allAppliances={allAppliances} />
    </Suspense>
  );
}

function ComparePageContent({ allAppliances }: { allAppliances: CardAppliance[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [copied, setCopied] = useState(false);

  // 선택 상태는 URL에서 파생한다. 별도 state로 복제하면 두 곳을 매번 맞춰줘야 하고,
  // effect 안에서 동기적으로 setState하게 되어 렌더가 한 번 더 돈다.
  const selected = useMemo(
    () => parseSelectedParam(searchParams.get('items'), allAppliances),
    [searchParams, allAppliances]
  );

  const updateUrl = useCallback((items: CardAppliance[]) => {
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
