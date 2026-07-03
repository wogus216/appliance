// 가전제품 타입 정의

export type ApplianceCategory = '에어컨' | '제습기' | '공기청정기' | '선풍기' | '세탁기' | '건조기' | '냉장고' | '식기세척기' | '정수기' | '로봇청소기' | 'TV' | '무선이어폰';

export type EnergyGrade = '1등급' | '2등급' | '3등급' | '4등급' | '5등급';

export type RoomSize = '원룸' | '소형' | '중형' | '대형' | '초대형';

export type ApplianceStatus = 'new' | 'updated' | 'featured' | 'best';

export interface ApplianceSpecs {
  /** 소비전력 (W) */
  powerConsumption: number;
  /** 소음 (dB) */
  noise: number;
  /** 에너지효율 (1-10) */
  energyEfficiency: number;
  /** 성능 (1-10, 냉방능력/제습량/세탁력 등) */
  performance: number;
  /** 편의기능 (1-10) */
  convenience: number;
  /** 내구성 (1-10) */
  durability: number;
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
  extraSpecs?: { label: string; value: string }[];
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
  /** 정가 (원) */
  msrp: number;
  /** 실거래가 (원) */
  streetPrice?: number;
  /** 월 유지비 (전기+필터 등) */
  monthlyCost?: number;
  /** 가성비 등급 (1-5) */
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
  rating: number;
  image?: string;
  images?: string[];
  price: number;
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

// 카드 표시용 경량 타입
export type CardAppliance = Pick<
  Appliance,
  'id' | 'slug' | 'brand' | 'name' | 'category' | 'rating' | 'image' | 'price' | 'oneliner' | 'status' | 'tags'
> & {
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
