import type { CostSource, PurifierCostModel, RentalPlan, UnavailablePurifierModel, WaterPurifierModel } from '@/lib/water-purifier-cost';

/**
 * 정수기 3개 정확한 모델의 제조사 공식 조건. 2026-10-29 13:50~14:10 KST 조회.
 * 근거: research/evidence/2026-10-29/costs/rental.json · filters.json · costs-source-check.md
 * 프로모션(반값·Pre-Pass·최대혜택가)은 기본값에 쓰지 않고 별도 결과로만 계산한다.
 */
export const WATER_PURIFIER_COST_CHECKED_AT = '2026-10-29';
const checkedAt = WATER_PURIFIER_COST_CHECKED_AT;

const COWAY_PRODUCT: CostSource = { label: '코웨이 CHPI-7400N 제품 화면 · 가격 혜택 탭 ‘가격&구매정책’ 표', url: 'https://www.coway.com/product/detail?prdno=1148&optno=1', checkedAt };
const COWAY_TERMS: CostSource = { label: '코웨이 렌탈/구매계약 약관(게시 2026-10-28 09:00판) 제11조 제1항', url: 'https://www.coway.com/core/community/fclause?clcd=CM01', checkedAt };
const COWAY_MANUAL: CostSource = { label: 'CHPI/CPI-7400N 설명서 PDF 32/52쪽 필터 교환 표', url: 'https://www.coway.com/core/product/fmanual/download/274', checkedAt };
const COWAY_FILTER_LIST: CostSource = { label: '코웨이 정수기 필터/소모품 전체보기', url: 'https://www.coway.com/product/filters-supplies/all/water-purifier', checkedAt };
const LG_SUBSCRIPTION: CostSource = { label: 'LG전자 WD523ACB 구독 화면(계약기간·케어서비스 주기별 월 요금)', url: 'https://www.lge.co.kr/product/care-solutions/water-purifiers/wd523acb?modelId=MD10017831&pdpType=SUBSCRIPTION', checkedAt };
const LG_PURCHASE: CostSource = { label: 'LG전자 WD523ACB 구매 화면 가격 영역', url: 'https://www.lge.co.kr/product/object-collection/wd523acb', checkedAt };
const LG_RENTAL_GUIDE: CostSource = { label: 'LG전자 가전구독 안내 ‘중도 해지 신청시’ 위약금·회수비', url: 'https://www.lge.co.kr/care-solutions/rentalService', checkedAt };
const LG_MANUAL: CostSource = { label: 'LG 정수기 공용 설명서 PDF 28/40쪽 필터 교체 주기', url: 'https://gscs-b2c.lge.com/open/downloadFile?fileId=jO7RH8OLgibKoMzZYJqKw', checkedAt };
const SK_MANUAL: CostSource = { label: 'SK매직 WPU-A710C 공용 설명서 ‘필터 교체 주기’', url: 'https://qr.skmagic.com/2019/model/WPU/WPUA710CRERO/Manual.htm', checkedAt };
const SK_CONTRACT: CostSource = { label: 'SK매직 구독 계약서 제14조(일반 약관 · 이 모델 전용 아님)', url: 'https://www.skmagic.com/introduce/contract/indexContract', checkedAt };

/** 코웨이 가격표: [방문주기, 의무사용년, 월 렌탈료], 렌탈 탭 프로모션: [반값 개월, 반값 월, 이후 월, 화면 총합]. */
const COWAY_ROWS: [2 | 4, 3 | 5 | 6 | 7, number, [number, number, number, string]][] = [
  [2, 3, 59900, [3, 27450, 54900, '3년(의무사용기간) 1,894,050원 / 5년(소유권이전) 3,211,650원']],
  [2, 5, 56400, [6, 25700, 51400, '5년(소유권이전) 2,929,800원']],
  [2, 6, 54900, [9, 24950, 49900, '6년(소유권이전) 3,368,250원']],
  [2, 7, 53400, [12, 24200, 48400, '7년(소유권이전) 3,775,200원']],
  [4, 3, 56900, [3, 25950, 51900, '3년(의무사용기간) 1,790,550원 / 5년(소유권이전) 3,036,150원']],
  [4, 5, 53400, [6, 24200, 48400, '5년(소유권이전) 2,758,800원']],
  [4, 6, 51900, [9, 23450, 46900, '6년(소유권이전) 3,165,750원']],
  [4, 7, 50400, [12, 22700, 45400, '7년(소유권이전) 3,541,200원']],
];

