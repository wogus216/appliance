// SK매직 공식 고객지원 FAQ에서 에러코드 안내를 수집한다.
//
// 왜 이걸 만들었나 — 2026-09-16 네이버 검색어 역추적에서 우리에게 없는 코드가 드러났다.
// "sk매직 식기세척기 f3"(4클릭·38노출)를 비롯해 정수기 쪽 질의 여러 개가 우리 데이터에
// 대응하는 항목이 없었다. 그런데 SK매직은 코드별 FAQ를 공개하고 있고 조회수까지 보인다
// ([F3, F5] 10,575회). 매뉴얼 PDF를 뒤지는 것보다 여기가 정확하고 빠르다.
//
// ⚠️ 여기서 뽑은 텍스트를 그대로 사이트에 옮기지 않는다. 남의 문서를 복사하는 일이 되고,
//    우리 페이지의 값어치도 사라진다. 코드가 실재하는지·무엇을 뜻하는지 확인하는 근거로
//    쓰고, 문장은 우리가 쓴다. 인용할 때는 출처 URL을 error-code-editorial.ts에 남긴다.
//
// 실행: ego-browser nodejs < scripts/collect-skmagic-faq.mjs
//       (설정은 래퍼가 주입한다 — collect-skmagic-faq.sh)

const CFG = globalThis.__SKMAGIC_FAQ__ ?? {};
const OUT_DIR = CFG.outDir ?? '.audit/skmagic-faq';
/** 제품군 코드: 01=정수기(WPU), 04=주방가전(DWA 식기세척기) */
const TARGETS = CFG.targets ?? [
  { label: '식기세척기', prdCd: '04', subPrdCd: 'DWA' },
  { label: '정수기', prdCd: '01', subPrdCd: 'WPU' },
];
const QUERY = CFG.query ?? '에러';

const { mkdir, writeFile } = await import('node:fs/promises');
const { join } = await import('node:path');

const task = await taskSpace('SK매직 FAQ 수집');
const page = task.page('p1');

/** 펼쳐진 답변 본문을 찾는다. 코드 문자를 담은 블록 중 가장 작은 것이 답변 영역이다 */
const readAnswer = (needle) =>
  page.evaluate((key) => {
    const cands = [...document.querySelectorAll('div,dd,section')]
      .filter((e) => e.textContent.includes(key) && e.textContent.length > 80 && e.textContent.length < 4000);
    cands.sort((a, b) => a.textContent.length - b.textContent.length);
    return cands.at(-1)?.innerText.replace(/\n{2,}/g, '\n').trim() ?? null;
  }, needle);

const results = [];

for (const target of TARGETS) {
  const url =
    `https://service.skmagic.com/web/easy/easyMain.do?tabIndex=0` +
    `&selectedPrdCd=${target.prdCd}&selectedSubPrdCd=${target.subPrdCd}`;
  await page.goto(url);
  await page.waitForLoadState();
  await page.waitForTimeout(3000);

  await page.fill('#searchKeyword', QUERY);
  await page.press('#searchKeyword', 'Enter');
  await page.waitForTimeout(4000);

  // 쪽수를 센다. 목록은 15개씩 나뉜다.
  const pageCount = await page.evaluate(() => {
    const nums = [...document.querySelectorAll('a,button,li,span')]
      .map((e) => e.textContent.trim())
      .filter((t) => /^[0-9]{1,2}$/.test(t))
      .map(Number);
    return nums.length ? Math.min(Math.max(...nums), 12) : 1;
  });

  console.log(`\n[${target.label}] "${QUERY}" 검색 · ${pageCount}쪽`);

  for (let p = 1; p <= pageCount; p++) {
    if (p > 1) {
      const moved = await page.evaluate((n) => {
        const btn = [...document.querySelectorAll('a,button,li,span')].find(
          (e) => e.children.length === 0 && e.textContent.trim() === String(n),
        );
        if (!btn) return false;
        (btn.closest('a,button,li') ?? btn).click();
        return true;
      }, p);
      if (!moved) break;
      await page.waitForTimeout(2500);
    }

    // 이 쪽의 FAQ 제목을 모은다. 코드가 대괄호로 들어간 것만 본다 — 코드 안내가 목적이다.
    const titles = await page.evaluate(() =>
      [...document.querySelectorAll('a.contetns_link')]
        .map((a) => a.textContent.replace(/\s+/g, ' ').trim())
        .filter((t, i, arr) => t && arr.indexOf(t) === i),
    );

    for (const title of titles) {
      const codeMatch = title.match(/\[([A-Za-z0-9,\s]+)\]\s*(표시|문구)/);
      if (!codeMatch) continue;

      const opened = await page.evaluate((t) => {
        const link = [...document.querySelectorAll('a.contetns_link')].find(
          (a) => a.textContent.replace(/\s+/g, ' ').trim() === t,
        );
        if (!link) return false;
        link.click();
        return true;
      }, title);
      if (!opened) continue;

      await page.waitForTimeout(1800);
      const codeKey = codeMatch[1].split(',')[0].trim();
      const answer = await readAnswer(codeKey);
      results.push({ category: target.label, title, codes: codeMatch[1], answer });
      console.log(`  ${answer ? '○' : '✗'} ${title.slice(0, 55)}`);

      // 아코디언을 닫아 다음 항목 탐색이 헷갈리지 않게 한다
      await page.evaluate((t) => {
        const link = [...document.querySelectorAll('a.contetns_link')].find(
          (a) => a.textContent.replace(/\s+/g, ' ').trim() === t,
        );
        link?.click();
      }, title);
      await page.waitForTimeout(600);
    }
  }
}

await task.finish({ keep: [] });

await mkdir(OUT_DIR, { recursive: true });
const path = join(OUT_DIR, 'faq.json');
await writeFile(path, JSON.stringify(results, null, 2));

console.log(`\n수집 ${results.length}건 · 답변 확보 ${results.filter((r) => r.answer).length}건`);
console.log(`저장: ${path}`);
for (const r of results) {
  console.log(`\n──── [${r.category}] ${r.codes} ────`);
  console.log((r.answer ?? '(답변 못 읽음)').slice(0, 420));
}
