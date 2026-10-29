/** 도구 결과와 저장 기록에서 숫자의 출처를 같은 이름으로 구별한다. */
export type ValueKind = 'official' | 'official-test' | 'measured' | 'entered' | 'calculated' | 'example' | 'unverified';

export const VALUE_KIND_LABELS: Record<ValueKind, string> = {
  official: '공식 자료',
  'official-test': '공식 시험값',
  measured: '사용자 실측',
  entered: '사용자 입력',
  calculated: '계산값',
  example: '예시값',
  unverified: '확인 필요',
};

export const valueTag = (kind: ValueKind) => `[${VALUE_KIND_LABELS[kind]}]`;

/** 기록에 남기는 날짜는 사용자의 현지 날짜다. */
export function localDateLabel(date = new Date()): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

/** 0보다 큰 수만 받는다. 천 단위 쉼표는 세 자리 묶음일 때만 허용해 1,2 같은 소수점 오기를 12로 읽지 않는다. */
export function parsePlainNumber(raw: string, maxDecimals: number): number | null {
  const value = raw.trim();
  const decimals = maxDecimals > 0 ? `(\\.\\d{1,${maxDecimals}})?` : '';
  if (!new RegExp(`^\\d+${decimals}$`).test(value) && !new RegExp(`^\\d{1,3}(,\\d{3})+${decimals}$`).test(value)) return null;
  const number = Number(value.replaceAll(',', ''));
  return Number.isFinite(number) ? number : null;
}
