'use client';

import Link from 'next/link';
import { useCallback, useEffect, useState, useSyncExternalStore, type ChangeEvent } from 'react';
import { CARE_HANDOFF_KEY, parseCareHandoff, type CareHandoff } from '@/lib/care-handoff';
import { calculateCarePlan, type CarePlanProduct } from '@/lib/care-plan';
import { HOUSEHOLD_CARE_LIMIT, householdCareRecord, markHouseholdCareDone, resolveHouseholdCare, type HouseholdCareEntry } from '@/lib/household-care';
import {
  LEGACY_CARE_KEY, PREVIOUS_NOTEBOOK_KEY, NOTEBOOK_FILE_MAX_BYTES, NOTEBOOK_KEY, emptyNotebook, exportNotebookText, importNotebookText, notebookRecord, readNotebook, serializeNotebook,
  type HouseholdNotebook, type NotebookProduct,
} from '@/lib/appliance-notebook';
import { ApplianceNotebook } from '@/components/tools/appliance-notebook';
import { ValueBadge } from '@/components/tools/value-badge';
import { useToolResultEvent } from '@/components/tools/use-tool-result-event';

const field = 'mt-2 min-h-11 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-base text-gray-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700';
function localToday() { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; }
function serverToday() { return ''; }
function subscribeToDayChange(onChange: () => void) { const timer = window.setInterval(onChange, 60_000); return () => window.clearInterval(timer); }
// randomUUID는 https·localhost에서만 있다. 같은 와이파이의 http 주소로 열어도 추가가 막히지 않게 한다.
function newId() { return typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : `id-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`; }

function readStored(products: CarePlanProduct[]): HouseholdNotebook {
  if (typeof window === 'undefined') return readNotebook(null, null, products);
  try { return readNotebook(window.localStorage.getItem(NOTEBOOK_KEY), window.localStorage.getItem(LEGACY_CARE_KEY), products, window.localStorage.getItem(PREVIOUS_NOTEBOOK_KEY)); }
  catch { return readNotebook(null, null, products); }
}
async function fileText(file: File): Promise<string> {
  if (typeof file.text === 'function') return file.text();
  return new Promise((resolve, reject) => { const reader = new FileReader(); reader.onload = () => resolve(String(reader.result)); reader.onerror = () => reject(reader.error); reader.readAsText(file); });
}

function CareHandoffSync({ products, today, onSync }: { products: CarePlanProduct[]; today: string; onSync: (draft: CareHandoff | undefined) => void }) {
  useEffect(() => {
    if (!today) return;
    try {
      const raw = window.sessionStorage.getItem(CARE_HANDOFF_KEY);
      if (!raw) return;
      window.sessionStorage.removeItem(CARE_HANDOFF_KEY);
      onSync(parseCareHandoff(raw, products, today));
    } catch { /* 임시 저장이 막혀도 기존 수첩은 그대로 연다. */ }
  }, [products, today, onSync]);
  return null;
}

