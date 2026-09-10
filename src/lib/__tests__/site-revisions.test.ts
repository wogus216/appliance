import { describe, it, expect } from 'vitest';
import {
  SITE_REVISIONS,
  lastRevisionFor,
  resolveLastModified,
} from '@/lib/data/site-revisions';
import sitemap from '@/app/sitemap';
import { SITE_URL } from '@/lib/constants';

/**
 * 개편 기록이 lastmod를 부풀리지 않는지 본다.
 *
 * 이 파일이 막으려는 실패는 하나다 — 바뀌지도 않은 페이지에 "방금 수정됨"을 붙이는 것.
 * 그러면 lastmod 전체가 믿을 수 없는 값이 되고, 그건 그 자체로 저품질 신호다.
 * 그래서 대상 경로를 늘릴 때 눈에 띄게 만들어 둔다.
 */

/**
 * 2026-09-10 개편에서 본문이 **바뀌지 않은** 페이지.
 *
 * 개편 전(4ebeaf1)과 후 빌드를 각각 돌려 HTML의 스크립트·태그를 제거한 본문 텍스트를
 * 대조해 확인했다. 109개 중 28개가 그대로였고, 그중 사이트맵에 실리는 것이 아래다.
 */
const UNCHANGED_ON_2026_09_10 = [
  '/about',
  '/contact',
  '/privacy',
  '/terms',
  '/editorial-policy',
  '/error-codes',
  '/blog',
  '/materials',
  '/error-codes/Samsung',
  '/error-codes/LG',
  '/materials/sap',
  '/materials/formaldehyde',
];

describe('개편 기록', () => {
  it('날짜가 YYYY-MM-DD 형식이다', () => {
    for (const r of SITE_REVISIONS) {
      expect(r.date, r.note.slice(0, 30)).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  });

  it('모든 항목에 대상 경로와 설명이 있다', () => {
    for (const r of SITE_REVISIONS) {
      expect(r.affects.length, r.date).toBeGreaterThan(0);
      expect(r.note.length, r.date).toBeGreaterThan(20);
      for (const p of r.affects) expect(p, r.date).toMatch(/^\//);
    }
  });

  it('2026-09-10 개편이 바뀌지 않은 페이지를 건드리지 않는다', () => {
    const rev = SITE_REVISIONS.find((r) => r.date === '2026-09-10');
    expect(rev).toBeDefined();
    const wrongly = UNCHANGED_ON_2026_09_10.filter(
      (path) => lastRevisionFor(path) === '2026-09-10',
    );
    expect(wrongly).toEqual([]);
  });

  it('대상 경로 표기가 의도대로 매칭된다', () => {
    expect(lastRevisionFor('/products/anything')).toBe('2026-09-10');
    expect(lastRevisionFor('/')).toBe('2026-09-10');
    // '/compare'는 정확히 일치할 때만. 접두사로 새지 않는다.
    expect(lastRevisionFor('/compare')).toBe('2026-09-10');
    expect(lastRevisionFor('/comparison-something')).toBeUndefined();
    expect(lastRevisionFor('/materials/sap')).toBeUndefined();
  });
});

describe('resolveLastModified', () => {
  it('검수일과 개편일 중 나중 것을 쓴다', () => {
    // 제품 검수일은 8월인데 9월에 점수 체계가 바뀌었다 → 9월이 나가야 한다
    expect(resolveLastModified('/products/x', '2026-08-24')).toBe('2026-09-10');
    // 검수일이 더 나중이면 검수일
    expect(resolveLastModified('/products/x', '2026-12-01')).toBe('2026-12-01');
  });

  it("'YYYY-MM'과 'YYYY-MM-DD'를 섞어도 시간순으로 비교된다", () => {
    expect(resolveLastModified('/category/washer', '2026-09')).toBe('2026-09-10');
    expect(resolveLastModified('/category/washer', '2026-10')).toBe('2026-10');
  });

  it('둘 다 없으면 undefined — 없는 날짜를 지어내지 않는다', () => {
    expect(resolveLastModified('/error-codes/Samsung', undefined)).toBeUndefined();
  });
});

describe('사이트맵 lastmod', () => {
  const entries = sitemap();
  const path = (url: string) => url.slice(SITE_URL.length) || '/';

  it('제품 페이지가 8월 검수일이 아니라 개편일을 싣는다', () => {
    const products = entries.filter((e) => path(e.url).startsWith('/products/'));
    expect(products.length).toBeGreaterThan(0);
    for (const e of products) {
      expect(String(e.lastModified), e.url).toBe('2026-09-10');
    }
  });

  it('바뀌지 않은 에러코드 허브에는 lastmod를 붙이지 않는다', () => {
    const hubs = entries.filter((e) => path(e.url).startsWith('/error-codes'));
    expect(hubs.length).toBeGreaterThan(0);
    for (const e of hubs) expect(e.lastModified, e.url).toBeUndefined();
  });

  it('lastmod 값이 미래가 아니다', () => {
    // 빌드 시각을 넣지 않기로 한 규칙이 깨지면 여기서 걸린다.
    const dated = entries.filter((e) => e.lastModified);
    expect(dated.length).toBeGreaterThan(0);
    for (const e of dated) {
      expect(String(e.lastModified).slice(0, 10) <= '2026-09-10', e.url).toBe(true);
    }
  });
});
