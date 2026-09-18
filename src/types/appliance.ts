// 가전제품 타입 정의

export type ApplianceCategory = '에어컨' | '제습기' | '공기청정기' | '선풍기' | '세탁기' | '건조기' | '냉장고' | '식기세척기' | '정수기' | '로봇청소기' | 'TV' | '무선이어폰';

export type EnergyGrade = '1등급' | '2등급' | '3등급' | '4등급' | '5등급';

export type RoomSize = '원룸' | '소형' | '중형' | '대형' | '초대형';

// 화면에 배지로 내보내지 않는다(2026-09-18). 'best'·'featured'는 공개된 기준 없이 손으로 붙인
// 값이라 에디터 평가 2.4점 제품에 BEST가 붙는 식으로 점수와 어긋났고, 'new'도 출시일 근거가
// 없었다. 다시 표시하려면 점수·출시일처럼 검증 가능한 규칙에서 파생할 것.
export type ApplianceStatus = 'new' | 'updated' | 'featured' | 'best';

export interface ApplianceSpecs {
  /**
   * 소비전력 (W). 제조사가 공개한 값이 있을 때만 채운다.
   *
   * 2026-08 감사 이전에는 전 제품에 값이 있었지만 출처가 없었고, 확인해 보니
   * 실제와 30~40% 어긋난 것이 다수였다(docs/spec-audit.md). 근거를 못 찾으면
   * 비워 두고 화면에서도 감춘다 — 추정치를 사양처럼 보여 주지 않기 위해서다.
   */
  powerConsumption?: number;
  /**
   * 생활가전은 소음(dB), TV·무선이어폰은 '저소음' 1-10 점수로 쓰는 이중 슬롯이다.
   * dB는 제조사 표기가 확인될 때만 채운다. 점수는 에디터 평가라 항상 있다.
   */
  noise?: number;
  /** 에너지효율 (1-10) */
  energyEfficiency: number;
  /** 성능 (1-10, 냉방능력/제습량/세탁력 등) */
  performance: number;
  /** 편의기능 (1-10) */
  convenience: number;
  /** 내구성 (1-10) */
  durability: number;
}

/** 카테고리별 추가 스펙 한 항목 */
export interface ExtraSpec {
  label: string;
  value: string;
}

export interface TechSpecs {
  /** 핵심 기술 (인버터, 컴프레서 타입 등) */
  coreTechnology: string;
  /** 필터/부품 */
  filterType?: string;
  /** 냉매 종류 (에어컨) */
  refrigerant?: string;
  /** 용량 */
  capacity: string;
  /** 크기 (mm) */
  dimensions?: string;
  /** 무게 (kg) */
  weight?: number;
  /** 에너지소비효율등급 (효율관리기자재 대상 품목만 — 선풍기·공기청정기·정수기·로봇청소기 등 비대상은 미표기) */
  energyGrade?: EnergyGrade;
  /** 월 예상 전기요금 (원) */
  monthlyElectricityCost?: number;
  /** 카테고리별 추가 스펙(패널·주사율·코덱·ANC·방수 등). 가전 전용 필드로 표현 못하는 값을 유연하게 표기 */
  extraSpecs?: ExtraSpec[];
}

export interface RoomFit {
  /** 추천 평수 */
  recommendedSize: RoomSize[];
  /** 냉방면적 (m2) 또는 적용면적 */
  coverageArea: number;
  /** 설치 조건 */
  installationNote?: string;
  /** 벽걸이/스탠드/창문형 등 */
  installationType?: string;
}

/** 플래그십 제품의 항목별 심층 리뷰 섹션 */
export interface DetailedReviewSection {
  /** 소제목 (예: '핵심 성능') */
  heading: string;
  /** 본문 (2~4문장) */
  body: string;
}

export interface ErrorCode {
  code: string;
  description: string;
  cause: string;
  solution: string;
  severity: 'low' | 'medium' | 'high';
}

export interface TargetUsers {
  recommended: string[];
  notRecommended: string[];
}

export interface PriceAnalysis {
  /**
   * 가격 (원). 조사 시점의 시중 최저가이며 확인한 제품에만 있다.
   * '정가'와 '실거래가'를 따로 주장하지 않는다 — 정가를 확인할 방법이 없다.
   * 확인 날짜는 EditorialMeta.priceCheckedAt에 남는다.
   */
  msrp?: number;
  /** 예전에 '실거래가'로 쓰던 자리. 지금은 쓰지 않는다 */
  streetPrice?: number;
  /**
   * 가성비 등급 (1-5).
   *
   * 가격을 확인하지 못한 제품(msrp 없음)에는 화면에 표시하지 않는다. 가격을 모르는
   * 상태에서 매긴 '가격 대비 가치'는 가격 대비가 아니다.
   */
  valueRating: number;
  /** 가격 티어 */
  priceTier: 'budget' | 'mid' | 'premium' | 'luxury';
  /** 대안 제품 slug */
  alternatives: string[];
}

