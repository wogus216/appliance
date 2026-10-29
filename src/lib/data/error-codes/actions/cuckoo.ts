// 쿠쿠 허브의 행동 카드.
// 근거: research/evidence/2026-10-29/error-actions/skmagic-cuckoo-roborock.json(.md) — Cuckoo 행.
// E4는 2026-10-27 카드(상세 안내 페이지)로 그 JSON에서 빠져 있다.

import type { ErrorActionGuide } from '@/lib/error-action';
import { getErrorCodeDetailPage } from '../detail-pages';
import {
  ACTION_VERSION_2026_10_29,
  SK_CUCKOO_ROBOROCK_EVIDENCE,
  sameManual,
  type HubActionSet,
} from './shared';

const HUB = '/error-codes/Cuckoo';
const SERVICE = 'https://www.cuckoo.co.kr/customer';
const CHECKED = '2026-10-29';
const A0611_MODELS = ['CDW-A0611TW', 'CDW-A0611TS'];
const A0611_MANUAL = 'https://www.cuckoo.co.kr/upload_cuckoo/_bo_rep/manual/200424%3Dz0383-0082a0%20rev.1_cdw-a0611t.pdf';
const A0611 = sameManual(A0611_MODELS, {
  manualUrl: A0611_MANUAL,
  manualLabel: '쿠쿠 CDW-A0611TW·CDW-A0611TS 공용 설명서 인쇄 25쪽',
  checkedAt: CHECKED,
});

const evidence = (code: string) => ({ file: SK_CUCKOO_ROBOROCK_EVIDENCE, hub: 'Cuckoo', code });

const dw = {
  brand: '쿠쿠',
  category: '식기세척기',
  href: HUB,
  version: ACTION_VERSION_2026_10_29,
  serviceUrl: SERVICE,
} as const;

const SHUT_OFF_STEPS = [
  '전원을 끄고 전원 플러그를 콘센트에서 빼세요.',
  '중간밸브를 잠근 뒤 쿠쿠 서비스(1588-8899)에 문의하세요.',
];

/** 기존 기사와 저장된 공식 원문 대조 기록에서 적용 범위를 확인한 모델만 연결한다. */
export const CUCKOO_E4_ACTION_GUIDE: ErrorActionGuide = {
  id: 'cuckoo-e4',
  brand: '쿠쿠',
  category: '식기세척기',
  code: 'E4',
  href: getErrorCodeDetailPage('Cuckoo', '식기세척기', 'E4')!.href,
  version: '2026-10-27.1',
  hazard: 'leak',
  models: A0611_MODELS.map((model) => ({
    model,
    manualUrl: A0611_MANUAL,
    manualLabel: '쿠쿠 CDW-A0611TW·CDW-A0611TS 공용 설명서 인쇄 12·25·32쪽',
    checkedAt: '2026-10-07',
  })),
  serviceUrl: SERVICE,
  observationHint: '예: 바닥에 보이는 물의 위치, 최근 설치·이동·호스 작업 여부. 확인하려고 젖은 전원 부근에 접근하지 마세요.',
  stopConditions: [
    'E4가 표시되면 바로 — 이 모델 설명서는 전원·급수 차단 뒤 서비스 요청만 안내합니다',
    '물이 안 보이거나 표시가 사라져도 — 다시 세척하지 말고 점검을 요청하세요',
  ],
  action: {
    type: 'contact',
    title: '전원·급수를 차단하고 서비스를 요청하세요',
    steps: [
      '이 모델 설명서의 E4 조치는 전원을 끄고 플러그를 분리한 뒤 중간밸브를 잠그는 것입니다. 젖은 전원 부근에 접근하지 마세요. 중간밸브 위치를 모르면 직접 작업하지 말고 서비스에 문의하세요.',
      '물이 안 보이거나 표시가 사라져도 다시 세척하지 말고 공식 서비스에 점검을 요청하세요.',
    ],
  },
};

const DR: ErrorActionGuide = {
  ...dw,
  id: 'cuckoo-dr',
  code: 'dr',
  anchor: 'action-cuckoo-dr',
  evidence: evidence('dr'),
  models: A0611,
  observationHint: '예: 문을 다시 닫은 뒤 dr이 사라지는지, 바구니·식기가 문에 걸리는지. 문 잠금 부품을 분해하지 마세요.',
  stopConditions: ['문이 정상적으로 닫힌 상태에서 dr이 해제되지 않을 때 — A/S 문의(설명서)'],
  action: {
    type: 'check',
    title: '문이 꼭 닫혔는지 확인하세요',
    steps: [
      '문이 꼭 닫혀 있는지 확인하세요.',
      '문이 정상적으로 닫혀 있는데도 dr 표시가 사라지지 않으면 모델명과 표시를 쿠쿠 서비스(1588-8899)에 전하세요.',
    ],
  },
};

const E1: ErrorActionGuide = {
  ...dw,
  id: 'cuckoo-e1',
  code: 'E1',
  anchor: 'action-cuckoo-e1',
  evidence: evidence('E1'),
  models: A0611,
  observationHint: '예: 같은 수전에서 물이 나오는지, 중간밸브 손잡이 방향, 급수호스가 눌린 곳.',
  stopConditions: ['네 가지를 확인한 뒤에도 문제가 계속될 때 — A/S 문의(설명서)'],
  action: {
    type: 'check',
    title: '급수 경로를 확인하세요',
    steps: [
      '중간밸브가 열려 있는지 확인하세요.',
      '단수가 아닌지, 수압이 너무 낮지 않은지 확인하세요.',
      '급수호스가 꺾이거나 눌려 있지 않은지 확인하세요.',
      '문제가 계속되면 쿠쿠 서비스(1588-8899)에 문의하세요.',
    ],
  },
};

