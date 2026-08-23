// 공개 중인 제품마다 다나와 '본품' 상품 페이지를 찾는다.
//
// 1차 감사 스크립트는 모델번호가 결과 어딘가에 나오는지만 봤다. 그래서 호환 부품
// 판매글이 근거로 잡힌 건이 있었다. 여기서는 상품명과 pcode를 짝지어 뽑고,
// 액세서리로 보이는 항목을 걸러 낸 뒤 본품 후보만 남긴다.
//
// 출력: .audit/danawa-pages.json — 사람이 눈으로 확인한 뒤
//       src/lib/data/editorial/product-editorial.ts 에 옮겨 적는 재료다.
//       스크립트가 찾았다는 이유만으로 출처로 쓰지 말 것.

import { readFileSync, writeFileSync, readdirSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36';

const DATA_DIR = 'src/lib/data/appliances';
const OUT_DIR = '.audit';

/** 본품이 아니라 부품·소모품·호환품으로 보이는 상품명 */
const ACCESSORY = /필터|호환|정품\s*부품|부품|소모품|리모컨|리모콘|커버|거치대|받침|브러쉬|브러시|먼지통|물통|스탠드\s*받침|액세서리|악세서리|세트\s*교체|교체용|전용\s*팩|탈취|\[호환\]/;

function loadPublished() {
  const unverified = new Set(
    [...readFileSync(join(DATA_DIR, 'unverified.ts'), 'utf-8').matchAll(/^  '([^']+)',/gm)].map(
      (m) => m[1],
    ),
  );
  const out = [];
  for (const f of readdirSync(DATA_DIR).filter((n) => n.endsWith('.ts') && !['index.ts', 'unverified.ts'].includes(n))) {
    const src = readFileSync(join(DATA_DIR, f), 'utf-8');
    for (const block of src.split(/\n  \{\n/).slice(1)) {
      const get = (k) => block.match(new RegExp(`^    ${k}: '([^']*)'`, 'm'))?.[1];
      const slug = get('slug');
      const model = get('modelNumber');
      if (!slug || !model || unverified.has(slug)) continue;
      out.push({ slug, brand: get('brand'), category: get('category'), name: get('name'), model });
    }
  }
  return out;
}

/** 상품명과 pcode를 짝지어 뽑는다 */
function pairs(html) {
  const found = [];
  for (const m of html.matchAll(
    /class="prod_name"[\s\S]{0,400}?href="[^"]*?pcode=(\d+)[^"]*"[^>]*>([\s\S]{1,200}?)<\/a>/g,
  )) {
    const name = m[2].replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').trim();
    if (name) found.push({ pcode: m[1], name });
  }
  return found;
}

async function search(query) {
  const url = `https://search.danawa.com/dsearch.php?query=${encodeURIComponent(query)}`;
  const res = await fetch(url, { headers: { 'User-Agent': UA }, signal: AbortSignal.timeout(30000) });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return await res.text();
}

const norm = (s) => s.toUpperCase().replace(/[\s\-_/().]/g, '');
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

mkdirSync(OUT_DIR, { recursive: true });
const products = loadPublished();
console.log(`공개 제품 ${products.length}개\n`);

const results = [];
for (const [i, p] of products.entries()) {
  const token = p.model.split(/[\s(]/)[0];
  let candidates = [];
  try {
    const all = pairs(await search(p.model));
    const nModel = norm(token);
    candidates = all
      .filter((c) => norm(c.name).includes(nModel))
      .filter((c) => !ACCESSORY.test(c.name));
  } catch (e) {
    candidates = [{ pcode: null, name: `ERROR: ${e.message}` }];
  }

  results.push({ ...p, candidates: candidates.slice(0, 4) });
  const top = candidates[0];
  console.log(
    `${String(i + 1).padStart(2)}/${products.length} ${p.slug}  [${p.model}]\n` +
      (top
        ? `      ✓ pcode=${top.pcode}  ${top.name.slice(0, 66)}`
        : '      ✗ 본품 후보 없음 (액세서리만 나오거나 결과 없음)'),
  );
  await sleep(600);
}

writeFileSync(join(OUT_DIR, 'danawa-pages.json'), JSON.stringify(results, null, 2));
const withProduct = results.filter((r) => r.candidates.length && r.candidates[0].pcode);
console.log(`\n본품 페이지 확보 ${withProduct.length} / ${results.length}`);
