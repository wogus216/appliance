import { daysBetween } from '@/lib/iso-date';
import { valueTag, type ValueKind } from '@/lib/value-kind';

/** 확인일에서 이 날 수를 넘기면 화면과 기록에 '가격 재확인 필요'를 붙인다. */
export const PRICE_RECHECK_DAYS = 90;

export interface CostSource { label: string; url: string; checkedAt: string }
export interface MissingCost { label: string; reason: string }
export interface ConditionalCost { label: string; note: string }

export interface RentalPromotion {
  halfPriceMonths: number;
  halfPriceMonthlyWon: number;
  afterMonthlyWon: number;
  /** 화면에 함께 표시된 총합 문구. 계산을 원문과 대조하는 데 쓴다. */
  shownTotal: string;
}

export interface RentalPlan {
  id: string;
  label: string;
  monthlyWon: number;
  /** 소유권이 넘어오는 때까지의 총 계약기간. */
  contractMonths: number;
  /** 공개 화면에서 찾지 못하면 null — 사용자가 계약서 값을 넣어야 위약금을 계산한다. */
  obligationMonths: number | null;
  promotion?: RentalPromotion;
}

export interface PurifierFilter {
  id: string;
  name: string;
  partNumber: string;
  cycleMonths: number;
  cycleBasis: string;
  listWon: number;
  memberWon: number;
  source: CostSource;
}

export interface PenaltyRule {
  kind: 'daily-10' | 'tiered';
  formula: string;
  quote: string;
  source: CostSource;
  /** 금액까지 공개된 회수비. 금액이 없으면 null로 두고 빠진 비용으로 나열한다. */
  pickupFeeWon: number | null;
  extras: string[];
  caveat?: string;
}

export interface PurifierCostModel {
  available: true;
  modelNumber: string;
  brand: string;
  slug: string;
  rental: {
    word: '렌탈료' | '구독료';
    plans: RentalPlan[];
    registrationWon: number | null;
    registrationNote: string;
    registrationMissingReason?: string;
    monthlyNote: string;
    includedNote: string;
    ownershipNote: string;
    conditional: ConditionalCost[];
    sources: CostSource[];
  };
  purchase: {
    listWon: number;
    listLabel: string;
    memberWon?: number;
    memberLabel?: string;
    promotionWon?: number;
    promotionLabel?: string;
    note: string;
    filters: PurifierFilter[];
    missing: MissingCost[];
    sources: CostSource[];
  };
  penalty: PenaltyRule;
}

export interface UnavailablePurifierModel {
  available: false;
  modelNumber: string;
  brand: string;
  slug: string;
  reason: string;
  facts: { label: string; value: string; source: CostSource }[];
}

export type WaterPurifierModel = PurifierCostModel | UnavailablePurifierModel;

export interface Valued { value: number; kind: ValueKind }
export interface CostLine { label: string; won: number; kind: ValueKind; promotion?: boolean }
export interface PathResult { months: number; lines: CostLine[]; totalWon: number; missing: MissingCost[]; partial: boolean }

const won = (value: number) => `${value.toLocaleString('ko-KR')}원`;
const sum = (lines: CostLine[]) => lines.reduce((total, line) => total + line.won, 0);
const path = (months: number, lines: CostLine[], missing: MissingCost[]): PathResult => ({ months, lines, totalWon: sum(lines), missing, partial: missing.length > 0 });

/** 기간 안에 돌아오는 교체 시점 수. 첫 설치 때의 필터와 기간이 끝나는 달의 교체는 세지 않는다. */
export function replacementsWithin(months: number, cycleMonths: number): number {
  if (!Number.isInteger(months) || months <= 0 || !Number.isInteger(cycleMonths) || cycleMonths <= 0) return 0;
  return Math.ceil(months / cycleMonths) - 1;
}

