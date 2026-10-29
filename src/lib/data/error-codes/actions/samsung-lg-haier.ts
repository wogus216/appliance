// 삼성·LG·하이얼 허브의 행동 카드와 「카드 없음」 코드.
// 근거: research/evidence/2026-10-29/error-actions/samsung-lg-haier.json(.md).
// 리드 결정(2026-10-29): 삼성 건조기 9C2는 check — 같은 설명서의 전용 콘센트(5쪽)·문어발 금지(6쪽)를
// 단계 맨 앞에 두고 81쪽의 사용자 확인 네 가지를 그 뒤에 둔다. TC5는 원문대로 check.

import type { ErrorActionGuide } from '@/lib/error-action';
import { getErrorCodeDetailPage } from '../detail-pages';
import {
  ACTION_VERSION_2026_10_29,
  SAMSUNG_LG_HAIER_EVIDENCE,
  type HubActionSet,
  type NoCardCode,
} from './shared';

const CHECKED = '2026-10-29';
const SAMSUNG_SERVICE = 'https://www.samsungsvc.co.kr/';
const LG_SERVICE = 'https://www.lge.co.kr/support';
const DV17_MANUAL = 'https://downloadcenter.samsung.com/content/UM/202504/20250401094234705/WM0013_IB_DV8700TK_DV19A9740_KO_250313.pdf';

const evidence = (hub: string, code: string) => ({ file: SAMSUNG_LG_HAIER_EVIDENCE, hub, code });

const samsung = {
  brand: '삼성',
  href: '/error-codes/Samsung',
  version: ACTION_VERSION_2026_10_29,
  serviceUrl: SAMSUNG_SERVICE,
} as const;

const SMOKE_STOP = '제품에서 이상한 소리·냄새·연기가 날 때 — 즉시 전원을 차단하고 서비스센터에 연락(인쇄 6쪽)';

const WASHER_5C: ErrorActionGuide = {
  ...samsung,
  id: 'samsung-washer-5c',
  category: '세탁기',
  code: '5C',
  anchor: 'action-samsung-washer-5c',
  evidence: evidence('Samsung', '5C'),
  models: [{
    model: 'WD25DB8995BZ',
    manualUrl: 'https://downloadcenter.samsung.com/content/UM/202608/20260818083830741/OID76616_IB_T-PJT_WD8000D-AD_7LCD_KO_260814.pdf',
    manualLabel: '삼성 WD25DB8995BZ 설명서 인쇄 6·7·9·62~63·71·73쪽(모델명 78쪽)',
    checkedAt: CHECKED,
  }],
  observationHint: '예: 잔수 제거 호스로 받은 물의 양, 배수 필터에서 나온 이물, 배수 호스가 눌리거나 언 곳이 있는지. 제품 밑면이 물에 잠겼다면 확인하려고 다가가지 마세요.',
  stopConditions: [
    '제품 밑면이 물에 잠겼을 때 — 사용을 중단하고 서비스센터에 연락(인쇄 7쪽)',
    '지진·수해 등으로 제품이 침수됐을 때 — 반드시 점검을 받으세요(인쇄 9쪽)',
    '같은 문제가 계속되거나 목록에 없는 점검 문자가 표시될 때 — 서비스센터 문의(인쇄 71쪽)',
  ],
  action: {
    type: 'check',
    title: '남은 물을 빼고 배수 필터를 청소하세요',
    steps: [
      '청소 전에 전원 플러그를 빼세요. 동작 중에는 플러그를 빼지 말고, 젖은 손으로 만지지 마세요(인쇄 6·9쪽). 배수되는 물은 뜨거울 수 있으니 손대지 마세요(인쇄 7쪽).',
      '세제함 전면 뚜껑을 열어 일반 세제함(A)을 꺼낸 뒤, 잔수 제거 호스를 빼내 끝의 마개를 뽑고 물을 용기에 받으세요. 용기는 세제함 전면 뚜껑 위에 올려놓지 마세요. 다 받으면 마개를 닫아 원래 위치에 고정하세요(인쇄 62쪽). 드럼에 물이 남은 채 배수 필터를 빼면 앞으로 물이 넘칠 수 있습니다(인쇄 62쪽).',
      '배수 필터를 왼쪽으로 돌려 빼고 부드러운 솔로 필터와 내부를 청소한 뒤, 오른쪽으로 돌려 끼우고 잠김 상태를 꼭 확인하세요. 일반 세제함을 끝까지 밀어 넣고 전면 뚜껑을 닫으세요(인쇄 62~63쪽).',
      '배수 호스가 제품에 잘 연결돼 있는지, 하수구에 이물이 있는지, 겨울철이면 배수 호스가 얼지 않았는지 확인하세요(인쇄 73쪽).',
      '같은 문제가 계속되면 서비스센터에 문의하세요(인쇄 71쪽).',
    ],
  },
};

