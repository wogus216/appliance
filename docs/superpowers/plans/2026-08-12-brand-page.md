# 브랜드 페이지 보강 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** `/brand/*` 17개 페이지를 전부 1,200자 이상으로 만들어, 애드센스 thin content 판정의 최대 덩어리를 없앤다.

**Architecture:** 브랜드 레벨에만 존재하는 콘텐츠(라인업 네이밍·A/S·에러코드 체계)를 손으로 쓰는 `BrandProfile` 데이터 레이어에 담고, 통계는 `allAppliances`에서 파생한다. 페이지는 프로필이 없으면 지금 모습 그대로 렌더해, 17개를 한 번에 쏟아내지 않고 라운드로 나눠 집필하면서도 빌드가 계속 성공한다.

**Tech Stack:** Next.js 16 (`output: "export"`, 순수 정적), React 19, TypeScript, vitest, Tailwind v4

**설계 근거:** `docs/superpowers/specs/2026-08-12-brand-page-design.md` — 결정의 *이유*가 필요하면 이 스펙을 읽을 것.

## Global Constraints

- **이 저장소의 Next.js는 훈련 데이터와 다르다.** Next 관련 코드를 쓰기 전에 `node_modules/next/dist/docs/`의 해당 가이드를 읽는다 (AGENTS.md).
- **정적 export다.** `next.config.ts`가 `output: "export"`이므로 `redirects()`·`headers()`는 동작하지 않는다. 서버 런타임에 의존하는 것을 새로 만들지 않는다.
- **주석과 UI 문구는 한국어.** 커밋 메시지는 영어 (`git log` 참조).
- **집필 규칙 5개 (스펙 "집필 규칙" 절과 동일):**
  1. 근거 없는 우위 주장을 쓰지 않는다. 시장 지위를 언급하려면 출처를 단다.
  2. 라인업 이름은 제조사 공식 용어만 쓴다. 통칭·커뮤니티 용어는 쓰지 않는다.
  3. **A/S 번호는 제조사 공식 페이지를 Playwright로 실제로 열어 확인하고 그 URL을 `serviceCenter.sourceUrl`에 넣는다. 기억으로 쓰지 않는다.** 틀린 번호는 실제 피해가 된다.
  4. `editorNote`는 카탈로그 안의 제품에 근거해 검증 가능한 형태로 쓴다.
  5. `sources`가 빈 브랜드를 만들지 않는다.
- **17개가 다 차기 전에는 배포하지 않는다.**
- **조사는 Playwright MCP로 한다** (Task 8~12 전부에 적용):

  ```
  mcp__playwright__browser_navigate  { url: '<제조사 공식 페이지>' }
  mcp__playwright__browser_find      { regex: '\\d{4}-\\d{4}|1544|1588' }   // A/S 번호
  mcp__playwright__browser_find      { text: '<라인업 이름>' }               // 공식 명칭 확인
  mcp__playwright__browser_close                                            // 브랜드 조사 끝
  ```

  `browser_find`가 접근성 트리에서 매칭 노드와 주변 맥락만 돌려주므로 전체 스냅숏보다 싸다. 라인업 이름은 **검색 결과가 아니라 제조사 도메인 페이지에서** 확인한다.

  > ⚠️ **한 페이지에 번호가 여러 개 있다.** LG 고객지원 페이지를 실제로 열어보면 `02-3777-1114`(대표번호), `1544-7777`(구매/서비스 문의), `1544-7599`(홈스타일), `1544-8777`(사업자몰) 등이 한꺼번에 나온다. **A/S 수리 접수 번호와 구매 상담 번호는 다르다.** 어느 것이 무엇인지 주변 텍스트로 확인하고 고른다 — 번호 형식만 맞으면 테스트는 통과하므로 이 실수는 코드가 잡아주지 못한다. 확신이 없으면 `serviceCenter`를 생략한다.
- **Task 2가 심는 "집필 진행률" 테스트는 Task 12까지 계속 실패한다. 이것은 의도된 것이다 — 고치거나 skip 처리하지 말 것.**

## File Structure

**신규**
- `src/types/source.ts` — 사이트 공용 `SourceRef`
- `src/types/brand.ts` — `BrandLine`, `BrandProfile`
- `src/lib/data/brands/profiles.ts` — 손으로 쓰는 17개 프로필 (Task 8~12에서 채운다)
- `src/lib/data/brands/index.ts` — 조회 함수
- `src/lib/data/brands/__tests__/brands.test.ts` — 무결성·진행률·중복 테스트
- `src/lib/brand-stats.ts` — 카탈로그 파생 통계 + 비가전 브랜드 판정
- `src/lib/__tests__/brand-stats.test.ts`
- `src/lib/brand-copy.ts` — 브랜드별 메타데이터 문구
- `src/lib/__tests__/brand-copy.test.ts`
- `src/components/brand/lineup-section.tsx`
- `src/components/brand/stats-section.tsx`
- `src/components/brand/error-code-summary.tsx`
- `src/components/brand/service-section.tsx`
- `src/components/brand/sources-footer.tsx`
- `scripts/measure-page-length.mjs` — 빌드 산출물 분량 측정

**수정**
- `src/types/material.ts` — `MaterialSource`를 `SourceRef` 별칭으로
- `src/app/brand/[brand]/page.tsx` — 섹션 조립 + 메타데이터 문구

---

### Task 1: `SourceRef` 공용 타입 추출

성분 사전의 `MaterialSource`와 브랜드의 출처는 같은 모양이다. "출처는 발행처와 제목을 보인다"가 사이트 전체 편집 규칙이므로 타입도 공용으로 올린다. 기존 코드는 건드리지 않는다 — 별칭으로 남기므로 `MaterialSource`를 쓰는 곳은 그대로 컴파일된다.

**Files:**
- Create: `src/types/source.ts`
- Modify: `src/types/material.ts:14-21` (`MaterialSource` 선언부)

**Interfaces:**
- Consumes: 없음
- Produces: `SourceRef { url: string; title: string; publisher?: string }` — Task 2의 `BrandProfile.sources`가 쓴다

> **테스트가 없는 이유:** 런타임 동작이 0인 순수 타입 이동이다. 검증은 `tsc`와 기존 테스트가 그대로 통과하는 것으로 한다. 억지 테스트를 만들지 않는다.

- [ ] **Step 1: 공용 타입 파일 생성**

`src/types/source.ts`:

```ts
/**
 * 근거 출처 하나.
 *
 * url만으로는 링크 텍스트에 percent-encoding된 URL이 그대로 노출돼 title을 따로 둔다.
 * "출처는 발행처와 제목을 보인다"는 이 사이트 전체의 편집 규칙이라 타입도 공용이다.
 */
export interface SourceRef {
  url: string;
  /** 링크로 보여줄 제목. 스크린리더가 읽는 접근 가능한 이름이 된다 */
  title: string;
  /** 발행 주체 (예: '국가법령정보센터'). 있으면 제목 옆에 병기한다 */
  publisher?: string;
}
```

- [ ] **Step 2: `material.ts`를 별칭으로 바꾸기**

`src/types/material.ts`에서 아래 블록을

```ts
/** 근거 출처 하나. url만으로는 링크 텍스트가 percent-encoding된 URL 그대로 노출돼 title을 따로 둔다 */
export interface MaterialSource {
  url: string;
  /** 링크로 보여줄 제목. 스크린리더가 읽는 접근 가능한 이름이 된다 */
  title: string;
  /** 발행 주체 (예: '국가법령정보센터'). 있으면 제목 옆에 병기한다 */
  publisher?: string;
}
```

이것으로 교체한다:

```ts
/** 성분 사전의 출처. 사이트 공용 SourceRef와 같은 모양이라 별칭으로만 남긴다 */
export type MaterialSource = SourceRef;
```

그리고 파일 맨 위(첫 줄 주석 바로 아래)에 import를 추가한다:

```ts
import type { SourceRef } from './source';
```

- [ ] **Step 3: 타입 검사와 기존 테스트**

Run: `npx tsc --noEmit && npm test`
Expected: 둘 다 PASS. 성분 사전 테스트가 `MaterialSource`를 통해 도는데 별칭이므로 그대로 통과한다.

- [ ] **Step 4: 커밋**

```bash
git add src/types/source.ts src/types/material.ts
git commit -m "refactor: lift MaterialSource into a site-wide SourceRef"
```

---

### Task 2: `BrandProfile` 데이터 레이어와 무결성 테스트

타입과 빈 데이터 레이어, 그리고 검증 테스트를 먼저 심는다. **이 태스크가 끝나면 "집필 진행률" 테스트 하나가 빨갛게 남고, Task 12에서 17번째 프로필을 쓸 때 저절로 초록이 된다.** 그 실패 메시지가 남은 브랜드 목록이므로 별도 진행 추적이 필요 없다.

