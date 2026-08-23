// 구매 링크의 유효성 판정.
//
// 카탈로그에는 제휴 링크 발급 전 자리표시자로 `url: '#'`을 넣어 둔 구매처가 145건 있다.
// 그대로 렌더하면 "구매처가 있는 것처럼 보이지만 아무 데도 가지 않는 링크"가 되어
// 미완성 콘텐츠 신호가 된다. 렌더 직전에 여기서 한 번 걸러 낸다.

import type { PurchaseLink } from '@/types/appliance';

/**
 * 실제로 외부로 나가는 링크인가.
 *
 * 자리표시자('#', 빈 문자열), 상대경로, javascript: 같은 비 HTTP 스킴은 전부 무효다.
 * 호스트가 없는 URL('https://')도 무효로 본다.
 */
export function isValidPurchaseUrl(url: unknown): boolean {
  if (typeof url !== 'string') return false;
  const trimmed = url.trim();
  if (!trimmed || trimmed === '#') return false;

  let parsed: URL;
  try {
    parsed = new URL(trimmed);
  } catch {
    return false; // 상대경로·'#anchor' 등 절대 URL이 아닌 것
  }
  if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') return false;
  return parsed.hostname.length > 0 && parsed.hostname.includes('.');
}

/** 렌더해도 되는 구매처만 남긴다. 하나도 없으면 빈 배열 — 호출부는 섹션 전체를 숨긴다 */
export function getValidPurchaseLinks(
  links: readonly PurchaseLink[] | undefined,
): PurchaseLink[] {
  if (!links?.length) return [];
  return links.filter((l) => isValidPurchaseUrl(l.url));
}

/** 유효한 구매처가 하나라도 있는가 */
export function hasValidPurchaseLinks(links: readonly PurchaseLink[] | undefined): boolean {
  return getValidPurchaseLinks(links).length > 0;
}

/**
 * 쿠팡 링크인가. 파트너스 고지 문구와 rel="sponsored"를 붙일지 결정한다.
 * 유효하지 않은 URL은 항상 false — 자리표시자 때문에 고지 문구가 뜨면 안 된다.
 */
export function isCoupangLink(url: unknown): boolean {
  if (!isValidPurchaseUrl(url)) return false;
  const host = new URL((url as string).trim()).hostname.toLowerCase();
  return host === 'coupang.com' || host.endsWith('.coupang.com');
}

/** 링크 목록에 실제 쿠팡 제휴 링크가 있는가 */
export function hasCoupangPartnersLink(links: readonly PurchaseLink[] | undefined): boolean {
  return getValidPurchaseLinks(links).some((l) => isCoupangLink(l.url));
}
