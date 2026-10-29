export type ActionSafety = '' | 'clear' | 'concern' | 'unknown';
export type ActionOutcome = 'not-tried' | 'repeated' | 'cleared';

export interface ErrorActionGuide {
  id: string;
  brand: string;
  category: string;
  code: string;
  href: string;
  version: string;
  models: { model: string; manualUrl: string; manualLabel: string; checkedAt: string }[];
  serviceUrl: string;
  observationHint: string;
  /** 브랜드 허브 안의 카드에는 고유 앵커를 쓴다. 상세 안내의 기본값은 action-card. */
  anchor?: string;
  action:
    | { type: 'contact'; title: string; steps: string[] }
    | { type: 'check'; title: string; steps: string[] }
    | { type: 'cold-weather' };
}

export interface ErrorActionInput {
  model: string;
  safety: ActionSafety;
  outcome: ActionOutcome;
  observation: string;
  timing: string;
  tried: string;
  temperature: 'unknown' | 'below-zero' | 'at-least-zero';
}

export interface ErrorActionAdvice {
  kind: 'identify' | 'safety' | 'stop' | 'check' | 'contact' | 'record';
  title: string;
  steps: string[];
}

/** 용량이나 모델명의 앞부분만으로 설명서 적용을 확정하지 않는다. */
export function matchActionModel(guide: ErrorActionGuide, model: string) {
  const exact = model.trim().toUpperCase();
  return guide.models.find((entry) => entry.model === exact);
}

export function getErrorActionAdvice(guide: ErrorActionGuide, input: ErrorActionInput): ErrorActionAdvice {
  // 안전 문제는 모델 확인보다 먼저 처리하며 재시작 안내를 내보내지 않는다.
  if (input.safety === 'concern') {
    return {
      kind: 'stop',
      title: '재시작을 멈추고 점검을 요청하세요',
      steps: ['젖은 전원 부근이나 작동 중인 기기에 접근하지 마세요. 안전하게 접근할 수 있는 곳에서 전원을 차단하고 공식 서비스에 상태를 알리세요.'],
    };
  }
  if (!matchActionModel(guide, input.model)) {
    return {
      kind: 'identify',
      title: input.model.trim() ? '이 모델에 적용되는 조치는 확인하지 못했습니다' : '명판의 모델명 전체를 입력하세요',
      steps: ['브랜드나 용량만으로 같은 코드의 뜻을 적용하지 마세요. 공식 서비스에 모델과 표시를 알려 해당 설명서를 확인하세요.'],
    };
  }
  if (input.safety !== 'clear') {
    return {
      kind: 'safety',
      title: '안전 상태를 먼저 확인하세요',
      steps: ['타는 냄새·연기·젖은 전원 부근이 있는지 안전한 위치에서 확인하세요. 확인할 수 없다면 재시작하지 말고 공식 서비스에 문의하세요.'],
    };
  }
  if (guide.action.type === 'contact') {
    return {
      kind: 'contact',
      title: guide.action.title,
      steps: guide.action.steps,
    };
  }
  if (input.outcome === 'repeated') {
    return { kind: 'contact', title: '사용을 멈추고 재발 상황을 전달하세요', steps: [`${guide.code} 표시가 반복되면 재시작을 계속하지 말고 모델명·발생 시각·이미 해본 조치를 공식 서비스에 전하세요.${guide.action.type === 'cold-weather' ? ' 당시 외기 온도와 운전 모드도 함께 전하세요.' : ''}`] };
  }
  if (input.outcome === 'cleared') {
    return { kind: 'record', title: '표시가 사라진 시점과 조치를 기록하세요', steps: ['표시가 사라진 것만으로 수리 완료나 정상 상태를 확정할 수 없습니다. 다시 표시되면 사용을 멈추고 기록과 함께 점검을 요청하세요.'] };
  }
  if (guide.action.type === 'check') {
    return { kind: 'check', title: guide.action.title, steps: guide.action.steps };
  }
  if (input.temperature !== 'below-zero') {
    return {
      kind: 'contact',
      title: input.temperature === 'at-least-zero' ? '외기가 0℃ 이상이면 점검을 요청하세요' : '외기 온도를 확인하거나 서비스에 문의하세요',
      steps: ['외기 온도가 확인되지 않았거나 0℃ 이상이면 저온 때문에 나타난 표시라고 판단할 수 없습니다. 재시작을 보류하고 모델명·표시·운전 모드를 공식 서비스에 전하세요.'],
    };
  }
  return {
    kind: 'check',
    title: '외기 온도와 표시 상황을 확인하세요',
    steps: [
      '외부 온도와 발생 시각을 기록하세요. 해당 설명서는 0℃ 미만에서 F25가 표시될 수 있다고 안내하지만 정상 상태를 확정하는 기준은 아닙니다.',
      '안전 문제가 없을 때 기기를 끄고 10초 뒤 다시 시작하는 것이 해당 모델 설명서의 조치입니다. 외기가 0℃ 이상이거나 표시가 반복되면 사용을 멈추고 서비스를 요청하세요.',
    ],
  };
}

const OUTCOME_LABELS: Record<ActionOutcome, string> = {
  'not-tried': '아직 조치 전',
  repeated: '조치 후에도 같은 표시가 나타남',
  cleared: '현재 표시는 사라짐(정상·수리 완료 여부는 미확인)',
};

export function buildErrorActionSummary(guide: ErrorActionGuide, input: ErrorActionInput, siteUrl: string): string {
  const model = matchActionModel(guide, input.model);
  const advice = getErrorActionAdvice(guide, input);
  const value = (text: string) => text.trim() || '미기록';
  return [
    `${guide.brand} ${guide.category} ${guide.code} — 상담 준비 기록`,
    `모델명(사용자 입력): ${value(input.model)}`,
    `설명서 적용: ${model ? model.model + ' 일치' : '미확인 — 모델별 조치 적용 불가'}`,
    `표시: ${guide.code}`,
    `안전 상태(사용자 확인): ${input.safety === 'clear' ? '타는 냄새·연기·젖은 전원 부근 없음' : input.safety === 'concern' ? '안전 문제 있음 — 재시작 중단' : '미확인 — 재시작 보류'}`,
    `증상·주변 상태: ${value(input.observation)}`,
    `발생 시점: ${value(input.timing)}`,
    ...(guide.action.type === 'cold-weather' ? [`발생 시점의 외기 온도: ${input.temperature === 'below-zero' ? '0℃ 미만' : input.temperature === 'at-least-zero' ? '0℃ 이상' : '미확인'}`] : []),
    `이미 해본 조치: ${value(input.tried)}`,
    `조치 후 표시 상태: ${OUTCOME_LABELS[input.outcome]}`,
    '',
    `다음 행동: ${advice.title}`,
    ...advice.steps.map((step) => `- ${step}`),
    '',
    '상담 때 확인할 것: 추가 사용 가능 여부, 출장·점검 비용, 보증 적용, 필요한 사진·정보',
    '이 기록은 사용자 입력과 설명서 안내를 정리한 것이며 고장 부품·원인·수리 결과를 확정하지 않습니다.',
    ...(model ? [`근거: ${model.manualLabel}`, `설명서 대조일: ${model.checkedAt}`, `공식 설명서: ${model.manualUrl}`] : []),
    `공식 서비스: ${guide.serviceUrl}`,
    `안내 버전: ${guide.version}`,
    `최신 안내: ${siteUrl}${guide.href}#${guide.anchor ?? 'action-card'}`,
  ].join('\n');
}
