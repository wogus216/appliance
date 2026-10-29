import { CARE_PLAN_PRODUCTS } from '@/lib/data/care-plan';
import { ENERGY_MEASUREMENTS } from '@/lib/data/energy-measurements';
import { WATER_PURIFIER_MODELS } from '@/lib/data/water-purifier-cost';
import { FRIDGE_FIT_PRODUCTS } from '@/lib/data/fridge-installation';
import { DISHWASHER_FIT_PRODUCTS } from '@/lib/dishwasher-fit';
import { INSTALL_MODELS } from '@/lib/data/install-check';
import { INSTALL_CATEGORIES } from '@/lib/install-check';
import { HOUSEHOLD_CARE_LIMIT } from '@/lib/household-care';
import { MAX_HOME_ENERGY_RECORDS } from '@/lib/home-energy-record';
import type { ValueKind } from '@/lib/value-kind';

/** 홈의 다섯 출발점과 같은 순서. 도구가 없는 과제는 도구 밖의 페이지로 잇는다. */

/** 공단 월간 신고값이 있는 모델 수를 품목별로 센다(예: 냉장고 4개·에어컨 5개). */
function energyScope(): string {
  const counts = new Map<string, number>();
  for (const entry of Object.values(ENERGY_MEASUREMENTS)) counts.set(entry.productCategory, (counts.get(entry.productCategory) ?? 0) + 1);
  return [...counts].map(([category, count]) => `${category} ${count}개`).join('·');
}

export const LIFE_TASKS = [
  { id: 'choose', title: '고르기', lead: '사기 전에 모델끼리 같은 기준의 숫자를 나란히 봅니다.', elsewhere: { href: '/compare#energy-compare', label: '냉장고 공단 신고 전기사용량 비교(비교 페이지)' } },
  { id: 'install', title: '설치하기', lead: '집에서 잰 자리를 정확한 모델의 설명서 치수와 대조합니다.' },
  { id: 'use', title: '쓰기·관리하기', lead: '설명서의 관리 주기와 우리 집에서 잰 사용량을 기록합니다.' },
  { id: 'troubleshoot', title: '고장 해결하기', lead: '화면에 뜬 코드의 뜻과 사용자가 해도 되는 확인을 찾습니다.', elsewhere: { href: '/error-codes', label: '브랜드별 오류코드 안내' } },
  { id: 'repair', title: '수리·교체하기', lead: '받은 견적과 새 제품 비용을 같은 범위로 맞춰 봅니다.' },
] as const;
export type LifeTask = typeof LIFE_TASKS[number]['id'];

export type ToolSlug = 'fridge-fit' | 'dishwasher-fit' | 'install-check' | 'home-energy' | 'repair-replace' | 'care-plan' | 'household-care' | 'water-purifier-cost';
export type ToolStorage = 'session' | 'session-save' | 'model-in-url' | 'selection-in-url' | 'browser';

export interface ToolEntry {
  slug: ToolSlug;
  href: `/tools/${ToolSlug}`;
  title: string;
  task: LifeTask;
  answers: string[];
  cannotAnswer: string[];
  /** 지원 범위. 모델 수는 도구가 쓰는 데이터에서 센다. */
  scope: string;
  valueKinds: ValueKind[];
  valueNote?: string;
  storage: ToolStorage;
}

export const STORAGE_LABELS: Record<ToolStorage, string> = {
  session: '입력값은 열어 둔 화면에서만 계산하고, 새로 열면 비워집니다.',
  // 2026-10-29 8단계: 전력 기록은 ‘이 기록 저장’을 누른 기록을 localStorage에 남기는데, 'session' 문구만 붙어 있었다.
  'session-save': `입력 칸은 새로 열면 비워집니다. ‘이 기록 저장’을 누른 기록만 이 브라우저의 저장소(localStorage)에 최대 ${MAX_HOME_ENERGY_RECORDS}개까지 남고, 서버로 보내지 않습니다.`,
  'model-in-url': '고른 모델번호만 주소(?model=)에 남고, 입력한 값은 남지 않습니다. 새로 열면 입력값이 비워집니다.',
  'selection-in-url': '고른 품목과 모델번호만 주소(?category=·?model=)에 남고, 잰 치수는 남지 않습니다. 새로 열면 치수가 비워집니다.',
  browser: `기록은 이 브라우저의 저장소(localStorage)에만 남고(관리 항목은 최대 ${HOUSEHOLD_CARE_LIMIT}개), 서버로 보내지 않습니다. 오래 둘 기록은 파일로 내보내세요.`,
};

