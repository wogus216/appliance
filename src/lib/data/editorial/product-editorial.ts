import type { EditorialMeta } from '@/types/editorial';

/**
 * 제품별 편집 신뢰 정보.
 *
 * ⚠️ 이 파일은 생성물이다. 손으로 고치지 말고 scripts/generate-editorial.mjs 를 돌린다.
 *    출처를 추가하려면 verified-specs.ts 의 세 표 중 맞는 곳에 먼저 적는다:
 *      VERIFIED_SPECS         사양 수치의 출처
 *      VERIFIED_PRICES        가격의 출처
 *      VERIFIED_PRODUCT_PAGES 그 밖에 제품을 대조한 페이지
 *
 * 근거가 없는 제품에는 레코드를 만들지 않는다. 빈 레코드로 채우면 색인 품질
 * 게이트(src/lib/content-quality.ts)가 통과 도장 찍는 기계가 된다.
 */
export const PRODUCT_EDITORIAL: Record<string, EditorialMeta> = {
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
    updatedAt: '2026-08-24',
    reviewedBy: '살림랩 편집팀',
    priceCheckedAt: '2026-08-24',
  },
  'apple-airpods-pro3': {
    sources: [
      {
        url: 'https://www.apple.com/kr/airpods-pro/',
        title: '에어팟 프로 3 제품 페이지',
        publisher: 'Apple',
      },
      {
        url: 'https://www.apple.com/kr/airpods-pro/specs/',
        title: '에어팟 프로 3 기술 사양',
        publisher: 'Apple',
      },
      {
        url: 'https://9to5mac.com/2026/04/14/airpods-pro-3-better-today-than-at-launch-video/',
        title: 'AirPods Pro 3 장기 사용 리뷰',
        publisher: '9to5Mac',
      },
      {
        url: 'https://www.apple.com/kr/shop/buy-airpods/airpods-pro-3',
        title: '에어팟 프로 3 가격 정보',
        publisher: 'Apple',
      },
    ],
    publishedAt: '2026-07-04',
    updatedAt: '2026-08-24',
    reviewedBy: '살림랩 편집팀',
    priceCheckedAt: '2026-08-24',
  },
  'coway-handpick-water-purifier-compact': {
    sources: [
      {
        url: 'https://prod.danawa.com/info/?pcode=89626019',
        title: '한뼘 정수기 냉정 CHPI-7400N 제품 사양',
        publisher: '다나와',
      },
    ],
    updatedAt: '2026-08-24',
    reviewedBy: '살림랩 편집팀',
  },
  'cuckoo-dishwasher-table-cdw61': {
    sources: [
      {
        url: 'https://prod.danawa.com/info/?pcode=10591083',
        title: '6인용 식탁형 식기세척기 CDW-A0611TW 제품 사양',
        publisher: '다나와',
      },
    ],
    updatedAt: '2026-08-24',
    reviewedBy: '살림랩 편집팀',
    priceCheckedAt: '2026-08-24',
  },
  'dyson-hot-cool-hp09': {
    sources: [
      {
        url: 'https://www.dyson.co.kr/dyson-purifier-hot-cool-formaldehyde-white-nickel-gold',
        title: '퓨어 핫앤쿨 HP09 제품 사양',
        publisher: 'Dyson',
      },
      {
        url: 'https://prod.danawa.com/info/?pcode=16588751',
        title: '퓨어 핫앤쿨 HP09 가격 정보',
        publisher: '다나와',
      },
    ],
    updatedAt: '2026-08-24',
    reviewedBy: '살림랩 편집팀',
    priceCheckedAt: '2026-08-24',
  },
  'dyson-pure-cool-tp07': {
    sources: [
      {
        url: 'https://www.dyson.co.kr/dyson-purifier-cool-white-silver',
        title: '퓨어쿨 타워팬 TP07 제품 사양',
        publisher: 'Dyson',
      },
      {
        url: 'https://prod.danawa.com/info/?pcode=15991760',
        title: '퓨어쿨 타워팬 TP07 가격 정보',
        publisher: '다나와',
      },
    ],
    updatedAt: '2026-08-24',
    reviewedBy: '살림랩 편집팀',
    priceCheckedAt: '2026-08-24',
  },
  'haier-cth06qbw-wall': {
    sources: [
      {
        url: 'https://prod.danawa.com/info/?pcode=61541945',
        title: '셀프클리닝 벽걸이 CTH06QBW 제품 사양',
        publisher: '다나와',
      },
    ],
    updatedAt: '2026-08-24',
    reviewedBy: '살림랩 편집팀',
    priceCheckedAt: '2026-08-24',
  },
  'haier-cth10qbw-wall': {
    sources: [
      {
        url: 'https://prod.danawa.com/info/?pcode=63420386',
        title: '셀프클리닝 벽걸이 CTH10QBW 제품 사양',
        publisher: '다나와',
      },
    ],
    updatedAt: '2026-08-24',
    reviewedBy: '살림랩 편집팀',
    priceCheckedAt: '2026-08-24',
  },
  'lg-dios-obje-4door-t873': {
    sources: [
      {
        url: 'https://www.lge.co.kr/product/refrigerators/t873mee111',
        title: '디오스 오브제컬렉션 4도어 T873 제품 사양',
        publisher: 'LG전자',
      },
      {
        url: 'https://prod.danawa.com/info/?pcode=17432099',
        title: '디오스 오브제컬렉션 4도어 T873 가격 정보',
        publisher: '다나와',
      },
    ],
    updatedAt: '2026-08-24',
    reviewedBy: '살림랩 편집팀',
    priceCheckedAt: '2026-08-24',
  },
  'lg-dios-obje-sxs-s834': {
    sources: [
      {
        url: 'https://www.lge.co.kr/product/refrigerators/s834mww1d',
        title: '디오스 오브제컬렉션 양문형 매직스페이스 S834MWW1D 제품 사양',
        publisher: 'LG전자',
      },
      {
        url: 'https://prod.danawa.com/info/?pcode=18934184',
        title: '디오스 오브제컬렉션 양문형 매직스페이스 S834MWW1D 제품 확인',
        publisher: '다나와',
      },
    ],
    updatedAt: '2026-08-24',
    reviewedBy: '살림랩 편집팀',
  },
  'lg-puricare-water-purifier-objet': {
    sources: [
      {
        url: 'https://www.lge.co.kr/product/object-collection/wd523acb',
        title: '퓨리케어 오브제컬렉션 정수기 WD523ACB 제품 사양',
        publisher: 'LG전자',
      },
      {
        url: 'https://prod.danawa.com/info/?pcode=21677045',
        title: '퓨리케어 오브제컬렉션 정수기 WD523ACB 제품 확인',
        publisher: '다나와',
      },
    ],
    updatedAt: '2026-08-24',
    reviewedBy: '살림랩 편집팀',
    priceCheckedAt: '2026-08-24',
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
    updatedAt: '2026-08-24',
    reviewedBy: '살림랩 편집팀',
    priceCheckedAt: '2026-08-24',
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
    updatedAt: '2026-08-24',
    reviewedBy: '살림랩 편집팀',
    priceCheckedAt: '2026-08-24',
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
    updatedAt: '2026-08-24',
    reviewedBy: '살림랩 편집팀',
    priceCheckedAt: '2026-08-24',
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
    updatedAt: '2026-08-24',
    reviewedBy: '살림랩 편집팀',
    priceCheckedAt: '2026-08-24',
  },
  'roborock-qrevo-curv': {
    sources: [
      {
        url: 'https://kr.roborock.com/pages/roborock-qrevo-curv',
        title: 'Qrevo Curv 제품 사양',
        publisher: 'Roborock',
      },
    ],
    updatedAt: '2026-08-24',
    reviewedBy: '살림랩 편집팀',
  },
  'roborock-s8-proultra': {
    sources: [
      {
        url: 'https://prod.danawa.com/info/?pcode=19522775',
        title: 'S8 프로 울트라 로봇청소기 가격 정보',
        publisher: '다나와',
      },
    ],
    updatedAt: '2026-08-24',
    reviewedBy: '살림랩 편집팀',
    priceCheckedAt: '2026-08-24',
  },
  'samsung-bespoke-4door-rf85': {
    sources: [
      {
        url: 'https://www.samsung.com/sec/support/model/RF85C90D1AP/',
        title: '비스포크 4도어 RF85 제품 사양',
        publisher: '삼성전자',
      },
      {
        url: 'https://prod.danawa.com/info/?pcode=20419955',
        title: '비스포크 4도어 RF85 가격 정보',
        publisher: '다나와',
      },
    ],
    updatedAt: '2026-08-24',
    reviewedBy: '살림랩 편집팀',
    priceCheckedAt: '2026-08-24',
  },
  'samsung-bespoke-ai-combo-wd25': {
    sources: [
      {
        url: 'https://www.samsung.com/sec/support/model/WD25DB8995BZ/',
        title: '비스포크 AI 콤보 WD25 제품 사양',
        publisher: '삼성전자',
      },
      {
        url: 'https://prod.danawa.com/info/?pcode=36707846',
        title: '비스포크 AI 콤보 WD25 가격 정보',
        publisher: '다나와',
      },
    ],
    updatedAt: '2026-08-24',
    reviewedBy: '살림랩 편집팀',
    priceCheckedAt: '2026-08-24',
  },
  'samsung-bespoke-grande-dv17a9720': {
    sources: [
      {
        url: 'https://www.samsung.com/sec/support/model/DV17A9720BV/',
        title: '비스포크 그랑데AI 건조기 DV17A9720 제품 사양',
        publisher: '삼성전자',
      },
      {
        url: 'https://prod.danawa.com/info/?pcode=15403370',
        title: '비스포크 그랑데AI 건조기 DV17A9720 제품 확인',
        publisher: '다나와',
      },
    ],
    updatedAt: '2026-08-24',
    reviewedBy: '살림랩 편집팀',
  },
  'samsung-bespoke-grande-wf24a9500': {
    sources: [
      {
        url: 'https://www.samsung.com/sec/support/model/WF24A9500KE/',
        title: '비스포크 그랑데AI WF24A9500 제품 사양',
        publisher: '삼성전자',
      },
      {
        url: 'https://prod.danawa.com/info/?pcode=14760566',
        title: '비스포크 그랑데AI WF24A9500 가격 정보',
        publisher: '다나와',
      },
    ],
    updatedAt: '2026-08-24',
    reviewedBy: '살림랩 편집팀',
    priceCheckedAt: '2026-08-24',
  },
  'samsung-bespoke-sxs-rs84': {
    sources: [
      {
        url: 'https://www.samsung.com/sec/support/model/RS84B5061M9/',
        title: '비스포크 양문형 RS84 제품 사양',
        publisher: '삼성전자',
      },
    ],
    updatedAt: '2026-08-24',
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
    updatedAt: '2026-08-24',
    reviewedBy: '살림랩 편집팀',
    priceCheckedAt: '2026-08-24',
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
      {
        url: 'https://www.samsung.com/sec/support/model/KU27LSFM7AXXKR/',
        title: '더 무빙스타일 제품 사양',
        publisher: '삼성전자',
      },
    ],
    publishedAt: '2026-07-04',
    updatedAt: '2026-08-24',
    reviewedBy: '살림랩 편집팀',
    priceCheckedAt: '2026-08-24',
  },
  'samsung-wind-free-ar07a9170': {
    sources: [
      {
        url: 'https://www.samsung.com/sec/support/model/AR07A9170HCN/',
        title: '윈드프리 벽걸이 AR07A9170HCN 제품 사양',
        publisher: '삼성전자',
      },
      {
        url: 'https://prod.danawa.com/info/?pcode=122688519',
        title: '윈드프리 벽걸이 AR07A9170HCN 가격 정보',
        publisher: '다나와',
      },
    ],
    updatedAt: '2026-08-24',
    reviewedBy: '살림랩 편집팀',
    priceCheckedAt: '2026-08-24',
  },
  'skmagic-allin-water-purifier-wpu': {
    sources: [
      {
        url: 'https://qr.skmagic.com/2019/model/WPU/WPUA710CRERO/Manual.htm',
        title: '올인원 직수 냉온정수기 WPU-A710C 제품 사양',
        publisher: 'SK매직',
      },
    ],
    updatedAt: '2026-08-24',
    reviewedBy: '살림랩 편집팀',
  },
  'skmagic-touchon-dishwasher-dwa81': {
    sources: [
      {
        url: 'https://m.manual.skmagic.com/2019/model/DWA/DWA81R0D00SL/Manual.htm',
        title: '터치온 식기세척기 12인용 DWA81 제품 사양',
        publisher: 'SK매직',
      },
    ],
    updatedAt: '2026-08-24',
    reviewedBy: '살림랩 편집팀',
  },
  'sony-wf-1000xm5': {
    sources: [
      {
        url: 'https://prod.danawa.com/info/?pcode=27250154',
        title: '소니 WF-1000XM5 상품 정보',
        publisher: '다나와',
      },
      {
        url: 'https://www.sony.co.kr/headphones/products/wf-1000xm5',
        title: 'WF-1000XM5 제품 확인',
        publisher: 'Sony',
      },
    ],
    publishedAt: '2026-07-04',
    updatedAt: '2026-08-24',
    reviewedBy: '살림랩 편집팀',
    priceCheckedAt: '2026-08-24',
  },
  'tcl-tac-08csd-wall': {
    sources: [
      {
        url: 'https://prod.danawa.com/info/?pcode=51549299',
        title: '인버터 벽걸이 TAC-08CSD 제품 사양',
        publisher: '다나와',
      },
      {
        url: 'https://www.tcl.com/kr/ko/air-conditioners/tac-08csd-tph11i',
        title: '인버터 벽걸이 TAC-08CSD 제품 확인',
        publisher: 'TCL',
      },
    ],
    updatedAt: '2026-08-24',
    reviewedBy: '살림랩 편집팀',
    priceCheckedAt: '2026-08-24',
  },
  'tcl-tac-12csd-wall': {
    sources: [
      {
        url: 'https://prod.danawa.com/info/?pcode=53783573',
        title: '인버터 벽걸이 TAC-12CSD 제품 사양',
        publisher: '다나와',
      },
      {
        url: 'https://www.tcl.com/kr/ko/air-conditioners/tac-12csd-tph11i',
        title: '인버터 벽걸이 TAC-12CSD 제품 확인',
        publisher: 'TCL',
      },
    ],
    updatedAt: '2026-08-24',
    reviewedBy: '살림랩 편집팀',
    priceCheckedAt: '2026-08-24',
  },
  'winix-posong-dehumidifier-16l': {
    sources: [
      {
        url: 'https://prod.danawa.com/info/?pcode=7039534',
        title: '뽀송 제습기 16L 가격 정보',
        publisher: '다나와',
      },
    ],
    updatedAt: '2026-08-24',
    reviewedBy: '살림랩 편집팀',
    priceCheckedAt: '2026-08-24',
  },
  'xiaomi-smart-air-purifier-4': {
    sources: [
      {
        url: 'https://prod.danawa.com/info/?pcode=16218836',
        title: '스마트 공기청정기 4 제품 사양',
        publisher: '다나와',
      },
      {
        url: 'https://www.mi.com/kr/product/xiaomi-smart-air-purifier-4/',
        title: '스마트 공기청정기 4 제품 확인',
        publisher: 'Xiaomi',
      },
    ],
    updatedAt: '2026-08-24',
    reviewedBy: '살림랩 편집팀',
    priceCheckedAt: '2026-08-24',
  },
};

export function getProductEditorial(slug: string): EditorialMeta | undefined {
  return PRODUCT_EDITORIAL[slug];
}
