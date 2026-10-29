import { valueTag } from '@/lib/value-kind';

export interface CareInterval {
  unit: 'days' | 'months';
  amount: number;
  basis: string;
}

export interface CarePlanItem {
  id: string;
  title: string;
  timing: string;
  description: string;
  sourceLabel: string;
  sourceUrl: string;
  interval?: CareInterval;
}

export interface CarePlanProduct {
  modelNumber: string;
  slug: string;
  title: string;
  category: string;
  items: CarePlanItem[];
}

export interface CarePlanInput {
  purchaseDate: string;
  lastCareDate: string;
  chosenDate: string;
}

export type CarePlanResult =
  | { kind: 'empty'; message: string }
  | { kind: 'invalid'; message: string }
  | { kind: 'ready'; dueDate: string; calendarDate: string; overdue: boolean; basis: string };

export function carePlanHref(modelNumber?: string): string {
  return `/tools/care-plan${modelNumber ? `?model=${encodeURIComponent(modelNumber)}` : ''}`;
}

export function parseCareModel(value: string | null, products: CarePlanProduct[]): string {
  return value && products.some((product) => product.modelNumber === value) ? value : '';
}

/** Date.UTC treats years 0–99 as 1900–1999, so set the full year explicitly. */
function dateFromIso(value: string): Date | undefined {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return undefined;
  const [year, month, day] = value.split('-').map(Number);
  if (year < 1900 || year > 9998) return undefined;
  const date = new Date(0);
  date.setUTCFullYear(year, month - 1, day);
  date.setUTCHours(0, 0, 0, 0);
  return date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day ? date : undefined;
}

function iso(date: Date): string { return date.toISOString().slice(0, 10); }

export function addCalendarDays(value: string, days: number): string | undefined {
  const date = dateFromIso(value);
  if (!date || !Number.isSafeInteger(days)) return undefined;
  date.setUTCDate(date.getUTCDate() + days);
  return date.getUTCFullYear() > 9998 ? undefined : iso(date);
}

export function addCalendarMonths(value: string, months: number): string | undefined {
  const date = dateFromIso(value);
  if (!date || !Number.isSafeInteger(months)) return undefined;
  const day = date.getUTCDate();
  date.setUTCDate(1);
  date.setUTCMonth(date.getUTCMonth() + months);
  if (date.getUTCFullYear() > 9998) return undefined;
  const lastDay = new Date(date.getTime());
  lastDay.setUTCMonth(lastDay.getUTCMonth() + 1);
  lastDay.setUTCDate(0);
  date.setUTCDate(Math.min(day, lastDay.getUTCDate()));
  return iso(date);
}

export function calculateCarePlan(item: CarePlanItem | undefined, input: CarePlanInput, today: string): CarePlanResult {
  if (!item) return { kind: 'empty', message: '제품과 관리 항목을 선택하세요.' };
  if (!dateFromIso(today)) return { kind: 'invalid', message: '오늘 날짜를 확인할 수 없습니다.' };
  if (input.purchaseDate && (!dateFromIso(input.purchaseDate) || input.purchaseDate > today)) {
    return { kind: 'invalid', message: '구입일은 오늘 또는 이전 날짜로 입력하세요.' };
  }
  if (item.interval) {
    if (!input.lastCareDate) return { kind: 'empty', message: '마지막 관리일을 입력하면 설명서 기준의 다음 확인일을 계산합니다.' };
    if (!dateFromIso(input.lastCareDate) || input.lastCareDate > today) {
      return { kind: 'invalid', message: '마지막 관리일은 오늘 또는 이전 날짜로 입력하세요.' };
    }
    const dueDate = item.interval.unit === 'days'
      ? addCalendarDays(input.lastCareDate, item.interval.amount)
      : addCalendarMonths(input.lastCareDate, item.interval.amount);
    if (!dueDate) return { kind: 'invalid', message: '이 날짜로는 다음 확인일을 계산할 수 없습니다.' };
    return {
      kind: 'ready', dueDate, calendarDate: dueDate < today ? today : dueDate,
      overdue: dueDate < today, basis: item.interval.basis,
    };
  }
  if (!input.chosenDate) return { kind: 'empty', message: '이 항목에는 확인된 고정 주기가 없습니다. 원하는 확인일을 직접 정하세요.' };
  if (!dateFromIso(input.chosenDate) || input.chosenDate < today) {
    return { kind: 'invalid', message: '직접 정한 확인일은 오늘 또는 이후 날짜로 입력하세요.' };
  }
  return { kind: 'ready', dueDate: input.chosenDate, calendarDate: input.chosenDate, overdue: false, basis: '사용자가 직접 정한 날짜 · 공식 고정 주기 아님' };
}