const cowayPlans: RentalPlan[] = COWAY_ROWS.map(([visit, years, monthlyWon, [halfPriceMonths, halfPriceMonthlyWon, afterMonthlyWon, shownTotal]]) => ({
  id: `visit${visit}-y${years}`,
  label: `방문관리 ${visit}개월마다 · 의무사용기간 ${years}년${years === 3 ? '(소유권 이전 5년)' : ''}`,
  monthlyWon,
  // 3년 약정은 최초 설치일로부터 5년 뒤 소유권이 넘어온다(가격표 하단 안내).
  contractMonths: years === 3 ? 60 : years * 12,
  obligationMonths: years * 12,
  promotion: { halfPriceMonths, halfPriceMonthlyWon, afterMonthlyWon, shownTotal },
}));

const COWAY: PurifierCostModel = {
  available: true, modelNumber: 'CHPI-7400N', brand: '코웨이', slug: 'coway-handpick-water-purifier-compact',
  rental: {
    word: '렌탈료', plans: cowayPlans,
    registrationWon: 100_000,
    registrationNote: '렌탈 등록비 100,000원. 10만원 구간 분할납부(월 1만원) 가능, 회사 귀책 해지 외에는 환불하지 않음. Pre-Pass로 등록비를 할인받으면 약정 기간 안에 해약할 때 할인받은 10만원을 위약금에 더함(약관 제13조).',
    monthlyNote: '가격표 주석: “위의 렌탈료는 자동이체 기준으로 1,000원 할인된 금액이며, 기재된 요금은 회사 내부 사정에 따라서 변경될 수 있습니다.”',
    includedNote: '렌탈 관리유형은 방문관리만 표시됩니다(자가관리 선택지 없음). 필터 구입비를 따로 더하지 않았습니다. 방문 때 교체하는 범위는 계약서로 확인하세요.',
    ownershipNote: '3년 약정은 최초 설치일로부터 5년, 5·6·7년 약정은 그 기간이 끝나면 추가 비용 없이 소유권 이전 또는 재렌탈.',
    conditional: [
      { label: '별도 설치 공사비', note: '약관: 전기·수도·배관 등 별도 공사, 설치 후 주문 변경 시 고객 부담. 정수기 설치비 금액표는 찾지 못했습니다.' },
      { label: '설치 14일 이내 반환', note: '소모품 비용 50,000원(가격표 하단 안내).' },
      { label: '회수비', note: '의무사용기간이 지나도 총 계약기간 안에 철거하면 부과(약관 제4조 제4항). 금액은 찾지 못했습니다.' },
    ],
    sources: [COWAY_PRODUCT, COWAY_TERMS],
  },
  purchase: {
    listWon: 2_380_000, listLabel: '일시불 2,380,000원(가격표 일시불액)',
    note: '구매 시 ‘1년 무상 서비스’(방문관리 4개월)가 붙습니다.',
    filters: [],
    missing: [
      { label: '1년 무상 서비스가 끝난 뒤의 관리 비용', reason: '일시불 구매 후 멤버십 월 요금을 제품 화면과 멤버십 약관(2026-04-15판)에서 찾지 못했습니다.' },
      { label: '나노트랩필터-세트 교체 비용', reason: '설명서 교체 주기는 4개월(하루 10L 기준)이지만 공식몰 필터 목록에 이 모델 필터 세트 판매가가 없습니다.' },
    ],
    sources: [COWAY_PRODUCT, COWAY_MANUAL, COWAY_FILTER_LIST],
  },
  penalty: {
    kind: 'daily-10',
    formula: '위약금 = (총 의무사용기간 일수 − 사용일수) × (월렌탈료 ÷ 30) × 10% + 회수비',
    quote: '[정수기, 청정기, 비데, 연수기,음식물 처리기] : 의무사용기간 내에 고객의 사유로 본 계약이 해지되는 경우, 고객은 위약금 [(총 의무사용기간 일수-사용일수)X(월렌탈료÷30)X10%]과 회수비를 부담합니다. 단, 미납렌탈료와 사용월의 렌탈료는 별도 청구됩니다.',
    source: COWAY_TERMS,
    pickupFeeWon: null,
    extras: [
      '미납 렌탈료와 사용한 달의 렌탈료는 별도 청구(제11조 제1항 단서).',
      '회사 귀책 없이 의무사용기간 안에 해지하면 약정으로 받은 할인금액을 납부(제10조 제7항). 금액은 계약마다 다릅니다.',
      'Pre-Pass로 등록비를 할인받았다면 할인받은 금액을 위약금으로 지급(제13조).',
      '가격표 위약금 안내는 “잔여 의무사용기간 X 정상 렌탈료 X 10 %”라고 적습니다. 어느 금액이 정상 렌탈료인지는 계약서로 확인하세요.',
    ],
  },
};

