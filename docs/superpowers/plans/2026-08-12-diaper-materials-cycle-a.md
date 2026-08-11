# 기저귀 성분 사전 (사이클 A) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 기저귀 소재·규제항목을 다루는 `/materials` 사전을 만든다 — 데이터 레이어, 층 구조 다이어그램, 인덱스·상세 라우트, 무결성 테스트까지.

**Architecture:** 소재와 규제항목을 `kind`로 구분하는 하나의 `Material` 모델에 담고, `related`로 양방향 상호 참조를 건다. 라우트는 `/materials`(층 다이어그램 + 목록)와 `/materials/[slug]` 둘뿐이며, 분유·물티슈가 오면 이 사전을 공유하도록 `/baby` 밑이 아닌 최상위에 둔다. 제품 데이터에는 전혀 의존하지 않으므로 기존 74개 제품 페이지와 완전히 분리된다.

**Tech Stack:** Next.js 16 (App Router, 정적 export), React 19 서버 컴포넌트, TypeScript, Tailwind v4, vitest, lucide-react

설계 문서: `docs/superpowers/specs/2026-08-12-diaper-materials-design.md`

## Global Constraints

- **이 프로젝트의 Next.js는 훈련 데이터와 다르다.** 코드 작성 전 `node_modules/next/dist/docs/`의 관련 가이드를 읽는다 (`AGENTS.md` 지시). deprecation 경고를 무시하지 않는다.
- **테스트 인프라 제약:** `vitest.config.ts`가 `environment: 'node'`, `include: ['src/**/*.test.ts', 'tests/**/*.test.ts']`이다. **`.tsx` 렌더 테스트는 불가능하고 testing-library도 설치돼 있지 않다.** TDD는 순수 함수(`.ts`)에만 적용하고, 컴포넌트는 `npm run build` 성공 + 빌드 산출물(`out/`) grep으로 검증한다. **테스트 인프라를 새로 도입하지 않는다.**
- 모든 사용자 노출 문구와 코드 주석은 한국어.
- 정적 export이므로 서버 전용 API를 쓰지 않는다. 새 컴포넌트에 `'use client'`를 붙이지 않는다.
- **편집 경계 (스펙의 결정 사항, 협상 대상 아님):** 살림랩은 성분 안전 등급을 매기지 않는다. `concern` 필드에는 살림랩의 판정이 아니라 **규제·시험 기준이 무엇을 정하고 있는지**만 쓴다.
- **`sources`가 빈 항목을 만들지 않는다.** 근거를 못 찾은 문장은 쓰지 않는다. 이 규칙은 테스트로 강제된다.
- 페이지 메타데이터의 `openGraph`는 반드시 `buildOpenGraph()`(`@/lib/metadata`)를 거친다 — 직접 리터럴로 쓰면 layout의 `siteName`·`locale`이 유실된다.
- 커밋 메시지는 영문, Conventional Commits. 각 태스크 끝에 커밋한다.

## 이 계획이 다루지 않는 것

**15개 중 13개의 본문 집필은 이 계획의 태스크가 아니다.** 사용자가 "AI 초고 → 사람 검수" 방식을 선택했고, 이는 서브에이전트에게 위임할 작업이 아니라 사용자와의 검토 루프다. 이 계획은 **시스템과 씨앗 2개**를 만들고, 나머지 콘텐츠는 계획 완료 후 별도 루프에서 채운다.

씨앗 2개(`sap`, `acrylic-acid-monomer`)를 고른 이유: 둘 다 근거 출처가 확보돼 있고, 서로를 `related`로 참조해 **양방향 무결성 테스트가 실제로 검증력을 갖는다.**

## File Structure

**신규**

| 파일 | 책임 |
|---|---|
| `src/types/material.ts` | `Material`·`MaterialKind`·`MaterialRole` 타입 |
| `src/lib/data/materials/materials.ts` | `kind: '소재'` 항목 데이터 |
| `src/lib/data/materials/regulated.ts` | `kind: '규제항목'` 항목 데이터 |
| `src/lib/data/materials/index.ts` | 집계·조회 (`allMaterials`, `getMaterial`, `getMaterialsByRole`, `getRelated`) |
| `src/lib/data/materials/__tests__/materials.test.ts` | 데이터 무결성 테스트 |
| `src/components/materials/layer-diagram.tsx` | 층 구조 인라인 SVG |
| `src/components/materials/material-list.tsx` | 종류별 목록 |
| `src/app/materials/page.tsx` | 인덱스 |
| `src/app/materials/[slug]/page.tsx` | 상세 |

**수정**

| 파일 | 변경 |
|---|---|
| `src/app/sitemap.ts` | `/materials`와 15개 상세 URL 추가 |
| `src/components/header.tsx` | 데스크톱 네비에 링크 추가 |
| `src/components/mobile-nav.tsx` | 모바일 네비에 링크 추가 |

---

### Task 1: 타입·데이터 레이어·무결성 테스트

**Files:**
- Create: `src/types/material.ts`
- Create: `src/lib/data/materials/materials.ts`
- Create: `src/lib/data/materials/regulated.ts`
- Create: `src/lib/data/materials/index.ts`
- Test: `src/lib/data/materials/__tests__/materials.test.ts`