**Files:**
- Create: `src/types/brand.ts`
- Create: `src/lib/data/brands/profiles.ts`
- Create: `src/lib/data/brands/index.ts`
- Test: `src/lib/data/brands/__tests__/brands.test.ts`

**Interfaces:**
- Consumes: `SourceRef` (Task 1), `getAllBrands(): string[]` (`@/lib/data/appliances`), `ApplianceCategory` (`@/types/appliance`), `CATEGORY_SLUGS` (`@/lib/category-config`)
- Produces:
  - `BrandProfile`, `BrandLine` 타입
  - `allBrandProfiles: BrandProfile[]`
  - `getBrandProfile(brand: string): BrandProfile | undefined`
  - `getBrandsMissingProfile(): string[]`

- [ ] **Step 1: 타입 정의**

`src/types/brand.ts`:

```ts
// 브랜드 프로필 타입 — /brand/[brand]가 렌더하는 손글씨 콘텐츠

import type { ApplianceCategory } from './appliance';
import type { SourceRef } from './source';

/**
 * 제조사 공식 라인업 이름 하나 (예: '비스포크', '휘센').
 * 통칭이나 커뮤니티 용어는 쓰지 않는다 — 공식 페이지가 출처가 되어야 한다.
 */
export interface BrandLine {
  name: string;
  /** 어떤 라인인지 1~2문장 */
  what: string;
  /** 이 라인이 걸치는 카테고리. 카탈로그에 없는 라인도 설명할 수 있어 선택 항목이다 */
  categories?: ApplianceCategory[];
}

export interface BrandProfile {
  /** BRAND_LABELS의 키 (예: 'Samsung') */
  brand: string;
  /** 사실 위주 소개 2~3문장 */
  intro: string;
  /** 라인업 네이밍 체계. 이 페이지의 핵심 고유 콘텐츠라 최소 1개는 있어야 한다 */
  lines: BrandLine[];
  /**
   * A/S 대표번호. 생략할 수 있지만 쓰기로 했다면 sourceUrl이 반드시 따라온다.
   * 틀린 번호는 실제 피해가 되므로 출처를 필드에 직접 묶어 검사 가능하게 만든다.
   * sourceUrl은 sources의 어느 항목과 url이 일치해야 한다.
   */
  serviceCenter?: { phone: string; sourceUrl: string; note?: string };
  /** 에러코드 체계의 특징 (예: 'E 뒤에 숫자 두 자리를 붙인다') */
  errorCodePattern?: string;
  /** 살림랩 총평 2~3문장. 카탈로그 안의 제품에 근거해 검증 가능한 형태로 쓴다 */
  editorNote: string;
  /** 근거 출처. 비어 있으면 안 된다 */
  sources: SourceRef[];
  /** 마지막 검수 시점 'YYYY-MM' */
  updated: string;
}
```

- [ ] **Step 2: 빈 데이터 파일**

`src/lib/data/brands/profiles.ts`:

```ts
import type { BrandProfile } from '@/types/brand';

/**
 * 브랜드 프로필.
 *
 * 집필 순서가 정해져 있다 — LG·QCY를 먼저 써서 가장 큰 브랜드와 가장 작은 브랜드
 * 양극단에서 구조가 성립하는지 확인하고, 그 뒤 나머지를 3~4개씩 라운드로 검수받는다.
 * 한 번에 17개를 쏟아내지 않는다. 그것이 구글이 말하는 대량 생성 패턴이고,
 * 이 사이트가 애드센스에서 거절당한 이유와 같은 부류다.
 */
export const brandProfiles: BrandProfile[] = [];
```

- [ ] **Step 3: 조회 레이어**

`src/lib/data/brands/index.ts`:

```ts
import type { BrandProfile } from '@/types/brand';
import { getAllBrands } from '@/lib/data/appliances';
import { brandProfiles } from './profiles';

export const allBrandProfiles: BrandProfile[] = brandProfiles;

const BY_BRAND = new Map(allBrandProfiles.map((p) => [p.brand, p]));

export function getBrandProfile(brand: string): BrandProfile | undefined {
  return BY_BRAND.get(brand);
}

/**
 * 아직 프로필이 없는 브랜드를 카탈로그 등장 순으로 반환한다.
 * 집필 진행률 테스트가 이것을 실패 메시지에 그대로 실어 남은 할 일 목록으로 쓴다.
 */
export function getBrandsMissingProfile(): string[] {
  return getAllBrands().filter((b) => !BY_BRAND.has(b));
}
```

- [ ] **Step 4: 실패하는 테스트 작성**

`src/lib/data/brands/__tests__/brands.test.ts`:

```ts
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
```

- [ ] **Step 5: 테스트를 돌려 진행률만 실패하는지 확인**

Run: `npx vitest run src/lib/data/brands`
Expected: `집필 진행률 > 카탈로그의 모든 브랜드에 프로필이 있다` 1건 FAIL, 메시지에 `0/17 완료. 남은 브랜드: Samsung, LG, ...`. 나머지 무결성 테스트는 프로필이 0개라 순회할 것이 없어 PASS.

**이 실패는 여기서 고치지 않는다.** Task 8~12가 원고를 쓰면서 없앤다.

- [ ] **Step 6: 커밋**

```bash
git add src/types/brand.ts src/lib/data/brands
git commit -m "feat: add the brand profile data layer with integrity tests

The coverage test fails until all 17 profiles are written. That failure
is the remaining-work list, and it doubles as the deploy gate the spec
asked for."
```

---

### Task 3: 브랜드 간 중복 검사

17개 서술이 서로 붕어빵이 되는 것이 이 작업의 진짜 실패 모드다. 공백 정규화 후 **문장 단위 완전 일치**를 하드 페일로 잡고, 유사도가 큰 쌍은 순위로 출력만 해 검수 때 사람이 본다.

유사도에 고정 임계값을 걸지 않는 이유: 집필 규칙 4번이 `editorNote`를 의도적으로 정형문에 가깝게 만들기 때문에("카탈로그의 3개 제품이 모두 프리미엄 가격대"), n-gram 임계값을 걸면 규칙을 지킬수록 테스트가 깨진다.

**Files:**
- Modify: `src/lib/data/brands/__tests__/brands.test.ts` (파일 끝에 추가)

**Interfaces:**
- Consumes: `allBrandProfiles` (Task 2)
- Produces: 없음 (테스트 전용)

- [ ] **Step 1: 중복 테스트 추가**

`src/lib/data/brands/__tests__/brands.test.ts` 맨 끝에 붙인다:

```ts
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
    const n = allBrandProfiles.length;
    expect(pairs.length).toBe((n * (n - 1)) / 2);
  });
});
```

- [ ] **Step 2: 테스트가 실제로 중복을 잡는지 고의 파괴로 확인**

`src/lib/data/brands/profiles.ts`를 **임시로** 이렇게 바꾼다:

```ts
export const brandProfiles: BrandProfile[] = [
  {
    brand: 'LG',
    intro: '이 문장은 두 브랜드에서 똑같이 반복되는 붕어빵 문장이다.',
    lines: [{ name: '테스트라인', what: '검사용 임시 항목이다.' }],
    editorNote: '검사용 임시 총평이다.',
    sources: [{ url: 'https://example.com', title: '임시' }],
    updated: '2026-08',
  },
  {
    brand: 'Samsung',
    intro: '이 문장은 두 브랜드에서 똑같이 반복되는 붕어빵 문장이다.',
    lines: [{ name: '테스트라인2', what: '검사용 임시 항목 둘이다.' }],
    editorNote: '검사용 임시 총평 둘이다.',
    sources: [{ url: 'https://example.com', title: '임시' }],
    updated: '2026-08',
  },
];
```

Run: `npx vitest run src/lib/data/brands -t '같은 문장'`
Expected: FAIL, 메시지에 `LG = Samsung: "이 문장은 두 브랜드에서..."`

**확인 후 `profiles.ts`를 빈 배열로 되돌린다:**

```ts
export const brandProfiles: BrandProfile[] = [];
```

Run: `npx vitest run src/lib/data/brands -t '같은 문장'`
Expected: PASS

- [ ] **Step 3: 커밋**

```bash
git add src/lib/data/brands/__tests__/brands.test.ts
git commit -m "test: fail the build when two brands share a sentence

Verified by planting a duplicated sentence and watching it fail. The
n-gram overlap is reported, not enforced: writing rule 4 pushes editorNote
toward a fixed shape on purpose, so a threshold would fight the rule."
```

---

### Task 4: 카탈로그 파생 통계

가격대·카테고리·평점·에너지등급 분포는 저장하지 않고 `allAppliances`에서 파생한다. 제품이 추가되면 저절로 맞는다.

순수 함수 `computeBrandStats(items)`와 모듈 전역을 읽는 `getBrandStats(brand)`를 나눈다 — 전역에 묶인 함수는 픽스처로 규칙을 검증할 수 없어서다 (성분 사전의 `resolveRefs`와 같은 이유).

