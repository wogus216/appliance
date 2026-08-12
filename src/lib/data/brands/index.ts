import type { BrandProfile } from '@/types/brand';
import { getAllBrands } from '@/lib/data/appliances';
import { brandProfiles } from './profiles';

export const allBrandProfiles: BrandProfile[] = brandProfiles;

const BY_BRAND = new Map(allBrandProfiles.map((p) => [p.brand, p]));

export function getBrandProfile(brand: string): BrandProfile | undefined {
  return BY_BRAND.get(brand);
}

/**
 * 아직 프로필이 없는 브랜드를 카탈로그 등장 순으로 반환한다.
 * 집필 진행률 테스트가 이것을 실패 메시지에 그대로 실어 남은 할 일 목록으로 쓴다.
 */
export function getBrandsMissingProfile(): string[] {
  return getAllBrands().filter((b) => !BY_BRAND.has(b));
}
