/**
 * 소비자분쟁해결기준(공정거래위원회고시 제2025-14호) [별표 Ⅲ]의 품목별 품질보증기간·부품보유기간과
 * 기산점 원문. 근거: research/evidence/2026-10-29/costs/consumer-standards.json,
 * warranty-start-source-check.md(소비자기본법 시행령 [별표 1] 4호).
 * 고시 표에 행이 없는 품목은 유사품목 값으로 채우지 않는다(시행령 제9조②는 '준용할 수 있다'는 재량 조항).
 */

export const CONSUMER_STANDARD_NOTICE = {
  name: '소비자분쟁해결기준',
  notice: '공정거래위원회고시 제2025-14호',
  effectiveDate: '2025-12-18',
  url: 'https://www.law.go.kr/LSW//admRulInfoP.do?admRulSeq=2100000270136&chrClsCd=010201',
  table3Url: 'https://www.law.go.kr/LSW/flDownload.do?flSeq=159470219&bylClsCd=200201',
  table2Url: 'https://www.law.go.kr/LSW/flDownload.do?flSeq=159470209&bylClsCd=200201',
  checkedAt: '2026-10-29',
} as const;

export const CONSUMER_DECREE_ANNEX = {
  name: '소비자기본법 시행령 [별표 1] 일반적 소비자분쟁해결기준',
  decree: '대통령령 제36663호',
  effectiveDate: '2026-09-11',
  url: 'https://www.law.go.kr/LSW/flDownload.do?gubun=&flSeq=168880675&bylClsCd=110201',
  checkedAt: '2026-10-29',
} as const;

/** 시행령 [별표 1] 4호 라목. */
export const WARRANTY_START_QUOTE = '품질보증기간은 소비자가 물품등을 구입하거나 제공받은 날부터 기산한다. 다만, 계약일과 인도일(용역의 경우에는 제공일을 말한다. 이하 이 목에서 같다)이 다른 경우에는 인도일을 기준으로 하고, 교환받은 물품등의 품질보증기간은 교환받은 날부터 기산한다.';
/** 시행령 [별표 1] 4호 마목. */
export const UNKNOWN_SALE_DATE_QUOTE = '품질보증서에 판매일자가 적혀 있지 아니한 경우, 품질보증서 또는 영수증을 받지 아니하거나 분실한 경우 또는 그 밖의 사유로 판매일자를 확인하기 곤란한 경우에는 해당 물품등의 제조일이나 수입통관일부터 3월이 지난 날부터 품질보증기간을 기산하여야 한다. 다만, 물품등 또는 물품등의 포장에 제조일이나 수입통관일이 표시되어 있지 아니한 물품등은 사업자가 그 판매일자를 입증하여야 한다.';
/** 시행령 [별표 1] 4호 가목. */
export const SHORTER_MAKER_PERIOD_QUOTE = '품질보증기간과 부품보유기간은 해당 사업자가 품질보증서에 표시한 기간으로 한다. 다만, 사업자가 정한 품질보증기간과 부품보유기간이 제8조제3항에 따른 품목별 소비자분쟁해결기준에서 정한 기간보다 짧을 경우에는 품목별 소비자분쟁해결기준에서 정한 기간으로 한다.';
/** 고시 [별표 Ⅲ] 머리 주석(자동차 단서 제외). */
export const PARTS_START_QUOTE = '부품보유기간의 기산：해당 제품의 제조일자(제조연도 또는 제조연월만 기재된 경우 제조연도 또는 제조월의 말일을 제조일자로 봄)를 기산점으로 한다.';

export type StandardItemId =
  | 'aircon-cooling' | 'aircon-heat-pump' | 'fridge' | 'tv' | 'water-purifier' | 'dehumidifier' | 'washer' | 'dryer' | 'fan'
  | 'dishwasher' | 'air-purifier' | 'robot-vacuum' | 'earbuds';

export interface StandardRow { category: string; warrantyYears: number; partsYears: number; text: string }
export interface StandardCorePart { label: string; warrantyYears: number; text: string }
export interface StandardItem {
  id: StandardItemId;
  label: string;
  row?: StandardRow;
  coreParts: StandardCorePart[];
  /** 고시 표에 해당 분류가 없을 때의 확인 기록. */
  notListed?: string;
}

const PURIFIER_ROW: StandardRow = { category: '전축, 전자레인지, 정수기, 가습기, 제습기, 전기청소기', warrantyYears: 1, partsYears: 7, text: '- 전축, 전자레인지, 정수기, 가습기, 제습기, 전기청소기 | ◦ 1년 | ◦ 제조일로부터 7년' };
const TV_FRIDGE_ROW: StandardRow = { category: 'TV, 냉장고', warrantyYears: 1, partsYears: 9, text: '- TV, 냉장고 | ◦ 1년 | ◦ 제조일로부터 9년' };
const AIRCON_COMPRESSOR: StandardCorePart = { label: '에어컨 컴프레서', warrantyYears: 4, text: '- 에어컨：컴프레서 ◦ 4년' };

