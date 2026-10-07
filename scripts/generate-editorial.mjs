// src/lib/data/editorial/product-editorial.ts 를 생성한다.
//
//   node scripts/generate-editorial.mjs
//
// 기본 입력은 세 개의 출처 표다. 정확한 모델의 독립 기관 자료는 아래
// INDEPENDENT_PRODUCT_SOURCES에 검증 기록과 함께 추가한다.
//   verified-specs.ts  VERIFIED_SPECS         사양 수치를 어디서 봤는가
//                      VERIFIED_PRICES        가격을 어디서 봤는가
//                      VERIFIED_PRODUCT_PAGES 그 밖에 제품을 대조한 페이지
//
// 손으로 편집 메타데이터를 고치면 다음 생성 때 날아간다. 출처를 추가하려면
// 위 세 표 중 맞는 곳에 적고 이 스크립트를 다시 돌린다.
//
// 기존 파일에 이미 있던 출처는 URL 기준으로 보존한다 — 파일럿 9개 제품의
// 출처는 표가 아니라 손으로 조사한 것이라 표에서 복원되지 않기 때문이다.

import { readFileSync, writeFileSync } from 'node:fs';

const SPECS_FILE = 'src/lib/data/appliances/verified-specs.ts';
const OUT_FILE = 'src/lib/data/editorial/product-editorial.ts';
const DATA_DIR = 'src/lib/data/appliances';
const BRAND_FILES = [
  'samsung', 'lg', 'carrier', 'tcl', 'haier', 'dyson', 'shinil', 'xiaomi',
  'coway', 'winix', 'skmagic', 'cuckoo', 'roborock', 'apple', 'sony', 'anker', 'qcy',
];

const specsSrc = readFileSync(SPECS_FILE, 'utf-8');
const prevSrc = readFileSync(OUT_FILE, 'utf-8');

/** 도메인 → 사람이 읽는 발행처 이름 */
const PUBLISHER = [
  [/(^|\.)apple\.com$/, 'Apple'],
  [/(^|\.)samsung\.com$/, '삼성전자'],
  [/(^|\.)lge\.co\.kr$/, 'LG전자'],
  [/(^|\.)dyson\.co\.kr$/, 'Dyson'],
  [/(^|\.)skmagic\.com$/, 'SK매직'],
  [/(^|\.)danawa\.com$/, '다나와'],
  [/(^|\.)roborock\.com$/, 'Roborock'],
  [/(^|\.)tcl\.com$/, 'TCL'],
  [/(^|\.)mi\.com$/, 'Xiaomi'],
  [/(^|\.)sony\.co\.kr$/, 'Sony'],
  [/(^|\.)coway\.com$/, '코웨이'],
  [/(^|\.)ylshop\.co\.kr$/, 'QCY 공식 수입사'],
];
const publisherOf = (url) => {
  const host = new URL(url).hostname;
  for (const [re, name] of PUBLISHER) if (re.test(host)) return name;
  return host;
};

// 모델명이 정확히 일치하는 기관 목록. 적용 범위는 research/evidence/2026-10-01/
// coway-wqa-independent-performance.md와 kwtc-exact-water-purifier-register.md에 기록했다.
const INDEPENDENT_PRODUCT_SOURCES = {
  'coway-handpick-water-purifier-compact': [
    { url: 'https://find.wqa.org/find-products/ctl/detail/mid/1054/cid/coway_co_ltd/sid/1/keyword/7400n', title: 'CHPI-7400N 완제품 NSF/ANSI 42 인증 항목', publisher: 'Water Quality Association' },
    { url: 'https://find.wqa.org/find-products/ctl/detail/mid/1054/cid/coway_co_ltd/sid/3/keyword/7400n', title: 'CHPI-7400N 완제품 NSF/ANSI 53 인증 항목', publisher: 'Water Quality Association' },
    { url: 'https://find.wqa.org/find-products/ctl/detail/mid/1054/cid/coway_co_ltd/sid/63/keyword/7400n', title: 'CHPI-7400N 완제품 NSF/ANSI 401 인증 항목', publisher: 'Water Quality Association' },
    { url: 'https://portal.kwtc.or.kr/common/fileDownload.do?atchFileId=426991&fileSn=1', title: '2026-07-09 정수기 품질검사 유효 제품현황 6쪽 323번', publisher: '한국물기술인증원' },
  ],
};

