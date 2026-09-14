// 공개 보류된 제품의 모델번호를 **제조사 공식 페이지**에서 확인한다.
//
// 왜 다나와가 아니라 여기인가 — 2026-09-14 재조회에서 다나와로는 40개 중 복구 후보가
// 0개였다. 이 제품들은 단종·렌탈전용이라 유통 DB에 안 잡히는 것이지 실재하지 않는 것이
// 아닐 수 있다. unverified.ts 주석도 복구 조건으로 **제조사 공식 페이지**를 요구한다.
//
// 판정 방법(대조군으로 검증함):
//   확인된 모델 T873MEE111 → HTTP 200 · HTML 1.5MB · 본문에 모델번호 · title에 제품명
//   미확인 모델 FW25ESWHS  → HTTP 404 · HTML 3KB  · title이 '@@pageTitle'(템플릿 미치환)
// 상태코드만 보지 않는다. 소프트 리다이렉트가 200을 주는 사례를 이 프로젝트가 이미 겪었다
// (kr.roborock.com, 2026-09-05). **본문에 모델번호가 실재하는지**까지 본다.
//
// 사용: npx tsx scripts/check-maker-pages.mts [--brand LG] [--delay MS]

import { allCatalogAppliances } from '../src/lib/data/appliances/index';
import { UNVERIFIED_SLUGS } from '../src/lib/data/appliances/unverified';

const args = new Map<string, string>();
for (let i = 2; i < process.argv.length; i += 2) {
  args.set(process.argv[i].replace(/^--/, ''), process.argv[i + 1]);
}
const BRAND = args.get('brand');
const DELAY = Number(args.get('delay') ?? 1200);

const UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36';

/**
 * 브랜드별 공식 사이트의 제품 경로 후보.
 *
 * 카테고리별 경로가 사이트마다 다르고 우리 카테고리명과 1:1이 아니라, 후보를 차례로
 * 두드린다. 400/404가 정상 응답이므로 실패해도 다음 후보로 넘어간다.
 */
const LG_PATHS: Record<string, string[]> = {
  에어컨: ['air-conditioners', 'air-conditioner'],
  제습기: ['dehumidifiers', 'air-care', 'dehumidifier'],
  세탁기: ['washing-machines'],
  건조기: ['dryers', 'washing-machines'],
  냉장고: ['refrigerators'],
  식기세척기: ['dishwashers', 'kitchen-appliances'],
  공기청정기: ['air-care', 'air-purifiers', 'puricare'],
  선풍기: ['air-care', 'fans', 'air-conditioners'],
  정수기: ['water-purifiers', 'puricare'],
  로봇청소기: ['vacuum-cleaners'],
};

interface Probe {
  url: string;
  status: number;
  bytes: number;
  hasModel: boolean;
  title: string;
}

async function probe(url: string, model: string): Promise<Probe> {
  const res = await fetch(url, { headers: { 'user-agent': UA, 'accept-language': 'ko-KR,ko;q=0.9' } });
  const html = await res.text();
  const titleMatch = html.match(/<title>([\s\S]*?)<\/title>/);
  return {
    url: res.url,
    status: res.status,
    bytes: html.length,
    // 하이픈·슬래시가 표기마다 달라 정규화해서 본다
    hasModel: html.toUpperCase().replace(/[\s\-/_.]/g, '').includes(model.toUpperCase().replace(/[\s\-/_.]/g, '')),
    title: titleMatch ? titleMatch[1].replace(/\s+/g, ' ').trim() : '',
  };
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/** 대조군 — 이 방법이 살아 있는지 먼저 확인한다. 안 잡히면 결과 전체를 믿을 수 없다 */
async function controlCheck(): Promise<boolean> {
  const p = await probe('https://www.lge.co.kr/refrigerators/t873mee111', 'T873MEE111');
  const ok = p.status === 200 && p.hasModel;
  console.log(
    `대조군 T873MEE111 → HTTP ${p.status} · ${p.bytes}B · 모델번호 ${p.hasModel ? '있음' : '없음'} → ${ok ? 'OK' : '❌ 방법이 죽었다'}`,
  );
  return ok;
}

const targets = allCatalogAppliances
  .filter((a) => UNVERIFIED_SLUGS.has(a.slug))
  .filter((a) => !BRAND || a.brand === BRAND);

if (!(await controlCheck())) {
  console.error('\n대조군이 잡히지 않는다. 사이트 구조가 바뀌었을 수 있다 — 결과를 내지 않는다.');
  process.exit(1);
}

console.log(`\n대상 ${targets.length}개${BRAND ? ` (브랜드 ${BRAND})` : ''}\n`);

const found: { slug: string; model: string; url: string; title: string }[] = [];
const notFound: { slug: string; model: string; category: string; tried: number }[] = [];

for (const [i, a] of targets.entries()) {
  const paths = LG_PATHS[a.category] ?? [];
  const model = a.modelNumber.toLowerCase().replace(/\/.*$/, '');
  process.stdout.write(`  ${i + 1}/${targets.length} ${a.modelNumber} [${a.category}] … `);

  let hit: Probe | null = null;
  for (const path of paths) {
    try {
      const p = await probe(`https://www.lge.co.kr/${path}/${model}`, a.modelNumber);
      if (p.status === 200 && p.hasModel) {
        hit = p;
        break;
      }
    } catch {
      /* 다음 경로로 */
    }
    await sleep(300);
  }

  if (hit) {
    found.push({ slug: a.slug, model: a.modelNumber, url: hit.url, title: hit.title });
    console.log(`✅ ${hit.title.slice(0, 60)}`);
  } else {
    notFound.push({ slug: a.slug, model: a.modelNumber, category: a.category, tried: paths.length });
    console.log(`— (경로 ${paths.length}개 시도, 모두 실패)`);
  }
  if (i < targets.length - 1) await sleep(DELAY);
}

console.log(`\n── 집계 ── 공식 페이지 확인 ${found.length} / 미확인 ${notFound.length}`);

if (found.length) {
  console.log('\n── 복구 후보 (공식 페이지에 모델번호 실재) ──');
  for (const f of found) {
    console.log(`  ${f.slug}`);
    console.log(`      ${f.model} — ${f.url}`);
    console.log(`      ${f.title}`);
  }
}

if (notFound.length) {
  console.log('\n── 공식 페이지에서 찾지 못함 ──');
  for (const n of notFound) console.log(`  ${n.slug}  [${n.category}]  ${n.model}`);
}
