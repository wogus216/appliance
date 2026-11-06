import { describe, expect, it } from 'vitest';
import { ENERGY_MEASUREMENTS } from '@/lib/data/energy-measurements';
import { estimateBillDifference } from '@/lib/electricity-bill';
import {
  calculateHomeEnergy, createHomeEnergyRecord, homeEnergyExportJson, homeEnergyInputFromRecord, homeEnergyRecordText, readHomeEnergyRecords, HOME_ENERGY_NOTE_MAX_LENGTH, MAX_HOME_ENERGY_RECORDS,
} from '@/lib/home-energy-record';

function ready(kwh: string, days: string) {
  const result = calculateHomeEnergy({ kwh, days });
  if (result.kind !== 'ready') throw new Error('ready expected');
  return result;
}

describe('저장 기록과 JSON 내보내기', () => {
  const result = ready('35', '7');
  const bill = estimateBillDifference({ householdKwh: '200', usageMonth: '2026-10' }, result.normalizedKwh);
  if (bill.kind !== 'ready') throw new Error('bill expected');
  const record = createHomeEnergyRecord('rec-1', result, { device: ' 거실 에어컨 ', recordedAt: '2026-10-29', declared: ENERGY_MEASUREMENTS.CTH06QBW, bill });

  it('숫자마다 값의 종류 태그를 함께 저장한다', () => {
    expect(record).toMatchObject({
      device: '거실 에어컨',
      measuredKwh: { kind: 'measured', value: 35 },
      days: { kind: 'measured', value: 7 },
      normalizedKwh: { kind: 'calculated', value: 150 },
      declared: { kind: 'official-test', value: 89.5, modelNumber: 'CTH06QBW', itemName: '냉방기간월간소비전력량(kWh/월)(1:1기준)' },
      bill: {
        usageMonth: '2026-10', householdKwh: { kind: 'entered', value: 200 }, deviceKwh: { kind: 'calculated', value: 150 },
        beforeWon: { kind: 'calculated', value: 31220 }, afterWon: { kind: 'calculated', value: 70640 }, differenceWon: { kind: 'calculated', value: 39420 },
        tariffCheckedAt: '2026-10-29', fuelAdjustmentPeriod: '2026-10-01~2026-12-31',
      },
    });
  });

  it('저장소를 다시 읽으면 같은 기록이 나오고, 손상되거나 태그가 바뀐 항목은 버린다', () => {
    const raw = JSON.stringify([record, { ...record, id: 'bad', normalizedKwh: { kind: 'official-test', value: 150 } }, { id: 'x' }, null]);
    expect(readHomeEnergyRecords(raw)).toEqual([record]);
    expect(readHomeEnergyRecords('{not json')).toEqual([]);
    expect(readHomeEnergyRecords(null)).toEqual([]);
    expect(readHomeEnergyRecords(JSON.stringify([{ ...record, declared: { ...record.declared, sourceUrl: 'https://example.com' } }]))).toEqual([]);
    expect(readHomeEnergyRecords(JSON.stringify(Array.from({ length: 60 }, (_, index) => ({ ...record, id: `r${index}` }))))).toHaveLength(MAX_HOME_ENERGY_RECORDS);
  });

  it('공단 신고값이나 요금을 고르지 않은 기록은 그 칸을 만들지 않는다', () => {
    const plain = createHomeEnergyRecord('rec-2', ready('3', '3'), { recordedAt: '2026-10-29' });
    expect(plain).not.toHaveProperty('declared');
    expect(plain).not.toHaveProperty('bill');
    expect(readHomeEnergyRecords(JSON.stringify([plain]))).toEqual([plain]);
  });

  it('내보낸 JSON에 값 종류 범례와 기록이 함께 들어간다', () => {
    const exported = JSON.parse(homeEnergyExportJson([record], '2026-10-29'));
    expect(exported).toMatchObject({ format: 'salimlab-home-energy-records', version: 1, exportedAt: '2026-10-29' });
    expect(exported.valueKinds).toEqual({ measured: '사용자 실측', entered: '사용자 입력', calculated: '계산값', 'official-test': '공식 시험값' });
    expect(exported.records).toEqual([record]);
  });

  it('요금을 계산한 기록 문구에는 입력·계산값 태그와 요금표 확인일·적용 기간이 들어간다', () => {
    const text = homeEnergyRecordText(result, { model: 'CTH06QBW', declared: 89.5, itemName: ENERGY_MEASUREMENTS.CTH06QBW.itemName, sourceUrl: ENERGY_MEASUREMENTS.CTH06QBW.sourceUrl, bill });
    expect(text).toContain('[사용자 입력] 기기 추가 전 가구 월 사용량: 200kWh (2026년 10월 사용분)');
    expect(text).toContain('[계산값] 기기 사용분을 더하기 전 요금: 31,220원 (200kWh)');
    expect(text).toContain('[계산값] 기기 사용분 150kWh를 더한 후 요금: 70,640원 (350kWh)');
    expect(text).toContain('[계산값] 추가 가정의 요금 차이: 39,420원');
    expect(text).toContain('이중 계산');
    expect(text).toContain('2026-10-29 확인, 연료비조정단가 2026년 4분기(10~12월분)(2026-10-01~2026-12-31 사용분)');
    expect(text).toContain('공단 신고 항목: 냉방기간월간소비전력량(kWh/월)(1:1기준)');
    expect(text).toContain('공식 시험 월간값으로는 요금을 계산하지 않았습니다');
  });
});

