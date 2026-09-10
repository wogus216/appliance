import type { IsoDate } from '@/types/editorial';

/**
 * 사이트 전역 개편 기록 — 사이트맵 lastmod가 "페이지가 바뀐 날"을 말할 수 있게 한다.
 *
 * 배경: lastmod는 콘텐츠가 가진 검수 날짜(`editorial.updatedAt`, 가이드 `updated`,
 * 블로그 `updatedAt`)에서 나온다. 빌드 시각을 넣지 않기 위한 규칙이고 그건 옳다.
 * 그런데 그 날짜는 **편집 검수일**이라 한 가지를 말하지 못한다 — 개별 제품의 글은
 * 그대로인데 사이트 전체 구조가 바뀌어 페이지 내용이 달라지는 경우다.
 *
 * 2026-09-10에 실제로 그 일이 있었다. 종합 점수를 축에서 계산하도록 바꾸면서 제품
 * 34개의 점수와 레이더 축이 전부 달라졌고, 제품 카드를 싣는 페이지도 함께 바뀌었다.
 * 그런데 사이트맵은 그 페이지들이 8월 24일에 마지막으로 바뀌었다고 말하고 있었다.
 * 구글에 "다시 볼 이유"를 주지 않은 것이다.
 *
 * 검수일을 오늘로 올려 해결할 수는 없다. 그러면 "오늘 이 제품을 다시 검수했다"는
 * 사실과 다른 말이 된다. 그래서 검수일과 **페이지 변경일**을 분리하고, 사이트맵은
 * 둘 중 나중 것을 쓴다.
 *
 * 왜 git 커밋 날짜를 쓰지 않나 — 같은 방식으로 만든 러닝슈즈 사이트에서 이미 실패했다.
 * 배포 환경이 얕은 복제(shallow clone)를 하면 대부분의 파일이 같은 커밋을 가리켜
 * lastmod가 두어 개 값으로 뭉친다. 빌드 환경에 의존하지 않도록 여기 손으로 적는다.
 *
 * ⚠️ 항목을 추가할 때: 실제로 **본문이 바뀐** 경로만 적는다. 바뀌지 않은 페이지를
 *    포함시키면 lastmod 전체가 믿을 수 없는 값이 되고, 그건 그 자체로 저품질 신호다.
 *    빌드를 개편 전후로 각각 돌려 본문 텍스트를 대조해 확인하는 것이 확실하다.
 */
export interface SiteRevision {
  /** 배포된 날 'YYYY-MM-DD' */
  date: IsoDate;
  /**
   * 영향을 받은 경로.
   *   '/methodology'  → 그 경로만
   *   '/products/*'   → 그 아래 전부
   *   '/'             → 홈만
   */
  affects: string[];
  /** 무엇이 바뀌었는지. 나중에 이 기록이 맞는지 따질 수 있도록 구체적으로 적는다 */
  note: string;
}

export const SITE_REVISIONS: SiteRevision[] = [
  // ── 과거분 ─────────────────────────────────────────────────────────────
  // 아래 두 항목의 날짜 근거는 git 커밋 날짜다. 페이지 컴포넌트 자체가 본문 전부인
  // 문서에만 붙였다 — 데이터에서 파생되는 허브(/error-codes·/blog·/materials)는
  // 컴포넌트 날짜가 본문 변경일의 대리 지표일 뿐이라 넣지 않았고, 그래서 그 URL들은
  // 지금도 lastmod 없이 나간다. 모르는 날짜를 지어내는 것보다 비우는 편이 낫다.
  {
    date: '2026-08-25',
    affects: ['/about', '/contact', '/privacy', '/terms'],
    note: '운영 주체·연락처·개인정보·이용약관 문서를 작성했다. 이후 본문 변경 없음.',
  },
  {
    date: '2026-09-09',
    affects: ['/editorial-policy'],
    note: '출처·후기 처리 원칙 문서를 다시 썼다. 개별 구매자 후기를 게시하지 않는다는 방침과 그 이유를 명시했다.',
  },
  // ── 사이트 전역 개편 ────────────────────────────────────────────────────
  {
    date: '2026-09-10',
    // 개편 전후 빌드를 각각 돌려 본문 텍스트를 대조한 결과 81개 페이지가 바뀌었다.
    // 바뀌지 않은 28개(성분 사전·에러코드 허브·정책 문서 등)는 여기 넣지 않는다.
    affects: [
      '/',
      '/compare',
      '/methodology',
      '/products/*',
      '/category/*',
      '/brand/*',
      '/blog/*',
    ],
    note:
      '종합 5점 점수를 카탈로그에 저장하지 않고 레이더 축 평균에서 계산하도록 바꿨다. ' +
      '제품 34개의 점수가 전부 다시 매겨졌고(3.9~4.5 → 2.4~4.8), 에너지효율 축이 ' +
      '에너지소비효율등급 환산으로 바뀌었으며 저전력·저소음 축이 사라졌다. ' +
      '판단 축에는 무엇을 보고 매겼는지를 함께 실었고, 가격 미확인 제품 9개는 가성비를 감췄다. ' +
      '제품 카드를 싣는 홈·카테고리·브랜드·블로그·비교 페이지가 함께 바뀌었다. ' +
      '카테고리 가이드 6편에는 출처를 붙였다.',
  },
];

/** 경로 하나가 개편 항목의 대상에 해당하는지 */
function matches(pattern: string, path: string): boolean {
  if (pattern.endsWith('/*')) return path.startsWith(pattern.slice(0, -1));
  return pattern === path;
}

/**
 * 이 경로에 영향을 준 가장 최근 개편일. 해당 없으면 undefined.
 */
export function lastRevisionFor(path: string): IsoDate | undefined {
  const dates = SITE_REVISIONS.filter((r) => r.affects.some((p) => matches(p, path))).map(
    (r) => r.date,
  );
  return dates.length > 0 ? dates.reduce((a, b) => (a > b ? a : b)) : undefined;
}

/**
 * 사이트맵에 실을 lastmod — 검수일과 페이지 변경일 중 나중 것.
 *
 * 두 값 모두 없으면 undefined를 돌려주고, 사이트맵은 그 필드를 아예 빼 버린다.
 * 모르는 날짜를 지어내지 않기 위해서다.
 *
 * 날짜 형식이 'YYYY-MM'과 'YYYY-MM-DD'로 섞여 있어도 사전순 비교가 시간순과 같다
 * ('2026-09' < '2026-09-10' < '2026-10').
 */
export function resolveLastModified(path: string, reviewedAt?: string): string | undefined {
  const revised = lastRevisionFor(path);
  if (!reviewedAt) return revised;
  if (!revised) return reviewedAt;
  return revised > reviewedAt ? revised : reviewedAt;
}