/**
 * E2는 CDW-A0611TW·TS 코드표에 없다. 쿠쿠 설명서 검색 목록의 설명서를 모두 대조해 E2가 같은 뜻·같은 조치로
 * 실린 계열만 넣었다(CS0620T·CS0610T·BD06 = 히터 저온 점검, BS0310T = E2·E3 히터 점검 한 행).
 */
const E2: ErrorActionGuide = {
  ...dw,
  id: 'cuckoo-e2',
  code: 'E2',
  anchor: 'action-cuckoo-e2',
  evidence: evidence('E2'),
  models: [
    {
      model: 'CDW-CS0620T Series',
      manualUrl: 'https://cdn.cuckoo.co.kr/upload_cuckoo/_bo_rep/manual/file_42564d7e-2cf0-4afa-a733-16ec86be146a.pdf',
      manualLabel: '쿠쿠 CDW-CS0620T Series 설명서 인쇄 26쪽(사이트 출처 rev.2 파일·현재 검색 목록의 CDW-CS0620TWE 파일 모두 같은 표)',
      checkedAt: CHECKED,
    },
    {
      model: 'CDW-CS0610T Series',
      manualUrl: 'https://cdn.cuckoo.co.kr/upload_cuckoo/_bo_rep/manual/file_81c59aac-9db5-4986-99d1-bb7727c8bacd.pdf',
      manualLabel: '쿠쿠 CDW-CS0610T 사용자 설명서 Rev.0 인쇄 26쪽(검색 목록: CDW-CS0610TW/TGP/TGW)',
      checkedAt: CHECKED,
    },
    ...sameManual(['CDW-BD0610TB', 'CDW-BD0610TG', 'CDW-BD0620TB', 'CDW-BD0620TW'], {
      manualUrl: 'https://cdn.cuckoo.co.kr/upload_cuckoo/_bo_rep/manual/file_510811c7-6e60-4e0a-a8a8-a02cc66427cd.pdf',
      manualLabel: '쿠쿠 CDW-BD0610T·BD0620T Series 설명서 인쇄 25쪽',
      checkedAt: CHECKED,
    }),
    {
      model: 'CDW-BS0310T Series',
      manualUrl: 'https://cdn.cuckoo.co.kr/upload_cuckoo/_bo_rep/manual/file_1485a9e8-af7f-4595-9393-99e30f350a22.pdf',
      manualLabel: '쿠쿠 CDW-BS0310T Series 설명서 인쇄 26쪽(검색 목록: CDW-BS0310TWE)',
      checkedAt: CHECKED,
    },
  ],
  observationHint: '예: 명판의 정확한 모델명. 같은 E2라도 CDW-A0611TW 등 다른 쿠쿠 모델 코드표에는 E2가 없으니 모델명을 먼저 확인하세요.',
  stopConditions: [
    '전원을 껐다 켠 뒤에도 E2가 계속될 때 — A/S 문의(설명서)',
    '물이 샐 때 — 서비스를 요청하기 전에 중간밸브를 차단하세요(같은 쪽 경고)',
  ],
  action: {
    type: 'check',
    title: '전원을 껐다 켜서 다시 시작해 보세요',
    steps: [
      '전원을 껐다 켜서 다시 시작해 보세요.',
      '문제가 계속되면 모델명과 E2 표시를 쿠쿠 서비스(1588-8899)에 전하세요.',
    ],
  },
};

const E3: ErrorActionGuide = {
  ...dw,
  id: 'cuckoo-e3',
  code: 'E3',
  anchor: 'action-cuckoo-e3',
  evidence: evidence('E3'),
  models: A0611,
  observationHint: '예: 표시가 나온 코스와 시점, 재시작 뒤 같은 단계에서 다시 멈추는지.',
  stopConditions: ['전원을 껐다 켠 뒤에도 E3가 계속될 때 — A/S 문의(설명서)'],
  action: {
    type: 'check',
    title: '전원을 껐다 켜서 다시 시작해 보세요',
    steps: ['전원을 껐다 켜서 다시 시작해 보세요.', '문제가 계속되면 쿠쿠 서비스(1588-8899)에 문의하세요.'],
  },
};

const E6_E7: ErrorActionGuide = {
  ...dw,
  id: 'cuckoo-e6-e7',
  code: 'E6 / E7',
  anchor: 'action-cuckoo-e6-e7',
  evidence: evidence('E6 / E7'),
  models: A0611,
  observationHint: '예: 표시가 나온 코스와 시점. 중간밸브 위치를 모르면 직접 작업하지 말고 서비스에 문의하세요.',
  stopConditions: ['E6·E7이 표시되면 바로 — 설명서는 재시작 확인 없이 전원·급수 차단 뒤 A/S 문의만 안내합니다'],
  action: { type: 'contact', title: '전원·급수를 차단하고 서비스를 요청하세요', steps: SHUT_OFF_STEPS },
};

const ED: ErrorActionGuide = {
  ...dw,
  id: 'cuckoo-ed',
  code: 'ED',
  anchor: 'action-cuckoo-ed',
  evidence: evidence('ED'),
  models: A0611,
  observationHint: '예: 표시가 나온 시점과 직전 정전·전원 재연결 여부. 제어 기판(PBA)을 열어 보지 마세요.',
  stopConditions: ['ED가 표시되면 바로 — 설명서는 전원·급수 차단 뒤 A/S 문의만 안내합니다'],
  action: { type: 'contact', title: '전원·급수를 차단하고 서비스를 요청하세요', steps: SHUT_OFF_STEPS },
};

export const CUCKOO_ACTIONS: HubActionSet = {
  brand: 'Cuckoo',
  guides: [DR, E1, E2, E3, CUCKOO_E4_ACTION_GUIDE, E6_E7, ED],
  noCard: [],
};