**Interfaces:**
- Consumes: 없음 (이 태스크가 기반이다)
- Produces:
  - `MaterialRole` = `'표면' | '확산' | '흡수' | '방수' | '결합' | '첨가'`
  - `MaterialKind` = `'소재' | '규제항목'`
  - `Material` = `{ slug, name, aliases, kind, role?, what, whyUsed, concern?, testStandard?, related, sources, updated }`
  - `allMaterials: Material[]` (from `@/lib/data/materials`)
  - `getMaterial(slug: string): Material | undefined`
  - `getMaterialsByKind(kind: MaterialKind): Material[]`
  - `getMaterialsByRole(role: MaterialRole): Material[]`
  - `getRelated(slug: string): Material[]`

- [ ] **Step 1: 타입 정의**

`src/types/material.ts` 생성:

```ts
// 기저귀 소재·규제항목 사전 타입

/** 기저귀 층 구조에서의 역할 */
export type MaterialRole = '표면' | '확산' | '흡수' | '방수' | '결합' | '첨가';

/**
 * 항목 종류.
 * '소재'는 기저귀를 이루는 물질, '규제항목'은 KC 안전확인이 시험하는 대상이다.
 * 형광증백제처럼 양쪽에 걸치는 것이 있어 모델을 나누지 않고 이 필드로 구분한다.
 */
export type MaterialKind = '소재' | '규제항목';

export interface Material {
  /** URL slug — /materials/[slug] */
  slug: string;
  /** 표기명 (예: '고흡수성수지(SAP)') */
  name: string;
  /** 동의어·영문명. 검색과 본문 표기 흔들림을 흡수한다 */
  aliases: string[];
  kind: MaterialKind;
  /**
   * 이 물질이 속하거나 유래하는 층.
   * kind가 '소재'면 필수. '규제항목'은 유래 층이 특정될 때만 채운다
   * (형광증백제는 '첨가', 아크릴산 단량체는 '흡수', pH는 층이 없어 비움).
   */
  role?: MaterialRole;
  /** 이게 무엇인지 2~3문장 */
  what: string;
  /** 왜 기저귀에 쓰는지 / 왜 규제하는지 2~3문장 */
  whyUsed: string;
  /** 흔히 제기되는 우려와, 규제·시험 기준이 그에 대해 정하고 있는 것 */
  concern?: string;
  /** kind가 '규제항목'일 때의 시험 기준 (예: 'KS K 0611') */
  testStandard?: string;
  /** 상호 참조 slug. 반드시 양방향으로 건다 */
  related: string[];
  /** 근거 출처 URL. 비어 있으면 안 된다 */
  sources: string[];
  /** 마지막 검수 시점 'YYYY-MM' */
  updated: string;
}
```

- [ ] **Step 2: 실패하는 테스트 작성**

`src/lib/data/materials/__tests__/materials.test.ts` 생성:

```ts
import { describe, it, expect } from 'vitest';
import {
  allMaterials,
  getMaterial,
  getMaterialsByKind,
  getMaterialsByRole,
  getRelated,
} from '@/lib/data/materials';
import type { Material } from '@/types/material';

const slugs = new Set(allMaterials.map((m) => m.slug));

describe('materials: 기본 무결성', () => {
  it('항목이 하나 이상 있다', () => {
    expect(allMaterials.length).toBeGreaterThan(0);
  });

  it('slug가 유일하다', () => {
    expect(slugs.size).toBe(allMaterials.length);
  });

  it.each(allMaterials.map((m) => [m.slug, m] as const))('%s: 필수 필드가 채워져 있다', (_s, m) => {
    expect(m.name.trim().length).toBeGreaterThan(0);
    expect(m.what.trim().length).toBeGreaterThan(0);
    expect(m.whyUsed.trim().length).toBeGreaterThan(0);
    expect(m.updated).toMatch(/^\d{4}-\d{2}$/);
  });

  // 편집 경계: 근거 없는 페이지를 만들지 않는다는 규칙을 테스트로 강제한다.
  it.each(allMaterials.map((m) => [m.slug, m] as const))('%s: sources가 비어 있지 않다', (_s, m) => {
    expect(m.sources.length).toBeGreaterThan(0);
    for (const url of m.sources) {
      expect(url).toMatch(/^https?:\/\//);
    }
  });
});

describe('materials: kind와 role의 정합성', () => {
  it.each(allMaterials.map((m) => [m.slug, m] as const))(
    '%s: 소재면 role이 있고, testStandard는 규제항목에만 있다',
    (_s, m) => {
      if (m.kind === '소재') {
        expect(m.role, `${m.slug}는 소재인데 role이 없다`).toBeDefined();
      }
      if (m.testStandard !== undefined) {
        expect(m.kind, `${m.slug}는 소재인데 testStandard가 있다`).toBe('규제항목');
      }
    },
  );
});

// related가 한쪽만 걸리면 성분 페이지 사이 왕복이 끊긴다.
// 이 사전의 핵심 동선이라 양방향을 강제한다.
describe('materials: related 양방향 참조', () => {
  it.each(allMaterials.map((m) => [m.slug, m] as const))(
    '%s: related가 전부 실재하는 slug다',
    (_s, m) => {
      for (const ref of m.related) {
        expect(slugs.has(ref), `${m.slug} -> 없는 slug "${ref}"`).toBe(true);
        expect(ref, `${m.slug}가 자기 자신을 참조한다`).not.toBe(m.slug);
      }
    },
  );

  it.each(allMaterials.map((m) => [m.slug, m] as const))(
    '%s: related가 양방향이다',
    (_s, m) => {
      for (const ref of m.related) {
        const other = getMaterial(ref);
        expect(
          other?.related.includes(m.slug),
          `${m.slug} -> ${ref}는 걸렸는데 ${ref} -> ${m.slug}가 없다`,
        ).toBe(true);
      }
    },
  );
});

describe('materials: 조회 함수', () => {
  it('getMaterial은 slug로 찾고 없으면 undefined', () => {
    const first = allMaterials[0];
    expect(getMaterial(first.slug)).toBe(first);
    expect(getMaterial('없는-슬러그')).toBeUndefined();
  });

  it('getMaterialsByKind는 해당 종류만 낸다', () => {
    const 소재 = getMaterialsByKind('소재');
    expect(소재.length).toBeGreaterThan(0);
    expect(소재.every((m: Material) => m.kind === '소재')).toBe(true);
  });

  it('getMaterialsByRole은 해당 층만 낸다', () => {
    const 흡수 = getMaterialsByRole('흡수');
    expect(흡수.length).toBeGreaterThan(0);
    expect(흡수.every((m: Material) => m.role === '흡수')).toBe(true);
  });

  it('getRelated는 참조된 항목 객체를 낸다', () => {
    const sap = getMaterial('sap');
    expect(sap).toBeDefined();
    const related = getRelated('sap');
    expect(related.map((m) => m.slug)).toEqual(sap!.related);
  });

  it('getRelated는 없는 slug에 빈 배열을 낸다', () => {
    expect(getRelated('없는-슬러그')).toEqual([]);
  });
});

// 씨앗 2개가 서로를 참조하는 구조 자체를 고정한다.
// 이게 깨지면 위의 양방향 테스트가 검증할 대상을 잃는다.
describe('materials: 씨앗 항목', () => {
  it('sap과 acrylic-acid-monomer가 서로를 참조한다', () => {
    expect(getMaterial('sap')?.related).toContain('acrylic-acid-monomer');
    expect(getMaterial('acrylic-acid-monomer')?.related).toContain('sap');
  });

  it('acrylic-acid-monomer는 규제항목이다', () => {
    expect(getMaterial('acrylic-acid-monomer')?.kind).toBe('규제항목');
  });
});
```

- [ ] **Step 3: 테스트가 실패하는지 확인**

Run: `npx vitest run src/lib/data/materials/__tests__/materials.test.ts`
Expected: FAIL — `@/lib/data/materials` 모듈을 찾을 수 없음

- [ ] **Step 4: 소재 데이터 작성 (씨앗 1개)**

`src/lib/data/materials/materials.ts` 생성:

```ts
import type { Material } from '@/types/material';

/** kind: '소재' — 기저귀를 이루는 물질 */
export const materials: Material[] = [
  {
    slug: 'sap',
    name: '고흡수성수지(SAP)',
    aliases: ['폴리아크릴산나트륨', 'Super Absorbent Polymer', '흡수 폴리머'],
    kind: '소재',
    role: '흡수',
    what: '물에 녹지 않으면서 자기 무게의 200배가 넘는 물을 빨아들이는 알갱이 형태의 수지다. 원유에서 뽑은 아크릴산에 가성소다를 더해 중합하는 방식으로 만든다. 기저귀에서는 흡수층에 펄프와 섞여 들어간다.',
    whyUsed:
      '천연 펄프만으로는 자기 무게의 수십 배까지만 흡수하고, 눌리면 빨아들인 소변이 다시 새어 나온다. SAP는 흡수한 수분을 젤 형태로 가둬 압력을 받아도 역류가 적다. 얇으면서 흡수량이 많은 요즘 기저귀는 SAP 없이는 성립하지 않는다.',
    concern:
      'SAP 자체보다, 중합 반응에 참여하지 않고 남은 아크릴산이 관리 대상이다. 국내 일회용 기저귀 안전기준은 시험 항목에 아크릴산 단량체를 두고 있으며, KC 안전확인을 받은 제품은 이 항목의 시험을 거친다.',
    related: ['acrylic-acid-monomer'],
    sources: [
      'https://blog.lgchem.com/2021/06/28_bio_balanced_sap/',
      'https://scienceon.kisti.re.kr/srch/selectPORSrchReport.do?cn=KAR2010050687',
    ],
    updated: '2026-08',
  },
];
```

- [ ] **Step 5: 규제항목 데이터 작성 (씨앗 1개)**

`src/lib/data/materials/regulated.ts` 생성:

```ts
import type { Material } from '@/types/material';

/** kind: '규제항목' — KC 안전확인이 시험하는 대상 */
export const regulated: Material[] = [
  {
    slug: 'acrylic-acid-monomer',
    name: '아크릴산 단량체',
    aliases: ['잔류 아크릴산', 'acrylic acid monomer'],
    kind: '규제항목',
    role: '흡수',
    what: '고흡수성수지(SAP)를 만들 때 원료로 쓰는 아크릴산 중, 중합 반응에 참여하지 않고 남은 것을 말한다. 완성된 수지가 아니라 반응하지 않은 원료다.',
    whyUsed:
      '흡수층은 소변으로 젖은 상태에서 피부와 오래 맞닿는다. 잔류 단량체는 완성된 고분자와 성질이 달라 따로 관리하며, 그래서 국내 일회용 기저귀 안전기준의 시험 항목에 들어 있다.',
    concern:
      '"SAP가 들어 있으니 위험하다"는 서술은 정확하지 않다. 규제가 보는 것은 SAP의 존재가 아니라 잔류 단량체의 양이며, 안전확인을 받은 제품은 이 항목을 시험한 것이다.',
    related: ['sap'],
    sources: [
      'https://www.law.go.kr/%ED%96%89%EC%A0%95%EA%B7%9C%EC%B9%99/%EC%95%88%EC%A0%84%ED%99%95%EC%9D%B8%EB%8C%80%EC%83%81%EC%96%B4%EB%A6%B0%EC%9D%B4%EC%A0%9C%ED%92%88%EC%9D%98%EC%95%88%EC%A0%84%EA%B8%B0%EC%A4%80',
      'https://www.consumer.go.kr/user/ftc/consumer/crtfc/73/selectCrtfcInfo.do?crtfcSn=CRTF_000000000188441',
    ],
    updated: '2026-08',
  },
];
```

- [ ] **Step 6: 집계·조회 모듈 작성**

`src/lib/data/materials/index.ts` 생성:

```ts
import type { Material, MaterialKind, MaterialRole } from '@/types/material';
import { materials } from './materials';
import { regulated } from './regulated';

/**
 * 기저귀 소재·규제항목 사전.
 *
 * 소재와 규제항목을 한 배열로 합쳐 다룬다. 형광증백제처럼 양쪽 성격을 가진 항목이
 * 있어 모델을 나누면 중복되기 때문이고, 라우트도 /materials/[slug] 하나로 끝난다.
 */
export const allMaterials: Material[] = [...materials, ...regulated];

const BY_SLUG = new Map(allMaterials.map((m) => [m.slug, m]));

export function getMaterial(slug: string): Material | undefined {
  return BY_SLUG.get(slug);
}

export function getMaterialsByKind(kind: MaterialKind): Material[] {
  return allMaterials.filter((m) => m.kind === kind);
}

export function getMaterialsByRole(role: MaterialRole): Material[] {
  return allMaterials.filter((m) => m.role === role);
}

/** related에 걸린 항목들을 선언 순서대로 반환. 없는 slug는 건너뛴다 */
export function getRelated(slug: string): Material[] {
  const m = BY_SLUG.get(slug);
  if (!m) return [];
  return m.related
    .map((ref) => BY_SLUG.get(ref))
    .filter((x): x is Material => x !== undefined);
}
```

- [ ] **Step 7: 테스트 통과 확인**

Run: `npx vitest run src/lib/data/materials/__tests__/materials.test.ts`
Expected: PASS (전부 통과)

- [ ] **Step 8: 양방향 테스트가 실제로 무는지 확인**

`src/lib/data/materials/regulated.ts`의 `acrylic-acid-monomer` 항목에서 `related: ['sap']`를 `related: []`로 임시 변경하고 재실행한다.

Run: `npx vitest run src/lib/data/materials/__tests__/materials.test.ts`
Expected: FAIL — "sap -> acrylic-acid-monomer는 걸렸는데 acrylic-acid-monomer -> sap가 없다"

원복하고 다시 실행해 PASS를 확인한다. 실패 출력을 보고서에 적는다. **가드가 실패할 수 없으면 가드가 아니다.**

- [ ] **Step 9: 전체 테스트·린트**

Run: `npm test && npm run lint && npx tsc --noEmit`
Expected: 전부 통과. 기존 1190개 테스트가 그대로 통과해야 한다.

- [ ] **Step 10: 커밋**

```bash
git add src/types/material.ts src/lib/data/materials/
git commit -m "feat: add diaper materials dictionary data layer

Materials and regulated test items share one model keyed by kind —
optical brighteners are both, so splitting the model would duplicate
them. related links are asserted bidirectional because a one-way link
silently breaks the round trip between an ingredient page and the
regulation page that explains it.

Seeds with SAP and its acrylic acid monomer, the pair that demonstrates
the invariant. sources cannot be empty: the editorial boundary is to
relay regulation, and an unsourced page violates it."
```

---

### Task 2: 층 구조 다이어그램

**Files:**
- Create: `src/components/materials/layer-diagram.tsx`

**Interfaces:**
- Consumes: `getMaterialsByRole`·`MaterialRole` (Task 1)
- Produces: `LayerDiagram()` — props 없음. `/materials` 인덱스에서만 쓴다.

기저귀 층 구조를 위에서 아래로 쌓아 보여준다. 각 층에 해당 소재가 있으면 그 페이지로 링크한다. 텍스트 목록만으로는 "기저귀가 무엇으로 만들어졌나"가 잡히지 않고, 이 그림 자체가 인용·공유될 자산이 된다.

인라인 SVG로 그린다 — 외부 라이브러리를 쓰지 않는다.

- [ ] **Step 1: 컴포넌트 작성**

