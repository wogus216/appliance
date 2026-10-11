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
  {
    date: '2026-10-11',
    // 직전 배포 빌드(df89e08)와 이번 빌드의 <main> 본문을 대조해 바뀐 사이트맵 경로 97개만 적는다.
    // 본문이 그대로인 /editorial-policy·/contact·/privacy·/terms·소재 2종은 넣지 않았다.
    // 근거: research/evidence/content-value-2026-10-08/pass4/changed-sitemap-vs-deployed.txt
    affects: [
      '/',
      '/compare',
      '/error-codes',
      '/error-codes/SKMagic/dishwasher/e4',
      '/error-codes/Haier/air-conditioner/f25',
      '/error-codes/Cuckoo/dishwasher/e4',
      '/blog',
      '/materials',
      '/methodology',
      '/about',
      '/blog/airpods-pro3-review-meta-analysis',
      '/blog/fridge-monthly-kwh-measurement',
      '/blog/samsung-washer-check-codes',
      '/blog/dishwasher-water-per-person',
      '/blog/standbyme-go-vs-2-vs-max',
      '/blog/sony-xm5-vs-qcy-melobuds',
      '/blog/dehumidifier-liters-measurement',
      '/blog/air-purifier-area-numbers',
      '/blog/bespoke-rf85-vs-dios-t873',
      '/blog/fridge-4door-vs-side-by-side',
      '/blog/wall-aircon-samsung-vs-tcl-vs-haier',
      '/blog/washer-dryer-combo-vs-separate',
      '/blog/airpods-pro3-vs-buds3-pro-vs-liberty5',
      '/blog/portable-tv-standbyme-vs-movingstyle',
      '/blog/robot-vacuum-suction-numbers',
      '/blog/water-purifier-lg-vs-coway-vs-skmagic',
      '/blog/dishwasher-12-vs-6-countertop',
      '/blog/dyson-tp07-vs-hp09',
      '/category/air-conditioner',
      '/category/dehumidifier',
      '/category/air-purifier',
      '/category/fan',
      '/category/washer',
      '/category/dryer',
      '/category/refrigerator',
      '/category/dishwasher',
      '/category/water-purifier',
      '/category/robot-vacuum',
      '/category/tv',
      '/category/wireless-earbuds',
      '/brand/Samsung',
      '/brand/LG',
      '/brand/TCL',
      '/brand/Haier',
      '/brand/Dyson',
      '/brand/Xiaomi',
      '/brand/Coway',
      '/brand/Winix',
      '/brand/Cuckoo',
      '/brand/Roborock',
      '/brand/Apple',
      '/brand/Sony',
      '/brand/Anker',
      '/brand/QCY',
      '/error-codes/Samsung',
      '/error-codes/Haier',
      '/error-codes/SKMagic',
      '/error-codes/Cuckoo',
      '/error-codes/Roborock',
      '/error-codes/Kiturami',
      '/error-codes/Navien',
      '/error-codes/LG',
      '/materials/sap',
      '/materials/acrylic-acid-monomer',
      '/materials/fluorescent-whitening-agent',
      '/materials/phthalate-plasticizers',
      '/products/samsung-wind-free-ar07a9170',
      '/products/samsung-bespoke-grande-wf24a9500',
      '/products/samsung-bespoke-grande-dv17a9720',
      '/products/samsung-bespoke-4door-rf85',
      '/products/samsung-bespoke-jetbot-ai',
      '/products/samsung-bespoke-ai-combo-wd25',
      '/products/samsung-the-movingstyle',
      '/products/samsung-galaxy-buds3-pro',
      '/products/lg-dios-obje-4door-t873',
      '/products/lg-puricare-water-purifier-objet',
      '/products/lg-codezero-r5-robot',
      '/products/lg-dios-obje-sxs-s834',
      '/products/lg-standbyme2',
      '/products/lg-standbyme2-max',
      '/products/lg-standbyme-go',
      '/products/tcl-tac-08csd-wall',
      '/products/tcl-tac-12csd-wall',
      '/products/haier-cth06qbw-wall',
      '/products/haier-cth10qbw-wall',
      '/products/dyson-pure-cool-tp07',
      '/products/dyson-hot-cool-hp09',
      '/products/xiaomi-smart-air-purifier-4',
      '/products/coway-handpick-water-purifier-compact',
      '/products/winix-posong-dehumidifier-16l',
      '/products/cuckoo-dishwasher-table-cdw61',
      '/products/roborock-s8-proultra',
      '/products/roborock-qrevo-curv',
      '/products/apple-airpods-pro3',
      '/products/sony-wf-1000xm5',
      '/products/anker-soundcore-liberty5',
      '/products/qcy-melobuds-pro',
    ],
    note: '외부 평가(평가자 7명, 103페이지) 반영 4차 교정: 페이지 안 모순·추론 오류·제목과 본문 불일치를 고치고, 같은 결정 사실의 반복과 결론 없는 FAQ·정정 흔적·틀 문구를 정리. 색상·구성만 다른 상품의 가격에 조건 표시, 오류 코드 허브에 품목별 안전 문구, 상세 사양표 중복 제거.',
  },
  {
    date: '2026-10-09',
    // 교정 전 빌드(운영과 같은 소스)와 배포 빌드의 <main> 본문을 대조해 바뀐 사이트맵 경로 100개만 적는다.
    // 푸터 면책 문구만 바뀐 /privacy·/terms·/error-codes/Haier/air-conditioner/f25는 넣지 않았다.
    // 근거: research/evidence/content-value-2026-10-08/pass3/changed-sitemap.txt
    affects: [
      '/',
      '/about',
      '/blog',
      '/blog/air-purifier-area-numbers',
      '/blog/airpods-pro3-review-meta-analysis',
      '/blog/airpods-pro3-vs-buds3-pro-vs-liberty5',
      '/blog/bespoke-rf85-vs-dios-t873',
      '/blog/dehumidifier-liters-measurement',
      '/blog/dishwasher-12-vs-6-countertop',
      '/blog/dishwasher-water-per-person',
      '/blog/dyson-tp07-vs-hp09',
      '/blog/fridge-4door-vs-side-by-side',
      '/blog/fridge-monthly-kwh-measurement',
      '/blog/portable-tv-standbyme-vs-movingstyle',
      '/blog/robot-vacuum-suction-numbers',
      '/blog/samsung-washer-check-codes',
      '/blog/sony-xm5-vs-qcy-melobuds',
      '/blog/standbyme-go-vs-2-vs-max',
      '/blog/wall-aircon-samsung-vs-tcl-vs-haier',
      '/blog/washer-dryer-combo-vs-separate',
      '/blog/water-purifier-lg-vs-coway-vs-skmagic',
      '/brand/Anker',
      '/brand/Apple',
      '/brand/Coway',
      '/brand/Cuckoo',
      '/brand/Dyson',
      '/brand/Haier',
      '/brand/LG',
      '/brand/QCY',
      '/brand/Roborock',
      '/brand/Samsung',
      '/brand/Sony',
      '/brand/TCL',
      '/brand/Winix',
      '/brand/Xiaomi',
      '/category/air-conditioner',
      '/category/air-purifier',
      '/category/dehumidifier',
      '/category/dishwasher',
      '/category/dryer',
      '/category/fan',
      '/category/refrigerator',
      '/category/robot-vacuum',
      '/category/tv',
      '/category/washer',
      '/category/water-purifier',
      '/category/wireless-earbuds',
      '/compare',
      '/contact',
      '/editorial-policy',
      '/error-codes',
      '/error-codes/Cuckoo',
      '/error-codes/Cuckoo/dishwasher/e4',
      '/error-codes/Haier',
      '/error-codes/Kiturami',
      '/error-codes/LG',
      '/error-codes/Navien',
      '/error-codes/Roborock',
      '/error-codes/SKMagic',
      '/error-codes/SKMagic/dishwasher/e4',
      '/error-codes/Samsung',
      '/materials',
      '/materials/acrylic-acid-monomer',
      '/materials/fluorescent-whitening-agent',
      '/materials/formaldehyde',
      '/materials/phthalate-plasticizers',
      '/materials/polypropylene-nonwoven',
      '/materials/sap',
      '/methodology',
      '/products/anker-soundcore-liberty5',
      '/products/apple-airpods-pro3',
      '/products/coway-handpick-water-purifier-compact',
      '/products/cuckoo-dishwasher-table-cdw61',
      '/products/dyson-hot-cool-hp09',
      '/products/dyson-pure-cool-tp07',
      '/products/haier-cth06qbw-wall',
      '/products/haier-cth10qbw-wall',
      '/products/lg-codezero-r5-robot',
      '/products/lg-dios-obje-4door-t873',
      '/products/lg-dios-obje-sxs-s834',
      '/products/lg-puricare-water-purifier-objet',
      '/products/lg-standbyme-go',
      '/products/lg-standbyme2',
      '/products/lg-standbyme2-max',
      '/products/qcy-melobuds-pro',
      '/products/roborock-qrevo-curv',
      '/products/roborock-s8-proultra',
      '/products/samsung-bespoke-4door-rf85',
      '/products/samsung-bespoke-ai-combo-wd25',
      '/products/samsung-bespoke-grande-dv17a9720',
      '/products/samsung-bespoke-grande-wf24a9500',
      '/products/samsung-bespoke-jetbot-ai',
      '/products/samsung-galaxy-buds3-pro',
      '/products/samsung-the-movingstyle',
      '/products/samsung-wind-free-ar07a9170',
      '/products/sony-wf-1000xm5',
      '/products/tcl-tac-08csd-wall',
      '/products/tcl-tac-12csd-wall',
      '/products/winix-posong-dehumidifier-16l',
      '/products/xiaomi-smart-air-purifier-4',
    ],
    note: '콘텐츠 가치 1~3차 교정: 근거 없는 단정·재서술·일반론을 정확 모델 원문(제조사 설명서·지원 페이지·공단 신고)으로 고치고 조건별 판단 기준을 보강. 공개 제품 34개 기능 목록 대조, 제트봇 AI 국내 모델코드(VR50T95935W) 교정, AR07 타 모델 가격 철회와 삼성전자서비스 모델별 출처 등재, 브랜드 메타 설명을 데이터 기반으로 변경.',
  },
  {
    date: '2026-10-07',
    affects: [
      "/",
      "/compare",
      "/blog",
      "/blog/airpods-pro3-review-meta-analysis",
      "/blog/sony-xm5-vs-qcy-melobuds",
      "/blog/air-purifier-area-numbers",
      "/blog/wall-aircon-samsung-vs-tcl-vs-haier",
      "/blog/airpods-pro3-vs-buds3-pro-vs-liberty5",
      "/blog/portable-tv-standbyme-vs-movingstyle",
      "/blog/dyson-tp07-vs-hp09",
      "/category/air-conditioner",
      "/category/fan",
      "/category/wireless-earbuds",
      "/brand/Samsung",
      "/brand/TCL",
      "/brand/Haier",
      "/brand/Dyson",
      "/brand/Apple",
      "/brand/Sony",
      "/brand/Anker",
      "/brand/QCY",
      "/products/samsung-wind-free-ar07a9170",
      "/products/samsung-bespoke-grande-wf24a9500",
      "/products/samsung-bespoke-grande-dv17a9720",
      "/products/samsung-bespoke-4door-rf85",
      "/products/samsung-bespoke-jetbot-ai",
      "/products/samsung-bespoke-ai-combo-wd25",
      "/products/samsung-the-movingstyle",
      "/products/samsung-galaxy-buds3-pro",
      "/products/lg-dios-obje-4door-t873",
      "/products/lg-puricare-water-purifier-objet",
      "/products/lg-codezero-r5-robot",
      "/products/lg-dios-obje-sxs-s834",
      "/products/lg-standbyme2",
      "/products/lg-standbyme2-max",
      "/products/lg-standbyme-go",
      "/products/tcl-tac-08csd-wall",
      "/products/tcl-tac-12csd-wall",
      "/products/haier-cth06qbw-wall",
      "/products/haier-cth10qbw-wall",
      "/products/dyson-pure-cool-tp07",
      "/products/dyson-hot-cool-hp09",
      "/products/xiaomi-smart-air-purifier-4",
      "/products/coway-handpick-water-purifier-compact",
      "/products/winix-posong-dehumidifier-16l",
      "/products/cuckoo-dishwasher-table-cdw61",
      "/products/roborock-s8-proultra",
      "/products/roborock-qrevo-curv",
      "/products/apple-airpods-pro3",
      "/products/sony-wf-1000xm5",
      "/products/anker-soundcore-liberty5",
      "/products/qcy-melobuds-pro",
      "/products/samsung-bespoke-sxs-rs84",
      "/products/skmagic-touchon-dishwasher-dwa81",
      "/products/skmagic-allin-water-purifier-wpu"
],
    note: '공개 제품 34개 전수 편집: 모델별 설치·사용 조건·관리 비용·비교 한계와 요약을 보강하고 연결·안전·가상 음향의 잘못된 단정을 수정. 실제 본문이 변경된 연결 페이지도 포함.',
  },

  {
    date: '2026-10-07',
    // 배포 전 라이브 HTML과 정적 산출물의 main 본문을 대조한 경로만 기록한다.
    affects: [
      '/',
      '/compare',
      '/error-codes',
      '/blog',
      '/about',
      '/blog/fridge-monthly-kwh-measurement',
      '/blog/bespoke-rf85-vs-dios-t873',
      '/blog/fridge-4door-vs-side-by-side',
      '/blog/robot-vacuum-suction-numbers',
      '/category/refrigerator',
      '/category/robot-vacuum',
      '/brand/Samsung',
      '/brand/LG',
      '/error-codes/Samsung',
      '/error-codes/SKMagic',
      '/error-codes/Cuckoo',
      '/error-codes/Kiturami',
      '/error-codes/LG',
      '/products/samsung-wind-free-ar07a9170',
      '/products/samsung-bespoke-grande-wf24a9500',
      '/products/samsung-bespoke-grande-dv17a9720',
      '/products/samsung-bespoke-ai-combo-wd25',
      '/products/lg-dios-obje-4door-t873',
      '/products/lg-puricare-water-purifier-objet',
      '/products/lg-codezero-r5-robot',
      '/products/lg-dios-obje-sxs-s834',
      '/products/roborock-s8-proultra',
      '/products/roborock-qrevo-curv',
      '/error-codes/Navien',
      '/error-codes/Cuckoo/dishwasher/e4',
    ],
    note: '정확한 모델 설명서로 삼성·LG·SK매직 오류 표시와 기능 주장을 정정하고, 귀뚜라미 제품군별 코드 및 나비엔 공급·누수 안내를 구분했다. 쿠쿠 CDW-A0611T E4 상세 가이드를 추가했다.',
  },
  {
    date: '2026-10-02',
    affects: ['/products/coway-handpick-water-purifier-compact', '/brand/Coway'],
    note: 'CHPI-7400N의 설치·인증 적용 범위·필터 교체·비용 판단을 보강하고 독립 기관 출처를 연결했다.',
  },
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
  // ── 아래 둘은 2026-09-17 네이버 색인 조사에서 "lastmod가 사실과 다르다"를 확인하고 넣었다.
  //    자세한 것은 docs/naver-index-coverage.md.
  {
    date: '2026-09-03',
    // 소재 6종의 `updated`는 'YYYY-MM'이다(출처가 달까지만 기록한다). 그 값은 사전순으로
    // **그 달의 어느 날보다도 앞선다** — '2026-09' < '2026-09-02'. 그래서 9월 2일에
    // 수집해 간 크롤러에게 "그 뒤로 바뀐 것 없음"이라고 말하고 있었다. 검수일은 달까지가
    // 맞으므로 그대로 두고, 페이지가 실제로 바뀐 날을 여기 적는다.
    affects: ['/materials', '/materials/*'],
    note:
      '기저귀 소재 사전을 「위생용품의 기준 및 규격」 기준으로 다시 썼다(커밋 c52fc8e). ' +
      '항목이 2개에서 6개로 늘었고(폴리프로필렌 부직포·형광증백제·포름알데히드·프탈레이트계 가소제), ' +
      '기존 SAP·아크릴산 단량체 두 항목도 본문을 전부 고쳐 2018-04-19부터 어린이제품 KC 안전확인이 ' +
      '아니라 위생용품 고시가 적용된다는 사실로 바꿨다. 허브는 목록이 2개에서 6개가 됐다.',
  },
  {
    date: '2026-09-14',
    // 비교 페어의 lastmod는 두 제품의 **편집 검수일** 중 나중 것에서 나온다(sitemap.ts).
    // 그 값이 둘 다 8월 24일이라, 9월 14일에 처음 생긴 26개 페이지가 자기가 존재하기
    // 3주 전 날짜를 신고하고 있었다. 2026-09-17 기준 네이버는 이 26개를 색인·색인제외
    // 어느 쪽으로도 갖고 있지 않다.
    //
    // ⚠️ 새 페어가 생기면 그날짜로 항목을 하나 더 추가할 것. 안 그러면 새 페이지가
    //    다시 2026-09-14를 신고한다.
    affects: ['/compare', '/compare/*'],
    note:
      '비교 조합마다 개별 URL을 만들었다(커밋 07c7a05). 색인 자격을 갖춘 26쌍이 새로 생겼고, ' +
      '허브에는 이 26개로 가는 카테고리별 링크 목록을 서버 렌더로 추가해 고아 페이지를 없앴다.',
  },
  {
    date: '2026-10-02',
    // main(f12a8d6)과 이번 빌드의 사이트맵 URL별 <main> 본문을
    // scripts/changed-pages.mjs로 대조했다. 93개 중 기존 82개가 바뀌고
    // /error-codes/SKMagic/dishwasher/e4 한 개가 새로 생겼다.
    // Winix 에러코드 허브·소재 사전·문의·개인정보 페이지는 본문이 같아 제외한다.
    affects: [
      '/', '/compare', '/error-codes', '/blog', '/editorial-policy',
      '/methodology', '/about', '/terms',
      '/blog/*', '/category/*', '/brand/*', '/products/*',
      '/error-codes/Samsung', '/error-codes/LG', '/error-codes/Haier',
      '/error-codes/Dyson', '/error-codes/Xiaomi', '/error-codes/Coway',
      '/error-codes/SKMagic', '/error-codes/Cuckoo', '/error-codes/Roborock',
      '/error-codes/Kiturami', '/error-codes/Navien',
    ],
    note:
      '홈을 에러코드 문제 해결 중심으로 바꾸고 점수형 평가를 제거했다. ' +
      '제조사 설명서와 독립 인증 자료로 제품·비교 글의 모델별 주장을 바로잡고, ' +
      '에러코드 허브를 정비했다. 새 SK매직 E4 상세는 별도 검수일을 쓴다.',
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
