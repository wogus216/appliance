import { calculateCarePlan, type CarePlanProduct } from '@/lib/care-plan';
import { valueTag } from '@/lib/value-kind';

export interface HouseholdCareEntry { id: string; modelNumber: string; itemId: string; lastCareDate: string; chosenDate: string }
export interface HouseholdCareRow extends HouseholdCareEntry { product: CarePlanProduct; item: CarePlanProduct['items'][number]; dueDate: string; overdue: boolean; basis: string }

/** 한 브라우저에 저장하는 관리 항목의 최대 개수. */
export const HOUSEHOLD_CARE_LIMIT = 50;

export function readHouseholdCare(raw: string | null, products: CarePlanProduct[]): HouseholdCareEntry[] {
  if (!raw) return [];
  try {
    const entries: unknown = JSON.parse(raw);
    if (!Array.isArray(entries)) return [];
    return entries.slice(0, HOUSEHOLD_CARE_LIMIT).filter((entry): entry is HouseholdCareEntry => {
      if (!entry || typeof entry !== 'object') return false;
      const candidate = entry as Record<string, unknown>;
      if (typeof candidate.id !== 'string' || !/^[a-zA-Z0-9_-]{1,80}$/.test(candidate.id)) return false;
      if (typeof candidate.modelNumber !== 'string' || typeof candidate.itemId !== 'string') return false;
      if (typeof candidate.lastCareDate !== 'string' || typeof candidate.chosenDate !== 'string') return false;
      return !!products.find((product) => product.modelNumber === candidate.modelNumber)?.items.some((item) => item.id === candidate.itemId);
    });
  } catch { return []; }
}

export function resolveHouseholdCare(entries: HouseholdCareEntry[], products: CarePlanProduct[], today: string): HouseholdCareRow[] {
  const rows: HouseholdCareRow[] = [];
  for (const entry of entries) {
    const product = products.find((candidate) => candidate.modelNumber === entry.modelNumber);
    const item = product?.items.find((candidate) => candidate.id === entry.itemId);
    if (!product || !item) continue;
    const result = calculateCarePlan(item, { purchaseDate: '', lastCareDate: entry.lastCareDate, chosenDate: entry.chosenDate }, item.interval ? today : entry.chosenDate);
    if (result.kind !== 'ready') continue;
    rows.push({ ...entry, product, item, dueDate: result.dueDate, overdue: result.dueDate < today, basis: result.basis });
  }
  return rows.sort((a, b) => a.dueDate.localeCompare(b.dueDate) || a.product.title.localeCompare(b.product.title));
}

/** 관리를 마친 날을 새 마지막 관리일로 기록한다. 고정 주기가 없는 항목은 날짜를 대신 정하지 않는다. */
export function markHouseholdCareDone(entries: HouseholdCareEntry[], id: string, products: CarePlanProduct[], today: string): HouseholdCareEntry[] {
  return entries.map((entry) => {
    if (entry.id !== id) return entry;
    const item = products.find((product) => product.modelNumber === entry.modelNumber)?.items.find((candidate) => candidate.id === entry.itemId);
    return item?.interval ? { ...entry, lastCareDate: today } : entry;
  });
}

export function householdCareRecord(rows: HouseholdCareRow[], recordedAt?: string): string {
  return [
    '살림랩 우리 집 가전 관리표',
    ...(recordedAt ? [`기록일: ${recordedAt}`] : []),
    `날짜 표시: ${valueTag('calculated')} 사용자가 입력한 마지막 관리일 + 설명서 주기 · ${valueTag('entered')} 사용자가 정한 확인일`,
    ...rows.map((row) => `${row.overdue ? '[기준일 지남] ' : ''}${valueTag(row.item.interval ? 'calculated' : 'entered')} ${row.dueDate} · ${row.product.title} ${row.product.modelNumber} · ${row.item.title}${row.item.interval ? `\n마지막 관리일: ${row.lastCareDate}` : ''}\n${row.basis}\n${row.item.sourceUrl}`),
    '날짜 주기가 없는 항목은 사용자가 정한 확인일입니다. 사용 환경과 제품 상태에 따라 설명서 전체 절차를 확인하세요.',
    'https://salimlab.kr/tools/household-care',
  ].join('\n\n');
}
