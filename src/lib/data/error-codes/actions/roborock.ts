// 로보락 허브의 행동 카드.
// 근거: research/evidence/2026-10-29/error-actions/skmagic-cuckoo-roborock.json(.md) — Roborock 행.
// S8 Pro Ultra·Qrevo Curv는 모델별 공식 문제 해결 페이지(미국판)의 같은 문구, S7은 공식 영문 설명서다.
// S7 Error 2는 2026-10-27 카드로 그 JSON에서 빠져 있어, 2026-10-29에 S7 설명서(인쇄 38·39쪽)를 다시 열어
// legacy-cards.json(.md)에 남겼다.

import type { ErrorActionGuide, ErrorActionModel } from '@/lib/error-action';
import { ACTION_VERSION_2026_10_29, LEGACY_CARDS_EVIDENCE, SK_CUCKOO_ROBOROCK_EVIDENCE, type HubActionSet } from './shared';

const HUB = '/error-codes/Roborock';
const SERVICE = 'https://kr.roborock.com/pages/roborock-service-warranty';
const CHECKED = '2026-10-29';
const S8_HELP = 'https://help.roborock.com/us/product/s8-pro-ultra-message?category=troubleshooting';
const CURV_HELP = 'https://help.roborock.com/us/product/roborock-qrevo-curv-message?category=troubleshooting';
const S7_MANUAL = 'https://support.roborock.com/hc/en-us/article_attachments/900008254623';
/** 허브에서 S8 Pro Ultra·Qrevo Curv 카탈로그 항목과 S7 독립 항목이 같은 번호를 쓸 때 가르는 기준 */
const S8_CURV_SCOPE = { products: ['roborock-s8-proultra', 'roborock-qrevo-curv'] };

const evidence = (code: string) => ({ file: SK_CUCKOO_ROBOROCK_EVIDENCE, hub: 'Roborock', code });

/** 두 모델의 같은 오류 항목. 라벨 꼬리는 JSON 그대로다(Curv Error 4만 설명서 절이 더 붙는다) */
function s8Curv(errorLabel: string, curvSuffix = ''): ErrorActionModel[] {
  return [
    { model: 'S8 Pro Ultra', manualUrl: S8_HELP, manualLabel: `Roborock S8 Pro Ultra 모델별 문제 해결(미국판) — ${errorLabel}`, checkedAt: CHECKED },
    { model: 'Qrevo Curv', manualUrl: CURV_HELP, manualLabel: `Roborock Qrevo Curv 모델별 문제 해결(미국판) — ${errorLabel}${curvSuffix}`, checkedAt: CHECKED },
  ];
}

const robot = {
  brand: '로보락',
  category: '로봇청소기',
  href: HUB,
  version: ACTION_VERSION_2026_10_29,
  serviceUrl: SERVICE,
} as const;

const PERSISTS = '같은 오류가 계속될 때 — 로보락 고객지원에 문의(공식 문제 해결 문서)';

export const ROBOROCK_S7_ACTION_GUIDE: ErrorActionGuide = {
  id: 'roborock-s7-error2',
  brand: '로보락',
  category: '로봇청소기',
  code: 'Error 2',
  href: HUB,
  anchor: 'action-roborock-s7-error2',
  version: '2026-10-27.1',
  evidence: { file: LEGACY_CARDS_EVIDENCE, hub: 'Roborock', code: 'Error 2' },
  models: [{
    model: 'S7',
    manualUrl: S7_MANUAL,
    manualLabel: 'Roborock S7 공식 영문 설명서 — 인쇄 38~39쪽 Errors',
    checkedAt: '2026-10-27',
  }],
  serviceUrl: SERVICE,
  observationHint: '예: 범퍼가 눌린 채 돌아오지 않는지, 범퍼를 닦은 뒤 같은 오류가 반복되는지. S7 MaxV 등 다른 모델에는 이 조치를 적용하지 않습니다.',
  stopConditions: ['범퍼를 닦고 두드린 뒤에도 같은 오류가 반복될 때 — 본체를 분해하지 말고 공식 서비스에 문의(설명서 인쇄 39쪽)'],
  action: {
    type: 'check',
    title: '범퍼의 걸림을 확인하세요',
    steps: ['S7 설명서는 Error 2를 범퍼 걸림으로 안내합니다. 범퍼를 닦고 가볍게 두드려 움직임이 돌아오는지 확인한 뒤 다른 위치로 옮겨 청소를 다시 시작하세요.', '같은 오류가 반복되면 본체를 분해하지 말고 공식 서비스에 범퍼 상태와 해본 조치를 전하세요.'],
  },
};

