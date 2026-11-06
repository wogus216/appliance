'use client';

import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { consumeRepairHandoff, repairNotebookModel, type RepairHandoff } from '@/lib/repair-handoff';
import { ConsumerStandardInfo, WarrantyBasisFields } from '@/components/tools/consumer-standard-info';
import { ValueBadge } from '@/components/tools/value-badge';
import { ConsultationMemoActions } from '@/components/tools/consultation-memo-actions';
import { ProductConsultationHistory } from '@/components/tools/product-consultation-history';
import { saveNotebookConsultation } from '@/lib/notebook-consultation';
import {
  NOTEBOOK_PRODUCT_LIMIT, PURCHASE_PLACE_MAX, REPAIR_LIMIT, REPAIR_TEXT_MAX, isAirconProduct, newNotebookProduct,
  notebookStandardInput, notebookStandardItemId, repairTotalWon, type NotebookProduct, type RepairRecord,
} from '@/lib/appliance-notebook';
import type { CarePlanProduct } from '@/lib/care-plan';
import { resolveStandard } from '@/lib/consumer-standards';
import { parseWon, repairReplaceHref } from '@/lib/repair-replace';

const field = 'mt-2 min-h-11 w-full min-w-0 rounded-lg border border-gray-300 bg-white px-3 py-2 text-base text-gray-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700';
const won = (value: number) => `${value.toLocaleString('ko-KR')}원`;
interface RepairDraft { date: string; description: string; cost: string; message: string }
const emptyDraft: RepairDraft = { date: '', description: '', cost: '', message: '' };

function NotebookConsultationSync({ onSync }: { onSync: (result: ReturnType<typeof consumeRepairHandoff>) => void }) {
  useEffect(() => {
    try { onSync(consumeRepairHandoff(window.sessionStorage, 'notebook')); }
    catch { onSync({ kind: 'blocked' }); }
  }, [onSync]);
  return null;
}

