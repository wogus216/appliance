import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { allAppliances } from '@/lib/data/appliances';
import { getProductEditorial } from '@/lib/data/editorial';
import { getProductReadingScope, getProductSourceChecks } from '@/lib/product-evidence';
import { EditorialMetaSection } from '@/components/detail/editorial-meta-section';
import { VerdictSection } from '@/components/detail/verdict-section';
import { ValueSection } from '@/components/detail/value-section';
import { bespokeRf85VsDiosT873 } from '@/lib/data/blog/posts/bespoke-rf85-vs-dios-t873';

describe('판단 범위와 날짜를 구분한다', () => {
  it('부분 자료 확인일과 편집일을 구분하고 가격·본문 검수일을 새로 만들지 않는다', () => {
    const meta = getProductEditorial('lg-dios-obje-4door-t873')!;
    const checks = getProductSourceChecks('T873MEE111');
    expect(checks.some((check) => check.label.startsWith('기술·관리') && check.checkedAt === '2026-10-28')).toBe(true);
    expect(checks.some((check) => check.label === '공단 월간 전기사용량' && check.checkedAt === '2026-10-27')).toBe(true);
    expect(checks.every((check) => check.href.startsWith('https://'))).toBe(true);
    const html = renderToStaticMarkup(createElement(EditorialMetaSection, { meta, sourceChecks: checks, contentChangedAt: '2026-11-01' }));
    for (const text of ['본문 검수 기록', '문서 편집일', '부분 자료 최근 확인', '2026-10-12', '2026-10-28', '2026-11-01']) expect(html).toContain(text);
    expect(meta.updatedAt).toBe('2026-10-12');
    expect(meta.priceCheckedAt).toBe('2026-10-12');
    expect(getProductSourceChecks('NOT-A-MODEL')).toEqual([]);
  });

  it('공개 제품 모두 결론에서 판단 범위와 실측이 더 필요한 질문을 보여 준다', () => {
    for (const appliance of allAppliances) {
      const scope = getProductReadingScope(appliance);
      expect(scope.canJudge.length, appliance.slug).toBeGreaterThanOrEqual(2);
      expect(scope.needsChecking.length, appliance.slug).toBeGreaterThanOrEqual(2);
      const html = renderToStaticMarkup(createElement(VerdictSection, { appliance }));
      expect(html).toContain('직접 사용·측정한 평가가 아닙니다');
      expect(html).toContain('href="#sources"');
      for (const text of [...scope.canJudge, ...scope.needsChecking]) expect(html).toContain(text);
    }
    expect(getProductReadingScope({ category: '냉장고', modelNumber: 'T873MEE111' }).canJudge.join(' ')).toContain('노크온');
    expect(getProductReadingScope({ category: '세탁기', modelNumber: 'WF24A9500KE' }).canJudge.join(' ')).toContain('AI맞춤세탁 9kg');
  });

  it('다른 색상·구성의 가격 차이를 같은 조건의 차액으로 내지 않는다', () => {
    const appliance = allAppliances.find((entry) => entry.slug === 'lg-dios-obje-4door-t873')!;
    const html = renderToStaticMarkup(createElement(ValueSection, { appliance }));
    expect(html).toContain('색상·구성 조건을 맞춘 견적으로 다시 비교');
    expect(html).not.toContain('1,055,690');
    expect(bespokeRf85VsDiosT873.title).not.toMatch(/100만원|5L 차이/);
    expect(bespokeRf85VsDiosT873.answer.join(' ')).toContain('패널 구성이 같은 조건');
    expect(bespokeRf85VsDiosT873.priceCheckedAt).toBe('2026-10-12');
  });
});
