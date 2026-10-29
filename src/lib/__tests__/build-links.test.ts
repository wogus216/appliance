// 빌드 산출물(out/)의 사이트맵·내부 링크 검사. `next build` 전에는 건너뛴다.
//
// 2026-10-29 8단계(재심사 준비): 계획 5절의 「사이트맵 전 URL 200, 내부 404 링크 0」을 빌드 기준으로 고정한다.
// 정적 내보내기라 200은 「out/에 그 경로의 HTML 파일이 있다」로 본다. 배포(Cloudflare 정적 자산,
// auto-trailing-slash)에서 /a는 a.html, /a/는 /a로 보내므로 같은 규칙으로 해석한다. 파일이 없으면
// public/_redirects 규칙을 한 번 따라가 그 목적지가 있는지 본다 — 301 뒤 200이면 404가 아니다.

import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { describe, expect, it } from 'vitest';
import { SITE_URL } from '@/lib/constants';

const ROOT = process.cwd();
const OUT = join(ROOT, 'out');
const hasBuild = existsSync(join(OUT, 'index.html')) && existsSync(join(OUT, 'sitemap.xml'));

const isFile = (path: string) => existsSync(path) && statSync(path).isFile();

/** 경로를 out/ 안의 파일로 해석한다. 정적 파일, 페이지 HTML, 디렉터리 index 순서. */
function resolvesToFile(path: string): boolean {
  if (path === '/' || path === '') return isFile(join(OUT, 'index.html'));
  const rel = path.replace(/^\/+/, '').replace(/\/+$/, '');
  return isFile(join(OUT, rel)) || isFile(join(OUT, `${rel}.html`)) || isFile(join(OUT, rel, 'index.html'));
}

/** public/_redirects의 규칙. 자리표시자(:name)는 경로 한 마디, *는 나머지 전부(:splat)에 맞는다. */
const REDIRECTS = readFileSync(join(ROOT, 'public/_redirects'), 'utf8')
  .split('\n')
  .map((line) => line.trim())
  .filter((line) => line && !line.startsWith('#'))
  .map((line) => {
    const [from, to] = line.split(/\s+/);
    return { from, to };
  });

function redirectTarget(path: string): string | undefined {
  const segments = path.split('/');
  for (const { from, to } of REDIRECTS) {
    const pattern = from.split('/');
    const bound: Record<string, string> = {};
    let matched = true;
    for (let i = 0; i < pattern.length; i += 1) {
      const part = pattern[i];
      if (part === '*') {
        bound[':splat'] = segments.slice(i).join('/');
        break;
      }
      if (i >= segments.length) { matched = false; break; }
      if (part.startsWith(':')) {
        if (!segments[i]) { matched = false; break; }
        bound[part] = segments[i];
      } else if (part !== segments[i]) { matched = false; break; }
      if (i === pattern.length - 1 && segments.length !== pattern.length) matched = false;
    }
    if (!matched) continue;
    return Object.entries(bound).reduce((target, [key, value]) => target.replaceAll(key, value), to);
  }
  return undefined;
}

/** 404가 아니면 true: 파일이 있거나, 이동 규칙의 목적지가 파일로 있다. */
function resolvesInternally(path: string): boolean {
  if (resolvesToFile(path)) return true;
  const target = redirectTarget(path);
  return target !== undefined && resolvesToFile(target);
}

function sitemapPaths(): string[] {
  const xml = readFileSync(join(OUT, 'sitemap.xml'), 'utf8');
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(([, loc]) => loc.replace(SITE_URL, '') || '/');
}

const htmlFileFor = (path: string) => join(OUT, path === '/' ? 'index.html' : `${path.slice(1)}.html`);

function allBuiltHtml(): { name: string; body: string }[] {
  const files: { name: string; body: string }[] = [];
  const walk = (dir: string) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const full = join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.name.endsWith('.html')) files.push({ name: relative(OUT, full), body: readFileSync(full, 'utf8') });
    }
  };
  walk(OUT);
  return files;
}

const decode = (href: string) => href.replaceAll('&amp;', '&').replaceAll('&#x27;', "'").replaceAll('&quot;', '"');

describe.skipIf(!hasBuild)('빌드 산출물의 사이트맵과 내부 링크', () => {
  const paths = hasBuild ? sitemapPaths() : [];
  const pages = hasBuild ? allBuiltHtml() : [];

  it('해석기가 없는 경로를 잡아낸다(대조군)', () => {
    // 검사가 늘 통과만 하면 도구가 죽은 것이다. 없는 경로·없는 브랜드의 패턴 이동은 실패해야 한다.
    expect(resolvesInternally('/no-such-page-for-link-check')).toBe(false);
    expect(resolvesInternally('/error-codes/NoSuchBrand/E1')).toBe(false);
    // 파일은 없고 이동 규칙만 있는 주소는 목적지가 있으면 통과한다.
    expect(resolvesToFile('/error-codes/Coway')).toBe(false);
    expect(resolvesInternally('/error-codes/Coway')).toBe(true);
  });

  it('사이트맵에 URL이 있다', () => {
    expect(paths.length).toBeGreaterThan(50);
  });

  it('사이트맵의 모든 URL이 out/에 HTML 페이지로 있다(정적 내보내기 기준 200)', () => {
    const missing = paths.filter((path) => {
      const file = htmlFileFor(path);
      return !isFile(file) || !readFileSync(file, 'utf8').startsWith('<!DOCTYPE html>');
    });
    expect(missing, `HTML이 없는 사이트맵 URL: ${missing.join(', ')}`).toEqual([]);
  });

  it('사이트맵에 noindex 페이지가 없다', () => {
    const noindex = paths.filter((path) => {
      const file = htmlFileFor(path);
      if (!isFile(file)) return false; // 위 검사가 잡는다
      const robots = [...readFileSync(file, 'utf8').matchAll(/<meta name="robots" content="([^"]*)"/g)].map(([, content]) => content);
      return robots.some((content) => /noindex/i.test(content));
    });
    expect(noindex, `사이트맵에 든 noindex 페이지: ${noindex.join(', ')}`).toEqual([]);
  });

  it('모든 빌드 HTML의 내부 링크가 페이지·정적 파일·이동 규칙으로 해석된다(404 링크 0)', () => {
    expect(pages.length).toBeGreaterThan(100);
    const broken = new Map<string, Set<string>>();
    let checked = 0;
    for (const page of pages) {
      for (const [, raw] of page.body.matchAll(/href="(\/[^"]*)"/g)) {
        if (raw.startsWith('//')) continue; // 프로토콜 상대 주소는 외부 링크다
        const path = decode(raw).split(/[?#]/, 1)[0];
        checked += 1;
        if (resolvesInternally(path)) continue;
        if (!broken.has(path)) broken.set(path, new Set());
        broken.get(path)!.add(page.name);
      }
    }
    expect(checked).toBeGreaterThan(1000);
    const report = [...broken].map(([path, from]) => `${path} ← ${[...from].slice(0, 3).join(', ')}${from.size > 3 ? ` 외 ${from.size - 3}곳` : ''}`);
    expect(report, `해석되지 않는 내부 링크:\n${report.join('\n')}`).toEqual([]);
  });
});
