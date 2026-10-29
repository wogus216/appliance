import { describe, expect, it } from 'vitest';
import { EMPTY_STANDARD_INPUT, parseManufactureLabel, resolveStandard, standardRecordLines, warrantyStart, type StandardInput } from '@/lib/consumer-standards';
import { CATALOG_STANDARD_ITEM, STANDARD_ITEMS } from '@/lib/data/consumer-standards';
import { allAppliances } from '@/lib/data/appliances';

const input = (patch: Partial<StandardInput>): StandardInput => ({ ...EMPTY_STANDARD_INPUT, ...patch });
const TODAY = '2026-10-29';

describe('고시 [별표 Ⅲ] 값', () => {
  it('근거 파일의 기간을 옮겼다', () => {
    const byId = Object.fromEntries(STANDARD_ITEMS.map((item) => [item.id, item.row && [item.row.warrantyYears, item.row.partsYears]]));
    expect(byId).toMatchObject({
      'aircon-cooling': [2, 8], 'aircon-heat-pump': [1, 8], fridge: [1, 9], tv: [1, 9], 'water-purifier': [1, 7],
      dehumidifier: [1, 7], washer: [1, 7], dryer: [1, 7], fan: [2, 5],
    });
    for (const id of ['dishwasher', 'air-purifier', 'robot-vacuum', 'earbuds']) expect(byId[id]).toBeUndefined();
  });

  it('공개 제품의 모든 품목이 고시 품목으로 이어진다', () => {
    for (const appliance of allAppliances) expect(CATALOG_STANDARD_ITEM[appliance.category], appliance.category).toBeDefined();
  });
});

describe('품질보증기간 기산 기준(시행령 [별표 1] 4호 라·마목)', () => {
  it('구입일·인도일·교환일은 그 날부터 고시 기간을 더한다', () => {
    expect(resolveStandard(input({ itemId: 'water-purifier', basisDate: '2026-03-15' }), TODAY)?.warranty).toMatchObject({ kind: 'ready', start: '2026-03-15', end: '2027-03-15' });
    expect(resolveStandard(input({ itemId: 'water-purifier', basis: 'delivery', basisDate: '2026-03-20' }), TODAY)?.warranty).toMatchObject({ end: '2027-03-20', startLabel: '제품을 인도받은 날 2026-03-20' });
    expect(resolveStandard(input({ itemId: 'washer', basis: 'exchange', basisDate: '2026-06-01' }), TODAY)?.warranty).toMatchObject({ end: '2027-06-01', startLabel: '교환받은 날 2026-06-01' });
  });

  it('에어컨은 냉방 전용 2년, 냉난방 겸용 1년이다', () => {
    expect(resolveStandard(input({ itemId: 'aircon-cooling', basisDate: '2026-05-01' }), TODAY)?.warranty).toMatchObject({ end: '2028-05-01' });
    expect(resolveStandard(input({ itemId: 'aircon-heat-pump', basisDate: '2026-05-01' }), TODAY)?.warranty).toMatchObject({ end: '2027-05-01' });
  });

  it('판매일 확인 곤란이면 제조일·수입통관일에서 3개월 뒤부터 센다(말일 넘김은 그 달 말일)', () => {
    expect(warrantyStart('unknown-sale', '2025-11-30', 'manufacture')).toEqual({ start: '2026-02-28', label: '제조일 2025-11-30부터 3개월이 지난 2026-02-28' });
    expect(warrantyStart('unknown-sale', '2025-06-10', 'customs')?.label).toContain('수입통관일');
    expect(resolveStandard(input({ itemId: 'fridge', basis: 'unknown-sale', basisDate: '2025-11-30' }), TODAY)?.warranty).toMatchObject({ start: '2026-02-28', end: '2027-02-28' });
  });

  it('미래 날짜와 없는 날짜는 계산하지 않는다', () => {
    expect(resolveStandard(input({ itemId: 'tv', basisDate: '2026-11-01' }), TODAY)?.warranty.kind).toBe('invalid');
    expect(resolveStandard(input({ itemId: 'tv', basisDate: '2026-02-30' }), TODAY)?.warranty.kind).toBe('invalid');
    expect(resolveStandard(input({ itemId: 'tv' }), TODAY)?.warranty.kind).toBe('empty');
  });

  it('제조사 보증 종료일이 고시 기준보다 이르면 표시하고, 늦으면 표시하지 않는다', () => {
    const shorter = input({ itemId: 'aircon-cooling', basisDate: '2026-05-01', makerWarrantyEnd: '2027-05-01' });
    const resolution = resolveStandard(shorter, TODAY)!;
    expect(resolution.makerShorter).toBe(true);
    expect(standardRecordLines(resolution, shorter).join('\n')).toContain('4호 가목');
    expect(resolveStandard(input({ itemId: 'aircon-cooling', basisDate: '2026-05-01', makerWarrantyEnd: '2028-06-01' }), TODAY)!.makerShorter).toBe(false);
  });
});

