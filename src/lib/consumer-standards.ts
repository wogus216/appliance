import { addCalendarMonths } from '@/lib/care-plan';
import { CONSUMER_STANDARD_NOTICE, getStandardItem, type StandardItem, type StandardItemId } from '@/lib/data/consumer-standards';
import { isoDateValue } from '@/lib/iso-date';
import { valueTag } from '@/lib/value-kind';

/** 품질보증기간의 기산 기준. 시행령 [별표 1] 4호 라목(구입·인도·교환)과 마목(판매일 확인 곤란). */
export type WarrantyBasis = 'purchase' | 'delivery' | 'exchange' | 'unknown-sale';
export type SaleDateSource = 'manufacture' | 'customs';

export const WARRANTY_BASIS_OPTIONS: { value: WarrantyBasis; label: string; dateLabel: string }[] = [
  { value: 'purchase', label: '구입일', dateLabel: '구입일' },
  { value: 'delivery', label: '인도일(계약일과 받은 날이 다를 때)', dateLabel: '제품을 인도받은 날' },
  { value: 'exchange', label: '교환받은 날(교환받은 제품)', dateLabel: '교환받은 날' },
  { value: 'unknown-sale', label: '판매일 확인 곤란(보증서·영수증 없음 등)', dateLabel: '제조일 또는 수입통관일' },
];

export interface StandardInput {
  itemId: StandardItemId | '';
  basis: WarrantyBasis;
  /** 고른 기산 기준의 날짜. 판매일 확인 곤란이면 제조일 또는 수입통관일. */
  basisDate: string;
  saleDateSource: SaleDateSource;
  /** 명판의 제조일 표기. 연도·연월·일자 중 적힌 만큼. */
  manufactureLabel: string;
  /** 보증서에 적힌 제조사 보증 종료일(사용자 입력). */
  makerWarrantyEnd: string;
}

export const EMPTY_STANDARD_INPUT: StandardInput = { itemId: '', basis: 'purchase', basisDate: '', saleDateSource: 'manufacture', manufactureLabel: '', makerWarrantyEnd: '' };

export type WarrantyOutcome =
  | { kind: 'ready'; years: number; start: string; end: string; startLabel: string }
  | { kind: 'empty' | 'invalid'; years: number; message: string }
  | { kind: 'not-listed' };

export type PartsOutcome =
  | { kind: 'ready'; years: number; manufactureDate: string; end: string; note: string }
  | { kind: 'empty' | 'invalid'; years: number; message: string }
  | { kind: 'not-listed' };

export interface StandardResolution { item: StandardItem; warranty: WarrantyOutcome; parts: PartsOutcome; makerShorter: boolean }

const lastDayOfMonth = (year: number, month: number) => new Date(Date.UTC(year, month, 0)).getUTCDate();
const pad = (value: number) => String(value).padStart(2, '0');

/** 명판의 제조일 표기를 제조일자로 바꾼다. 연도·연월만 있으면 고시 [별표 Ⅲ] 주석대로 그 해·그 달의 말일로 본다. */
export function parseManufactureLabel(raw: string): { date: string; earliest: string; note: string } | undefined {
  const match = raw.trim().match(/^(\d{4})(?:\s*[-./년]\s*(\d{1,2})(?:\s*[-./월]\s*(\d{1,2}))?)?\s*[.년월일]?$/);
  if (!match) return undefined;
  const year = Number(match[1]);
  if (!match[2]) {
    const date = `${year}-12-31`;
    return isoDateValue(date) === undefined ? undefined : { date, earliest: `${year}-01-01`, note: `제조연도만 있어 ${year}년의 말일을 제조일자로 봄` };
  }
  const month = Number(match[2]);
  if (month < 1 || month > 12) return undefined;
  if (!match[3]) {
    const date = `${year}-${pad(month)}-${pad(lastDayOfMonth(year, month))}`;
    return isoDateValue(date) === undefined ? undefined : { date, earliest: `${year}-${pad(month)}-01`, note: '제조연월만 있어 그 달의 말일을 제조일자로 봄' };
  }
  const date = `${year}-${pad(month)}-${pad(Number(match[3]))}`;
  return isoDateValue(date) === undefined ? undefined : { date, earliest: date, note: '명판의 제조일' };
}

/** 품질보증기간을 세기 시작하는 날. 판매일 확인 곤란이면 제조일·수입통관일에서 3개월 뒤 같은 날짜(말일 넘김은 그 달 말일). */
export function warrantyStart(basis: WarrantyBasis, date: string, source: SaleDateSource): { start: string; label: string } | undefined {
  if (isoDateValue(date) === undefined) return undefined;
  if (basis !== 'unknown-sale') return { start: date, label: `${WARRANTY_BASIS_OPTIONS.find((option) => option.value === basis)!.dateLabel} ${date}` };
  const start = addCalendarMonths(date, 3);
  return start ? { start, label: `${source === 'manufacture' ? '제조일' : '수입통관일'} ${date}부터 3개월이 지난 ${start}` } : undefined;
}

