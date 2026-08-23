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
