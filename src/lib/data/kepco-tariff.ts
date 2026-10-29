// 한전 주택용 전력(저압) 요금표. 주거용, 대가족·복지할인 해당 없음. 고압·1주택 수 가구·제주 선택요금은 범위 밖이다.
// 근거: research/evidence/2026-10-29/energy/kepco-tariff.json, energy-source-check.md (2026-10-29 확인)
// 한전 주택용 저압 PDF(2024-07-01 시행)의 계산 예시는 전력산업기반기금 3.2% 시절 값이라 쓰지 않는다.

export interface BasicChargeBlock { upToKwh: number | null; won: number }
export interface EnergyChargeBlock { upToKwh: number | null; wonPerKwh: number }
export type TariffSeason = 'summer' | 'other';

export const KEPCO_RESIDENTIAL_LOW = {
  name: '한전 주택용 전력(저압)',
  scope: '주거용 저압, 대가족·복지할인 해당 없음',
  checkedAt: '2026-10-29',
  rateTableUrl: 'https://online.kepco.co.kr/PRM004D00',
  calculatorUrl: 'https://online.kepco.co.kr/PRM033D00',
  /** 하계 7월 1일~8월 31일. 나머지 달은 기타계절이다. */
  summerMonths: [7, 8],
  basicCharge: {
    summer: [{ upToKwh: 300, won: 910 }, { upToKwh: 450, won: 1600 }, { upToKwh: null, won: 7300 }],
    other: [{ upToKwh: 200, won: 910 }, { upToKwh: 400, won: 1600 }, { upToKwh: null, won: 7300 }],
  },
  energyCharge: {
    summer: [{ upToKwh: 300, wonPerKwh: 120.0 }, { upToKwh: 450, wonPerKwh: 214.6 }, { upToKwh: null, wonPerKwh: 307.3 }],
    other: [{ upToKwh: 200, wonPerKwh: 120.0 }, { upToKwh: 400, wonPerKwh: 214.6 }, { upToKwh: null, wonPerKwh: 307.3 }],
  },
  /** 하계(7~8월)·동계(12~2월) 1,000kWh 초과 전력량. 한전 계산기 사례로 검증하지 못해 이 구간은 계산하지 않는다. */
  superUser: { overKwh: 1000, wonPerKwh: 736.2, months: [7, 8, 12, 1, 2] },
  climateEnvironment: { wonPerKwh: 9.0, since: '2023-01', sourceUrl: 'https://online.kepco.co.kr/PRM097D00' },
  /** 적용 기간 밖의 사용분은 계산하지 않는다(요금표 갱신 필요). */
  fuelAdjustment: {
    wonPerKwh: 5.0, from: '2026-10-01', to: '2026-12-31', label: '2026년 4분기(10~12월분)',
    publishedAt: '2026-09-21', sourceUrl: 'https://online.kepco.co.kr/CUM040D00',
  },
  vat: { rate: 0.1, rounding: '원 미만 4사5입' },
  fund: { rate: 0.027, since: '2025-07-01', rounding: '10원 미만 절사' },
  /** 복지할인 가구의 200kWh 이하 추가감액은 금액표를 찾지 못했다. 일반 가구 계산에는 감액이 없다. */
  welfareReductionSupported: false,
} as const;

export type ResidentialTariff = typeof KEPCO_RESIDENTIAL_LOW;

/**
 * 정적 설명의 예시값. 한전ON 전기요금계산기(주택용 저압, 2026-10-01~2026-10-31, 350kWh) 결과를 그대로 옮겼다.
 * kepco-tariff.json의 calculatorCases[3]과 같다.
 */
export const KEPCO_CALCULATOR_EXAMPLE = {
  period: '2026-10-01~2026-10-31', month: 10, kwh: 350,
  basicCharge: 1600, energyCharge: 56190, energyChargeBlocks: '200×120 + 150×214.6',
  climateEnvironment: 3150, fuelAdjustment: 1750, subtotal: 62690, vat: 6269, fund: 1690, total: 70640,
} as const;

/** 같은 달(2026년 10월) 한전ON 계산기 사례 세 건. 누진 구간 때문에 늘어난 kWh당 요금이 다르다는 예시로만 쓴다. */
export const KEPCO_CALCULATOR_OCTOBER_TOTALS = [
  { kwh: 200, total: 31220 },
  { kwh: 350, total: 70640 },
  { kwh: 450, total: 108050 },
] as const;
