import { allAppliances } from '@/lib/data/appliances';
import { CATEGORY_SLUGS } from '@/lib/category-config';
import type { ApplianceCategory, ErrorCode } from '@/types/appliance';

/** 에러코드를 URL-safe 슬러그로 변환 ('CH 05'→'ch-05', 'rd / Er FF'→'rd-er-ff', '88 88'→'88-88') */
export function slugifyCode(code: string): string {
  return code
    .toLowerCase()
    .replace(/[^a-z0-9가-힣]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * 브랜드 허브 안에서 코드 블록의 DOM id.
 *
 * 같은 코드가 카테고리마다 다른 의미다(삼성 E1은 에어컨에서 온도센서, 제습기에서 수위센서).
 * 그래서 코드만으로는 id가 유일하지 않고 카테고리를 함께 넣는다.
 */
export function errorCodeAnchorId(category: ApplianceCategory, code: string): string {
  return `${CATEGORY_SLUGS[category]}-${slugifyCode(code)}`;
}

/** 브랜드 허브의 해당 코드 위치로 가는 경로 */
export function errorCodeAnchor(
  brand: string,
  category: ApplianceCategory,
  code: string,
): string {
  return `/error-codes/${brand}#${errorCodeAnchorId(category, code)}`;
}

/** 에러코드를 가진 브랜드 목록 (카탈로그 등장 순) */
export function getErrorCodeBrands(): string[] {
  const seen = new Set<string>();
  for (const a of allAppliances) {
    if (a.errorCodes?.length) seen.add(a.brand);
  }
  return [...seen];
}

export type BrandErrorCodeEntry = {
  code: string;
  codeSlug: string;
  /** 브랜드 허브 안에서 이 블록의 DOM id. 같은 (카테고리,코드)가 둘 이상이면 -2, -3이 붙는다 */
  anchorId: string;
  severity: ErrorCode['severity'];
  description: string;
  cause: string;
  solution: string;
  products: { slug: string; name: string }[];
};

export type BrandCategoryCodes = {
  category: ApplianceCategory;
  entries: BrandErrorCodeEntry[];
};

/**
 * 브랜드의 전 에러코드를 카테고리별로 묶는다.
 *
 * 묶는 키에 본문(description·cause·solution)까지 넣는 이유: 같은 브랜드·카테고리·코드가
 * 제품 여럿에 걸릴 때 보통은 본문이 같아 제품만 합치면 되지만, 다를 수도 있다.
 * 첫 번째만 남기면 정보가 조용히 사라지므로, 본문이 다르면 항목을 따로 남긴다.
 */
export function getBrandErrorCodes(brand: string): BrandCategoryCodes[] {
  type Bucket = Omit<BrandErrorCodeEntry, 'anchorId'>;
  const byCategory = new Map<ApplianceCategory, Map<string, Bucket>>();

  for (const a of allAppliances) {
    if (a.brand !== brand || !a.errorCodes) continue;
    for (const ec of a.errorCodes) {
      const codeSlug = slugifyCode(ec.code);
      if (!codeSlug) continue;

      // JSON.stringify로 키를 만든다. 구분자로 이으면 서로 다른 조합이 같은 문자열이 될 수 있는데,
      // 배열 직렬화는 그런 충돌이 구조적으로 없다.
      const key = JSON.stringify([codeSlug, ec.description, ec.cause, ec.solution]);

      let buckets = byCategory.get(a.category);
      if (!buckets) {
        buckets = new Map();
        byCategory.set(a.category, buckets);
      }

      const existing = buckets.get(key);
      if (existing) {
        existing.products.push({ slug: a.slug, name: a.name });
      } else {
        buckets.set(key, {
          code: ec.code,
          codeSlug,
          severity: ec.severity,
          description: ec.description,
          cause: ec.cause,
          solution: ec.solution,
          products: [{ slug: a.slug, name: a.name }],
        });
      }
    }
  }

  // 정적 생성이라 순서가 흔들리면 빌드마다 HTML이 달라진다. 카테고리·코드 모두 고정한다.
  const categoryOrder = Object.keys(CATEGORY_SLUGS) as ApplianceCategory[];

  return categoryOrder
    .filter((c) => byCategory.has(c))
    .map((category) => {
      const sorted = [...byCategory.get(category)!.values()].sort((x, y) =>
        x.code.localeCompare(y.code, 'ko'),
      );

      // 본문이 달라 같은 (카테고리,코드)가 둘 이상이면 id가 겹친다. 첫 항목만 깨끗한 id를 갖는다.
      const used = new Map<string, number>();
      return {
        category,
        entries: sorted.map((e) => {
          const base = errorCodeAnchorId(category, e.code);
          const n = (used.get(base) ?? 0) + 1;
          used.set(base, n);
          return { ...e, anchorId: n === 1 ? base : `${base}-${n}` };
        }),
      };
    });
}
