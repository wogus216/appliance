import { describe, it, expect } from 'vitest';
import sitemap from '@/app/sitemap';
import { SITE_URL } from '@/lib/constants';
import { allAppliances } from '@/lib/data/appliances';
import { isProductIndexable } from '@/lib/content-quality';
import { isTraditionalAppliance } from '@/lib/category-config';
import { getScoreAxes } from '@/lib/scoring';
import {
  PAIR_SEPARATOR,
  pairSlug,
  getComparisonPairs,
  getComparisonBySlug,
  isComparisonIndexable,
  getSharedAxes,
  getPairScores,
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
  it('한쪽이라도 색인 자격이 없으면 비교도 색인하지 않는다', () => {
    for (const p of pairs) {
      if (!isProductIndexable(p.a) || !isProductIndexable(p.b)) {
        expect(isComparisonIndexable(p), `${p.slug}가 색인 가능으로 잡힘`).toBe(false);
      }
    }
  });

  it('색인 가능한 조합은 맞댈 축이 하나 이상 있다', () => {
    for (const p of pairs.filter(isComparisonIndexable)) {
      expect(getSharedAxes(p).length, `${p.slug}의 공통 축이 0개`).toBeGreaterThan(0);
    }
  });

  it('제품 상세에서 링크하는 비교는 전부 색인 가능하다', () => {
    for (const a of allAppliances) {
      for (const p of getPairsForProduct(a.slug)) {
        expect(isComparisonIndexable(p), `${p.slug}`).toBe(true);
      }
    }
  });
});

describe('축 비교', () => {
  it('값이 같으면 승자를 만들지 않는다', () => {
    for (const p of pairs) {
      for (const ax of getSharedAxes(p)) {
        if (ax.aValue === ax.bValue) expect(ax.winner).toBe('tie');
        else expect(ax.winner).toBe(ax.aValue > ax.bValue ? 'a' : 'b');
      }
    }
  });

  it('공통 축만 맞댄다 — 한쪽에만 있는 축은 표에 넣지 않는다', () => {
    // 에너지등급 축은 등급 표기가 있는 제품에만 붙는다(scoring.ts).
    // 한쪽에만 있는 축이 섞이면 빈 칸이 이기는 것처럼 보인다.
    for (const p of pairs) {
      const shared = getSharedAxes(p);
      const labels = new Set(shared.map((ax) => ax.label));
      expect(labels.size).toBe(shared.length);
    }
  });

  it('종합 점수 우열이 축 평균과 어긋나지 않는다', () => {
    for (const p of pairs) {
      const s = getPairScores(p);
      if (s.a === s.b) expect(s.winner).toBe('tie');
      else expect(s.winner).toBe(s.a > s.b ? 'a' : 'b');
    }
  });

  it('모든 축에서 앞서는데 종합 점수가 낮은 조합은 없다', () => {
    // 이 사이트가 예전에 실제로 겪은 결함이다 — 모든 축이 같거나 낮은데 종합 점수가
    // 0.1 높은 제품이 있었다(scoring.ts 주석). 비교 페이지는 그 어긋남을 나란히
    // 드러내는 자리라 여기서 한 번 더 막는다.
    for (const p of pairs) {
      const shared = getSharedAxes(p);
      if (shared.length === 0) continue;
      // 축 구성이 서로 다르면(등급 축 유무) 공통 축만으로 종합을 논할 수 없다
      if (getScoreAxes(p.a).length !== shared.length) continue;
      if (getScoreAxes(p.b).length !== shared.length) continue;

      const s = getPairScores(p);
      const aDominates =
        shared.every((ax) => ax.aValue >= ax.bValue) && shared.some((ax) => ax.aValue > ax.bValue);
      if (aDominates) {
        expect(s.a, `${p.slug}: 모든 축이 앞서는데 종합이 낮다`).toBeGreaterThanOrEqual(s.b);
      }
    }
  });
});

describe('소음 이중 슬롯', () => {
  it('TV·무선이어폰은 noise가 dB가 아니라 축 점수다 — 스펙 표에 dB로 내보내면 안 된다', () => {
    // 값 자체를 검사할 수는 없으니(둘 다 숫자다) 카테고리 판정 함수가 두 종류를
    // 실제로 가르는지 확인한다. 이 가정이 깨지면 '연결성 9점'이 '9dB'로 나간다.
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

  it('허브 /compare 와 개별 비교 URL이 충돌하지 않는다', () => {
    expect(urls).toContain(`${SITE_URL}/compare`);
    expect(comparisonUrls).not.toContain(`${SITE_URL}/compare`);
  });
});
