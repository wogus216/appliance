import { KEPCO_RESIDENTIAL_LOW } from '@/lib/data/kepco-tariff';
import type { BillDifference } from '@/lib/electricity-bill';
import { formatWon, usageMonthLabel } from '@/lib/electricity-bill';
import type { EnergyMeasurement } from '@/lib/energy-comparison';
import { parsePlainNumber, valueTag, VALUE_KIND_LABELS, type ValueKind } from '@/lib/value-kind';

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

type ReadyBill = Extract<BillDifference, { kind: 'ready' }>;
export interface HomeEnergyRecordOptions {
  device?: string; model?: string; declared?: number; itemName?: string; sourceUrl?: string; checkedAt?: string; recordedAt?: string;
  bill?: ReadyBill;
}

const tariffLine = () => `요금표: ${KEPCO_RESIDENTIAL_LOW.name}, ${KEPCO_RESIDENTIAL_LOW.checkedAt} 확인, 연료비조정단가 ${KEPCO_RESIDENTIAL_LOW.fuelAdjustment.label}(${KEPCO_RESIDENTIAL_LOW.fuelAdjustment.from}~${KEPCO_RESIDENTIAL_LOW.fuelAdjustment.to} 사용분). 복지할인 감액은 넣지 않았습니다.`;

function billLines(bill: ReadyBill): string[] {
  return [
    `${valueTag('entered')} 고지서 가구 월 사용량: ${bill.householdKwh.toLocaleString('ko-KR')}kWh (${usageMonthLabel(bill.usageMonth)} 사용분)`,
    `${valueTag('calculated')} 기기 사용분을 더하기 전 요금: ${formatWon(bill.before.total)} (${bill.before.kwh.toLocaleString('ko-KR')}kWh)`,
    `${valueTag('calculated')} 기기 사용분 ${bill.deviceKwh}kWh를 더한 후 요금: ${formatWon(bill.after.total)} (${bill.after.kwh.toLocaleString('ko-KR')}kWh)`,
    `${valueTag('calculated')} 요금 차이: ${formatWon(bill.difference)}`,
    tariffLine(),
  ];
}

export function homeEnergyRecordText(result: Extract<HomeEnergyResult, { kind: 'ready' }>, options: HomeEnergyRecordOptions = {}): string {
  const { device, model, declared, itemName, sourceUrl, checkedAt, recordedAt, bill } = options;
  return [
    '살림랩 우리 집 전력 기록',
    ...(recordedAt ? [`기록일: ${recordedAt}`] : []),
    `측정한 기기: ${device?.trim() || '미입력'}`,
    `${valueTag('measured')} ${result.days}일 동안 ${result.measuredKwh}kWh`,
    `${valueTag('calculated')} 30일 환산: ${result.normalizedKwh.toFixed(2)}kWh (${result.measuredKwh} × 30 ÷ ${result.days})`,
    ...(model && declared !== undefined ? [`${valueTag('official-test')} 선택 모델 ${model}의 공단 월간 신고값: ${declared.toFixed(2)}kWh/월${checkedAt ? ` (${checkedAt} 확인)` : ''}`, ...(itemName ? [`공단 신고 항목: ${itemName}`] : []), `공식 자료: ${sourceUrl}`] : []),
    ...(bill ? billLines(bill) : []),
    bill
      ? '30일 환산치는 측정 기간의 사용 패턴이 이어진다는 산술값입니다. 요금 차이는 이 환산치를 고지서 사용량에 더한 요금표 계산값이며 실제 고지서와 다를 수 있습니다. 공식 시험 월간값으로는 요금을 계산하지 않았습니다.'
      : '30일 환산치는 측정 기간의 사용 패턴이 이어진다는 산술값입니다. 공식 시험 월간값과 측정 환경·기간이 다르며 실제 요금이나 연간 사용량은 계산하지 않았습니다.',
    'https://salimlab.kr/tools/home-energy',
  ].join('\n');
}

// ── 브라우저 저장 기록 ──────────────────────────────────────────────

export const HOME_ENERGY_STORAGE_KEY = 'salimlab-home-energy-records-v1';
export const MAX_HOME_ENERGY_RECORDS = 50;

/** 저장 기록의 숫자마다 값의 종류를 함께 둔다. 내보낸 JSON에서도 실측·계산·공식 시험값을 구별할 수 있게 한다. */
export interface Tagged<K extends ValueKind> { kind: K; value: number }

export interface SavedHomeEnergyRecord {
  id: string;
  recordedAt: string;
  device: string;
  measuredKwh: Tagged<'measured'>;
  days: Tagged<'measured'>;
  normalizedKwh: Tagged<'calculated'>;
  declared?: Tagged<'official-test'> & { modelNumber: string; unit: 'kWh/월'; itemName: string; sourceUrl: string; checkedAt: string };
  bill?: {
    usageMonth: string;
    householdKwh: Tagged<'entered'>;
    deviceKwh: Tagged<'calculated'>;
    beforeWon: Tagged<'calculated'>;
    afterWon: Tagged<'calculated'>;
    differenceWon: Tagged<'calculated'>;
    tariffCheckedAt: string;
    fuelAdjustmentPeriod: string;
  };
}

