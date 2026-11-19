import { describe, expect, it } from 'vitest';
import sitemap from '@/app/sitemap';
import { SITE_URL } from '@/lib/constants';

const expectedPaths = [
  '', '/error-codes', ...['Samsung', 'LG', 'SKMagic', 'Cuckoo', 'Haier', 'Roborock', 'Kiturami', 'Navien'].map((brand) => `/error-codes/${brand}`),
  '/error-codes/Cuckoo/dishwasher/e4', '/error-codes/SKMagic/dishwasher/e4', '/error-codes/Haier/air-conditioner/f25',
  '/tools', '/tools/repair-replace', '/tools/care-plan', '/tools/household-care',
  '/blog', '/blog/samsung-washer-check-codes', '/about', '/editorial-policy', '/methodology', '/contact', '/privacy', '/terms',
];

describe('에러코드·수리·관리로 좁힌 공개 범위', () => {
  it('기존 오류 허브·심층 안내와 핵심 도구만 사이트맵에 남는다', () => {
    expect(sitemap().map((entry) => entry.url).sort()).toEqual(expectedPaths.map((path) => SITE_URL + path).sort());
  });
  it('URL에 중복이나 정규 주소와 다른 끝 슬래시가 없다', () => {
    const urls = sitemap().map((entry) => entry.url);
    expect(new Set(urls).size).toBe(urls.length);
    expect(urls.every((url) => url.startsWith(SITE_URL) && !url.endsWith('/'))).toBe(true);
  });
  it('편집일은 명시한 날짜이고 빌드 시각에 따라 달라지지 않는다', () => {
    expect(sitemap()).toEqual(sitemap());
    for (const entry of sitemap()) if (entry.lastModified) expect(entry.lastModified).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });
});
