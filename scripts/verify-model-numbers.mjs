// 카탈로그 74개 제품의 모델번호가 실재하는지 다나와 검색으로 대조한다.
//
// 판정 기준(사전 고정):
//   HIT   — 검색 결과 상품명 중 하나에 모델번호가 (공백·하이픈 무시하고) 포함된다
//   NEAR  — 상품명에 모델번호의 앞 6자 이상이 접두로 일치하는 것이 있다(색상 접미사 차이 등)
//   MISS  — 검색 결과에 상품이 없거나, 어떤 상품명도 모델번호를 포함하지 않는다
//
// MISS는 "실재하지 않는다"가 아니라 "다나와에서 확인되지 않는다"이다.
// 렌탈 전용(코웨이·SK매직·쿠쿠 정수기 등)은 다나와 미등록이 정상일 수 있어
// 2차로 제조사 공식 사이트를 따로 확인해야 한다.

import { readFileSync, writeFileSync, readdirSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const DATA_DIR = 'src/lib/data/appliances';
const OUT_DIR = '.audit';

/**
 * 카탈로그를 읽는다.
 *
 * TS를 그대로 import할 수 없어 정규식으로 뽑는다. 데이터 파일은 전부 같은 서식이라
 * 이 방식이 성립하고, 뽑지 못한 필드가 있으면 아래 개수 검사에서 바로 드러난다.
 */
function loadProducts() {
  const out = [];
  for (const f of readdirSync(DATA_DIR).filter((n) => n.endsWith('.ts') && n !== 'index.ts')) {
    const src = readFileSync(join(DATA_DIR, f), 'utf-8');
    for (const block of src.split(/\n  \{\n/).slice(1)) {
      const get = (k) => block.match(new RegExp(`^    ${k}: '([^']*)'`, 'm'))?.[1];
      const slug = get('slug');
      const model = get('modelNumber');
      if (!slug || !model) continue;
      out.push({ slug, brand: get('brand'), category: get('category'), name: get('name'), model });
    }
  }
  return out;
}

const UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36';

const norm = (s) => s.toUpperCase().replace(/[\s\-_/().]/g, '');

/** 다나와 검색 HTML에서 상품명을 뽑는다 */
function productNames(html) {
  const names = new Set();
  // <p class="prod_name"><a ...>이름</a>
  for (const m of html.matchAll(/class="prod_name"[\s\S]{0,400}?<a[^>]*>([\s\S]{1,200}?)<\/a>/g)) {
    const t = m[1].replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').trim();
    if (t) names.add(t);
  }
  return [...names];
}

function pcodes(html) {
  return [...new Set([...html.matchAll(/prod\.danawa\.com\/info\/\?pcode=(\d+)/g)].map((m) => m[1]))];
}

async function search(query) {
  const url = `https://search.danawa.com/dsearch.php?query=${encodeURIComponent(query)}`;
  const res = await fetch(url, { headers: { 'User-Agent': UA }, signal: AbortSignal.timeout(30000) });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return await res.text();
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

mkdirSync(OUT_DIR, { recursive: true });
const products = loadProducts();
console.log(`카탈로그 ${products.length}개 로드`);
const results = [];

for (const [i, p] of products.entries()) {
  const nModel = norm(p.model);
  let verdict = 'MISS';
  let evidence = [];
  let names = [];
  try {
    const html = await search(p.model);
    names = productNames(html);
    const codes = pcodes(html);
    const hit = names.filter((n) => norm(n).includes(nModel));
    if (hit.length) {
      verdict = 'HIT';
      evidence = hit.slice(0, 3);
    } else if (nModel.length >= 6) {
      const near = names.filter((n) => norm(n).includes(nModel.slice(0, 6)));
      if (near.length) {
        verdict = 'NEAR';
        evidence = near.slice(0, 3);
      }
    }
    results.push({ ...p, verdict, evidence, resultCount: names.length, pcode: codes[0] ?? null });
  } catch (e) {
    results.push({ ...p, verdict: 'ERROR', evidence: [String(e.message)], resultCount: 0, pcode: null });
  }
  const r = results.at(-1);
  console.log(
    `${String(i + 1).padStart(2)}/${products.length} ${r.verdict.padEnd(5)} ${p.model.padEnd(18)} ${p.slug}` +
      (r.evidence.length ? `  ← ${r.evidence[0].slice(0, 60)}` : ''),
  );
  await sleep(600);
}

writeFileSync('.audit/model-verify.json', JSON.stringify(results, null, 2));

const by = (v) => results.filter((r) => r.verdict === v);
console.log('\n=== 집계 ===');
for (const v of ['HIT', 'NEAR', 'MISS', 'ERROR']) console.log(`${v}: ${by(v).length}`);
