// 어떤 수치를 어디서 확인했는지 적어 두는 표.
//
// 카탈로그의 `specs.powerConsumption` · `specs.noise`(생활가전) ·
// `techSpecs.dimensions` · `techSpecs.weight` 는 **여기 적힌 제품에만** 존재한다.
// 2026-08-23 감사에서 나머지 224개 필드는 근거를 찾지 못해 지웠다
// (docs/spec-audit.md). 화면은 값이 없으면 그 항목을 감춘다.
//
// ⚠️ 값을 새로 넣으려면 이 표에 slug·필드·출처를 함께 적어야 한다.
//    verified-specs.test.ts 가 "표에 없는 수치가 데이터에 있으면" 실패시킨다.
//
// noise는 이중 슬롯이다 — 생활가전은 소음(dB)이라 근거가 필요하고,
// TV·무선이어폰은 '저소음' 1-10 에디터 점수라 이 표의 대상이 아니다.

/** 근거를 확인할 수 있는 수치 필드 */
export type VerifiableSpecField = 'powerConsumption' | 'noise' | 'dimensions' | 'weight';

export interface VerifiedSpecRecord {
  fields: VerifiableSpecField[];
  /** 어디서 확인했는지 — 사람이 다시 열어 볼 수 있는 형태로 */
  source: string;
}

export const VERIFIED_SPECS: Record<string, VerifiedSpecRecord> = {
  // ── 삼성전자 공식 (samsung.com/sec/support/model/<SKU>/)
  'samsung-wind-free-ar07a9170': {
    fields: ['powerConsumption', 'dimensions'],
    source: 'https://www.samsung.com/sec/support/model/AR07A9170HCN/',
  },
  'samsung-bespoke-grande-wf24a9500': {
    fields: ['powerConsumption', 'dimensions', 'weight'],
    source: 'https://www.samsung.com/sec/support/model/WF24A9500KE/',
  },
  'samsung-bespoke-grande-dv17a9720': {
    fields: ['powerConsumption', 'dimensions', 'weight'],
    source: 'https://www.samsung.com/sec/support/model/DV17A9720BV/',
  },
  'samsung-bespoke-ai-combo-wd25': {
    fields: ['powerConsumption', 'dimensions', 'weight'],
    source: 'https://www.samsung.com/sec/support/model/WD25DB8995BZ/',
  },
  'samsung-bespoke-4door-rf85': {
    fields: ['dimensions', 'weight'],
    source: 'https://www.samsung.com/sec/support/model/RF85C90D1AP/',
  },
  'samsung-bespoke-sxs-rs84': {
    fields: ['dimensions', 'weight'],
    source: 'https://www.samsung.com/sec/support/model/RS84B5061M9/',
  },
  'samsung-the-movingstyle': {
    fields: ['powerConsumption', 'dimensions', 'weight'],
    source: 'https://www.samsung.com/sec/support/model/KU27LSFM7AXXKR/',
  },

  // ── LG전자 공식 (lge.co.kr 제품 상세)
  'lg-dios-obje-4door-t873': {
    fields: ['dimensions', 'weight'],
    source: 'https://www.lge.co.kr/product/refrigerators/t873mee111',
  },
  'lg-dios-obje-sxs-s834': {
    fields: ['noise', 'dimensions', 'weight'],
    source: 'https://www.lge.co.kr/product/refrigerators/s834mww1d',
  },
  'lg-puricare-water-purifier-objet': {
    fields: ['powerConsumption', 'dimensions', 'weight'],
    source: 'https://www.lge.co.kr/product/object-collection/wd523acb',
  },

  // ── 다이슨 공식 (dyson.co.kr 상품정보고시)
  'dyson-pure-cool-tp07': {
    fields: ['powerConsumption', 'dimensions'],
    source: 'https://www.dyson.co.kr/dyson-purifier-cool-white-silver',
  },
  'dyson-hot-cool-hp09': {
    fields: ['powerConsumption', 'dimensions', 'weight'],
    source: 'https://www.dyson.co.kr/dyson-purifier-hot-cool-formaldehyde-white-nickel-gold',
  },

  // ── 로보락 코리아 공식 제품 페이지
  //    본체 치수만 싣혀 있다. 무게·소비전력은 표기가 없어 넣지 않았다.
  'roborock-qrevo-curv': {
    fields: ['dimensions'],
    source: 'https://kr.roborock.com/pages/roborock-qrevo-curv',
  },

  // ── SK매직 공식 사용설명서
  'skmagic-touchon-dishwasher-dwa81': {
    fields: ['powerConsumption', 'dimensions', 'weight'],
    source: 'https://m.manual.skmagic.com/2019/model/DWA/DWA81R0D00SL/Manual.htm',
  },
  'skmagic-allin-water-purifier-wpu': {
    fields: ['powerConsumption', 'weight'],
    source: 'https://qr.skmagic.com/2019/model/WPU/WPUA710CRERO/Manual.htm',
  },

  // ── 다나와 본품 상품 페이지
  //    아래 제조사는 국내 공식 사이트가 해당 모델을 싣지 않아 2차 자료를 썼다.
  'haier-cth06qbw-wall': {
    fields: ['powerConsumption', 'dimensions'],
    source: 'https://prod.danawa.com/info/?pcode=61541945',
  },
  'haier-cth10qbw-wall': {
    fields: ['powerConsumption', 'dimensions'],
    source: 'https://prod.danawa.com/info/?pcode=63420386',
  },
  'tcl-tac-08csd-wall': {
    fields: ['powerConsumption', 'dimensions'],
    source: 'https://prod.danawa.com/info/?pcode=51549299',
  },
  'tcl-tac-12csd-wall': {
    fields: ['powerConsumption', 'dimensions'],
    source: 'https://prod.danawa.com/info/?pcode=53783573',
  },
  'xiaomi-smart-air-purifier-4': {
    fields: ['powerConsumption', 'dimensions'],
    source: 'https://prod.danawa.com/info/?pcode=16218836',
  },
  'cuckoo-dishwasher-table-cdw61': {
    fields: ['powerConsumption', 'dimensions'],
    source: 'https://prod.danawa.com/info/?pcode=10591083',
  },
  'coway-handpick-water-purifier-compact': {
    fields: ['dimensions'],
    source: 'https://prod.danawa.com/info/?pcode=89626019',
  },
};

