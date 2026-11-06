import { KEPCO_RESIDENTIAL_LOW } from '@/lib/data/kepco-tariff';
import type { BillDifference } from '@/lib/electricity-bill';
import { formatWon, usageMonthLabel } from '@/lib/electricity-bill';
import type { EnergyMeasurement } from '@/lib/energy-comparison';
import { localDateLabel, parsePlainNumber, valueTag, VALUE_KIND_LABELS, type ValueKind } from '@/lib/value-kind';

export const HOME_ENERGY_NOTE_MAX_LENGTH = 300;
export interface HomeEnergyInput { kwh: string; days: string; startDate?: string; endDate?: string; environmentNote?: string }
interface MeasurementContext { startDate?: string; endDate?: string; environmentNote?: string }
export type HomeEnergyField = keyof HomeEnergyInput;
export type HomeEnergyResult =
  | { kind: 'empty'; message: string }
  | { kind: 'invalid'; message: string; fields: Partial<Record<HomeEnergyField, string>> }
  | ({ kind: 'ready'; measuredKwh: number; days: number; normalizedKwh: number } & MeasurementContext);

function dateValue(value: string): number | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const parsed = Date.parse(`${value}T00:00:00.000Z`);
  return Number.isFinite(parsed) && new Date(parsed).toISOString().slice(0, 10) === value ? parsed : null;
}

function contextErrors(input: HomeEnergyInput, today?: string): Partial<Record<HomeEnergyField, string>> {
  const start = input.startDate?.trim() || '';
  const end = input.endDate?.trim() || '';
  const fields: Partial<Record<HomeEnergyField, string>> = {};
  if (start || end) {
    const startValue = dateValue(start);
    const endValue = dateValue(end);
    if (startValue === null) fields.startDate = '유효한 측정 시작일을 함께 입력하세요.';
    if (endValue === null) fields.endDate = '유효한 측정 종료일을 함께 입력하세요.';
    if (today && start > today) fields.startDate = '측정 시작일은 오늘 또는 이전 날짜로 입력하세요.';
    if (today && end > today) fields.endDate = '측정 종료일은 오늘 또는 이전 날짜로 입력하세요.';
    if (startValue !== null && endValue !== null) {
      if (endValue <= startValue) fields.endDate = '종료일은 시작일보다 뒤여야 합니다. 같은 시각 기준으로 24시간 이상 측정하세요.';
      else if (/^\d+$/.test(input.days.trim()) && (endValue - startValue) / 86_400_000 !== Number(input.days)) {
        fields.days = '같은 시각 기준의 시작·종료일 간격과 측정 일수를 맞추세요. 예: 10월 1일→8일은 7일입니다.';
      }
    }
  }
  if ((input.environmentNote?.length ?? 0) > HOME_ENERGY_NOTE_MAX_LENGTH) fields.environmentNote = `환경·설정 메모는 ${HOME_ENERGY_NOTE_MAX_LENGTH}자 이내로 입력하세요.`;
  return fields;
}

export function calculateHomeEnergy(input: HomeEnergyInput, today = localDateLabel()): HomeEnergyResult {
  if (!input.kwh.trim() || !input.days.trim()) return { kind: 'empty', message: '계량기에서 읽은 누적 kWh와 측정 일수를 입력하세요.' };
  const measuredKwh = parsePlainNumber(input.kwh, 3);
  const days = /^\d+$/.test(input.days.trim()) ? Number(input.days.trim()) : null;
  const fields: Partial<Record<HomeEnergyField, string>> = {
    ...(measuredKwh === null || measuredKwh <= 0 || measuredKwh > 100_000
      ? { kwh: /^\d+,\d{1,2}$/.test(input.kwh.trim()) ? '소수점은 쉼표가 아닌 마침표로 입력하세요. 예: 1.2' : '0보다 큰 kWh 값을 숫자로 입력하세요. 소수는 셋째 자리까지, 예: 12.4' }
      : {}),
    ...(days === null || !Number.isSafeInteger(days) || days < 1 || days > 366 ? { days: '측정 기간은 1~366일의 정수로 입력하세요.' } : {}),
    ...contextErrors(input, today),
  };
  if (measuredKwh === null || days === null || Object.keys(fields).length) {
    return { kind: 'invalid', message: '표시된 칸을 고치세요. 누적 사용량은 kWh, 측정 기간은 일 단위입니다.', fields };
  }
  return {
    kind: 'ready', measuredKwh, days, normalizedKwh: Math.round((measuredKwh * 30 / days + Number.EPSILON) * 100) / 100,
    ...(input.startDate?.trim() && input.endDate?.trim() ? { startDate: input.startDate.trim(), endDate: input.endDate.trim() } : {}),
    ...(input.environmentNote?.trim() ? { environmentNote: input.environmentNote.trim() } : {}),
  };
}

type ReadyBill = Extract<BillDifference, { kind: 'ready' }>;
export interface HomeEnergyRecordOptions {
  device?: string; model?: string; declared?: number; itemName?: string; sourceUrl?: string; checkedAt?: string; recordedAt?: string;
  bill?: ReadyBill;
}

const tariffLine = () => `요금표: ${KEPCO_RESIDENTIAL_LOW.name}, ${KEPCO_RESIDENTIAL_LOW.checkedAt} 확인, 연료비조정단가 ${KEPCO_RESIDENTIAL_LOW.fuelAdjustment.label}(${KEPCO_RESIDENTIAL_LOW.fuelAdjustment.from}~${KEPCO_RESIDENTIAL_LOW.fuelAdjustment.to} 사용분). 복지할인 감액은 넣지 않았습니다.`;

