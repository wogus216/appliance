# 제품 상세 페이지 섹션 재배열 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 상세 페이지 섹션을 "우리가 가진 데이터 순서"에서 "구매자가 반론을 제기하는 순서"로 재배열하고, TV·무선이어폰은 같은 슬롯을 카테고리별 내용으로 치환한다.

**Architecture:** 섹션 순서는 12개 카테고리 전부 동일하다. 달라지는 건 ③fit·④value·⑤risk 슬롯의 **내용**뿐이며, 이는 `category-config.ts`의 `SECTION_SLOTS`가 선언한다(기존 `CORE_AXES` 재라벨 패턴과 동일). 비가전은 `techSpecs.extraSpecs`의 항목을 라벨 화이트리스트로 슬롯에 "끌어올려" 채우되, 원본 전량은 ⑥ 성능 상세의 전체 스펙표에 그대로 남아 정보 손실이 구조적으로 불가능하다.

**Tech Stack:** Next.js 16 (App Router, 정적 export), React 19 서버 컴포넌트, TypeScript, Tailwind v4, vitest, lucide-react

설계 문서: `docs/superpowers/specs/2026-08-11-product-detail-reorder-design.md`

## Global Constraints

- **이 프로젝트의 Next.js는 훈련 데이터와 다르다.** 코드 작성 전 `node_modules/next/dist/docs/`의 관련 가이드를 읽는다 (`AGENTS.md` 지시). deprecation 경고를 무시하지 않는다.
- **테스트 인프라 제약:** `vitest.config.ts`가 `environment: 'node'`, `include: ['src/**/*.test.ts', 'tests/**/*.test.ts']`이다. **`.tsx` 렌더 테스트는 불가능하고 testing-library도 설치돼 있지 않다.** TDD는 순수 함수(`.ts`)에만 적용하고, 컴포넌트는 `npm run build` 성공 + 빌드 산출물(`out/products/<slug>.html`) grep으로 검증한다. **테스트 인프라를 새로 도입하지 않는다.**
- 모든 사용자 노출 문구는 한국어.
- 정적 export이므로 서버 전용 API를 쓰지 않는다. `'use client'`는 기존에 붙어 있던 파일(`tco-calculator.tsx`, `product-toc.tsx`)에만 유지하고 새 컴포넌트에는 붙이지 않는다.
- 커밋 메시지는 영문, Conventional Commits. 각 태스크 끝에 커밋한다.
- **`extraSpecs`의 어떤 라벨도 버리지 않는다.** 슬롯 화이트리스트는 "위로 끌어올릴 것"만 지정하며, 전량은 항상 ⑥ 전체 스펙표에 표기된다.

## 최종 섹션 순서

| # | id | 섹션 | 컴포넌트 |
|---|---|---|---|
| 1 | — | Hero | `HeroSection` (수정) |
| 2 | `verdict` | 총평 + 추천/비추천 + 에디터 분석 | `VerdictSection` (신규) |
| 3 | `fit` | 슬롯 fit | `FitSection` (신규) |
| 4 | `value` | 슬롯 value | `ValueSection` (신규) |
| 5 | `risk` | 슬롯 risk | `RiskSection` (신규) |
| 6 | `performance` | 심층리뷰·핵심기능·레이더·전체 스펙표 | `PerformanceSection` (신규) |
| 7 | `user-reviews` | 사용자 리뷰 | `ReviewsSection` (그대로) |
| 8 | `purchase` | 구매처 | `PurchaseSection` (그대로) |
| 9 | — | 비슷한 제품 | `ApplianceCard` 그리드 (그대로) |
| 10 | `errorcodes` | 에러코드 | `ErrorCodeSection` (그대로) |

## File Structure

**신규**

| 파일 | 책임 |
|---|---|
| `src/lib/detail-sections.ts` | `buildProductToc()` — TOC 항목 생성 (순수 함수) |
| `src/lib/__tests__/category-config.test.ts` | 슬롯 선언·`liftExtraSpecs` 테스트 |
| `src/lib/__tests__/detail-sections.test.ts` | `buildProductToc` 테스트 |
| `src/components/detail/spec-grid.tsx` | 라벨/값 쌍 그리드 (fit·risk 슬롯 공용) |
| `src/components/detail/star-rating.tsx` | 5점 만점 별점 (총평·가치 섹션 공용) |
| `src/components/detail/fit-section.tsx` | 슬롯 ③ |
| `src/components/detail/value-section.tsx` | 슬롯 ④ |
| `src/components/detail/risk-section.tsx` | 슬롯 ⑤ |
| `src/components/detail/verdict-section.tsx` | 섹션 ② |
| `src/components/detail/performance-section.tsx` | 섹션 ⑥ |

**수정**

| 파일 | 변경 |
|---|---|
| `src/types/appliance.ts` | `ExtraSpec` 타입 추출 |
| `src/lib/category-config.ts` | `SECTION_SLOTS`·`getSectionSlots`·`liftExtraSpecs` 추가 |
| `src/lib/constants.ts` | `PRICE_TIER_LABELS` 추가 |
| `src/components/detail/hero-section.tsx` | CTA 교체, 가성비·가격대 승격 |
| `src/app/products/[slug]/page.tsx` | 섹션 재조립, TOC 갱신 |

**삭제** (내용이 신규 컴포넌트로 흡수됨)

- `src/components/detail/detailed-review.tsx`
- `src/components/detail/room-fit-section.tsx`

---

### Task 1: 슬롯 선언과 `liftExtraSpecs`

**Files:**
- Modify: `src/types/appliance.ts:40` (`extraSpecs` 필드)
- Modify: `src/lib/category-config.ts` (파일 끝에 추가)
- Test: `src/lib/__tests__/category-config.test.ts` (신규)

**Interfaces:**
- Consumes: `ApplianceCategory` from `@/types/appliance`, `allAppliances` from `@/lib/data/appliances`
- Produces:
  - `ExtraSpec` = `{ label: string; value: string }` (from `@/types/appliance`)
  - `SlotConfig` = `{ title: string; tocLabel: string; liftLabels?: string[] }`
  - `SectionSlots` = `{ fit: SlotConfig; value: SlotConfig; risk: SlotConfig }`
  - `SECTION_SLOTS: Record<ApplianceCategory, SectionSlots>`
  - `getSectionSlots(category: ApplianceCategory): SectionSlots`
  - `liftExtraSpecs(extraSpecs: ExtraSpec[] | undefined, liftLabels: string[] | undefined): ExtraSpec[]`

**화이트리스트 근거** — 9개 비가전 제품의 실제 `extraSpecs` 라벨을 전수 조사한 결과다. 추측이 아니다.

- TV 4개 공통: 해상도, 주사율, HDR, 스마트OS, 배터리, 특징 + (스피커|조작) + (스탠드 포함 무게|케이스)
- 이어폰 5개 공통: 드라이버, 코덱, ANC, 배터리, 방수, 블루투스, 멀티포인트, 무게, 공간음향 + 제품별 1개(헬스·부가·충전·게이밍)

- [ ] **Step 1: `ExtraSpec` 타입 추출**

`src/types/appliance.ts`에서 `TechSpecs`의 `extraSpecs` 인라인 타입을 이름 있는 타입으로 바꾼다.

`TechSpecs` 인터페이스 **바로 앞**에 추가:

```ts
/** 카테고리별 추가 스펙 한 항목 */
export interface ExtraSpec {
  label: string;
  value: string;
}
```

그리고 `TechSpecs` 안의 해당 줄을 교체:

