import { valueTag } from '@/lib/value-kind';

export interface FridgeFitProduct {
  modelNumber: string;
  slug: string;
  brandLabel: string;
  width: number;
  height: number;
  depth: number;
  rearGap: number;
  sideGap: number;
  sideBasis: string;
  openWidth: number;
  openDepth: number;
  /** 설명서 도면에서 폭·깊이 값이 나온 개방 각도. 두 값이 같은 각도라고 가정하지 않는다. */
  openWidthBasis: string;
  openDepthBasis: string;
  openingNote: string;
  topNote: string;
  transportNote: string;
  sourceUrl: string;
  sourcePages: string;
  document: string;
  checkedAt: string;
}

export const FIT_FIELDS = [
  { key: 'spaceWidth', label: '냉장고 자리의 안쪽 폭', hint: '걸레받이·돌출물을 포함해 가장 좁은 곳을 재세요.' },
  { key: 'spaceHeight', label: '바닥부터 위쪽 장애물까지 높이', hint: '상부장·천장 중 가장 낮은 곳까지 재세요. 수평 조절 전 본체 높이만 비교합니다.' },
  { key: 'openingWidth', label: '문이 움직일 구역의 확보 폭', hint: '냉장고장 폭과 별개입니다. 앞쪽 벽·가구 사이에서 문을 펼칠 수 있는 폭을 재세요.' },
  { key: 'frontDistance', label: '뒷벽부터 맞은편 장애물까지 거리', hint: '닫힌 냉장고 앞면부터 재는 통로 폭이 아닙니다. 뒷벽에서 식탁·가구 등 가장 가까운 곳까지 재세요.' },
  { key: 'routeWidth', label: '반입 경로에서 가장 좁은 유효 폭', hint: '현관·복도·주방 입구 중 가장 좁은 곳. 문짝·손잡이를 뺀 실제 통과 폭을 재세요.' },
] as const;
export type FitField = typeof FIT_FIELDS[number]['key'];
export type FitInputs = Record<FitField, string>;
export const EMPTY_FIT_INPUTS: FitInputs = { spaceWidth: '', spaceHeight: '', openingWidth: '', frontDistance: '', routeWidth: '' };

export type MeasurementInput = { kind: 'empty' } | { kind: 'invalid'; message: string } | { kind: 'value'; mm: number };
/** 단위는 mm로 고정한다. 빈칸과 0, 잘못 입력한 값은 서로 다르게 취급한다. */
export function parseFitMeasurement(raw: string): MeasurementInput {
  const value = raw.trim();
  if (!value) return { kind: 'empty' };
  const numeric = Number(value.replaceAll(',', ''));
  if ((!/^\d+(\.\d)?$/.test(value) && !/^\d{1,3}(,\d{3})+(\.\d)?$/.test(value)) || numeric <= 0 || numeric > 20000) {
    return { kind: 'invalid', message: '0보다 크고 20,000 이하인 mm 값을 입력하세요. 소수는 한 자리까지 사용할 수 있습니다.' };
  }
  return { kind: 'value', mm: numeric };
}

export interface FitCheck {
  field: FitField;
  label: string;
  kind: 'unknown' | 'invalid' | 'short' | 'measured' | 'manual';
  message: string;
}
export const formatMm = (n: number) => n.toLocaleString('ko-KR', { maximumFractionDigits: 1 });

/** 입력 칸마다 비교하는 설명서 기준. 뒷벽 거리는 최소 후면 간격을 둔다고 가정한 계산값이다. */
export function fridgeFitTargets(product: FridgeFitProduct): Record<Exclude<FitField, 'routeWidth'>, number> {
  return {
    spaceWidth: product.width + 2 * product.sideGap,
    spaceHeight: product.height,
    openingWidth: product.openWidth,
    frontDistance: product.rearGap + product.openDepth,
  };
}

export function fitMargin(product: FridgeFitProduct, key: Exclude<FitField, 'routeWidth'>, value: number): number {
  return Math.round((value - fridgeFitTargets(product)[key]) * 10) / 10;
}

export function checkFridgeFit(product: FridgeFitProduct, inputs: FitInputs): FitCheck[] {
  return FIT_FIELDS.map(({ key, label }): FitCheck => {
    const parsed = parseFitMeasurement(inputs[key]);
    if (parsed.kind === 'empty') return { field: key, label, kind: 'unknown', message: '아직 재지 않았습니다.' };
    if (parsed.kind === 'invalid') return { field: key, label, kind: 'invalid', message: parsed.message };
    const value = parsed.mm;
    if (key === 'routeWidth') return { field: key, label, kind: 'manual', message: `입력한 최소 폭 ${formatMm(value)}mm. 문 분리 여부, 경로 높이, 꺾이는 곳과 엘리베이터 치수를 설치팀에 확인하세요. ${product.transportNote}` };
    const target = fridgeFitTargets(product)[key];
    const margin = fitMargin(product, key, value);
    const basis = key === 'spaceWidth' ? `본체 ${formatMm(product.width)} + 좌우 각 ${product.sideGap} = ${formatMm(target)}mm. ${product.sideBasis}`
      : key === 'spaceHeight' ? `본체 높이 ${formatMm(target)}mm만 비교했습니다. ${product.topNote}`
        : key === 'openingWidth' ? `설명서의 문 개방 폭 ${formatMm(target)}mm(${product.openWidthBasis})와 비교했습니다. ${product.openingNote}`
          : `후면 간격 ${product.rearGap} + 문 개방 깊이 ${formatMm(product.openDepth)} = ${formatMm(target)}mm. 후면을 최소 간격에 맞춘 가정이며, 실제로 더 띄우면 필요한 거리도 늘어납니다.`;
    return {
      field: key, label, kind: margin < 0 ? 'short' : 'measured',
      message: `${margin < 0 ? `${formatMm(-margin)}mm 부족` : margin === 0 ? '기준과 차이 0mm' : `기준보다 ${formatMm(margin)}mm 큼`}. ${basis}${key === 'frontDistance' ? ' 사람이 서거나 지나는 여유는 포함하지 않았습니다.' : ''}`,
    };
  });
}

