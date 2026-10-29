import Link from 'next/link';
import { ValueBadge } from '@/components/tools/value-badge';
import { Formula, GuideExample, GuideList, GuidePart, SourceLink, ToolGuide } from '@/components/tools/tool-guide';
import type { CarePlanProduct } from '@/lib/care-plan';
import { HOUSEHOLD_CARE_LIMIT, markHouseholdCareDone, resolveHouseholdCare, type HouseholdCareEntry, type HouseholdCareRow } from '@/lib/household-care';
import { CARE_SCOPE } from '@/lib/tool-directory';

/** 예시 목록. 두 항목의 마지막 관리일과 ‘오늘’은 가상의 날짜다. */
const EXAMPLE_ENTRIES: HouseholdCareEntry[] = [
  { id: 'example-aircon', modelNumber: 'AR07A9170HCN', itemId: 'filter', lastCareDate: '2026-10-20', chosenDate: '' },
  { id: 'example-washer', modelNumber: 'WF24A9500KE', itemId: 'drain', lastCareDate: '2026-10-24', chosenDate: '' },
];
const EXAMPLE_TODAY = '2026-10-29';

function ExampleRows({ rows }: { rows: HouseholdCareRow[] }) {
  return <ol className="list-decimal space-y-1 pl-5">{rows.map((row) => <li key={row.id}><strong>{row.dueDate}</strong> <ValueBadge kind="calculated" /> {row.product.title} · {row.item.title} <span className="text-xs text-gray-600">(마지막 관리일 {row.lastCareDate})</span></li>)}</ol>;
}

export function HouseholdCareGuide({ products }: { products: CarePlanProduct[] }) {
  const before = resolveHouseholdCare(EXAMPLE_ENTRIES, products, EXAMPLE_TODAY);
  if (before.length !== EXAMPLE_ENTRIES.length) throw new Error('관리 목록 예시 항목을 데이터에서 찾지 못함');
  const first = before[0];
  const doneDay = first.dueDate;
  const after = resolveHouseholdCare(markHouseholdCareDone(EXAMPLE_ENTRIES, first.id, products, doneDay), products, doneDay);

  return <ToolGuide title="이 목록은 어디에 남고, 날짜는 어떻게 다시 정렬되나요?" lead={`관리 일정표가 항목 하나의 날짜를 만든다면, 이 목록은 여러 제품의 항목을 한 줄로 세웁니다. 고를 수 있는 범위는 일정표와 같은 ${CARE_SCOPE.models}개 모델이고, 달라지는 것은 목록을 보관하는 곳과 관리한 뒤 날짜를 고치는 방식입니다.`}>
    <GuidePart title="목록을 보관하는 곳">
      <p>목록은 지금 쓰는 브라우저의 localStorage에만 남습니다. 서버로 보내지 않고 주소에도 넣지 않아, 같은 브라우저로 다시 열면 보이고 다른 기기나 다른 브라우저에서는 보이지 않습니다.</p>
      <GuideList items={[
        `한 브라우저에 최대 ${HOUSEHOLD_CARE_LIMIT}개 항목까지 넣을 수 있습니다.`,
        '같은 모델의 같은 관리 항목은 한 번만 들어갑니다.',
        '다른 탭에서 목록을 바꾸면 열어 둔 탭이 바뀐 목록을 다시 불러옵니다.',
        '브라우저 데이터를 지우면 목록도 사라지니, 오래 둘 기록은 ‘목록 복사’나 인쇄로 따로 보관하세요.',
      ]} />
    </GuidePart>

    <GuidePart title="계산식과 정렬 규칙">
      <Formula>목록의 날짜 = 마지막 관리일 + 설명서 주기 <ValueBadge kind="calculated" /> 또는 내가 정한 확인일 <ValueBadge kind="entered" /></Formula>
      <Formula>정렬 = 날짜가 이른 순, 같은 날이면 제품 이름 순</Formula>
      <Formula>‘오늘 관리함’ = 마지막 관리일을 오늘로 바꾼 뒤 위 식으로 다시 계산</Formula>
      <p>날짜가 지난 항목은 ‘기준일 지남’으로 남고 다음 주기로 저절로 넘어가지 않습니다. ‘오늘 관리함’ 버튼은 설명서 주기가 있는 항목에만 있습니다.</p>
    </GuidePart>

    <GuidePart title="입력 방법">
      <GuideList items={[
        '제품 모델, 관리 항목, 날짜 순서로 하나씩 추가합니다. 모델을 바꾸면 항목 선택이 비워집니다.',
        '주기가 있는 항목은 마지막으로 관리한 날을, 주기가 없는 항목은 앞으로 확인할 날을 고릅니다. 고르는 칸의 이름이 항목에 따라 바뀝니다.',
        '이미 넣은 항목의 날짜를 고치려면 그 항목을 삭제하고 다시 추가합니다. 주기 있는 항목은 ‘오늘 관리함’이 그 일을 대신합니다.',
      ]} />
    </GuidePart>

    <GuidePart title="예시 계산">
      <GuideExample title="두 가전을 넣은 가상의 목록">
        <p>‘오늘’을 {EXAMPLE_TODAY} <ValueBadge kind="example" />로 두고, 두 항목의 마지막 관리일 <ValueBadge kind="example" />을 넣으면 이렇게 정렬됩니다.</p>
        <ExampleRows rows={before} />
        <p>{doneDay}에 첫 항목에서 ‘오늘 관리함’을 누르면 마지막 관리일이 {doneDay}로 바뀌고, 목록이 다시 정렬됩니다.</p>
        <ExampleRows rows={after} />
      </GuideExample>
      <p>예시 항목의 원문: {before.map((row, index) => <span key={row.id}>{index > 0 && ' · '}<SourceLink href={row.item.sourceUrl}>{row.product.modelNumber} {row.item.title}</SourceLink></span>)}. 실제 목록에서는 항목마다 ‘공식 관리 안내 보기’로 원문이 열립니다.</p>
    </GuidePart>

    <GuidePart title="자주 하는 오해">
      <GuideList items={[
        <><strong>로그인하지 않아도 휴대폰에서 같은 목록이 보인다?</strong> 계정과 동기화가 없어서 목록을 만든 그 브라우저에서만 보입니다.</>,
        <><strong>기준일이 지나면 목록이 다음 날짜로 넘어간다?</strong> 관리했다는 기록 없이 날짜를 옮기지 않습니다. 관리한 날 ‘오늘 관리함’을 눌러야 새 날짜가 계산됩니다.</>,
        <><strong>날짜가 되면 알림이 온다?</strong> 알림을 보내지 않습니다. 달력에 남기려면 <Link href="/tools/care-plan" className="font-semibold text-blue-700 underline underline-offset-4">관리 일정표</Link>에서 항목별 달력 파일을 만드세요.</>,
        <><strong>주기 없는 항목도 버튼 한 번으로 다음 날짜가 잡힌다?</strong> 그런 항목에는 확인된 주기가 없어 사이트가 날짜를 대신 정하지 않습니다.</>,
      ]} />
    </GuidePart>
  </ToolGuide>;
}
