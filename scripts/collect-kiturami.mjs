// 귀뚜라미 공식 자가진단 매뉴얼에서 제품군별 에러코드를 수집한다.
//
// 왜 보일러인가 — 2026-09-16 네이버 실적에서 이 사이트가 유일하게 성과를 내는 포맷이
// 에러코드임이 드러났다(클릭의 88%). 같은 구조를 옮길 곳을 찾다가 보일러를 봤는데,
// "경동나비엔 보일러 에러코드"·"귀뚜라미 보일러 에러코드" 검색 상위에 제조사 공식이
// 없고 개인 블로그와 커뮤니티가 차지하고 있었다. 그리고 9월은 난방 시즌 3개월 전이라
// 계절 콘텐츠를 올릴 시점이다.
//
// ⚠️ 여기서 뽑은 문장을 그대로 싣지 않는다. 코드가 실재하는지·무엇을 뜻하는지 확인하는
//    근거로 쓰고, 문장은 우리가 쓴다. 출처 URL은 편집 기록에 남긴다.
//
// 실행: node scripts/collect-kiturami.mjs
// 산출: .audit/kiturami/codes.json

import { writeFile, mkdir } from 'node:fs/promises';

const UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36';

/** 자가진단 페이지. id는 krb.co.kr/self 목록에서 확인한 것 */
const PAGES = [
  { id: 359, fuel: '가스' },
  { id: 192, fuel: '가스' },
  { id: 360, fuel: '가스' },
  { id: 352, fuel: '가스' },
  { id: 10762, fuel: '가스' },
  { id: 10759, fuel: '가스' },
  { id: 367, fuel: '기름' },
  { id: 384, fuel: '전기' },
];

const strip = (s) =>
  s
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/[ \t]+/g, ' ')
    .replace(/\n{2,}/g, '\n')
    .trim();

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const results = [];

for (const { id, fuel } of PAGES) {
  const res = await fetch(`https://krb.co.kr/self/${id}`, { headers: { 'user-agent': UA } });
  if (!res.ok) {
    console.log(`  ${id}: HTTP ${res.status} — 건너뜀`);
    continue;
  }
  const htmlText = await res.text();

  // 제품군 이름은 <h1><strong>'거꾸로IN 가스보일러'</strong>의 에러코드입니다</h1> 형태다.
  //
  // 두 번 헛짚었다. 본문 전체에서 따옴표를 찾으니 상단 스크립트의 따옴표가 먼저 걸렸고,
  // 첫 h1으로 좁히니 그건 로고였다(페이지에 h1이 셋이다). "의 에러코드"를 단서로 쓴다.
  const nameMatch = htmlText.match(/<strong>'([^']+)'<\/strong>\s*의 에러코드/);
  const productLine = nameMatch ? strip(nameMatch[1]) : `(id ${id})`;

  // 표 한 줄 = 코드 묶음 하나. td.num 의 <strong> 이 코드, h4 가 설명, li 가 조치다.
  const rows = [...htmlText.matchAll(/<tr>\s*<td class="num">([\s\S]*?)<\/td>\s*<td class="tit">([\s\S]*?)<\/td>/g)];

  const entries = [];
  for (const [, numCell, titCell] of rows) {
    const codes = [...numCell.matchAll(/<strong>([\s\S]*?)<\/strong>/g)].map((m) => strip(m[1])).filter(Boolean);
    if (codes.length === 0) continue;

    const h4 = titCell.match(/<h4>([\s\S]*?)<\/h4>/);
    const summary = h4 ? strip(h4[1]) : '';
    const steps = [...titCell.matchAll(/<li>([\s\S]*?)<\/li>/g)].map((m) => strip(m[1])).filter(Boolean);
    entries.push({ codes, summary, steps });
  }

  results.push({ id, fuel, productLine, url: `https://krb.co.kr/self/${id}`, entries });
  console.log(`  ${id}  ${productLine.slice(0, 26).padEnd(28)} 코드묶음 ${entries.length}개`);
  await sleep(800);
}

await mkdir('.audit/kiturami', { recursive: true });
await writeFile('.audit/kiturami/codes.json', JSON.stringify(results, null, 2));

// 가스보일러 전 제품군에 공통으로 나오는 코드를 센다 — 카테고리 대표 코드를 고르는 근거
const gas = results.filter((r) => r.fuel === '가스' && r.entries.length > 0);
const freq = new Map();
for (const r of gas) {
  const seen = new Set(r.entries.flatMap((e) => e.codes));
  for (const c of seen) freq.set(c, (freq.get(c) ?? 0) + 1);
}
console.log(`\n가스보일러 제품군 ${gas.length}개 기준 코드 출현 빈도:`);
for (const [code, n] of [...freq.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))) {
  console.log(`  ${code.padStart(3)}  ${n}/${gas.length}개 제품군`);
}
console.log(`\n저장: .audit/kiturami/codes.json`);