/**
 * 제품을 대조한 추가 출처.
 *
 * 위 두 표는 "이 수치를 어디서 봤는가"를 적는 자리라, 수치를 옮겨 오지 않은 페이지는
 * 넣을 곳이 없었다. 그런데 제조사 공식 제품 페이지는 수치를 안 옮겨도 근거가 된다 —
 * 그 모델이 실재하고 이 문서가 말하는 그 제품이 맞다는 것을 확인해 주기 때문이다.
 *
 * 색인 게이트가 요구하는 것은 "서로 다른 발행처 2곳"이므로, 이 표가 채워지면
 * 발행처가 하나뿐이던 제품이 색인 대상이 된다. 그래서 아무 페이지나 넣으면 안 된다.
 *
 * ⚠️ 등재 조건: 실제로 열어서 **그 모델번호가 페이지에 있는 것을 확인**했을 것.
 *    검색 결과 페이지, 카테고리 목록, 호환 부품 페이지는 대상이 아니다.
 *    `what`에 무엇을 대조했는지 적는다.
 */
export interface VerifiedProductPage {
  source: string;
  /** 그 페이지에서 무엇을 확인했는지 */
  what: string;
  checkedAt: string;
}

export const VERIFIED_PRODUCT_PAGES: Record<string, VerifiedProductPage> = {
  // ── 제조사 공식 제품 페이지
  'tcl-tac-08csd-wall': {
    source: 'https://www.tcl.com/kr/ko/air-conditioners/tac-08csd-tph11i',
    what: '모델번호 TAC-08CSD/TPH11I와 인버터·셀프클리닝·4방향 풍향 기능 표기',
    checkedAt: '2026-08-24',
  },
  'tcl-tac-12csd-wall': {
    source: 'https://www.tcl.com/kr/ko/air-conditioners/tac-12csd-tph11i',
    what: '모델번호 TAC-12CSD/TPH11I 제품 페이지 존재 확인',
    checkedAt: '2026-08-24',
  },
  'xiaomi-smart-air-purifier-4': {
    source: 'https://www.mi.com/kr/product/xiaomi-smart-air-purifier-4/',
    what: '모델번호 AC-M16-SC와 제품 사양 페이지',
    checkedAt: '2026-08-24',
  },
  'sony-wf-1000xm5': {
    source: 'https://www.sony.co.kr/headphones/products/wf-1000xm5',
    what: '모델명 WF-1000XM5, Dynamic Driver X·듀얼 프로세서 등 기능 표기',
    checkedAt: '2026-08-24',
  },

  // ── 다나와 본품 상품 페이지
  //    번들(세탁기+건조기 세트)이나 호환 부품이 아니라 단품 페이지인지 제목으로 확인했다.
  'samsung-bespoke-grande-dv17a9720': {
    source: 'https://prod.danawa.com/info/?pcode=15403370',
    what: '단품 상품 페이지 "삼성전자 비스포크 그랑데AI DV17A9720BV"',
    checkedAt: '2026-08-24',
  },
  'lg-dios-obje-sxs-s834': {
    source: 'https://prod.danawa.com/info/?pcode=18934184',
    what: '단품 상품 페이지 "LG전자 오브제컬렉션 S834MWW1D (일반설치)"',
    checkedAt: '2026-08-24',
  },
  'lg-puricare-water-purifier-objet': {
    source: 'https://prod.danawa.com/info/?pcode=21677045',
    what: '단품 상품 페이지 "LG전자 오브제컬렉션 퓨리케어 WD523ACB (자가관리)"',
    checkedAt: '2026-08-24',
  },
};