describe('부품보유기간은 제조일 기산([별표 Ⅲ] 주석)', () => {
  it('구입일만 있으면 부품보유 종료일을 계산하지 않는다', () => {
    const parts = resolveStandard(input({ itemId: 'water-purifier', basisDate: '2026-03-15' }), TODAY)!.parts;
    expect(parts.kind).toBe('empty');
    expect('message' in parts && parts.message).toContain('구입일로 대신하지 않습니다');
  });

  it('제조연도·제조연월만 있으면 그 해·그 달의 말일을 제조일자로 본다', () => {
    expect(parseManufactureLabel('2024')).toMatchObject({ date: '2024-12-31' });
    expect(parseManufactureLabel('2024-02')).toMatchObject({ date: '2024-02-29' });
    expect(parseManufactureLabel('2024.3')).toMatchObject({ date: '2024-03-31' });
    expect(parseManufactureLabel('2024년 3월')).toMatchObject({ date: '2024-03-31' });
    expect(parseManufactureLabel('2024-03-15')).toMatchObject({ date: '2024-03-15', note: '명판의 제조일' });
    expect(parseManufactureLabel('2024-13')).toBeUndefined();
    expect(parseManufactureLabel('24-03')).toBeUndefined();
  });

  it('명판 제조일을 넣으면 고시 부품보유기간을 더한다', () => {
    expect(resolveStandard(input({ itemId: 'aircon-cooling', manufactureLabel: '2024-02' }), TODAY)!.parts).toMatchObject({ kind: 'ready', manufactureDate: '2024-02-29', end: '2032-02-29' });
    expect(resolveStandard(input({ itemId: 'water-purifier', manufactureLabel: '2024' }), TODAY)!.parts).toMatchObject({ end: '2031-12-31' });
    expect(resolveStandard(input({ itemId: 'fridge', manufactureLabel: '2026-10' }), TODAY)!.parts).toMatchObject({ kind: 'ready', end: '2035-10-31' });
    expect(resolveStandard(input({ itemId: 'fridge', manufactureLabel: '2026-11' }), TODAY)!.parts.kind).toBe('invalid');
  });
});

describe('고시 표에 없는 품목', () => {
  it.each(['dishwasher', 'air-purifier', 'robot-vacuum', 'earbuds'] as const)('%s는 유사품목으로 채우지 않고 확인 필요로 남긴다', (itemId) => {
    const value = input({ itemId, basisDate: '2026-03-15', manufactureLabel: '2024-03' });
    const resolution = resolveStandard(value, TODAY)!;
    expect(resolution.warranty.kind).toBe('not-listed');
    expect(resolution.parts.kind).toBe('not-listed');
    const lines = standardRecordLines(resolution, value).join('\n');
    expect(lines).toContain('[확인 필요] 고시 표에 해당 분류 없음');
    expect(lines).not.toContain('[계산값]');
  });

  it('품목을 고르지 않으면 아무것도 붙이지 않는다', () => {
    expect(resolveStandard(input({ basisDate: '2026-03-15' }), TODAY)).toBeUndefined();
  });
});
