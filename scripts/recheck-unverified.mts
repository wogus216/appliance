// 공개 보류된 제품의 모델번호를 다나와에서 다시 조회한다.
//
// 2026-08-23 1차 감사(docs/model-number-audit.md)와 **같은 판정 기준**을 쓴다.
// 기준을 바꾸면 결과 차이가 "실제 변화"인지 "기준 변화"인지 알 수 없다.
//
// 1차와 달라진 것 하나 — 본품과 부품을 가른다. 1차 감사가 스스로 한계로 적은
// 문제다: 호환 필터·리모컨 판매글이 모델번호를 언급해 '확인'으로 잡힌 건이 있었다.
// 부품 글만 잡힌 모델은 '부품만'으로 따로 센다. 근거의 등급이 다르기 때문이다.
//
// 사용: npx tsx scripts/recheck-unverified.mts [--limit N] [--delay MS]

import { allCatalogAppliances } from '../src/lib/data/appliances/index';
import { UNVERIFIED_SLUGS } from '../src/lib/data/appliances/unverified';

const args = new Map<string, string>();
for (let i = 2; i < process.argv.length; i += 2) {
  args.set(process.argv[i].replace(/^--/, ''), process.argv[i + 1]);
}
const LIMIT = Number(args.get('limit') ?? Infinity);
const DELAY = Number(args.get('delay') ?? 1500);

const UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36';

/**
 * 부품·액세서리 판매글을 가르는 말. 본품 근거로 인정하지 않는다.
 *
 * 이 목록이 짧으면 결과가 틀린다 — 처음 돌렸을 때 '브러시'와 영문 'parts'가 빠져 있어
 * 샤오미 두 건이 '확인'(=복구 후보)으로 올라왔다. 둘 다 메인 브러시·수리 부품 판매글이고,
 * 애초에 그 이유로 2차 감사에서 보류된 제품이다. 해외 판매글은 영어로 적힌다.
 * 두 번째로 돌렸을 때도 '브래킷'이 새어 나왔다 — 목록에는 '브라켓'만 있었다.
 *
 * ⚠️ 이 방식은 완전해질 수 없고, 여기서 목록 확장을 멈춘다. 네 번을 돌렸는데 같은 상품
 * 하나가 매번 다른 이름으로 새어 나왔다 — '브러시' → '브래킷' → '교체 회로 기판' →
 * '팬 블레이드'. 다나와의 해외 직구 상품명은 기계번역이라 표현이 사실상 무한하다.
 * 목록을 더 늘리는 것은 이 한 건을 쫓는 일이지 정확도를 올리는 일이 아니다.
 *
 * 그래서 이 스크립트의 '확인'은 **판정이 아니라 사람이 읽어 볼 후보 목록**이다.
 * 복구하려면 상품명을 직접 읽고, 제조사 공식 페이지로 확인한다
 * (scripts/check-maker-pages.mts). 출력 문구도 그렇게 적혀 있다.
 */
const PART_WORDS = [
  '호환',
  '필터',
  '리모컨',
  '리모콘',
  '부품',
  '커버',
  '거치대',
  '브라켓',
  '받침',
  '케이스',
  '전용 스탠드',
  '탈취',
  // '교체용'이 아니라 '교체'로 잡는다 — "교체 회로 기판 용"처럼 띄어쓰기가 끼면
  // 긴 쪽은 안 걸린다. 이 한 건을 잡으려고 세 번을 돌렸다.
  '교체',
  '기판',
  '액세서리',
  '브러시',
  '브래킷',
  '스위블',
  '걸레',
  '먼지통',
  '패드',
  '날개',
  '모터',
  '수리',
  '충전기',
  '어댑터',
  'parts',
  'repair',
  'suitable for',
  'replacement',
  'for xiaomi',
  'for mijia',
  'accessor',
];

const normalize = (s: string) => s.toUpperCase().replace(/[\s\-/_.]/g, '');

