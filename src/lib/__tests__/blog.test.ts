import { describe, it, expect } from 'vitest';
import { allBlogPosts, getBlogPost, getBlogPostsForProduct } from '@/lib/data/blog';
import { isPostIndexable, getIndexableBlogPosts } from '@/lib/blog';
import { blogBodyChars } from '@/types/blog';
import { MIN_BLOG_BODY_CHARS, MIN_BLOG_SECTIONS, MIN_CITABLE_SOURCES } from '@/lib/content-quality';
import { countCitableSources } from '@/lib/source-trust';
import { isIsoDate } from '@/types/editorial';
import { allAppliances, getApplianceBySlug } from '@/lib/data/appliances';
import { PRODUCT_EDITORIAL } from '@/lib/data/editorial';
import { VERIFIED_SPECS, VERIFIED_PRICES } from '@/lib/data/appliances/verified-specs';
import { allBrandProfiles } from '@/lib/data/brands';
import { allMaterials } from '@/lib/data/materials';
import sitemap from '@/app/sitemap';
import { SITE_URL } from '@/lib/constants';

const posts = allBlogPosts;

describe('블로그 데이터 정합성', () => {
  it('글이 하나 이상 있다', () => {
    expect(posts.length).toBeGreaterThan(0);
  });

  it('slug가 중복되지 않고 URL에 쓸 수 있는 형태다', () => {
    const slugs = posts.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const s of slugs) expect(s, s).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
  });

  it('getBlogPost는 slug로 글을 찾고, 없는 slug에는 undefined를 준다', () => {
    for (const p of posts) expect(getBlogPost(p.slug)?.slug).toBe(p.slug);
    expect(getBlogPost('없는-글')).toBeUndefined();
  });

  it.each(posts.map((p) => [p.slug, p] as const))('%s: 날짜와 검수 주체', (slug, post) => {
    expect(isIsoDate(post.publishedAt), `${slug} publishedAt`).toBe(true);
    expect(isIsoDate(post.updatedAt), `${slug} updatedAt`).toBe(true);
    expect(new Date(post.publishedAt) <= new Date(post.updatedAt), slug).toBe(true);
    expect(post.reviewedBy.trim().length).toBeGreaterThan(0);
    if (post.priceCheckedAt !== undefined) {
      expect(isIsoDate(post.priceCheckedAt), `${slug} priceCheckedAt`).toBe(true);
    }
  });

  it.each(posts.map((p) => [p.slug, p] as const))('%s: 빈 문단이 없다', (slug, post) => {
    const blanks: string[] = [];
    post.answer.forEach((t, i) => !t.trim() && blanks.push(`answer[${i}]`));
    post.sections.forEach((s, i) => {
      if (!s.heading.trim()) blanks.push(`sections[${i}].heading`);
      if (s.body.length === 0) blanks.push(`sections[${i}].body 비어 있음`);
      s.body.forEach((t, j) => !t.trim() && blanks.push(`sections[${i}].body[${j}]`));
    });
    post.faqs.forEach((f, i) => {
      if (!f.question.trim() || !f.answer.trim()) blanks.push(`faqs[${i}]`);
    });
    expect(blanks, `${slug}: ${blanks.join(', ')}`).toEqual([]);
  });
});

/**
 * 출처 URL 위조 방지.
 *
 * 이 사이트의 편집 원칙은 "직접 열어 본 URL만 싣는다"인데, 글을 쓰다 보면
 * 그럴듯한 리뷰 주소를 지어내기 쉽다(실제로 이 블로그를 만들면서 두 건 발생했다).
 * 사람이 눈으로 잡을 수 없는 종류의 실수라 기계로 막는다.
 *
 * 통과 조건: 블로그 글의 모든 출처 URL이 이미 다른 곳에서 검증된 URL 집합 안에 있을 것.
 * 새 출처를 쓰려면 먼저 그 URL을 제품 편집 메타데이터나 사양·가격 표에 등록해야 한다.
 */
