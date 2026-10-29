import { describe, expect, it } from 'vitest';
import { calculateHomeEnergy, homeEnergyRecordText } from '@/lib/home-energy-record';

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
