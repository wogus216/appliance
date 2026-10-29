// 귀뚜라미·경동나비엔 가스보일러 허브의 행동 카드.
// 근거: research/evidence/2026-10-29/error-actions/boilers.json(.md). 두 제조사 모두 코드 원문이 제품군 단위라
// 모델 번호 대신 제품군을 적용 범위로 쓴다(modelKind: 'product-line').
//
// 가스 기기 원칙(리드 결정 2026-10-29):
// - 단계에는 원문에 있는 확인·조치만 넣는다. 분해·부품 조작·리셋 반복은 원문에 있어도 넣지 않는다.
// - 점화 실패(귀뚜라미 01/02/03·E001~E003, 나비엔 Er03)는 원문이 허용한 가스밸브 확인·재가동(나비엔은
//   전원 재연결)을 넣어 check로 두고, 「같은 표시가 반복되면 재가동을 멈추고 서비스에 연락」을 멈춤 조건 맨 앞에 둔다.
// - 가스 냄새 대처 절차는 원문이 있는 귀뚜라미 97·E297 카드에만 쓴다. 나비엔 가이드에는 가스 냄새 대처 원문이 없다.

import type { ErrorActionGuide, ErrorActionModel } from '@/lib/error-action';
import { ACTION_VERSION_2026_10_29, BOILER_EVIDENCE, type HubActionSet } from './shared';

const CHECKED = '2026-10-29';
const KRB_SERVICE = 'https://krb.co.kr/as02';
const NAVIEN_SERVICE = 'https://www.navienhouse.com/support/as/request';

/** 귀뚜라미 자가진단 페이지와 다운로드 센터 설명서(file_srl). 설명서 PDF는 세션 값이 붙어 고정 링크가 없다 */
const KRB = {
  IN: {
    model: '거꾸로IN 가스보일러(제품군)',
    manualUrl: 'https://krb.co.kr/self/359',
    manualLabel: "귀뚜라미 자가진단 '거꾸로IN 가스보일러' 에러코드 표 · 보조: 다운로드 센터 '거꾸로IN' 사용설명서 PDF(file_srl 18948) 가스 누설 11쪽 · 에러표 25~26쪽",
    checkedAt: CHECKED,
  },
  IN_AD: {
    model: '거꾸로 IN AD 가스보일러(제품군)',
    manualUrl: 'https://krb.co.kr/self/192',
    manualLabel: "귀뚜라미 자가진단 '거꾸로 IN AD 가스보일러' 에러코드 표 · 보조: 다운로드 센터 '거꾸로 IN AD' 사용설명서 PDF(file_srl 14141) 가스 누설 11~12쪽 · 에러표 28~29쪽",
    checkedAt: CHECKED,
  },
  IIHI: {
    model: '거꾸로IIHi 가스보일러(제품군)',
    manualUrl: 'https://krb.co.kr/self/360',
    manualLabel: "귀뚜라미 자가진단 '거꾸로IIHi 가스보일러' 에러코드 표 · 보조: 다운로드 센터 '거꾸로IIHi' 사용설명서 PDF(file_srl 18951) 가스 누설 11쪽 · 에러표 29~30쪽",
    checkedAt: CHECKED,
  },
  FOUR: {
    model: '4번 타는 가스보일러(제품군)',
    manualUrl: 'https://krb.co.kr/self/352',
    manualLabel: "귀뚜라미 자가진단 '4번 타는 가스보일러' 에러코드 표 · 보조: 다운로드 센터 '4번 타는' 사용설명서 PDF(file_srl 14107) 가스 누설 11쪽 · 에러표 27~29쪽",
    checkedAt: CHECKED,
  },
  IOT: {
    model: '거꾸로 IoT 콘덴싱 가스보일러(제품군)',
    manualUrl: 'https://krb.co.kr/self/10762',
    manualLabel: "귀뚜라미 자가진단 '거꾸로 IoT 콘덴싱 가스보일러' 에러코드 표 · 보조: 다운로드 센터 '거꾸로 IoT 콘덴싱' 사용설명서 PDF(file_srl 14582) 가스 안전 5쪽 · 에러표 25~27쪽",
    checkedAt: CHECKED,
  },
  AST: {
    model: 'AST 콘덴싱 가스보일러(제품군)',
    manualUrl: 'https://krb.co.kr/self/10759',
    manualLabel: "귀뚜라미 자가진단 'AST 콘덴싱 가스보일러' 에러코드 표 · 보조: 다운로드 센터 'AST 콘덴싱' 사용설명서 PDF(file_srl 19621) 가스 안전 5쪽 · 에러표 25~26쪽",
    checkedAt: CHECKED,
  },
} satisfies Record<string, ErrorActionModel>;

const ALL_FIVE = [KRB.IN, KRB.IN_AD, KRB.IIHI, KRB.FOUR, KRB.IOT];
const FOUR_WITHOUT_IN_AD = [KRB.IN, KRB.IIHI, KRB.FOUR, KRB.IOT];

const kiturami = {
  brand: '귀뚜라미',
  category: '가스보일러',
  href: '/error-codes/Kiturami',
  version: ACTION_VERSION_2026_10_29,
  modelKind: 'product-line',
  serviceUrl: KRB_SERVICE,
} as const;

function krb(slug: string, code: string): Pick<ErrorActionGuide, 'id' | 'code' | 'anchor' | 'evidence'> {
  return { id: `kiturami-${slug}`, code, anchor: `action-kiturami-${slug}`, evidence: { file: BOILER_EVIDENCE, hub: 'Kiturami', code } };
}

