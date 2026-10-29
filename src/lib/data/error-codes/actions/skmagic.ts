// SK매직 허브의 행동 카드.
// 근거: research/evidence/2026-10-29/error-actions/skmagic-cuckoo-roborock.json(.md) — SKMagic 행.
// dr(DWA19)·F9는 2026-10-27 카드로 그 JSON에서 빠져 있어, 2026-10-29에 원문을 다시 열어 legacy-cards.json(.md)에 남겼다
// (dr: DWA19R0P 공용 설명서 TOUCH ON 절·제품규격, F9: DWA-81R0D 공용 설명서 자가 진단하기 F1~F9 이미지·문장).

import type { ErrorActionGuide } from '@/lib/error-action';
import {
  ACTION_VERSION_2026_10_29,
  LEGACY_CARDS_EVIDENCE,
  SK_CUCKOO_ROBOROCK_EVIDENCE,
  sameManual,
  type HubActionSet,
} from './shared';

const HUB = '/error-codes/SKMagic';
const SERVICE = 'https://www.skintellixservice.com/web/main/main.do';
const CHECKED = '2026-10-29';

/** DWA-81R0D 공용 설명서 제품규격에 실린 8개 모델. 계열 접두사로 넓히지 않는다 */
const DWA81_MODELS = ['DWA-81R0D', 'DWA-81R1D', 'DWA-81U0D', 'DWA-81U1D', 'DWA-81R5B', 'DWA-81R6B', 'DWA-81U5B', 'DWA-81U6B'];
const DWA81_MANUAL = 'https://m.manual.skmagic.com/2019/model/DWA/DWA81R0D00SL/Manual.htm';

const evidence = (code: string) => ({ file: SK_CUCKOO_ROBOROCK_EVIDENCE, hub: 'SKMagic', code });

const dw = {
  brand: 'SK매직',
  category: '식기세척기',
  href: HUB,
  version: ACTION_VERSION_2026_10_29,
  serviceUrl: SERVICE,
} as const;

/** F1~F9 공통 조치 — 설명서 「자가 진단하기」 기능 이상 */
const FUNCTION_FAULT_STEPS = [
  '전원을 끄고 전원 플러그를 콘센트에서 빼세요.',
  '중간밸브를 잠근 뒤 SK매직 고객상담센터(1600-1661)에 문의하세요.',
];

export const SKMAGIC_DR_ACTION_GUIDE: ErrorActionGuide = {
  id: 'skmagic-dr',
  brand: 'SK매직',
  category: '식기세척기',
  code: 'dr',
  href: HUB,
  anchor: 'action-skmagic-dr',
  version: '2026-10-27.1',
  evidence: { file: LEGACY_CARDS_EVIDENCE, hub: 'SKMagic', code: 'dr' },
  models: ['DWA19R0P', 'DWA19C0P', 'DWA19C1P'].map((model) => ({
    model,
    manualUrl: 'https://m.manual.skmagic.com/2019/model/DWA/DWA19R0P00BL/Manual.htm',
    manualLabel: 'SK매직 DWA19R0P·C0P·C1P 공용 설명서 — TOUCH ON·제품규격',
    checkedAt: '2026-10-27',
  })),
  serviceUrl: SERVICE,
  observationHint: '예: 문을 닫은 뒤에도 dr이 남는지, 문이 정상적으로 닫히는지. 문을 강제로 열거나 잠금 장치를 분해하지 마세요.',
  stopConditions: ['문을 닫아도 dr이 남거나 작동하지 않을 때 — 문을 강제로 열지 말고 모델명과 표시를 공식 서비스에 전하세요'],
  action: {
    type: 'check',
    title: '문이 완전히 닫혔는지 확인하세요',
    steps: ['문의 위쪽 끝을 눌러 닫고 dr 표시가 사라지는지 확인하세요. 설명서는 dr이 사라져야 문이 완전히 닫힌 상태라고 안내합니다. 문을 강제로 열지 마세요.', '문을 닫아도 표시가 남거나 작동하지 않으면 모델명과 표시 상황을 공식 서비스에 전하세요.'],
  },
};

