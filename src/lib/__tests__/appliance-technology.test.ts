import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';
import { APPLIANCE_TECHNOLOGY_GUIDES, getApplianceTechnologyGuide } from '@/lib/data/appliance-technology';
import { guideEvidenceLink, selectedGuidePart, technologyGuideHref, technologyGuideRecord } from '@/lib/appliance-technology';
import { getApplianceBySlug } from '@/lib/data/appliances';
import { getPurifierTechnology } from '@/lib/data/purifier-technology';
import { buildProductToc } from '@/lib/detail-sections';
import { ApplianceTechnology } from '@/components/detail/appliance-technology';
import { PerformanceSection } from '@/components/detail/performance-section';

vi.mock('next/navigation', () => ({ useSearchParams: () => new URLSearchParams() }));
const dishwasher = getApplianceTechnologyGuide('CDW-A0611TW')!;
const dryer = getApplianceTechnologyGuide('DV17A9720BV')!;
const robot = getApplianceTechnologyGuide('S8 Pro Ultra')!;
// 첫 세 품목의 서로 다른 관리 기준을 보존하는 회귀 검사. 전체 범위는 catalog-technology.test.ts에서 확인한다.
const guides = APPLIANCE_TECHNOLOGY_GUIDES.slice(0, 3);

describe('모델별 기술·관리 근거', () => {
  it('세 품목의 정확한 공개 모델에 연결하며 이름이 비슷한 파생 모델로 확장하지 않는다', () => {
    expect(guides).toHaveLength(3);
    for (const guide of guides) expect(getApplianceBySlug(guide.slug)?.modelNumber).toBe(guide.modelNumber);
    for (const model of ['CDW-A1200FW', 'CDW-A0611TS', 'DV19A9740', 'S8', 'S8 MaxV Ultra', '__proto__', '']) {
      expect(getApplianceTechnologyGuide(model)).toBeUndefined();
    }
  });
  it.each(guides)('$modelNumber의 지도와 출처가 빠지거나 다른 품목을 가리키지 않는다', (guide) => {
    expect(getPurifierTechnology(guide.modelNumber)).toBeUndefined();
    expect(selectedGuidePart(guide, null)).toBeDefined();
    const mappedParts = guide.groups.flatMap((group) => group.parts);
    expect(new Set(mappedParts).size).toBe(mappedParts.length);
    expect([...mappedParts].sort()).toEqual(guide.parts.map((part) => part.id).sort());
    for (const item of [...guide.parts, ...guide.careItems]) {
      expect(item.evidence.length).toBeGreaterThan(0);
      for (const evidence of item.evidence) expect(guideEvidenceLink(guide, evidence)).toBeDefined();
    }
    for (const source of guide.sources) {
      expect(source.checkedAt).toBe('2026-10-28');
      expect(source.url).toMatch(/^https:\/\/(www\.cuckoo\.co\.kr|downloadcenter\.samsung\.com|www\.samsung\.com|support\.roborock\.com)\//);
    }
  });
  it('식기세척기의 수동 청소·문 열기와 근거 없는 고정 주기를 구별한다', () => {
    expect(selectedGuidePart(dishwasher, 'basket')?.how).toContain('겹치지 않게');
    expect(selectedGuidePart(dishwasher, 'drying')?.everyday).toContain('자동 문 열림 기능으로 오해하지');
    expect(dishwasher.careItems.find((c) => c.id === 'filters')?.timing).toContain('고정 일수 미제시');
    expect(dishwasher.diagramNote).toContain('실제 배관 위치');
  });
  it('건조기 일반 필터의 매회 기준과 3차 필터의 25회·알림 설정을 구별한다', () => {
    expect(dryer.careItems.find((c) => c.id === 'filter')?.timing).toBe('한 번 사용할 때마다');
    expect(dryer.careItems.find((c) => c.id === 'third')?.timing).toContain('25회');
    expect(dryer.careItems.find((c) => c.id === 'third')?.description).toContain('알림 설정');
    expect(selectedGuidePart(dryer, 'exchanger')?.limit).toContain('자동으로 청소해 주는 구조라고 표시하지');
    expect(selectedGuidePart(dryer, 'heating')?.evidence[0].source).toBe('spec');
    expect(dryer.careItems.find((c) => c.id === 'water')?.description).toContain('직배수');
  });
  it('로봇 본체 공기 필터와 도크 물 필터의 서로 다른 관리 조건을 유지한다', () => {
    expect(selectedGuidePart(robot, 'filter')?.care).toContain('24시간');
    expect(selectedGuidePart(robot, 'waterfilter')?.care).toContain('필요 시');
    expect(selectedGuidePart(robot, 'waterfilter')?.limit).toContain('별도 교체 주기로 옮기지');
    expect(selectedGuidePart(robot, 'mop')?.limit).toContain('분리 불가');
    expect(robot.careItems.find((c) => c.id === 'bag')?.timing).toBe('가득 찼을 때 교체');
    expect(robot.diagramNote).toContain('국내 동봉 설명서');
  });
  it('PDF 실제 쪽과 인쇄·절 위치를 따로 저장하며 웹 사양에는 쪽을 만들지 않는다', () => {
    expect(guideEvidenceLink(dryer, { source: 'manual', location: '인쇄 65쪽', pdfPage: 65 })?.href).toMatch(/#page=65$/);
    expect(guideEvidenceLink(dryer, { source: 'spec', location: '건조 방식' })?.href).toBe('https://www.samsung.com/sec/support/model/DV17A9720BV/');
    expect(guideEvidenceLink(dryer, { source: 'missing', location: '미확인' })).toBeUndefined();
  });
});

describe('선택·기록·화면 연결', () => {
  it.each(guides)('$modelNumber의 주소는 해당 모델의 부품으로만 복원된다', (guide) => {
    expect(selectedGuidePart(guide, 'hot')).toBeUndefined();
    expect(selectedGuidePart(guide, '')).toBeUndefined();
    for (const part of guide.parts) {
      const url = new URL(technologyGuideHref(guide, part.id), 'https://salimlab.kr');
      expect(url.pathname).toBe(`/products/${guide.slug}`);
      expect(url.hash).toBe('#technology-map');
      expect(selectedGuidePart(guide, url.searchParams.get('tech'))?.id).toBe(part.id);
      expect([...url.searchParams.keys()]).toEqual(['tech']);
    }
  });
  it.each(guides)('$modelNumber 기록은 모델·선택·확인 상태·원문과 한계를 보존한다', (guide) => {
    const checked = guide.careItems[0];
    const part = guide.parts[0];
    const record = technologyGuideRecord(guide, part.id, [checked.id]);
    expect(record).toContain(guide.modelNumber);
    expect(record).toContain(`선택 항목: ${part.title}`);
    expect(record).toContain(`[내역 확인함] ${checked.title}`);
    expect(record).toContain('[확인 필요]');
    expect(record).toContain(part.limit);
    expect(record).toContain('청소·교체 완료나 성능 판정이 아닙니다');
    expect(record).toContain(guide.safetyNote);
    for (const source of guide.sources) expect(record).toContain(source.url);
    expect(record).not.toContain('12.17kWh');
    expect(record).not.toContain('수질 판정');
    expect(technologyGuideRecord(guide, null, [])).not.toContain('선택 항목:');
  });
  it.each(guides)('$modelNumber는 정적 HTML에 기본 설명·관리·원문을 표시한다', (guide) => {
    const html = renderToStaticMarkup(createElement(ApplianceTechnology, { guide }));
    expect(html).toContain('id="technology-map"');
    expect(html).toContain(selectedGuidePart(guide, null)!.heading);
    expect(html).toContain('aria-pressed="true"');
    expect(html).toContain('type="checkbox"');
    expect(html).toContain(guide.sources[0].url.replaceAll('&', '&amp;'));
    expect(buildProductToc(getApplianceBySlug(guide.slug)!).find((t) => t.id === 'performance')?.label).toBe('기술·관리');
  });
  it('정수기 도식을 보존하고 지도 없는 제품에는 새 화면이 붙지 않는다', () => {
    const purifier = getPurifierTechnology('CHPI-7400N')!;
    const oldMap = renderToStaticMarkup(createElement(PerformanceSection, { appliance: getApplianceBySlug(purifier.slug)! }));
    const none = renderToStaticMarkup(createElement(PerformanceSection, { appliance: { ...getApplianceBySlug('lg-dios-obje-sxs-s834')!, modelNumber: 'UNSUPPORTED-MODEL' } }));
    expect(oldMap).toContain('id="purifier-part-detail"');
    expect(oldMap).not.toContain('id="technology-guide-detail"');
    expect(none).not.toContain('id="technology-map"');
    for (const guide of guides) {
      const html = renderToStaticMarkup(createElement(PerformanceSection, { appliance: getApplianceBySlug(guide.slug)! }));
      expect(html).toContain('id="technology-guide-detail"');
      expect(html).not.toContain('id="purifier-part-detail"');
    }
  });
});
