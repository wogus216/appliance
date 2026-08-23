import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';
import { ADSENSE_CLIENT_ID } from '@/lib/constants';

const ROOT = process.cwd();
const APP_DIR = join(ROOT, 'src/app');
const read = (p: string) => readFileSync(join(ROOT, p), 'utf-8');

describe('ads.txt', () => {
  const raw = read('public/ads.txt');

  it('정확히 한 줄이고 일반 텍스트다', () => {
    const lines = raw.trim().split('\n');
    expect(lines).toHaveLength(1);
    expect(raw).not.toMatch(/<[a-z!/]/i); // HTML이 아니다
  });

  it('IAB 형식과 정확히 일치한다', () => {
    expect(raw.trim()).toBe('google.com, pub-5040630448523471, DIRECT, f08c47fec0942fa0');
  });

  it('게시자 ID가 코드의 ADSENSE_CLIENT_ID와 일치한다', () => {
    const publisherId = raw.trim().split(',')[1].trim(); // 'pub-...'
    // ADSENSE_CLIENT_ID는 'ca-' 접두사가 붙은 형태다
    expect(ADSENSE_CLIENT_ID).toBe(`ca-${publisherId}`);
  });
});

/** src/app 아래 page.tsx / not-found.tsx 를 전부 모은다 */
function appEntryFiles(): { route: string; file: string; source: string }[] {
  const out: { route: string; file: string; source: string }[] = [];
  const walk = (dir: string) => {
    for (const e of readdirSync(dir, { withFileTypes: true })) {
      const full = join(dir, e.name);
      if (e.isDirectory()) {
        if (e.name.startsWith('.')) continue;
        walk(full);
      } else if (e.name === 'page.tsx' || e.name === 'not-found.tsx') {
        out.push({
          route: relative(APP_DIR, full),
          file: full,
          source: readFileSync(full, 'utf-8'),
        });
      }
    }
  };
  walk(APP_DIR);
  return out;
}

/** JSX로 광고 컴포넌트를 실제 렌더하는가. 주석 속 언급에 걸리지 않도록 태그 형태로 찾는다 */
const RENDERS_AD = /<AdSenseScript\b/;

/**
 * 광고를 실을 자격이 있는 화면.
 *
 * 목록 자체가 정책이다. 새 라우트를 추가하면 아래 테스트가 실패하면서
 * "이 화면에 광고를 실을 것인가"를 한 번 결정하게 만든다.
 */
const AD_BEARING_ROUTES = new Set([
  'page.tsx', // 홈
  'category/[slug]/page.tsx',
  'brand/[brand]/page.tsx',
  'products/[slug]/page.tsx',
  'error-codes/page.tsx',
  'error-codes/[brand]/page.tsx',
  'materials/page.tsx',
  'materials/[slug]/page.tsx',
  'compare/page.tsx',
]);

describe('광고 스크립트 배치', () => {
  const entries = appEntryFiles();

  it('루트 레이아웃에는 광고 스크립트가 없다 (404까지 따라붙지 않도록)', () => {
    const layout = read('src/app/layout.tsx');
    expect(layout).not.toContain('adsbygoogle');
    expect(layout).not.toMatch(RENDERS_AD);
  });

  it('소유권 확인용 메타태그는 레이아웃에 남아 있다', () => {
    const layout = read('src/app/layout.tsx');
    expect(layout).toContain('google-adsense-account');
    expect(layout).toContain('ADSENSE_CLIENT_ID');
  });

  it('404 화면은 광고 스크립트를 렌더하지 않는다', () => {
    const notFound = entries.find((e) => e.route === 'not-found.tsx');
    expect(notFound, 'not-found.tsx를 찾지 못함').toBeDefined();
    expect(notFound!.source).not.toMatch(RENDERS_AD);
    expect(notFound!.source).not.toContain('adsbygoogle');
  });

  it('허용된 라우트만 광고 스크립트를 렌더한다', () => {
    const rendering = entries
      .filter((e) => RENDERS_AD.test(e.source))
      .map((e) => e.route)
      .sort();
    expect(rendering).toEqual([...AD_BEARING_ROUTES].sort());
  });

  it('adsbygoogle URL을 직접 쓰는 곳은 AdSenseScript 컴포넌트뿐이다', () => {
    const offenders = entries.filter((e) => e.source.includes('pagead2.googlesyndication.com'));
    expect(offenders.map((e) => e.route)).toEqual([]);
    expect(read('src/components/adsense-script.tsx')).toContain('pagead2.googlesyndication.com');
  });

  it('정책·안내 페이지에는 광고를 싣지 않는다', () => {
    for (const route of ['about', 'contact', 'privacy', 'terms', 'editorial-policy', 'methodology']) {
      const e = entries.find((x) => x.route === `${route}/page.tsx`);
      expect(e, `${route}/page.tsx 없음`).toBeDefined();
      expect(e!.source, `${route}에 광고가 실림`).not.toMatch(RENDERS_AD);
    }
  });
});

// 빌드 산출물이 있으면 실제 HTML도 확인한다. `npm run build` 전에는 건너뛴다.
const OUT = join(ROOT, 'out');
const hasBuild = existsSync(join(OUT, '404.html'));

describe.skipIf(!hasBuild)('빌드 산출물 검증 (out/)', () => {
  it('404.html에 adsbygoogle이 없다', () => {
    expect(readFileSync(join(OUT, '404.html'), 'utf-8')).not.toContain('adsbygoogle');
  });

  it('홈에는 광고 스크립트가 있다', () => {
    expect(readFileSync(join(OUT, 'index.html'), 'utf-8')).toContain('adsbygoogle.js');
  });

  it('소유권 확인 메타태그는 404에도 남는다', () => {
    expect(readFileSync(join(OUT, '404.html'), 'utf-8')).toContain('google-adsense-account');
  });

  it('정책 페이지에는 광고가 없다', () => {
    for (const f of ['privacy.html', 'terms.html', 'about.html', 'editorial-policy.html', 'methodology.html']) {
      const p = join(OUT, f);
      if (!existsSync(p)) continue;
      expect(readFileSync(p, 'utf-8'), f).not.toContain('adsbygoogle');
    }
  });

  it('/ads.txt가 존재하고 HTML이 아니다', () => {
    const p = join(OUT, 'ads.txt');
    expect(existsSync(p)).toBe(true);
    const body = readFileSync(p, 'utf-8');
    expect(body.trim()).toBe('google.com, pub-5040630448523471, DIRECT, f08c47fec0942fa0');
    expect(body).not.toMatch(/<[a-z!/]/i);
  });
});
