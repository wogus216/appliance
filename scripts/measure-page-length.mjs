#!/usr/bin/env node
// 빌드 산출물(out/)의 페이지 본문 글자 수를 잰다.
//
// thin content 판정의 목표 지표를 재는 도구다. 임계값 미달이 하나라도 있으면
// exit 1이라 게이트로 그대로 쓸 수 있다.
//
// 사용:
//   node scripts/measure-page-length.mjs '^brand/' 1200
//   node scripts/measure-page-length.mjs '' 1200      # 사이트 전체
//
// 첫 인자는 out/ 기준 상대 경로(확장자 없음)에 대한 정규식이다. 글로브가 아니다 —
// 패턴 문법이 하나뿐이어야 라운드마다 같은 것을 잰다.

import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const OUT_DIR = 'out';
const pattern = new RegExp(process.argv[2] ?? '');
const threshold = Number(process.argv[3] ?? 1200);

/** out/ 아래 모든 .html을 찾는다 */
function walk(dir) {
  const found = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) found.push(...walk(full));
    else if (entry.endsWith('.html')) found.push(full);
  }
  return found;
}

/**
 * HTML에서 사람이 읽는 본문만 남긴다.
 *
 * script를 먼저 지우는 것이 핵심이다 — Next 정적 export는 RSC 페이로드를
 * self.__next_f.push(...) 형태로 script 안에 통째로 싣기 때문에, 그대로 세면
 * 얇은 페이지가 두꺼워 보인다.
 */
function textOf(html) {
  return html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ')
    .replace(/<template\b[^>]*>[\s\S]*?<\/template>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

/** out/brand/LG.html → brand/LG, out/brand/LG/index.html → brand/LG */
function pagePath(file) {
  return relative(OUT_DIR, file)
    .replace(/\\/g, '/')
    .replace(/\/index\.html$/, '')
    .replace(/\.html$/, '');
}

const pages = walk(OUT_DIR)
  .map((file) => ({ path: pagePath(file), length: textOf(readFileSync(file, 'utf8')).length }))
  .filter((p) => pattern.test(p.path))
  .sort((a, b) => a.length - b.length);

if (pages.length === 0) {
  console.error(`패턴 /${pattern.source}/ 에 맞는 페이지가 out/ 에 없다.`);
  process.exit(1);
}

for (const p of pages) {
  const mark = p.length < threshold ? '❌' : '  ';
  console.log(`${mark} ${String(p.length).padStart(6)}  ${p.path}`);
}

const thin = pages.filter((p) => p.length < threshold);
const pct = Math.round((thin.length / pages.length) * 100);
console.log(`\n${pages.length}개 중 ${thin.length}개가 ${threshold}자 미만 (${pct}%)`);

process.exit(thin.length > 0 ? 1 : 0);
