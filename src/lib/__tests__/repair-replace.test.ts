import { describe, expect, it } from 'vitest';
import { calculateRepairReplace, parseWon, repairReplaceRecord, type RepairReplaceInput } from '@/lib/repair-replace';

const base: RepairReplaceInput = { model: 'TEST-1', repairQuote: '200000', replacementPrice: '900000', replacementExtra: '', repairTotalConfirmed: false, replacementTotalConfirmed: false, warranty: 'unknown', diagnosisConfirmed: false };

describe('수리·교체 비교', () => {
  it('포함 비용이 미확인일 때 차이를 부분 합계로만 표시한다', () => {
    const result = calculateRepairReplace(base);
    expect(result.kind).toBe('ready');
    if (result.kind !== 'ready') return;
    expect(result.differenceWon).toBe(700000);
    expect(result.comparable).toBe(false);
    expect(result.questions).toContain('새 제품의 설치·기존 제품 철거·배송·세금 비용을 모두 확인했나요?');
    expect(repairReplaceRecord(base, result)).toContain('확인된 금액만 비교한 부분 합계');
  });

  it('확인된 추가비를 합산하고 두 총액을 비교한다', () => {
    const result = calculateRepairReplace({ ...base, repairQuote: '1,000,000', replacementExtra: '150000', repairTotalConfirmed: true, replacementTotalConfirmed: true });
    expect(result).toMatchObject({ kind: 'ready', repairWon: 1000000, replacementWon: 1050000, differenceWon: 50000, comparable: true });
  });

  it('잘못된 금액과 0원 새 제품 가격은 거부한다', () => {
    expect(calculateRepairReplace({ ...base, repairQuote: '-1' }).kind).toBe('invalid');
    expect(calculateRepairReplace({ ...base, replacementPrice: '0' }).kind).toBe('invalid');
    expect(calculateRepairReplace({ ...base, replacementExtra: 'oops' }).kind).toBe('invalid');
  });

  it('세 자리 묶음 쉼표와 끝의 원만 받고, 어긋난 쉼표는 오류 칸을 알려 준다', () => {
    expect(parseWon('150,000', true)).toBe(150000);
    expect(parseWon('150000원', true)).toBe(150000);
    expect(parseWon(' 1,050,000 원 ', false)).toBe(1050000);
    for (const raw of ['1,5', '15,00', '1.5', '1e5', '0x10']) expect(parseWon(raw, true)).toBeNull();
    const result = calculateRepairReplace({ ...base, repairQuote: '15,00', replacementExtra: '1,2' });
    expect(result.kind).toBe('invalid');
    if (result.kind !== 'invalid') return;
    expect(Object.keys(result.fields).sort()).toEqual(['repairQuote', 'replacementExtra']);
  });

  it('금액이 같으면 기록에서도 어느 쪽이 크다고 쓰지 않는다', () => {
    const result = calculateRepairReplace({ ...base, repairQuote: '900000' });
    expect(result.kind).toBe('ready');
    if (result.kind !== 'ready') return;
    const record = repairReplaceRecord(base, result, '2026-10-29');
    expect(record).toContain('(입력 금액이 같음)');
    expect(record).not.toContain('새 제품 쪽이 큼');
    expect(record).toContain('기록일: 2026-10-29');
  });

  it('기록은 사용자 입력과 계산값을 구별하고 추천하지 않는다', () => {
    const result = calculateRepairReplace(base);
    if (result.kind !== 'ready') throw new Error('ready expected');
    const record = repairReplaceRecord(base, result);
    expect(record).toContain('[사용자 입력] 받은 수리 견적: 200,000원');
    expect(record).toContain('[계산값] 입력 금액 차이: 700,000원 (새 제품 쪽이 큼)');
    expect(record).toContain('추천하지 않습니다');
    expect(record).not.toMatch(/수명은|확률은|요금은 약/);
  });

  it('보증 적용인데 비용이 있으면 보증 제외 항목을 묻는다', () => {
    const covered = calculateRepairReplace({ ...base, warranty: 'covered' });
    const free = calculateRepairReplace({ ...base, warranty: 'covered', repairQuote: '0' });
    if (covered.kind !== 'ready' || free.kind !== 'ready') throw new Error('ready expected');
    expect(covered.questions.some((q) => q.includes('보증에서 빠지는 항목'))).toBe(true);
    expect(free.questions.some((q) => q.includes('보증에서 빠지는 항목'))).toBe(false);
  });
});