const KRB_GAS_POINTER = '가스 냄새가 날 때 — 재가동하지 말고 97 항목의 가스 누설 조치를 따르세요(각 제품군 설명서의 가스 누설시 대처 요령)';
const AST_GAS_POINTER = '가스 냄새가 날 때 — 재가동하지 말고 E297 항목의 가스 누설 조치를 따르세요(AST 설명서 5쪽)';
const NO_RESTART_LOOP = '재가동 버튼을 반복해 누르지 말고 가동을 멈춘 채 연락하세요';

const KITURAMI_GUIDES: ErrorActionGuide[] = [
  {
    ...kiturami,
    ...krb('01-02-03', '01 / 02 / 03'),
    hazard: 'gas',
    models: ALL_FIVE,
    observationHint: '예: 가스레인지 등 다른 가스기기 사용 여부, 번호가 뜬 시각과 반복 횟수. 가스 냄새 여부를 먼저 확인하세요.',
    stopConditions: [
      '재가동 뒤에도 같은 번호가 다시 표시될 때 — 버튼을 거듭 누르지 말고 지역 대리점이나 A/S센터(1588-9000)에 연락(원문 「이상현상이 계속되면 지역 대리점 또는 A/S센터에 연락하여 조치를 받으세요」)',
      KRB_GAS_POINTER,
    ],
    action: {
      type: 'check',
      title: '가스밸브가 열렸는지 확인하고 재가동해 보세요',
      steps: [
        '공식 자가진단은 이 번호를 불꽃 감지 이상으로 점화가 안 되거나 점화 직후 안전차단된 상태로 설명하고, 보일러 고장보다 외부 조건 때문에 일시적으로 생길 수 있다고 적습니다. 거꾸로IN·거꾸로IIHi·4번 타는 페이지는 버너 이상과열 안전차단도 같은 번호로 적습니다.',
        '가스밸브가 잠겨 있는지 확인하세요.',
        '실내온도 조절기의 전원/재가동 버튼을 눌러 재가동하세요.',
        '이상 현상이 계속되면 지역 대리점이나 A/S센터(1588-9000)에 연락해 조치를 받으세요.',
      ],
    },
  },
  {
    ...kiturami,
    ...krb('04-05', '04 / 05'),
    models: FOUR_WITHOUT_IN_AD,
    observationHint: '예: 04인지 05인지, 강풍·지진 등 표시 직전 상황. 센서 위치를 찾으려고 외함을 열지 마세요.',
    stopConditions: ['계속 해제되지 않을 때 — 재가동을 시도하지 말고 서비스에 연락'],
    action: {
      type: 'contact',
      title: '가동을 중단하고 서비스에 연락하세요',
      steps: [
        '보일러 가동을 중단하세요. 공식 자가진단은 04를 수온 센서 이상, 05를 과열 센서 단선(제품군에 따라 지진감지 센서·풍압 스위치 작동 포함)으로 설명합니다.',
        '지역 대리점이나 A/S센터(1588-9000)에 연락해 조치를 받으세요.',
      ],
    },
  },
  {
    ...kiturami,
    ...krb('06', '06'),
    models: ALL_FIVE,
    observationHint: '예: 표시 전 보일러에서 평소와 다른 소리가 났는지, 바람이 강했는지. 연통·배기구를 분리하지 마세요.',
    stopConditions: [`06이 표시되면 바로 — ${NO_RESTART_LOOP}`],
    action: {
      type: 'contact',
      title: '가동을 멈추고 서비스에 연락하세요',
      steps: [
        '보일러 가동을 중단하세요(거꾸로 IoT 콘덴싱 원문).',
        '지역 대리점이나 A/S센터(1588-9000)에 연락해 조치를 받으세요. 원문에는 이 번호에 대한 다른 사용자 조치가 없습니다.',
      ],
    },
  },
  {
    ...kiturami,
    ...krb('07', '07'),
    models: ALL_FIVE,
    observationHint: '예: 표시가 난 날의 바람 세기, 강풍 때만 반복되는지 여부.',
    stopConditions: ['연통을 직접 분리하거나 연통 굴곡부의 응축수를 직접 빼지 마세요 — 시공업체나 A/S센터에 맡기세요'],
    action: {
      type: 'contact',
      title: '가동을 멈추고 서비스에 연락하세요',
      steps: [
        '보일러 가동을 중단하세요(거꾸로 IoT 콘덴싱 원문).',
        '지역 대리점이나 A/S센터(1588-9000)에 연락해 조치를 받으세요.',
        '바람이 심할 때 자주 발생하면, 원문 안내대로 시공업체에 연락해 연통 위치 수정을 요청하세요.',
      ],
    },
  },
  {
    ...kiturami,
    ...krb('08', '08'),
    models: ALL_FIVE,
    observationHint: '예: 최근 전기·인테리어 공사 여부, 조절기 화면이 꺼지거나 깜박이는지.',
    stopConditions: ['조절기 배선을 직접 분리·재연결하지 마세요 — 최근 공사 뒤 생겼다면 접수할 때 함께 알리세요'],
    action: {
      type: 'contact',
      title: '가동을 멈추고 서비스에 연락하세요',
      steps: [
        '거꾸로 IoT 콘덴싱 원문은 통신 이상 시 보일러 가동을 중단하라고 안내합니다.',
        '지역 대리점이나 A/S센터(1588-9000)에 연락하세요. 원문은 배선이 10m 이상이거나 고압선·전화선과 닿을 때 생길 수 있고 특수한 경우 재시공이 필요하다고 적습니다.',
      ],
    },
  },
  {
    ...kiturami,
    ...krb('95', '95'),
    models: ALL_FIVE,
    observationHint: '예: 직수 밸브 손잡이 방향, 단수 여부, 같은 번호가 하루에 몇 번 뜨는지. 제품군 이름(조절기·본체 표기)을 확인해 두세요.',
    stopConditions: [
      '밸브가 열려 있는데도 표시가 계속되고 물이 보충되지 않을 때 — A/S센터(1588-9000)에 연락',
      '보일러 주변에서 물이 새는 것이 보일 때 — A/S센터에 연락',
    ],
    action: {
      type: 'check',
      title: '직수 배관 밸브가 열려 있는지 확인하세요',
      steps: [
        '보일러 직수 배관 밸브가 닫혀 있지 않은지 확인하세요. 원문은 물이 부족하면 자동으로 급수되고 보충이 끝나면 정상 가동된다고 설명합니다.',
        '4번 타는 대기 차단식은 원문이 설명서 16쪽의 물보충 밸브로 직접 보충하도록 안내합니다. 그 절차를 확인할 수 없으면 서비스에 문의하세요.',
        '표시가 해제되지 않고 물도 보충되지 않으면 A/S센터(1588-9000)에 연락하세요. 거꾸로 IoT 콘덴싱 원문은 이때 보일러 가동을 중단하라고 합니다.',
      ],
    },
  },
  {
    ...kiturami,
    ...krb('98-water', '98'),
    hubScope: { productLines: ['거꾸로IN', '거꾸로IIHi'] },
    models: [KRB.IN, KRB.IIHI],
    observationHint: '예: 본체·조절기의 제품군 표기, 직수 밸브 손잡이 방향.',
    stopConditions: [
      '제품군이 거꾸로IN·거꾸로IIHi가 아닐 때 — 이 확인을 쓰지 마세요(거꾸로 IoT 콘덴싱의 98은 과열 표시)',
      '밸브가 열려 있는데도 물이 보충되지 않을 때 — 지역 대리점이나 A/S센터에 연락',
    ],
    action: {
      type: 'check',
      title: '직수 배관 밸브가 열려 있는지 확인하세요 (거꾸로IN·거꾸로IIHi)',
      steps: [
        '두 제품군 원문은 98을 95와 같은 물 부족 표시로 묶습니다. 직수 배관 밸브가 닫혀 있지 않은지 확인하세요.',
        '표시가 해제되지 않고 물도 보충되지 않으면 지역 대리점이나 A/S센터(1588-9000)에 연락하세요.',
      ],
    },
  },
  {
    ...kiturami,
    ...krb('98-iot', '98'),
    hazard: 'overheat',
    hubScope: { productLines: ['거꾸로 IoT 콘덴싱'] },
    models: [KRB.IOT],
    observationHint: '예: 표시 직전 배기구 주변 냄새나 소리. 배기구·연통을 만지지 마세요.',
    stopConditions: [
      `98이 지속될 때 — ${NO_RESTART_LOOP}`,
      '물 부족 조치(직수 밸브 확인)를 적용하지 마세요 — 이 제품군의 98은 과열 표시입니다',
    ],
    action: {
      type: 'contact',
      title: '가동을 중단하고 서비스를 요청하세요 (거꾸로 IoT 콘덴싱)',
      steps: [
        '이 제품군 원문은 98을 과열 안전장치 작동으로 분류하고, 설명서는 \'배기가스온도 이상\'으로 표기합니다.',
        '표시가 지속되면 보일러 가동을 중단하고 1588-9000에 연락해 서비스를 받으세요.',
      ],
    },
  },
  {
    ...kiturami,
    ...krb('10-in-ad', '10'),
    hubScope: { productLines: ['거꾸로 IN AD'] },
    models: [KRB.IN_AD],
    observationHint: "예: 조절기에 '10'만 뜨는지, 'E1 10'처럼 앞자리가 붙는지. 두 공식 원문이 이 번호의 뜻을 다르게 적습니다.",
    stopConditions: [`10이 표시되면 바로 — ${NO_RESTART_LOOP}`],
    action: {
      type: 'contact',
      title: '가동을 중단하고 서비스에 연락하세요 (거꾸로 IN AD)',
      steps: [
        '보일러 가동을 중단하세요.',
        '지역 대리점이나 A/S센터(1588-9000)에 연락해 조치를 받으세요. 조절기에 뜬 표시 그대로(10 또는 E1 10)를 알리세요.',
      ],
    },
  },
  {
    ...kiturami,
    ...krb('10-iot', '10'),
    hubScope: { productLines: ['거꾸로 IoT 콘덴싱'] },
    models: [KRB.IOT],
    observationHint: '예: 바람이 강한 날에만 뜨는지, 연통 주변 소리.',
    stopConditions: [`10이 표시되면 바로 — ${NO_RESTART_LOOP}`],
    action: {
      type: 'contact',
      title: '가동을 중단하고 서비스에 연락하세요 (거꾸로 IoT 콘덴싱)',
      steps: [
        '보일러 가동을 중단하세요. 원문은 07과 함께 송풍기 회전수 이상으로 묶습니다.',
        '에러코드가 지속되면 1588-9000에 연락해 서비스를 받으세요.',
      ],
    },
  },
  {
    ...kiturami,
    ...krb('96', '96'),
    hazard: 'overheat',
    models: ALL_FIVE,
    observationHint: '예: 표시가 저절로 사라졌는지, 난방 분배기 밸브를 최근 잠갔는지(원문 원인 아님 — 관찰만).',
    stopConditions: ['계속 해제되지 않을 때 — 재가동을 반복하지 말고 지역 대리점이나 A/S센터(1588-9000)에 연락'],
    action: {
      type: 'contact',
      title: '해제되지 않으면 서비스에 점검을 받으세요',
      steps: [
        '원문은 과열안전장치가 작동해 보일러가 멈춘 상태이며, 이때 순환펌프가 돌면서 난방수 온도를 낮춘다고 설명합니다.',
        '계속 해제되지 않으면 반드시 지역 대리점이나 A/S센터(1588-9000)에 연락하세요. 거꾸로 IoT 콘덴싱(96·99) 원문은 이때 보일러 가동을 중단하라고 합니다.',
      ],
    },
  },
  {
    ...kiturami,
    ...krb('97', '97'),
    hazard: 'gas',
    models: ALL_FIVE,
    observationHint: '예: 가스 냄새가 나는지, 다른 가스기기도 쓰고 있었는지. 냄새를 맡으려고 보일러 가까이 머무르지 마세요.',
    stopConditions: [
      '97이 표시되면 바로 — 표시가 사라졌는지 보려고 재가동·점화하지 말고 아래 순서대로 연락',
      '가스 냄새가 계속될 때 — 실내로 다시 들어가 기기를 조작하지 마세요',
    ],
    action: {
      type: 'contact',
      title: '가스 밸브를 잠그고 환기한 뒤 외부 전화로 연락하세요',
      steps: [
        '즉시 가스 사용을 중지하고 가스 중간밸브(가스 공급밸브)를 잠그세요.',
        '창문을 열어 실내를 충분히 환기하세요.',
        '불을 켜거나 플러그를 뽑지 말고, 환풍기 등 전기기구 스위치나 라이터·성냥·담배를 켜지 마세요.',
        '외부 전화로 가스회사 전문가 또는 지역 대리점·A/S센터(1588-9000)에 연락하세요.',
      ],
    },
  },
  {
    ...kiturami,
    ...krb('21', '21'),
    models: [KRB.IN_AD, KRB.IOT],
    observationHint: '예: 실제 지진이 있었는지, 보일러가 흔들리거나 떨어진 흔적. 가스 냄새 여부를 먼저 확인하세요.',
    stopConditions: [KRB_GAS_POINTER],
    action: {
      type: 'contact',
      title: '몸의 안전을 먼저 챙기고 재가동은 서비스에 문의하세요',
      steps: [
        '지진 발생 시 대처요령에 따라 안전에 유의하세요(거꾸로 IoT 콘덴싱 원문).',
        '원문에는 보일러를 다시 켜는 방법이 없습니다. 재가동 전 A/S센터(1588-9000)에 문의하세요.',
      ],
    },
  },
  {
    ...kiturami,
    ...krb('e001-e003', 'E001 / E002 / E003'),
    hazard: 'gas',
    models: [KRB.AST],
    observationHint: '예: 다른 가스기기가 정상인지, 표시 시각과 반복 횟수.',
    stopConditions: [
      '재가동 뒤에도 같은 코드가 다시 표시될 때 — 버튼을 거듭 누르지 말고 1588-9000에 연락(원문 「자가조치를 실시해도 에러코드 현상이 지속되면 ☎1588-9000으로 연락」)',
      AST_GAS_POINTER,
    ],
    action: {
      type: 'check',
      title: '가스밸브가 열렸는지 확인하고 재가동해 보세요',
      steps: [
        '원문은 점화에러·의사화염·실화로, 점화가 안 되거나 점화 직후 안전차단된 상태이며 보일러 고장보다 외부 조건 때문에 일시적으로 생길 수 있다고 설명합니다.',
        '가스밸브가 잠겨 있는지 확인하세요.',
        '실내온도 조절기의 전원/재가동 버튼을 눌러 재가동하세요.',
        '자가조치를 해도 에러코드가 계속되면 1588-9000에 연락해 서비스를 받으세요.',
      ],
    },
  },
  {
    ...kiturami,
    ...krb('e106', 'E106'),
    models: [KRB.AST],
    observationHint: '예: 표시 직전 팬 소리 유무, 강풍 여부.',
    stopConditions: [`E106이 표시되면 바로 — ${NO_RESTART_LOOP}(설명서 25쪽은 가동 중단만 안내)`],
    action: {
      type: 'contact',
      title: '가동을 중단하고 서비스에 연락하세요',
      steps: ['보일러 가동을 중단하세요.', '에러코드가 지속되면 1588-9000에 연락해 서비스를 받으세요.'],
    },
  },
  {
    ...kiturami,
    ...krb('e107-e110', 'E107 / E110'),
    models: [KRB.AST],
    observationHint: '예: 바람이 강한 날에만 뜨는지.',
    stopConditions: [`E107·E110이 표시되면 바로 — ${NO_RESTART_LOOP}`],
    action: {
      type: 'contact',
      title: '가동을 중단하고 서비스에 연락하세요',
      steps: [
        '보일러 가동을 중단하세요. 원문은 송풍기(FAN) 회전수가 기준을 넘거나 못 미치는 상태로 설명합니다.',
        '에러코드가 지속되면 1588-9000에 연락해 서비스를 받으세요.',
      ],
    },
  },
  {
    ...kiturami,
    ...krb('e204-e234', 'E204 / E214 / E224 / E234'),
    models: [KRB.AST],
    observationHint: '예: 화면에 뜬 코드 네 자리 그대로.',
    stopConditions: ['이 코드가 표시되면 바로 — 사용자 확인 항목이 없습니다. 센서를 찾으려고 외함을 열지 말고 연락하세요'],
    action: {
      type: 'contact',
      title: '가동을 중단하고 서비스에 연락하세요',
      steps: [
        "보일러 가동을 중단하세요. 설명서는 네 코드를 수온·출탕·축열·직수 센서 이상으로 적고 '보일러 내 센서부 이상'으로 설명합니다.",
        '에러코드가 지속되면 1588-9000에 연락해 서비스를 받으세요.',
      ],
    },
  },
  {
    ...kiturami,
    ...krb('e294-e495', 'E294 / E495'),
    models: [KRB.AST],
    observationHint: '예: 직수 밸브 손잡이 방향, 집의 단수 여부.',
    stopConditions: [
      '밸브가 열려 있는데도 표시가 계속되고 물이 보충되지 않을 때 — 1588-9000에 연락',
      'E491(단수 확인)로 바뀔 때 — E491 항목을 따르세요',
    ],
    action: {
      type: 'check',
      title: '직수 배관 밸브가 열려 있는지 확인하세요',
      steps: [
        '직수 배관 밸브가 닫혀 있지 않은지 확인하세요. 원문은 물이 부족하면 자동으로 보충되고 보충이 끝나면 정상 가동된다고 설명합니다.',
        '에러코드가 지속되고 물이 보충되지 않으면 1588-9000에 연락해 서비스를 받으세요.',
      ],
    },
  },
  {
    ...kiturami,
    ...krb('e297', 'E297'),
    hazard: 'gas',
    models: [KRB.AST],
    observationHint: '예: 가스 냄새가 나는지. 냄새를 맡으려고 보일러 가까이 머무르지 마세요.',
    stopConditions: ['E297이 표시되면 바로 — 표시가 사라졌는지 보려고 재가동·점화하지 말고 아래 순서대로 연락'],
    action: {
      type: 'contact',
      title: '가스 밸브를 잠그고 환기한 뒤 외부 전화로 연락하세요',
      steps: [
        '즉시 가스 사용을 중지하고 가스 중간밸브(가스 공급밸브)를 잠그세요.',
        '창문을 열어 실내를 충분히 환기하세요.',
        '불을 켜거나 플러그를 뽑지 말고, 환풍기 등 전기기구 스위치를 조작하거나 실내 전화를 쓰지 마세요.',
        '외부 전화로 가스회사 전문가 또는 1588-9000에 연락하세요.',
      ],
    },
  },
  {
    ...kiturami,
    ...krb('e396-e399', 'E396 / E399'),
    hazard: 'overheat',
    models: [KRB.AST],
    observationHint: '예: 표시가 저절로 사라졌는지.',
    stopConditions: ['계속 해제되지 않을 때 — 재가동을 반복하지 말고 1588-9000에 연락'],
    action: {
      type: 'contact',
      title: '해제되지 않으면 서비스에 연락하세요',
      steps: [
        '원문은 과열 안전장치가 작동해 보일러가 멈췄고, 이때 순환펌프가 돌며 난방수 온도를 낮춘다고 설명합니다.',
        '에러코드가 지속되면 1588-9000에 연락해 서비스를 받으세요.',
      ],
    },
  },
  {
    ...kiturami,
    ...krb('e491', 'E491'),
    models: [KRB.AST],
    observationHint: '예: 싱크대 찬물이 나오는지, 아파트 단수 공지 여부.',
    stopConditions: ['단수가 아니고 밸브도 열려 있는데 표시가 계속될 때 — 1588-9000에 연락'],
    action: {
      type: 'check',
      title: '집이 단수인지, 직수 밸브가 열려 있는지 확인하세요',
      steps: [
        '집으로 공급되는 수돗물이 단수됐는지 확인하세요.',
        '직수 밸브가 열려 있는지 확인하세요(설명서 26쪽).',
        '단수가 해제됐는데도 에러코드가 지속되면 1588-9000에 연락하세요.',
      ],
    },
  },
  {
    ...kiturami,
    ...krb('e508', 'E508'),
    models: [KRB.AST],
    observationHint: '예: 조절기 화면 상태, 최근 배선·인테리어 공사 여부.',
    stopConditions: ['조절기 배선을 직접 분리·재연결하지 마세요'],
    action: {
      type: 'contact',
      title: '가동을 중단하고 서비스에 연락하세요',
      steps: ['원문은 통신 이상 시 보일러 가동을 중단하라고 안내합니다.', '1588-9000에 연락해 서비스를 받으세요.'],
    },
  },
  {
    ...kiturami,
    ...krb('e621', 'E621'),
    models: [KRB.AST],
    observationHint: '예: 실제 지진 여부, 보일러·배관이 흔들린 흔적.',
    stopConditions: [AST_GAS_POINTER],
    action: {
      type: 'contact',
      title: '몸의 안전을 먼저 챙기고 재가동은 서비스에 문의하세요',
      steps: [
        '지진 발생 시 국민 행동 요령에 따라 침착하게 대처하고 안전에 유의하세요(설명서 26쪽).',
        '원문에는 보일러를 다시 켜는 방법이 없습니다. 재가동 전 1588-9000에 문의하세요.',
      ],
    },
  },
  {
    ...kiturami,
    ...krb('e622', 'E622'),
    models: [KRB.AST],
    observationHint: '예: 배출구 끝에서 물이 떨어지는지, 겨울철 배출 호스가 언 것처럼 보이는지.',
    stopConditions: [
      '응축수 트랩을 분해하거나 막힌 곳을 직접 뚫지 마세요',
      '배출구가 얼어 있거나 물이 전혀 나오지 않을 때 — 가동을 중단하고 1588-9000에 연락',
    ],
    action: {
      type: 'check',
      title: '응축수 배출구에서 물이 빠지는지 확인하세요',
      steps: [
        '응축수 배출구에서 응축수가 원활하게 배출되는지 확인하세요.',
        '자가 조치 후에도 에러코드가 지속되면 보일러 가동을 중단하고 1588-9000에 연락하세요.',
      ],
    },
  },
  {
    ...kiturami,
    ...krb('e743', 'E743'),
    models: [KRB.AST],
    observationHint: '예: 설치 직후인지, 배관 연결부 주변이 젖어 있는지.',
    stopConditions: ['배관에서 물이 새는 것이 보일 때 — 지역 대리점이나 A/S센터에 연락'],
    action: {
      type: 'check',
      title: '물 보충과 배관 누수를 확인하세요',
      steps: [
        '원문은 시운전 모드가 2시간 연속 진행될 때 표시된다고 설명합니다. 물 보충이 원활한지, 배관에 누수가 없는지 확인하세요.',
        '계속 해제되지 않으면 지역 대리점이나 A/S센터(1588-9000)에 연락하세요.',
      ],
    },
  },
];

