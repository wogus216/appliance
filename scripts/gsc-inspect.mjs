#!/usr/bin/env node
// Search Console URL 검사 API로 사이트맵 전체의 색인 상태를 잰다.
//
// 왜 이 스크립트인가 — 색인 생성 요청 버튼은 API가 없다(Indexing API는 구인공고·라이브방송
// 전용). 반면 URL 검사(inspect)는 하루 2,000건까지 열려 있어, "이미 등록된 URL에 요청 할당량을
// 낭비하지 않는다"와 "회차마다 무엇이 색인됐는지 기록한다"는 두 가지를 기계로 할 수 있다.
// docs/index-request-queue.md 의 회차 기록이 '불명'으로 남던 구멍을 이 스냅샷이 메운다.
//
// 사용:
//   GSC_KEY_FILE=~/.config/gsc/service-account.json node scripts/gsc-inspect.mjs
//   node scripts/gsc-inspect.mjs --site sc-domain:allrunabout.com --sitemap https://allrunabout.com/sitemap.xml
//   node scripts/gsc-inspect.mjs --limit 12        # 요청 후보를 12개만 보여 준다(하루 할당량 근사치)
//   node scripts/gsc-inspect.mjs --urls a,b,c      # 사이트맵 대신 URL을 직접 지정
//   node scripts/gsc-inspect.mjs --days 90         # 실적 조회 기간(기본 30일)
//   node scripts/gsc-inspect.mjs --no-perf         # 실적 조회 건너뛰기
//
// 준비(사용자 계정으로 한 번):
//   1. Google Cloud 프로젝트에서 "Google Search Console API" 사용 설정
//   2. 서비스 계정 생성 → JSON 키 다운로드 → 리포 밖(예: ~/.config/gsc/)에 저장
//   3. Search Console 속성(설정 → 사용자 및 권한)에 서비스 계정 이메일을 "전체" 권한으로 추가
//      — URL 검사는 "제한됨" 권한으로는 403이 난다.
//
// 출력: 콘솔 요약 + .audit/gsc/<site>/<YYYY-MM-DD>.json 스냅샷(.audit는 gitignore).
// 이전 스냅샷이 있으면 변화(새로 색인·새로 크롤)를 함께 보여 준다.
//
// 색인 상태(URL 검사)와 실적(노출·클릭)은 서로 다른 질문에 답한다. 2026-09-04에 앞의 것만
// 보고 "한 번도 색인된 적 없다"고 진단했다가, 실적을 재고 나서야 8/17에 **잃은** 것임을
// 알았다. 그래서 두 가지를 한 번에 잰다.
//
// 의존성 없음 — JWT 서명은 node:crypto, HTTP는 전역 fetch(Node 18+).

import { createSign } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';

const args = parseArgs(process.argv.slice(2));
const SITE = args.site ?? 'sc-domain:salimlab.kr';
/** 속성 표기(sc-domain:example.com 또는 https://example.com/)에서 호스트만 뽑아 사이트맵 주소를 만든다 */
const SITEMAP =
  args.sitemap ?? `https://${SITE.replace(/^sc-domain:/, '').replace(/^https?:\/\//, '').replace(/\/.*$/, '')}/sitemap.xml`;
const LIMIT = Number(args.limit ?? 12);
const KEY_FILE = expandHome(process.env.GSC_KEY_FILE ?? '~/.config/gsc/service-account.json');
const CONCURRENCY = Number(args.concurrency ?? 5);
/** 액세스 토큰은 1시간짜리다. 931개 URL을 직렬로 돌리면 그 안에 못 끝나 401이 난다 */
const TOKEN_TTL_MS = 50 * 60 * 1000;

/** 검사 결과의 coverageState를 요청 우선순위로 옮긴다. 낮을수록 먼저 요청한다 */
const REQUEST_PRIORITY = [
  ['URL is unknown to Google', 0, '구글이 모름'],
  ['Discovered - currently not indexed', 1, '발견됨-미색인'],
  ['Crawled - currently not indexed', 2, '크롤됨-미색인'],
];

