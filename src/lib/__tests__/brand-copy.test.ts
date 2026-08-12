import { describe, it, expect } from 'vitest';
import { getBrandCopy } from '@/lib/brand-copy';
import { isNonApplianceBrand } from '@/lib/brand-stats';
import { getAllBrands } from '@/lib/data/appliances';

describe('getBrandCopy', () => {
  it('가전 브랜드는 "가전"을 쓴다', () => {
    const copy = getBrandCopy('LG');
    expect(copy.noun).toBe('가전');
    expect(copy.title).toBe('LG 가전 전체 — 스펙·가격 비교');
  });

  it('비가전 브랜드는 "제품"을 쓴다', () => {
    const copy = getBrandCopy('QCY');
    expect(copy.noun).toBe('제품');
    expect(copy.title).toBe('QCY 제품 전체 — 스펙·가격 비교');
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
