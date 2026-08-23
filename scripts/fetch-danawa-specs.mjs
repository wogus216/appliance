// 확보한 다나와 본품 페이지에서 스펙 요약과 표기 가격을 뽑아,
// 카탈로그가 적어 둔 값과 나란히 놓는다.
//
// 자동으로 고치지 않는다. 다나와의 스펙 요약은 항목 이름이 카테고리마다 다르고
// 우리 데이터 모델과 1:1로 대응하지 않아서, 기계가 맞다/틀리다를 판정할 수 없다.
// 이 스크립트가 하는 일은 '사람이 한 화면에서 대조할 수 있게 모아 주는 것'까지다.
//
// 입력: .audit/danawa-pages.json (find-danawa-product-pages.mjs 출력)
// 출력: .audit/spec-compare.md

import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36';
const DATA_DIR = 'src/lib/data/appliances';

const unescape_ = (s) =>
  s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ');

/** 카탈로그에서 대조에 쓸 값만 뽑는다 */
function catalogSpecs() {
  const map = new Map();
  for (const f of readdirSync(DATA_DIR).filter((n) => n.endsWith('.ts') && !['index.ts', 'unverified.ts'].includes(n))) {
    const src = readFileSync(join(DATA_DIR, f), 'utf-8');
    for (const block of src.split(/\n  \{\n/).slice(1)) {
      const str = (k) => block.match(new RegExp(`^\\s{4,6}${k}: '([^']*)'`, 'm'))?.[1];
      const num = (k) => block.match(new RegExp(`^\\s{4,6}${k}: (\\d+)`, 'm'))?.[1];
      const slug = str('slug');
      if (!slug) continue;
      map.set(slug, {
        price: num('price'),
        noise: num('noise'),
        powerConsumption: num('powerConsumption'),
        capacity: str('capacity'),
        dimensions: str('dimensions'),
        energyGrade: str('energyGrade'),
      });
    }
  }
  return map;
}

async function get(url) {
  const res = await fetch(url, { headers: { 'User-Agent': UA }, signal: AbortSignal.timeout(30000) });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return await res.text();
}

function extract(html) {
  const spec = html.match(/class="spec_list"([\s\S]*?)<\/div>/)?.[1] ?? '';
  const title = html.match(/<title>([\s\S]*?)<\/title>/)?.[1] ?? '';
  // 최저가 — 페이지 상단 대표가
  const price =
    html.match(/class="lwst_prc"[\s\S]{0,300}?<em[^>]*>([\d,]+)<\/em>/)?.[1] ??
    html.match(/"lowestPrice"\s*:\s*"?(\d+)"?/)?.[1] ??
    null;
  return {
    title: unescape_(title.replace(/<[^>]+>/g, '')).trim(),
    spec: unescape_(spec.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').replace(/^>\s*/, '').trim(),
    price: price ? price.replace(/,/g, '') : null,
  };
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const pages = JSON.parse(readFileSync('.audit/danawa-pages.json', 'utf-8'));
const cat = catalogSpecs();
const targets = pages.filter((p) => p.candidates[0]?.pcode);

const L = ['# 사양 대조표 (다나와 본품 페이지 ↔ 카탈로그)', ''];
L.push(`측정 시점: 2026-08-23 · 대상 ${targets.length}건 (본품 페이지를 확보한 공개 제품)`);
L.push('');
L.push('> 다나와 스펙 요약은 항목 체계가 우리 데이터와 다르다. 기계 판정이 불가능해');
L.push('> 나란히 놓기만 한다. **고치기 전에 사람이 제조사 공식 사양과 한 번 더 대조할 것.**');
L.push('');

for (const [i, p] of targets.entries()) {
  const pcode = p.candidates[0].pcode;
  const url = `https://prod.danawa.com/info/?pcode=${pcode}`;
  let info = { title: '', spec: '', price: null };
  try {
    info = extract(await get(url));
  } catch (e) {
    info.title = `ERROR: ${e.message}`;
  }
  const c = cat.get(p.slug) ?? {};
  L.push(`## ${p.slug}`);
  L.push('');
  L.push(`- 카탈로그: **${p.name}** \`${p.model}\` · ${p.category}`);
  L.push(`- 다나와: ${info.title}`);
  L.push(`- 출처 후보: ${url}`);
  L.push(`- 가격 — 카탈로그 \`${c.price ?? '?'}\` / 다나와 \`${info.price ?? '추출 실패'}\``);
  const ours = [
    c.noise ? `소음 ${c.noise}dB` : null,
    c.powerConsumption ? `소비전력 ${c.powerConsumption}W` : null,
    c.capacity ? `용량 ${c.capacity}` : null,
    c.dimensions ? `크기 ${c.dimensions}` : null,
    c.energyGrade ? `효율 ${c.energyGrade}` : null,
  ].filter(Boolean);
  L.push(`- 카탈로그 사양: ${ours.join(' · ') || '(없음)'}`);
  L.push(`- 다나와 사양: ${info.spec.slice(0, 500) || '(추출 실패)'}`);
  L.push('');
  console.log(`${i + 1}/${targets.length} ${p.slug}  가격 ${c.price ?? '?'} vs ${info.price ?? '?'}`);
  await sleep(700);
}

writeFileSync('.audit/spec-compare.md', L.join('\n') + '\n');
console.log('\nwrote .audit/spec-compare.md');