/** 확인일이 오늘보다 90일을 넘게 지났는지. 날짜를 읽을 수 없으면 재확인이 필요하다고 본다. */
export function priceRecheckNeeded(checkedAt: string, today: string, maxDays = PRICE_RECHECK_DAYS): boolean {
  const days = daysBetween(checkedAt, today);
  return days === undefined || days > maxDays;
}

export function rentalPath(model: PurifierCostModel, values: { monthly: Valued; registration: Valued | null }, months: number): PathResult {
  const lines: CostLine[] = [{ label: `월 ${model.rental.word} ${won(values.monthly.value)} × ${months}개월`, won: values.monthly.value * months, kind: values.monthly.kind }];
  const missing: MissingCost[] = [];
  if (values.registration) lines.push({ label: '등록비', won: values.registration.value, kind: values.registration.kind });
  else missing.push({ label: '등록비', reason: model.rental.registrationMissingReason ?? '공식 화면에서 확인하지 못했습니다.' });
  return path(months, lines, missing);
}

/** 프로모션 조건은 기본값과 섞지 않고 별도 결과로만 계산한다. */
export function promotionRentalPath(model: PurifierCostModel, plan: RentalPlan, months: number): PathResult | undefined {
  const promo = plan.promotion;
  if (!promo) return undefined;
  const half = Math.min(promo.halfPriceMonths, months);
  const after = Math.max(0, months - promo.halfPriceMonths);
  return path(months, [
    { label: `반값 기간 월 ${won(promo.halfPriceMonthlyWon)} × ${half}개월`, won: promo.halfPriceMonthlyWon * half, kind: 'official', promotion: true },
    { label: `그 뒤 월 ${won(promo.afterMonthlyWon)} × ${after}개월`, won: promo.afterMonthlyWon * after, kind: 'official', promotion: true },
    { label: 'Pre-Pass 적용 등록비', won: 0, kind: 'official', promotion: true },
  ], []);
}

export function purchasePath(model: PurifierCostModel, values: { purchase: Valued; filters: Valued[] }, months: number, purchaseLabel: string, promotion = false): PathResult {
  const lines: CostLine[] = [{ label: purchaseLabel, won: values.purchase.value, kind: values.purchase.kind, ...(promotion ? { promotion } : {}) }];
  model.purchase.filters.forEach((filter, index) => {
    const price = values.filters[index];
    const count = replacementsWithin(months, filter.cycleMonths);
    lines.push({ label: `${filter.name}(${filter.partNumber}) ${won(price.value)} × ${count}회 · ${filter.cycleMonths}개월마다`, won: price.value * count, kind: price.kind });
  });
  return path(months, lines, model.purchase.missing);
}

export interface PathComparison { months: number; differenceWon: number; comparable: boolean }
export function comparePaths(rental: PathResult, purchase: PathResult): PathComparison {
  return { months: rental.months, differenceWon: rental.totalWon - purchase.totalWon, comparable: !rental.partial && !purchase.partial };
}

export function comparisonLabel(differenceWon: number): string {
  return differenceWon === 0 ? '확인된 금액이 같음' : differenceWon > 0 ? '렌탈·구독 쪽이 큼' : '구매 쪽이 큼';
}

export interface PenaltyInput { monthlyWon: number; obligationMonths: number; usedMonths: number; contractMonths: number }

export type PenaltyResult =
  | { kind: 'invalid'; message: string }
  | { kind: 'after-obligation'; maker: PathResult; note: string }
  | {
      kind: 'ready';
      remainingMonths: number;
      /** 개월 수를 30일로 바꾼 값. 약관과 고시는 달력 일수로 계산한다. */
      remainingDays: number;
      ratePercent: number;
      maker: PathResult;
      standard: { won: number; formula: string; rule: string };
    };

