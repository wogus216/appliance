import { describe, expect, it } from 'vitest';
import { WATER_PURIFIER_COST_CHECKED_AT, WATER_PURIFIER_MODELS } from '@/lib/data/water-purifier-cost';
import {
  calculatePenalty, comparePaths, priceRecheckNeeded, promotionRentalPath, purchasePath, rentalPath, replacementsWithin, waterPurifierCostRecord,
  type PurifierCostModel, type Valued,
} from '@/lib/water-purifier-cost';

const model = (modelNumber: string) => {
  const found = WATER_PURIFIER_MODELS.find((entry) => entry.modelNumber === modelNumber);
  if (!found?.available) throw new Error(modelNumber);
  return found;
};
const coway = model('CHPI-7400N');
const lg = model('WD523ACB');
const plan = (m: PurifierCostModel, id: string) => m.rental.plans.find((entry) => entry.id === id)!;
const official = (value: number): Valued => ({ value, kind: 'official' });

describe('공식 가격표와 같은 합계', () => {
  // rental.json totalsIncludingRegistrationFee: 가격표 '렌탈료 총액(렌탈등록비 10만원 포함 기준)'
  const officialTotals: [string, number, number][] = [
    ['visit2-y3', 36, 2_256_400], ['visit2-y3', 60, 3_694_000], ['visit2-y5', 60, 3_484_000], ['visit2-y6', 72, 4_052_800], ['visit2-y7', 84, 4_585_600],
    ['visit4-y3', 36, 2_148_400], ['visit4-y3', 60, 3_514_000], ['visit4-y5', 60, 3_304_000], ['visit4-y6', 72, 3_836_800], ['visit4-y7', 84, 4_333_600],
  ];
  it.each(officialTotals)('코웨이 %s %i개월 = %i원', (id, months, total) => {
    const result = rentalPath(coway, { monthly: official(plan(coway, id).monthlyWon), registration: official(100_000) }, months);
    expect(result.totalWon).toBe(total);
    expect(result.partial).toBe(false);
  });

  it('3년 약정은 의무사용 36개월, 소유권 이전 60개월이다', () => {
    expect(plan(coway, 'visit4-y3')).toMatchObject({ obligationMonths: 36, contractMonths: 60 });
    expect(plan(coway, 'visit4-y7')).toMatchObject({ obligationMonths: 84, contractMonths: 84 });
  });
});

describe('프로모션은 기본값과 섞지 않는다', () => {
  it('기본 계획의 월 요금은 가격표 값이고 프로모션 표시가 없다', () => {
    const result = rentalPath(coway, { monthly: official(plan(coway, 'visit4-y7').monthlyWon), registration: official(100_000) }, 84);
    expect(plan(coway, 'visit4-y7').monthlyWon).toBe(50_400);
    expect(result.lines.every((line) => !line.promotion)).toBe(true);
  });

  it('프로모션 합계는 공식몰 화면의 총합과 같고 모든 줄에 프로모션 표시가 붙는다', () => {
    for (const entry of coway.rental.plans) {
      const promo = promotionRentalPath(coway, entry, entry.contractMonths)!;
      expect(promo.lines.every((line) => line.promotion)).toBe(true);
      expect(entry.promotion!.shownTotal).toContain(`${promo.totalWon.toLocaleString('ko-KR')}원`);
    }
    const threeYear = plan(coway, 'visit4-y3');
    expect(promotionRentalPath(coway, threeYear, 36)!.totalWon).toBe(1_790_550);
  });

  it('LG는 렌탈 프로모션이 없고 최대혜택가는 구매가 기본값이 아니다', () => {
    expect(promotionRentalPath(lg, plan(lg, 'y6-self'), 72)).toBeUndefined();
    expect(lg.purchase.listWon).toBe(1_614_000);
    expect(lg.purchase.promotionWon).toBe(1_352_300);
  });
});

describe('부분 합계와 빠진 비용', () => {
  it('LG 등록비를 모르면 빼고 부분 합계로 표시하고, 계약서 값을 넣으면 더한다', () => {
    const missing = rentalPath(lg, { monthly: official(31_900), registration: null }, 72);
    expect(missing.totalWon).toBe(2_296_800);
    expect(missing.partial).toBe(true);
    expect(missing.missing.map((item) => item.label)).toEqual(['등록비']);
    const entered = rentalPath(lg, { monthly: official(31_900), registration: { value: 100_000, kind: 'entered' } }, 72);
    expect(entered.totalWon).toBe(2_396_800);
    expect(entered.partial).toBe(false);
    expect(entered.lines.find((line) => line.label === '등록비')?.kind).toBe('entered');
  });

  it('확인된 LG 필터 2종만 교체 횟수로 더한다', () => {
    const result = purchasePath(lg, { purchase: official(1_614_000), filters: [official(73_000), official(54_600)] }, 72, lg.purchase.listLabel);
    expect(result.totalWon).toBe(1_614_000 + 11 * 73_000 + 5 * 54_600);
    expect(result.partial).toBe(true);
  });

  it('코웨이 구매는 멤버십·필터 값을 몰라 부분 합계이고 비교도 확정이 아니다', () => {
    const purchase = purchasePath(coway, { purchase: official(2_380_000), filters: [] }, 84, coway.purchase.listLabel);
    expect(purchase.totalWon).toBe(2_380_000);
    expect(purchase.missing).toHaveLength(2);
    const rental = rentalPath(coway, { monthly: official(50_400), registration: official(100_000) }, 84);
    expect(comparePaths(rental, purchase)).toEqual({ months: 84, differenceWon: 4_333_600 - 2_380_000, comparable: false });
  });

  it('교체 횟수는 첫 설치 필터와 마지막 달 교체를 세지 않는다', () => {
    expect(replacementsWithin(72, 6)).toBe(11);
    expect(replacementsWithin(72, 12)).toBe(5);
    expect(replacementsWithin(6, 6)).toBe(0);
    expect(replacementsWithin(7, 6)).toBe(1);
    expect(replacementsWithin(0, 6)).toBe(0);
  });

  it('SK매직 WPU-A710C는 공식 조건이 없어 계산 대상이 아니다', () => {
    const sk = WATER_PURIFIER_MODELS.find((entry) => entry.modelNumber === 'WPU-A710C')!;
    expect(sk.available).toBe(false);
    expect('rental' in sk).toBe(false);
    expect('purchase' in sk).toBe(false);
  });
});

