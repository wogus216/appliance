import type { EnergyCapacity, EnergyMeasurement } from '@/lib/energy-comparison';
import { formatCapacity } from '@/lib/energy-comparison';

// 한국에너지공단 월간 kWh 신고값의 단일 원본. 제품 사양표 문자열(energySpec)과 /compare·/tools/home-energy가 모두 이 레코드를 쓴다.
// 상세 페이지 값만 넣는다. 상세 페이지의 완료일자가 비어 있으면 목록 페이지 날짜로 메우지 않고 비운다.
// 같은 묶음 안의 값은 같은 공개 신고 항목이며, 개별 시험성적서의 세부 조건까지 동일하다고 단정하지 않는다.
//
// 월간 kWh 항목이 없어 넣지 않은 신고(research/evidence/2026-10-29/energy/kea-comparability.json):
// - 위닉스 DN2H160-IWK: 제습기(certi_list_145) 신고 283190073, 항목은 '1시간소비전력량(Wh)' 255.
// - 샤오미 AC-M16-SC: 공기청정기(certi_list_121) 신고 288250041, 항목은 '1㎡당 소비전력(W/㎡)' 0.64.
// - 다이슨 HP09: 사이트 분류는 선풍기지만 공단 신고 품목은 공기청정기(certi_list_121)다. 신고 288210259, '1㎡당 소비전력(W/㎡)' 1.81,
//   표준사용면적 13.3㎡. 선풍기 목록 119·307에서 HP09·다이슨은 0건이었다(대조군 '신일' 697행 검출).
//   같은 공단 품목인 AC-M16-SC(45.5㎡)와는 면적이 70.8% 달라 비교하지 않는다.

const KEA_VIEW = 'https://eep.energy.or.kr/certification/certi_view_';

interface Declaration {
  modelNumber: string; value: number; capacity: EnergyCapacity; declarationId: string; declarant: string;
  testLab: string; completedAt?: string; declaredUnits?: EnergyMeasurement['declaredUnits'];
}

// 냉장고: 값은 2026-10-27 확인(research/evidence/2026-10-27/fridge-energy-source-check.md),
// 항목명·업체명은 2026-10-29 상세 페이지에서 글자 그대로 확인(research/evidence/2026-10-29/energy/fridge-item-name-check.md).
// 신고 확인서의 냉동냉장고 구분: research/evidence/content-value-2026-10-08/pass3/sources/fridge-kea-certificates.txt
function fridge({ capacity, declarationId, ...rest }: Declaration): EnergyMeasurement {
  return {
    ...rest, capacity, declarationId,
    productCategory: '냉장고', category: '전기냉장고(냉동냉장고)', itemName: '월간소비전력량 (kwh/월)', unit: 'kWh/월',
    sourceUrl: `${KEA_VIEW}252.aspx?no=${declarationId}&page=1`,
    checkedAt: '2026-10-27',
  };
}

// 에어컨·정수기: 2026-10-29 상세 페이지 확인(research/evidence/2026-10-29/energy/kea-comparability.json, energy-source-check.md).
function aircon({ declarationId, ...rest }: Declaration): EnergyMeasurement {
  return {
    ...rest, declarationId,
    productCategory: '에어컨', category: '전기냉방기', itemName: '냉방기간월간소비전력량(kWh/월)(1:1기준)', unit: 'kWh/월',
    sourceUrl: `${KEA_VIEW}260.aspx?no=${declarationId}`,
    checkedAt: '2026-10-29',
  };
}

function waterPurifier({ declarationId, ...rest }: Declaration): EnergyMeasurement {
  return {
    ...rest, declarationId,
    productCategory: '정수기', category: '전기냉온수기(순간식)', itemName: '월간소비전력량(kWh/월)', unit: 'kWh/월',
    sourceUrl: `${KEA_VIEW}159.aspx?no=${declarationId}`,
    checkedAt: '2026-10-29',
  };
}

const litres = (value: number): EnergyCapacity => ({ label: '용량', value, unit: 'L' });
const coolingWatts = (value: number): EnergyCapacity => ({ label: '정격냉방능력', value, unit: 'W' });
// 공단이 '용량'으로 지정한 지표가 아니다. 탱크 크기가 비슷한지 보려고 살림랩이 대신 쓰는 지표다.
const coldTankLitres = (value: number): EnergyCapacity => ({ label: '냉수저장탱크 용량', value, unit: 'L', proxy: true });

