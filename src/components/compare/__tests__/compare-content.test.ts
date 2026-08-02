import { describe, it, expect } from 'vitest';
import { parseSelectedParam } from '../compare-content';
import type { CardAppliance } from '@/types/appliance';

const item = (slug: string, id: string): CardAppliance =>
  ({ slug, id, name: slug, brand: 'LG', category: '에어컨' }) as CardAppliance;

const ALL = [item('a', '1'), item('b', '2'), item('c', '3'), item('d', '4'), item('e', '5')];

describe('parseSelectedParam', () => {
  it('파라미터가 없으면 빈 목록', () => {
    expect(parseSelectedParam(null, ALL)).toEqual([]);
    expect(parseSelectedParam('', ALL)).toEqual([]);
  });

  it('슬러그 순서를 유지해 제품을 푼다', () => {
    expect(parseSelectedParam('b,a', ALL).map(a => a.slug)).toEqual(['b', 'a']);
  });

  it('최대 4개까지만 받는다', () => {
    expect(parseSelectedParam('a,b,c,d,e', ALL)).toHaveLength(4);
  });

  it('카탈로그에 없는 슬러그는 버린다', () => {
    expect(parseSelectedParam('a,nope,b', ALL).map(a => a.slug)).toEqual(['a', 'b']);
  });

  // ?items= 는 사용자가 조작할 수 있는 입력이라 형식 검증이 필요하다.
  it('슬러그 형식에 맞지 않는 값은 버린다', () => {
    expect(parseSelectedParam('<script>,a', ALL).map(a => a.slug)).toEqual(['a']);
    expect(parseSelectedParam('A,a', ALL).map(a => a.slug)).toEqual(['a']);
  });
});