`src/components/materials/layer-diagram.tsx` 생성:

```tsx
import Link from 'next/link';
import type { MaterialRole } from '@/types/material';
import { getMaterialsByRole } from '@/lib/data/materials';

/** 위에서 아래로 쌓이는 순서. 피부에 닿는 쪽이 위다 */
const LAYERS: { role: MaterialRole; label: string; hint: string; fill: string }[] = [
  { role: '표면', label: '표면층', hint: '피부에 직접 닿는다', fill: '#eff6ff' },
  { role: '확산', label: '확산층', hint: '소변을 아래로 퍼뜨린다', fill: '#f0f9ff' },
  { role: '흡수', label: '흡수층', hint: '빨아들여 가둔다', fill: '#ecfdf5' },
  { role: '방수', label: '방수층', hint: '겉으로 새지 않게 막는다', fill: '#f5f3ff' },
  { role: '결합', label: '부속', hint: '붙이고 조인다', fill: '#fafafa' },
  { role: '첨가', label: '첨가', hint: '표시·향 등 부가 요소', fill: '#fefce8' },
];

const ROW_H = 62;
const GAP = 6;
const WIDTH = 560;

export function LayerDiagram() {
  const height = LAYERS.length * (ROW_H + GAP);

  return (
    <figure className="my-6">
      <svg
        viewBox={`0 0 ${WIDTH} ${height}`}
        className="w-full h-auto"
        role="img"
        aria-label={`기저귀 층 구조: ${LAYERS.map((l) => l.label).join(', ')} 순으로 쌓인다`}
      >
        {LAYERS.map((layer, i) => {
          const y = i * (ROW_H + GAP);
          const items = getMaterialsByRole(layer.role);
          return (
            <g key={layer.role}>
              <rect
                x={0}
                y={y}
                width={WIDTH}
                height={ROW_H}
                rx={8}
                fill={layer.fill}
                stroke="#e5e7eb"
              />
              <text x={16} y={y + 26} fontSize={14} fontWeight={700} fill="#111827">
                {layer.label}
              </text>
              <text x={16} y={y + 46} fontSize={11} fill="#6b7280">
                {layer.hint}
              </text>
              <text x={WIDTH - 16} y={y + 36} fontSize={12} fill="#374151" textAnchor="end">
                {items.length > 0 ? items.map((m) => m.name).join(' · ') : '준비 중'}
              </text>
            </g>
          );
        })}
      </svg>

      {/* SVG 안의 텍스트는 링크로 만들기 어렵고 접근성도 나빠, 링크는 아래 목록으로 따로 낸다 */}
      <figcaption className="mt-3 space-y-1.5 text-sm">
        {LAYERS.map((layer) => {
          const items = getMaterialsByRole(layer.role);
          if (items.length === 0) return null;
          return (
            <div key={layer.role} className="flex flex-wrap gap-x-2 gap-y-1">
              <span className="text-gray-500">{layer.label}</span>
              {items.map((m) => (
                <Link
                  key={m.slug}
                  href={`/materials/${m.slug}`}
                  className="text-blue-600 hover:underline"
                >
                  {m.name}
                </Link>
              ))}
            </div>
          );
        })}
      </figcaption>
    </figure>
  );
}
```

층에 아직 데이터가 없으면 SVG에는 "준비 중"이 뜨고 링크 목록에서는 그 층이 통째로 빠진다. 씨앗 2개만 있는 지금은 흡수층만 채워진 상태로 렌더된다 — 정상이다.

- [ ] **Step 2: 타입·린트 확인**

Run: `npm run lint && npx tsc --noEmit`
Expected: 에러 없음

- [ ] **Step 3: 커밋**

```bash
git add src/components/materials/layer-diagram.tsx
git commit -m "feat: add diaper layer structure diagram

Inline SVG, no chart library. Links live in the figcaption rather than
inside the SVG: anchors in SVG text are awkward to hit and read poorly
to screen readers, so the picture carries the structure and the list
below carries navigation."
```

---

### Task 3: `/materials` 인덱스

**Files:**
- Create: `src/components/materials/material-list.tsx`
- Create: `src/app/materials/page.tsx`

**Interfaces:**
- Consumes: `allMaterials`·`getMaterialsByKind` (Task 1), `LayerDiagram` (Task 2), `buildOpenGraph` (`@/lib/metadata`), `BreadcrumbJsonLd`·`JsonLd` (`@/components/jsonld`), `SITE_NAME`·`SITE_URL` (`@/lib/constants`)
- Produces:
  - `MaterialList({ items }: { items: Material[] })`
  - `/materials` 라우트

- [ ] **Step 1: 목록 컴포넌트 작성**

`src/components/materials/material-list.tsx` 생성:

```tsx
import Link from 'next/link';
import type { Material } from '@/types/material';

export function MaterialList({ items }: { items: Material[] }) {
  if (items.length === 0) return null;
  return (
    <ul className="grid sm:grid-cols-2 gap-3">
      {items.map((m) => (
        <li key={m.slug}>
          <Link
            href={`/materials/${m.slug}`}
            className="block rounded-xl border p-4 hover:bg-gray-50 transition-colors"
          >
            <p className="font-semibold text-gray-900">{m.name}</p>
            {m.role && <p className="text-xs text-gray-500 mt-0.5">{m.role}층</p>}
            <p className="text-sm text-gray-600 mt-2 line-clamp-2">{m.what}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
```

