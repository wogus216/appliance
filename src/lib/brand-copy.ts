import { BRAND_LABELS } from '@/lib/constants';
import { isNonApplianceBrand } from '@/lib/brand-stats';
import { allAppliances } from '@/lib/data/appliances';
import { getBrandErrorCodes } from '@/lib/error-codes';
import { getBrandProfile } from '@/lib/data/brands';

export interface BrandCopy {
  /** 한글 표기 (예: '삼성'). 레이블이 없으면 브랜드 키 그대로 */
  label: string;
  /** 이 브랜드를 부르는 총칭 */
  noun: '가전' | '제품';
  title: string;
  description: string;
}

/** 마지막 글자에 받침이 있으면 '을', 없으면 '를' */
function objectParticle(word: string): '을' | '를' {
  const last = word.trim().slice(-1);
  const code = last.charCodeAt(0) - 0xac00;
  if (code < 0 || code > 11171) return '를';
  return code % 28 === 0 ? '를' : '을';
}

/**
 * 메타 설명 — 브랜드마다 실제로 이 사이트에 있는 것만 말한다(2026-10-08).
 *
 * 예전 문구는 "라인업을 한눈에. 카테고리별 스펙·가격·에러코드를 비교하세요."로 모든 브랜드에 같았다.
 * 제품 1개·가격 미확인·코드 0개인 브랜드(예: 코웨이 — 가격 미확인, 코드 0개)에도 '가격·에러코드
 * 비교'를 약속해 검색 결과에서 페이지 내용과 어긋났다. 그래서 공개 제품 수와 품목, 가격을 확인한
 * 제품 수, 오류 허브의 코드 수, A/S 번호 유무를 카탈로그에서 세어 문장을 만든다.
 * '가전'이라는 말은 쓰지 않는다 — 비가전 브랜드 검사(brand-copy.test.ts)와 같은 이유다.
 */
function buildDescription(brand: string, label: string): string {
  const items = allAppliances.filter((a) => a.brand === brand);
  const categories = [...new Set(items.map((a) => a.category))];
  const priced = items.filter((a) => a.price != null).length;
  const codeCount = getBrandErrorCodes(brand).reduce((n, g) => n + g.entries.length, 0);
  const hasService = !!getBrandProfile(brand)?.serviceCenter;

  if (items.length === 0) {
    return `${label}의 라인업 이름과 공식 자료를 정리했습니다.`;
  }

  const parts = [
    // '공식 자료로 확인한'이라고 쓰지 않는다 — 이어폰 일부 사양은 다나와 등록값을 출처로 밝혀 둔 것이다
    '출처를 확인한 사양',
    ...(priced > 0 ? [priced === items.length ? '조사 가격' : `${priced}개 모델의 조사 가격`] : []),
    ...(codeCount > 0 ? [`에러코드 ${codeCount}개의 뜻과 조치`] : []),
  ];
  const last = parts[parts.length - 1];
  const head = `${label} 공개 모델 ${items.length}개(${categories.join('·')})의 ${parts.join(', ')}${objectParticle(last)} 정리했습니다.`;
  return hasService ? `${head} 라인업 이름과 고객센터 번호도 함께 적었습니다.` : head;
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
    description: buildDescription(brand, label),
  };
}