export const SKMAGIC_F9_ACTION_GUIDE: ErrorActionGuide = {
  id: 'skmagic-f9',
  brand: 'SK매직',
  category: '식기세척기',
  code: 'F9',
  href: HUB,
  anchor: 'action-skmagic-f9',
  version: '2026-10-27.1',
  evidence: { file: LEGACY_CARDS_EVIDENCE, hub: 'SKMagic', code: 'F9' },
  // 같은 공식 설명서 제품규격에 명시된 모델만 추가한다. 계열 접두사로 판정하지 않는다.
  models: DWA81_MODELS.map((model) => ({
    model,
    manualUrl: DWA81_MANUAL,
    manualLabel: 'SK매직 터치온 공용 설명서 — 자가 진단하기(F1~F9)·제품규격',
    checkedAt: '2026-10-27',
  })),
  serviceUrl: SERVICE,
  observationHint: '예: F9가 표시된 시점, 물이 보이는 위치, 전원·급수 차단 여부. 고장 부품은 코드만으로 판단하지 않습니다.',
  stopConditions: ['F9가 표시되면 바로 — 설명서에 사용자가 확인할 항목이 없고 전원·급수 차단 뒤 문의만 안내합니다'],
  action: {
    type: 'contact',
    title: '전원·급수를 차단하고 기능 점검을 요청하세요',
    steps: ['공용 설명서는 F1~F9를 기능 이상으로 묶고, 전원을 끄고 플러그를 분리한 뒤 중간밸브를 잠그고 서비스에 문의하도록 안내합니다. 젖은 전원 부근에 접근하지 말고 밸브 위치를 모르면 서비스에 문의하세요.', 'F9만으로 고장 부품을 정하거나 다른 모델의 센서·부품 교체 조치를 적용하지 마세요.'],
  },
};

const AU: ErrorActionGuide = {
  ...dw,
  id: 'skmagic-au',
  code: 'AU',
  anchor: 'action-skmagic-au',
  evidence: evidence('AU'),
  models: sameManual(DWA81_MODELS, {
    manualUrl: DWA81_MANUAL,
    manualLabel: 'SK매직 터치온 공용 설명서 — TOUCH ON·수동 문 열림 레버·제품규격 / FAQ210104033100',
    faqUrl: 'https://www.skintellixservice.com/web/easy/easyMain.do?tabIndex=0&subIndex=0&selectedPrdCd=04&selectedSubPrdCd=DWA&inputFaqId=FAQ210104033100',
    checkedAt: CHECKED,
  }),
  observationHint: '예: 재연결 후 TOUCH ON으로 열렸는지, 수동 레버로는 열렸는지. 문을 잡아당겨 열거나 잠금 장치를 분해하지 마세요.',
  stopConditions: [
    '수동 레버로 열려도 AU가 남고 자동 문열림이 되지 않을 때 — 서비스 접수(공식 FAQ)',
    '레버로도 문이 열리지 않을 때 — 문을 강제로 열지 말고 서비스에 문의(설명서)',
  ],
  action: {
    type: 'check',
    title: '전원을 다시 연결하고 수동 레버로 문을 여세요',
    steps: [
      '전원 플러그를 뽑고 10초쯤 뒤 다시 꽂은 다음, [TOUCH ON] 버튼으로 문이 열리는지 확인하세요.',
      '그래도 자동으로 열리지 않으면 제품 왼쪽 아래의 수동 문 열림 레버를 손가락으로 오른쪽에서 왼쪽으로 밀어 문을 여세요. 세척 중에는 뜨거운 물과 증기가 튈 수 있으니 문을 강제로 열지 마세요.',
      '수동으로 열려도 AU가 남고 자동 문열림이 되지 않으면 모델명과 표시를 공식 서비스에 접수하세요.',
    ],
  },
};

