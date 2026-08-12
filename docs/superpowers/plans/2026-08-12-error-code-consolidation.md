# 에러코드 페이지 통합 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 254개의 얇은 에러코드 상세 페이지를 없애고 기존 브랜드 허브 13개에 내용을 통합해, 1,200자 미만 페이지를 75%에서 20%로 줄인다.

**Architecture:** `getBrandErrorCodes(brand)`가 브랜드의 전 에러코드를 카테고리별로 묶어 돌려주고, 브랜드 허브가 그것을 통째로 렌더한다. 제품 상세는 전문 대신 요약과 허브 앵커 링크만 남겨 중복을 만들지 않는다. 사라지는 254개 URL은 `_redirects` 한 줄로 브랜드 허브에 301한다.

**Tech Stack:** Next.js 16 (App Router, 정적 export), React 19 서버 컴포넌트, TypeScript, Tailwind v4, vitest, Cloudflare Workers 정적 자산

설계 문서: `docs/superpowers/specs/2026-08-12-error-code-consolidation-design.md`

## Global Constraints

- **이 프로젝트의 Next.js는 훈련 데이터와 다르다.** 코드 작성 전 `node_modules/next/dist/docs/`의 관련 가이드를 읽는다 (`AGENTS.md` 지시).
- **테스트 인프라 제약:** `vitest.config.ts`가 `environment: 'node'`, `include: ['src/**/*.test.ts', 'tests/**/*.test.ts']`이다. `.tsx` 렌더 테스트는 불가능하고 testing-library도 없다. TDD는 순수 함수에만 적용하고, 컴포넌트는 `npm run build` + 빌드 산출물 검증으로 확인한다. **테스트 인프라를 새로 도입하지 않는다.**
- 모든 사용자 노출 문구와 코드 주석은 한국어. **식별자는 ASCII.**
- 정적 export이므로 서버 전용 API를 쓰지 않는다. 새 컴포넌트에 `'use client'`를 붙이지 않는다.
- 페이지 메타데이터의 `openGraph`는 반드시 `buildOpenGraph()`(`@/lib/metadata`)를 거친다 — 직접 리터럴로 쓰면 layout의 `siteName`·`locale`이 유실된다.
- **이 작업의 성패는 "정보가 하나도 사라지지 않았는가"다.** 254개 페이지를 지우면서 코드 하나라도 증발하면, 얇은 페이지를 없앤 게 아니라 콘텐츠를 줄인 것이 된다. Task 1과 Task 4의 전수 대조가 그 게이트다.
- 커밋 메시지는 영문, Conventional Commits. 각 태스크 끝에 커밋한다.

## File Structure

**신규**

| 파일 | 책임 |
|---|---|
| `public/_redirects` | 254개 코드 URL → 브랜드 허브 301 (한 줄) |

**수정**

| 파일 | 변경 |
|---|---|
| `src/lib/error-codes.ts` | `errorCodeAnchorId`·`errorCodeAnchor`·`getErrorCodeBrands`·`getBrandErrorCodes` 추가, `errorCodeHref`·`getAllErrorCodeParams` 제거 |
| `src/lib/__tests__/error-codes.test.ts` | `errorCodeHref` 테스트 교체, 신규 함수 테스트 추가 |
| `src/app/error-codes/[brand]/page.tsx` | 카드 그리드 → 카테고리별 전체 내용 |
| `src/components/detail/error-code-section.tsx` | 전문 → 요약 + 앵커 링크, `category` prop 추가 |
| `src/app/products/[slug]/page.tsx` | `ErrorCodeSection`에 `category` 전달 |
| `src/app/error-codes/page.tsx` | 링크를 앵커로 |
| `src/app/sitemap.ts` | 254개 URL 제거, 브랜드 목록 소스 교체 |

**삭제**

- `src/app/error-codes/[brand]/[code]/page.tsx`

---

### Task 1: 데이터 레이어

**Files:**
- Modify: `src/lib/error-codes.ts`
- Test: `src/lib/__tests__/error-codes.test.ts`

**Interfaces:**
- Consumes: `allAppliances` (`@/lib/data/appliances`), `BRAND_LABELS` (`@/lib/constants`), `CATEGORY_SLUGS` (`@/lib/category-config`), `ApplianceCategory`·`ErrorCode` (`@/types/appliance`)
- Produces:
  - `slugifyCode(code: string): string` — 기존 유지
  - `errorCodeAnchorId(category: ApplianceCategory, code: string): string` → `'air-conditioner-e1'`
  - `errorCodeAnchor(brand: string, category: ApplianceCategory, code: string): string` → `'/error-codes/Samsung#air-conditioner-e1'`
  - `getErrorCodeBrands(): string[]`
  - `BrandErrorCodeEntry` = `{ code, codeSlug, anchorId, severity, description, cause, solution, products: { slug, name }[] }`
  - `BrandCategoryCodes` = `{ category: ApplianceCategory; entries: BrandErrorCodeEntry[] }`
  - `getBrandErrorCodes(brand: string): BrandCategoryCodes[]`

