// @vitest-environment jsdom
import { act, createElement } from 'react';
import { createRoot } from 'react-dom/client';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';
import BrandErrorCodesPage from '@/app/error-codes/[brand]/page';
import ErrorCodesPage from '@/app/error-codes/page';
import CuckooE4Page from '@/app/error-codes/Cuckoo/dishwasher/e4/page';
import HaierF25Page from '@/app/error-codes/Haier/air-conditioner/f25/page';
import SKMagicE4Page from '@/app/error-codes/SKMagic/dishwasher/e4/page';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { MobileNav } from '@/components/mobile-nav';
import { getAppliancesByBrand } from '@/lib/data/appliances';
import { getBrandErrorCodes, getErrorCodeBrands } from '@/lib/error-codes';
import { getEntryActionGuides } from '@/lib/data/error-codes/action-guides';

/**
 * 2026-10-30: 네이버 클릭의 대부분이 들어오는 에러코드 페이지에서 도구로 가는 링크가 0개였고, 머리말·꼬리말에도 없었다.
 * 링크가 다시 빠지지 않게 하고, 지원하지 않는 품목(보일러)을 빈 선택지로 보내지 않게 한다.
 */
vi.mock('next/navigation', () => ({ useRouter: () => ({ replace: vi.fn(), push: vi.fn() }), useSearchParams: () => new URLSearchParams(), usePathname: () => '/' }));
Object.assign(globalThis, { IS_REACT_ACT_ENVIRONMENT: true });

const hub = async (brand: string) => renderToStaticMarkup(await BrandErrorCodesPage({ params: Promise.resolve({ brand }) }));

describe('전역 메뉴', () => {
  it('머리말과 꼬리말이 도구 모음으로 잇는다', () => {
    expect(renderToStaticMarkup(createElement(Header))).toContain('href="/tools"');
    expect(renderToStaticMarkup(createElement(Footer))).toContain('href="/tools"');
  });

  it('모바일 메뉴를 펼치면 도구 모음이 있다', async () => {
    document.body.innerHTML = '<div id="nav-root"></div>';
    const root = createRoot(document.getElementById('nav-root')!);
    await act(async () => { root.render(createElement(MobileNav, { categories: [], brands: [] })); });
    expect(document.querySelector('a[href="/tools"]')).toBeNull();
    await act(async () => { document.querySelector('button')!.click(); });
    expect(document.querySelector('a[href="/tools"]')?.textContent).toBe('도구');
    await act(async () => { root.unmount(); });
  });
});

describe('에러코드 페이지에서 도구로', () => {
  it.each(getErrorCodeBrands())('%s 허브: 수리·교체 비교표로 잇고 맨 위에서 그 절로 건너뛸 수 있다', async (brand) => {
    const html = await hub(brand);
    expect(html).toContain('href="/tools/repair-replace"');
    expect(html).toContain('id="next-tools"');
    expect(html).toContain('href="#next-tools"');
  });

  it.each(getErrorCodeBrands())('%s 허브: 관리·수첩 도구는 그 브랜드 공개 제품이 있을 때만 잇는다', async (brand) => {
    const html = await hub(brand);
    const supported = getAppliancesByBrand(brand).length > 0;
    expect(html.includes('href="/tools/care-plan"'), brand).toBe(supported);
    expect(html.includes('href="/tools/household-care"'), brand).toBe(supported);
  });

  it('보일러 허브(대조군)는 제품이 없어 수리·교체만 잇는다', async () => {
    expect(getAppliancesByBrand('Kiturami')).toHaveLength(0);
    const html = await hub('Kiturami');
    expect(html).not.toContain('href="/tools/care-plan"');
    expect(html).toContain('href="/tools/repair-replace"');
  });

  it('에러코드 첫 화면과 상세 안내 3쪽도 수리·교체 비교표로 잇는다', () => {
    for (const page of [ErrorCodesPage, CuckooE4Page, HaierF25Page, SKMagicE4Page]) {
      expect(renderToStaticMarkup(createElement(page)), page.name).toContain('href="/tools/repair-replace"');
    }
  });
});

describe('쿠쿠 허브 시험: 카드가 있는 코드의 해결 문단 접기', () => {
  // 같은 문장으로 시작하는 코드가 있어(E4·E6·ED) 코드 블록을 잘라서 본다.
  const solutionClosed = (html: string, anchorId: string, solution: string) => {
    const start = html.indexOf(`id="${anchorId}"`);
    const next = html.indexOf('scroll-mt-24 border rounded-xl', html.indexOf('rounded-xl', start) + 1);
    const block = html.slice(start, next === -1 ? undefined : next);
    const at = block.indexOf(solution.slice(0, 20));
    const open = block.lastIndexOf('<details', at);
    return at > -1 && open > -1 && !block.slice(open, at).includes('</details>');
  };

  it('카드가 있는 코드는 해결 문단을 접되 정적 HTML에 남긴다', async () => {
    const html = await hub('Cuckoo');
    for (const group of getBrandErrorCodes('Cuckoo')) {
      for (const entry of group.entries) {
        expect(getEntryActionGuides('Cuckoo', group.category, entry).length, entry.code).toBeGreaterThan(0);
        expect(solutionClosed(html, entry.anchorId, entry.solution), entry.code).toBe(true);
      }
    }
  });

  it('다른 허브(대조군)의 해결 문단은 펼친 그대로다', async () => {
    const html = await hub('SKMagic');
    const entry = getBrandErrorCodes('SKMagic')[0].entries[0];
    expect(html).toContain(entry.solution.slice(0, 20));
    expect(solutionClosed(html, entry.anchorId, entry.solution)).toBe(false);
  });
});
