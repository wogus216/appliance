import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';
import { EnergyComparison } from '@/components/compare/energy-comparison';
import {
  annualDeclaredEnergy, capacityGapPercent, capacityWithin, comparablePairs, comparablePartners, compareMonthlyEnergy,
  COMPARABLE_CAPACITY_GAP_PERCENT, energyComparisonHref, energyComparisonText, parseEnergySelection,
} from '@/lib/energy-comparison';
import { ENERGY_MEASUREMENTS as entries, energySpec, getEnergyMeasurement, ratedCoolingSpec } from '@/lib/data/energy-measurements';
import { getEnergyComparisonProducts } from '@/lib/energy-products';
import { allAppliances, getApplianceBySlug } from '@/lib/data/appliances';

// 정적 본문 검사는 Next 라우터의 제공자 없이 수행한다. 실제 주소 동기화는 브라우저에서 확인한다.
vi.mock('next/navigation', () => ({ useRouter: () => ({ replace: vi.fn() }), useSearchParams: () => new URLSearchParams() }));

const products = getEnergyComparisonProducts();
const fridges = products.filter((product) => product.measurement.productCategory === '냉장고');
const rf85 = entries.RF85C90D1AP;
const t873 = entries.T873MEE111;

describe('공단 신고 전력량 비교', () => {
  it('RF85와 T873의 공식 월간 차이를 원 단위나 실제 절감량으로 바꾸지 않는다', () => {
    expect(compareMonthlyEnergy(rf85, t873)).toEqual({ kind: 'compared', monthlyDifference: 0.57, annualDifference: 6.84, lowerModel: 'RF85C90D1AP', capacityGapPercent: 0.5 });
    expect(compareMonthlyEnergy(t873, rf85)).toEqual(compareMonthlyEnergy(rf85, t873));
    expect(annualDeclaredEnergy(41.38)).toBe(496.56);
    expect(annualDeclaredEnergy(41.95)).toBe(503.4);
  });

  it('양문형 두 모델은 제조사 표기의 역순을 가져오지 않고 신고값끼리 계산한다', () => {
    expect(compareMonthlyEnergy(entries.RS84B5061M9, entries.S834MWW1D)).toEqual({ kind: 'compared', monthlyDifference: 0.63, annualDifference: 7.56, lowerModel: 'RS84B5061M9', capacityGapPercent: 2 });
  });

  it.each([
    { ...t873, unit: 'kWh/년' as const },
    { ...t873, unit: 'W' as const },
    { ...t873, unit: 'Wh/회' as const },
    { ...t873, category: '김치냉장고' },
    { ...t873, itemName: '월간소비전력량(kWh/월)' },
    { ...t873, itemName: '' },
    { ...t873, capacity: { ...t873.capacity, unit: 'W' as const } },
  ])('다른 단위·품목·신고 항목·용량 항목은 자동으로 환산하지 않는다: %j', (other) => {
    expect(compareMonthlyEnergy(rf85, other).kind).toBe('incompatible');
  });

  it.each([0, -1, Number.NaN, Infinity])('잘못된 수치 %s는 계산하지 않는다', (value) => {
    expect(compareMonthlyEnergy(rf85, { ...t873, value }).kind).toBe('invalid');
  });

  it('같은 모델과 다른 모델의 같은 신고값을 구별한다', () => {
    expect(compareMonthlyEnergy(rf85, rf85).kind).toBe('same-model');
    expect(compareMonthlyEnergy(rf85, { ...t873, value: rf85.value })).toEqual({ kind: 'compared', monthlyDifference: 0, annualDifference: 0, lowerModel: null, capacityGapPercent: 0.5 });
  });

  it('정확한 모델의 원문 수치와 기존 제품 사양표가 같은 레코드를 쓴다', () => {
    const expected = [
      ['RF85C90D1AP', 41.38, '252230128'], ['T873MEE111', 41.95, '252220489'],
      ['RS84B5061M9', 51.01, '252230494'], ['S834MWW1D', 51.64, '252220710'],
    ] as const;
    expect(fridges).toHaveLength(4);
    for (const [model, value, declarationId] of expected) {
      const product = products.find((product) => product.modelNumber === model)!;
      expect(product.measurement.value).toBe(value);
      expect(product.measurement.sourceUrl).toContain(`no=${declarationId}&`);
      expect(product.measurement.checkedAt).toBe('2026-10-27');
      const catalog = getApplianceBySlug(product.slug)!;
      expect(catalog.modelNumber).toBe(model);
      expect(catalog.techSpecs.extraSpecs).toContainEqual({ label: '월간 소비전력량(에너지공단 신고)', value: `${value.toFixed(2)}kWh` });
    }
  });

  it('공개 원문의 완료일 공란을 과거 데이터나 모델 번호로 메우지 않는다', () => {
    expect(entries.RS84B5061M9.completedAt).toBeUndefined();
    expect(entries.T873MEE111.completedAt).toBe('2022-06-14');
    expect(getEnergyMeasurement('RF85C90D1AP-X')).toBeUndefined();
    expect(getEnergyMeasurement('__proto__')).toBeUndefined();
  });
});

