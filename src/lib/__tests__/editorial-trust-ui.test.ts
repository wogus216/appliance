import { describe, it, expect } from 'vitest';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { ApplianceCard } from '@/components/appliance-card';
import { HeroSection } from '@/components/detail/hero-section';
import { VerdictSection } from '@/components/detail/verdict-section';
import { ValueSection } from '@/components/detail/value-section';
import { PerformanceSection } from '@/components/detail/performance-section';
import { EditorialMetaSection } from '@/components/detail/editorial-meta-section';
import { Footer } from '@/components/footer';
import { allAppliances, getCardAppliances } from '@/lib/data/appliances';
import { getProductEditorial } from '@/lib/data/editorial';
import { hasCoupangPartnersLink, hasValidPurchaseLinks } from '@/lib/purchase-links';

const ROOT = process.cwd();
const cards = getCardAppliances();

/** 표시하면 안 되는 문구 — 편집팀이 쓴 글을 사용자 후기로 보이게 만드는 표현들 */
const FORBIDDEN_PHRASES = ['사용자 리뷰', '사용자 평균', '추천률'];

/**
 * 점수가 화면에 다시 나타나는 모양들.
 *
 * 2026-09-27에 종합 점수·항목 점수·가성비 별점을 전부 걷었다(src/lib/energy-grade.ts). 생활가전
 * 4축 중 3축이 "대조할 공개 수치가 없어 편집팀이 판단한 값"이었다. 이 중 하나라도 보이면
 * 점수가 다른 경로(컴포넌트·데이터 산문·라벨)로 돌아온 것이다.
 */
const SCORE_PATTERNS: RegExp[] = [
  /에디터 평가/,
  /편집팀이 판단/,
  // '4.6/5'·'7/10'·'4 / 5'. 에러코드 '07 / 10'(선행 0)과 등급 분포 '1 / 5등급'은 점수가 아니다
  /(?<!\d)([1-9]|10)(\.\d)?\s*\/\s*(5|10)(?![\d.]|\s*등급)/,
  /\d+(\.\d+)?\s?점(으로|입니다|이|을|에|,|\s|만점|대)/,
  /점수[는가를]\s*\d/,
  /만점/,
  /가성비 (등급|평가|점수)/,
];

function textOf(html: string): string {
  return html
    .replace(/<(script|style)[^>]*>[\s\S]*?<\/\1>/g, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z]+;/g, ' ');
}

function scoreHits(html: string): string[] {
  const text = textOf(html);
  return SCORE_PATTERNS.flatMap((re) => {
    const m = text.match(re);
    return m ? [`${re} → "${text.slice(Math.max(0, m.index! - 20), m.index! + m[0].length + 20).trim()}"`] : [];
  });
}

describe('화면에 점수가 없다', () => {
  it('제품 카드 — 전부', () => {
    for (const c of cards) {
      const html = renderToStaticMarkup(createElement(ApplianceCard, { appliance: c }));
      expect(scoreHits(html), c.slug).toEqual([]);
    }
  });

  it('상세 페이지의 히어로·결론·가격·근거 섹션 — 공개 제품 전부', () => {
    for (const a of allAppliances) {
      for (const [name, C] of [
        ['hero', HeroSection],
        ['verdict', VerdictSection],
        ['value', ValueSection],
        ['performance', PerformanceSection],
      ] as const) {
        const html = renderToStaticMarkup(createElement(C, { appliance: a }));
        expect(scoreHits(html), `${a.slug} ${name}`).toEqual([]);
      }
      const meta = getProductEditorial(a.slug);
      const evidence = renderToStaticMarkup(createElement(EditorialMetaSection, { meta }));
      expect(scoreHits(evidence), `${a.slug} evidence`).toEqual([]);
    }
  });

  it('푸터 — 점수 대신 점수를 매기지 않는다고 말하고, 후기처럼 보이는 문구가 없다', () => {
    const html = renderToStaticMarkup(createElement(Footer));
    expect(scoreHits(html)).toEqual([]);
    expect(html).toContain('점수나 별점을 매기지 않');
    for (const phrase of FORBIDDEN_PHRASES) {
      expect(html, `푸터에 "${phrase}"`).not.toContain(phrase);
    }
  });
});

