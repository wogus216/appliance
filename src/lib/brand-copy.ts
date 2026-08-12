import { BRAND_LABELS } from '@/lib/constants';
import { isNonApplianceBrand } from '@/lib/brand-stats';

export interface BrandCopy {
  /** 한글 표기 (예: '삼성'). 레이블이 없으면 브랜드 키 그대로 */
  label: string;
  /** 이 브랜드를 부르는 총칭 */
  noun: '가전' | '제품';
  title: string;
  description: string;
}

/**
 * 브랜드 페이지 메타데이터 문구.
 *
 * 애플·소니·앤커·QCY에 "가전"은 틀린 말이다. 브랜드명을 나열하지 않고
 * 카탈로그에서 판정하므로 나중에 비가전 브랜드가 늘어도 저절로 맞는다.
 */
export function getBrandCopy(brand: string): BrandCopy {
  const label = BRAND_LABELS[brand] || brand;
  const noun = isNonApplianceBrand(brand) ? '제품' : '가전';

  return {
    label,
    noun,
    title: `${label} ${noun} 전체 — 스펙·가격 비교`,
    description: `${label} ${noun} 라인업을 한눈에. 카테고리별 스펙·가격·에러코드를 비교하세요.`,
  };
}