const LG_ROWS: [4 | 5 | 6, boolean, number][] = [[4, false, 39900], [4, true, 42900], [5, false, 34900], [5, true, 37900], [6, false, 31900], [6, true, 34900]];

const LG: PurifierCostModel = {
  available: true, modelNumber: 'WD523ACB', brand: 'LG전자', slug: 'lg-puricare-water-purifier-objet',
  rental: {
    word: '구독료',
    plans: LG_ROWS.map(([years, visit, monthlyWon]) => ({
      id: `y${years}-${visit ? 'visit6' : 'self'}`,
      label: `계약기간 ${years}년 · ${visit ? '방문관리 6개월마다' : '방문없음/자가관리'}`,
      monthlyWon, contractMonths: years * 12, obligationMonths: null,
    })),
    registrationWon: null,
    registrationNote: '이 모델 구독 화면에 등록비 항목이 없습니다. 안내 페이지는 “등록비/설치비/부가서비스 및 할인 적용 여부에 따라 달라질 수 있다”고만 적습니다. 계약서에 등록비가 있으면 넣으세요.',
    registrationMissingReason: '이 모델 구독 화면과 가전구독 안내에서 금액을 찾지 못했습니다. 계약서 값을 넣으면 합계에 더합니다.',
    monthlyNote: '구독 화면 월 요금(할인 전 정상가와 같은 값). 제휴카드 할인 최대 2만원, 첫 구독 포인트, 다품목·선납·재구독 할인은 프로모션이라 반영하지 않았습니다.',
    includedNote: '방문관리는 6개월마다 살균 세척·부품 클리닝·누수 점검, 자가관리는 필터 배송. 필터 구입비를 따로 더하지 않았습니다.',
    ownershipNote: '총 계약기간(4·5·6년) 동안 소유권은 LG전자, 끝나면 미납이 없을 때 고객에게 이전.',
    conditional: [
      { label: '설치 환경별 비용', note: '‘설치비 무료(환경별 상이)’. 설치가이드 표: 싱크대 타공 천연대리석 50,000원·세라믹 110,000원, 펌프 46,000원(수압 1.5kgf/㎠ 이하), 차단기 신설은 견적가.' },
      { label: '이사·이전', note: '이전 철거비 35,000원, 재설치비 43,000원, 운송비 기본(~10km) 40,000원(설치가이드 표).' },
    ],
    sources: [LG_SUBSCRIPTION, LG_RENTAL_GUIDE],
  },
  purchase: {
    listWon: 1_614_000, listLabel: '할인 전 판매가 1,614,000원',
    memberWon: 1_454_000, memberLabel: '회원할인가 1,454,000원(로그인 회원 조건)',
    promotionWon: 1_352_300, promotionLabel: '최대혜택가 1,352,300원(쿠폰·카드사 조건)',
    note: '사용자 교체 절차가 설명서에 있습니다. 필터 자재비만 계산했습니다.',
    filters: [
      { id: 'agm30040101', name: '중금속9 흡착 필터', partNumber: 'AGM30040101', cycleMonths: 6, cycleBasis: '10 L/일 사용기준', listWon: 73_000, memberWon: 69_300, source: { label: 'LG전자 소모품 AGM30040101 상세(적용 모델 WD523ACB.AKOR)', url: 'https://www.lge.co.kr/care-accessories/water-purifier/agm30040101', checkedAt } },
      { id: 'agm30063801', name: '바이러스 클리어 필터', partNumber: 'AGM30063801', cycleMonths: 12, cycleBasis: '10 L/일 사용기준', listWon: 54_600, memberWon: 51_800, source: { label: 'LG전자 소모품 AGM30063801 상세(적용 모델 WD523ACB.AKOR)', url: 'https://www.lge.co.kr/care-accessories/water-purifier/agm30063801', checkedAt } },
    ],
    missing: [{ label: '필터 배송비', reason: '확인하지 않았습니다. 이 합계는 필터 자재비만 셉니다.' }],
    sources: [LG_PURCHASE, LG_MANUAL],
  },
  penalty: {
    kind: 'tiered',
    formula: '위약금 = 잔여 의무사용기간 총 요금(할인 전 기본요금) × [계약 후 1년 이전 30% · 1~2년 20% · 2년 경과 후 10%] + 회수비 50,000원',
    quote: '계약 후 1년 경과 이전: 잔여 의무사용기간 내 총 요금의 30% / 1년 경과 후 2년 경과 이전: 잔여 의무사용기간 내 총 요금의 20% / 2년 경과 후 의무사용기간 이전: 잔여 의무사용기간 내 총 요금의 10%',
    source: LG_RENTAL_GUIDE,
    pickupFeeWon: 50_000,
    extras: [
      '12개월 이내 해지 시 사은품 비용 전액, 미납·연체비용은 별도(가전구독 안내).',
      '의무사용기간이 지난 뒤 계약기간 안에 해지하면 회수비만.',
      '정확히 12개월·24개월째에 어느 비율이 적용되는지는 계약서로 확인하세요.',
    ],
    caveat: '공개 안내 페이지 문구입니다. 안내문은 “실제 적용되는 내용은 고객이 체결한 계약서, 상품설명서 및 약관을 따름”이라고 적고, WD523ACB의 의무사용기간은 공개 화면에서 찾지 못했습니다.',
  },
};