describe('출처 없는 사용자 리뷰가 렌더링되지 않는다', () => {
  it('ReviewsSection 컴포넌트가 더 이상 존재하지 않는다', () => {
    expect(existsSync(join(ROOT, 'src/components/detail/reviews-section.tsx'))).toBe(false);
  });

  it('상세 페이지가 후기 섹션을 렌더하지 않는다', () => {
    const source = readFileSync(join(ROOT, 'src/app/products/[slug]/page.tsx'), 'utf-8');
    expect(source).not.toContain('ReviewsSection');
    expect(source).not.toContain('appliance.reviews');
  });

  it('상세 페이지가 렌더하는 컴포넌트들에 금지 문구가 없다', () => {
    for (const a of allAppliances.slice(0, 12)) {
      const html = [
        renderToStaticMarkup(createElement(HeroSection, { appliance: a })),
        renderToStaticMarkup(createElement(VerdictSection, { appliance: a })),
        renderToStaticMarkup(
          createElement(EditorialMetaSection, { meta: getProductEditorial(a.slug) }),
        ),
      ].join('');
      for (const phrase of FORBIDDEN_PHRASES) {
        expect(html, `${a.slug}: "${phrase}"`).not.toContain(phrase);
      }
    }
  });

  it('구조화 데이터에 aggregateRating/Review를 넣지 않는다', () => {
    const source = readFileSync(join(ROOT, 'src/components/detail/product-jsonld.tsx'), 'utf-8');
    expect(source).not.toMatch(/^\s*aggregateRating:/m);
    expect(source).not.toMatch(/'@type':\s*'Review'/);
    expect(source).not.toMatch(/reviewRating/);
  });
});

describe('편집 신뢰 정보 블록', () => {
  it('메타데이터가 있으면 검수 주체·검수일·출처를 보여준다', () => {
    const meta = getProductEditorial('apple-airpods-pro3');
    expect(meta).toBeDefined();
    const html = renderToStaticMarkup(createElement(EditorialMetaSection, { meta }));
    expect(html).toContain(meta!.reviewedBy);
    expect(html).toContain(meta!.updatedAt);
    expect(html).toContain(meta!.publishedAt);
    for (const s of meta!.sources) {
      expect(html).toContain(s.url);
      expect(html).toContain(s.title);
    }
    expect(html).toContain('/methodology');
    expect(html).toContain('/editorial-policy');
  });

  it('가격 확인일이 있으면 날짜와 함께 보여준다', () => {
    const meta = getProductEditorial('apple-airpods-pro3')!;
    expect(meta.priceCheckedAt).toBe('2026-08-24');
    const html = renderToStaticMarkup(createElement(EditorialMetaSection, { meta }));
    expect(html).toContain('가격 확인일');
    expect(html).toContain('2026-08-24');
  });

  it('가격 확인일이 없으면 그 줄을 만들지 않는다', () => {
    // 시중가를 대조하지 못한 제품 — 확인하지 않은 날짜를 적지 않는다.
    const meta = getProductEditorial('lg-dios-obje-sxs-s834')!;
    expect(meta.priceCheckedAt).toBeUndefined();
    const html = renderToStaticMarkup(createElement(EditorialMetaSection, { meta }));
    expect(html).not.toContain('가격 확인일');
  });

  it('메타데이터가 없으면 빈 껍데기 대신 사실을 밝히고 계산 방법으로 보낸다', () => {
    const html = renderToStaticMarkup(createElement(EditorialMetaSection, { meta: undefined }));
    expect(html).toContain('제조사가');
    expect(html).toContain('외부 출처 링크는 아직 붙이지');
    expect(html).toContain('/methodology');
    expect(html).toContain('/editorial-policy');
    expect(html).not.toContain('참고한 자료');
  });
});

