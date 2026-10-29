import type { CarePlanProduct } from '@/lib/care-plan';
import { resolveStandard, standardRecordLines, type SaleDateSource, type StandardInput, type WarrantyBasis } from '@/lib/consumer-standards';
import { CATALOG_STANDARD_ITEM, type StandardItemId } from '@/lib/data/consumer-standards';
import { HOUSEHOLD_CARE_LIMIT, readHouseholdCare, type HouseholdCareEntry } from '@/lib/household-care';
import { isoDateValue } from '@/lib/iso-date';
import { valueTag } from '@/lib/value-kind';

/** v2부터 관리 항목과 제품 기록을 한 문서로 저장한다. v1(관리 항목 배열)은 읽어서 옮기고 지우지 않는다. */
export const NOTEBOOK_KEY = 'salimlab-household-care-v2';
export const LEGACY_CARE_KEY = 'salimlab-household-care-v1';
export const NOTEBOOK_PRODUCT_LIMIT = 50;
export const REPAIR_LIMIT = 30;
export const NOTEBOOK_FILE_MAX_BYTES = 200_000;
export const PURCHASE_PLACE_MAX = 60;
export const REPAIR_TEXT_MAX = 200;
const MAX_REPAIR_WON = 1_000_000_000;
const EXPORT_APP = 'salimlab-household-notebook';
const ID = /^[a-zA-Z0-9_-]{1,80}$/;

export type AirconType = '' | 'cooling' | 'heat-pump';
export interface RepairRecord { id: string; date: string; description: string; costWon: number | null }
export interface NotebookProduct {
  id: string;
  modelNumber: string;
  purchaseDate: string;
  purchasePlace: string;
  warrantyBasis: WarrantyBasis;
  /** 기산 기준이 구입일이 아닐 때의 날짜(인도일·교환일·제조일·수입통관일). */
  basisDate: string;
  saleDateSource: SaleDateSource;
  manufactureLabel: string;
  makerWarrantyEnd: string;
  airconType: AirconType;
  repairs: RepairRecord[];
}
export interface HouseholdNotebook { version: 2; care: HouseholdCareEntry[]; products: NotebookProduct[] }

export const emptyNotebook = (): HouseholdNotebook => ({ version: 2, care: [], products: [] });
export const newNotebookProduct = (id: string, modelNumber: string): NotebookProduct => ({
  id, modelNumber, purchaseDate: '', purchasePlace: '', warrantyBasis: 'purchase', basisDate: '', saleDateSource: 'manufacture',
  manufactureLabel: '', makerWarrantyEnd: '', airconType: '', repairs: [],
});

const isRecord = (value: unknown): value is Record<string, unknown> => !!value && typeof value === 'object' && !Array.isArray(value);
const dateOrEmpty = (value: unknown) => typeof value === 'string' && (value === '' || isoDateValue(value) !== undefined) ? value : '';
const text = (value: unknown, max: number) => typeof value === 'string' ? value.trim().slice(0, max) : '';
const oneOf = <T extends string>(value: unknown, options: readonly T[], fallback: T): T => options.includes(value as T) ? value as T : fallback;

function parseRepair(value: unknown): RepairRecord | undefined {
  if (!isRecord(value) || typeof value.id !== 'string' || !ID.test(value.id)) return undefined;
  if (typeof value.date !== 'string' || isoDateValue(value.date) === undefined) return undefined;
  const description = text(value.description, REPAIR_TEXT_MAX);
  if (!description) return undefined;
  const cost = value.costWon;
  if (cost !== null && cost !== undefined && !(typeof cost === 'number' && Number.isSafeInteger(cost) && cost >= 0 && cost <= MAX_REPAIR_WON)) return undefined;
  return { id: value.id, date: value.date, description, costWon: typeof cost === 'number' ? cost : null };
}