main().catch((err) => {
  const cause = err.cause ? ` (${err.cause.code ?? ''} ${err.cause.message ?? ''})` : '';
  console.error(`\n오류: ${err.message}${cause}`);
  process.exit(1);
});

async function main() {
  if (!existsSync(KEY_FILE)) {
    throw new Error(
      `서비스 계정 키가 없다: ${KEY_FILE}\n` +
        `  GSC_KEY_FILE 환경변수로 경로를 지정하거나 ~/.config/gsc/service-account.json 에 두세요.`,
    );
  }
  const key = JSON.parse(readFileSync(KEY_FILE, 'utf8'));
  const getToken = tokenSource(key);

  const urls = args.urls ? args.urls.split(',').map((u) => u.trim()) : await sitemapUrls(SITEMAP);
  console.log(`속성 ${SITE} · 대상 ${urls.length}개 URL (${args.urls ? '직접 지정' : SITEMAP})`);

  // 워커 CONCURRENCY개가 공용 커서에서 URL을 하나씩 집어 간다. 결과는 원래 순서 자리에 넣는다.
  const results = new Array(urls.length);
  let cursor = 0;
  let done = 0;
  const worker = async () => {
    for (;;) {
      const i = cursor++;
      if (i >= urls.length) return;
      results[i] = await inspect(getToken, urls[i]);
      done += 1;
      process.stdout.write(`\r  검사 중 ${done}/${urls.length}`);
    }
  };
  await Promise.all(Array.from({ length: Math.max(1, CONCURRENCY) }, worker));
  process.stdout.write('\n');

  const today = localDate();
  // 스팟 체크는 URL 몇 개만 보므로 전체 스냅샷과 비교하면 안 된다. 나머지 URL이 전부
  // 사라진 것처럼 보이고, 슬래시 유무만 달라도 "새로 색인됨"으로 잘못 잡힌다.
  const prev = args.urls ? null : loadPreviousSnapshot(SITE, today);

  // 실적은 색인 상태와 다른 질문에 답한다 — "색인됐나"가 아니라 "검색에 나오고 있나".
  // 2026-09-04에 이걸 안 보고 진단을 냈다가 틀렸다. 색인 1은 한 번도 안 된 게 아니라
  // 8/17에 잃은 것이었고, 그 사실은 노출 데이터에만 있었다.
  const perf = args['no-perf'] ? null : await performance(getToken, Number(args.days ?? 30));

  // --urls 스팟 체크는 사이트 전체가 아니라서 그날의 전체 스냅샷을 덮어쓰면 안 된다.
  if (args.urls) console.log('\n(--urls 스팟 체크라 스냅샷을 남기지 않는다)');
  else saveSnapshot(SITE, today, results, perf);
  report(results, prev, today);
  if (perf) reportPerformance(perf);
}

// ── 인증 ──────────────────────────────────────────────────────────────

/**
 * 토큰을 캐시하고 만료 전에 알아서 다시 받는 함수를 만든다.
 *
 * 931개 URL을 검사하는 데 한 시간이 넘게 걸려 토큰이 중간에 죽은 적이 있다
 * (ACCESS_TOKEN_EXPIRED). 여러 워커가 동시에 갱신을 요청해도 발급은 한 번만 하도록
 * 진행 중인 프라미스를 공유한다.
 */
function tokenSource(key) {
  let token = null;
  let issuedAt = 0;
  let inflight = null;
  return async ({ force = false } = {}) => {
    if (!force && token && Date.now() - issuedAt < TOKEN_TTL_MS) return token;
    if (!inflight) {
      inflight = accessToken(key)
        .then((t) => {
          token = t;
          issuedAt = Date.now();
          return t;
        })
        .finally(() => {
          inflight = null;
        });
    }
    return inflight;
  };
}