export const STANDARD_ITEMS: StandardItem[] = [
  { id: 'aircon-cooling', label: '에어컨(냉방 전용)', row: { category: '에어컨(냉방 전용)', warrantyYears: 2, partsYears: 8, text: '- 에어컨(냉방 전용) | ◦ 2년 | ◦ 제조일로부터 8년' }, coreParts: [AIRCON_COMPRESSOR] },
  { id: 'aircon-heat-pump', label: '에어컨(냉난방 겸용)', row: { category: '에어컨(냉난방 겸용)', warrantyYears: 1, partsYears: 8, text: '- 에어컨(냉난방 겸용) | ◦ 1년 | ◦ 제조일로부터 8년' }, coreParts: [AIRCON_COMPRESSOR] },
  { id: 'fridge', label: '냉장고', row: TV_FRIDGE_ROW, coreParts: [{ label: '냉장고 컴프레서', warrantyYears: 3, text: '- 냉장고：컴프레서 | ◦ 3년' }] },
  { id: 'tv', label: 'TV', row: TV_FRIDGE_ROW, coreParts: [
    { label: 'LED·LCD·PDP TV 패널', warrantyYears: 2, text: '◦ 2년 (단, 소비자가 확인 가능한 타이머가 부착된 제품으로 5,000시간을 초과한 경우에는 기간이 만료된 것으로 함.)' },
    { label: 'TV CPT', warrantyYears: 3, text: '- TV：CPT | ◦ 3년' },
  ] },
  { id: 'water-purifier', label: '정수기', row: PURIFIER_ROW, coreParts: [] },
  { id: 'dehumidifier', label: '제습기', row: PURIFIER_ROW, coreParts: [] },
  { id: 'washer', label: '세탁기', row: { category: '세탁기', warrantyYears: 1, partsYears: 7, text: '- 세탁기 | ◦ 1년 | ◦ 제조일로부터 7년' }, coreParts: [{ label: '세탁기 모터', warrantyYears: 3, text: '- 세탁기：모터 | ◦ 3년' }] },
  { id: 'dryer', label: '의류건조기', row: { category: '의류건조기, 의류관리기', warrantyYears: 1, partsYears: 7, text: '- 의류건조기, 의류관리기 | ◦ 1년 | ◦ 제조일로부터 7년' }, coreParts: [{ label: '의류건조기 컴프레서', warrantyYears: 3, text: '- 의류건조기：컴프레서 | ◦ 3년' }] },
  { id: 'fan', label: '선풍기·냉풍기·난로·전기장판', row: { category: '난로(전기, 가스, 기름), 선풍기, 냉풍기, 전기장판', warrantyYears: 2, partsYears: 5, text: '- 난로(전기, 가스, 기름), 선풍기, 냉풍기, 전기장판 | ◦ 2년 | ◦ 제조일로부터 5년' }, coreParts: [] },
  { id: 'dishwasher', label: '식기세척기', coreParts: [], notListed: '[별표 Ⅲ] 36개 행에 식기세척기 행이 없습니다. [별표 Ⅰ] 대상품목에는 식기세척기가 있습니다.' },
  { id: 'air-purifier', label: '공기청정기', coreParts: [], notListed: '[별표 Ⅲ]에 공기청정기 행이 없습니다. [별표 Ⅰ] 대상품목과 장기 물품대여서비스업 대상에는 있습니다.' },
  { id: 'robot-vacuum', label: '로봇청소기', coreParts: [], notListed: '[별표 Ⅲ]에 로봇청소기 행이 없습니다. ‘전기청소기’ 행은 있지만 로봇청소기를 포함하는지 고시가 적지 않아 그 값을 쓰지 않습니다.' },
  { id: 'earbuds', label: '무선이어폰', coreParts: [], notListed: '[별표 Ⅲ]에 이어폰·블루투스·헤드폰 행이 없습니다. 가까운 ‘휴대용 음향기기(MP3, 카세트, CD플레이어)’도 이어폰을 열거하지 않아 쓰지 않습니다.' },
];

export function getStandardItem(id: string): StandardItem | undefined {
  return STANDARD_ITEMS.find((item) => item.id === id);
}

/** 카탈로그 품목 → 고시 품목. 에어컨은 냉방 전용·냉난방 겸용을 모델 데이터에서 확인하지 못해 사용자가 고른다. */
export const CATALOG_STANDARD_ITEM: Record<string, StandardItemId | 'aircon'> = {
  에어컨: 'aircon', 냉장고: 'fridge', TV: 'tv', 정수기: 'water-purifier', 제습기: 'dehumidifier',
  세탁기: 'washer', 건조기: 'dryer', 선풍기: 'fan',
  식기세척기: 'dishwasher', 공기청정기: 'air-purifier', 로봇청소기: 'robot-vacuum', 무선이어폰: 'earbuds',
};