// ── 빌드 산출물 전수 검사. `npm run build` 전에는 건너뛴다.
const OUT = join(ROOT, 'out');
const hasBuild = existsSync(join(OUT, 'index.html'));

function allBuiltHtml(): { name: string; body: string }[] {
  const files: { name: string; body: string }[] = [];
  const walk = (dir: string) => {
    for (const e of readdirSync(dir, { withFileTypes: true })) {
      const full = join(dir, e.name);
      if (e.isDirectory()) walk(full);
      else if (e.name.endsWith('.html')) {
        files.push({ name: relative(OUT, full), body: readFileSync(full, 'utf-8') });
      }
    }
  };
  walk(OUT);
  return files;
}

describe.skipIf(!hasBuild)('빌드된 HTML 전수 검사', () => {
  const pages = hasBuild ? allBuiltHtml() : [];

  it('페이지가 실제로 생성되어 있다', () => {
    expect(pages.length).toBeGreaterThan(50);
  });

  it('href="#" 링크가 한 개도 없다', () => {
    const offenders = pages.filter((p) => p.body.includes('href="#"')).map((p) => p.name);
    expect(offenders, `자리표시자 링크가 남은 페이지: ${offenders.join(', ')}`).toEqual([]);
  });

  it.each(FORBIDDEN_PHRASES)('"%s" 문구가 어느 페이지에도 없다', (phrase) => {
    const offenders = pages.filter((p) => p.body.includes(phrase)).map((p) => p.name);
    expect(offenders, `"${phrase}" 가 남은 페이지: ${offenders.join(', ')}`).toEqual([]);
  });

  // "구매처" 섹션은 유효한 구매 링크가 있는 제품 상세에만 나오고, 쿠팡 링크가 있으면
  // 파트너스 고지 문구가 반드시 함께 나온다.
  it('"구매처" 제목은 유효 링크가 있는 제품 상세에만 렌더된다', () => {
    const bySlug = new Map(allAppliances.map((a) => [a.slug, a]));
    const productPrefix = `products${sep}`;
    const mismatches = pages
      .filter((p) => {
        const rendered = p.body.includes('>구매처</h2>');
        if (!p.name.startsWith(productPrefix)) return rendered;
        const slug = p.name.slice(productPrefix.length).replace(/\.html$/, '');
        return rendered !== hasValidPurchaseLinks(bySlug.get(slug)?.purchaseLinks);
      })
      .map((p) => p.name);
    expect(mismatches, `구매처 섹션 렌더 여부가 데이터와 다른 페이지: ${mismatches.join(', ')}`).toEqual([]);
  });

  it('쿠팡 링크가 있는 제품 상세에는 파트너스 고지 문구가 있다', () => {
    const withCoupang = allAppliances.filter((a) => hasCoupangPartnersLink(a.purchaseLinks));
    for (const a of withCoupang) {
      const page = pages.find((p) => p.name === join('products', `${a.slug}.html`));
      if (!page) continue; // 미발행 제품은 빌드되지 않는다
      expect(page.body, a.slug).toContain('쿠팡 파트너스 활동의 일환으로');
    }
  });

  it('어느 페이지에도 점수가 없다 — 제품·비교·블로그·브랜드·카테고리 포함 전부', () => {
    // 이 둘은 "예전에는 5점 만점 점수를 붙였고 왜 걷었는지"를 설명하는 페이지라 옛 점수를 말한다.
    // 제외는 이 둘뿐이다 — 늘어나면 점수가 다른 경로로 돌아온 것이다.
    const EXPLAINS_REMOVAL = new Set(['methodology.html', 'editorial-policy.html']);
    const hits = pages
      .filter((p) => !EXPLAINS_REMOVAL.has(p.name))
      .map((p) => ({ name: p.name, hits: scoreHits(p.body) }))
      .filter((p) => p.hits.length > 0);
    expect(hits).toEqual([]);
  });
});
