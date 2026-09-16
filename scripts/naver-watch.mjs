// 네이버 서치어드바이저의 노출·클릭을 긁어 스냅샷으로 남기고 지난번과 대조한다.
//
// 왜 브라우저인가 — 서치어드바이저 API 키가 없다. 화면에서 읽는 수밖에 없고,
// 사용자가 이미 로그인해 둔 세션을 ego-browser가 그대로 쓴다.
//
// 왜 이게 필요한가 — 2026-09-16 실측에서 네이버 30일 노출 7,500·클릭 160,
// 같은 기간 구글은 노출 25·클릭 0이었다. 300배다. 그런데 매일 도는 감시
// (gsc-watch.sh)는 구글만 본다. 움직이는 쪽을 안 보고 있었다.
//
// 실행:  ego-browser nodejs < scripts/naver-watch.mjs
//        SITE=https://allrunabout.com ego-browser nodejs < scripts/naver-watch.mjs
//
// ⚠️ 경로를 추측하지 말 것. console/site/{content,crawl,search,exposure,diagnosis}는
//    전부 404다. 리포트의 실제 경로는 console/site/report/expose 이고, 요약 화면의
//    '자세히 보기' 앵커를 눌러야 알 수 있었다.

// 설정은 래퍼(naver-watch.sh)가 이 파일 앞에 붙여서 넣는다.
//
// 환경변수로 넘기려다 실패했다 — ego-browser 의 node 프로세스는 부모 셸의 env 도,
// 작업 디렉터리도 물려받지 않는다. export 해도 기본값이 쓰였고 상대 경로 mkdir 이
// ENOENT 로 죽었다. 그래서 절대 경로를 코드로 주입한다.
const CFG = globalThis.__NAVER_WATCH__ ?? {};
const SITE = CFG.site ?? 'https://salimlab.kr';
const OUT_DIR = CFG.outDir ?? '.audit/naver';

const { mkdir, readdir, readFile, writeFile } = await import('node:fs/promises');
const { join } = await import('node:path');

/** 로컬 날짜. UTC로 찍으면 한국 시간 오전 9시가 전날로 기록된다 */
function localDate() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

const task = await taskSpace('네이버 노출·클릭 감시');
const page = task.page('p1');

const url = `https://searchadvisor.naver.com/console/site/report/expose?site=${encodeURIComponent(SITE)}`;
await page.goto(url);
await page.waitForLoadState();
// 표가 비동기로 채워진다. 웹문서 표의 첫 행이 생길 때까지 기다린다 —
// 고정 지연을 쓰면 느린 날 빈 표를 '수치 0'으로 기록하게 된다.
try {
  await page.waitForFunction(
    () => /salimlab\.kr|allrunabout\.com|https?:\/\//.test(document.body.innerText) &&
          document.querySelectorAll('table tr').length > 3,
    undefined,
    { timeout: 30_000 },
  );
} catch {
  console.error('표가 채워지지 않았다. 로그인이 풀렸거나 화면 구조가 바뀌었을 수 있다.');
  await task.finish({ keep: [] });
  process.exit(1);
}

const data = await page.evaluate(() => {
  const text = document.body.innerText;

  // 요약 카드는 '1.6백'·'7.5천' 같은 축약 표기라 그대로는 합계로 못 쓴다.
  // 원문을 그대로 남겨 두고, 정확한 수치는 아래 표에서 더한다.
  const pick = (label) => {
    const m = text.match(new RegExp(label + '\\s*\\n\\s*([0-9.,가-힣]+)'));
    return m ? m[1].trim() : null;
  };

  // 표를 행 단위로 읽는다. 키워드 표와 웹문서 표가 같은 구조라 헤더로 구분한다.
  const tables = [...document.querySelectorAll('table')].map((t) => ({
    head: (t.querySelector('tr')?.innerText ?? '').replace(/\s+/g, ' ').trim(),
    rows: [...t.querySelectorAll('tr')]
      .slice(1)
      .map((tr) => [...tr.querySelectorAll('td')].map((td) => td.innerText.replace(/\s+/g, ' ').trim()))
      .filter((cells) => cells.length >= 4),
  }));

  const parseRows = (rows) =>
    rows
      .map((c) => ({
        name: c[1],
        clicks: Number(String(c[2]).replace(/,/g, '')) || 0,
        impressions: Number(String(c[3]).replace(/,/g, '')) || 0,
      }))
      .filter((r) => r.name);

  const kwTable = tables.find((t) => /검색 키워드/.test(t.head)) ?? tables[0];
  const docTable = tables.find((t) => /웹문서/.test(t.head)) ?? tables[1];

  return {
    updatedLabel: (text.match(/최근 업데이트[:\s]*([\d.]+)/) ?? [])[1] ?? null,
    summary: { clicks: pick('최근 총 클릭'), impressions: pick('최근 총 노출'), ctr: pick('평균 CTR') },
    keywords: parseRows(kwTable?.rows ?? []),
    documents: parseRows(docTable?.rows ?? []),
  };
});

