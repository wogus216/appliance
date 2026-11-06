import { describe, expect, it } from 'vitest';
import { calculateHomeEnergy, createHomeEnergyRecord } from '@/lib/home-energy-record';
import { compareHomeEnergyRecords, energyAmountText, energyDifferenceText, homeEnergyComparisonText } from '@/lib/home-energy-comparison';

function record(id: string, kwh: string, days: string, device = '주방 냉장고') {
  const result = calculateHomeEnergy({ kwh, days });
  if (result.kind !== 'ready') throw new Error('invalid fixture');
  return createHomeEnergyRecord(id, result, { device, recordedAt: '2026-11-01' });
}

describe('저장한 실측 전력 기록 비교', () => {
  it('누적량이 큰 B도 측정 기간을 맞추면 하루 평균이 작을 수 있다', () => {
    const a = { ...record('a', '8.4', '7'), normalizedKwh: { kind: 'calculated' as const, value: 999 } };
    const b = record('b', '30', '30');
    const original = JSON.stringify([a, b]);
    const result = compareHomeEnergyRecords(a, b);
    expect(result.kind).toBe('ready');
    if (result.kind !== 'ready') throw new Error('ready expected');
    expect(result.dailyA).toBeCloseTo(1.2);
    expect(result.dailyB).toBe(1);
    expect(result.dailyDifference).toBeCloseTo(-0.2);
    expect(result.monthlyDifference).toBeCloseTo(-6);
    expect(result.percentDifference).toBeCloseTo(-16.6666667);
    expect(JSON.stringify([a, b])).toBe(original);
    const copied = homeEnergyComparisonText(result);
    expect(copied).toContain('0.200kWh 적음');
    expect(copied).toContain('6.00kWh 적음');
    expect(copied).toContain('16.7% 적음');
    expect(copied).toContain('측정 시작·종료일: 미기록');
    expect(copied).toContain('환경·설정 메모: 미기록');
    expect(copied).toContain('실제 요금 차이는 계산하지 않습니다');
    expect(copied).not.toMatch(/\d+원/);
  });

  it('기준과 비교를 뒤집으면 부호와 변화율 분모가 바뀐다', () => {
    const result = compareHomeEnergyRecords(record('b', '30', '30'), record('a', '8.4', '7'));
    if (result.kind !== 'ready') throw new Error('ready expected');
    expect(result.monthlyDifference).toBeCloseTo(6);
    expect(result.percentDifference).toBeCloseTo(20);
    expect(energyDifferenceText(result.percentDifference, 1, '%')).toBe('20.0% 많음');
  });

  it('같은 비율의 실측은 부동소수점 잔차를 차이로 표시하지 않는다', () => {
    const result = compareHomeEnergyRecords(record('a', '1.2', '1'), record('b', '8.4', '7'));
    expect(result).toMatchObject({ kind: 'ready', dailyDifference: 0, monthlyDifference: 0, percentDifference: 0 });
    expect(energyDifferenceText(0, 3, 'kWh')).toBe('차이 0kWh');
  });

  it('반올림하면 같은 값이 되는 아주 작은 실제 차이는 0으로 바꾸지 않는다', () => {
    const result = compareHomeEnergyRecords(record('a', '0.001', '365'), record('b', '0.001', '366'));
    if (result.kind !== 'ready') throw new Error('ready expected');
    expect(result.dailyDifference).toBeLessThan(0);
    expect(energyDifferenceText(result.dailyDifference, 3, 'kWh')).toBe('0.001kWh 미만 적음');
    expect(energyAmountText(result.dailyA, 3)).toBe('0.001kWh 미만');
  });

  it('누락·같은 기록·손상된 숫자를 비교하지 않는다', () => {
    const a = record('a', '10', '5');
    expect(compareHomeEnergyRecords(a).kind).toBe('unavailable');
    expect(compareHomeEnergyRecords(a, a).kind).toBe('unavailable');
    for (const value of [0, -1, Infinity, NaN, 100001]) expect(compareHomeEnergyRecords(a, { ...a, id: 'b', measuredKwh: { kind: 'measured', value } }).kind).toBe('unavailable');
    for (const value of [0, -1, 1.5, 367]) expect(compareHomeEnergyRecords(a, { ...a, id: 'b', days: { kind: 'measured', value } }).kind).toBe('unavailable');
  });

  it('기기명·겹친 측정일·메모를 보존하고 누락 조건을 구분한다', () => {
    const a = { ...record('a', '8.4', '7'), startDate: '2026-10-01', endDate: '2026-10-08', environmentNote: '주방 27℃\n냉장 3℃' };
    const b = { ...record('b', '7', '7', '거실 냉장고'), startDate: '2026-10-04', endDate: '2026-10-11', environmentNote: '거실 24℃' };
    const result = compareHomeEnergyRecords(a, b);
    if (result.kind !== 'ready') throw new Error('ready expected');
    expect(result.cautions.join('\n')).toContain('기기 이름이 서로 다릅니다');
    expect(result.cautions.join('\n')).toContain('측정 기간이 겹칩니다');
    expect(result.cautions.join('\n')).not.toContain('미기록');
    const text = homeEnergyComparisonText(result);
    expect(text).toContain('2026-10-01 → 2026-10-08');
    expect(text).toContain(a.environmentNote);
    const adjacent = compareHomeEnergyRecords(a, { ...b, startDate: '2026-10-08', endDate: '2026-10-15' });
    if (adjacent.kind !== 'ready') throw new Error('ready expected');
    expect(adjacent.cautions.join('\n')).not.toContain('기간이 겹칩니다');
  });
});
