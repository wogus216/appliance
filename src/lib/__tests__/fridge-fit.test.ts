import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';
import {
  checkFridgeFit, EMPTY_FIT_INPUTS, fridgeFitHref, fridgeFitRecord, fridgeFitTargets, fridgeFrontClearance, parseFitMeasurement, parseFitModel,
} from '@/lib/fridge-fit';
import { FRIDGE_FIT_PRODUCTS, getFridgeFitProduct } from '@/lib/data/fridge-installation';
import { getApplianceBySlug } from '@/lib/data/appliances';
import { FridgeFitTool } from '@/components/tools/fridge-fit-tool';

vi.mock('next/navigation', () => ({ useRouter: () => ({ replace: vi.fn() }), useSearchParams: () => new URLSearchParams() }));
const rf85 = getFridgeFitProduct('RF85C90D1AP')!;
const lg = getFridgeFitProduct('T873MEE111')!;

describe('집 실측값 입력', () => {
  it('빈칸은 0으로 계산하지 않으며 올바른 천 단위 쉼표도 받는다', () => {
    expect(parseFitMeasurement(' ')).toEqual({ kind: 'empty' });
    expect(parseFitMeasurement('1,012.5')).toEqual({ kind: 'value', mm: 1012.5 });
    expect(parseFitMeasurement(' 1318 ')).toEqual({ kind: 'value', mm: 1318 });
    expect(checkFridgeFit(rf85, EMPTY_FIT_INPUTS).every((c) => c.kind === 'unknown')).toBe(true);
  });
  it.each(['0', '-10', 'NaN', 'Infinity', '1e3', '100cm', '20,001', '1,00', '100.22'])('유효하지 않은 값 %s는 계산에서 제외한다', (raw) => {
    expect(parseFitMeasurement(raw).kind).toBe('invalid');
    expect(checkFridgeFit(rf85, { ...EMPTY_FIT_INPUTS, spaceWidth: raw })[0].kind).toBe('invalid');
  });
});

describe('설명서의 각 기준을 따로 적용', () => {
  it('RF85 본체에 좌우 각 50mm를 더하고 경계값을 정확히 구별한다', () => {
    const check = (spaceWidth: string) => checkFridgeFit(rf85, { ...EMPTY_FIT_INPUTS, spaceWidth })[0];
    expect(check('1011.9')).toMatchObject({ kind: 'short', message: expect.stringContaining('0.1mm 부족') });
    expect(check('1012')).toMatchObject({ kind: 'measured', message: expect.stringContaining('차이 0mm') });
    expect(check('1100').message).toContain('88mm 큼');
  });
  it('LG 좌우 100mm를 고장 진단 권고로 밝혀 설치 절의 조건과 혼합하지 않는다', () => {
    const check = checkFridgeFit(lg, { ...EMPTY_FIT_INPUTS, spaceWidth: '1113' })[0];
    expect(check.kind).toBe('short');
    expect(check.message).toContain('1mm 부족');
    expect(check.message).toContain('고장 진단 절의 권고');
    expect(check.message).toContain('설치 절에는 좌우 수치가 없어');
  });
  it('자리 폭이 넓어도 별도 문 개방 폭이 부족하면 이를 드러낸다', () => {
    const checks = checkFridgeFit(rf85, { ...EMPTY_FIT_INPUTS, spaceWidth: '1200', openingWidth: '1400' });
    expect(checks[0].kind).toBe('measured');
    expect(checks[2]).toMatchObject({ kind: 'short', message: expect.stringContaining('98mm 부족') });
    expect(checks[2].message).toContain('같은 각도의 점유 직사각형으로 해석하지');
  });
  it('앞 통로 대신 뒷벽부터의 거리를 사용하며 후면 여유를 더한다', () => {
    const checks = checkFridgeFit(rf85, { ...EMPTY_FIT_INPUTS, frontDistance: '1300' });
    expect(checks[3]).toMatchObject({ kind: 'short', message: expect.stringContaining('18mm 부족') });
    expect(checks[3].message).toContain('50 + 문 개방 깊이 1,268 = 1,318mm');
    expect(checks[3].message).toContain('사람이 서거나 지나는 여유는 포함하지');
    expect(checkFridgeFit(lg, { ...EMPTY_FIT_INPUTS, frontDistance: '1393' })[3].message).toContain('차이 0mm');
  });
  it('높이에 단일 상부 여유를 만들어 더하지 않고 미확인 조건을 남긴다', () => {
    const check = checkFridgeFit(lg, { ...EMPTY_FIT_INPUTS, spaceHeight: '1812' })[1];
    expect(check.message).toContain('25mm 큼');
    expect(check.message).toContain('기준점이 달라');
    expect(check.message).toContain('천장~제품 100mm');
    expect(checkFridgeFit(rf85, { ...EMPTY_FIT_INPUTS, spaceHeight: '1852' })[1].kind).toBe('short');
    expect(rf85.topNote).toContain('상부 간격 수치는 확인하지 못');
  });
  it('경로 폭이 충분해 보여도 문 분리·회전 반입을 자동으로 판정하지 않는다', () => {
    const check = checkFridgeFit(rf85, { ...EMPTY_FIT_INPUTS, routeWidth: '1000' })[4];
    expect(check.kind).toBe('manual');
    expect(check.message).toContain('785mm');
    expect(check.message).toContain('이 값만으로 반입 가능 여부를 판정하지');
    expect(lg.transportNote).toContain('문 분리 반입 절차를 확인하지 못');
  });
});

