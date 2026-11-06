import { WATER_PURIFIER_MODELS } from '@/lib/data/water-purifier-cost';
import { parseWon } from '@/lib/repair-replace';
import { isIsoDate } from '@/types/editorial';
import { parsePlainNumber } from '@/lib/value-kind';

export const PURIFIER_SCENARIO_MAX_BYTES = 20_000;
export interface PurifierScenario {
  format: 'salimlab-purifier-comparison';
  version: 1;
  savedAt: string;
  sourceCheckedAt: string;
  modelNumber: string;
  planId: string;
  inputs: Record<string, string>;
  memberPrice: boolean;
  showPromotion: boolean;
  usedRaw: string;
}

export function exportPurifierScenario(scenario: PurifierScenario): string {
  return JSON.stringify({ ...scenario, inputs: Object.fromEntries(Object.entries(scenario.inputs).map(([key, value]) => [key, value.trim()])) }, null, 2);
}

/** 결과 합계는 파일에서 신뢰하지 않는다. 지원 모델의 입력만 복원해 다시 계산한다. */
export function importPurifierScenario(text: string): { kind: 'ready'; scenario: PurifierScenario } | { kind: 'error'; message: string } {
  const error = { kind: 'error' as const, message: '지원하는 정수기 비교 조건 파일이 아닙니다. 현재 입력은 바꾸지 않았습니다.' };
  if (text.length > PURIFIER_SCENARIO_MAX_BYTES) return error;
  let data: unknown;
  try { data = JSON.parse(text); } catch { return error; }
  if (!data || typeof data !== 'object') return error;
  const s = data as Record<string, unknown>;
  if (s.format !== 'salimlab-purifier-comparison' || s.version !== 1 || !isIsoDate(s.savedAt) || !isIsoDate(s.sourceCheckedAt)
    || typeof s.memberPrice !== 'boolean' || typeof s.showPromotion !== 'boolean' || typeof s.usedRaw !== 'string' || s.usedRaw.length > 40) return error;
  const used = s.usedRaw.trim() ? parsePlainNumber(s.usedRaw.trim(), 0) : 0;
  if (used === null || used < 0 || used > 600) return error;
  const model = WATER_PURIFIER_MODELS.find((entry) => entry.modelNumber === s.modelNumber);
  if (!model?.available || !model.rental.plans.some((plan) => plan.id === s.planId)) return error;
  if (!s.inputs || typeof s.inputs !== 'object' || Array.isArray(s.inputs)) return error;
  const inputs = s.inputs as Record<string, unknown>;
  const keys = ['monthly', 'registration', 'contract', 'obligation', 'purchase', ...model.purchase.filters.map((filter) => `filter-${filter.id}`)];
  // 기존 v1 파일에는 해지 기준요금이 없다. 없으면 실납부요금으로 추정하지 않고 화면에서 별도 확인한다.
  const allowed = [...keys, 'penaltyMonthly', 'rentalExtra', 'purchaseExtra'];
  if (!keys.every((key) => key in inputs) || Object.keys(inputs).some((key) => !allowed.includes(key))) return error;
  for (const key of Object.keys(inputs)) {
    const raw = inputs[key];
    if (typeof raw !== 'string' || raw.length > 40) return error;
    if (raw.trim() === '' && ['registration', 'obligation', 'penaltyMonthly', 'rentalExtra', 'purchaseExtra'].includes(key)) continue;
    if (key === 'contract' || key === 'obligation') {
      const months = parsePlainNumber(raw, 0);
      if (months === null || months < 1 || months > 120) return error;
    } else if (parseWon(raw, ['registration', 'rentalExtra', 'purchaseExtra'].includes(key)) === null) return error;
  }
  if (String(inputs.obligation).trim() !== '' && parsePlainNumber(String(inputs.obligation), 0)! > parsePlainNumber(String(inputs.contract), 0)!) return error;
  return { kind: 'ready', scenario: { format: 'salimlab-purifier-comparison', version: 1, savedAt: s.savedAt, sourceCheckedAt: s.sourceCheckedAt, modelNumber: model.modelNumber, planId: String(s.planId), inputs: inputs as Record<string, string>, memberPrice: s.memberPrice, showPromotion: s.showPromotion, usedRaw: s.usedRaw } };
}
