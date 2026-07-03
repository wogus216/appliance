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

export function errorCodeHref(brand: string, code: string): string {
  return `/error-codes/${brand}/${slugifyCode(code)}`;
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
  const occurrences: ErrorCodeOccurrence[] = [];
  for (const a of allAppliances) {
    if (a.brand !== brand || !a.errorCodes) continue;
    for (const ec of a.errorCodes) {
      if (slugifyCode(ec.code) === codeSlug) {
        occurrences.push({ ...ec, slug: a.slug, productName: a.name, category: a.category });
      }
    }
  }
  if (occurrences.length === 0) return null;
  return {
    brand,
    brandLabel: BRAND_LABELS[brand] || brand,
    code: occurrences[0].code,
    codeSlug,
    occurrences,
  };
}
