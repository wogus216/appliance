import { describe, it, expect } from 'vitest';
import {
  allMaterials,
  getMaterial,
  getMaterialsByKind,
  getMaterialsByRole,
  getRelated,
} from '@/lib/data/materials';
import type { Material } from '@/types/material';

const slugs = new Set(allMaterials.map((m) => m.slug));

describe('materials: 기본 무결성', () => {
  it('항목이 하나 이상 있다', () => {
    expect(allMaterials.length).toBeGreaterThan(0);
  });

  it('slug가 유일하다', () => {
    expect(slugs.size).toBe(allMaterials.length);
  });

  it.each(allMaterials.map((m) => [m.slug, m] as const))('%s: 필수 필드가 채워져 있다', (_s, m) => {
    expect(m.name.trim().length).toBeGreaterThan(0);
    expect(m.what.trim().length).toBeGreaterThan(0);
    expect(m.whyUsed.trim().length).toBeGreaterThan(0);
    expect(m.updated).toMatch(/^\d{4}-\d{2}$/);
  });

  // 편집 경계: 근거 없는 페이지를 만들지 않는다는 규칙을 테스트로 강제한다.
  it.each(allMaterials.map((m) => [m.slug, m] as const))('%s: sources가 비어 있지 않다', (_s, m) => {
    expect(m.sources.length).toBeGreaterThan(0);
    for (const url of m.sources) {
      expect(url).toMatch(/^https?:\/\//);
    }
  });
});

describe('materials: kind와 role의 정합성', () => {
  it.each(allMaterials.map((m) => [m.slug, m] as const))(
    '%s: 소재면 role이 있고, testStandard는 규제항목에만 있다',
    (_s, m) => {
      if (m.kind === '소재') {
        expect(m.role, `${m.slug}는 소재인데 role이 없다`).toBeDefined();
      }
      if (m.testStandard !== undefined) {
        expect(m.kind, `${m.slug}는 소재인데 testStandard가 있다`).toBe('규제항목');
      }
    },
  );
});

// related가 한쪽만 걸리면 성분 페이지 사이 왕복이 끊긴다.
// 이 사전의 핵심 동선이라 양방향을 강제한다.
describe('materials: related 양방향 참조', () => {
  it.each(allMaterials.map((m) => [m.slug, m] as const))(
    '%s: related가 전부 실재하는 slug다',
    (_s, m) => {
      for (const ref of m.related) {
        expect(slugs.has(ref), `${m.slug} -> 없는 slug "${ref}"`).toBe(true);
        expect(ref, `${m.slug}가 자기 자신을 참조한다`).not.toBe(m.slug);
      }
    },
  );

  it.each(allMaterials.map((m) => [m.slug, m] as const))(
    '%s: related가 양방향이다',
    (_s, m) => {
      for (const ref of m.related) {
        const other = getMaterial(ref);
        expect(
          other?.related.includes(m.slug),
          `${m.slug} -> ${ref}는 걸렸는데 ${ref} -> ${m.slug}가 없다`,
        ).toBe(true);
      }
    },
  );
});

describe('materials: 조회 함수', () => {
  it('getMaterial은 slug로 찾고 없으면 undefined', () => {
    const first = allMaterials[0];
    expect(getMaterial(first.slug)).toBe(first);
    expect(getMaterial('없는-슬러그')).toBeUndefined();
  });

  it('getMaterialsByKind는 해당 종류만 낸다', () => {
    const substances = getMaterialsByKind('소재');
    expect(substances.length).toBeGreaterThan(0);
    expect(substances.every((m: Material) => m.kind === '소재')).toBe(true);
  });

  it('getMaterialsByRole은 해당 층만 낸다', () => {
    const absorbent = getMaterialsByRole('흡수');
    expect(absorbent.length).toBeGreaterThan(0);
    expect(absorbent.every((m: Material) => m.role === '흡수')).toBe(true);
  });

  it('getRelated는 참조된 항목 객체를 낸다', () => {
    const sap = getMaterial('sap');
    expect(sap).toBeDefined();
    const related = getRelated('sap');
    expect(related.map((m) => m.slug)).toEqual(sap!.related);
  });

  it('getRelated는 없는 slug에 빈 배열을 낸다', () => {
    expect(getRelated('없는-슬러그')).toEqual([]);
  });
});

// 씨앗 2개가 서로를 참조하는 구조 자체를 고정한다.
// 이게 깨지면 위의 양방향 테스트가 검증할 대상을 잃는다.
describe('materials: 씨앗 항목', () => {
  it('sap과 acrylic-acid-monomer가 서로를 참조한다', () => {
    expect(getMaterial('sap')?.related).toContain('acrylic-acid-monomer');
    expect(getMaterial('acrylic-acid-monomer')?.related).toContain('sap');
  });

  it('acrylic-acid-monomer는 규제항목이다', () => {
    expect(getMaterial('acrylic-acid-monomer')?.kind).toBe('규제항목');
  });
});
