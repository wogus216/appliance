// 브랜드 허브의 행동 카드 등록부.
//
// 카드 데이터는 actions/ 아래 브랜드 파일에 있고, 여기서는 허브 키로 모아 코드 항목에 연결한다.
// 새 브랜드를 넣을 때는 actions/shared.ts 의 HubActionSet 형식으로 파일을 만들고 HUB_ACTION_SETS에 더한다.
// 허브의 모든 코드 항목은 카드가 있거나 「카드 없음」으로 등록돼 있어야 한다(error-action-coverage.test.ts).

import type { ErrorActionGuide } from '@/lib/error-action';
import type { BrandErrorCodeEntry } from '@/lib/error-codes';
import { NO_CARD_DEFAULT_NOTE, type HubActionSet, type NoCardCode } from './actions/shared';
import { SKMAGIC_ACTIONS, SKMAGIC_DR_ACTION_GUIDE, SKMAGIC_F9_ACTION_GUIDE } from './actions/skmagic';
import { CUCKOO_ACTIONS, CUCKOO_E4_ACTION_GUIDE } from './actions/cuckoo';
import { ROBOROCK_ACTIONS, ROBOROCK_S7_ACTION_GUIDE } from './actions/roborock';
import { HAIER_ACTIONS, HAIER_F25_ACTION_GUIDE, LG_ACTIONS, SAMSUNG_ACTIONS } from './actions/samsung-lg-haier';
import { KITURAMI_ACTIONS, NAVIEN_ACTIONS } from './actions/boilers';

export {
  CUCKOO_E4_ACTION_GUIDE,
  HAIER_F25_ACTION_GUIDE,
  SKMAGIC_DR_ACTION_GUIDE,
  SKMAGIC_F9_ACTION_GUIDE,
  ROBOROCK_S7_ACTION_GUIDE,
  NO_CARD_DEFAULT_NOTE,
};
export type { HubActionSet, NoCardCode };

export const HUB_ACTION_SETS: HubActionSet[] = [
  SKMAGIC_ACTIONS,
  CUCKOO_ACTIONS,
  ROBOROCK_ACTIONS,
  SAMSUNG_ACTIONS,
  LG_ACTIONS,
  HAIER_ACTIONS,
  KITURAMI_ACTIONS,
  NAVIEN_ACTIONS,
];

function setFor(brand: string): HubActionSet | undefined {
  return HUB_ACTION_SETS.find((set) => set.brand === brand);
}

export function getHubActionGuides(brand: string): ErrorActionGuide[] {
  return setFor(brand)?.guides ?? [];
}

export function getHubNoCardCodes(brand: string): NoCardCode[] {
  return setFor(brand)?.noCard ?? [];
}

type EntryKey = Pick<BrandErrorCodeEntry, 'code' | 'products' | 'productLines'>;

function inScope(guide: ErrorActionGuide, entry: EntryKey): boolean {
  const scope = guide.hubScope;
  if (!scope) return true;
  return (
    entry.products.some((p) => scope.products?.includes(p.slug)) ||
    (entry.productLines ?? []).some((line) => scope.productLines?.includes(line))
  );
}

/** 허브의 코드 항목 하나에 붙는 행동 카드. 같은 번호가 제품군별로 나뉜 항목은 hubScope로 가른다 */
export function getEntryActionGuides(brand: string, category: string, entry: EntryKey): ErrorActionGuide[] {
  return getHubActionGuides(brand).filter(
    (guide) => guide.category === category && guide.code === entry.code && inScope(guide, entry),
  );
}

/** 카드 없이 「공식 서비스 확인」 안내만 붙는 코드 */
export function getEntryNoCard(brand: string, category: string, entry: Pick<BrandErrorCodeEntry, 'code'>): NoCardCode | undefined {
  return getHubNoCardCodes(brand).find((item) => item.category === category && item.code === entry.code);
}

/** 허브 정적 블록의 앵커. 허브용 카드는 자기 앵커, 상세 안내 카드는 action-{id} */
export function hubActionAnchor(guide: ErrorActionGuide): string {
  return guide.anchor ?? `action-${guide.id}`;
}
