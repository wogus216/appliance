import { describe, it, expect } from 'vitest';
import { allBrandProfiles, getBrandProfile, getBrandsMissingProfile } from '@/lib/data/brands';
import { allCatalogAppliances } from '@/lib/data/appliances';
import { CATEGORY_SLUGS } from '@/lib/category-config';
import type { ApplianceCategory } from '@/types/appliance';

// 공개 보류된 제품의 브랜드도 카탈로그 브랜드다 — 원고는 되살릴 때 그대로 쓴다.
const CATALOG_BRANDS = new Set(allCatalogAppliances.map((a) => a.brand));
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

// ─────────────────────────────────────────────────────────────────────────────
// 브랜드 간 중복.
//
// 원래 계획은 브랜드 페이지를 제품·카테고리 페이지와 대조하는 것이었으나,
// 브랜드명·카테고리명·제품명이 설계상 양쪽에 나오므로 임계값 없이는 항상 걸리거나
// 항상 통과한다. 실제 위험은 17개 서술이 서로 붕어빵이 되는 쪽이고, 그것은
// 빌드 산출물 없이 데이터만으로 검사된다.
// ─────────────────────────────────────────────────────────────────────────────

/** 한 프로필에서 사람이 쓴 산문만 모은다. 파생 통계와 출처 제목은 대상이 아니다 */
function proseOf(p: { intro: string; editorNote: string; lines: { what: string }[] }): string[] {
  return [p.intro, p.editorNote, ...p.lines.map((l) => l.what)];
}

/**
 * 문장 단위로 쪼갠다. 공백을 정규화하고 10자 미만 조각은 버린다 —
 * 짧은 상투구는 우연히 겹칠 수 있어 붕어빵의 증거가 되지 못한다.
 */
function sentences(text: string): string[] {
  return text
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.replace(/\s+/g, ' ').trim())
    .filter((s) => s.length >= 10);
}

/** 공백을 지운 문자 4-gram 집합. 한국어는 어절이 붙어 있어 단어 단위보다 안정적이다 */
function grams(text: string, n = 4): Set<string> {
  const t = text.replace(/\s+/g, '');
  const out = new Set<string>();
  for (let i = 0; i + n <= t.length; i++) out.add(t.slice(i, i + n));
  return out;
}

function jaccard(a: Set<string>, b: Set<string>): number {
  if (a.size === 0 || b.size === 0) return 0;
  let inter = 0;
  for (const g of a) if (b.has(g)) inter++;
  return inter / (a.size + b.size - inter);
}

describe('brands: 서술이 서로 붕어빵이 아니다', () => {
  it('두 브랜드가 같은 문장을 쓰지 않는다', () => {
    const firstUse = new Map<string, string>();
    const dupes: string[] = [];

    for (const p of allBrandProfiles) {
      for (const s of new Set(proseOf(p).flatMap(sentences))) {
        const first = firstUse.get(s);
        if (first) dupes.push(`${first} = ${p.brand}: "${s}"`);
        else firstUse.set(s, p.brand);
      }
    }

    expect(dupes, `브랜드 간 중복 문장 ${dupes.length}건\n${dupes.join('\n')}`).toEqual([]);
  });

  // 실패시키지 않고 출력만 한다. 임계값을 못 박으면 집필 규칙 4번(검증 가능한
  // 정형문으로 쓰기)과 싸우게 되므로, 판단은 검수하는 사람에게 넘긴다.
  it('겹침이 큰 쌍을 검수용으로 출력한다', () => {
    const profiles = allBrandProfiles.map((p) => ({
      brand: p.brand,
      grams: grams(proseOf(p).join(' ')),
    }));

    const pairs: { pair: string; score: number }[] = [];
    for (let i = 0; i < profiles.length; i++) {
      for (let j = i + 1; j < profiles.length; j++) {
        pairs.push({
          pair: `${profiles[i].brand} ↔ ${profiles[j].brand}`,
          score: jaccard(profiles[i].grams, profiles[j].grams),
        });
      }
    }

    const top = pairs.sort((a, b) => b.score - a.score).slice(0, 5);
    if (top.length > 0) {
      const lines = top.map((t) => `  ${t.score.toFixed(3)}  ${t.pair}`).join('\n');
      console.log(`[검수용] 서술 겹침 상위 ${top.length}쌍 (4-gram Jaccard)\n${lines}`);
    }

    // 이 테스트는 판정하지 않고 출력만 한다. 다만 쌍 계산 자체가 조용히 비지 않았는지는
    // 확인한다 — 출력이 빈 것과 겹침이 없는 것은 다른 이야기다.
    // n=0일 때 (n*(n-1))/2가 -0이 되어 Object.is 기반 toBe가 깨지므로 정규화한다.
    const n = allBrandProfiles.length;
    expect(pairs.length).toBe(Math.max(0, (n * (n - 1)) / 2));
  });
});
