import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';
import { getPurifierTechnology } from '@/lib/data/purifier-technology';
import { getTechnologyPart, purifierCareRecord, purifierTechnologyHref } from '@/lib/purifier-technology';
import { getApplianceBySlug } from '@/lib/data/appliances';
import { buildProductToc } from '@/lib/detail-sections';
import { PurifierTechnology } from '@/components/detail/purifier-technology';
import { PerformanceSection } from '@/components/detail/performance-section';

vi.mock('next/navigation', () => ({ useRouter: () => ({ replace: vi.fn() }), useSearchParams: () => new URLSearchParams() }));
const technology = getPurifierTechnology('CHPI-7400N')!;

describe('정확한 모델의 기술 지도', () => {
  it('카탈로그의 정확한 모델에만 연결하고 온수가 없는 파생 모델에 적용하지 않는다', () => {
    expect(getApplianceBySlug(technology.slug)?.modelNumber).toBe(technology.modelNumber);
    for (const model of ['CPI-7400N', 'CHPI-7400N-X', 'CHPI7400N', 'CHP-7311N', '']) {
      expect(getPurifierTechnology(model)).toBeUndefined();
    }
  });
  it('필터 순서와 직수·저장부를 구별하고 내부 배관도를 주장하지 않는다', () => {
    expect(technology.parts.slice(0, 2).map((p) => p.id)).toEqual(['nano', 'carbon']);
    expect(technology.parts.filter((p) => ['water', 'cold', 'ice', 'hot'].includes(p.id))).toHaveLength(4);
    expect(getTechnologyPart(technology, 'water')?.explanation).toContain('직수식');
    expect(getTechnologyPart(technology, 'cold')?.explanation).toContain('추출할 수 있는 용량과 다를 수');
    expect(getTechnologyPart(technology, 'ice')?.explanation).toContain('만빙센서');
    expect(technology.diagramNote).toContain('실제 내부 배관');
    expect(technology.diagramNote).toContain('재현하지 않았');
  });
  it('같은 사용설명서와 공단의 다른 단위 수치를 별도 근거로 연결한다', () => {
    const catalog = getApplianceBySlug(technology.slug)!;
    expect(technology.energy).toMatchObject({ hotRatedWatts: 2950, monthlyDeclaredKwh: 12.17, declarationId: '282260052' });
    expect(catalog.techSpecs.extraSpecs).toContainEqual({ label: '정격 온수 전력', value: '2,950W' });
    expect(catalog.techSpecs.extraSpecs).toContainEqual({ label: '월간 소비전력량(에너지공단 신고)', value: '12.17kWh' });
    expect(technology.sources.find((s) => s.id === 'energy')?.url).toContain('no=282260052');
    expect(technology.sources.every((s) => s.checkedAt === '2026-10-27')).toBe(true);
  });
  it('필터 세트의 예상 주기와 사용량 조건을 함께 남기고 저장고 주기를 만들지 않는다', () => {
    expect(technology.careItems.find((i) => i.id === 'filters')?.timing).toBe('예상 4개월 · 하루 10L 기준');
    expect(technology.careItems.find((i) => i.id === 'filters')?.description).toContain('상수도 수질');
    expect(technology.careItems.find((i) => i.id === 'icebin')?.description).toContain('고정 주기는 제시하지');
    expect(technology.careItems.find((i) => i.id === 'tray')?.description).toContain('하루 이상 방치하지');
    expect(getTechnologyPart(technology, 'ice')?.limit).toContain('별도로 청소 안내');
  });
  it('제품 목차는 지도 모델에서 기술·관리로 안내하고 다른 제품은 기존 항목을 쓴다', () => {
    expect(buildProductToc(getApplianceBySlug(technology.slug)!).find((t) => t.id === 'performance')?.label).toBe('기술·관리');
    expect(buildProductToc({ ...getApplianceBySlug('lg-dios-obje-sxs-s834')!, modelNumber: 'UNSUPPORTED-MODEL' }).find((t) => t.id === 'performance')?.label).toBe('상세 스펙');
  });
});

describe('기능 선택 주소와 관리 카드', () => {
  it('기본은 냉수로 시작하며 지원하지 않는 항목을 기본 설명으로 바꾸지 않는다', () => {
    expect(getTechnologyPart(technology, null)?.id).toBe('cold');
    expect(getTechnologyPart(technology, 'unknown')).toBeUndefined();
    expect(getTechnologyPart(technology, '')).toBeUndefined();
    expect(getTechnologyPart(technology, '__proto__')).toBeUndefined();
  });
  it.each(technology.parts)('$id의 주소가 같은 항목으로 복원된다', (part) => {
    const url = new URL(purifierTechnologyHref(technology, part.id), 'https://salimlab.kr');
    expect(url.pathname).toBe(`/products/${technology.slug}`);
    expect(url.hash).toBe('#technology-map');
    expect(getTechnologyPart(technology, url.searchParams.get('tech'))?.id).toBe(part.id);
    expect([...url.searchParams.keys()]).toEqual(['tech']);
  });
  it('관리 카드에 확인 상태와 원문·한계·최신 주소를 포함한다', () => {
    const record = purifierCareRecord(technology, 'hot', ['filters']);
    expect(record).toContain('선택 항목: 온수');
    expect(record).toContain('2,950W');
    expect(record).toContain('12.17kWh/월');
    expect(record).toContain('[내역 확인함] 나노트랩 필터 세트');
    expect(record).toContain('[확인 필요] 물받이');
    expect(record).toContain('세척·교체 완료나 수질 판정이 아닙니다');
    expect(record).toContain('tech=hot#technology-map');
    for (const source of technology.sources) expect(record).toContain(source.url);
    expect(record).not.toContain('전기요금 12.17');
  });
  it('선택 항목이 없어도 특정 기능을 몰래 선택하지 않고 공통 관리 카드를 만든다', () => {
    const record = purifierCareRecord(technology, null, []);
    expect(record).not.toContain('선택 항목:');
    expect(record).toContain('[확인 필요] 출수구');
  });
  it('정적 HTML에 기본 설명·관리 주기와 원문을 포함하고 자가 교체 전원 조건을 뭉개지 않는다', () => {
    const html = renderToStaticMarkup(createElement(PurifierTechnology, { technology }));
    expect(html).toContain('냉수 1L는 한 번에 받는 양과 다를 수');
    expect(html).toContain('예상 4개월 · 하루 10L 기준');
    expect(html).toContain('전원 처리 조건이 다릅니다');
    expect(html).toContain('fmanual/download/274#page=30');
    expect(html).toContain('aria-pressed="true"');
  });
  it('기술 지도는 정확 모델의 상세 근거 절에만 렌더한다', () => {
    const included = renderToStaticMarkup(createElement(PerformanceSection, { appliance: getApplianceBySlug(technology.slug)! }));
    const excluded = renderToStaticMarkup(createElement(PerformanceSection, { appliance: { ...getApplianceBySlug('lg-dios-obje-sxs-s834')!, modelNumber: 'UNSUPPORTED-MODEL' } }));
    expect(included).toContain('id="technology-map"');
    expect(excluded).not.toContain('id="technology-map"');
  });
});