function billLines(bill: ReadyBill): string[] {
  return [
    '요금 계산 목적: 기기 사용분이 포함되지 않은 가구 사용량에 기기를 추가하는 가정',
    `${valueTag('entered')} 기기 추가 전 가구 월 사용량: ${bill.householdKwh.toLocaleString('ko-KR')}kWh (${usageMonthLabel(bill.usageMonth)} 사용분)`,
    `${valueTag('calculated')} 기기 사용분을 더하기 전 요금: ${formatWon(bill.before.total)} (${bill.before.kwh.toLocaleString('ko-KR')}kWh)`,
    `${valueTag('calculated')} 기기 사용분 ${bill.deviceKwh}kWh를 더한 후 요금: ${formatWon(bill.after.total)} (${bill.after.kwh.toLocaleString('ko-KR')}kWh)`,
    `${valueTag('calculated')} 추가 가정의 요금 차이: ${formatWon(bill.difference)}`,
    tariffLine(),
  ];
}

export function homeEnergyRecordText(result: Extract<HomeEnergyResult, { kind: 'ready' }>, options: HomeEnergyRecordOptions = {}): string {
  const { device, model, declared, itemName, sourceUrl, checkedAt, recordedAt, bill } = options;
  return [
    '살림랩 우리 집 전력 기록',
    ...(recordedAt ? [`기록일: ${recordedAt}`] : []),
    `측정한 기기: ${device?.trim() || '미입력'}`,
    ...(result.startDate && result.endDate ? [`${valueTag('entered')} 측정 시작·종료일: ${result.startDate} → ${result.endDate} (같은 시각 기준)`] : ['측정 시작·종료일: 미기록']),
    ...(result.environmentNote ? [`${valueTag('entered')} 환경·설정 메모: ${result.environmentNote}`] : []),
    `${valueTag('measured')} ${result.days}일 동안 ${result.measuredKwh}kWh`,
    `${valueTag('calculated')} 30일 환산: ${result.normalizedKwh.toFixed(2)}kWh (${result.measuredKwh} × 30 ÷ ${result.days})`,
    ...(model && declared !== undefined ? [`${valueTag('official-test')} 선택 모델 ${model}의 공단 월간 신고값: ${declared.toFixed(2)}kWh/월${checkedAt ? ` (${checkedAt} 확인)` : ''}`, ...(itemName ? [`공단 신고 항목: ${itemName}`] : []), `공식 자료: ${sourceUrl}`] : []),
    ...(bill ? billLines(bill) : []),
    bill
      ? '30일 환산치는 측정 기간의 사용 패턴이 이어진다는 산술값입니다. 요금 차이는 기기 추가 가정의 계산이며 이 기기만의 실제 청구액이 아닙니다. 이미 기기 사용분이 포함된 가구 사용량에 더하면 이중 계산됩니다. 공식 시험 월간값으로는 요금을 계산하지 않았습니다.'
      : '30일 환산치는 측정 기간의 사용 패턴이 이어진다는 산술값입니다. 공식 시험 월간값과 측정 환경·기간이 다르며 실제 요금이나 연간 사용량은 계산하지 않았습니다.',
    'https://salimlab.kr/tools/home-energy',
  ].join('\n');
}

// ── 브라우저 저장 기록 ──────────────────────────────────────────────

export const HOME_ENERGY_STORAGE_KEY = 'salimlab-home-energy-records-v1';
export const MAX_HOME_ENERGY_RECORDS = 50;

/** 저장 기록의 숫자마다 값의 종류를 함께 둔다. 내보낸 JSON에서도 실측·계산·공식 시험값을 구별할 수 있게 한다. */
export interface Tagged<K extends ValueKind> { kind: K; value: number }

export interface SavedHomeEnergyRecord extends MeasurementContext {
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
    ...(result.startDate && result.endDate ? { startDate: result.startDate, endDate: result.endDate } : {}),
    ...(result.environmentNote ? { environmentNote: result.environmentNote } : {}),
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
  if ((value.startDate !== undefined && !isString(value.startDate, 10)) || (value.endDate !== undefined && !isString(value.endDate, 10)) || (value.environmentNote !== undefined && !isString(value.environmentNote, HOME_ENERGY_NOTE_MAX_LENGTH))) return false;
  const fields = contextErrors({ days: String((value.days as Tagged<'measured'>).value), kwh: '', startDate: value.startDate as string | undefined, endDate: value.endDate as string | undefined, environmentNote: value.environmentNote as string | undefined });
  if (Object.keys(fields).length) return false;
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

/** 다시 입력할 때도 오래된 기록에 측정일을 채우지 않고, 원래 카드는 바꾸지 않는다. */
export function homeEnergyInputFromRecord(record: SavedHomeEnergyRecord): HomeEnergyInput {
  return { kwh: String(record.measuredKwh.value), days: String(record.days.value), startDate: record.startDate ?? '', endDate: record.endDate ?? '', environmentNote: record.environmentNote ?? '' };
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
    note: '30일 환산치와 요금은 계산값입니다. 요금 차이는 기기 사용분이 아직 포함되지 않은 가구 사용량에 기기를 추가하는 가정이며 이 기기만의 실제 청구액이 아닙니다. 이미 포함된 사용분을 더하면 이중 계산됩니다. 공단 신고값은 공식 시험 조건의 값이며 집의 실측값이 아닙니다.',
    records,
  }, null, 2);
}
