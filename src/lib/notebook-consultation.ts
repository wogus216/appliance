import { isoDateValue } from '@/lib/iso-date';

export const CONSULTATION_LIMIT = 20;
export const CONSULTATION_SUMMARY_MAX = 12_000;
export const CONSULTATION_ANSWER_MAX = 2_000;
export const CONSULTATION_CONTACT_MAX = 80;
export interface NotebookConsultation { id: string; date: string; contact: string; summary: string; answer: string }
const validId = (value: unknown): value is string => typeof value === 'string' && /^[a-zA-Z0-9_-]{1,80}$/.test(value);

export function parseNotebookConsultation(value: unknown): NotebookConsultation | undefined {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return;
  const record = value as Record<string, unknown>;
  if (!validId(record.id) || typeof record.date !== 'string' || isoDateValue(record.date) === undefined) return;
  if (typeof record.summary !== 'string' || !record.summary.trim() || record.summary.length > CONSULTATION_SUMMARY_MAX
    || typeof record.answer !== 'string' || record.answer.length > CONSULTATION_ANSWER_MAX
    || typeof record.contact !== 'string' || record.contact.length > CONSULTATION_CONTACT_MAX) return;
  return { id: record.id, date: record.date, summary: record.summary.trim(), answer: record.answer.trim(), contact: record.contact.trim() };
}

export function saveNotebookConsultation(records: NotebookConsultation[], draft: NotebookConsultation, today: string): { kind: 'ok'; records: NotebookConsultation[] } | { kind: 'error'; message: string } {
  if (!draft.date || isoDateValue(draft.date) === undefined || !today || draft.date > today) return { kind: 'error', message: '기록 날짜를 오늘 또는 이전의 유효한 날짜로 넣으세요.' };
  const parsed = parseNotebookConsultation(draft);
  if (!parsed) return { kind: 'error', message: `상담 내용은 1~${CONSULTATION_SUMMARY_MAX.toLocaleString('ko-KR')}자, 답변은 ${CONSULTATION_ANSWER_MAX.toLocaleString('ko-KR')}자, 상담처는 ${CONSULTATION_CONTACT_MAX}자 이내로 적으세요.` };
  const editing = records.some((record) => record.id === draft.id);
  if (!editing && records.length >= CONSULTATION_LIMIT) return { kind: 'error', message: `상담 기록은 제품마다 ${CONSULTATION_LIMIT}개까지 저장합니다. 파일로 보관한 뒤 오래된 기록을 정리하세요.` };
  return { kind: 'ok', records: (editing ? records.map((record) => record.id === parsed.id ? parsed : record) : [...records, parsed]).sort((a, b) => b.date.localeCompare(a.date)) };
}
