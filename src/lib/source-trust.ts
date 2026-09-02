// 출처 한 건이 "공식 또는 신뢰 가능한 근거"로 셀 수 있는지 판정한다.
//
// 왜 허용목록인가: 차단목록으로 하면 새 도메인이 전부 통과한다. 색인 품질 게이트가
// 이 판정에 걸려 있으므로, 모르는 도메인은 통과시키지 않는 쪽이 안전하다.
//
// 목록에 넣은 도메인은 전부 이 저장소에 이미 들어 있는(=집필 시점에 확인된) URL의
// 호스트에서 뽑았다. 확인하지 않은 도메인을 미리 넣어 두지 않는다.

import type { SourceRef } from '@/types/source';

export type SourceTrust = 'official' | 'trusted' | 'community';

/**
 * 제조사 공식·공공기관. 1차 자료로 취급한다.
 * 출처: src/lib/data/brands/profiles.ts, src/lib/data/materials/*.ts 에 등재된 URL의 호스트.
 */
const OFFICIAL_DOMAINS = [
  // 제조사 공식
  'apple.com',
  'samsung.com',
  'samsungsvc.co.kr', // 삼성전자서비스 — 점검 코드·자가 조치 안내의 공식 발행처 (2026-09-02 등재)
  'lge.co.kr',
  'sony.co.kr',
  'coway.com',
  'cuckoo.co.kr',
  'dyson.co.kr',
  'haier.co.kr',
  'mi.com',
  'shinil.co.kr',
  'skmagic.com',
  'tcl.com',
  'winix.com',
  'carrier.co.kr',
  'roborock.com',
  'ankerkorea.co.kr',
  'ylshop.co.kr', // QCY 국내 공식 수입사 스토어
  // 공공·표준
  'law.go.kr',
  'consumer.go.kr',
  'kisti.re.kr',
] as const;

/**
 * 편집권이 있는 매체·대형 스펙/가격 데이터베이스. 2차 자료로 취급한다.
 *
 * 커뮤니티(reddit)·개인 블로그는 여기 넣지 않는다. 본문의 정성적 근거로는 쓸 수 있어도
 * "확인 가능한 출처 2건"의 계산에는 넣지 않는다는 것이 이 사이트의 편집 원칙이다.
 * 포털 뉴스 퍼머링크(v.daum.net 등)도 발행처가 아니라 배포처라 제외한다.
 */
const TRUSTED_DOMAINS = [
  'danawa.com',
  'techradar.com',
  'soundguys.com',
  '9to5mac.com',
  'phonearena.com',
  'asiae.co.kr',
] as const;

/** URL에서 등록 가능 도메인(마지막 2~3레이블)을 뽑는다. 'prod.danawa.com' → 'danawa.com' */
export function registrableDomain(url: string): string | null {
  let host: string;
  try {
    host = new URL(url).hostname.toLowerCase();
  } catch {
    return null;
  }
  const parts = host.split('.').filter(Boolean);
  if (parts.length < 2) return null;

  // 'co.kr', 're.kr', 'go.kr', 'com.au' 같은 2단계 접미사는 한 레이블 더 가져와야 한다.
  const SECOND_LEVEL = new Set(['co', 'go', 're', 'or', 'ne', 'ac', 'com', 'net', 'org']);
  const tail2 = parts.slice(-2).join('.');
  if (parts.length >= 3 && SECOND_LEVEL.has(parts[parts.length - 2]) && parts[parts.length - 1].length === 2) {
    return parts.slice(-3).join('.');
  }
  return tail2;
}

function matches(domain: string, list: readonly string[]): boolean {
  return list.some((d) => domain === d || domain.endsWith(`.${d}`));
}

export function classifySourceUrl(url: string): SourceTrust {
  const domain = registrableDomain(url);
  if (!domain) return 'community';
  if (matches(domain, OFFICIAL_DOMAINS)) return 'official';
  if (matches(domain, TRUSTED_DOMAINS)) return 'trusted';
  return 'community';
}

/** 공식 또는 신뢰 가능한 출처인가 */
export function isCitableSource(url: string): boolean {
  return classifySourceUrl(url) !== 'community';
}

/**
 * "출처 N개"를 셀 때 쓰는 수.
 *
 * 같은 발행처의 페이지 두 장은 근거 두 건이 아니다(다나와 상품페이지 + 다나와 기사).
 * 그래서 URL 개수가 아니라 등록 가능 도메인의 가짓수를 센다.
 */
export function countCitableSources(sources: readonly SourceRef[] | undefined): number {
  if (!sources?.length) return 0;
  const domains = new Set<string>();
  for (const s of sources) {
    if (!isCitableSource(s.url)) continue;
    const d = registrableDomain(s.url);
    if (d) domains.add(d);
  }
  return domains.size;
}
