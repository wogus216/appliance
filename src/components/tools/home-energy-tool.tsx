'use client';

import Link from 'next/link';
import { useMemo, useState, useSyncExternalStore } from 'react';
import { ENERGY_MEASUREMENTS } from '@/lib/data/energy-measurements';
import { KEPCO_RESIDENTIAL_LOW } from '@/lib/data/kepco-tariff';
import { estimateBillDifference, formatWon, localMonthLabel, usageMonthLabel, type BillDifferenceInput, type ResidentialBill } from '@/lib/electricity-bill';
import {
  calculateHomeEnergy, createHomeEnergyRecord, homeEnergyExportJson, homeEnergyRecordText, readHomeEnergyRecords,
  HOME_ENERGY_STORAGE_KEY, MAX_HOME_ENERGY_RECORDS, type HomeEnergyInput,
} from '@/lib/home-energy-record';
import { localDateLabel } from '@/lib/value-kind';
import { ValueBadge } from '@/components/tools/value-badge';
import { useToolResultEvent } from '@/components/tools/use-tool-result-event';

const field = 'mt-2 min-h-11 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-base text-gray-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 aria-[invalid=true]:border-red-600';
const measurements = Object.values(ENERGY_MEASUREMENTS);
const groups = [...new Set(measurements.map((entry) => entry.productCategory))].map((category) => ({ category, entries: measurements.filter((entry) => entry.productCategory === category) }));
const tariff = KEPCO_RESIDENTIAL_LOW;

// 저장 기록은 이 브라우저의 localStorage에만 둔다. 같은 창의 저장도 다른 탭의 변경도 같은 구독으로 다시 읽는다.
const CHANGE_EVENT = 'salimlab-home-energy-records-change';
function subscribe(onChange: () => void) {
  window.addEventListener('storage', onChange);
  window.addEventListener(CHANGE_EVENT, onChange);
  return () => { window.removeEventListener('storage', onChange); window.removeEventListener(CHANGE_EVENT, onChange); };
}
function readStoredRaw() { try { return window.localStorage.getItem(HOME_ENERGY_STORAGE_KEY); } catch { return null; } }
function serverRaw() { return null; }
// randomUUID는 https·localhost에서만 있다. 같은 와이파이의 http 주소로 열어도 저장이 막히지 않게 한다.
function newId() { return typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : `id-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`; }

type BillAmountKey = Exclude<keyof ResidentialBill, 'kwh' | 'month' | 'season'>;
const BILL_ROWS: { key: BillAmountKey; label: string }[] = [
  { key: 'basicCharge', label: '기본요금' },
  { key: 'energyCharge', label: '전력량요금' },
  { key: 'climateEnvironment', label: '기후환경요금' },
  { key: 'fuelAdjustment', label: '연료비조정요금' },
  { key: 'subtotal', label: '전기요금계' },
  { key: 'vat', label: '부가가치세' },
  { key: 'fund', label: '전력산업기반기금' },
  { key: 'total', label: '청구요금 합계' },
];

