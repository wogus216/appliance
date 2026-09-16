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

/**
 * 표를 현재 페이지 기준으로 읽는다.
 *
 * 서치어드바이저는 TOP 30을 10개씩 3쪽으로 나눠 보여 준다. 1쪽만 읽으면
 * "상위 10개가 전부"로 착각하게 되는데, 지금 이 사이트에서 하려는 일이
 * 검색어 역추적이라 꼬리 20개가 오히려 중요하다.
 */
const readTables = () =>
  page.evaluate(() => {
    const parseRows = (rows) =>
      rows
        .map((c) => ({
          name: c[1],
          clicks: Number(String(c[2]).replace(/,/g, '')) || 0,
          impressions: Number(String(c[3]).replace(/,/g, '')) || 0,
        }))
        .filter((r) => r.name);

    const tables = [...document.querySelectorAll('table')].map((t) => ({
      head: (t.querySelector('tr')?.innerText ?? '').replace(/\s+/g, ' ').trim(),
      rows: [...t.querySelectorAll('tr')]
        .slice(1)
        .map((tr) => [...tr.querySelectorAll('td')].map((td) => td.innerText.replace(/\s+/g, ' ').trim()))
        .filter((cells) => cells.length >= 4),
    }));

    const kw = tables.find((t) => /검색 키워드/.test(t.head)) ?? tables[0];
    const doc = tables.find((t) => /웹문서/.test(t.head)) ?? tables[1];
    return { keywords: parseRows(kw?.rows ?? []), documents: parseRows(doc?.rows ?? []) };
  });

/**
 * 표 하나를 쪽 끝까지 읽는다.
 *
 * ⚠️ 두 표는 **각자 페이지 버튼을 갖고 있다.** 처음에는 문서 전체에서 '2'를 찾아
 * 눌렀는데, 그러면 먼저 나오는 검색어 표만 넘어가고 웹문서 표는 1쪽에 머문다.
 * 실제로 그 상태로 한 번 수집해서 "웹문서는 상위 10개가 전부"인 줄 알았다.
 * 그래서 표를 감싸면서 페이지 버튼을 가진 가장 가까운 조상을 찾아, 그 안에서만 누른다.
 */
async function readTableAllPages(which) {
  const rows = new Map();
  const absorb = (batch) => {
    for (const r of batch) if (r.name && !rows.has(r.name)) rows.set(r.name, r);
  };

  const pageCount = await page.evaluate((w) => {
    const pick = (t) => (w === 'keywords' ? /검색 키워드/ : /웹문서/).test(t.querySelector('tr')?.innerText ?? '');
    const table = [...document.querySelectorAll('table')].find(pick);
    if (!table) return 1;
    let box = table.parentElement;
    for (let i = 0; i < 6 && box; i++) {
      const nums = [...box.querySelectorAll('a,button,li,span')]
        .filter((e) => e.children.length === 0 && /^[0-9]{1,2}$/.test(e.textContent.trim()))
        .map((e) => Number(e.textContent.trim()));
      if (nums.length >= 2) return Math.min(Math.max(...nums), 12);
      box = box.parentElement;
    }
    return 1;
  }, which);

  for (let p = 1; p <= pageCount; p++) {
    if (p > 1) {
      const moved = await page.evaluate(
        ({ w, n }) => {
          const pick = (t) => (w === 'keywords' ? /검색 키워드/ : /웹문서/).test(t.querySelector('tr')?.innerText ?? '');
          const table = [...document.querySelectorAll('table')].find(pick);
          if (!table) return false;
          let box = table.parentElement;
          for (let i = 0; i < 6 && box; i++) {
            const btns = [...box.querySelectorAll('a,button,li,span')].filter(
              (e) => e.children.length === 0 && /^[0-9]{1,2}$/.test(e.textContent.trim()),
            );
            if (btns.length >= 2) {
              const target = btns.find((e) => e.textContent.trim() === String(n));
              if (!target) return false;
              (target.closest('a,button,li') ?? target).click();
              return true;
            }
            box = box.parentElement;
          }
          return false;
        },
        { w: which, n: p },
      );
      if (!moved) break;
      await page.waitForTimeout(1600);
    }
    const batch = await readTables();
    absorb(batch[which]);
  }

  return { rows: [...rows.values()], pageCount };
}

const kwResult = await readTableAllPages('keywords');
const docResult = await readTableAllPages('documents');
const paged = {
  keywords: kwResult.rows,
  documents: docResult.rows,
  pageCount: Math.max(kwResult.pageCount, docResult.pageCount),
};

const data = await page.evaluate(() => {
  const text = document.body.innerText;

  // 요약 카드는 '1.6백'·'7.5천' 같은 축약 표기라 그대로는 합계로 못 쓴다.
  // 원문을 그대로 남겨 두고, 정확한 수치는 아래 표에서 더한다.
  const pick = (label) => {
    const m = text.match(new RegExp(label + '\\s*\\n\\s*([0-9.,가-힣]+)'));
    return m ? m[1].trim() : null;
  };

  // 표는 readAllPages()가 쪽을 넘겨 가며 이미 모았다. 여기서는 요약 카드만 읽는다.
  return {
    updatedLabel: (text.match(/최근 업데이트[:\s]*([\d.]+)/) ?? [])[1] ?? null,
    summary: { clicks: pick('최근 총 클릭'), impressions: pick('최근 총 노출'), ctr: pick('평균 CTR') },
  };
});

data.keywords = paged.keywords;
data.documents = paged.documents;
data.pagesRead = paged.pageCount;

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

console.log(`\n웹문서 ${data.documents.length}개:`);
for (const d of data.documents) {
  console.log(`  ${String(d.clicks).padStart(4)} 클릭 · ${String(d.impressions).padStart(6)} 노출  ${d.name}`);
}

// 검색어는 전부 찍는다. 꼬리가 콘텐츠 계획의 재료라서 자르면 쓸모가 준다.
console.log(`\n검색어 ${data.keywords.length}개 (${data.pagesRead}쪽 읽음):`);
for (const k of data.keywords) {
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