function parseProduct(value: unknown, catalog: CarePlanProduct[]): { product?: NotebookProduct; droppedRepairs: number } {
  if (!isRecord(value) || typeof value.id !== 'string' || !ID.test(value.id)) return { droppedRepairs: 0 };
  if (typeof value.modelNumber !== 'string' || !catalog.some((entry) => entry.modelNumber === value.modelNumber)) return { droppedRepairs: 0 };
  const rawRepairs = Array.isArray(value.repairs) ? value.repairs : [];
  const repairs = rawRepairs.slice(0, REPAIR_LIMIT).map(parseRepair).filter((repair): repair is RepairRecord => !!repair);
  return {
    droppedRepairs: rawRepairs.length - repairs.length,
    product: {
      id: value.id, modelNumber: value.modelNumber,
      purchaseDate: dateOrEmpty(value.purchaseDate), purchasePlace: text(value.purchasePlace, PURCHASE_PLACE_MAX),
      warrantyBasis: oneOf(value.warrantyBasis, ['purchase', 'delivery', 'exchange', 'unknown-sale'] as const, 'purchase'),
      basisDate: dateOrEmpty(value.basisDate), saleDateSource: oneOf(value.saleDateSource, ['manufacture', 'customs'] as const, 'manufacture'),
      manufactureLabel: text(value.manufactureLabel, 20), makerWarrantyEnd: dateOrEmpty(value.makerWarrantyEnd),
      airconType: oneOf(value.airconType, ['', 'cooling', 'heat-pump'] as const, ''),
      repairs,
    },
  };
}

/** 알려진 필드만 골라 새 객체를 만든다. 알 수 없는 필드는 버리고, 형식이 틀린 항목은 센 뒤 뺀다. */
export function parseNotebookValue(value: unknown, catalog: CarePlanProduct[]): { notebook: HouseholdNotebook; dropped: number } | { error: string } {
  const rawCare = Array.isArray(value) ? value : isRecord(value) && Array.isArray(value.care) ? value.care : undefined;
  const rawProducts = isRecord(value) && Array.isArray(value.products) ? value.products : [];
  if (isRecord(value)) {
    if (typeof value.version === 'number' && value.version > 2) return { error: '이 사이트보다 새로운 형식의 파일이라 읽지 못합니다.' };
    if (!Array.isArray(value.care) && !Array.isArray(value.products)) return { error: '가전 수첩 파일 형식이 아닙니다.' };
  } else if (!Array.isArray(value)) return { error: '가전 수첩 파일 형식이 아닙니다.' };
  const careInput = rawCare ?? [];
  const care = readHouseholdCare(JSON.stringify(careInput), catalog)
    .map(({ id, modelNumber, itemId, lastCareDate, chosenDate }) => ({ id, modelNumber, itemId, lastCareDate: dateOrEmpty(lastCareDate), chosenDate: dateOrEmpty(chosenDate) }))
    .filter((entry) => entry.lastCareDate || entry.chosenDate);
  let droppedRepairs = 0;
  const products: NotebookProduct[] = [];
  for (const raw of rawProducts.slice(0, NOTEBOOK_PRODUCT_LIMIT)) {
    const parsed = parseProduct(raw, catalog);
    droppedRepairs += parsed.droppedRepairs;
    if (parsed.product && !products.some((product) => product.modelNumber === parsed.product!.modelNumber || product.id === parsed.product!.id)) products.push(parsed.product);
  }
  return { notebook: { version: 2, care, products }, dropped: careInput.length - care.length + rawProducts.length - products.length + droppedRepairs };
}

/** 저장소 읽기. v2가 없으면 v1 관리 항목을 옮겨 온다. 읽을 수 없으면 빈 수첩. */
export function readNotebook(raw: string | null, legacyRaw: string | null, catalog: CarePlanProduct[]): HouseholdNotebook {
  for (const candidate of [raw, legacyRaw]) {
    if (!candidate) continue;
    try {
      const parsed = parseNotebookValue(JSON.parse(candidate), catalog);
      if ('notebook' in parsed) return parsed.notebook;
    } catch { /* 다음 후보로 */ }
  }
  return emptyNotebook();
}

export const serializeNotebook = (notebook: HouseholdNotebook) => JSON.stringify(notebook);

export function exportNotebookText(notebook: HouseholdNotebook, exportedAt: string): string {
  return JSON.stringify({ app: EXPORT_APP, version: 2, exportedAt, care: notebook.care, products: notebook.products }, null, 2);
}

export type NotebookImport = { kind: 'ok'; notebook: HouseholdNotebook; dropped: number } | { kind: 'error'; message: string };

