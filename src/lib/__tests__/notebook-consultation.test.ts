import { describe, expect, it } from 'vitest';
import { CONSULTATION_LIMIT, CONSULTATION_SUMMARY_MAX, parseNotebookConsultation, saveNotebookConsultation } from '@/lib/notebook-consultation';
import { exportNotebookText, importNotebookText, newNotebookProduct, notebookRecord, readNotebook, serializeNotebook } from '@/lib/appliance-notebook';
import { CARE_PLAN_PRODUCTS } from '@/lib/data/care-plan';

const model = 'WF24A9500KE';
const consultation = { id: 'c1', date: '2026-11-01', contact: '제조사 고객센터', summary: 'E4 표시 사진을 보냈습니다. 배수 호스 확인 뒤에도 반복될 때 출장비는?', answer: '' };
const previous = { version: 2, care: [], products: [{ ...newNotebookProduct('p1', model), purchaseDate: '2025-01-01', repairs: [{ id: 'r1', date: '2026-01-01', description: '실제 수리', costWon: 50000 }] }] };

describe('제품 상담 기록과 저장 형식 확장', () => {
  it('v2를 v3로 읽고 구입·수리 내용을 유지하며 이전 JSON을 수정하지 않는다', () => {
    const old = { ...previous, products: previous.products.map(({ consultations: ignored, ...product }) => { void ignored; return product; }) };
    const raw = JSON.stringify(old);
    const notebook = readNotebook(null, null, CARE_PLAN_PRODUCTS, raw);
    expect(notebook.version).toBe(3);
    expect(notebook.products[0]).toMatchObject({ purchaseDate: '2025-01-01', repairs: previous.products[0].repairs, consultations: [] });
    expect(JSON.stringify(old)).toBe(raw);
    const next = { ...notebook, products: [{ ...notebook.products[0], consultations: [consultation] }] };
    expect(readNotebook(serializeNotebook(next), null, CARE_PLAN_PRODUCTS, raw)).toEqual(next);
    expect(readNotebook(null, null, CARE_PLAN_PRODUCTS, raw)).toEqual(notebook);
  });

  it('상담과 답변이 JSON 왕복·재읽기·복사에서 보존되고 수리 내역에 더해지지 않는다', () => {
    const notebook = { version: 3 as const, care: [], products: [{ ...newNotebookProduct('p1', model), consultations: [{ ...consultation, answer: '방문 진단 뒤 견적 안내. 아직 방문하지 않음.' }] }] };
    const exported = exportNotebookText(notebook, '2026-11-01');
    expect(importNotebookText(exported, CARE_PLAN_PRODUCTS)).toEqual({ kind: 'ok', notebook, dropped: 0 });
    expect(readNotebook(serializeNotebook(notebook), null, CARE_PLAN_PRODUCTS)).toEqual(notebook);
    const text = notebookRecord(notebook, CARE_PLAN_PRODUCTS, '2026-11-01');
    expect(text).toContain('상담 기록 (사용자 메모)');
    expect(text).toContain(consultation.summary);
    expect(text).toContain(notebook.products[0].consultations[0].answer);
    expect(text).not.toContain('입력한 수리비 합계');
    expect(notebook.products[0].repairs).toEqual([]);
  });

  it('수정은 같은 ID를 교체하고 한도에서 답변을 수정할 수 있다', () => {
    const records = Array.from({ length: CONSULTATION_LIMIT }, (_, i) => ({ ...consultation, id: `c${i}` }));
    const updated = saveNotebookConsultation(records, { ...records[0], answer: '방문일을 예약했습니다.' }, '2026-11-01');
    expect(updated.kind).toBe('ok');
    if (updated.kind !== 'ok') throw new Error('ok expected');
    expect(updated.records).toHaveLength(CONSULTATION_LIMIT);
    expect(updated.records.find((record) => record.id === records[0].id)?.answer).toBe('방문일을 예약했습니다.');
    expect(saveNotebookConsultation(records, { ...consultation, id: 'extra' }, '2026-11-01').kind).toBe('error');
    expect(records[0].answer).toBe('');
  });

  it('날짜·길이·공백을 검증하고 알 수 없는 확인 상태는 버린다', () => {
    expect(saveNotebookConsultation([], { ...consultation, date: '2026-11-02' }, '2026-11-01').kind).toBe('error');
    expect(saveNotebookConsultation([], { ...consultation, date: '2026-02-30' }, '2026-11-01').kind).toBe('error');
    expect(saveNotebookConsultation([], { ...consultation, summary: '  ' }, '2026-11-01').kind).toBe('error');
    expect(parseNotebookConsultation({ ...consultation, summary: 'x'.repeat(CONSULTATION_SUMMARY_MAX + 1) })).toBeUndefined();
    expect(parseNotebookConsultation({ ...consultation, confirmedRepair: true, costWon: 500000 })).toEqual(consultation);
    const imported = importNotebookText(JSON.stringify({ version: 3, care: [], products: [{ ...newNotebookProduct('p1', model), consultations: [consultation, { ...consultation, summary: '' }, { ...consultation, id: 'bad id' }] }] }), CARE_PLAN_PRODUCTS);
    expect(imported).toMatchObject({ kind: 'ok', dropped: 2, notebook: { products: [{ consultations: [consultation] }] } });
  });
});