/** 서비스 계정 JWT → OAuth2 액세스 토큰 */
async function accessToken(key) {
  const now = Math.floor(Date.now() / 1000);
  const header = b64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const claims = b64url(
    JSON.stringify({
      iss: key.client_email,
      scope: 'https://www.googleapis.com/auth/webmasters.readonly',
      aud: key.token_uri ?? 'https://oauth2.googleapis.com/token',
      iat: now,
      exp: now + 3600,
    }),
  );
  const signer = createSign('RSA-SHA256');
  signer.update(`${header}.${claims}`);
  const sig = b64url(signer.sign(key.private_key));
  const jwt = `${header}.${claims}.${sig}`;

  const res = await fetch(key.token_uri ?? 'https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt,
    }),
  });
  if (!res.ok) throw new Error(`토큰 발급 실패 ${res.status}: ${await res.text()}`);
  return (await res.json()).access_token;
}

// ── 검사 ──────────────────────────────────────────────────────────────

async function inspect(getToken, url, attempt = 0) {
  const res = await fetch('https://searchconsole.googleapis.com/v1/urlInspection/index:inspect', {
    method: 'POST',
    headers: { authorization: `Bearer ${await getToken()}`, 'content-type': 'application/json' },
    body: JSON.stringify({ inspectionUrl: url, siteUrl: SITE, languageCode: 'en-US' }),
  });
  if (res.status === 403) {
    throw new Error(
      `403 — 서비스 계정이 속성 ${SITE}에 없거나 권한이 "제한됨"이다.\n` +
        `  Search Console → 설정 → 사용자 및 권한에서 ${loadEmail()} 을(를) "전체"로 추가하세요.\n` +
        `  도메인 속성이 아니라 URL 접두어 속성이면 --site https://example.com/ 으로 지정하세요.`,
    );
  }
  // 토큰 만료는 갱신해서 한 번 더, 분당 한도는 잠깐 쉬었다 다시. 둘 다 재시도로 넘길 수 있는 실패다.
  if ((res.status === 401 || res.status === 429) && attempt < 4) {
    await getToken({ force: res.status === 401 });
    if (res.status === 429) await sleep(2000 * (attempt + 1));
    return inspect(getToken, url, attempt + 1);
  }
  if (res.status === 429) throw new Error('429 — URL 검사 하루 할당량(2,000) 또는 분당 한도 초과');
  if (!res.ok) throw new Error(`${res.status} ${url}: ${await res.text()}`);
  const idx = (await res.json()).inspectionResult?.indexStatusResult ?? {};
  return {
    url,
    verdict: idx.verdict ?? 'UNKNOWN',
    coverage: idx.coverageState ?? '(none)',
    lastCrawl: idx.lastCrawlTime ?? null,
    robots: idx.robotsTxtState ?? null,
    indexing: idx.indexingState ?? null,
    googleCanonical: idx.googleCanonical ?? null,
    userCanonical: idx.userCanonical ?? null,
  };
}

// ── 실적 ──────────────────────────────────────────────────────────────

/**
 * 노출·클릭을 날짜별·URL별로 가져온다.
 *
 * 구글은 최근 며칠을 확정하지 않는다. 오늘까지 달라고 하면 0이 섞여 들어와
 * "절벽이 생겼다"고 오독하게 된다. 그래서 끝을 3일 앞으로 당긴다.
 */
async function performance(getToken, days) {
  const endDate = shiftDate(localDate(), -3);
  const startDate = shiftDate(endDate, -(days - 1));
  const [byDate, byPage] = await Promise.all([
    searchAnalytics(getToken, { startDate, endDate, dimensions: ['date'] }),
    searchAnalytics(getToken, { startDate, endDate, dimensions: ['page'] }),
  ]);
  return { startDate, endDate, byDate, byPage };
}

