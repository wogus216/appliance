import { describe, it, expect } from 'vitest';
import {
  allAppliances,
  allCatalogAppliances,
  getApplianceBySlug,
  getCardAppliances,
  getSimilarProducts,
  getAllBrands,
  getAllCategories,
} from '@/lib/data/appliances';
import { UNVERIFIED_SLUGS } from '@/lib/data/appliances/unverified';
import { getProductEditorial } from '@/lib/data/editorial';
import { getDetailedReview } from '@/lib/data/detailed-reviews';
import { getAllCategoryGuides } from '@/lib/data/category-guides';
import { allBlogPosts } from '@/lib/data/blog';
import { allBrandProfiles } from '@/lib/data/brands';
import { getBrandErrorCodes, getErrorCodeBrands } from '@/lib/error-codes';
import { getPopularComparisons } from '@/lib/popular-comparisons';
import sitemap from '@/app/sitemap';
import { SITE_URL, BRAND_LABELS } from '@/lib/constants';

/**
 * 공개 경계 — 모델번호를 확인하지 못한 제품이 화면 어디에도 새어 나가지 않는지.
 *
 * 왜 이 테스트가 있는가: 필터를 `allAppliances` 한 곳에 뒀지만, 누군가
 * `allCatalogAppliances`를 화면 코드에서 쓰면 조용히 뚫린다. 그 구멍은 사람이
 * 화면을 하나하나 열어 보기 전에는 드러나지 않으므로 기계로 잡는다.
 */

const unverified = [...UNVERIFIED_SLUGS];
const catalogSlugs = new Set(allCatalogAppliances.map((a) => a.slug));

describe('보류 목록 자체의 정합성', () => {
  it('비어 있지 않다', () => {
    expect(unverified.length).toBeGreaterThan(0);
  });

  it('모든 slug가 실재하는 카탈로그 제품이다 (오타로 무효가 된 줄이 없다)', () => {
    const dangling = unverified.filter((s) => !catalogSlugs.has(s));
    expect(dangling, `카탈로그에 없는 slug: ${dangling.join(', ')}`).toEqual([]);
  });

  it('공개 카탈로그 = 전체 − 보류', () => {
    expect(allAppliances.length).toBe(allCatalogAppliances.length - UNVERIFIED_SLUGS.size);
  });
});

describe('보류 제품은 어떤 목록에도 나오지 않는다', () => {
  it('allAppliances', () => {
    const leaked = allAppliances.filter((a) => UNVERIFIED_SLUGS.has(a.slug)).map((a) => a.slug);
    expect(leaked).toEqual([]);
  });

  it('getApplianceBySlug는 undefined를 준다 (→ 페이지가 notFound로 간다)', () => {
    for (const s of unverified) {
      expect(getApplianceBySlug(s), s).toBeUndefined();
    }
  });

  it('카드 목록(홈·카테고리·브랜드·검색)', () => {
    const leaked = getCardAppliances().filter((a) => UNVERIFIED_SLUGS.has(a.slug)).map((a) => a.slug);
    expect(leaked).toEqual([]);
  });

  it('유사 제품 — 공개 제품이 보류 제품을 참조해도 화면에는 안 나온다', () => {
    // 참조 자체는 데이터에 남아 있다. 되살릴 때 다시 이어져야 하므로 지우지 않는다.
    const referencing = allAppliances.filter((a) =>
      a.similarProducts.some((s) => UNVERIFIED_SLUGS.has(s)),
    );
    expect(referencing.length, '참조가 하나도 없으면 이 테스트는 아무것도 지키지 않는다').toBeGreaterThan(0);

    for (const a of allAppliances) {
      const leaked = getSimilarProducts(a.slug).filter((s) => UNVERIFIED_SLUGS.has(s.slug));
      expect(leaked.map((s) => s.slug), a.slug).toEqual([]);
    }
  });

  it('에러코드 브랜드 허브', () => {
    for (const brand of getErrorCodeBrands()) {
      for (const group of getBrandErrorCodes(brand)) {
        for (const entry of group.entries) {
          const leaked = entry.products.filter((p) => UNVERIFIED_SLUGS.has(p.slug));
          expect(leaked.map((p) => p.slug), `${brand}/${entry.code}`).toEqual([]);
        }
      }
    }
  });

  it('인기 비교 조합', () => {
    const cards = getCardAppliances();
    for (const c of getPopularComparisons(cards, getAllCategories())) {
      for (const item of c.items) {
        expect(UNVERIFIED_SLUGS.has(item.slug), item.slug).toBe(false);
      }
    }
  });

  it('사이트맵', () => {
    const urls = sitemap().map((e) => e.url);
    for (const s of unverified) {
      expect(urls, s).not.toContain(`${SITE_URL}/products/${s}`);
    }
  });
});

