import { describe, it, expect } from 'vitest';
import {
  allAppliances,
  allCatalogAppliances,
  getApplianceBySlug,
  getCardAppliances,
  getSimilarProducts,
  getAllBrands,
  getAllCategories,
} from '@/lib/data/appliances';
import { UNVERIFIED_SLUGS } from '@/lib/data/appliances/unverified';
import { getProductEditorial } from '@/lib/data/editorial';
import { getBrandErrorCodes, getErrorCodeBrands } from '@/lib/error-codes';
import { getPopularComparisons } from '@/lib/popular-comparisons';
import sitemap from '@/app/sitemap';
import { SITE_URL } from '@/lib/constants';

/**
 * 공개 경계 — 모델번호를 확인하지 못한 제품이 화면 어디에도 새어 나가지 않는지.
 *
 * 왜 이 테스트가 있는가: 필터를 `allAppliances` 한 곳에 뒀지만, 누군가
 * `allCatalogAppliances`를 화면 코드에서 쓰면 조용히 뚫린다. 그 구멍은 사람이
 * 화면을 하나하나 열어 보기 전에는 드러나지 않으므로 기계로 잡는다.
 */

const unverified = [...UNVERIFIED_SLUGS];
const catalogSlugs = new Set(allCatalogAppliances.map((a) => a.slug));

describe('보류 목록 자체의 정합성', () => {
  it('비어 있지 않다', () => {
    expect(unverified.length).toBeGreaterThan(0);
  });

  it('모든 slug가 실재하는 카탈로그 제품이다 (오타로 무효가 된 줄이 없다)', () => {
    const dangling = unverified.filter((s) => !catalogSlugs.has(s));
    expect(dangling, `카탈로그에 없는 slug: ${dangling.join(', ')}`).toEqual([]);
  });

  it('공개 카탈로그 = 전체 − 보류', () => {
    expect(allAppliances.length).toBe(allCatalogAppliances.length - UNVERIFIED_SLUGS.size);
  });
});

describe('보류 제품은 어떤 목록에도 나오지 않는다', () => {
  it('allAppliances', () => {
    const leaked = allAppliances.filter((a) => UNVERIFIED_SLUGS.has(a.slug)).map((a) => a.slug);
    expect(leaked).toEqual([]);
  });

  it('getApplianceBySlug는 undefined를 준다 (→ 페이지가 notFound로 간다)', () => {
    for (const s of unverified) {
      expect(getApplianceBySlug(s), s).toBeUndefined();
    }
  });

  it('카드 목록(홈·카테고리·브랜드·검색)', () => {
    const leaked = getCardAppliances().filter((a) => UNVERIFIED_SLUGS.has(a.slug)).map((a) => a.slug);
    expect(leaked).toEqual([]);
  });

  it('유사 제품 — 공개 제품이 보류 제품을 참조해도 화면에는 안 나온다', () => {
    // 참조 자체는 데이터에 남아 있다. 되살릴 때 다시 이어져야 하므로 지우지 않는다.
    const referencing = allAppliances.filter((a) =>
      a.similarProducts.some((s) => UNVERIFIED_SLUGS.has(s)),
    );
    expect(referencing.length, '참조가 하나도 없으면 이 테스트는 아무것도 지키지 않는다').toBeGreaterThan(0);

    for (const a of allAppliances) {
      const leaked = getSimilarProducts(a.slug).filter((s) => UNVERIFIED_SLUGS.has(s.slug));
      expect(leaked.map((s) => s.slug), a.slug).toEqual([]);
    }
  });

  it('에러코드 브랜드 허브', () => {
    for (const brand of getErrorCodeBrands()) {
      for (const group of getBrandErrorCodes(brand)) {
        for (const entry of group.entries) {
          const leaked = entry.products.filter((p) => UNVERIFIED_SLUGS.has(p.slug));
          expect(leaked.map((p) => p.slug), `${brand}/${entry.code}`).toEqual([]);
        }
      }
    }
  });

  it('인기 비교 조합', () => {
    const cards = getCardAppliances();
    for (const c of getPopularComparisons(cards, getAllCategories())) {
      for (const item of c.items) {
        expect(UNVERIFIED_SLUGS.has(item.slug), item.slug).toBe(false);
      }
    }
  });

  it('사이트맵', () => {
    const urls = sitemap().map((e) => e.url);
    for (const s of unverified) {
      expect(urls, s).not.toContain(`${SITE_URL}/products/${s}`);
    }
  });
});

describe('근거 없는 파생 숫자가 다시 들어오지 못한다', () => {
  // 월 전기요금은 히어로 배지·10년 총비용 계산기·등급별 요금표를 전부 움직인다.
  // 2026-08-23 감사에서 65개 전부 출처가 없어 걷어냈다(docs/spec-audit.md).
  // 다시 넣으려면 그 제품에 편집 출처가 함께 있어야 한다.
  it('월 전기요금이 있는 제품은 편집 출처를 갖는다', () => {
    const offenders = allCatalogAppliances
      .filter((a) => a.techSpecs.monthlyElectricityCost != null)
      .filter((a) => !getProductEditorial(a.slug)?.sources.length)
      .map((a) => a.slug);
    expect(
      offenders,
      `출처 없이 월 전기요금을 들고 있는 제품: ${offenders.join(', ')}`,
    ).toEqual([]);
  });
});

describe('보류로 비어 버린 축은 목록에서 사라진다', () => {
  it('제품이 하나도 남지 않은 브랜드는 브랜드 목록에 없다', () => {
    const brands = new Set(getAllBrands());
    const withProducts = new Set(allAppliances.map((a) => a.brand));
    expect([...brands].filter((b) => !withProducts.has(b))).toEqual([]);
  });

  it('제품이 하나도 남지 않은 카테고리는 카테고리 목록에 없다', () => {
    const cats = new Set(getAllCategories());
    const withProducts = new Set(allAppliances.map((a) => a.category));
    expect([...cats].filter((c) => !withProducts.has(c))).toEqual([]);
  });
});