const verifiedUrls = new Set<string>([
  ...Object.values(PRODUCT_EDITORIAL).flatMap((m) => m.sources.map((s) => s.url)),
  ...Object.values(VERIFIED_SPECS).map((v) => v.source),
  ...Object.values(VERIFIED_PRICES).map((v) => v.source),
  ...allBrandProfiles.flatMap((p) => p.sources.map((s) => s.url)),
  ...allMaterials.flatMap((m) => m.sources.map((s) => s.url)),
]);

describe('블로그 출처', () => {
  it('검증 URL 집합 자체가 비어 있지 않다', () => {
    expect(verifiedUrls.size).toBeGreaterThan(10);
  });

  it.each(posts.map((p) => [p.slug, p] as const))(
    '%s: 모든 출처가 이미 확인된 URL이다 (지어낸 주소 차단)',
    (slug, post) => {
      const unknown = post.sources.map((s) => s.url).filter((u) => !verifiedUrls.has(u));
      expect(
        unknown,
        `${slug}: 이 사이트 어디에서도 검증된 적 없는 URL — 실제로 열어 본 뒤 ` +
          `product-editorial.ts나 verified-specs.ts에 먼저 등록하세요: ${unknown.join(', ')}`,
      ).toEqual([]);
    },
  );

  it.each(posts.map((p) => [p.slug, p] as const))(
    '%s: 출처에 제목·발행처가 있고 URL이 중복되지 않는다',
    (slug, post) => {
      for (const s of post.sources) {
        expect(s.url.startsWith('https://'), `${slug}: ${s.url}`).toBe(true);
        expect(() => new URL(s.url)).not.toThrow();
        expect(s.title.trim().length, `${slug}: ${s.url} 제목 없음`).toBeGreaterThan(0);
        expect(s.publisher?.trim().length ?? 0, `${slug}: ${s.url} 발행처 없음`).toBeGreaterThan(0);
      }
      const urls = post.sources.map((s) => s.url);
      expect(new Set(urls).size, `${slug}: 중복 출처`).toBe(urls.length);
    },
  );
});

describe('블로그가 참조하는 제품', () => {
  it.each(posts.map((p) => [p.slug, p] as const))(
    '%s: productSlugs가 모두 공개 제품이다',
    (slug, post) => {
      expect(post.productSlugs.length, `${slug}: 다룬 제품이 없음`).toBeGreaterThan(0);
      const missing = post.productSlugs.filter((s) => !getApplianceBySlug(s));
      expect(missing, `${slug}: 공개되지 않았거나 없는 제품 — ${missing.join(', ')}`).toEqual([]);
      expect(new Set(post.productSlugs).size, `${slug}: 중복 제품`).toBe(post.productSlugs.length);
    },
  );

  it.each(posts.map((p) => [p.slug, p] as const))(
    '%s: 조건별 결론이 가리키는 제품도 공개 제품이다',
    (slug, post) => {
      const missing = post.decisionRules
        .map((r) => r.productSlug)
        .filter((s): s is string => !!s)
        .filter((s) => !getApplianceBySlug(s));
      expect(missing, `${slug}: ${missing.join(', ')}`).toEqual([]);
    },
  );

  it('제품 → 글 역참조가 실제로 이어진다', () => {
    for (const post of posts) {
      for (const s of post.productSlugs) {
        expect(
          getBlogPostsForProduct(s).map((p) => p.slug),
          `${s} → ${post.slug}`,
        ).toContain(post.slug);
      }
    }
  });

  it('글이 하나도 연결되지 않은 제품이 있어도 역참조는 빈 배열이다', () => {
    const covered = new Set(posts.flatMap((p) => p.productSlugs));
    const uncovered = allAppliances.find((a) => !covered.has(a.slug));
    expect(uncovered, '모든 제품이 글에 실려 이 테스트가 무의미해졌다').toBeDefined();
    expect(getBlogPostsForProduct(uncovered!.slug)).toEqual([]);
  });
});

