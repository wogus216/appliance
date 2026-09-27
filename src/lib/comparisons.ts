// 제품 두 개를 맞대는 비교 페이지의 조합을 만든다.
//
// 왜 개별 URL인가 — 2026-09-14 대조군 측정에서 나온 결론이다. 같은 사람이 같은 방식으로
// 만든 allrunabout.com은 사이트맵 976개 중 801개(82%)가 색인됐고, 그중 `/vs/` 조합
// 페이지가 350개로 86% 색인이다. 그 페이지들은 본문 2,309자로 이 사이트의 블로그
// (8,284자)보다 훨씬 얇은데도 색인된다. 길이가 아니라 **검색 질의에 정확히 대응하는
// URL이 있는가**가 갈랐다. "A vs B"를 찾는 사람에게 답하는 자리가 우리에겐 없었다.
//
// 새 사실을 만들지 않는다. 여기서 나오는 모든 문장은 카탈로그에 이미 있는 값의 파생이고,
// 값이 없으면 비운다. 점수로 우열을 매기지 않는다 — 2026-09-27에 점수를 걷었다
// (src/lib/energy-grade.ts). 맞대는 것은 출처가 있는 스펙뿐이다.

import type { Appliance, ApplianceCategory } from '@/types/appliance';
import { allAppliances } from '@/lib/data/appliances';
import { isProductIndexable } from '@/lib/content-quality';
import { isTraditionalAppliance } from '@/lib/category-config';
import { formatPrice } from '@/lib/utils';

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
 * 개별 비교 페이지(/compare/A-vs-B)를 검색에 내보내는가.
 *
 * 2026-09-18에 껐다. 26개 페어는 본문의 67~96%가 두 제품 페이지와 다른 페어에 이미 있는
 * 문장이고(전부 같은 도입부, 같은 템플릿), 네이버도 0/26만 색인했다. 구글이 사이트 단위로
 * 저품질 판정을 내린 상태에서 템플릿 조합 페이지가 사이트맵의 22%를 차지하는 것은 판정을
 * 굳히는 쪽이다. 근거: .omc/research/index-*.md (2026-09-18 Codex·Claude 교차 진단).
 *
 * 페이지와 내부 링크는 그대로 둔다(noindex, follow). 페어마다 그 조합에서만 답할 수 있는
 * 고유 해설이 생기면 그때 페어 단위로 다시 켤 것 — 이 스위치를 통째로 켜지 말 것.
 */
export const COMPARISON_PAGES_INDEXED = false;

/**
 * 비교 페이지를 만들고 링크할 자격.
 *
 * 두 제품이 모두 색인 가능해야 한다. 한쪽이라도 출처가 모자라면 그 비교표의 절반은
 * 근거 없는 값이 되고, 그걸 내보내면 제품 상세에 건 게이트를 비교 페이지로 우회하는
 * 셈이 된다.
 *
 * 여기에 "비교할 것이 실제로 있는가"를 더한다 — 양쪽 다 값이 있는 스펙 줄이 하나도
 * 없으면(모델번호는 빼고) 표가 한쪽만 채워진 목록이 된다.
 */
export function isComparisonPublishable(pair: ComparisonPair): boolean {
  if (!isProductIndexable(pair.a) || !isProductIndexable(pair.b)) return false;
  return getPairSpecRows(pair).some((r) => r.label !== '모델번호' && r.a?.trim() && r.b?.trim());
}

/** 비교 페이지의 색인 자격 — 사이트맵과 robots 메타가 같이 쓴다 */
export function isComparisonIndexable(pair: ComparisonPair): boolean {
  return COMPARISON_PAGES_INDEXED && isComparisonPublishable(pair);
}

/** 표에 실을 스펙 한 줄. 양쪽 다 비어 있으면 줄 자체를 만들지 않는다 */
export type SpecRow = { label: string; a?: string; b?: string };

