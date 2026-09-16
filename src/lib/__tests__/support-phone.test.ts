import { describe, it, expect } from 'vitest';
import { allCatalogAppliances } from '@/lib/data/appliances';
import { getBrandProfile } from '@/lib/data/brands';
import { getDetailedReview } from '@/lib/data/detailed-reviews';

/**
 * 수리 안내에 적힌 고객센터 번호가 실제 그 브랜드 번호인지 검사한다.
 *
 * 2026-09-16에 네 브랜드가 틀려 있었다. SK매직 안내 16곳이 삼성전자서비스 번호
 * (1588-1588)였고, 캐리어는 서비스가 아닌 다른 번호, 위닉스는 두 개가 다 틀렸으며,
 * 쿠쿠 정수기에는 공식 어디에도 없는 번호가 적혀 있었다.
 *
 * 다 같은 원인이다 — 브랜드 프로필(profiles.ts)에는 출처 URL까지 달아 정확히 적어
 * 두고, 제품 데이터의 에러코드는 따로 썼다. 두 파일이 한 번도 대조된 적이 없었다.
 * 번호가 틀린 수리 안내는 품질 문제가 아니라 사고에 가깝다. 사람이 그 번호로 전화를 건다.
 */

/** 에러코드·심층리뷰 본문에서 국내 대표번호 형태를 뽑는다 */
const PHONE = /1[0-9]{3}-[0-9]{4}/g;

/**
 * 브랜드 프로필의 대표 서비스 번호 말고도 정당하게 쓰이는 번호.
 *
 * 쿠쿠는 구매 제품 A/S(1588-8899)와 렌탈(쿠쿠홈시스, 1577-0010) 창구가 나뉜다.
 * 렌탈로 쓰는 정수기 안내에는 렌탈 번호가 맞다. 예외를 여기 적어 두면
 * "왜 프로필과 다른가"가 코드에 남는다.
 */
const EXTRA_ALLOWED: Record<string, string[]> = {
  Cuckoo: ['1577-0010'],
};

function allowedFor(brand: string): string[] {
  const profile = getBrandProfile(brand);
  const primary = profile?.serviceCenter?.phone;
  return [...(primary ? [primary] : []), ...(EXTRA_ALLOWED[brand] ?? [])];
}

describe('고객센터 번호', () => {
  it('에러코드 안내의 번호가 브랜드 서비스 번호와 일치한다', () => {
    const offenders: string[] = [];
    for (const a of allCatalogAppliances) {
      const allowed = allowedFor(a.brand);
      if (allowed.length === 0) continue; // 프로필에 번호가 없는 브랜드는 대조 대상이 아니다
      const blob = JSON.stringify(a.errorCodes ?? []);
      for (const found of blob.match(PHONE) ?? []) {
        if (!allowed.includes(found)) {
          offenders.push(`${a.slug} (${a.brand}): ${found} — 허용: ${allowed.join(', ')}`);
        }
      }
    }
    expect(offenders, offenders.join('\n')).toEqual([]);
  });

  it('심층 리뷰 본문의 번호도 같은 기준을 지킨다', () => {
    const offenders: string[] = [];
    for (const a of allCatalogAppliances) {
      const allowed = allowedFor(a.brand);
      if (allowed.length === 0) continue;
      const sections = getDetailedReview(a.slug) ?? [];
      const blob = sections.map((s) => `${s.heading} ${s.body}`).join(' ');
      for (const found of blob.match(PHONE) ?? []) {
        if (!allowed.includes(found)) {
          offenders.push(`${a.slug} (${a.brand}): ${found} — 허용: ${allowed.join(', ')}`);
        }
      }
    }
    expect(offenders, offenders.join('\n')).toEqual([]);
  });

  it('브랜드 프로필의 서비스 번호에는 출처가 붙어 있다', () => {
    // 번호를 고칠 때 근거를 남기게 강제한다. 출처 없는 번호는 다음 사람이 검증할 수 없다.
    const brands = [...new Set(allCatalogAppliances.map((a) => a.brand))];
    const missing = brands.filter((b) => {
      const sc = getBrandProfile(b)?.serviceCenter;
      return sc?.phone && !sc.sourceUrl;
    });
    expect(missing).toEqual([]);
  });
});
