import type {
  Appliance,
  ApplianceCategory,
  ApplianceSpecs,
  AxisBasis,
  EnergyGrade,
  ScoreAxis,
  TechSpecs,
} from '@/types/appliance';

export type { AxisBasis, ScoreAxis };

/**
 * 점수 체계 — 무엇을 근거로 몇 점을 매기는지 한 곳에 모은다.
 *
 * 2026-09-09 점검 이전에는 종합 5점 점수(rating)가 카탈로그에 손으로 적혀 있었고,
 * 레이더 축과 따로 놀았다. 그 결과 같은 페이지의 숫자끼리 어긋났다:
 *
 *   - 로봇청소기 두 대가 4축(9/9/10/8)이 완전히 같은데 종합점수는 4.5와 4.1이었다.
 *   - 무선이어폰 한 대는 모든 축이 같거나 낮은데 종합점수가 0.1 높았다(지배 역전 4건).
 *   - 2등급 냉장고의 '에너지효율' 축이 9, 1등급 세탁기가 8이었다. 같은 페이지에
 *     정부 등급 표기가 나란히 찍혀 있는데 축이 그것과 반대로 갔다.
 *
 * 그래서 종합점수를 저장하지 않고 축에서 유도한다. 축이 같으면 점수도 같고,
 * 모든 축이 낮은데 종합이 높은 일은 산술적으로 불가능해진다.
 *
 * 축 자체의 근거는 세 종류로 갈리고, 화면은 그 구분을 그대로 말한다(basis).
 */

/**
 * 효율관리기자재 대상 품목.
 *
 * 이 목록 밖(선풍기·공기청정기·정수기·로봇청소기·TV·무선이어폰)은 등급 표기가
 * 없으므로 에너지 축을 그리지 않는다. 등급을 적지 않으면서 '에너지효율 8/10'을
 * 그리면, 그 8이 어디서 왔는지 아무도 말할 수 없다.
 */
const ENERGY_GRADE_CATEGORIES: ReadonlySet<ApplianceCategory> = new Set<ApplianceCategory>([
  '에어컨',
  '제습기',
  '세탁기',
  '건조기',
  '냉장고',
  '식기세척기',
]);

/** 5단계 등급을 10점 척도에 균등 배치한다. 배치 말고는 어떤 판단도 넣지 않는다. */
export const GRADE_SCORE: Record<EnergyGrade, number> = {
  '1등급': 10,
  '2등급': 8,
  '3등급': 6,
  '4등급': 4,
  '5등급': 2,
};

/**
 * 편집팀 판단 축이 "무엇에 대한 판단인지".
 *
 * 2026-09-10에 이 축들을 표기 스펙에 묶어 보려다 접었다. 측정 결과는 이랬다:
 *
 *   - features 개수는 쓸 수 없다. 공개 34개 중 33개가 5개로 사실상 상수인데
 *     편의기능 축은 4~10으로 갈린다. 둘은 무관하다.
 *   - 표기 용량에서 비교 가능한 숫자를 뽑을 수 있는 제품은 34개 중 19개뿐이고,
 *     단위가 L·kg·평형·인용·Pa·CADR로 제각각이라 공통 척도가 없다.
 *   - 숫자가 나오는 8개 카테고리 중 3개(건조기·공기청정기·제습기)는 공개 제품이
 *     하나뿐이라 순위 자체가 성립하지 않는다.
 *   - 용량은 성능의 일부일 뿐이다. 875L 4도어와 846L 양문형을 용량만으로 세우면
 *     형태 차이를 지운다.
 *
 * 규칙을 만들 수 없다면 최소한 무엇을 보고 매긴 점수인지는 밝힐 수 있다.
 * 여기 적은 것은 사실 주장이 아니라 판단의 범위다 — 독자가 그 범위에
 * 동의하지 않을 수 있고, 동의하지 않으려면 범위가 적혀 있어야 한다.
 */
