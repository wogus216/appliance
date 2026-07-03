import type { ApplianceCategory } from '@/types/appliance';

/**
 * 카테고리별 레이더/비교 축 설정.
 *
 * 배경: 레이더·비교 차트는 원래 생활가전 전용 5축(에너지효율·성능·편의·내구·저소음)이
 * 컴포넌트에 하드코딩돼 있었다. TV·무선이어폰처럼 스펙 축이 다른 카테고리를 붙이기 위해
 * 축 정의를 이 모듈로 단일화한다. 각 컴포넌트는 여기서 축을 읽어 렌더한다.
 *
 * 구현 노트: 신규 카테고리는 기존 numeric 슬롯 5개
 * (energyEfficiency·performance·convenience·durability·noise)를 스펙 축으로 "재라벨"해 재사용한다.
 * 즉 슬롯명은 저장 위치일 뿐이고, 실제 의미는 아래 label이 정한다.
 */

/** 레이더/비교에 쓰는 5개 numeric 슬롯 키 (= CardAppliance['specs'] 키) */
export type CoreSpecKey =
  | 'energyEfficiency'
  | 'performance'
  | 'convenience'
  | 'durability'
  | 'noise';

export interface CoreAxis {
  key: CoreSpecKey;
  label: string;
  /**
   * true면 값이 '낮을수록 좋은' 원자료(소음 dB)라 레이더 점수로 역변환해 표기.
   * (신규 카테고리는 noise 슬롯을 1-10 점수로 직접 쓰므로 invert 없음)
   */
  invert?: boolean;
}

/** 생활가전 기본 5축 — 기존 레이더/비교 축과 동일(회귀 방지) */
const APPLIANCE_AXES: CoreAxis[] = [
  { key: 'energyEfficiency', label: '에너지효율' },
  { key: 'performance', label: '성능' },
  { key: 'convenience', label: '편의기능' },
  { key: 'durability', label: '내구성' },
  { key: 'noise', label: '저소음', invert: true },
];

/** TV(이동식·라이프스타일) 5축 — 스펙 중심 */
const TV_AXES: CoreAxis[] = [
  { key: 'energyEfficiency', label: '화질' },
  { key: 'performance', label: '주사율' },
  { key: 'durability', label: 'HDR' },
  { key: 'convenience', label: '스마트OS' },
  { key: 'noise', label: '가성비' },
];

/** 무선이어폰 5축 — 스펙 중심 */
const EARBUDS_AXES: CoreAxis[] = [
  { key: 'energyEfficiency', label: '음질' },
  { key: 'performance', label: 'ANC' },
  { key: 'convenience', label: '통화품질' },
  { key: 'durability', label: '배터리' },
  { key: 'noise', label: '연결성' },
];

export const CORE_AXES: Record<ApplianceCategory, CoreAxis[]> = {
  에어컨: APPLIANCE_AXES,
  제습기: APPLIANCE_AXES,
  공기청정기: APPLIANCE_AXES,
  선풍기: APPLIANCE_AXES,
  세탁기: APPLIANCE_AXES,
  건조기: APPLIANCE_AXES,
  냉장고: APPLIANCE_AXES,
  식기세척기: APPLIANCE_AXES,
  정수기: APPLIANCE_AXES,
  로봇청소기: APPLIANCE_AXES,
  TV: TV_AXES,
  무선이어폰: EARBUDS_AXES,
};

/** 비가전(신규) 카테고리 집합 */
const NON_TRADITIONAL: ReadonlySet<ApplianceCategory> = new Set<ApplianceCategory>([
  'TV',
  '무선이어폰',
]);

/** 생활가전(전통 가전)인지 여부. false면 TV·무선이어폰 같은 신규 카테고리 */
export function isTraditionalAppliance(category: ApplianceCategory): boolean {
  return !NON_TRADITIONAL.has(category);
}

/** 카테고리의 레이더 핵심 5축 반환 */
export function getCoreAxes(category: ApplianceCategory): CoreAxis[] {
  return CORE_AXES[category] ?? APPLIANCE_AXES;
}