/**
 * 비교표는 카탈로그와 같은 값을 말해야 한다.
 *
 * 이 사이트에서 가장 자주 낸 실수가 "구조화 필드는 고쳤는데 산문에 옛 숫자가 남는 것"이다.
 * 블로그 표는 산문보다 눈에 잘 띄는 자리라 어긋나면 더 나쁘다.
 * columns[i] ↔ productSlugs[i] 규약(types/blog.ts)을 이용해 가격 셀을 직접 대조한다.
 */
describe('비교표', () => {
  const withTable = posts.filter((p) => p.comparison);

  it('비교표를 가진 글이 있다', () => {
    expect(withTable.length).toBeGreaterThan(0);
  });

  it.each(withTable.map((p) => [p.slug, p] as const))(
    '%s: 모든 행의 값 개수가 열 개수와 같다',
    (slug, post) => {
      const t = post.comparison!;
      expect(t.columns.length, `${slug}: 열이 2개 미만`).toBeGreaterThanOrEqual(2);
      const bad = t.rows
        .filter((r) => r.values.length !== t.columns.length)
        .map((r) => `${r.label}(${r.values.length}/${t.columns.length})`);
      expect(bad, `${slug}: ${bad.join(', ')}`).toEqual([]);
    },
  );

  it.each(withTable.map((p) => [p.slug, p] as const))(
    '%s: 열 개수와 다룬 제품 수가 같다 (columns[i] ↔ productSlugs[i])',
    (slug, post) => {
      expect(post.comparison!.columns.length, slug).toBe(post.productSlugs.length);
    },
  );

  it.each(withTable.map((p) => [p.slug, p] as const))(
    '%s: 표의 가격이 카탈로그 가격과 일치한다',
    (slug, post) => {
      const t = post.comparison!;
      const mismatches: string[] = [];
      for (const row of t.rows) {
        // '2,898,000원' 같은 순수 가격 셀만 본다. 설명이 섞인 셀은 대상이 아니다.
        const looksLikePriceRow = row.values.some((v) => /^[\d,]+원$/.test(v));
        if (!looksLikePriceRow) continue;

        row.values.forEach((v, i) => {
          const appliance = getApplianceBySlug(post.productSlugs[i]);
          if (!appliance) return;
          const m = /^([\d,]+)원$/.exec(v);
          if (m) {
            const shown = Number(m[1].replace(/,/g, ''));
            if (appliance.price !== shown) {
              mismatches.push(
                `${row.label}/${appliance.slug}: 표 ${shown} ≠ 카탈로그 ${appliance.price ?? '없음'}`,
              );
            }
          } else if (appliance.price !== undefined) {
            // 가격이 있는데 표에는 '확인하지 못함'이라고 적혀 있다.
            mismatches.push(
              `${row.label}/${appliance.slug}: 표는 "${v}"인데 카탈로그에는 ${appliance.price}가 있다`,
            );
          }
        });
      }
      expect(mismatches, `${slug}\n  ${mismatches.join('\n  ')}`).toEqual([]);
    },
  );

  /**
   * 표에 카탈로그에 없는 숫자를 적지 않는다.
   *
   * 가격만 대조하면 치수·무게·소비전력이 빠진다. 셀 안의 세 자리 이상 숫자를 모두 뽑아
   * 해당 제품 레코드 어딘가에 그 숫자가 실제로 있는지 본다. 카탈로그를 고치고 표를
   * 그대로 두면 여기서 걸린다 — 이 사이트에서 가장 자주 낸 실수가 그것이다.
   *
   * note는 대상이 아니다(열 하나에 매이지 않는 설명이라 파생 수치가 들어갈 수 있다).
   */
  it.each(withTable.map((p) => [p.slug, p] as const))(
    '%s: 표의 모든 수치가 카탈로그에 존재한다',
    (slug, post) => {
      const haystacks = post.productSlugs.map((s) =>
        JSON.stringify(getApplianceBySlug(s) ?? {}).replace(/,/g, ''),
      );
      const orphans: string[] = [];
      for (const row of post.comparison!.rows) {
        row.values.forEach((v, i) => {
          for (const n of v.replace(/,/g, '').match(/\d{3,}/g) ?? []) {
            if (!haystacks[i].includes(n)) {
              orphans.push(`${row.label} / ${post.productSlugs[i]}: "${v}"의 ${n}`);
            }
          }
        });
      }
      expect(orphans, `${slug}\n  ${orphans.join('\n  ')}`).toEqual([]);
    },
  );

  it.each(withTable.map((p) => [p.slug, p] as const))(
    '%s: 가격을 실었으면 확인 날짜가 있다',
    (slug, post) => {
      const hasPrice = post.comparison!.rows.some((r) => r.values.some((v) => /^[\d,]+원$/.test(v)));
      if (hasPrice) expect(post.priceCheckedAt, `${slug}: priceCheckedAt 없음`).toBeDefined();
    },
  );
});

