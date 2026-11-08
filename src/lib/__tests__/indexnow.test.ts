import { describe, expect, it } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import {
  BATCH_SIZE,
  ENDPOINTS,
  INDEXNOW_KEY,
  KEY_LOCATION,
  assertOwnUrls,
  buildPayloads,
  diffSitemaps,
  isAccepted,
  parseSitemap,
} from '../../../scripts/indexnow.mjs';

const ROOT = join(__dirname, '../../..');

const sitemap = (rows: [string, string?][]) =>
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  rows
    .map(([loc, lastmod]) => `<url>\n<loc>${loc}</loc>\n${lastmod ? `<lastmod>${lastmod}</lastmod>\n` : ''}<priority>0.5</priority>\n</url>`)
    .join('\n') +
  `\n</urlset>`;

describe('IndexNow 키', () => {
  it('공개 키 파일이 public/<키>.txt에 있고 내용이 키와 같다', () => {
    const file = join(ROOT, 'public', `${INDEXNOW_KEY}.txt`);
    expect(existsSync(file)).toBe(true);
    expect(readFileSync(file, 'utf8').trim()).toBe(INDEXNOW_KEY);
  });

  it('키는 프로토콜 형식(8~128자, 영숫자와 -)을 따른다', () => {
    expect(INDEXNOW_KEY).toMatch(/^[a-zA-Z0-9-]{8,128}$/);
    expect(KEY_LOCATION).toBe(`https://salimlab.kr/${INDEXNOW_KEY}.txt`);
  });

  it('네이버에는 공용 주소와 별도로 직접 보낸다', () => {
    expect(ENDPOINTS.map((e) => e.url)).toEqual([
      'https://api.indexnow.org/indexnow',
      'https://searchadvisor.naver.com/indexnow',
    ]);
  });
});

describe('사이트맵 비교', () => {
  it('loc과 lastmod를 읽고 &amp;를 되돌린다', () => {
    const map = parseSitemap(sitemap([['https://salimlab.kr', '2026-11-06'], ['https://salimlab.kr/a?x=1&amp;y=2']]));
    expect([...map]).toEqual([
      ['https://salimlab.kr', '2026-11-06'],
      ['https://salimlab.kr/a?x=1&y=2', ''],
    ]);
  });

  it('새 URL·lastmod 변경·삭제만 고르고 그대로인 URL은 뺀다', () => {
    const prev = parseSitemap(sitemap([
      ['https://salimlab.kr', '2026-11-06'],
      ['https://salimlab.kr/same', '2026-10-01'],
      ['https://salimlab.kr/edited', '2026-10-01'],
      ['https://salimlab.kr/gone', '2026-10-01'],
    ]));
    const next = parseSitemap(sitemap([
      ['https://salimlab.kr', '2026-11-06'],
      ['https://salimlab.kr/same', '2026-10-01'],
      ['https://salimlab.kr/edited', '2026-11-08'],
      ['https://salimlab.kr/new', '2026-11-08'],
    ]));
    expect(diffSitemaps(prev, next)).toEqual({
      added: ['https://salimlab.kr/new'],
      changed: ['https://salimlab.kr/edited'],
      removed: ['https://salimlab.kr/gone'],
    });
  });

  it('같은 사이트맵이면 보낼 것이 없다', () => {
    const xml = sitemap([['https://salimlab.kr', '2026-11-06'], ['https://salimlab.kr/b', '2026-10-01']]);
    expect(diffSitemaps(parseSitemap(xml), parseSitemap(xml))).toEqual({ added: [], changed: [], removed: [] });
  });

  it('빌드된 사이트맵이 있으면 전부 읽힌다(빈 결과로 조용히 넘어가지 않는다)', () => {
    const built = join(ROOT, 'out', 'sitemap.xml');
    if (!existsSync(built)) return;
    const xml = readFileSync(built, 'utf8');
    const count = (xml.match(/<loc>/g) ?? []).length;
    expect(count).toBeGreaterThan(0);
    expect(parseSitemap(xml).size).toBe(count);
  });
});

describe('전송 준비', () => {
  it('다른 호스트나 http 주소가 섞이면 전송을 멈춘다', () => {
    expect(() => assertOwnUrls(['https://salimlab.kr/a', 'https://salimlab.kr'])).not.toThrow();
    expect(() => assertOwnUrls(['https://www.salimlab.kr/a'])).toThrow();
    expect(() => assertOwnUrls(['http://salimlab.kr/a'])).toThrow();
    expect(() => assertOwnUrls(['not a url'])).toThrow();
  });

  it('10,000개씩 나눠 담고 host·key·keyLocation을 싣는다', () => {
    const urls = Array.from({ length: BATCH_SIZE + 1 }, (_, i) => `https://salimlab.kr/p${i}`);
    const payloads = buildPayloads(urls);
    expect(payloads.map((p) => p.urlList.length)).toEqual([BATCH_SIZE, 1]);
    expect(payloads[0]).toMatchObject({ host: 'salimlab.kr', key: INDEXNOW_KEY, keyLocation: KEY_LOCATION });
  });

  it('200·202만 수신으로 본다', () => {
    expect([200, 202, 400, 403, 422, 429, 500].map(isAccepted)).toEqual([true, true, false, false, false, false, false]);
  });
});