/** 제조사 약관·공개 안내의 산식을 그대로 옮긴다. 회수비 금액이 없으면 빠진 비용으로 남긴다. */
export function calculatePenalty(model: PurifierCostModel, input: PenaltyInput): PenaltyResult {
  const { monthlyWon, obligationMonths, usedMonths, contractMonths } = input;
  if (![monthlyWon, obligationMonths, usedMonths, contractMonths].every(Number.isSafeInteger) || monthlyWon <= 0 || obligationMonths <= 0 || usedMonths < 0 || contractMonths <= 0) {
    return { kind: 'invalid', message: '월 요금·의무사용기간·사용 개월 수를 확인하세요.' };
  }
  if (obligationMonths > contractMonths) return { kind: 'invalid', message: '의무사용기간이 총 계약기간보다 깁니다. 계약서 값을 확인하세요.' };
  const rule = model.penalty;
  const pickup: CostLine[] = rule.pickupFeeWon === null ? [] : [{ label: '회수비', won: rule.pickupFeeWon, kind: 'official' }];
  const pickupMissing: MissingCost[] = rule.pickupFeeWon === null ? [{ label: '회수비', reason: '약관에 부과 조항만 있고 금액은 공개 자료에서 찾지 못했습니다.' }] : [];
  if (usedMonths >= obligationMonths) {
    return {
      kind: 'after-obligation',
      maker: path(0, usedMonths < contractMonths ? pickup : [], usedMonths < contractMonths ? pickupMissing : []),
      note: usedMonths < contractMonths
        ? '의무사용기간이 지나 위약금 산식은 적용되지 않습니다. 총 계약기간 안에 철거하면 회수비가 남습니다.'
        : '총 계약기간이 끝난 뒤입니다. 위약금 산식은 적용되지 않습니다.',
    };
  }
  const remainingMonths = obligationMonths - usedMonths;
  const remainingDays = remainingMonths * 30;
  const ratePercent = rule.kind === 'daily-10' ? 10 : usedMonths < 12 ? 30 : usedMonths < 24 ? 20 : 10;
  const makerWon = rule.kind === 'daily-10'
    ? Math.round(remainingDays * monthlyWon * ratePercent / 3000)
    : Math.round(remainingMonths * monthlyWon * ratePercent / 100);
  const makerLabel = rule.kind === 'daily-10'
    ? `위약금 (${remainingDays.toLocaleString('ko-KR')}일 × ${won(monthlyWon)}÷30 × ${ratePercent}%)`
    : `위약금 (잔여 ${remainingMonths}개월 × ${won(monthlyWon)} × ${ratePercent}%)`;
  const standard = obligationMonths > 12
    ? { won: Math.round(remainingDays * monthlyWon / 300), formula: `${remainingDays.toLocaleString('ko-KR')}일 × ${won(monthlyWon)}÷30 × 10%`, rule: '의무사용기간을 1년 초과로 정한 경우: 잔여월 임대료의 10%' }
    : (() => {
        const thirty = Math.round(remainingDays * monthlyWon * 30 / 3000);
        const tenOfTotal = Math.round(contractMonths * monthlyWon / 10);
        return { won: Math.min(thirty, tenOfTotal), formula: `잔여월 임대료의 30% ${won(thirty)}와 임대차기간 임대료 총합의 10% ${won(tenOfTotal)} 중 적은 금액`, rule: '의무사용기간을 1년 이하로 정한 경우' };
      })();
  return {
    kind: 'ready', remainingMonths, remainingDays, ratePercent,
    maker: path(remainingMonths, [{ label: makerLabel, won: makerWon, kind: 'calculated' }, ...pickup], pickupMissing),
    standard,
  };
}

export interface CostRecordInput {
  model: PurifierCostModel;
  plan: RentalPlan;
  values: { monthly: Valued; registration: Valued | null; contract: Valued; obligation: Valued | null; purchase: Valued; filters: Valued[] };
  purchaseLabel: string;
  obligationPath?: PathResult;
  rental: PathResult;
  purchase: PathResult;
  promotions?: { title: string; result: PathResult }[];
  penalty?: { usedMonths: number; result: PenaltyResult };
  checkedAt: string;
  recheck: boolean;
  recordedAt?: string;
}

