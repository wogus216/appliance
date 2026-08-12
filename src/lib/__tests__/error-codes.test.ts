import { describe, it, expect } from 'vitest';
import {
  slugifyCode,
  errorCodeAnchorId,
  resolveErrorCodeAnchor,
  getErrorCodeBrands,
  getBrandErrorCodes,
} from '@/lib/error-codes';
import { allAppliances } from '@/lib/data/appliances';
import { CATEGORY_SLUGS } from '@/lib/category-config';

describe('slugifyCode', () => {
  it('공백과 기호를 하이픈으로 바꾼다', () => {
    expect(slugifyCode('CH 05')).toBe('ch-05');
    expect(slugifyCode('rd / Er FF')).toBe('rd-er-ff');
    expect(slugifyCode('88 88')).toBe('88-88');
  });

  it('한글은 남긴다', () => {
    expect(slugifyCode('냉각 이상')).toBe('냉각-이상');
  });
});

describe('errorCodeAnchorId', () => {
  it('카테고리 슬러그와 코드 슬러그를 잇는다', () => {
    expect(errorCodeAnchorId('에어컨', 'E1')).toBe('air-conditioner-e1');
    expect(errorCodeAnchorId('세탁기', 'CH 05')).toBe('washer-ch-05');
  });
});

describe('resolveErrorCodeAnchor', () => {
  it('본문까지 일치하는 항목의 실제 anchorId로 링크한다', () => {
    const brand = getErrorCodeBrands()[0];
    const appliance = allAppliances.find(
      (a) => a.brand === brand && (a.errorCodes?.length ?? 0) > 0,
    )!;
    const code = appliance.errorCodes![0];

    const expectedId = getBrandErrorCodes(brand)
      .find((g) => g.category === appliance.category)!
      .entries.find(
        (e) =>
          e.code === code.code &&
          e.description === code.description &&
          e.cause === code.cause &&
          e.solution === code.solution,
      )!.anchorId;

    expect(resolveErrorCodeAnchor(brand, appliance.category, code)).toBe(
      `/error-codes/${brand}#${expectedId}`,
    );
  });

  it('일치하는 항목이 없으면 앵커 없이 허브 상단으로 보낸다', () => {
    const brand = getErrorCodeBrands()[0];
    const appliance = allAppliances.find((a) => a.brand === brand)!;
    const fake = {
      code: '존재하지-않는-코드',
      description: '없음',
      cause: '없음',
      solution: '없음',
      severity: 'low' as const,
    };

    expect(resolveErrorCodeAnchor(brand, appliance.category, fake)).toBe(
      `/error-codes/${brand}`,
    );
  });

  // 이 테스트가 이 픽스의 핵심 게이트다. 같은 (카테고리,코드)에 본문이 다른 항목이 여럿이면
  // getBrandErrorCodes가 -2, -3 접미사를 붙이는데, 링크를 만드는 쪽이 본문을 보지 않고
  // 접미사 없는 id로만 링크하면 다른 제품의 답으로 연결된다. 전 제품·전 코드에 대해
  // resolveErrorCodeAnchor가 가리키는 항목이 실제로 그 제품 자신의 본문과 같은지 확인한다.
  it('모든 제품의 모든 에러코드가 자기 자신의 본문이 있는 항목으로 링크된다', () => {
    const mismatches: string[] = [];

    for (const a of allAppliances) {
      for (const ec of a.errorCodes ?? []) {
        if (!slugifyCode(ec.code)) continue;

        const href = resolveErrorCodeAnchor(a.brand, a.category, ec);
        const [path, anchorId] = href.split('#');
        const brand = path.replace('/error-codes/', '');

        const entry = getBrandErrorCodes(brand)
          .find((g) => g.category === a.category)
          ?.entries.find((e) => e.anchorId === anchorId);

        const matches =
          !!entry &&
          entry.description === ec.description &&
          entry.cause === ec.cause &&
          entry.solution === ec.solution &&
          entry.severity === ec.severity;

        if (!matches) mismatches.push(`${a.slug} ${ec.code}`);
      }
    }

    expect(
      mismatches,
      `${mismatches.length}건 불일치: ${mismatches.slice(0, 10).join(', ')}`,
    ).toEqual([]);
  });
});

describe('getErrorCodeBrands', () => {
  const brands = getErrorCodeBrands();

  it('에러코드를 가진 브랜드만 낸다', () => {
    expect(brands.length).toBeGreaterThan(0);
    for (const b of brands) {
      const has = allAppliances.some((a) => a.brand === b && (a.errorCodes?.length ?? 0) > 0);
      expect(has, `${b}는 에러코드가 없는데 목록에 있다`).toBe(true);
    }
  });

  it('중복이 없다', () => {
    expect(new Set(brands).size).toBe(brands.length);
  });

  it('에러코드를 가진 브랜드를 빠뜨리지 않는다', () => {
    const expected = new Set(
      allAppliances.filter((a) => a.errorCodes?.length).map((a) => a.brand),
    );
    expect(new Set(brands)).toEqual(expected);
  });
});