async function searchAnalytics(getToken, body, attempt = 0) {
  const res = await fetch(
    `https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(SITE)}/searchAnalytics/query`,
    {
      method: 'POST',
      headers: { authorization: `Bearer ${await getToken()}`, 'content-type': 'application/json' },
      body: JSON.stringify({ rowLimit: 1000, ...body }),
    },
  );
  if ((res.status === 401 || res.status === 429) && attempt < 4) {
    await getToken({ force: res.status === 401 });
    if (res.status === 429) await sleep(2000 * (attempt + 1));
    return searchAnalytics(getToken, body, attempt + 1);
  }
  if (!res.ok) throw new Error(`실적 조회 실패 ${res.status}: ${await res.text()}`);
  return (await res.json()).rows ?? [];
}

function reportPerformance(perf) {
  const { startDate, endDate, byDate, byPage } = perf;
  const impressions = byDate.reduce((n, r) => n + (r.impressions ?? 0), 0);
  const clicks = byDate.reduce((n, r) => n + (r.clicks ?? 0), 0);

  console.log(`\n[실적 ${startDate} ~ ${endDate}] 노출 ${impressions} · 클릭 ${clicks} · 노출된 URL ${byPage.length}개`);
  if (!byDate.length) {
    console.log('  이 기간에 노출이 한 건도 없다.');
    return;
  }

  // 마지막 노출일과 그 뒤 며칠이 0인지 — 절벽을 눈으로 찾지 않아도 되게 한다.
  const withImpressions = byDate.filter((r) => (r.impressions ?? 0) > 0);
  const lastDay = withImpressions.at(-1)?.keys?.[0];
  if (lastDay) {
    const zeroDays = daysBetween(lastDay, endDate);
    console.log(`  마지막 노출: ${lastDay}${zeroDays > 0 ? `  (이후 ${zeroDays}일 연속 0)` : ''}`);
  }

  const recent = byDate.slice(-7);
  console.log('  최근 7일:');
  for (const r of recent) {
    console.log(`    ${r.keys[0]}  노출 ${String(r.impressions ?? 0).padStart(5)} · 클릭 ${r.clicks ?? 0}`);
  }

  const top = [...byPage].sort((a, b) => (b.impressions ?? 0) - (a.impressions ?? 0)).slice(0, 8);
  if (top.length) {
    console.log('  노출 상위 URL:');
    for (const r of top) console.log(`    ${String(r.impressions ?? 0).padStart(5)}  ${r.keys[0]}`);
  }
}

