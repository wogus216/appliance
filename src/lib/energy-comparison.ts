export interface EnergyCapacity {
  /** 공단 상세 페이지의 항목명 그대로(예: 정격냉방능력). */
  label: string;
  value: number;
  unit: 'L' | 'W';
  /** 공단이 비교 용량으로 정한 지표가 아니라 살림랩이 대신 쓴 지표면 true. */
  proxy?: boolean;
}

export interface EnergyMeasurement {
  modelNumber: string;
  /** 사이트 품목. 선택지를 묶는 데만 쓴다. 비교 판정은 공단 품목(category)으로 한다. */
  productCategory: string;
  /** 한국에너지공단 품목 구분. */
  category: string;
  /** 공단 신고 항목명. 글자 그대로 같을 때만 비교한다. */
  itemName: string;
  value: number;
  unit: 'kWh/월' | 'kWh/년' | 'Wh/회' | 'W';
  capacity: EnergyCapacity;
  declarationId: string;
  declarant?: string;
  /** 에어컨처럼 공단 신고 모델명이 실내기·실외기 조합일 때 원문 그대로. */
  declaredUnits?: { indoor: string; outdoor: string };
  /** 상세 페이지의 완료일자. 비어 있으면 목록 날짜로 메우지 않고 비운다. */
  completedAt?: string;
  testLab: string;
  sourceUrl: string;
  checkedAt: string;
}

export interface EnergyComparisonProduct {
  slug: string;
  modelNumber: string;
  name: string;
  brandLabel: string;
  measurement: EnergyMeasurement;
  capacity: string;
  dimensions: string;
  installationNote: string;
}

/**
 * 비교를 허용하는 용량 차이 상한(%). 한국에너지공단 기준이 아니라 살림랩이 정한 기준이다.
 * 공단 운용규정 별표의 냉방능력 구간표를 열람하지 못해 대리 기준으로 두었고, 신고값을 본 뒤에 정한 exploratory 규칙이다.
 * 근거: research/evidence/2026-10-29/energy/energy-source-check.md
 */
export const COMPARABLE_CAPACITY_GAP_PERCENT = 10;

export type IncompatibleReason = 'unit' | 'category' | 'item' | 'capacity';
export type EnergyComparison =
  | { kind: 'same-model' | 'invalid'; message: string }
  | { kind: 'incompatible'; reason: IncompatibleReason; message: string; capacityGapPercent?: number }
  | { kind: 'compared'; monthlyDifference: number; annualDifference: number; lowerModel: string | null; capacityGapPercent: number };

// 1.02L·878.1L·2,350W를 정수로 바꿔 20.0% 같은 경계값을 부동소수점 오차 없이 판정한다.
const scaled = (value: number) => Math.round(value * 1000);

/** |a−b| ÷ max(a,b)를 소수 첫째 자리까지 반올림한 %. */
export function capacityGapPercent(a: EnergyCapacity, b: EnergyCapacity): number {
  const [x, y] = [scaled(a.value), scaled(b.value)];
  return Math.round(Math.abs(x - y) * 1000 / Math.max(x, y)) / 10;
}

/** |a−b| ÷ max(a,b) ≤ percent%. 반올림한 표시값이 아니라 원래 값으로 판정한다. */
export function capacityWithin(a: EnergyCapacity, b: EnergyCapacity, percent: number): boolean {
  if (a.label !== b.label || a.unit !== b.unit) return false;
  const [x, y] = [scaled(a.value), scaled(b.value)];
  return Math.abs(x - y) * 100 <= Math.max(x, y) * percent;
}

export function formatCapacity(capacity: EnergyCapacity): string {
  return `${capacity.value.toLocaleString('ko-KR', { maximumFractionDigits: 3 })}${capacity.unit}`;
}

/** gapPercent는 민감도 분석에만 바꾼다. 화면의 결론은 COMPARABLE_CAPACITY_GAP_PERCENT로만 낸다. */
export function compareMonthlyEnergy(a: EnergyMeasurement, b: EnergyMeasurement, gapPercent = COMPARABLE_CAPACITY_GAP_PERCENT): EnergyComparison {
  if ([a.value, b.value, a.capacity.value, b.capacity.value].some((value) => !Number.isFinite(value) || value <= 0)) {
    return { kind: 'invalid', message: '유효한 월간 신고값을 확인하지 못했습니다. 공식 자료를 확인해 주세요.' };
  }
  if (a.modelNumber === b.modelNumber) {
    return { kind: 'same-model', message: '같은 모델을 선택했습니다. 서로 다른 두 모델을 골라 주세요.' };
  }
  if (a.unit !== 'kWh/월' || b.unit !== 'kWh/월') {
    return { kind: 'incompatible', reason: 'unit', message: '월간 kWh 신고값끼리만 비교합니다. 다른 단위는 자동으로 환산하지 않습니다.' };
  }
  if (a.category !== b.category) {
    return { kind: 'incompatible', reason: 'category', message: `공단 품목이 다릅니다(${a.category} · ${b.category}). 다른 품목의 신고값끼리는 차이를 계산하지 않습니다.` };
  }
  if (!a.itemName || a.itemName !== b.itemName) {
    return { kind: 'incompatible', reason: 'item', message: `공단 신고 항목이 다릅니다(${a.itemName || '미확인'} · ${b.itemName || '미확인'}). 같은 항목의 신고값끼리만 비교합니다.` };
  }
  if (a.capacity.label !== b.capacity.label || a.capacity.unit !== b.capacity.unit) {
    return { kind: 'incompatible', reason: 'capacity', message: '두 신고의 용량 항목이 달라 용량이 비슷한지 확인할 수 없습니다.' };
  }
  const gap = capacityGapPercent(a.capacity, b.capacity);
  if (!capacityWithin(a.capacity, b.capacity, gapPercent)) {
    return {
      kind: 'incompatible', reason: 'capacity', capacityGapPercent: gap,
      message: `${a.capacity.label}이 ${formatCapacity(a.capacity)}와 ${formatCapacity(b.capacity)}로 ${gap.toFixed(1)}% 차이 납니다. 살림랩은 이 차이가 ${gapPercent}% 이내인 모델끼리만 비교하므로 전력량 차이를 계산하지 않았습니다.`,
    };
  }
  // 공단 원자료의 소수 두 자리로 계산해 41.95 - 41.38의 부동소수점 오차를 피한다.
  const aHundredths = Math.round(a.value * 100);
  const bHundredths = Math.round(b.value * 100);
  const delta = Math.abs(aHundredths - bHundredths);
  return {
    kind: 'compared',
    monthlyDifference: delta / 100,
    annualDifference: delta * 12 / 100,
    lowerModel: delta === 0 ? null : aHundredths < bHundredths ? a.modelNumber : b.modelNumber,
    capacityGapPercent: gap,
  };
}

