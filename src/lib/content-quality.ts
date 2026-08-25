// 색인해도 되는 콘텐츠인지 판정하는 공용 게이트.
//
// 애드센스가 "가치가 별로 없는 콘텐츠"로 판정한 원인을 줄이는 것이 목적이다.
// 근거가 없거나 알맹이가 없는 페이지는 색인하지 않는다 —
// 메타데이터에 `noindex, follow`를 넣고 사이트맵에서도 뺀다.
//
// 판정은 반드시 이 파일 하나를 거친다. 페이지 메타데이터와 사이트맵이 서로 다른
// 기준을 쓰면 "사이트맵에는 있는데 noindex인 URL"이 생기고, 그건 그 자체로 품질 신호다.

import type { Appliance } from '@/types/appliance';
import type { EditorialMeta } from '@/types/editorial';
import { isIsoDate } from '@/types/editorial';
import { getProductEditorial } from '@/lib/data/editorial';
import { getDetailedReview } from '@/lib/data/detailed-reviews';
import { countCitableSources } from '@/lib/source-trust';
import { exposesUnsourcedReviews } from '@/lib/reviews';

/** 서로 다른 발행처 몇 곳 이상을 근거로 요구할 것인가 */
export const MIN_CITABLE_SOURCES = 2;
/** 고유 에디터 분석으로 인정할 최소 심층 리뷰 섹션 수 */
export const MIN_ANALYSIS_SECTIONS = 3;
/** 고유 에디터 분석으로 인정할 최소 본문 길이(자) */
export const MIN_ANALYSIS_CHARS = 600;

export interface QualityVerdict {
  /** 색인해도 되는가 */
  indexable: boolean;
  /** 통과하지 못한 조건. 사람이 보강할 목록으로 그대로 쓴다 */
  failures: string[];
}

const verdict = (failures: string[]): QualityVerdict => ({
  indexable: failures.length === 0,
  failures,
});

/** 편집 메타데이터가 최소 형식을 갖췄는가 */
export function hasValidEditorialMeta(meta: EditorialMeta | undefined): meta is EditorialMeta {
  if (!meta) return false;
  if (!meta.reviewedBy?.trim()) return false;
  if (!isIsoDate(meta.updatedAt)) return false;
  return Array.isArray(meta.sources);
}

/**
 * 이 제품에만 해당하는 에디터 분석이 실제로 있는가.
 *
 * 길이만 보는 것은 "충분조건"이 아니다. 제품 간 본문이 겹치지 않는지는
 * 카탈로그 전체를 봐야 알 수 있어 테스트(content-quality.test.ts)에서 검사한다.
 */
export function hasUniqueEditorialAnalysis(appliance: Appliance): boolean {
  const sections = getDetailedReview(appliance.slug);
  if (!sections || sections.length < MIN_ANALYSIS_SECTIONS) return false;
  const chars = sections.reduce((n, s) => n + s.body.trim().length, 0);
  if (chars < MIN_ANALYSIS_CHARS) return false;
  return !!appliance.editorComment?.trim();
}

/**
 * 제품 사진이 한 장이라도 있는가.
 *
 * 측정 근거: 2026-08-25 기준 색인 제품 18개 중 5개(에어팟 프로 3·소니 WF-1000XM5·
 * 앤커 리버티5·갤럭시 버즈3 프로·삼성 더 무빙스타일)의 빌드된 상세 페이지에
 * `<img>`가 0개였다. 전부 `images: []`인 TV·무선이어폰 파일럿 제품이고,
 * 화면에서는 카테고리 아이콘 플레이스홀더로 대체된다.
 *
 * 사진 한 장 없이 사양 표와 산문만 있는 제품 페이지는 리뷰어에게도 방문자에게도
 * 만들다 만 화면이다. 출처·분량 조건을 다 채워도 이 조건이 비면 색인하지 않는다.
 * 이미지가 들어오면(쿠팡 파트너스 딥링크/제조사 허용 이미지) 코드 수정 없이 복구된다.
 */
