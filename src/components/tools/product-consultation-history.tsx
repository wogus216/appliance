'use client';

import { useState } from 'react';
import { CONSULTATION_ANSWER_MAX, CONSULTATION_CONTACT_MAX, CONSULTATION_SUMMARY_MAX, saveNotebookConsultation, type NotebookConsultation } from '@/lib/notebook-consultation';
import { ValueBadge } from '@/components/tools/value-badge';

const field = 'mt-2 min-h-11 w-full min-w-0 rounded-lg border border-gray-300 bg-white px-3 py-2 text-base text-gray-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700';
const button = 'min-h-11 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700';

export function ProductConsultationHistory({ productId, records, today, newId, onSave }: { productId: string; records: NotebookConsultation[]; today: string; newId: () => string; onSave: (records: NotebookConsultation[]) => boolean }) {
  const [draft, setDraft] = useState<NotebookConsultation | null>(null);
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState('');
  const prefix = `nb-${productId}-consultation`;
  function change(key: keyof Omit<NotebookConsultation, 'id'>, value: string) {
    setDraft((old) => old ? { ...old, [key]: value } : old); setMessage('');
  }
  function save() {
    if (!draft) return;
    if (editing && !records.some((record) => record.id === draft.id)) { setMessage('수정하던 기록이 삭제되었습니다. 현재 목록을 확인한 뒤 다시 선택하세요.'); return; }
    const result = saveNotebookConsultation(records, draft, today);
    if (result.kind === 'error') { setMessage(result.message); return; }
    if (onSave(result.records)) { setDraft(null); setMessage('상담 기록을 이 제품에 저장했습니다. 같은 브라우저에서 다시 볼 수 있습니다.'); }
    else setMessage('상담 기록을 저장하지 못했습니다. 입력은 그대로 남아 있으니 복사해 보관하거나 저장 공간을 확인하세요.');
  }
  return <section aria-labelledby={`${prefix}-heading`} className="mt-5 border-t border-gray-200 pt-4">
    <h4 id={`${prefix}-heading`} className="font-semibold text-gray-900">상담 기록 <span className="text-sm font-normal text-gray-600">{records.length}건</span></h4>
    <p className="mt-2 text-xs leading-relaxed text-gray-600">질문과 받은 답변을 제품별로 보관합니다. 내용은 사용자가 남긴 메모이며 실제 수리 내역·수리비 합계와 따로 관리합니다. 파일 내보내기와 목록 복사에도 포함됩니다.</p>
    {records.length ? <ul className="mt-3 space-y-3">{records.map((record) => <li key={record.id}>
      <details className="rounded-lg border border-gray-200 bg-white p-3 text-sm leading-relaxed">
        <summary className="min-h-11 cursor-pointer break-words font-semibold text-gray-900"><time dateTime={record.date}>{record.date}</time> · {record.contact || '상담처 미기록'} · {record.answer ? '답변 메모 있음' : '답변 미기록'}</summary>
        <div className="mt-2"><ValueBadge kind="entered" /><p className="mt-2 font-semibold">상담 내용·질문</p><p className="mt-1 whitespace-pre-wrap break-words">{record.summary}</p><p className="mt-3 font-semibold">받은 답변</p><p className="mt-1 whitespace-pre-wrap break-words">{record.answer || '미기록'}</p></div>
        <div className="mt-3 flex flex-wrap gap-3 print:hidden">
          <button type="button" className={button} onClick={() => { setDraft({ ...record }); setEditing(true); setMessage(''); }}>상담 기록 수정</button>
          <button type="button" className={button} onClick={() => {
            if (onSave(records.filter((candidate) => candidate.id !== record.id))) { if (draft?.id === record.id) setDraft(null); setMessage('상담 기록을 삭제했습니다.'); }
            else setMessage('상담 기록을 삭제하지 못했습니다. 기존 기록을 유지했습니다.');
          }}>상담 기록 삭제</button>
        </div>
      </details>
    </li>)}</ul> : <p className="mt-3 text-sm text-gray-700">아직 보관한 상담 기록이 없습니다.</p>}
    {!draft && <button type="button" className={`mt-3 print:hidden ${button}`} onClick={() => { setDraft({ id: newId(), date: today, contact: '', summary: '', answer: '' }); setEditing(false); setMessage(''); }}>상담 기록 작성</button>}
    {draft && <div className="mt-4 space-y-4 rounded-lg border border-gray-300 bg-white p-4 print:hidden">
      <p className="font-semibold">{editing ? '상담 기록 수정' : '상담 기록 작성'}</p>
      <div><label htmlFor={`${prefix}-date`} className="text-sm font-semibold">기록 날짜</label><input id={`${prefix}-date`} type="date" max={today || undefined} value={draft.date} onChange={(event) => change('date', event.target.value)} className={field} /></div>
      <div><label htmlFor={`${prefix}-contact`} className="text-sm font-semibold">상담처 <span className="font-normal">(선택)</span></label><input id={`${prefix}-contact`} maxLength={CONSULTATION_CONTACT_MAX} value={draft.contact} onChange={(event) => change('contact', event.target.value)} placeholder="예: 제조사 고객센터, 설치 기사" className={field} /></div>
      <div><label htmlFor={`${prefix}-summary`} className="text-sm font-semibold">상담 내용·질문</label><textarea id={`${prefix}-summary`} rows={5} maxLength={CONSULTATION_SUMMARY_MAX} value={draft.summary} onChange={(event) => change('summary', event.target.value)} className={field} /></div>
      <div><label htmlFor={`${prefix}-answer`} className="text-sm font-semibold">받은 답변 <span className="font-normal">(선택)</span></label><textarea id={`${prefix}-answer`} rows={4} maxLength={CONSULTATION_ANSWER_MAX} value={draft.answer} onChange={(event) => change('answer', event.target.value)} className={field} /></div>
      <div className="flex flex-wrap gap-3"><button type="button" onClick={save} className={button}>상담 기록 저장</button><button type="button" onClick={() => { setDraft(null); setMessage(''); }} className={button}>작성 취소</button></div>
    </div>}
    <p role="status" className="mt-2 text-sm leading-relaxed text-gray-700 print:hidden">{message}</p>
  </section>;
}
