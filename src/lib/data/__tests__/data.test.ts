import { describe, it, expect } from 'vitest';
import { allAppliances } from '@/lib/data/appliances';
import { getDetailedReview } from '@/lib/data/detailed-reviews';
import { group1 } from '@/lib/data/detailed-reviews/group1';
import { group2 } from '@/lib/data/detailed-reviews/group2';
import { group3 } from '@/lib/data/detailed-reviews/group3';
import { group4 } from '@/lib/data/detailed-reviews/group4';
import { group5 } from '@/lib/data/detailed-reviews/group5';
import type { ApplianceCategory } from '@/types/appliance';

// Mirror of detailed-reviews/index.ts internal record (the index only exports a getter).
const detailedReviews: Record<string, import('@/types/appliance').DetailedReviewSection[]> = {
  ...group1,
  ...group2,
  ...group3,
  ...group4,
  ...group5,
};

const VALID_CATEGORIES: ApplianceCategory[] = [
  '에어컨',
  '제습기',
  '공기청정기',
  '선풍기',
  '세탁기',
  '건조기',
  '냉장고',
  '식기세척기',
  '정수기',
  '로봇청소기',
];

// 효율관리기자재 대상 — energyGrade 표기 대상 카테고리
const ENERGY_MANAGED: ApplianceCategory[] = [
  '에어컨',
  '제습기',
  '세탁기',
  '건조기',
  '냉장고',
  '식기세척기',
];

const VALID_SEVERITIES = ['low', 'medium', 'high'] as const;

const allSlugs = new Set(allAppliances.map((a) => a.slug));

// label for per-product test names
const label = (a: { slug: string }) => a.slug;

describe('data integrity: slugs & ids', () => {
  it('has at least one appliance', () => {
    expect(allAppliances.length).toBeGreaterThan(0);
  });

  it('all slugs are unique', () => {
    const slugs = allAppliances.map((a) => a.slug);
    const dupes = slugs.filter((s, i) => slugs.indexOf(s) !== i);
    expect(dupes, `duplicate slugs: ${[...new Set(dupes)].join(', ')}`).toEqual([]);
    expect(allSlugs.size).toBe(allAppliances.length);
  });

  it.each(allAppliances.map((a) => [label(a), a] as const))(
    'id === slug for %s',
    (_name, a) => {
      expect(a.id).toBe(a.slug);
    },
  );
});

describe('data integrity: references resolve', () => {
  it.each(allAppliances.map((a) => [label(a), a] as const))(
    'similarProducts all resolve & no self-ref for %s',
    (_name, a) => {
      for (const ref of a.similarProducts) {
        expect(allSlugs.has(ref), `${a.slug} -> missing similarProduct "${ref}"`).toBe(true);
        expect(ref, `${a.slug} references itself in similarProducts`).not.toBe(a.slug);
      }
    },
  );

  it.each(allAppliances.map((a) => [label(a), a] as const))(
    'priceAnalysis.alternatives all resolve for %s',
    (_name, a) => {
      for (const ref of a.priceAnalysis.alternatives) {
        expect(allSlugs.has(ref), `${a.slug} -> missing alternative "${ref}"`).toBe(true);
      }
    },
  );

  it('every detailed-review key resolves to a real product slug', () => {
    const dangling = Object.keys(detailedReviews).filter((slug) => !allSlugs.has(slug));
    expect(dangling, `dangling detailed-review keys: ${dangling.join(', ')}`).toEqual([]);
  });
});

describe('data integrity: enums', () => {
  it.each(allAppliances.map((a) => [label(a), a] as const))(
    'category is valid for %s',
    (_name, a) => {
      expect(VALID_CATEGORIES).toContain(a.category);
    },
  );

  it.each(allAppliances.map((a) => [label(a), a] as const))(
    'errorCode severities are valid for %s',
    (_name, a) => {
      for (const ec of a.errorCodes ?? []) {
        expect(VALID_SEVERITIES, `${a.slug} code ${ec.code}`).toContain(ec.severity);
      }
    },
  );

  it.each(allAppliances.map((a) => [label(a), a] as const))(
    'energyGrade present iff energy-managed category for %s',
    (_name, a) => {
      const hasGrade = a.techSpecs.energyGrade != null;
      const shouldHave = ENERGY_MANAGED.includes(a.category);
      expect(
        hasGrade,
        `${a.slug} (${a.category}) energyGrade=${a.techSpecs.energyGrade ?? 'none'} but expected ${shouldHave ? 'present' : 'absent'}`,
      ).toBe(shouldHave);
    },
  );
});