export function hasProductImage(appliance: Appliance): boolean {
  if (appliance.image?.trim()) return true;
  return !!appliance.images?.some((src) => src.trim());
}

/**
 * 제품 상세 페이지의 색인 자격.
 *
 * 조건(요구사항 그대로):
 *   1. 공식 또는 신뢰 가능한 출처가 서로 다른 발행처 2곳 이상
 *   2. 검수일 존재
 *   3. 제품 모델 번호 존재
 *   4. 고유한 에디터 분석 존재
 *   5. 출처 없는 사용자 리뷰를 노출하지 않음
 *   6. 제품 사진 1장 이상
 * 여기에 데이터 쪽 수동 스위치(`appliance.noindex`)를 더한다.
 */
export function evaluateProductQuality(appliance: Appliance): QualityVerdict {
  const failures: string[] = [];

  if (appliance.noindex) failures.push('데이터에서 noindex로 지정됨');

  const meta = getProductEditorial(appliance.slug);
  const sourceCount = hasValidEditorialMeta(meta) ? countCitableSources(meta.sources) : 0;
  if (sourceCount < MIN_CITABLE_SOURCES) {
    failures.push(
      `확인 가능한 출처 ${sourceCount}곳 (${MIN_CITABLE_SOURCES}곳 이상 필요)`,
    );
  }

  if (!hasValidEditorialMeta(meta)) {
    failures.push('검수일(updatedAt)·검수 주체가 없음');
  }

  if (!appliance.modelNumber?.trim()) failures.push('모델 번호가 없음');

  if (!hasUniqueEditorialAnalysis(appliance)) failures.push('고유 에디터 분석이 부족함');

  if (exposesUnsourcedReviews(appliance.reviews)) {
    failures.push('출처 없는 사용자 리뷰를 노출 중');
  }

  if (!hasProductImage(appliance)) failures.push('제품 사진이 없음');

  return verdict(failures);
}

export function isProductIndexable(appliance: Appliance): boolean {
  return evaluateProductQuality(appliance).indexable;
}

// ─────────────────────────────────────────────────────────────
// 제품 외 페이지 — "빈 목록"과 "실질 콘텐츠 부족"만 걸러 낸다.
// 카테고리 랜딩·브랜드·에러코드·성분 페이지는 손으로 쓴 고유 원고를 갖고 있어
// 제품처럼 제품별 출처 2건을 요구하지 않는다. 대신 알맹이가 비면 색인하지 않는다.
// ─────────────────────────────────────────────────────────────

/** 카테고리 랜딩: 제품이 1개 이상이고 구매 가이드가 있어야 한다 */
export function isCategoryIndexable(input: {
  productCount: number;
  hasGuide: boolean;
}): boolean {
  return input.productCount > 0 && input.hasGuide;
}

/**
 * 브랜드 페이지: 색인 가능한 제품이 1개 이상이고, 출처가 붙은 프로필이 있어야 한다.
 *
 * 왜 "공개 제품"이 아니라 "색인 가능한 제품"인가:
 *   2026-08-25 측정에서 브랜드 15개 중 10개가 공개 제품은 있는데 그중 색인되는 것은
 *   0개였다. 그 페이지들은 크롤러 입장에서 막다른 길이다 — 광고는 붙어 있는데
 *   따라갈 색인 문서가 하나도 없고, 본문도 1,311~2,004자로 사이트에서 가장 짧다.
 *   구글은 이미 `/brand/TCL`(8/18)과 `/brand/Apple`(8/4)을 크롤한 뒤 색인하지
 *   않기로 판정했다.
 *
 * 카테고리 랜딩에는 같은 조건을 걸지 않는다. 그쪽은 본문이 구매 가이드(5,302~
 * 6,182자)라 제품 목록이 비어도 페이지 자체에 알맹이가 있다.
 */
