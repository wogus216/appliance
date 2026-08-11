import type { Material, MaterialKind, MaterialRole } from '@/types/material';
import { materials } from './materials';
import { regulated } from './regulated';

/**
 * 기저귀 소재·규제항목 사전.
 *
 * 소재와 규제항목을 한 배열로 합쳐 다룬다. 형광증백제처럼 양쪽 성격을 가진 항목이
 * 있어 모델을 나누면 중복되기 때문이고, 라우트도 /materials/[slug] 하나로 끝난다.
 */
export const allMaterials: Material[] = [...materials, ...regulated];

const BY_SLUG = new Map(allMaterials.map((m) => [m.slug, m]));

export function getMaterial(slug: string): Material | undefined {
  return BY_SLUG.get(slug);
}

export function getMaterialsByKind(kind: MaterialKind): Material[] {
  return allMaterials.filter((m) => m.kind === kind);
}

export function getMaterialsByRole(role: MaterialRole): Material[] {
  return allMaterials.filter((m) => m.role === role);
}

/**
 * refs를 선언 순서대로 풀되, lookup이 못 찾는 slug는 건너뛴다.
 * getRelated가 모듈 전역 맵에 묶여 있어 이 규칙만 따로 검증할 수 없어서 분리했다.
 */
export function resolveRefs(
  refs: string[],
  lookup: (slug: string) => Material | undefined,
): Material[] {
  return refs.map(lookup).filter((x): x is Material => x !== undefined);
}

/** related에 걸린 항목들을 선언 순서대로 반환. 없는 slug는 건너뛴다 */
export function getRelated(slug: string): Material[] {
  const m = BY_SLUG.get(slug);
  if (!m) return [];
  return resolveRefs(m.related, (s) => BY_SLUG.get(s));
}
