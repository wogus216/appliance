import type { ErrorActionGuide } from '@/lib/error-action';
import { getErrorCodeDetailPage } from './detail-pages';

/** 기존 기사와 저장된 공식 원문 대조 기록에서 적용 범위를 확인한 모델만 연결한다. */
export const CUCKOO_E4_ACTION_GUIDE: ErrorActionGuide = {
  id: 'cuckoo-e4',
  brand: '쿠쿠',
  category: '식기세척기',
  code: 'E4',
  href: getErrorCodeDetailPage('Cuckoo', '식기세척기', 'E4')!.href,
  version: '2026-10-27.1',
  models: ['CDW-A0611TW', 'CDW-A0611TS'].map((model) => ({
    model,
    manualUrl: 'https://www.cuckoo.co.kr/upload_cuckoo/_bo_rep/manual/200424%3Dz0383-0082a0%20rev.1_cdw-a0611t.pdf',
    manualLabel: '쿠쿠 CDW-A0611TW·CDW-A0611TS 공용 설명서 인쇄 12·25·32쪽',
    checkedAt: '2026-10-07',
  })),
  serviceUrl: 'https://www.cuckoo.co.kr/customer',
  observationHint: '예: 바닥에 보이는 물의 위치, 최근 설치·이동·호스 작업 여부. 확인하려고 젖은 전원 부근에 접근하지 마세요.',
  action: {
    type: 'contact',
    title: '전원·급수를 차단하고 서비스를 요청하세요',
    steps: [
      '이 모델 설명서의 E4 조치는 전원을 끄고 플러그를 분리한 뒤 중간밸브를 잠그는 것입니다. 젖은 전원 부근에 접근하지 마세요. 중간밸브 위치를 모르면 직접 작업하지 말고 서비스에 문의하세요.',
      '물이 안 보이거나 표시가 사라져도 다시 세척하지 말고 공식 서비스에 점검을 요청하세요.',
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
  action: { type: 'cold-weather' },
};

export const SKMAGIC_DR_ACTION_GUIDE: ErrorActionGuide = {
  id: 'skmagic-dr',
  brand: 'SK매직',
  category: '식기세척기',
  code: 'dr',
  href: '/error-codes/SKMagic',
  anchor: 'action-skmagic-dr',
  version: '2026-10-27.1',
  models: ['DWA19R0P', 'DWA19C0P', 'DWA19C1P'].map((model) => ({
    model,
    manualUrl: 'https://m.manual.skmagic.com/2019/model/DWA/DWA19R0P00BL/Manual.htm',
    manualLabel: 'SK매직 DWA19R0P·C0P·C1P 공용 설명서 — TOUCH ON·제품규격',
    checkedAt: '2026-10-27',
  })),
  serviceUrl: 'https://www.skintellixservice.com/web/main/main.do',
  observationHint: '예: 문을 닫은 뒤에도 dr이 남는지, 문이 정상적으로 닫히는지. 문을 강제로 열거나 잠금 장치를 분해하지 마세요.',
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
  href: '/error-codes/SKMagic',
  anchor: 'action-skmagic-f9',
  version: '2026-10-27.1',
  // 같은 공식 설명서 제품규격에 명시된 모델만 추가한다. 계열 접두사로 판정하지 않는다.
  models: ['DWA-81R0D', 'DWA-81R1D', 'DWA-81U0D', 'DWA-81U1D', 'DWA-81R5B', 'DWA-81R6B', 'DWA-81U5B', 'DWA-81U6B'].map((model) => ({
    model,
    manualUrl: 'https://m.manual.skmagic.com/2019/model/DWA/DWA81R0D00SL/Manual.htm',
    manualLabel: 'SK매직 터치온 공용 설명서 — 자가 진단하기(F1~F9)·제품규격',
    checkedAt: '2026-10-27',
  })),
  serviceUrl: 'https://www.skintellixservice.com/web/main/main.do',
  observationHint: '예: F9가 표시된 시점, 물이 보이는 위치, 전원·급수 차단 여부. 고장 부품은 코드만으로 판단하지 않습니다.',
  action: {
    type: 'contact',
    title: '전원·급수를 차단하고 기능 점검을 요청하세요',
    steps: ['공용 설명서는 F1~F9를 기능 이상으로 묶고, 전원을 끄고 플러그를 분리한 뒤 중간밸브를 잠그고 서비스에 문의하도록 안내합니다. 젖은 전원 부근에 접근하지 말고 밸브 위치를 모르면 서비스에 문의하세요.', 'F9만으로 고장 부품을 정하거나 다른 모델의 센서·부품 교체 조치를 적용하지 마세요.'],
  },
};

export const ROBOROCK_S7_ACTION_GUIDE: ErrorActionGuide = {
  id: 'roborock-s7-error2',
  brand: '로보락',
  category: '로봇청소기',
  code: 'Error 2',
  href: '/error-codes/Roborock',
  anchor: 'action-roborock-s7-error2',
  version: '2026-10-27.1',
  models: [{
    model: 'S7',
    manualUrl: 'https://support.roborock.com/hc/en-us/article_attachments/900008254623',
    manualLabel: 'Roborock S7 공식 영문 설명서 — 인쇄 38~39쪽 Errors',
    checkedAt: '2026-10-27',
  }],
  serviceUrl: 'https://kr.roborock.com/pages/roborock-service-warranty',
  observationHint: '예: 범퍼가 눌린 채 돌아오지 않는지, 범퍼를 닦은 뒤 같은 오류가 반복되는지. S7 MaxV 등 다른 모델에는 이 조치를 적용하지 않습니다.',
  action: {
    type: 'check',
    title: '범퍼의 걸림을 확인하세요',
    steps: ['S7 설명서는 Error 2를 범퍼 걸림으로 안내합니다. 범퍼를 닦고 가볍게 두드려 움직임이 돌아오는지 확인한 뒤 다른 위치로 옮겨 청소를 다시 시작하세요.', '같은 오류가 반복되면 본체를 분해하지 말고 공식 서비스에 범퍼 상태와 해본 조치를 전하세요.'],
  },
};

const HUB_ACTION_GUIDES: Record<string, ErrorActionGuide[]> = {
  SKMagic: [SKMAGIC_DR_ACTION_GUIDE, SKMAGIC_F9_ACTION_GUIDE],
  Roborock: [ROBOROCK_S7_ACTION_GUIDE],
};

export function getHubActionGuides(brand: string): ErrorActionGuide[] {
  return HUB_ACTION_GUIDES[brand] ?? [];
}