// 정확한 모델 페이지에서 연결한 계열 설명서와 모델별 공단 신고값.
const VERIFIED_MODEL_SOURCES = {
  'samsung-bespoke-grande-wf24a9500': [
    { url: 'https://downloadcenter.samsung.com/content/UM/202304/20230407100730025/Drum_WF8000AK_WF21A9400_WF24A9500_9501.pdf', title: 'WF24A9500KE 지원 페이지의 공용 사용설명서, 인쇄 74~78쪽', publisher: '삼성전자' },
  ],
  'samsung-bespoke-grande-dv17a9720': [
    { url: 'https://downloadcenter.samsung.com/content/UM/202504/20250401094234705/WM0013_IB_DV8700TK_DV19A9740_KO_250313.pdf', title: 'DV17A9720BV 지원 페이지의 공용 사용설명서, 인쇄 80~81쪽', publisher: '삼성전자' },
  ],
  'samsung-wind-free-ar07a9170': [
    { url: 'https://downloadcenter.samsung.com/content/UM/202105/20210513131032816/RAC068-02_IB_21Y_AR9500T_MOTION_DETECT_KR_KO_210428-D04.pdf', title: 'AR07A9170HCN 포함 공용 사용설명서, 인쇄 31·38쪽', publisher: '삼성전자' },
  ],
  'samsung-bespoke-ai-combo-wd25': [
    { url: 'https://downloadcenter.samsung.com/content/UM/202608/20260818083830741/OID76616_IB_T-PJT_WD8000D-AD_7LCD_KO_260814.pdf', title: 'WD25DB8995BZ 지원 페이지의 공용 사용설명서, 인쇄 62–63·71쪽', publisher: '삼성전자' },
  ],
  'lg-dios-obje-4door-t873': [
    { url: 'https://gscs-b2c.lge.com/open/downloadFile?fileId=a8sdGu0vrerKMqWmu5nkQ', title: 'T873MEE111 지원 페이지의 공용 사용설명서, 인쇄 14~15쪽', publisher: 'LG전자' },
  ],
  'lg-dios-obje-sxs-s834': [
    { url: 'https://gscs-b2c.lge.com/open/downloadFile?fileId=pYFpi7CzmmgetzthPkurQ', title: 'S834MWW1D 지원 페이지의 공용 사용설명서, 인쇄 14~15쪽', publisher: 'LG전자' },
  ],
  'lg-puricare-water-purifier-objet': [
    { url: 'https://gscs-b2c.lge.com/open/downloadFile?fileId=jO7RH8OLgibKoMzZYJqKw', title: 'WD523A** 포함 데스크 정수기 공용 설명서, 인쇄 17·29·31~33쪽', publisher: 'LG전자' },
  ],
  'lg-codezero-r5-robot': [
    { url: 'https://www.lge.co.kr/support/solutions-20153096346359', title: '코드제로 R5 충돌·범퍼·라이다 증상별 점검', publisher: 'LG전자' },
  ],
  'samsung-bespoke-jetbot-ai': [
    { url: 'https://images.samsung.com/is/content/samsung/assets/nz/ha/guides/vac/VR50T95735W-SA_V2.pdf', title: 'VR50T95735W/SA 모델별 제품 자료', publisher: '삼성전자' },
    { url: 'https://www.samsungsvc.co.kr/solution/4048329', title: '제트봇 브러시 이물질 제거 및 재조립 안내', publisher: '삼성전자서비스' },
  ],
  'roborock-s8-proultra': [
    { url: 'https://help.roborock.com/us/product/s8-pro-ultra-message?category=troubleshooting', title: 'S8 Pro Ultra 모델별 오류 안내', publisher: 'Roborock' },
    { url: 'https://de.roborock.com/products/roborock-s8-pro-ultra', title: 'S8 Pro Ultra 제조사 제품 사양', publisher: 'Roborock' },
  ],
  'roborock-qrevo-curv': [
    { url: 'https://help.roborock.com/us/product/roborock-qrevo-curv-message?category=troubleshooting', title: 'Qrevo Curv 모델별 오류 안내', publisher: 'Roborock' },
    { url: 'https://kr.roborock.com/pages/roborock-qrevo-curv', title: 'Qrevo Curv 국내 제품 사양 및 옵션', publisher: 'Roborock' },
  ],
  'cuckoo-dishwasher-table-cdw61': [
    { url: 'https://www.cuckoo.co.kr/upload_cuckoo/_bo_rep/manual/200424%3Dz0383-0082a0%20rev.1_cdw-a0611t.pdf', title: 'CDW-A0611TS·TW 사용설명서, 인쇄 9·15·25·32쪽', publisher: '쿠쿠전자' },
  ],
  'xiaomi-smart-air-purifier-4': [
    { url: 'https://www.mi.com/kr/product/xiaomi-smart-air-purifier-4/specs/', title: 'Xiaomi 스마트 공기청정기 4 AC-M16-SC 사양', publisher: 'Xiaomi' },
    { url: 'https://www.mi.com/kr/support/faq/details/KA-32487/', title: '스마트 공기청정기 4 정품 필터 인식 안내', publisher: 'Xiaomi' },
    { url: 'https://www.mi.com/kr/support/faq/details/KA-27892/', title: '스마트 공기청정기 4 Wi-Fi 연결 안내', publisher: 'Xiaomi' },
  ],
  'dyson-pure-cool-tp07': [
    { url: 'https://www.dyson.co.uk/content/dam/dyson/maintenance/user-guides/kr_kr/EC_438E_TP09_07_User_Manual.pdf', title: '다이슨 TP07·TP09 한국어 사용설명서', publisher: 'Dyson' },
  ],
  'dyson-hot-cool-hp09': [
    { url: 'https://www.dyson.co.uk/content/dam/dyson/maintenance/user-guides/kr_kr/EC_527E_HP09_User_Manual.pdf', title: '다이슨 HP09 한국어 사용설명서', publisher: 'Dyson' },
  ],
  'tcl-tac-08csd-wall': [
    { url: 'https://eep.energy.or.kr/certification/certi_view_260.aspx?no=260240215', title: 'TAC-08CSD/TPH11I-I·O 냉방효율 신고값', publisher: '한국에너지공단' },
  ],
  'winix-posong-dehumidifier-16l': [
    { url: 'https://www.winix.com/product/790', title: 'DN2H160-IWK 위닉스 제품 페이지', publisher: '위닉스' },
    { url: 'https://kr.object.ncloudstorage.com/w2r-commerce-winix/USEMANUAL/202507/250722111846926-78c8424e1fa84ce2bc3fd07992f4d6f2.pdf', title: '위닉스 DN2 계열 사용설명서', publisher: '위닉스' },
    { url: 'https://eep.energy.or.kr/certification/certi_view_145.aspx?no=283190073', title: 'DN2H160-IWK 제습기 효율 신고값', publisher: '한국에너지공단' },
  ],
};

