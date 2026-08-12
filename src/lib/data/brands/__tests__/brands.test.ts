import { describe, it, expect } from 'vitest';
import { allBrandProfiles, getBrandProfile, getBrandsMissingProfile } from '@/lib/data/brands';
import { getAllBrands } from '@/lib/data/appliances';
import { CATEGORY_SLUGS } from '@/lib/category-config';
import type { ApplianceCategory } from '@/types/appliance';

const CATALOG_BRANDS = new Set(getAllBrands());
const VALID_CATEGORIES = new Set(Object.keys(CATEGORY_SLUGS) as ApplianceCategory[]);

// ─────────────────────────────────────────────────────────────────────────────
// 집필 진행률.
//
// 브랜드 원고를 다 쓸 때까지 이 테스트는 계속 실패한다. 의도된 것이다.
// 실패가 이 하나뿐이라 그동안 새로 생긴 고장과 구분되고, 실패 메시지가 곧 남은
// 할 일 목록이다. skip하거나 기대값을 낮추지 말 것 — 원고를 쓰면 저절로 통과한다.
// "17개가 다 차기 전에는 배포하지 않는다"는 결정을 코드로 옮긴 것이기도 하다.
// ─────────────────────────────────────────────────────────────────────────────
describe('brands: 집필 진행률', () => {
  it('카탈로그의 모든 브랜드에 프로필이 있다', () => {
    const missing = getBrandsMissingProfile();
    const done = CATALOG_BRANDS.size - missing.length;
    expect(
      missing,
      `${done}/${CATALOG_BRANDS.size} 완료. 남은 브랜드: ${missing.join(', ')}`,
    ).toEqual([]);
  });
});

describe('brands: 쓰여진 프로필의 무결성', () => {
  it('brand가 카탈로그에 실재하고 중복되지 않는다', () => {
    const seen = new Set<string>();
    for (const p of allBrandProfiles) {
      expect(CATALOG_BRANDS, `${p.brand}: 카탈로그에 없는 브랜드`).toContain(p.brand);
      expect(seen.has(p.brand), `${p.brand}: 프로필이 두 번 있다`).toBe(false);
      seen.add(p.brand);
      expect(getBrandProfile(p.brand)).toBe(p);
    }
  });

  it('서술 필드가 비어 있지 않다', () => {
    for (const p of allBrandProfiles) {
      expect(p.intro.trim().length, `${p.brand}: intro가 비었다`).toBeGreaterThan(0);
      expect(p.editorNote.trim().length, `${p.brand}: editorNote가 비었다`).toBeGreaterThan(0);
    }
  });

  // 라인업 네이밍이 이 페이지의 핵심 고유 콘텐츠다. 하나도 없으면 브랜드 페이지가
  // 다시 제품 그리드뿐인 얇은 페이지로 돌아간다.
  it('lines가 최소 하나 있고 각 항목이 채워져 있다', () => {
    for (const p of allBrandProfiles) {
      expect(p.lines.length, `${p.brand}: lines가 비었다`).toBeGreaterThan(0);
      for (const line of p.lines) {
        expect(line.name.trim().length, `${p.brand}: 이름 없는 라인`).toBeGreaterThan(0);
        expect(line.what.trim().length, `${p.brand}/${line.name}: what이 비었다`).toBeGreaterThan(0);
      }
    }
  });

  it('lines[].categories가 실재하는 카테고리다', () => {
    for (const p of allBrandProfiles) {
      for (const line of p.lines) {
        for (const c of line.categories ?? []) {
          expect(VALID_CATEGORIES, `${p.brand}/${line.name}: 없는 카테고리 '${c}'`).toContain(c);
        }
      }
    }
  });

  // 편집 경계: 근거 없는 페이지를 만들지 않는다는 규칙을 테스트로 강제한다.
  it('sources가 비어 있지 않고 url·title이 채워져 있다', () => {
    for (const p of allBrandProfiles) {
      expect(p.sources.length, `${p.brand}: sources가 비었다`).toBeGreaterThan(0);
      for (const s of p.sources) {
        expect(s.url, `${p.brand}: 출처 URL이 http(s)가 아니다`).toMatch(/^https?:\/\//);
        expect(s.title.trim().length, `${p.brand}: 출처 제목이 비었다`).toBeGreaterThan(0);
      }
    }
  });

  // 어떤 출처가 어떤 문장을 뒷받침하는지는 일반적으로 코드가 알 수 없지만, A/S 번호만은
  // 출처를 필드에 직접 묶어 검사한다. 틀린 번호가 실제 피해가 되는 유일한 항목이다.
  it('serviceCenter가 있으면 sourceUrl이 sources에 실재한다', () => {
    for (const p of allBrandProfiles) {
      if (!p.serviceCenter) continue;
      const urls = new Set(p.sources.map((s) => s.url));
      expect(
        urls,
        `${p.brand}: serviceCenter.sourceUrl(${p.serviceCenter.sourceUrl})이 sources에 없다`,
      ).toContain(p.serviceCenter.sourceUrl);
      expect(p.serviceCenter.phone.trim().length, `${p.brand}: 전화번호가 비었다`).toBeGreaterThan(0);
    }
  });

  it('updated가 YYYY-MM 형식이다', () => {
    for (const p of allBrandProfiles) {
      expect(p.updated, `${p.brand}: updated 형식`).toMatch(/^\d{4}-\d{2}$/);
    }
  });
});
