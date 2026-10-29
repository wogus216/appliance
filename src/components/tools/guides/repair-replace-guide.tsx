import { ValueBadge } from '@/components/tools/value-badge';
import { Formula, GuideExample, GuideList, GuidePart, SourceLink, ToolGuide } from '@/components/tools/tool-guide';
import { CONSUMER_STANDARD_NOTICE } from '@/lib/data/consumer-standards';
import { calculateRepairReplace, differenceLabel, parseWon, type RepairReplaceInput } from '@/lib/repair-replace';

/** 예시 계산에 넣는 가상의 견적. 특정 제품·업체의 금액이 아니다. */
const EXAMPLE_INPUT: RepairReplaceInput = {
  model: '', repairQuote: '180,000', replacementPrice: '890000', replacementExtra: '50,000원',
  repairTotalConfirmed: false, replacementTotalConfirmed: false, warranty: 'unknown', diagnosisConfirmed: false,
};
const won = (value: number) => `${value.toLocaleString('ko-KR')}원`;

export function RepairReplaceGuide() {
  const example = calculateRepairReplace(EXAMPLE_INPUT);
  if (example.kind !== 'ready') throw new Error('수리·교체 예시값이 계산되지 않음');
  const base = parseWon(EXAMPLE_INPUT.replacementPrice, false) ?? 0;
  const extra = parseWon(EXAMPLE_INPUT.replacementExtra, true) ?? 0;

  return <ToolGuide title="수리 견적과 새 제품 비용은 어떻게 맞춰 보나요?" lead="이 비교표에는 사이트가 모은 가격이나 수리비 자료가 없습니다. 비교하는 금액은 모두 사용자가 견적서와 판매 페이지에서 옮겨 적은 값이고, 도구는 그 금액이 같은 범위를 담고 있는지를 묻는 데 집중합니다.">
    <GuidePart title="비교하는 금액과 확인 항목">
      <p>금액 칸은 세 개입니다. <ValueBadge kind="entered" /></p>
      <GuideList items={[
        '받은 수리 견적 — 부품·출장·공임·세금이 다 들어갔는지는 아래 체크로 따로 표시합니다.',
        '같은 조건의 새 제품 가격 — 비교하려는 대체 제품의 판매가입니다.',
        '새 제품 추가 비용 — 설치·기존 제품 철거·배송비 가운데 금액을 확인한 것만 넣습니다.',
      ]} />
      <p>금액 밖에서 결과를 바꾸는 확인 항목은 네 개입니다. 수리 견적 총액 확인, 새 제품 최종 비용 확인, 현재 제품의 무상 보증(미확인·적용·미적용), 공식 진단으로 고장 원인과 부품을 확인했는지입니다.</p>
      {/* 2026-10-29 8단계: 예전 문장 "외부 원문을 불러오지 않는 도구라 원문 링크가 없습니다"는 사실과 달랐다 —
          품목을 고르면 고시 [별표 Ⅲ]의 기간과 원문 링크가 나온다(consumer-standard-info.tsx). */}
      <p>금액 계산에는 외부 자료를 쓰지 않습니다. 금액의 원문은 사용자가 받은 견적서와 판매 페이지이니 함께 보관하세요. 품목을 고르면 나오는 품질보증기간·부품보유기간만 {CONSUMER_STANDARD_NOTICE.name}({CONSUMER_STANDARD_NOTICE.notice}) <SourceLink href={CONSUMER_STANDARD_NOTICE.table3Url}>[별표 Ⅲ] 원문</SourceLink>에서 옮긴 공식 자료입니다.</p>
    </GuidePart>

    <GuidePart title="계산식">
      <Formula>새 제품 쪽 합계 = 새 제품 가격 + 입력한 추가 비용(비우면 0원)</Formula>
      <Formula>입력 금액 차이 = 새 제품 쪽 합계 − 받은 수리 견적</Formula>
      <p>화면에는 차이의 절댓값과 어느 쪽이 큰지를 적습니다. 두 ‘총액 확인’ 체크가 모두 켜졌을 때만 포함 항목을 확인한 비교로 쓰고, 하나라도 꺼져 있으면 부분 비교라고 표시합니다. 다음에 물을 질문은 꺼진 체크와 보증 상태에 따라 늘어나며, 수리 후 보증과 다른 기능 상태를 묻는 두 질문은 항상 붙습니다.</p>
    </GuidePart>

    <GuidePart title="입력 방법">
      <GuideList items={[
        '원 단위 정수로 적습니다. 150000, 150,000, 150,000원은 모두 같은 금액으로 읽습니다.',
        '1,5처럼 세 자리 묶음이 아닌 쉼표, 소수점, ‘15만’ 같은 한글 단위는 그 칸에 오류를 표시하고 계산하지 않습니다.',
        '무상 수리로 확인됐다면 수리 견적에 0을 넣을 수 있습니다. 새 제품 가격은 0원보다 커야 하고, 모든 금액은 10억 원까지 받습니다.',
        '모델명은 선택 칸입니다. 복사·인쇄한 기록에서 어느 제품의 견적이었는지 구별하는 데만 씁니다.',
      ]} />
    </GuidePart>

    <GuidePart title="예시 계산">
      <GuideExample title="가상의 견적 한 건">
        <p>수리 견적 {won(example.repairWon)}, 새 제품 {won(base)}, 추가 비용 {won(extra)}. 총액 확인 체크와 진단 확인은 모두 끈 상태, 보증은 ‘아직 확인하지 않음’입니다.</p>
        <p>새 제품 쪽 합계 {won(base)} + {won(extra)} = {won(example.replacementWon)} <ValueBadge kind="calculated" /></p>
        <p>차이 {won(example.replacementWon)} − {won(example.repairWon)} = <strong>{won(Math.abs(example.differenceWon))}</strong>, {differenceLabel(example.differenceWon)} <ValueBadge kind="calculated" />. 총액 확인이 없어 {example.comparable ? '포함 항목을 확인한 비교' : '부분 비교'}로 표시되고, 아래 질문 {example.questions.length}개가 붙습니다.</p>
        <ol className="list-decimal space-y-1 pl-5">{example.questions.map((question) => <li key={question}>{question}</li>)}</ol>
      </GuideExample>
    </GuidePart>

    <GuidePart title="자주 하는 오해">
      <GuideList items={[
        <><strong>금액이 적은 쪽을 고르라는 뜻이다?</strong> 비교표는 수리도 교체도 권하지 않습니다. 같은 금액 범위인지 확인한 뒤의 선택은 제품 상태와 보증 조건을 아는 사람이 합니다.</>,
        <><strong>추가 비용 칸을 비우면 추가 비용이 없다는 뜻이다?</strong> 계산에는 0원으로 더하지만, 최종 비용을 확인하지 않았다면 결과에 ‘추가 비용 미확인’이 남습니다.</>,
        <><strong>무상 보증이면 견적 금액은 신경 쓰지 않아도 된다?</strong> 보증 적용으로 고른 상태에서 견적에 금액이 있으면, 보증에서 빠지는 항목이 무엇인지 묻는 질문이 따로 붙습니다.</>,
        <><strong>고친 뒤 몇 년 더 쓸 수 있는지 반영했다?</strong> 남은 수명, 재고장 가능성, 새 제품과의 전기 사용량 차이, 환경 영향은 추정하지 않습니다.</>,
      ]} />
    </GuidePart>
  </ToolGuide>;
}
