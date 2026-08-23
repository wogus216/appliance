// 편집 신뢰 정보(editorial provenance) 공용 타입.
//
// 브랜드 프로필(BrandProfile)과 성분 사전(Material)이 이미 `sources: SourceRef[]` +
// `updated: 'YYYY-MM'` 조합을 쓰고 있다. 제품은 가격 확인일처럼 월 단위로는 쓸모없는
// 항목이 있어 날짜를 일 단위로 올리고, "누가 검수했는가"를 필드로 분리했다.

import type { SourceRef } from './source';

/** 'YYYY-MM-DD'. 월 단위(brand/material의 `updated`)와 섞이지 않도록 타입으로 구분해 둔다 */
export type IsoDate = string;

export const ISO_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

export function isIsoDate(value: unknown): value is IsoDate {
  if (typeof value !== 'string' || !ISO_DATE_PATTERN.test(value)) return false;
  const d = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(d.getTime()) && d.toISOString().slice(0, 10) === value;
}

/**
 * 콘텐츠 한 덩어리(제품 상세 등)의 편집 이력과 근거.
 *
 * 이 레코드가 존재한다는 것은 "사람이 확인한 근거가 실제로 있다"는 뜻이다.
 * 근거가 없는 콘텐츠에는 빈 레코드를 만들지 않고 아예 만들지 않는다 —
 * 빈 껍데기를 채우는 순간 색인 품질 게이트(content-quality.ts)가 무의미해진다.
 */
export interface EditorialMeta {
  /** 근거 출처. 비어 있으면 안 된다 */
  sources: SourceRef[];
  /** 이 콘텐츠가 사이트에 처음 실린 날. 확인할 수 없으면 비운다 */
  publishedAt?: IsoDate;
  /** 마지막으로 내용을 검수·갱신한 날 */
  updatedAt: IsoDate;
  /** 작성·검수 주체 (예: '살림랩 편집팀') */
  reviewedBy: string;
  /**
   * 표기 가격을 마지막으로 대조한 날.
   * 확인하지 않았으면 비운다 — 비어 있으면 화면에 가격 확인일을 아예 표시하지 않는다.
   */
  priceCheckedAt?: IsoDate;
}