**Files:**
- Create: `src/lib/brand-stats.ts`
- Test: `src/lib/__tests__/brand-stats.test.ts`

**Interfaces:**
- Consumes: `allAppliances` (`@/lib/data/appliances`), `isTraditionalAppliance` (`@/lib/category-config`)
- Produces:
  - `BrandStats { productCount, categories, priceMin, priceMax, avgRating, energyGrades }`
  - `computeBrandStats(items: BrandStatsInput[]): BrandStats`
  - `getBrandStats(brand: string): BrandStats`
  - `isNonApplianceBrand(brand: string): boolean` — Task 5의 문구 판정과 Task 6의 렌더가 쓴다

- [ ] **Step 1: 실패하는 테스트 작성**

`src/lib/__tests__/brand-stats.test.ts`:

```ts
import { describe, it, expect } from 'vitest';
import { computeBrandStats, getBrandStats, isNonApplianceBrand } from '@/lib/brand-stats';
import type { BrandStatsInput } from '@/lib/brand-stats';
import { allAppliances, getAllBrands } from '@/lib/data/appliances';

function item(
  category: BrandStatsInput['category'],
  price: number,
  rating: number,
  energyGrade?: BrandStatsInput['techSpecs']['energyGrade'],
): BrandStatsInput {
  return { category, price, rating, techSpecs: { energyGrade } };
}

describe('computeBrandStats', () => {
  it('제품이 없으면 빈 통계를 낸다', () => {
    const s = computeBrandStats([]);
    expect(s.productCount).toBe(0);
    expect(s.categories).toEqual([]);
    expect(s.priceMin).toBe(0);
    expect(s.priceMax).toBe(0);
    expect(s.avgRating).toBeNull();
    expect(s.energyGrades).toEqual([]);
  });

  it('카테고리는 등장 순서대로 중복 없이 모은다', () => {
    const s = computeBrandStats([
      item('에어컨', 100, 4),
      item('세탁기', 200, 4),
      item('에어컨', 300, 4),
    ]);
    expect(s.categories).toEqual(['에어컨', '세탁기']);
  });

  it('가격 최소·최대와 평균 평점을 낸다', () => {
    const s = computeBrandStats([
      item('에어컨', 390_000, 4.2),
      item('세탁기', 3_490_000, 4.4),
    ]);
    expect(s.priceMin).toBe(390_000);
    expect(s.priceMax).toBe(3_490_000);
    expect(s.avgRating).toBe(4.3);
  });

  it('평균 평점을 소수 첫째 자리로 반올림한다', () => {
    const s = computeBrandStats([item('에어컨', 1, 4.25), item('에어컨', 1, 4.25)]);
    expect(s.avgRating).toBe(4.3);
  });

  // 효율관리기자재 비대상 품목(선풍기·공기청정기 등)은 등급이 아예 없다.
  // 빈칸으로 두면 표가 제품 수와 안 맞아 보이므로 '대상 아님'으로 명시한다.
  it('에너지등급을 등급 순으로 세고 없는 것은 대상 아님으로 묶는다', () => {
    const s = computeBrandStats([
      item('에어컨', 1, 4, '2등급'),
      item('세탁기', 1, 4, '1등급'),
      item('냉장고', 1, 4, '1등급'),
      item('선풍기', 1, 4),
    ]);
    expect(s.energyGrades).toEqual([
      { label: '1등급', count: 2 },
      { label: '2등급', count: 1 },
      { label: '대상 아님', count: 1 },
    ]);
  });

  // TV·무선이어폰만 파는 브랜드에서 '대상 아님 1'은 정보가 아니라 잡음이다.
  it('비가전 제품뿐이면 에너지등급을 아예 내지 않는다', () => {
    const s = computeBrandStats([item('무선이어폰', 199_000, 4.5)]);
    expect(s.energyGrades).toEqual([]);
  });
});

describe('getBrandStats / isNonApplianceBrand', () => {
  it('카탈로그의 제품 수와 일치한다', () => {
    for (const brand of getAllBrands()) {
      const expected = allAppliances.filter((a) => a.brand === brand).length;
      expect(getBrandStats(brand).productCount, brand).toBe(expected);
    }
  });

  it('모든 브랜드에서 priceMin이 priceMax 이하다', () => {
    for (const brand of getAllBrands()) {
      const s = getBrandStats(brand);
      expect(s.priceMin, brand).toBeLessThanOrEqual(s.priceMax);
    }
  });

  it('비가전 전용 브랜드를 가려낸다', () => {
    expect(isNonApplianceBrand('QCY')).toBe(true);
    expect(isNonApplianceBrand('LG')).toBe(false);
  });

  it('카탈로그에 없는 브랜드는 비가전으로 치지 않는다', () => {
    expect(isNonApplianceBrand('없는브랜드')).toBe(false);
  });
});
```

- [ ] **Step 2: 테스트를 돌려 실패 확인**

Run: `npx vitest run src/lib/__tests__/brand-stats.test.ts`
Expected: FAIL — `Failed to resolve import "@/lib/brand-stats"`

- [ ] **Step 3: 구현**

`src/lib/brand-stats.ts`:

```ts
import { allAppliances } from '@/lib/data/appliances';
import { isTraditionalAppliance } from '@/lib/category-config';
import type { Appliance, ApplianceCategory, EnergyGrade, TechSpecs } from '@/types/appliance';

/**
 * 통계에 필요한 최소 입력.
 *
 * Appliance 전체가 아니라 이 조각만 받는 이유는 순수 함수로 만들어 픽스처로 검증하기
 * 위해서다. 모듈 전역(allAppliances)에 묶여 있으면 규칙 자체를 테스트할 수 없다.
 */
export type BrandStatsInput = Pick<Appliance, 'category' | 'price' | 'rating'> & {
  techSpecs: Pick<TechSpecs, 'energyGrade'>;
};

export interface BrandStats {
  productCount: number;
  /** 카탈로그 등장 순, 중복 없음 */
  categories: ApplianceCategory[];
  /** 원 단위. 제품이 없으면 0 */
  priceMin: number;
  priceMax: number;
  /** 소수 첫째 자리 반올림. 제품이 없으면 null */
  avgRating: number | null;
  /** 등급 순 + '대상 아님'. 비가전 전용 브랜드는 빈 배열 */
  energyGrades: { label: string; count: number }[];
}

const GRADE_ORDER: EnergyGrade[] = ['1등급', '2등급', '3등급', '4등급', '5등급'];

/** 효율관리기자재 비대상 품목을 빈칸이 아니라 이 이름으로 묶는다 */
const NOT_APPLICABLE = '대상 아님';

export function computeBrandStats(items: BrandStatsInput[]): BrandStats {
  if (items.length === 0) {
    return {
      productCount: 0,
      categories: [],
      priceMin: 0,
      priceMax: 0,
      avgRating: null,
      energyGrades: [],
    };
  }

  const prices = items.map((a) => a.price);
  const ratingSum = items.reduce((sum, a) => sum + a.rating, 0);

  // 전 제품이 비가전이면 등급표 자체가 성립하지 않는다. '대상 아님 1'은 정보가 아니다.
  const hasAppliance = items.some((a) => isTraditionalAppliance(a.category));

  const counts = new Map<string, number>();
  if (hasAppliance) {
    for (const a of items) {
      const label = a.techSpecs.energyGrade ?? NOT_APPLICABLE;
      counts.set(label, (counts.get(label) ?? 0) + 1);
    }
  }

  const energyGrades = [...GRADE_ORDER, NOT_APPLICABLE]
    .filter((label) => counts.has(label))
    .map((label) => ({ label, count: counts.get(label)! }));

  return {
    productCount: items.length,
    categories: [...new Set(items.map((a) => a.category))],
    priceMin: Math.min(...prices),
    priceMax: Math.max(...prices),
    avgRating: Math.round((ratingSum / items.length) * 10) / 10,
    energyGrades,
  };
}

export function getBrandStats(brand: string): BrandStats {
  return computeBrandStats(allAppliances.filter((a) => a.brand === brand));
}

/**
 * 이 브랜드가 파는 것이 전부 비가전(TV·무선이어폰 등)인지.
 *
 * 브랜드명을 하드코딩하지 않고 카탈로그에서 파생한다 — 나중에 브랜드나 제품이 늘어도
 * 저절로 맞는다. 카탈로그에 없는 브랜드는 판단 근거가 없으므로 false다.
 */
export function isNonApplianceBrand(brand: string): boolean {
  const items = allAppliances.filter((a) => a.brand === brand);
  return items.length > 0 && !items.some((a) => isTraditionalAppliance(a.category));
}
```

- [ ] **Step 4: 테스트 통과 확인**

Run: `npx vitest run src/lib/__tests__/brand-stats.test.ts`
Expected: 전부 PASS

