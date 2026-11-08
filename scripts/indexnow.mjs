#!/usr/bin/env node
// IndexNow 통지 — 배포로 새로 생기거나 바뀐 URL을 검색엔진에 알린다.
//
// 왜 붙였나 — 2026-11-08 실측에서 10-17 이후 추가한 13페이지 중 네이버 색인은 1개였다
// (도구 페이지는 배포 10일째인데 9개 중 8개가 없음). 네이버는 IndexNow를 직접 받는다
// (searchadvisor.naver.com/guide/indexnow-request). 효과는 검증 전이다 —
// docs/indexnow-2026-11-08.md의 대조 실험으로 판단한다.
// 구글은 IndexNow에 참여하지 않는다. 구글 색인과는 무관하다.
//
// 무엇을 보내나 — 배포 직전 운영 사이트맵과 새 빌드 사이트맵을 비교해
//   새 URL + lastmod가 바뀐 URL + 사라진 URL(삭제 통지).
//   lastmod는 SITE_REVISIONS(본문 변경일)에서 나오므로 "본문이 바뀐 페이지"와 같다.
//
// 어디로 보내나 — 두 곳.
//   api.indexnow.org: Bing 등 참여 엔진이 공유한다.
//   searchadvisor.naver.com/indexnow: 공용 주소에서 네이버로 넘어가는지 확인하지 못해 직접 보낸다.
//
// 사용:
//   배포 워크플로:  node scripts/indexnow.mjs --prev=<배포 전 운영 sitemap.xml> --next=out/sitemap.xml
//   직접 지정:      node scripts/indexnow.mjs --urls=https://salimlab.kr/a,https://salimlab.kr/b
//   조회만:         위 명령에 --dry-run (전송하지 않고 대상 URL만 출력)
//   --prev/--next에는 파일 경로나 https 주소를 줄 수 있다.
//
// 키는 비밀이 아니다 — 프로토콜상 사이트 루트에 public/<키>.txt로 공개해야 검증된다.
// 키를 바꾸면 public/ 아래 파일 이름과 내용도 같이 바꿔야 한다(테스트가 대조한다).

import { readFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

export const SITE = 'https://salimlab.kr';
export const INDEXNOW_KEY = 'b18a7f9ac6b7d9b9b749703729e53f1c';
export const KEY_LOCATION = `${SITE}/${INDEXNOW_KEY}.txt`;
export const ENDPOINTS = [
  { name: 'IndexNow 공용(Bing 등)', url: 'https://api.indexnow.org/indexnow' },
  { name: '네이버', url: 'https://searchadvisor.naver.com/indexnow' },
];
/** 프로토콜 한도: 요청 1회에 URL 10,000개 */
export const BATCH_SIZE = 10_000;

const unescapeXml = (s) =>
  s.replaceAll('&lt;', '<').replaceAll('&gt;', '>').replaceAll('&quot;', '"').replaceAll('&apos;', "'").replaceAll('&amp;', '&');

/** sitemap.xml → Map(loc → lastmod). lastmod가 없으면 빈 문자열. */
export function parseSitemap(xml) {
  const entries = new Map();
  for (const [, body] of xml.matchAll(/<url>([\s\S]*?)<\/url>/g)) {
    const loc = body.match(/<loc>\s*([\s\S]*?)\s*<\/loc>/)?.[1];
    if (!loc) continue;
    const lastmod = body.match(/<lastmod>\s*([\s\S]*?)\s*<\/lastmod>/)?.[1] ?? '';
    entries.set(unescapeXml(loc), lastmod);
  }
  return entries;
}

/** 두 사이트맵의 차이. added·changed는 새 사이트맵 순서, removed는 옛 사이트맵 순서. */
export function diffSitemaps(prev, next) {
  const added = [];
  const changed = [];
  for (const [loc, lastmod] of next) {
    if (!prev.has(loc)) added.push(loc);
    else if (prev.get(loc) !== lastmod) changed.push(loc);
  }
  const removed = [...prev.keys()].filter((loc) => !next.has(loc));
  return { added, changed, removed };
}

/** 이 사이트의 https 주소만 통과시킨다. 하나라도 아니면 전송 전체를 멈춘다. */
export function assertOwnUrls(urls) {
  const host = new URL(SITE).host;
  const bad = urls.filter((u) => {
    try {
      const parsed = new URL(u);
      return parsed.protocol !== 'https:' || parsed.host !== host;
    } catch {
      return true;
    }
  });
  if (bad.length) throw new Error(`이 사이트 주소가 아닌 URL이 있습니다: ${bad.slice(0, 5).join(', ')}`);
}

export function buildPayloads(urls) {
  const payloads = [];
  for (let i = 0; i < urls.length; i += BATCH_SIZE) {
    payloads.push({
      host: new URL(SITE).host,
      key: INDEXNOW_KEY,
      keyLocation: KEY_LOCATION,
      urlList: urls.slice(i, i + BATCH_SIZE),
    });
  }
  return payloads;
}

/** 200 = 수신, 202 = 수신 후 키 검증 대기. 둘 다 색인 보장은 아니다. */
export const isAccepted = (status) => status === 200 || status === 202;

async function readSource(source) {
  if (/^https?:\/\//.test(source)) {
    const res = await fetch(source, { signal: AbortSignal.timeout(30_000) });
    if (!res.ok) throw new Error(`${source} 받기 실패: HTTP ${res.status}`);
    return res.text();
  }
  return readFileSync(source, 'utf8');
}

/** 배포 직후엔 키 파일이 아직 안 보일 수 있어 몇 번 기다린다. 끝내 다르면 전송하지 않는다. */
async function verifyLiveKey({ tries = 6, waitMs = 10_000 } = {}) {
  let last = '';
  for (let i = 1; i <= tries; i++) {
    try {
      const res = await fetch(KEY_LOCATION, { cache: 'no-store', signal: AbortSignal.timeout(15_000) });
      const body = (await res.text()).trim();
      if (res.ok && body === INDEXNOW_KEY) return;
      last = `HTTP ${res.status}, 내용 ${body.slice(0, 40) || '(빈 값)'}`;
    } catch (e) {
      last = e.message;
    }
    if (i < tries) await new Promise((r) => setTimeout(r, waitMs));
  }
  throw new Error(`운영 키 파일이 키와 다릅니다(${KEY_LOCATION}): ${last}`);
}

function arg(name) {
  const hit = process.argv.slice(2).find((a) => a.startsWith(`--${name}=`));
  return hit ? hit.slice(name.length + 3) : undefined;
}

async function main() {
  const dryRun = process.argv.includes('--dry-run');
  const urlsArg = arg('urls');
  const prevArg = arg('prev');
  const nextArg = arg('next');

  let urls;
  if (urlsArg) {
    urls = urlsArg.split(',').map((u) => u.trim()).filter(Boolean);
    console.log(`IndexNow: 직접 지정 ${urls.length}개`);
  } else if (prevArg && nextArg) {
    const { added, changed, removed } = diffSitemaps(
      parseSitemap(await readSource(prevArg)),
      parseSitemap(await readSource(nextArg)),
    );
    urls = [...added, ...changed, ...removed];
    console.log(`IndexNow: 새 URL ${added.length} · lastmod 변경 ${changed.length} · 삭제 ${removed.length}`);
  } else {
    throw new Error('--urls=... 또는 --prev=... --next=... 를 주세요.');
  }

  urls = [...new Set(urls)];
  assertOwnUrls(urls);
  if (!urls.length) {
    console.log('통지할 URL이 없습니다.');
    return;
  }
  if (dryRun) {
    console.log(urls.join('\n'));
    return;
  }

  await verifyLiveKey();
  const failures = [];
  for (const endpoint of ENDPOINTS) {
    for (const payload of buildPayloads(urls)) {
      let status = 0;
      let detail = '';
      try {
        const res = await fetch(endpoint.url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json; charset=utf-8' },
          body: JSON.stringify(payload),
          signal: AbortSignal.timeout(30_000),
        });
        status = res.status;
        if (!isAccepted(status)) detail = (await res.text()).slice(0, 200);
      } catch (e) {
        detail = e.message;
      }
      const label = `${endpoint.name}: URL ${payload.urlList.length}개 → HTTP ${status || '응답 없음'}`;
      if (isAccepted(status)) console.log(`${label} ${status === 200 ? '(수신)' : '(수신, 키 검증 대기)'}`);
      else {
        console.error(`${label} ${detail}`);
        failures.push(label);
      }
    }
  }
  console.log('대상 URL:\n' + urls.join('\n'));
  if (failures.length) throw new Error(`전송 실패 ${failures.length}건 — 배포는 이미 끝났다. 위 URL을 --urls로 다시 보낼 수 있다.`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
}
