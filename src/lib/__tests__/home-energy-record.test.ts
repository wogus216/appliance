import { describe, expect, it } from 'vitest';
import { ENERGY_MEASUREMENTS } from '@/lib/data/energy-measurements';
import { estimateBillDifference } from '@/lib/electricity-bill';
import {
  calculateHomeEnergy, createHomeEnergyRecord, homeEnergyExportJson, homeEnergyRecordText, readHomeEnergyRecords, MAX_HOME_ENERGY_RECORDS,
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
    expect(text).toContain('[사용자 입력] 고지서 가구 월 사용량: 200kWh (2026년 10월 사용분)');
    expect(text).toContain('[계산값] 기기 사용분을 더하기 전 요금: 31,220원 (200kWh)');
    expect(text).toContain('[계산값] 기기 사용분 150kWh를 더한 후 요금: 70,640원 (350kWh)');
    expect(text).toContain('[계산값] 요금 차이: 39,420원');
    expect(text).toContain('2026-10-29 확인, 연료비조정단가 2026년 4분기(10~12월분)(2026-10-01~2026-12-31 사용분)');
    expect(text).toContain('공단 신고 항목: 냉방기간월간소비전력량(kWh/월)(1:1기준)');
    expect(text).toContain('공식 시험 월간값으로는 요금을 계산하지 않았습니다');
  });
});

describe('우리 집 실측 전력 기록', () => {
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
