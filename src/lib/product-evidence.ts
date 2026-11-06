import type { Appliance, ApplianceCategory } from '@/types/appliance';
import { isIsoDate } from '@/types/editorial';
import { getApplianceTechnologyGuide } from '@/lib/data/appliance-technology';
import { getPurifierTechnology } from '@/lib/data/purifier-technology';
import { getEnergyMeasurement } from '@/lib/data/energy-measurements';
import { getFridgeFitProduct } from '@/lib/data/fridge-installation';
import { INSTALL_MODELS } from '@/lib/data/install-check';

export interface ProductSourceCheck { label: string; checkedAt: string; href: string }
export interface ProductReadingScope { canJudge: string[]; needsChecking: string[] }

/** 날짜를 새로 만들지 않고 각 기능이 실제로 쓰는 원문 확인 기록을 모은다. */
export function getProductSourceChecks(model: string): ProductSourceCheck[] {
  const checks: ProductSourceCheck[] = [];
  const technology = getPurifierTechnology(model) ?? getApplianceTechnologyGuide(model);
  for (const source of technology?.sources ?? []) {
    checks.push({ label: `기술·관리 · ${'label' in source ? source.label : source.title}`, checkedAt: source.checkedAt, href: source.url });
  }
  const energy = getEnergyMeasurement(model);
  if (energy) checks.push({ label: '공단 월간 전기사용량', checkedAt: energy.checkedAt, href: energy.sourceUrl });
  const installation = getFridgeFitProduct(model) ?? INSTALL_MODELS.find((entry) => entry.model === model);
  if (installation) checks.push({ label: `설치 자료 · ${installation.document}`, checkedAt: installation.checkedAt, href: installation.sourceUrl });
  return checks.filter((check) => isIsoDate(check.checkedAt)).sort((a, b) => b.checkedAt.localeCompare(a.checkedAt));
}

// 공개 자료를 읽어 결정할 수 있는 조건과, 실측·개별 견적이 더 필요한 질문을 구별한다.
const CATEGORY_SCOPES: Record<ApplianceCategory, ProductReadingScope> = {
  에어컨: { canJudge: ['본문에 기재한 냉방능력·표시 면적과 기능 지원 조건', '확인된 본체 치수·설치 조건과 필터 관리 항목'], needsChecking: ['우리 집 단열·일사·설치 환경에서의 냉방 속도와 소음', '배관·타공·실외기 작업이 포함된 최종 설치 견적'] },
  세탁기: { canJudge: ['표기 용량과 본문에 확인한 코스별 적재 조건', '설치 치수·세제 투입 방식과 직접 관리할 필터'], needsChecking: ['같은 세탁물의 오염 제거율·진동·소음 실측', '우리 집 코스·수온·적재량에 따른 사용 시간과 전기량'] },
  건조기: { canJudge: ['공개된 건조 방식·용량과 필터·열교환기 관리 조건', '본문의 설치·물통·직배수 확인 항목'], needsChecking: ['섬유·코스별 실제 건조 시간과 수축 정도', '직렬 설치 키트 호환·전체 높이와 현장 작업 비용'] },
  냉장고: { canJudge: ['공개 용량의 냉장·냉동·수납칸 배분', '본문의 본체·문 열림 치수와 패널·제빙 지원 여부'], needsChecking: ['실제 식품 보관 온도 편차·압축기 소음·고장률', '반입 경로·수평 조절을 포함한 현장 설치와 원하는 구성의 견적'] },
  식기세척기: { canJudge: ['표기 인용 수와 설명서의 적재·분사 공간 조건', '확인된 설치 치수·급배수·거름망 관리 항목'], needsChecking: ['우리 집 그릇·오염·코스에서의 세척력과 건조 결과', '수전·배수관·타공·가구 작업을 포함한 최종 설치 조건'] },
  정수기: { canJudge: ['직수·저장·가열 방식과 얼음 기능 유무', '본문의 설치 자리·필터 관리·공개된 계약 조건'], needsChecking: ['우리 집 원수 조건에서의 수질·물맛·연속 출수 성능', '현재 계약의 할인·관리 범위·이전 및 해지 비용'] },
  로봇청소기: { canJudge: ['본문에서 확인한 본체·도크 기능과 직접 할 관리', '도크 확보 공간·문턱·카펫 등 공개된 사용 조건'], needsChecking: ['우리 집 장애물 회피 성공률·먼지 수거율·걸레 세척 결과', '실제 소음·청소 시간·장기 소모품 비용과 고장률'] },
  TV: { canJudge: ['공개 화면 규격과 터치·앱·입력 단자 지원', '본문의 충전·이동·설치 조건'], needsChecking: ['같은 영상 조건에서의 밝기·색 정확도·반사와 시야각', '실제 사용 밝기·앱에 따른 배터리 시간과 소음'] },
  무선이어폰: { canJudge: ['내 기기에서 지원하는 코덱·연결·앱 기능 조건', '공개 배터리 시험 조건·충전 방식·방수 범위'], needsChecking: ['내 귀의 착용감과 같은 조건의 음질·통화·노이즈 제거 성능', '자료에 인용된 외부 측정과 내 사용 환경의 차이'] },
  선풍기: { canJudge: ['공개된 송풍·온풍·청정 기능과 운전 조건', '본문의 필터·센서·외부 청소 및 안전 간격'], needsChecking: ['같은 거리·풍량에서의 실제 바람과 소음', '우리 집 운전 시간·환경에서의 전기량과 청정 효과'] },
  공기청정기: { canJudge: ['공개된 적용 면적·필터 구성과 교체 알림 조건', '본문의 흡입구·설치 간격·앱 관리 항목'], needsChecking: ['우리 집 오염원·환기·공간 배치에서의 정화 속도', '운전 단계별 소음과 실제 필터 교체 시점·가격'] },
  제습기: { canJudge: ['본문에 밝힌 시험 조건의 제습량과 물통·배수 방식', '확인된 필터·물통 관리 및 설치 조건'], needsChecking: ['우리 집 온도·습도에서의 제습량과 실제 소음', '운전 시간·목표 습도에 따른 전기량과 빨래 건조 시간'] },
};