```ts
  /** 카테고리별 추가 스펙(패널·주사율·코덱·ANC·방수 등). 가전 전용 필드로 표현 못하는 값을 유연하게 표기 */
  extraSpecs?: ExtraSpec[];
```

- [ ] **Step 2: 실패하는 테스트 작성**

`src/lib/__tests__/category-config.test.ts` 생성:

```ts
import { describe, it, expect } from 'vitest';
import {
  SECTION_SLOTS,
  getSectionSlots,
  liftExtraSpecs,
  isTraditionalAppliance,
} from '@/lib/category-config';
import { allAppliances } from '@/lib/data/appliances';
import type { ApplianceCategory, ExtraSpec } from '@/types/appliance';

const SPECS: ExtraSpec[] = [
  { label: '해상도', value: 'QHD' },
  { label: '주사율', value: '60Hz' },
  { label: '특징', value: '회전' },
];

describe('liftExtraSpecs', () => {
  it('liftLabels 순서대로 뽑는다 (원본 순서가 아니라)', () => {
    expect(liftExtraSpecs(SPECS, ['특징', '해상도']).map((s) => s.label)).toEqual([
      '특징',
      '해상도',
    ]);
  });

  it('매칭되지 않는 라벨은 건너뛴다', () => {
    expect(liftExtraSpecs(SPECS, ['없는라벨', '주사율']).map((s) => s.label)).toEqual(['주사율']);
  });

  it('extraSpecs가 없으면 빈 배열', () => {
    expect(liftExtraSpecs(undefined, ['해상도'])).toEqual([]);
  });

  it('liftLabels가 없으면 빈 배열', () => {
    expect(liftExtraSpecs(SPECS, undefined)).toEqual([]);
  });

  // 새 데이터를 만들어내지 않는다 — 반환값은 항상 원본의 부분집합이다.
  it('반환 항목은 전부 원본에 존재한다', () => {
    for (const s of liftExtraSpecs(SPECS, ['특징', '주사율', '해상도'])) {
      expect(SPECS).toContainEqual(s);
    }
  });
});

describe('SECTION_SLOTS', () => {
  const categories = Object.keys(SECTION_SLOTS) as ApplianceCategory[];

  it('12개 카테고리를 모두 선언한다', () => {
    expect(categories).toHaveLength(12);
  });

  it('모든 슬롯에 title과 tocLabel이 있다', () => {
    for (const c of categories) {
      for (const slot of ['fit', 'value', 'risk'] as const) {
        expect(getSectionSlots(c)[slot].title.length).toBeGreaterThan(0);
        expect(getSectionSlots(c)[slot].tocLabel.length).toBeGreaterThan(0);
      }
    }
  });

  it('생활가전은 liftLabels를 쓰지 않는다 (전용 컴포넌트가 렌더한다)', () => {
    for (const c of categories.filter(isTraditionalAppliance)) {
      const s = getSectionSlots(c);
      expect(s.fit.liftLabels).toBeUndefined();
      expect(s.risk.liftLabels).toBeUndefined();
    }
  });
});

// 화이트리스트는 문자열 매칭이라 라벨 오타·표기 변경에 취약하다.
// 실제 제품 데이터로 검증해 조용한 누락을 잡는다.
describe('비가전 화이트리스트가 실제 데이터와 맞는다', () => {
  const nonTraditional = allAppliances.filter((a) => !isTraditionalAppliance(a.category));

  it('대상 제품이 9개다', () => {
    expect(nonTraditional).toHaveLength(9);
  });

  it.each(nonTraditional.map((a) => [a.slug, a] as const))(
    '%s: fit·risk 슬롯이 각각 3개 이상 채워진다',
    (_slug, a) => {
      const slots = getSectionSlots(a.category);
      const specs = a.techSpecs.extraSpecs;
      expect(liftExtraSpecs(specs, slots.fit.liftLabels).length).toBeGreaterThanOrEqual(3);
      expect(liftExtraSpecs(specs, slots.risk.liftLabels).length).toBeGreaterThanOrEqual(3);
    },
  );
});
```

- [ ] **Step 3: 테스트가 실패하는지 확인**

Run: `npx vitest run src/lib/__tests__/category-config.test.ts`
Expected: FAIL — `SECTION_SLOTS`, `getSectionSlots`, `liftExtraSpecs`를 `@/lib/category-config`에서 import할 수 없다는 에러

- [ ] **Step 4: 구현**

`src/lib/category-config.ts` 파일 끝에 추가. 맨 위 import 줄을 다음으로 교체:

```ts
import type { ApplianceCategory, ExtraSpec } from '@/types/appliance';
```

파일 끝에 추가:

```ts
/**
 * 섹션 슬롯 설정.
 *
 * 상세 페이지의 ③fit·④value·⑤risk 세 섹션은 순서가 고정이고 내용만 카테고리별로 다르다.
 * 생활가전은 전용 컴포넌트(RoomFit·TCO·소음비교)가 렌더하므로 title/tocLabel만 쓰고,
 * TV·무선이어폰은 techSpecs.extraSpecs를 liftLabels로 끌어올려 슬롯을 채운다.
 *
 * liftLabels는 "위로 끌어올릴 것"만 지정한다. 뽑히지 않은 항목도 ⑥ 성능 상세의
 * 전체 스펙표에 전량 표기되므로 정보 손실이 발생하지 않는다.
 */
export interface SlotConfig {
  /** 섹션 h2 제목 */
  title: string;
  /** TOC 칩에 쓰는 짧은 라벨 */
  tocLabel: string;
  /** 비가전 전용: 이 슬롯으로 끌어올릴 extraSpecs 라벨 (선언 순서대로 표기) */
  liftLabels?: string[];
}

export interface SectionSlots {
  fit: SlotConfig;
  value: SlotConfig;
  risk: SlotConfig;
}

/** 생활가전 공통 슬롯 — 전용 컴포넌트가 렌더하므로 liftLabels 없음 */
const APPLIANCE_SLOTS: SectionSlots = {
  fit: { title: '우리 집에 맞나', tocLabel: '적합성' },
  value: { title: '10년 총비용', tocLabel: '비용' },
  risk: { title: '소음', tocLabel: '소음' },
};

const TV_SLOTS: SectionSlots = {
  fit: {
    title: '설치·공간',
    tocLabel: '설치',
    liftLabels: ['배터리', '스탠드 포함 무게', '케이스', '조작', '특징'],
  },
  value: { title: '가격 대비 가치', tocLabel: '가치' },
  risk: {
    title: '화질·게임 성능',
    tocLabel: '성능',
    liftLabels: ['해상도', '주사율', 'HDR', '스마트OS', '스피커'],
  },
};

const EARBUDS_SLOTS: SectionSlots = {
  fit: {
    title: '내 폰·용도에 맞나',
    tocLabel: '호환성',
    liftLabels: ['코덱', '블루투스', '멀티포인트', '방수'],
  },
  value: { title: '가격 대비 가치', tocLabel: '가치' },
  risk: {
    title: '착용감·배터리',
    tocLabel: '착용·배터리',
    liftLabels: ['배터리', '무게', '드라이버', 'ANC', '공간음향'],
  },
};

export const SECTION_SLOTS: Record<ApplianceCategory, SectionSlots> = {
  에어컨: APPLIANCE_SLOTS,
  제습기: APPLIANCE_SLOTS,
  공기청정기: APPLIANCE_SLOTS,
  선풍기: APPLIANCE_SLOTS,
  세탁기: APPLIANCE_SLOTS,
  건조기: APPLIANCE_SLOTS,
  냉장고: APPLIANCE_SLOTS,
  식기세척기: APPLIANCE_SLOTS,
  정수기: APPLIANCE_SLOTS,
  로봇청소기: APPLIANCE_SLOTS,
  TV: TV_SLOTS,
  무선이어폰: EARBUDS_SLOTS,
};

export function getSectionSlots(category: ApplianceCategory): SectionSlots {
  return SECTION_SLOTS[category] ?? APPLIANCE_SLOTS;
}

/**
 * liftLabels에 해당하는 extraSpecs 항목만 선언 순서대로 뽑는다.
 * 매칭되지 않는 라벨은 조용히 건너뛴다 — 제품마다 라벨 구성이 달라도 안전하다.
 * 뽑히지 않은 항목은 호출부가 버리지 않고 전체 스펙표에 그대로 남긴다.
 */
export function liftExtraSpecs(
  extraSpecs: ExtraSpec[] | undefined,
  liftLabels: string[] | undefined,
): ExtraSpec[] {
  if (!extraSpecs || !liftLabels) return [];
  return liftLabels
    .map((label) => extraSpecs.find((s) => s.label === label))
    .filter((s): s is ExtraSpec => s !== undefined);
}
```

