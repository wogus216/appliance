'use client';

import Link from 'next/link';
import { Suspense, useCallback, useEffect, useState, useSyncExternalStore } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  calculateCarePlan, carePlanHref, carePlanIcs, carePlanRecord, parseCareModel,
  type CarePlanInput, type CarePlanProduct,
} from '@/lib/care-plan';

const emptyInput: CarePlanInput = { purchaseDate: '', lastCareDate: '', chosenDate: '' };
const fieldClass = 'mt-2 min-h-11 w-full min-w-0 rounded-lg border border-gray-300 bg-white px-3 py-2 text-base text-gray-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 disabled:bg-gray-100 disabled:text-gray-500';
const linkClass = 'font-semibold text-blue-700 underline underline-offset-4 hover:text-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700';

function localToday(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
}

function subscribeToDayChange(onChange: () => void): () => void {
  const timer = window.setInterval(onChange, 60_000);
  return () => window.clearInterval(timer);
}
function serverToday(): string { return ''; }

function ModelQuerySync({ products, onSync }: { products: CarePlanProduct[]; onSync: (model: string) => void }) {
  const query = useSearchParams();
  const model = parseCareModel(query.get('model'), products);
  useEffect(() => { onSync(model); }, [model, onSync]);
  return null;
}

function downloadText(name: string, content: string, mime: string) {
  const url = URL.createObjectURL(new Blob([content], { type: mime }));
  const anchor = document.createElement('a');
  anchor.href = url; anchor.download = name; anchor.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function displayDate(value: string): string {
  const [year, month, day] = value.split('-');
  return `${year}년 ${Number(month)}월 ${Number(day)}일`;
}

export function CarePlanTool({ products }: { products: CarePlanProduct[] }) {
  const [model, setModel] = useState('');
  const [itemId, setItemId] = useState('');
  const [input, setInput] = useState<CarePlanInput>(emptyInput);
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'failed'>('idle');
  const today = useSyncExternalStore(subscribeToDayChange, localToday, serverToday);
  const product = products.find((entry) => entry.modelNumber === model);
  const item = product?.items.find((entry) => entry.id === itemId);
  const result = today ? calculateCarePlan(item, input, today) : { kind: 'empty' as const, message: '제품과 관리 항목을 선택하세요.' };
  const record = product && item && result.kind === 'ready' ? carePlanRecord(product, item, input, result) : '';
  const statusMessage = result.kind === 'ready' ? '' : result.message;

  const syncModel = useCallback((next: string) => {
    setModel(next); setItemId(''); setInput(emptyInput); setCopyState('idle');
  }, []);

  function chooseModel(next: string) {
    syncModel(next);
    window.history.replaceState(null, '', carePlanHref(next || undefined));
  }

  function updateInput(key: keyof CarePlanInput, value: string) {
    setInput((old) => ({ ...old, [key]: value }));
    setCopyState('idle');
  }

  async function copyRecord() {
    if (!record) return;
    try { await navigator.clipboard.writeText(record); setCopyState('copied'); }
    catch { setCopyState('failed'); }
  }

  function saveCalendar() {
    if (!product || !item || result.kind !== 'ready') return;
    const id = Array.from(crypto.getRandomValues(new Uint32Array(4)), (value) => value.toString(16).padStart(8, '0')).join('');
    const ics = carePlanIcs(product, item, input, result, id, new Date());
    downloadText(`salimlab-${product.slug}-${item.id}.ics`, ics, 'text/calendar;charset=utf-8');
  }

  const categoryNames = [...new Set(products.map((entry) => entry.category))];
  return <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:items-start print:block">
    <Suspense fallback={null}><ModelQuerySync products={products} onSync={syncModel} /></Suspense>
    <section aria-labelledby="care-input-heading" className="rounded-xl border border-gray-200 bg-white p-5 sm:p-6 print:hidden">
      <h2 id="care-input-heading" className="text-xl font-bold text-gray-900">어떤 제품을 언제 확인할까요?</h2>
      <p className="mt-2 max-w-prose text-sm leading-relaxed text-gray-700">정확한 모델과 항목을 고르세요. 마지막 관리일을 넣으면 확인된 주기를 계산합니다.</p>
      <div className="mt-6 space-y-6">
        <div>
          <label htmlFor="care-model" className="block text-sm font-semibold text-gray-900">제품 모델</label>
          <select id="care-model" value={model} onChange={(event) => chooseModel(event.target.value)} className={fieldClass}>
            <option value="">제품을 선택하세요</option>
            {categoryNames.map((category) => <optgroup key={category} label={category}>
              {products.filter((entry) => entry.category === category).map((entry) => <option key={entry.modelNumber} value={entry.modelNumber}>{entry.title} · {entry.modelNumber}</option>)}
            </optgroup>)}
          </select>
        </div>
        <div>
          <label htmlFor="care-item" className="block text-sm font-semibold text-gray-900">관리·확인 항목</label>
          <select id="care-item" value={itemId} onChange={(event) => { setItemId(event.target.value); setInput((old) => ({ ...old, lastCareDate: '', chosenDate: '' })); setCopyState('idle'); }} disabled={!product} className={fieldClass}>
            <option value="">항목을 선택하세요</option>
            {product?.items.map((entry) => <option key={entry.id} value={entry.id}>{entry.title}</option>)}
          </select>
        </div>
        {item && <div className="rounded-lg bg-gray-50 p-4 text-sm leading-relaxed text-gray-800">
          <p className="font-semibold text-gray-900">설명서 안내 · {item.timing}</p>
          <p className="mt-2">{item.description}</p>
          <p className="mt-2 text-gray-700">{item.interval ? item.interval.basis : '고정된 날짜 주기가 확인되지 않아 다음 확인일을 직접 정합니다.'}</p>
          <a href={item.sourceUrl} target="_blank" rel="noopener noreferrer" className={`${linkClass} mt-3 inline-block`}>공식 자료의 해당 항목 보기</a>
        </div>}
        {item && <>
          <div>
            <label htmlFor="care-purchase-date" className="block text-sm font-semibold text-gray-900">구입일 <span className="font-normal text-gray-600">(선택, 계산에는 사용하지 않음)</span></label>
            <input id="care-purchase-date" type="date" max={today || undefined} value={input.purchaseDate} onChange={(event) => updateInput('purchaseDate', event.target.value)} className={fieldClass} />
          </div>
          {item.interval ? <div>
            <label htmlFor="care-last-date" className="block text-sm font-semibold text-gray-900">마지막 관리일</label>
            <input id="care-last-date" type="date" max={today || undefined} value={input.lastCareDate} onChange={(event) => updateInput('lastCareDate', event.target.value)} className={fieldClass} />
            <p className="mt-2 text-sm leading-relaxed text-gray-700">마지막으로 이 항목을 실제 관리한 날을 적으세요. 구입일을 관리일로 대신하지 않습니다.</p>
          </div> : <div>
            <label htmlFor="care-chosen-date" className="block text-sm font-semibold text-gray-900">직접 정할 확인일</label>
            <input id="care-chosen-date" type="date" min={today || undefined} value={input.chosenDate} onChange={(event) => updateInput('chosenDate', event.target.value)} className={fieldClass} />
            <p className="mt-2 text-sm leading-relaxed text-gray-700">이 날짜는 내가 정한 점검일이며 제조사의 교체·청소 주기가 아닙니다.</p>
          </div>}
        </>}
      </div>
    </section>

    <section id="care-plan-result" aria-labelledby="care-result-heading" className="rounded-xl border border-gray-200 bg-gray-50 p-5 sm:p-6 print:border-0 print:bg-white print:p-0">
      <h2 id="care-result-heading" className="text-xl font-bold text-gray-900">다음 확인 일정</h2>
      {result.kind === 'ready' && product && item ? <div className="mt-5">
        <p className="text-sm font-semibold text-gray-700">{product.title} · {product.modelNumber}</p>
        <p className="mt-2 text-lg font-bold text-gray-900">{item.title}</p>
        <div role="status" aria-live="polite" aria-atomic="true">
          <p className="mt-5 text-sm font-semibold text-gray-700">{result.overdue ? '기준일이 지났습니다' : '확인 기준일'}</p>
          <p className="mt-1 text-2xl font-bold tabular-nums text-blue-800 sm:text-3xl"><time dateTime={result.dueDate}>{displayDate(result.dueDate)}</time></p>
        </div>
        {result.overdue && <p className="mt-2 text-sm leading-relaxed text-red-700">달력 파일에는 오늘 확인할 일정으로 담습니다. 관리했다면 마지막 관리일을 새로 입력하세요.</p>}
        <p className="mt-4 text-sm leading-relaxed text-gray-800">{result.basis}</p>
        <p className="mt-3 text-sm leading-relaxed text-gray-700">이 일정은 한 번만 저장됩니다. 사용 환경과 부품 상태, 설명서 전체 절차를 확인하세요.</p>
        <div className="mt-6 flex flex-wrap gap-3 print:hidden">
          <button type="button" onClick={saveCalendar} className="min-h-11 rounded-lg bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700">달력 파일 저장</button>
          <button type="button" onClick={() => window.print()} className="min-h-11 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700">인쇄하기</button>
          <button type="button" onClick={copyRecord} className="min-h-11 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700">일정 내용 복사</button>
        </div>
        <p role="status" className="mt-3 text-sm text-gray-700 print:hidden">{copyState === 'copied' ? '모델·날짜·근거를 복사했습니다.' : copyState === 'failed' ? '자동 복사에 실패했습니다. 아래 내용을 직접 복사하세요.' : '달력 파일은 .ics 형식이며 반복 알림을 만들지 않습니다.'}</p>
        {copyState === 'failed' && <textarea aria-label="직접 복사할 관리 일정" readOnly rows={8} value={record} className={`${fieldClass} print:hidden`} />}
        <div className="mt-7 border-t border-gray-200 pt-5 text-sm leading-relaxed text-gray-800">
          <p className="font-semibold text-gray-900">관리 방법과 근거</p>
          <p className="mt-2">{item.description}</p>
          <a href={item.sourceUrl} target="_blank" rel="noopener noreferrer" className={`${linkClass} mt-3 inline-block break-all`}>{item.sourceLabel}</a>
          <p className="mt-4 print:hidden"><Link href={`/products/${product.slug}#technology-map`} className={linkClass}>제품 기술·관리 지도에서 다시 확인하기</Link></p>
          <p className="mt-4 hidden break-all text-xs text-gray-600 print:block">제품 설명: https://salimlab.kr/products/{product.slug}#technology-map</p>
        </div>
      </div> : <p role="status" className={`mt-5 max-w-prose text-sm leading-relaxed ${result.kind === 'invalid' ? 'text-red-700' : 'text-gray-700'}`}>{statusMessage}</p>}
    </section>
  </div>;
}
