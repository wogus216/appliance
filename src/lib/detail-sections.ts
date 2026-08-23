import type { Appliance } from '@/types/appliance';
import { getSectionSlots } from '@/lib/category-config';
import { hasValidPurchaseLinks } from '@/lib/purchase-links';

export interface TocItem {
  id: string;
  label: string;
}

/**
 * 상세 페이지 TOC 항목 생성.
 *
 * 순서는 카테고리와 무관하게 고정이며, page.tsx의 DOM 순서와 일치해야 한다.
 * ProductTOC가 IntersectionObserver로 활성 항목을 추적하기 때문에 어긋나면
 * 스크롤 하이라이트가 튄다.
 */
export function buildProductToc(appliance: Appliance): TocItem[] {
  const slots = getSectionSlots(appliance.category);

  return [
    { id: 'verdict', label: '결론' },
    { id: 'fit', label: slots.fit.tocLabel },
    { id: 'value', label: slots.value.tocLabel },
    { id: 'risk', label: slots.risk.tocLabel },
    { id: 'performance', label: '상세 스펙' },
    // 'sources' 블록은 편집 메타데이터가 없어도 고지 문구를 렌더하므로 항상 존재한다.
    { id: 'sources', label: '근거' },
    ...(hasValidPurchaseLinks(appliance.purchaseLinks) ? [{ id: 'purchase', label: '구매처' }] : []),
    ...(appliance.errorCodes?.length ? [{ id: 'errorcodes', label: '에러코드' }] : []),
  ];
}