- [ ] **Step 2: 인덱스 페이지 작성**

`src/app/materials/page.tsx` 생성:

```tsx
import type { Metadata } from 'next';
import { allMaterials, getMaterialsByKind } from '@/lib/data/materials';
import { SITE_NAME, SITE_URL } from '@/lib/constants';
import { buildOpenGraph } from '@/lib/metadata';
import { JsonLd, BreadcrumbJsonLd } from '@/components/jsonld';
import { LayerDiagram } from '@/components/materials/layer-diagram';
import { MaterialList } from '@/components/materials/material-list';

const TITLE = '기저귀 성분 사전';
const DESCRIPTION =
  '기저귀가 무엇으로 만들어지고, 국내 안전기준이 무엇을 시험하는지 정리했습니다. 소재별·규제항목별로 근거와 함께 확인하세요.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/materials' },
  openGraph: buildOpenGraph({ title: `${TITLE} — ${SITE_NAME}`, description: DESCRIPTION, url: '/materials' }),
};

export default function MaterialsIndexPage() {
  const 소재 = getMaterialsByKind('소재');
  const 규제항목 = getMaterialsByKind('규제항목');

  return (
    <>
      <BreadcrumbJsonLd items={[{ name: '홈', path: '/' }, { name: TITLE }]} />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: TITLE,
          numberOfItems: allMaterials.length,
          itemListElement: allMaterials.map((m, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: m.name,
            url: `${SITE_URL}/materials/${m.slug}`,
          })),
        }}
      />

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-10">
        <header>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{TITLE}</h1>
          <p className="mt-3 text-gray-600 leading-relaxed">{DESCRIPTION}</p>
          <p className="mt-3 text-sm text-gray-500 leading-relaxed">
            유아용 일회용 기저귀는 전성분 표시 의무가 없습니다. 이 사전은 제조사가 공개한 정보와
            국내 안전기준이 정한 시험 항목을 정리한 것이며, 살림랩이 제품의 안전 등급을 매기지는
            않습니다.
          </p>
        </header>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-1">기저귀는 이렇게 만들어집니다</h2>
          <p className="text-sm text-gray-500">피부에 닿는 쪽이 맨 위입니다.</p>
          <LayerDiagram />
        </section>

        {소재.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">소재</h2>
            <MaterialList items={소재} />
          </section>
        )}

        {규제항목.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-1">안전기준이 시험하는 항목</h2>
            <p className="text-sm text-gray-500 mb-4">
              KC 안전확인을 받으려면 아래 항목을 시험해야 합니다.
            </p>
            <MaterialList items={규제항목} />
          </section>
        )}
      </div>
    </>
  );
}
```

헤더의 세 번째 문단이 편집 경계를 독자에게 명시하는 자리다. 삭제하지 않는다.

- [ ] **Step 3: 빌드 확인**

Run: `npm run lint && npx tsc --noEmit && npm run build`
Expected: 빌드 성공. `out/materials.html` 또는 `out/materials/index.html`이 생성된다.

Run: `ls out/materials*`
확인: 산출물 경로를 보고서에 적는다 (다음 태스크의 검증에 쓴다).

- [ ] **Step 4: 커밋**

```bash
git add src/components/materials/material-list.tsx src/app/materials/page.tsx
git commit -m "feat: add materials dictionary index

Leads with the layer diagram because the question a parent arrives with
is what a diaper is even made of. The header states the editorial
boundary in plain Korean: infant diapers carry no full-ingredient
disclosure requirement, and we relay regulation rather than grading
safety ourselves."
```

---

### Task 4: `/materials/[slug]` 상세

**Files:**
- Create: `src/app/materials/[slug]/page.tsx`

**Interfaces:**
- Consumes: `allMaterials`·`getMaterial`·`getRelated` (Task 1), `buildOpenGraph`, `BreadcrumbJsonLd`, `SITE_NAME`
- Produces: `/materials/[slug]` 라우트 (정적 생성)

- [ ] **Step 1: 상세 페이지 작성**

`src/app/materials/[slug]/page.tsx` 생성:

```tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { allMaterials, getMaterial, getRelated } from '@/lib/data/materials';
import { SITE_NAME } from '@/lib/constants';
import { buildOpenGraph } from '@/lib/metadata';
import { BreadcrumbJsonLd } from '@/components/jsonld';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return allMaterials.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const m = getMaterial(slug);
  if (!m) return { title: '항목을 찾을 수 없습니다' };

  const title = `${m.name} — 기저귀 성분 사전`;
  const url = `/materials/${m.slug}`;
  return {
    title,
    description: m.what,
    alternates: { canonical: url },
    openGraph: buildOpenGraph({ title: `${title} | ${SITE_NAME}`, description: m.what, url }),
  };
}

export default async function MaterialPage({ params }: Props) {
  const { slug } = await params;
  const m = getMaterial(slug);
  if (!m) notFound();

  const related = getRelated(slug);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: '홈', path: '/' },
          { name: '기저귀 성분 사전', path: '/materials' },
          { name: m.name },
        ]}
      />

      <article className="max-w-3xl mx-auto px-4 py-8 space-y-8">
        <header>
          <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
            <Link href="/materials" className="hover:text-blue-600 transition-colors">
              기저귀 성분 사전
            </Link>
            <span className="text-gray-300">|</span>
            <span>{m.kind}</span>
            {m.role && (
              <>
                <span className="text-gray-300">|</span>
                <span>{m.role}층</span>
              </>
            )}
          </div>
          <h1 className="mt-2 text-2xl md:text-3xl font-bold text-gray-900">{m.name}</h1>
          {m.aliases.length > 0 && (
            <p className="mt-2 text-sm text-gray-500">다른 이름: {m.aliases.join(' · ')}</p>
          )}
          {m.testStandard && (
            <p className="mt-2 inline-block rounded-lg bg-gray-100 px-3 py-1.5 text-sm text-gray-700">
              시험 기준 {m.testStandard}
            </p>
          )}
        </header>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-2">무엇인가</h2>
          <p className="text-gray-700 leading-relaxed">{m.what}</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            {m.kind === '소재' ? '왜 쓰는가' : '왜 규제하는가'}
          </h2>
          <p className="text-gray-700 leading-relaxed">{m.whyUsed}</p>
        </section>

        {m.concern && (
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-2">자주 나오는 우려</h2>
            <div className="rounded-xl bg-blue-50 p-5 text-gray-700 leading-relaxed">
              {m.concern}
            </div>
          </section>
        )}

        {related.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">함께 보기</h2>
            <ul className="space-y-2">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link
                    href={`/materials/${r.slug}`}
                    className="text-blue-600 hover:underline"
                  >
                    {r.name}
                  </Link>
                  <span className="text-sm text-gray-500"> — {r.kind}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        <footer className="border-t pt-5 text-sm text-gray-500 space-y-2">
          <div>
            <p className="font-semibold text-gray-700 mb-1">근거</p>
            <ul className="space-y-1">
              {m.sources.map((url) => (
                <li key={url}>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline break-all"
                  >
                    {url}
                  </a>
                  <span className="sr-only"> (새 창)</span>
                </li>
              ))}
            </ul>
          </div>
          <p>{m.updated} 검수</p>
        </footer>
      </article>
    </>
  );
}
```

`sources`를 푸터에 그대로 노출하는 것이 편집 경계의 실행이다. 근거를 보여주지 않으면 "규제 기준 전달"이라는 위치가 성립하지 않는다.

- [ ] **Step 2: 빌드 확인**

Run: `npm run lint && npx tsc --noEmit && npm run build`
Expected: 빌드 성공, 씨앗 2개의 상세 페이지가 정적 생성됨

Run: `ls out/materials/`
Expected: `sap.html`과 `acrylic-acid-monomer.html`이 보인다 (경로 형태는 Task 3 Step 3에서 확인한 것과 같은 규칙)

- [ ] **Step 3: 양방향 링크가 실제로 렌더되는지 확인**

```bash
grep -o 'href="/materials/acrylic-acid-monomer"' out/materials/sap.html | head -1
grep -o 'href="/materials/sap"' out/materials/acrylic-acid-monomer.html | head -1
```

Expected: 양쪽 다 한 줄씩 출력된다. 출력이 없으면 `related` 렌더가 깨진 것이다.

- [ ] **Step 4: 커밋**

```bash
git add 'src/app/materials/[slug]/page.tsx'
git commit -m "feat: add material detail route

Sources render in the footer as visible links. The editorial position is
to relay regulation rather than grade safety, and that position only
holds if a reader can check the basis for every claim."
```

---

### Task 5: 사이트맵·네비게이션과 최종 검증

**Files:**
- Modify: `src/app/sitemap.ts`
- Modify: `src/components/header.tsx`
- Modify: `src/components/mobile-nav.tsx`

**Interfaces:**
- Consumes: `allMaterials` (Task 1)
- Produces: 없음 (마무리 태스크)

사전이 사이트 어디에서도 링크되지 않으면 크롤러가 도달하지 못한다. 사이트맵과 네비 양쪽에 넣는다.

- [ ] **Step 1: 사이트맵에 추가**

`src/app/sitemap.ts`의 import 블록에 추가:

```ts
import { allMaterials } from '@/lib/data/materials';
```

`errorCodeBrandHubs` 선언 바로 아래(= `return [` 직전)에 추가:

```ts
  const materialPages = allMaterials.map((m) => ({
    url: `${SITE_URL}/materials/${m.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));
```

반환 배열 안에서 `/error-codes` 객체 바로 뒤에 인덱스 항목을 넣는다:

```ts
    {
      url: `${SITE_URL}/materials`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
```

그리고 반환 배열 끝의 스프레드 목록에 `...materialPages`를 더한다. 최종 형태:

```ts
    ...categories,
    ...brands,
    ...errorCodeBrandHubs,
    ...errorCodePages,
    ...materialPages,
    ...products,
  ];
```

기존 항목은 하나도 지우지 않는다.

- [ ] **Step 2: 데스크톱 네비에 링크 추가**

`src/components/header.tsx`에서 `/error-codes` 링크 바로 뒤에 추가한다. 현재 블록은 이렇다:

```tsx
          <Link href="/error-codes" className="hover:text-gray-900 transition-colors">
            에러코드
          </Link>
        </nav>
