import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { GA_MEASUREMENT_ID } from '@/lib/constants';

/**
 * GA4 태그가 모든 화면에 한 번씩 실리는지 본다.
 *
 * 막으려는 실패는 셋이다 — 측정 ID 없이 배포되는 것, 일부 화면에서 빠져 숫자가 틀리는 것,
 * 두 곳에서 태그를 내보내 같은 방문을 두 번 세는 것.
 */

const ROOT = process.cwd();
const read = (p: string) => readFileSync(join(ROOT, p), 'utf-8');
const GTAG_HOST = 'googletagmanager.com';

function sourceFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) return name === '__tests__' ? [] : sourceFiles(p);
    return /\.(ts|tsx)$/.test(name) ? [p] : [];
  });
}

describe('GA4 태그', () => {
  it('측정 ID가 GA4 형식이다', () => {
    expect(GA_MEASUREMENT_ID).toMatch(/^G-[A-Z0-9]{6,12}$/);
  });

  it('루트 레이아웃이 태그를 렌더한다', () => {
    expect(read('src/app/layout.tsx')).toMatch(/<GoogleAnalytics\s*\/>/);
  });

  it('gtag.js 주소를 쓰는 곳은 GoogleAnalytics 컴포넌트뿐이다', () => {
    const offenders = sourceFiles(join(ROOT, 'src'))
      .filter((p) => readFileSync(p, 'utf-8').includes(GTAG_HOST))
      .map((p) => relative(ROOT, p));
    expect(offenders).toEqual(['src/components/google-analytics.tsx']);
  });

  it('개인정보처리방침이 Google 애널리틱스 사용과 처리 방식을 고지한다', () => {
    // GA 이용약관 7항: 사용 사실과 정보 수집·처리 방식을 공개해야 한다.
    const privacy = read('src/app/privacy/page.tsx');
    expect(privacy).toContain('Google 애널리틱스');
    expect(privacy).toContain('https://policies.google.com/technologies/partner-sites');
    expect(privacy).toContain('https://tools.google.com/dlpage/gaoptout');
  });
});

// 빌드 산출물이 있으면 실제 HTML도 확인한다. `npm run build` 전에는 건너뛴다.
const OUT = join(ROOT, 'out');
const hasBuild = existsSync(join(OUT, '404.html'));

function htmlFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) return name === '_next' ? [] : htmlFiles(p);
    return name.endsWith('.html') ? [p] : [];
  });
}

// public/에서 그대로 복사되는 HTML(네이버 소유확인 파일)은 페이지가 아니다.
const COPIED_FROM_PUBLIC = new Set(
  readdirSync(join(ROOT, 'public')).filter((name) => name.endsWith('.html')),
);

describe.skipIf(!hasBuild)('빌드 산출물의 GA4 태그 (out/)', () => {
  const files = hasBuild
    ? htmlFiles(OUT).filter((p) => !COPIED_FROM_PUBLIC.has(relative(OUT, p)))
    : [];
  const count = (s: string, needle: string) => s.split(needle).length - 1;

  // 문자열이 아니라 script 태그를 센다. 같은 주소가 RSC 페이로드(self.__next_f)에도
  // 직렬화돼 한 번 더 실리기 때문에, 문자열로 세면 정상 페이지도 2가 나온다.
  it('모든 HTML에 gtag.js 태그와 config 태그가 정확히 한 번씩 있다', () => {
    expect(files.length).toBeGreaterThan(100);
    const wrong = files.filter((p) => {
      const html = readFileSync(p, 'utf-8');
      return (
        count(html, `<script async="" src="https://www.${GTAG_HOST}/gtag/js?id=${GA_MEASUREMENT_ID}">`) !== 1 ||
        count(html, '<script id="ga4-init">') !== 1
      );
    });
    expect(wrong.map((p) => relative(OUT, p))).toEqual([]);
  });

  it('404에도 태그가 있다', () => {
    expect(readFileSync(join(OUT, '404.html'), 'utf-8')).toContain(`gtag/js?id=${GA_MEASUREMENT_ID}`);
  });

  it('운영 도메인에서만 config를 보낸다', () => {
    expect(readFileSync(join(OUT, 'index.html'), 'utf-8')).toContain(
      "if(location.hostname==='salimlab.kr'){",
    );
  });
});
