import type { EditorialMeta } from '@/types/editorial';

/**
 * 제품별 편집 신뢰 정보.
 *
 * ⚠️ 채우는 규칙 — 지키지 않으면 이 파일은 존재 이유를 잃는다.
 *   1. 여기 적는 URL은 **실제로 확인한 것만** 쓴다. 이 파일의 초기 항목은 전부
 *      저장소에 이미 들어 있던(=집필 시점에 확인된) `reviews[].sourceUrl`을 옮겨 온 것이다.
 *      새 출처를 추가할 때는 사람이 직접 열어 보고 넣는다.
 *   2. 근거가 없는 제품에는 레코드를 만들지 않는다. 빈 레코드로 채우면
 *      색인 품질 게이트(`src/lib/content-quality.ts`)가 통과 도장 찍는 기계가 된다.
 *   3. `priceCheckedAt`은 실제로 가격을 대조한 날에만 적는다. 없으면 생략한다 —
 *      화면은 값이 있을 때만 "가격 확인일"을 표시한다.
 *
 * 날짜 근거:
 *   publishedAt = 해당 slug가 카탈로그에 처음 커밋된 날
 *                 (`git log -S"slug: '<slug>'" --reverse` 기준, 전 항목 2026-07-04)
 *   updatedAt   = 이 편집 메타데이터를 정리하며 출처를 재확인한 날
 */
export const PRODUCT_EDITORIAL: Record<string, EditorialMeta> = {
  'apple-airpods-pro3': {
    sources: [
      {
        url: 'https://www.apple.com/kr/airpods-pro/',
        title: '에어팟 프로 3 제품 페이지',
        publisher: 'Apple',
      },
      {
        url: 'https://9to5mac.com/2026/04/14/airpods-pro-3-better-today-than-at-launch-video/',
        title: 'AirPods Pro 3 장기 사용 리뷰',
        publisher: '9to5Mac',
      },
    ],
    publishedAt: '2026-07-04',
    updatedAt: '2026-08-23',
    reviewedBy: '살림랩 편집팀',
  },

  'anker-soundcore-liberty5': {
    sources: [
      {
        url: 'https://prod.danawa.com/info/?pcode=91767473',
        title: '앤커 사운드코어 리버티 5 상품 정보',
        publisher: '다나와',
      },
      {
        url: 'https://www.techradar.com/audio/earbuds-airpods/anker-soundcore-liberty-5-review',
        title: 'Anker Soundcore Liberty 5 review',
        publisher: 'TechRadar',
      },
      {
        url: 'https://www.soundguys.com/anker-soundcore-liberty-5-review-137445/',
        title: 'Anker Soundcore Liberty 5 review',
        publisher: 'SoundGuys',
      },
    ],
    publishedAt: '2026-07-04',
    updatedAt: '2026-08-23',
    reviewedBy: '살림랩 편집팀',
  },

  'samsung-galaxy-buds3-pro': {
    sources: [
      {
        url: 'https://prod.danawa.com/info/?pcode=59537216',
        title: '삼성 갤럭시 버즈3 프로 상품 정보',
        publisher: '다나와',
      },
      {
        url: 'https://www.phonearena.com/news/galaxy-buds-3-pro-great-price_id180579',
        title: 'Galaxy Buds 3 Pro 가격·성능 분석',
        publisher: 'PhoneArena',
      },
    ],
    publishedAt: '2026-07-04',
    updatedAt: '2026-08-23',
    reviewedBy: '살림랩 편집팀',
  },

  'samsung-the-movingstyle': {
    sources: [
      {
        url: 'https://prod.danawa.com/info/?pcode=98076260',
        title: '삼성 더 무빙스타일 상품 정보',
        publisher: '다나와',
      },
      {
        url: 'https://dpg.danawa.com/news/view?boardSeq=63&listSeq=5942825',
        title: '이동형 TV 비교 리뷰',
        publisher: '다나와 DPG',
      },
      {
        url: 'https://view.asiae.co.kr/article/2026011510080029708',
        title: '이동형 스크린 사용기 기사',
        publisher: '아시아경제',
      },
    ],
    publishedAt: '2026-07-04',
    updatedAt: '2026-08-23',
    reviewedBy: '살림랩 편집팀',
  },

  // ── 아래는 근거가 한 발행처(다나와)뿐이라 색인 품질 기준(서로 다른 발행처 2곳)을
  //    통과하지 못한다. 출처를 지어내지 않고 레코드만 남겨 둔다.
  //    남은 한 건을 사람이 채우면 그 시점에 자동으로 색인 대상이 된다.
  'sony-wf-1000xm5': {
    sources: [
      {
        url: 'https://prod.danawa.com/info/?pcode=27250154',
        title: '소니 WF-1000XM5 상품 정보',
        publisher: '다나와',
      },
    ],
    publishedAt: '2026-07-04',
    updatedAt: '2026-08-23',
    reviewedBy: '살림랩 편집팀',
  },

  'qcy-melobuds-pro': {
    sources: [
      {
        url: 'https://prod.danawa.com/info/?pcode=71645780',
        title: 'QCY 멜로버즈 프로 상품 정보',
        publisher: '다나와',
      },
    ],
    publishedAt: '2026-07-04',
    updatedAt: '2026-08-23',
    reviewedBy: '살림랩 편집팀',
  },

  'lg-standbyme2': {
    sources: [
      {
        url: 'https://prod.danawa.com/info/?pcode=75537515',
        title: 'LG 스탠바이미 2 상품 정보',
        publisher: '다나와',
      },
      {
        url: 'https://dpg.danawa.com/news/view?boardSeq=63&listSeq=5942825',
        title: '이동형 TV 비교 리뷰',
        publisher: '다나와 DPG',
      },
    ],
    publishedAt: '2026-07-04',
    updatedAt: '2026-08-23',
    reviewedBy: '살림랩 편집팀',
  },

  'lg-standbyme2-max': {
    sources: [
      {
        url: 'https://prod.danawa.com/info/?pcode=122632760',
        title: 'LG 스탠바이미 2 Max 상품 정보',
        publisher: '다나와',
      },
    ],
    publishedAt: '2026-07-04',
    updatedAt: '2026-08-23',
    reviewedBy: '살림랩 편집팀',
  },

  'lg-standbyme-go': {
    sources: [
      {
        url: 'https://prod.danawa.com/info/?pcode=20361317',
        title: 'LG 스탠바이미 Go 상품 정보',
        publisher: '다나와',
      },
    ],
    publishedAt: '2026-07-04',
    updatedAt: '2026-08-23',
    reviewedBy: '살림랩 편집팀',
  },
};

export function getProductEditorial(slug: string): EditorialMeta | undefined {
  return PRODUCT_EDITORIAL[slug];
}
