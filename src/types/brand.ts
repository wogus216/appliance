// 브랜드 프로필 타입 — /brand/[brand]가 렌더하는 손글씨 콘텐츠

import type { ApplianceCategory } from './appliance';
import type { SourceRef } from './source';

/**
 * 제조사 공식 라인업 이름 하나 (예: '비스포크', '휘센').
 * 통칭이나 커뮤니티 용어는 쓰지 않는다 — 공식 페이지가 출처가 되어야 한다.
 */
export interface BrandLine {
  name: string;
  /** 어떤 라인인지 1~2문장 */
  what: string;
  /** 이 라인이 걸치는 카테고리. 카탈로그에 없는 라인도 설명할 수 있어 선택 항목이다 */
  categories?: ApplianceCategory[];
}

export interface BrandProfile {
  /** BRAND_LABELS의 키 (예: 'Samsung') */
  brand: string;
  /** 사실 위주 소개 2~3문장 */
  intro: string;
  /** 라인업 네이밍 체계. 이 페이지의 핵심 고유 콘텐츠라 최소 1개는 있어야 한다 */
  lines: BrandLine[];
  /**
   * A/S 대표번호. 생략할 수 있지만 쓰기로 했다면 sourceUrl이 반드시 따라온다.
   * 틀린 번호는 실제 피해가 되므로 출처를 필드에 직접 묶어 검사 가능하게 만든다.
   * sourceUrl은 sources의 어느 항목과 url이 일치해야 한다.
   */
  serviceCenter?: { phone: string; sourceUrl: string; note?: string };
  /** 에러코드 체계의 특징 (예: 'E 뒤에 숫자 두 자리를 붙인다') */
  errorCodePattern?: string;
  /** 살림랩 총평 2~3문장. 카탈로그 안의 제품에 근거해 검증 가능한 형태로 쓴다 */
  editorNote: string;
  /** 근거 출처. 비어 있으면 안 된다 */
  sources: SourceRef[];
  /** 마지막 검수 시점 'YYYY-MM' */
  updated: string;
}
