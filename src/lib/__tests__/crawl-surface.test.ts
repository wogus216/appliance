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
import { getDetailedReview } from '@/lib/data/detailed-reviews';

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

// 사이트는 /about·/methodology에서 "직접 구매·측정하지 않는다"고 밝힌다. 그런데 본문이
// "정숙함이 압도적", "착용감이 크게 개선", "작동음이 크다"처럼 써 본 사람의 목소리로 말하면
// 고지와 본문이 같은 페이지에서 모순된다(2026-09-18 애드센스 진단의 본체). 감각·체험
// 주장은 스펙 표기로 바꾸거나, 수치가 없으면 "공개하지 않았다"고 적는다.
const EXPERIENTIAL =
  /압도적|탁월|(?<!일)체감|후회 없|매끄럽|편안|착용[^.]*편합니다|정숙함|조용(?!한 (?:공간|실내))[하한해합]|시끄|거슬리|느껴[지집]|착용감이 (?:좋|개선|크게)|작동음(?:이|은|도)? ?(?:크|큽|낮)|손에 닿는|쿠팡 판매 TOP|판매 1위/;

describe('제품 산문에 체험형 주장이 없다', () => {
  it.each(allAppliances.map((a) => [a.slug, a] as const))('%s', (_slug, a) => {
    const prose = [
      a.description,
      a.oneliner,
      a.editorComment,
      ...a.targetUsers.recommended,
      ...a.targetUsers.notRecommended,
      ...a.features,
      ...(getDetailedReview(a.slug) ?? []).map((s) => s.body),
    ].filter((t): t is string => !!t);
    const hits = prose.flatMap((t) => t.split(/(?<=[.다])\s+/)).filter((s) => EXPERIENTIAL.test(s));
    expect(hits).toEqual([]);
  });
});
