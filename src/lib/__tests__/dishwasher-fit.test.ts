import { describe, expect, it } from 'vitest';
import { checkDishwasherFit, dishwasherFitRecord, DISHWASHER_FIT_PRODUCTS, EMPTY_DISHWASHER_FIT_INPUTS } from '@/lib/dishwasher-fit';
import { getApplianceBySlug } from '@/lib/data/appliances';

describe('식기세척기 설치 자료', () => {
  it('정확한 공개 모델 두 개와 본체 치수를 사용한다', () => {
    expect(DISHWASHER_FIT_PRODUCTS).toHaveLength(2);
    for (const product of DISHWASHER_FIT_PRODUCTS) {
      const catalog = getApplianceBySlug(product.slug);
      expect(catalog?.modelNumber).toBe(product.model);
      expect(catalog?.techSpecs.dimensions).toContain(String(product.width));
      expect(product.sourceUrl).toMatch(/^https:\/\//);
    }
  });

  it('쿠쿠 모델의 문 개방 깊이 부족과 미측정을 구별한다', () => {
    const cuckoo = DISHWASHER_FIT_PRODUCTS[0];
    expect(checkDishwasherFit(cuckoo, EMPTY_DISHWASHER_FIT_INPUTS)[3].kind).toBe('unknown');
    const checks = checkDishwasherFit(cuckoo, { ...EMPTY_DISHWASHER_FIT_INPUTS, width: '550', openDepth: '800' });
    expect(checks[0].kind).toBe('measured');
    expect(checks[3]).toMatchObject({ kind: 'short', message: expect.stringContaining('12mm 부족') });
  });

  it('SK매직 모델의 미확인 문 개방 깊이는 입력해도 판정하지 않는다', () => {
    const sk = DISHWASHER_FIT_PRODUCTS[1];
    const check = checkDishwasherFit(sk, { ...EMPTY_DISHWASHER_FIT_INPUTS, openDepth: '1000' })[3];
    expect(check.kind).toBe('manual');
    expect(check.message).toContain('확인하지 못했습니다');
  });

  it('설치 조건을 공식 자료와 확인 필요로 나누고 미확인 수치를 만들지 않는다', () => {
    for (const product of DISHWASHER_FIT_PRODUCTS) {
      const topics = product.conditions.map((condition) => condition.topic);
      for (const topic of ['급수', '배수', '전원']) expect(topics).toContain(topic);
      expect(product.conditions.find((c) => c.topic === '배수호스 길이·배수 높이')?.status).toBe('unverified');
      expect(product.conditions.every((c) => c.where.length > 0)).toBe(true);
      expect(product.checkedAt).toBe('2026-10-29');
    }
    const sk = DISHWASHER_FIT_PRODUCTS[1];
    expect(sk.openDepth).toBeUndefined();
    expect(sk.conditions.find((c) => c.topic === '문 개방 깊이')?.status).toBe('unverified');
    // 레벨러 40mm는 빌트인(B 계열) 설치 절의 문구라 프리스탠딩 모델의 확인된 조건으로 쓰지 않는다.
    expect(sk.conditions.filter((c) => c.status === 'confirmed').some((c) => c.text.includes('40mm'))).toBe(false);
  });

  it('기록은 입력 오류·실측·확인 필요를 구별한다', () => {
    const [cuckoo, sk] = DISHWASHER_FIT_PRODUCTS;
    const record = dishwasherFitRecord(cuckoo, { ...EMPTY_DISHWASHER_FIT_INPUTS, width: '55cm', depth: '600' }, ['급수 위치'], '2026-10-29');
    expect(record).toContain('설치 자리의 실제 폭: 입력 오류');
    expect(record).not.toContain('55cmmm');
    expect(record).toContain('설치 자리의 실제 깊이: [사용자 실측] 600mm — [계산값] 본체·문 치수보다 85mm 큼');
    expect(record).toContain('[확인 필요] 좌우·상부·후면 여유');
    expect(record).toContain('[공식 자료] 전원');
    expect(dishwasherFitRecord(sk, EMPTY_DISHWASHER_FIT_INPUTS, [])).toContain('뒷면부터 문 앞 장애물까지 거리: [확인 필요]');
  });
});