describe('색인 품질 게이트', () => {
  it('색인되는 글이 하나 이상 있다', () => {
    expect(getIndexableBlogPosts().length).toBeGreaterThan(0);
  });

  it.each(getIndexableBlogPosts().map((p) => [p.slug, p] as const))(
    '%s: 발행처 2곳·분량·섹션 수를 모두 충족한다',
    (slug, post) => {
      expect(countCitableSources(post.sources), `${slug} 출처`).toBeGreaterThanOrEqual(
        MIN_CITABLE_SOURCES,
      );
      expect(blogBodyChars(post), `${slug} 분량`).toBeGreaterThanOrEqual(MIN_BLOG_BODY_CHARS);
      expect(post.sections.length, `${slug} 섹션`).toBeGreaterThanOrEqual(MIN_BLOG_SECTIONS);
    },
  );

  it('게이트가 실제로 걸린다 — 근거가 부족한 글은 색인되지 않는다', () => {
    const base = posts[0];
    expect(isPostIndexable({ ...base, sources: [base.sources[0]] })).toBe(false);
    expect(isPostIndexable({ ...base, sections: base.sections.slice(0, 1) })).toBe(false);
    expect(isPostIndexable({ ...base, reviewedBy: '  ' })).toBe(false);
    expect(isPostIndexable({ ...base, updatedAt: '2026-13-99' })).toBe(false);
  });
});

describe('글끼리 본문을 재사용하지 않는다', () => {
  it('같은 문단이 두 글에 걸치지 않는다', () => {
    const seen = new Map<string, string>();
    const dupes: string[] = [];
    for (const p of posts) {
      const paras = [...p.answer, ...p.sections.flatMap((s) => s.body), ...p.faqs.map((f) => f.answer)];
      for (const t of paras) {
        const key = t.trim();
        const owner = seen.get(key);
        if (owner && owner !== p.slug) dupes.push(`${owner} == ${p.slug}`);
        else seen.set(key, p.slug);
      }
    }
    expect(dupes, `중복 문단: ${dupes.join(', ')}`).toEqual([]);
  });

  it('섹션 제목 조합이 글마다 다르다 (템플릿화 방지)', () => {
    const combos = posts.map((p) => p.sections.map((s) => s.heading).join('|'));
    expect(new Set(combos).size, '섹션 제목 조합이 겹치는 글이 있다').toBe(combos.length);
  });
});

describe('사이트맵', () => {
  const urls = sitemap().map((e) => e.url);

  it('색인 가능한 글만 실린다', () => {
    for (const p of posts) {
      const url = `${SITE_URL}/blog/${p.slug}`;
      if (isPostIndexable(p)) expect(urls, p.slug).toContain(url);
      else expect(urls, p.slug).not.toContain(url);
    }
  });

  it('블로그 허브가 실린다', () => {
    expect(urls).toContain(`${SITE_URL}/blog`);
  });

  it('글 항목은 검수일을 lastModified로 갖는다', () => {
    for (const p of getIndexableBlogPosts()) {
      const e = sitemap().find((x) => x.url === `${SITE_URL}/blog/${p.slug}`)!;
      expect(e.lastModified, p.slug).toBe(p.updatedAt);
    }
  });
});
