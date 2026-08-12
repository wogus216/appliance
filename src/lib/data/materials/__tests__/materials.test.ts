import { describe, it, expect } from 'vitest';
import {
  allMaterials,
  getMaterial,
  getMaterialsByKind,
  getMaterialsByRole,
  getRelated,
  resolveRefs,
} from '@/lib/data/materials';
import type { Material } from '@/types/material';

const slugs = new Set(allMaterials.map((m) => m.slug));

/** kind와 role·testStandard의 정합성 규칙. 위반하면 사유 문자열, 통과하면 null */
function consistencyProblem(m: Pick<Material, 'kind' | 'role' | 'testStandard' | 'slug'>): string | null {
  if (m.kind === '소재' && m.role === undefined) return `${m.slug}: 소재인데 role이 없다`;
  if (m.testStandard !== undefined && m.kind !== '규제항목') {
    return `${m.slug}: 소재인데 testStandard가 있다`;
  }
  return null;
}

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
    for (const source of m.sources) {
      expect(source.url).toMatch(/^https?:\/\//);
      expect(source.title.trim().length).toBeGreaterThan(0);
    }
  });
});

// 규제(법령·고시·시험 기준)를 언급하는 서술은 규제 기관 출처로 뒷받침돼야 한다.
// 이 사이트는 성분 완전표시 의무가 없는 영역에서 규제·제조사 발표를 "전달"할 뿐 스스로 안전을
// 판정하지 않는다는 원칙 위에 서 있어서, 규제 관련 서술에 비규제 출처(기업 블로그 등)만
// 달려 있으면 그 원칙이 깨진다.
//
// 주의: 이 검사는 어떤 출처가 어떤 문장을 뒷받침하는지까지는 보지 않는다.
// entry 전체에 권위 있는 도메인 출처가 하나라도 있는지만 보므로, 그런 출처가
// 하나도 없는 경우(가장 명백한 실패 유형)만 잡아낸다.
const AUTHORITATIVE_SOURCE_DOMAINS = [
  'law.go.kr',
  'safetykorea.kr',
  'consumer.go.kr',
  'kats.go.kr',
  'mfds.go.kr',
];

const REGULATORY_CLAIM_PATTERN = /안전기준|규제|KC|시험 항목|고시/;

function hasAuthoritativeSource(m: Material): boolean {
  return m.sources.some((source) =>
    AUTHORITATIVE_SOURCE_DOMAINS.some((domain) => new URL(source.url).hostname.endsWith(domain)),
  );
}

describe('materials: 규제 서술은 규제 기관 출처로 뒷받침된다', () => {
  it.each(allMaterials.map((m) => [m.slug, m] as const))(
    '%s: what/whyUsed/concern이 규제를 언급하면 권위 있는 출처가 있다',
    (_s, m) => {
      const text = [m.what, m.whyUsed, m.concern ?? ''].join(' ');
      if (!REGULATORY_CLAIM_PATTERN.test(text)) return;
      expect(
        hasAuthoritativeSource(m),
        `${m.slug}: 규제를 언급하는데 법령·정부 출처가 없다`,
      ).toBe(true);
    },
  );
});

describe('materials: kind와 role의 정합성', () => {
  it.each(allMaterials.map((m) => [m.slug, m] as const))(
    '%s: 소재면 role이 있고, testStandard는 규제항목에만 있다',
    (_s, m) => {
      expect(consistencyProblem(m)).toBeNull();
    },
  );
});

// 위 데이터셋 스캔은 현재 시드가 규칙을 어기지 않는다는 것만 보여준다.
// 규칙 자체가 위반을 잡아내는지는 픽스처로 따로 증명한다.
describe('materials: 정합성 규칙이 실제로 위반을 잡는다', () => {
  it('소재인데 role이 없으면 잡는다', () => {
    expect(consistencyProblem({ slug: 'x', kind: '소재', role: undefined, testStandard: undefined }))
      .toContain('role이 없다');
  });

  it('소재인데 testStandard가 있으면 잡는다', () => {
    expect(consistencyProblem({ slug: 'x', kind: '소재', role: '표면', testStandard: 'KS K 0611' }))
      .toContain('testStandard가 있다');
  });

  it('규제항목의 testStandard는 허용한다', () => {
    expect(consistencyProblem({ slug: 'x', kind: '규제항목', role: undefined, testStandard: 'KS K 0611' }))
      .toBeNull();
  });

  it('정상 소재는 통과한다', () => {
    expect(consistencyProblem({ slug: 'x', kind: '소재', role: '흡수', testStandard: undefined }))
      .toBeNull();
  });
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

// getRelated는 sap(related 1개)로만 확인되는데, 그 하나짜리 데이터로는
// 순서 보존도 누락 스킵도 사실상 증명되지 않는다. resolveRefs를 직접 픽스처로 검증한다.
describe('materials: resolveRefs', () => {
  it('선언 순서대로 반환한다 (lookup 순서가 아니라)', () => {
    const fixtures: Record<string, Material> = {
      a: { slug: 'a' } as Material,
      b: { slug: 'b' } as Material,
      c: { slug: 'c' } as Material,
    };
    const lookup = (s: string) => fixtures[s];
    expect(resolveRefs(['c', 'a', 'b'], lookup).map((m) => m.slug)).toEqual(['c', 'a', 'b']);
  });

  it('lookup이 못 찾는 slug만 건너뛰고 나머지는 남긴다', () => {
    const fixtures: Record<string, Material> = {
      a: { slug: 'a' } as Material,
      c: { slug: 'c' } as Material,
    };
    const lookup = (s: string) => fixtures[s];
    expect(resolveRefs(['a', 'b', 'c'], lookup).map((m) => m.slug)).toEqual(['a', 'c']);
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
