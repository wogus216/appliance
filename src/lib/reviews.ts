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

/** 출처 없는 후기가 화면에 노출되고 있는가 */
export function exposesUnsourcedReviews(reviews: readonly Review[] | undefined): boolean {
  return getPublishedReviews(reviews).some((r) => !hasVerifiableSource(r));
}