const REVIEWED_AT_OVERRIDES = {
  'lg-dios-obje-sxs-s834': '2026-10-07',
  'samsung-bespoke-ai-combo-wd25': '2026-10-07',
  'samsung-wind-free-ar07a9170': '2026-10-07',
  'samsung-bespoke-grande-dv17a9720': '2026-10-07',
  'samsung-bespoke-grande-wf24a9500': '2026-10-07',
  'samsung-bespoke-4door-rf85': '2026-10-02',
  'samsung-bespoke-sxs-rs84': '2026-10-02',
  'lg-dios-obje-4door-t873': '2026-10-07',
  'skmagic-touchon-dishwasher-dwa81': '2026-10-02',
  'lg-puricare-water-purifier-objet': '2026-10-02',
  'lg-codezero-r5-robot': '2026-10-02',
  'samsung-bespoke-jetbot-ai': '2026-10-02',
  'roborock-s8-proultra': '2026-10-02',
  'roborock-qrevo-curv': '2026-10-02',
  'cuckoo-dishwasher-table-cdw61': '2026-10-02',
  'xiaomi-smart-air-purifier-4': '2026-10-02',
  'dyson-pure-cool-tp07': '2026-10-02',
  'dyson-hot-cool-hp09': '2026-10-02',
  'tcl-tac-08csd-wall': '2026-10-02',
  'winix-posong-dehumidifier-16l': '2026-10-02',
};