export interface Review {
  userType: string;
  rating: number;
  text: string;
  /** 장점 태그 (짧은 키워드) */
  pros?: string[];
  /** 단점 태그 (짧은 키워드) */
  cons?: string[];
  source?: string;
  sourceUrl?: string;
}

export interface PurchaseLink {
  store: string;
  url: string;
  price?: number;
  isOfficial?: boolean;
}

export interface Appliance {
  id: string;
  slug: string;
  brand: string;
  name: string;
  modelNumber: string;
  category: ApplianceCategory;
  /**
   * 종합 5점 점수는 여기에 없다 — `getEditorScore()`가 축에서 계산한다.
   *
   * 예전에는 손으로 적은 `rating` 필드였고, 레이더 축과 어긋났다. 축이 완전히 같은
   * 두 제품이 4.5와 4.1을 달거나, 모든 축이 낮은 제품이 더 높은 점수를 다는 일이
   * 생겼다. 저장하지 않으면 어긋날 수 없다. 근거는 src/lib/scoring.ts.
   */
  image?: string;
  images?: string[];
  /**
   * 가격 (원). 근거를 확인한 제품에만 있다.
   *
   * 2026-08 감사 이전에는 전 제품에 값이 있었지만 출처가 없었고, 조사해 보니
   * 실제 시중가와 크게 어긋난 것이 많았다. 값이 없으면 화면에서 가격을 감춘다.
   */
  price?: number;
  description: string;
  oneliner?: string;
  editorComment?: string;
  status?: ApplianceStatus;
  noindex?: boolean;
  tags: string[];

  specs: ApplianceSpecs;
  techSpecs: TechSpecs;
  /** 평수 적합도 (생활가전 전용). TV·무선이어폰 등 비가전 카테고리는 미제공 */
  roomFit?: RoomFit;
  errorCodes?: ErrorCode[];
  targetUsers: TargetUsers;
  features: string[];
  priceAnalysis: PriceAnalysis;
  reviews: Review[];
  purchaseLinks?: PurchaseLink[];
  similarProducts: string[];
}

/**
 * 레이더 축 값이 어디서 왔는지. 화면이 이 구분을 그대로 말한다.
 * 판정 규칙은 src/lib/scoring.ts.
 */
export type AxisBasis =
  /** 에너지소비효율등급 표기를 기계적으로 환산한 값 */
  | 'grade'
  /** 제조사 표기 스펙에 맞춰 매긴 값 — 표기가 같으면 점수도 같다 */
  | 'spec'
  /** 편집팀 판단 — 대조할 공개 수치가 없는 항목 */
  | 'editor';

export interface ScoreAxis {
  label: string;
  /** 1-10 */
  value: number;
  basis: AxisBasis;
  /**
   * 편집팀 판단 축에만 붙는다 — 그 점수가 무엇을 보고 매긴 것인지.
   * 사실 주장이 아니라 판단의 범위다. 규칙으로 못 묶는 축이라도 범위는 밝힐 수 있다.
   */
  scope?: string;
}

// 카드 표시용 경량 타입
export type CardAppliance = Pick<
  Appliance,
  'id' | 'slug' | 'brand' | 'name' | 'category' | 'image' | 'price' | 'oneliner' | 'status' | 'tags'
> & {
  /** 파생값 — 카드 투영 시 getEditorScore()로 계산해 채운다. 카탈로그에 없다. */
  rating: number;
  /** 파생값 — getScoreAxes(). 카드·비교표가 축을 다시 조립하지 않게 함께 넘긴다. */
  axes: ScoreAxis[];
  specs: Pick<
    ApplianceSpecs,
    'energyEfficiency' | 'performance' | 'noise' | 'convenience' | 'durability'
  >;
};

// 비교용 타입
export type ComparableAppliance = Pick<
  Appliance,
  'id' | 'slug' | 'brand' | 'name' | 'category' | 'image' | 'price' | 'specs' | 'techSpecs' | 'roomFit'
>;

// 타입 가드
export function isCompleteAppliance(a: Partial<Appliance>): a is Appliance {
  return !!(a.id && a.slug && a.brand && a.name && a.specs && a.techSpecs);
}
