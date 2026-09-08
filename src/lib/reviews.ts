// 개별 후기를 화면에 노출할지 결정하는 단일 관문.
//
// 배경: `Appliance.reviews`에 들어 있는 329건은 편집팀이 공개 스펙과 외부 리뷰를 종합해
// 쓴 글이지, 개별 구매자가 남긴 후기가 아니다. 그걸 "사용자 리뷰 / 사용자 평균 / 추천률"로
// 표시하면 사실과 다르다. 데이터는 남겨 두되(향후 실제 출처 있는 후기만 골라 쓸 수 있게)
// 공개 여부는 이 파일 하나가 정한다.

import type { Review } from '@/types/appliance';
import { isCitableSource } from '@/lib/source-trust';

/**
 * 개별 후기 공개 정책 스위치.
 *
 * false인 동안 제품 상세는 후기 섹션 자체를 렌더하지 않는다. 실제 출처가 붙은 후기만
 * 남기는 편집 작업이 끝나면 true로 바꾸면 되고, 그때부터는 아래 필터가 문지기가 된다.
 */
export const PUBLISH_INDIVIDUAL_REVIEWS = false;

/** 출처 URL이 실제로 확인 가능한 발행처를 가리키는 후기인가 */
export function hasVerifiableSource(review: Review): boolean {
  if (!review.sourceUrl || !review.source?.trim()) return false;
  return isCitableSource(review.sourceUrl);
}

/**
 * 화면에 실제로 실리는 후기 목록.
 *
 * 색인 품질 게이트(content-quality.ts)가 "출처 없는 후기를 노출하지 않는가"를 판정할 때
 * 이 함수의 결과를 본다. UI와 게이트가 같은 함수를 보므로 둘이 어긋날 수 없다.
 */
export function getPublishedReviews(reviews: readonly Review[] | undefined): Review[] {
  if (!PUBLISH_INDIVIDUAL_REVIEWS) return [];
  return (reviews ?? []).filter(hasVerifiableSource);
}

/**
 * 출처 없는 후기가 후기 섹션에 노출되고 있는가.
 *
 * `getPublishedReviews`가 이미 출처 없는 것을 걸러내므로 이 함수는 구조적으로 항상
 * false다. 그 항진성이 의도다 — UI 불변식을 표현할 뿐, **게이트로는 아무것도 막지
 * 못한다.** 색인 게이트가 실제로 봐야 하는 것은 아래 `citesUnsourcedTestimony`다.
 */
export function exposesUnsourcedReviews(reviews: readonly Review[] | undefined): boolean {
  return getPublishedReviews(reviews).some((r) => !hasVerifiableSource(r));
}

/**
 * 본문 산문이 출처 없이 남의 체험·평가를 근거로 삼고 있는가.
 *
 * 배경(2026-09-08): 후기 섹션은 껐는데 심층리뷰 본문이 "…라는 후기가 있습니다",
 * "평이 많습니다"로 같은 전언을 싣고 있었다. 공개 34개 제품에 106건, 광고가 실리는
 * 17개 페이지 중 14개다. 같은 페이지 푸터에는 「개별 구매자 후기는 게시하지 않습니다」가
 * 붙어 있어, 심사자가 한 페이지만 열어도 주장과 부인이 함께 보였다. 애드센스가
 * "가치가 별로 없는 콘텐츠"로 두 번 거절한 뒤 전수 제거했고, 이 함수는 그것이 다시
 * 들어오는 것을 막는다.
 *
 * 정규식은 세 번에 걸쳐 넓혔다. 좁은 패턴은 33건만 잡았고, 회피 표현(「고 평가할 만큼」·
 * 「만족도가 **특히** 높습니다」)을 넣어 106건, 피동형 귀속(「~로 꼽힙니다」)까지 넣고서야
 * 전수가 됐다. **패턴을 줄일 때는 이 이력을 먼저 볼 것.**
 */
const UNSOURCED_TESTIMONY =
  /후기가 (?:많|있)|후기도 |후기에서|후기처럼|평이 (?:많|있)|평도 나|반응이 (?:많|있)|반응입니다|호평|입소문|사용자들도|실사용자|만족도가?\s*(?:특히\s*)?높|고 평가할|평가했습니다|평가가 (?:많|반복|타당|이어)|자주 언급|리뷰에서 가장|리뷰가 많|여론이|커뮤니티에서|지적이 (?:있|많)|꼽힙니다|꼽히는|불만이 (?:꾸준|많|여전)/;

/**
 * 위 패턴이 잡지만 문제가 아닌 표현.
 *
 * - 독자에게 "직접 후기를 확인하라"고 권하는 것은 전언이 아니라 조언이다.
 * - 사이트가 자기 후기 정책을 설명하는 문장은 오히려 있어야 한다.
 */
const TESTIMONY_ALLOWLIST = [
  /후기를\s*(?:함께\s*)?확인/,
  /후기 확인/,
  /구매자 후기(?:는|를)? (?:게시하지|보여 주지)/,
  /실제 구매자 후기가 아닙니다/,
  /출처·후기 처리 원칙/,
];

export function citesUnsourcedTestimony(text: string | undefined): boolean {
  if (!text) return false;
  let rest = text;
  for (const allowed of TESTIMONY_ALLOWLIST) {
    rest = rest.replace(new RegExp(allowed.source, 'g'), '');
  }
  return UNSOURCED_TESTIMONY.test(rest);
}