export function resolveStandard(input: StandardInput, today?: string): StandardResolution | undefined {
  const item = input.itemId ? getStandardItem(input.itemId) : undefined;
  if (!item) return undefined;
  if (!item.row) return { item, warranty: { kind: 'not-listed' }, parts: { kind: 'not-listed' }, makerShorter: false };
  const { warrantyYears, partsYears } = item.row;

  let warranty: WarrantyOutcome;
  if (!input.basisDate) warranty = { kind: 'empty', years: warrantyYears, message: '기산 기준의 날짜를 넣으면 고시 기간의 종료일을 계산합니다.' };
  else if (isoDateValue(input.basisDate) === undefined || (today && input.basisDate > today)) warranty = { kind: 'invalid', years: warrantyYears, message: '기산 기준 날짜는 오늘 또는 이전의 실제 날짜로 넣으세요.' };
  else {
    const start = warrantyStart(input.basis, input.basisDate, input.saleDateSource);
    const end = start && addCalendarMonths(start.start, warrantyYears * 12);
    warranty = start && end ? { kind: 'ready', years: warrantyYears, start: start.start, end, startLabel: start.label } : { kind: 'invalid', years: warrantyYears, message: '이 날짜로는 종료일을 계산할 수 없습니다.' };
  }

  let parts: PartsOutcome;
  if (!input.manufactureLabel.trim()) parts = { kind: 'empty', years: partsYears, message: '부품보유기간은 제조일부터 셉니다. 명판의 제조일을 넣을 때만 종료일을 계산하고, 구입일로 대신하지 않습니다.' };
  else {
    const manufacture = parseManufactureLabel(input.manufactureLabel);
    const end = manufacture && (!today || manufacture.earliest <= today) ? addCalendarMonths(manufacture.date, partsYears * 12) : undefined;
    parts = manufacture && end ? { kind: 'ready', years: partsYears, manufactureDate: manufacture.date, end, note: manufacture.note } : { kind: 'invalid', years: partsYears, message: '제조일은 2024, 2024-03, 2024-03-15처럼 명판에 적힌 만큼 넣으세요.' };
  }

  const makerShorter = warranty.kind === 'ready' && isoDateValue(input.makerWarrantyEnd) !== undefined && input.makerWarrantyEnd < warranty.end;
  return { item, warranty, parts, makerShorter };
}

export const PERIOD_END_CAVEAT = '종료일은 기산일에서 고시 기간만큼 지난 같은 날짜입니다(없는 날짜는 그 달 말일). 마지막 날을 하루 앞뒤로 보는지는 판단하지 않았습니다. 실제 보증 적용과 부품 재고는 제조사에 확인하세요.';

/** 복사·인쇄 기록에 넣는 고시 기준 줄. */
export function standardRecordLines(resolution: StandardResolution, input: StandardInput): string[] {
  const { item, warranty, parts } = resolution;
  const head = `고시 품목: ${item.label} (${CONSUMER_STANDARD_NOTICE.notice}, 시행 ${CONSUMER_STANDARD_NOTICE.effectiveDate}, [별표 Ⅲ])`;
  if (!item.row) return [head, `${valueTag('unverified')} 고시 표에 해당 분류 없음 — 확인 필요. ${item.notListed ?? ''}`.trim()];
  return [
    head,
    `${valueTag('official')} 품질보증기간 ${item.row.warrantyYears}년 · 부품보유기간 제조일로부터 ${item.row.partsYears}년 (${item.row.category})`,
    ...item.coreParts.map((part) => `${valueTag('official')} 핵심부품 ${part.label} 품질보증기간 ${part.warrantyYears}년`),
    warranty.kind === 'ready'
      ? `${valueTag('calculated')} 고시 기준 품질보증 종료일: ${warranty.end} (기산: ${warranty.startLabel} ${valueTag('entered')})`
      : `품질보증 종료일: 계산하지 않음 — ${'message' in warranty ? warranty.message : ''}`,
    parts.kind === 'ready'
      ? `${valueTag('calculated')} 부품보유 종료일: ${parts.end} (제조일자 ${parts.manufactureDate} · ${parts.note} ${valueTag('entered')})`
      : `부품보유 종료일: 계산하지 않음 — ${'message' in parts ? parts.message : ''}`,
    ...(input.makerWarrantyEnd ? [`${valueTag('entered')} 제조사 보증 종료일: ${input.makerWarrantyEnd}`] : []),
    ...(resolution.makerShorter ? ['입력한 제조사 보증 종료일이 고시 기간으로 계산한 날보다 이릅니다. 시행령 [별표 1] 4호 가목은 사업자가 정한 기간이 품목별 기준보다 짧으면 품목별 기준의 기간으로 한다고 적습니다.'] : []),
    PERIOD_END_CAVEAT,
  ];
}
