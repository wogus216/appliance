'use client';

import { Suspense, useCallback, useEffect, useState, useSyncExternalStore } from 'react';
import { useSearchParams } from 'next/navigation';
import { calculateRepairReplace, differenceLabel, parseRepairItem, repairReplaceHref, repairReplaceRecord, type RepairMoneyField, type RepairReplaceInput } from '@/lib/repair-replace';
import { EMPTY_STANDARD_INPUT, resolveStandard, standardRecordLines, type StandardInput } from '@/lib/consumer-standards';
import { STANDARD_ITEMS, type StandardItemId } from '@/lib/data/consumer-standards';
import { localDateLabel } from '@/lib/value-kind';
import { ConsumerStandardInfo, WarrantyBasisFields } from '@/components/tools/consumer-standard-info';
import { ValueBadge } from '@/components/tools/value-badge';

function localToday() { return localDateLabel(); }
function serverToday() { return ''; }
function subscribeToDayChange(onChange: () => void) { const timer = window.setInterval(onChange, 60_000); return () => window.clearInterval(timer); }

/** 가전 수첩이 넘긴 고시 품목(?item=)만 읽는다. 날짜·금액은 주소로 받지 않는다. */
function ItemQuerySync({ onSync }: { onSync: (item: StandardItemId | '') => void }) {
  const item = parseRepairItem(useSearchParams().get('item'));
  useEffect(() => { if (item) onSync(item); }, [item, onSync]);
  return null;
}

const initial: RepairReplaceInput = { model: '', repairQuote: '', replacementPrice: '', replacementExtra: '', repairTotalConfirmed: false, replacementTotalConfirmed: false, warranty: 'unknown', diagnosisConfirmed: false };
const field = 'mt-2 min-h-11 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-base text-gray-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 aria-[invalid=true]:border-red-600';
const money = (value: number) => `${value.toLocaleString('ko-KR')}원`;

