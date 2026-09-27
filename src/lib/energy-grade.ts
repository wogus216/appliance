import type { ApplianceCategory, EnergyGrade } from '@/types/appliance';

/**
 * 에너지소비효율등급 — 이 사이트가 제품 사이의 우열로 보여 주는 유일한 값이다.
 *
 * 2026-09-27에 종합 점수와 항목 점수를 전부 걷었다(docs/superpowers/specs/
 * 2026-09-27-troubleshooting-identity-design.md §1단계-④). 점수 4축 중 3축이 "대조할 공개
 * 수치가 없어 편집팀이 판단한 값"이었고, 선풍기·공기청정기·정수기·로봇청소기는 축 전부가
 * 그랬다. 써 보거나 재 보지 않은 제품에 매긴 판단은 라벨을 정직하게 붙여도 정보가 아니다.
 * 등급은 정부 고시에 따라 제조사가 표기한 값이라 그대로 옮길 수 있다.
 */

/**
 * 효율관리기자재 대상 품목. 이 밖(선풍기·공기청정기·정수기·로봇청소기·TV·무선이어폰)은
 * 등급 표기가 없다.
 */
export const ENERGY_GRADE_CATEGORIES: ReadonlySet<ApplianceCategory> = new Set<ApplianceCategory>([
  '에어컨',
  '제습기',
  '세탁기',
  '건조기',
  '냉장고',
  '식기세척기',
]);

export const GRADE_ORDER: EnergyGrade[] = ['1등급', '2등급', '3등급', '4등급', '5등급'];

/** 등급 대상 품목이고 등급이 확인된 경우에만 값을 준다 */
export function displayedEnergyGrade(a: {
  category: ApplianceCategory;
  techSpecs: { energyGrade?: EnergyGrade };
}): EnergyGrade | undefined {
  return ENERGY_GRADE_CATEGORIES.has(a.category) ? a.techSpecs.energyGrade : undefined;
}

/** 1등급이 1. 등급이 없으면 끝으로 보내기 위해 Infinity */
export function gradeRank(grade: EnergyGrade | undefined): number {
  return grade ? GRADE_ORDER.indexOf(grade) + 1 : Infinity;
}
