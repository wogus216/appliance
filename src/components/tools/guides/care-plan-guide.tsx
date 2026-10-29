import { ValueBadge } from '@/components/tools/value-badge';
import { Formula, GuideExample, GuideList, GuidePart, GuideTable, SourceLink, ToolGuide } from '@/components/tools/tool-guide';
import { calculateCarePlan, type CarePlanProduct } from '@/lib/care-plan';
import { CARE_SCOPE } from '@/lib/tool-directory';

/** 예시 계산에 넣는 가상의 날짜. 말일 보정이 보이도록 31일로 둔다. */
const EXAMPLE_LAST_CARE = '2025-10-31';
const EXAMPLE_TODAY = '2025-11-01';
const intervalText = (unit: 'days' | 'months', amount: number) => unit === 'days' ? `${amount}일` : `${amount}개월`;
const korean = (iso: string) => { const [y, m, d] = iso.split('-').map(Number); return `${y}년 ${m}월 ${d}일`; };

export function CarePlanGuide({ products }: { products: CarePlanProduct[] }) {
  const scheduled = products.flatMap((product) => product.items.filter((item) => item.interval).map((item) => ({ product, item, interval: item.interval! })));
  const monthly = scheduled.find((entry) => entry.interval.unit === 'months') ?? scheduled[0];
  const result = monthly ? calculateCarePlan(monthly.item, { purchaseDate: '', lastCareDate: EXAMPLE_LAST_CARE, chosenDate: '' }, EXAMPLE_TODAY) : undefined;
  const clamped = monthly?.interval.unit === 'months' && result?.kind === 'ready' && result.dueDate.slice(8) !== EXAMPLE_LAST_CARE.slice(8);

  return <ToolGuide title="다음 확인일은 어떤 자료로, 어떻게 정하나요?" lead={`이 일정표는 공개 제품 ${CARE_SCOPE.models}개 모델의 관리 항목 ${CARE_SCOPE.items}개를 고를 수 있게 하지만, 날짜를 계산하는 것은 설명서가 주기를 숫자로 밝힌 ${CARE_SCOPE.intervalItems}개 항목뿐입니다. 나머지 항목은 사용자가 날짜를 정하고, 그 사실을 일정에 함께 적습니다.`}>
    <GuidePart title="날짜를 계산하는 항목과 원문" wide>
      <p>아래 표의 주기와 기준 문장은 모두 해당 모델의 공식 관리 안내에서 옮긴 <ValueBadge kind="official" /> 값입니다. 표에 없는 항목에는 고정 주기가 없어 직접 정한 날짜 <ValueBadge kind="entered" />만 씁니다.</p>
      <GuideTable caption="설명서 주기로 다음 확인일을 계산하는 관리 항목과 원문" head={['제품 · 모델', '항목', '주기', '설명서 기준', '원문']} rows={scheduled.map(({ product, item, interval }) => [
        `${product.title} · ${product.modelNumber}`, item.title, intervalText(interval.unit, interval.amount), interval.basis,
        <SourceLink key={item.id} href={item.sourceUrl}>{item.sourceLabel}</SourceLink>,
      ])} />
    </GuidePart>

    <GuidePart title="계산식">
      <Formula>일 단위 주기: 다음 확인일 = 마지막 관리일 + 주기 일수</Formula>
      <Formula>개월 단위 주기: 다음 확인일 = 마지막 관리일에서 주기만큼 뒤 달의 같은 날(그 달에 없는 날이면 그 달 말일)</Formula>
      <p>계산한 날이 오늘보다 앞이면 ‘기준일이 지났습니다’로 바꿔 보여 주고, 달력 파일은 오늘 하루 일정으로 만듭니다. 구입일은 넣어도 어느 식에도 들어가지 않습니다.</p>
    </GuidePart>

    <GuidePart title="입력 방법">
      <GuideList items={[
        '마지막 관리일에는 이 항목을 실제로 청소하거나 바꾼 날을 넣습니다. 오늘보다 뒤의 날짜는 받지 않습니다.',
        '주기가 없는 항목에서 고르는 날짜는 앞으로 확인할 날이라 오늘 또는 그 이후만 받습니다.',
        '날짜는 연-월-일 달력 입력으로 고릅니다. 모델을 바꾸면 고른 항목과 날짜가 비워집니다.',
        '달력 파일(.ics)은 하루 종일 일정 한 건입니다. 설명서 안내와 원문 주소가 일정 설명에 들어갑니다.',
      ]} />
    </GuidePart>

    <GuidePart title="예시 계산">
      {monthly && result?.kind === 'ready' ? <GuideExample title={`${monthly.product.title} ${monthly.product.modelNumber} · ${monthly.item.title}`}>
        <p>마지막 관리일 {korean(EXAMPLE_LAST_CARE)} <ValueBadge kind="example" />, 설명서 주기 {intervalText(monthly.interval.unit, monthly.interval.amount)} <ValueBadge kind="official" /></p>
        <p>다음 확인일 <strong>{korean(result.dueDate)}</strong> <ValueBadge kind="calculated" /></p>
        {clamped && <p>{intervalText(monthly.interval.unit, monthly.interval.amount)} 뒤 달에는 {Number(EXAMPLE_LAST_CARE.slice(8))}일이 없어 그 달 말일로 맞췄습니다.</p>}
        <p>설명서 기준: {monthly.interval.basis}</p>
      </GuideExample> : <p>날짜 주기가 확인된 항목이 없어 예시를 계산하지 않았습니다.</p>}
    </GuidePart>

    <GuidePart title="자주 하는 오해">
      <GuideList items={[
        <><strong>구입일을 넣으면 교체 시기를 알려 준다?</strong> 구입일은 기록에 ‘계산에 사용하지 않음’으로만 남습니다. 마지막 관리일을 모르면 다음에 실제로 관리한 날을 넣고 그날부터 계산하세요.</>,
        <><strong>달력 파일이 주기마다 다시 알려 준다?</strong> 반복 규칙을 넣지 않은 한 번짜리 일정입니다. 관리한 뒤에는 새 마지막 관리일로 일정을 다시 만듭니다.</>,
        <><strong>설명서 주기는 어느 집에서나 같다?</strong> 표의 ‘설명서 기준’에 하루 사용량이나 사용 시간 같은 조건이 붙은 항목이 있습니다. 우리 집 조건이 그와 다르면 실제로 필요한 간격도 달라질 수 있습니다.</>,
        <><strong>직접 정한 날짜도 제조사 권장일이다?</strong> 주기가 없는 항목의 날짜는 내가 정한 점검일이고, 일정의 ‘날짜의 근거’에 그렇게 적힙니다.</>,
      ]} />
    </GuidePart>
  </ToolGuide>;
}
