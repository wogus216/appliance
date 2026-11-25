'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { lookupErrorCode, type LookupBrand } from '@/lib/error-code-lookup';

const fieldClass = 'mt-1 block min-h-11 w-full rounded-md border border-gray-400 bg-white px-3 text-gray-900 focus-visible:outline-2 focus-visible:outline-blue-700';
const linkClass = 'inline-flex min-h-11 items-center font-semibold text-blue-700 underline underline-offset-4';

export function ModelCodeLookup({ brands }: { brands: LookupBrand[] }) {
  const [query, setQuery] = useState({ brand: '', code: '', model: '' });
  const [submitted, setSubmitted] = useState(false);
  const brand = brands.find((option) => option.brand === query.brand);
  const result = submitted && brand ? lookupErrorCode(brand.entries, query.code, query.model) : null;

  function update(field: keyof typeof query, value: string) {
    setQuery({ ...query, [field]: value });
    setSubmitted(false);
  }

  function search(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <section id="model-code-lookup" aria-labelledby="lookup-heading" className="mx-auto max-w-4xl scroll-mt-24 px-4 pt-8">
      <div className="rounded-xl border border-gray-200 bg-gray-50 p-5 sm:p-6">
        <h2 id="lookup-heading" className="text-xl font-bold text-gray-900">모델명과 코드로 찾기</h2>
        <p id="lookup-help" className="mt-2 text-sm leading-relaxed text-gray-700">
          기기 화면의 코드와 명판의 모델명 전체를 입력하면, 해당 조치의 적용 범위가 확인된 자료를 찾을 수 있습니다.
        </p>
        <form onSubmit={search} aria-describedby="lookup-help" className="mt-4 grid gap-3 sm:grid-cols-3">
          <label htmlFor="lookup-brand" className="text-sm font-semibold text-gray-900">
            브랜드
            <select id="lookup-brand" required className={fieldClass} value={query.brand} onChange={(event) => update('brand', event.target.value)}>
              <option value="">브랜드 선택</option>
              {brands.map((option) => <option key={option.brand} value={option.brand}>{option.label}</option>)}
            </select>
          </label>
          <label htmlFor="lookup-code" className="text-sm font-semibold text-gray-900">
            화면에 뜬 코드
            <input id="lookup-code" type="text" required autoComplete="off" spellCheck={false} maxLength={40} className={fieldClass} value={query.code} onChange={(event) => update('code', event.target.value)} placeholder="예 E4, Error 4" />
          </label>
          <label htmlFor="lookup-model" className="text-sm font-semibold text-gray-900">
            모델명 (선택)
            <input id="lookup-model" type="text" autoComplete="off" spellCheck={false} maxLength={80} className={fieldClass} value={query.model} onChange={(event) => update('model', event.target.value)} placeholder="예 CDW-A0611TS" />
          </label>
          <button type="submit" className="min-h-11 rounded-md bg-gray-900 px-4 text-sm font-semibold text-white hover:bg-gray-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 sm:justify-self-start">
            코드 확인
          </button>
        </form>
        <noscript><p className="mt-3 text-sm text-gray-700">검색을 사용하려면 JavaScript를 켜세요. 아래 제품군·브랜드별 목록에서도 코드를 찾을 수 있습니다.</p></noscript>
        <div id="lookup-result" aria-live="polite" aria-atomic="true" className="text-sm leading-relaxed text-gray-900">
          {result && brand && (
            <div className="mt-4 border-t border-gray-200 pt-4">
              {result.modelMatches.length > 0 ? (
                <>
                  <p className="font-semibold">이 모델에 해당하는 자료를 찾았습니다.</p>
                  <ul className="mt-2 divide-y divide-gray-200">
                    {result.modelMatches.map(({ entry, source }) => (
                      <li key={`${entry.href}-${source.model}-${source.href}`} className="py-2">
                        <p>{brand.label} {entry.category} · {entry.code} · {source.model}</p>
                        <Link href={source.href} className={linkClass}>모델별 점검 범위 보기</Link>
                        <p className="text-gray-700">
                          <a href={source.manualUrl} target="_blank" rel="noopener noreferrer" className="text-blue-700 underline underline-offset-4">{source.manualLabel}</a>
                          {' '}· 자료 확인 <time dateTime={source.checkedAt}>{source.checkedAt}</time>
                        </p>
                      </li>
                    ))}
                  </ul>
                </>
              ) : result.codeMatches.length > 0 ? (
                <>
                  <p className="font-semibold">{query.model.trim() ? '입력한 모델에 적용되는 조치 자료를 확인하지 못했습니다.' : '코드가 같은 안내를 찾았습니다. 점검 전에 적용 모델을 확인하세요.'}</p>
                  {query.model.trim() && <p className="mt-1 text-gray-700">아래 안내에서 적용 범위를 살펴보고, 일치하는 자료가 없으면 제조사에 모델명과 코드를 알려주세요.</p>}
                  <ul className="mt-2 divide-y divide-gray-200">
                    {result.codeMatches.map((entry) => (
                      <li key={entry.href}>
                        <Link href={entry.href} className={linkClass}>{brand.label} {entry.category} {entry.code} 안내</Link>
                        {entry.models.length > 0 && <p className="pb-2 text-gray-700">조치 자료를 확인한 모델 {entry.models.map((source) => source.model).join(' · ')}</p>}
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <p className="font-semibold">{query.code.trim() ? '선택한 브랜드에서 해당 코드의 공개 안내를 확인하지 못했습니다. 화면의 표시를 다시 확인하거나 제조사에 문의하세요.' : '화면에 뜬 코드를 입력하세요.'}</p>
              )}
              {result.modelMatches.length === 0 && query.code.trim() && brand.serviceUrl && (
                <a href={brand.serviceUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>{brand.label} 공식 서비스 안내</a>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
