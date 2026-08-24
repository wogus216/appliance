import { describe, it, expect } from 'vitest';
import { allCatalogAppliances } from '@/lib/data/appliances';
import {
  VERIFIED_SPECS,
  VERIFIED_PRICES,
  VERIFIED_PRODUCT_PAGES,
  type VerifiableSpecField,
} from '@/lib/data/appliances/verified-specs';
import { PRODUCT_EDITORIAL } from '@/lib/data/editorial';
import { registrableDomain } from '@/lib/source-trust';
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

/**
 * 제품 확인 출처 표.
 *
 * 이 표는 색인 게이트를 직접 움직인다 — 채워 넣는 순간 발행처가 하나뿐이던 제품이
 * 색인 대상이 된다. 그래서 "발행처를 늘리려고 아무 URL이나 넣는" 유혹이 생기는 자리다.
 * 같은 도메인을 또 넣으면 발행처가 늘지 않으므로 그것부터 막는다.
 */
describe('제품 확인 출처 표', () => {
  it('모든 slug가 실재하는 제품이다', () => {
    const dangling = Object.keys(VERIFIED_PRODUCT_PAGES).filter((s) => !catalogSlugs.has(s));
    expect(dangling, `카탈로그에 없는 slug: ${dangling.join(', ')}`).toEqual([]);
  });

  it.each(Object.entries(VERIFIED_PRODUCT_PAGES))('%s: 출처·확인일·확인 내용이 유효하다', (slug, rec) => {
    expect(() => new URL(rec.source), `${slug}: URL이 아니다`).not.toThrow();
    expect(isCitableSource(rec.source), `${slug}: ${rec.source} 는 근거로 인정하지 않는 도메인`).toBe(true);
    expect(rec.checkedAt, slug).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    // 무엇을 대조했는지 적지 않으면 나중에 이 줄을 검증할 방법이 없다
    expect(rec.what.trim().length, `${slug}: what이 비었다`).toBeGreaterThan(10);
  });

  // 같은 발행처를 한 번 더 넣는 것은 색인 게이트에 아무 의미가 없다.
  // 그런 줄이 있으면 "출처를 늘렸다"는 착각만 남는다.
  it('사양·가격 출처와 다른 발행처다', () => {
    const offenders: string[] = [];
    for (const [slug, rec] of Object.entries(VERIFIED_PRODUCT_PAGES)) {
      const mine = registrableDomain(rec.source);
      for (const other of [VERIFIED_SPECS[slug]?.source, VERIFIED_PRICES[slug]?.source]) {
        if (other && registrableDomain(other) === mine) {
          offenders.push(`${slug}: ${mine} 는 이미 다른 표에 있다 (발행처가 늘지 않음)`);
        }
      }
    }
    expect(offenders, offenders.join('\n')).toEqual([]);
  });

  it('편집 메타데이터에 실제로 반영돼 있다 (생성기를 안 돌린 채 표만 고치지 않았다)', () => {
    const missing = Object.entries(VERIFIED_PRODUCT_PAGES)
      .filter(([slug, rec]) => !PRODUCT_EDITORIAL[slug]?.sources.some((s) => s.url === rec.source))
      .map(([slug]) => slug);
    expect(
      missing,
      `표에는 있는데 product-editorial.ts에 없는 제품: ${missing.join(', ')}\n` +
        'node scripts/generate-editorial.mjs 를 실행하세요.',
    ).toEqual([]);
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

describe('가격도 출처 표를 따른다', () => {
  it('가격이 있는 제품은 전부 VERIFIED_PRICES에 있다', () => {
    const offenders = allCatalogAppliances
      .filter((a) => a.price != null || a.priceAnalysis.msrp != null)
      .filter((a) => !VERIFIED_PRICES[a.slug])
      .map((a) => a.slug);
    expect(offenders, `출처 없이 가격을 들고 있는 제품: ${offenders.join(', ')}`).toEqual([]);
  });

  it('표에 있는 제품은 실제로 가격을 갖는다', () => {
    const missing = Object.keys(VERIFIED_PRICES)
      .filter((slug) => {
        const a = allCatalogAppliances.find((x) => x.slug === slug);
        return a && a.price == null;
      });
    expect(missing, `표에는 있는데 값이 없는 제품: ${missing.join(', ')}`).toEqual([]);
  });

  it.each(Object.entries(VERIFIED_PRICES))('%s: 출처와 확인일이 유효하다', (slug, rec) => {
    expect(() => new URL(rec.source), slug).not.toThrow();
    expect(isCitableSource(rec.source), `${slug}: ${rec.source}`).toBe(true);
    expect(rec.checkedAt, slug).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  // 정가/실거래가 두 축은 더 이상 쓰지 않는다. 하나만 두고 확인일로 신선도를 밝힌다.
  it('streetPrice를 쓰는 제품이 없다', () => {
    const offenders = allCatalogAppliances
      .filter((a) => a.priceAnalysis.streetPrice != null)
      .map((a) => a.slug);
    expect(offenders).toEqual([]);
  });
});

// monthlyElectricityCost는 65건 전량 삭제했다. 본문이 그 숫자를 계속 말하면
// 데이터에서 지운 의미가 없다.
describe('본문이 삭제된 운영비 추정치를 말하지 않는다', () => {
  it('공개 제품 본문에 "월 전기요금 N원" 류의 추정치가 없다', () => {
    const COST = /(월\s*(?:예상\s*)?전기요금|월\s*(?:총\s*)?유지비)[^.]{0,40}?[\d,]+\s*(?:만)?원/;
    const offenders: string[] = [];
    for (const a of allCatalogAppliances) {
      if (UNVERIFIED_SLUGS.has(a.slug)) continue;
      const prose = [
        ...(getDetailedReview(a.slug) ?? []).map((s) => s.body),
        a.editorComment ?? '',
        a.description,
        a.oneliner ?? '',
      ].join(' ');
      const m = prose.match(COST);
      if (m) offenders.push(`${a.slug}: ${m[0]}`);
    }
    expect(offenders, `운영비 추정치를 말하는 본문:\n${offenders.join('\n')}`).toEqual([]);
  });
});

/**
 * 산문 속 가격도 출처 표를 따른다.
 *
 * 2026-08-24에 발견한 것: 가격 49개를 지웠는데도 심층 리뷰의 "유지비·경제성" 섹션에
 * "정가 149만원, 실거래가 119만원의 premium 티어" 같은 문장이 16건 그대로 남아 있었다.
 * 가격을 확인하지 못한 제품이 화면에서 금액을 말하고 있었다는 뜻이다.
 *
 * 구조화 필드만 지우는 것으로는 부족하다는 것을 세 번째로 확인해 기계로 막는다.
 */
describe('산문 속 가격도 출처 표를 따른다', () => {
  const prose = (a: (typeof allCatalogAppliances)[number]) =>
    [
      a.description,
      a.oneliner ?? '',
      a.editorComment ?? '',
      ...a.features,
      ...a.targetUsers.recommended,
      ...a.targetUsers.notRecommended,
      ...(getDetailedReview(a.slug) ?? []).map((s) => s.body),
    ].join('\n');

  it('가격을 확인하지 못한 공개 제품의 본문에 금액이 없다', () => {
    const offenders: string[] = [];
    for (const a of allCatalogAppliances) {
      if (UNVERIFIED_SLUGS.has(a.slug)) continue; // 보류 제품은 되살릴 때 함께 검수한다
      if (a.price != null) continue;
      const m = prose(a).match(/[\d][\d,]*\s*만원|[\d,]{6,}\s*원/);
      if (m) offenders.push(`${a.slug}: "${m[0]}"`);
    }
    expect(
      offenders,
      `가격을 확인하지 못했는데 본문이 금액을 말하는 제품:\n${offenders.join('\n')}`,
    ).toEqual([]);
  });

  // '정가'와 '실거래가'를 나눠 주장하지 않는다는 것이 이 사이트의 표기 원칙이다
  // (verified-specs.ts 상단 주석). 데이터에서 streetPrice를 지웠으니 산문에서도 지운다.
  it("본문이 '정가/실거래가'를 나눠 주장하지 않는다", () => {
    const offenders: string[] = [];
    for (const a of allCatalogAppliances) {
      if (UNVERIFIED_SLUGS.has(a.slug)) continue;
      const m = prose(a).match(/정가[^.]{0,30}(실거래|출고가|출하가)|(실거래가|출고가|출하가)/);
      if (m) offenders.push(`${a.slug}: "${m[0]}"`);
    }
    expect(offenders, `정가·실거래가 표기가 남은 제품:\n${offenders.join('\n')}`).toEqual([]);
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
