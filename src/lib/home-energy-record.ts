import { parsePlainNumber, valueTag } from '@/lib/value-kind';

export interface HomeEnergyInput { kwh: string; days: string }
export type HomeEnergyField = keyof HomeEnergyInput;
export type HomeEnergyResult =
  | { kind: 'empty'; message: string }
  | { kind: 'invalid'; message: string; fields: Partial<Record<HomeEnergyField, string>> }
  | { kind: 'ready'; measuredKwh: number; days: number; normalizedKwh: number };

export function calculateHomeEnergy(input: HomeEnergyInput): HomeEnergyResult {
  if (!input.kwh.trim() || !input.days.trim()) return { kind: 'empty', message: '계량기에서 읽은 누적 kWh와 측정 일수를 입력하세요.' };
  const measuredKwh = parsePlainNumber(input.kwh, 3);
  const days = /^\d+$/.test(input.days.trim()) ? Number(input.days.trim()) : null;
  const fields: Partial<Record<HomeEnergyField, string>> = {
    ...(measuredKwh === null || measuredKwh <= 0 || measuredKwh > 100_000
      ? { kwh: /^\d+,\d{1,2}$/.test(input.kwh.trim()) ? '소수점은 쉼표가 아닌 마침표로 입력하세요. 예: 1.2' : '0보다 큰 kWh 값을 숫자로 입력하세요. 소수는 셋째 자리까지, 예: 12.4' }
      : {}),
    ...(days === null || !Number.isSafeInteger(days) || days < 1 || days > 366 ? { days: '측정 기간은 1~366일의 정수로 입력하세요.' } : {}),
  };
  if (measuredKwh === null || days === null || fields.kwh || fields.days) {
    return { kind: 'invalid', message: '표시된 칸을 고치세요. 누적 사용량은 kWh, 측정 기간은 일 단위입니다.', fields };
  }
  return { kind: 'ready', measuredKwh, days, normalizedKwh: Math.round((measuredKwh * 30 / days + Number.EPSILON) * 100) / 100 };
}

export interface HomeEnergyRecordOptions { device?: string; model?: string; declared?: number; sourceUrl?: string; checkedAt?: string; recordedAt?: string }

export function homeEnergyRecordText(result: Extract<HomeEnergyResult, { kind: 'ready' }>, options: HomeEnergyRecordOptions = {}): string {
  const { device, model, declared, sourceUrl, checkedAt, recordedAt } = options;
  return [
    '살림랩 우리 집 전력 기록',
    ...(recordedAt ? [`기록일: ${recordedAt}`] : []),
    `측정한 기기: ${device?.trim() || '미입력'}`,
    `${valueTag('measured')} ${result.days}일 동안 ${result.measuredKwh}kWh`,
    `${valueTag('calculated')} 30일 환산: ${result.normalizedKwh.toFixed(2)}kWh (${result.measuredKwh} × 30 ÷ ${result.days})`,
    ...(model && declared !== undefined ? [`${valueTag('official-test')} 선택 모델 ${model}의 공단 월간 신고값: ${declared.toFixed(2)}kWh/월${checkedAt ? ` (${checkedAt} 확인)` : ''}`, `공식 자료: ${sourceUrl}`] : []),
    '30일 환산치는 측정 기간의 사용 패턴이 이어진다는 산술값입니다. 공식 시험 월간값과 측정 환경·기간이 다르며 실제 요금이나 연간 사용량은 계산하지 않았습니다.',
    'https://salimlab.kr/tools/home-energy',
  ].join('\n');
}