describe('전력량 비교 주소와 기록', () => {
  it('기본 비교와 제품 상세의 단일 모델 연결에 서로 다른 모델을 고른다', () => {
    expect(parseEnergySelection(null, null, products)).toEqual({ a: 'RF85C90D1AP', b: 'T873MEE111' });
    expect(parseEnergySelection('T873MEE111', null, products)).toEqual({ a: 'T873MEE111', b: 'RF85C90D1AP' });
  });

  it('지원하지 않는 모델을 기본 모델로 몰래 치환하지 않는다', () => {
    expect(parseEnergySelection('RF85', 'S834MWW1D', products)).toEqual({ a: '', b: 'S834MWW1D' });
    expect(parseEnergySelection('RF85C90D1AP', 'unknown', products).b).toBe('');
    expect(parseEnergySelection(' rf85c90d1ap ', 't873mee111', products)).toEqual({ a: 'RF85C90D1AP', b: 'T873MEE111' });
    expect(parseEnergySelection(null, null, [])).toEqual({ a: '', b: '' });
  });

  it('주소에 넣은 두 모델이 다시 같은 선택으로 풀린다', () => {
    const url = new URL(energyComparisonHref('RS84B5061M9', 'S834MWW1D'), 'https://salimlab.kr');
    expect(parseEnergySelection(url.searchParams.get('energyA'), url.searchParams.get('energyB'), products)).toEqual({ a: 'RS84B5061M9', b: 'S834MWW1D' });
    expect(url.hash).toBe('#energy-compare');
  });

  it('복사 기록에는 두 모델의 출처·차이·해석 한계를 함께 담는다', () => {
    const text = energyComparisonText(products[0], products[1])!;
    expect(text).toContain('월 0.57kWh / 연 6.84kWh');
    expect(text).toContain(rf85.sourceUrl);
    expect(text).toContain(t873.sourceUrl);
    expect(text).toContain('실제 가정의 절감량');
    expect(text).toContain('세부 조건은 확인하지 못했습니다');
    expect(text).not.toMatch(/[₩$]|\d[\d,]*원/);
    expect(energyComparisonText(products[0], products[0])).toBeNull();
  });

  it('정적 HTML에도 기본 비교와 출처·설치 링크가 남는다', () => {
    const html = renderToStaticMarkup(createElement(EnergyComparison, { products }));
    expect(html).toContain('0.57');
    expect(html).toContain('6.84');
    expect(html).toContain('href="' + rf85.sourceUrl.replaceAll('&', '&amp;') + '"');
    expect(html).toContain('/products/samsung-bespoke-4door-rf85#fit');
    expect(html).toContain('/blog/fridge-monthly-kwh-measurement');
    expect(html).not.toContain('예상 전기요금');
    expect(html).toContain('공단 기준이 아니라 살림랩이 정한 기준입니다');
    expect(html).toContain('탐색적(exploratory) 규칙');
    expect(html).toContain('에어컨 CTH06QBW ↔ TAC-08CSD/TPH11I');
    expect(html).toContain('정수기 없음');
  });
});

// ── 2026-10-29 확대: 에어컨·정수기 신고값과 비교 가능 판정 ─────────────────────

interface KeaJsonModel {
  model: string;
  category: string;
  kea: {
    keaCategory: string; declarationId: string; url: string; declarant: string; itemName: string; value: number; unit: string;
    capacity: string; testLab: string; completedAt: string | null; checkedAt: string; indoorModel?: string; outdoorModel?: string;
  };
  comparableWith: string[];
  comparableWithLoose: string[];
}
const keaJson = JSON.parse(readFileSync(join(process.cwd(), 'research/evidence/2026-10-29/energy/kea-comparability.json'), 'utf8')) as { checkedAt: string; models: KeaJsonModel[] };
const monthlyModels = keaJson.models.filter((model) => model.kea.unit === 'kWh/월');