**제거되는 것:** `errorCodeHref`, `getAllErrorCodeParams`, `getErrorCodeDetail`, `ErrorCodeDetail`, `ErrorCodeOccurrence`, `decodeSlug`. 이 태스크에서는 **아직 제거하지 않는다** — 아직 호출부가 살아 있어 트리가 깨진다. Task 4에서 지운다.

- [ ] **Step 1: 실패하는 테스트 작성**

`src/lib/__tests__/error-codes.test.ts`를 다음으로 **전체 교체**한다. 기존 `errorCodeHref` 테스트는 그 함수가 사라지므로 없어진다.

```ts
import { describe, it, expect } from 'vitest';
import {
  slugifyCode,
  errorCodeAnchorId,
  errorCodeAnchor,
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

describe('errorCodeAnchorId / errorCodeAnchor', () => {
  it('카테고리 슬러그와 코드 슬러그를 잇는다', () => {
    expect(errorCodeAnchorId('에어컨', 'E1')).toBe('air-conditioner-e1');
    expect(errorCodeAnchorId('세탁기', 'CH 05')).toBe('washer-ch-05');
  });

  it('브랜드 허브 경로에 앵커를 붙인다', () => {
    expect(errorCodeAnchor('Samsung', '에어컨', 'E1')).toBe(
      '/error-codes/Samsung#air-conditioner-e1',
    );
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
```

- [ ] **Step 2: 테스트가 실패하는지 확인**

Run: `npx vitest run src/lib/__tests__/error-codes.test.ts`
Expected: FAIL — `errorCodeAnchorId`, `getErrorCodeBrands`, `getBrandErrorCodes`를 import할 수 없다

- [ ] **Step 3: 구현**

`src/lib/error-codes.ts`의 import 블록에 추가:

```ts
import { CATEGORY_SLUGS } from '@/lib/category-config';
```

파일 끝에 추가한다. 기존 함수는 이 태스크에서 건드리지 않는다 — 아직 호출부가 살아 있다.

```ts
/**
 * 브랜드 허브 안에서 코드 블록의 DOM id.
 *
 * 같은 코드가 카테고리마다 다른 의미다(삼성 E1은 에어컨에서 온도센서, 제습기에서 수위센서).
 * 그래서 코드만으로는 id가 유일하지 않고 카테고리를 함께 넣는다.
 */
export function errorCodeAnchorId(category: ApplianceCategory, code: string): string {
  return `${CATEGORY_SLUGS[category]}-${slugifyCode(code)}`;
}

/** 브랜드 허브의 해당 코드 위치로 가는 경로 */
export function errorCodeAnchor(
  brand: string,
  category: ApplianceCategory,
  code: string,
): string {
  return `/error-codes/${brand}#${errorCodeAnchorId(category, code)}`;
}

/** 에러코드를 가진 브랜드 목록 (카탈로그 등장 순) */
export function getErrorCodeBrands(): string[] {
  const seen = new Set<string>();
  for (const a of allAppliances) {
    if (a.errorCodes?.length) seen.add(a.brand);
  }
  return [...seen];
}

export type BrandErrorCodeEntry = {
  code: string;
  codeSlug: string;
  /** 브랜드 허브 안에서 이 블록의 DOM id. 같은 (카테고리,코드)가 둘 이상이면 -2, -3이 붙는다 */
  anchorId: string;
  severity: ErrorCode['severity'];
  description: string;
  cause: string;
  solution: string;
  products: { slug: string; name: string }[];
};

export type BrandCategoryCodes = {
  category: ApplianceCategory;
  entries: BrandErrorCodeEntry[];
};

/**
 * 브랜드의 전 에러코드를 카테고리별로 묶는다.
 *
 * 묶는 키에 본문(description·cause·solution)까지 넣는 이유: 같은 브랜드·카테고리·코드가
 * 제품 여럿에 걸릴 때 보통은 본문이 같아 제품만 합치면 되지만, 다를 수도 있다.
 * 첫 번째만 남기면 정보가 조용히 사라지므로, 본문이 다르면 항목을 따로 남긴다.
 */
