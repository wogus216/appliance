// 블로그 글 타입.
//
// 왜 자유 서식(마크다운 본문 한 덩어리)이 아니라 구조체인가 —
// 이 사이트의 제품 상세 74개는 "디자인·설치 / ○○ 성능 / 사용성·편의 / 유지비·경제성 /
// 총평" 다섯 칸에 제품을 밀어 넣은 결과 전부 같은 모양이 됐다. 블로그가 같은 함정에
// 빠지지 않도록, 슬롯을 늘리는 대신 **글이 답해야 하는 것**을 필드로 강제한다.
//
//   question     — 이 글이 답하는 질문 하나
//   answer       — 결론. 본문을 읽기 전에 먼저 말한다
//   comparison   — 비교 대상이 있으면 표로. 산문에 숫자를 흩뿌리지 않는다
//   decisionRules— "이런 사람은 A, 이런 사람은 B". 애매한 총평을 대신한다
//
// 섹션 제목은 글마다 직접 짓는다. 카테고리 가이드처럼 글의 논지를 따라가야지,
// 정해진 목차를 채우는 방식이면 다시 템플릿이 된다.

import type { SourceRef } from './source';
import type { IsoDate } from './editorial';

export interface BlogSection {
  heading: string;
  /** 문단 배열. 한 덩어리 문자열로 두면 줄바꿈이 데이터에 섞인다 */
  body: string[];
}

/** 비교표 한 줄. 값은 문자열로 둔다 — 단위·미확인 표기가 섞이기 때문 */
export interface ComparisonRow {
  label: string;
  values: string[];
  /** 이 줄에서 무엇을 봐야 하는지. 표만 보고 오해하지 않도록 */
  note?: string;
}

export interface ComparisonTable {
  caption: string;
  /**
   * 비교 대상 이름. row.values의 순서와 같아야 한다.
   *
   * ⚠️ 규약: `columns[i]`는 `post.productSlugs[i]`를 가리킨다.
   *    blog.test.ts가 이 대응을 이용해 표의 가격 셀을 카탈로그 값과 대조한다 —
   *    카탈로그 가격을 갱신하고 글을 안 고치면 테스트가 실패한다.
   */
  columns: string[];
  rows: ComparisonRow[];
  /** 표에 실린 수치를 어디서 확인했는지 한 줄로 */
  footnote: string;
}

/** "이런 사람은 이걸" — 결론을 조건으로 나눠 적는다 */
export interface DecisionRule {
  /** 독자의 조건 */
  when: string;
  /** 그때의 답 */
  then: string;
  /** 근거가 되는 제품 slug (내부 링크로 렌더된다) */
  productSlug?: string;
}

export interface BlogFaq {
  question: string;
  answer: string;
}

export interface BlogPost {
  slug: string;
  /** 목록·검색결과에 뜨는 제목 */
  title: string;
  /** 메타 설명 겸 목록 요약 */
  description: string;
  /** 어떤 종류의 글인가 — 목록에서 뱃지로 보인다 */
  kind: '비교' | '가이드' | '해설';
  /** 이 글이 답하는 질문 하나 */
  question: string;
  /** 결론. 본문 앞에 먼저 놓는다 */
  answer: string[];
  comparison?: ComparisonTable;
  sections: BlogSection[];
  decisionRules: DecisionRule[];
  faqs: BlogFaq[];
  /** 글에서 다룬 제품. 상세 페이지로 링크한다 */
  productSlugs: string[];
  sources: SourceRef[];
  publishedAt: IsoDate;
  updatedAt: IsoDate;
  reviewedBy: string;
  /** 표에 가격을 실었다면 언제 확인한 값인지 */
  priceCheckedAt?: IsoDate;
}

/** 색인 게이트와 테스트가 함께 쓰는 본문 길이 계산 */
export function blogBodyChars(post: BlogPost): number {
  const parts = [
    post.question,
    ...post.answer,
    ...post.sections.flatMap((s) => [s.heading, ...s.body]),
    ...post.decisionRules.flatMap((r) => [r.when, r.then]),
    ...post.faqs.flatMap((f) => [f.question, f.answer]),
  ];
  return parts.join('').replace(/\s/g, '').length;
}
