import { describe, it, expect } from 'vitest';
import sitemap from '@/app/sitemap';
import { SITE_URL } from '@/lib/constants';
import { allAppliances } from '@/lib/data/appliances';
import {
  isProductIndexable,
  isMaterialIndexable,
  isMaterialsHubIndexable,
} from '@/lib/content-quality';
import { getProductEditorial } from '@/lib/data/editorial';
import { allMaterials } from '@/lib/data/materials';

const entries = sitemap();
const urls = entries.map((e) => e.url);

describe('사이트맵 기본 형태', () => {
  it('URL이 중복되지 않는다', () => {
    const dupes = urls.filter((u, i) => urls.indexOf(u) !== i);
    expect(dupes, `중복: ${[...new Set(dupes)].join(', ')}`).toEqual([]);
  });

  it('모든 URL이 SITE_URL로 시작하고 끝에 슬래시가 없다', () => {
    for (const u of urls) {
      expect(u.startsWith(SITE_URL), u).toBe(true);
      expect(u.endsWith('/'), `${u}: 끝 슬래시`).toBe(false);
    }
  });

  it('홈 URL 형태가 canonical(=SITE_URL)과 같다', () => {
    // 홈의 canonical은 '/' 이고, Next가 metadataBase와 합치면 슬래시 없는 SITE_URL이 된다.
    expect(urls).toContain(SITE_URL);
    expect(urls).not.toContain(`${SITE_URL}/`);
  });

  it('편집 신뢰 문서가 포함된다', () => {
    expect(urls).toContain(`${SITE_URL}/editorial-policy`);
    expect(urls).toContain(`${SITE_URL}/methodology`);
  });
});

describe('lastModified가 빌드 시각으로 일괄 생성되지 않는다', () => {
  it('빌드 시각(타임스탬프) 형태의 값이 하나도 없다', () => {
    for (const e of entries) {
      if (e.lastModified === undefined) continue;
      expect(typeof e.lastModified, `${e.url}: Date 객체(=빌드 시각) 사용`).toBe('string');
      // 실제 검수 날짜는 'YYYY-MM' 또는 'YYYY-MM-DD'. 시각이 붙어 있으면 빌드 시각이다.
      expect(String(e.lastModified), e.url).toMatch(/^\d{4}-\d{2}(-\d{2})?$/);
    }
  });

  it('두 번 호출해도 같은 값이 나온다 (시각에 의존하지 않는다)', () => {
    expect(sitemap()).toEqual(sitemap());
  });

  it('lastModified가 없는 항목이 존재한다 (모르는 날짜를 지어내지 않는다)', () => {
    expect(entries.some((e) => e.lastModified === undefined)).toBe(true);
  });

  it('제품의 lastModified는 편집 메타데이터의 검수일과 같다', () => {
    for (const e of entries) {
      const slug = e.url.startsWith(`${SITE_URL}/products/`)
        ? e.url.slice(`${SITE_URL}/products/`.length)
        : null;
      if (!slug) continue;
      expect(e.lastModified, slug).toBe(getProductEditorial(slug)?.updatedAt);
    }
  });
});

describe('품질 기준 미달 페이지 제외', () => {
  const productUrls = new Set(
    urls.filter((u) => u.startsWith(`${SITE_URL}/products/`)),
  );

  it('색인 대상 제품만 들어 있다', () => {
    for (const a of allAppliances) {
      const url = `${SITE_URL}/products/${a.slug}`;
      expect(productUrls.has(url), `${a.slug}: 색인=${isProductIndexable(a)} 인데 사이트맵 포함=${productUrls.has(url)}`)
        .toBe(isProductIndexable(a));
    }
  });

  it('noindex 제품은 하나도 없다', () => {
    const leaked = allAppliances
      .filter((a) => !isProductIndexable(a))
      .filter((a) => productUrls.has(`${SITE_URL}/products/${a.slug}`))
      .map((a) => a.slug);
    expect(leaked, `사이트맵에 남은 noindex 제품: ${leaked.join(', ')}`).toEqual([]);
  });

  it('스텁 상태의 성분 사전은 허브·항목 모두 빠진다', () => {
    // 2026-08-23 기준 항목 2개, 항목당 본문 272~357자 → 기준 미달.
    // 항목이 늘고 본문이 길어지면 이 테스트는 자연스럽게 반대 방향으로 실패한다.
    const hubIncluded = urls.includes(`${SITE_URL}/materials`);
    const materialUrls = urls.filter((u) => u.startsWith(`${SITE_URL}/materials/`));
    expect(hubIncluded).toBe(
      isMaterialsHubIndexable({ entryCount: allMaterials.length }),
    );
    for (const m of allMaterials) {
      const included = materialUrls.includes(`${SITE_URL}/materials/${m.slug}`);
      expect(included, m.slug).toBe(
        isMaterialIndexable({
          sourceCount: m.sources.length,
          bodyChars: (m.what + m.whyUsed + (m.concern ?? '')).trim().length,
        }),
      );
    }
  });

  it('제품 URL은 상세 페이지 canonical과 같은 형태다', () => {
    for (const u of productUrls) {
      const slug = u.slice(`${SITE_URL}/products/`.length);
      // generateMetadata의 canonical: `/products/${slug}`
      expect(u).toBe(`${SITE_URL}/products/${slug}`);
      expect(allAppliances.some((a) => a.slug === slug), slug).toBe(true);
    }
  });
});