const S7_ERROR4: ErrorActionGuide = {
  ...robot,
  id: 'roborock-s7-error4',
  code: 'Error 4',
  anchor: 'action-roborock-s7-error4',
  evidence: evidence('Error 4'),
  hubScope: { productLines: ['Roborock S7'] },
  models: [{
    model: 'S7',
    manualUrl: S7_MANUAL,
    manualLabel: 'Roborock S7 공식 영문 설명서 — 인쇄 38쪽 Errors(Error 4), 27쪽 정기 관리(Cliff Sensors)',
    checkedAt: CHECKED,
  }],
  observationHint: '예: 오류가 계단·문턱 근처나 특정 바닥에서만 나는지. S8 Pro Ultra·Qrevo Curv 등 다른 모델은 각 모델 안내를 따르세요.',
  stopConditions: ['센서를 닦고 옮긴 뒤에도 문제가 계속될 때 — 애프터서비스 문의(설명서 인쇄 39쪽)'],
  action: {
    type: 'check',
    title: '낭떠러지 센서를 닦고 로봇을 옮겨 다시 시작하세요',
    steps: [
      '본체 바닥의 낭떠러지(추락 방지) 센서를 부드럽고 마른 천으로 닦으세요.',
      '로봇을 계단·단차 같은 낙하 지점에서 떨어진 곳으로 옮긴 뒤 청소를 다시 시작하세요.',
      '같은 오류가 반복되면 로보락 고객지원에 문의하세요.',
    ],
  },
};

const ERROR1: ErrorActionGuide = {
  ...robot,
  id: 'roborock-error1',
  code: 'Error 1',
  anchor: 'action-roborock-error1',
  evidence: evidence('Error 1'),
  models: s8Curv('error 1'),
  observationHint: '예: 켰을 때 센서가 전혀 돌지 않는지, 돌다가 멈추는지. 센서 덮개를 열지 마세요.',
  stopConditions: [PERSISTS],
  action: {
    type: 'check',
    title: '상단 레이저 센서가 도는지 확인하세요',
    steps: [
      '로봇을 켜고 상단 레이저 센서가 회전하는지 보세요.',
      '돌지 않으면 손으로 살살 돌려 준 뒤 로봇을 다시 시작하세요.',
      '같은 오류가 계속되면 로보락 고객지원에 문의하세요.',
    ],
  },
};

const ERROR4: ErrorActionGuide = {
  ...robot,
  id: 'roborock-error4',
  code: 'Error 4',
  anchor: 'action-roborock-error4',
  evidence: evidence('Error 4'),
  hubScope: S8_CURV_SCOPE,
  models: s8Curv('error 4', ' / 설명서 D8 Robot Sensors'),
  observationHint: '예: 오류가 특정 러그·어두운 바닥에서만 나는지. 센서를 닦을 때는 부드럽고 마른 천을 쓰세요(Qrevo Curv 설명서).',
  stopConditions: [PERSISTS],
  action: {
    type: 'check',
    title: '낭떠러지 센서를 닦고 바닥을 확인하세요',
    steps: [
      '본체 바닥의 낭떠러지(추락 방지) 센서를 닦으세요.',
      '로봇이 어두운 색이나 털이 긴 카펫 위에 있지 않은지 확인한 뒤 다시 시작하세요.',
      '같은 오류가 계속되면 로보락 고객지원에 문의하세요.',
    ],
  },
};

const ERROR5: ErrorActionGuide = {
  ...robot,
  id: 'roborock-error5',
  code: 'Error 5',
  anchor: 'action-roborock-error5',
  evidence: evidence('Error 5'),
  models: s8Curv('error 5'),
  observationHint: '예: 머리카락·실이 감긴 위치(브러시 양 끝, 장착 홈).',
  stopConditions: [PERSISTS],
  action: {
    type: 'check',
    title: '메인브러시에 감긴 것을 빼세요',
    steps: [
      '메인브러시, 브러시가 끼워지는 홈 두 곳, 브러시 양 끝에 감긴 것이 없는지 확인해 빼내세요.',
      '카펫 모드를 켠 상태로 로봇을 작동해 해결됐는지 보세요.',
      '같은 오류가 계속되면 로보락 고객지원에 문의하세요.',
    ],
  },
};

const ERROR7: ErrorActionGuide = {
  ...robot,
  id: 'roborock-error7',
  code: 'Error 7',
  anchor: 'action-roborock-error7',
  evidence: evidence('Error 7'),
  models: s8Curv('error 7'),
  observationHint: '예: 어느 쪽 바퀴가 눌리거나 돌지 않는지, 감긴 이물질이 있는지.',
  stopConditions: [PERSISTS],
  action: {
    type: 'check',
    title: '바퀴가 걸렸는지 확인하세요',
    steps: [
      '바퀴를 손으로 눌렀다 돌려 걸려 있는지 확인하세요.',
      '걸려 있으면 걸린 것을 빼내세요.',
      '같은 오류가 계속되면 로보락 고객지원에 문의하세요.',
    ],
  },
};

