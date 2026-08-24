// src/lib/data/editorial/product-editorial.ts 를 생성한다.
//
//   node scripts/generate-editorial.mjs
//
// 입력은 세 개의 출처 표다.
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
];
const publisherOf = (url) => {
  const host = new URL(url).hostname;
  for (const [re, name] of PUBLISHER) if (re.test(host)) return name;
  return host;
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
for (const block of prevSrc.split(/\n {2}'/).slice(1)) {
  const slug = block.slice(0, block.indexOf("'"));
  const sources = [];
  for (const m of block.matchAll(
    /url: '([^']+)',\n\s*title: '((?:[^'\\]|\\.)*)',\n\s*publisher: '([^']+)',/g,
  )) {
    sources.push({ url: m[1], title: m[2], publisher: m[3] });
  }
  const publishedAt = block.match(/publishedAt: '([^']+)'/)?.[1];
  if (sources.length) existing[slug] = { sources, publishedAt };
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
L.push('');
L.push('/**');
L.push(' * 제품별 편집 신뢰 정보.');
L.push(' *');
L.push(' * ⚠️ 이 파일은 생성물이다. 손으로 고치지 말고 scripts/generate-editorial.mjs 를 돌린다.');
L.push(' *    출처를 추가하려면 verified-specs.ts 의 세 표 중 맞는 곳에 먼저 적는다:');
L.push(' *      VERIFIED_SPECS         사양 수치의 출처');
L.push(' *      VERIFIED_PRICES        가격의 출처');
L.push(' *      VERIFIED_PRODUCT_PAGES 그 밖에 제품을 대조한 페이지');
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
  L.push("    updatedAt: '2026-08-24',");
  L.push("    reviewedBy: '살림랩 편집팀',");
  if (prices[slug]) L.push(`    priceCheckedAt: '${prices[slug].checkedAt}',`);
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
