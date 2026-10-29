'use client';

import { Suspense, useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { fridgeFitHref } from '@/lib/fridge-fit';
import { useRouter, useSearchParams } from 'next/navigation';
import { SITE_URL } from '@/lib/constants';
import {
  annualDeclaredEnergy, compareMonthlyEnergy, energyComparisonHref, energyComparisonText,
  formatEnergy, parseEnergySelection, type EnergyComparisonProduct,
} from '@/lib/energy-comparison';

type Selection = { a: string; b: string };

// URL을 읽는 부분만 분리해 정적 HTML에도 기본 비교와 공식 출처가 남게 한다.
function EnergyQuerySync({ products, onSync }: { products: EnergyComparisonProduct[]; onSync: (selection: Selection) => void }) {
  const params = useSearchParams();
  useEffect(() => {
    onSync(parseEnergySelection(params.get('energyA'), params.get('energyB'), products));
  }, [params, products, onSync]);
  return null;
}

export function EnergyComparison({ products }: { products: EnergyComparisonProduct[] }) {
  const router = useRouter();
  const [selection, setSelection] = useState(() => parseEnergySelection(null, null, products));
  const [copyState, setCopyState] = useState<'idle' | 'copying' | 'copied' | 'failed'>('idle');
  const sync = useCallback((next: Selection) => {
    setSelection((previous) => previous.a === next.a && previous.b === next.b ? previous : next);
    setCopyState('idle');
  }, []);
  const a = products.find((product) => product.modelNumber === selection.a);
  const b = products.find((product) => product.modelNumber === selection.b);
  const result = a && b ? compareMonthlyEnergy(a.measurement, b.measurement) : null;
  const comparisonText = a && b ? energyComparisonText(a, b) : null;
  const record = comparisonText ? `${comparisonText}\n\n비교 주소: ${SITE_URL}${energyComparisonHref(a?.modelNumber, b?.modelNumber)}` : '';

  function change(side: keyof Selection, value: string) {
    const next = { ...selection, [side]: value };
    setSelection(next);
    setCopyState('idle');
    const url = new URL(window.location.href);
    url.searchParams.set('energyA', next.a);
    url.searchParams.set('energyB', next.b);
    url.hash = 'energy-compare';
    router.replace(`${url.pathname}${url.search}${url.hash}`, { scroll: false });
  }

  async function copy() {
    setCopyState('copying');
    try {
      await navigator.clipboard.writeText(record);
      setCopyState('copied');
    } catch {
      setCopyState('failed');
    }
  }

  if (products.length < 2) return null;
  return (
    <section id="energy-compare" aria-labelledby="energy-heading" className="scroll-mt-24 rounded-xl border border-gray-300 bg-white p-5 sm:p-7">
      <Suspense fallback={null}><EnergyQuerySync products={products} onSync={sync} /></Suspense>
      <h2 id="energy-heading" className="text-2xl font-bold text-gray-900">냉장고 두 대, 전기사용량 차이는?</h2>
      <p className="mt-3 max-w-prose text-sm leading-relaxed text-gray-700">
        한국에너지공단의 월간 신고값을 같은 단위로 비교합니다. 지금은 원문을 대조한 냉장고 {products.length}개 모델을 선택할 수 있습니다.
        결과는 신고값의 차이이며 우리 집의 실제 절감량이나 전기요금은 아닙니다.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {(['a', 'b'] as const).map((side, index) => (
          <div key={side}>
            <label htmlFor={`energy-model-${side}`} className="block text-sm font-semibold text-gray-900">비교 모델 {index + 1}</label>
            <select id={`energy-model-${side}`} value={selection[side]} onChange={(event) => change(side, event.target.value)}
              className="mt-2 min-h-11 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-base text-gray-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700">
              <option value="">모델을 선택하세요</option>
              {products.map((product) => <option key={product.modelNumber} value={product.modelNumber}>{product.brandLabel} {product.modelNumber}</option>)}
            </select>
          </div>
        ))}
      </div>

      <div className="mt-6" role="status">
        {!result ? <p className="text-sm leading-relaxed text-gray-800">비교할 두 모델을 목록에서 선택하세요. 목록에 없는 모델의 신고값은 이 도구에서 확인하지 못했습니다.</p>
          : result.kind !== 'compared' ? <p className="text-sm leading-relaxed text-gray-800">{result.message}</p>
            : <p className="text-lg font-semibold leading-relaxed text-gray-900">
              {result.lowerModel ? <>{result.lowerModel}의 신고값이 월 {formatEnergy(result.monthlyDifference)}kWh 낮습니다.</> : <>두 모델의 월간 신고값이 같습니다.</>}
              <span className="mt-1 block text-sm font-normal text-gray-700">월 차이를 12개월로 환산하면 {formatEnergy(result.annualDifference)}kWh입니다.</span>
            </p>}
      </div>

      {a && b && result?.kind === 'compared' && (
        <>
          <div className="mt-5 space-y-4" aria-label="월간 신고값 비교, 막대는 0에서 시작합니다">
            {[a, b].map((product) => (
              <div key={product.modelNumber}>
                <div className="mb-1 flex flex-wrap justify-between gap-x-3 text-sm text-gray-800">
                  <span>{product.brandLabel} {product.modelNumber}</span>
                  <span className="font-semibold tabular-nums">{formatEnergy(product.measurement.value)}kWh/월</span>
                </div>
                <div aria-hidden="true" className="h-3 overflow-hidden rounded-sm bg-gray-100">
                  <div className="h-full bg-blue-700" style={{ width: `${product.measurement.value / Math.max(a.measurement.value, b.measurement.value) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>

          <table className="mt-6 w-full table-fixed text-left text-sm text-gray-800">
            <caption className="pb-2 text-left font-semibold text-gray-900">공단 신고값과 연간 환산</caption>
            <thead className="border-y border-gray-200 bg-gray-50">
              <tr><th scope="col" className="w-[38%] p-3">항목</th>{[a, b].map((product) => <th scope="col" key={product.modelNumber} className="break-all p-3 font-mono text-xs">{product.modelNumber}</th>)}</tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr><th scope="row" className="p-3 font-medium">월간 신고값<br /><span className="text-xs font-normal">kWh/월</span></th>{[a, b].map((product) => <td key={product.modelNumber} className="p-3 tabular-nums">{formatEnergy(product.measurement.value)}</td>)}</tr>
              <tr><th scope="row" className="p-3 font-medium">연간 환산<br /><span className="text-xs font-normal">월간값 × 12, kWh/년</span></th>{[a, b].map((product) => <td key={product.modelNumber} className="p-3 tabular-nums">{formatEnergy(annualDeclaredEnergy(product.measurement.value))}</td>)}</tr>
              <tr><th scope="row" className="p-3 font-medium">공단 신고 용량<br /><span className="text-xs font-normal">L</span></th>{[a, b].map((product) => <td key={product.modelNumber} className="p-3 tabular-nums">{product.measurement.declaredCapacityLitres}</td>)}</tr>
            </tbody>
          </table>

          <p className="mt-4 max-w-prose text-sm leading-relaxed text-gray-700">
            신고 시점과 시험기관이 다르고 개별 시험성적서의 세부 조건은 확인하지 못했습니다.
            이 숫자만으로 실제 집의 사용량이나 제품의 종합 우열을 정할 수 없습니다.
            용량과 수납 구성이 다르면 그 차이도 함께 고려하세요.
          </p>

          <div className="mt-5">
            <button type="button" onClick={copy} disabled={copyState === 'copying'}
              className="min-h-11 rounded-lg bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 disabled:cursor-wait disabled:opacity-60">
              {copyState === 'copying' ? '복사 중…' : '비교 결과와 출처 복사'}
            </button>
            <p role="status" className="mt-2 text-sm text-gray-700">
              {copyState === 'copied' ? '비교 결과·출처·비교 주소를 복사했습니다.' : copyState === 'failed' ? '자동 복사에 실패했습니다. 아래 기록을 선택해 직접 복사하세요.' : '선택한 모델은 주소에도 반영돼 같은 비교를 다시 열 수 있습니다.'}
            </p>
            {copyState === 'failed' && <textarea aria-label="직접 복사할 전기량 비교 기록" readOnly value={record} rows={8} className="mt-3 w-full rounded-lg border border-gray-300 p-3 text-sm leading-relaxed text-gray-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700" />}
          </div>

          <section className="mt-8 border-t border-gray-200 pt-6" aria-labelledby="energy-sources-heading">
            <h3 id="energy-sources-heading" className="text-lg font-semibold text-gray-900">어느 자료의 숫자인가요?</h3>
            <ul className="mt-4 grid gap-5 text-sm sm:grid-cols-2">
              {[a, b].map((product) => <li key={product.modelNumber}>
                <a href={product.measurement.sourceUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-700 underline underline-offset-4">{product.modelNumber} 공단 원문</a>
                <p className="mt-2 leading-relaxed text-gray-700">신고 번호 {product.measurement.declarationId}<br />완료일 {product.measurement.completedAt ?? '현재 원문에 표기 없음'}<br />시험기관 {product.measurement.testLab}<br />원문 확인 {product.measurement.checkedAt}</p>
              </li>)}
            </ul>
            <Link href="/blog/fridge-monthly-kwh-measurement" className="mt-4 inline-block text-sm font-semibold text-blue-700 underline underline-offset-4">공단 신고값과 제조사 표기가 다른 이유 읽기</Link>
          </section>

          <section className="mt-8 border-t border-gray-200 pt-6" aria-labelledby="energy-fit-heading">
            <h3 id="energy-fit-heading" className="text-lg font-semibold text-gray-900">설치 공간과 수납도 함께 확인하세요</h3>
            <p className="mt-2 text-sm leading-relaxed text-gray-700">아래는 제품 상세에 정리한 제조사 사양입니다. 위 공단 신고 용량과 출처가 다릅니다.</p>
            <div className="mt-4 grid gap-6 sm:grid-cols-2">
              {[a, b].map((product) => <div key={product.modelNumber}>
                <h4 className="text-sm font-semibold text-gray-900">{product.brandLabel} {product.modelNumber}</h4>
                <dl className="mt-2 space-y-2 text-sm leading-relaxed text-gray-800">
                  <div><dt className="font-medium">제조사 표기 용량</dt><dd>{product.capacity}</dd></div>
                  <div><dt className="font-medium">본체 크기</dt><dd>{product.dimensions}</dd></div>
                </dl>
                <details className="mt-3 text-sm leading-relaxed text-gray-700"><summary className="cursor-pointer py-2 font-medium text-gray-900 focus-visible:outline-2 focus-visible:outline-blue-700">문 열림·설치 여유 조건</summary><p className="mt-2">{product.installationNote}</p></details>
                <Link href={`/products/${product.slug}#fit`} className="mt-2 inline-block text-sm text-blue-700 underline underline-offset-4">제품 상세의 설치 근거 확인</Link>
                <Link href={fridgeFitHref(product.modelNumber)} className="mt-3 block text-sm font-semibold text-blue-700 underline underline-offset-4">우리 집 치수로 설치 전 확인하기</Link>
              </div>)}
            </div>
          </section>
        </>
      )}
    </section>
  );
}
