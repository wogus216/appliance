import { getStandardItem, type StandardItemId } from '@/lib/data/consumer-standards';
import { parsePlainNumber, valueTag } from '@/lib/value-kind';

export interface RepairReplaceInput {
  model: string;
  repairQuote: string;
  replacementPrice: string;
  replacementExtra: string;
  repairTotalConfirmed: boolean;
  replacementTotalConfirmed: boolean;
  warranty: 'unknown' | 'covered' | 'not-covered';
  diagnosisConfirmed: boolean;
}

export type RepairMoneyField = 'repairQuote' | 'replacementPrice' | 'replacementExtra';

export type RepairReplaceResult =
  | { kind: 'empty'; message: string }
  | { kind: 'invalid'; message: string; fields: Partial<Record<RepairMoneyField, string>> }
  | {
      kind: 'ready';
      repairWon: number;
      replacementWon: number;
      differenceWon: number;
      comparable: boolean;
      questions: string[];
    };

const MAX_WON = 1_000_000_000;

/** 원 단위 정수만 받는다. 끝의 '원'은 허용하고, 1,5처럼 묶음이 맞지 않는 쉼표는 오류로 남긴다. */
export function parseWon(raw: string, allowZero: boolean): number | null {
  const amount = parsePlainNumber(raw.trim().replace(/\s*원$/, ''), 0);
  return amount !== null && Number.isSafeInteger(amount) && amount <= MAX_WON && (allowZero || amount > 0) ? amount : null;
}

export function calculateRepairReplace(input: RepairReplaceInput): RepairReplaceResult {
  if (!input.repairQuote.trim() || !input.replacementPrice.trim()) {
    return { kind: 'empty', message: '받은 수리 견적과 같은 조건의 새 제품 가격을 입력하세요.' };
  }
  const repairWon = parseWon(input.repairQuote, true);
  const replacementBase = parseWon(input.replacementPrice, false);
  const extra = input.replacementExtra.trim() ? parseWon(input.replacementExtra, true) : 0;
  const fields: Partial<Record<RepairMoneyField, string>> = {
    ...(repairWon === null ? { repairQuote: '0원 이상 10억 원 이하의 정수로 입력하세요. 예: 150000 또는 150,000' } : {}),
    ...(replacementBase === null ? { replacementPrice: '0원보다 크고 10억 원 이하인 정수로 입력하세요.' } : {}),
    ...(extra === null ? { replacementExtra: '0원 이상 정수로 입력하거나, 모르면 비워 두세요.' } : {}),
  };
  if (repairWon === null || replacementBase === null || extra === null) {
    return { kind: 'invalid', message: '표시된 금액 칸을 고치세요. 금액은 원 단위 정수로 입력합니다.', fields };
  }

  const questions = [
    ...(!input.diagnosisConfirmed ? ['고장 원인과 교체할 부품이 진단서·견적서에 명시됐나요?'] : []),
    ...(input.warranty === 'unknown' ? ['제조사 또는 판매처에 현재 무상 보증 적용 여부를 확인했나요?'] : []),
    ...(input.warranty === 'covered' && repairWon > 0 ? ['무상 보증이 적용된다고 확인했는데 견적에 비용이 있습니다. 보증에서 빠지는 항목이 무엇인지 확인했나요?'] : []),
    ...(!input.repairTotalConfirmed ? ['수리 견적에 부품·출장·공임·세금이 모두 포함됐나요?'] : []),
    ...(!input.replacementTotalConfirmed ? ['새 제품의 설치·기존 제품 철거·배송·세금 비용을 모두 확인했나요?'] : []),
    '수리 후 보증 범위와 기간, 같은 증상이 다시 생길 때의 조건은 무엇인가요?',
    '현재 제품의 다른 기능 상태와 새 제품의 설치 조건을 확인했나요?',
  ];

  return {
    kind: 'ready', repairWon, replacementWon: replacementBase + extra,
    differenceWon: replacementBase + extra - repairWon,
    comparable: input.repairTotalConfirmed && input.replacementTotalConfirmed,
    questions,
  };
}

/** 가전 수첩에서 넘겨받는 값은 고시 품목뿐이다. 날짜·금액 같은 개인 값은 주소에 넣지 않는다. */
export function repairReplaceHref(itemId?: StandardItemId): string {
  return `/tools/repair-replace${itemId ? `?item=${encodeURIComponent(itemId)}` : ''}`;
}

export function parseRepairItem(value: string | null): StandardItemId | '' {
  return value && getStandardItem(value) ? value as StandardItemId : '';
}

export function differenceLabel(differenceWon: number): string {
  return differenceWon === 0 ? '입력 금액이 같음' : differenceWon > 0 ? '새 제품 쪽이 큼' : '수리 쪽이 큼';
}

export function repairReplaceRecord(input: RepairReplaceInput, result: Extract<RepairReplaceResult, { kind: 'ready' }>, recordedAt?: string, standardLines: string[] = []): string {
  const format = (value: number) => `${value.toLocaleString('ko-KR')}원`;
  return [
    '살림랩 수리·교체 비교 기록',
    ...(recordedAt ? [`기록일: ${recordedAt}`] : []),
    `제품: ${input.model.trim() || '미입력'}`,
    `${valueTag('entered')} 받은 수리 견적: ${format(result.repairWon)}${input.repairTotalConfirmed ? ' (총액 확인)' : ' (포함 항목 미확인)'}`,
    `${valueTag('entered')} 새 제품 가격과 입력한 추가비: ${format(result.replacementWon)}${input.replacementTotalConfirmed ? ' (총액 확인)' : ' (추가 비용 미확인)'}`,
    `${valueTag('calculated')} 입력 금액 차이: ${format(Math.abs(result.differenceWon))} (${differenceLabel(result.differenceWon)})`,
    `비교 범위: ${result.comparable ? '두 금액의 포함 항목을 확인했다고 입력함' : '확인된 금액만 비교한 부분 합계'}`,
    `보증 적용: ${input.warranty === 'covered' ? '적용 확인' : input.warranty === 'not-covered' ? '미적용 확인' : '미확인'}`,
    `고장 진단: ${input.diagnosisConfirmed ? '확인했다고 입력함' : '미확인'}`,
    '다음에 확인할 질문:',
    ...result.questions.map((question) => `- ${question}`),
    ...(standardLines.length ? ['공정위 소비자분쟁해결기준:', ...standardLines] : []),
    '금액은 사용자가 입력한 값이고 차이는 그 값의 산술 계산입니다. 남은 수명·재고장 확률·전기요금·환경 영향을 추정하지 않았으며 수리 또는 교체를 추천하지 않습니다.',
    'https://salimlab.kr/tools/repair-replace',
  ].join('\n');
}
