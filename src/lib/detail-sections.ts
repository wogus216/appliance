import type { Appliance } from '@/types/appliance';
import { getSectionSlots, isTraditionalAppliance, liftExtraSpecs } from '@/lib/category-config';
import { hasValidPurchaseLinks } from '@/lib/purchase-links';

/**
 * 슬롯 ⑤(위험)에 보여 줄 내용이 있는가.
 *
 * 생활가전은 소음(dB) 비교가 이 슬롯의 본체인데, 제조사가 소음을 공개하지 않아
 * 값이 없는 제품이 많다. 그때는 extraSpecs 표로 내려가고, 그마저 비면 섹션이
 * 통째로 사라진다. TOC가 빈 앵커를 가리키지 않도록 RiskSection과 이 함수가
 * 같은 판단을 쓴다.
 */
export function hasRiskSection(appliance: Appliance): boolean {
  if (isTraditionalAppliance(appliance.category) && appliance.specs.noise != null) return true;
  const slots = getSectionSlots(appliance.category);
  return liftExtraSpecs(appliance.techSpecs.extraSpecs, slots.risk.liftLabels).length > 0;
}

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
    ...(hasRiskSection(appliance) ? [{ id: 'risk', label: slots.risk.tocLabel }] : []),
    { id: 'performance', label: '상세 스펙' },
    // 'sources' 블록은 편집 메타데이터가 없어도 고지 문구를 렌더하므로 항상 존재한다.
    { id: 'sources', label: '근거' },
    ...(hasValidPurchaseLinks(appliance.purchaseLinks) ? [{ id: 'purchase', label: '구매처' }] : []),
    ...(appliance.errorCodes?.length ? [{ id: 'errorcodes', label: '에러코드' }] : []),
  ];
}
