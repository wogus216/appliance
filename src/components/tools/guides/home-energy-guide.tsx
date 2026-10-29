import Link from 'next/link';
import { ValueBadge } from '@/components/tools/value-badge';
import { Formula, GuideExample, GuideList, GuidePart, GuideTable, SourceLink, ToolGuide } from '@/components/tools/tool-guide';
import { ENERGY_MEASUREMENTS } from '@/lib/data/energy-measurements';
import { calculateHomeEnergy } from '@/lib/home-energy-record';

/** 예시 계산에 넣는 가상의 측정값. 신고값은 데이터에서 읽는다. */
const EXAMPLE_READING = { kwh: '9.8', days: '7' };

export function HomeEnergyGuide() {
  // 산식 설명은 냉장고 운용규정 기준이라 냉장고 신고값만 표로 보인다. 에어컨·정수기는 도구에서 고른다.
  const declarations = Object.values(ENERGY_MEASUREMENTS).filter((entry) => entry.productCategory === '냉장고');
  const first = declarations[0];
  const example = calculateHomeEnergy(EXAMPLE_READING);
  if (example.kind !== 'ready') throw new Error('전력 기록 예시값이 계산되지 않음');

  return <ToolGuide title="30일 환산값과 공단 신고값은 각각 무엇인가요?" lead="이 기록 카드에는 성격이 다른 두 숫자가 놓입니다. 하나는 우리 집에서 잰 사용량을 30일로 늘린 계산값이고, 다른 하나는 시험실에서 정한 조건으로 잰 공식 시험값입니다. 둘을 어떻게 만들고 어디까지 읽을 수 있는지 정리했습니다.">
    <GuidePart title="W와 kWh, 그리고 공단 신고값">
      <p>W(와트)는 그 순간 쓰고 있는 전력의 크기이고, kWh(킬로와트시)는 그 전력을 쓴 시간만큼 쌓인 양입니다. 1,000W를 1시간 쓰면 1kWh입니다. 이 도구는 측정기에 쌓인 kWh만 받습니다. 라벨이나 설명서의 정격 소비전력(W)은 그 순간의 크기라 이 칸에 넣을 값이 아닙니다.</p>
      <p>냉장고의 공단 월간 신고값 <ValueBadge kind="official-test" />은 효율관리기자재 운용규정에 따라 시험실(주위 온도 25℃)에서 잰 하루 소비전력량에 365를 곱하고 12로 나눈 뒤 1.6을 곱한 숫자입니다. 산식 원문과 풀이는 <Link href="/blog/fridge-monthly-kwh-measurement" className="font-semibold text-blue-700 underline underline-offset-4">냉장고 월간 소비전력량 해설</Link>에 정리했습니다.</p>
    </GuidePart>

    <GuidePart title="계산식">
      <Formula>30일 환산 kWh = 측정 기간 누적 kWh × 30 ÷ 측정 일수(소수 둘째 자리 반올림)</Formula>
      <p>30은 고정된 날 수입니다. 28일인 달과 31일인 달을 구별하지 않습니다. 공단 신고값은 이 식을 거치지 않고, 고른 모델의 신고 숫자를 그대로 옆에 붙입니다. 두 숫자의 차이는 계산하지 않습니다.</p>
    </GuidePart>

    <GuidePart title="재는 방법과 입력 규칙">
      <GuideList items={[
        '측정기를 꽂을 때 누적값을 0으로 맞추거나 시작값을 적어 둡니다. 끝날 때 읽은 값에서 시작값을 뺀 것이 누적 kWh입니다.',
        '소수점은 마침표로 셋째 자리까지 씁니다(12.345). 1,2처럼 쉼표를 소수점으로 쓰면 칸 아래에 마침표로 고치라는 안내가 뜹니다. 1,234.5처럼 세 자리마다 찍은 쉼표는 그대로 읽습니다.',
        '누적 kWh는 0보다 크고 100,000 이하, 측정 일수는 1~366 사이의 정수만 받습니다. 시간 단위 기간은 받지 않으니 측정은 24시간 단위로 끝내세요.',
      ]} />
    </GuidePart>

    <GuidePart title="예시 계산">
      <GuideExample title="가상의 일주일 측정">
        <p>측정 기간 {example.days}일, 누적 {example.measuredKwh}kWh <ValueBadge kind="example" /></p>
        <p>{example.measuredKwh} × 30 ÷ {example.days} = <strong>{example.normalizedKwh.toFixed(2)}kWh</strong> <ValueBadge kind="calculated" /></p>
        {first && <p>모델로 {first.modelNumber}을(를) 고르면 공단 월간 신고값 {first.value.toFixed(2)}kWh/월 <ValueBadge kind="official-test" />이 옆에 붙습니다. 측정 장소의 온도, 문을 여닫은 횟수, 설정 온도가 시험실과 달라 두 숫자의 차이를 고장이나 절약으로 읽지 않습니다.</p>}
      </GuideExample>
    </GuidePart>

    <GuidePart title="자주 하는 오해">
      <GuideList items={[
        <><strong>30일 환산값이 이번 달 전기요금을 말해 준다?</strong> 환산값만으로는 정해지지 않습니다. 주택용 요금은 가구 전체의 한 달 사용량이 드는 누진 구간과 계절에 따라 kWh당 단가가 달라집니다. 고지서의 가구 사용량을 함께 넣으면 아래 요금 차이 계산을 쓸 수 있습니다.</>,
        <><strong>신고값보다 많이 나오면 냉장고에 문제가 있다?</strong> 신고값은 주위 25℃ 시험 조건과 산식이 만든 숫자입니다. 여름 주방이나 잦은 문 열림처럼 조건이 다르면 실측은 위아래로 움직입니다.</>,
        <><strong>30일 환산값에 12를 곱하면 1년 사용량이다?</strong> 측정한 기간의 계절과 사용 습관이 1년 내내 이어진다는 가정이 됩니다. 이 도구는 연간값을 내지 않습니다.</>,
        <><strong>정격 W에 사용 시간을 곱하면 실측을 대신할 수 있다?</strong> 정격은 측정한 누적량이 아닙니다. 실제로 얼마나 썼는지는 측정기의 kWh로만 확인합니다.</>,
        <><strong>다른 냉장고도 신고값과 나란히 볼 수 있다?</strong> 지금은 아래 {declarations.length}개 모델만이고, 모델번호가 정확히 같을 때만 고르세요.</>,
      ]} />
    </GuidePart>

    <GuidePart title="신고값 원문" wide>
      <GuideTable caption="냉장고 모델별 한국에너지공단 월간 신고값, 품목, 신고 용량, 시험기관과 원문" head={['모델', <>월간 신고값 <ValueBadge kind="official-test" /></>, '품목 · 신고 용량', '시험기관', '원문']} rows={declarations.map((entry) => [
        entry.modelNumber,
        `${entry.value.toFixed(2)}${entry.unit}`,
        `${entry.category} · ${entry.capacity.value}${entry.capacity.unit}`,
        entry.testLab,
        <><SourceLink href={entry.sourceUrl}>공단 신고 {entry.declarationId}</SourceLink><span className="mt-1 block text-xs text-gray-600">{entry.checkedAt} 확인</span></>,
      ])} />
    </GuidePart>
  </ToolGuide>;
}