export function getPairSpecRows(pair: ComparisonPair): SpecRow[] {
  const { a, b } = pair;
  const traditional = isTraditionalAppliance(pair.category);

  const rows: SpecRow[] = [
    { label: '모델번호', a: a.modelNumber, b: b.modelNumber },
    { label: '용량', a: a.techSpecs.capacity, b: b.techSpecs.capacity },
    { label: '핵심 기술', a: a.techSpecs.coreTechnology, b: b.techSpecs.coreTechnology },
    { label: '에너지등급', a: a.techSpecs.energyGrade, b: b.techSpecs.energyGrade },
    {
      label: '월 예상 전기요금',
      a: a.techSpecs.monthlyElectricityCost
        ? `${a.techSpecs.monthlyElectricityCost.toLocaleString()}원`
        : undefined,
      b: b.techSpecs.monthlyElectricityCost
        ? `${b.techSpecs.monthlyElectricityCost.toLocaleString()}원`
        : undefined,
    },
    {
      label: '소비전력',
      a: a.specs.powerConsumption ? `${a.specs.powerConsumption}W` : undefined,
      b: b.specs.powerConsumption ? `${b.specs.powerConsumption}W` : undefined,
    },
    // 소음은 이중 슬롯이다 — 생활가전만 dB이고 TV·무선이어폰 쪽 값은 옛 편집 점수다.
    // 구분하지 않으면 점수 '9'가 '9dB'로 나간다.
    ...(traditional
      ? [
          {
            label: '소음',
            a: a.specs.noise ? `${a.specs.noise}dB` : undefined,
            b: b.specs.noise ? `${b.specs.noise}dB` : undefined,
          },
        ]
      : []),
    { label: '냉매', a: a.techSpecs.refrigerant, b: b.techSpecs.refrigerant },
    { label: '필터', a: a.techSpecs.filterType, b: b.techSpecs.filterType },
    { label: '크기', a: a.techSpecs.dimensions, b: b.techSpecs.dimensions },
    {
      label: '무게',
      a: a.techSpecs.weight ? `${a.techSpecs.weight}kg` : undefined,
      b: b.techSpecs.weight ? `${b.techSpecs.weight}kg` : undefined,
    },
    {
      label: '적용 면적',
      a: a.roomFit?.coverageArea ? `${a.roomFit.coverageArea}m²` : undefined,
      b: b.roomFit?.coverageArea ? `${b.roomFit.coverageArea}m²` : undefined,
    },
    {
      label: '설치 형태',
      a: a.roomFit?.installationType,
      b: b.roomFit?.installationType,
    },
    {
      label: '가격',
      a: a.price ? formatPrice(a.price) : undefined,
      b: b.price ? formatPrice(b.price) : undefined,
    },
  ];

  // 카테고리별 추가 스펙 — 라벨이 양쪽에 다 있는 것만 맞댄다
  const aExtra = new Map((a.techSpecs.extraSpecs ?? []).map((s) => [s.label, s.value]));
  const bExtra = new Map((b.techSpecs.extraSpecs ?? []).map((s) => [s.label, s.value]));
  for (const label of aExtra.keys()) {
    if (bExtra.has(label)) rows.push({ label, a: aExtra.get(label), b: bExtra.get(label) });
  }

  return rows.filter((r) => r.a?.trim() || r.b?.trim());
}

/** 같은 카테고리의 다른 조합 — 내부 링크용. 자기 자신은 뺀다 */
export function getRelatedPairs(pair: ComparisonPair, limit = 6): ComparisonPair[] {
  return getComparisonPairs()
    .filter((p) => p.category === pair.category && p.slug !== pair.slug)
    .filter(isComparisonPublishable)
    .slice(0, limit);
}

/** 이 제품이 등장하는 비교 — 제품 상세에서 링크한다 */
export function getPairsForProduct(slug: string, limit = 4): ComparisonPair[] {
  return getComparisonPairs()
    .filter((p) => p.a.slug === slug || p.b.slug === slug)
    .filter(isComparisonPublishable)
    .slice(0, limit);
}
