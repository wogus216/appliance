import { describe, it, expect } from 'vitest';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { NavMenu } from '@/components/nav-menu';
import { LayerDiagram } from '@/components/materials/layer-diagram';
import { ProductJsonLd } from '@/components/detail/product-jsonld';
import ErrorCodesPage from '@/app/error-codes/page';
import { allAppliances } from '@/lib/data/appliances';
import { getErrorCodeBrands } from '@/lib/error-codes';
import { getValidPurchaseLinks } from '@/lib/purchase-links';

// 2026-09-18 Codex·Claude 교차 진단(.omc/research/)에서 나온 결함의 회귀 방지.
// 크롤러와 심사자가 정적 HTML에서 보는 것을 고정한다.

describe('헤더 드롭다운', () => {
  it('닫힌 상태에서도 링크가 정적 HTML에 있다', () => {
    const items = [
      { label: '에어컨', href: '/category/air-conditioner' },
      { label: '세탁기', href: '/category/washer' },
    ];
    const html = renderToStaticMarkup(createElement(NavMenu, { label: '카테고리', items }));
    for (const it of items) expect(html).toContain(`href="${it.href}"`);
    expect(html).toContain('hidden');
  });
});

describe('성분 사전 층 다이어그램', () => {
  it('"준비 중" 자리표시자를 렌더하지 않는다', () => {
    const html = renderToStaticMarkup(createElement(LayerDiagram));
    expect(html).not.toContain('준비 중');
  });
});

describe('Product 구조화 데이터', () => {
  const offersOf = (html: string) => {
    const json = JSON.parse(html.replace(/^<script[^>]*>|<\/script>$/g, ''));
    return json.offers as Record<string, unknown> | undefined;
  };

  it.each(allAppliances.map((a) => [a.slug, a] as const))(
    '%s: 실제 구매처가 있을 때만 offers를 내고, 재고는 선언하지 않는다',
    (_slug, a) => {
      const html = renderToStaticMarkup(createElement(ProductJsonLd, { appliance: a }));
      const offers = offersOf(html);
      const validLinks = getValidPurchaseLinks(a.purchaseLinks);
      if (validLinks.length > 0 && a.price != null) {
        expect(offers?.offerCount).toBe(validLinks.length);
      } else {
        expect(offers).toBeUndefined();
      }
      expect(html).not.toContain('InStock');
    },
  );
});

describe('에러코드 허브', () => {
  it('에러코드가 있는 모든 브랜드 허브로 링크한다', () => {
    const html = renderToStaticMarkup(createElement(ErrorCodesPage));
    for (const b of getErrorCodeBrands()) {
      expect(html, b).toContain(`href="/error-codes/${b}"`);
    }
  });
});