function MoneyInput({ id, name, label, required, hint, placeholder, value, error, onChange }: { id: string; name: RepairMoneyField; label: string; required?: boolean; hint?: string; placeholder: string; value: string; error?: string; onChange: (key: RepairMoneyField, value: string) => void }) {
  const described = [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(' ') || undefined;
  return <div>
    <label htmlFor={id} className="block text-sm font-semibold">{label} {required ? <span className="text-red-700">*</span> : <span className="font-normal text-gray-600">(확인한 설치·철거·배송비만)</span>}</label>
    <input id={id} type="text" inputMode="numeric" autoComplete="off" value={value} onChange={(e) => onChange(name, e.target.value)} placeholder={placeholder} aria-invalid={!!error} aria-describedby={described} className={field} />
    {hint && <p id={`${id}-hint`} className="mt-1 text-xs text-gray-600">{hint}</p>}
    {error && <p id={`${id}-error`} className="mt-1 text-sm text-red-700">{error}</p>}
  </div>;
}

export function RepairReplaceTool() {
  const [input, setInput] = useState(initial);
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'failed'>('idle');
  const [standard, setStandard] = useState<StandardInput>(EMPTY_STANDARD_INPUT);
  const today = useSyncExternalStore(subscribeToDayChange, localToday, serverToday);
  const result = calculateRepairReplace(input);
  const errors = result.kind === 'invalid' ? result.fields : {};
  const resolution = resolveStandard(standard, today || undefined);
  const record = result.kind === 'ready' ? repairReplaceRecord(input, result, localDateLabel(), resolution ? standardRecordLines(resolution, standard) : []) : '';
  function update<K extends keyof RepairReplaceInput>(key: K, value: RepairReplaceInput[K]) {
    setInput((old) => ({ ...old, [key]: value })); setCopyState('idle');
  }
  const syncItem = useCallback((itemId: StandardItemId | '') => setStandard((old) => ({ ...old, itemId })), []);
  function updateStandard(patch: Partial<StandardInput>) {
    setStandard((old) => ({ ...old, ...patch })); setCopyState('idle');
    if ('itemId' in patch) window.history.replaceState(null, '', repairReplaceHref(patch.itemId || undefined));
  }
  async function copy() {
    try { await navigator.clipboard.writeText(record); setCopyState('copied'); }
    catch { setCopyState('failed'); }
  }

  return <div className="mt-8 grid gap-8 lg:grid-cols-2 lg:items-start print:block">
    <Suspense fallback={null}><ItemQuerySync onSync={syncItem} /></Suspense>
    <section aria-labelledby="repair-input-heading" className="rounded-xl border border-gray-200 bg-white p-5 sm:p-6 print:hidden">
      <h2 id="repair-input-heading" className="text-xl font-bold text-gray-900">받은 견적을 적어 보세요</h2>
      <p className="mt-2 text-sm leading-relaxed text-gray-700">견적서와 판매 페이지의 금액을 원 단위로 옮겨 적습니다. 150000 또는 150,000처럼 입력하세요. 입력 내용은 서버나 주소에 저장하지 않습니다.</p>
      <div className="mt-6 space-y-5">
        <div><label htmlFor="repair-model" className="block text-sm font-semibold">제품 모델명 <span className="font-normal text-gray-600">(선택)</span></label><input id="repair-model" value={input.model} maxLength={80} onChange={(e) => update('model', e.target.value)} placeholder="예: 사용 중인 제품의 정확한 모델번호" className={field} /></div>
        <MoneyInput id="repair-quote" name="repairQuote" label="받은 수리 견적" required hint="무상 수리로 확인됐다면 0을 입력할 수 있습니다." placeholder="원" value={input.repairQuote} error={errors.repairQuote} onChange={update} />
        <label className="flex items-start gap-3 text-sm leading-relaxed text-gray-800"><input type="checkbox" checked={input.repairTotalConfirmed} onChange={(e) => update('repairTotalConfirmed', e.target.checked)} className="mt-1 size-4" /><span>견적에 부품·출장·공임·세금이 모두 포함된 것을 확인했습니다.</span></label>
        <MoneyInput id="replacement-price" name="replacementPrice" label="같은 조건의 새 제품 가격" required placeholder="원" value={input.replacementPrice} error={errors.replacementPrice} onChange={update} />
        <MoneyInput id="replacement-extra" name="replacementExtra" label="새 제품 추가 비용" placeholder="모르면 비워 두세요" value={input.replacementExtra} error={errors.replacementExtra} onChange={update} />
        <label className="flex items-start gap-3 text-sm leading-relaxed text-gray-800"><input type="checkbox" checked={input.replacementTotalConfirmed} onChange={(e) => update('replacementTotalConfirmed', e.target.checked)} className="mt-1 size-4" /><span>새 제품의 설치·철거·배송·세금까지 최종 비용을 확인했습니다.</span></label>
        <div><label htmlFor="repair-warranty" className="block text-sm font-semibold">현재 제품의 무상 보증</label><select id="repair-warranty" value={input.warranty} onChange={(e) => update('warranty', e.target.value as RepairReplaceInput['warranty'])} className={field}><option value="unknown">아직 확인하지 않음</option><option value="covered">적용 확인</option><option value="not-covered">미적용 확인</option></select></div>
        <label className="flex items-start gap-3 text-sm leading-relaxed text-gray-800"><input type="checkbox" checked={input.diagnosisConfirmed} onChange={(e) => update('diagnosisConfirmed', e.target.checked)} className="mt-1 size-4" /><span>고장 원인과 수리할 부품을 공식 진단 또는 견적서에서 확인했습니다.</span></label>
      </div>
      <div className="mt-8 space-y-5 border-t border-gray-200 pt-6">
        <h3 className="text-base font-bold text-gray-900">품목과 날짜 <span className="text-sm font-normal text-gray-600">(선택 · 공정위 기준 기간 보기)</span></h3>
        <div><label htmlFor="repair-item" className="block text-sm font-semibold">고시 품목</label><select id="repair-item" value={standard.itemId} onChange={(e) => updateStandard({ itemId: e.target.value as StandardItemId | '' })} className={field}><option value="">선택하지 않음</option>{STANDARD_ITEMS.map((item) => <option key={item.id} value={item.id}>{item.label}{item.row ? '' : ' (고시 표에 없음)'}</option>)}</select><p className="mt-1 text-xs text-gray-600">에어컨은 보증서·설명서를 보고 냉방 전용과 냉난방 겸용 중에서 고르세요.</p></div>
        {standard.itemId && <WarrantyBasisFields idPrefix="repair-standard" value={standard} today={today} onChange={updateStandard} />}
      </div>
    </section>

    <section aria-labelledby="repair-result-heading" className="rounded-xl border border-gray-200 bg-gray-50 p-5 sm:p-6 print:border-0 print:bg-white print:p-0">
      <h2 id="repair-result-heading" className="text-xl font-bold text-gray-900">수리·교체 판단 카드</h2>
      {result.kind === 'ready' ? <div className="mt-5 space-y-5 text-sm leading-relaxed text-gray-800">
        <p className="font-semibold text-gray-900">{input.model.trim() || '모델 미입력'}</p>
        <dl className="grid gap-3 sm:grid-cols-2"><div className="rounded-lg border bg-white p-4"><dt className="text-gray-600">받은 수리 견적 <ValueBadge kind="entered" /></dt><dd className="mt-1 text-xl font-bold tabular-nums">{money(result.repairWon)}</dd><p className="mt-1 text-xs">{input.repairTotalConfirmed ? '포함 항목 확인' : '포함 항목 미확인'}</p></div><div className="rounded-lg border bg-white p-4"><dt className="text-gray-600">새 제품 가격 + 입력한 추가비 <ValueBadge kind="entered" /></dt><dd className="mt-1 text-xl font-bold tabular-nums">{money(result.replacementWon)}</dd><p className="mt-1 text-xs">{input.replacementTotalConfirmed ? '최종 비용 확인' : '추가 비용 미확인'}</p></div></dl>
        <div role="status" aria-live="polite" className="border-t border-gray-200 pt-4"><p className="font-semibold">입력 금액의 차이: {money(Math.abs(result.differenceWon))} <ValueBadge kind="calculated" /></p><p>{result.differenceWon === 0 ? '입력 금액이 같습니다.' : result.differenceWon > 0 ? '입력 금액은 새 제품 쪽이 더 큽니다.' : '입력 금액은 수리 쪽이 더 큽니다.'}</p><p className="mt-2 text-gray-700">{result.comparable ? '두 금액의 포함 항목을 확인했다고 입력했습니다. 제품 상태와 수리 후 보증까지 확인한 뒤 판단하세요.' : '포함 항목을 확인하지 않은 금액이 있어 현재 차이는 부분 비교입니다. 아래 질문을 먼저 확인하세요.'}</p></div>
        <div className="border-t border-gray-200 pt-4"><h3 className="font-bold text-gray-900">다음에 확인할 질문</h3><ul className="mt-2 list-disc space-y-2 pl-5">{result.questions.map((question) => <li key={question}>{question}</li>)}</ul></div>
        <p className="text-xs text-gray-600">금액과 확인 상태는 사용자가 입력했고, 차이는 그 금액의 산술 계산입니다({differenceLabel(result.differenceWon)}). 남은 수명, 재고장 확률, 전기요금과 환경 영향은 추정하지 않았습니다. 이 표는 수리 또는 교체를 자동 추천하지 않습니다.</p>
        <div className="flex flex-wrap gap-3 print:hidden"><button type="button" onClick={copy} className="min-h-11 rounded-lg bg-blue-700 px-4 py-2 font-semibold text-white hover:bg-blue-800">기록 복사</button><button type="button" onClick={() => window.print()} className="min-h-11 rounded-lg border border-gray-300 bg-white px-4 py-2 font-semibold">인쇄하기</button></div>
        <p role="status" className="print:hidden">{copyState === 'copied' ? '입력 금액과 확인 질문을 복사했습니다.' : copyState === 'failed' ? '자동 복사에 실패했습니다. 아래 내용을 직접 복사하세요.' : ''}</p>
        {copyState === 'failed' && <textarea readOnly aria-label="직접 복사할 기록" rows={12} value={record} className={`${field} print:hidden`} />}
      </div> : <p role="status" className={`mt-5 text-sm ${result.kind === 'invalid' ? 'text-red-700' : 'text-gray-700'}`}>{result.message}</p>}
      {resolution && <ConsumerStandardInfo resolution={resolution} input={standard} />}
    </section>
  </div>;
}
