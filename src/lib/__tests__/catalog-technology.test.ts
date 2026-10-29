import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';
import { allAppliances, allCatalogAppliances } from '@/lib/data/appliances';
import { UNVERIFIED_SLUGS } from '@/lib/data/appliances/unverified';
import { APPLIANCE_TECHNOLOGY_GUIDES, getApplianceTechnologyGuide } from '@/lib/data/appliance-technology';
import { getPurifierTechnology } from '@/lib/data/purifier-technology';
import { guideEvidenceLink, selectedGuidePart, technologyGuideRecord } from '@/lib/appliance-technology';
import { buildProductToc } from '@/lib/detail-sections';
import { PerformanceSection } from '@/components/detail/performance-section';

vi.mock('next/navigation', () => ({ useSearchParams: () => new URLSearchParams() }));
const newGuides = APPLIANCE_TECHNOLOGY_GUIDES.slice(3);

describe('공개 제품 전체의 기술 지도', () => {
  it('공개 34개 모두에 정확히 한 지도만 있으며 미검증 제품을 공개 대상으로 넓히지 않는다', () => {
    expect(allAppliances).toHaveLength(34);
    expect(APPLIANCE_TECHNOLOGY_GUIDES).toHaveLength(33);
    expect(newGuides).toHaveLength(30);
    expect(new Set(APPLIANCE_TECHNOLOGY_GUIDES.map((g) => g.slug)).size).toBe(33);
    for (const product of allAppliances) {
      const matches = [getApplianceTechnologyGuide(product.modelNumber), getPurifierTechnology(product.modelNumber)].filter(Boolean);
      expect(matches, product.modelNumber).toHaveLength(1);
      expect(matches[0]!.slug, product.modelNumber).toBe(product.slug);
      expect(buildProductToc(product).find((t) => t.id === 'performance')?.label).toBe('기술·관리');
    }
    for (const product of allCatalogAppliances.filter((p) => UNVERIFIED_SLUGS.has(p.slug))) {
      expect(getApplianceTechnologyGuide(product.modelNumber), product.modelNumber).toBeUndefined();
    }
    expect(getApplianceTechnologyGuide('__proto__')).toBeUndefined();
    expect(getApplianceTechnologyGuide('RF85')).toBeUndefined();
  });

  it.each(newGuides)('$modelNumber의 모든 부품·관리 항목이 해당 모델의 근거로 이어진다', (guide) => {
    expect(selectedGuidePart(guide, null)).toBeDefined();
    expect(selectedGuidePart(guide, 'unsupported-part')).toBeUndefined();
    expect(guide.parts.length).toBeGreaterThanOrEqual(3);
    expect(guide.careItems.length).toBeGreaterThanOrEqual(2);
    expect(guide.groups.flatMap((g) => g.parts).sort()).toEqual(guide.parts.map((p) => p.id).sort());
    for (const item of [...guide.parts, ...guide.careItems]) {
      expect(item.evidence.length).toBeGreaterThan(0);
      for (const evidence of item.evidence) {
        const link = guideEvidenceLink(guide, evidence);
        expect(link, `${guide.modelNumber} ${item.id}`).toBeDefined();
        expect(link!.href).toMatch(/^https:\/\//);
        expect(evidence.location.length).toBeGreaterThan(3);
      }
    }
    const text = technologyGuideRecord(guide, guide.defaultPart, [guide.careItems[0].id]);
    expect(text).toContain(guide.modelNumber);
    expect(text).toContain('[내역 확인함]');
    expect(text).toContain('[확인 필요]');
    expect(text).toContain(guide.safetyNote);
    expect(text).toContain(guide.parts[0].limit);
    expect(text).toContain('실제 내부');
  });

  it.each(allAppliances)('$modelNumber는 정적 본문에 지도·기본 설명·관리·근거를 한 번만 표시한다', (product) => {
    const html = renderToStaticMarkup(createElement(PerformanceSection, { appliance: product }));
    expect(html.match(/id="technology-map"/g)).toHaveLength(1);
    expect(html).toContain('type="checkbox"');
    expect(html).toContain('aria-pressed="true"');
    expect(html).toContain('관리 카드');
  });
});

describe('품목·모델마다 다른 조건 보존', () => {
  const text = (model: string) => JSON.stringify(getApplianceTechnologyGuide(model));
  it('냉장고 수납·패널·노크온 기능을 동일 브랜드에서 복사하지 않는다', () => {
    expect(text('RF85C90D1AP')).toContain('맞춤보관실');
    expect(text('RS84B5061M9')).toContain('패널 교체는 지원하지');
    expect(text('T873MEE111')).toContain('노크온은 미지원');
    expect(text('S834MWW1D')).toContain('자동 제빙은 미지원');
  });
  it('제트봇 본체와 스테이션의 필터 물세척 조건을 구별한다', () => {
    expect(text('VR50T95935W')).toContain('본체 먼지통과 필터');
    expect(text('VR50T95935W')).toContain('스테이션 고성능 필터는 물로 씻지');
  });
  it('콤보의 세탁·건조 필터와 단독 세탁기의 관리 항목을 구별한다', () => {
    expect(text('WD25DB8995BZ')).toContain('건조 코스 후 매번');
    expect(text('WF24A9500KE')).toContain('통세척에는 세제와 세탁물을 넣지');
  });
  it('팬의 송풍을 냉방으로, TP09 촉매를 TP07의 부품으로 확장하지 않는다', () => {
    expect(text('TP07')).toContain('촉매 필터를 TP07 적용 부품으로 옮기지');
    expect(text('HP09')).toContain('교체할 필요가 없는 촉매 필터');
    expect(text('TP07')).toContain('냉방 성능을 보장하지');
  });
  it('정수기 필터 구성·살균과 모델별 전원 예외를 혼합하지 않는다', () => {
    expect(text('WD523ACB')).toContain('중금속9 6개월·바이러스 클리어 12개월');
    expect(text('WPU-A710C')).toContain('세디먼트·블록 카본 복합·나노테크 PAC');
    expect(text('WPU-A710C')).toContain('코웨이 필터 자가 교체의 전원 예외를 이 모델에 적용하지');
  });
  it('TV 패널 해상도·가상 채널·충전 조건을 모델별로 구별한다', () => {
    expect(text('KU27LSFM7AXXKR')).toContain('프로세서 이름과 패널 해상도');
    expect(text('32LX6BPGA')).toContain('가상 채널');
    expect(text('32LX6BPGA')).toContain('100W 이상');
    expect(text('27LX6TPGA')).toContain('85.15Wh');
    expect(text('27LX5QKNA')).toContain('후면 배터리 전원 스위치');
  });
  it('이어폰의 LDAC 동시 사용과 플랫폼 제약을 서로 바꾸지 않는다', () => {
    expect(text('A3957')).toContain('사용이 가능하며 이때 약 4시간');
    expect(text('HT08')).toContain('멀티포인트가 자동 해제');
    expect(text('SM-R630N')).toContain('Galaxy 전용 기능');
    expect(text('A3063 / A3064 / A3122')).toContain('지역·소프트웨어 조건');
    expect(text('WF-1000XM5')).toContain('두 음원을 동시에 섞어 듣는 기능과 구별');
  });
  it('Qrevo와 S8의 걸레 주기를 구별하고 자료가 없는 관리 일수를 만들지 않는다', () => {
    expect(text('Qrevo Curv')).toContain('1~3개월');
    expect(text('S8 Pro Ultra')).toContain('3~6개월');
    expect(text('RO585HGH')).toContain('고정 청소 주기는 확인하지 못');
    expect(text('TAC-08CSD/TPH11I')).toContain('고정 청소 주기는 확인하지 못');
  });
});
