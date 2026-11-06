import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { getPurifierComparisonFacts } from '@/lib/purifier-comparison';
import { getApplianceBySlug, toCardAppliance } from '@/lib/data/appliances';
import { INSTALL_MODELS } from '@/lib/data/install-check';
import { PurifierComparison } from '@/components/compare/purifier-comparison';

const coway = 'coway-handpick-water-purifier-compact';
const lg = 'lg-puricare-water-purifier-objet';
const sk = 'skmagic-allin-water-purifier-wpu';

describe('정수기 일반 비교에 전달할 확인된 관리·설치 자료', () => {
  it('공개된 정확한 모델에 원래 주기와 사용량 조건을 함께 전달한다', () => {
    const facts = getPurifierComparisonFacts();
    expect(Object.keys(facts).sort()).toEqual([coway, lg, sk].sort());
    expect(facts[coway].modelNumber).toBe('CHPI-7400N');
    expect(facts[coway].filters.lines.join(' ')).toContain('예상 4개월 · 하루 10L 기준');
    expect(facts[coway].management.lines.join(' ')).toContain('고정 주기는 제시하지 않습니다');
    for (const filter of ['AGM30040101', 'AGM30063801']) {
      expect(facts[lg].filters.lines.join(' ')).toContain(filter);
    }
    expect(facts[lg].filters.lines.join(' ')).toContain('6개월 · 10 L/일');
    expect(facts[lg].filters.lines.join(' ')).toContain('12개월 · 10 L/일');
    expect(facts[sk].filters.lines.join(' ')).toContain('세디먼트 4개월');
    expect(facts[sk].management.lines.join(' ')).toContain('방문 주기는 확인 필요');
  });

  it('파생 모델·타 품목·slug가 어긋나면 자료를 빌려 쓰지 않는다', () => {
    const wrong = getPurifierComparisonFacts([
      { category: '정수기', slug: coway, modelNumber: 'CPI-7400N' },
      { category: '정수기', slug: 'different-slug', modelNumber: 'WD523ACB' },
      { category: '냉장고', slug: lg, modelNumber: 'WD523ACB' },
    ]);
    expect(Object.keys(wrong)).toEqual([coway, 'different-slug']);
    for (const product of Object.values(wrong)) {
      for (const key of ['management', 'filters', 'space', 'connections'] as const) {
        expect(product[key].lines.join(' ')).toContain('확인 필요');
        expect(product[key].sources).toEqual([]);
      }
    }
  });

  it('설치 원문의 면·조건 한계와 미확인 배수, 기존 확인일을 보존한다', () => {
    const facts = getPurifierComparisonFacts();
    expect(facts[coway].space.lines.join(' ')).toContain('240×473×465mm');
    expect(facts[coway].space.lines.join(' ')).toContain('좌우 수치는 이 절에만');
    expect(facts[lg].space.lines.join(' ')).toContain('천장');
    expect(facts[lg].connections.lines.join(' ')).toContain('이 모델에 하수구로 가는 배수 호스가 있는지는 확인하지 못했습니다');
    expect(facts[sk].connections.lines.join(' ')).toContain('확인 필요 · 배수');
    for (const model of INSTALL_MODELS.filter((entry) => entry.category === 'purifier')) {
      expect(facts[model.slug].space.sources).toContainEqual({ label: model.document, url: model.sourceUrl, checkedAt: model.checkedAt });
      const url = new URL(facts[model.slug].installHref, 'https://salimlab.kr');
      expect(url.searchParams.get('model')).toBe(model.model);
    }
    const serialized = JSON.parse(JSON.stringify(facts));
    expect(serialized).toEqual(facts);
    expect(JSON.stringify(facts)).not.toContain('monthlyWon');
    expect(JSON.stringify(facts)).not.toContain('sha256');
  });
});

describe('모바일과 데스크톱에서 같은 정수기 비교 근거', () => {
  it('두 모델의 모든 항목·근거·확인일을 두 레이아웃에 모두 제공한다', () => {
    const facts = getPurifierComparisonFacts();
    const appliances = [coway, lg].map((slug) => toCardAppliance(getApplianceBySlug(slug)!));
    const markup = renderToStaticMarkup(createElement(PurifierComparison, { appliances, facts }));
    for (const label of ['관리 방식', '필터 교체 주기', '본체 치수·주변 여유', '급수·배수·전원']) {
      expect(markup.split(label).length - 1).toBeGreaterThanOrEqual(3);
    }
    for (const slug of [coway, lg]) {
      for (const key of ['management', 'filters', 'space', 'connections'] as const) {
        for (const source of facts[slug][key].sources) {
          expect(markup).toContain(source.url.replaceAll('&', '&amp;'));
          expect(markup).toContain(`자료 확인 ${source.checkedAt}`);
        }
      }
    }
    expect(markup).toContain('md:hidden');
    expect(markup).toContain('hidden overflow-x-auto md:block');
    expect(markup).toContain('/tools/water-purifier-cost');
  });

  it('기존 다른 품목 비교에는 정수기 자료를 렌더하지 않는다', () => {
    const appliance = toCardAppliance(getApplianceBySlug('lg-dios-obje-sxs-s834')!);
    expect(renderToStaticMarkup(createElement(PurifierComparison, { appliances: [appliance], facts: getPurifierComparisonFacts() }))).toBe('');
  });
});