- [ ] **Step 5: 테스트 통과 확인**

Run: `npx vitest run src/lib/__tests__/category-config.test.ts`
Expected: PASS (전체 테스트 통과. 특히 "fit·risk 슬롯이 각각 3개 이상 채워진다"가 9개 제품 전부 통과해야 한다)

- [ ] **Step 6: 전체 테스트·린트 확인**

Run: `npm test && npm run lint`
Expected: 기존 테스트 전부 PASS, 린트 에러 없음

- [ ] **Step 7: 커밋**

```bash
git add src/types/appliance.ts src/lib/category-config.ts src/lib/__tests__/category-config.test.ts
git commit -m "feat: declare per-category detail section slots

Adds SECTION_SLOTS alongside CORE_AXES so the fit/value/risk sections
can be relabeled per category. liftExtraSpecs pulls whitelisted
extraSpecs into a slot without discarding the rest, which stays in the
full spec table. Whitelists are verified against all 9 non-appliance
products so a label typo fails the test instead of silently dropping data."
```

---

### Task 2: TOC 빌더

**Files:**
- Create: `src/lib/detail-sections.ts`
- Test: `src/lib/__tests__/detail-sections.test.ts`

**Interfaces:**
- Consumes: `getSectionSlots` (Task 1), `Appliance` from `@/types/appliance`
- Produces:
  - `TocItem` = `{ id: string; label: string }`
  - `buildProductToc(appliance: Appliance): TocItem[]`

TOC id는 항상 `verdict → fit → value → risk → performance → user-reviews → purchase → errorcodes` 순서이고, `purchase`·`errorcodes`만 데이터 유무에 따라 조건부다. 이 순서는 `page.tsx`의 DOM 순서와 반드시 일치해야 한다(`ProductTOC`가 IntersectionObserver로 활성 항목을 추적하기 때문).

- [ ] **Step 1: 실패하는 테스트 작성**

`src/lib/__tests__/detail-sections.test.ts` 생성:

```ts
import { describe, it, expect } from 'vitest';
import { buildProductToc } from '@/lib/detail-sections';
import { allAppliances, getApplianceBySlug } from '@/lib/data/appliances';
import type { Appliance } from '@/types/appliance';

const bySlug = (slug: string): Appliance => {
  const a = getApplianceBySlug(slug);
  if (!a) throw new Error(`fixture not found: ${slug}`);
  return a;
};

describe('buildProductToc', () => {
  // 가전은 purchaseLinks·errorCodes를 100% 보유하므로 조건부 항목이 둘 다 나온다.
  it('생활가전은 8개 항목을 고정 순서로 낸다', () => {
    const ids = buildProductToc(bySlug('samsung-bespoke-wind-free-af25a9970')).map((t) => t.id);
    expect(ids).toEqual([
      'verdict',
      'fit',
      'value',
      'risk',
      'performance',
      'user-reviews',
      'purchase',
      'errorcodes',
    ]);
  });

  // 비가전은 errorCodes가 없으므로 7개다.
  it('비가전은 errorcodes 없이 7개 항목을 낸다', () => {
    const ids = buildProductToc(bySlug('sony-wf-1000xm5')).map((t) => t.id);
    expect(ids).toEqual([
      'verdict',
      'fit',
      'value',
      'risk',
      'performance',
      'user-reviews',
      'purchase',
    ]);
  });

  it('항상 verdict로 시작하고 고정 순서를 지킨다', () => {
    for (const a of allAppliances) {
      const ids = buildProductToc(a).map((t) => t.id);
      expect(ids[0]).toBe('verdict');

      const ORDER = [
        'verdict',
        'fit',
        'value',
        'risk',
        'performance',
        'user-reviews',
        'purchase',
        'errorcodes',
      ];
      // 실제 id들이 ORDER의 부분수열이어야 한다 (조건부 항목이 빠질 수는 있어도 순서는 불변)
      const positions = ids.map((id) => ORDER.indexOf(id));
      expect(positions).not.toContain(-1);
      expect([...positions].sort((x, y) => x - y)).toEqual(positions);
    }
  });

  it('에러코드가 있는 제품만 errorcodes 항목을 갖는다', () => {
    for (const a of allAppliances) {
      const has = buildProductToc(a).some((t) => t.id === 'errorcodes');
      expect(has).toBe(!!a.errorCodes?.length);
    }
  });

  it('구매처가 있는 제품만 purchase 항목을 갖는다', () => {
    for (const a of allAppliances) {
      const has = buildProductToc(a).some((t) => t.id === 'purchase');
      expect(has).toBe(!!a.purchaseLinks?.length);
    }
  });

  it('슬롯 라벨이 카테고리별로 달라진다', () => {
    const label = (a: Appliance, id: string) =>
      buildProductToc(a).find((t) => t.id === id)?.label;

    expect(label(bySlug('sony-wf-1000xm5'), 'fit')).toBe('호환성');
    expect(label(bySlug('samsung-the-movingstyle'), 'fit')).toBe('설치');
    expect(label(bySlug('samsung-bespoke-wind-free-af25a9970'), 'fit')).toBe('적합성');
  });

  it('모든 라벨이 비어 있지 않다', () => {
    for (const a of allAppliances) {
      for (const t of buildProductToc(a)) {
        expect(t.label.length).toBeGreaterThan(0);
      }
    }
  });
});
```

- [ ] **Step 2: 테스트가 실패하는지 확인**

Run: `npx vitest run src/lib/__tests__/detail-sections.test.ts`
Expected: FAIL — `@/lib/detail-sections` 모듈을 찾을 수 없음

- [ ] **Step 3: 구현**

`src/lib/detail-sections.ts` 생성:

```ts
import type { Appliance } from '@/types/appliance';
import { getSectionSlots } from '@/lib/category-config';

export interface TocItem {
  id: string;
  label: string;
}

/**
 * 상세 페이지 TOC 항목 생성.
 *
 * 순서는 카테고리와 무관하게 고정이며, page.tsx의 DOM 순서와 일치해야 한다.
 * ProductTOC가 IntersectionObserver로 활성 항목을 추적하기 때문에 어긋나면
 * 스크롤 하이라이트가 튄다.
 */
export function buildProductToc(appliance: Appliance): TocItem[] {
  const slots = getSectionSlots(appliance.category);

  return [
    { id: 'verdict', label: '결론' },
    { id: 'fit', label: slots.fit.tocLabel },
    { id: 'value', label: slots.value.tocLabel },
    { id: 'risk', label: slots.risk.tocLabel },
    { id: 'performance', label: '상세 스펙' },
    { id: 'user-reviews', label: '사용자 리뷰' },
    ...(appliance.purchaseLinks?.length ? [{ id: 'purchase', label: '구매처' }] : []),
    ...(appliance.errorCodes?.length ? [{ id: 'errorcodes', label: '에러코드' }] : []),
  ];
}
```