/** 나비엔하우스 자가진단 가이드 한 건. 제품군·모델은 가이드가 적지 않아 「모델 미지정」이다 */
function navienModel(guide: number, title: string, lines = '가스보일러'): ErrorActionModel[] {
  return [{
    model: `경동나비엔 ${lines}(제품군, 모델 미지정)`,
    manualUrl: `https://www.navienhouse.com/support/guide/${guide}`,
    manualLabel: `나비엔하우스 자가진단 가이드 ${title}`,
    checkedAt: CHECKED,
  }];
}

const navien = {
  brand: '경동나비엔',
  category: '가스보일러',
  href: '/error-codes/Navien',
  version: ACTION_VERSION_2026_10_29,
  modelKind: 'product-line',
  serviceUrl: NAVIEN_SERVICE,
} as const;

function nav(slug: string, code: string): Pick<ErrorActionGuide, 'id' | 'code' | 'anchor' | 'evidence'> {
  return { id: `navien-${slug}`, code, anchor: `action-navien-${slug}`, evidence: { file: BOILER_EVIDENCE, hub: 'Navien', code } };
}

const FREEZE_STOP = '겨울철 배관 동결이 의심될 때 — 직접 녹이지 말고, 나비엔 동결 안내(guide/13259)대로 가까운 배관 전문 설비업체에 해빙을 요청하세요';
const DISTRIBUTOR_STEP = '난방 분배기 밸브가 열려 있는지 확인하세요. 분배기는 보일러 근처나 싱크대 밑에 있고(원룸은 없음), 밸브가 분배기 배관과 일자면 열림, 직각이면 잠김입니다. 잠겨 있으면 일자가 되게 열어 줍니다.';
const ENGINEER_STEP = '밸브가 열려 있는데도 해결되지 않거나 같은 현상이 반복되면 엔지니어 점검을 요청하세요(1588-1144).';
const WATER_STEPS = [
  '싱크대나 욕실에서 찬물과 온수가 모두 나오는지 확인하세요. 둘 다 안 나오면 단수인지 확인하고, 단수가 풀리면 물 보충이 자동으로 진행됩니다.',
  '겨울이 아닌데 찬물은 나오고 온수만 안 나오면, 보일러 하단 배관 4개 중 정면 기준 오른쪽 첫 번째(직수 배관)의 밸브가 열려 있는지 확인하세요. 손잡이가 배관과 일자면 열림, 직각이면 잠김입니다.',
  '보일러 본체나 난방배관에서 물이 새는지 확인하세요. 본체 밖 난방배관에서 새면 보일러 설치업체나 배관 전문업체, 본체에서 새면 엔지니어 점검 대상입니다.',
  '물이 많이 새면 보일러와 연결된 직수배관의 밸브를 잠가 추가 누수를 막으세요.',
];
const WATER_STOPS = [
  FREEZE_STOP,
  '보일러 본체에서 물이 샐 때 — 엔지니어 점검(1588-1144)',
  '누수 위치 근처의 콘센트·전원부가 젖어 있을 때 — 손대지 말고 접수',
];

