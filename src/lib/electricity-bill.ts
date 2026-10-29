import { KEPCO_RESIDENTIAL_LOW, type BasicChargeBlock, type EnergyChargeBlock, type ResidentialTariff, type TariffSeason } from '@/lib/data/kepco-tariff';
import { parsePlainNumber } from '@/lib/value-kind';

export interface ResidentialBill {
  kwh: number;
  month: number;
  season: TariffSeason;
  basicCharge: number;
  energyCharge: number;
  climateEnvironment: number;
  fuelAdjustment: number;
  /** 전기요금계 = 기본요금 + 전력량요금 + 기후환경요금 + 연료비조정요금(일반 가구라 복지할인 0). */
  subtotal: number;
  vat: number;
  fund: number;
  /** 청구요금 합계(10원 미만 절사). TV수신료는 별도다. */
  total: number;
}

export function seasonOfMonth(month: number, tariff: ResidentialTariff = KEPCO_RESIDENTIAL_LOW): TariffSeason {
  return (tariff.summerMonths as readonly number[]).includes(month) ? 'summer' : 'other';
}

export function isSuperUserRange(kwh: number, month: number, tariff: ResidentialTariff = KEPCO_RESIDENTIAL_LOW): boolean {
  return (tariff.superUser.months as readonly number[]).includes(month) && kwh > tariff.superUser.overKwh;
}

// 단가는 소수 첫째 자리(214.6원)까지라 0.1원 단위 정수로 바꿔 더한 뒤 절사한다.
const tenths = (won: number) => Math.round(won * 10);

/** 사용량이 속한 전력량요금 구간의 순서(0부터). */
export function energyBlockIndex(kwh: number, season: TariffSeason, tariff: ResidentialTariff = KEPCO_RESIDENTIAL_LOW): number {
  const blocks: readonly EnergyChargeBlock[] = tariff.energyCharge[season];
  const index = blocks.findIndex((block) => block.upToKwh === null || kwh <= block.upToKwh);
  return index === -1 ? blocks.length - 1 : index;
}

export function energyBlockLabel(index: number, season: TariffSeason, tariff: ResidentialTariff = KEPCO_RESIDENTIAL_LOW): string {
  const blocks: readonly EnergyChargeBlock[] = tariff.energyCharge[season];
  const previous = index > 0 ? blocks[index - 1].upToKwh : null;
  const upTo = blocks[index].upToKwh;
  if (previous === null) return `${upTo}kWh 이하`;
  return upTo === null ? `${previous}kWh 초과` : `${previous + 1}~${upTo}kWh`;
}

/**
 * 한전 주택용(저압) 일반 가구의 한 달 청구요금. 한전ON 전기요금계산기 '전기요금 청구액 계산방법'의 절사 규칙을 따른다.
 * kWh는 정수, 사용 기간은 입력한 달 1일~말일 전체로 본다. 슈퍼유저 구간은 계산하지 않는다.
 */
export function calculateResidentialBill(kwh: number, month: number, tariff: ResidentialTariff = KEPCO_RESIDENTIAL_LOW): ResidentialBill {
  if (!Number.isSafeInteger(kwh) || kwh < 0) throw new RangeError(`kWh는 0 이상의 정수여야 합니다: ${kwh}`);
  if (!Number.isInteger(month) || month < 1 || month > 12) throw new RangeError(`월은 1~12여야 합니다: ${month}`);
  if (isSuperUserRange(kwh, month, tariff)) throw new RangeError('슈퍼유저 구간은 계산하지 않습니다.');
  const season = seasonOfMonth(month, tariff);
  const basicBlocks: readonly BasicChargeBlock[] = tariff.basicCharge[season];
  const basicCharge = basicBlocks.find((block) => block.upToKwh === null || kwh <= block.upToKwh)!.won;

  let energyTenths = 0;
  let lower = 0;
  const energyBlocks: readonly EnergyChargeBlock[] = tariff.energyCharge[season];
  for (const block of energyBlocks) {
    const upper = block.upToKwh ?? Infinity;
    const used = Math.max(0, Math.min(kwh, upper) - lower);
    energyTenths += used * tenths(block.wonPerKwh);
    lower = upper;
    if (kwh <= upper) break;
  }
  const energyCharge = Math.floor(energyTenths / 10);
  const climateEnvironment = Math.trunc(kwh * tenths(tariff.climateEnvironment.wonPerKwh) / 10);
  const fuelAdjustment = Math.trunc(kwh * tenths(tariff.fuelAdjustment.wonPerKwh) / 10);
  const subtotal = basicCharge + energyCharge + climateEnvironment + fuelAdjustment;
  // 부가세 10%는 원 미만 4사5입, 기반기금 2.7%는 10원 미만 절사. 비율을 정수로 바꿔 9,588.5 같은 경계를 정확히 다룬다.
  const vatPermille = Math.round(tariff.vat.rate * 1000);
  const vat = Math.floor((subtotal * vatPermille + 500) / 1000);
  const fundPerTenThousand = Math.round(tariff.fund.rate * 10000);
  const fund = Math.floor(subtotal * fundPerTenThousand / 100000) * 10;
  const total = Math.floor((subtotal + vat + fund) / 10) * 10;
  return { kwh, month, season, basicCharge, energyCharge, climateEnvironment, fuelAdjustment, subtotal, vat, fund, total };
}