- [ ] **Step 4: 테스트 통과 확인**

Run: `npx vitest run src/lib/__tests__/detail-sections.test.ts`
Expected: PASS

- [ ] **Step 5: 전체 테스트·린트**

Run: `npm test && npm run lint`
Expected: 전부 PASS

- [ ] **Step 6: 커밋**

```bash
git add src/lib/detail-sections.ts src/lib/__tests__/detail-sections.test.ts
git commit -m "feat: build product TOC from section slots

TOC order is fixed across categories and must match the DOM order in
page.tsx; only purchase and errorcodes are conditional. Tests assert the
subsequence invariant across all 74 products."
```

---

### Task 3: `SpecGrid` · `StarRating` · `FitSection` · `RiskSection`

**Files:**
- Create: `src/components/detail/spec-grid.tsx`
- Create: `src/components/detail/star-rating.tsx`
- Create: `src/components/detail/fit-section.tsx`
- Create: `src/components/detail/risk-section.tsx`

**Interfaces:**
- Consumes: `getSectionSlots`·`liftExtraSpecs` (Task 1), `ExtraSpec`·`Appliance`·`RoomFit` from `@/types/appliance`, `ROOM_SIZE_LABELS` from `@/lib/constants`, `NoiseComparison` from `@/components/detail/noise-comparison`
- Produces:
  - `SpecGrid({ items }: { items: ExtraSpec[] })`
  - `StarRating({ rating, label }: { rating: number; label: string })`
  - `FitSection({ appliance }: { appliance: Appliance })`
  - `RiskSection({ appliance }: { appliance: Appliance })`

`StarRating`은 이 태스크에서 쓰이지 않지만 Task 4(`ValueSection`)와 Task 5(`VerdictSection`)가 공유한다. 두 곳에 같은 별점 렌더 코드를 복사하는 대신 여기서 한 번 만든다.

`FitSection`과 `RiskSection`은 비가전에서 동일한 렌더(라벨/값 그리드)를 하므로 `SpecGrid`를 공유한다. 가전에서는 각각 RoomFit 블록과 `NoiseComparison`으로 분기한다.

- [ ] **Step 1: `SpecGrid` 작성**

`src/components/detail/spec-grid.tsx` 생성:

```tsx
import { ExtraSpec } from '@/types/appliance';

/** 라벨/값 쌍을 카드 그리드로 표기. fit·risk 슬롯이 공유한다. */
export function SpecGrid({ items }: { items: ExtraSpec[] }) {
  if (items.length === 0) return null;
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      {items.map((s) => (
        <div key={s.label} className="p-3 bg-gray-50 rounded-lg">
          <p className="text-xs text-gray-500">{s.label}</p>
          <p className="font-bold text-gray-900">{s.value}</p>
        </div>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: `StarRating` 작성**

`src/components/detail/star-rating.tsx` 생성:

```tsx
import { Star } from 'lucide-react';