// ── 출처 표 파싱
const specs = {};
for (const m of specsSrc.matchAll(
  /^ {2}'([^']+)': \{\n\s*fields: \[([^\]]*)\],\n\s*source: '([^']+)',\n\s*\},$/gm,
)) {
  specs[m[1]] = { source: m[3] };
}

const prices = {};
for (const m of specsSrc.matchAll(
  /^ {2}'([^']+)': \{ source: '([^']+)', checkedAt: '([^']+)' \},$/gm,
)) {
  prices[m[1]] = { source: m[2], checkedAt: m[3] };
}

const productPages = {};
for (const m of specsSrc.matchAll(
  /^ {2}'([^']+)': \{\n\s*source: '([^']+)',\n\s*what: '((?:[^'\\]|\\.)*)',\n\s*checkedAt: '([^']+)',\n\s*\},$/gm,
)) {
  productPages[m[1]] = { source: m[2], what: m[3] };
}

// ── 기존 출처 보존
const existing = {};
const unesc = (s) => s.replace(/\\'/g, "'").replace(/\\\\/g, '\\');
for (const block of prevSrc.split(/\n {2}'/).slice(1)) {
  const slug = block.slice(0, block.indexOf("'"));
  const sources = [];
  for (const m of block.matchAll(
    /url: '([^']+)',\n\s*title: '((?:[^'\\]|\\.)*)',\n\s*publisher: '((?:[^'\\]|\\.)*)',/g,
  )) {
    sources.push({ url: m[1], title: unesc(m[2]), publisher: unesc(m[3]) });
  }
  for (const m of block.matchAll(
    /\{ url: '([^']+)', title: '((?:[^'\\]|\\.)*)', publisher: '((?:[^'\\]|\\.)*)' \}/g,
  )) {
    sources.push({ url: m[1], title: unesc(m[2]), publisher: unesc(m[3]) });
  }
  const publishedAt = block.match(/publishedAt: '([^']+)'/)?.[1];
  const updatedAt = block.match(/updatedAt: '([^']+)'/)?.[1];
  const priceCheckedAt = block.match(/priceCheckedAt: '([^']+)'/)?.[1];
  if (sources.length) existing[slug] = { sources, publishedAt, updatedAt, priceCheckedAt };
}

// ── 제품 이름 (출처 제목에 쓴다)
const names = {};
for (const f of BRAND_FILES) {
  const src = readFileSync(`${DATA_DIR}/${f}.ts`, 'utf-8');
  for (const block of src.split('\n  {\n').slice(1)) {
    const slug = block.match(/^ {4}slug: '([^']+)'/m)?.[1];
    const name = block.match(/^ {4}name: '([^']+)'/m)?.[1];
    if (slug && name) names[slug] = name;
  }
}

const slugs = [
  ...new Set([
    ...Object.keys(specs),
    ...Object.keys(prices),
    ...Object.keys(productPages),
    ...Object.keys(existing),
  ]),
].sort();

