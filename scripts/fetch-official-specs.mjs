// 제조사 공식 페이지에서 사양 원문을 긁어 온다.
//
// 삼성 support/model/<SKU>/ 와 LG lge.co.kr/<경로>/<모델> 은 서버 렌더라 curl로 읽힌다.
// (삼성의 일반 제품 페이지 samsung.com/sec/<카테고리>/... 는 JS 렌더라 안 된다.)
//
// 후보 URL을 여러 개 넣어 두면 사양 표가 실제로 있는 첫 페이지를 채택한다.
// 출력은 원문 발췌다 — 값을 자동으로 카탈로그에 반영하지 않는다. 항목 이름이
// 제조사마다 달라 기계 대응이 안 되고, 잘못 매핑하면 새 오류를 만든다.
//
// 출력: .audit/official-specs.md

import { writeFileSync, mkdirSync } from 'node:fs';

const UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36';

/** 사양 표가 실린 페이지인지 가르는 표지 */
const HAS_SPEC = /기본\s*사양|외관\s*사양|제품\s*사양|주요\s*사양|사양\s*보기/;

/** 사양 근처에서 뽑아낼 항목 */
const FIELDS = [
  '소비전력',
  '에너지 소비효율',
  '에너지소비효율',
  '크기',
  '무게',
  '소음',
  '용량',
  '냉방능력',
  '냉방면적',
  '적용면적',
  '제습량',
  '정격',
  '냉매',
];

const TARGETS = [
  // ── 삼성 (support/model/<SKU>/)
  ['samsung-wind-free-ar07a9170', ['AR07A9170HCN', 'AR07A9170HCS'].map(samsung)],
  ['samsung-bespoke-grande-wf24a9500', ['WF24A9500KE', 'WF24A9500KS', 'WF24A9500KV'].map(samsung)],
  ['samsung-bespoke-grande-dv17a9720', ['DV17A9720BV', 'DV17A9720KV'].map(samsung)],
  ['samsung-bespoke-4door-rf85', ['RF85C90D1AP', 'RF85C90D1APW'].map(samsung)],
  ['samsung-bespoke-sxs-rs84', ['RS84B5061M9'].map(samsung)],
  ['samsung-bespoke-jetbot-ai', ['VR50T95735W'].map(samsung)],
  ['samsung-bespoke-ai-combo-wd25', ['WD25DB8995BZ'].map(samsung)],
  ['samsung-the-movingstyle', ['KU27LSFM7AXXKR', 'KU27LSFM7A'].map(samsung)],
  ['samsung-galaxy-buds3-pro', ['SM-R630NZAAKOO', 'SM-R630N'].map(samsung)],

  // ── LG (경로가 카테고리마다 달라 후보를 여러 개 둔다)
  ['lg-dios-obje-4door-t873', lg('t873mee111', ['refrigerators', 'object-collection'])],
  ['lg-dios-obje-sxs-s834', lg('s834mww10', ['refrigerators', 'object-collection'])],
  ['lg-puricare-water-purifier-objet', lg('wd523as', ['water-purifiers', 'object-collection'])],
  ['lg-standbyme2', lg('27lx6tpga', ['tvs', 'lg-styler-tv', 'standbyme'])],
  ['lg-standbyme2-max', lg('32lx6bpga', ['tvs', 'standbyme'])],
  ['lg-standbyme-go', lg('27lx5qkna', ['tvs', 'standbyme'])],
];

function samsung(sku) {
  return `https://www.samsung.com/sec/support/model/${sku}/`;
}
function lg(model, paths) {
  return paths.flatMap((p) => [
    `https://www.lge.co.kr/${p}/${model}`,
    `https://www.lge.co.kr/${p}/${model}-akor`,
  ]);
}

const unescape_ = (s) =>
  s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ');

const text = (html) => unescape_(html.replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ');

async function tryGet(url) {
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': UA },
      redirect: 'follow',
      signal: AbortSignal.timeout(30000),
    });
    if (!res.ok) return null;
    return await res.text();
  } catch {
    return null;
  }
}

/** 사양 항목 주변 문장을 뽑는다 */
function excerpt(t) {
  const out = [];
  for (const f of FIELDS) {
    const re = new RegExp(f.replace(/\s/g, '\\s*') + '[\\s:]{0,4}([^가-힣]{0,60}?[\\d.,]+\\s*(?:kg|mm|W|kW|dB|등급|㎡|m2|L|평|시간|kWh)[^,·/]{0,20})', 'g');
    for (const m of t.matchAll(re)) {
      const line = `${f}: ${m[1].trim()}`;
      if (!out.includes(line)) out.push(line);
      if (out.length > 40) break;
    }
  }
  return out;
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

mkdirSync('.audit', { recursive: true });
const L = ['# 제조사 공식 사양 원문 발췌', '', '자동 반영 금지 — 사람이 카탈로그 필드에 매핑할 재료다.', ''];

for (const [slug, urls] of TARGETS) {
  let hit = null;
  for (const url of urls) {
    const html = await tryGet(url);
    await sleep(400);
    if (!html) continue;
    const t = text(html);
    if (!HAS_SPEC.test(t)) continue;
    hit = { url, lines: excerpt(t) };
    break;
  }
  L.push(`## ${slug}`);
  L.push('');
  if (!hit) {
    L.push('- ✗ 사양 표가 있는 공식 페이지를 찾지 못함 (후보: ' + urls.length + '개)');
    console.log(`✗ ${slug}`);
  } else {
    L.push(`- 출처: ${hit.url}`);
    for (const line of hit.lines) L.push(`  - ${line}`);
    console.log(`✓ ${slug}  (${hit.lines.length}항목)  ${hit.url}`);
  }
  L.push('');
}

writeFileSync('.audit/official-specs.md', L.join('\n') + '\n');
console.log('\nwrote .audit/official-specs.md');
