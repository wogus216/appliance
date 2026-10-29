import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { HomeEnergyBillGuide } from '@/components/tools/home-energy-bill-guide';
import { KEPCO_CALCULATOR_EXAMPLE, KEPCO_CALCULATOR_OCTOBER_TOTALS, KEPCO_RESIDENTIAL_LOW as tariff } from '@/lib/data/kepco-tariff';
import { calculateResidentialBill, estimateBillDifference, isWithinFuelAdjustmentPeriod, seasonOfMonth } from '@/lib/electricity-bill';

interface CalculatorCase {
  season: '기타계절' | '하계'; period: string; kwh: number; total: number;
  breakdown: { basicCharge: number; energyCharge: number; climateEnvironment: number; fuelAdjustment: number; subtotal: number; vat: number; fund: number };
}
const kepco = JSON.parse(readFileSync(join(process.cwd(), 'research/evidence/2026-10-29/energy/kepco-tariff.json'), 'utf8')) as {
  checkedAt: string;
  basicCharge: { season: string; fromKwh: number; toKwh: number | null; wonPerHousehold: number }[];
  energyCharge: { summer: { wonPerKwh: number }[]; other: { wonPerKwh: number }[] };
  climateEnvironment: { wonPerKwh: number };
  fuelAdjustment: { wonPerKwh: number };
  vat: { rate: number };
  fundRate: { rate: number };
  effectiveDates: { fuelAdjustment: string };
  calculatorCases: CalculatorCase[];
};
const monthOf = (period: string) => Number(period.slice(5, 7));

describe('한전 주택용(저압) 요금 계산: 한전ON 계산기 사례 6건', () => {
  it('원문 JSON에 사례가 6건 있다', () => {
    expect(kepco.calculatorCases).toHaveLength(6);
  });

  it.each(kepco.calculatorCases.map((entry) => [`${entry.period} ${entry.kwh}kWh`, entry] as const))('%s: 항목별 금액과 청구 합계가 원 단위까지 같다', (_, entry) => {
    const bill = calculateResidentialBill(entry.kwh, monthOf(entry.period));
    expect(bill.season).toBe(entry.season === '하계' ? 'summer' : 'other');
    expect({
      basicCharge: bill.basicCharge, energyCharge: bill.energyCharge, climateEnvironment: bill.climateEnvironment,
      fuelAdjustment: bill.fuelAdjustment, subtotal: bill.subtotal, vat: bill.vat, fund: bill.fund,
    }).toEqual({
      basicCharge: entry.breakdown.basicCharge, energyCharge: entry.breakdown.energyCharge, climateEnvironment: entry.breakdown.climateEnvironment,
      fuelAdjustment: entry.breakdown.fuelAdjustment, subtotal: entry.breakdown.subtotal, vat: entry.breakdown.vat, fund: entry.breakdown.fund,
    });
    expect(bill.total).toBe(entry.total);
  });
});

describe('요금표 데이터와 원문 JSON', () => {
  it('기본요금·전력량 단가·기후환경·연료비조정·부가세·기반기금이 원문과 같다', () => {
    for (const season of ['summer', 'other'] as const) {
      const rows = kepco.basicCharge.filter((row) => row.season === (season === 'summer' ? '하계' : '기타계절'));
      expect(tariff.basicCharge[season].map((block) => [block.upToKwh, block.won])).toEqual(rows.map((row) => [row.toKwh, row.wonPerHousehold]));
      expect(tariff.energyCharge[season].map((block) => block.wonPerKwh)).toEqual(kepco.energyCharge[season].slice(0, 3).map((row) => row.wonPerKwh));
      expect(kepco.energyCharge[season][3].wonPerKwh).toBe(tariff.superUser.wonPerKwh);
    }
    expect(tariff.climateEnvironment.wonPerKwh).toBe(kepco.climateEnvironment.wonPerKwh);
    expect(tariff.fuelAdjustment.wonPerKwh).toBe(kepco.fuelAdjustment.wonPerKwh);
    expect(kepco.effectiveDates.fuelAdjustment).toContain(`${tariff.fuelAdjustment.from}~${tariff.fuelAdjustment.to}`);
    expect(tariff.vat.rate).toBe(kepco.vat.rate);
    expect(tariff.fund.rate).toBe(kepco.fundRate.rate);
    expect(tariff.checkedAt).toBe(kepco.checkedAt);
  });

  it('정적 설명의 예시값은 계산기 사례를 그대로 옮긴 것이고 계산 함수와도 같다', () => {
    const source = kepco.calculatorCases.find((entry) => entry.period === KEPCO_CALCULATOR_EXAMPLE.period && entry.kwh === KEPCO_CALCULATOR_EXAMPLE.kwh)!;
    const { basicCharge, energyCharge, climateEnvironment, fuelAdjustment, subtotal, vat, fund } = source.breakdown;
    const amounts = { basicCharge, energyCharge, climateEnvironment, fuelAdjustment, subtotal, vat, fund, total: source.total };
    expect(KEPCO_CALCULATOR_EXAMPLE).toMatchObject({ ...amounts, energyChargeBlocks: (source.breakdown as { energyChargeBlocks?: string }).energyChargeBlocks });
    expect(calculateResidentialBill(KEPCO_CALCULATOR_EXAMPLE.kwh, KEPCO_CALCULATOR_EXAMPLE.month)).toMatchObject(amounts);
    for (const { kwh, total } of KEPCO_CALCULATOR_OCTOBER_TOTALS) {
      expect(kepco.calculatorCases.some((entry) => entry.period.startsWith('2026-10') && entry.kwh === kwh && entry.total === total)).toBe(true);
    }
  });

  it('한전 PDF의 기반기금 3.2% 시절 예시 금액(108,530원)은 어디에도 쓰지 않는다', () => {
    const html = renderToStaticMarkup(createElement(HomeEnergyBillGuide));
    expect(html).not.toContain('108,530');
    expect(html).toContain('108,050원');
  });
});

