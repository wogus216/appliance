import { ValueBadge } from '@/components/tools/value-badge';
import { addCalendarDays } from '@/lib/care-plan';
import { CONSUMER_STANDARD_NOTICE } from '@/lib/data/consumer-standards';
import { CONSUMER_STANDARD_RENTAL, WATER_PURIFIER_COST_CHECKED_AT, WATER_PURIFIER_MODELS } from '@/lib/data/water-purifier-cost';
import { PRICE_RECHECK_DAYS, calculatePenalty, purchasePath, rentalPath, replacementsWithin, type CostSource, type PurifierCostModel } from '@/lib/water-purifier-cost';

const won = (value: number) => `${value.toLocaleString('ko-KR')}원`;
const link = 'font-semibold text-blue-700 underline underline-offset-4';
const official = (value: number) => ({ value, kind: 'official' as const });

function requireModel(modelNumber: string): PurifierCostModel {
  const model = WATER_PURIFIER_MODELS.find((entry) => entry.modelNumber === modelNumber);
  if (!model?.available) throw new Error(`비용 예시 모델 없음: ${modelNumber}`);
  return model;
}

/** 예시 숫자는 빌드 때 도구와 같은 함수로 계산한다. 사용 개월 수와 LG 의무사용기간은 예시값이다. */
export function WaterPurifierCostGuide() {
  const coway = requireModel('CHPI-7400N');
  const lg = requireModel('WD523ACB');
  const cowayPlan = coway.rental.plans.find((plan) => plan.id === 'visit4-y7')!;
  const lgPlan = lg.rental.plans.find((plan) => plan.id === 'y6-self')!;
  const cowayRental = rentalPath(coway, { monthly: official(cowayPlan.monthlyWon), registration: official(coway.rental.registrationWon!) }, cowayPlan.contractMonths);
  const cowayPenalty = calculatePenalty(coway, { monthlyWon: cowayPlan.monthlyWon, obligationMonths: cowayPlan.obligationMonths!, usedMonths: 18, contractMonths: cowayPlan.contractMonths });
  const lgRental = rentalPath(lg, { monthly: official(lgPlan.monthlyWon), registration: null }, lgPlan.contractMonths);
  const lgPurchase = purchasePath(lg, { purchase: official(lg.purchase.listWon), filters: lg.purchase.filters.map((filter) => official(filter.listWon)) }, lgPlan.contractMonths, lg.purchase.listLabel);
  const lgPenalty = calculatePenalty(lg, { monthlyWon: lgPlan.monthlyWon, obligationMonths: 36, usedMonths: 18, contractMonths: lgPlan.contractMonths });
  if (cowayPenalty.kind !== 'ready' || lgPenalty.kind !== 'ready') throw new Error('위약금 예시를 계산하지 못함');
  const recheckFrom = addCalendarDays(WATER_PURIFIER_COST_CHECKED_AT, PRICE_RECHECK_DAYS + 1);
  const sources: CostSource[] = WATER_PURIFIER_MODELS.flatMap((model) => model.available
    ? [...model.rental.sources, ...model.purchase.sources, ...model.purchase.filters.map((filter) => filter.source), model.penalty.source]
    : model.facts.map((fact) => fact.source));
  const uniqueSources = sources.filter((source, index) => sources.findIndex((other) => other.url === source.url) === index);

  return <section aria-labelledby="cost-guide-heading" className="mt-12 border-t border-gray-200 pt-10 text-base leading-relaxed text-gray-800 print:hidden">
    <h2 id="cost-guide-heading" className="text-2xl font-bold text-gray-900">계산에 쓰는 자료와 식</h2>
    <p className="mt-3 max-w-prose">이 표는 세 정수기 모델의 제조사 공식 판매·약관 화면을 {WATER_PURIFIER_COST_CHECKED_AT}에 읽은 값만 씁니다. 가격비교·블로그·대리점 값은 쓰지 않습니다. 확인일로부터 {PRICE_RECHECK_DAYS}일이 지난 {recheckFrom}부터는 화면에 ‘가격 재확인 필요’가 뜹니다.</p>

    <h3 className="mt-8 text-xl font-bold text-gray-900">모델별로 확인한 것과 못 한 것</h3>
    <dl className="mt-4 space-y-4">
      <div><dt className="font-semibold">코웨이 CHPI-7400N</dt><dd className="mt-1">방문주기 2·4개월 × 의무사용기간 3·5·6·7년, 8개 조합의 월 렌탈료(자동이체 1,000원 할인 반영 금액)와 렌탈 등록비 100,000원, 일시불 2,380,000원 <ValueBadge kind="official" />. 위약금은 약관 제11조 산식입니다. <strong>찾지 못한 것</strong>: 일시불 구매 뒤 1년 무상 서비스가 끝난 다음의 멤버십 요금, 나노트랩필터-세트 판매가, 회수비 금액 <ValueBadge kind="unverified" />.</dd></div>
      <div><dt className="font-semibold">LG전자 WD523ACB</dt><dd className="mt-1">계약기간 4·5·6년 × 자가관리·방문관리(6개월) 6개 조합의 월 구독료, 할인 전 판매가 1,614,000원, 필터 AGM30040101(6개월) 73,000원·AGM30063801(12개월) 54,600원, 회수비 50,000원 <ValueBadge kind="official" />. <strong>찾지 못한 것</strong>: 의무사용기간 개월 수, 등록비, 계약서 원문 약관 <ValueBadge kind="unverified" />. 위약금 비율은 가전구독 안내 페이지 기준입니다.</dd></div>
      <div><dt className="font-semibold">SK매직 WPU-A710C</dt><dd className="mt-1">공식몰 정수기 목록에 이 모델이 없어 렌탈료·의무사용기간·등록비·일시불가·위약금율을 확인하지 못했습니다. 이 모델은 금액을 계산하지 않고, 설명서의 필터 교체 주기(4·4·12개월)만 보여 줍니다.</dd></div>
    </dl>

    <h3 className="mt-8 text-xl font-bold text-gray-900">계산식</h3>
    <ul className="mt-3 list-disc space-y-2 pl-6">
      <li>렌탈·구독 합계 = 월 요금 × 개월 수 + 등록비. 등록비를 모르면 빼고 ‘부분 합계’로 표시합니다.</li>
      <li>구매 합계 = 구입가 + 필터 가격 × 교체 횟수. 교체 횟수 = ⌈기간 ÷ 교체 주기⌉ − 1(첫 설치 때의 필터와 기간이 끝나는 달의 교체는 세지 않음). 가격·품번·주기가 모두 공식 자료로 확인된 필터만 셉니다.</li>
      <li>같은 기간 비교 = 렌탈 쪽 합계 − 구매 쪽 합계. 기간은 소유권이 넘어오는 총 계약기간입니다. 어느 한쪽이라도 부분 합계면 차이는 확정된 값이 아닙니다.</li>
      <li>코웨이 위약금 = (총 의무사용기간 일수 − 사용일수) × (월렌탈료 ÷ 30) × 10% + 회수비(약관 제11조).</li>
      <li>LG 위약금 = 잔여 의무사용기간 총 요금(할인 전 기본요금) × 30%(계약 후 1년 이전)·20%(1~2년)·10%(2년 경과 후) + 회수비 50,000원.</li>
      <li>공정위 기준(참고) = {CONSUMER_STANDARD_RENTAL.rule}. {CONSUMER_STANDARD_RENTAL.definition}</li>
      <li>사용 기간은 개월 수로 받고, 일수가 필요한 식에는 개월 수 × 30일을 넣습니다. 달력 일수와 몇 일 차이가 날 수 있습니다.</li>
    </ul>

    <h3 className="mt-8 text-xl font-bold text-gray-900">예시 계산</h3>
    <div className="mt-3 space-y-4 rounded-lg border border-orange-200 bg-orange-50/40 p-4">
      <p><strong>코웨이 4개월 방문·7년</strong>: {won(cowayPlan.monthlyWon)} × {cowayPlan.contractMonths}개월 + 등록비 {won(coway.rental.registrationWon!)} = <strong>{won(cowayRental.totalWon)}</strong> <ValueBadge kind="calculated" />. 가격표의 ‘렌탈료 총액(렌탈등록비 10만원 포함 기준)’ 4,333,600원과 같습니다.</p>
      <p>같은 계약을 18개월 <ValueBadge kind="example" /> 쓰고 해지하면 남은 {cowayPenalty.remainingMonths}개월({cowayPenalty.remainingDays.toLocaleString('ko-KR')}일) × {won(cowayPlan.monthlyWon)}÷30 × 10% = <strong>{won(cowayPenalty.maker.totalWon)}</strong> <ValueBadge kind="calculated" />에 금액을 모르는 회수비가 더해집니다. 의무사용기간이 1년을 넘는 계약이라 공정위 기준(참고)도 {won(cowayPenalty.standard.won)}입니다.</p>
      <p><strong>LG 6년·자가관리</strong>: {won(lgPlan.monthlyWon)} × {lgPlan.contractMonths}개월 = {won(lgRental.totalWon)} <ValueBadge kind="calculated" />(등록비를 몰라 부분 합계). 같은 {lgPlan.contractMonths}개월 동안 구매하면 {won(lg.purchase.listWon)} + 중금속9 흡착 필터 {replacementsWithin(lgPlan.contractMonths, 6)}회 + 바이러스 클리어 필터 {replacementsWithin(lgPlan.contractMonths, 12)}회 = <strong>{won(lgPurchase.totalWon)}</strong> <ValueBadge kind="calculated" />(필터 배송비를 몰라 부분 합계)입니다.</p>
      <p>LG 의무사용기간을 36개월 <ValueBadge kind="example" />이라고 두고 18개월 <ValueBadge kind="example" />에 해지하면, 1~2년 구간이라 남은 {lgPenalty.remainingMonths}개월 × {won(lgPlan.monthlyWon)} × {lgPenalty.ratePercent}% + 회수비 50,000원 = <strong>{won(lgPenalty.maker.totalWon)}</strong> <ValueBadge kind="calculated" />입니다. 같은 조건의 공정위 기준(참고)은 {won(lgPenalty.standard.won)}입니다. 실제 의무사용기간은 계약서에서 확인해야 합니다.</p>
    </div>

    <h3 className="mt-8 text-xl font-bold text-gray-900">자주 하는 오해</h3>
    <ul className="mt-3 list-disc space-y-2 pl-6">
      <li><strong>렌탈 총액이 일시불보다 크면 렌탈이 손해다?</strong> 렌탈·구독료에는 방문관리(코웨이·LG 방문형)나 필터 배송(LG 자가관리)이 들어 있고, 구매 쪽 합계에는 관리 요금·필터 값처럼 공식 가격을 찾지 못한 비용이 빠져 있을 수 있습니다. 빠진 비용 목록부터 확인하세요.</li>
      <li><strong>반값 할인이 계약 내내 이어진다?</strong> 코웨이 화면의 반값은 3~12개월이고, 그 뒤에는 다른 월 요금이 청구됩니다. 그래서 프로모션은 따로 계산하고 기본 합계에 넣지 않습니다.</li>
      <li><strong>의무사용기간과 소유권 이전 시점은 같다?</strong> 코웨이 3년 약정은 최초 설치일로부터 5년 뒤 소유권이 넘어옵니다. LG는 의무사용기간을 공개 화면에 적지 않고 계약서·마이페이지에서 확인하라고 안내합니다.</li>
      <li><strong>중도해지하면 남은 렌탈료를 전부 낸다?</strong> 코웨이 약관은 남은 의무사용기간 렌탈료의 10%, LG 안내는 경과 기간에 따라 30·20·10%를 위약금으로 적습니다. 회수비와 미납 요금은 따로입니다.</li>
      <li><strong>공정위 기준 금액이 그대로 청구된다?</strong> 이 표는 제조사 산식과 고시 산식을 나란히 보여 줄 뿐, 어느 쪽이 적용되는지 판단하지 않습니다. 분쟁은 1372소비자상담센터(한국소비자원)에 상담하세요.</li>
    </ul>

    <h3 className="mt-8 text-xl font-bold text-gray-900">원문 링크</h3>
    <ul className="mt-3 space-y-2 text-sm">
      {uniqueSources.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noopener noreferrer" className={link}>{source.label}</a> <span className="text-gray-600">· {source.checkedAt} 확인</span></li>)}
      <li><a href={CONSUMER_STANDARD_NOTICE.table2Url} target="_blank" rel="noopener noreferrer" className={link}>{CONSUMER_STANDARD_NOTICE.name}({CONSUMER_STANDARD_NOTICE.notice}, 시행 {CONSUMER_STANDARD_NOTICE.effectiveDate}) [별표 Ⅱ]</a> <span className="text-gray-600">· {CONSUMER_STANDARD_NOTICE.checkedAt} 확인</span></li>
    </ul>
  </section>;
}