/** /tools에서 값 종류 표시를 풀이하는 문장. 도구 화면의 배지 이름(VALUE_KIND_LABELS)과 짝을 이룬다. */
export const VALUE_KIND_MEANINGS: Record<ValueKind, string> = {
  official: '제조사 설명서나 공식 지원 문서에서 옮긴 치수·조건·주기입니다. 쪽이나 절을 함께 적습니다.',
  'official-test': '한국에너지공단에 신고된 시험 결과입니다. 정해진 시험 조건에서 잰 값이라 집에서 쓰는 양과 같지 않습니다.',
  measured: '사용자가 줄자나 전력 측정기로 직접 잰 값입니다. 측정 오차는 사이트가 확인하지 않습니다.',
  entered: '견적서·판매 페이지에서 옮겨 적은 금액이나 사용자가 직접 정한 날짜입니다.',
  calculated: '위 값들을 각 도구 아래에 적은 식으로 계산한 결과입니다. 식에 넣은 값보다 정확할 수 없습니다.',
  example: '화면을 먼저 둘러보도록 넣은 가상의 값입니다. 실제 집이나 제품을 판단하는 데 쓰지 않습니다.',
  unverified: '공식 자료에서 찾지 못한 값이나 조건입니다. 비교와 판단에 쓰지 않고 설치팀·제조사에 물을 항목으로 남깁니다.',
};

const unique = <T,>(values: T[]) => [...new Set(values)];
const fridgeBrands = unique(FRIDGE_FIT_PRODUCTS.map((product) => product.brandLabel)).join('·');
const dishwasherWithDoor = DISHWASHER_FIT_PRODUCTS.filter((product) => product.openDepth !== undefined);
const installNoManual = INSTALL_MODELS.filter((model) => !model.manualFound);
const careItems = CARE_PLAN_PRODUCTS.flatMap((product) => product.items);
const careIntervalItems = careItems.filter((item) => item.interval);
const careIntervalModels = CARE_PLAN_PRODUCTS.filter((product) => product.items.some((item) => item.interval));

export const CARE_SCOPE = {
  models: CARE_PLAN_PRODUCTS.length,
  items: careItems.length,
  intervalItems: careIntervalItems.length,
  intervalModels: careIntervalModels.length,
};