/** 같은 목록 안에서 차이를 계산할 수 있는 상대 모델. */
export function comparablePartners(model: string, products: EnergyComparisonProduct[]): EnergyComparisonProduct[] {
  const base = products.find((product) => product.modelNumber === model);
  if (!base) return [];
  return products.filter((product) => compareMonthlyEnergy(base.measurement, product.measurement).kind === 'compared');
}

/** 차이를 계산할 수 있는 모든 쌍(목록 순서대로, 중복 없이). */
export function comparablePairs(products: EnergyComparisonProduct[], gapPercent = COMPARABLE_CAPACITY_GAP_PERCENT): [EnergyComparisonProduct, EnergyComparisonProduct][] {
  return products.flatMap((a, index) => products.slice(index + 1)
    .filter((b) => compareMonthlyEnergy(a.measurement, b.measurement, gapPercent).kind === 'compared')
    .map((b) => [a, b] as [EnergyComparisonProduct, EnergyComparisonProduct]));
}

export function annualDeclaredEnergy(value: number): number {
  return Math.round(value * 100) * 12 / 100;
}

export function formatEnergy(value: number): string {
  return value.toLocaleString('ko-KR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export function parseEnergySelection(a: string | null, b: string | null, products: EnergyComparisonProduct[]): { a: string; b: string } {
  const known = (value: string) => products.some((product) => product.modelNumber === value);
  const normalize = (value: string) => value.trim().toUpperCase();
  const modelA = a === null ? products[0]?.modelNumber ?? '' : known(normalize(a)) ? normalize(a) : '';
  if (b !== null) return { a: modelA, b: known(normalize(b)) ? normalize(b) : '' };
  // 상대가 지정되지 않으면 차이를 계산할 수 있는 모델, 없으면 같은 사이트 품목의 다른 모델을 고른다(비교할 수 없는 이유를 보여 주기 위해).
  const base = products.find((product) => product.modelNumber === modelA);
  const fallback = base && (comparablePartners(modelA, products)[0]
    ?? products.find((product) => product.modelNumber !== modelA && product.measurement.productCategory === base.measurement.productCategory));
  return { a: modelA, b: fallback?.modelNumber ?? '' };
}

export function energyComparisonHref(modelA?: string, modelB?: string): string {
  const params = new URLSearchParams();
  if (modelA) params.set('energyA', modelA);
  if (modelB) params.set('energyB', modelB);
  return `/compare${params.size ? `?${params}` : ''}#energy-compare`;
}

const FIT_REMINDER: Record<string, string> = {
  냉장고: '설치 크기·문 열림·수납 구성도 모델별로 확인하세요.',
  에어컨: '실외기·배관 같은 설치 조건도 모델별로 확인하세요.',
};

export function energyComparisonText(a: EnergyComparisonProduct, b: EnergyComparisonProduct): string | null {
  const result = compareMonthlyEnergy(a.measurement, b.measurement);
  if (result.kind !== 'compared') return null;
  const category = a.measurement.productCategory;
  return [
    `살림랩 ${category} 전기사용량 비교 — 한국에너지공단 신고값 기준`,
    `비교 조건: 공단 품목 ${a.measurement.category}, 신고 항목 ${a.measurement.itemName}, ${a.measurement.capacity.label} 차이 ${result.capacityGapPercent.toFixed(1)}%(살림랩 기준 ${COMPARABLE_CAPACITY_GAP_PERCENT}% 이내, 공단 기준 아님)`,
    ...[a, b].map((product) => `${product.brandLabel} ${product.modelNumber}: 월 ${formatEnergy(product.measurement.value)}kWh / 연 ${formatEnergy(annualDeclaredEnergy(product.measurement.value))}kWh(월간값 × 12)\n공단 신고 ${product.measurement.capacity.label} ${formatCapacity(product.measurement.capacity)}, 확인 ${product.measurement.checkedAt}\n출처: ${product.measurement.sourceUrl}`),
    `차이: 월 ${formatEnergy(result.monthlyDifference)}kWh / 연 ${formatEnergy(result.annualDifference)}kWh(월 차이 × 12)`,
    result.lowerModel ? `신고값이 낮게 표시된 모델: ${result.lowerModel}` : '두 모델의 월간 신고값이 같습니다.',
    '이 차이는 신고값의 산술 비교입니다. 실제 가정의 절감량·전기요금·제품의 종합 우열을 뜻하지 않습니다. 신고 시점과 시험기관이 다르며 개별 시험성적서의 세부 조건은 확인하지 못했습니다.',
    FIT_REMINDER[category] ?? '설치 조건도 모델별로 확인하세요.',
  ].join('\n\n');
}