const AXIS_SCOPE: Partial<Record<ApplianceCategory, Record<string, string>>> = {
  에어컨: {
    성능: '냉방능력과 표기 평형 대비 여유',
    편의기능: '무풍·절전·필터 관리처럼 손이 덜 가게 하는 기능',
    내구성: '실외기를 포함한 구조와 A/S 접근성',
  },
  제습기: {
    성능: '일 제습량과 연속배수 대응',
    편의기능: '물통 용량·이동성·예약 운전',
    내구성: '컴프레서 방식과 A/S 접근성',
  },
  공기청정기: {
    성능: '적용 면적과 CADR 표기',
    편의기능: '필터 교체 난이도·센서·풍량 단계',
    내구성: '필터 수급과 본체 마감',
  },
  선풍기: {
    성능: '풍량과 바람이 닿는 거리',
    편의기능: '타이머·리모컨·청소 편의',
    내구성: '모터 방식과 부품 수급',
  },
  세탁기: {
    성능: '세탁 용량과 코스 구성',
    편의기능: '건조 겸용·자동 세제 투입·앱 연동',
    내구성: '모터 보증과 구조',
  },
  건조기: {
    성능: '건조 용량과 히트펌프 방식',
    편의기능: '콘덴서 자동세척·직배수·앱 연동',
    내구성: '콘덴서 관리 구조와 A/S 접근성',
  },
  냉장고: {
    성능: '총 용량과 냉각 방식',
    편의기능: '도어 구성·정온실·제빙',
    내구성: '컴프레서 보증과 마감',
  },
  식기세척기: {
    성능: '인용 수와 세척·건조 방식',
    편의기능: '설치 자유도와 코스 구성',
    내구성: '내부 재질과 부품 수급',
  },
  정수기: {
    성능: '출수 방식과 정수 단계',
    편의기능: '설치 크기·자가관리 여부·냉온수',
    내구성: '음용수 유로 재질과 관리 주기',
  },
  로봇청소기: {
    성능: '흡입 표기와 물걸레 방식',
    편의기능: '도크가 대신해 주는 범위와 앱',
    내구성: '소모품 수급과 도크 구조',
  },
  TV: {
    HDR: '지원하는 HDR 규격의 폭',
    스마트OS: '플랫폼 버전과 앱 지원',
  },
  무선이어폰: {
    음질: '드라이버와 지원 코덱 구성',
    ANC: '억제하는 소음 대역의 폭',
    통화품질: '마이크 구성과 통화 성능',
  },
};

/** 점수 계산에 필요한 최소 입력 — 카드·비교표에서도 쓸 수 있게 조각으로 받는다 */
export type ScorableAppliance = {
  category: ApplianceCategory;
  specs: Pick<
    ApplianceSpecs,
    'energyEfficiency' | 'performance' | 'convenience' | 'durability' | 'noise'
  >;
  techSpecs: Pick<TechSpecs, 'energyGrade'>;
};

/**
 * 화면에 그리는 축 목록.
 *
 * 소비전력(W)·소음(dB)은 축으로 만들지 않는다. 예전에는 `10 - floor(W/400)`,
 * `10 - floor(dB/5)` 로 환산했는데, 카테고리를 무시한 고정 구간이라
 * 정수기 2,955W가 3점, 36dB 냉장고가 3점이 됐다. 게다가 소음 dB를 확인한 제품만
 * 축이 하나 더 붙어 평균이 깎였다 — 근거를 찾을수록 점수가 낮아지는 구조였다.
 * 두 값은 원 단위 그대로 스펙 표에 싣는다.
 */