export const TOOLS: ToolEntry[] = [
  {
    slug: 'fridge-fit', href: '/tools/fridge-fit', title: '냉장고 설치 전 확인표', task: 'install',
    answers: [
      '집에서 잰 자리 폭·높이, 문을 펼칠 폭, 뒷벽부터 맞은편 장애물까지 거리가 이 모델의 설명서 기준보다 몇 mm 크거나 작은가',
      '반입 경로·좌우 벽·접지 콘센트·문 연 뒤 통로 가운데 설치팀에 미리 물을 것은 무엇인가',
    ],
    cannotAnswer: [
      '실제로 설치할 수 있는가. 측정 오차, 문이 그리는 궤적, 반입 중 회전, 수평 조절은 계산하지 않습니다.',
      '문을 연 채 사람이 서거나 지나갈 폭이 충분한가',
    ],
    scope: `${fridgeBrands} 냉장고 ${FRIDGE_FIT_PRODUCTS.length}개 모델(${FRIDGE_FIT_PRODUCTS.map((product) => product.modelNumber).join(', ')})`,
    valueKinds: ['official', 'measured', 'example', 'calculated', 'official-test'],
    storage: 'model-in-url',
  },
  {
    slug: 'dishwasher-fit', href: '/tools/dishwasher-fit', title: '식기세척기 설치 전 확인표', task: 'install',
    answers: [
      '놓을 자리의 폭·깊이·높이가 본체 치수보다 큰가, 문을 연 깊이가 확인된 모델이라면 문 앞 거리도 충분한가',
      '급수·배수·전원·수평·열원 조건 가운데 설명서로 확인된 것과 확인하지 못한 것은 무엇인가',
    ],
    cannotAnswer: [
      '좌우·위쪽에 몇 mm를 띄워야 하는가. 두 모델 모두 이 수치를 설명서에서 찾지 못했습니다.',
      '설치비와 별매 부품을 더한 총액',
    ],
    scope: `식기세척기 ${DISHWASHER_FIT_PRODUCTS.length}개 모델(${DISHWASHER_FIT_PRODUCTS.map((product) => product.model).join(', ')}). 문 앞 거리 비교는 ${dishwasherWithDoor.map((product) => product.model).join(', ')}만`,
    valueKinds: ['official', 'measured', 'calculated', 'unverified'],
    storage: 'session',
  },
  {
    slug: 'install-check', href: '/tools/install-check', title: '설치 공간 확인표(세탁기·정수기·에어컨·로봇청소기)', task: 'install',
    answers: [
      '집에서 잰 자리가 본체(실내기·실외기·스테이션) 치수에 원문으로 확인된 여유를 더한 기준보다 몇 mm 크거나 작은가',
      '어느 면의 여유와 어떤 급수·배수·전원 조건이 원문에서 확인되지 않아 설치팀에 물어야 하는가',
      '로봇청소기가 넘을 문턱, 에어컨 실내기·실외기 높이차가 설명서의 안내 값과 몇 mm 차이 나는가',
    ],
    cannotAnswer: [
      '실제로 설치할 수 있는가. 반입 경로, 벽 재질, 배관·배선 경로, 수평 조절은 계산하지 않습니다.',
      '확인 필요인 면에 몇 mm를 띄워야 하는가. 원문에 없는 수치는 만들지 않습니다.',
      '설치비와 배관 추가비',
    ],
    scope: `${INSTALL_CATEGORIES.map((category) => `${category.label} ${INSTALL_MODELS.filter((model) => model.category === category.id).length}개`).join(', ')} 모델(${INSTALL_MODELS.map((model) => model.model).join(', ')}). 공식 설치 설명서를 찾지 못한 ${installNoManual.map((model) => model.model).join(', ')}은 제품 페이지 치수만`,
    valueKinds: ['official', 'measured', 'calculated', 'unverified'],
    storage: 'selection-in-url',
  },
  {
    slug: 'home-energy', href: '/tools/home-energy', title: '우리 집 가전 전력 기록', task: 'use',
    answers: [
      '기기 한 대에서 잰 누적 kWh를 30일 기준으로 늘리면 얼마인가',
      '월간 kWh 신고가 있는 모델이라면 같은 모델의 공단 월간 신고값은 얼마인가',
      '고지서의 가구 사용량에 이 기기 사용분을 더하면 한전 주택용(일반 가구) 요금이 얼마나 달라지는가',
    ],
    cannotAnswer: [
      '복지할인 가구나 확인한 연료비조정단가 적용 기간 밖의 달 요금, 실제 고지서 금액',
      '실측값과 신고값의 차이가 고장이나 절약을 뜻하는가',
    ],
    scope: `측정한 기기 종류는 제한하지 않음. 공단 월간 신고값을 나란히 보는 모델은 ${energyScope()}`,
    valueKinds: ['measured', 'calculated', 'official-test'],
    storage: 'session-save',
  },
  {
    slug: 'care-plan', href: '/tools/care-plan', title: '가전 관리 일정표', task: 'use',
    answers: [
      '설명서에 주기가 있는 관리 항목을 마지막 관리일 기준으로 다음에 언제 확인하면 되는가',
      '주기가 없는 항목을 내가 정한 날짜로 달력 파일(.ics)에 남기려면 어떻게 하는가',
    ],
    cannotAnswer: [
      '구입일만 알 때 부품을 언제 바꿔야 하는가',
      '날짜마다 반복해서 알려 주는가',
    ],
    scope: `공개 제품 ${CARE_SCOPE.models}개 모델의 관리 항목 ${CARE_SCOPE.items}개. 설명서 주기로 날짜를 계산하는 항목은 ${CARE_SCOPE.intervalModels}개 모델의 ${CARE_SCOPE.intervalItems}개 항목`,
    valueKinds: ['official', 'calculated', 'entered'],
    valueNote: '결과 화면은 배지 대신 ‘날짜의 근거’ 문장으로 설명서 주기 계산과 직접 정한 날짜를 구별합니다.',
    storage: 'model-in-url',
  },
  {
    slug: 'household-care', href: '/tools/household-care', title: '우리 집 가전 수첩', task: 'use',
    answers: [
      '여러 가전의 관리 항목을 다가오는 날짜순으로 한 화면에서 보려면',
      '‘오늘 관리함’을 누른 뒤 다음 확인일은 언제로 바뀌는가',
      '구입일(또는 인도일·교환일)을 넣으면 공정위 소비자분쟁해결기준의 품질보증기간은 언제 끝나는가',
      '제품마다 구입처·보증서 날짜·수리 기록을 한곳에 남기고 파일로 옮기려면',
    ],
    cannotAnswer: [
      '다른 기기나 브라우저에서도 같은 기록이 보이는가. 계정과 동기화가 없습니다.',
      '주기가 확인되지 않은 항목의 다음 날짜를 대신 정해 주는가',
      '수리 부품이 지금 남아 있는가, 보증으로 무상 수리를 받을 수 있는가. 고시 기간을 보여 줄 뿐 판단하지 않습니다.',
    ],
    scope: `관리 일정표와 같은 ${CARE_SCOPE.models}개 모델·${CARE_SCOPE.items}개 항목(한 브라우저에 최대 ${HOUSEHOLD_CARE_LIMIT}개). 고시 표에 분류가 있는 품목만 보증·부품 기간을 계산`,
    valueKinds: ['official', 'unverified', 'calculated', 'entered'],
    storage: 'browser',
  },
  {
    slug: 'repair-replace', href: '/tools/repair-replace', title: '가전 수리·교체 비교표', task: 'repair',
    answers: [
      '받은 수리 견적과 새 제품 가격·추가비의 차이는 얼마인가',
      '그 차이가 포함 항목을 모두 확인한 비교인지, 일부만 확인한 부분 비교인지',
      '보증·고장 진단·설치와 철거 비용에서 무엇을 더 물어야 하는가',
    ],
    cannotAnswer: [
      '수리와 교체 중 무엇이 나은가. 금액이 작은 쪽을 고르지 않습니다.',
      '고친 뒤 얼마나 더 쓸 수 있는가, 다시 고장 날 가능성은 얼마인가',
    ],
    scope: '모델 제한 없음. 사이트가 가진 가격 자료를 쓰지 않고 사용자가 입력한 금액만 비교',
    valueKinds: ['entered', 'calculated'],
    storage: 'session',
  },
  {
    slug: 'water-purifier-cost', href: '/tools/water-purifier-cost', title: '정수기 렌탈·구매 비용 비교', task: 'choose',
    answers: [
      '같은 기간이면 렌탈과 일시불 구매에 공식 가격 기준으로 얼마가 드는가',
      '약정 중간에 해지하면 약관 산식으로 위약금이 얼마인가',
      '합계에서 빠진(확인하지 못한) 비용은 무엇인가',
    ],
    cannotAnswer: [
      '어느 쪽이 이득인가. 금액이 작은 쪽을 추천하지 않습니다.',
      '약관과 공정위 기준 중 어느 쪽이 적용되는가. 법적 판단은 하지 않습니다.',
    ],
    scope: `${WATER_PURIFIER_MODELS.filter((model) => model.available).map((model) => `${model.brand} ${model.modelNumber}`).join('·')}. ${WATER_PURIFIER_MODELS.filter((model) => !model.available).map((model) => `${model.brand} ${model.modelNumber}`).join('·')}는 공식 조건을 확인하지 못해 계산하지 않음`,
    valueKinds: ['official', 'entered', 'calculated', 'unverified'],
    storage: 'session',
  },
];

export function getTool(slug: ToolSlug): ToolEntry {
  const tool = TOOLS.find((entry) => entry.slug === slug);
  if (!tool) throw new Error(`도구 없음: ${slug}`);
  return tool;
}