describe('설치 자료와 상담 기록 연결', () => {
  it('가상 주방 값을 실제 집 치수로 오해하지 않도록 기록에 출처를 남긴다', () => {
    const record = fridgeFitRecord(rf85, { ...EMPTY_FIT_INPUTS, spaceWidth: '1050' }, [], '예시 · 좁은 일자형 주방');
    expect(record).toContain('입력 치수의 출처: 예시 · 좁은 일자형 주방');
    expect(record).toContain('실제 집의 설치 판단에 사용하지 마세요');
  });
  it('네 모델이 공개 카탈로그의 정확 모델·치수와 일치한다', () => {
    expect(FRIDGE_FIT_PRODUCTS).toHaveLength(4);
    for (const product of FRIDGE_FIT_PRODUCTS) {
      const catalog = getApplianceBySlug(product.slug)!;
      expect(catalog.modelNumber).toBe(product.modelNumber);
      expect(catalog.techSpecs.dimensions).toBe(`${product.width} x ${product.height} x ${product.depth}mm`);
      expect(product.sourceUrl).toMatch(/^https:\/\/(downloadcenter\.samsung\.com|gscs-b2c\.lge\.com)\//);
      expect(product.document).not.toBe('');
      expect(product.sourcePages).toContain('인쇄');
    }
    expect(getFridgeFitProduct('RF85C90D1AP-X')).toBeUndefined();
  });
  it('빈 값·지원하지 않는 모델을 다른 모델의 결과로 바꾸지 않는다', () => {
    expect(parseFitModel(null, FRIDGE_FIT_PRODUCTS)).toBe('RF85C90D1AP');
    expect(parseFitModel(' t873mee111 ', FRIDGE_FIT_PRODUCTS)).toBe('T873MEE111');
    expect(parseFitModel('RF85', FRIDGE_FIT_PRODUCTS)).toBe('');
    expect(parseFitModel('', FRIDGE_FIT_PRODUCTS)).toBe('');
    expect(parseFitModel(null, [])).toBe('');
  });
  it('모델 주소는 복원하고 개인 실측값은 주소에 포함하지 않는다', () => {
    const url = new URL(fridgeFitHref(lg.modelNumber), 'https://salimlab.kr');
    expect(parseFitModel(url.searchParams.get('model'), FRIDGE_FIT_PRODUCTS)).toBe(lg.modelNumber);
    expect([...url.searchParams.keys()]).toEqual(['model']);
  });
  it('상담 기록은 미확인·부족·자료 준비를 구별하고 원문과 가정을 포함한다', () => {
    const record = fridgeFitRecord(rf85, { ...EMPTY_FIT_INPUTS, spaceWidth: '1000', spaceHeight: 'zero', routeWidth: '800' }, ['route']);
    expect(record).toContain('12mm 부족');
    expect(record).toContain('입력 오류');
    expect(record).toContain('문이 움직일 구역의 확보 폭: 미확인');
    expect(record).toContain('[자료 준비함] 현관');
    expect(record).toContain('[확인 필요] 좌우');
    expect(record).toContain(rf85.sourceUrl);
    expect(record).toContain('설치 가능 판정이 아닙니다');
    expect(record).toContain('공유 주소로 복원되지 않습니다');
  });
  it('입력 없이도 정적 HTML에 모델 치수·출처·미확인 상태가 보인다', () => {
    const html = renderToStaticMarkup(createElement(FridgeFitTool, { products: FRIDGE_FIT_PRODUCTS }));
    expect(html).toContain('RF85C90D1AP');
    expect(html).toContain('아직 재지 않았습니다');
    expect(html).toContain(rf85.sourceUrl.replaceAll('&', '&amp;'));
    expect(html).toContain('value=""');
    expect(html).not.toContain('설치 가능합니다');
  });
});

describe('문 앞 공간과 값의 종류', () => {
  it('맞은편 장애물까지 남는 거리를 닫힌 본체와 문 개방 끝으로 나눠 계산한다', () => {
    expect(fridgeFrontClearance(rf85, EMPTY_FIT_INPUTS)).toBeUndefined();
    expect(fridgeFrontClearance(rf85, { ...EMPTY_FIT_INPUTS, frontDistance: '1250' })).toEqual({ closed: 270, open: -68 });
    expect(fridgeFrontClearance(lg, { ...EMPTY_FIT_INPUTS, frontDistance: '1393' })).toEqual({ closed: 375, open: 0 });
    expect(fridgeFitTargets(rf85)).toEqual({ spaceWidth: 1012, spaceHeight: 1853, openingWidth: 1498, frontDistance: 1318 });
  });
  it('삼성 문 개방 폭과 깊이의 각도가 다르다는 것을 결과 문장에 남긴다', () => {
    expect(rf85.openWidthBasis).toBe('최대 125° 개방');
    expect(rf85.openDepthBasis).toBe('90° 개방');
    expect(checkFridgeFit(rf85, { ...EMPTY_FIT_INPUTS, openingWidth: '1500' })[2].message).toContain('1,498mm(최대 125° 개방)');
    for (const product of FRIDGE_FIT_PRODUCTS) expect(product.openWidthBasis && product.openDepthBasis).toBeTruthy();
  });
  it('기록에서 설명서 치수·실측값·예시값·계산값을 구별한다', () => {
    const own = fridgeFitRecord(rf85, { ...EMPTY_FIT_INPUTS, spaceWidth: '1000', frontDistance: '1250' }, [], undefined, '2026-10-29');
    expect(own).toContain('기록일: 2026-10-29');
    expect(own).toContain('[공식 자료] 본체 폭×높이×깊이: 912×1853×930mm');
    expect(own).toContain('냉장고 자리의 안쪽 폭: [사용자 실측] 1000mm');
    expect(own).toContain('[계산값] 12mm 부족');
    expect(own).toContain('[계산값] 맞은편 장애물까지 남는 거리: 닫힌 본체 앞면부터 270mm, 문 개방 깊이 끝부터 -68mm(문 개방 범위와 겹침)');
    expect(own).not.toContain('[예시값]');
    const example = fridgeFitRecord(rf85, { ...EMPTY_FIT_INPUTS, spaceWidth: '1050' }, [], '예시 · 좁은 일자형 주방');
    expect(example).toContain('냉장고 자리의 안쪽 폭: [예시값] 1050mm');
    expect(example).not.toContain('[사용자 실측]');
  });
});
