export interface EnergyMeasurement {
  modelNumber: string;
  value: number;
  unit: 'kWh/월' | 'kWh/년' | 'Wh/회' | 'W';
  category: string;
  /** 비교를 허용한 신고 항목 범위. 개별 시험성적서의 조건이 동일하다는 뜻은 아니다. */
  comparisonBasis: string;
  declaredCapacityLitres: number;
  declarationId: string;
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

export type EnergyComparison =
  | { kind: 'same-model' | 'incompatible' | 'invalid'; message: string }
  | { kind: 'compared'; monthlyDifference: number; annualDifference: number; lowerModel: string | null };

export function compareMonthlyEnergy(a: EnergyMeasurement, b: EnergyMeasurement): EnergyComparison {
  if ([a.value, b.value].some((value) => !Number.isFinite(value) || value <= 0)) {
    return { kind: 'invalid', message: '유효한 월간 신고값을 확인하지 못했습니다. 공식 자료를 확인해 주세요.' };
  }
  if (a.modelNumber === b.modelNumber) {
    return { kind: 'same-model', message: '같은 모델을 선택했습니다. 서로 다른 두 모델을 골라 주세요.' };
  }
  if (a.unit !== 'kWh/월' || b.unit !== 'kWh/월' || a.category !== b.category || !a.comparisonBasis || a.comparisonBasis !== b.comparisonBasis) {
    return { kind: 'incompatible', message: '같은 품목·단위·신고 항목 범위를 확인한 값끼리만 비교할 수 있습니다.' };
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
  };
}

export function annualDeclaredEnergy(value: number): number {
  return Math.round(value * 100) * 12 / 100;
}

export function formatEnergy(value: number): string {
  return value.toLocaleString('ko-KR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export function parseEnergySelection(a: string | null, b: string | null, products: EnergyComparisonProduct[]): { a: string; b: string } {
  const pick = (value: string | null, fallback: string) => {
    if (value === null) return fallback;
    const model = value.trim().toUpperCase();
    return products.some((product) => product.modelNumber === model) ? model : '';
  };
  const modelA = pick(a, products[0]?.modelNumber ?? '');
  return { a: modelA, b: pick(b, products.find((product) => product.modelNumber !== modelA)?.modelNumber ?? '') };
}

export function energyComparisonHref(modelA?: string, modelB?: string): string {
  const params = new URLSearchParams();
  if (modelA) params.set('energyA', modelA);
  if (modelB) params.set('energyB', modelB);
  return `/compare${params.size ? `?${params}` : ''}#energy-compare`;
}

export function energyComparisonText(a: EnergyComparisonProduct, b: EnergyComparisonProduct): string | null {
  const result = compareMonthlyEnergy(a.measurement, b.measurement);
  if (result.kind !== 'compared') return null;
  return [
    '살림랩 냉장고 전기사용량 비교 — 한국에너지공단 신고값 기준',
    ...[a, b].map((product) => `${product.brandLabel} ${product.modelNumber}: 월 ${formatEnergy(product.measurement.value)}kWh / 연 ${formatEnergy(annualDeclaredEnergy(product.measurement.value))}kWh(월간값 × 12)\n공단 신고 용량 ${product.measurement.declaredCapacityLitres}L, 확인 ${product.measurement.checkedAt}\n출처: ${product.measurement.sourceUrl}`),
    `차이: 월 ${formatEnergy(result.monthlyDifference)}kWh / 연 ${formatEnergy(result.annualDifference)}kWh(월 차이 × 12)`,
    result.lowerModel ? `신고값이 낮게 표시된 모델: ${result.lowerModel}` : '두 모델의 월간 신고값이 같습니다.',
    '이 차이는 신고값의 산술 비교입니다. 실제 가정의 절감량·전기요금·제품의 종합 우열을 뜻하지 않습니다. 신고 시점과 시험기관이 다르며 개별 시험성적서의 세부 조건은 확인하지 못했습니다.',
    '설치 크기·문 열림·수납 구성도 모델별로 확인하세요.',
  ].join('\n\n');
}
