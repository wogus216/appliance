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
import { getEntryActionGuides, hubActionAnchor } from '@/lib/data/error-codes/action-guides';

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
    await act(async () => { root.render(createElement(MobileNav)); });
    expect(document.querySelector('a[href="/tools"]')).toBeNull();
    await act(async () => { document.querySelector('button')!.click(); });
    expect(document.querySelector('a[href="/tools"]')?.textContent).toBe('수리·관리 도구');
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

describe('브랜드 페이지의 모델별 조치', () => {
  const hubDocument = async (brand: string) => new DOMParser().parseFromString(await hub(brand), 'text/html');

  it.each(getErrorCodeBrands().filter((brand) => brand !== 'LG'))('%s: 모델별 행동 카드에 조치와 근거를 모은다', async (brand) => {
    const content = await hubDocument(brand);
    for (const group of getBrandErrorCodes(brand)) {
      for (const entry of group.entries) {
        const guides = getEntryActionGuides(brand, group.category, entry);
        if (guides.length === 0) continue;
        const block = content.getElementById(entry.anchorId)!;
        expect(block.textContent, entry.code).not.toContain(entry.solution);
        for (const guide of guides) {
          const card = content.getElementById(hubActionAnchor(guide))!;
          expect(block.contains(card), guide.id).toBe(true);
          expect(card.querySelector('ol li'), guide.id).not.toBeNull();
          for (const model of guide.models) {
            expect(card.textContent, guide.id).toContain(model.model);
            expect(Array.from(card.querySelectorAll('a')).some((link) => link.href === model.manualUrl), model.model).toBe(true);
          }
        }
      }
    }
  });

  it('로보락 Error 4 바로가기는 각 모델의 코드와 안내로 연결된다', async () => {
    const content = await hubDocument('Roborock');
    for (const [anchor, label, cardId] of [
      ['robot-vacuum-error-4', 'Error 4 · S8 Pro Ultra / Qrevo Curv', 'action-roborock-error4'],
      ['robot-vacuum-error-4-2', 'Error 4 · S7', 'action-roborock-s7-error4'],
    ]) {
      const link = content.querySelector(`nav a[href="#${anchor}"]`);
      expect(link?.textContent).toBe(label);
      expect(link?.getAttribute('aria-label')).toBe(label);
      expect(content.getElementById(anchor)?.contains(content.getElementById(cardId))).toBe(true);
    }
  });

  it('SK매직 E2는 모델 설명서 조치와 공용 FAQ의 범위를 보여준다', async () => {
    const content = await hubDocument('SKMagic');
    const card = content.getElementById('action-skmagic-e2')!;
    expect(card.textContent).toContain('호스 결빙과 전원 재연결');
    expect(card.querySelector('a[href$="FAQ210104033072"]')?.textContent).toBe('제조사 공용 FAQ');
    expect(card.querySelector('ol')?.textContent).not.toContain('전원 재연결');
  });

  it('SK매직 E4는 미확인 안내의 적용 모델을 밝히고 다른 모델의 상세 안내로 연결한다', async () => {
    const content = await hubDocument('SKMagic');
    const code = content.getElementById('dishwasher-e4')!;
    expect(code.querySelector('a[href="/error-codes/SKMagic/dishwasher/e4"]')).not.toBeNull();
    expect(code.textContent).toContain('DWA-81 터치온');
    expect(content.getElementById('service-record')?.textContent).toContain('E4 (DWA-81 터치온)');
  });

  it('쿠쿠 E1의 수압 단서와 로보락 Error 5의 전원 주의는 본문에 남긴다', async () => {
    const cuckoo = await hubDocument('Cuckoo');
    const roborock = await hubDocument('Roborock');
    expect(cuckoo.getElementById('action-cuckoo-e1')?.textContent).toContain('같은 수전의 물줄기');
    expect(roborock.getElementById('action-roborock-error5')?.textContent).toContain('분리하기 전에 전원을 끄고');
  });

  it('LG 해동·초기화 범위를 코드 본문보다 먼저 읽고 모델 설명서 대조로 이동한다', async () => {
    const content = await hubDocument('LG');
    const code = content.getElementById('refrigerator-dh')!;
    const link = code.querySelector('a[href="#cat-refrigerator"]')!;
    const solution = [...code.querySelectorAll('p')].find((p) => p.textContent.includes('최소 12시간'))!;
    expect(link.compareDocumentPosition(solution) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(content.getElementById('cat-refrigerator')?.textContent).toContain('전원을 끄지 말고');
  });

  it('귀뚜라미 98은 제품군별 링크를 쓰고, 나비엔 Er28은 조치와 출처가 각각 한곳에 있다', async () => {
    const kiturami = await hubDocument('Kiturami');
    expect(kiturami.querySelector('nav a[href="#gas-boiler-98"]')?.getAttribute('aria-label')).toBe('98 · 거꾸로IN / 거꾸로IIHi');
    expect(kiturami.querySelector('nav a[href="#gas-boiler-98-2"]')?.getAttribute('aria-label')).toBe('98 · 거꾸로 IoT 콘덴싱');
    const navien = await hubDocument('Navien');
    const er28 = navien.getElementById('gas-boiler-er28-e228')!;
    expect(er28.querySelector(':scope > ol')).toBeNull();
    expect(er28.querySelector('a[href$="/guide/13259"]')).not.toBeNull();
    expect(er28.querySelector('#action-navien-er28 ol')?.textContent).toContain('난방배관');
  });
});