export function getScoreAxes(a: ScorableAppliance): ScoreAxis[] {
  const s = a.specs;

  if (a.category === 'TV') {
    return [
      { label: '화질', value: s.energyEfficiency, basis: 'spec' as const },
      { label: '주사율', value: s.performance, basis: 'spec' as const },
      { label: 'HDR', value: s.durability, basis: 'editor' as const },
      { label: '스마트OS', value: s.convenience, basis: 'editor' as const },
    ].map((ax) => withScope(a.category, ax));
  }

  if (a.category === '무선이어폰') {
    return [
      { label: '음질', value: s.energyEfficiency, basis: 'editor' as const },
      { label: 'ANC', value: s.performance, basis: 'editor' as const },
      { label: '통화품질', value: s.convenience, basis: 'editor' as const },
      { label: '배터리', value: s.durability, basis: 'spec' as const },
      { label: '연결성', value: s.noise as number, basis: 'spec' as const },
    ].map((ax) => withScope(a.category, ax));
  }

  const axes: ScoreAxis[] = [];
  const grade = a.techSpecs.energyGrade;
  if (ENERGY_GRADE_CATEGORIES.has(a.category) && grade) {
    axes.push({ label: '에너지등급', value: GRADE_SCORE[grade], basis: 'grade' });
  }
  axes.push(
    { label: '성능', value: s.performance, basis: 'editor' },
    { label: '편의기능', value: s.convenience, basis: 'editor' },
    { label: '내구성', value: s.durability, basis: 'editor' },
  );
  return axes.map((ax) => withScope(a.category, ax));
}

/** 편집팀 판단 축에만 '무엇을 보고 매겼는지'를 붙인다 */
function withScope(category: ApplianceCategory, ax: ScoreAxis): ScoreAxis {
  if (ax.basis !== 'editor') return ax;
  const scope = AXIS_SCOPE[category]?.[ax.label];
  return scope ? { ...ax, scope } : ax;
}

/**
 * 종합 5점 점수 = 그려지는 축의 평균 ÷ 2, 소수 첫째 자리 반올림.
 *
 * 가중치를 두지 않는다. 어떤 축이 더 중요한지 정할 근거가 없고, 근거 없는 가중치는
 * 점수를 원하는 방향으로 미는 손잡이가 된다.
 */
export function getEditorScore(a: ScorableAppliance): number {
  const axes = getScoreAxes(a);
  const mean = axes.reduce((sum, ax) => sum + ax.value, 0) / axes.length;
  return Math.round((mean / 2) * 10) / 10;
}

/** 카탈로그 전체(Appliance)를 그대로 넘길 수 있게 하는 얇은 래퍼 */
export function getApplianceScore(a: Appliance): number {
  return getEditorScore(a);
}

/**
 * 레이더 캡션 문장 — 실제로 그려진 축의 근거만 설명한다.
 *
 * 축 구성이 카테고리마다 다르므로(등급 비대상은 3축, 이어폰은 5축) 문장을 고정해
 * 두면 그리지도 않은 축을 설명하게 된다.
 */
export function describeAxisBasis(axes: ScoreAxis[]): string {
  // 라벨 뒤에 은/는을 붙이지 않는다. 받침에 따라 조사가 달라져 'HDR·스마트OS은'
  // 같은 문장이 나온다. 축 이름은 데이터에서 오므로 조사가 필요 없는 형태로 쓴다.
  const BASIS_TEXT: Record<AxisBasis, string> = {
    grade: '에너지소비효율등급 표기를 10점 척도로 환산한 값',
    spec: '제조사 표기 스펙에 맞춰 매긴 값(표기가 같으면 점수도 같습니다)',
    editor: '대조할 공개 수치가 없어 편집팀이 판단한 값',
  };

  const parts = (['grade', 'spec', 'editor'] as const)
    .map((basis) => {
      const labels = axes.filter((ax) => ax.basis === basis).map((ax) => ax.label);
      return labels.length > 0 ? `${labels.join('·')} — ${BASIS_TEXT[basis]}` : null;
    })
    .filter((p): p is string => p !== null);

  // 근거가 한 종류뿐인 페이지에서 "축마다 근거가 다릅니다"는 사실이 아니다.
  const lead = parts.length > 1 ? '축마다 근거가 다릅니다. ' : '';
  return `${lead}${parts.join('. ')}. 10점 만점.`;
}
