import { describe, it, expect } from 'vitest';
import { getBrandCopy } from '@/lib/brand-copy';
import { isNonApplianceBrand } from '@/lib/brand-stats';
import { allAppliances, getAllBrands } from '@/lib/data/appliances';

describe('getBrandCopy', () => {
  it('가전 브랜드는 "가전"을 쓴다', () => {
    const copy = getBrandCopy('LG');
    expect(copy.noun).toBe('가전');
    expect(copy.title).toBe('LG 가전 전체 — 스펙·가격 비교');
  });

  it('비가전 브랜드는 "제품"을 쓴다', () => {
    const copy = getBrandCopy('QCY');
    expect(copy.noun).toBe('제품');
    // 2026-10-11 5차: QCY는 공개 제품이 1개라 '전체 — 비교' 제목을 쓰지 않는다(아래 검사)
    expect(copy.title).not.toContain('가전');
  });

  // 2026-10-11 5차: 제품 1개짜리 브랜드 허브가 '전체'·'비교'를 약속했다(코웨이, P8).
  // 브랜드 목록을 하드코딩하지 않는다 — 공개 제품 수로 판정한다.
  it('공개 제품이 1개인 브랜드의 제목은 "전체"·"비교"를 약속하지 않는다', () => {
    const single = getAllBrands().filter(
      (b) => allAppliances.filter((a) => a.brand === b).length === 1,
    );
    expect(single.length, '제품 1개 브랜드가 없다 — 검사가 무의미해진다').toBeGreaterThan(0);
    for (const brand of single) {
      const { title } = getBrandCopy(brand);
      expect(title, brand).not.toMatch(/전체|비교/);
      // 가격을 확인하지 못한 제품이면 제목에 '가격'도 없다
      const item = allAppliances.find((a) => a.brand === brand)!;
      if (item.price == null) expect(title, brand).not.toContain('가격');
    }
  });

  it('BRAND_LABELS의 한글 표기를 쓴다', () => {
    expect(getBrandCopy('Samsung').label).toBe('삼성');
    expect(getBrandCopy('Apple').label).toBe('애플');
  });

  it('레이블이 없는 브랜드는 키를 그대로 쓴다', () => {
    expect(getBrandCopy('없는브랜드').label).toBe('없는브랜드');
  });

  // 브랜드 목록을 하드코딩하지 않는다. 나중에 비가전 브랜드가 추가돼도 저절로 걸린다.
  it('비가전 전용 브랜드의 문구에 "가전"이 없다', () => {
    const nonAppliance = getAllBrands().filter(isNonApplianceBrand);
    expect(nonAppliance.length, '비가전 전용 브랜드가 하나도 없다 — 검사가 무의미해진다').toBeGreaterThan(0);

    for (const brand of nonAppliance) {
      const copy = getBrandCopy(brand);
      expect(copy.title, `${brand} title`).not.toContain('가전');
      expect(copy.description, `${brand} description`).not.toContain('가전');
    }
  });
});