export function carePlanRecord(product: CarePlanProduct, item: CarePlanItem, input: CarePlanInput, result: Extract<CarePlanResult, { kind: 'ready' }>): string {
  return [
    `${product.title} · ${product.modelNumber} 관리 일정`,
    `항목: ${item.title}\n설명서 안내: ${item.timing}\n${item.description}`,
    ...(input.purchaseDate ? [`구입일: ${input.purchaseDate} · 계산에 사용하지 않음`] : []),
    ...(item.interval ? [`${valueTag('entered')} 마지막 관리일: ${input.lastCareDate}`] : []),
    `${valueTag(item.interval ? 'calculated' : 'entered')} 확인 기준일: ${result.dueDate}${result.overdue ? '\n기준일이 지났습니다. 오늘 확인하는 일정으로 달력에 내보냅니다.' : ''}`,
    `날짜의 근거: ${item.interval ? `${valueTag('official')} ` : ''}${result.basis}`,
    `공식 자료: ${item.sourceLabel}\n${item.sourceUrl}`,
    `제품 설명: https://salimlab.kr/products/${product.slug}#technology-map`,
    '한 번의 확인 일정입니다. 달력에 반복 알림을 만들지 않습니다. 사용 환경·실제 부품 상태·관리 계약과 설명서 전체 절차를 확인하세요.',
  ].join('\n\n');
}

function escapeIcs(value: string): string {
  return value.replaceAll('\\', '\\\\').replaceAll('\n', '\\n').replaceAll(',', '\\,').replaceAll(';', '\\;');
}

function foldIcsLine(line: string): string {
  const lines: string[] = [];
  let current = '';
  let bytes = 0;
  for (const character of line) {
    const size = new TextEncoder().encode(character).length;
    if (bytes + size > 75) { lines.push(current); current = ' '; bytes = 1; }
    current += character; bytes += size;
  }
  lines.push(current);
  return lines.join('\r\n');
}

/** One all-day event. Recurrence would silently turn a conditional care guide into a guarantee. */
export function carePlanIcs(product: CarePlanProduct, item: CarePlanItem, input: CarePlanInput, result: Extract<CarePlanResult, { kind: 'ready' }>, uid: string, generatedAt: Date): string {
  const end = addCalendarDays(result.calendarDate, 1);
  if (!end) throw new Error('달력 종료일을 만들 수 없습니다.');
  const summary = `${product.title} ${item.title} 확인`;
  const description = carePlanRecord(product, item, input, result);
  return [
    'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Salimlab//Care Plan//KO', 'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT', `UID:${escapeIcs(uid)}@salimlab.kr`,
    `DTSTAMP:${generatedAt.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')}`,
    `DTSTART;VALUE=DATE:${result.calendarDate.replaceAll('-', '')}`,
    `DTEND;VALUE=DATE:${end.replaceAll('-', '')}`,
    `SUMMARY:${escapeIcs(summary)}`, `DESCRIPTION:${escapeIcs(description)}`,
    `URL:https://salimlab.kr/products/${product.slug}#technology-map`,
    'END:VEVENT', 'END:VCALENDAR', '',
  ].map(foldIcsLine).join('\r\n');
}
