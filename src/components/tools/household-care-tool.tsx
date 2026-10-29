'use client';

import Link from 'next/link';
import { useEffect, useState, useSyncExternalStore } from 'react';
import { calculateCarePlan, type CarePlanProduct } from '@/lib/care-plan';
import { HOUSEHOLD_CARE_LIMIT, householdCareRecord, markHouseholdCareDone, readHouseholdCare, resolveHouseholdCare, type HouseholdCareEntry } from '@/lib/household-care';
import { ValueBadge } from '@/components/tools/value-badge';

const KEY = 'salimlab-household-care-v1';
const field = 'mt-2 min-h-11 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-base text-gray-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700';
function localToday() { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; }
function serverToday() { return ''; }
function subscribeToDayChange(onChange: () => void) { const timer = window.setInterval(onChange, 60_000); return () => window.clearInterval(timer); }
// randomUUID는 https·localhost에서만 있다. 같은 와이파이의 http 주소로 열어도 추가가 막히지 않게 한다.
function newId() { return typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : `id-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`; }

export function HouseholdCareTool({ products }: { products: CarePlanProduct[] }) {
  const [entries, setEntries] = useState<HouseholdCareEntry[]>(() => {
    if (typeof window === 'undefined') return [];
    try { return readHouseholdCare(window.localStorage.getItem(KEY), products); }
    catch { return []; }
  });
  const today = useSyncExternalStore(subscribeToDayChange, localToday, serverToday);
  const [model, setModel] = useState('');
  const [itemId, setItemId] = useState('');
  const [date, setDate] = useState('');
  const [message, setMessage] = useState('');
  const [listMessage, setListMessage] = useState('');
  const [copyFailed, setCopyFailed] = useState(false);
  // 다른 탭에서 바꾼 목록을 덮어쓰지 않도록 저장소 변경을 따라간다.
  useEffect(() => {
    function onStorage(event: StorageEvent) {
      if (event.key !== KEY) return;
      setEntries(readHouseholdCare(event.newValue, products));
      setListMessage('다른 창에서 바뀐 목록을 불러왔습니다.');
    }
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, [products]);
  function save(next: HouseholdCareEntry[]) {
    setEntries(next); setCopyFailed(false);
    try { window.localStorage.setItem(KEY, JSON.stringify(next)); return true; }
    catch { setListMessage('브라우저에 저장하지 못했습니다. 목록을 복사해 보관하세요.'); return false; }
  }

  const product = products.find((candidate) => candidate.modelNumber === model);
  const item = product?.items.find((candidate) => candidate.id === itemId);
  const rows = today ? resolveHouseholdCare(entries, products, today) : [];
  const record = householdCareRecord(rows, today || undefined);
  function add() {
    if (!product || !item || !today) { setMessage('제품과 관리 항목을 선택하세요.'); return; }
    const result = calculateCarePlan(item, { purchaseDate: '', lastCareDate: item.interval ? date : '', chosenDate: item.interval ? '' : date }, today);
    if (result.kind !== 'ready') { setMessage(result.message); return; }
    if (entries.some((entry) => entry.modelNumber === model && entry.itemId === itemId)) { setMessage('이 모델의 같은 관리 항목이 이미 목록에 있습니다. 관리했다면 목록에서 ‘오늘 관리함’을 누르고, 날짜를 바꾸려면 삭제한 뒤 다시 추가하세요.'); return; }
    if (entries.length >= HOUSEHOLD_CARE_LIMIT) { setMessage(`이 브라우저에는 최대 ${HOUSEHOLD_CARE_LIMIT}개 항목까지 저장할 수 있습니다.`); return; }
    const persisted = save([...entries, { id: newId(), modelNumber: model, itemId, lastCareDate: item.interval ? date : '', chosenDate: item.interval ? '' : date }]);
    setDate(''); if (persisted) { setMessage('관리 항목을 집 전체 목록에 추가했습니다.'); setListMessage(''); }
  }
  function markDone(id: string, title: string) {
    if (!today) return;
    if (save(markHouseholdCareDone(entries, id, products, today))) setListMessage(`${title}의 마지막 관리일을 오늘(${today})로 바꿔 다음 확인일을 다시 계산했습니다.`);
  }
  function remove(id: string, title: string) {
    if (save(entries.filter((entry) => entry.id !== id))) setListMessage(`${title} 항목을 목록에서 삭제했습니다.`);
  }
  async function copy() {
    try { await navigator.clipboard.writeText(record); setCopyFailed(false); setListMessage('관리 항목과 출처를 복사했습니다.'); }
    catch { setCopyFailed(true); setListMessage('자동 복사에 실패했습니다. 아래 기록을 직접 복사하세요.'); }
  }
  return <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start print:block">
    <section aria-labelledby="household-add-heading" className="rounded-xl border border-gray-200 bg-white p-5 sm:p-6 print:hidden">
      <h2 id="household-add-heading" className="text-xl font-bold">관리 항목 추가</h2>
      <p className="mt-2 text-sm leading-relaxed text-gray-700">모델과 관리 항목을 하나씩 고릅니다. 이 목록은 지금 사용하는 브라우저에만 저장됩니다.</p>
      <label htmlFor="household-model" className="mt-5 block text-sm font-semibold">제품 모델</label>
      <select id="household-model" value={model} onChange={(e) => { setModel(e.target.value); setItemId(''); setDate(''); setMessage(''); }} className={field}><option value="">제품 선택</option>{products.map((entry) => <option key={entry.modelNumber} value={entry.modelNumber}>{entry.title} · {entry.modelNumber}</option>)}</select>
      <label htmlFor="household-item" className="mt-5 block text-sm font-semibold">관리 항목</label>
      <select id="household-item" value={itemId} onChange={(e) => { setItemId(e.target.value); setDate(''); setMessage(''); }} disabled={!product} className={field}><option value="">항목 선택</option>{product?.items.map((entry) => <option key={entry.id} value={entry.id}>{entry.title}</option>)}</select>
      {item && <><p className="mt-4 rounded-lg bg-gray-50 p-3 text-sm leading-relaxed text-gray-800">{item.timing}<br />{item.interval ? <>{item.interval.basis} <ValueBadge kind="official" /></> : <>설명서에서 고정 날짜 주기를 확인하지 못했습니다. 확인일을 직접 정하세요. <ValueBadge kind="unverified" /></>}</p><label htmlFor="household-date" className="mt-5 block text-sm font-semibold">{item.interval ? '마지막으로 관리한 날짜' : '직접 정할 확인일'}</label><input id="household-date" type="date" value={date} max={item.interval ? today || undefined : undefined} min={item.interval ? undefined : today || undefined} onChange={(e) => { setDate(e.target.value); setMessage(''); }} className={field} /><p className="mt-2 text-xs text-gray-600">{item.interval ? '구입일을 관리일로 대신하지 마세요.' : '이 날짜는 내가 정한 날짜이며 제조사 교체 주기가 아닙니다.'}</p></>}
      <button type="button" onClick={add} className="mt-6 min-h-11 rounded-lg bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800">목록에 추가</button>
      <p role="status" className="mt-3 text-sm text-gray-700">{message}</p>
    </section>
    <section aria-labelledby="household-list-heading" className="rounded-xl border border-gray-200 bg-gray-50 p-5 sm:p-6 print:border-0 print:bg-white print:p-0">
      <h2 id="household-list-heading" className="text-xl font-bold">우리 집 관리 목록 <span className="text-sm font-normal text-gray-600">{rows.length}개 항목</span></h2>
      <p className="mt-2 text-sm leading-relaxed text-gray-700">설명서 주기가 있는 항목은 마지막 관리일로 계산합니다(계산값). 그 외 날짜는 내가 정한 확인일입니다(사용자 입력). 날짜가 지나도 자동으로 다음 일정으로 넘기지 않습니다. 관리를 마치면 ‘오늘 관리함’을 눌러 기록하세요.</p>
      {rows.length ? <><ol className="mt-5 space-y-4">{rows.map((row) => <li key={row.id} className="rounded-lg border border-gray-200 bg-white p-4"><div className="flex items-start justify-between gap-3"><div><p className={`font-bold ${row.overdue ? 'text-red-800' : 'text-blue-800'}`}><time dateTime={row.dueDate}>{row.dueDate}</time>{row.overdue ? ' · 기준일 지남' : ''} <ValueBadge kind={row.item.interval ? 'calculated' : 'entered'} /></p><p className="mt-1 text-sm font-semibold">{row.product.title} · {row.product.modelNumber}</p><p className="mt-1 text-sm">{row.item.title}</p>{row.item.interval && <p className="mt-1 text-xs text-gray-600">마지막 관리일 {row.lastCareDate}</p>}</div><div className="flex shrink-0 flex-col gap-2 print:hidden">{row.item.interval && <button type="button" onClick={() => markDone(row.id, row.item.title)} className="min-h-11 rounded-lg border border-blue-300 bg-blue-50 px-3 text-xs font-semibold text-blue-900">오늘 관리함</button>}<button type="button" onClick={() => remove(row.id, row.item.title)} className="min-h-11 rounded-lg border border-gray-300 px-3 text-xs">삭제</button></div></div><p className="mt-2 text-xs leading-relaxed text-gray-600">{row.basis}</p><a href={row.item.sourceUrl} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-xs font-semibold text-blue-700 underline underline-offset-4">공식 관리 안내 보기</a></li>)}</ol><div className="mt-6 flex flex-wrap gap-3 print:hidden"><button type="button" onClick={copy} className="min-h-11 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold">목록 복사</button><button type="button" onClick={() => window.print()} className="min-h-11 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold">인쇄하기</button></div></> : <p className="mt-5 text-sm text-gray-700">아직 등록한 관리 항목이 없습니다. 첫 제품을 선택해 추가하세요.</p>}
      <p role="status" className="mt-3 text-sm text-gray-800 print:hidden">{listMessage}</p>
      {copyFailed && <textarea readOnly aria-label="직접 복사할 관리표" rows={12} value={record} className={`${field} print:hidden`} />}
      <p className="mt-5 text-xs leading-relaxed text-gray-600 print:hidden">브라우저 데이터를 삭제하거나 다른 기기에서 열면 목록은 보이지 않습니다. 계정 동기화와 알림은 제공하지 않습니다.</p>
      <p className="mt-3 print:hidden"><Link href="/tools/care-plan" className="text-sm font-semibold text-blue-700 underline underline-offset-4">제품 한 항목의 달력 일정 만들기</Link></p>
    </section>
  </div>;
}
