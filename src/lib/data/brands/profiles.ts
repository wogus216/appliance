import type { BrandProfile } from '@/types/brand';

/**
 * 브랜드 프로필.
 *
 * 집필 순서가 정해져 있다 — LG·QCY를 먼저 써서 가장 큰 브랜드와 가장 작은 브랜드
 * 양극단에서 구조가 성립하는지 확인하고, 그 뒤 나머지를 3~4개씩 라운드로 검수받는다.
 * 한 번에 17개를 쏟아내지 않는다. 그것이 구글이 말하는 대량 생성 패턴이고,
 * 이 사이트가 애드센스에서 거절당한 이유와 같은 부류다.
 */
export const brandProfiles: BrandProfile[] = [];
