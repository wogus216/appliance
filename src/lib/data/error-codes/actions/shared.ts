// 브랜드 허브의 코드별 행동 카드 — 공통 형식.
//
// 2026-10-29 확대: 허브 코드 78개 전부를 원문과 다시 대조해, 카드(card) 또는 「카드 없음」(no-card)으로
// 나눴다. 근거는 research/evidence/2026-10-29/error-actions/ 의 JSON·MD다. 카드의 모델 범위·manualUrl·
// manualLabel·checkedAt·serviceUrl은 JSON 값을 그대로 옮기고, 문장은 사이트 문체로 다듬되 원문에 없는
// 조치를 더하지 않는다. 브랜드를 늘릴 때는 이 형식의 파일을 하나 더 만들고 action-guides.ts에 등록한다.

import type { ErrorActionGuide, ErrorActionModel } from '@/lib/error-action';

export const EVIDENCE_DIR = 'research/evidence/2026-10-29/error-actions';
export const SK_CUCKOO_ROBOROCK_EVIDENCE = `${EVIDENCE_DIR}/skmagic-cuckoo-roborock.json`;
export const SAMSUNG_LG_HAIER_EVIDENCE = `${EVIDENCE_DIR}/samsung-lg-haier.json`;
export const BOILER_EVIDENCE = `${EVIDENCE_DIR}/boilers.json`;
/**
 * 2026-10-27 이전에 만든 카드 4개(SK매직 dr·F9, 쿠쿠 E4, 로보락 S7 Error 2). 세 JSON이 「다시 조사하지 않음」으로
 * 뺐던 카드라, 2026-10-29에 1차 원문을 다시 열어 같은 형식으로 남겼다(legacy-cards.md에 쪽·인용·해시).
 */
export const LEGACY_CARDS_EVIDENCE = `${EVIDENCE_DIR}/legacy-cards.json`;

/** 2026-10-29 원문 대조로 만든 카드의 안내 버전. 복사·저장한 상담 기록에 함께 남는다 */
export const ACTION_VERSION_2026_10_29 = '2026-10-29.1';

/**
 * 카드 없이 짧은 안내만 붙는 코드. 두 경우가 있다.
 * - 공식 자료에서 사용자가 해볼 조치를 확인하지 못한 코드(기본 안내).
 * - 모델명을 적은 원문은 없고 모델을 적지 않은 제조사 공용 안내에만 조치가 있는 코드(sharedGuide). 해결 문단이
 *   그 공용 안내의 조치를 싣고, 안내는 그 범위를 밝힌다(2026-10-29 해결 문단 ↔ 안내 상충 정리).
 */
export interface NoCardCode {
  category: string;
  code: string;
  /** 화면 안내. 비우면 NO_CARD_DEFAULT_NOTE. 내부 판정 사유를 그대로 옮기지 않는다 */
  note?: string;
  /** 해결 문단의 조치가 나온 공용 안내(모델 미표기). 있으면 허브 요약에서 「조치 없음」과 따로 묶는다 */
  sharedGuide?: string;
  serviceUrl: string;
  checkedAt: string;
  evidence: { file: string; hub: string; code: string };
}

export const NO_CARD_DEFAULT_NOTE =
  '이 모델의 공식 자료에서 사용자가 해볼 조치를 확인하지 못했습니다. 모델명과 표시를 공식 서비스에 알려 확인하세요.';

/**
 * 공용 안내에만 조치가 있는 코드의 안내 문장. 해결 문단과 같은 출처 이름(sharedGuide)을 쓴다.
 * - action: 해결 문단에 실린 조치 이름(「차단기 초기화」「해동·초기화」). 뒤에 「방법은」이 붙는다
 * - next: 그 뒤 할 일. 원문별로 다르다(삼성은 반복 시 점검, LG는 모델 설명서의 전원 유지)
 */
export function sharedGuideNote(brandLabel: string, action: string, sharedGuide: string, next: string): string {
  return `모델명과 이 코드를 함께 적은 ${brandLabel} 원문은 찾지 못했습니다. 위 해결 문단의 ${action} 방법은 모델을 적지 않은 ${sharedGuide}에 실린 것이라 내 모델에 그대로 맞는지는 확인되지 않았습니다. ${next}`;
}

export interface HubActionSet {
  /** allAppliances·standalone.ts 와 같은 브랜드 키(허브 URL /error-codes/{brand}) */
  brand: string;
  guides: ErrorActionGuide[];
  noCard: NoCardCode[];
}

/** 같은 설명서를 공유하는 모델 목록을 한 번에 적는다(JSON의 모델별 값이 같을 때만 쓴다) */
export function sameManual(models: string[], meta: Omit<ErrorActionModel, 'model'>): ErrorActionModel[] {
  return models.map((model) => ({ model, ...meta }));
}
