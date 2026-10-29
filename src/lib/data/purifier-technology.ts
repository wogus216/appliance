import type { PurifierTechnology } from '@/lib/purifier-technology';

// 2026-10-27 공식 설명서 재수신·도면 대조. CPI-7400N의 온수 미지원 등 파생 모델에 전용하지 않는다.
// 근거: research/evidence/2026-10-27/purifier-technology-source-check.md
const CHPI_7400N: PurifierTechnology = {
  modelNumber: 'CHPI-7400N', slug: 'coway-handpick-water-purifier-compact', title: '코웨이 아이콘 얼음정수기',
  diagramNote: '설명서의 필터 순서와 기능별 저장·가열 방식을 연결한 원리 도식입니다. 실제 내부 배관의 위치·분기·배치를 재현하지 않았습니다.',
  sources: [
    { id: 'manual', title: '코웨이 CHPI-7400N 공식 사용설명서', url: 'https://www.coway.com/core/product/fmanual/download/274', checkedAt: '2026-10-27' },
    { id: 'energy', title: '한국에너지공단 CHPI-7400N 신고 자료', url: 'https://eep.energy.or.kr/certification/certi_view_159.aspx?no=282260052', checkedAt: '2026-10-27' },
  ],
  parts: [
    {
      id: 'nano', label: '나노트랩 필터', shortLabel: '나노트랩', hint: '정수 1단계', heading: '먼저 거르는 나노트랩 필터',
      explanation: '설명서의 2단계 정수 처리 중 첫 번째 필터입니다. 소재는 보헤마이트·폴리프로필렌·셀룰로오스로 표기돼 있습니다.',
      everyday: '이름이 다른 두 필터를 하나의 필터 세트로 관리합니다.',
      care: '세트 예상 교환 주기는 하루 10L 사용 기준 4개월입니다. 마지막 교체 내역과 관리 계약을 확인하세요.',
      limit: '주기는 상수도 수질을 고려한 예상치입니다. 이 도식으로 오염물질별 제거율이나 현재 수질을 판정하지 않습니다.', pages: '31·44쪽',
    },
    {
      id: 'carbon', label: '플러스이노센스 필터(D)', shortLabel: '플러스이노센스(D)', hint: '정수 2단계', heading: '다음으로 거르는 플러스이노센스 필터(D)',
      explanation: '두 번째 필터이며 소재는 블록활성탄·부직포입니다. 설명서는 냄새 유발 물질·잔류 염소 등의 관리와 물맛 향상 역할을 설명합니다.',
      everyday: '필터 하나만의 이름으로 교체품을 고르지 말고 정확한 모델의 세트 구성을 확인하세요.',
      care: '나노트랩 필터와 함께 세트 예상 교환 주기를 확인합니다. 교환 방법과 새 필터 세척은 설명서 32쪽 전체 절차를 따르세요.',
      limit: '유효 정수량과 예상 교환 주기는 다른 개념입니다. 정수량 표기만으로 남은 사용 기간을 계산하지 않습니다.', pages: '31·32·44쪽',
    },
    {
      id: 'water', label: '정수', shortLabel: '정수', hint: '직수식', heading: '정수는 직수식, 다른 기능에는 저장부가 있습니다',
      explanation: '제품 규격표는 정수를 직수식으로 표기합니다. 냉수는 1L 칠링존, 얼음은 별도 저장고 용량을 표기합니다.',
      everyday: '직수라는 말만으로 제품 안의 모든 기능에 저장부가 없다고 해석하지 마세요.',
      care: '출수구와 물받이 청소를 따로 챙기세요. 설명서는 추출구를 주 1회 닦고 물받이도 주 1회 관리하도록 안내합니다.',
      limit: '그림의 연결선은 기능 관계입니다. 내부 배관의 정확한 연결이나 체류 시간을 보여 주지 않습니다.', pages: '29·34·44쪽',
    },
    {
      id: 'cold', label: '냉수', shortLabel: '냉수', hint: '1L 칠링존', heading: '냉수 1L는 한 번에 받는 양과 다를 수 있습니다',
      explanation: '설명서의 냉수 1L는 칠링존 크기에 따른 용량입니다. 실제 추출할 수 있는 용량과 다를 수 있다고 명시합니다.',
      everyday: '여러 잔을 연속으로 받는다면 저장부 용량과 연속 추출 성능을 구별해 확인하세요.',
      care: '출수구 관리와 정기 관리 내역을 확인하세요. 저장부 내부를 임의로 분해하지 마세요.',
      limit: '이 자료로 연속 출수량·회복 시간·항상 유지되는 수온을 계산할 수 없습니다.', pages: '29·34·44쪽',
    },
    {
      id: 'ice', label: '얼음', shortLabel: '얼음', hint: '저장고 0.74kg', heading: '얼음 저장량과 하루 제빙량은 다릅니다',
      explanation: '0.74kg은 저장고의 만빙센서까지 얼음을 균일하게 채운 기준입니다. 사용 환경과 쌓이는 방식에 따라 실제 저장량이 달라질 수 있습니다.',
      everyday: '한 번에 꺼내 쓸 저장량과 하루 동안 새로 만드는 양을 구별하세요.',
      care: '저장고·트레이·얼음 가이드의 세척과 재조립은 설명서 30쪽 전체 절차를 확인하세요. 어렵다면 담당 서비스 직원에게 문의하세요.',
      limit: '이 도식에는 별도 시험 조건의 하루 제빙량을 섞지 않았습니다. UV 기능과 별도로 청소 안내가 있습니다.', pages: '28~30·44쪽',
    },
    {
      id: 'hot', label: '온수', shortLabel: '온수', hint: '순간 가열', heading: '온수 2,950W는 월간 사용량이 아닙니다',
      explanation: 'CHPI-7400N은 순간온수 가열 방식이고 온수 정격 전력은 2,950W입니다. 공용 설명서의 CPI-7400N과 구별해야 합니다.',
      everyday: 'W는 전력, kWh는 사용한 전기량입니다. 정격 전력에 한 달 시간을 곱해 실제 요금으로 해석하지 마세요.',
      care: '온수는 매우 뜨거울 수 있으므로 피부에 직접 닿지 않게 하고, 온수 잠금 설정을 설명서에서 확인하세요.',
      limit: '공단 월간 신고값 역시 시험 조건의 자료입니다. 온수를 쓰는 횟수 등 집의 사용 조건을 반영한 실측값은 아닙니다.', pages: '6·17~20·44쪽',
    },
  ],
  careItems: [
    { id: 'outlet', title: '출수구', timing: '1주일에 1회 닦기', description: '깨끗한 마른 헝겊 등으로 닦고 손·입·사용한 컵이 닿지 않게 합니다. 제품에 직접 물을 뿌리지 않습니다.', pages: '29·34쪽' },
    { id: 'tray', title: '물받이', timing: '1주일에 1회 세척', description: '고인 물은 하루 이상 방치하지 않고 커피·음식물 등을 버리지 않습니다.', pages: '29·34쪽' },
    { id: 'filters', title: '나노트랩 필터 세트', timing: '예상 4개월 · 하루 10L 기준', description: '상수도 수질을 고려한 예상 주기입니다. 두 필터의 최근 교체일과 관리 계약을 확인하고 교환·세척은 설명서 전체 절차를 따르세요.', pages: '31~32쪽' },
    { id: 'icebin', title: '얼음 저장고·트레이·가이드', timing: '청소 절차와 최근 관리 내역 확인', description: '30쪽은 세척과 재조립을 안내하며 고정 주기는 제시하지 않습니다. 자동 UV 관리가 있어도 별도의 청소 안내를 확인하세요.', pages: '28·30쪽' },
  ],
  energy: { hotRatedWatts: 2950, monthlyDeclaredKwh: 12.17, declarationId: '282260052', testLab: '코웨이㈜' },
};

export function getPurifierTechnology(modelNumber: string): PurifierTechnology | undefined {
  return modelNumber === CHPI_7400N.modelNumber ? CHPI_7400N : undefined;
}
