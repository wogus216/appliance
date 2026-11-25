import { BRAND_LABELS } from '@/lib/constants';
import { getBrandProfile } from '@/lib/data/brands';
import { getBrandErrorCodes, getErrorCodeBrands, getErrorCodeEntryHref } from '@/lib/error-codes';
import type { LookupBrand } from '@/lib/error-code-lookup';
import { getEntryActionGuides } from './action-guides';

export function getErrorCodeLookupBrands(): LookupBrand[] {
  return getErrorCodeBrands().map((brand) => ({
    brand,
    label: BRAND_LABELS[brand] ?? brand,
    serviceUrl: getBrandProfile(brand)?.serviceCenter?.sourceUrl,
    entries: getBrandErrorCodes(brand).flatMap(({ category, entries }) => entries.map((entry) => ({
      category,
      code: entry.code,
      href: getErrorCodeEntryHref(brand, category, entry),
      models: getEntryActionGuides(brand, category, entry)
        .filter((guide) => guide.modelKind !== 'product-line')
        .flatMap((guide) => guide.models.map(({ model, manualUrl, manualLabel, checkedAt }) => ({
          model,
          manualUrl,
          manualLabel,
          checkedAt,
          href: guide.anchor ? `${guide.href}#${guide.anchor}` : guide.href,
        }))),
    }))),
  }));
}