const E2: ErrorActionGuide = {
  ...dw,
  id: 'skmagic-e2',
  code: 'E2',
  anchor: 'action-skmagic-e2',
  evidence: evidence('E2'),
  models: sameManual(DWA81_MODELS, { manualUrl: DWA81_MANUAL, manualLabel: 'SK매직 터치온 공용 설명서 — 자가 진단하기(E2)·제품규격', checkedAt: CHECKED }),
  observationHint: '예: 같은 수전에서 물이 나오는지, 중간밸브 손잡이 방향, 급수호스가 눌린 곳. 호스 결빙 해동·전원 재연결은 이 모델 설명서가 아닌 일괄 FAQ의 안내입니다.',
  stopConditions: ['네 가지를 확인한 뒤에도 같은 상황이 계속될 때 — SK매직 고객상담센터(1600-1661)에 연락(설명서 자가 진단하기)'],
  action: {
    type: 'check',
    title: '급수 경로를 확인하세요',
    steps: [
      '중간밸브가 열려 있는지 확인하세요.',
      '단수가 아닌지, 수압이 너무 낮지 않은지 확인하세요.',
      '급수호스가 꺾이거나 눌려 있지 않은지 확인하세요.',
      '같은 표시가 계속 나오면 모델명과 표시를 공식 서비스에 전하세요.',
    ],
  },
};

const E3: ErrorActionGuide = {
  ...dw,
  id: 'skmagic-e3',
  code: 'E3',
  anchor: 'action-skmagic-e3',
  evidence: evidence('E3'),
  models: sameManual(DWA81_MODELS, { manualUrl: DWA81_MANUAL, manualLabel: 'SK매직 터치온 공용 설명서 — 자가 진단하기(E3)·제품규격', checkedAt: CHECKED }),
  observationHint: '예: 배수호스 끝이 연결된 싱크대 배수구 상태, 호스가 눌린 위치, 세척조 바닥에 물이 남아 있는지.',
  stopConditions: ['세 가지를 확인한 뒤에도 같은 상황이 계속될 때 — SK매직 고객상담센터(1600-1661)에 연락(설명서 자가 진단하기)'],
  action: {
    type: 'check',
    title: '배수 경로를 확인하세요',
    steps: [
      '배수 경로에 이상이 없는지 확인하세요.',
      '배수호스나 배수구가 막히지 않았는지 확인하세요.',
      '배수호스가 꺾이거나 눌려 있지 않은지 확인하세요.',
      '같은 표시가 계속 나오면 모델명과 표시를 공식 서비스에 전하세요.',
    ],
  },
};

const F1: ErrorActionGuide = {
  ...dw,
  id: 'skmagic-f1',
  code: 'F1',
  anchor: 'action-skmagic-f1',
  evidence: evidence('F1'),
  models: sameManual(DWA81_MODELS, { manualUrl: DWA81_MANUAL, manualLabel: 'SK매직 터치온 공용 설명서 — 자가 진단하기(F1~F9 기능 이상)·제품규격', checkedAt: CHECKED }),
  observationHint: '설명서는 필터를 청소하지 않았거나 급수 중간밸브가 잠겨 있으면 F1이 날 수 있다고 적습니다. 상담 때 마지막 필터 청소 시점과 표시 직전 중간밸브 상태를 함께 알리세요.',
  stopConditions: ['F1이 표시되면 바로 — 설명서는 F1~F9를 기능 이상으로 묶고 전원·플러그·중간밸브를 차단한 뒤 문의하도록 합니다'],
  action: { type: 'contact', title: '전원·급수를 차단하고 기능 점검을 요청하세요', steps: FUNCTION_FAULT_STEPS },
};