const ERROR9: ErrorActionGuide = {
  ...robot,
  id: 'roborock-error9',
  code: 'Error 9',
  anchor: 'action-roborock-error9',
  evidence: evidence('Error 9'),
  models: s8Curv('error 9'),
  observationHint: '예: 사용 중인 필터가 정품인지, 옆면 자석이 보이는지.',
  stopConditions: [PERSISTS],
  action: {
    type: 'check',
    title: '필터 옆면의 자석을 확인하세요',
    steps: [
      '필터 옆면에 자석이 있는지 확인하세요.',
      '자석이 없으면 필터를 교체하고 다시 시도하세요.',
      '같은 오류가 계속되면 로보락 고객지원에 문의하세요.',
    ],
  },
};

const ERROR10: ErrorActionGuide = {
  ...robot,
  id: 'roborock-error10',
  code: 'Error 10',
  anchor: 'action-roborock-error10',
  evidence: evidence('Error 10'),
  models: s8Curv('error 10'),
  observationHint: '예: 필터를 마지막으로 씻은 날과 완전히 말렸는지.',
  stopConditions: [PERSISTS],
  action: {
    type: 'check',
    title: '필터를 씻고 완전히 말려 다시 끼우세요',
    steps: [
      '필터를 청소하고 완전히 말린 뒤 로봇에 다시 끼우세요.',
      '다시 시도하고, 같은 오류가 계속되면 로보락 고객지원에 문의하세요.',
    ],
  },
};

const ERROR13: ErrorActionGuide = {
  ...robot,
  id: 'roborock-error13',
  code: 'Error 13',
  anchor: 'action-roborock-error13',
  evidence: evidence('Error 13'),
  models: s8Curv('error 13'),
  observationHint: '예: 로봇을 올렸을 때 도크 표시등이 켜지는지 꺼지는지, 접점에 얼룩·녹이 있는지.',
  // 원문 안내는 「다시 올려 표시등이 꺼지는지 확인」에서 끝난다. 그다음 조치는 원문에 없어
  // 다른 카드와 같은 기본 안내(모델명·해본 조치를 공식 서비스에 전함)만 둔다 — 편집 판단.
  stopConditions: ['네 단계 뒤에도 도크 표시등이 켜져 있을 때 — 공식 안내에 다음 조치가 없으니 모델명과 해본 조치를 로보락 고객지원에 알려 확인하세요'],
  action: {
    type: 'check',
    title: '도크 표시등을 보며 충전 접점을 맞추세요',
    steps: [
      '로봇이 도크에 있을 때 도크 표시등이 켜져 있으면 접점이 제대로 닿지 않은 상태입니다. 로봇을 조금씩 움직여 표시등이 꺼지는지 보세요.',
      '로봇과 도크의 충전 접점을 마른 천이나 알코올을 살짝 묻힌 천으로 닦거나 지우개로 가볍게 문지르세요.',
      '도크 전원선이 도크와 콘센트에 끝까지 꽂혔는지 확인하고, 필요하면 다른 콘센트를 써 보세요.',
      '로봇을 다시 도크에 올려 표시등이 꺼지는지 확인하세요.',
    ],
  },
};

const ERROR18: ErrorActionGuide = {
  ...robot,
  id: 'roborock-error18',
  code: 'Error 18',
  anchor: 'action-roborock-error18',
  evidence: evidence('Error 18'),
  models: s8Curv('error 18'),
  observationHint: '예: 먼지통이 가득 찼는지, 필터 상태. 본체를 분해해 팬을 꺼내지 마세요.',
  stopConditions: [PERSISTS],
  action: {
    type: 'check',
    title: '본체 옆면을 두드려 팬 이물질을 털어내세요',
    steps: [
      '로봇 옆면을 여러 번 두드려 팬의 이물질을 털어내 보세요.',
      '같은 오류가 계속되면 로보락 고객지원에 문의하세요.',
    ],
  },
};

export const ROBOROCK_ACTIONS: HubActionSet = {
  brand: 'Roborock',
  guides: [ERROR1, ERROR10, ERROR13, ERROR18, ROBOROCK_S7_ACTION_GUIDE, ERROR4, S7_ERROR4, ERROR5, ERROR7, ERROR9],
  noCard: [],
};
