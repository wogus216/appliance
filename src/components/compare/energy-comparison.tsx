'use client';

import { Suspense, useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { fridgeFitHref } from '@/lib/fridge-fit';
import { useRouter, useSearchParams } from 'next/navigation';
import { SITE_URL } from '@/lib/constants';
import {
  annualDeclaredEnergy, compareMonthlyEnergy, comparablePairs, comparablePartners, COMPARABLE_CAPACITY_GAP_PERCENT,
  energyComparisonHref, energyComparisonText, formatCapacity, formatEnergy, parseEnergySelection, type EnergyComparisonProduct,
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

function groupByCategory(products: EnergyComparisonProduct[]) {
  return [...new Set(products.map((product) => product.measurement.productCategory))]
    .map((category) => ({ category, products: products.filter((product) => product.measurement.productCategory === category) }));
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
  const groups = groupByCategory(products);
  const pairs = comparablePairs(products);
  // 민감도 분석: 20%로 넓혔을 때만 추가되는 쌍. 결론에는 쓰지 않고 설명에만 센다.
  const loosePairs = comparablePairs(products, 20).filter(([x, y]) => !pairs.some(([p, q]) => p === x && q === y));
  const looseCounts = groupByCategory(loosePairs.map(([x]) => x)).map((group) => `${group.category} ${loosePairs.filter(([x]) => x.measurement.productCategory === group.category).length}쌍`);
  const partners = a && result && result.kind !== 'compared' ? comparablePartners(a.modelNumber, products) : [];
  const isFridgePair = a?.measurement.productCategory === '냉장고';

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
      <h2 id="energy-heading" className="text-2xl font-bold text-gray-900">비슷한 가전 두 대, 전기사용량 차이는?</h2>
      <p className="mt-3 max-w-prose text-sm leading-relaxed text-gray-700">
        한국에너지공단의 월간 신고값을 같은 단위로 비교합니다. 원문을 대조한 {groups.map((group) => `${group.category} ${group.products.length}개`).join('·')} 모델을 고를 수 있고,
        아래 조건을 모두 만족하는 두 모델만 차이를 계산합니다. 결과는 신고값의 차이이며 우리 집의 실제 절감량이나 전기요금은 아닙니다.
      </p>

      <div className="mt-5 rounded-lg border border-gray-200 bg-gray-50 p-4 text-sm leading-relaxed text-gray-800">
        <h3 className="font-semibold text-gray-900">차이를 계산하는 조건</h3>
        <ol className="mt-2 list-decimal space-y-1 pl-5">
          <li>한국에너지공단 품목 구분이 같습니다(예: 전기냉방기끼리).</li>
          <li>공단 신고 항목명과 단위가 글자 그대로 같습니다.</li>
          <li>공단 신고 용량(에어컨은 정격냉방능력) 차이가 {COMPARABLE_CAPACITY_GAP_PERCENT}% 이내입니다. <strong>이 {COMPARABLE_CAPACITY_GAP_PERCENT}%는 공단 기준이 아니라 살림랩이 정한 기준입니다.</strong></li>
        </ol>
        <details className="mt-2">
          <summary className="min-h-11 cursor-pointer py-2 font-medium text-gray-900 focus-visible:outline-2 focus-visible:outline-blue-700">왜 {COMPARABLE_CAPACITY_GAP_PERCENT}%인가요?</summary>
          <p className="mt-1">에어컨의 냉방기간 월간소비전력량은 냉방능력의 영향을 크게 받습니다. 능력 차이가 큰 두 모델을 비교하면 효율 차이가 아니라 크기 차이를 비교하게 됩니다. 공단 운용규정의 냉방능력 구간표는 열람하지 못해, 살림랩이 &lsquo;정격 용량 차이 {COMPARABLE_CAPACITY_GAP_PERCENT}% 이내&rsquo;라는 대리 기준을 정했습니다.</p>
          <p className="mt-2">이 기준은 2026-10-29 신고값을 본 뒤에 정한 탐색적(exploratory) 규칙입니다.{looseCounts.length ? ` 20%로 넓히면 ${looseCounts.join('과 ')}이 더 비교 대상이 되지만, 화면의 결론에는 쓰지 않습니다.` : ''} 정수기는 공단이 용량 지표를 따로 정하지 않아 냉수저장탱크 용량을 대신 쓰며, 세 신고가 2018·2023·2026년으로 갈려 그사이 측정방법이 바뀌었는지는 확인하지 못했습니다.</p>
        </details>
        <p className="mt-2">
          지금 조건을 만족하는 조합: {groups.map((group) => {
            const count = pairs.filter(([x]) => x.measurement.productCategory === group.category).length;
            const names = pairs.filter(([x]) => x.measurement.productCategory === group.category).map(([x, y]) => `${x.modelNumber} ↔ ${y.modelNumber}`);
            return `${group.category} ${count ? (count === 1 ? names[0] : `${count}쌍`) : '없음'}`;
          }).join(', ')}.
        </p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {(['a', 'b'] as const).map((side, index) => (
          <div key={side} className="min-w-0">
            <label htmlFor={`energy-model-${side}`} className="block text-sm font-semibold text-gray-900">비교 모델 {index + 1}</label>
            <select id={`energy-model-${side}`} value={selection[side]} onChange={(event) => change(side, event.target.value)}
              className="mt-2 min-h-11 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-base text-gray-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700">
              <option value="">모델을 선택하세요</option>
              {groups.map((group) => <optgroup key={group.category} label={group.category}>
                {group.products.map((product) => <option key={product.modelNumber} value={product.modelNumber}>{product.brandLabel} {product.modelNumber}</option>)}
              </optgroup>)}
            </select>
          </div>
        ))}
      </div>

      <div className="mt-6" role="status">
        {!result ? <p className="text-sm leading-relaxed text-gray-800">비교할 두 모델을 목록에서 선택하세요. 목록에 없는 모델의 신고값은 이 도구에서 확인하지 못했습니다.</p>
          : result.kind !== 'compared' ? <div className="text-sm leading-relaxed text-gray-800">
            <p className="font-semibold text-gray-900">{result.kind === 'incompatible' ? '이 두 모델은 비교하지 않습니다.' : result.message}</p>
            {result.kind === 'incompatible' && <p className="mt-1">{result.message}</p>}
            {a && result.kind === 'incompatible' && (partners.length
              ? <>
                <p className="mt-2">이 목록에서 {a.modelNumber}의 비교 상대가 될 수 있는 모델:</p>
                <div className="mt-2 flex flex-wrap gap-2">{partners.map((partner) => <button key={partner.modelNumber} type="button" onClick={() => change('b', partner.modelNumber)} className="min-h-11 break-all rounded-lg border border-blue-300 bg-blue-50 px-3 py-2 text-left text-sm font-semibold text-blue-900 hover:bg-blue-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700">{partner.brandLabel} {partner.modelNumber}</button>)}</div>
              </>
              : <p className="mt-2">이 목록에는 {a.modelNumber}의 비교 조건을 만족하는 모델이 없습니다. 공단 신고값은 아래 원문에서 각각 확인하세요.</p>)}
            {a && b && result.kind === 'incompatible' && <ul className="mt-3 space-y-1">
              {[a, b].map((product) => <li key={product.modelNumber}><a href={product.measurement.sourceUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-700 underline underline-offset-4">{product.modelNumber} 공단 원문</a> <span className="text-gray-700">· {product.measurement.category} · {product.measurement.capacity.label} {formatCapacity(product.measurement.capacity)}</span></li>)}
            </ul>}
          </div>
            : <p className="text-lg font-semibold leading-relaxed text-gray-900">
              {result.lowerModel ? <>{result.lowerModel}의 신고값이 월 {formatEnergy(result.monthlyDifference)}kWh 낮습니다.</> : <>두 모델의 월간 신고값이 같습니다.</>}
              <span className="mt-1 block text-sm font-normal text-gray-700">월 차이를 12개월로 환산하면 {formatEnergy(result.annualDifference)}kWh입니다. 두 모델의 {a?.measurement.capacity.label} 차이는 {result.capacityGapPercent.toFixed(1)}%입니다.</span>
            </p>}
      </div>

      {a && b && result?.kind === 'compared' && (
        <>
          <div className="mt-5 space-y-4" aria-label="월간 신고값 비교, 막대는 0에서 시작합니다">
            {[a, b].map((product) => (
              <div key={product.modelNumber}>
                <div className="mb-1 flex flex-wrap justify-between gap-x-3 text-sm text-gray-800">
                  <span className="break-all">{product.brandLabel} {product.modelNumber}</span>
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
              <tr><th scope="row" className="p-3 font-medium">공단 신고 {a.measurement.capacity.label}<br /><span className="text-xs font-normal">{a.measurement.capacity.unit}</span></th>{[a, b].map((product) => <td key={product.modelNumber} className="p-3 tabular-nums">{product.measurement.capacity.value.toLocaleString('ko-KR')}</td>)}</tr>
            </tbody>
          </table>
          <p className="mt-2 break-words text-xs leading-relaxed text-gray-600">공단 품목 {a.measurement.category} · 신고 항목 ‘{a.measurement.itemName}’</p>

          <p className="mt-4 max-w-prose text-sm leading-relaxed text-gray-700">
            신고 시점과 시험기관이 다르고 개별 시험성적서의 세부 조건은 확인하지 못했습니다.
            이 숫자만으로 실제 집의 사용량이나 제품의 종합 우열을 정할 수 없습니다.
            {isFridgePair ? ' 용량과 수납 구성이 다르면 그 차이도 함께 고려하세요.' : ' 에어컨 값은 공단이 정한 냉방기간 조건의 신고값이며, 우리 집의 사용 시간·설정 온도에 따른 사용량이 아닙니다.'}
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
              {[a, b].map((product) => <li key={product.modelNumber} className="min-w-0">
                <a href={product.measurement.sourceUrl} target="_blank" rel="noopener noreferrer" className="break-all font-semibold text-blue-700 underline underline-offset-4">{product.modelNumber} 공단 원문</a>
                <p className="mt-2 break-words leading-relaxed text-gray-700">
                  신고 번호 {product.measurement.declarationId}{product.measurement.declarant && <><br />신고 업체 {product.measurement.declarant}</>}
                  {product.measurement.declaredUnits && <><br />실내기 {product.measurement.declaredUnits.indoor} · 실외기 {product.measurement.declaredUnits.outdoor}</>}
                  <br />완료일 {product.measurement.completedAt ?? '현재 원문에 표기 없음'}<br />시험기관 {product.measurement.testLab}<br />원문 확인 {product.measurement.checkedAt}
                </p>
              </li>)}
            </ul>
            {isFridgePair && <Link href="/blog/fridge-monthly-kwh-measurement" className="mt-4 inline-block text-sm font-semibold text-blue-700 underline underline-offset-4">공단 신고값과 제조사 표기가 다른 이유 읽기</Link>}
          </section>

          <section className="mt-8 border-t border-gray-200 pt-6" aria-labelledby="energy-fit-heading">
            <h3 id="energy-fit-heading" className="text-lg font-semibold text-gray-900">{isFridgePair ? '설치 공간과 수납도 함께 확인하세요' : '설치 조건도 함께 확인하세요'}</h3>
            <p className="mt-2 text-sm leading-relaxed text-gray-700">아래는 제품 상세에 정리한 제조사 사양입니다. 위 공단 신고값과 출처가 다릅니다.</p>
            <div className="mt-4 grid gap-6 sm:grid-cols-2">
              {[a, b].map((product) => <div key={product.modelNumber} className="min-w-0">
                <h4 className="break-all text-sm font-semibold text-gray-900">{product.brandLabel} {product.modelNumber}</h4>
                <dl className="mt-2 space-y-2 text-sm leading-relaxed text-gray-800">
                  <div><dt className="font-medium">제조사 표기 용량</dt><dd>{product.capacity}</dd></div>
                  <div><dt className="font-medium">본체 크기</dt><dd>{product.dimensions}</dd></div>
                </dl>
                <details className="mt-3 text-sm leading-relaxed text-gray-700"><summary className="cursor-pointer py-2 font-medium text-gray-900 focus-visible:outline-2 focus-visible:outline-blue-700">{isFridgePair ? '문 열림·설치 여유 조건' : '설치 조건'}</summary><p className="mt-2">{product.installationNote}</p></details>
                <Link href={`/products/${product.slug}#fit`} className="mt-2 inline-block text-sm text-blue-700 underline underline-offset-4">제품 상세의 설치 근거 확인</Link>
                {isFridgePair && <Link href={fridgeFitHref(product.modelNumber)} className="mt-3 block text-sm font-semibold text-blue-700 underline underline-offset-4">우리 집 치수로 설치 전 확인하기</Link>}
              </div>)}
            </div>
          </section>
        </>
      )}
    </section>
  );
}
