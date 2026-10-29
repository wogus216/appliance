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

/** 2026-10-29 원문 대조로 만든 카드의 안내 버전. 복사·저장한 상담 기록에 함께 남는다 */
export const ACTION_VERSION_2026_10_29 = '2026-10-29.1';

/** 공식 자료에서 사용자가 해볼 조치를 확인하지 못한 코드. 허브에는 짧은 안내만 싣는다 */
export interface NoCardCode {
  category: string;
  code: string;
  /** 화면 안내. 비우면 NO_CARD_DEFAULT_NOTE. 내부 판정 사유를 그대로 옮기지 않는다 */
  note?: string;
  serviceUrl: string;
  checkedAt: string;
  evidence: { file: string; hub: string; code: string };
}

export const NO_CARD_DEFAULT_NOTE =
  '이 모델의 공식 자료에서 사용자가 해볼 조치를 확인하지 못했습니다. 모델명과 표시를 공식 서비스에 알려 확인하세요.';

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
