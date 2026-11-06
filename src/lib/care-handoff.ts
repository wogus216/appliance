import { calculateCarePlan, type CarePlanProduct } from '@/lib/care-plan';

export const CARE_HANDOFF_KEY = 'salimlab-care-handoff-v1';
export interface CareHandoff { version: 1; modelNumber: string; itemId: string; date: string; createdAt: number }

/** 같은 탭에서 넘기는 일회용 초안. 오래된 초안과 모델·날짜가 맞지 않는 값은 쓰지 않는다. */
export function parseCareHandoff(raw: string | null, products: CarePlanProduct[], today: string, now = Date.now()): CareHandoff | undefined {
  if (!raw || raw.length > 2000) return;
  try {
    const d = JSON.parse(raw) as CareHandoff;
    if (!d || d.version !== 1 || typeof d.createdAt !== 'number' || !Number.isFinite(d.createdAt) || now - d.createdAt < 0 || now - d.createdAt > 30 * 60_000 || typeof d.date !== 'string') return;
    const item = products.find((p) => p.modelNumber === d.modelNumber)?.items.find((i) => i.id === d.itemId);
    if (!item || calculateCarePlan(item, { purchaseDate: '', lastCareDate: item.interval ? d.date : '', chosenDate: item.interval ? '' : d.date }, today).kind !== 'ready') return;
    return { version: 1, modelNumber: d.modelNumber, itemId: d.itemId, date: d.date, createdAt: d.createdAt };
  } catch { return; }
}
