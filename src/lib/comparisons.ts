// 제품 두 개를 맞대는 비교 페이지의 조합을 만든다.
//
// 왜 개별 URL인가 — 2026-09-14 대조군 측정에서 나온 결론이다. 같은 사람이 같은 방식으로
// 만든 allrunabout.com은 사이트맵 976개 중 801개(82%)가 색인됐고, 그중 `/vs/` 조합
// 페이지가 350개로 86% 색인이다. 그 페이지들은 본문 2,309자로 이 사이트의 블로그
// (8,284자)보다 훨씬 얇은데도 색인된다. 길이가 아니라 **검색 질의에 정확히 대응하는
// URL이 있는가**가 갈랐다. "A vs B"를 찾는 사람에게 답하는 자리가 우리에겐 없었다.
//
// 새 사실을 만들지 않는다. 여기서 나오는 모든 문장은 카탈로그에 이미 있는 값의 파생이고,
// 값이 없으면 비운다. 축이 같으면 "동점"이라고 쓴다 — 억지로 우열을 만들지 않는다.

import type { Appliance, ApplianceCategory, ScoreAxis } from '@/types/appliance';
import { allAppliances } from '@/lib/data/appliances';
import { getScoreAxes, getEditorScore } from '@/lib/scoring';
import { isProductIndexable } from '@/lib/content-quality';

/** URL에서 두 제품을 가르는 구분자. 제품 슬러그에는 쓰이지 않는 형태여야 한다 */
export const PAIR_SEPARATOR = '-vs-';

export interface ComparisonPair {
  /** `{slugA}-vs-{slugB}` — slugA < slugB 로 정규화된다 */
  slug: string;
  a: Appliance;
  b: Appliance;
  category: ApplianceCategory;
}

/**
 * 짝의 슬러그는 사전순으로 고정한다.
 *
 * 정규화하지 않으면 `a-vs-b`와 `b-vs-a`가 둘 다 생겨 같은 내용이 두 URL에 산다.
 * 그건 중복 콘텐츠고, 이 사이트가 색인에서 겪고 있는 문제에 스스로 하나를 더 얹는 일이다.
 */
export function pairSlug(slugA: string, slugB: string): string {
  const [first, second] = [slugA, slugB].sort();
  return `${first}${PAIR_SEPARATOR}${second}`;
}

/**
 * 페이지를 만들 조합 — 같은 카테고리의 공개 제품 두 개.
 *
 * 색인 자격은 여기서 보지 않는다. 색인 못 받는 제품의 비교도 페이지는 만들되
 * `noindex, follow`로 내보낸다(제품 상세와 같은 규칙). 제품이 출처를 채워
 * 색인 자격을 얻으면 비교 페이지도 코드 수정 없이 따라 올라온다.
 */
export function getComparisonPairs(): ComparisonPair[] {
  const byCategory = new Map<ApplianceCategory, Appliance[]>();
  for (const a of allAppliances) {
    const list = byCategory.get(a.category) ?? [];
    list.push(a);
    byCategory.set(a.category, list);
  }

  const pairs: ComparisonPair[] = [];
  for (const [category, items] of byCategory) {
    const sorted = [...items].sort((x, y) => x.slug.localeCompare(y.slug));
    for (let i = 0; i < sorted.length; i++) {
      for (let j = i + 1; j < sorted.length; j++) {
        pairs.push({
          slug: pairSlug(sorted[i].slug, sorted[j].slug),
          a: sorted[i],
          b: sorted[j],
          category,
        });
      }
    }
  }
  return pairs;
}

/** 슬러그로 조합을 찾는다. 문자열을 쪼개지 않고 미리 만든 목록에서 고른다 */
export function getComparisonBySlug(slug: string): ComparisonPair | undefined {
  return getComparisonPairs().find((p) => p.slug === slug);
}

/**
 * 비교 페이지의 색인 자격.
 *
 * 두 제품이 모두 색인 가능해야 한다. 한쪽이라도 출처가 모자라면 그 비교표의 절반은
 * 근거 없는 값이 되고, 그걸 색인하면 제품 상세에 건 게이트를 비교 페이지로 우회하는
 * 셈이 된다.
 *
 * 여기에 "비교할 것이 실제로 있는가"를 더한다 — 축이 하나도 겹치지 않으면 표가 빈다.
 */
export function isComparisonIndexable(pair: ComparisonPair): boolean {
  if (!isProductIndexable(pair.a) || !isProductIndexable(pair.b)) return false;
  return getSharedAxes(pair).length > 0;
}

export interface AxisComparison {
  label: string;
  aValue: number;
  bValue: number;
  /** 'a' | 'b' | 'tie' — 값이 같으면 tie다. 억지로 우열을 만들지 않는다 */
  winner: 'a' | 'b' | 'tie';
  /** 편집팀 판단 축이면 무엇을 보고 매긴 값인지 */
  scope?: string;
  basis: ScoreAxis['basis'];
}

/**
 * 두 제품에 공통으로 그려지는 축만 맞댄다.
 *
 * 같은 카테고리라도 축 구성이 다를 수 있다 — 에너지등급 축은 등급 표기가 있는 제품에만
 * 붙는다(scoring.ts). 한쪽에만 있는 축을 비교표에 넣으면 빈 칸이 이기는 것처럼 보인다.
 */
export function getSharedAxes(pair: ComparisonPair): AxisComparison[] {
  const aAxes = getScoreAxes(pair.a);
  const bAxes = getScoreAxes(pair.b);
  const bByLabel = new Map(bAxes.map((ax) => [ax.label, ax]));

  const shared: AxisComparison[] = [];
  for (const ax of aAxes) {
    const counterpart = bByLabel.get(ax.label);
    if (!counterpart) continue;
    shared.push({
      label: ax.label,
      aValue: ax.value,
      bValue: counterpart.value,
      winner: ax.value === counterpart.value ? 'tie' : ax.value > counterpart.value ? 'a' : 'b',
      scope: ax.scope ?? counterpart.scope,
      basis: ax.basis,
    });
  }
  return shared;
}

export interface PairScores {
  a: number;
  b: number;
  /** 종합 점수의 우열. 동점이면 tie */
  winner: 'a' | 'b' | 'tie';
}

export function getPairScores(pair: ComparisonPair): PairScores {
  const a = getEditorScore(pair.a);
  const b = getEditorScore(pair.b);
  return { a, b, winner: a === b ? 'tie' : a > b ? 'a' : 'b' };
}

/** 같은 카테고리의 다른 조합 — 내부 링크용. 자기 자신은 뺀다 */
export function getRelatedPairs(pair: ComparisonPair, limit = 6): ComparisonPair[] {
  return getComparisonPairs()
    .filter((p) => p.category === pair.category && p.slug !== pair.slug)
    .filter(isComparisonIndexable)
    .slice(0, limit);
}

/** 이 제품이 등장하는 비교 — 제품 상세에서 링크한다 */
export function getPairsForProduct(slug: string, limit = 4): ComparisonPair[] {
  return getComparisonPairs()
    .filter((p) => p.a.slug === slug || p.b.slug === slug)
    .filter(isComparisonIndexable)
    .slice(0, limit);
}
