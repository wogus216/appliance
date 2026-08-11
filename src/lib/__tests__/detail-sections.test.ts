import { describe, it, expect } from 'vitest';
import { buildProductToc } from '@/lib/detail-sections';
import { allAppliances, getApplianceBySlug } from '@/lib/data/appliances';
import type { Appliance } from '@/types/appliance';

const bySlug = (slug: string): Appliance => {
  const a = getApplianceBySlug(slug);
  if (!a) throw new Error(`fixture not found: ${slug}`);
  return a;
};

describe('buildProductToc', () => {
  // 가전은 purchaseLinks·errorCodes를 100% 보유하므로 조건부 항목이 둘 다 나온다.
  it('생활가전은 8개 항목을 고정 순서로 낸다', () => {
    const ids = buildProductToc(bySlug('samsung-bespoke-wind-free-af25a9970')).map((t) => t.id);
    expect(ids).toEqual([
      'verdict',
      'fit',
      'value',
      'risk',
      'performance',
      'user-reviews',
      'purchase',
      'errorcodes',
    ]);
  });

  // 비가전은 errorCodes가 없으므로 7개다.
  it('비가전은 errorcodes 없이 7개 항목을 낸다', () => {
    const ids = buildProductToc(bySlug('sony-wf-1000xm5')).map((t) => t.id);
    expect(ids).toEqual([
      'verdict',
      'fit',
      'value',
      'risk',
      'performance',
      'user-reviews',
      'purchase',
    ]);
  });

  it('항상 verdict로 시작하고 고정 순서를 지킨다', () => {
    for (const a of allAppliances) {
      const ids = buildProductToc(a).map((t) => t.id);
      expect(ids[0]).toBe('verdict');

      const ORDER = [
        'verdict',
        'fit',
        'value',
        'risk',
        'performance',
        'user-reviews',
        'purchase',
        'errorcodes',
      ];
      // 실제 id들이 ORDER의 부분수열이어야 한다 (조건부 항목이 빠질 수는 있어도 순서는 불변)
      const positions = ids.map((id) => ORDER.indexOf(id));
      expect(positions).not.toContain(-1);
      expect([...positions].sort((x, y) => x - y)).toEqual(positions);
    }
  });

  it('에러코드가 있는 제품만 errorcodes 항목을 갖는다', () => {
    for (const a of allAppliances) {
      const has = buildProductToc(a).some((t) => t.id === 'errorcodes');
      expect(has).toBe(!!a.errorCodes?.length);
    }
  });

  it('구매처가 있는 제품만 purchase 항목을 갖는다', () => {
    for (const a of allAppliances) {
      const has = buildProductToc(a).some((t) => t.id === 'purchase');
      expect(has).toBe(!!a.purchaseLinks?.length);
    }
  });

  it('슬롯 라벨이 카테고리별로 달라진다', () => {
    const label = (a: Appliance, id: string) =>
      buildProductToc(a).find((t) => t.id === id)?.label;

    expect(label(bySlug('sony-wf-1000xm5'), 'fit')).toBe('호환성');
    expect(label(bySlug('samsung-the-movingstyle'), 'fit')).toBe('설치');
    expect(label(bySlug('samsung-bespoke-wind-free-af25a9970'), 'fit')).toBe('적합성');
  });

  it('모든 라벨이 비어 있지 않다', () => {
    for (const a of allAppliances) {
      for (const t of buildProductToc(a)) {
        expect(t.label.length).toBeGreaterThan(0);
      }
    }
  });
});
