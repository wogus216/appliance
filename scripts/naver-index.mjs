// 사이트맵의 URL이 네이버에 실제로 색인돼 있는지 한 건씩 확인한다.
//
// 왜 필요한가 — naver-watch.mjs 는 "노출을 받은 상위 30개"만 보여 준다. 그래서
// 2026-09-17에 "색인된 페이지가 총 몇 개냐"는 질문에 답하지 못했다. 노출 0인 페이지가
// 색인이 안 된 것인지, 색인은 됐는데 순위가 낮아 안 나오는 것인지 구분할 수 없었다.
// 서치어드바이저의 '수집 현황'은 차트뿐이라 수치가 텍스트로 나오지 않는다.
// 그래서 검색 결과를 직접 본다 — **색인의 정의를 "검색하면 나온다"로 잡는다.**
//
// 실행:  bash scripts/naver-index.sh
//        LIMIT=10 bash scripts/naver-index.sh            # 빠른 확인
//        ONLY=/error-codes bash scripts/naver-index.sh   # 경로 접두사만
//
// ⚠️ 사용자가 네이버에 로그인해 둔 ego-browser 세션을 쓴다.

// 설정은 래퍼(naver-index.sh)가 이 파일 앞에 붙여서 넣는다.
// env 도 cwd 도 물려받지 못하기 때문이다 — naver-watch.mjs 와 같은 이유다.
const CFG = globalThis.__NAVER_INDEX__ ?? {};
const SITE = CFG.site ?? 'https://salimlab.kr';
const OUT_DIR = CFG.outDir ?? '.audit/naver-index';
const SITEMAP = CFG.sitemap ?? `${SITE.replace(/\/$/, '')}/sitemap.xml`;
const LIMIT = Number(CFG.limit) || 0;
const ONLY = CFG.only ?? '';
const DELAY_MS = Number(CFG.delayMs) || 2500;

const HOST = new URL(SITE).hostname;

const { mkdir, readdir, readFile, writeFile } = await import('node:fs/promises');
const { join } = await import('node:path');

/** 로컬 날짜. UTC로 찍으면 한국 시간 오전이 전날로 기록된다 */
function localDate() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

/** 비교용 정규화. 사이트맵은 `https://salimlab.kr`, 네이버는 `https://salimlab.kr/`로 준다 */
const norm = (u) => String(u).replace(/^https?:\/\//, '').replace(/\/+$/, '');

/** 사이트맵 인덱스면 하위를 따라 들어간다 (gsc-inspect.mjs 와 같은 규칙) */
async function sitemapUrls(sitemap, depth = 0) {
  const res = await fetch(sitemap);
  if (!res.ok) throw new Error(`사이트맵을 못 읽음 ${res.status}: ${sitemap}`);
  const xml = await res.text();
  const locs = [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map((m) => m[1]);
  if (!/<sitemapindex[\s>]/.test(xml)) return locs;
  if (depth > 2) throw new Error(`사이트맵 인덱스가 너무 깊다: ${sitemap}`);
  const nested = [];
  for (const child of locs) nested.push(...(await sitemapUrls(child, depth + 1)));
  return nested;
}

// ── 대조군 ──
//
// 네이버가 우리를 차단하면 모든 질의가 "결과 없음"으로 돌아온다. 그걸 그대로 적으면
// **도구의 침묵을 색인의 부재로** 읽게 된다. 2026-09-16에 정확히 그 함정을 밟았다.
// 그래서 확실히 잡혀야 하는 URL 과 절대 없는 URL 을 주기적으로 섞어 넣고,
// 양성이 무너지면 수치를 기록하지 않고 종료한다.
const POSITIVE = CFG.positive ?? `${SITE.replace(/\/$/, '')}/error-codes/SKMagic`;
const NEGATIVE = `${SITE.replace(/\/$/, '')}/error-codes/__NoSuchBrandXyz__`;
const CONTROL_EVERY = Number(CFG.controlEvery) || 40;

const task = await taskSpace('네이버 색인 확인');
const page = task.page('p1');

/**
 * 검색 결과 화면으로 이동한다.
 *
 * ⚠️ goto 의 타임아웃을 실패로 취급하면 안 된다. 한 번 느린 페이지 때문에 123건 스윕이
 *    통째로 죽은 적이 있다(2026-09-17). 게다가 그 예외 메시지 자체가 "navigation
 *    committed … readyState=loading" 이다 — 화면은 이미 우리 것이고 load 이벤트만 늦었다.
 *    그래서 여기서는 삼키고, 내용이 실제로 왔는지는 아래 readResult 의 `loaded` 로 본다.
 */
async function gotoSearch(query) {
  const url = `https://search.naver.com/search.naver?query=${encodeURIComponent(query)}`;
  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45_000 });
  } catch {
    /* 아래에서 내용으로 판단한다 */
  }
  try {
    await page.waitForLoadState();
  } catch {
    /* 같은 이유 */
  }
  await page.waitForTimeout(DELAY_MS);
}

