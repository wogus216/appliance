import { describe, expect, it } from 'vitest';
import { CARE_PLAN_PRODUCTS } from '@/lib/data/care-plan';
import { householdCareRecord, markHouseholdCareDone, readHouseholdCare, resolveHouseholdCare } from '@/lib/household-care';

const product = CARE_PLAN_PRODUCTS.find((entry) => entry.modelNumber === 'CHPI-7400N')!;
const outlet = product.items.find((entry) => entry.id === 'outlet')!;
const manual = product.items.find((entry) => !entry.interval)!;

describe('집 전체 관리 목록', () => {
  it('저장소의 잘못된 모델·항목·형식을 무시한다', () => {
    expect(readHouseholdCare('{', CARE_PLAN_PRODUCTS)).toEqual([]);
    const entries = readHouseholdCare(JSON.stringify([
      { id: 'good-1', modelNumber: product.modelNumber, itemId: outlet.id, lastCareDate: '2026-10-20', chosenDate: '' },
      { id: 'bad', modelNumber: 'UNKNOWN', itemId: outlet.id, lastCareDate: '2026-10-20', chosenDate: '' },
    ]), CARE_PLAN_PRODUCTS);
    expect(entries).toHaveLength(1);
  });

  it('설명서 주기와 사용자가 정한 날짜를 구별하고 지난 항목을 유지한다', () => {
    const rows = resolveHouseholdCare([
      { id: 'first', modelNumber: product.modelNumber, itemId: outlet.id, lastCareDate: '2026-10-20', chosenDate: '' },
      { id: 'second', modelNumber: product.modelNumber, itemId: manual.id, lastCareDate: '', chosenDate: '2026-10-25' },
    ], CARE_PLAN_PRODUCTS, '2026-10-29');
    expect(rows.map((row) => row.dueDate)).toEqual(['2026-10-25', '2026-10-27']);
    expect(rows.every((row) => row.overdue)).toBe(true);
    expect(rows[0].basis).toContain('사용자가 직접 정한 날짜');
    expect(householdCareRecord(rows)).toContain(outlet.sourceUrl);
  });

  it('관리를 마치면 주기 항목만 오늘을 새 마지막 관리일로 기록한다', () => {
    const entries = [
      { id: 'first', modelNumber: product.modelNumber, itemId: outlet.id, lastCareDate: '2026-10-01', chosenDate: '' },
      { id: 'second', modelNumber: product.modelNumber, itemId: manual.id, lastCareDate: '', chosenDate: '2026-10-25' },
    ];
    const done = markHouseholdCareDone(entries, 'first', CARE_PLAN_PRODUCTS, '2026-10-29');
    expect(done[0].lastCareDate).toBe('2026-10-29');
    expect(markHouseholdCareDone(entries, 'second', CARE_PLAN_PRODUCTS, '2026-10-29')[1]).toEqual(entries[1]);
    const record = householdCareRecord(resolveHouseholdCare(done, CARE_PLAN_PRODUCTS, '2026-10-29'), '2026-10-29');
    expect(record).toContain('[계산값]');
    expect(record).toContain('[사용자 입력] 2026-10-25');
    expect(record).toContain('마지막 관리일: 2026-10-29');
  });
});