describe('data integrity: completeness', () => {
  it.each(allAppliances.map((a) => [label(a), a] as const))(
    'has non-empty image for %s',
    (_name, a) => {
      expect(a.image, `${a.slug} missing image`).toBeTruthy();
      expect((a.image ?? '').trim().length).toBeGreaterThan(0);
    },
  );

  it.each(allAppliances.map((a) => [label(a), a] as const))(
    'has >=1 review with non-empty pros AND cons for %s',
    (_name, a) => {
      expect(a.reviews.length, `${a.slug} has no reviews`).toBeGreaterThanOrEqual(1);
      a.reviews.forEach((r, i) => {
        expect(
          r.pros && r.pros.length > 0,
          `${a.slug} review[${i}] missing pros`,
        ).toBe(true);
        expect(
          r.cons && r.cons.length > 0,
          `${a.slug} review[${i}] missing cons`,
        ).toBe(true);
      });
    },
  );

  it.each(allAppliances.map((a) => [label(a), a] as const))(
    'has non-empty features for %s',
    (_name, a) => {
      expect(a.features.length, `${a.slug} has no features`).toBeGreaterThan(0);
    },
  );

  it.each(allAppliances.map((a) => [label(a), a] as const))(
    'has errorCodes with no duplicate code for %s',
    (_name, a) => {
      expect(a.errorCodes, `${a.slug} missing errorCodes`).toBeDefined();
      const codes = (a.errorCodes ?? []).map((e) => e.code);
      expect(codes.length, `${a.slug} has empty errorCodes`).toBeGreaterThan(0);
      const dupes = codes.filter((c, i) => codes.indexOf(c) !== i);
      expect(dupes, `${a.slug} duplicate errorCode(s): ${[...new Set(dupes)].join(', ')}`).toEqual([]);
    },
  );
});

describe('data integrity: numeric sanity', () => {
  it.each(allAppliances.map((a) => [label(a), a] as const))(
    'rating within [0,5] for %s',
    (_name, a) => {
      expect(a.rating).toBeGreaterThanOrEqual(0);
      expect(a.rating).toBeLessThanOrEqual(5);
    },
  );

  it.each(allAppliances.map((a) => [label(a), a] as const))(
    'streetPrice <= price (if set) for %s',
    (_name, a) => {
      if (a.priceAnalysis.streetPrice != null) {
        expect(
          a.priceAnalysis.streetPrice,
          `${a.slug} streetPrice ${a.priceAnalysis.streetPrice} > price ${a.price}`,
        ).toBeLessThanOrEqual(a.price);
      }
    },
  );

  it.each(allAppliances.map((a) => [label(a), a] as const))(
    'valueRating within [1,5] for %s',
    (_name, a) => {
      expect(a.priceAnalysis.valueRating).toBeGreaterThanOrEqual(1);
      expect(a.priceAnalysis.valueRating).toBeLessThanOrEqual(5);
    },
  );
});

describe('data integrity: detailed reviews', () => {
  const entries = Object.entries(detailedReviews);

  it('has at least one detailed review', () => {
    expect(entries.length).toBeGreaterThan(0);
  });

  it.each(entries.map(([slug, sections]) => [slug, sections] as const))(
    'flagship "%s" has >=1 section with non-empty heading & body',
    (slug, sections) => {
      expect(sections.length, `${slug} has no sections`).toBeGreaterThanOrEqual(1);
      sections.forEach((s, i) => {
        expect((s.heading ?? '').trim().length, `${slug} section[${i}] empty heading`).toBeGreaterThan(0);
        expect((s.body ?? '').trim().length, `${slug} section[${i}] empty body`).toBeGreaterThan(0);
      });
      // sanity: the getter returns the same data
      expect(getDetailedReview(slug)).toBe(sections);
    },
  );
});
