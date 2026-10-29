import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { getAllBrands } from '@/lib/data/appliances';
import { getErrorCodeBrands } from '@/lib/error-codes';

const rules = readFileSync('public/_redirects', 'utf8').split('\n')
  .map((line) => line.trim()).filter((line) => line && !line.startsWith('#'))
  .map((line) => line.split(/\s+/));

describe('없앤 오류 허브의 이동', () => {
  const removed = ['Coway', 'Dyson', 'Winix', 'Xiaomi'];

  it('코드표가 없어 허브를 만들지 않는 브랜드만 브랜드 페이지로 보낸다', () => {
    for (const brand of removed) {
      expect(getErrorCodeBrands()).not.toContain(brand);
      expect(getAllBrands()).toContain(brand);
      for (const from of [`/error-codes/${brand}`, `/error-codes/${brand}/`]) {
        expect(rules.find(([source]) => source === from), from).toEqual([from, `/brand/${brand}`, '301']);
      }
    }
  });

  it('살아 있는 오류 허브는 이동 규칙에 걸리지 않는다', () => {
    const sources = new Set(rules.map(([source]) => source));
    for (const brand of getErrorCodeBrands()) expect(sources.has(`/error-codes/${brand}`)).toBe(false);
  });

  it('구체적인 이동 규칙이 패턴 규칙보다 먼저 온다', () => {
    const firstPattern = rules.findIndex(([source]) => source.includes(':'));
    const lastRemoved = Math.max(...removed.map((brand) => rules.findIndex(([source]) => source === `/error-codes/${brand}/`)));
    expect(lastRemoved).toBeLessThan(firstPattern);
  });
});
