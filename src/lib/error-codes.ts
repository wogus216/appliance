import { allAppliances } from '@/lib/data/appliances';
import { BRAND_LABELS } from '@/lib/constants';
import type { ApplianceCategory, ErrorCode } from '@/types/appliance';

/** 에러코드를 URL-safe 슬러그로 변환 ('CH 05'→'ch-05', 'rd / Er FF'→'rd-er-ff', '88 88'→'88-88') */
export function slugifyCode(code: string): string {
  return code
    .toLowerCase()
    .replace(/[^a-z0-9가-힣]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * 에러코드 상세 경로. 슬러그에 한글이 남을 수 있어 반드시 인코딩해서 내보낸다.
 * 날것의 한글 경로를 쓰면 서버가 인코딩된 주소로 307을 돌려주므로,
 * sitemap과 내부 링크가 매번 한 번씩 튕긴다.
 */
export function errorCodeHref(brand: string, code: string): string {
  return `/error-codes/${brand}/${encodeURIComponent(slugifyCode(code))}`;
}

/**
 * 슬러그를 비교 가능한 형태로 되돌린다.
 *
 * 슬러그에 한글이 남을 수 있는데(예: '냉각-이상'), 정적 export에서 Next는
 * params를 퍼센트 인코딩된 채로 넘긴다. 디코딩하지 않으면 slugifyCode 결과와
 * 영원히 어긋나 한글 코드 페이지가 전부 404로 빌드된다.
 * 잘못된 인코딩 시퀀스는 decodeURIComponent가 던지므로 원본을 그대로 돌려준다.
 */
function decodeSlug(slug: string): string {
  try {
    return decodeURIComponent(slug);
  } catch {
    return slug;
  }
}

export type ErrorCodeOccurrence = ErrorCode & {
  slug: string;
  productName: string;
  category: ApplianceCategory;
};

export type ErrorCodeDetail = {
  brand: string;
  brandLabel: string;
  code: string;
  codeSlug: string;
  occurrences: ErrorCodeOccurrence[];
};

/** 모든 (브랜드, 코드슬러그) 조합 — generateStaticParams용 */
export function getAllErrorCodeParams(): { brand: string; code: string }[] {
  const seen = new Set<string>();
  const params: { brand: string; code: string }[] = [];
  for (const a of allAppliances) {
    if (!a.errorCodes) continue;
    for (const ec of a.errorCodes) {
      const codeSlug = slugifyCode(ec.code);
      if (!codeSlug) continue;
      const key = `${a.brand}__${codeSlug}`;
      if (seen.has(key)) continue;
      seen.add(key);
      params.push({ brand: a.brand, code: codeSlug });
    }
  }
  return params;
}

/** 특정 브랜드의 특정 코드가 등장하는 모든 제품/카테고리 종합 */
export function getErrorCodeDetail(brand: string, codeSlug: string): ErrorCodeDetail | null {
  const decodedSlug = decodeSlug(codeSlug);
  const occurrences: ErrorCodeOccurrence[] = [];
  for (const a of allAppliances) {
    if (a.brand !== brand || !a.errorCodes) continue;
    for (const ec of a.errorCodes) {
      if (slugifyCode(ec.code) === decodedSlug) {
        occurrences.push({ ...ec, slug: a.slug, productName: a.name, category: a.category });
      }
    }
  }
  if (occurrences.length === 0) return null;
  return {
    brand,
    brandLabel: BRAND_LABELS[brand] || brand,
    code: occurrences[0].code,
    // sitemap·canonical과 어긋나지 않도록 디코딩된 슬러그를 돌려준다.
    codeSlug: decodedSlug,
    occurrences,
  };
}