export const ENERGY_MEASUREMENTS: Record<string, EnergyMeasurement> = {
  RF85C90D1AP: fridge({ modelNumber: 'RF85C90D1AP', value: 41.38, capacity: litres(878.1), declarationId: '252230128', declarant: '삼성전자(주)', testLab: '한국산업기술시험원(안산)', completedAt: '2023-03-07' }),
  T873MEE111: fridge({ modelNumber: 'T873MEE111', value: 41.95, capacity: litres(873.3), declarationId: '252220489', declarant: 'LG전자(주)', testLab: '한국기계전기전자시험연구원(군포)', completedAt: '2022-06-14' }),
  // 현재 상세 페이지의 완료일자는 비어 있다. 과거 조회일의 2023-11-03을 현재 완료일로 채우지 않는다.
  RS84B5061M9: fridge({ modelNumber: 'RS84B5061M9', value: 51.01, capacity: litres(850.6), declarationId: '252230494', declarant: '삼성전자(주)', testLab: '한국산업기술시험원(안산)' }),
  S834MWW1D: fridge({ modelNumber: 'S834MWW1D', value: 51.64, capacity: litres(834), declarationId: '252220710', declarant: 'LG전자(주)', testLab: '한국산업기술시험원(안산)', completedAt: '2022-11-22' }),

  // 2020년 신고. 목록에 구효율등급 2가 남아 있고, 그 뒤 월간소비전력량 산정식이 바뀌었는지는 불명이다.
  AR07A9170HCN: aircon({ modelNumber: 'AR07A9170HCN', value: 103, capacity: coolingWatts(3000), declarationId: '260200419', declarant: '삼성전자(주)', testLab: '한국냉동공조시험연구원(안산)', completedAt: '2020-11-30', declaredUnits: { indoor: 'AR07A9170HCN', outdoor: 'AR07A9170HAX' } }),
  // 상세 완료일자 빈칸(목록 2024-03-13). 실내기·실외기 모델명이 둘 다 CTH06QBW로 신고돼 있다.
  CTH06QBW: aircon({ modelNumber: 'CTH06QBW', value: 89.5, capacity: coolingWatts(2300), declarationId: '260240150', declarant: '하이얼 전자판매(주)', testLab: '한국산업기술시험원(안산)', declaredUnits: { indoor: 'CTH06QBW', outdoor: 'CTH06QBW' } }),
  // 상세 완료일자 빈칸(목록 2024-03-14).
  CTH10QBW: aircon({ modelNumber: 'CTH10QBW', value: 154.2, capacity: coolingWatts(4100), declarationId: '260240148', declarant: '하이얼 전자판매(주)', testLab: '한국산업기술시험원(안산)', declaredUnits: { indoor: 'CTH10QBW', outdoor: 'CTH10QBW' } }),
  // 제조사 TCL 명의 신고를 기준으로 둔다. 같은 조합의 쿠팡 명의 신고 260240172는 87.6kWh/월. 상세 완료일자 빈칸(목록 2024-05-21).
  'TAC-08CSD/TPH11I': aircon({ modelNumber: 'TAC-08CSD/TPH11I', value: 87.8, capacity: coolingWatts(2350), declarationId: '260240215', declarant: '티씨엘일렉트로닉스코리아 유한회사', testLab: '한국기계전기전자시험연구원(군포)', declaredUnits: { indoor: 'TAC-08CSD/TPH11I-I', outdoor: 'TAC-08CSD/TPH11I-O' } }),
  // 같은 조합의 쿠팡 명의 신고 260240185는 136.8kWh/월. 완료일은 상세 2024-05-21, 목록 2024-05-22로 하루 다르며 상세 값을 쓴다.
  'TAC-12CSD/TPH11I': aircon({ modelNumber: 'TAC-12CSD/TPH11I', value: 137, capacity: coolingWatts(3515), declarationId: '260240214', declarant: '티씨엘일렉트로닉스코리아 유한회사', testLab: '한국기계전기전자시험연구원(군포)', completedAt: '2024-05-21', declaredUnits: { indoor: 'TAC-12CSD/TPH11I-I', outdoor: 'TAC-12CSD/TPH11I-O' } }),

  // 정수기 세 신고는 2018·2023·2026년으로 갈리고, 그사이 측정방법이 바뀌었는지는 불명이다.
  // 상세 완료일자 빈칸(목록 2026-03-30). 시험기관은 제조사 자체다.
  'CHPI-7400N': waterPurifier({ modelNumber: 'CHPI-7400N', value: 12.17, capacity: coldTankLitres(1.02), declarationId: '282260052', declarant: '코웨이(주)', testLab: '코웨이㈜' }),
  WD523ACB: waterPurifier({ modelNumber: 'WD523ACB', value: 12.17, capacity: coldTankLitres(1.5), declarationId: '282230026', declarant: 'LG전자(주)', testLab: '한국산업기술시험원(안산)', completedAt: '2023-05-10' }),
  // 업체명은 현재 원문 표기 그대로다.
  'WPU-A710C': waterPurifier({ modelNumber: 'WPU-A710C', value: 10.04, capacity: coldTankLitres(1.2), declarationId: '282180025', declarant: '에스케이인텔릭스(주) 화성캠퍼스', testLab: '한국화학융합시험연구원(과천)', completedAt: '2018-03-05' }),
};

export function getEnergyMeasurement(modelNumber: string): EnergyMeasurement | undefined {
  return Object.hasOwn(ENERGY_MEASUREMENTS, modelNumber) ? ENERGY_MEASUREMENTS[modelNumber] : undefined;
}

function requireMeasurement(modelNumber: string): EnergyMeasurement {
  const entry = getEnergyMeasurement(modelNumber);
  if (!entry) throw new Error(`공단 전력량 근거 없음: ${modelNumber}`);
  return entry;
}

// 사양표 라벨은 기존 화면 문구를 그대로 쓴다.
const MONTHLY_SPEC_LABELS: Record<string, string> = {
  냉장고: '월간 소비전력량(에너지공단 신고)',
  에어컨: '월간소비전력량 (공단 신고·1:1)',
  정수기: '월간 소비전력량(에너지공단 신고)',
};

/** 기존 사양표도 같은 수치 레코드를 사용한다. 제조사 별도 표기와 합치지 않는다. 수치는 공단 원문 표기 그대로(103, 89.5, 12.17). */
export function energySpec(modelNumber: string): { label: string; value: string } {
  const entry = requireMeasurement(modelNumber);
  return { label: MONTHLY_SPEC_LABELS[entry.productCategory], value: `${entry.value}kWh` };
}

/** 에어컨 사양표의 정격 냉방능력 줄. */
export function ratedCoolingSpec(modelNumber: string): { label: string; value: string } {
  const entry = requireMeasurement(modelNumber);
  if (entry.capacity.label !== '정격냉방능력') throw new Error(`정격냉방능력 신고 없음: ${modelNumber}`);
  return { label: '정격 냉방능력 (공단 신고)', value: formatCapacity(entry.capacity) };
}
