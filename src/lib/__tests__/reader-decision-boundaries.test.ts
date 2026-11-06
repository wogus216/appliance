import { describe, expect, it } from 'vitest';
import { getBlogPost } from '@/lib/data/blog';
import { getApplianceBySlug } from '@/lib/data/appliances';
import { getCategoryGuide } from '@/lib/data/category-guides';

describe('본문을 고친 뒤에도 결정 카드와 요약에 남을 수 있는 잘못된 판단', () => {
  it('DV17 결정 카드도 단독 여유를 직렬 설치 범위로 사용하지 않는다', () => {
    const decisions = getBlogPost('washer-dryer-combo-vs-separate')!.decisionRules.map((r) => r.then).join(' ');
    expect(decisions).not.toContain('1,993~2,118mm');
    expect(decisions).toContain('2,118mm');
  });

  it('LG 총평은 첫 필터를 중복한 월 손익분기점을 구매 판단으로 쓰지 않는다', () => {
    expect(getApplianceBySlug('lg-puricare-water-purifier-objet')!.editorComment).not.toContain('36,900원');
  });

  it('이어폰 최대 재생값은 다른 모델의 비행 일정 보장이 되지 않는다', () => {
    const battery = getCategoryGuide('무선이어폰')!.sections.find((s) => s.heading.includes('배터리'))!.body;
    expect(battery).not.toContain('Buds3 Pro만');
    expect(battery).toMatch(/보장하지|보장은/);
  });

  it('정수기 목록 요약도 이제 계산하지 않는 월 환산액을 약속하지 않는다', () => {
    expect(getBlogPost('water-purifier-lg-vs-coway-vs-skmagic')!.description).not.toContain('월 환산액');
    expect(getCategoryGuide('정수기')!.intro).not.toContain('월 환산액');
  });

  it('냉장고 1,820mm 예시 자체에도 높이 기준점의 가정을 명시한다', () => {
    const body = getBlogPost('fridge-4door-vs-side-by-side')!.sections.flatMap((s) => s.body).find((p) => p.includes('1,820'))!;
    expect(body).toContain('가정');
  });
});
