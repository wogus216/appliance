import { VERIFIED_PRICES } from '@/lib/data/appliances/verified-specs';

/**
 * 가격을 확인한 상품이 정확한 모델이 아니라 색상·구성만 다른 상품일 때, 그 상품 표기.
 *
 * 2026-10-09 4차: WF24A9500KE의 2,250,240원은 색상만 다른 KF(새틴 그린) 상품 가격이고, RF85C90D1AP의
 * 2,898,000원은 RF85C90D1 코타 화이트 구성 가격이다. 출처 제목에는 그 조건이 있었지만 가격 카드·
 * '함께 비교할 제품'·비교표의 차액에는 없어서 정확한 모델 가격처럼 읽혔다(WD25 카드의 "1,509,750원 낮음").
 *
 * 값은 출처표(VERIFIED_PRICES)의 선택 필드 `variant`에서 읽는다(표는 조정자 몫). 없으면 undefined.
 */
export function getPriceVariant(slug: string): string | undefined {
  const v = VERIFIED_PRICES[slug]?.variant?.trim();
  return v ? v : undefined;
}
