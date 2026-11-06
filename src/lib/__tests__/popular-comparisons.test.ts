import { describe, it, expect } from 'vitest';
import { getPopularComparisons, COMPARISON_STARTS } from '@/lib/popular-comparisons';
import { getCardAppliances, getAllCategories } from '@/lib/data/appliances';

const cards = getCardAppliances();

describe('구매 질문에 맞춘 비교 조합', () => {
  it('목록 순서가 바뀌어도 선정 모델과 이유가 바뀌지 않는다', () => {
    const categories = getAllCategories();
    expect(getPopularComparisons([...cards].reverse(), categories)).toEqual(getPopularComparisons(cards, categories));
    const fridge = getPopularComparisons(cards, ['냉장고'])[0];
    expect(fridge.items.map((item) => item.slug)).toEqual(['samsung-bespoke-4door-rf85', 'lg-dios-obje-4door-t873']);
    expect(fridge.purpose).toContain('냉동칸');
    expect(fridge.basis).toContain('구성');
  });

  it('선정한 두 모델 중 하나가 없으면 다른 모델로 대신 채우지 않는다', () => {
    const incomplete = cards.filter((item) => item.slug !== 'samsung-bespoke-4door-rf85');
    expect(incomplete.filter((item) => item.category === '냉장고').length).toBeGreaterThan(1);
    expect(getPopularComparisons(incomplete, ['냉장고'])).toEqual([]);
  });

  it('용량·방식이 다른 세탁기와 식기세척기는 사용 방식 비교임을 밝힌다', () => {
    const comparisons = getPopularComparisons(cards, ['세탁기', '식기세척기']);
    expect(comparisons).toHaveLength(2);
    for (const comparison of comparisons) {
      expect(comparison.kind).toBe('사용 방식 비교');
      expect(comparison.basis).toMatch(/같은.*(성능|세척력)/);
    }
  });

  it('모든 선정 모델은 같은 공개 품목에 존재하고 구매 질문과 한계가 있다', () => {
    expect(new Set(COMPARISON_STARTS.map((entry) => entry.category)).size).toBe(COMPARISON_STARTS.length);
    for (const start of COMPARISON_STARTS) {
      expect(start.slugs[0]).not.toBe(start.slugs[1]);
      for (const slug of start.slugs) expect(cards.find((item) => item.slug === slug)?.category, slug).toBe(start.category);
      expect(start.purpose.length).toBeGreaterThan(10);
      expect(start.basis.length).toBeGreaterThan(30);
    }
  });

  it('요청한 품목 순서를 유지하고 선정하지 않은 품목은 건너뛴다', () => {
    expect(getPopularComparisons(cards, ['건조기', '냉장고', '세탁기']).map((entry) => entry.category)).toEqual(['냉장고', '세탁기']);
    expect(getPopularComparisons([], getAllCategories())).toEqual([]);
  });
});
