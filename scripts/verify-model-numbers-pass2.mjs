// 3차 — 모델번호가 아니라 '브랜드 + 제품명'으로 조회해서
// 그 제품이 실재하는지, 실재한다면 진짜 모델 코드가 무엇인지 후보를 뽑는다.
//
// 2차(모델번호 잘라 검색)는 오탐이 심했다. 'CHP-7311N' 앞 6자로 검색하니
// 엄브로 반바지가 걸렸다. 문자열 유사도로는 가전 모델을 가릴 수 없다.
// 그래서 사람이 판단할 재료(같은 브랜드·같은 카테고리의 실제 상품명 목록)를 모은다.

import { readFileSync, writeFileSync } from 'node:fs';

const UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36';

function productNames(html) {
  const names = new Set();
  for (const m of html.matchAll(/class="prod_name"[\s\S]{0,400}?<a[^>]*>([\s\S]{1,200}?)<\/a>/g)) {
    const t = m[1].replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').trim();
    if (t) names.add(t);
  }
  return [...names];
}

async function search(query) {
  const url = `https://search.danawa.com/dsearch.php?query=${encodeURIComponent(query)}`;
  const res = await fetch(url, { headers: { 'User-Agent': UA }, signal: AbortSignal.timeout(30000) });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return await res.text();
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// 1차에서 MISS로 나온 것만 다시 본다.
const pass2 = JSON.parse(readFileSync('.audit/model-verify.json', 'utf-8')).filter(
  (r) => r.verdict === 'MISS',
);
const out = [];

for (const [i, p] of pass2.entries()) {
  // 제품명에서 모델 토큰을 떼어 낸다 — 모델로는 이미 못 찾았으니 이름만으로 묻는다.
  const modelToken = p.model.split(/[\s(]/)[0];
  const cleanName = p.name
    .replace(new RegExp(modelToken.replace(/[.*+?^${}()|[\]\\/-]/g, '\\$&'), 'ig'), '')
    .replace(/\s+/g, ' ')
    .trim();
  const query = `${p.brand} ${cleanName}`.trim();

  let names = [];
  try {
    names = productNames(await search(query));
  } catch (e) {
    names = [`ERROR: ${e.message}`];
  }

  // 같은 브랜드로 보이는 결과만 남긴다 (액세서리·타 브랜드 오탐 줄이기)
  const brandish = names.filter((n) => n.includes(p.brand) || n.toUpperCase().includes(p.brand.toUpperCase()));
  const shortlist = (brandish.length ? brandish : names).slice(0, 6);

  out.push({ ...p, query, candidates: shortlist });
  console.log(`\n${String(i + 1).padStart(2)}/${pass2.length} ${p.slug}  [${p.model}]  q="${query}"`);
  for (const c of shortlist) console.log(`      · ${c.slice(0, 88)}`);
  if (!shortlist.length) console.log('      (결과 없음)');
  await sleep(600);
}

writeFileSync('.audit/model-verify-pass2.json', JSON.stringify(out, null, 2));
console.log(`\n조회 완료 ${out.length}건`);
