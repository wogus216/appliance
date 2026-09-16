// 경동나비엔 자가진단 가이드에서 가스보일러 에러코드를 수집한다.
//
// 경로 찾기에 시간이 걸렸다. kdnavien.co.kr/quickfix/errorCode 는 검색에 남아 있지만
// 전부 404로 리다이렉트되고, 자가진단은 공식몰 navienhouse.com 으로 옮겨져 있다.
// 목록은 /support/guide/list/3210 (가스보일러), 상세는 /support/guide/{id} 다.
//
// 목록의 항목은 <a href="#"> 라 href 로는 id를 알 수 없고 클릭해야 이동한다.
// 그래서 스냅샷 ref 로 하나씩 눌러 URL과 본문을 받는다.
//
// ⚠️ 여기서 받은 문장을 그대로 싣지 않는다. 코드가 실재하는지와 무엇을 뜻하는지 확인하는
//    근거로 쓰고, 설명은 우리가 쓴다.
//
// 실행: ego-browser nodejs < scripts/collect-navien.mjs

const CFG = globalThis.__NAVIEN__ ?? {};
const OUT = CFG.outDir ?? '.audit/navien';
const LIST_URL = 'https://www.navienhouse.com/support/guide/list/3210';

const { mkdir, writeFile } = await import('node:fs/promises');
const { join } = await import('node:path');

const task = await taskSpace('나비엔 에러코드 수집');
const page = task.page('p1');

await page.goto(LIST_URL);
await page.waitForLoadState();
await page.waitForTimeout(4000);

// '에러 관련' 탭으로 좁힌다
await page.evaluate(() => {
  const el = [...document.querySelectorAll('button,a,li,span,div')].find(
    (e) => e.children.length === 0 && e.textContent.trim() === '에러 관련',
  );
  (el?.closest('button,a,li') ?? el)?.click();
});
await page.waitForTimeout(2500);

// 목록을 끝까지 펼친다
for (let i = 0; i < 10; i++) {
  const more = await page.evaluate(() => {
    const el = [...document.querySelectorAll('button,a,div,span')].find(
      (e) => /더보기/.test(e.textContent) && e.children.length <= 2,
    );
    if (!el) return false;
    (el.closest('button,a') ?? el).click();
    return true;
  });
  if (!more) break;
  await page.waitForTimeout(1500);
}

// 코드가 제목에 든 항목만 추린다. 제목 문자열을 키로 삼아 클릭 대상을 다시 찾는다
// — ref 는 페이지가 바뀌면 무효가 되므로 목록으로 돌아올 때마다 새로 잡아야 한다.
const titles = await page.evaluate(() =>
  [...document.querySelectorAll('li a, a')]
    .map((a) => a.textContent.replace(/\s+/g, ' ').trim())
    .filter((t) => /\b(Er|E)\s?\d{2,3}\b/.test(t))
    .map((t) => t.replace(/가스보일러보일러$/, '').trim())
    .filter((t, i, arr) => arr.indexOf(t) === i),
);

console.log(`에러 코드 항목 ${titles.length}개\n`);

const results = [];

for (const [i, title] of titles.entries()) {
  const opened = await page.evaluate((t) => {
    const a = [...document.querySelectorAll('a')].find((x) =>
      x.textContent.replace(/\s+/g, ' ').includes(t.slice(0, 24)),
    );
    if (!a) return false;
    a.click();
    return true;
  }, title);

  if (!opened) {
    console.log(`  ✗ ${title.slice(0, 40)} — 항목을 찾지 못함`);
    continue;
  }

  await page.waitForTimeout(3000);
  const detail = await page.evaluate(() => {
    const txt = document.body.innerText;
    const start = txt.indexOf('자가진단 가이드', txt.indexOf('자가진단 가이드') + 1);
    const end = txt.indexOf('A/S 접수', start);
    return {
      url: location.href,
      body: txt.slice(start > 0 ? start : 0, end > start ? end : start + 2500).trim(),
    };
  });

  results.push({ title, ...detail });
  console.log(`  ${i + 1}/${titles.length} ${title.slice(0, 44)} → ${detail.url.split('/').pop()}`);

  await page.goto(LIST_URL);
  await page.waitForLoadState();
  await page.waitForTimeout(2500);
  await page.evaluate(() => {
    const el = [...document.querySelectorAll('button,a,li,span,div')].find(
      (e) => e.children.length === 0 && e.textContent.trim() === '에러 관련',
    );
    (el?.closest('button,a,li') ?? el)?.click();
  });
  await page.waitForTimeout(1800);
  for (let k = 0; k < 10; k++) {
    const more = await page.evaluate(() => {
      const el = [...document.querySelectorAll('button,a,div,span')].find(
        (e) => /더보기/.test(e.textContent) && e.children.length <= 2,
      );
      if (!el) return false;
      (el.closest('button,a') ?? el).click();
      return true;
    });
    if (!more) break;
    await page.waitForTimeout(1200);
  }
}

await task.finish({ keep: [] });

await mkdir(OUT, { recursive: true });
await writeFile(join(OUT, 'codes.json'), JSON.stringify(results, null, 2));
console.log(`\n수집 ${results.length}건 · 저장: ${join(OUT, 'codes.json')}`);
