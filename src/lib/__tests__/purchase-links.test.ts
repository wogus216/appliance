import { describe, it, expect } from 'vitest';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import {
  isValidPurchaseUrl,
  getValidPurchaseLinks,
  hasValidPurchaseLinks,
  isCoupangLink,
  hasCoupangPartnersLink,
} from '@/lib/purchase-links';
import { PurchaseSection } from '@/components/detail/purchase-section';
import { allAppliances } from '@/lib/data/appliances';
import type { PurchaseLink } from '@/types/appliance';

describe('isValidPurchaseUrl', () => {
  it.each([
    'https://www.coupang.com/vp/products/1',
    'https://prod.danawa.com/info/?pcode=1',
    'http://example.com/a',
  ])('유효: %s', (url) => {
    expect(isValidPurchaseUrl(url)).toBe(true);
  });

  it.each([
    ['자리표시자', '#'],
    ['빈 문자열', ''],
    ['공백만', '   '],
    ['앵커', '#buy'],
    ['상대경로', '/products/x'],
    ['스킴 없음', 'www.coupang.com'],
    ['javascript', 'javascript:alert(1)'],
    ['호스트 없음', 'https://'],
    ['점 없는 호스트', 'https://localhost/x'],
  ])('무효(%s): %s', (_label, url) => {
    expect(isValidPurchaseUrl(url)).toBe(false);
  });

  it('문자열이 아니면 무효', () => {
    expect(isValidPurchaseUrl(undefined)).toBe(false);
    expect(isValidPurchaseUrl(null)).toBe(false);
    expect(isValidPurchaseUrl(42)).toBe(false);
  });
});

describe('getValidPurchaseLinks', () => {
  it('자리표시자만 있으면 빈 배열', () => {
    const links: PurchaseLink[] = [
      { store: '쿠팡', url: '#' },
      { store: '공식몰', url: '#', isOfficial: true },
    ];
    expect(getValidPurchaseLinks(links)).toEqual([]);
    expect(hasValidPurchaseLinks(links)).toBe(false);
  });

  it('유효한 것만 남긴다', () => {
    const links: PurchaseLink[] = [
      { store: '쿠팡', url: '#' },
      { store: '다나와', url: 'https://prod.danawa.com/info/?pcode=1' },
    ];
    expect(getValidPurchaseLinks(links).map((l) => l.store)).toEqual(['다나와']);
  });

  it('undefined도 안전하게 빈 배열', () => {
    expect(getValidPurchaseLinks(undefined)).toEqual([]);
    expect(hasValidPurchaseLinks(undefined)).toBe(false);
  });
});

describe('쿠팡 파트너스 고지는 실제 쿠팡 링크가 있을 때만', () => {
  it('자리표시자만 있으면 고지하지 않는다', () => {
    expect(hasCoupangPartnersLink([{ store: '쿠팡', url: '#' }])).toBe(false);
  });

  it('실제 쿠팡 링크가 있으면 고지한다', () => {
    expect(
      hasCoupangPartnersLink([{ store: '쿠팡', url: 'https://www.coupang.com/vp/products/1' }]),
    ).toBe(true);
  });

  it('coupang이 포함된 다른 도메인은 쿠팡이 아니다', () => {
    expect(isCoupangLink('https://coupang.com.evil.example/x')).toBe(false);
    expect(isCoupangLink('https://notcoupang.com/x')).toBe(false);
    expect(isCoupangLink('https://link.coupang.com/a/x')).toBe(true);
  });
});

describe('PurchaseSection 렌더', () => {
  const render = (links: PurchaseLink[]) =>
    renderToStaticMarkup(createElement(PurchaseSection, { links }));

  it('유효 URL이 하나도 없으면 "구매처" 제목까지 렌더하지 않는다', () => {
    const html = render([
      { store: '쿠팡', url: '#' },
      { store: '공식몰', url: '#' },
    ]);
    expect(html).toBe('');
  });

  it('유효 URL이 있으면 그것만 렌더한다', () => {
    const html = render([
      { store: '쿠팡', url: '#' },
      { store: '다나와', url: 'https://prod.danawa.com/info/?pcode=1' },
    ]);
    expect(html).toContain('구매처');
    expect(html).toContain('다나와');
    expect(html).not.toContain('쿠팡');
    expect(html).not.toContain('href="#"');
  });

  it('실제 쿠팡 링크에만 rel="sponsored"와 파트너스 고지가 붙는다', () => {
    const withCoupang = render([
      { store: '쿠팡', url: 'https://link.coupang.com/a/x' },
    ]);
    expect(withCoupang).toContain('sponsored');
    expect(withCoupang).toContain('쿠팡 파트너스');

    const withoutCoupang = render([
      { store: '다나와', url: 'https://prod.danawa.com/info/?pcode=1' },
    ]);
    expect(withoutCoupang).not.toContain('sponsored');
    expect(withoutCoupang).not.toContain('쿠팡 파트너스');
  });
});

// 회귀 방지의 본체: 카탈로그 전체를 실제로 렌더해 자리표시자 링크가 한 개도
// 화면에 남지 않는지 확인한다. 데이터에 '#'가 남아 있는 것 자체는 허용한다
// (제휴 발급 전 자리표시자다) — 문제는 그것이 렌더되는 것이다.
describe('카탈로그 전체: 자리표시자 구매 링크가 렌더되지 않는다', () => {
  it.each(allAppliances.map((a) => [a.slug, a] as const))('%s', (_slug, a) => {
    const html = renderToStaticMarkup(
      createElement(PurchaseSection, { links: a.purchaseLinks ?? [] }),
    );
    expect(html).not.toContain('href="#"');
    if (!hasValidPurchaseLinks(a.purchaseLinks)) {
      expect(html, `${a.slug}: 유효 구매처가 없는데 섹션이 렌더됨`).toBe('');
    }
  });
});
