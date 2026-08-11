import { describe, it, expect } from 'vitest';
import {
  SECTION_SLOTS,
  getSectionSlots,
  liftExtraSpecs,
  isTraditionalAppliance,
} from '@/lib/category-config';
import { allAppliances } from '@/lib/data/appliances';
import type { ApplianceCategory, ExtraSpec } from '@/types/appliance';

const SPECS: ExtraSpec[] = [
  { label: '해상도', value: 'QHD' },
  { label: '주사율', value: '60Hz' },
  { label: '특징', value: '회전' },
];

describe('liftExtraSpecs', () => {
  it('liftLabels 순서대로 뽑는다 (원본 순서가 아니라)', () => {
    expect(liftExtraSpecs(SPECS, ['특징', '해상도']).map((s) => s.label)).toEqual([
      '특징',
      '해상도',
    ]);
  });

  it('매칭되지 않는 라벨은 건너뛴다', () => {
    expect(liftExtraSpecs(SPECS, ['없는라벨', '주사율']).map((s) => s.label)).toEqual(['주사율']);
  });

  it('extraSpecs가 없으면 빈 배열', () => {
    expect(liftExtraSpecs(undefined, ['해상도'])).toEqual([]);
  });

  it('liftLabels가 없으면 빈 배열', () => {
    expect(liftExtraSpecs(SPECS, undefined)).toEqual([]);
  });

  // 새 데이터를 만들어내지 않는다 — 반환값은 항상 원본의 부분집합이다.
  it('반환 항목은 전부 원본에 존재한다', () => {
    for (const s of liftExtraSpecs(SPECS, ['특징', '주사율', '해상도'])) {
      expect(SPECS).toContainEqual(s);
    }
  });
});

describe('SECTION_SLOTS', () => {
  const categories = Object.keys(SECTION_SLOTS) as ApplianceCategory[];

  it('12개 카테고리를 모두 선언한다', () => {
    expect(categories).toHaveLength(12);
  });

  it('모든 슬롯에 title과 tocLabel이 있다', () => {
    for (const c of categories) {
      for (const slot of ['fit', 'value', 'risk'] as const) {
        expect(getSectionSlots(c)[slot].title.length).toBeGreaterThan(0);
        expect(getSectionSlots(c)[slot].tocLabel.length).toBeGreaterThan(0);
      }
    }
  });

  it('생활가전은 liftLabels를 쓰지 않는다 (전용 컴포넌트가 렌더한다)', () => {
    for (const c of categories.filter(isTraditionalAppliance)) {
      const s = getSectionSlots(c);
      expect(s.fit.liftLabels).toBeUndefined();
      expect(s.risk.liftLabels).toBeUndefined();
    }
  });
});

// 화이트리스트는 문자열 매칭이라 라벨 오타·표기 변경에 취약하다.
// 실제 제품 데이터로 검증해 조용한 누락을 잡는다.
describe('비가전 화이트리스트가 실제 데이터와 맞는다', () => {
  const nonTraditional = allAppliances.filter((a) => !isTraditionalAppliance(a.category));

  it('대상 제품이 9개다', () => {
    expect(nonTraditional).toHaveLength(9);
  });

  it.each(nonTraditional.map((a) => [a.slug, a] as const))(
    '%s: fit·risk 슬롯이 각각 3개 이상 채워진다',
    (_slug, a) => {
      const slots = getSectionSlots(a.category);
      const specs = a.techSpecs.extraSpecs;
      expect(liftExtraSpecs(specs, slots.fit.liftLabels).length).toBeGreaterThanOrEqual(3);
      expect(liftExtraSpecs(specs, slots.risk.liftLabels).length).toBeGreaterThanOrEqual(3);
    },
  );
});

// >= 3 임계값에는 여유가 있어 라벨 하나가 오타나도 통과할 수 있다.
// 선언된 라벨이 전부 실재하는지를 여유 없이 검사해 오타를 확실히 잡는다.
describe('선언된 liftLabels가 전부 실재하는 라벨이다', () => {
  const nonTraditional = allAppliances.filter((a) => !isTraditionalAppliance(a.category));
  const categories = [...new Set(nonTraditional.map((a) => a.category))];

  const cases = categories.flatMap((category) => {
    const slots = getSectionSlots(category);
    return (['fit', 'risk'] as const).flatMap((slot) =>
      (slots[slot].liftLabels ?? []).map((label) => [category, slot, label] as const),
    );
  });

  it('검사 대상 라벨이 하나 이상 있다', () => {
    expect(cases.length).toBeGreaterThan(0);
  });

  it.each(cases)('%s의 %s 슬롯 라벨 "%s"이 실제 제품에 존재한다', (category, _slot, label) => {
    const found = nonTraditional
      .filter((a) => a.category === category)
      .some((a) => (a.techSpecs.extraSpecs ?? []).some((s) => s.label === label));
    expect(found).toBe(true);
  });
});