export function HouseholdCareTool({ products }: { products: CarePlanProduct[] }) {
  const [storedNotebook, setNotebook] = useState<HouseholdNotebook>(() => readStored(products));
  const today = useSyncExternalStore(subscribeToDayChange, localToday, serverToday);
  // 서버와 첫 클라이언트 렌더는 빈 수첩으로 맞춘 뒤 저장된 내용을 표시한다.
  const notebook = today ? storedNotebook : emptyNotebook();
  const entries = notebook.care;
  const [model, setModel] = useState('');
  const [itemId, setItemId] = useState('');
  const [date, setDate] = useState('');
  const [message, setMessage] = useState('');
  const [listMessage, setListMessage] = useState('');
  const [undoChange, setUndoChange] = useState<{ care: HouseholdCareEntry[]; label: string } | null>(null);
  const [editing, setEditing] = useState<{ id: string; date: string; error: string } | null>(null);
  const [copyFailed, setCopyFailed] = useState(false);
  const [pendingImport, setPendingImport] = useState<{ notebook: HouseholdNotebook; dropped: number; name: string } | null>(null);
  const [fileMessage, setFileMessage] = useState('');
  const receiveHandoff = useCallback((draft: CareHandoff | undefined) => {
    if (!draft) { setMessage('전달된 일정이 오래되었거나 유효하지 않습니다. 제품과 날짜를 다시 선택하세요.'); return; }
    setModel(draft.modelNumber); setItemId(draft.itemId); setDate(draft.date);
    setMessage(entries.some((entry) => entry.modelNumber === draft.modelNumber && entry.itemId === draft.itemId)
      ? '이미 목록에 있는 항목입니다. 오른쪽 목록의 ‘날짜 수정’에서 변경하세요.'
      : '일정표에서 제품·항목·날짜를 가져왔습니다. 내용을 확인한 뒤 ‘목록에 추가’를 누르세요.');
  }, [entries]);
  // 다른 탭에서 바꾼 목록을 덮어쓰지 않도록 저장소 변경을 따라간다.
  useEffect(() => {
    function onStorage(event: StorageEvent) {
      if (event.storageArea && event.storageArea !== window.localStorage) return;
      if (event.key !== NOTEBOOK_KEY && event.key !== null) return;
      setNotebook(readNotebook(event.newValue, null, products));
      setUndoChange(null); setEditing(null);
      setListMessage('다른 창에서 바뀐 목록을 불러왔습니다.');
    }
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, [products]);
  function saveNotebook(next: HouseholdNotebook) {
    if (new TextEncoder().encode(exportNotebookText(next, today)).length > NOTEBOOK_FILE_MAX_BYTES) {
      setListMessage('수첩의 파일 보관 한도 2MB를 넘습니다. 기존 기록을 파일로 보관한 뒤 오래된 기록을 정리하거나 내용을 줄이세요.');
      return false;
    }
    setNotebook(next); setCopyFailed(false);
    try { window.localStorage.setItem(NOTEBOOK_KEY, serializeNotebook(next)); return true; }
    catch { setListMessage('브라우저에 저장하지 못했습니다. 목록을 복사하거나 파일로 내보내 보관하세요.'); return false; }
  }
  function save(care: HouseholdCareEntry[]) {
    setUndoChange(null); setEditing(null);
    return saveNotebook({ ...notebook, care });
  }
  function saveCareChange(care: HouseholdCareEntry[], label: string) {
    const saved = save(care);
    // 저장 실패 시에도 화면 변경을 되돌릴 수 있도록 이전 관리 목록을 남긴다.
    setUndoChange({ care: entries, label });
    return saved;
  }
  function undo() {
    if (!undoChange) return;
    // 제품 구입일·수리 기록은 현재 값을 유지하고 관리 목록만 되돌린다.
    if (save(undoChange.care)) setListMessage(`${undoChange.label}을 취소했습니다.`);
  }
  function saveProducts(next: NotebookProduct[], message: string) {
    const saved = saveNotebook({ ...notebook, products: next });
    if (!saved) setNotebook(notebook);
    if (saved && message) setListMessage(message);
    return saved;
  }

  const product = products.find((candidate) => candidate.modelNumber === model);
  const item = product?.items.find((candidate) => candidate.id === itemId);
  const rows = today ? resolveHouseholdCare(entries, products, today) : [];
  const productRecord = notebookRecord(notebook, products, today || undefined);
  const record = [householdCareRecord(rows, today || undefined), productRecord].filter(Boolean).join('\n\n');
  const hasRecords = rows.length > 0 || notebook.products.length > 0;
  useToolResultEvent('household-care', hasRecords);
  function add() {
    if (!product || !item || !today) { setMessage('제품과 관리 항목을 선택하세요.'); return; }
    const result = calculateCarePlan(item, { purchaseDate: '', lastCareDate: item.interval ? date : '', chosenDate: item.interval ? '' : date }, today);
    if (result.kind !== 'ready') { setMessage(result.message); return; }
    if (entries.some((entry) => entry.modelNumber === model && entry.itemId === itemId)) { setMessage('이 모델의 같은 관리 항목이 이미 목록에 있습니다. 관리했다면 ‘오늘 관리함’을, 날짜만 바꾸려면 ‘날짜 수정’을 누르세요.'); return; }
    if (entries.length >= HOUSEHOLD_CARE_LIMIT) { setMessage(`이 브라우저에는 최대 ${HOUSEHOLD_CARE_LIMIT}개 항목까지 저장할 수 있습니다.`); return; }
    const persisted = save([...entries, { id: newId(), modelNumber: model, itemId, lastCareDate: item.interval ? date : '', chosenDate: item.interval ? '' : date }]);
    setDate(''); if (persisted) { setMessage('관리 항목을 집 전체 목록에 추가했습니다.'); setListMessage(''); }
  }
  function markDone(id: string, title: string) {
    if (!today) return;
    if (entries.find((entry) => entry.id === id)?.lastCareDate === today) { setListMessage(`${title}의 마지막 관리일이 이미 오늘입니다.`); return; }
    if (saveCareChange(markHouseholdCareDone(entries, id, products, today), `${title} 관리일 변경`)) setListMessage(`${title}의 마지막 관리일을 오늘(${today})로 바꿔 다음 확인일을 다시 계산했습니다.`);
  }
  function remove(id: string, title: string) {
    if (saveCareChange(entries.filter((entry) => entry.id !== id), `${title} 삭제`)) setListMessage(`${title} 항목을 목록에서 삭제했습니다.`);
  }
  function saveDate() {
    if (!editing || !today) return;
    const row = rows.find((entry) => entry.id === editing.id);
    if (!row) return;
    const result = calculateCarePlan(row.item, { purchaseDate: '', lastCareDate: row.item.interval ? editing.date : '', chosenDate: row.item.interval ? '' : editing.date }, today);
    if (result.kind !== 'ready') { setEditing({ ...editing, error: result.message }); return; }
    const care = entries.map((entry) => entry.id === row.id ? { ...entry, lastCareDate: row.item.interval ? editing.date : '', chosenDate: row.item.interval ? '' : editing.date } : entry);
    if (saveCareChange(care, `${row.item.title} 날짜 수정`)) setListMessage(`${row.item.title}의 날짜를 수정했습니다.`);
  }
  async function copy() {
    try { await navigator.clipboard.writeText(record); setCopyFailed(false); setListMessage('관리 항목·제품 기록과 출처를 복사했습니다.'); }
    catch { setCopyFailed(true); setListMessage('자동 복사에 실패했습니다. 아래 기록을 직접 복사하세요.'); }
  }
  function exportFile() {
    const url = URL.createObjectURL(new Blob([exportNotebookText(notebook, today)], { type: 'application/json;charset=utf-8' }));
    const anchor = document.createElement('a');
    anchor.href = url; anchor.download = `salimlab-household-notebook-${today || 'export'}.json`; anchor.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setFileMessage('수첩을 JSON 파일로 내보냈습니다. 다른 기기에서는 ‘파일 불러오기’로 여세요.');
  }
  async function chooseFile(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = '';
    setPendingImport(null);
    if (!file) return;
    if (file.size > NOTEBOOK_FILE_MAX_BYTES) { setFileMessage(`파일이 ${NOTEBOOK_FILE_MAX_BYTES / 1000}KB보다 커서 읽지 않았습니다.`); return; }
    let content = '';
    try { content = await fileText(file); } catch { setFileMessage('파일을 읽지 못했습니다.'); return; }
    const result = importNotebookText(content, products);
    if (result.kind === 'error') { setFileMessage(result.message); return; }
    setPendingImport({ notebook: result.notebook, dropped: result.dropped, name: file.name });
    setFileMessage('');
  }
  function applyImport() {
    if (!pendingImport) return;
    setUndoChange(null); setEditing(null);
    if (saveNotebook(pendingImport.notebook)) setFileMessage(`파일로 수첩을 바꿨습니다. 관리 항목 ${pendingImport.notebook.care.length}개, 제품 기록 ${pendingImport.notebook.products.length}개.${pendingImport.dropped ? ` 형식이 맞지 않는 ${pendingImport.dropped}개는 빼고 불러왔습니다.` : ''}`);
    setPendingImport(null);
  }
  return <><CareHandoffSync products={products} today={today} onSync={receiveHandoff} /><div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start print:block">
    <section aria-labelledby="household-add-heading" className="rounded-xl border border-gray-200 bg-white p-5 sm:p-6 print:hidden">
      <h2 id="household-add-heading" className="text-xl font-bold">관리 항목 추가</h2>
      <p className="mt-2 text-sm leading-relaxed text-gray-700">모델과 관리 항목을 하나씩 고릅니다. 일정표의 ‘수첩으로 가져가기’를 누르면 제품·항목·날짜를 이어 받습니다. 내용을 확인하고 추가하세요. 이 목록은 지금 사용하는 브라우저에만 저장됩니다.</p>
      <label htmlFor="household-model" className="mt-5 block text-sm font-semibold">제품 모델</label>
      <select id="household-model" value={model} onChange={(e) => { setModel(e.target.value); setItemId(''); setDate(''); setMessage(''); }} className={field}><option value="">제품 선택</option>{products.map((entry) => <option key={entry.modelNumber} value={entry.modelNumber}>{entry.title} · {entry.modelNumber}</option>)}</select>
      <label htmlFor="household-item" className="mt-5 block text-sm font-semibold">관리 항목</label>
      <select id="household-item" value={itemId} onChange={(e) => { setItemId(e.target.value); setDate(''); setMessage(''); }} disabled={!product} className={field}><option value="">항목 선택</option>{[true, false].map((automatic) => {
        const items = product?.items.filter((entry) => !!entry.interval === automatic);
        return items?.length ? <optgroup key={String(automatic)} label={automatic ? '설명서 주기로 날짜 계산' : '확인일 직접 정하기'}>{items.map((entry) => <option key={entry.id} value={entry.id}>{entry.title}</option>)}</optgroup> : null;
      })}</select>
      {item && <><p className="mt-4 rounded-lg bg-gray-50 p-3 text-sm leading-relaxed text-gray-800">{item.timing}<br />{item.interval ? <>{item.interval.basis} <ValueBadge kind="official" /></> : <>설명서에서 고정 날짜 주기를 확인하지 못했습니다. 확인일을 직접 정하세요. <ValueBadge kind="unverified" /></>}</p><label htmlFor="household-date" className="mt-5 block text-sm font-semibold">{item.interval ? '마지막으로 관리한 날짜' : '직접 정할 확인일'}</label><input id="household-date" type="date" value={date} max={item.interval ? today || undefined : undefined} min={item.interval ? undefined : today || undefined} onChange={(e) => { setDate(e.target.value); setMessage(''); }} className={field} /><p className="mt-2 text-xs text-gray-600">{item.interval ? '구입일을 관리일로 대신하지 마세요.' : '이 날짜는 내가 정한 날짜이며 제조사 교체 주기가 아닙니다.'}</p></>}
      <button type="button" onClick={add} className="mt-6 min-h-11 rounded-lg bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800">목록에 추가</button>
      <p role="status" className="mt-3 text-sm text-gray-700">{message}</p>
    </section>
    <section aria-labelledby="household-list-heading" className="rounded-xl border border-gray-200 bg-gray-50 p-5 sm:p-6 print:border-0 print:bg-white print:p-0">
      <h2 id="household-list-heading" className="text-xl font-bold">우리 집 관리 목록 <span className="text-sm font-normal text-gray-600">{rows.length}개 항목</span></h2>
      <p className="mt-2 text-sm leading-relaxed text-gray-700">설명서 주기가 있는 항목은 마지막 관리일로 계산합니다(계산값). 그 외 날짜는 내가 정한 확인일입니다(사용자 입력). 날짜가 지나도 자동으로 다음 일정으로 넘기지 않습니다. 관리를 마치면 ‘오늘 관리함’을 눌러 기록하세요.</p>
      {(listMessage || undoChange) && <div className="sticky top-20 z-10 mt-3 border border-gray-200 bg-white p-3 print:hidden">
        <p role="status" className="text-sm text-gray-800">{listMessage}</p>
        {undoChange && <button type="button" onClick={undo} className="mt-2 min-h-11 rounded-lg border border-blue-300 bg-white px-3 py-2 text-sm font-semibold text-blue-800 focus-visible:outline-2 focus-visible:outline-blue-700" aria-label={`${undoChange.label} 실행 취소`}>실행 취소</button>}
      </div>}
      {rows.length ? <ol className="mt-5 space-y-4">{rows.map((row) => <li key={row.id} className="rounded-lg border border-gray-200 bg-white p-4"><div className="flex items-start justify-between gap-3"><div><p className={`font-bold ${row.overdue ? 'text-red-800' : 'text-blue-800'}`}><time dateTime={row.dueDate}>{row.dueDate}</time>{row.overdue ? ' · 기준일 지남' : ''} <ValueBadge kind={row.item.interval ? 'calculated' : 'entered'} /></p><p className="mt-1 text-sm font-semibold">{row.product.title} · {row.product.modelNumber}</p><p className="mt-1 text-sm">{row.item.title}</p>{row.item.interval && <p className="mt-1 text-xs text-gray-600">마지막 관리일 {row.lastCareDate}</p>}</div><div className="flex shrink-0 flex-col gap-2 print:hidden">{row.item.interval && <button type="button" onClick={() => markDone(row.id, row.item.title)} className="min-h-11 rounded-lg border border-blue-300 bg-blue-50 px-3 text-xs font-semibold text-blue-900">오늘 관리함</button>}<button type="button" onClick={() => setEditing({ id: row.id, date: row.item.interval ? row.lastCareDate : row.chosenDate, error: '' })} className="min-h-11 rounded-lg border border-gray-300 px-3 text-xs">날짜 수정</button><button type="button" onClick={() => remove(row.id, row.item.title)} className="min-h-11 rounded-lg border border-gray-300 px-3 text-xs">삭제</button></div></div>{editing?.id === row.id && <div className="mt-4 border-t border-gray-200 pt-4 print:hidden">
        <label htmlFor={`household-edit-${row.id}`} className="block text-sm font-semibold">{row.item.interval ? '마지막으로 관리한 날짜' : '직접 정할 확인일'}</label>
        <input id={`household-edit-${row.id}`} type="date" value={editing.date} max={row.item.interval ? today || undefined : undefined} min={row.item.interval ? undefined : today || undefined} aria-invalid={!!editing.error} aria-describedby={editing.error ? `household-edit-error-${row.id}` : undefined} onChange={(e) => setEditing({ ...editing, date: e.target.value, error: '' })} className={field} />
        {editing.error && <p id={`household-edit-error-${row.id}`} role="alert" className="mt-2 text-sm text-red-700">{editing.error}</p>}
        <div className="mt-3 flex flex-wrap gap-3"><button type="button" onClick={saveDate} className="min-h-11 rounded-lg bg-blue-700 px-3 py-2 text-sm font-semibold text-white">날짜 저장</button><button type="button" onClick={() => setEditing(null)} className="min-h-11 rounded-lg border border-gray-300 px-3 py-2 text-sm">수정 취소</button></div>
      </div>}<p className="mt-2 text-xs leading-relaxed text-gray-600">{row.basis}</p><a href={row.item.sourceUrl} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-xs font-semibold text-blue-700 underline underline-offset-4">공식 관리 안내 보기</a></li>)}</ol> : <p className="mt-5 text-sm text-gray-700">아직 등록한 관리 항목이 없습니다. 첫 제품을 선택해 추가하세요.</p>}
      {hasRecords && <div className="mt-6 flex flex-wrap gap-3 print:hidden"><button type="button" onClick={copy} className="min-h-11 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold">목록 복사</button><button type="button" onClick={() => window.print()} className="min-h-11 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold">인쇄하기</button></div>}
      {copyFailed && <textarea readOnly aria-label="직접 복사할 관리표" rows={12} value={record} className={`${field} print:hidden`} />}
      <p className="mt-5 text-xs leading-relaxed text-gray-600 print:hidden">브라우저 데이터를 삭제하거나 다른 기기에서 열면 목록은 보이지 않습니다. 계정 동기화와 알림은 제공하지 않습니다.</p>
      <p className="mt-3 print:hidden"><Link href="/tools/care-plan" className="text-sm font-semibold text-blue-700 underline underline-offset-4">제품 한 항목의 달력 일정 만들기</Link></p>
    </section>
  </div>
  <ApplianceNotebook catalog={products} products={notebook.products} today={today} newId={newId} onChange={saveProducts} />
  <section aria-labelledby="notebook-file-heading" className="mt-8 rounded-xl border border-gray-200 bg-white p-5 sm:p-6 print:hidden">
    <h2 id="notebook-file-heading" className="text-xl font-bold">수첩을 파일로 보관하기</h2>
    <p className="mt-2 max-w-prose text-sm leading-relaxed text-gray-700">관리 목록과 제품 기록을 JSON 파일 하나로 내보내고, 다른 브라우저에서 불러올 수 있습니다. 파일은 이 기기에 저장되고 서버로 보내지 않습니다. 불러오면 지금 수첩을 파일 내용으로 바꿉니다.</p>
    <div className="mt-4 flex flex-wrap items-center gap-3">
      <button type="button" onClick={exportFile} disabled={!hasRecords} className="min-h-11 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold disabled:text-gray-400">JSON 파일로 내보내기</button>
      <label className="inline-flex min-h-11 cursor-pointer items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold focus-within:outline-2 focus-within:outline-blue-700">파일 불러오기<input id="notebook-import" type="file" accept="application/json,.json" onChange={chooseFile} className="sr-only" /></label>
    </div>
    <p className="mt-2 text-xs text-gray-600">{NOTEBOOK_FILE_MAX_BYTES / 1000}KB 이하의 살림랩 수첩 파일만 읽습니다. 모르는 항목은 무시하고, 형식이 맞지 않는 기록은 빼고 불러옵니다.</p>
    {pendingImport && <div className="mt-4 rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm text-amber-950"><p>{pendingImport.name}: 관리 항목 {pendingImport.notebook.care.length}개, 제품 기록 {pendingImport.notebook.products.length}개{pendingImport.dropped ? `, 형식이 맞지 않아 뺄 기록 ${pendingImport.dropped}개` : ''}. 지금 수첩(관리 항목 {notebook.care.length}개, 제품 기록 {notebook.products.length}개)을 이 내용으로 바꿀까요?</p><div className="mt-3 flex flex-wrap gap-3"><button type="button" onClick={applyImport} className="min-h-11 rounded-lg bg-blue-700 px-4 py-2 font-semibold text-white">이 파일로 바꾸기</button><button type="button" onClick={() => setPendingImport(null)} className="min-h-11 rounded-lg border border-gray-300 bg-white px-4 py-2 font-semibold">취소</button></div></div>}
    <p role="status" className="mt-3 text-sm text-gray-800">{fileMessage}</p>
  </section>
  </>;
}