/** 5점 만점 별점. 총평(②)과 가치(④) 섹션이 공유한다. */
export function StarRating({ rating, label }: { rating: number; label: string }) {
  return (
    <span className="flex items-center gap-0.5" role="img" aria-label={`${label} ${rating}/5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          aria-hidden
          className={`w-4 h-4 ${
            i <= rating ? 'fill-current text-amber-500' : 'fill-none text-gray-300'
          }`}
        />
      ))}
    </span>
  );
}
```

- [ ] **Step 3: `FitSection` 작성**

`src/components/detail/fit-section.tsx` 생성. 가전은 기존 `room-fit-section.tsx`의 RoomFit 블록을 그대로 옮기고, 비가전은 `SpecGrid`로 채운다.

```tsx
import { Appliance } from '@/types/appliance';
import { ROOM_SIZE_LABELS } from '@/lib/constants';
import { getSectionSlots, liftExtraSpecs } from '@/lib/category-config';
import { SpecGrid } from '@/components/detail/spec-grid';

/**
 * 슬롯 ③ — "내 환경에 맞나".
 * 가전은 RoomFit(평수·적용면적·설치), 비가전은 slots.fit.liftLabels로 끌어올린 extraSpecs.
 */
export function FitSection({ appliance }: { appliance: Appliance }) {
  const slots = getSectionSlots(appliance.category);
  const { roomFit, techSpecs } = appliance;

  const lifted = liftExtraSpecs(techSpecs.extraSpecs, slots.fit.liftLabels);

  // 치수·무게는 카테고리를 가리지 않고 "들어가나"에 직결되므로 항상 앞에 붙인다.
  const dimensionItems = [
    ...(techSpecs.dimensions ? [{ label: '크기', value: techSpecs.dimensions }] : []),
    ...(techSpecs.weight ? [{ label: '무게', value: `${techSpecs.weight}kg` }] : []),
  ];

  return (
    <section>
      <h2 className="text-xl font-bold text-gray-900 mb-4">{slots.fit.title}</h2>
      <div className="bg-white border rounded-xl p-6 space-y-4">
        {roomFit && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-500">추천 평수</p>
              <p className="font-bold text-gray-900">
                {roomFit.recommendedSize.map((s) => ROOM_SIZE_LABELS[s] || s).join(', ')}
              </p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-500">적용 면적</p>
              <p className="font-bold text-gray-900">{roomFit.coverageArea}m2</p>
            </div>
            {roomFit.installationType && (
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-500">설치 타입</p>
                <p className="font-bold text-gray-900">{roomFit.installationType}</p>
              </div>
            )}
          </div>
        )}

        <SpecGrid items={[...dimensionItems, ...lifted]} />

        {roomFit?.installationNote && (
          <p className="text-sm text-gray-500 bg-yellow-50 p-3 rounded-lg">
            설치 참고: {roomFit.installationNote}
          </p>
        )}
      </div>
    </section>
  );
}
```

- [ ] **Step 4: `RiskSection` 작성**

`src/components/detail/risk-section.tsx` 생성:

```tsx
import { Appliance } from '@/types/appliance';
import { getSectionSlots, liftExtraSpecs, isTraditionalAppliance } from '@/lib/category-config';
import { NoiseComparison } from '@/components/detail/noise-comparison';
import { SpecGrid } from '@/components/detail/spec-grid';

/**
 * 슬롯 ⑤ — "기대에 못 미치지 않나".
 * 가전은 소음 비교, 비가전은 slots.risk.liftLabels로 끌어올린 extraSpecs.
 */
export function RiskSection({ appliance }: { appliance: Appliance }) {
  if (isTraditionalAppliance(appliance.category)) {
    return <NoiseComparison noise={appliance.specs.noise} />;
  }

  const slots = getSectionSlots(appliance.category);
  const lifted = liftExtraSpecs(appliance.techSpecs.extraSpecs, slots.risk.liftLabels);

  return (
    <section>
      <h2 className="text-xl font-bold text-gray-900 mb-4">{slots.risk.title}</h2>
      <div className="bg-white border rounded-xl p-6">
        <SpecGrid items={lifted} />
      </div>
    </section>
  );
}
```

`NoiseComparison`은 자체 `<section>`과 h2를 갖고 있으므로 가전 경로에서는 감싸지 않는다.

- [ ] **Step 5: 타입·린트 확인**

Run: `npm run lint && npx tsc --noEmit`
Expected: 에러 없음. `StarRating`이 아직 어디서도 쓰이지 않지만 export된 컴포넌트이므로 unused 경고가 나지 않는다.

- [ ] **Step 6: 커밋**

```bash
git add src/components/detail/spec-grid.tsx src/components/detail/star-rating.tsx src/components/detail/fit-section.tsx src/components/detail/risk-section.tsx
git commit -m "feat: add fit and risk slot sections

Appliances render RoomFit and NoiseComparison; TV and earbuds render
whitelisted extraSpecs through a shared SpecGrid. Dimensions and weight
are always shown in fit since they decide whether it physically fits.
StarRating lands here too so the verdict and value sections can share
one renderer instead of copying the five-star block."
```

---

### Task 4: `ValueSection`

**Files:**
- Create: `src/components/detail/value-section.tsx`
- Modify: `src/lib/constants.ts` (파일 끝에 `PRICE_TIER_LABELS` 추가)

**Interfaces:**
- Consumes: `getSectionSlots` (Task 1), `TcoCalculator`·`EnergyGradeImpact`, `getApplianceBySlug` from `@/lib/data/appliances`, `formatPrice` from `@/lib/utils`
- Produces:
  - `PRICE_TIER_LABELS: Record<string, string>` (from `@/lib/constants`)
  - `ValueSection({ appliance }: { appliance: Appliance })`

가전은 기존 `TcoCalculator` + 조건부 `EnergyGradeImpact`를 그대로 쓴다. 비가전은 TCO가 성립하지 않으므로 `priceAnalysis` 기반 UI를 새로 만든다.

`PRICE_TIER_LABELS`는 현재 `detailed-review.tsx` 안에 있는데 그 파일은 Task 7에서 삭제되고, `ValueSection`(Task 4)과 `VerdictSection`(Task 5) 양쪽이 쓰므로 `constants.ts`로 옮긴다.

- [ ] **Step 1: `PRICE_TIER_LABELS`를 constants로 이동**

`src/lib/constants.ts` 파일 끝에 추가:

```ts
export const PRICE_TIER_LABELS: Record<string, string> = {
  budget: '보급형',
  mid: '중급',
  premium: '프리미엄',
  luxury: '최고급',
};
```

- [ ] **Step 2: `ValueSection` 작성**

`src/components/detail/value-section.tsx` 생성:

```tsx
import Link from 'next/link';
import { Appliance } from '@/types/appliance';
import { getSectionSlots, isTraditionalAppliance } from '@/lib/category-config';
import { PRICE_TIER_LABELS, BRAND_LABELS } from '@/lib/constants';
import { formatPrice } from '@/lib/utils';
import { getApplianceBySlug } from '@/lib/data/appliances';
import { TcoCalculator } from '@/components/detail/tco-calculator';
import { EnergyGradeImpact } from '@/components/detail/energy-grade-impact';
import { StarRating } from '@/components/detail/star-rating';

/**
 * 슬롯 ④ — "돈이 더 들거나 값어치를 못 하지 않나".
 * 가전은 10년 총비용(TCO)+에너지등급 영향, 비가전은 전기요금이 무의미하므로
 * priceAnalysis(정가·실거래가·가성비·대안)로 대체한다.
 */
export function ValueSection({ appliance }: { appliance: Appliance }) {
  if (isTraditionalAppliance(appliance.category)) {
    const hasEnergyImpact =
      !!appliance.techSpecs.monthlyElectricityCost && !!appliance.techSpecs.energyGrade;
    return (
      <div className="space-y-12">
        <TcoCalculator appliance={appliance} />
        {hasEnergyImpact && (
          <EnergyGradeImpact
            currentGrade={appliance.techSpecs.energyGrade!}
            monthlyElecCost={appliance.techSpecs.monthlyElectricityCost!}
            purchasePrice={appliance.priceAnalysis.streetPrice || appliance.price}
          />
        )}
      </div>
    );
  }

  const slots = getSectionSlots(appliance.category);
  const { msrp, streetPrice, valueRating, priceTier, alternatives } = appliance.priceAnalysis;
  const tier = PRICE_TIER_LABELS[priceTier] ?? priceTier;
  const discount = streetPrice && streetPrice < msrp ? msrp - streetPrice : 0;
  const discountRate = discount ? Math.round((discount / msrp) * 100) : 0;

  const alts = alternatives
    .map((slug) => getApplianceBySlug(slug))
    .filter((a): a is Appliance => !!a);

  return (
    <section>
      <h2 className="text-xl font-bold text-gray-900 mb-4">{slots.value.title}</h2>
      <div className="bg-white border rounded-xl p-6 space-y-5">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <div className="p-3 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-500">정가</p>
            <p className="font-bold text-gray-900">{formatPrice(msrp)}</p>
          </div>
          {streetPrice && (
            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="text-xs text-blue-600">실거래가</p>
              <p className="font-bold text-blue-700">{formatPrice(streetPrice)}</p>
            </div>
          )}
          <div className="p-3 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-500">가격대</p>
            <p className="font-bold text-gray-900">{tier}</p>
          </div>
        </div>

        {discount > 0 && (
          <p className="text-sm text-gray-700 bg-green-50 p-3 rounded-lg">
            정가 대비 <strong>{formatPrice(discount)}</strong> ({discountRate}%) 낮은 가격에
            거래되고 있습니다.
          </p>
        )}

        <div className="flex items-center gap-3 border-t pt-4">
          <span className="text-sm text-gray-500">가성비</span>
          <StarRating rating={valueRating} label="가성비" />
        </div>

        {alts.length > 0 && (
          <div className="border-t pt-4">
            <h3 className="font-semibold text-gray-800 text-sm mb-2">같은 값이면 이것도</h3>
            <ul className="space-y-1.5">
              {alts.map((a) => (
                <li key={a.slug}>
                  <Link
                    href={`/products/${a.slug}`}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    {BRAND_LABELS[a.brand] || a.brand} {a.name} — {formatPrice(a.price)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
```

- [ ] **Step 3: 타입·린트 확인**

Run: `npm run lint && npx tsc --noEmit`
Expected: 에러 없음

- [ ] **Step 4: 커밋**

```bash
git add src/lib/constants.ts src/components/detail/value-section.tsx
git commit -m "feat: add value slot section

Appliances keep the TCO calculator and energy grade impact. TV and
earbuds get a priceAnalysis-based view instead, since monthly
electricity cost is meaningless for them. PRICE_TIER_LABELS moves to
constants because two sections now need it."
```

---

### Task 5: `VerdictSection` · `PerformanceSection`

**Files:**
- Create: `src/components/detail/verdict-section.tsx`
- Create: `src/components/detail/performance-section.tsx`
- Modify: `src/components/detail/spec-radar.tsx:117` (h2 제목·부제)

**Interfaces:**
- Consumes: `PRICE_TIER_LABELS` (Task 4), `getDetailedReview` from `@/lib/data/detailed-reviews`, `SpecRadar`, `Appliance`
- Produces:
  - `VerdictSection({ appliance }: { appliance: Appliance })`
  - `PerformanceSection({ appliance }: { appliance: Appliance })`

`detailed-review.tsx`를 두 조각으로 나눈다. **결론 섹션의 내부 순서가 원본과 다르다**: 원본은 총평 → 에디터 분석 → (페이지의) 추천/비추천이지만, 여기서는 총평 → **추천/비추천** → 에디터 분석이다. `editorComment`가 제품에 따라 10줄이 넘어(`sony-wf-1000xm5`) 긴 산문을 먼저 놓으면 "결론 먼저"라는 이 섹션의 목적이 희석되기 때문이다.

- [ ] **Step 1: `VerdictSection` 작성**

`src/components/detail/verdict-section.tsx` 생성:

```tsx
import { Check, X } from 'lucide-react';
import { Appliance } from '@/types/appliance';
import { PRICE_TIER_LABELS } from '@/lib/constants';
import { StarRating } from '@/components/detail/star-rating';

/**
 * 섹션 ② — "그래서 살 만한가".
 * 스캔 가능한 결론(총평·추천/비추천)을 먼저 주고, 긴 산문인 에디터 분석은 근거로 뒤에 둔다.
 */
export function VerdictSection({ appliance }: { appliance: Appliance }) {
  const { description, editorComment, priceAnalysis, targetUsers } = appliance;
  const tier = PRICE_TIER_LABELS[priceAnalysis.priceTier] ?? priceAnalysis.priceTier;

  return (
    <section>
      <h2 className="text-xl font-bold text-gray-900 mb-4">총평</h2>

      <div className="border rounded-2xl p-6 mb-5">
        <div className="flex flex-wrap items-center gap-x-10 gap-y-4">
          <div>
            <div className="text-xs text-gray-500 mb-1.5">가성비</div>
            <StarRating rating={priceAnalysis.valueRating} label="가성비" />
          </div>
          <div>
            <div className="text-xs text-gray-500 mb-1.5">가격대</div>
            <span className="inline-block text-sm font-semibold px-2.5 py-1 rounded-full bg-gray-100 text-gray-700">
              {tier}
            </span>
          </div>
        </div>
        {description && <p className="mt-5 text-gray-700 leading-relaxed">{description}</p>}
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-5">
        <div className="bg-green-50 rounded-xl p-6">
          <h3 className="font-bold text-green-800 mb-3">이런 분께 추천</h3>
          <ul className="space-y-2">
            {targetUsers.recommended.map((r, i) => (
              <li key={i} className="text-sm text-green-700 flex gap-2">
                <Check className="w-4 h-4 shrink-0 mt-0.5 text-green-600" aria-hidden="true" />
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-red-50 rounded-xl p-6">
          <h3 className="font-bold text-red-800 mb-3">이런 분께 비추천</h3>
          <ul className="space-y-2">
            {targetUsers.notRecommended.map((r, i) => (
              <li key={i} className="text-sm text-red-700 flex gap-2">
                <X className="w-4 h-4 shrink-0 mt-0.5 text-red-500" aria-hidden="true" />
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {editorComment && (
        <div>
          <h3 className="font-bold text-gray-900 mb-2">에디터 분석</h3>
          <div className="bg-blue-50 rounded-xl p-5 text-gray-700 leading-relaxed">
            {editorComment}
          </div>
        </div>
      )}
    </section>
  );
}
```

- [ ] **Step 2: `PerformanceSection` 작성**

`src/components/detail/performance-section.tsx` 생성. 전체 스펙표는 `room-fit-section.tsx`의 "상세 기술 사양" 블록을 그대로 이식하되, **`extraSpecs`는 슬롯으로 끌어올려졌는지와 무관하게 전량 표기한다.**

```tsx
import { Check } from 'lucide-react';
import { Appliance } from '@/types/appliance';
import { getDetailedReview } from '@/lib/data/detailed-reviews';
import { SpecRadar } from '@/components/detail/spec-radar';

/**
 * 섹션 ⑥ — 근거.
 * 전체 스펙표는 techSpecs 전 필드 + extraSpecs 전량을 담는다.
 * fit·risk 슬롯으로 끌어올린 항목도 여기 중복 표기해 누락을 원천 차단한다.
 */
export function PerformanceSection({ appliance }: { appliance: Appliance }) {
  const { techSpecs, features } = appliance;
  const sections = getDetailedReview(appliance.slug);

  return (
    <section className="space-y-8">
      <h2 className="text-xl font-bold text-gray-900">상세 스펙과 근거</h2>

      {sections && sections.length > 0 && (
        <div className="space-y-5">
          {sections.map((s, i) => (
            <div key={i}>
              <h3 className="font-bold text-gray-900 mb-1.5">{s.heading}</h3>
              <p className="text-gray-700 leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      )}

      {features.length > 0 && (
        <div>
          <h3 className="font-bold text-gray-900 mb-3">핵심 기능</h3>
          <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2.5">
            {features.map((f, i) => (
              <li key={i} className="flex gap-2 text-sm text-gray-700">
                <Check className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" aria-hidden="true" />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <SpecRadar specs={appliance.specs} category={appliance.category} />

      <div className="bg-white border rounded-xl p-6">
        <h3 className="font-semibold text-gray-800 text-sm mb-3">상세 기술 사양</h3>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex justify-between py-1.5 border-b border-gray-100">
            <span className="text-gray-500">핵심 기술</span>
            <span className="text-gray-900 font-medium">{techSpecs.coreTechnology}</span>
          </div>
          <div className="flex justify-between py-1.5 border-b border-gray-100">
            <span className="text-gray-500">용량</span>
            <span className="text-gray-900 font-medium">{techSpecs.capacity}</span>
          </div>
          {techSpecs.energyGrade && (
            <div className="flex justify-between py-1.5 border-b border-gray-100">
              <span className="text-gray-500">에너지등급</span>
              <span className="text-gray-900 font-medium">{techSpecs.energyGrade}</span>
            </div>
          )}
          {techSpecs.filterType && (
            <div className="flex justify-between py-1.5 border-b border-gray-100">
              <span className="text-gray-500">필터</span>
              <span className="text-gray-900 font-medium">{techSpecs.filterType}</span>
            </div>
          )}
          {techSpecs.refrigerant && (
            <div className="flex justify-between py-1.5 border-b border-gray-100">
              <span className="text-gray-500">냉매</span>
              <span className="text-gray-900 font-medium">{techSpecs.refrigerant}</span>
            </div>
          )}
          {techSpecs.dimensions && (
            <div className="flex justify-between py-1.5 border-b border-gray-100">
              <span className="text-gray-500">크기</span>
              <span className="text-gray-900 font-medium">{techSpecs.dimensions}</span>
            </div>
          )}
          {techSpecs.weight && (
            <div className="flex justify-between py-1.5 border-b border-gray-100">
              <span className="text-gray-500">무게</span>
              <span className="text-gray-900 font-medium">{techSpecs.weight}kg</span>
            </div>
          )}
          {techSpecs.extraSpecs?.map((s) => (
            <div key={s.label} className="flex justify-between py-1.5 border-b border-gray-100">
              <span className="text-gray-500">{s.label}</span>
              <span className="text-gray-900 font-medium">{s.value}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

원본 `room-fit-section.tsx`의 스펙표에는 `capacity` 행이 없었다. 여기서는 추가한다 — Hero 뱃지에만 있던 값이라 전체 스펙표에 없으면 누락으로 읽힌다.

- [ ] **Step 3: 레이더 제목·부제 수정**

`src/components/detail/spec-radar.tsx`에서 h2 줄을 찾아 교체한다. 현재:

```tsx
      <h2 className="text-xl font-bold text-gray-900 mb-4">스펙 분석</h2>
```

교체 후 (`PerformanceSection` 안에 들어가므로 h2 → h3로 낮춘다):

```tsx
      <h3 className="font-bold text-gray-900 mb-1">카테고리 내 상대 평가</h3>
      <p className="text-sm text-gray-500 mb-4">
        같은 {category} 제품들과 비교한 에디터 평가입니다. 10점 만점.
      </p>
```

`category`는 이미 `SpecRadar`의 prop으로 들어와 있으므로 추가 배선이 필요 없다. 레이더 축 구성은 건드리지 않는다 — 가전은 `CORE_AXES` 5축 + `powerConsumption` 파생 '저전력' 축의 6축, 비가전은 5축을 그대로 유지한다.

- [ ] **Step 4: 타입·린트 확인**

Run: `npm run lint && npx tsc --noEmit`
Expected: 에러 없음

- [ ] **Step 5: 커밋**

```bash
git add src/components/detail/verdict-section.tsx src/components/detail/performance-section.tsx src/components/detail/spec-radar.tsx
git commit -m "feat: split detailed review into verdict and performance sections

Verdict leads with scannable conclusions (rating, tier, recommend /
not-recommend) and defers the long editor prose. Performance carries the
evidence: deep review, features, radar, and the full spec table with
every extraSpec, including ones lifted into fit or risk.

Radar heading now states it is a within-category editor score out of 10,
which was previously ambiguous."
```

---

### Task 6: 페이지 재조립과 Hero 변경

**Files:**
- Modify: `src/app/products/[slug]/page.tsx` (전면 교체)
- Modify: `src/components/detail/hero-section.tsx:76-85` (CTA), `:87-107` (뱃지)

**Interfaces:**
- Consumes: Task 1~5의 모든 산출물, `buildProductToc` (Task 2)
- Produces: 없음 (통합 지점)

이 태스크에서 처음으로 새 컴포넌트들이 실제 렌더된다. 중간 상태가 깨지므로 page와 hero를 한 번에 바꾼다.

- [ ] **Step 1: `page.tsx` 본문 교체**

`ProductDetailPage` 함수 전체와 import 블록을 교체한다. `generateStaticParams`·`generateMetadata`는 그대로 둔다.

import 블록을 다음으로 교체:

```tsx
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { HeroSection } from '@/components/detail/hero-section';
import { VerdictSection } from '@/components/detail/verdict-section';
import { FitSection } from '@/components/detail/fit-section';
import { ValueSection } from '@/components/detail/value-section';
import { RiskSection } from '@/components/detail/risk-section';
import { PerformanceSection } from '@/components/detail/performance-section';
import { ErrorCodeSection } from '@/components/detail/error-code-section';
import { ReviewsSection } from '@/components/detail/reviews-section';
import { PurchaseSection } from '@/components/detail/purchase-section';
import { ProductJsonLd } from '@/components/detail/product-jsonld';
import { ProductTOC } from '@/components/detail/product-toc';
import { allAppliances, getApplianceBySlug, getSimilarProducts } from '@/lib/data/appliances';
import { BRAND_LABELS, CATEGORY_LABELS } from '@/lib/constants';
import { isTraditionalAppliance, getCategorySlug } from '@/lib/category-config';
import { buildProductToc } from '@/lib/detail-sections';
import { buildOpenGraph } from '@/lib/metadata';
import { BreadcrumbJsonLd } from '@/components/jsonld';
import { ApplianceCard } from '@/components/appliance-card';
```

`ProductDetailPage`를 다음으로 교체:

```tsx
export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const appliance = getApplianceBySlug(slug);
  if (!appliance) notFound();

  const similar = getSimilarProducts(slug);
  const hasErrorCodes = !!appliance.errorCodes?.length;
  const hasPurchase = !!appliance.purchaseLinks?.length;
  const toc = buildProductToc(appliance);

  return (
    <>
      <ProductJsonLd appliance={appliance} />
      <BreadcrumbJsonLd
        items={[
          { name: '홈', path: '/' },
          {
            name: CATEGORY_LABELS[appliance.category] || appliance.category,
            path: `/category/${getCategorySlug(appliance.category)}`,
          },
          { name: `${BRAND_LABELS[appliance.brand] || appliance.brand} ${appliance.name}` },
        ]}
      />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <HeroSection appliance={appliance} />

        <ProductTOC items={toc} />

        {/* 순서는 구매자가 반론을 제기하는 순서를 따른다:
            결론 → 내 환경에 맞나 → 돈이 더 드나 → 기대에 못 미치나 → 근거 → 사회적 증거 → 전환.
            buildProductToc()의 id 순서와 반드시 일치해야 한다. */}
        <div className="space-y-12 pt-8">
          <div id="verdict" className="scroll-mt-32">
            <VerdictSection appliance={appliance} />
          </div>

          <div id="fit" className="scroll-mt-32">
            <FitSection appliance={appliance} />
          </div>

          <div id="value" className="scroll-mt-32">
            <ValueSection appliance={appliance} />
          </div>

          <div id="risk" className="scroll-mt-32">
            <RiskSection appliance={appliance} />
          </div>

          <div id="performance" className="scroll-mt-32">
            <PerformanceSection appliance={appliance} />
          </div>

          <div id="user-reviews" className="scroll-mt-32">
            <ReviewsSection reviews={appliance.reviews} />
          </div>

          {hasPurchase && (
            <div id="purchase" className="scroll-mt-32">
              <PurchaseSection links={appliance.purchaseLinks!} />
            </div>
          )}

          {similar.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">비슷한 제품</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {similar.map((s) => (
                  <ApplianceCard key={s.id} appliance={s} />
                ))}
              </div>
            </section>
          )}

          {/* 에러코드는 구매 검토자가 아니라 이미 산 사람의 질문이라 맨 끝에 둔다.
              SEO 자산이므로 제거하지 않고 위치만 내린다. */}
          {hasErrorCodes && (
            <div id="errorcodes" className="scroll-mt-32">
              <h2 className="text-xl font-bold text-gray-900 mb-1">에러코드</h2>
              <p className="text-sm text-gray-500 mb-4">구매 후 참고용입니다.</p>
              <ErrorCodeSection errorCodes={appliance.errorCodes!} brand={appliance.brand} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
```

`isTraditionalAppliance`는 `generateMetadata`에서 계속 쓰이므로 import를 남긴다.

- [ ] **Step 2: Hero CTA 교체**

`src/components/detail/hero-section.tsx`에서 구매 CTA 블록을 찾는다:

```tsx
        {/* 구매 CTA */}
        {hasPurchase && (
          <a
            href="#purchase"
            className="inline-flex w-fit items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
          >
            <ShoppingBag className="w-4 h-4" aria-hidden="true" />
            구매처 보기
          </a>
        )}
```

다음으로 교체한다. 체류가 1차 목표이므로 본문을 건너뛰게 하는 대신 결론으로 유도한다:

```tsx
        {/* 결론으로 유도 — 구매처 직행 앵커는 본문 전체를 건너뛰게 하므로 쓰지 않는다 */}
        <a
          href="#verdict"
          className="inline-flex w-fit items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
        >
          <ClipboardCheck className="w-4 h-4" aria-hidden="true" />
          결론부터 보기
        </a>
```

import 줄을 교체:

```tsx
import { Star, ClipboardCheck } from 'lucide-react';
```

그리고 이제 쓰이지 않는 `hasPurchase` 변수를 삭제한다:

```tsx
  const hasPurchase = !!appliance.purchaseLinks && appliance.purchaseLinks.length > 0;
```

- [ ] **Step 3: Hero에 가성비·가격대 승격**

핵심 스펙 뱃지 블록(`<div className="flex flex-wrap gap-2 pt-1">`) 안, `energyGrade` 뱃지 **앞**에 추가한다. 현재는 이 값들을 보려면 ②까지 스크롤해야 한다:

```tsx
          <span className="px-3 py-1.5 bg-amber-50 rounded-lg text-sm text-amber-700 font-medium">
            가성비 {appliance.priceAnalysis.valueRating}/5
          </span>
          <span className="px-3 py-1.5 bg-gray-100 rounded-lg text-sm text-gray-700">
            {PRICE_TIER_LABELS[appliance.priceAnalysis.priceTier] ??
              appliance.priceAnalysis.priceTier}
          </span>
```

import에 추가:

```tsx
import { BRAND_LABELS, PRICE_TIER_LABELS } from '@/lib/constants';
```

- [ ] **Step 4: 빌드 확인**

Run: `npm run lint && npm test && npm run build`
Expected: 린트·테스트 PASS, 빌드에서 74개 제품 페이지가 전부 정적 생성됨. 에러 0.

- [ ] **Step 5: 섹션 순서 자동 검증**

빌드 산출물에서 id 등장 순서를 확인한다. 대표 3종:

```bash
node -e '
const fs = require("fs");
const ORDER = ["verdict","fit","value","risk","performance","user-reviews","purchase","errorcodes"];
for (const slug of ["samsung-bespoke-wind-free-af25a9970","samsung-the-movingstyle","sony-wf-1000xm5"]) {
  const path = `out/products/${slug}.html`;
  if (!fs.existsSync(path)) { console.log(`SKIP ${slug} (없음)`); continue; }
  const html = fs.readFileSync(path, "utf8");
  const found = ORDER.map(id => [id, html.indexOf(`id="${id}"`)]).filter(([,i]) => i >= 0);
  const positions = found.map(([,i]) => i);
  const sorted = [...positions].sort((a,b) => a-b);
  const ok = JSON.stringify(positions) === JSON.stringify(sorted);
  console.log(`${ok ? "OK  " : "FAIL"} ${slug}: ${found.map(([id]) => id).join(" → ")}`);
}
'
```

Expected: 세 줄 모두 `OK`. 슬러그가 존재하지 않으면 `ls out/products/*.html | head`로 실제 슬러그를 확인해 대체한다.

- [ ] **Step 6: 커밋**

```bash
git add src/app/products/\[slug\]/page.tsx src/components/detail/hero-section.tsx
git commit -m "feat: reorder detail page around buyer objections

Sections now run verdict, fit, value, risk, evidence, social proof,
conversion, with error codes last since they answer a post-purchase
question. The hero CTA points at the verdict instead of jumping
straight to purchase links, which skipped the entire body; value
rating and price tier move up into the hero badges."
```

---

### Task 7: 구 컴포넌트 삭제와 전수 검증

**Files:**
- Delete: `src/components/detail/detailed-review.tsx`
- Delete: `src/components/detail/room-fit-section.tsx`

**Interfaces:**
- Consumes: Task 1~6 전부
- Produces: 없음

- [ ] **Step 1: 참조가 남아 있지 않은지 확인**

Run:

```bash
grep -rn "DetailedReview\b\|RoomFitSection\|detailed-review\|room-fit-section" src | grep -v "DetailedReviewSection"
```

Expected: 출력 없음. (`DetailedReviewSection`은 `types/appliance.ts`의 별개 타입이므로 제외한다.)

출력이 있으면 해당 참조를 먼저 정리한 뒤 다음 단계로 간다.

- [ ] **Step 2: 삭제**

```bash
git rm src/components/detail/detailed-review.tsx src/components/detail/room-fit-section.tsx
```

- [ ] **Step 3: 린트·테스트·빌드**

Run: `npm run lint && npm test && npm run build`
Expected: 전부 PASS, 74개 정적 생성

- [ ] **Step 4: extraSpecs 누락 전수 검증**

비가전 9개의 `extraSpecs` 라벨이 **하나도 빠짐없이** 빌드된 HTML에 나타나는지 확인한다. 이것이 "어떤 라벨도 버리지 않는다" 규칙의 실증이다.

```bash
npx tsx -e '
import fs from "node:fs";
import { allAppliances } from "./src/lib/data/appliances";
import { isTraditionalAppliance } from "./src/lib/category-config";

let failed = 0;
for (const a of allAppliances.filter(x => !isTraditionalAppliance(x.category))) {
  const html = fs.readFileSync(`out/products/${a.slug}.html`, "utf8");
  const missing = (a.techSpecs.extraSpecs ?? [])
    .map(s => s.label)
    .filter(label => !html.includes(label));
  if (missing.length) { failed++; console.log(`FAIL ${a.slug}: 누락 ${missing.join(", ")}`); }
  else console.log(`OK   ${a.slug}: ${(a.techSpecs.extraSpecs ?? []).length}개 라벨 전부 표기`);
}
process.exit(failed ? 1 : 0);
'
```

Expected: 9줄 모두 `OK`, exit 0

- [ ] **Step 5: 육안 확인용 URL 목록 출력**

Run: `npm run dev`

브라우저에서 아래 4종을 확인한다:

| 확인 항목 | URL |
|---|---|
| 가전 + 에너지등급 있음 — ④에 TCO와 에너지등급 두 블록이 다 나오는지 | `/products/samsung-bespoke-wind-free-af25a9970` |
| 가전 + 에너지등급 없음 — ④가 TCO만으로 자연스러운지 | `/products/samsung-bespoke-cube-air-ax90` |
| TV — ③⑤가 `extraSpecs`로 채워지고 ⑥ 스펙표에 전량이 남는지 | `/products/samsung-the-movingstyle` |
| 무선이어폰 — ④ 신규 UI(정가·실거래가·가성비·대안) | `/products/sony-wf-1000xm5` |

각 페이지에서 TOC 칩을 클릭했을 때 해당 섹션으로 이동하는지, 스크롤 시 활성 칩이 순서대로 바뀌는지도 확인한다.

위 슬러그는 작성 시점 데이터 기준이다. 맞지 않으면 다음으로 다시 뽑는다:

```bash
npx tsx -e '
import { allAppliances } from "./src/lib/data/appliances";
const pick = (f: (a: typeof allAppliances[0]) => boolean) => allAppliances.find(f)?.slug;
console.log("등급 있는 가전:", pick(a => !!a.techSpecs.energyGrade));
console.log("등급 없는 가전:", pick(a => !a.techSpecs.energyGrade && a.category !== "TV" && a.category !== "무선이어폰"));
console.log("TV:", pick(a => a.category === "TV"));
console.log("이어폰:", pick(a => a.category === "무선이어폰"));
'
```

- [ ] **Step 6: 커밋**

```bash
git add -A
git commit -m "refactor: drop DetailedReview and RoomFitSection

Their content now lives in VerdictSection, PerformanceSection, and
FitSection. Verified that all extraSpecs labels for the 9 non-appliance
products still appear in the built HTML."
```

---

## 완료 조건

- [ ] `npm run lint` 무경고
- [ ] `npm test` 전체 PASS (신규 테스트 2파일 포함)
- [ ] `npm run build` 성공, 74개 제품 페이지 정적 생성
- [ ] Task 6 Step 5의 섹션 순서 검증이 대표 3종 모두 `OK`
- [ ] Task 7 Step 4의 `extraSpecs` 누락 검증이 9개 모두 `OK`
- [ ] 육안 4종 확인 완료

## 범위 밖 (이번에 하지 않는다)

- **스펙 레이더 동급 오버레이** — `similarProducts` 상위 2개를 겹쳐 그려 비교 맥락을 주는 작업. 비교 대상 선정 로직 + SVG 다중 폴리곤 + 범례가 필요해 별도 작업이다. 레이더가 단독으로는 정보가 빈약하다는 문제는 이번 작업 후에도 남는다.
- 섹션 내부 UI 리디자인 — 이번 작업은 순서·묶음 재편에 한정한다.
- 테스트 인프라 확장 (jsdom·testing-library 도입).
- 에러코드 위치 하락에 따른 SEO 영향 측정 — 유입 데이터가 없어 현재로선 검증 수단이 없다.