const SK: UnavailablePurifierModel = {
  available: false, modelNumber: 'WPU-A710C', brand: 'SK매직', slug: 'skmagic-allin-water-purifier-wpu',
  reason: '2026-10-29 SK매직 공식몰 정수기 목록(WPU 상품 73개)에 WPU-A710C가 없어, 렌탈료·의무사용기간·등록비·설치비·일시불가·위약금율을 공식 자료로 확인하지 못했습니다. 이 모델은 계산하지 않습니다.',
  facts: [
    { label: '필터 교체 주기', value: '세디먼트 4개월 · 블록 카본 복합 4개월 · 나노테크 PAC 12개월(4인 가족 하루 10ℓ 기준). 품번과 공식 판매가는 찾지 못했습니다.', source: SK_MANUAL },
    { label: '필터 구매·교체', value: '설명서: “필터 구매 및 교체는 고객상담센터에 문의해 주세요. (고객상담센터: 1600-1661)”', source: SK_MANUAL },
    { label: '일반 구독 계약서 위약금', value: '잔여 계약기간 정상 구독료 × 계약서 전면의 위약금율(제품마다 상이). 이 모델의 위약금율은 찾지 못했습니다.', source: SK_CONTRACT },
  ],
};

export const WATER_PURIFIER_MODELS: WaterPurifierModel[] = [COWAY, LG, SK];

export const CONSUMER_STANDARD_RENTAL = {
  rule: '의무사용기간을 1년 초과로 정한 경우: 의무사용기간 잔여월 임대료의 10%에 해당하는 금액 배상 / 1년 이하: 잔여월 임대료의 30%와 임대차기간 임대료 총합의 10% 중 적은 금액',
  definition: '*잔여월임대료={월임대료×(의무사용일수-실제사용일수)÷30}',
  notes: [
    '위약금과 별도로 계약 중도해지 시 발생하는 철거비용 등은 소비자가 부담하되, 청구사실과 금액 등이 약관이나 계약서에 명시되고 고지된 경우에 한함.',
    '장기유지조건으로 가입 시 제공받은 면제(할인)금액이 있을 경우, 소비자는 잔존기간에 해당하는 금액(일할계산)을 사업자에게 반환함.',
  ],
  where: '소비자분쟁해결기준(공정거래위원회고시 제2025-14호) [별표 Ⅱ] 장기 물품대여서비스업 — 소비자의 귀책사유로 인한 계약해지',
} as const;