const DRYER_9C2: ErrorActionGuide = {
  ...samsung,
  id: 'samsung-dryer-9c2',
  category: '건조기',
  code: '9C2',
  anchor: 'action-samsung-dryer-9c2',
  evidence: evidence('Samsung', '9C2'),
  hazard: 'electric',
  models: [{
    model: 'DV17A9720BV',
    manualUrl: DV17_MANUAL,
    manualLabel: '삼성 DV17A9720BV 지원 페이지 연결 공용 설명서 인쇄 5·6·81쪽(모델명 87쪽)',
    checkedAt: CHECKED,
  }],
  observationHint: '예: 멀티탭·연장 콘센트 사용 여부, 다른 기기와 나눠 쓰는지, 다른 콘센트에서도 같은지. 젖거나 손상된 콘센트는 확인하려고 만지지 마세요.',
  stopConditions: [
    SMOKE_STOP,
    '전원 플러그·전원 코드가 손상됐거나 콘센트가 느슨할 때 — 그대로 사용하지 마세요(인쇄 6쪽)',
    '네 가지를 확인한 뒤에도 9C2가 계속될 때 — 서비스를 요청하세요(인쇄 81쪽)',
  ],
  action: {
    type: 'check',
    title: '전원 연결 상태를 확인하세요',
    steps: [
      '이 모델 설명서는 연장 콘센트를 이용하지 말고 전용 콘센트로 전원을 연결하라고 합니다(인쇄 5쪽).',
      '콘센트에 문어발식(연장선·멀티탭)으로 전원 플러그를 연결하지 마세요(인쇄 6쪽).',
      '전원 코드가 꽂혀 있는지 확인하세요(인쇄 81쪽).',
      '전원 플러그를 뺀 뒤 다른 콘센트에 꽂아 전원이 들어오는지 확인하세요(인쇄 81쪽).',
      '멀티탭을 쓰고 있다면 용량을 확인하세요. 설명서는 220V 16A 이상을 단독으로 쓰도록 권장합니다(인쇄 81쪽).',
      '절전 콘센트인지 확인하고, 절전 콘센트라면 상시로 바꾸세요(인쇄 81쪽).',
    ],
  },
};

const DRYER_HC: ErrorActionGuide = {
  ...samsung,
  id: 'samsung-dryer-hc',
  category: '건조기',
  code: 'HC',
  anchor: 'action-samsung-dryer-hc',
  evidence: evidence('Samsung', 'HC'),
  hazard: 'overheat',
  models: [{
    model: 'DV17A9720BV',
    manualUrl: DV17_MANUAL,
    manualLabel: '삼성 DV17A9720BV 지원 페이지 연결 공용 설명서 인쇄 6·81쪽(모델명 87쪽)',
    checkedAt: CHECKED,
  }],
  observationHint: '예: HC가 표시된 시점(건조 시작 직후·도중), 같은 표시가 반복되는지. 내부를 열어 확인하지 마세요.',
  stopConditions: [SMOKE_STOP, 'HC가 계속될 때 — 사용자 조치 없이 서비스를 요청하세요(인쇄 81쪽)'],
  action: {
    type: 'contact',
    title: '반복되면 서비스를 요청하세요',
    steps: [
      '이 모델 설명서는 HC를 압축기 과열로 분류하고, 사용자 조치 없이 \'이 문제가 계속되면 서비스를 요청하세요\'라고만 안내합니다(인쇄 81쪽).',
      '이상한 소리·냄새·연기가 나면 즉시 전원을 차단하고 서비스센터에 연락하세요(인쇄 6쪽).',
    ],
  },
};