function pathLines(title: string, result: PathResult): string[] {
  return [
    `${title}: ${valueTag('calculated')} ${won(result.totalWon)}${result.partial ? ' (부분 합계)' : ''}`,
    ...result.lines.map((line) => `  - ${valueTag(line.kind)}${line.promotion ? '[프로모션]' : ''} ${line.label}: ${won(line.won)}`),
    ...result.missing.map((item) => `  - ${valueTag('unverified')} 빠진 비용 · ${item.label}: ${item.reason}`),
  ];
}

export function waterPurifierCostRecord(input: CostRecordInput): string {
  const { model, plan, values, rental, purchase } = input;
  const comparison = comparePaths(rental, purchase);
  const penalty = input.penalty;
  return [
    '살림랩 정수기 렌탈·구매 비용 기록',
    ...(input.recordedAt ? [`기록일: ${input.recordedAt}`] : []),
    `모델: ${model.brand} ${model.modelNumber}`,
    `계약 조건: ${plan.label}`,
    `가격 확인일: ${input.checkedAt}${input.recheck ? ' · 가격 재확인 필요(확인일로부터 90일 초과)' : ''}`,
    `${valueTag(values.monthly.kind)} 월 ${model.rental.word}: ${won(values.monthly.value)}`,
    values.registration ? `${valueTag(values.registration.kind)} 등록비: ${won(values.registration.value)}` : `${valueTag('unverified')} 등록비: 확인 필요`,
    `${valueTag(values.contract.kind)} 총 계약기간: ${values.contract.value}개월`,
    values.obligation ? `${valueTag(values.obligation.kind)} 의무사용기간: ${values.obligation.value}개월` : `${valueTag('unverified')} 의무사용기간: 확인 필요`,
    '',
    ...(input.obligationPath ? [...pathLines(`렌탈·구독 의무사용기간 ${input.obligationPath.months}개월 합계`, input.obligationPath), ''] : []),
    ...pathLines(`렌탈·구독 총 계약기간 ${rental.months}개월 합계`, rental),
    '',
    ...pathLines(`구매 ${purchase.months}개월 합계(${input.purchaseLabel})`, purchase),
    '',
    `같은 ${comparison.months}개월 비교: ${valueTag('calculated')} 확인된 금액의 차이 ${won(Math.abs(comparison.differenceWon))} (${comparisonLabel(comparison.differenceWon)})${comparison.comparable ? '' : ' · 빠진 비용이 있어 확정된 차이가 아님'}`,
    ...(input.promotions ?? []).flatMap((promotion) => ['', ...pathLines(`[프로모션] ${promotion.title}(조건부 · 기본값 아님)`, promotion.result)]),
    ...(penalty ? ['', `중도해지: ${valueTag('entered')} 사용 ${penalty.usedMonths}개월`, ...penaltyLines(penalty.result)] : []),
    '',
    '계약서·약관의 값이 이 기록과 다르면 계약서가 우선합니다. 남은 수명과 법적 결과는 판단하지 않았으며, 렌탈과 구매 중 하나를 추천하지 않습니다.',
    'https://salimlab.kr/tools/water-purifier-cost',
  ].join('\n');
}

function penaltyLines(result: PenaltyResult): string[] {
  if (result.kind === 'invalid') return [result.message];
  if (result.kind === 'after-obligation') return [result.note, ...pathLines('제조사 기준', result.maker).slice(1)];
  return [
    ...pathLines('제조사 약관·안내 산식', result.maker),
    `공정위 소비자분쟁해결기준(참고): ${valueTag('calculated')} ${won(result.standard.won)} = ${result.standard.formula} (${result.standard.rule})`,
    `일수는 남은 개월 수 × 30일로 바꿔 넣었습니다. 실제 계산은 달력 일수를 쓰므로 차이가 날 수 있습니다.`,
    '어느 기준이 적용되는지 법적 판단은 하지 않습니다. 분쟁은 1372소비자상담센터(한국소비자원)에 상담하세요.',
  ];
}