// 이 describe가 이 작업의 핵심 게이트다.
// 254개 페이지를 지우면서 코드 하나라도 증발하면 콘텐츠를 줄인 것이 된다.
describe('getBrandErrorCodes: 정보 손실 없음', () => {
  it.each(getErrorCodeBrands().map((b) => [b] as const))(
    '%s: 원본 데이터의 모든 (카테고리·코드·본문) 조합이 그대로 나온다',
    (brand) => {
      const expected = new Set<string>();
      for (const a of allAppliances) {
        if (a.brand !== brand) continue;
        for (const ec of a.errorCodes ?? []) {
          if (!slugifyCode(ec.code)) continue;
          expected.add(`${a.category}|${ec.code}|${ec.description}|${ec.cause}|${ec.solution}`);
        }
      }

      const actual = new Set<string>();
      for (const g of getBrandErrorCodes(brand)) {
        for (const e of g.entries) {
          actual.add(`${g.category}|${e.code}|${e.description}|${e.cause}|${e.solution}`);
        }
      }

      expect(actual).toEqual(expected);
    },
  );

  it.each(getErrorCodeBrands().map((b) => [b] as const))(
    '%s: 모든 (제품, 코드) 쌍이 어딘가의 products에 들어 있다',
    (brand) => {
      const expected = new Set<string>();
      for (const a of allAppliances) {
        if (a.brand !== brand) continue;
        for (const ec of a.errorCodes ?? []) {
          if (!slugifyCode(ec.code)) continue;
          expected.add(`${a.slug}|${ec.code}`);
        }
      }

      const actual = new Set<string>();
      for (const g of getBrandErrorCodes(brand)) {
        for (const e of g.entries) {
          for (const p of e.products) actual.add(`${p.slug}|${e.code}`);
        }
      }

      expect(actual).toEqual(expected);
    },
  );
});

describe('getBrandErrorCodes: 앵커 id', () => {
  it.each(getErrorCodeBrands().map((b) => [b] as const))('%s: id가 유일하다', (brand) => {
    const ids = getBrandErrorCodes(brand).flatMap((g) => g.entries.map((e) => e.anchorId));
    const dupes = ids.filter((id, i) => ids.indexOf(id) !== i);
    expect(dupes, `중복 id: ${[...new Set(dupes)].join(', ')}`).toEqual([]);
  });

  it.each(getErrorCodeBrands().map((b) => [b] as const))(
    '%s: 각 (카테고리, 코드)의 첫 항목은 접미사 없는 id를 갖는다',
    (brand) => {
      for (const g of getBrandErrorCodes(brand)) {
        const seen = new Set<string>();
        for (const e of g.entries) {
          const base = errorCodeAnchorId(g.category, e.code);
          if (!seen.has(base)) {
            expect(e.anchorId, `${brand} ${g.category} ${e.code}`).toBe(base);
            seen.add(base);
          }
        }
      }
    },
  );
});

describe('getBrandErrorCodes: 결정적 순서', () => {
  it('카테고리는 CATEGORY_SLUGS 선언 순서를 따른다', () => {
    const order = Object.keys(CATEGORY_SLUGS);
    for (const brand of getErrorCodeBrands()) {
      const got = getBrandErrorCodes(brand).map((g) => g.category as string);
      const sorted = [...got].sort((a, b) => order.indexOf(a) - order.indexOf(b));
      expect(got, `${brand}의 카테고리 순서가 선언 순서와 다르다`).toEqual(sorted);
    }
  });

  it('entries는 코드 오름차순이다', () => {
    for (const brand of getErrorCodeBrands()) {
      for (const g of getBrandErrorCodes(brand)) {
        const codes = g.entries.map((e) => e.code);
        const sorted = [...codes].sort((a, b) => a.localeCompare(b, 'ko'));
        expect(codes, `${brand} ${g.category}`).toEqual(sorted);
      }
    }
  });

  it('두 번 호출해도 같은 결과다', () => {
    const brand = getErrorCodeBrands()[0];
    expect(JSON.stringify(getBrandErrorCodes(brand))).toBe(
      JSON.stringify(getBrandErrorCodes(brand)),
    );
  });
});

describe('getBrandErrorCodes: 경계', () => {
  it('에러코드가 없는 브랜드는 빈 배열', () => {
    expect(getBrandErrorCodes('없는브랜드')).toEqual([]);
  });
});