/**
 * 조사한 시중가의 출처와 확인 날짜.
 *
 * `price` / `priceAnalysis.msrp` 는 **여기 있는 제품에만** 존재한다.
 * 가격은 시간이 지나면 변하므로 값보다 '언제 확인했는가'가 중요하다.
 * 확인일은 EditorialMeta.priceCheckedAt 으로도 화면에 표시된다.
 *
 * '정가'와 '실거래가'를 따로 주장하지 않는다 — 제조사 정가를 확인할 방법이 없어
 * 조사 시점의 시중 최저가 하나만 둔다.
 */
export const VERIFIED_PRICES: Record<string, { source: string; checkedAt: string }> = {
  // 제조사 공식
  'apple-airpods-pro3': { source: 'https://www.apple.com/kr/shop/buy-airpods/airpods-pro-3', checkedAt: '2026-08-24' },
  'lg-puricare-water-purifier-objet': { source: 'https://www.lge.co.kr/product/object-collection/wd523acb', checkedAt: '2026-08-24' },
  // 다나와 본품 상품 페이지 최저가
  'samsung-wind-free-ar07a9170': { source: 'https://prod.danawa.com/info/?pcode=122688519', checkedAt: '2026-08-24' },
  'samsung-bespoke-grande-wf24a9500': { source: 'https://prod.danawa.com/info/?pcode=14760566', checkedAt: '2026-08-24' },
  'samsung-bespoke-ai-combo-wd25': { source: 'https://prod.danawa.com/info/?pcode=36707846', checkedAt: '2026-08-24' },
  'samsung-bespoke-4door-rf85': { source: 'https://prod.danawa.com/info/?pcode=20419955', checkedAt: '2026-08-24' },
  'samsung-the-movingstyle': { source: 'https://prod.danawa.com/info/?pcode=98076260', checkedAt: '2026-08-24' },
  'samsung-galaxy-buds3-pro': { source: 'https://prod.danawa.com/info/?pcode=59537216', checkedAt: '2026-08-24' },
  'lg-dios-obje-4door-t873': { source: 'https://prod.danawa.com/info/?pcode=17432099', checkedAt: '2026-08-24' },
  'lg-standbyme2': { source: 'https://prod.danawa.com/info/?pcode=75537515', checkedAt: '2026-08-24' },
  'lg-standbyme2-max': { source: 'https://prod.danawa.com/info/?pcode=122632760', checkedAt: '2026-08-24' },
  'lg-standbyme-go': { source: 'https://prod.danawa.com/info/?pcode=20361317', checkedAt: '2026-08-24' },
  'dyson-pure-cool-tp07': { source: 'https://prod.danawa.com/info/?pcode=15991760', checkedAt: '2026-08-24' },
  'dyson-hot-cool-hp09': { source: 'https://prod.danawa.com/info/?pcode=16588751', checkedAt: '2026-08-24' },
  'haier-cth06qbw-wall': { source: 'https://prod.danawa.com/info/?pcode=61541945', checkedAt: '2026-08-24' },
  'haier-cth10qbw-wall': { source: 'https://prod.danawa.com/info/?pcode=63420386', checkedAt: '2026-08-24' },
  'tcl-tac-08csd-wall': { source: 'https://prod.danawa.com/info/?pcode=51549299', checkedAt: '2026-08-24' },
  'tcl-tac-12csd-wall': { source: 'https://prod.danawa.com/info/?pcode=53783573', checkedAt: '2026-08-24' },
  'xiaomi-smart-air-purifier-4': { source: 'https://prod.danawa.com/info/?pcode=16218836', checkedAt: '2026-08-24' },
  'cuckoo-dishwasher-table-cdw61': { source: 'https://prod.danawa.com/info/?pcode=10591083', checkedAt: '2026-08-24' },
  'anker-soundcore-liberty5': { source: 'https://prod.danawa.com/info/?pcode=91767473', checkedAt: '2026-08-24' },
  'sony-wf-1000xm5': { source: 'https://prod.danawa.com/info/?pcode=27250154', checkedAt: '2026-08-24' },
  'qcy-melobuds-pro': { source: 'https://prod.danawa.com/info/?pcode=71645780', checkedAt: '2026-08-24' },
  'roborock-s8-proultra': { source: 'https://prod.danawa.com/info/?pcode=19522775', checkedAt: '2026-08-24' },
  'winix-posong-dehumidifier-16l': { source: 'https://prod.danawa.com/info/?pcode=7039534', checkedAt: '2026-08-24' },
};