/**
 * 판정은 "결과 없음 문구"가 아니라 **대상 URL 이 결과 링크에 있는지**로 한다.
 *
 * ⚠️ 도메인 문자열 매칭은 못 쓴다 — 쇼핑·사전·지도·지식iN 링크가 질의 문자열 안에
 *    도메인을 담고 있어서 미색인 URL 에서도 무조건 4건이 잡힌다. hostname 으로 거른다.
 */
function readResult(target, query) {
  return page.evaluate(
    ({ host, want, q }) => {
      const text = document.body.innerText;
      const own = [
        ...new Set(
          [...document.querySelectorAll('a[href]')]
            .map((a) => {
              try {
                return new URL(a.href);
              } catch {
                return null;
              }
            })
            .filter((u) => u && u.hostname === host)
            .map((u) => (u.origin + u.pathname).replace(/\/+$/, '')),
        ),
      ];
      const strip = (s) => s.replace(/^https?:\/\//, '').replace(/\/+$/, '');
      const wanted = strip(want);
      // ⚠️ 지금 열린 화면이 **이 질의의** 결과인지 먼저 본다. goto 를 try/catch 로 삼키기
      //    때문에, 이동이 조용히 실패하면 직전 URL 의 결과를 그대로 읽어 엉뚱한 판정을 낸다.
      const onQuery = new URLSearchParams(location.search).get('query') === q;

      return {
        // 화면이 실제로 이 질의의 검색 결과인지. 빈 화면을 '결과 없음'으로 읽지 않기 위한 관문.
        loaded: onQuery && !!document.querySelector('#main_pack, #container') && text.trim().length > 80,
        onQuery,
        hit: own.some((u) => strip(u) === wanted),
        hitLoose: own.some((u) => strip(u).toLowerCase() === wanted.toLowerCase()),
        ownLinks: own.map(strip),
        emptyNotice: /검색결과가 없습니다|검색 결과가 없습니다|찾을 수 없습니다/.test(text),
        // 차단·캡차는 '결과 없음'과 화면이 다르다. 나중에 원인을 가릴 수 있게 남긴다.
        blockedHint: /비정상적인|자동 입력 방지|로봇이 아닙니다|captcha/i.test(text),
      };
    },
    { host: HOST, want: target, q: query },
  );
}

/**
 * URL 하나를 네이버에 물어본다. 실패는 `ok:false` 로 돌려준다.
 *
 * ⚠️ **확인 실패를 미색인으로 적지 않는다.** 둘은 다른 사실이고, 섞으면 도구의 침묵을
 *    색인의 부재로 읽게 된다. 호출자는 ok:false 를 'unknown' 으로 따로 센다.
 */
async function ask(target, attempts = 3) {
  const query = `site:${norm(target)}`;
  for (let a = 1; a <= attempts; a++) {
    await gotoSearch(query);
    const r = await readResult(target, query).catch(() => null);
    if (r?.loaded) return { ...r, ok: true, attempts: a };
    await page.waitForTimeout(3000 * a);
  }
  return { ok: false, hit: false, hitLoose: false, ownLinks: [], emptyNotice: false, blockedHint: false, attempts };
}

/** 대조군 한 벌. 양성이 죽거나 화면을 못 읽으면 false */
async function runControls(where) {
  const pos = await ask(POSITIVE);
  const neg = await ask(NEGATIVE);
  const ok = pos.ok && neg.ok && pos.hit && !neg.hit;
  console.log(
    `  [대조군 ${where}] 양성=${pos.ok ? (pos.hit ? '잡힘' : '놓침') : '화면못읽음'} · ` +
      `음성=${neg.ok ? (neg.hit ? '잘못잡힘' : '정상') : '화면못읽음'}` +
      `${pos.blockedHint || neg.blockedHint ? ' · ⚠️차단화면 감지' : ''}`,
  );
  return { ok, pos, neg, where };
}

// ── 본 측정 ──
let urls = await sitemapUrls(SITEMAP);
const totalInSitemap = urls.length;
if (ONLY) urls = urls.filter((u) => new URL(u).pathname.startsWith(ONLY));
if (LIMIT) urls = urls.slice(0, LIMIT);

console.log(`사이트맵 ${totalInSitemap}개 중 ${urls.length}개를 확인한다 (${SITEMAP})`);
console.log(`질의 형태: site:<url> · 간격 ${DELAY_MS}ms · 대조군 ${CONTROL_EVERY}건마다`);

const controls = [];
const first = await runControls('시작');
controls.push(first);
if (!first.ok) {
  console.error('\n대조군이 시작부터 실패했다. 수치를 기록하지 않고 멈춘다.');
  console.error('→ 네이버 로그인이 풀렸거나, 차단됐거나, 화면 구조가 바뀌었다.');
  await task.finish({ keep: [] });
  process.exit(1);
}

const MARK = { indexed: '○', 'indexed-case': '○', missing: '✗', unknown: '?' };
const results = [];
for (const [i, u] of urls.entries()) {
  const r = await ask(u);
  // ok:false 는 '색인 안 됨'이 아니라 '확인 못 함'이다. 셋을 구분해서 센다.
  const status = !r.ok ? 'unknown' : r.hit ? 'indexed' : r.hitLoose ? 'indexed-case' : 'missing';
  results.push({
    url: u,
    status,
    emptyNotice: r.emptyNotice,
    attempts: r.attempts,
    otherLinks: r.hit ? [] : r.ownLinks.slice(0, 3),
  });
  console.log(`  ${String(i + 1).padStart(3)}/${urls.length}  ${MARK[status]}  ${norm(u)}`);

  if ((i + 1) % CONTROL_EVERY === 0 && i + 1 < urls.length) {
    const c = await runControls(`${i + 1}건째`);
    controls.push(c);
    if (!c.ok) {
      console.error(`\n${i + 1}건째에서 대조군이 무너졌다. 이후 결과를 믿을 수 없어 멈춘다.`);
      console.error(`→ 여기까지 ${results.length}건만 스냅샷에 남기고, 부분 결과임을 표시한다.`);
      break;
    }
  }
}

const last = await runControls('종료');
controls.push(last);
const trustworthy = controls.every((c) => c.ok);

await task.finish({ keep: [] });

// ── 기록 ──
const today = localDate();
const dir = join(OUT_DIR, HOST);
await mkdir(dir, { recursive: true });

const snapshot = {
  site: SITE,
  date: today,
  sitemap: SITEMAP,
  // 측정 사양을 스냅샷 안에 박아 둔다. 나중에 값을 비교할 때 모집단이 같은지 보려면 필요하다.
  spec: {
    method: '네이버 통합검색 site:<url> · ego-browser 사용자 세션',
    definition: '색인 = 검색 결과에 그 URL 이 링크로 나온다',
    delayMs: DELAY_MS,
    filter: ONLY || null,
    limit: LIMIT || null,
    urlsInSitemap: totalInSitemap,
    urlsChecked: results.length,
    partial: results.length < urls.length,
  },
  controls: controls.map((c) => ({ where: c.where, positiveHit: c.pos.hit, negativeHit: c.neg.hit, ok: c.ok })),
  trustworthy,
  results,
};
await writeFile(join(dir, `${today}.json`), JSON.stringify(snapshot, null, 2));

// ── 보고 ──
//
// 분모는 **확인에 성공한 건수**다. 확인 못 한 URL 을 미색인에 얹으면 색인율이 낮게 나오고,
// 색인된 쪽에 얹으면 높게 나온다. 어느 쪽도 사실이 아니므로 분모에서 뺀다.
const indexed = results.filter((r) => r.status === 'indexed' || r.status === 'indexed-case');
const missing = results.filter((r) => r.status === 'missing');
const unknown = results.filter((r) => r.status === 'unknown');
const decided = indexed.length + missing.length;
const pct = decided ? ((indexed.length / decided) * 100).toFixed(1) : '0.0';

console.log(`\n[${today}] 네이버 색인 — ${indexed.length}/${decided} (${pct}%)   확인실패 ${unknown.length}건은 분모에서 뺐다`);
if (!trustworthy) console.log('⚠️ 대조군이 한 번이라도 무너졌다. 이 수치는 신뢰할 수 없다.');
if (snapshot.spec.partial) console.log(`⚠️ 부분 측정이다 — 대상 ${urls.length}건 중 ${results.length}건만 확인했다.`);

const bySection = new Map();
for (const r of results) {
  const seg = new URL(r.url).pathname.split('/')[1] || '(홈)';
  const s = bySection.get(seg) ?? { n: 0, ok: 0, unknown: 0 };
  s.n += 1;
  if (r.status === 'indexed' || r.status === 'indexed-case') s.ok += 1;
  if (r.status === 'unknown') s.unknown += 1;
  bySection.set(seg, s);
}
console.log('\n섹션별 (색인/판정된 건, 괄호는 확인실패):');
for (const [seg, s] of [...bySection].sort((a, b) => b[1].n - a[1].n)) {
  const d = s.n - s.unknown;
  const bar = d ? ((s.ok / d) * 100).toFixed(0) : '—';
  console.log(
    `  ${seg.padEnd(16)} ${String(s.ok).padStart(3)}/${String(d).padEnd(3)} ${String(bar).padStart(3)}%` +
      (s.unknown ? `  (확인실패 ${s.unknown})` : ''),
  );
}

if (missing.length) {
  console.log(`\n미색인 ${missing.length}개:`);
  for (const r of missing) console.log(`  ✗ ${norm(r.url)}`);
}
if (unknown.length) {
  console.log(`\n확인실패 ${unknown.length}개 (색인 여부 불명 — 다시 돌릴 것):`);
  for (const r of unknown) console.log(`  ? ${norm(r.url)}`);
}

// 지난번과 대조. 같은 날 것은 뺀다 — 하루에 두 번 돌려도 자기 자신과 비교하지 않는다.
const files = (await readdir(dir)).filter((f) => /^\d{4}-\d{2}-\d{2}\.json$/.test(f) && !f.startsWith(today)).sort();
if (files.length === 0) {
  console.log('\n(첫 스냅샷이라 대조할 상대가 없다)');
} else {
  const prev = JSON.parse(await readFile(join(dir, files.at(-1)), 'utf8'));
  const isIn = (s) => s === 'indexed' || s === 'indexed-case';
  const before = new Map(prev.results.map((r) => [norm(r.url), r.status]));
  // 'unknown' 이 끼면 변동으로 세지 않는다. 확인 못 한 것은 변한 것이 아니다.
  const gained = results.filter((r) => isIn(r.status) && before.get(norm(r.url)) === 'missing');
  const lost = results.filter((r) => r.status === 'missing' && isIn(before.get(norm(r.url))));
  const prevOk = prev.results.filter((r) => isIn(r.status)).length;
  const prevDecided = prev.results.filter((r) => r.status !== 'unknown').length;
  console.log(`\n${prev.date} 이후: 색인 ${prevOk}/${prevDecided} → ${indexed.length}/${decided}`);
  for (const r of gained) console.log(`  + ${norm(r.url)}`);
  for (const r of lost) console.log(`  - ${norm(r.url)}`);
  if (!gained.length && !lost.length) console.log('  (변동 없음)');
}

console.log(`\n스냅샷: ${join(dir, `${today}.json`)}`);
if (!trustworthy) process.exit(1);