describe('중도해지 산식', () => {
  it('코웨이 약관: 잔여 일수 × 월렌탈료÷30 × 10%, 회수비는 금액 미확인', () => {
    const result = calculatePenalty(coway, { monthlyWon: 50_400, obligationMonths: 84, usedMonths: 18, contractMonths: 84 });
    expect(result.kind).toBe('ready');
    if (result.kind !== 'ready') return;
    expect(result.remainingDays).toBe(1_980);
    expect(result.maker.lines[0].won).toBe(332_640);
    expect(result.maker.partial).toBe(true);
    expect(result.maker.missing[0].label).toBe('회수비');
    expect(result.standard.won).toBe(332_640);
  });

  it('LG 공개 안내: 사용 기간 구간별 30·20·10% + 회수비 50,000원', () => {
    const at = (usedMonths: number) => calculatePenalty(lg, { monthlyWon: 31_900, obligationMonths: 36, usedMonths, contractMonths: 72 });
    const eighteen = at(18);
    if (eighteen.kind !== 'ready') throw new Error('not ready');
    expect(eighteen.ratePercent).toBe(20);
    expect(eighteen.maker.totalWon).toBe(18 * 31_900 * 0.2 + 50_000);
    expect(eighteen.maker.partial).toBe(false);
    expect(eighteen.standard.won).toBe(57_420);
    expect(at(11)).toMatchObject({ ratePercent: 30 });
    expect(at(12)).toMatchObject({ ratePercent: 20 });
    expect(at(24)).toMatchObject({ ratePercent: 10 });
  });

  it('의무사용기간이 지나면 산식을 쓰지 않고 회수비만 남긴다', () => {
    const result = calculatePenalty(lg, { monthlyWon: 31_900, obligationMonths: 36, usedMonths: 40, contractMonths: 72 });
    expect(result.kind).toBe('after-obligation');
    if (result.kind === 'after-obligation') expect(result.maker.totalWon).toBe(50_000);
  });

  it('의무사용기간 1년 이하는 고시의 적은 금액 규칙을 쓴다', () => {
    const result = calculatePenalty(coway, { monthlyWon: 50_000, obligationMonths: 12, usedMonths: 2, contractMonths: 12 });
    if (result.kind !== 'ready') throw new Error('not ready');
    expect(result.standard.won).toBe(Math.min(10 * 50_000 * 0.3, 12 * 50_000 * 0.1));
  });

  it('의무사용기간이 계약기간보다 길면 계산하지 않는다', () => {
    expect(calculatePenalty(coway, { monthlyWon: 50_400, obligationMonths: 90, usedMonths: 1, contractMonths: 84 }).kind).toBe('invalid');
  });
});

describe('가격 재확인 경고', () => {
  it('확인일로부터 90일까지는 경고하지 않고 91일째부터 경고한다', () => {
    expect(WATER_PURIFIER_COST_CHECKED_AT).toBe('2026-10-29');
    expect(priceRecheckNeeded('2026-10-29', '2026-10-29')).toBe(false);
    expect(priceRecheckNeeded('2026-10-29', '2027-01-27')).toBe(false);
    expect(priceRecheckNeeded('2026-10-29', '2027-01-28')).toBe(true);
  });
  it('날짜를 읽지 못하면 재확인이 필요하다고 본다', () => {
    expect(priceRecheckNeeded('2026-13-01', '2027-01-01')).toBe(true);
  });
});

describe('복사·인쇄 기록', () => {
  it('값 종류·프로모션·부분 합계·기록일·재확인 경고를 남긴다', () => {
    const entry = plan(coway, 'visit4-y7');
    const values = { monthly: official(50_400), registration: official(100_000), contract: official(84), obligation: official(84), purchase: official(2_380_000), filters: [] };
    const rental = rentalPath(coway, values, 84);
    const purchase = purchasePath(coway, values, 84, coway.purchase.listLabel);
    const record = waterPurifierCostRecord({
      model: coway, plan: entry, values, purchaseLabel: coway.purchase.listLabel, rental, purchase,
      promotions: [{ title: '렌탈 84개월', result: promotionRentalPath(coway, entry, 84)! }],
      penalty: { usedMonths: 18, result: calculatePenalty(coway, { monthlyWon: 50_400, obligationMonths: 84, usedMonths: 18, contractMonths: 84 }) },
      checkedAt: '2026-10-29', recheck: true, recordedAt: '2027-02-01',
    });
    expect(record).toContain('기록일: 2027-02-01');
    expect(record).toContain('가격 재확인 필요');
    expect(record).toContain('[공식 자료] 월 렌탈료: 50,400원');
    expect(record).toContain('[계산값] 4,333,600원');
    expect(record).toContain('(부분 합계)');
    expect(record).toContain('[확인 필요] 빠진 비용');
    expect(record).toContain('[공식 자료][프로모션]');
    expect(record).toContain('[사용자 입력] 사용 18개월');
    expect(record).toContain('1372소비자상담센터');
  });
});