describe('공개 제품 본문이 없는 제품을 추천하지 않는다', () => {
  // 산문 속 제품 추천은 링크가 아니라 문장이라 404로도 잡히지 않는다.
  // 보류된 제품을 "대안으로 보라"고 권하면 읽는 사람만 헛걸음한다.
  // 모델 토큰만 본다. 'BHR6068EU (EU/글로벌)' 같은 주석은 떼어 낸다.
  const deadModels = allCatalogAppliances
    .filter((a) => UNVERIFIED_SLUGS.has(a.slug))
    .map((a) => a.modelNumber.split(/[\s(]/)[0])
    .filter((m) => m.length > 5);

  // 모델번호뿐 아니라 '샤오미 X10'처럼 이름으로 부르는 경우도 잡아야 한다.
  // 실제로 남은 언급의 절반이 이름 쪽이었다.
  const deadNames = allCatalogAppliances
    .filter((a) => UNVERIFIED_SLUGS.has(a.slug))
    .map((a) => `${BRAND_LABELS[a.brand] ?? a.brand} ${a.name}`.trim())
    .filter((n) => n.length > 4);

  const findDead = (label: string, text: string) =>
    [...deadModels, ...deadNames]
      .filter((m) => text.includes(m))
      .map((m) => `${label} → ${m}`);

  it('제품 상세 본문', () => {
    const offenders = allAppliances.flatMap((a) =>
      findDead(
        a.slug,
        [
          ...(getDetailedReview(a.slug) ?? []).map((s) => s.body),
          a.editorComment ?? '',
          a.description,
        ].join(' '),
      ),
    );
    expect(offenders, `보류 제품을 언급하는 본문: ${offenders.join(', ')}`).toEqual([]);
  });

  // 카테고리 가이드는 광고가 붙은 색인 페이지다. 여기 남은 언급이 실제로 가장 많았다.
  it('카테고리 구매 가이드', () => {
    const offenders = getAllCategoryGuides().flatMap((g) =>
      findDead(
        g.category,
        [g.intro, ...g.sections.map((s) => s.body), ...g.faqs.map((f) => f.answer)].join(' '),
      ),
    );
    expect(offenders, `가이드가 언급하는 보류 제품: ${offenders.join(', ')}`).toEqual([]);
  });

  // 블로그는 광고가 붙는 색인 페이지이고 제품 이름을 가장 많이 부르는 자리다.
  it('블로그 글', () => {
    const offenders = allBlogPosts.flatMap((p) =>
      findDead(
        p.slug,
        [
          p.title,
          p.description,
          p.question,
          ...p.answer,
          ...p.sections.flatMap((s) => [s.heading, ...s.body]),
          ...p.decisionRules.flatMap((r) => [r.when, r.then]),
          ...p.faqs.flatMap((f) => [f.question, f.answer]),
          ...(p.comparison
            ? [
                p.comparison.caption,
                ...p.comparison.columns,
                ...p.comparison.rows.flatMap((r) => [r.label, ...r.values, r.note ?? '']),
                p.comparison.footnote,
              ]
            : []),
        ].join(' '),
      ),
    );
    expect(offenders, `블로그가 언급하는 보류 제품: ${offenders.join(', ')}`).toEqual([]);
  });

  it('브랜드 프로필', () => {
    const offenders = allBrandProfiles.flatMap((p) =>
      findDead(
        p.brand,
        [
          p.intro,
          p.editorNote,
          p.errorCodePattern ?? '',
          p.serviceCenter?.note ?? '',
          ...p.lines.map((l) => l.what),
        ].join(' '),
      ),
    );
    expect(offenders, `브랜드 원고가 언급하는 보류 제품: ${offenders.join(', ')}`).toEqual([]);
  });
});

describe('근거 없는 파생 숫자가 다시 들어오지 못한다', () => {
  // 월 전기요금은 히어로 배지·10년 총비용 계산기·등급별 요금표를 전부 움직인다.
  // 2026-08-23 감사에서 65개 전부 출처가 없어 걷어냈다(docs/spec-audit.md).
  // 다시 넣으려면 그 제품에 편집 출처가 함께 있어야 한다.
  it('월 전기요금이 있는 제품은 편집 출처를 갖는다', () => {
    const offenders = allCatalogAppliances
      .filter((a) => a.techSpecs.monthlyElectricityCost != null)
      .filter((a) => !getProductEditorial(a.slug)?.sources.length)
      .map((a) => a.slug);
    expect(
      offenders,
      `출처 없이 월 전기요금을 들고 있는 제품: ${offenders.join(', ')}`,
    ).toEqual([]);
  });
});

/**
 * 브랜드 원고가 공개 카탈로그와 어긋나지 않는다.
 *
 * 2026-08-24에 발견한 것: 41개 제품을 공개 보류한 뒤에도 브랜드 프로필은
 * "카탈로그에 등록된 X 제품은 총 6개 모델"처럼 옛 숫자를 그대로 말하고 있었고,
 * 가격도 감사 이전 값(소니 359,000원 등)이 남아 있었다. 제품 이름을 부르지 않는
 * 문장이라 기존 findDead 검사에 걸리지 않았다.
 */
describe('브랜드 원고가 공개 카탈로그와 어긋나지 않는다', () => {
  const profileTexts = (p: (typeof allBrandProfiles)[number]) =>
    [
      p.intro,
      p.editorNote,
      p.errorCodePattern ?? '',
      p.serviceCenter?.note ?? '',
      ...p.lines.map((l) => `${l.name ?? ''} ${l.what}`),
    ].join('\n');

  it('"총 N개 모델"이 실제 공개 제품 수와 같다', () => {
    const offenders: string[] = [];
    for (const p of allBrandProfiles) {
      if (!getAllBrands().includes(p.brand)) continue; // 페이지가 생성되지 않는 브랜드는 제외
      const items = allAppliances.filter((a) => a.brand === p.brand);
      const cats = new Set(items.map((a) => a.category));
      for (const m of profileTexts(p).matchAll(/총\s*(\d+)\s*개\s*모델(?:,\s*(\d+)\s*개\s*카테고리)?/g)) {
        const n = Number(m[1]);
        const c = m[2] ? Number(m[2]) : null;
        if (n !== items.length || (c !== null && c !== cats.size)) {
          offenders.push(`${p.brand}: "${m[0]}" ≠ 실제 ${items.length}종/${cats.size}카테고리`);
        }
      }
    }
    expect(offenders, offenders.join('\n')).toEqual([]);
  });

  // "에어팟 프로 3(369,000원)"처럼 제품 이름 뒤에 붙은 가격은 카탈로그 값이어야 한다.
  // 라인업 설명에 나오는 다른 제품 가격까지 잡지 않도록 이름 근처만 본다.
  it('제품 이름 뒤에 붙은 가격이 카탈로그 가격과 같다', () => {
    const offenders: string[] = [];
    for (const p of allBrandProfiles) {
      const text = profileTexts(p);
      for (const a of allAppliances.filter((x) => x.brand === p.brand)) {
        let from = 0;
        for (;;) {
          const at = text.indexOf(a.name, from);
          if (at === -1) break;
          from = at + a.name.length;
          const window = text.slice(from, from + 40);
          const m = /([\d,]{6,})\s*원/.exec(window);
          if (m) {
            const shown = Number(m[1].replace(/,/g, ''));
            if (a.price !== shown) {
              offenders.push(
                `${p.brand}/${a.slug}: 원고 ${shown} ≠ 카탈로그 ${a.price ?? '없음'}`,
              );
            }
          }
        }
      }
    }
    expect(offenders, offenders.join('\n')).toEqual([]);
  });

  // 월 전기요금 추정치는 65건 전량 삭제했다. 브랜드 원고에서 되살아나지 않도록 막는다.
  it('브랜드 원고가 월 전기요금 추정치를 말하지 않는다', () => {
    const offenders: string[] = [];
    for (const p of allBrandProfiles) {
      const m = profileTexts(p).match(/(월\s*(?:예상\s*)?전기요금|월\s*(?:총\s*)?유지비)[^.]{0,40}?[\d,]+\s*(?:만)?원/);
      if (m) offenders.push(`${p.brand}: ${m[0]}`);
    }
    expect(offenders, offenders.join('\n')).toEqual([]);
  });
});

/**
 * 카테고리 가이드도 공개 카탈로그와 어긋나지 않는다.
 *
 * 가이드 12편은 광고가 붙는 색인 페이지이고 이 사이트에서 분량이 가장 큰 원고다.
 * 2026-08-24 점검에서 가격 문장 31건 중 14건이 어긋나 있었다 — 지운 가격을
 * 그대로 말하거나(RS84 189만원), 삭제한 월 전기요금 추정치를 "이 사이트 기준으로"
 * 라며 인용하고 있었다. 제품·브랜드 원고와 같은 기준을 여기에도 적용한다.
 */
describe('카테고리 가이드가 공개 카탈로그와 어긋나지 않는다', () => {
  const guideTexts = (g: ReturnType<typeof getAllCategoryGuides>[number]) =>
    [g.intro, ...g.sections.map((s) => s.body), ...g.faqs.map((f) => f.answer)];

  it('제품 이름 뒤에 붙은 가격이 카탈로그 가격과 같다', () => {
    const offenders: string[] = [];
    for (const g of getAllCategoryGuides()) {
      const text = guideTexts(g).join('\n');
      for (const a of allAppliances) {
        for (const key of [a.name, `${BRAND_LABELS[a.brand] ?? a.brand} ${a.name}`]) {
          let from = 0;
          for (;;) {
            const at = text.indexOf(key, from);
            if (at === -1) break;
            from = at + key.length;
            // '이름(846L, 189만원)'처럼 괄호 안에 붙는 경우까지 잡도록 창을 짧게 둔다
            const m = /^[^.]{0,24}?([\d][\d,.]*)\s*(만원|원)/.exec(text.slice(from, from + 40));
            if (!m) continue;
            const shown =
              m[2] === '만원' ? Math.round(parseFloat(m[1].replace(/,/g, '')) * 10000)
                              : Number(m[1].replace(/,/g, ''));
            const ok =
              a.price != null &&
              (m[2] === '만원'
                ? Math.floor(a.price / 10000) === Math.floor(shown / 10000)
                : a.price === shown);
            if (!ok) {
              offenders.push(
                `${g.category}/${a.slug}: 원고 "${m[0].trim()}" ≠ 카탈로그 ${a.price ?? '없음'}`,
              );
            }
          }
        }
      }
    }
    expect(offenders, offenders.join('\n')).toEqual([]);
  });

  // 월 전기요금 추정치는 전량 삭제했다. 다만 출처를 밝힌 외부 조사 인용은 예외로 둔다.
  it('가이드가 출처 없는 월 전기요금 추정치를 말하지 않는다', () => {
    const COST = /(월\s*(?:예상\s*|평균\s*|총\s*)?전기요금|월\s*(?:총\s*)?유지비)[^.]{0,60}?[\d,]+\s*(?:만|천)?원/;
    const offenders: string[] = [];
    for (const g of getAllCategoryGuides()) {
      for (const t of guideTexts(g)) {
        for (const sent of t.split(/(?<=다\.)\s*/)) {
          const m = sent.match(COST);
          if (!m) continue;
          // 같은 문장이나 바로 앞 문맥에서 조사 주체를 밝혔으면 인용으로 인정한다
          if (/한국소비자원|소비자원|같은 시험|같은 조사/.test(sent)) continue;
          offenders.push(`${g.category}: ${m[0]}`);
        }
      }
    }
    expect(offenders, offenders.join('\n')).toEqual([]);
  });

  // 삭제된 카탈로그 값을 근거로 삼는 문장을 원천 차단한다.
  it('가이드가 "이 사이트 기준" 요금 표기를 근거로 삼지 않는다', () => {
    const offenders: string[] = [];
    for (const g of getAllCategoryGuides()) {
      for (const t of guideTexts(g)) {
        const m = t.match(/이 사이트[^.]{0,30}(기준|표기)[^.]{0,60}?[\d,]+\s*(?:만|천)?원/);
        if (m) offenders.push(`${g.category}: ${m[0]}`);
      }
    }
    expect(offenders, offenders.join('\n')).toEqual([]);
  });
});

describe('보류로 비어 버린 축은 목록에서 사라진다', () => {
  it('제품이 하나도 남지 않은 브랜드는 브랜드 목록에 없다', () => {
    const brands = new Set(getAllBrands());
    const withProducts = new Set(allAppliances.map((a) => a.brand));
    expect([...brands].filter((b) => !withProducts.has(b))).toEqual([]);
  });

  it('제품이 하나도 남지 않은 카테고리는 카테고리 목록에 없다', () => {
    const cats = new Set(getAllCategories());
    const withProducts = new Set(allAppliances.map((a) => a.category));
    expect([...cats].filter((c) => !withProducts.has(c))).toEqual([]);
  });
});
