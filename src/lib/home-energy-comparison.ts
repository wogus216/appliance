import type { SavedHomeEnergyRecord } from '@/lib/home-energy-record';
import { valueTag } from '@/lib/value-kind';

export const HOME_ENERGY_COMPARISON_NOTE = '측정 기간의 사용 패턴이 이어진다는 산술 비교입니다. 기온·설정·사용 횟수 등이 달라질 수 있어 차이를 절약 효과나 고장으로 단정하지 않습니다. 실제 요금 차이는 계산하지 않습니다.';

export type HomeEnergyComparison =
  | { kind: 'unavailable'; message: string }
  | { kind: 'ready'; a: SavedHomeEnergyRecord; b: SavedHomeEnergyRecord; dailyA: number; dailyB: number; dailyDifference: number; monthlyDifference: number; percentDifference: number; cautions: string[] };

function usable(record: SavedHomeEnergyRecord): boolean {
  return Number.isFinite(record.measuredKwh.value) && record.measuredKwh.value > 0 && record.measuredKwh.value <= 100_000
    && Number.isInteger(record.days.value) && record.days.value >= 1 && record.days.value <= 366;
}

/** 반올림된 30일 저장값을 빼지 않고 원래 누적량/일수로 먼저 기간을 맞춘다. */
export function compareHomeEnergyRecords(a?: SavedHomeEnergyRecord, b?: SavedHomeEnergyRecord): HomeEnergyComparison {
  if (!a || !b) return { kind: 'unavailable', message: '기준 기록 A와 비교 기록 B를 하나씩 골라 주세요. 삭제된 기록은 다시 선택해야 합니다.' };
  if (a.id === b.id) return { kind: 'unavailable', message: '서로 다른 기록 두 개를 골라 주세요.' };
  if (!usable(a) || !usable(b)) return { kind: 'unavailable', message: '측정량이나 일수가 유효하지 않은 기록이 있습니다. 원래 측정값을 확인해 다시 저장하세요.' };
  const dailyA = a.measuredKwh.value / a.days.value;
  const dailyB = b.measuredKwh.value / b.days.value;
  const delta = dailyB - dailyA;
  const dailyDifference = Math.abs(delta) <= Number.EPSILON * Math.max(1, dailyA, dailyB) * 4 ? 0 : delta;
  const cautions: string[] = [];
  if (!a.device.trim() || !b.device.trim()) cautions.push('기기 이름이 없는 기록이 있습니다. 같은 기기를 비교하려면 먼저 실제 측정 대상을 확인하세요.');
  else if (a.device.trim() !== b.device.trim()) cautions.push('기기 이름이 서로 다릅니다. 기기·용량·사용 목적이 다르면 사용량 차이를 효율 차이로 읽을 수 없습니다.');
  else cautions.push('기기 이름이 같아도 같은 기기를 잰 기록인지 확인하세요.');
  if (a.declared && b.declared && a.declared.modelNumber !== b.declared.modelNumber) cautions.push('기록에 선택한 참고 모델도 서로 다릅니다. 공단 시험값은 이 차이 계산에 사용하지 않았습니다.');
  if (!a.startDate || !a.endDate || !b.startDate || !b.endDate) cautions.push('측정 시작·종료일이 미기록인 항목이 있습니다. 기록일을 측정일로 대신 쓰지 않습니다.');
  else if (a.startDate < b.endDate && b.startDate < a.endDate) cautions.push('측정 기간이 겹칩니다. 같은 기기의 독립된 전후 측정인지 확인하세요.');
  if (!a.environmentNote?.trim() || !b.environmentNote?.trim()) cautions.push('환경·설정 메모가 없는 기록이 있습니다. 온도·설정·사용 횟수 등의 조건 차이를 확인할 수 없습니다.');
  return { kind: 'ready', a, b, dailyA, dailyB, dailyDifference, monthlyDifference: dailyDifference * 30, percentDifference: dailyDifference / dailyA * 100, cautions };
}

/** 작은 차이를 반올림해서 0으로 표시하지 않는다. */
export function energyAmountText(value: number, digits: number, unit = 'kWh'): string {
  const minimum = 10 ** -digits;
  return value > 0 && value < minimum ? `${minimum.toFixed(digits)}${unit} 미만` : `${value.toFixed(digits)}${unit}`;
}

export function energyDifferenceText(value: number, digits: number, unit: string): string {
  if (value === 0) return `차이 0${unit}`;
  const amount = energyAmountText(Math.abs(value), digits, unit);
  return `${amount} ${value > 0 ? '많음' : '적음'}`;
}

export function homeEnergyComparisonText(comparison: Extract<HomeEnergyComparison, { kind: 'ready' }>): string {
  return [
    '살림랩 저장한 전력 기록 두 개 비교',
    ...([['A · 기준', comparison.a, comparison.dailyA], ['B · 비교', comparison.b, comparison.dailyB]] as const).flatMap(([label, record, daily]) => [
      `${label}: ${record.device || '이름 없는 기기'} · 기록일 ${record.recordedAt}`,
      `측정 시작·종료일: ${record.startDate && record.endDate ? `${record.startDate} → ${record.endDate} (같은 시각 기준)` : '미기록'}`,
      `${valueTag('measured')} ${record.days.value}일 동안 ${record.measuredKwh.value}kWh`,
      `${valueTag('calculated')} 하루 평균: ${energyAmountText(daily, 3)} · 30일 환산: ${energyAmountText(daily * 30, 2)}`,
      `환경·설정 메모: ${record.environmentNote || '미기록'}`,
      ...(record.declared ? [`선택한 참고 모델: ${record.declared.modelNumber} (공단 시험값은 차이 계산에서 제외)`] : []),
    ]),
    `B − A ${valueTag('calculated')} 하루 평균: ${energyDifferenceText(comparison.dailyDifference, 3, 'kWh')}`,
    `B − A ${valueTag('calculated')} 30일 환산: ${energyDifferenceText(comparison.monthlyDifference, 2, 'kWh')}`,
    `A의 하루 평균 대비 ${valueTag('calculated')} 변화율: ${energyDifferenceText(comparison.percentDifference, 1, '%')}`,
    '계산: 하루 평균 = 누적 kWh ÷ 측정 일수; 차이 = B − A; 30일 환산 차이 = 하루 평균 차이 × 30. 반올림 전 값으로 계산합니다.',
    ...comparison.cautions.map((note) => `확인할 조건: ${note}`),
    HOME_ENERGY_COMPARISON_NOTE,
    'https://salimlab.kr/tools/home-energy',
  ].join('\n');
}