const F3: ErrorActionGuide = {
  ...dw,
  id: 'skmagic-f3',
  code: 'F3',
  anchor: 'action-skmagic-f3',
  evidence: evidence('F3'),
  models: sameManual(DWA81_MODELS, { manualUrl: DWA81_MANUAL, manualLabel: 'SK매직 터치온 공용 설명서 — 자가 진단하기(F1~F9 기능 이상)·제품규격', checkedAt: CHECKED }),
  observationHint: '이 모델 설명서는 F3에 따로 원인을 적지 않습니다. 내부에 거품이 보였는지, 최근 쓴 세제가 식기세척기 전용인지 상담 때 알리세요.',
  stopConditions: ['F3이 표시되면 바로 — 설명서는 F1~F9를 기능 이상으로 묶고 전원·플러그·중간밸브를 차단한 뒤 문의하도록 합니다'],
  action: { type: 'contact', title: '전원·급수를 차단하고 기능 점검을 요청하세요', steps: FUNCTION_FAULT_STEPS },
};

const F5: ErrorActionGuide = {
  ...dw,
  id: 'skmagic-f5',
  code: 'F5',
  anchor: 'action-skmagic-f5',
  evidence: evidence('F5'),
  models: sameManual(DWA81_MODELS, { manualUrl: DWA81_MANUAL, manualLabel: 'SK매직 터치온 공용 설명서 — 자가 진단하기(F5)·세제 투입하기·제품규격', checkedAt: CHECKED }),
  observationHint: '예: 최근 쓴 세제 이름과 형태(액체·가루·타블렛). 거품을 빼는 구체적 방법은 이 모델 설명서에 없고 일괄 FAQ에만 있습니다.',
  stopConditions: ['거품을 없앤 뒤에도 F5가 남을 때 — 전원을 끄고 플러그를 뺀 뒤 중간밸브를 잠그고 SK매직 고객상담센터(1600-1661)에 문의(설명서 기능 이상 조치)'],
  action: {
    type: 'check',
    title: '세제 종류를 확인하고 거품을 없앤 뒤 쓰세요',
    steps: [
      '최근 넣은 세제가 식기세척기 전용세제인지 확인하세요. 설명서는 전용세제가 아니면 거품 때문에 F5가 날 수 있다고 적습니다.',
      '내부 거품을 제거한 뒤 사용하세요. 이후에는 식기세척기 전용세제만 넣으세요.',
      '거품을 없앤 뒤에도 F5가 남으면 전원을 끄고 플러그를 뺀 뒤 중간밸브를 잠그고 SK매직 고객상담센터(1600-1661)에 문의하세요.',
    ],
  },
};

const TS_TO: ErrorActionGuide = {
  ...dw,
  id: 'skmagic-ts-to',
  code: 'ts / to',
  anchor: 'action-skmagic-ts-to',
  evidence: evidence('ts / to'),
  models: sameManual(DWA81_MODELS, { manualUrl: DWA81_MANUAL, manualLabel: 'SK매직 터치온 공용 설명서 — 자가 진단하기(tS, tO)·제품규격', checkedAt: CHECKED }),
  observationHint: '예: 표시가 나온 코스와 시점. 센서 배선을 확인하려고 하부 덮개를 열지 마세요.',
  stopConditions: ['tS·tO가 표시되면 바로 — 설명서에 사용자가 확인할 항목이 없고 전원·플러그·중간밸브 차단 뒤 문의만 안내합니다'],
  action: { type: 'contact', title: '전원·급수를 차단하고 온도 감지 점검을 요청하세요', steps: FUNCTION_FAULT_STEPS },
};

const F01_FAQ = 'https://www.skintellixservice.com/web/easy/easyMain.do?tabIndex=0&subIndex=0&selectedPrdCd=01&selectedSubPrdCd=WPU&inputFaqId=FAQ260907039642';