const L = [];
const esc = (s) => s.replace(/'/g, "\\'");
L.push("import type { EditorialMeta } from '@/types/editorial';");
L.push("import { SITE_AUTHOR } from '@/lib/constants';");
L.push('');
L.push('/**');
L.push(' * 제품별 편집 신뢰 정보.');
L.push(' *');
L.push(' * ⚠️ 이 파일은 생성물이다. 손으로 고치지 말고 scripts/generate-editorial.mjs 를 돌린다.');
L.push(' *    출처를 추가하려면 verified-specs.ts 의 세 표 중 맞는 곳에 먼저 적는다:');
L.push(' *      VERIFIED_SPECS         사양 수치의 출처');
L.push(' *      VERIFIED_PRICES        가격의 출처');
L.push(' *      VERIFIED_PRODUCT_PAGES 그 밖에 제품을 대조한 페이지');
L.push(' *    정확한 모델의 독립 기관 자료는 생성 스크립트의 INDEPENDENT_PRODUCT_SOURCES에 적는다.');
L.push(' *');
L.push(' * 근거가 없는 제품에는 레코드를 만들지 않는다. 빈 레코드로 채우면 색인 품질');
L.push(' * 게이트(src/lib/content-quality.ts)가 통과 도장 찍는 기계가 된다.');
L.push(' */');
L.push('export const PRODUCT_EDITORIAL: Record<string, EditorialMeta> = {');

let records = 0;
for (const slug of slugs) {
  const seen = new Set();
  const out = [];
  const push = (url, title, publisher) => {
    if (seen.has(url)) return;
    seen.add(url);
    out.push({ url, title, publisher });
  };

  for (const s of existing[slug]?.sources ?? []) push(s.url, s.title, s.publisher);
  const label = names[slug] ?? slug;
  if (specs[slug]) push(specs[slug].source, `${label} 제품 사양`, publisherOf(specs[slug].source));
  if (prices[slug]) push(prices[slug].source, `${label} 가격 정보`, publisherOf(prices[slug].source));
  if (productPages[slug]) {
    push(productPages[slug].source, `${label} 제품 확인`, publisherOf(productPages[slug].source));
  }
  for (const source of INDEPENDENT_PRODUCT_SOURCES[slug] ?? []) {
    push(source.url, source.title, source.publisher);
  }
  for (const source of VERIFIED_MODEL_SOURCES[slug] ?? []) {
    push(source.url, source.title, source.publisher);
  }
  if (!out.length) continue;

  records++;
  L.push(`  '${slug}': {`);
  L.push('    sources: [');
  for (const s of out) {
    L.push('      {');
    L.push(`        url: '${s.url}',`);
    L.push(`        title: '${esc(s.title)}',`);
    L.push(`        publisher: '${esc(s.publisher)}',`);
    L.push('      },');
  }
  L.push('    ],');
  if (existing[slug]?.publishedAt) L.push(`    publishedAt: '${existing[slug].publishedAt}',`);
  L.push(`    updatedAt: '${REVIEWED_AT_OVERRIDES[slug] ?? existing[slug]?.updatedAt ?? '2026-08-24'}',`);
  L.push('    reviewedBy: SITE_AUTHOR,');
  if (prices[slug] || existing[slug]?.priceCheckedAt) {
    L.push(`    priceCheckedAt: '${existing[slug]?.priceCheckedAt ?? prices[slug].checkedAt}',`);
  }
  L.push('  },');
}
L.push('};');
L.push('');
L.push('export function getProductEditorial(slug: string): EditorialMeta | undefined {');
L.push('  return PRODUCT_EDITORIAL[slug];');
L.push('}');
L.push('');

writeFileSync(OUT_FILE, L.join('\n'));
console.log(
  `사양 ${Object.keys(specs).length} · 가격 ${Object.keys(prices).length} · ` +
    `제품확인 ${Object.keys(productPages).length}  →  편집 메타데이터 ${records}건`,
);