- [ ] **Step 5: 커밋**

```bash
git add src/lib/brand-stats.ts src/lib/__tests__/brand-stats.test.ts
git commit -m "feat: derive brand statistics from the catalog

Stats are computed, not stored, so they stay right as products are added.
computeBrandStats stays pure so the rules can be tested against fixtures
instead of the live catalog."
```

---

### Task 5: 비가전 브랜드 메타데이터 문구

현재 메타데이터가 `${label} 가전 전체 — 스펙·가격 비교`인데 애플·소니·앤커·QCY에는 "가전"이 틀린 말이다. 심사자가 "애플 가전"을 보면 사이트의 정확도를 의심한다.

문구 생성을 페이지에서 떼어내 별도 모듈로 만든다 — 페이지 컴포넌트는 node 환경 테스트에서 import하기 번거롭지만, 순수 문자열 함수는 그대로 검증된다.

**Files:**
- Create: `src/lib/brand-copy.ts`
- Test: `src/lib/__tests__/brand-copy.test.ts`

**Interfaces:**
- Consumes: `isNonApplianceBrand` (Task 4), `BRAND_LABELS` (`@/lib/constants`)
- Produces: `getBrandCopy(brand: string): { label: string; noun: '가전' | '제품'; title: string; description: string }` — Task 6의 `generateMetadata`가 쓴다

- [ ] **Step 1: 실패하는 테스트 작성**

`src/lib/__tests__/brand-copy.test.ts`:

```ts
import { describe, it, expect } from 'vitest';
import { getBrandCopy } from '@/lib/brand-copy';
import { isNonApplianceBrand } from '@/lib/brand-stats';
import { getAllBrands } from '@/lib/data/appliances';

describe('getBrandCopy', () => {
  it('가전 브랜드는 "가전"을 쓴다', () => {
    const copy = getBrandCopy('LG');
    expect(copy.noun).toBe('가전');
    expect(copy.title).toBe('LG 가전 전체 — 스펙·가격 비교');
  });

  it('비가전 브랜드는 "제품"을 쓴다', () => {
    const copy = getBrandCopy('QCY');
    expect(copy.noun).toBe('제품');
    expect(copy.title).toBe('QCY 제품 전체 — 스펙·가격 비교');
  });

  it('BRAND_LABELS의 한글 표기를 쓴다', () => {
    expect(getBrandCopy('Samsung').label).toBe('삼성');
    expect(getBrandCopy('Apple').label).toBe('애플');
  });

  it('레이블이 없는 브랜드는 키를 그대로 쓴다', () => {
    expect(getBrandCopy('없는브랜드').label).toBe('없는브랜드');
  });

  // 브랜드 목록을 하드코딩하지 않는다. 나중에 비가전 브랜드가 추가돼도 저절로 걸린다.
  it('비가전 전용 브랜드의 문구에 "가전"이 없다', () => {
    const nonAppliance = getAllBrands().filter(isNonApplianceBrand);
    expect(nonAppliance.length, '비가전 전용 브랜드가 하나도 없다 — 검사가 무의미해진다').toBeGreaterThan(0);

    for (const brand of nonAppliance) {
      const copy = getBrandCopy(brand);
      expect(copy.title, `${brand} title`).not.toContain('가전');
      expect(copy.description, `${brand} description`).not.toContain('가전');
    }
  });
});
```

- [ ] **Step 2: 테스트를 돌려 실패 확인**

Run: `npx vitest run src/lib/__tests__/brand-copy.test.ts`
Expected: FAIL — `Failed to resolve import "@/lib/brand-copy"`

- [ ] **Step 3: 구현**

`src/lib/brand-copy.ts`:

```ts
import { BRAND_LABELS } from '@/lib/constants';
import { isNonApplianceBrand } from '@/lib/brand-stats';

export interface BrandCopy {
  /** 한글 표기 (예: '삼성'). 레이블이 없으면 브랜드 키 그대로 */
  label: string;
  /** 이 브랜드를 부르는 총칭 */
  noun: '가전' | '제품';
  title: string;
  description: string;
}

/**
 * 브랜드 페이지 메타데이터 문구.
 *
 * 애플·소니·앤커·QCY에 "가전"은 틀린 말이다. 브랜드명을 나열하지 않고
 * 카탈로그에서 판정하므로 나중에 비가전 브랜드가 늘어도 저절로 맞는다.
 */
export function getBrandCopy(brand: string): BrandCopy {
  const label = BRAND_LABELS[brand] || brand;
  const noun = isNonApplianceBrand(brand) ? '제품' : '가전';

  return {
    label,
    noun,
    title: `${label} ${noun} 전체 — 스펙·가격 비교`,
    description: `${label} ${noun} 라인업을 한눈에. 카테고리별 스펙·가격·에러코드를 비교하세요.`,
  };
}
```

- [ ] **Step 4: 테스트 통과 확인**

Run: `npx vitest run src/lib/__tests__/brand-copy.test.ts`
Expected: 전부 PASS

- [ ] **Step 5: 커밋**

```bash
git add src/lib/brand-copy.ts src/lib/__tests__/brand-copy.test.ts
git commit -m "feat: stop calling Apple and QCY appliance brands

The noun is decided from the catalog rather than a hardcoded brand list,
so a future non-appliance brand gets the right wording for free."
```

---

### Task 6: 브랜드 페이지 렌더링

섹션을 컴포넌트로 나눈다 (`src/components/detail/`와 같은 방식). **프로필이 아직 없는 브랜드는 지금과 똑같이 렌더된다** — 그래야 원고를 라운드로 나눠 쓰는 동안에도 빌드가 계속 성공한다.

섹션 컴포넌트에 브랜드마다 똑같은 안내 문구를 넣지 않는다. 17개 페이지에 같은 문장이 박히는 것은 Task 3이 막으려는 것과 같은 종류의 중복이다.

**Files:**
- Create: `src/components/brand/lineup-section.tsx`
- Create: `src/components/brand/stats-section.tsx`
- Create: `src/components/brand/error-code-summary.tsx`
- Create: `src/components/brand/service-section.tsx`
- Create: `src/components/brand/sources-footer.tsx`
- Modify: `src/app/brand/[brand]/page.tsx` (전면 교체)

**Interfaces:**
- Consumes: `getBrandProfile` (Task 2), `getBrandStats` (Task 4), `getBrandCopy` (Task 5), `getBrandErrorCodes` (`@/lib/error-codes`), `getCardAppliances`·`getAllBrands` (`@/lib/data/appliances`)
- Produces: 없음 (최종 소비자)

- [ ] **Step 1: Next 문서 확인**

이 저장소의 Next는 훈련 데이터와 다르다. 페이지를 고치기 전에 `node_modules/next/dist/docs/`에서 App Router 페이지·`generateStaticParams`·`generateMetadata` 가이드를 찾아 읽고, 특히 deprecation 표시를 확인한다.

- [ ] **Step 2: 라인업 섹션 컴포넌트**

`src/components/brand/lineup-section.tsx`:

```tsx
import type { BrandLine } from '@/types/brand';

/**
 * 라인업 네이밍 체계 — 이 페이지의 핵심 고유 콘텐츠.
 *
 * "비스포크가 뭐야", "휘센이랑 오브제 차이" 같은 검색 수요가 실재하는데 사이트
 * 어디에도 없었다. 브랜드 레벨에만 존재하는 내용이라 제품·카테고리 페이지와 겹치지 않는다.
 */
export function BrandLineupSection({ lines }: { lines: BrandLine[] }) {
  if (lines.length === 0) return null;

  return (
    <section>
      <h2 className="text-xl font-bold text-gray-900 mb-4">라인업 이름으로 읽기</h2>
      <dl className="space-y-5">
        {lines.map((line) => (
          <div key={line.name}>
            <dt className="font-semibold text-gray-900">{line.name}</dt>
            <dd className="mt-1 text-gray-700 leading-relaxed">{line.what}</dd>
            {line.categories && line.categories.length > 0 && (
              <dd className="mt-1 text-sm text-gray-500">{line.categories.join(' · ')}</dd>
            )}
          </div>
        ))}
      </dl>
    </section>
  );
}
```

- [ ] **Step 3: 통계 섹션 컴포넌트**

`src/components/brand/stats-section.tsx`:

```tsx
import type { BrandStats } from '@/lib/brand-stats';

/** 원 단위 가격을 '349만원'으로 */
function manwon(price: number): string {
  return `${Math.round(price / 10000).toLocaleString('ko-KR')}만원`;
}

/**
 * 카탈로그 파생 통계. 집필 부담이 0이고 제품이 늘면 저절로 맞는다.
 *
 * 제품이 1개인 브랜드에서는 '가격 19만~19만원' 같은 통계가 성립하지 않아 아예 감춘다.
 */
export function BrandStatsSection({ stats }: { stats: BrandStats }) {
  if (stats.productCount < 2) return null;

  return (
    <section>
      <h2 className="text-xl font-bold text-gray-900 mb-3">라인업 한눈에</h2>
      <dl className="grid grid-cols-2 sm:grid-cols-3 gap-4 rounded-xl bg-gray-50 p-5">
        <div>
          <dt className="text-sm text-gray-500">카테고리</dt>
          <dd className="font-semibold text-gray-900">{stats.categories.length}개</dd>
        </div>
        <div>
          <dt className="text-sm text-gray-500">가격대</dt>
          <dd className="font-semibold text-gray-900">
            {manwon(stats.priceMin)}~{manwon(stats.priceMax)}
          </dd>
        </div>
        {stats.avgRating !== null && (
          <div>
            <dt className="text-sm text-gray-500">평균 평점</dt>
            <dd className="font-semibold text-gray-900">{stats.avgRating}</dd>
          </div>
        )}
      </dl>

      {stats.energyGrades.length > 0 && (
        <p className="mt-3 text-sm text-gray-600">
          에너지소비효율등급{' '}
          {stats.energyGrades.map((g) => `${g.label} ${g.count}`).join(' / ')}
        </p>
      )}

      <p className="mt-2 text-sm text-gray-500">
        {stats.categories.join(' · ')}
      </p>
    </section>
  );
}
```

- [ ] **Step 4: 에러코드 요약 컴포넌트**

`src/components/brand/error-code-summary.tsx`:

```tsx
import Link from 'next/link';

/**
 * 에러코드 허브로 보내는 요약.
 *
 * 코드 본문을 여기 늘어놓지 않는다 — 그것은 1순위 작업에서 브랜드 허브로 통합한
 * 내용이고, 여기서 다시 쓰면 그때 없앤 중복을 되살리는 것이 된다.
 */
export function BrandErrorCodeSummary({
  brand,
  label,
  count,
  pattern,
}: {
  brand: string;
  label: string;
  count: number;
  pattern?: string;
}) {
  if (count === 0) return null;

  return (
    <section>
      <h2 className="text-xl font-bold text-gray-900 mb-2">에러코드</h2>
      {pattern && <p className="text-gray-700 leading-relaxed mb-2">{pattern}</p>}
      <Link href={`/error-codes/${brand}`} className="text-blue-600 hover:underline">
        {label} 제품에서 확인된 에러코드 {count}개 보기
      </Link>
    </section>
  );
}
```

- [ ] **Step 5: A/S 섹션 컴포넌트**

`src/components/brand/service-section.tsx`:

```tsx
import type { BrandProfile } from '@/types/brand';

/** A/S 대표번호. 번호의 출처는 페이지 하단 '근거'에 함께 실린다 */
export function BrandServiceSection({
  serviceCenter,
}: {
  serviceCenter: NonNullable<BrandProfile['serviceCenter']>;
}) {
  return (
    <section>
      <h2 className="text-xl font-bold text-gray-900 mb-2">A/S</h2>
      <p className="text-gray-900">
        대표번호 <span className="font-semibold">{serviceCenter.phone}</span>
      </p>
      {serviceCenter.note && (
        <p className="mt-1 text-gray-700 leading-relaxed">{serviceCenter.note}</p>
      )}
    </section>
  );
}
```

- [ ] **Step 6: 근거 푸터 컴포넌트**

`src/components/brand/sources-footer.tsx`:

```tsx
import type { SourceRef } from '@/types/source';

/** 성분 사전 상세 페이지의 '근거' 푸터와 같은 형태 — 사이트 전체 편집 규칙이다 */
export function BrandSourcesFooter({
  sources,
  updated,
}: {
  sources: SourceRef[];
  updated: string;
}) {
  return (
    <footer className="border-t pt-5 text-sm text-gray-500 space-y-2">
      <div>
        <p className="font-semibold text-gray-700 mb-1">근거</p>
        <ul className="space-y-1">
          {sources.map((source) => (
            <li key={source.url}>
              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {source.title}
                <span className="sr-only"> (새 창)</span>
              </a>
              {source.publisher && <span className="text-gray-400"> — {source.publisher}</span>}
            </li>
          ))}
        </ul>
      </div>
      <p>{updated} 검수</p>
    </footer>
  );
}
```

- [ ] **Step 7: 페이지 교체**

`src/app/brand/[brand]/page.tsx` 전체를 이것으로 교체한다:

```tsx
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ApplianceCard } from '@/components/appliance-card';
import { BrandLineupSection } from '@/components/brand/lineup-section';
import { BrandStatsSection } from '@/components/brand/stats-section';
import { BrandErrorCodeSummary } from '@/components/brand/error-code-summary';
import { BrandServiceSection } from '@/components/brand/service-section';
import { BrandSourcesFooter } from '@/components/brand/sources-footer';
import { getAllBrands, getCardAppliances } from '@/lib/data/appliances';
import { getBrandProfile } from '@/lib/data/brands';
import { getBrandStats } from '@/lib/brand-stats';
import { getBrandCopy } from '@/lib/brand-copy';
import { getBrandErrorCodes } from '@/lib/error-codes';
import { buildOpenGraph } from '@/lib/metadata';

type Props = {
  params: Promise<{ brand: string }>;
};

export function generateStaticParams() {
  return getAllBrands().map((brand) => ({ brand }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { brand } = await params;
  if (!getAllBrands().includes(brand)) return { title: '브랜드를 찾을 수 없습니다' };

  const { title, description } = getBrandCopy(brand);
  return {
    title,
    description,
    alternates: { canonical: `/brand/${brand}` },
    openGraph: buildOpenGraph({ title, description, url: `/brand/${brand}` }),
  };
}

export default async function BrandPage({ params }: Props) {
  const { brand } = await params;
  if (!getAllBrands().includes(brand)) notFound();

  const { label } = getBrandCopy(brand);
  const items = getCardAppliances().filter((a) => a.brand === brand);
  const categories = [...new Set(items.map((a) => a.category))];

  // 프로필은 아직 없을 수 있다. 17개 원고를 라운드로 나눠 쓰는 동안에도
  // 빌드가 계속 성공해야 하므로, 없으면 헤더와 제품 그리드만 렌더한다.
  const profile = getBrandProfile(brand);
  const stats = getBrandStats(brand);
  const errorCodeCount = getBrandErrorCodes(brand).reduce((n, g) => n + g.entries.length, 0);

  return (
    <>
      {/* 브랜드 헤더 */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <p className="text-sm font-medium text-blue-600 mb-1">브랜드</p>
          <h1 className="text-3xl font-bold text-gray-900">{label}</h1>
          <p className="text-gray-600 mt-2">
            {label} 제품 {items.length}개
            {categories.length > 0 && <> · {categories.join(' · ')}</>}
          </p>
          {profile && (
            <p className="text-gray-700 leading-relaxed mt-4 max-w-3xl">{profile.intro}</p>
          )}
        </div>
      </section>

      {profile && (
        <div className="max-w-3xl mx-auto px-4 py-8 space-y-8">
          <BrandLineupSection lines={profile.lines} />
          <BrandStatsSection stats={stats} />
          <BrandErrorCodeSummary
            brand={brand}
            label={label}
            count={errorCodeCount}
            pattern={profile.errorCodePattern}
          />
          {profile.serviceCenter && (
            <BrandServiceSection serviceCenter={profile.serviceCenter} />
          )}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-2">살림랩 총평</h2>
            <p className="text-gray-700 leading-relaxed">{profile.editorNote}</p>
          </section>
        </div>
      )}

      {/* 제품 그리드 */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        {items.length > 0 && (
          <h2 className="text-xl font-bold text-gray-900 mb-4">제품 {items.length}개</h2>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((a) => (
            <ApplianceCard key={a.id} appliance={a} />
          ))}
        </div>

        {items.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <p className="text-lg">등록된 제품이 없습니다.</p>
          </div>
        )}
      </section>

      {profile && (
        <div className="max-w-3xl mx-auto px-4 pb-10">
          <BrandSourcesFooter sources={profile.sources} updated={profile.updated} />
        </div>
      )}
    </>
  );
}
```

- [ ] **Step 8: 린트·타입·빌드**

Run: `npm run lint && npx tsc --noEmit && npm run build`
Expected: 전부 통과. 프로필이 0개라 브랜드 페이지 17개는 지금과 같은 모습으로 나온다.

- [ ] **Step 9: 커밋**

```bash
git add src/components/brand src/app/brand/\[brand\]/page.tsx
git commit -m "feat: render the brand profile sections

The page falls back to the header-and-grid layout when a brand has no
profile yet, so the build keeps passing while the 17 writeups land in
review rounds rather than all at once."
```

---

### Task 7: 분량 측정 스크립트

