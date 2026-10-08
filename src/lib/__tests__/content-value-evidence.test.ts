import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { getApplianceBySlug } from '@/lib/data/appliances';
import { getProductEditorial } from '@/lib/data/editorial';
import { fridgeMonthlyKwhMeasurement } from '@/lib/data/blog/posts/fridge-monthly-kwh-measurement';

type Claim = {
  claimId: string;
  productSlugs: string[];
  sourceUrl: string;
  calculationInputs: Record<string, number> | null;
  result: number | null;
  limitations: string;
  testConditions: string;
};
const claims: Claim[] = readFileSync(
  join(process.cwd(), 'research/evidence/content-value-2026-10-08/claims.jsonl'),
  'utf8',
).trim().split('\n').map((line) => JSON.parse(line));

// 자료집의 모델 귀속과 계산을 검사한다. 문장 표현을 고정하지 않는다.
describe('2026-10-08 콘텐츠 근거 연결', () => {
  it.each(claims)('$claimId: 정확한 공개 모델과 원문 출처가 연결된다', (claim) => {
    expect(claim.productSlugs.length).toBeGreaterThan(0);
    for (const slug of claim.productSlugs) expect(getApplianceBySlug(slug), slug).toBeDefined();
    expect(claim.productSlugs.some((slug) =>
      getProductEditorial(slug)?.sources.some((source) => source.url === claim.sourceUrl),
    ), `${claim.claimId}: 해당 모델 근거에 원문이 없음`).toBe(true);
    expect(claim.limitations.length).toBeGreaterThan(0);
  });

  const calculations: Record<string, (v: Record<string, number>) => number> = {
    'wd25-load-gap': (v) => v.washKg - v.dryKg,
    'xiaomi-cadr-volume': (v) => v.areaM2 * v.heightM / v.cadrM3H * 60,
    'winix-tank-ratio': (v) => v.litersPerDay / v.tankL,
    'rf85-t873-label-gap': (v) => (v.t873Monthly - v.rf85Monthly) * v.months,
  };
  it.each(Object.entries(calculations))('%s: 입력 단위로 계산 결과를 재현한다', (id, calculate) => {
    const claim = claims.find((item) => item.claimId === id)!;
    expect(claim.calculationInputs).not.toBeNull();
    expect(calculate(claim.calculationInputs!)).toBeCloseTo(claim.result!, 8);
  });
});


describe('페르소나 검수 교정 회귀', () => {
  it('냉장고 라벨의 월 환산과 하루 역산은 서로 다른 단위를 사용한다', () => {
    const rows = fridgeMonthlyKwhMeasurement.comparison!.rows;
    const monthly = rows.find((row) => row.label === '월간 소비전력량(라벨)')!;
    const unadjusted = rows.find((row) => row.label === '시험실 하루치로 되돌린 월 환산')!;
    monthly.values.forEach((value, index) => {
      const labelKwh = parseFloat(value);
      const displayedMonthKwh = parseFloat(unadjusted.values[index].replace('약 ', ''));
      expect(displayedMonthKwh).toBeCloseTo(labelKwh / 1.6, 1);
    });
    const answer = fridgeMonthlyKwhMeasurement.answer.join(' ');
    const dailyKwh = Number(answer.match(/([\d.]+)kWh\/일/)?.[1]);
    expect(dailyKwh).toBeCloseTo(parseFloat(monthly.values[0]) / 1.6 * 12 / 365, 3);
    expect(dailyKwh * 365 / 12 * 1.6).toBeCloseTo(parseFloat(monthly.values[0]), 1);
  });

  it('적용면적 근거가 없는 DN2H160-IWK에 임의 평수 등급을 부여하지 않는다', () => {
    const roomFit = getApplianceBySlug('winix-posong-dehumidifier-16l')!.roomFit!;
    expect(roomFit.coverageArea).toBeUndefined();
    expect(roomFit.recommendedSize).toEqual([]);
    expect(roomFit.installationType).toBe('이동식');
  });
});