export function getBrandErrorCodes(brand: string): BrandCategoryCodes[] {
  type Bucket = Omit<BrandErrorCodeEntry, 'anchorId'>;
  const byCategory = new Map<ApplianceCategory, Map<string, Bucket>>();


  for (const a of allAppliances) {
    if (a.brand !== brand || !a.errorCodes) continue;
    for (const ec of a.errorCodes) {
      const codeSlug = slugifyCode(ec.code);
      if (!codeSlug) continue;

      // 은 데이터에 나올 수 없는 구분자다. 본문에 '|'가 들어가도 키가 뒤섞이지 않는다.
      // JSON.stringify로 키를 만든다. 구분자로 이으면 서로 다른 조합이 같은 문자열이 될 수 있는데,
      // 배열 직렬화는 그런 충돌이 구조적으로 없다.
      const key = JSON.stringify([codeSlug, ec.description, ec.cause, ec.solution]);

      let buckets = byCategory.get(a.category);
      if (!buckets) {
        buckets = new Map();
        byCategory.set(a.category, buckets);
      }

      const existing = buckets.get(key);
      if (existing) {
        existing.products.push({ slug: a.slug, name: a.name });
      } else {
        buckets.set(key, {
          code: ec.code,
          codeSlug,
          severity: ec.severity,
          description: ec.description,
          cause: ec.cause,
          solution: ec.solution,
          products: [{ slug: a.slug, name: a.name }],
        });
      }
    }
  }

  // 정적 생성이라 순서가 흔들리면 빌드마다 HTML이 달라진다. 카테고리·코드 모두 고정한다.
  const categoryOrder = Object.keys(CATEGORY_SLUGS) as ApplianceCategory[];

  return categoryOrder
    .filter((c) => byCategory.has(c))
    .map((category) => {
      const sorted = [...byCategory.get(category)!.values()].sort((x, y) =>
        x.code.localeCompare(y.code, 'ko'),
      );

      // 본문이 달라 같은 (카테고리,코드)가 둘 이상이면 id가 겹친다. 첫 항목만 깨끗한 id를 갖는다.
      const used = new Map<string, number>();
      return {
        category,
        entries: sorted.map((e) => {
          const base = errorCodeAnchorId(category, e.code);
          const n = (used.get(base) ?? 0) + 1;
          used.set(base, n);
          return { ...e, anchorId: n === 1 ? base : `${base}-${n}` };
        }),
      };
    });
}
```

- [ ] **Step 4: 테스트 통과 확인**

Run: `npx vitest run src/lib/__tests__/error-codes.test.ts`
Expected: PASS

- [ ] **Step 5: 정보 손실 가드가 실제로 무는지 확인**

`getBrandErrorCodes`의 키에서 본문을 빼서 코드만으로 묶도록 임시 변경한다:

```ts
      const key = codeSlug;   // 임시: 본문을 뺀다
```

Run: `npx vitest run src/lib/__tests__/error-codes.test.ts`
Expected: **FAIL** — "원본 데이터의 모든 (카테고리·코드·본문) 조합이 그대로 나온다"가 깨진다. 같은 코드가 카테고리 안에서 본문 차이로 두 개 있는 브랜드에서 하나가 사라지기 때문이다.

**만약 통과한다면**, 현재 데이터에 그런 케이스가 없다는 뜻이다. 그때는 통과했다는 사실과 함께 보고하고 원복한다 — 가드가 지금 데이터로는 발화하지 않지만 미래 데이터를 막는다는 것을 기록에 남긴다.

원복하고 재실행해 PASS를 확인한다. 본 결과를 보고서에 적는다.

- [ ] **Step 6: 전체 테스트·린트**

Run: `npm test && npm run lint && npx tsc --noEmit`
Expected: 전부 통과. 이 시점에는 기존 함수가 아직 살아 있어 다른 파일이 깨지지 않는다.

- [ ] **Step 7: 커밋**

```bash
git add src/lib/error-codes.ts src/lib/__tests__/error-codes.test.ts
git commit -m "feat: group brand error codes by category

Adds getBrandErrorCodes so a brand hub can carry every code inline
instead of linking out to 254 near-empty detail pages.

The grouping key includes the body text, not just the code: the same
code under one category can carry different text on different products,
and keying on the code alone would drop one of them silently. Tests
assert that every (category, code, body) tuple in the source data comes
back out, per brand — that invariant is what makes deleting the detail
pages safe."
```

---

### Task 2: 브랜드 허브 페이지

**Files:**
- Modify: `src/app/error-codes/[brand]/page.tsx` (본문 전체 교체)

**Interfaces:**
- Consumes: `getErrorCodeBrands`·`getBrandErrorCodes`·`BrandCategoryCodes` (Task 1), `BRAND_LABELS`·`SITE_URL` (`@/lib/constants`), `CATEGORY_SLUGS` (`@/lib/category-config`), `buildOpenGraph` (`@/lib/metadata`)
- Produces: 두꺼워진 `/error-codes/[brand]` 라우트

- [ ] **Step 1: 페이지 전체 교체**

`src/app/error-codes/[brand]/page.tsx`를 다음으로 교체한다.

```tsx
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getErrorCodeBrands, getBrandErrorCodes } from '@/lib/error-codes';
import { SITE_URL, BRAND_LABELS } from '@/lib/constants';
import { CATEGORY_SLUGS } from '@/lib/category-config';
import { buildOpenGraph } from '@/lib/metadata';

