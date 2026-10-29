import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';
import { EnergyComparison } from '@/components/compare/energy-comparison';
import {
  annualDeclaredEnergy, compareMonthlyEnergy, energyComparisonHref, energyComparisonText, parseEnergySelection,
} from '@/lib/energy-comparison';
import { FRIDGE_ENERGY_MEASUREMENTS as entries, getFridgeEnergyMeasurement } from '@/lib/data/energy-measurements';
import { getFridgeEnergyProducts } from '@/lib/fridge-energy';
import { getApplianceBySlug } from '@/lib/data/appliances';

// 정적 본문 검사는 Next 라우터의 제공자 없이 수행한다. 실제 주소 동기화는 브라우저에서 확인한다.
vi.mock('next/navigation', () => ({ useRouter: () => ({ replace: vi.fn() }), useSearchParams: () => new URLSearchParams() }));

const products = getFridgeEnergyProducts();
const rf85 = entries.RF85C90D1AP;
const t873 = entries.T873MEE111;

describe('공단 신고 전력량 비교', () => {
  it('RF85와 T873의 공식 월간 차이를 원 단위나 실제 절감량으로 바꾸지 않는다', () => {
    expect(compareMonthlyEnergy(rf85, t873)).toEqual({ kind: 'compared', monthlyDifference: 0.57, annualDifference: 6.84, lowerModel: 'RF85C90D1AP' });
    expect(compareMonthlyEnergy(t873, rf85)).toEqual(compareMonthlyEnergy(rf85, t873));
    expect(annualDeclaredEnergy(41.38)).toBe(496.56);
    expect(annualDeclaredEnergy(41.95)).toBe(503.4);
  });

  it('양문형 두 모델은 제조사 표기의 역순을 가져오지 않고 신고값끼리 계산한다', () => {
    expect(compareMonthlyEnergy(entries.RS84B5061M9, entries.S834MWW1D)).toEqual({ kind: 'compared', monthlyDifference: 0.63, annualDifference: 7.56, lowerModel: 'RS84B5061M9' });
  });

  it.each([
    { ...t873, unit: 'kWh/년' as const },
    { ...t873, unit: 'W' as const },
    { ...t873, unit: 'Wh/회' as const },
    { ...t873, category: '김치냉장고' },
    { ...t873, comparisonBasis: 'manufacturer-label' },
    { ...t873, comparisonBasis: '' },
  ])('다른 단위·품목·신고 범위는 자동으로 환산하지 않는다: %j', (other) => {
    expect(compareMonthlyEnergy(rf85, other).kind).toBe('incompatible');
  });

  it.each([0, -1, Number.NaN, Infinity])('잘못된 수치 %s는 계산하지 않는다', (value) => {
    expect(compareMonthlyEnergy(rf85, { ...t873, value }).kind).toBe('invalid');
  });

  it('같은 모델과 다른 모델의 같은 신고값을 구별한다', () => {
    expect(compareMonthlyEnergy(rf85, rf85).kind).toBe('same-model');
    expect(compareMonthlyEnergy(rf85, { ...t873, value: rf85.value })).toEqual({ kind: 'compared', monthlyDifference: 0, annualDifference: 0, lowerModel: null });
  });

  it('정확한 모델의 원문 수치와 기존 제품 사양표가 같은 레코드를 쓴다', () => {
    const expected = [
      ['RF85C90D1AP', 41.38, '252230128'], ['T873MEE111', 41.95, '252220489'],
      ['RS84B5061M9', 51.01, '252230494'], ['S834MWW1D', 51.64, '252220710'],
    ] as const;
    expect(products).toHaveLength(4);
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
    expect(getFridgeEnergyMeasurement('RF85C90D1AP-X')).toBeUndefined();
    expect(getFridgeEnergyMeasurement('__proto__')).toBeUndefined();
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
  });
});