export const FIT_QUESTIONS = [
  { key: 'route', text: '현관·복도·엘리베이터의 폭·높이와 꺾이는 곳을 사진·치수로 전달하기' },
  { key: 'walls', text: '좌우 벽과 문·서랍이 부딪히는지, 상부 여유와 수평 조절 높이를 설치팀에 확인하기' },
  { key: 'power', text: '접지 콘센트 위치와 전원선이 눌리지 않는 위치를 확인하기' },
  { key: 'use', text: '문을 연 채 식품·서랍을 꺼낼 자리와 사람이 지날 통로를 현장에서 확인하기' },
] as const;
export type FitQuestion = typeof FIT_QUESTIONS[number]['key'];

export function fridgeFitHref(modelNumber?: string): string {
  return `/tools/fridge-fit${modelNumber ? `?model=${encodeURIComponent(modelNumber)}` : ''}`;
}

export function parseFitModel(model: string | null, products: FridgeFitProduct[]): string {
  if (model === null) return products[0]?.modelNumber ?? '';
  return products.find((p) => p.modelNumber === model.trim().toUpperCase())?.modelNumber ?? '';
}

export interface FrontClearance { closed: number; open: number }
/** 뒷벽~맞은편 장애물 거리에서 최소 후면 간격을 둔 본체 앞면과 문 개방 끝까지를 뺀 계산값. 사람이 지나갈 폭의 기준은 정하지 않는다. */
export function fridgeFrontClearance(product: FridgeFitProduct, inputs: FitInputs): FrontClearance | undefined {
  const parsed = parseFitMeasurement(inputs.frontDistance);
  if (parsed.kind !== 'value') return undefined;
  return {
    closed: Math.round((parsed.mm - product.rearGap - product.depth) * 10) / 10,
    open: fitMargin(product, 'frontDistance', parsed.mm),
  };
}

export function fridgeFitRecord(product: FridgeFitProduct, inputs: FitInputs, prepared: FitQuestion[], sceneLabel?: string, recordedAt?: string): string {
  const inputTag = valueTag(sceneLabel ? 'example' : 'measured');
  const clearance = fridgeFrontClearance(product, inputs);
  return [
    `냉장고 설치 상담용 확인표 · ${product.brandLabel} ${product.modelNumber}`,
    ...(recordedAt ? [`기록일: ${recordedAt}`] : []),
    sceneLabel ? `입력 치수의 출처: ${sceneLabel}. 예시 주방 값은 실제 집의 설치 판단에 사용하지 마세요.` : '입력 치수의 출처: 사용자가 직접 입력한 값',
    `값 표시: ${valueTag('official')} 설명서 치수 · ${inputTag} ${sceneLabel ? '가상 주방의 예시 치수' : '집에서 잰 치수'} · ${valueTag('calculated')} 두 값으로 계산한 차이`,
    `${valueTag('official')} 본체 폭×높이×깊이: ${product.width}×${product.height}×${product.depth}mm`,
    `${valueTag('official')} 문 개방 폭 ${formatMm(product.openWidth)}mm(${product.openWidthBasis}) · 뒷면부터 문 개방 깊이 ${formatMm(product.openDepth)}mm(${product.openDepthBasis}) · 후면 간격 ${product.rearGap}mm`,
    '치수 참고 계산이며 설치 가능 판정이 아닙니다. 측정 오차·문 궤적·반입 회전·수평 조절은 확인하지 못했습니다.',
    ...checkFridgeFit(product, inputs).map((c) => `${c.label}: ${parseFitMeasurement(inputs[c.field]).kind === 'value' ? `${inputTag} ${inputs[c.field].trim()}mm` : c.kind === 'invalid' ? '입력 오류' : '미확인'}\n${c.kind === 'short' || c.kind === 'measured' ? `${valueTag('calculated')} ` : ''}${c.message}`),
    ...(clearance ? [`${valueTag('calculated')} 맞은편 장애물까지 남는 거리: 닫힌 본체 앞면부터 ${formatMm(clearance.closed)}mm, 문 개방 깊이 끝부터 ${formatMm(clearance.open)}mm${clearance.open < 0 ? '(문 개방 범위와 겹침)' : ''}. 후면을 최소 간격에 맞춘 가정이며 사람이 서거나 지나는 폭의 기준은 적용하지 않았습니다.`] : []),
    `상부 확인: ${product.topNote}`,
    ...FIT_QUESTIONS.map((q) => `[${prepared.includes(q.key) ? '자료 준비함' : '확인 필요'}] ${q.text}`),
    `대조한 설명서: ${product.document} / ${product.sourcePages} / 확인 ${product.checkedAt}`,
    product.sourceUrl,
    `도구: https://salimlab.kr${fridgeFitHref(product.modelNumber)}`,
    '입력한 치수와 체크 상태는 이 기록에만 포함되며 공유 주소로 복원되지 않습니다.',
  ].join('\n\n');
}
