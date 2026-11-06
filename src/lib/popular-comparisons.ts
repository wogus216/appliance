import type { CardAppliance, ApplianceCategory } from '@/types/appliance';

export interface PopularComparison {
  category: ApplianceCategory;
  items: [CardAppliance, CardAppliance];
  purpose: string;
  basis: string;
  kind: '제품 조건 비교' | '사용 방식 비교';
}

/** 공개 자료로 답할 수 있는 구매 질문을 먼저 정하고, 그 질문에 맞는 정확한 모델을 고른다. */
export const COMPARISON_STARTS: { category: ApplianceCategory; slugs: [string, string]; purpose: string; basis: string; kind: PopularComparison['kind'] }[] = [
  { category: '에어컨', slugs: ['haier-cth06qbw-wall', 'tcl-tac-08csd-wall'], kind: '제품 조건 비교', purpose: '비슷한 냉방능력에서 전력과 설치 조건은?', basis: '공단 신고 냉방능력 차이가 10% 이내인 벽걸이 두 모델입니다. 신고값과 설치 자료를 비교하며 실사용 냉방 속도는 평가하지 않습니다.' },
  { category: '세탁기', slugs: ['samsung-bespoke-grande-wf24a9500', 'samsung-bespoke-ai-combo-wd25'], kind: '사용 방식 비교', purpose: '세탁 전용과 세탁·건조 일체형 중 무엇이 맞을까?', basis: '건조기를 따로 둘지 한 통에서 건조할지 고르는 비교입니다. 세탁·건조 용량과 코스가 달라 같은 성능의 가격 비교로 읽지 않습니다.' },
  { category: '냉장고', slugs: ['samsung-bespoke-4door-rf85', 'lg-dios-obje-4door-t873'], kind: '제품 조건 비교', purpose: '비슷한 폭의 4도어, 냉동칸과 설치 높이는?', basis: '폭이 912·914mm인 두 4도어의 칸 배분·설치 조건·패널을 봅니다. 조사 가격은 색상·구성이 같다고 확인된 견적이 아닙니다.' },
  { category: '로봇청소기', slugs: ['roborock-s8-proultra', 'roborock-qrevo-curv'], kind: '제품 조건 비교', purpose: '자동 걸레 세척 도크가 있어도 직접 할 관리는?', basis: '두 모델의 브러시·물걸레·도크 관리와 확보 공간을 비교합니다. 흡입 압력 수치로 청소 성능의 우열을 정하지 않습니다.' },
  { category: 'TV', slugs: ['samsung-the-movingstyle', 'lg-standbyme2'], kind: '사용 방식 비교', purpose: '이동식 화면, 충전과 연결 조건이 내 사용에 맞을까?', basis: '분리 화면·터치·충전·앱 지원 조건을 비교합니다. 화면 크기나 해상도만으로 화질과 배터리 실사용 시간을 평가하지 않습니다.' },
  { category: '무선이어폰', slugs: ['samsung-galaxy-buds3-pro', 'anker-soundcore-liberty5'], kind: '제품 조건 비교', purpose: '내 휴대폰 기능과 두 기기 연결 중 무엇이 필요할까?', basis: '기기별 기능 지원과 코덱·다중 연결 조건을 비교합니다. 음질·노이즈 제거 성능은 같은 조건에서 직접 측정한 순위가 아닙니다.' },
  { category: '정수기', slugs: ['coway-handpick-water-purifier-compact', 'lg-puricare-water-purifier-objet'], kind: '사용 방식 비교', purpose: '얼음 기능과 관리 계약, 우리 집에 필요한 조건은?', basis: '얼음 저장부 유무·설치 자리·필터와 계약 조건을 비교합니다. 기능과 관리 범위가 달라 월 요금만으로 유불리를 정하지 않습니다.' },
  { category: '선풍기', slugs: ['dyson-pure-cool-tp07', 'dyson-hot-cool-hp09'], kind: '사용 방식 비교', purpose: '송풍·청정에 온풍까지 필요한가?', basis: '온풍 유무와 필터·센서 관리의 차이를 봅니다. 서로 다른 운전 모드의 소비전력을 같은 조건의 효율로 비교하지 않습니다.' },
  { category: '식기세척기', slugs: ['cuckoo-dishwasher-table-cdw61', 'skmagic-touchon-dishwasher-dwa81'], kind: '사용 방식 비교', purpose: '식탁형 6인용과 12인용, 설치와 적재 방식은?', basis: '서로 다른 용량·설치 방식 중 집에 맞는 쪽을 고르는 비교입니다. 표준 인용 수가 실제 그릇 수나 같은 조건의 세척력을 뜻하지 않습니다.' },
];

export function getPopularComparisons(
  appliances: CardAppliance[],
  categories: ApplianceCategory[],
): PopularComparison[] {
  const comparisons: PopularComparison[] = [];
  for (const category of categories) {
    const start = COMPARISON_STARTS.find((entry) => entry.category === category);
    if (!start) continue;
    const a = appliances.find((item) => item.slug === start.slugs[0] && item.category === category);
    const b = appliances.find((item) => item.slug === start.slugs[1] && item.category === category);
    if (a && b) comparisons.push({ category, items: [a, b], purpose: start.purpose, basis: start.basis, kind: start.kind });
  }
  return comparisons;
}