describe('공단 신고값 레코드와 원문 JSON', () => {
  it('월간 kWh 신고가 있는 에어컨 5개·정수기 3개를 빠짐없이 같은 값으로 담는다', () => {
    expect(monthlyModels.map((model) => model.model).sort()).toEqual(Object.values(entries).filter((entry) => entry.productCategory !== '냉장고').map((entry) => entry.modelNumber).sort());
    expect(monthlyModels.filter((model) => model.category === '에어컨')).toHaveLength(5);
    expect(monthlyModels.filter((model) => model.category === '정수기')).toHaveLength(3);
    for (const { model, category, kea } of monthlyModels) {
      const entry = getEnergyMeasurement(model)!;
      const [, label, value, unit] = /^(.+?) ([\d,.]+)(W|L)/.exec(kea.capacity)!;
      expect(entry).toMatchObject({
        modelNumber: model, productCategory: category, category: kea.keaCategory.split(' (')[0], itemName: kea.itemName,
        value: kea.value, unit: kea.unit, declarationId: kea.declarationId, sourceUrl: kea.url, declarant: kea.declarant,
        testLab: kea.testLab, checkedAt: keaJson.checkedAt, capacity: { label, value: Number(value.replaceAll(',', '')), unit },
      });
      // 상세 페이지의 빈 완료일자를 목록 날짜로 메우지 않는다.
      expect(entry.completedAt).toBe(kea.completedAt ?? undefined);
      if (kea.indoorModel) expect(entry.declaredUnits).toEqual({ indoor: kea.indoorModel, outdoor: kea.outdoorModel });
    }
  });

  it('월간 kWh 항목이 없는 제습기·공기청정기·HP09는 레코드로 만들지 않는다', () => {
    const others = keaJson.models.filter((model) => model.kea.unit !== 'kWh/월').map((model) => model.model);
    expect(others.sort()).toEqual(['AC-M16-SC', 'DN2H160-IWK', 'HP09']);
    for (const model of others) expect(getEnergyMeasurement(model)).toBeUndefined();
  });

  it('제품 사양표의 기존 공단 수치 문자열이 같은 레코드에서 나와 화면 문구가 바뀌지 않는다', () => {
    const specOf = (model: string) => allAppliances.find((appliance) => appliance.modelNumber === model)!.techSpecs.extraSpecs;
    const cooling = (watts: string, kwh: string) => [{ label: '정격 냉방능력 (공단 신고)', value: watts }, { label: '월간소비전력량 (공단 신고·1:1)', value: kwh }];
    expect(specOf('AR07A9170HCN')).toEqual(cooling('3,000W', '103kWh'));
    expect(specOf('CTH06QBW')).toEqual(cooling('2,300W', '89.5kWh'));
    expect(specOf('CTH10QBW')).toEqual(cooling('4,100W', '154.2kWh'));
    expect(specOf('TAC-08CSD/TPH11I')).toEqual(cooling('2,350W', '87.8kWh'));
    expect(specOf('TAC-12CSD/TPH11I')).toEqual(cooling('3,515W', '137kWh'));
    const purifier = { label: '월간 소비전력량(에너지공단 신고)' };
    expect(specOf('CHPI-7400N')).toEqual([{ label: '정격 온수 전력', value: '2,950W' }, { ...purifier, value: '12.17kWh' }]);
    expect(specOf('WD523ACB')).toEqual([{ ...purifier, value: '12.17kWh' }]);
    expect(specOf('WPU-A710C')).toEqual([{ label: '정격 온수 전력', value: '2,900W' }, { ...purifier, value: '10.04kWh' }]);
    expect(() => energySpec('HP09')).toThrow();
    expect(() => ratedCoolingSpec('CHPI-7400N')).toThrow();
  });
});

describe('비교 가능 판정: 같은 공단 품목·신고 항목, 용량 차이 10% 이내', () => {
  const models = monthlyModels.map((model) => model.model);
  const partnersAt = (model: string, percent: number) => models.filter((other) => compareMonthlyEnergy(entries[model], entries[other], percent).kind === 'compared');

  it.each(monthlyModels.map((model) => [model.model, model] as const))('%s의 비교 상대가 원문 JSON의 판정과 같다', (_, model) => {
    expect(partnersAt(model.model, COMPARABLE_CAPACITY_GAP_PERCENT).sort()).toEqual([...model.comparableWith].sort());
    // 민감도 분석(20%)에서만 추가되는 상대
    const strict = partnersAt(model.model, 10);
    expect(partnersAt(model.model, 20).filter((other) => !strict.includes(other)).sort()).toEqual([...model.comparableWithLoose].sort());
  });

  it('현재 데이터에서 냉장고 밖의 비교 가능 쌍은 에어컨 CTH06QBW ↔ TAC-08CSD/TPH11I 하나다', () => {
    const nonFridge = comparablePairs(products).filter(([a]) => a.measurement.productCategory !== '냉장고').map(([a, b]) => `${a.modelNumber}↔${b.modelNumber}`);
    expect(nonFridge).toEqual(['CTH06QBW↔TAC-08CSD/TPH11I']);
    // 냉장고 4개는 용량 차이가 최대 5.0%라 기존처럼 서로 모두 비교된다.
    expect(comparablePairs(fridges)).toHaveLength(6);
    expect(capacityGapPercent(entries.RF85C90D1AP.capacity, entries.S834MWW1D.capacity)).toBe(5);
  });

  it('비교할 수 있는 에어컨 쌍은 신고값의 차이를 계산한다', () => {
    expect(compareMonthlyEnergy(entries.CTH06QBW, entries['TAC-08CSD/TPH11I'])).toEqual({
      kind: 'compared', monthlyDifference: 1.7, annualDifference: 20.4, lowerModel: 'TAC-08CSD/TPH11I', capacityGapPercent: 2.1,
    });
  });

  it('20.0% 같은 경계값을 반올림 오차 없이 판정한다', () => {
    expect(capacityGapPercent(entries.WD523ACB.capacity, entries['WPU-A710C'].capacity)).toBe(20);
    expect(capacityWithin(entries.WD523ACB.capacity, entries['WPU-A710C'].capacity, 20)).toBe(true);
    expect(capacityWithin(entries.WD523ACB.capacity, entries['WPU-A710C'].capacity, 19.9)).toBe(false);
  });
});