이 작업의 목표 지표를 재는 도구다. 이전 사이클은 같은 측정을 플랜 본문에 박아둔 node 한 줄로 했는데, 이번엔 집필 라운드마다 반복하고 다음 사이클 셋(리뷰·성분 본문·홈)도 같은 지표를 쓴다. 손으로 옮겨 붙이면 라운드마다 다른 것을 재게 된다.

**Files:**
- Create: `scripts/measure-page-length.mjs`

**Interfaces:**
- Consumes: `out/` (빌드 산출물)
- Produces: CLI. 임계값 미달이 있으면 exit 1 — 게이트로 쓸 수 있다

- [ ] **Step 1: 스크립트 작성**

`scripts/measure-page-length.mjs`:

```js
#!/usr/bin/env node
// 빌드 산출물(out/)의 페이지 본문 글자 수를 잰다.
//
// thin content 판정의 목표 지표를 재는 도구다. 임계값 미달이 하나라도 있으면
// exit 1이라 게이트로 그대로 쓸 수 있다.
//
// 사용:
//   node scripts/measure-page-length.mjs '^brand/' 1200
//   node scripts/measure-page-length.mjs '' 1200      # 사이트 전체
//
// 첫 인자는 out/ 기준 상대 경로(확장자 없음)에 대한 정규식이다. 글로브가 아니다 —
// 패턴 문법이 하나뿐이어야 라운드마다 같은 것을 잰다.

import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const OUT_DIR = 'out';
const pattern = new RegExp(process.argv[2] ?? '');
const threshold = Number(process.argv[3] ?? 1200);

/** out/ 아래 모든 .html을 찾는다 */
function walk(dir) {
  const found = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) found.push(...walk(full));
    else if (entry.endsWith('.html')) found.push(full);
  }
  return found;
}

/**
 * HTML에서 사람이 읽는 본문만 남긴다.
 *
 * script를 먼저 지우는 것이 핵심이다 — Next 정적 export는 RSC 페이로드를
 * self.__next_f.push(...) 형태로 script 안에 통째로 싣기 때문에, 그대로 세면
 * 얇은 페이지가 두꺼워 보인다.
 */
function textOf(html) {
  return html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ')
    .replace(/<template\b[^>]*>[\s\S]*?<\/template>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

/** out/brand/LG.html → brand/LG, out/brand/LG/index.html → brand/LG */
function pagePath(file) {
  return relative(OUT_DIR, file)
    .replace(/\\/g, '/')
    .replace(/\/index\.html$/, '')
    .replace(/\.html$/, '');
}

const pages = walk(OUT_DIR)
  .map((file) => ({ path: pagePath(file), length: textOf(readFileSync(file, 'utf8')).length }))
  .filter((p) => pattern.test(p.path))
  .sort((a, b) => a.length - b.length);

if (pages.length === 0) {
  console.error(`패턴 /${pattern.source}/ 에 맞는 페이지가 out/ 에 없다.`);
  process.exit(1);
}

for (const p of pages) {
  const mark = p.length < threshold ? '❌' : '  ';
  console.log(`${mark} ${String(p.length).padStart(6)}  ${p.path}`);
}

const thin = pages.filter((p) => p.length < threshold);
const pct = Math.round((thin.length / pages.length) * 100);
console.log(`\n${pages.length}개 중 ${thin.length}개가 ${threshold}자 미만 (${pct}%)`);

process.exit(thin.length > 0 ? 1 : 0);
```

- [ ] **Step 2: 빌드하고 스크립트를 돌려 기준선 확인**

Run: `npm run build && node scripts/measure-page-length.mjs '^brand/' 1200`
Expected: exit 1. 브랜드 17개가 나열되고 LG·삼성만 통과, 15개가 `❌`. 스펙의 실측(LG 2,288 / 삼성 1,985 / 나머지 377~912)과 자릿수가 맞아야 한다.

**숫자가 스펙과 크게 다르면 여기서 멈추고 원인을 확인한다** — 측정이 틀리면 이후 모든 판단이 틀린다. 특히 페이지당 수만 자가 나오면 script 제거가 안 되고 있는 것이다.

- [ ] **Step 3: 전체 사이트 기준선도 기록**

Run: `node scripts/measure-page-length.mjs '' 1200`
Expected: 약 129페이지 중 26개(20%)가 미달. 이 숫자를 다음 스텝의 커밋 메시지에 남긴다.

- [ ] **Step 4: 커밋**

```bash
git add scripts/measure-page-length.mjs
git commit -m "tooling: measure built page length against a threshold

The last cycle re-typed this measurement from the plan body each round.
It gets run a dozen more times across the brand writeups and three more
thin-content cycles, so it becomes a script with one pattern syntax."
```

---

### Task 8: LG·QCY 원고와 QCY 게이트

가장 큰 브랜드와 가장 작은 브랜드를 먼저 쓴다. **QCY가 1,200자를 못 넘으면 나머지 15개를 쓰기 전에 구조를 고친다** — 15개를 다 쓴 뒤에 알게 되는 것을 피하는 것이 이 순서의 목적이다.

**Files:**
- Modify: `src/lib/data/brands/profiles.ts`

**Interfaces:**
- Consumes: `BrandProfile` (Task 2)
- Produces: `brandProfiles`에 LG·QCY 2건

> **조사 없이 쓰지 않는다.** 라인업 이름과 A/S 번호는 제조사 공식 페이지를 실제로 열어 확인하고, 그 URL을 `sources`와 `serviceCenter.sourceUrl`에 넣는다. 기억에서 꺼낸 전화번호는 실제 피해가 된다.

- [ ] **Step 1: LG 조사**

Playwright로 `https://www.lge.co.kr/` 아래 페이지를 열어 확인하고 각 항목의 출처 URL을 메모한다. (고객지원은 `https://www.lge.co.kr/support`에서 시작한다 — 스모크 테스트로 로드 확인됨):

- LG전자 공식 사이트에서 **라인업 브랜드 이름** — 휘센(에어컨), 트롬(세탁·건조), 디오스(냉장·주방), 오브제컬렉션(인테리어 가전), 퓨리케어(공기·물), 코드제로(청소기) 중 공식 페이지에서 확인되는 것만 쓴다. 확인 안 되는 이름은 버린다.
- **LG전자 서비스 고객센터 대표번호**와 그것이 적힌 공식 페이지 URL
- 카탈로그의 LG 제품이 어느 라인에 속하는지 — `src/lib/data/appliances/lg.ts`를 읽어 실제 카테고리를 확인한다

- [ ] **Step 2: LG 프로필 작성**

`src/lib/data/brands/profiles.ts`의 배열에 LG 항목을 추가한다. 아래는 **형식 예시이고 내용은 Step 1의 조사 결과로 채운다** — 이 문자열을 그대로 쓰지 않는다:

```ts
{
  brand: 'LG',
  intro: '<사실 위주 2~3문장. 우위 주장 금지 — "국내 1위" 같은 문장은 출처 없이 쓰지 않는다>',
  lines: [
    {
      name: '<공식 라인업 이름>',
      what: '<어떤 라인인지 1~2문장>',
      categories: ['에어컨'],
    },
  ],
  serviceCenter: {
    phone: '<공식 페이지에서 확인한 번호>',
    sourceUrl: '<그 번호가 적힌 페이지 URL — 아래 sources에도 같은 URL이 있어야 한다>',
  },
  errorCodePattern: '<LG 에러코드 표기 방식 1~2문장>',
  editorNote: '<카탈로그의 LG 제품에 근거한 총평 2~3문장>',
  sources: [
    { url: '<...>', title: '<페이지 제목>', publisher: 'LG전자' },
  ],
  updated: '2026-08',
}
```

- [ ] **Step 3: QCY 조사와 작성**

같은 방식으로 QCY를 쓴다. 카탈로그에 제품이 1개뿐이라 통계 섹션이 숨겨지므로 **라인업 설명이 분량을 책임진다**. 스펙이 지목한 두 가지를 활용한다:

- 카탈로그에 없는 라인업까지 포함한 **모델 네이밍 체계** (QCY의 시리즈 구분)
- **한국에서의 A/S 방식** — QCY는 수입사를 경유한다. 이것이 사실인지 확인하고, 확인되면 `serviceCenter.note`에 적는다. 확인 안 되면 `serviceCenter`를 통째로 생략한다.

`src/lib/data/appliances/qcy.ts`를 읽어 실제 등록된 제품을 확인한다.

- [ ] **Step 4: 테스트**

Run: `npx vitest run src/lib/data/brands`
Expected: `집필 진행률`만 FAIL(`2/17 완료. 남은 브랜드: ...`). 무결성·중복 테스트는 전부 PASS.

무결성 테스트가 실패하면 원고를 고친다 — 특히 `serviceCenter.sourceUrl`이 `sources`에 없다는 실패는 출처를 안 달았다는 뜻이다.

- [ ] **Step 5: 빌드하고 QCY 게이트 판정**