export function importNotebookText(content: string, catalog: CarePlanProduct[]): NotebookImport {
  if (new TextEncoder().encode(content).length > NOTEBOOK_FILE_MAX_BYTES) return { kind: 'error', message: `파일이 ${NOTEBOOK_FILE_MAX_BYTES / 1000}KB보다 큽니다.` };
  let value: unknown;
  try { value = JSON.parse(content); } catch { return { kind: 'error', message: 'JSON 파일을 읽지 못했습니다.' }; }
  if (isRecord(value) && 'app' in value && value.app !== EXPORT_APP) return { kind: 'error', message: '살림랩 가전 수첩에서 내보낸 파일이 아닙니다.' };
  const parsed = parseNotebookValue(value, catalog);
  if ('error' in parsed) return { kind: 'error', message: parsed.error };
  if (parsed.notebook.care.length > HOUSEHOLD_CARE_LIMIT) return { kind: 'error', message: `관리 항목은 ${HOUSEHOLD_CARE_LIMIT}개까지 불러올 수 있습니다.` };
  return { kind: 'ok', ...parsed };
}

export function notebookStandardItemId(product: NotebookProduct, catalog: CarePlanProduct[]): StandardItemId | '' {
  const category = catalog.find((entry) => entry.modelNumber === product.modelNumber)?.category;
  const mapped = category ? CATALOG_STANDARD_ITEM[category] : undefined;
  if (mapped === 'aircon') return product.airconType === 'cooling' ? 'aircon-cooling' : product.airconType === 'heat-pump' ? 'aircon-heat-pump' : '';
  return mapped ?? '';
}

export const isAirconProduct = (product: NotebookProduct, catalog: CarePlanProduct[]) =>
  CATALOG_STANDARD_ITEM[catalog.find((entry) => entry.modelNumber === product.modelNumber)?.category ?? ''] === 'aircon';

export function notebookStandardInput(product: NotebookProduct, catalog: CarePlanProduct[]): StandardInput {
  return {
    itemId: notebookStandardItemId(product, catalog), basis: product.warrantyBasis,
    basisDate: product.warrantyBasis === 'purchase' ? product.purchaseDate : product.basisDate,
    saleDateSource: product.saleDateSource, manufactureLabel: product.manufactureLabel, makerWarrantyEnd: product.makerWarrantyEnd,
  };
}

export const repairTotalWon = (product: NotebookProduct) => product.repairs.reduce((total, repair) => total + (repair.costWon ?? 0), 0);

const won = (value: number) => `${value.toLocaleString('ko-KR')}원`;

export function notebookRecord(notebook: HouseholdNotebook, catalog: CarePlanProduct[], today?: string): string {
  if (!notebook.products.length) return '';
  return [
    '살림랩 우리 집 가전 수첩 · 제품 기록',
    ...notebook.products.map((product) => {
      const entry = catalog.find((candidate) => candidate.modelNumber === product.modelNumber);
      const input = notebookStandardInput(product, catalog);
      const resolution = resolveStandard(input, today);
      const priced = product.repairs.filter((repair) => repair.costWon !== null);
      return [
        `■ ${entry?.title ?? product.modelNumber} · ${product.modelNumber}`,
        `${valueTag('entered')} 구입일: ${product.purchaseDate || '미입력'}${product.purchasePlace ? ` · 구입처: ${product.purchasePlace}` : ''}`,
        ...(resolution ? standardRecordLines(resolution, input) : [isAirconProduct(product, catalog) ? '에어컨 구분(냉방 전용·냉난방 겸용)을 고르지 않아 고시 기간을 붙이지 않았습니다.' : '고시 품목을 정하지 못했습니다.']),
        ...(product.repairs.length ? ['수리 기록:', ...product.repairs.map((repair) => `- ${valueTag('entered')} ${repair.date} · ${repair.description}${repair.costWon === null ? ' · 금액 미입력' : ` · ${won(repair.costWon)}`}`)] : []),
        ...(priced.length ? [`${valueTag('calculated')} 입력한 수리비 합계: ${won(repairTotalWon(product))} (${priced.length}건${priced.length < product.repairs.length ? `, 금액 미입력 ${product.repairs.length - priced.length}건 제외` : ''})`] : []),
      ].join('\n');
    }),
  ].join('\n\n');
}
