import type { ApplianceCategory, ExtraSpec } from '@/types/appliance';

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

/** 카테고리 랜딩 URL용 ASCII slug (/category/[slug]) */
export const CATEGORY_SLUGS: Record<ApplianceCategory, string> = {
  에어컨: 'air-conditioner',
  제습기: 'dehumidifier',
  공기청정기: 'air-purifier',
  선풍기: 'fan',
  세탁기: 'washer',
  건조기: 'dryer',
  냉장고: 'refrigerator',
  식기세척기: 'dishwasher',
  정수기: 'water-purifier',
  로봇청소기: 'robot-vacuum',
  TV: 'tv',
  무선이어폰: 'wireless-earbuds',
};

const SLUG_TO_CATEGORY: Record<string, ApplianceCategory> = Object.fromEntries(
  (Object.entries(CATEGORY_SLUGS) as [ApplianceCategory, string][]).map(([c, s]) => [s, c]),
);

export function getCategoryBySlug(slug: string): ApplianceCategory | undefined {
  return SLUG_TO_CATEGORY[slug];
}

export function getCategorySlug(category: ApplianceCategory): string {
  return CATEGORY_SLUGS[category];
}

/**
 * 섹션 슬롯 설정.
 *
 * 상세 페이지의 ③fit·④value·⑤risk 세 섹션은 순서가 고정이고 내용만 카테고리별로 다르다.
 * 생활가전은 전용 컴포넌트(RoomFit·TCO·소음비교)가 렌더하므로 title/tocLabel만 쓰고,
 * TV·무선이어폰은 techSpecs.extraSpecs를 liftLabels로 끌어올려 슬롯을 채운다.
 *
 * liftLabels는 "위로 끌어올릴 것"만 지정한다. 뽑히지 않은 항목도 ⑥ 성능 상세의
 * 전체 스펙표에 전량 표기되므로 정보 손실이 발생하지 않는다.
 */
export interface SlotConfig {
  /** 섹션 h2 제목 */
  title: string;
  /** TOC 칩에 쓰는 짧은 라벨 */
  tocLabel: string;
  /** 비가전 전용: 이 슬롯으로 끌어올릴 extraSpecs 라벨 (선언 순서대로 표기) */
  liftLabels?: string[];
}

export interface SectionSlots {
  fit: SlotConfig;
  value: SlotConfig;
  risk: SlotConfig;
}

/**
 * 생활가전 공통 슬롯 — 전용 컴포넌트가 렌더하므로 liftLabels 없음.
 *
 * 주의: 실제로 화면에 쓰이는 건 fit.title뿐이다. value.title('10년 총비용')과
 * risk.title('소음')은 각각 ValueSection이 위임하는 TcoCalculator/EnergyGradeImpact,
 * RiskSection이 위임하는 NoiseComparison이 자체 h2를 렌더하기 때문에 여기서 값을 바꿔도
 * 화면에 반영되지 않는다. tocLabel은 세 슬롯 모두 TOC 칩에 그대로 쓰인다.
 */
const APPLIANCE_SLOTS: SectionSlots = {
  fit: { title: '우리 집에 맞나', tocLabel: '적합성' },
  value: { title: '10년 총비용', tocLabel: '비용' },
  risk: { title: '소음', tocLabel: '소음' },
};

const TV_SLOTS: SectionSlots = {
  fit: {
    title: '설치·공간',
    tocLabel: '설치',
    liftLabels: ['배터리', '스탠드 포함 무게', '케이스', '조작', '특징'],
  },
  value: { title: '가격 대비 가치', tocLabel: '가치' },
  risk: {
    title: '화질·게임 성능',
    tocLabel: '성능',
    liftLabels: ['해상도', '주사율', 'HDR', '스마트OS', '스피커'],
  },
};

const EARBUDS_SLOTS: SectionSlots = {
  fit: {
    title: '내 폰·용도에 맞나',
    tocLabel: '호환성',
    liftLabels: ['코덱', '블루투스', '멀티포인트', '방수'],
  },
  value: { title: '가격 대비 가치', tocLabel: '가치' },
  risk: {
    title: '착용감·배터리',
    tocLabel: '착용·배터리',
    liftLabels: ['배터리', '무게', '드라이버', 'ANC', '공간음향'],
  },
};

export const SECTION_SLOTS: Record<ApplianceCategory, SectionSlots> = {
  에어컨: APPLIANCE_SLOTS,
  제습기: APPLIANCE_SLOTS,
  공기청정기: APPLIANCE_SLOTS,
  선풍기: APPLIANCE_SLOTS,
  세탁기: APPLIANCE_SLOTS,
  건조기: APPLIANCE_SLOTS,
  냉장고: APPLIANCE_SLOTS,
  식기세척기: APPLIANCE_SLOTS,
  정수기: APPLIANCE_SLOTS,
  로봇청소기: APPLIANCE_SLOTS,
  TV: TV_SLOTS,
  무선이어폰: EARBUDS_SLOTS,
};

export function getSectionSlots(category: ApplianceCategory): SectionSlots {
  return SECTION_SLOTS[category] ?? APPLIANCE_SLOTS;
}

/**
 * liftLabels에 해당하는 extraSpecs 항목만 선언 순서대로 뽑는다.
 * 매칭되지 않는 라벨은 조용히 건너뛴다 — 제품마다 라벨 구성이 달라도 안전하다.
 * 뽑히지 않은 항목은 호출부가 버리지 않고 전체 스펙표에 그대로 남긴다.
 */
export function liftExtraSpecs(
  extraSpecs: ExtraSpec[] | undefined,
  liftLabels: string[] | undefined,
): ExtraSpec[] {
  if (!extraSpecs || !liftLabels) return [];
  return liftLabels
    .map((label) => extraSpecs.find((s) => s.label === label))
    .filter((s): s is ExtraSpec => s !== undefined);
}
