export const REPAIR_HANDOFF_KEY = 'salimlab-repair-handoff-v1';
export const REPAIR_HANDOFF_TTL = 30 * 60_000;
export interface RepairHandoff {
  version: 1;
  destination: 'repair' | 'notebook';
  createdAt: number;
  model: string;
  summary: string;
}
type Storage = Pick<globalThis.Storage, 'getItem' | 'setItem' | 'removeItem'>;

/** 상담은 사용자 메모다. 진단·보증·수리 완료 같은 확인 상태는 전달하지 않는다. */
export function parseRepairHandoff(raw: string | null, destination: RepairHandoff['destination'], now = Date.now()): RepairHandoff | undefined {
  if (!raw || raw.length > 20_000) return;
  try {
    const d: unknown = JSON.parse(raw);
    if (!d || typeof d !== 'object' || Array.isArray(d)) return;
    const v = d as Record<string, unknown>;
    if (v.version !== 1 || v.destination !== destination || typeof v.createdAt !== 'number' || !Number.isFinite(v.createdAt)
      || now - v.createdAt < 0 || now - v.createdAt > REPAIR_HANDOFF_TTL
      || typeof v.model !== 'string' || v.model.length > 100
      || typeof v.summary !== 'string' || !v.summary.trim() || v.summary.length > 12_000) return;
    return { version: 1, destination, createdAt: v.createdAt, model: v.model.trim(), summary: v.summary };
  } catch { return; }
}

export function saveRepairHandoff(storage: Storage, draft: RepairHandoff): boolean {
  try { storage.setItem(REPAIR_HANDOFF_KEY, JSON.stringify(draft)); return true; }
  catch { return false; }
}

/** 목적지가 다르면 유지한다. 맞는 목적지에서는 읽기 전에 제거해 재방문·StrictMode 중복 적용을 막는다. */
export function consumeRepairHandoff(storage: Storage, destination: RepairHandoff['destination'], now = Date.now()): { kind: 'none' | 'invalid' | 'blocked' } | { kind: 'ready'; draft: RepairHandoff } {
  try {
    const raw = storage.getItem(REPAIR_HANDOFF_KEY);
    if (!raw) return { kind: 'none' };
    // 다른 목적지에 있는 정상 초안을 해당 화면에서 소비하지 않는다.
    const other = destination === 'repair' ? 'notebook' : 'repair';
    if (parseRepairHandoff(raw, other, now)) return { kind: 'none' };
    storage.removeItem(REPAIR_HANDOFF_KEY);
    const draft = parseRepairHandoff(raw, destination, now);
    return draft ? { kind: 'ready', draft } : { kind: 'invalid' };
  } catch { return { kind: 'blocked' }; }
}

/** 앞부분·용량으로 추측하지 않고 전체 모델 표기가 같은 경우만 고른다. */
export function repairNotebookModel(model: string, catalog: { modelNumber: string }[]): string | undefined {
  const normalize = (value: string) => value.trim().replace(/\s+/g, ' ').toUpperCase();
  return catalog.find((entry) => normalize(entry.modelNumber) === normalize(model))?.modelNumber;
}