type Props = {
  params: Promise<{ brand: string }>;
};

const SEVERITY_STYLES: Record<string, string> = {
  low: 'bg-green-50 text-green-800 border-green-200',
  medium: 'bg-yellow-50 text-yellow-800 border-yellow-200',
  high: 'bg-red-50 text-red-800 border-red-200',
};
const SEVERITY_LABELS: Record<string, string> = {
  low: '경미',
  medium: '주의',
  high: '긴급',
};

export function generateStaticParams() {
  return getErrorCodeBrands().map((brand) => ({ brand }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { brand } = await params;
  const groups = getBrandErrorCodes(brand);
  if (groups.length === 0) return { title: '에러코드를 찾을 수 없습니다' };

  const brandLabel = BRAND_LABELS[brand] || brand;
  const total = groups.reduce((s, g) => s + g.entries.length, 0);
  const cats = groups.map((g) => g.category).join('·');
  const title = `${brandLabel} 에러코드 전체 — 원인·해결법`;
  const description = `${brandLabel} ${cats} 에러코드 ${total}개의 원인과 자가진단 해결법. 서비스센터 연락 전에 먼저 확인하세요.`;
  const url = `/error-codes/${brand}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: buildOpenGraph({ title, description, url }),
  };
}

export default async function BrandErrorCodesPage({ params }: Props) {
  const { brand } = await params;
  const groups = getBrandErrorCodes(brand);
  if (groups.length === 0) notFound();

  const brandLabel = BRAND_LABELS[brand] || brand;
  const total = groups.reduce((s, g) => s + g.entries.length, 0);

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '홈', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: '에러코드', item: `${SITE_URL}/error-codes` },
      {
        '@type': 'ListItem',
        position: 3,
        name: brandLabel,
        item: `${SITE_URL}/error-codes/${brand}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, '\\u003c'),
        }}
      />

      <section className="bg-gradient-to-b from-orange-50 to-white py-12">
        <div className="max-w-4xl mx-auto px-4">
          <nav className="text-sm text-gray-500 mb-3">
            <Link href="/" className="hover:text-gray-900">
              홈
            </Link>
            <span className="mx-1.5">/</span>
            <Link href="/error-codes" className="hover:text-gray-900">
              에러코드
            </Link>
            <span className="mx-1.5">/</span>
            <span className="text-gray-900">{brandLabel}</span>
          </nav>
          <h1 className="text-3xl font-bold text-gray-900">{brandLabel} 에러코드</h1>
          <p className="text-gray-600 mt-2">
            {brandLabel} 가전제품에서 표시되는 에러코드 {total}개의 원인과 해결 방법입니다.
            같은 코드라도 제품 종류에 따라 의미가 다르므로 종류별로 나눠 정리했습니다.
          </p>

          {/* 카테고리 바로가기 */}
          <div className="flex flex-wrap gap-2 mt-5">
            {groups.map((g) => (
              <a
                key={g.category}
                href={`#cat-${CATEGORY_SLUGS[g.category]}`}
                className="rounded-full border bg-white px-3 py-1.5 text-sm text-gray-700 hover:border-blue-300 hover:text-blue-600 transition-colors"
              >
                {g.category} {g.entries.length}
              </a>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-12">
        {groups.map((g) => (
          <section key={g.category} id={`cat-${CATEGORY_SLUGS[g.category]}`} className="scroll-mt-24">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {brandLabel} {g.category} 에러코드
            </h2>

            <div className="space-y-3">
              {g.entries.map((e) => (
                <div
                  key={e.anchorId}
                  id={e.anchorId}
                  className={`scroll-mt-24 border rounded-xl p-5 ${SEVERITY_STYLES[e.severity] || ''}`}
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <h3 className="font-mono font-bold text-lg">{e.code}</h3>
                    <span className="text-xs px-2 py-1 rounded-full border font-medium shrink-0">
                      {SEVERITY_LABELS[e.severity] || e.severity}
                    </span>
                  </div>

                  <p className="font-medium mb-2">{e.description}</p>
                  <div className="space-y-1 text-sm">
                    <p>
                      <span className="font-medium">원인:</span> {e.cause}
                    </p>
                    <p>
                      <span className="font-medium">해결:</span> {e.solution}
                    </p>
                  </div>

                  <p className="mt-3 text-sm">
                    <span className="text-gray-600">이 코드가 표시되는 제품: </span>
                    {e.products.map((p, i) => (
                      <span key={p.slug}>
                        {i > 0 && <span className="text-gray-400"> · </span>}
                        <Link href={`/products/${p.slug}`} className="text-blue-600 hover:underline">
                          {p.name}
                        </Link>
                      </span>
                    ))}
                  </p>
                </div>
              ))}
            </div>
          </section>
        ))}

        <div className="border-t pt-6">
          <Link href="/error-codes" className="text-sm text-blue-600 hover:underline">
            ← 전체 에러코드 목록
          </Link>
        </div>
      </div>
    </>
  );
}
```

`ItemList` JSON-LD는 제거했다. 페이지가 링크 목록이 아니라 완결된 문서가 되었고, 가리킬 상세 페이지 URL도 사라진다.

- [ ] **Step 2: 빌드 확인**

Run: `npm run lint && npx tsc --noEmit && npm run build`
Expected: 빌드 성공. 이 시점에는 코드 상세 라우트가 아직 살아 있어 254개도 함께 생성된다 — 정상이다.

- [ ] **Step 3: 허브가 두꺼워졌는지 측정**

```bash
node -e '
const fs=require("fs");
const text=(p)=>fs.readFileSync(p,"utf8").replace(/<script[\s\S]*?<\/script>/g,"").replace(/<[^>]+>/g," ").replace(/\s+/g," ").trim();
const files=fs.readdirSync("out/error-codes").filter(f=>f.endsWith(".html"));
let thin=0;
for (const f of files) { const n=text("out/error-codes/"+f).length; if(n<1200) thin++; console.log(String(n).padStart(6), f); }
console.log("1200자 미만:", thin, "/", files.length);
'
```

Expected: 브랜드 허브 13개가 전부 1,200자 이상. `error-codes.html`(인덱스)은 아직 얇을 수 있다 — 이번 범위가 아니다.

- [ ] **Step 4: 커밋**

```bash
git add 'src/app/error-codes/[brand]/page.tsx'
git commit -m "feat: inline every error code into the brand hub

The hub listed codes and linked out; each destination held a median of
185 characters. Now the hub carries cause, fix, and affected products
inline, split by appliance category because the same code means
different things on different product types.

Drops the ItemList JSON-LD: the page is a document now, not an index,
and the URLs it pointed at are about to stop existing."
```

---

### Task 3: 제품 상세와 에러코드 인덱스의 링크

**Files:**
- Modify: `src/components/detail/error-code-section.tsx`
- Modify: `src/app/products/[slug]/page.tsx` (`ErrorCodeSection` 호출부)
- Modify: `src/app/error-codes/page.tsx`

**Interfaces:**
- Consumes: `errorCodeAnchor` (Task 1)
- Produces: `ErrorCodeSection({ errorCodes, brand, category })` — `category` prop이 새로 필요하다

허브가 원본이 되었으므로 제품 페이지는 전문을 빼고 요약만 남긴다. 중복을 만들지 않는 것이 이 태스크의 목적이다.

- [ ] **Step 1: `ErrorCodeSection` 교체**

`src/components/detail/error-code-section.tsx`를 다음으로 교체한다.

```tsx
import Link from 'next/link';
import { ErrorCode, ApplianceCategory } from '@/types/appliance';
import { BRAND_LABELS } from '@/lib/constants';
import { errorCodeAnchor } from '@/lib/error-codes';

const SEVERITY_STYLES = {
  low: 'bg-green-50 text-green-800 border-green-200',
  medium: 'bg-yellow-50 text-yellow-800 border-yellow-200',
  high: 'bg-red-50 text-red-800 border-red-200',
};

const SEVERITY_LABELS = {
  low: '경미',
  medium: '주의',
  high: '긴급',
};

/**
 * 제품 상세의 에러코드 요약.
 *
 * 원인·해결 전문은 브랜드 허브가 갖는다. 같은 글을 양쪽에 두면 사이트 안에서
 * 복제가 되므로 여기서는 코드와 증상만 보여주고 허브의 해당 위치로 보낸다.
 */
export function ErrorCodeSection({
  errorCodes,
  brand,
  category,
}: {
  errorCodes: ErrorCode[];
  brand: string;
  category: ApplianceCategory;
}) {
  const brandLabel = BRAND_LABELS[brand] || brand;

  return (
    <section>
      <h2 className="text-xl font-bold text-gray-900 mb-2">
        {brandLabel} 에러코드 자가진단
      </h2>
      <p className="text-sm text-gray-500 mb-4">
        이 제품에 표시될 수 있는 에러코드 {errorCodes.length}개입니다. 코드를 누르면 원인과
        해결 방법을 볼 수 있습니다.
      </p>

      <ul className="space-y-2">
        {errorCodes.map((error) => (
          <li key={error.code}>
            <Link
              href={errorCodeAnchor(brand, category, error.code)}
              className={`flex items-center gap-3 rounded-xl border p-3 transition-colors hover:border-blue-300 ${
                SEVERITY_STYLES[error.severity]
              }`}
            >
              <span className="font-mono font-bold shrink-0">{error.code}</span>
              <span className="text-sm flex-1">{error.description}</span>
              <span className="text-xs px-2 py-0.5 rounded-full border font-medium shrink-0">
                {SEVERITY_LABELS[error.severity]}
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <p className="mt-3 text-sm">
        <Link href={`/error-codes/${brand}`} className="text-blue-600 hover:underline">
          {brandLabel} 에러코드 전체 보기 →
        </Link>
      </p>
    </section>
  );
}
```

- [ ] **Step 2: 호출부에 `category` 전달**

`src/app/products/[slug]/page.tsx`에서 `ErrorCodeSection`을 렌더하는 줄을 찾아 `category`를 넘긴다. 현재는 이렇다:

```tsx
              <ErrorCodeSection errorCodes={appliance.errorCodes!} brand={appliance.brand} />
```

이렇게 바꾼다:

```tsx
              <ErrorCodeSection
                errorCodes={appliance.errorCodes!}
                brand={appliance.brand}
                category={appliance.category}
              />
```

- [ ] **Step 3: 에러코드 인덱스의 링크 교체**

`src/app/error-codes/page.tsx`의 import를 바꾼다:

```tsx
import { errorCodeAnchor } from '@/lib/error-codes';
```

그리고 코드 링크의 `href`를 바꾼다. 현재는 이렇다:

```tsx
                        <Link
                          href={errorCodeHref(a.brand, e.code)}
                          className="font-mono font-bold text-red-600 shrink-0 w-16 hover:underline"
                        >
```

이렇게 바꾼다 (`a`는 제품 객체라 `a.category`를 갖는다):

```tsx
                        <Link
                          href={errorCodeAnchor(a.brand, a.category, e.code)}
                          className="font-mono font-bold text-red-600 shrink-0 w-16 hover:underline"
                        >
```

같은 파일의 `href={`/products/${a.slug}#errorcodes`}` 링크는 그대로 둔다 — 제품 페이지의 에러코드 섹션으로 가는 딥링크이고 여전히 유효하다.

- [ ] **Step 4: 빌드 확인**

Run: `npm run lint && npx tsc --noEmit && npm run build`
Expected: 성공

- [ ] **Step 5: 앵커가 실제 id와 맞는지 확인**

제품 페이지가 내보낸 앵커가 허브에 실재하는 id인지 대조한다. 링크가 존재하지 않는 id를 가리키면 클릭해도 페이지 상단에 떨어진다.

```bash
node -e '
const fs=require("fs");
const html=fs.readFileSync("out/products/samsung-bespoke-wind-free-af25a9970.html","utf8");
const anchors=[...html.matchAll(/href="\/error-codes\/([^"#]+)#([^"]+)"/g)].map(m=>({brand:m[1],id:m[2]}));
console.log("제품 페이지의 앵커:", anchors.length, "개");
const hub=fs.readFileSync("out/error-codes/Samsung.html","utf8");
const missing=anchors.filter(a=>!hub.includes(`id="${a.id}"`));
console.log("허브에 없는 id:", missing.length, missing.map(m=>m.id).join(", "));
process.exit(missing.length?1:0);
'
```

Expected: "허브에 없는 id: 0", exit 0

- [ ] **Step 6: 커밋**

```bash
git add src/components/detail/error-code-section.tsx 'src/app/products/[slug]/page.tsx' src/app/error-codes/page.tsx
git commit -m "refactor: reduce product error codes to a summary

The cause and fix text now lives only on the brand hub. Keeping it on
both pages would duplicate the same prose across the site, which is
what the hub consolidation was meant to avoid.

ErrorCodeSection takes the product category because the same code
resolves to a different anchor per category on the hub."
```

---

### Task 4: 상세 라우트 삭제와 전수 검증

**Files:**
- Delete: `src/app/error-codes/[brand]/[code]/page.tsx`
- Modify: `src/lib/error-codes.ts` (죽은 함수 제거)
- Modify: `src/app/sitemap.ts`
- Create: `public/_redirects`

**Interfaces:**
- Consumes: `getErrorCodeBrands` (Task 1)
- Produces: 없음 (마무리 태스크)

- [ ] **Step 1: 라우트 삭제**

```bash
git rm 'src/app/error-codes/[brand]/[code]/page.tsx'
```

- [ ] **Step 2: 죽은 함수 제거**

`src/lib/error-codes.ts`에서 다음을 삭제한다: `errorCodeHref`, `getAllErrorCodeParams`, `getErrorCodeDetail`, `decodeSlug`, `ErrorCodeDetail`, `ErrorCodeOccurrence`.

**`slugifyCode`는 남긴다** — `errorCodeAnchorId`가 쓴다.

삭제 후 남은 참조가 없는지 확인한다:

```bash
grep -rn "errorCodeHref\|getAllErrorCodeParams\|getErrorCodeDetail\|ErrorCodeDetail\|ErrorCodeOccurrence" src
```

Expected: 출력 없음. 남아 있으면 그 파일을 먼저 정리한다.

- [ ] **Step 3: 사이트맵 정리**

`src/app/sitemap.ts`에서 import를 바꾼다:

```ts
import { getErrorCodeBrands } from '@/lib/error-codes';
```

`errorCodePages` 선언을 **통째로 삭제**하고, `errorCodeBrandHubs`를 새 함수로 바꾼다:

```ts
  const errorCodeBrandHubs = getErrorCodeBrands().map((brand) => ({
    url: `${SITE_URL}/error-codes/${brand}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));
```

priority를 0.6에서 0.7로 올린다 — 이제 얇은 허브가 아니라 그 브랜드 에러코드의 원본 문서다.

반환 배열에서 `...errorCodePages`를 제거한다. 나머지 항목은 하나도 건드리지 않는다.

- [ ] **Step 4: 리다이렉트 작성**

`public/_redirects` 생성:

```
# 에러코드 상세 페이지(254개)를 브랜드 허브로 통합했다. 코드 단위 앵커까지 보내지 않는 이유는
# 같은 코드가 카테고리마다 의미가 달라 코드만으로는 앵커가 유일하지 않기 때문이다.
/error-codes/:brand/:code  /error-codes/:brand  301
```

- [ ] **Step 5: 전체 검증**

Run: `npm run lint && npx tsc --noEmit && npm test && npm run build`
Expected: 전부 통과

- [ ] **Step 6: 정보 손실 전수 대조 — 이 작업의 핵심 게이트**

원본 데이터의 모든 `(브랜드, 카테고리, 코드, 본문)` 조합이 빌드된 HTML 안에 남아 있는지 확인한다.

```bash
npx tsx -e '
import fs from "node:fs";
import { allAppliances } from "./src/lib/data/appliances";

const strip = (p: string) =>
  fs.readFileSync(p, "utf8")
    .replace(/<script[\s\S]*?<\/script>/g, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ");

const hubs = new Map<string, string>();
for (const f of fs.readdirSync("out/error-codes").filter((f) => f.endsWith(".html"))) {
  hubs.set(f.replace(/\.html$/, ""), strip(`out/error-codes/${f}`));
}

let missing = 0, checked = 0;
for (const a of allAppliances) {
  for (const ec of a.errorCodes ?? []) {
    checked++;
    const hub = hubs.get(a.brand);
    if (!hub) { console.log("허브 없음:", a.brand); missing++; continue; }
    for (const [label, v] of [["설명", ec.description], ["원인", ec.cause], ["해결", ec.solution]] as const) {
      if (!hub.includes(v)) { console.log(`누락 ${a.brand} ${ec.code} ${label}: ${v.slice(0,40)}`); missing++; }
    }
  }
}
console.log(`검사한 코드 ${checked}개 / 누락 ${missing}건`);
process.exit(missing ? 1 : 0);
'
```

Expected: "누락 0건", exit 0. **누락이 하나라도 나오면 BLOCKED로 보고한다** — 검사를 완화하지 않는다.

- [ ] **Step 7: 얇은 페이지 비율 측정**

```bash
node -e '
const fs=require("fs"),path=require("path");
const text=(p)=>fs.readFileSync(p,"utf8").replace(/<script[\s\S]*?<\/script>/g,"").replace(/<[^>]+>/g," ").replace(/\s+/g," ").trim();
const walk=(d)=>fs.readdirSync(d,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(d,e.name)):(e.name.endsWith(".html")?[path.join(d,e.name)]:[]));
const all=walk("out");
const thin=all.filter(p=>text(p).length<1200);
console.log(`전체 ${all.length}페이지 / 1200자 미만 ${thin.length} (${Math.round(thin.length/all.length*100)}%)`);
const byDir={};
for(const p of thin){const d=p.split(path.sep).slice(0,2).join("/");byDir[d]=(byDir[d]||0)+1;}
for(const [d,n] of Object.entries(byDir).sort((a,b)=>b[1]-a[1])) console.log(`  ${d} ${n}개`);
'
```

Expected: 전체 약 129페이지, 1,200자 미만 약 26개(20%). 시작 시점은 383페이지 중 279개(75%)였다.

- [ ] **Step 8: 회귀 확인**

```bash
ls out/products/*.html | wc -l          # 74
ls out/error-codes/*.html | wc -l       # 13 (브랜드 허브)
ls -d out/error-codes/*/ 2>/dev/null | wc -l   # 0 — 코드 디렉터리가 사라졌어야 한다
grep -c 'error-codes' out/sitemap.xml   # 14 (인덱스 1 + 브랜드 13)
```

- [ ] **Step 9: 커밋**

```bash
git add -A src public
git commit -m "refactor: delete the 254 error-code detail pages

They averaged 185 characters of unique text and drew almost no search
traffic, while making up 70% of the site — the shape Google's low-value
content guidance describes. Their content now lives in the brand hubs.

One _redirects line covers all of them via placeholders, so there is no
generated file to drift from the data."
```

---

### Task 5: 배포 후 리다이렉트 확인

**Files:** 없음 (검증 전용)

**Interfaces:**
- Consumes: Task 1~4 전부
- Produces: 없음

`_redirects`의 동작은 Cloudflare에 올라가야 확인된다. 로컬에서는 검증할 방법이 없다.

- [ ] **Step 1: 배포**

Run: `npx wrangler deploy`
Expected: 성공. 업로드된 자산 수를 보고서에 적는다.

- [ ] **Step 2: 리다이렉트 실제 확인**

```bash
for u in \
  "https://salimlab.kr/error-codes/Samsung/e1" \
  "https://salimlab.kr/error-codes/Samsung/e1/" \
  "https://salimlab.kr/error-codes/LG/rd-er-ff" ; do
  echo "$u → $(curl -s -o /dev/null -w '%{http_code} %{redirect_url}' "$u")"
done
```

Expected: 세 줄 모두 `301`과 브랜드 허브 URL.

`wrangler.jsonc`는 `html_handling: "auto-trailing-slash"`와 `not_found_handling: "404-page"`를 쓴다. 둘째 줄(끝 슬래시)이 301이 아니라 404나 200이 나오면, `_redirects` 규칙에 슬래시 변형을 한 줄 더 추가해야 한다:

```
/error-codes/:brand/:code/  /error-codes/:brand  301
```

추가했다면 재빌드·재배포하고 다시 확인한다.

- [ ] **Step 3: 허브가 라이브에서 두꺼운지 확인**

```bash
curl -sL https://salimlab.kr/error-codes/Samsung -o /tmp/hub.html
node -e '
const fs=require("fs");
const t=fs.readFileSync("/tmp/hub.html","utf8").replace(/<script[\s\S]*?<\/script>/g,"").replace(/<[^>]+>/g," ").replace(/\s+/g," ").trim();
console.log("삼성 허브 본문:", t.length, "자");
'
```

Expected: 12,000자 이상

- [ ] **Step 4: 결과 보고**

커밋할 것은 없다. 위 세 단계의 실제 출력을 보고서에 적는다.

---

## 완료 조건

- [ ] `npm run lint` 무경고, `npx tsc --noEmit` 클린
- [ ] `npm test` 전체 통과 (기존 1217 + 신규 error-codes 테스트)
- [ ] `npm run build` 성공, 제품 74개 유지
- [ ] Task 1 Step 5의 고의 파괴 결과가 보고서에 기록됨
- [ ] Task 4 Step 6의 전수 대조가 "누락 0건", exit 0
- [ ] Task 4 Step 7에서 1,200자 미만 비율이 20% 내외
- [ ] `out/error-codes/*/` 디렉터리 부재 (코드 페이지 완전 삭제)
- [ ] Task 5의 리다이렉트 3건이 전부 301

## 범위 밖

- **`/brand/*` 15개 보강** — 이 작업이 끝나면 남은 얇은 페이지의 최대 덩어리가 된다. 다음 사이클.
- **리뷰 재구성** — 329개 중 출처가 있는 것은 24개다. thin content가 아니라 정책 축의 문제이며 별도 사이클에서 설계한다.
- **성분 사전 본문 13개** — 사람 검수 루프.
- 에러코드 본문 자체의 품질 개선 — 이번은 구조 재편이지 콘텐츠 집필이 아니다.
- `ads.txt` — 404이지만 승인 후 문제이지 거절 사유가 아니다.