```

이렇게 바꾼다:

```tsx
          <Link href="/error-codes" className="hover:text-gray-900 transition-colors">
            에러코드
          </Link>
          <Link href="/materials" className="hover:text-gray-900 transition-colors">
            성분 사전
          </Link>
        </nav>
```

- [ ] **Step 3: 모바일 네비에 링크 추가**

`src/components/mobile-nav.tsx`의 `<div className="flex gap-3">` 블록에 세 번째 링크를 넣는다. 현재는 `/compare`와 `/error-codes` 둘이 `flex-1`로 나뉘어 있고, 셋이 되면 각 칸이 좁아지지만 라벨이 짧아 문제없다.

`/error-codes` 링크 바로 뒤에 추가:

```tsx
              <Link
                href="/materials"
                onClick={() => setOpen(false)}
                className="flex-1 rounded-lg border px-3 py-2 text-center text-sm font-medium text-gray-700"
              >
                성분 사전
              </Link>
```

`onClick={() => setOpen(false)}`를 빠뜨리지 않는다 — 없으면 링크를 눌러도 메뉴가 닫히지 않는다.

- [ ] **Step 4: 전체 검증**

Run: `npm run lint && npx tsc --noEmit && npm test && npm run build`
Expected: 전부 통과. 기존 제품 페이지 74개가 그대로 생성되고, 여기에 materials 페이지들이 더해진다.

- [ ] **Step 5: 사이트맵과 링크 도달성 확인**

```bash
grep -c '/materials' out/sitemap.xml
grep -o 'href="/materials"' out/index.html | head -1
```

Expected: 첫 명령은 3 이상(인덱스 1 + 씨앗 2), 둘째 명령은 한 줄 출력. 홈에서 사전으로 가는 링크가 없으면 헤더 추가가 반영되지 않은 것이다.

- [ ] **Step 6: 기존 페이지 회귀 확인**

```bash
ls out/products/*.html | wc -l
```

Expected: 74

- [ ] **Step 7: 커밋**

```bash
git add src/app/sitemap.ts src/components/header.tsx src/components/mobile-nav.tsx
git commit -m "feat: surface the materials dictionary in nav and sitemap

A section nothing links to is a section crawlers never reach. This is
also the first visible sign of the baby-consumables expansion in the
site chrome."
```

---

## 완료 조건

- [ ] `npm run lint` 무경고
- [ ] `npx tsc --noEmit` 클린
- [ ] `npm test` 전체 통과 (기존 1190개 + 신규 materials 테스트)
- [ ] `npm run build` 성공, 기존 제품 페이지 74개 유지
- [ ] Task 1 Step 8의 고의 파괴 검사에서 양방향 테스트가 실제로 실패
- [ ] Task 4 Step 3의 양방향 링크 렌더 확인 통과
- [ ] Task 5 Step 5의 사이트맵·홈 링크 확인 통과

## 이 계획 이후 — 콘텐츠 13개

시스템이 서면 나머지 항목을 채운다. **이것은 서브에이전트 작업이 아니라 사용자와의 검수 루프다.**

**소재 8개**: `nonwoven`(부직포), `acquisition-layer`(확산층 ADL), `fluff-pulp`(플러프펄프), `pe-film`(폴리에틸렌 필름), `breathable-film`(통기성 필름), `hot-melt-adhesive`(핫멜트 접착제), `elastic`(엘라스틱), `wetness-indicator`(흡수표시 잉크)

**규제항목 5개**: `optical-brightener`(형광증백제, role: 첨가), `ph`(pH, role 없음), `formaldehyde`(폼알데하이드, KS K 0611), `chlorinated-phenols`(염소화페놀류, KS K 0733), `azo-dyes`(아조염료·아릴아민, KS K 0147 · 0734)

작성 규칙:

1. 항목마다 `sources`를 먼저 확보하고 그다음에 문장을 쓴다. 근거를 못 찾은 문장은 쓰지 않는다 — 테스트가 빈 `sources`를 막지만, 출처가 뒷받침하지 않는 문장까지 막지는 못한다.
2. `related`는 반드시 양쪽에 건다. 예: `nonwoven`에 `optical-brightener`를 걸면 `optical-brightener`에도 `nonwoven`을 건다.
3. `concern`에는 살림랩의 판정을 쓰지 않는다. 규제·시험 기준이 무엇을 정하고 있는지만 쓴다.
4. `acquisition-layer`는 원료명이 아니라 층 이름이다. `what`의 첫 문장에서 이 점을 밝힌다 — 별도의 부직포·티슈로 만든 층이며, 왜 흡수층 위에 한 겹이 더 있는지가 이 페이지의 존재 이유다.

## 범위 밖

- **사이클 B(제품 DB)와 C(양방향 연결)** — 표본 조사 후 각자의 스펙을 쓴다. 특히 사이즈별 장 수·가격 확보 여부가 B의 관문이다.
- 분유·물티슈 소재 — 성분 사전을 공유하도록 설계했지만 데이터는 별도 사이클.
- 기존 가전 12개 카테고리의 구조 변경.
- 제품과 성분을 잇는 링크 — 제품 데이터가 없으므로 사이클 C의 몫이다.
