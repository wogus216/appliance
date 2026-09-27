// 두 빌드 산출물의 <main> 본문을 사이트맵 경로별로 대조해, 본문이 바뀐 경로를 찍는다.
//
// 용도: src/lib/data/site-revisions.ts 에 개편 항목을 적을 때 "실제로 본문이 바뀐 경로만"
// 고르기 위해서다(그 파일 머리 주석의 규칙). 푸터·헤더만 바뀐 페이지는 세지 않는다 —
// 그걸 넣으면 모든 페이지가 바뀐 것으로 잡혀 lastmod 전체가 의미를 잃는다.
//
// 사용: 개편 전 커밋에서 빌드한 out/ 을 다른 곳에 복사해 두고, 개편 후 빌드한 뒤
//   node scripts/changed-pages.mjs <개편 전 out 경로> [개편 후 out 경로, 기본 out]
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const [before, after = 'out'] = process.argv.slice(2);
if (!before) {
  console.error('사용: node scripts/changed-pages.mjs <개편 전 out> [개편 후 out]');
  process.exit(1);
}

function mainText(file) {
  let s = readFileSync(file, 'utf-8');
  const m = s.match(/<main[^>]*>([\s\S]*)<\/main>/);
  s = m ? m[1] : s;
  s = s.replace(/<(script|style)[^>]*>[\s\S]*?<\/\1>/g, '').replace(/<[^>]+>/g, ' ');
  s = s.replace(/&[a-z#0-9]+;/g, ' ');
  return s.split(/\s+/).filter(Boolean).join(' ');
}

const sitemap = readFileSync(join(after, 'sitemap.xml'), 'utf-8');
const paths = [...sitemap.matchAll(/<loc>https?:\/\/[^/<]+([^<]*)<\/loc>/g)].map((m) => m[1] || '/');

const changed = [];
const missing = [];
for (const p of paths) {
  const rel = `${p.replace(/^\/|\/$/g, '') || 'index'}.html`;
  const a = join(before, rel);
  const b = join(after, rel);
  if (!existsSync(a)) {
    missing.push(p); // 개편 전에는 없던 페이지 — 새 페이지다
    continue;
  }
  if (mainText(a) !== mainText(b)) changed.push(p);
}

for (const p of changed) console.log(p);
console.error(`사이트맵 ${paths.length}개 중 본문 변경 ${changed.length}개, 개편 전에 없던 페이지 ${missing.length}개`);
if (missing.length) console.error(`새 페이지: ${missing.join(' ')}`);