describe('비교할 수 없는 조합은 이유만 보여 주고 차이를 계산하지 않는다', () => {
  it('정격냉방능력 차이가 크면 두 값과 차이 %를 알리고 kWh 차이를 내지 않는다', () => {
    const result = compareMonthlyEnergy(entries.CTH06QBW, entries['TAC-12CSD/TPH11I']);
    expect(result).toMatchObject({ kind: 'incompatible', reason: 'capacity', capacityGapPercent: 34.6 });
    expect(result.kind === 'incompatible' && result.message).toContain('2,300W와 3,515W로 34.6% 차이');
    expect(result).not.toHaveProperty('monthlyDifference');
  });

  it('14.7%처럼 20% 민감도 범위 안이어도 10% 기준 밖이면 계산하지 않는다', () => {
    expect(compareMonthlyEnergy(entries.AR07A9170HCN, entries['TAC-12CSD/TPH11I'])).toMatchObject({ kind: 'incompatible', capacityGapPercent: 14.7 });
  });

  it('정수기는 대리 지표인 냉수탱크 용량 차이 때문에 세 모델 모두 서로 비교하지 않는다', () => {
    expect(entries['CHPI-7400N'].capacity.proxy).toBe(true);
    const result = compareMonthlyEnergy(entries['CHPI-7400N'], entries.WD523ACB);
    expect(result).toMatchObject({ kind: 'incompatible', reason: 'capacity', capacityGapPercent: 32 });
    expect(result.kind === 'incompatible' && result.message).toContain('냉수저장탱크 용량이 1.02L와 1.5L로 32.0% 차이');
  });

  it('공단 품목이 다르면 품목을 알리고 비교하지 않는다', () => {
    const result = compareMonthlyEnergy(rf85, entries.CTH06QBW);
    expect(result).toMatchObject({ kind: 'incompatible', reason: 'category' });
    expect(result.kind === 'incompatible' && result.message).toContain('전기냉장고(냉동냉장고) · 전기냉방기');
    expect(energyComparisonText(products.find((p) => p.modelNumber === 'CTH06QBW')!, products.find((p) => p.modelNumber === 'CTH10QBW')!)).toBeNull();
  });

  it('상대를 지정하지 않으면 비교할 수 있는 모델을, 없으면 같은 품목의 다른 모델을 고른다', () => {
    expect(parseEnergySelection('CTH06QBW', null, products)).toEqual({ a: 'CTH06QBW', b: 'TAC-08CSD/TPH11I' });
    expect(parseEnergySelection('tac-08csd/tph11i', null, products)).toEqual({ a: 'TAC-08CSD/TPH11I', b: 'CTH06QBW' });
    expect(parseEnergySelection('CHPI-7400N', null, products)).toEqual({ a: 'CHPI-7400N', b: 'WD523ACB' });
    expect(comparablePartners('CHPI-7400N', products)).toEqual([]);
  });

  it('에어컨 비교 기록에는 비교 조건과 살림랩 기준이라는 사실을 함께 남긴다', () => {
    const cth = products.find((p) => p.modelNumber === 'CTH06QBW')!;
    const tcl = products.find((p) => p.modelNumber === 'TAC-08CSD/TPH11I')!;
    const text = energyComparisonText(cth, tcl)!;
    expect(text).toContain('살림랩 에어컨 전기사용량 비교');
    expect(text).toContain('정격냉방능력 차이 2.1%(살림랩 기준 10% 이내, 공단 기준 아님)');
    expect(text).toContain('월 1.70kWh / 연 20.40kWh');
    expect(text).toContain('실외기·배관');
    expect(text).not.toMatch(/\d[\d,]*원/);
  });
});
