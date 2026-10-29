import type { EnergyMeasurement } from '@/lib/energy-comparison';

// 2026-10-27 정확한 모델의 공단 상세 페이지를 다시 열어 확인했다.
// 신고 확인서의 냉동냉장고 구분: research/evidence/content-value-2026-10-08/pass3/sources/fridge-kea-certificates.txt
// 이 묶음은 같은 공개 신고 항목이며, 개별 시험성적서의 세부 조건까지 동일하다고 단정하지 않는다.
const BASIS = 'KEA-252-refrigerator-monthly-declarations-2022-2023';
function measurement(modelNumber: string, value: number, declaredCapacityLitres: number, declarationId: string, testLab: string, completedAt?: string): EnergyMeasurement {
  return {
    modelNumber, value, declaredCapacityLitres, declarationId, testLab, completedAt,
    unit: 'kWh/월', category: '전기냉장고(냉동냉장고)', comparisonBasis: BASIS,
    sourceUrl: `https://eep.energy.or.kr/certification/certi_view_252.aspx?no=${declarationId}&page=1`,
    checkedAt: '2026-10-27',
  };
}

export const FRIDGE_ENERGY_MEASUREMENTS: Record<string, EnergyMeasurement> = {
  RF85C90D1AP: measurement('RF85C90D1AP', 41.38, 878.1, '252230128', '한국산업기술시험원(안산)', '2023-03-07'),
  T873MEE111: measurement('T873MEE111', 41.95, 873.3, '252220489', '한국기계전기전자시험연구원(군포)', '2022-06-14'),
  // 현재 상세 페이지의 완료일자는 비어 있다. 과거 조회일의 2023-11-03을 현재 완료일로 채우지 않는다.
  RS84B5061M9: measurement('RS84B5061M9', 51.01, 850.6, '252230494', '한국산업기술시험원(안산)'),
  S834MWW1D: measurement('S834MWW1D', 51.64, 834, '252220710', '한국산업기술시험원(안산)', '2022-11-22'),
};

export function getFridgeEnergyMeasurement(modelNumber: string): EnergyMeasurement | undefined {
  return Object.hasOwn(FRIDGE_ENERGY_MEASUREMENTS, modelNumber) ? FRIDGE_ENERGY_MEASUREMENTS[modelNumber] : undefined;
}

/** 기존 사양표도 같은 수치 레코드를 사용한다. 제조사 별도 표기와 합치지 않는다. */
export function fridgeEnergySpec(modelNumber: string): { label: string; value: string } {
  const entry = getFridgeEnergyMeasurement(modelNumber);
  if (!entry) throw new Error(`냉장고 전력량 근거 없음: ${modelNumber}`);
  return { label: '월간 소비전력량(에너지공단 신고)', value: `${entry.value.toFixed(2)}kWh` };
}
