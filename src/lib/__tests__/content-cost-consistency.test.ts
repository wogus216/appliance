import { describe, expect, it } from 'vitest';
import { getBlogPost } from '@/lib/data/blog';
import { WATER_PURIFIER_MODELS } from '@/lib/data/water-purifier-cost';
import { purchasePath, replacementsWithin } from '@/lib/water-purifier-cost';
import { renderToStaticMarkup } from 'react-dom/server';
import BlogPostPage from '@/app/blog/[slug]/page';

const content = (slug: string) => {
  const post = getBlogPost(slug)!;
  return [...post.answer, ...post.sections.flatMap((section) => section.body), ...post.decisionRules.map((rule) => rule.then)].join('\n');
};

describe('계약 해설과 비교 도구의 계산 기준', () => {
  it('새 글에는 작성일보다 앞선 전체 블로그 개편을 편집일로 붙이지 않는다', async () => {
    const markup = renderToStaticMarkup(await BlogPostPage({ params: Promise.resolve({ slug: 'water-purifier-contract-dates' }) }));
    expect(markup).not.toMatch(/문서 편집[^<]*<time[^>]*>2026-11-01/);
    expect(markup).toContain('최초 작성일');
    expect(markup).toContain('2026-11-02');
  });

  it('36개월 의무·60개월 소유권 사례의 납부 예시는 보관된 정확 모델 조건과 맞는다', () => {
    const model = WATER_PURIFIER_MODELS.find((entry) => entry.modelNumber === 'CHPI-7400N');
    if (!model?.available) throw new Error('model missing');
    const plan = model.rental.plans.find((entry) => entry.id === 'visit4-y3')!;
    expect(plan).toMatchObject({ obligationMonths: 36, contractMonths: 60 });
    const text = content('water-purifier-contract-dates');
    const fee = model.rental.registrationWon!;
    for (const value of [plan.monthlyWon * 36, plan.monthlyWon * 36 + fee, plan.monthlyWon * 24, plan.monthlyWon * 60 + fee]) {
      expect(text).toContain(`${value.toLocaleString('ko-KR')}원`);
    }
  });

  it('기존 비교 원고의 4년 구매 예시도 도구와 같은 교체 횟수·부분 합계를 쓴다', () => {
    const model = WATER_PURIFIER_MODELS.find((entry) => entry.modelNumber === 'WD523ACB');
    if (!model?.available) throw new Error('model missing');
    expect(replacementsWithin(48, 6)).toBe(7);
    expect(replacementsWithin(48, 12)).toBe(3);
    const result = purchasePath(model, { purchase: { value: model.purchase.listWon, kind: 'official' }, filters: model.purchase.filters.map((filter) => ({ value: filter.listWon, kind: 'official' })) }, 48, '할인 전 판매가');
    expect(result.totalWon).toBe(2_288_800);
    expect(result.partial).toBe(true);
    expect(content('water-purifier-lg-vs-coway-vs-skmagic')).toContain(`${result.totalWon.toLocaleString('ko-KR')}원`);
  });
});