describe('우리 집 실측 전력 기록', () => {
  it('측정 날짜·환경 메모를 기록일과 구분해 저장·재읽기·재입력·내보내기·복사한다', () => {
    const input = { kwh: '8.4', days: '7', startDate: '2026-10-10', endDate: '2026-10-17', environmentNote: '주방 27℃\n냉장 3℃, <설정 기록>' };
    const result = calculateHomeEnergy(input, '2026-11-01');
    expect(result).toMatchObject({ kind: 'ready', normalizedKwh: 36, startDate: input.startDate, endDate: input.endDate, environmentNote: input.environmentNote });
    if (result.kind !== 'ready') throw new Error('ready expected');
    const saved = createHomeEnergyRecord('dated-1', result, { recordedAt: '2026-11-01', device: '냉장고' });
    expect(saved.recordedAt).toBe('2026-11-01');
    expect(readHomeEnergyRecords(JSON.stringify([saved]))).toEqual([saved]);
    expect(homeEnergyInputFromRecord(saved)).toEqual(input);
    const exported = JSON.parse(homeEnergyExportJson([saved], '2026-11-01'));
    expect(exported.version).toBe(1);
    expect(exported.records[0]).toMatchObject({ startDate: '2026-10-10', endDate: '2026-10-17', environmentNote: input.environmentNote });
    const text = homeEnergyRecordText(result, { recordedAt: saved.recordedAt });
    expect(text).toContain('기록일: 2026-11-01');
    expect(text).toContain('측정 시작·종료일: 2026-10-10 → 2026-10-17');
    expect(text).toContain(input.environmentNote);
  });

  it('날짜·메모가 없는 기존 v1 기록은 새 기록과 함께 읽어도 원본 그대로 유지한다', () => {
    const legacy = createHomeEnergyRecord('legacy', ready('1.4', '1'), { recordedAt: '2026-10-29', device: '냉장고' });
    const original = JSON.stringify(legacy);
    const result = calculateHomeEnergy({ kwh: '8.4', days: '7', startDate: '2026-10-10', endDate: '2026-10-17', environmentNote: '가을 주방' }, '2026-11-01');
    if (result.kind !== 'ready') throw new Error('ready expected');
    const newer = createHomeEnergyRecord('newer', result, { recordedAt: '2026-11-01' });
    const loaded = readHomeEnergyRecords(JSON.stringify([newer, legacy]));
    expect(JSON.stringify(loaded[1])).toBe(original);
    expect(loaded[1]).not.toHaveProperty('startDate');
    expect(homeEnergyInputFromRecord(loaded[1])).toMatchObject({ startDate: '', endDate: '', environmentNote: '' });
    expect(homeEnergyRecordText(ready('1.4', '1'))).toContain('측정 시작·종료일: 미기록');
  });

  it('날짜는 일수를 자동 변경하지 않고 양끝·실제 날짜·순서·일수·미래 날짜를 검증한다', () => {
    const base = { kwh: '8.4', days: '7' };
    for (const context of [
      { startDate: '2026-10-10' },
      { endDate: '2026-10-17' },
      { startDate: '2026-02-30', endDate: '2026-03-09' },
      { startDate: '2026-10-17', endDate: '2026-10-10' },
      { startDate: '2026-10-10', endDate: '2026-10-10' },
      { startDate: '2026-10-10', endDate: '2026-10-16' },
      { startDate: '2026-11-01', endDate: '2026-11-08' },
    ]) {
      const result = calculateHomeEnergy({ ...base, ...context }, '2026-11-01');
      expect(result.kind, JSON.stringify(context)).toBe('invalid');
      expect(result).not.toHaveProperty('normalizedKwh');
    }
    const leap = calculateHomeEnergy({ kwh: '2', days: '2', startDate: '2024-02-28', endDate: '2024-03-01' }, '2026-11-01');
    expect(leap).toMatchObject({ kind: 'ready', days: 2, normalizedKwh: 30 });
  });

  it('메모는 300자까지 보존하고 초과 길이나 잘못된 선택 메타데이터를 읽지 않는다', () => {
    const note = '가'.repeat(HOME_ENERGY_NOTE_MAX_LENGTH);
    const result = calculateHomeEnergy({ kwh: '1', days: '1', environmentNote: note });
    expect(result.kind).toBe('ready');
    if (result.kind !== 'ready') throw new Error('ready expected');
    const saved = createHomeEnergyRecord('notes', result, { recordedAt: '2026-11-01' });
    expect(readHomeEnergyRecords(JSON.stringify([saved]))[0].environmentNote).toBe(note);
    expect(calculateHomeEnergy({ kwh: '1', days: '1', environmentNote: note + '초' })).toMatchObject({ kind: 'invalid', fields: { environmentNote: expect.any(String) } });
    const legacy = createHomeEnergyRecord('legacy', ready('1', '1'), { recordedAt: '2026-11-01' });
    expect(readHomeEnergyRecords(JSON.stringify([{ ...saved, environmentNote: note + '초' }, legacy]))).toEqual([legacy]);
    expect(readHomeEnergyRecords(JSON.stringify([{ ...legacy, startDate: '2026-10-10' }, legacy]))).toEqual([legacy]);
  });

  it('기간을 30일로 환산하고 실측·계산·공식 시험값을 구별해 기록한다', () => {
    const result = calculateHomeEnergy({ kwh: '12.4', days: '7' });
    expect(result).toMatchObject({ kind: 'ready', normalizedKwh: 53.14 });
    if (result.kind !== 'ready') return;
    const text = homeEnergyRecordText(result, { device: '주방 냉장고', model: 'RF85C90D1AP', declared: 41.38, sourceUrl: 'https://example.com', checkedAt: '2026-10-27', recordedAt: '2026-10-29' });
    expect(text).toContain('측정한 기기: 주방 냉장고');
    expect(text).toContain('[사용자 실측] 7일 동안 12.4kWh');
    expect(text).toContain('[계산값] 30일 환산: 53.14kWh');
    expect(text).toContain('[공식 시험값] 선택 모델 RF85C90D1AP의 공단 월간 신고값: 41.38kWh/월 (2026-10-27 확인)');
    expect(text).toContain('기록일: 2026-10-29');
    expect(text).toContain('실제 요금이나 연간 사용량은 계산하지 않았습니다');
    expect(text).not.toMatch(/\d+원/);
  });

  it('모델을 고르지 않으면 공식값 줄을 만들지 않는다', () => {
    const result = calculateHomeEnergy({ kwh: '3', days: '3' });
    if (result.kind !== 'ready') throw new Error('ready expected');
    const text = homeEnergyRecordText(result);
    expect(text).toContain('측정한 기기: 미입력');
    expect(text).not.toContain('공식 시험값');
  });

  it('빈 값과 과도한 기간·잘못된 단위를 거부한다', () => {
    expect(calculateHomeEnergy({ kwh: '', days: '7' }).kind).toBe('empty');
    expect(calculateHomeEnergy({ kwh: '780W', days: '7' }).kind).toBe('invalid');
    expect(calculateHomeEnergy({ kwh: '12', days: '0' }).kind).toBe('invalid');
    expect(calculateHomeEnergy({ kwh: '12', days: '367' }).kind).toBe('invalid');
    expect(calculateHomeEnergy({ kwh: '0', days: '7' }).kind).toBe('invalid');
  });

  it('쉼표 소수점은 12로 읽지 않고 고칠 방법을 알려 준다', () => {
    const result = calculateHomeEnergy({ kwh: '1,2', days: '7' });
    expect(result.kind).toBe('invalid');
    if (result.kind !== 'invalid') return;
    expect(result.fields.kwh).toContain('마침표');
    expect(result.fields.days).toBeUndefined();
    expect(calculateHomeEnergy({ kwh: '1,234.5', days: '30' })).toMatchObject({ kind: 'ready', measuredKwh: 1234.5 });
    expect(calculateHomeEnergy({ kwh: '12.3456', days: '7' }).kind).toBe('invalid');
  });
});