/** 'YYYY-MM-DD' 를 n일 옮긴다. UTC 정오 기준이라 서머타임·시간대에 흔들리지 않는다 */
function shiftDate(date, n) {
  const d = new Date(`${date}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}

function daysBetween(from, to) {
  return Math.round((new Date(`${to}T12:00:00Z`) - new Date(`${from}T12:00:00Z`)) / 86400000);
}

/** 사이트맵 인덱스(sitemapindex)면 하위 사이트맵을 따라 들어가 URL을 모은다 */
async function sitemapUrls(sitemap, depth = 0) {
  const res = await fetch(sitemap);
  if (!res.ok) throw new Error(`사이트맵을 못 읽음 ${res.status}: ${sitemap}`);
  const xml = await res.text();
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
  if (!/<sitemapindex[\s>]/.test(xml)) return locs;
  if (depth > 2) throw new Error(`사이트맵 인덱스가 너무 깊다: ${sitemap}`);
  const nested = [];
  for (const child of locs) nested.push(...(await sitemapUrls(child, depth + 1)));
  return nested;
}

// ── 스냅샷 ────────────────────────────────────────────────────────────

function snapshotDir(site) {
  return join('.audit', 'gsc', site.replace(/[^a-z0-9.-]+/gi, '_'));
}

function saveSnapshot(site, date, results, perf) {
  const dir = snapshotDir(site);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, `${date}.json`), JSON.stringify({ site, date, results, perf }, null, 2));
}

function loadPreviousSnapshot(site, today) {
  const dir = snapshotDir(site);
  if (!existsSync(dir)) return null;
  const files = readdirSync(dir)
    .filter((f) => /^\d{4}-\d{2}-\d{2}\.json$/.test(f) && !f.startsWith(today))
    .sort();
  if (files.length === 0) return null;
  return JSON.parse(readFileSync(join(dir, files.at(-1)), 'utf8'));
}

// ── 보고 ──────────────────────────────────────────────────────────────

function report(results, prev, today) {
  const indexed = results.filter((r) => r.verdict === 'PASS');
  const byCoverage = new Map();
  for (const r of results) byCoverage.set(r.coverage, (byCoverage.get(r.coverage) ?? 0) + 1);

  console.log(`\n[${today}] 색인됨 ${indexed.length} / ${results.length}`);
  for (const [state, n] of [...byCoverage.entries()].sort((a, b) => b[1] - a[1])) {
    console.log(`  ${String(n).padStart(4)}  ${state}`);
  }

  const canonicalMismatch = results.filter(
    (r) => r.googleCanonical && r.userCanonical && r.googleCanonical !== r.userCanonical,
  );
  if (canonicalMismatch.length) {
    console.log(`\n정규 URL 불일치 ${canonicalMismatch.length}건 (구글이 다른 URL을 대표로 골랐다):`);
    for (const r of canonicalMismatch) console.log(`  ${r.url}\n    → 구글: ${r.googleCanonical}`);
  }

  if (prev) {
    const before = new Map(prev.results.map((r) => [r.url, r]));
    const newlyIndexed = results.filter((r) => r.verdict === 'PASS' && before.get(r.url)?.verdict !== 'PASS');
    const newlyCrawled = results.filter((r) => r.lastCrawl && !before.get(r.url)?.lastCrawl);
    const lost = results.filter((r) => r.verdict !== 'PASS' && before.get(r.url)?.verdict === 'PASS');
    console.log(`\n${prev.date} 이후 변화: 새로 색인 ${newlyIndexed.length} · 처음 크롤됨 ${newlyCrawled.length} · 색인 이탈 ${lost.length}`);
    for (const r of newlyIndexed) console.log(`  + ${r.url}`);
    for (const r of lost) console.log(`  - ${r.url}  (${r.coverage})`);
  }

  const candidates = results
    .filter((r) => r.verdict !== 'PASS')
    .map((r) => {
      const p = REQUEST_PRIORITY.find(([state]) => r.coverage.startsWith(state));
      return { ...r, priority: p ? p[1] : 3, label: p ? p[2] : r.coverage };
    })
    .sort((a, b) => a.priority - b.priority);

  console.log(`\n색인 요청 후보 ${candidates.length}개 중 상위 ${Math.min(LIMIT, candidates.length)}개 (구글이 모름 → 발견됨 → 크롤됨 순):`);
  for (const r of candidates.slice(0, LIMIT)) {
    const crawl = r.lastCrawl ? `마지막 크롤 ${r.lastCrawl.slice(0, 10)}` : '크롤 기록 없음';
    console.log(`  [${r.label}] ${r.url}  · ${crawl}`);
  }
  if (candidates.length > LIMIT) {
    console.log(`  … 나머지 ${candidates.length - LIMIT}개는 스냅샷 파일 참조`);
  }
  if (!args.urls) console.log(`\n스냅샷: ${join(snapshotDir(SITE), `${today}.json`)}`);
}

// ── 유틸 ──────────────────────────────────────────────────────────────

function parseArgs(argv) {
  const out = {};
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a.startsWith('--')) {
      const k = a.slice(2);
      const v = argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[++i] : 'true';
      out[k] = v;
    }
  }
  return out;
}

/** 스냅샷 파일명은 로컬 날짜로. UTC를 쓰면 한국 오전이 전날로 기록된다 */
function localDate() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function expandHome(p) {
  return p.startsWith('~') ? join(homedir(), p.slice(1)) : p;
}

function loadEmail() {
  try {
    return JSON.parse(readFileSync(KEY_FILE, 'utf8')).client_email;
  } catch {
    return '(서비스 계정 이메일)';
  }
}

function b64url(input) {
  return Buffer.from(input).toString('base64').replace(/=+$/, '').replace(/\+/g, '-').replace(/\//g, '_');
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}