export function isBrandIndexable(input: {
  indexableProductCount: number;
  hasProfile: boolean;
  profileSourceCount: number;
}): boolean {
  return input.indexableProductCount > 0 && input.hasProfile && input.profileSourceCount > 0;
}

/** 에러코드 브랜드 허브: 코드가 1개 이상이어야 한다 */
export function isErrorCodeHubIndexable(input: { entryCount: number }): boolean {
  return input.entryCount > 0;
}

/**
 * 사전형 섹션이 "목록"으로 성립하는 최소 항목 수.
 *
 * 2개짜리 사전은 사전이 아니라 스텁이다. 허브에 목록이 두 줄뿐이면
 * 방문자에게도 크롤러에게도 만들다 만 화면으로 보인다.
 */
export const MIN_DICTIONARY_ENTRIES = 6;

/**
 * 사전 항목 하나로 인정할 최소 본문 길이(자).
 *
 * 측정 근거: 2026-08-23 기준 성분 사전 2개 항목의 본문(what+whyUsed+concern)은
 * 각각 357자·272자로, 빌드된 페이지 전체가 1,200자 미만이었다. 출처는 붙어 있지만
 * 분량이 스텁이라 색인을 보류한다.
 */
export const MIN_DICTIONARY_ENTRY_CHARS = 600;

/** 성분 사전 항목: 출처가 있고 본문이 스텁을 넘어야 한다 */
export function isMaterialIndexable(input: {
  sourceCount: number;
  bodyChars: number;
}): boolean {
  return input.sourceCount > 0 && input.bodyChars >= MIN_DICTIONARY_ENTRY_CHARS;
}

/** 성분 사전 허브: 항목이 목록으로 성립할 만큼 있어야 한다 */
export function isMaterialsHubIndexable(input: { entryCount: number }): boolean {
  return input.entryCount >= MIN_DICTIONARY_ENTRIES;
}

// ─────────────────────────────────────────────────────────────
// 블로그
//
// 제품 상세와 같은 기준(발행처 2곳)을 적용한다. 블로그는 제품 데이터를 그대로
// 옮기는 자리가 아니라 근거를 놓고 판단을 쓰는 자리라, 출처 요건을 낮출 이유가 없다.
// 여기에 분량과 섹션 수를 더한다 — 짧은 글 여러 편으로 페이지 수만 늘리는 것이
// 애드센스가 지적한 바로 그 패턴이기 때문이다.
// ─────────────────────────────────────────────────────────────

/**
 * 블로그 글로 인정할 최소 본문 길이(공백 제외, 자).
 *
 * 측정 근거: 이 사이트에서 실제로 깊이가 있다고 판단한 카테고리 가이드 12편의
 * 본문(섹션 + FAQ)이 3,246~4,846자였다(2026-08-24 측정). 그 하한의 약 3/4을
 * 최소선으로 잡는다. 이보다 짧으면 목록에는 싣되 색인하지 않는다.
 */
export const MIN_BLOG_BODY_CHARS = 2400;

/** 블로그 글로 인정할 최소 섹션 수 */
export const MIN_BLOG_SECTIONS = 4;

export function isBlogPostIndexable(input: {
  citableSourceCount: number;
  bodyChars: number;
  sectionCount: number;
  reviewedBy: string;
  updatedAt: string;
}): boolean {
  if (input.citableSourceCount < MIN_CITABLE_SOURCES) return false;
  if (input.bodyChars < MIN_BLOG_BODY_CHARS) return false;
  if (input.sectionCount < MIN_BLOG_SECTIONS) return false;
  if (!input.reviewedBy.trim()) return false;
  return isIsoDate(input.updatedAt);
}

/** 블로그 허브: 색인 가능한 글이 하나라도 있어야 한다 */
export function isBlogHubIndexable(input: { indexablePostCount: number }): boolean {
  return input.indexablePostCount > 0;
}