export function HomeEnergyTool() {
  const [input, setInput] = useState<HomeEnergyInput>({ kwh: '', days: '' });
  const [device, setDevice] = useState('');
  const [model, setModel] = useState('');
  const [billInput, setBillInput] = useState<BillDifferenceInput>(() => ({ householdKwh: '', usageMonth: localMonthLabel() }));
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'failed'>('idle');
  const [saveMessage, setSaveMessage] = useState('');
  const [listMessage, setListMessage] = useState('');
  const [exportFallback, setExportFallback] = useState('');
  const storedRaw = useSyncExternalStore(subscribe, readStoredRaw, serverRaw);
  const records = useMemo(() => readHomeEnergyRecords(storedRaw), [storedRaw]);

  const result = calculateHomeEnergy(input);
  const errors = result.kind === 'invalid' ? result.fields : {};
  useToolResultEvent('home-energy', result.kind === 'ready');
  const declared = measurements.find((entry) => entry.modelNumber === model);
  const bill = result.kind === 'ready' ? estimateBillDifference(billInput, result.normalizedKwh) : null;
  const billErrors = bill?.kind === 'invalid' ? bill.fields : {};
  const readyBill = bill?.kind === 'ready' ? bill : undefined;
  const record = result.kind === 'ready' ? homeEnergyRecordText(result, { device, model: model || undefined, declared: declared?.value, itemName: declared?.itemName, sourceUrl: declared?.sourceUrl, checkedAt: declared?.checkedAt, recordedAt: localDateLabel(), bill: readyBill }) : '';

  function touched() { setCopyState('idle'); setSaveMessage(''); }
  function update(key: keyof HomeEnergyInput, value: string) { setInput((old) => ({ ...old, [key]: value })); touched(); }
  function updateBill(key: keyof BillDifferenceInput, value: string) { setBillInput((old) => ({ ...old, [key]: value })); touched(); }
  async function copy() {
    try { await navigator.clipboard.writeText(record); setCopyState('copied'); }
    catch { setCopyState('failed'); }
  }
  function persist(next: typeof records): boolean {
    try {
      window.localStorage.setItem(HOME_ENERGY_STORAGE_KEY, JSON.stringify(next));
      window.dispatchEvent(new Event(CHANGE_EVENT));
      return true;
    } catch { return false; }
  }
  function save() {
    if (result.kind !== 'ready') return;
    if (records.length >= MAX_HOME_ENERGY_RECORDS) { setSaveMessage(`이 브라우저에는 기록을 ${MAX_HOME_ENERGY_RECORDS}개까지 저장할 수 있습니다. 기록을 내보낸 뒤 오래된 것을 삭제하세요.`); return; }
    const entry = createHomeEnergyRecord(newId(), result, { device, recordedAt: localDateLabel(), declared, bill: readyBill });
    setSaveMessage(persist([entry, ...records])
      ? '이 기록을 브라우저에 저장했습니다. 아래 ‘저장한 전력 기록’에서 확인하세요.'
      : '브라우저에 저장하지 못했습니다. 저장이 차단된 설정이거나 저장 공간이 부족할 수 있습니다. 기록 복사나 인쇄로 보관하세요.');
  }
  function remove(id: string, label: string) {
    setExportFallback('');
    setListMessage(persist(records.filter((entry) => entry.id !== id)) ? `${label} 기록을 삭제했습니다.` : '브라우저 저장소를 바꾸지 못해 기록을 삭제하지 못했습니다.');
  }
  function exportRecords() {
    const json = homeEnergyExportJson(records, localDateLabel());
    try {
      const url = URL.createObjectURL(new Blob([json], { type: 'application/json' }));
      const link = document.createElement('a');
      link.href = url;
      link.download = `salimlab-home-energy-${localDateLabel()}.json`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 1000);
      setExportFallback('');
      setListMessage(`저장한 기록 ${records.length}개를 JSON 파일로 내보냈습니다.`);
    } catch {
      setExportFallback(json);
      setListMessage('파일로 내보내지 못했습니다. 아래 JSON을 직접 복사해 보관하세요.');
    }
  }

  return <>
    <div className="mt-8 grid gap-8 lg:grid-cols-2 lg:items-start print:block">
      <section aria-labelledby="home-energy-input-heading" className="rounded-xl border border-gray-200 bg-white p-5 sm:p-6 print:hidden">
        <h2 id="home-energy-input-heading" className="text-xl font-bold text-gray-900">실제로 측정한 값을 적어 보세요</h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-700">해당 기기만 측정한 누적 사용량을 넣으세요. 집 전체 전기 고지서의 사용량을 기기 한 대의 값으로 입력하면 비교할 수 없습니다.</p>
        <div className="mt-6 space-y-5">
          <div><label htmlFor="measured-device" className="block text-sm font-semibold">측정한 기기 <span className="font-normal text-gray-600">(선택)</span></label><input id="measured-device" value={device} maxLength={40} onChange={(e) => { setDevice(e.target.value); touched(); }} placeholder="예: 주방 냉장고" className={field} /><p className="mt-1 text-xs text-gray-600">복사·저장한 기록에서 어느 기기를 쟀는지 구별하는 이름입니다.</p></div>
          <div><label htmlFor="measured-kwh" className="block text-sm font-semibold">측정 기간 누적 사용량 (kWh)</label><input id="measured-kwh" type="text" inputMode="decimal" autoComplete="off" value={input.kwh} onChange={(e) => update('kwh', e.target.value)} placeholder="예: 12.4" aria-invalid={!!errors.kwh} aria-describedby={`measured-kwh-hint${errors.kwh ? ' measured-kwh-error' : ''}`} className={field} /><p id="measured-kwh-hint" className="mt-1 text-xs text-gray-600">정격 소비전력 W가 아닌 계량기의 누적 kWh를 입력하세요. 소수점은 마침표(.)로 씁니다.</p>{errors.kwh && <p id="measured-kwh-error" className="mt-1 text-sm text-red-700">{errors.kwh}</p>}</div>
          <div><label htmlFor="measured-days" className="block text-sm font-semibold">측정 일수</label><input id="measured-days" type="text" inputMode="numeric" autoComplete="off" value={input.days} onChange={(e) => update('days', e.target.value)} placeholder="예: 7" aria-invalid={!!errors.days} aria-describedby={errors.days ? 'measured-days-error' : undefined} className={field} />{errors.days && <p id="measured-days-error" className="mt-1 text-sm text-red-700">{errors.days}</p>}</div>
          <div>
            <label htmlFor="energy-model" className="block text-sm font-semibold">공식 신고값과 나란히 보기 <span className="font-normal text-gray-600">(월간 kWh 신고가 있는 모델만, 선택)</span></label>
            <select id="energy-model" value={model} onChange={(e) => { setModel(e.target.value); touched(); }} aria-describedby="energy-model-hint" className={field}>
              <option value="">모델을 선택하지 않음</option>
              {groups.map((group) => <optgroup key={group.category} label={`${group.category} ${group.entries.length}개`}>{group.entries.map((entry) => <option key={entry.modelNumber} value={entry.modelNumber}>{entry.modelNumber}</option>)}</optgroup>)}
            </select>
            <p id="energy-model-hint" className="mt-1 text-xs text-gray-600">모델번호가 정확히 일치할 때만 선택하세요. 제습기·공기청정기 신고에는 월간 kWh 항목이 없어 목록에 없습니다.</p>
          </div>
        </div>
        <div className="mt-6 rounded-lg bg-amber-50 p-4 text-sm leading-relaxed text-amber-950">계량 장치가 기기와 콘센트의 정격·접지 조건에 맞는지 공식 설명서를 먼저 확인하세요. 측정할 수 없는 환경이라면 임의로 플러그를 연결하지 마세요.</div>
      </section>

      <section aria-labelledby="home-energy-result-heading" className="min-w-0 rounded-xl border border-gray-200 bg-gray-50 p-5 sm:p-6 print:border-0 print:bg-white print:p-0">
        <h2 id="home-energy-result-heading" className="text-xl font-bold text-gray-900">우리 집 전력 기록 카드</h2>
        {result.kind === 'ready' ? <div className="mt-5 space-y-5 text-sm leading-relaxed text-gray-800">
          {device.trim() && <p className="font-semibold text-gray-900">{device.trim()}</p>}
          <p><ValueBadge kind="measured" /> <strong>{result.days}일 동안 {result.measuredKwh.toLocaleString('ko-KR', { maximumFractionDigits: 3 })}kWh</strong></p>
          <div role="status" aria-live="polite" className="rounded-lg border border-blue-200 bg-white p-5"><p className="font-semibold text-gray-700">30일 환산 사용량 <ValueBadge kind="calculated" /></p><p className="mt-1 text-3xl font-bold tabular-nums text-blue-800">{result.normalizedKwh.toFixed(2)}<span className="ml-1 text-base">kWh</span></p><p className="mt-2 text-xs text-gray-600">{result.measuredKwh}kWh × 30 ÷ {result.days}일. 측정 기간의 사용 패턴이 30일 이어진다는 산술값입니다.</p></div>
          {declared && <div className="rounded-lg border bg-white p-4"><p className="font-semibold text-gray-900">공단 월간 신고값 · <span className="break-all">{declared.modelNumber}</span> <ValueBadge kind="official-test" /></p><p className="mt-1 text-lg font-bold tabular-nums">{declared.value.toFixed(2)}kWh/월</p><p className="mt-2 break-words text-xs text-gray-600">신고 항목 ‘{declared.itemName}’ · 한국에너지공단 {declared.checkedAt} 확인. 공식 시험 조건과 집의 측정 환경은 다릅니다.</p><a href={declared.sourceUrl} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block font-semibold text-blue-700 underline underline-offset-4">공단 신고 자료 보기</a></div>}

          <section aria-labelledby="home-energy-bill-heading" className="rounded-lg border border-gray-200 bg-white p-4">
            <h3 id="home-energy-bill-heading" className="font-bold text-gray-900">전기요금은 얼마나 달라질까?</h3>
            <p className="mt-2">고지서의 가구 월 사용량에 이 기기의 30일 환산값을 더하기 전과 후의 {tariff.name} 요금을 계산합니다. 고지서 사용량에 이 기기 사용분이 이미 들어 있다면 같은 양을 두 번 더한 결과가 됩니다.</p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div><label htmlFor="bill-household-kwh" className="block text-sm font-semibold">고지서의 가구 월 사용량 (kWh)</label><input id="bill-household-kwh" type="text" inputMode="numeric" autoComplete="off" value={billInput.householdKwh} onChange={(e) => updateBill('householdKwh', e.target.value)} placeholder="예: 350" aria-invalid={!!billErrors.householdKwh} aria-describedby={billErrors.householdKwh ? 'bill-household-kwh-error' : undefined} className={field} />{billErrors.householdKwh && <p id="bill-household-kwh-error" className="mt-1 text-sm text-red-700">{billErrors.householdKwh}</p>}</div>
              <div><label htmlFor="bill-month" className="block text-sm font-semibold">사용 월</label><input id="bill-month" type="month" value={billInput.usageMonth} onChange={(e) => updateBill('usageMonth', e.target.value)} placeholder="2026-10" aria-invalid={!!billErrors.usageMonth} aria-describedby={`bill-month-hint${billErrors.usageMonth ? ' bill-month-error' : ''}`} className={field} /><p id="bill-month-hint" className="mt-1 text-xs text-gray-600">7~8월은 하계, 나머지는 기타계절 요금입니다. 예: 2026-10</p>{billErrors.usageMonth && <p id="bill-month-error" className="mt-1 text-sm text-red-700">{billErrors.usageMonth}</p>}</div>
            </div>
            <div role="status" aria-live="polite" className="mt-4">
              {bill?.kind === 'ready' ? <>
                <dl className="grid gap-3 sm:grid-cols-3">
                  <div className="rounded-lg bg-gray-50 p-3"><dt className="text-xs text-gray-700">더하기 전 · {bill.before.kwh.toLocaleString('ko-KR')}kWh <ValueBadge kind="entered" /></dt><dd className="mt-1 text-lg font-bold tabular-nums">{formatWon(bill.before.total)}</dd></div>
                  <div className="rounded-lg bg-gray-50 p-3"><dt className="text-xs text-gray-700">더한 후 · {bill.after.kwh.toLocaleString('ko-KR')}kWh</dt><dd className="mt-1 text-lg font-bold tabular-nums">{formatWon(bill.after.total)}</dd></div>
                  <div className="rounded-lg border border-violet-200 bg-violet-50 p-3"><dt className="text-xs text-gray-700">요금 차이 <ValueBadge kind="calculated" /></dt><dd className="mt-1 text-lg font-bold tabular-nums text-violet-900">{bill.difference > 0 ? '+' : ''}{formatWon(bill.difference)}</dd></div>
                </dl>
                <p className="mt-3">기기 사용분은 30일 환산값 {bill.deviceKwhRaw.toFixed(2)}kWh를 반올림한 {bill.deviceKwh}kWh로 더했습니다. 요금표 구간이 정수 kWh로 나뉘어 있기 때문입니다. {usageMonthLabel(bill.usageMonth)} 1일~말일 사용분으로 계산했으며, 검침 기간이 두 달에 걸치면 실제 고지서와 다를 수 있습니다.</p>
                <p className="mt-2">{bill.beforeBlock === bill.afterBlock
                  ? <>더하기 전후 모두 전력량요금 {bill.beforeBlock} 구간입니다.</>
                  : <>사용량이 {bill.beforeBlock} 구간에서 {bill.afterBlock} 구간으로 넘어가 늘어난 kWh에 더 높은 단가가 붙습니다.</>}{' '}누진 구간과 기본요금 때문에 같은 {bill.deviceKwh}kWh를 더해도 가구 사용량에 따라 요금 차이가 달라집니다.</p>
                <details className="mt-3">
                  <summary className="min-h-11 cursor-pointer py-2 font-semibold text-gray-900 focus-visible:outline-2 focus-visible:outline-blue-700">항목별 계산 보기</summary>
                  <table className="mt-2 w-full table-fixed text-left text-sm tabular-nums">
                    <caption className="sr-only">더하기 전후 항목별 요금</caption>
                    <thead className="border-y border-gray-200 bg-gray-50"><tr><th scope="col" className="w-[40%] p-2">항목</th><th scope="col" className="p-2">더하기 전</th><th scope="col" className="p-2">더한 후</th></tr></thead>
                    <tbody className="divide-y divide-gray-200">{BILL_ROWS.map((row) => <tr key={row.key}><th scope="row" className="p-2 font-medium">{row.label}</th><td className="p-2">{formatWon(bill.before[row.key])}</td><td className="p-2">{formatWon(bill.after[row.key])}</td></tr>)}</tbody>
                  </table>
                </details>
              </> : bill && <p className={bill.kind === 'invalid' ? 'text-red-700' : bill.kind === 'outdated' || bill.kind === 'unsupported' ? 'font-semibold text-amber-900' : 'text-gray-700'}>{bill.message}</p>}
            </div>
            <p className="mt-3 text-xs leading-relaxed text-gray-600">요금표 {tariff.name}·일반 가구, {tariff.checkedAt} 확인. 연료비조정단가는 {tariff.fuelAdjustment.label}({tariff.fuelAdjustment.from}~{tariff.fuelAdjustment.to} 사용분) {tariff.fuelAdjustment.wonPerKwh.toFixed(1)}원/kWh입니다. 복지할인 가구의 감액은 금액을 확인하지 못해 지원하지 않습니다. TV수신료와 자동이체 할인은 넣지 않았습니다. 공단 신고값으로는 요금을 계산하지 않습니다. <a href="#home-energy-bill-guide" className="font-semibold text-blue-700 underline underline-offset-4 print:hidden">계산식 보기</a></p>
          </section>

          <div className="border-t border-gray-200 pt-4"><h3 className="font-bold text-gray-900">이 숫자로 알 수 있는 것</h3><p className="mt-2">입력한 기간을 30일로 환산한 값입니다. 계절·설정 온도·사용 횟수·실내 조건이 바뀌면 달라집니다. 공식 월간값과 나란히 볼 수 있지만 시험 조건이 달라 차이만으로 제품 상태나 절감량을 판정할 수 없습니다.</p></div>
          <p className="print:hidden"><Link href="/blog/fridge-monthly-kwh-measurement" className="font-semibold text-blue-700 underline underline-offset-4">냉장고 라벨과 집의 실제 사용량이 다른 이유 읽기</Link></p>
          <div className="flex flex-wrap gap-3 print:hidden"><button type="button" onClick={save} className="min-h-11 rounded-lg bg-blue-700 px-4 py-2 font-semibold text-white hover:bg-blue-800">이 기록 저장</button><button type="button" onClick={copy} className="min-h-11 rounded-lg border border-gray-300 bg-white px-4 py-2 font-semibold">기록 복사</button><button type="button" onClick={() => window.print()} className="min-h-11 rounded-lg border border-gray-300 bg-white px-4 py-2 font-semibold">인쇄하기</button></div>
          <p role="status" className="print:hidden">{saveMessage || (copyState === 'copied' ? '측정값과 계산 근거를 복사했습니다.' : copyState === 'failed' ? '자동 복사에 실패했습니다. 아래 내용을 직접 복사하세요.' : '')}</p>
          {copyState === 'failed' && <textarea readOnly aria-label="직접 복사할 전력 기록" rows={10} value={record} className={`${field} print:hidden`} />}
        </div> : <p role="status" className={`mt-5 text-sm ${result.kind === 'invalid' ? 'text-red-700' : 'text-gray-700'}`}>{result.message}</p>}
      </section>
    </div>

    <section aria-labelledby="home-energy-saved-heading" className="mt-8 rounded-xl border border-gray-200 bg-white p-5 sm:p-6 print:hidden">
      <h2 id="home-energy-saved-heading" className="text-xl font-bold text-gray-900">저장한 전력 기록 <span className="text-sm font-normal text-gray-600">{records.length}개</span></h2>
      <p className="mt-2 max-w-prose text-sm leading-relaxed text-gray-700">여러 기기의 측정을 이 브라우저에 모아 둘 수 있습니다. 서버로 보내지 않으며, 브라우저 데이터를 지우거나 다른 기기에서 열면 보이지 않습니다. 오래 보관하려면 JSON 파일로 내보내세요.</p>
      {records.length ? <>
        <ol className="mt-5 grid gap-4 md:grid-cols-2">
          {records.map((entry) => {
            const label = `${entry.device || '이름 없는 기기'} · ${entry.recordedAt}`;
            return <li key={entry.id} className="min-w-0 rounded-lg border border-gray-200 p-4 text-sm leading-relaxed text-gray-800">
              <div className="flex items-start justify-between gap-3">
                <p className="min-w-0 break-words font-semibold text-gray-900">{label}</p>
                <button type="button" onClick={() => remove(entry.id, label)} aria-label={`${label} 기록 삭제`} className="min-h-11 shrink-0 rounded-lg border border-gray-300 px-3 text-xs">삭제</button>
              </div>
              <dl className="mt-2 space-y-2">
                <div><dt className="text-xs text-gray-600">측정 <ValueBadge kind={entry.measuredKwh.kind} /></dt><dd className="tabular-nums">{entry.days.value}일 동안 {entry.measuredKwh.value.toLocaleString('ko-KR', { maximumFractionDigits: 3 })}kWh</dd></div>
                <div><dt className="text-xs text-gray-600">30일 환산 <ValueBadge kind={entry.normalizedKwh.kind} /></dt><dd className="tabular-nums">{entry.normalizedKwh.value.toFixed(2)}kWh</dd></div>
                {entry.declared && <div><dt className="text-xs text-gray-600">공단 월간 신고값 · <span className="break-all">{entry.declared.modelNumber}</span> <ValueBadge kind={entry.declared.kind} /></dt><dd className="tabular-nums">{entry.declared.value.toFixed(2)}kWh/월</dd></div>}
                {entry.bill && <div><dt className="text-xs text-gray-600">{usageMonthLabel(entry.bill.usageMonth)} 요금 차이 <ValueBadge kind={entry.bill.differenceWon.kind} /></dt><dd className="tabular-nums">{entry.bill.differenceWon.value > 0 ? '+' : ''}{formatWon(entry.bill.differenceWon.value)} <span className="text-xs text-gray-600">(가구 {entry.bill.householdKwh.value.toLocaleString('ko-KR')}kWh <ValueBadge kind={entry.bill.householdKwh.kind} /> 기준, 요금표 {entry.bill.tariffCheckedAt} 확인)</span></dd></div>}
              </dl>
            </li>;
          })}
        </ol>
        <button type="button" onClick={exportRecords} className="mt-5 min-h-11 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold">JSON으로 내보내기</button>
      </> : <p className="mt-5 text-sm text-gray-700">아직 저장한 기록이 없습니다. 측정값을 넣고 ‘이 기록 저장’을 누르세요.</p>}
      <p role="status" className="mt-3 text-sm text-gray-800">{listMessage}</p>
      {exportFallback && <textarea readOnly aria-label="직접 복사할 기록 JSON" rows={12} value={exportFallback} className={field} />}
    </section>
  </>;
}