const isPartListing = (name: string) => {
  const lower = name.toLowerCase();
  return PART_WORDS.some((w) => lower.includes(w.toLowerCase()));
};

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function searchDanawa(query: string): Promise<string[]> {
  const res = await fetch(`https://search.danawa.com/dsearch.php?query=${encodeURIComponent(query)}`, {
    headers: { 'user-agent': UA, 'accept-language': 'ko-KR,ko;q=0.9' },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const html = await res.text();
  const names = [...html.matchAll(/<p class="prod_name">[\s\S]*?<a[^>]*>([\s\S]*?)<\/a>/g)].map((m) =>
    m[1]
      .replace(/<[^>]+>/g, '')
      .replace(/&amp;/g, '&')
      .replace(/&nbsp;/g, ' ')
      .replace(/\s+/g, ' ')
      .trim(),
  );
  return names.filter(Boolean);
}

type Verdict = '확인' | '부품만' | '부분' | '미확인';

function judge(model: string, names: string[]): { verdict: Verdict; evidence?: string } {
  const target = normalize(model);
  const head = target.slice(0, 6);

  const full = names.filter((n) => normalize(n).includes(target));
  const genuine = full.filter((n) => !isPartListing(n));
  if (genuine.length) return { verdict: '확인', evidence: genuine[0] };
  if (full.length) return { verdict: '부품만', evidence: full[0] };

  const partial = names.filter((n) => normalize(n).includes(head));
  const genuinePartial = partial.filter((n) => !isPartListing(n));
  if (genuinePartial.length) return { verdict: '부분', evidence: genuinePartial[0] };

  return { verdict: '미확인' };
}

const targets = allCatalogAppliances
  .filter((a) => UNVERIFIED_SLUGS.has(a.slug))
  .slice(0, LIMIT);

console.log(`대상 ${targets.length}개 · 다나와 통합검색 · 지연 ${DELAY}ms`);
console.log(`판정 기준: 확인(본품 상품명에 모델번호 포함) / 부품만(부품 글에만) / 부분(앞 6자) / 미확인\n`);

const results: { slug: string; model: string; category: string; verdict: Verdict; evidence?: string }[] = [];

for (const [i, a] of targets.entries()) {
  process.stdout.write(`  ${i + 1}/${targets.length} ${a.modelNumber} … `);
  try {
    const names = await searchDanawa(a.modelNumber);
    const { verdict, evidence } = judge(a.modelNumber, names);
    results.push({ slug: a.slug, model: a.modelNumber, category: a.category, verdict, evidence });
    console.log(`${verdict}${evidence ? ` — ${evidence.slice(0, 55)}` : ` (결과 ${names.length}건)`}`);
  } catch (err) {
    results.push({ slug: a.slug, model: a.modelNumber, category: a.category, verdict: '미확인' });
    console.log(`조회 실패: ${(err as Error).message}`);
  }
  if (i < targets.length - 1) await sleep(DELAY);
}

console.log('\n── 집계 ──');
const counts: Record<string, number> = {};
for (const r of results) counts[r.verdict] = (counts[r.verdict] ?? 0) + 1;
for (const [v, n] of Object.entries(counts).sort((a, b) => b[1] - a[1])) {
  console.log(`  ${v.padEnd(6)} ${String(n).padStart(3)}`);
}

console.log('\n── 사람이 읽어 볼 후보 (자동 판정을 근거로 쓰지 말 것) ──');
const candidates = results.filter((r) => r.verdict === '확인');
if (!candidates.length) console.log('  없음');
for (const r of candidates) {
  console.log(`  ${r.slug}  [${r.category}]  ${r.model}`);
  console.log(`      상품명: ${r.evidence}`);
  console.log(`      → 이 상품명이 본품인지 직접 읽고, 제조사 공식 페이지로 확인할 것`);
}

const partOnly = results.filter((r) => r.verdict === '부품만');
if (partOnly.length) {
  console.log('\n── 부품 글에만 등장 (본품 근거 아님) ──');
  for (const r of partOnly) console.log(`  ${r.slug}  ${r.model} — ${r.evidence?.slice(0, 60)}`);
}

const partial = results.filter((r) => r.verdict === '부분');
if (partial.length) {
  console.log('\n── 부분 일치 (모델 코드 확인 필요) ──');
  for (const r of partial) console.log(`  ${r.slug}  ${r.model} — ${r.evidence?.slice(0, 60)}`);
}

console.log('\n── 여전히 미확인 ──');
for (const r of results.filter((r) => r.verdict === '미확인')) {
  console.log(`  ${r.slug}  [${r.category}]  ${r.model}`);
}