await task.finish({ keep: [] });

const today = localDate();
const dir = join(OUT_DIR, SITE.replace(/https?:\/\//, '').replace(/[^\w.-]/g, '_'));
await mkdir(dir, { recursive: true });

const snapshot = { site: SITE, date: today, ...data };
await writeFile(join(dir, `${today}.json`), JSON.stringify(snapshot, null, 2));

// ── 보고 ──
const docClicks = data.documents.reduce((n, d) => n + d.clicks, 0);
const docImps = data.documents.reduce((n, d) => n + d.impressions, 0);

console.log(`\n[${today}] 네이버 ${SITE}  (서치어드바이저 업데이트 ${data.updatedLabel ?? '불명'})`);
console.log(
  `요약 카드: 클릭 ${data.summary.clicks ?? '?'} · 노출 ${data.summary.impressions ?? '?'} · CTR ${data.summary.ctr ?? '?'}` +
    `   ← 축약 표기라 추세용`,
);
console.log(`웹문서 TOP ${data.documents.length} 합계: 클릭 ${docClicks} · 노출 ${docImps}`);

console.log('\n상위 웹문서:');
for (const d of data.documents.slice(0, 10)) {
  console.log(`  ${String(d.clicks).padStart(4)} 클릭 · ${String(d.impressions).padStart(6)} 노출  ${d.name}`);
}

console.log('\n상위 검색어:');
for (const k of data.keywords.slice(0, 10)) {
  console.log(`  ${String(k.clicks).padStart(4)} 클릭 · ${String(k.impressions).padStart(6)} 노출  ${k.name}`);
}

// 이전 스냅샷과 대조. 같은 날 것은 제외한다 — 하루에 두 번 돌려도 자기 자신과 비교하지 않는다.
const files = (await readdir(dir)).filter((f) => /^\d{4}-\d{2}-\d{2}\.json$/.test(f) && !f.startsWith(today)).sort();
if (files.length === 0) {
  console.log('\n(첫 스냅샷이라 대조할 상대가 없다)');
} else {
  const prev = JSON.parse(await readFile(join(dir, files.at(-1)), 'utf8'));
  const before = new Map(prev.documents.map((d) => [d.name, d]));
  const now = new Map(data.documents.map((d) => [d.name, d]));

  const appeared = data.documents.filter((d) => !before.has(d.name));
  const gone = prev.documents.filter((d) => !now.has(d.name));
  const prevClicks = prev.documents.reduce((n, d) => n + d.clicks, 0);

  const delta = docClicks - prevClicks;
  console.log(
    `\n${prev.date} 이후 변화: 클릭 합계 ${prevClicks} → ${docClicks} (${delta >= 0 ? '+' : ''}${delta})` +
      ` · 새로 진입 ${appeared.length} · 이탈 ${gone.length}`,
  );
  for (const d of appeared.slice(0, 8)) console.log(`  + ${d.name} (클릭 ${d.clicks})`);
  for (const d of gone.slice(0, 8)) console.log(`  - ${d.name} (이전 클릭 ${d.clicks})`);
}

console.log(`\n스냅샷: ${join(dir, `${today}.json`)}`);