Run: `npm run build && node scripts/measure-page-length.mjs '^brand/(LG|QCY)$' 1200`

Expected: LG는 3,000자 이상, QCY는 1,200자 이상.

**판정:**
- **QCY ≥ 1,200자** → 구조가 양극단에서 성립한다. Step 6으로 간다.
- **QCY < 1,200자** → **여기서 멈추고 사용자에게 보고한다.** 나머지 15개를 쓰지 않는다. 부족한 글자 수와 QCY 페이지에서 실제로 렌더된 섹션 목록을 함께 보고하고, 구조를 어떻게 고칠지 결정을 받는다. 억지로 문장을 늘려 채우지 않는다 — 그것이 패딩이고 지금 거절당한 이유와 같은 부류다.

- [ ] **Step 6: 커밋**

```bash
git add src/lib/data/brands/profiles.ts
git commit -m "content: write the LG and QCY brand profiles

Largest and smallest brand first, so the structure gets tested at both
extremes before the remaining 15 are written."
```

---

### Task 9: 원고 라운드 A — 삼성·코웨이·위닉스·캐리어

**Files:**
- Modify: `src/lib/data/brands/profiles.ts`

- [ ] **Step 1: 네 브랜드 조사**

브랜드마다 Playwright로 공식 페이지를 열어 확인한다. 확인되지 않는 것은 쓰지 않는다:
- 공식 라인업 이름 (삼성: 비스포크·그랑데 등 — 공식 페이지에서 확인되는 것만)
- A/S 대표번호와 그것이 적힌 페이지 URL
- 카탈로그의 해당 브랜드 제품 (`src/lib/data/appliances/{samsung,coway,winix,carrier}.ts`)

- [ ] **Step 2: 네 프로필 작성**

`src/lib/data/brands/profiles.ts`의 배열에 네 항목을 추가한다. `<...>`는 Step 1의 조사 결과로 채운다 — 확인되지 않은 것은 그 필드를 통째로 생략한다:

```ts
{
  brand: '<BRAND_LABELS의 키>',
  intro: '<사실 위주 2~3문장. 출처 없는 우위 주장 금지>',
  lines: [
    { name: '<공식 라인업 이름>', what: '<1~2문장>', categories: ['<카테고리>'] },
  ],
  serviceCenter: {
    phone: '<공식 페이지에서 확인한 번호>',
    sourceUrl: '<그 번호가 적힌 페이지 URL — sources에도 같은 URL이 있어야 한다>',
    note: '<A/S 경로에 특이사항이 있으면. 없으면 필드 생략>',
  },
  errorCodePattern: '<에러코드 표기 방식 1~2문장. 없으면 필드 생략>',
  editorNote: '<카탈로그 제품에 근거한 총평 2~3문장>',
  sources: [{ url: '<...>', title: '<페이지 제목>', publisher: '<발행처>' }],
  updated: '2026-08',
}
```

**네 개의 서술이 서로 닮지 않게 쓴다** — Task 3의 테스트가 같은 문장을 잡아내고, 닮은 정도는 검수용 출력으로 드러난다.

- [ ] **Step 3: 테스트**

Run: `npx vitest run src/lib/data/brands`
Expected: `집필 진행률`만 FAIL(`6/17 완료`). 중복 테스트 PASS. 콘솔의 `[검수용] 서술 겹침 상위` 출력을 읽고 0.3을 넘는 쌍이 있으면 그 둘을 직접 비교해 다시 쓴다.

- [ ] **Step 4: 분량 확인**

Run: `npm run build && node scripts/measure-page-length.mjs '^brand/(Samsung|Coway|Winix|Carrier)$' 1200`
Expected: 넷 다 1,200자 이상

- [ ] **Step 5: 사용자 검수**

네 브랜드의 `intro`·`lines`·`editorNote`와 각 A/S 번호·출처 URL을 사용자에게 보여주고 검수받는다. 승인 전에는 다음 라운드로 넘어가지 않는다.

- [ ] **Step 6: 커밋**

```bash
git add src/lib/data/brands/profiles.ts
git commit -m "content: write brand profiles for Samsung, Coway, Winix, Carrier"
```

---

### Task 10: 원고 라운드 B — TCL·하이얼·신일·샤오미

**Files:**
- Modify: `src/lib/data/brands/profiles.ts`

- [ ] **Step 1: 네 브랜드 조사**

Playwright로 공식 페이지(한국 법인 또는 공식 수입사)를 열어 확인한다:
- 공식 라인업·시리즈 이름
- **한국에서의 A/S 경로** — TCL·하이얼·샤오미는 수입사나 공식 파트너를 경유할 수 있다. 확인되면 `serviceCenter.note`에 적고, 확인 안 되면 `serviceCenter`를 생략한다. 추측해서 번호를 적지 않는다.
- 카탈로그 제품 (`src/lib/data/appliances/{tcl,haier,shinil,xiaomi}.ts`)

- [ ] **Step 2: 네 프로필 작성**

`src/lib/data/brands/profiles.ts`의 배열에 네 항목을 추가한다. `<...>`는 Step 1의 조사 결과로 채운다 — 확인되지 않은 것은 그 필드를 통째로 생략한다:

```ts
{
  brand: '<BRAND_LABELS의 키>',
  intro: '<사실 위주 2~3문장. 출처 없는 우위 주장 금지>',
  lines: [
    { name: '<공식 라인업 이름>', what: '<1~2문장>', categories: ['<카테고리>'] },
  ],
  serviceCenter: {
    phone: '<공식 페이지에서 확인한 번호>',
    sourceUrl: '<그 번호가 적힌 페이지 URL — sources에도 같은 URL이 있어야 한다>',
    note: '<수입사 경유 등 A/S 경로 특이사항. 없으면 필드 생략>',
  },
  errorCodePattern: '<에러코드 표기 방식 1~2문장. 없으면 필드 생략>',
  editorNote: '<카탈로그 제품에 근거한 총평 2~3문장>',
  sources: [{ url: '<...>', title: '<페이지 제목>', publisher: '<발행처>' }],
  updated: '2026-08',
}
```

네 서술이 서로 닮지 않게 쓴다.

- [ ] **Step 3: 테스트**

Run: `npx vitest run src/lib/data/brands`
Expected: `집필 진행률`만 FAIL(`10/17 완료`). 검수용 겹침 출력 확인.

- [ ] **Step 4: 분량 확인**

Run: `npm run build && node scripts/measure-page-length.mjs '^brand/(TCL|Haier|Shinil|Xiaomi)$' 1200`
Expected: 넷 다 1,200자 이상

- [ ] **Step 5: 사용자 검수**

Task 9 Step 5와 같이 검수받고 승인 전에는 넘어가지 않는다.

- [ ] **Step 6: 커밋**

```bash
git add src/lib/data/brands/profiles.ts
git commit -m "content: write brand profiles for TCL, Haier, Shinil, Xiaomi"
```

---

### Task 11: 원고 라운드 C — SK매직·쿠쿠·로보락·다이슨

**Files:**
- Modify: `src/lib/data/brands/profiles.ts`

- [ ] **Step 1: 네 브랜드 조사**

Playwright로 공식 페이지를 열어 확인한다:
- 공식 라인업 이름
- A/S 대표번호와 출처 URL. **SK매직·쿠쿠는 렌탈 계정과 A/S 창구가 다를 수 있다** — 확인한 것만 쓰고 다르면 `note`에 구분해 적는다.
- 카탈로그 제품 (`src/lib/data/appliances/{skmagic,cuckoo,roborock,dyson}.ts`)

- [ ] **Step 2: 네 프로필 작성**

`src/lib/data/brands/profiles.ts`의 배열에 네 항목을 추가한다. `<...>`는 Step 1의 조사 결과로 채운다 — 확인되지 않은 것은 그 필드를 통째로 생략한다:

```ts
{
  brand: '<BRAND_LABELS의 키>',
  intro: '<사실 위주 2~3문장. 출처 없는 우위 주장 금지>',
  lines: [
    { name: '<공식 라인업 이름>', what: '<1~2문장>', categories: ['<카테고리>'] },
  ],
  serviceCenter: {
    phone: '<공식 페이지에서 확인한 번호>',
    sourceUrl: '<그 번호가 적힌 페이지 URL — sources에도 같은 URL이 있어야 한다>',
    note: '<렌탈 계정과 A/S 창구가 다르면 구분해 적는다. 없으면 필드 생략>',
  },
  errorCodePattern: '<에러코드 표기 방식 1~2문장. 없으면 필드 생략>',
  editorNote: '<카탈로그 제품에 근거한 총평 2~3문장>',
  sources: [{ url: '<...>', title: '<페이지 제목>', publisher: '<발행처>' }],
  updated: '2026-08',
}
```

네 서술이 서로 닮지 않게 쓴다.

- [ ] **Step 3: 테스트**