export function ApplianceNotebook({ catalog, products, today, newId, onChange }: {
  catalog: CarePlanProduct[]; products: NotebookProduct[]; today: string; newId: () => string;
  onChange: (next: NotebookProduct[], message: string) => boolean;
}) {
  const [model, setModel] = useState('');
  const [message, setMessage] = useState('');
  const [drafts, setDrafts] = useState<Record<string, RepairDraft>>({});
  const [consultation, setConsultation] = useState<RepairHandoff | null>(null);
  const [consultationMessage, setConsultationMessage] = useState('');
  const [savedConsultation, setSavedConsultation] = useState<number | null>(null);
  const receiveConsultation = useCallback((received: ReturnType<typeof consumeRepairHandoff>) => {
    if (received.kind === 'none') return;
    if (received.kind !== 'ready') { setConsultationMessage(received.kind === 'invalid' ? '전달된 상담 메모가 만료됐거나 유효하지 않습니다. 비교표에서 다시 전달하세요.' : '임시 상담 메모를 읽지 못했습니다. 기존 수첩은 그대로 사용할 수 있습니다.'); return; }
    setConsultation(received.draft);
    setSavedConsultation(null);
    const matched = repairNotebookModel(received.draft.model, catalog);
    if (matched) setModel(matched);
    setConsultationMessage(matched ? '상담한 모델을 선택했습니다. 기존 제품은 아래 기록을 확인하고, 새 제품은 ‘수첩에 추가’를 눌러 등록하세요.' : '상담한 모델이 수첩의 지원 목록에 없습니다. 비슷한 모델로 대신 등록하지 말고 아래 상담 메모를 복사해 보관하세요.');
  }, [catalog]);
  const draftOf = (id: string) => drafts[id] ?? emptyDraft;
  const setDraft = (id: string, next: Partial<RepairDraft>) => setDrafts((old) => ({ ...old, [id]: { ...(old[id] ?? emptyDraft), ...next } }));
  const consultationModel = consultation ? repairNotebookModel(consultation.model, catalog) : undefined;

  function saveReceivedConsultation() {
    if (!consultation || !consultationModel || savedConsultation === consultation.createdAt) return;
    const existing = products.find((product) => product.modelNumber === consultationModel);
    if (!existing && products.length >= NOTEBOOK_PRODUCT_LIMIT) { setConsultationMessage(`제품 기록은 ${NOTEBOOK_PRODUCT_LIMIT}개까지 저장할 수 있습니다.`); return; }
    const product = existing ?? newNotebookProduct(newId(), consultationModel);
    const result = saveNotebookConsultation(product.consultations, { id: newId(), date: today, contact: '', summary: consultation.summary, answer: '' }, today);
    if (result.kind === 'error') { setConsultationMessage(result.message); return; }
    const saved = { ...product, consultations: result.records };
    if (onChange(existing ? products.map((entry) => entry.id === existing.id ? saved : entry) : [...products, saved], '')) {
      setSavedConsultation(consultation.createdAt);
      setConsultationMessage(`${consultationModel}의 상담 기록으로 저장했습니다. 아래 제품에서 상담처·받은 답변을 추가할 수 있습니다.`);
    } else setConsultationMessage('브라우저에 상담 메모를 저장하지 못했습니다. 임시 원문은 남아 있으니 복사하거나 파일로 보관하세요.');
  }

  function add() {
    if (!model) { setMessage('수첩에 넣을 제품을 고르세요.'); return; }
    if (products.some((product) => product.modelNumber === model)) { setMessage('이 모델은 이미 수첩에 있습니다.'); return; }
    if (products.length >= NOTEBOOK_PRODUCT_LIMIT) { setMessage(`제품 기록은 ${NOTEBOOK_PRODUCT_LIMIT}개까지 저장할 수 있습니다.`); return; }
    if (onChange([...products, newNotebookProduct(newId(), model)], '')) { setMessage('제품을 수첩에 추가했습니다. 아래에서 구입일과 보증 정보를 넣으세요.'); setModel(''); }
  }
  const update = (id: string, patch: Partial<NotebookProduct>) => onChange(products.map((product) => product.id === id ? { ...product, ...patch } : product), '');
  function addRepair(product: NotebookProduct) {
    const draft = draftOf(product.id);
    const description = draft.description.trim();
    const cost = draft.cost.trim() ? parseWon(draft.cost, true) : null;
    if (!draft.date || draft.date > today) { setDraft(product.id, { message: '수리한 날짜를 오늘 또는 이전으로 넣으세요.' }); return; }
    if (!description) { setDraft(product.id, { message: '수리 내용을 적으세요.' }); return; }
    if (draft.cost.trim() && cost === null) { setDraft(product.id, { message: '금액은 원 단위 정수로 넣거나 비워 두세요. 예: 120000 또는 120,000' }); return; }
    if (product.repairs.length >= REPAIR_LIMIT) { setDraft(product.id, { message: `수리 기록은 제품마다 ${REPAIR_LIMIT}개까지 저장합니다.` }); return; }
    const repair: RepairRecord = { id: newId(), date: draft.date, description, costWon: cost };
    const repairs = [...product.repairs, repair].sort((a, b) => a.date.localeCompare(b.date));
    if (update(product.id, { repairs })) setDraft(product.id, { ...emptyDraft, message: '수리 기록을 추가했습니다.' });
  }

  return <section aria-labelledby="notebook-heading" className="mt-8 rounded-xl border border-gray-200 bg-white p-5 sm:p-6 print:border-0 print:p-0">
    <NotebookConsultationSync onSync={receiveConsultation} />
    <h2 id="notebook-heading" className="text-xl font-bold">제품 기록: 구입·보증·수리 <span className="text-sm font-normal text-gray-600">{products.length}개 제품</span></h2>
    <p className="mt-2 max-w-prose text-sm leading-relaxed text-gray-700 print:hidden">구입일과 보증서 날짜, 수리 내역을 제품마다 적어 둡니다. 공정위 소비자분쟁해결기준의 품목별 기간을 함께 보여 주고, 기산 날짜를 넣으면 종료일을 계산합니다(계산값). 관리 목록과 같은 브라우저 저장소에 남습니다.</p>
    {consultation && <div className="mt-4 rounded-lg border border-gray-300 bg-gray-50 p-4 print:hidden">
      <label htmlFor="notebook-consultation" className="block text-sm font-semibold">이어 받은 상담 메모 · 임시 표시</label>
      <p id="notebook-consultation-retention" className="mt-2 text-sm font-semibold leading-relaxed text-gray-900">별도로 저장하지 않으면 새로고침하거나 다시 방문할 때 이 임시 메모는 사라집니다. 지원 모델은 제품별 상담 기록에 저장하거나 복사·파일로 보관하세요.</p>
      <p className="mt-2 text-sm leading-relaxed text-gray-700">아래 제품 기록과 달리 상담 메모는 수첩에 자동 저장하지 않습니다. 수리 이력에는 실제 수리가 끝난 날짜·내용·금액만 따로 추가하세요.</p>
      <textarea id="notebook-consultation" aria-describedby="notebook-consultation-retention" readOnly value={consultation.summary} rows={6} className={field} />
      <ConsultationMemoActions summary={consultation.summary} textareaId="notebook-consultation" />
      {consultationModel && <div className="mt-4"><p className="text-sm text-gray-700">저장할 모델: <strong>{consultationModel}</strong>. 기록 날짜는 오늘이며 받은 답변은 미기록으로 둡니다.</p><button type="button" onClick={saveReceivedConsultation} disabled={!today || savedConsultation === consultation.createdAt} className="mt-2 min-h-11 rounded-lg border border-blue-300 bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-900 disabled:opacity-60">{savedConsultation === consultation.createdAt ? '이 상담 메모 저장됨' : '이 모델에 상담 메모 저장'}</button></div>}
      {repairNotebookModel(consultation.model, catalog) && products.some((product) => product.modelNumber === repairNotebookModel(consultation.model, catalog)) && <p className="mt-2 text-sm font-semibold text-gray-900">이 모델은 이미 수첩에 있습니다. 기존 구입·보증·수리 기록을 그대로 유지했습니다.</p>}
    </div>}
    <p role="status" className="mt-2 text-sm text-gray-700 print:hidden">{consultationMessage}</p>
    <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-end print:hidden">
      <div className="min-w-0 flex-1"><label htmlFor="notebook-model" className="block text-sm font-semibold">수첩에 넣을 제품</label><select id="notebook-model" value={model} onChange={(e) => { setModel(e.target.value); setMessage(''); }} className={field}><option value="">제품 선택</option>{catalog.map((entry) => <option key={entry.modelNumber} value={entry.modelNumber}>{entry.title} · {entry.modelNumber}</option>)}</select></div>
      <button type="button" onClick={add} className="min-h-11 rounded-lg bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800">수첩에 추가</button>
    </div>
    <p role="status" className="mt-3 text-sm text-gray-700 print:hidden">{message}</p>
    {products.length ? <ol className="mt-4 space-y-6">{products.map((product) => {
      const entry = catalog.find((candidate) => candidate.modelNumber === product.modelNumber);
      const input = notebookStandardInput(product, catalog);
      const resolution = resolveStandard(input, today || undefined);
      const aircon = isAirconProduct(product, catalog);
      const itemId = notebookStandardItemId(product, catalog);
      const draft = draftOf(product.id);
      const priced = product.repairs.filter((repair) => repair.costWon !== null);
      const prefix = `nb-${product.id}`;
      return <li key={product.id} className="rounded-lg border border-gray-200 bg-gray-50 p-4 print:break-inside-avoid print:bg-white">
        <div className="flex items-start justify-between gap-3"><h3 className="min-w-0 font-bold text-gray-900">{entry?.title ?? product.modelNumber} · {product.modelNumber}</h3><button type="button" onClick={() => onChange(products.filter((candidate) => candidate.id !== product.id), `${product.modelNumber} 제품 기록을 수첩에서 삭제했습니다.`)} className="min-h-11 shrink-0 rounded-lg border border-gray-300 bg-white px-3 text-xs print:hidden">제품 기록 삭제</button></div>
        <div className="mt-3 grid gap-4 sm:grid-cols-2 print:hidden">
          <div><label htmlFor={`${prefix}-purchase`} className="block text-sm font-semibold">구입일 <ValueBadge kind="entered" /></label><input id={`${prefix}-purchase`} type="date" max={today || undefined} value={product.purchaseDate} onChange={(e) => update(product.id, { purchaseDate: e.target.value })} className={field} /></div>
          <div><label htmlFor={`${prefix}-place`} className="block text-sm font-semibold">구입처 <span className="font-normal text-gray-600">(선택)</span></label><input id={`${prefix}-place`} type="text" maxLength={PURCHASE_PLACE_MAX} autoComplete="off" value={product.purchasePlace} onChange={(e) => update(product.id, { purchasePlace: e.target.value })} placeholder="예: 제조사 공식몰" className={field} /></div>
          {aircon && <div><label htmlFor={`${prefix}-aircon`} className="block text-sm font-semibold">에어컨 구분</label><select id={`${prefix}-aircon`} value={product.airconType} onChange={(e) => update(product.id, { airconType: e.target.value as NotebookProduct['airconType'] })} className={field}><option value="">고르세요</option><option value="cooling">냉방 전용</option><option value="heat-pump">냉난방 겸용</option></select><p className="mt-1 text-xs text-gray-600">모델 자료에서 구분을 확인하지 못했습니다. 보증서·설명서를 보고 고르세요. 고시 품질보증기간이 냉방 전용 2년, 냉난방 겸용 1년으로 다릅니다.</p></div>}
          <WarrantyBasisFields idPrefix={prefix} value={{ basis: product.warrantyBasis, basisDate: product.basisDate, saleDateSource: product.saleDateSource, manufactureLabel: product.manufactureLabel }} today={today} hidePurchaseDate onChange={({ basis, ...patch }) => update(product.id, { ...patch, ...(basis ? { warrantyBasis: basis } : {}) })} />
          <div><label htmlFor={`${prefix}-maker-end`} className="block text-sm font-semibold">보증서의 제조사 보증 종료일 <span className="font-normal text-gray-600">(선택)</span></label><input id={`${prefix}-maker-end`} type="date" value={product.makerWarrantyEnd} onChange={(e) => update(product.id, { makerWarrantyEnd: e.target.value })} className={field} /></div>
        </div>
        <dl className="hidden text-sm print:mt-2 print:grid print:grid-cols-2 print:gap-1">
          <dt>구입일</dt><dd>{product.purchaseDate || '미입력'} [사용자 입력]</dd>
          {product.purchasePlace && <><dt>구입처</dt><dd>{product.purchasePlace}</dd></>}
          {product.makerWarrantyEnd && <><dt>제조사 보증 종료일</dt><dd>{product.makerWarrantyEnd} [사용자 입력]</dd></>}
        </dl>
        {resolution ? <ConsumerStandardInfo resolution={resolution} input={input} headingLevel="h4" /> : aircon && <p className="mt-4 text-sm text-gray-700">에어컨 구분을 고르면 고시 품질보증기간(냉방 전용 2년 · 냉난방 겸용 1년)과 부품보유기간(제조일로부터 8년)을 붙입니다.</p>}
        <ProductConsultationHistory productId={product.id} records={product.consultations} today={today} newId={newId} onSave={(consultations) => update(product.id, { consultations })} />
        <div className="mt-4">
          <h4 className="font-semibold text-gray-900">수리 기록 <span className="text-sm font-normal text-gray-600">{product.repairs.length}건</span></h4>
          {product.repairs.length > 0 && <ul className="mt-2 space-y-2">{product.repairs.map((repair) => <li key={repair.id} className="flex items-start justify-between gap-3 rounded border border-gray-200 bg-white p-3 text-sm"><span className="min-w-0 break-words"><time dateTime={repair.date} className="font-semibold">{repair.date}</time> · {repair.description} · {repair.costWon === null ? '금액 미입력' : won(repair.costWon)} <ValueBadge kind="entered" /></span><button type="button" onClick={() => update(product.id, { repairs: product.repairs.filter((candidate) => candidate.id !== repair.id) })} className="min-h-11 shrink-0 rounded-lg border border-gray-300 px-3 text-xs print:hidden">삭제</button></li>)}</ul>}
          {priced.length > 0 && <p className="mt-2 text-sm">입력한 수리비 합계: <strong className="tabular-nums">{won(repairTotalWon(product))}</strong> <ValueBadge kind="calculated" />{priced.length < product.repairs.length && <span className="text-xs text-gray-600"> (금액 미입력 {product.repairs.length - priced.length}건 제외)</span>}</p>}
          <div className="mt-3 grid gap-3 sm:grid-cols-[10rem_minmax(0,1fr)_9rem_auto] sm:items-end print:hidden">
            <div><label htmlFor={`${prefix}-repair-date`} className="block text-xs font-semibold">수리한 날</label><input id={`${prefix}-repair-date`} type="date" max={today || undefined} value={draft.date} onChange={(e) => setDraft(product.id, { date: e.target.value, message: '' })} className={field} /></div>
            <div><label htmlFor={`${prefix}-repair-text`} className="block text-xs font-semibold">내용</label><input id={`${prefix}-repair-text`} type="text" maxLength={REPAIR_TEXT_MAX} autoComplete="off" value={draft.description} onChange={(e) => setDraft(product.id, { description: e.target.value, message: '' })} placeholder="예: 배수 펌프 교체" className={field} /></div>
            <div><label htmlFor={`${prefix}-repair-cost`} className="block text-xs font-semibold">금액 <span className="font-normal">(선택)</span></label><input id={`${prefix}-repair-cost`} type="text" inputMode="numeric" autoComplete="off" value={draft.cost} onChange={(e) => setDraft(product.id, { cost: e.target.value, message: '' })} placeholder="원" className={field} /></div>
            <button type="button" onClick={() => addRepair(product)} className="min-h-11 rounded-lg border border-blue-300 bg-blue-50 px-3 text-sm font-semibold text-blue-900">수리 기록 추가</button>
          </div>
          <p role="status" className="mt-2 text-sm text-gray-700 print:hidden">{draft.message}</p>
        </div>
        <p className="mt-3 print:hidden"><Link href={repairReplaceHref(itemId || undefined)} className="text-sm font-semibold text-blue-700 underline underline-offset-4">이 제품으로 수리·교체 비교표 열기</Link><span className="block text-xs text-gray-600">주소에는 {itemId ? '고시 품목' : '아무 값'}만 넘깁니다. 날짜와 금액은 그 화면에서 다시 넣으세요.</span></p>
      </li>;
    })}</ol> : <p className="mt-4 text-sm text-gray-700">아직 제품 기록이 없습니다.</p>}
  </section>;
}