/** 얼음정수기 F:01 — FAQ 본문이 WPUIAC425·506·606 「모델에서만」 표시된다고 적는다. WPU-A710C에는 적용하지 않는다 */
const F01: ErrorActionGuide = {
  id: 'skmagic-f01',
  brand: 'SK매직',
  category: '정수기',
  code: 'F:01',
  href: HUB,
  anchor: 'action-skmagic-f01',
  version: ACTION_VERSION_2026_10_29,
  evidence: evidence('F01'),
  hazard: 'leak',
  models: [
    {
      model: 'WPU-IAC425',
      manualUrl: 'https://www.skintellixservice.com/common/fileDownloadS3.do?atchPath=cnts&atchNm=48ee8e11d9e540769f7582f57af395ea&atchOrgNm=(rev02)%20WPU-IAC425_User_KO_251224.pdf&atchExtNm=pdf',
      manualLabel: "SK매직 WPU-IAC425 설명서(rev02, 2025-12-24) 인쇄 45쪽 '제품 누수 발생' / FAQ260907039642 표",
      faqUrl: F01_FAQ,
      checkedAt: CHECKED,
    },
    {
      model: 'WPU-IAC506',
      manualUrl: 'https://www.skintellixservice.com/common/fileDownloadS3.do?atchPath=cnts&atchNm=482d19e4dd1f47d8ab208c181832da11&atchOrgNm=(rev00)%20WPU-IAC506_User_KO_260409.pdf&atchExtNm=pdf',
      manualLabel: "SK매직 WPU-IAC506 설명서(rev00, 2026-04-09) 인쇄 44쪽 '제품 누수 발생' / FAQ260907039642 표",
      faqUrl: F01_FAQ,
      checkedAt: CHECKED,
    },
    {
      model: 'WPU-IAC606',
      manualUrl: 'https://www.skintellixservice.com/common/fileDownloadS3.do?atchPath=cnts&atchNm=6518d2debf2f439982c981c0b26de5bb&atchOrgNm=(rev00)%20WPU-IAC606_User_KO_260520.pdf&atchExtNm=pdf',
      manualLabel: "SK매직 WPU-IAC606 설명서(rev00, 2026-05-20) 인쇄 42쪽 '제품 누수 발생' / FAQ260907039642 표",
      faqUrl: F01_FAQ,
      checkedAt: CHECKED,
    },
  ],
  serviceUrl: SERVICE,
  observationHint: '예: 물이 보이는 위치(본체 아래·뒤·연결 호스). 밸브 위치를 모르거나 손이 젖은 전원 부근에 닿아야 하면 직접 하지 말고 상담센터에 문의하세요. WPU-A710C 등 다른 SK매직 정수기에는 적용하지 않습니다.',
  stopConditions: [
    'F:01이 표시되면 바로 — 공식 FAQ는 누수 에러로 분류하고 밸브 잠금·전원 분리 뒤 문의만 안내합니다',
    '밸브 위치를 모르거나 젖은 전원 부근에 손이 닿아야 할 때 — 직접 하지 말고 상담센터에 문의',
  ],
  action: {
    type: 'contact',
    title: '급수 밸브를 잠그고 전원 코드를 뽑은 뒤 문의하세요',
    steps: [
      '급수 밸브를 잠그세요. 설명서 기준으로 중간 밸브 또는 제품 뒷면의 파란색 볼 밸브입니다.',
      '전원 코드를 분리한 뒤 SK매직 고객상담센터(1600-1661)에 문의하세요.',
    ],
  },
};

export const SKMAGIC_ACTIONS: HubActionSet = {
  brand: 'SKMagic',
  guides: [AU, SKMAGIC_DR_ACTION_GUIDE, E2, E3, F1, F3, F5, SKMAGIC_F9_ACTION_GUIDE, TS_TO, F01],
  noCard: [
    {
      category: '식기세척기',
      code: 'E4',
      // DWA-81 터치온은 설명서 자가 진단표에도, 2026-10-28 계열별로 나뉜 E4 FAQ 네 건의 연결 제품에도 없다.
      note: 'DWA-81 터치온(DWA-81R0D 등 8개 모델)은 설명서와 공식 FAQ 어디에서도 E4의 뜻과 사용자 조치를 확인하지 못했습니다. 다른 계열의 조치를 옮겨 쓰지 말고 모델명과 표시를 공식 서비스에 알려 확인하세요.',
      serviceUrl: SERVICE,
      checkedAt: CHECKED,
      evidence: evidence('E4'),
    },
  ],
};
