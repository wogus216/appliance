// 기저귀 소재·규제항목 사전 타입

import type { SourceRef } from './source';

/** 기저귀 층 구조에서의 역할 */
export type MaterialRole = '표면' | '확산' | '흡수' | '방수' | '결합' | '첨가';

/**
 * 항목 종류.
 * '소재'는 기저귀를 이루는 물질, '규제항목'은 식약처 「위생용품의 기준 및 규격」이 일회용
 * 기저귀에서 시험하는 대상이다. (2018-04-19부터 기저귀는 어린이제품 KC 안전확인 대상이 아니다.)
 * 형광증백제처럼 양쪽에 걸치는 것이 있어 모델을 나누지 않고 이 필드로 구분한다.
 */
export type MaterialKind = '소재' | '규제항목';

/** 성분 사전의 출처. 사이트 공용 SourceRef와 같은 모양이라 별칭으로만 남긴다 */
export type MaterialSource = SourceRef;

export interface Material {
  /** URL slug — /materials/[slug] */
  slug: string;
  /** 표기명 (예: '고흡수성수지(SAP)') */
  name: string;
  /** 동의어·영문명. 검색과 본문 표기 흔들림을 흡수한다 */
  aliases: string[];
  kind: MaterialKind;
  /**
   * 이 물질이 속하거나 유래하는 층.
   * kind가 '소재'면 필수. '규제항목'은 유래 층이 특정될 때만 채운다
   * (형광증백제는 '첨가', 아크릴산 단량체는 '흡수', pH는 층이 없어 비움).
   */
  role?: MaterialRole;
  /** 이게 무엇인지 2~3문장 */
  what: string;
  /** 왜 기저귀에 쓰는지 / 왜 규제하는지 2~3문장 */
  whyUsed: string;
  /** 흔히 제기되는 우려와, 규제·시험 기준이 그에 대해 정하고 있는 것 */
  concern?: string;
  /** kind가 '규제항목'일 때의 시험 기준 (예: '위생용품의 기준 및 규격 제5. 3. 형광증백제') */
  testStandard?: string;
  /** 상호 참조 slug. 반드시 양방향으로 건다 */
  related: string[];
  /** 근거 출처. 비어 있으면 안 된다 */
  sources: MaterialSource[];
  /** 마지막 검수 시점 'YYYY-MM' */
  updated: string;
}