describe('계절·적용 기간·슈퍼유저 구간', () => {
  it('7~8월만 하계다', () => {
    expect([1, 6, 7, 8, 9, 12].map((month) => seasonOfMonth(month))).toEqual(['other', 'other', 'summer', 'summer', 'other', 'other']);
  });

  it('연료비조정단가 적용 기간(2026-10-01~2026-12-31) 밖의 사용 월은 계산하지 않고 갱신 필요를 알린다', () => {
    expect(['2026-10', '2026-11', '2026-12'].every((month) => isWithinFuelAdjustmentPeriod(month))).toBe(true);
    expect(['2026-09', '2027-01', '2026-07', '2026-13', '2026-1'].some((month) => isWithinFuelAdjustmentPeriod(month))).toBe(false);
    for (const usageMonth of ['2026-09', '2027-01', '2026-07']) {
      const result = estimateBillDifference({ householdKwh: '350', usageMonth }, 50);
      expect(result.kind).toBe('outdated');
      expect(result.kind === 'outdated' && result.message).toContain('요금표 갱신 필요');
      expect(result).not.toHaveProperty('difference');
    }
  });

  it('하계·동계 1,000kWh 초과 슈퍼유저 구간은 검증하지 못해 계산하지 않는다', () => {
    expect(estimateBillDifference({ householdKwh: '950', usageMonth: '2026-12' }, 60).kind).toBe('unsupported');
    expect(() => calculateResidentialBill(1001, 12)).toThrow(RangeError);
    // 10·11월에는 슈퍼유저 요금이 없다.
    expect(estimateBillDifference({ householdKwh: '950', usageMonth: '2026-11' }, 60).kind).toBe('ready');
  });
});

describe('기기 사용분을 더하기 전·후 요금 차이', () => {
  it('더하기 전후가 모두 계산기 사례인 조합은 사례 금액의 차이와 같다', () => {
    const first = estimateBillDifference({ householdKwh: '200', usageMonth: '2026-10' }, 150);
    expect(first).toMatchObject({ kind: 'ready', deviceKwh: 150, before: { total: 31220 }, after: { total: 70640 }, difference: 39420, beforeBlock: '200kWh 이하', afterBlock: '201~400kWh' });
    const second = estimateBillDifference({ householdKwh: '350', usageMonth: '2026-10' }, 100);
    expect(second).toMatchObject({ kind: 'ready', before: { total: 70640 }, after: { total: 108050 }, difference: 37410, afterBlock: '400kWh 초과' });
  });

  it('같은 kWh라도 가구 사용량이 어느 구간이냐에 따라 차이가 다르다', () => {
    const low = estimateBillDifference({ householdKwh: '150', usageMonth: '2026-10' }, 40);
    const high = estimateBillDifference({ householdKwh: '450', usageMonth: '2026-10' }, 40);
    if (low.kind !== 'ready' || high.kind !== 'ready') throw new Error('ready expected');
    expect(high.difference).toBeGreaterThan(low.difference);
  });

  it('30일 환산 kWh는 정수로 반올림해 더하고, 0이면 차이도 0이다', () => {
    expect(estimateBillDifference({ householdKwh: '350', usageMonth: '2026-10' }, 53.14)).toMatchObject({ kind: 'ready', deviceKwh: 53, deviceKwhRaw: 53.14, after: { kwh: 403 } });
    expect(estimateBillDifference({ householdKwh: '350', usageMonth: '2026-10' }, 0.4)).toMatchObject({ kind: 'ready', deviceKwh: 0, difference: 0 });
  });

  it('고지서 사용량은 kWh 정수만 받고, 잘못된 칸을 알려 준다', () => {
    expect(estimateBillDifference({ householdKwh: '', usageMonth: '2026-10' }, 10).kind).toBe('empty');
    const decimal = estimateBillDifference({ householdKwh: '350.5', usageMonth: '2026-10' }, 10);
    expect(decimal.kind === 'invalid' && decimal.fields.householdKwh).toContain('소수점 없이');
    expect(estimateBillDifference({ householdKwh: '1,200', usageMonth: '2026-10' }, 10)).toMatchObject({ kind: 'ready', householdKwh: 1200 });
    expect(estimateBillDifference({ householdKwh: '0', usageMonth: '2026-10' }, 10).kind).toBe('invalid');
    const month = estimateBillDifference({ householdKwh: '350', usageMonth: '10월' }, 10);
    expect(month.kind === 'invalid' && month.fields.usageMonth).toContain('2026-10');
  });
});