Run: `npx vitest run src/lib/data/brands`
Expected: `집필 진행률`만 FAIL(`14/17 완료`). 검수용 겹침 출력 확인.

- [ ] **Step 4: 분량 확인**

Run: `npm run build && node scripts/measure-page-length.mjs '^brand/(SKMagic|Cuckoo|Roborock|Dyson)$' 1200`
Expected: 넷 다 1,200자 이상

- [ ] **Step 5: 사용자 검수**

Task 9 Step 5와 같이 검수받고 승인 전에는 넘어가지 않는다.

- [ ] **Step 6: 커밋**

```bash
git add src/lib/data/brands/profiles.ts
git commit -m "content: write brand profiles for SK Magic, Cuckoo, Roborock, Dyson"
```

---

### Task 12: 원고 라운드 D — 애플·소니·앤커

제품이 1개뿐인 셋이다. 통계 섹션이 숨겨지므로 라인업 설명과 A/S가 분량을 책임진다. 스펙이 지목한 두 축을 쓴다:

- **카탈로그에 없는 라인업까지 포함한 체계 설명** (에어팟 기본/프로/맥스의 차이 같은 것)
- **한국에서의 A/S 방식** — 애플은 공인 서비스 제공업체, 소니·앤커는 수입사 경유. 실제로 확인하고 쓴다.

**이 셋이 문턱에 가장 가깝다. 미달이면 억지로 문장을 늘리지 말고 사용자에게 보고한다.**

**Files:**
- Modify: `src/lib/data/brands/profiles.ts`

- [ ] **Step 1: 세 브랜드 조사**

Playwright로 공식 페이지(한국 법인 또는 공식 수입사)를 열어 확인한다:

- 애플: 에어팟 라인 구분, 한국 A/S 경로(공인 서비스 제공업체 체계), 공식 지원 페이지 URL
- 소니: 오디오 라인 네이밍(WH/WF 등 모델 코드 체계 포함), 소니코리아 고객지원 번호와 URL
- 앤커: 사운드코어 등 브랜드 구조, 한국 공식 수입사 A/S 창구
- 카탈로그 제품 (`src/lib/data/appliances/{apple,sony,anker}.ts`)

- [ ] **Step 2: 세 프로필 작성**

`src/lib/data/brands/profiles.ts`의 배열에 세 항목을 추가한다. `<...>`는 Step 1의 조사 결과로 채운다 — 확인되지 않은 것은 그 필드를 통째로 생략한다:

```ts
{
  brand: '<BRAND_LABELS의 키>',
  intro: '<사실 위주 2~3문장. 출처 없는 우위 주장 금지>',
  lines: [
    // 카탈로그에 없는 라인도 쓴다. 이 셋은 제품이 1개뿐이라 라인업 설명이 분량을 책임진다.
    { name: '<공식 라인업·시리즈 이름>', what: '<1~2문장>', categories: ['무선이어폰'] },
  ],
  serviceCenter: {
    phone: '<공식 페이지에서 확인한 번호>',
    sourceUrl: '<그 번호가 적힌 페이지 URL — sources에도 같은 URL이 있어야 한다>',
    note: '<한국 A/S 경로: 공인 서비스 제공업체 / 수입사 경유 등>',
  },
  editorNote: '<카탈로그 제품에 근거한 총평 2~3문장>',
  sources: [{ url: '<...>', title: '<페이지 제목>', publisher: '<발행처>' }],
  updated: '2026-08',
}
```

`errorCodePattern`은 이 셋에 해당 없으면 생략한다 — 에러코드가 없는 브랜드는 Task 6의 요약 섹션 자체가 렌더되지 않는다.

- [ ] **Step 3: 테스트 — 여기서 진행률이 초록이 된다**

Run: `npx vitest run src/lib/data/brands`
Expected: **전부 PASS.** `집필 진행률`이 17/17로 통과한다. Task 2부터 빨갛던 테스트가 여기서 없어지는 것이 정상이다.

- [ ] **Step 4: 분량 확인 — 이 라운드의 게이트**

Run: `npm run build && node scripts/measure-page-length.mjs '^brand/(Apple|Sony|Anker)$' 1200`

- **셋 다 1,200자 이상** → Step 5로 간다.
- **하나라도 미달** → **멈추고 사용자에게 보고한다.** 부족한 글자 수와 그 페이지에서 실제로 렌더된 섹션을 함께 알린다. 패딩으로 채우지 않는다.

- [ ] **Step 5: 사용자 검수**

Task 9 Step 5와 같이 검수받는다.

- [ ] **Step 6: 커밋**

```bash
git add src/lib/data/brands/profiles.ts
git commit -m "content: write brand profiles for Apple, Sony, Anker

These three have a single catalog product each, so the lineup naming and
the Korea service route carry the page instead of derived statistics."
```

---

### Task 13: 최종 검증

스펙의 검증 절을 전부 실행한다.

**Files:** 없음 (검증만)

- [ ] **Step 1: 명령 순서**

Run: `npm run lint && npx tsc --noEmit && npm test && npm run build`
Expected: 전부 PASS. **`집필 진행률` 포함 모든 테스트가 초록이어야 한다** — 아직 빨갛다면 프로필이 덜 찬 것이다.

- [ ] **Step 2: 목표 지표 — 브랜드 17개**

Run: `node scripts/measure-page-length.mjs '^brand/' 1200`
Expected: **exit 0.** `17개 중 0개가 1200자 미만 (0%)`

- [ ] **Step 3: 사이트 전체 개선폭**

Run: `node scripts/measure-page-length.mjs '' 1200`
Expected: 미달 페이지가 26개 → 11개 내외로 줄어든다 (브랜드 15개가 빠진다). 실제 숫자를 기록해 보고에 쓴다.

- [ ] **Step 4: 회귀 — 제품·에러코드 허브·사이트맵**

```bash
node -e "
const c = require('fs').readdirSync('out/product', {recursive:true}).filter(f=>f.endsWith('.html')).length;
console.log('제품 페이지:', c);
"
node -e "
const c = require('fs').readdirSync('out/error-codes').filter(f=>f.endsWith('.html')).length;
console.log('에러코드 허브(인덱스 포함):', c);
"
node -e "
const x = require('fs').readFileSync('out/sitemap.xml','utf8');
console.log('사이트맵 URL:', (x.match(/<loc>/g)||[]).length);
"
```

Expected: 제품 74개, 에러코드 허브 13개 + 인덱스, 사이트맵 URL 수가 이 작업 시작 시점과 같다. 브랜드 URL은 원래 있던 것이라 늘지 않는다.

경로가 다르면 `out/` 구조를 직접 확인해 맞춘다 (`ls out/`).

- [ ] **Step 5: 카테고리 페이지와의 겹침 눈으로 확인**

`out/brand/LG.html`과 `out/category/air-conditioner.html`을 읽고, 브랜드 페이지의 서술이 카테고리 페이지가 이미 하는 말을 되풀이하지 않는지 확인한다. 자동화하지 않는 이유는 브랜드명·카테고리명·제품명이 설계상 양쪽에 나와, 임계값 없이는 항상 걸리거나 항상 통과하기 때문이다.

되풀이가 보이면 해당 브랜드의 `intro`·`editorNote`를 브랜드 레벨 내용(라인업 체계·A/S·에러코드 표기)으로 다시 쓴다. 제품 스펙을 늘어놓는 문장이 있으면 그것이 내부 복제다.

- [ ] **Step 6: 검수용 겹침 출력 최종 확인**

Run: `npx vitest run src/lib/data/brands 2>&1 | grep -A 6 '검수용'`
Expected: 17개 브랜드 중 상위 5쌍의 Jaccard 점수. 0.3을 넘는 쌍이 있으면 그 두 브랜드의 서술을 직접 비교하고, 실제로 닮았으면 다시 써서 Task 12로 돌아간다.

- [ ] **Step 7: 결과 보고**

사용자에게 보고한다:
- 브랜드 17개의 페이지별 글자 수 (Step 2 출력)
- 사이트 전체 미달 페이지 수 변화 (26개 → 실측값)
- 겹침 상위 쌍과 판단
- 배포 여부 결정 요청 — "17개가 다 차기 전에는 배포하지 않는다"는 조건이 이제 충족된다

---

## 완료 조건

- [ ] `npm run lint`·`npx tsc --noEmit`·`npm test`·`npm run build` 전부 통과
- [ ] `node scripts/measure-page-length.mjs '^brand/' 1200` exit 0
- [ ] 17개 브랜드 전부에 `sources`가 있고, A/S 번호를 쓴 브랜드는 `serviceCenter.sourceUrl`이 `sources`에 실재
- [ ] 브랜드 간 중복 문장 0건
- [ ] 제품 74개·에러코드 허브 13개 유지, 사이트맵 URL 수 변화 없음
- [ ] 비가전 브랜드 4개의 메타데이터에 "가전" 없음
