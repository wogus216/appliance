import { describe, it, expect } from 'vitest';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { ApplianceCard } from '@/components/appliance-card';
import { HeroSection } from '@/components/detail/hero-section';
import { VerdictSection } from '@/components/detail/verdict-section';
import { EditorialMetaSection } from '@/components/detail/editorial-meta-section';
import { Footer } from '@/components/footer';
import { allAppliances, getCardAppliances } from '@/lib/data/appliances';
import { getProductEditorial } from '@/lib/data/editorial';
import { EDITOR_RATING_LABEL } from '@/lib/constants';

const ROOT = process.cwd();
const cards = getCardAppliances();

/** 표시하면 안 되는 문구 — 편집팀이 쓴 글을 사용자 후기로 보이게 만드는 표현들 */
const FORBIDDEN_PHRASES = ['사용자 리뷰', '사용자 평균', '추천률'];

describe('숫자 점수의 평가 주체가 화면에 드러난다', () => {
  it('제품 카드에 "에디터 평가"가 표시된다', () => {
    const html = renderToStaticMarkup(
      createElement(ApplianceCard, { appliance: cards[0] }),
    );
    expect(html).toContain(EDITOR_RATING_LABEL);
    expect(html).toContain(String(cards[0].rating));
  });

  it('모든 카드가 예외 없이 라벨을 단다', () => {
    for (const c of cards) {
      const html = renderToStaticMarkup(createElement(ApplianceCard, { appliance: c }));
      expect(html, c.slug).toContain(EDITOR_RATING_LABEL);
    }
  });

  it('상세 페이지 히어로에 "에디터 평가"가 표시된다', () => {
    const html = renderToStaticMarkup(
      createElement(HeroSection, { appliance: allAppliances[0] }),
    );
    expect(html).toContain(EDITOR_RATING_LABEL);
  });

  it('결론 섹션의 가성비 별점에도 평가 주체가 붙는다', () => {
    const html = renderToStaticMarkup(
      createElement(VerdictSection, { appliance: allAppliances[0] }),
    );
    expect(html).toContain(EDITOR_RATING_LABEL);
  });

  it('푸터 고지가 같은 용어를 쓴다', () => {
    const html = renderToStaticMarkup(createElement(Footer));
    expect(html).toContain(EDITOR_RATING_LABEL);
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

  it('가격 확인일이 없으면 그 줄을 만들지 않는다', () => {
    const meta = getProductEditorial('apple-airpods-pro3')!;
    expect(meta.priceCheckedAt).toBeUndefined();
    const html = renderToStaticMarkup(createElement(EditorialMetaSection, { meta }));
    expect(html).not.toContain('가격 확인일');
  });

  it('메타데이터가 없으면 빈 껍데기 대신 사실을 밝히고 평가 방법으로 보낸다', () => {
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

  it('"구매처" 제목이 렌더된 페이지가 없다 (유효 링크가 하나도 없으므로)', () => {
    const offenders = pages.filter((p) => p.body.includes('>구매처</h2>')).map((p) => p.name);
    expect(offenders, `구매처 섹션이 남은 페이지: ${offenders.join(', ')}`).toEqual([]);
  });

  it('제품 상세에 "에디터 평가"가 표시된다', () => {
    const productPages = pages.filter((p) => p.name.startsWith(`products${sep}`));
    expect(productPages.length).toBeGreaterThan(0);
    for (const p of productPages) {
      expect(p.body, p.name).toContain(EDITOR_RATING_LABEL);
    }
  });
});