const NAVIEN_GUIDES: ErrorActionGuide[] = [
  {
    ...navien,
    ...nav('er03', 'Er03 / E3 / E003'),
    hazard: 'gas',
    models: navienModel(306, '[가스보일러] Er03, E3, E003이 표시돼요.'),
    observationHint: '예: 가스레인지가 켜지는지, 이사 직후인지, LPG 사용 여부.',
    stopConditions: [
      '해결되지 않았거나 같은 현상이 다시 나타날 때 — 전원 재연결을 거듭하지 말고 엔지니어 점검을 요청하세요(원문 「해결이 되지 않았거나 동일 현상 발생시에는 엔지니어 점검이 필요합니다」, 1588-1144)',
      '가스계량기 밸브가 잠긴 채 봉인돼 있을 때 — 직접 열지 말고 가스공급업체를 통해 조치를 받으세요(원문)',
    ],
    action: {
      type: 'check',
      title: '가스 공급과 중간밸브를 확인하고 전원을 다시 연결해 보세요',
      steps: [
        '가스레인지를 쓰는 집이면 가스레인지를 켜서 불꽃이 정상적으로 켜지는지 확인하세요. 켜지지 않으면 가스 공급이 안 되는 경우이므로 가스계량기 밸브가 열려 있는지 확인하세요.',
        '이사를 새로 왔거나 가스레인지를 쓰지 않으면 가스계량기 밸브가 열려 있는지 확인하세요. LPG를 쓰면 가스가 충분히 남았는지 확인하세요.',
        '보일러와 연결된 가스 중간밸브(노란색·주황색 주름 배관에 있음)가 열려 있는지 확인하세요. 손잡이가 배관과 일자면 열림, 직각이면 잠김이며, 잠겨 있으면 배관과 일자가 되도록 열어 주세요.',
        '보일러 본체에 연결된 전기코드(220V)를 뽑았다 다시 연결해 정상 작동하는지 확인하세요. 원문은 반드시 안전에 주의하라고 적습니다.',
      ],
    },
  },
  {
    ...navien,
    ...nav('er02', 'Er02'),
    models: navienModel(583, '[가스보일러][기름보일러] Er02가 표시돼요.. (개방식)', '가스보일러·기름보일러'),
    observationHint: '예: 찬물·온수 각각 나오는지, 직수 밸브 손잡이 방향, 겨울인지 여부. 보일러가 개방식인지(밀폐식 Er02는 별도 가이드).',
    stopConditions: [
      FREEZE_STOP,
      '자동 물보충 제품이 아닐 때 — 단수가 풀려도 자동 보충을 기대하지 말고 문의하세요(원문에 수동 보충 방법 없음)',
    ],
    action: {
      type: 'check',
      title: '단수와 직수 밸브를 확인하세요 (개방식)',
      steps: [
        '싱크대나 욕실에서 찬물과 온수가 모두 나오는지 확인하세요. 둘 다 안 나오면 단수인지 확인하고, 단수가 풀리면 자동 물보충 제품은 물 보충이 자동으로 진행됩니다.',
        '겨울이 아닌데 찬물은 나오고 온수만 안 나오면, 보일러 하단 배관 4개 중 정면 기준 오른쪽 첫 번째(직수 배관)의 밸브가 열려 있는지 확인하세요. 손잡이가 배관과 일자면 열림, 직각이면 잠김이며, 잠겨 있으면 일자가 되게 열어 줍니다.',
        '해결되지 않거나 같은 현상이 반복되면 엔지니어 점검을 요청하세요(1588-1144).',
      ],
    },
  },
  {
    ...navien,
    ...nav('er51', 'Er51 / E351'),
    models: navienModel(610, '[가스보일러] Er51, E351이 표시돼요.'),
    observationHint: '예: 바닥이 젖은 위치(본체 아래인지 배관인지), 찬물·온수 각각 나오는지.',
    stopConditions: WATER_STOPS,
    action: { type: 'check', title: '단수·직수 밸브·누수를 순서대로 확인하세요', steps: WATER_STEPS },
  },
  {
    ...navien,
    ...nav('er28', 'Er28 / E228'),
    models: navienModel(596, '[가스보일러] Er28, E228이 표시돼요.'),
    observationHint: '예: 물 보충 소리가 자주 나는지, 바닥이 젖은 위치.',
    stopConditions: WATER_STOPS,
    action: { type: 'check', title: '단수·직수 밸브·누수를 순서대로 확인하세요', steps: WATER_STEPS },
  },
  {
    ...navien,
    ...nav('er50', 'Er50 / E250'),
    models: navienModel(604, "[가스보일러] Er50, E250이 표시돼요. · 동결 조치 guide/13259 '배관이 얼었어요'"),
    observationHint: '예: 겨울철 찬물은 나오는데 온수만 안 나오는지, 보일러실 창이 열려 있었는지.',
    stopConditions: [
      '퇴수코크를 직접 열거나 배관을 직접 녹이지 마세요',
      '배관이 언 상태일 때 — 보일러를 다시 가동하지 마세요',
    ],
    action: {
      type: 'contact',
      title: '전원을 끄고 해빙·점검을 요청하세요',
      steps: [
        '원문은 보일러 내부 난방수가 0도 이하로 감지된 상태로, 겨울철 난방배관 동결이나 부품 이상을 원인으로 듭니다.',
        '난방배관이 얼었을 수 있으면 보일러 전원을 꺼 두세요. 나비엔 동결 안내는 언 채로 가동하면 소음·과열로 고장이 날 수 있다고 적습니다.',
        '가까운 배관 전문 설비업체에 해빙을 요청하세요. 동결이 아니면 엔지니어 점검이 필요합니다(1588-1144).',
      ],
    },
  },
  {
    ...navien,
    ...nav('er49', 'Er49 / E049'),
    models: navienModel(602, '[가스보일러] Er49, E049가 표시돼요.'),
    observationHint: '예: 분배기 밸브 손잡이 방향, 겨울철 온수만 안 나오는지.',
    stopConditions: [`${FREEZE_STOP}. 원문은 이때 난방배관도 함께 얼었다고 보고, 동결 안내는 난방배관이 얼면 전원을 꺼 두라고 합니다`],
    action: {
      type: 'check',
      title: '난방 분배기 밸브가 열려 있는지 확인하세요',
      steps: [DISTRIBUTOR_STEP, '밸브가 열려 있고 동결도 아닌데 같은 표시가 나면 엔지니어 점검을 요청하세요(1588-1144).'],
    },
  },
  {
    ...navien,
    ...nav('er24', 'Er24 / E324'),
    models: navienModel(814, '[가스보일러] Er24, E324가 표시돼요.'),
    observationHint: '예: 분배기 밸브 손잡이 방향, 최근 방별 밸브를 잠갔는지.',
    stopConditions: ['밸브가 열려 있는데도 같은 표시가 반복될 때 — 엔지니어 점검(1588-1144)'],
    action: { type: 'check', title: '난방 분배기 밸브가 열려 있는지 확인하세요', steps: [DISTRIBUTOR_STEP, ENGINEER_STEP] },
  },
  {
    ...navien,
    ...nav('er25', 'Er25 / E325'),
    models: navienModel(813, '[가스보일러] Er25, E325가 표시돼요.'),
    observationHint: '예: 분배기 밸브 손잡이 방향, 최근 방별 밸브를 잠갔는지.',
    stopConditions: ['밸브가 열려 있는데도 같은 표시가 반복될 때 — 엔지니어 점검(1588-1144)'],
    action: { type: 'check', title: '난방 분배기 밸브가 열려 있는지 확인하세요', steps: [DISTRIBUTOR_STEP, ENGINEER_STEP] },
  },
  {
    ...navien,
    ...nav('er54', 'Er54 / E154'),
    models: navienModel(1010, '[가스보일러] Er54, E154이 표시돼요.'),
    observationHint: '예: 호스가 바닥 배수구까지 이어져 있는지, 바깥 노출 구간이 있는지.',
    stopConditions: [
      '호스가 얼었을 때 — 직접 분리해 녹이지 말고 접수하세요',
      '막힌 곳을 도구로 뚫지 마세요',
    ],
    action: {
      type: 'check',
      title: '응축수 호스가 꺾이거나 막히지 않았는지 확인하세요',
      steps: [
        '보일러에서 나오는 응축수 호스가 꺾이거나 막힌 부분이 없는지 확인하세요. 꺾여 있으면 풀어 줍니다.',
        '겨울철에는 원문 확인법대로 호스를 양손으로 잡고 비틀거나 꺾어 보세요. 얼음 부서지는 소리가 나면 동결입니다.',
        '꺾임·막힘·동결이 모두 없는데도 표시되면 엔지니어 점검을 요청하세요(1588-1144).',
      ],
    },
  },
  {
    ...navien,
    ...nav('er26', 'Er26 / E026'),
    hazard: 'gas',
    models: navienModel(815, '[가스보일러] Er26, E026이 표시돼요.'),
    observationHint: '예: 화면에 뜬 표기 그대로(Er26 또는 E026).',
    stopConditions: [`Er26이 표시되면 바로 — ${NO_RESTART_LOOP}`],
    action: {
      type: 'contact',
      title: '엔지니어 점검을 요청하세요',
      steps: [
        '원문은 보일러 버너에 이상이 감지된 상태로, 원인을 부품 이상으로 적습니다.',
        '엔지니어 점검이 필요합니다. 나비엔 홈페이지 A/S 접수나 고객상담센터(1588-1144)로 요청하세요.',
      ],
    },
  },
  {
    ...navien,
    ...nav('er29', 'Er29 / E255'),
    models: navienModel(594, '[가스보일러] Er29, E255가 표시돼요.'),
    observationHint: '예: 분배기 밸브 손잡이 방향.',
    stopConditions: ['밸브가 열려 있는데도 같은 표시가 반복될 때 — 엔지니어 점검(1588-1144)'],
    action: { type: 'check', title: '난방 분배기 밸브가 열려 있는지 확인하세요', steps: [DISTRIBUTOR_STEP, ENGINEER_STEP] },
  },
  {
    ...navien,
    ...nav('er407', 'Er407 / E407 / Er07 / Er08'),
    models: navienModel(295, '[가스보일러] Er07, Er08, E407이 표시돼요. · guide/247 [Er407][온수온도센서이상]'),
    observationHint: '예: 화면에 뜬 표기 그대로(07·08·E407).',
    stopConditions: [`이 표시가 뜨면 바로 — ${NO_RESTART_LOOP}`],
    action: {
      type: 'contact',
      title: '엔지니어 점검을 요청하세요',
      steps: [
        '원문은 온수(물) 온도를 감지하는 센서 이상으로, 원인을 부품 이상으로 적습니다.',
        '엔지니어 점검이 필요합니다. 나비엔 홈페이지 서비스 접수나 고객상담센터(1588-1144)로 요청하세요.',
      ],
    },
  },
  {
    ...navien,
    ...nav('e594-e615', 'E594 / E615'),
    models: navienModel(981, '[가스보일러] E594, E615가 표시돼요.'),
    observationHint: '예: 재연결 뒤 표시가 다시 뜨기까지 걸린 시간.',
    stopConditions: [
      '같은 표시가 다시 뜰 때 — 전원 재연결을 반복하지 말고 엔지니어 점검을 요청하세요(1588-1144)',
      '콘센트 주변이 젖어 있을 때 — 전원을 만지지 마세요(원문 아님, 살림랩 안전 기준)',
    ],
    action: {
      type: 'check',
      title: '전원 코드를 한 번 뽑았다 다시 꽂아 보세요',
      steps: [
        '보일러 본체에 연결된 전기코드(220V)를 뽑았다 다시 연결해 정상 작동하는지 확인하세요. 원문은 반드시 안전에 주의하라고 적습니다.',
        '해결되지 않거나 같은 현상이 다시 나면 엔지니어 점검을 요청하세요(1588-1144).',
      ],
    },
  },
];

export const KITURAMI_ACTIONS: HubActionSet = { brand: 'Kiturami', guides: KITURAMI_GUIDES, noCard: [] };
export const NAVIEN_ACTIONS: HubActionSet = { brand: 'Navien', guides: NAVIEN_GUIDES, noCard: [] };