const tag = <K extends ValueKind>(kind: K, value: number): Tagged<K> => ({ kind, value });

export function createHomeEnergyRecord(
  id: string,
  result: Extract<HomeEnergyResult, { kind: 'ready' }>,
  options: { device?: string; recordedAt: string; declared?: EnergyMeasurement; bill?: ReadyBill },
): SavedHomeEnergyRecord {
  const { declared, bill } = options;
  return {
    id,
    recordedAt: options.recordedAt,
    device: options.device?.trim().slice(0, 40) ?? '',
    measuredKwh: tag('measured', result.measuredKwh),
    days: tag('measured', result.days),
    normalizedKwh: tag('calculated', result.normalizedKwh),
    ...(declared ? { declared: { ...tag('official-test', declared.value), modelNumber: declared.modelNumber, unit: 'kWh/월' as const, itemName: declared.itemName, sourceUrl: declared.sourceUrl, checkedAt: declared.checkedAt } } : {}),
    ...(bill ? {
      bill: {
        usageMonth: bill.usageMonth,
        householdKwh: tag('entered', bill.householdKwh),
        deviceKwh: tag('calculated', bill.deviceKwh),
        beforeWon: tag('calculated', bill.before.total),
        afterWon: tag('calculated', bill.after.total),
        differenceWon: tag('calculated', bill.difference),
        tariffCheckedAt: KEPCO_RESIDENTIAL_LOW.checkedAt,
        fuelAdjustmentPeriod: `${KEPCO_RESIDENTIAL_LOW.fuelAdjustment.from}~${KEPCO_RESIDENTIAL_LOW.fuelAdjustment.to}`,
      },
    } : {}),
  };
}

const isRecord = (value: unknown): value is Record<string, unknown> => !!value && typeof value === 'object' && !Array.isArray(value);
const isTagged = (value: unknown, kind: ValueKind) => isRecord(value) && value.kind === kind && typeof value.value === 'number' && Number.isFinite(value.value);
const isString = (value: unknown, max = 200) => typeof value === 'string' && value.length <= max;
const isDate = (value: unknown) => typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value);

function isSavedRecord(value: unknown): value is SavedHomeEnergyRecord {
  if (!isRecord(value)) return false;
  if (typeof value.id !== 'string' || !/^[a-zA-Z0-9_-]{1,80}$/.test(value.id)) return false;
  if (!isDate(value.recordedAt) || !isString(value.device, 40)) return false;
  if (!isTagged(value.measuredKwh, 'measured') || !isTagged(value.days, 'measured') || !isTagged(value.normalizedKwh, 'calculated')) return false;
  if (value.declared !== undefined) {
    const declared = value.declared;
    if (!isTagged(declared, 'official-test') || !isRecord(declared)) return false;
    if (!isString(declared.modelNumber, 40) || declared.unit !== 'kWh/월' || !isString(declared.itemName) || !isDate(declared.checkedAt)) return false;
    if (typeof declared.sourceUrl !== 'string' || !declared.sourceUrl.startsWith('https://eep.energy.or.kr/')) return false;
  }
  if (value.bill !== undefined) {
    const bill = value.bill;
    if (!isRecord(bill) || typeof bill.usageMonth !== 'string' || !/^\d{4}-\d{2}$/.test(bill.usageMonth)) return false;
    if (!isTagged(bill.householdKwh, 'entered') || !isTagged(bill.deviceKwh, 'calculated')) return false;
    if (!isTagged(bill.beforeWon, 'calculated') || !isTagged(bill.afterWon, 'calculated') || !isTagged(bill.differenceWon, 'calculated')) return false;
    if (!isDate(bill.tariffCheckedAt) || !isString(bill.fuelAdjustmentPeriod, 40)) return false;
  }
  return true;
}

/** 손상되거나 다른 형식의 항목은 버리고 나머지만 읽는다. */
export function readHomeEnergyRecords(raw: string | null): SavedHomeEnergyRecord[] {
  if (!raw) return [];
  try {
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.slice(0, MAX_HOME_ENERGY_RECORDS).filter(isSavedRecord) : [];
  } catch { return []; }
}

export function homeEnergyExportJson(records: SavedHomeEnergyRecord[], exportedAt: string): string {
  const kinds: ValueKind[] = ['measured', 'entered', 'calculated', 'official-test'];
  return JSON.stringify({
    format: 'salimlab-home-energy-records',
    version: 1,
    exportedAt,
    source: 'https://salimlab.kr/tools/home-energy',
    valueKinds: Object.fromEntries(kinds.map((kind) => [kind, VALUE_KIND_LABELS[kind]])),
    note: '30일 환산치와 요금은 계산값입니다. 공단 신고값은 공식 시험 조건의 값이며 집의 실측값이 아닙니다.',
    records,
  }, null, 2);
}
