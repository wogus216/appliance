import { describe, it, expect } from 'vitest';
import { allCatalogAppliances } from '@/lib/data/appliances';
import {
  VERIFIED_SPECS,
  type VerifiableSpecField,
} from '@/lib/data/appliances/verified-specs';
import { isTraditionalAppliance } from '@/lib/category-config';
import { isCitableSource } from '@/lib/source-trust';
import { getDetailedReview } from '@/lib/data/detailed-reviews';
import { UNVERIFIED_SLUGS } from '@/lib/data/appliances/unverified';

/**
 * 근거 없는 수치가 카탈로그에 다시 들어오는 것을 막는다.
 *
 * 2026-08 감사에서 확인된 사실: 카탈로그의 소비전력·크기·무게는 출처가 없었고
 * 대조 가능했던 것의 81%가 실제와 달랐다. 그래서 근거를 찾은 값만 남기고
 * 224개 필드를 지웠다. 다시 채우려면 verified-specs.ts에 출처를 함께 적어야 한다.
 *
 * 이 테스트가 없으면 "값이 비어 보이니 채워 넣자"는 선의의 수정이 조용히
 * 같은 문제를 되살린다.
 */

const catalogSlugs = new Set(allCatalogAppliances.map((a) => a.slug));

/** 이 제품이 실제로 들고 있는 검증 대상 필드 */
function presentFields(a: (typeof allCatalogAppliances)[number]): VerifiableSpecField[] {
  const out: VerifiableSpecField[] = [];
  if (a.specs.powerConsumption != null) out.push('powerConsumption');
  // noise는 생활가전에서만 소음(dB)이다. 비가전은 '저소음' 에디터 점수라 대상이 아니다.
  if (isTraditionalAppliance(a.category) && a.specs.noise != null) out.push('noise');
  if (a.techSpecs.dimensions != null) out.push('dimensions');
  if (a.techSpecs.weight != null) out.push('weight');
  return out;
}

describe('출처 표(verified-specs.ts) 자체의 정합성', () => {
  it('모든 slug가 실재하는 제품이다', () => {
    const dangling = Object.keys(VERIFIED_SPECS).filter((s) => !catalogSlugs.has(s));
    expect(dangling, `카탈로그에 없는 slug: ${dangling.join(', ')}`).toEqual([]);
  });

  it.each(Object.entries(VERIFIED_SPECS))('%s: 출처가 확인 가능한 발행처다', (slug, rec) => {
    expect(rec.fields.length, `${slug}: 필드가 비었다`).toBeGreaterThan(0);
    expect(() => new URL(rec.source), `${slug}: URL이 아니다`).not.toThrow();
    expect(isCitableSource(rec.source), `${slug}: ${rec.source} 는 근거로 인정하지 않는 도메인`).toBe(true);
  });
});

describe('카탈로그의 수치는 전부 출처 표에 등재돼 있다', () => {
  it('표에 없는 수치를 들고 있는 제품이 없다', () => {
    const offenders: string[] = [];
    for (const a of allCatalogAppliances) {
      const allowed = new Set(VERIFIED_SPECS[a.slug]?.fields ?? []);
      for (const f of presentFields(a)) {
        if (!allowed.has(f)) offenders.push(`${a.slug}.${f}`);
      }
    }
    expect(
      offenders,
      `출처 없이 값을 들고 있는 필드: ${offenders.join(', ')}\n` +
        'verified-specs.ts 에 출처와 함께 등재하거나, 값을 비우세요.',
    ).toEqual([]);
  });

  it('표에 적어 놓고 값이 비어 있는 항목도 없다 (표가 현실과 어긋나지 않는다)', () => {
    const missing: string[] = [];
    for (const [slug, rec] of Object.entries(VERIFIED_SPECS)) {
      const a = allCatalogAppliances.find((x) => x.slug === slug);
      if (!a) continue;
      const present = new Set(presentFields(a));
      for (const f of rec.fields) {
        if (!present.has(f)) missing.push(`${slug}.${f}`);
      }
    }
    expect(missing, `표에는 있는데 데이터에 없는 필드: ${missing.join(', ')}`).toEqual([]);
  });
});

// 구조화 필드만 지우면 산문에 박힌 같은 숫자가 그대로 남는다.
// 실제로 첫 배포에서 소음 값을 지웠는데도 페이지에 "소음은 30dB로"가 남아 있었다.
describe('본문의 dB 주장도 근거를 따른다', () => {
  it('소음 값이 없는 생활가전 본문에 dB 수치가 없다', () => {
    const offenders: string[] = [];
    for (const a of allCatalogAppliances) {
      if (!isTraditionalAppliance(a.category)) continue;
      if (a.specs.noise != null) continue;
      if (UNVERIFIED_SLUGS.has(a.slug)) continue; // 공개 보류 제품은 되살릴 때 함께 검수한다
      const prose = [
        ...(getDetailedReview(a.slug) ?? []).map((s) => s.body),
        a.editorComment ?? '',
        a.description,
        a.oneliner ?? '',
        ...a.features,
      ].join(' ');
      const m = prose.match(/\d+(?:\.\d+)?\s*dB/g);
      if (m) offenders.push(`${a.slug}: ${[...new Set(m)].join(', ')}`);
    }
    expect(
      offenders,
      `소음 근거가 없는데 본문이 dB를 말하는 제품:\n${offenders.join('\n')}`,
    ).toEqual([]);
  });
});

describe('감사 결과의 규모가 유지된다', () => {
  it('수치를 들고 있는 제품이 카탈로그 전체보다 훨씬 적다', () => {
    const withAny = allCatalogAppliances.filter((a) => presentFields(a).length > 0);
    // 감사 시점 21개. 늘어나는 것은 좋지만, 검증 없이 늘면 위 테스트가 먼저 막는다.
    expect(withAny.length).toBe(Object.keys(VERIFIED_SPECS).length);
    expect(withAny.length).toBeLessThan(allCatalogAppliances.length);
  });
});