/** 'YYYY-MM' 사용 월이 연료비조정단가 적용 기간 안에 완전히 들어가는지. */
export function isWithinFuelAdjustmentPeriod(usageMonth: string, tariff: ResidentialTariff = KEPCO_RESIDENTIAL_LOW): boolean {
  const match = /^(\d{4})-(0[1-9]|1[0-2])$/.exec(usageMonth);
  if (!match) return false;
  const [year, month] = [Number(match[1]), Number(match[2])];
  const lastDay = new Date(Date.UTC(year, month, 0)).getUTCDate();
  const first = `${usageMonth}-01`;
  const last = `${usageMonth}-${String(lastDay).padStart(2, '0')}`;
  return first >= tariff.fuelAdjustment.from && last <= tariff.fuelAdjustment.to;
}

export interface BillDifferenceInput { householdKwh: string; usageMonth: string }
export type BillDifferenceField = keyof BillDifferenceInput;
export type BillDifference =
  | { kind: 'empty'; message: string }
  | { kind: 'invalid'; message: string; fields: Partial<Record<BillDifferenceField, string>> }
  | { kind: 'outdated'; message: string }
  | { kind: 'unsupported'; message: string }
  | {
    kind: 'ready'; usageMonth: string; householdKwh: number; deviceKwh: number; deviceKwhRaw: number;
    before: ResidentialBill; after: ResidentialBill; difference: number; beforeBlock: string; afterBlock: string;
  };

export function usageMonthLabel(usageMonth: string): string {
  const match = /^(\d{4})-(\d{2})$/.exec(usageMonth);
  return match ? `${match[1]}년 ${Number(match[2])}월` : usageMonth;
}

/**
 * 고지서의 가구 월 사용량에 기기의 30일 환산값을 더하기 전·후 요금과 그 차이.
 * 기기 사용분은 사용자 실측의 30일 환산값만 받는다(공단 신고값으로 요금을 계산하지 않는다).
 * 요금표 구간이 정수 kWh로 나뉘어 있어 기기 사용분은 kWh 정수로 반올림해 더한다.
 */
export function estimateBillDifference(input: BillDifferenceInput, deviceNormalizedKwh: number, tariff: ResidentialTariff = KEPCO_RESIDENTIAL_LOW): BillDifference {
  if (!input.householdKwh.trim() || !input.usageMonth.trim()) return { kind: 'empty', message: '고지서의 가구 월 사용량과 사용 월을 넣으면 요금 차이를 계산합니다.' };
  const householdKwh = parsePlainNumber(input.householdKwh, 0);
  const usageMonth = input.usageMonth.trim();
  const monthMatch = /^(\d{4})-(0[1-9]|1[0-2])$/.exec(usageMonth);
  const fields: Partial<Record<BillDifferenceField, string>> = {
    ...(householdKwh === null || householdKwh < 1 || householdKwh > 9999
      ? { householdKwh: /^\d+[.,]\d+$/.test(input.householdKwh.trim()) && !/^\d{1,3}(,\d{3})+$/.test(input.householdKwh.trim()) ? '고지서의 사용량은 소수점 없이 kWh 정수로 입력하세요. 예: 350' : '고지서에 적힌 가구 월 사용량을 1~9,999 사이의 kWh 정수로 입력하세요. 예: 350' }
      : {}),
    ...(!monthMatch ? { usageMonth: '사용 월을 2026-10처럼 연도-월로 입력하세요.' } : {}),
  };
  if (householdKwh === null || !monthMatch || fields.householdKwh || fields.usageMonth) {
    return { kind: 'invalid', message: '표시된 칸을 고치세요.', fields };
  }
  if (!Number.isFinite(deviceNormalizedKwh) || deviceNormalizedKwh < 0) {
    return { kind: 'invalid', message: '기기의 30일 환산 사용량을 먼저 계산하세요.', fields: {} };
  }
  if (!isWithinFuelAdjustmentPeriod(usageMonth, tariff)) {
    return {
      kind: 'outdated',
      message: `요금표 갱신 필요: 살림랩에 넣은 연료비조정단가는 ${tariff.fuelAdjustment.label}, ${tariff.fuelAdjustment.from}~${tariff.fuelAdjustment.to} 사용분에만 적용됩니다. ${usageMonthLabel(usageMonth)} 사용분은 계산하지 않습니다.`,
    };
  }
  const month = Number(monthMatch[2]);
  const deviceKwh = Math.round(deviceNormalizedKwh);
  const afterKwh = householdKwh + deviceKwh;
  if (isSuperUserRange(householdKwh, month, tariff) || isSuperUserRange(afterKwh, month, tariff)) {
    return {
      kind: 'unsupported',
      message: `하계(7~8월)·동계(12~2월)에 ${tariff.superUser.overKwh.toLocaleString('ko-KR')}kWh를 넘는 사용량에는 슈퍼유저 요금(${tariff.superUser.wonPerKwh}원/kWh)이 붙습니다. 이 구간은 한전 계산기 사례로 검증하지 못해 계산하지 않습니다. 한전ON 전기요금계산기를 이용하세요.`,
    };
  }
  const before = calculateResidentialBill(householdKwh, month, tariff);
  const after = calculateResidentialBill(afterKwh, month, tariff);
  const season = seasonOfMonth(month, tariff);
  return {
    kind: 'ready', usageMonth, householdKwh, deviceKwh, deviceKwhRaw: deviceNormalizedKwh, before, after,
    difference: after.total - before.total,
    beforeBlock: energyBlockLabel(energyBlockIndex(householdKwh, season, tariff), season, tariff),
    afterBlock: energyBlockLabel(energyBlockIndex(afterKwh, season, tariff), season, tariff),
  };
}

export const formatWon = (won: number) => `${won.toLocaleString('ko-KR')}원`;

export function localMonthLabel(date = new Date()): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
}
