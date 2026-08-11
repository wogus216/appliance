import { describe, it, expect } from 'vitest';
import { formatProductName } from '@/lib/utils';
import { allAppliances } from '@/lib/data/appliances';
import { BRAND_LABELS } from '@/lib/constants';

describe('formatProductName', () => {
  it('이름이 브랜드로 시작하면 브랜드를 덧붙이지 않는다', () => {
    expect(formatProductName('삼성', '삼성 더 무빙스타일')).toBe('삼성 더 무빙스타일');
    expect(formatProductName('LG', 'LG 스탠바이미 2')).toBe('LG 스탠바이미 2');
  });

  it('이름에 브랜드가 없으면 앞에 붙인다', () => {
    expect(formatProductName('삼성', '비스포크 윈드프리 AF25A9970')).toBe(
      '삼성 비스포크 윈드프리 AF25A9970',
    );
  });

  // 실제 데이터에는 두 형태가 섞여 있다(74개 중 29개가 브랜드로 시작).
  // 어느 쪽이든 브랜드가 두 번 나오지 않아야 한다.
  it('전 제품에서 브랜드가 연달아 두 번 나오지 않는다', () => {
    for (const a of allAppliances) {
      const brand = BRAND_LABELS[a.brand] || a.brand;
      const display = formatProductName(brand, a.name);
      expect({ slug: a.slug, doubled: display.startsWith(`${brand} ${brand}`) }).toEqual({
        slug: a.slug,
        doubled: false,
      });
    }
  });

  it('표기에 제품명이 항상 온전히 들어간다', () => {
    for (const a of allAppliances) {
      const brand = BRAND_LABELS[a.brand] || a.brand;
      expect(formatProductName(brand, a.name)).toContain(a.name);
    }
  });
});
