import { describe, it, expect } from 'vitest';
import sitemap from '@/app/sitemap';
import { SITE_URL } from '@/lib/constants';
import { allAppliances } from '@/lib/data/appliances';
import { isProductIndexable } from '@/lib/content-quality';
import { isTraditionalAppliance } from '@/lib/category-config';
import {
  PAIR_SEPARATOR,
  pairSlug,
  getComparisonPairs,
  getComparisonBySlug,
  isComparisonIndexable,
  isComparisonPublishable,
  COMPARISON_PAGES_INDEXED,
  getPairSpecRows,
  getPairsForProduct,
} from '@/lib/comparisons';

const pairs = getComparisonPairs();

describe('비교 조합 생성', () => {
  it('두 제품은 항상 같은 카테고리다', () => {
    const mixed = pairs.filter((p) => p.a.category !== p.b.category);
    expect(mixed.map((p) => p.slug)).toEqual([]);
  });

  it('같은 제품끼리 묶이지 않는다', () => {
    expect(pairs.filter((p) => p.a.slug === p.b.slug)).toEqual([]);
  });

  it('슬러그가 중복되지 않는다', () => {
    const slugs = pairs.map((p) => p.slug);
    const dupes = slugs.filter((s, i) => slugs.indexOf(s) !== i);
    expect([...new Set(dupes)]).toEqual([]);
  });

  it('슬러그는 사전순으로 정규화된다 — a-vs-b와 b-vs-a가 함께 생기지 않는다', () => {
    for (const p of pairs) {
      expect(p.slug).toBe(pairSlug(p.a.slug, p.b.slug));
      expect(p.a.slug.localeCompare(p.b.slug)).toBeLessThan(0);
    }
  });

  it('제품 슬러그 자체에 구분자가 들어 있지 않다 — 들어 있으면 URL이 갈린다', () => {
    const offenders = allAppliances.filter((a) => a.slug.includes(PAIR_SEPARATOR));
    expect(offenders.map((a) => a.slug)).toEqual([]);
  });

  it('슬러그로 다시 찾을 수 있다', () => {
    for (const p of pairs.slice(0, 10)) {
      expect(getComparisonBySlug(p.slug)?.slug).toBe(p.slug);
    }
  });
});

describe('색인 게이트', () => {
  it('한쪽이라도 색인 자격이 없으면 비교도 내보내지 않는다', () => {
    for (const p of pairs) {
      if (!isProductIndexable(p.a) || !isProductIndexable(p.b)) {
        expect(isComparisonPublishable(p), `${p.slug}가 공개 가능으로 잡힘`).toBe(false);
        expect(isComparisonIndexable(p), `${p.slug}가 색인 가능으로 잡힘`).toBe(false);
      }
    }
  });

  it('공개 가능한 조합은 양쪽 다 값이 있는 스펙 줄이 하나 이상 있다(모델번호 제외)', () => {
    const publishable = pairs.filter(isComparisonPublishable);
    expect(publishable.length).toBeGreaterThan(0);
    for (const p of publishable) {
      const both = getPairSpecRows(p).filter((r) => r.label !== '모델번호' && r.a && r.b);
      expect(both.length, `${p.slug}: 맞댈 스펙이 없다`).toBeGreaterThan(0);
    }
  });

  it('제품 상세에서 링크하는 비교는 전부 공개 가능하다', () => {
    for (const a of allAppliances) {
      for (const p of getPairsForProduct(a.slug)) {
        expect(isComparisonPublishable(p), `${p.slug}`).toBe(true);
      }
    }
  });

  // 2026-09-18: 템플릿 조합 페어는 색인하지 않는다. 스위치가 꺼져 있는 동안
  // 어떤 페어도 색인 자격을 얻지 못해야 한다.
  it('색인 스위치가 꺼져 있으면 어떤 페어도 색인하지 않는다', () => {
    expect(COMPARISON_PAGES_INDEXED).toBe(false);
    expect(pairs.filter(isComparisonIndexable)).toEqual([]);
  });
});

describe('점수 없음', () => {
  it('비교표에 점수 모양의 값이 없다 — 맞대는 것은 출처가 있는 스펙뿐이다', () => {
    // 2026-09-27에 종합 점수·항목 점수를 걷었다(src/lib/energy-grade.ts). 라벨로는 거를 수 없다 —
    // TV의 'HDR'·'스마트OS'는 옛 점수 축 이름이면서 동시에 "돌비 비전 · HDR10" 같은 실제 스펙
    // 줄이기도 하다. 그래서 값의 모양을 본다: 단위 없는 1~10 정수나 'N/5'·'N/10'은 점수다.
    // (소수는 거르지 않는다 — 블루투스 '5.4'처럼 실제 스펙이 소수로 적힌다.)
    const SCORE_LIKE = /^\s*(10|[1-9])\s*$|\/\s*(5|10)\s*$/;
    for (const p of pairs) {
      const bad = getPairSpecRows(p).filter((r) => SCORE_LIKE.test(r.a ?? '') || SCORE_LIKE.test(r.b ?? ''));
      expect(bad.map((r) => `${r.label}: ${r.a} / ${r.b}`), p.slug).toEqual([]);
    }
  });
});

describe('소음 이중 슬롯', () => {
  it('TV·무선이어폰은 noise가 dB가 아니라 옛 편집 점수다 — 스펙 표에 dB로 내보내면 안 된다', () => {
    // 값 자체를 검사할 수는 없으니(둘 다 숫자다) 카테고리 판정 함수가 두 종류를
    // 실제로 가르는지 확인한다. 이 가정이 깨지면 점수 '9'가 '9dB'로 나간다.
    const nonTraditional = allAppliances.filter((a) => !isTraditionalAppliance(a.category));
    expect(nonTraditional.length).toBeGreaterThan(0);
    for (const a of nonTraditional) {
      expect(['TV', '무선이어폰']).toContain(a.category);
    }
  });
});

describe('사이트맵 정합성', () => {
  const urls = sitemap().map((e) => e.url);
  const comparisonUrls = urls.filter((u) => u.startsWith(`${SITE_URL}/compare/`));

  it('사이트맵의 비교 URL은 전부 색인 가능한 조합이다', () => {
    for (const url of comparisonUrls) {
      const slug = url.slice(`${SITE_URL}/compare/`.length);
      const pair = getComparisonBySlug(slug);
      expect(pair, `${slug}가 조합 목록에 없다`).toBeDefined();
      expect(isComparisonIndexable(pair!), `${slug}`).toBe(true);
    }
  });

  it('색인 가능한 조합은 빠짐없이 사이트맵에 있다', () => {
    const expected = pairs.filter(isComparisonIndexable).map((p) => `${SITE_URL}/compare/${p.slug}`);
    const missing = expected.filter((u) => !comparisonUrls.includes(u));
    expect(missing).toEqual([]);
  });

  it('색인하지 않는 동안 사이트맵에 비교 페어가 없다', () => {
    expect(comparisonUrls).toEqual([]);
  });

  it('허브 /compare 와 개별 비교 URL이 충돌하지 않는다', () => {
    expect(urls).toContain(`${SITE_URL}/compare`);
    expect(comparisonUrls).not.toContain(`${SITE_URL}/compare`);
  });
});
