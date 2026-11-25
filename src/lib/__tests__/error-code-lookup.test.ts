import { describe, expect, it } from 'vitest';
import { getErrorCodeLookupBrands } from '@/lib/data/error-codes/lookup';
import { lookupErrorCode } from '@/lib/error-code-lookup';

const brands = getErrorCodeLookupBrands();

function search(brand: string, code: string, model = '') {
  return lookupErrorCode(brands.find((option) => option.brand === brand)!.entries, code, model);
}

describe('모델명과 코드 검색', () => {
  it('같은 코드를 쓰는 로보락 모델을 구분하고 해당 공식 설명서와 점검 위치를 연결한다', () => {
    const { codeMatches, modelMatches } = search('Roborock', 'error4', ' s7 ');
    expect(codeMatches).toHaveLength(2);
    expect(modelMatches).toHaveLength(1);
    expect(modelMatches[0].source).toMatchObject({
      model: 'S7',
      manualLabel: expect.stringContaining('Roborock S7 공식 영문 설명서'),
      href: '/error-codes/Roborock#action-roborock-s7-error4',
    });
    expect(search('Roborock', 'Error 4', 'Qrevo Curv').modelMatches[0].source.href)
      .toBe('/error-codes/Roborock#action-roborock-error4');
    expect(search('Roborock', 'Error 4', 'S7 MaxV').modelMatches).toEqual([]);
  });

  it('쿠쿠 E4에서 확인된 모델만 상세 안내에 연결하고 SK매직 E4는 일반 안내로 남긴다', () => {
    expect(search('Cuckoo', 'e4', 'cdw-a0611ts').modelMatches[0].source.href)
      .toBe('/error-codes/Cuckoo/dishwasher/e4');
    expect(search('Cuckoo', 'E4', 'CDW-A0611').modelMatches).toEqual([]);
    const sk = search('SKMagic', 'E4', 'DWA-81R0D00SL');
    expect(sk.codeMatches[0].href).toBe('/error-codes/SKMagic/dishwasher/e4');
    expect(sk.modelMatches).toEqual([]);
  });

  it('함께 표기된 코드는 개별 코드로도 찾되 보일러 제품군은 모델 일치로 표시하지 않는다', () => {
    expect(search('Cuckoo', 'e7').codeMatches.map((entry) => entry.code)).toContain('E6 / E7');
    const boiler = search('Navien', 'E250', '가스보일러');
    expect(boiler.codeMatches.map((entry) => entry.code)).toContain('Er50 / E250');
    expect(boiler.modelMatches).toEqual([]);
  });

  it('브랜드에 없는 코드나 빈 코드는 결과를 반환하지 않는다', () => {
    expect(search('Cuckoo', 'Error 4', 'S7').codeMatches).toEqual([]);
    expect(search('Roborock', '   ', 'S7').codeMatches).toEqual([]);
  });
});