const DRYER_TC5: ErrorActionGuide = {
  ...samsung,
  id: 'samsung-dryer-tc5',
  category: '건조기',
  code: 'TC5',
  anchor: 'action-samsung-dryer-tc5',
  evidence: evidence('Samsung', 'TC5'),
  hazard: 'overheat',
  models: [{
    model: 'DV17A9720BV',
    manualUrl: DV17_MANUAL,
    manualLabel: '삼성 DV17A9720BV 지원 페이지 연결 공용 설명서 인쇄 6·81쪽(모델명 87쪽)',
    checkedAt: CHECKED,
  }],
  observationHint: '예: 2~3분 기다린 뒤 다시 시작했는지, 다시 시작한 뒤 TC5가 또 표시되기까지 걸린 시간.',
  stopConditions: [SMOKE_STOP, '다시 시작한 뒤에도 TC5가 계속 표시될 때 — 서비스센터 문의(인쇄 81쪽 참고)'],
  action: {
    type: 'check',
    title: '2~3분 기다린 뒤 다시 시작하세요',
    steps: [
      '이 모델 설명서는 TC5(압축기 온도 센서 문제)에 2~3분간 기다린 다음 전원을 켜고 다시 시작하라고 안내합니다(인쇄 81쪽).',
      '같은 문제가 계속되면 삼성전자 서비스센터에 문의하세요(인쇄 81쪽 참고).',
    ],
  },
};

export const HAIER_F25_ACTION_GUIDE: ErrorActionGuide = {
  id: 'haier-f25',
  brand: '하이얼',
  category: '에어컨',
  code: 'F25',
  href: getErrorCodeDetailPage('Haier', '에어컨', 'F25')!.href,
  version: '2026-10-27.1',
  evidence: evidence('Haier', 'F25'),
  models: [
    {
      model: 'CTH06QBW',
      manualUrl: 'https://www.haier.co.kr/include/download.asp?file_name=HSU06_Series__CTH06_Series_%EC%82%AC%EC%9A%A9%EC%84%A4%EB%AA%85%EC%84%9C_20240221.pdf&file_full_name=00000002312024000262_file1.pdf&folder=0000000231',
      manualLabel: '하이얼코리아 HSU06·CTH06 계열 설명서 인쇄 28쪽',
      checkedAt: '2026-10-02',
    },
    {
      model: 'CTH10QBW',
      manualUrl: 'https://www.haier.co.kr/include/download.asp?file_name=HSU10Q_Series__CTH10Q_Series_%EC%82%AC%EC%9A%A9%EC%84%A4%EB%AA%85%EC%84%9C_20240221.pdf&file_full_name=00000002312024000264_file1.pdf&folder=0000000231',
      manualLabel: '하이얼코리아 HSU10Q·CTH10Q 계열 설명서 인쇄 28쪽',
      checkedAt: '2026-10-02',
    },
  ],
  serviceUrl: 'https://www.haier.co.kr/',
  observationHint: '예: 표시가 나온 시각의 외기 온도와 냉방·난방 등 운전 모드. 모르면 미확인으로 남겨도 됩니다.',
  // 상담 기록의 분기(getErrorActionAdvice)가 재시작을 보류하는 두 경우를 그대로 옮겼다.
  stopConditions: [
    '외기가 0℃ 이상이거나 외기 온도를 확인할 수 없을 때 — 저온 표시로 판단하지 말고 재시작을 보류한 채 서비스에 문의',
    '10초 뒤 다시 시작한 뒤에도 F25가 반복될 때 — 사용을 멈추고 서비스 요청',
  ],
  action: { type: 'cold-weather' },
};

const samsungNoCard = (code: string): NoCardCode => ({
  category: '에어컨',
  code,
  serviceUrl: SAMSUNG_SERVICE,
  checkedAt: CHECKED,
  evidence: evidence('Samsung', code),
});

const lgNoCard = (code: string): NoCardCode => ({
  category: '냉장고',
  code,
  serviceUrl: LG_SERVICE,
  checkedAt: CHECKED,
  evidence: evidence('LG', code),
});

export const SAMSUNG_ACTIONS: HubActionSet = {
  brand: 'Samsung',
  guides: [WASHER_5C, DRYER_9C2, DRYER_HC, DRYER_TC5],
  // 공통 코드표는 모델명을 적지 않고, AR07A9170HCN 설명서 3종에 해당 코드가 없다.
  noCard: ['E101', 'E422', 'E458', 'E464'].map(samsungNoCard),
};

export const LG_ACTIONS: HubActionSet = {
  brand: 'LG',
  guides: [],
  // 공통 안내는 하위 카테고리 단위로 연결되고(가짜 모델 대조군에서 같은 목록), 두 모델 설명서에 코드 목록이 없다.
  noCard: ['CF', 'CO', 'dH', 'Er FF', 'Er rF'].map(lgNoCard),
};

export const HAIER_ACTIONS: HubActionSet = {
  brand: 'Haier',
  guides: [HAIER_F25_ACTION_GUIDE],
  noCard: [],
};