const MODEL_SCOPES: Record<string, ProductReadingScope> = {
  T873MEE111: { canJudge: ['냉동 367L와 매직스페이스가 필요한 수납 구성인지', '상부장·천장의 다른 여유 기준, 문 열림 치수와 노크온·패널 교체 미지원'], needsChecking: ['압축기 소음·온도 편차·고장률의 직접 측정', '실제 반입·문 움직임과 구매할 정확한 색상·구성의 현재 견적'] },
  WF24A9500KE: { canJudge: ['표기 24kg와 AI맞춤세탁 9kg 등 본문에 확인한 코스별 적재 조건', '세탁기 치수·측면 여유와 세제함·배수 필터 관리'], needsChecking: ['같은 세탁물·코스에서의 세척력·진동·실제 사용량', '건조기 직렬 설치 조건과 정확한 KE 색상 모델의 판매 견적'] },
  'S8 Pro Ultra': { canJudge: ['자동 걸레 세척과 직접 해야 하는 청수 보충·오수 비움의 구분', '물걸레 리프트·카펫 조건과 본체·도크의 관리 항목'], needsChecking: ['우리 집 장애물 회피·먼지 수거·물걸레 세척의 실제 결과', '같은 조건에서 다른 로봇청소기와 비교한 소음·청소 시간'] },
  'CHPI-7400N': { canJudge: ['직수 정수와 냉수·얼음 저장부의 차이', '설명서의 설치 여유와 출수구·물받이·필터 관리 조건'], needsChecking: ['우리 집 원수의 수질·물맛과 연속 출수·제빙 회복 시간', '할인·관리 서비스·이전·해지 비용까지 반영한 현재 계약 견적'] },
};

export function getProductReadingScope(appliance: Pick<Appliance, 'category' | 'modelNumber'>): ProductReadingScope {
  return MODEL_SCOPES[appliance.modelNumber] ?? CATEGORY_SCOPES[appliance.category];
}
