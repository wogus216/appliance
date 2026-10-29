import { formatMm, parseFitMeasurement } from '@/lib/fridge-fit';
import { valueTag } from '@/lib/value-kind';

/**
 * 설치 확인의 공통 구조. 식기세척기 확인표의 조건 목록(confirmed/unverified)을 넓혀
 * 본체·실외기·스테이션 치수, 면별 여유, 문 개방, 품목별 상한값까지 같은 모양으로 담는다.
 * 확인된 여유만 기준에 더하고, 확인 필요인 면은 더하지 않은 채 그 사실을 결과에 남긴다.
 */
export type InstallStatus = 'confirmed' | 'unverified';

/** 설명서에서 찾은 조건만 confirmed로 둔다. 찾지 못한 수치는 unverified로 남기고 판정에 쓰지 않는다. */
export interface InstallCondition {
  topic: string;
  status: InstallStatus;
  text: string;
  where: string;
}

export type InstallCategoryId = 'washer' | 'purifier' | 'aircon' | 'robot';
export type InstallPartId = 'body' | 'indoor' | 'outdoor' | 'station' | 'robot';
export type ClearanceSide = 'top' | 'bottom' | 'left' | 'right' | 'front' | 'rear';
export type InstallAxis = 'width' | 'depth' | 'height';
export type InstallLimitKey = 'threshold' | 'heightDiff';

export interface InstallPart {
  id: InstallPartId;
  label: string;
  /** 실외기처럼 원문이 따로 적은 모델명. 없으면 '불명'으로 적는다. */
  model?: string;
  /** mm. 원문이 축을 밝히지 않았으면 null로 두고 계산하지 않는다. */
  width: number | null;
  depth: number | null;
  height: number | null;
  /** 원문 위치. 근거 JSON의 where 문장 안에 그대로 들어 있는 구절이다. */
  where: string;
  /** 치수를 잰 기준점. 원문에 없으면 없다고 적는다. */
  basis: string;
  /** 사용자가 잰 공간과 비교하는 부분인가. 로봇 본체처럼 참고로만 보이는 부분은 false. */
  compare: boolean;
  /** 원문 축 표기 자체가 의심스러울 때의 경고(추정). 값은 바꾸지 않는다. */
  axisNote?: string;
}

export interface InstallClearance {
  part: InstallPartId;
  side: ClearanceSide;
  mm: number | null;
  status: InstallStatus;
  text: string;
  where: string;
  /** 설치 절이 아니라 고장 진단 절에만 나오는 수치. 공식 자료로 쓰되 출처 절을 밝힌다. */
  troubleshooting?: true;
  /** 원문 안에서 엇갈린 값. 두 값과 쪽을 보여 주고 계산에 쓰지 않는다. */
  conflict?: { mm: number; where: string }[];
}

/** 둘레 여유가 아니라 기기를 포함해 확보할 공간의 외곽 치수(로보락 Qrevo Curv). */
export interface InstallEnvelope {
  part: InstallPartId;
  width: number;
  depth: number;
  height: number;
  text: string;
  where: string;
}

/** 문턱 높이·배관 높이차처럼 사용자가 잰 값이 넘지 않아야 하는 안내 값. */
export interface InstallLimit {
  key: InstallLimitKey;
  mm: number | null;
  status: InstallStatus;
  text: string;
  where: string;
  /** 설명서를 못 찾은 모델에서 제품 페이지 사양 표의 값이면 true. */
  productSpec?: true;
}

export interface InstallDoor {
  openDepth: number | null;
  openWidth: number | null;
  basis: string;
  where: string;
}

export interface InstallModelCondition extends InstallCondition {
  /** 설명서를 못 찾은 모델에서 제품 페이지 사양 탭의 값이면 true. 그 밖의 확인 항목은 화면에서 확인 필요로 내린다. */
  productSpec?: true;
}

export interface InstallModel {
  category: InstallCategoryId;
  model: string;
  slug: string;
  name: string;
  document: string;
  sourceUrl: string;
  sourcePages: string;
  sha256: string;
  checkedAt: string;
  /** 공식 설치 설명서를 확보했는가. false면 제품 페이지 사양 값만 공식 자료로 둔다. */
  manualFound: boolean;
  /** 설명서는 있으나 범위가 좁을 때(CE판, 별도 설치 안내서 미확보 등) 상단에 밝힐 문장. */
  manualNote?: string;
  parts: InstallPart[];
  door?: InstallDoor;
  envelope?: InstallEnvelope;
  clearances: InstallClearance[];
  limits: InstallLimit[];
  conditions: InstallModelCondition[];
  notes: string[];
}

export type InstallMeasure =
  | { type: 'axis'; part: InstallPartId; axis: InstallAxis; sides: ClearanceSide[]; door?: true }
  | { type: 'limit'; limit: InstallLimitKey };

export interface InstallField {
  key: string;
  label: string;
  hint: string;
  measure: InstallMeasure;
}

export interface InstallCategory {
  id: InstallCategoryId;
  label: string;
  /** 입력 칸 위에 붙는 재는 방법 요약. 품목마다 다르다. */
  lead: string;
  fields: InstallField[];
  /** 설치 상담에 가져갈 자료. 체크는 조건 충족을 뜻하지 않는다. */
  prepare: string[];
}

export const SIDE_LABELS: Record<ClearanceSide, string> = { top: '위', bottom: '아래', left: '왼쪽', right: '오른쪽', front: '앞', rear: '뒤' };
export const AXIS_LABELS: Record<InstallAxis, string> = { width: '폭', depth: '깊이', height: '높이' };
export const LIMIT_LABELS: Record<InstallLimitKey, string> = { threshold: '넘을 수 있는 문턱 높이', heightDiff: '실내기·실외기 최대 높이차' };

export const INSTALL_CATEGORIES: InstallCategory[] = [
  {
    id: 'washer', label: '세탁기·건조기',
    lead: '세탁기 뒷면이 닿을 벽을 기준으로 폭·앞쪽 거리·위쪽 높이를 잽니다. 문을 연 깊이가 확인된 모델은 같은 앞쪽 거리로 문 앞 공간도 계산합니다.',
    fields: [
      { key: 'width', label: '세탁기 자리 폭', hint: '좌우 벽·가구 사이에서 가장 좁은 곳. 수전·배수구 배관처럼 튀어나온 것을 피해 잽니다.', measure: { type: 'axis', part: 'body', axis: 'width', sides: ['left', 'right'] } },
      { key: 'depth', label: '뒷벽부터 앞 장애물까지 거리', hint: '본체 뒷면이 닿을 벽에서 맞은편 벽·문틀·건조대처럼 앞에서 가장 먼저 걸리는 곳까지 잽니다.', measure: { type: 'axis', part: 'body', axis: 'depth', sides: ['rear', 'front'], door: true } },
      { key: 'height', label: '바닥부터 위쪽 장애물까지 높이', hint: '선반·수납장·수도꼭지 중 가장 낮은 곳까지. 건조기를 위에 올릴 계획이어도 이 칸은 한 대의 높이만 비교합니다.', measure: { type: 'axis', part: 'body', axis: 'height', sides: ['top'] } },
    ],
    prepare: ['냉수·온수 수전 위치', '배수구 위치와 높이', '단독 접지 콘센트', '바닥 수평과 반입 경로'],
  },
  {
    id: 'purifier', label: '정수기',
    lead: '조리대 위에 올리는 정수기는 조리대 윗면이 바닥입니다. 좌우는 벽·다른 가전까지, 깊이는 뒷벽에서 조리대 앞 끝까지, 높이는 상부장 아랫면까지 잽니다.',
    fields: [
      { key: 'width', label: '놓을 자리 폭', hint: '조리대 위에서 좌우 벽·싱크볼 가장자리·옆 가전 사이 가장 좁은 곳을 잽니다.', measure: { type: 'axis', part: 'body', axis: 'width', sides: ['left', 'right'] } },
      { key: 'depth', label: '뒷벽부터 조리대 앞 끝까지 깊이', hint: '뒤쪽 벽(또는 백스플래시)에서 조리대 앞 모서리까지. 본체가 조리대 밖으로 튀어나오지 않는지 보는 값입니다.', measure: { type: 'axis', part: 'body', axis: 'depth', sides: ['rear', 'front'] } },
      { key: 'height', label: '조리대 윗면부터 위쪽 장애물까지 높이', hint: '상부장·선반 아랫면까지 잽니다. 상부장이 없으면 비워 두세요.', measure: { type: 'axis', part: 'body', axis: 'height', sides: ['top'] } },
    ],
    prepare: ['냉수 배관(수전 분기) 위치', '단독 접지 콘센트 위치', '조리대 수평과 상부장 높이'],
  },
  {
    id: 'aircon', label: '벽걸이 에어컨',
    lead: '실내기와 실외기를 따로 잽니다. 실내기는 걸 벽의 가용 폭과 천장부터 아래 장애물까지 세로 공간, 실외기는 놓을 자리의 폭·깊이·높이를 잽니다.',
    fields: [
      { key: 'indoorWidth', label: '실내기 벽면의 가용 폭', hint: '실내기를 걸 높이에서 벽 모서리·커튼박스·붙박이장 사이 가장 좁은 곳을 잽니다.', measure: { type: 'axis', part: 'indoor', axis: 'width', sides: ['left', 'right'] } },
      { key: 'indoorHeight', label: '천장부터 아래 장애물까지 세로 공간', hint: '실내기를 걸 벽에서 천장(몰딩 아래)부터 창틀·가구 윗면처럼 아래에서 처음 걸리는 곳까지 잽니다.', measure: { type: 'axis', part: 'indoor', axis: 'height', sides: ['top', 'bottom'] } },
      { key: 'outdoorWidth', label: '실외기 자리 폭', hint: '실외기실·베란다 받침대 위에서 좌우 벽·난간 사이를 잽니다.', measure: { type: 'axis', part: 'outdoor', axis: 'width', sides: ['left', 'right'] } },
      { key: 'outdoorDepth', label: '실외기 자리 깊이', hint: '실외기 뒷면이 향할 벽에서 앞쪽 루버·난간·문까지 잽니다.', measure: { type: 'axis', part: 'outdoor', axis: 'depth', sides: ['rear', 'front'] } },
      { key: 'outdoorHeight', label: '실외기 자리 높이', hint: '실외기를 올릴 바닥·받침면에서 위쪽 선반·천장까지 잽니다.', measure: { type: 'axis', part: 'outdoor', axis: 'height', sides: ['top'] } },
      { key: 'heightDiff', label: '실내기와 실외기의 높이차', hint: '실내기를 걸 높이와 실외기 받침면 높이의 차이. 같은 층이면 비워 두세요. 5m는 5,000mm로 넣습니다.', measure: { type: 'limit', limit: 'heightDiff' } },
    ],
    prepare: ['실내기 벽의 재질과 배관 구멍 위치', '실외기 자리 사진(실외기실·난간)', '에어컨 전용 회로·차단기 위치', '실내기~실외기 배관 경로'],
  },
  {
    id: 'robot', label: '로봇청소기 스테이션',
    lead: '스테이션을 붙일 벽을 기준으로 좌우 폭, 앞쪽으로 비어 있는 거리, 위쪽 높이를 잽니다. 로봇이 지나갈 길의 가장 높은 문턱도 함께 잽니다.',
    fields: [
      { key: 'width', label: '스테이션 자리 폭', hint: '스테이션을 붙일 벽을 따라 좌우 가구·벽 모서리 사이를 잽니다.', measure: { type: 'axis', part: 'station', axis: 'width', sides: ['left', 'right'] } },
      { key: 'depth', label: '벽부터 앞 장애물까지 거리', hint: '스테이션 뒷면이 닿을 벽에서 정면의 가구·문·통로 경계까지 잽니다.', measure: { type: 'axis', part: 'station', axis: 'depth', sides: ['rear', 'front'] } },
      { key: 'height', label: '바닥부터 위쪽 장애물까지 높이', hint: '콘솔·선반 아래에 둘 때만 잽니다. 위가 비어 있으면 비워 두세요.', measure: { type: 'axis', part: 'station', axis: 'height', sides: ['top'] } },
      { key: 'threshold', label: '로봇이 넘을 가장 높은 문턱', hint: '스테이션에서 청소할 방까지 가는 길의 문턱 중 가장 높은 것. 바닥재 윗면부터 문턱 꼭대기까지 mm로 잽니다.', measure: { type: 'limit', limit: 'threshold' } },
    ],
    prepare: ['스테이션 옆 콘센트 위치', '바닥재와 문턱 사진', 'Wi-Fi 공유기 위치'],
  },
];

export function getInstallCategory(id: InstallCategoryId): InstallCategory {
  return INSTALL_CATEGORIES.find((category) => category.id === id)!;
}

export type InstallInputs = Record<string, string>;
export function emptyInstallInputs(category: InstallCategoryId): InstallInputs {
  return Object.fromEntries(getInstallCategory(category).fields.map((field) => [field.key, '']));
}

/** 설명서를 못 찾은 모델은 제품 페이지 사양 값만 공식 자료로 두고, 나머지 확인 항목은 확인 필요로 내린다. */
export function effectiveStatus(model: Pick<InstallModel, 'manualFound'>, item: { status: InstallStatus; productSpec?: true }): InstallStatus {
  return model.manualFound || item.productSpec ? item.status : 'unverified';
}

export interface InstallCheckNote { kind: 'unverified' | 'conflict' | 'troubleshooting' | 'envelope' | 'axis' | 'basis'; text: string }
export interface InstallCheck {
  id: string;
  field: string;
  label: string;
  kind: 'unknown' | 'invalid' | 'short' | 'measured' | 'manual';
  reference?: number;
  formula?: string;
  difference?: number;
  notes: InstallCheckNote[];
  /** 기준에 더하지 못한(확인 필요·엇갈림·항목 없음) 면. */
  missingSides?: ClearanceSide[];
  message: string;
}

const round1 = (n: number) => Math.round(n * 10) / 10;
/** 식에 적는 순서: 왼쪽 + 폭 + 오른쪽, 뒤 + 깊이 + 앞, 아래 + 높이 + 위. */
const ORDER: Record<InstallAxis, [ClearanceSide, ClearanceSide]> = { width: ['left', 'right'], depth: ['rear', 'front'], height: ['bottom', 'top'] };

function differenceText(difference: number): string {
  return difference < 0 ? `${formatMm(-difference)}mm 부족` : difference === 0 ? '기준과 차이 0mm' : `기준보다 ${formatMm(difference)}mm 큼`;
}

function sideReason(clearance: InstallClearance | undefined): { kind: 'unverified' | 'conflict'; reason: string } {
  if (!clearance) return { kind: 'unverified', reason: '원문 확인 목록에 이 면의 항목이 없습니다' };
  if (clearance.conflict) return { kind: 'conflict', reason: `원문 안에서 값이 엇갈립니다 — ${clearance.conflict.map((c) => `${formatMm(c.mm)}mm(${c.where})`).join(' / ')}. 어느 값도 계산에 쓰지 않았습니다` };
  return { kind: 'unverified', reason: '원문에서 수치를 찾지 못했습니다' };
}

interface AxisReference { reference: number; formula: string; notes: InstallCheckNote[]; missingSides: ClearanceSide[] }

/** 본체 치수 + 같은 축의 확인된 여유. 확인 필요인 면은 더하지 않고 notes에 남긴다. */
export function axisReference(model: InstallModel, part: InstallPart, axis: InstallAxis, sides: ClearanceSide[]): AxisReference | undefined {
  const size = part[axis];
  if (size === null) return undefined;
  const added: { side: ClearanceSide; mm: number }[] = [];
  const notes: InstallCheckNote[] = [];
  const missingSides: ClearanceSide[] = [];
  for (const side of sides) {
    const clearance = model.clearances.find((c) => c.part === part.id && c.side === side);
    if (clearance && clearance.mm !== null && effectiveStatus(model, clearance) === 'confirmed') {
      added.push({ side, mm: clearance.mm });
      if (clearance.troubleshooting) notes.push({ kind: 'troubleshooting', text: `${SIDE_LABELS[side]} ${formatMm(clearance.mm)}mm는 설치 절이 아니라 고장 진단 절의 안내입니다(${clearance.where}).` });
      continue;
    }
    const { kind, reason } = sideReason(clearance);
    missingSides.push(side);
    notes.push({ kind, text: `${SIDE_LABELS[side]} 여유는 확인 필요 — ${reason}.` });
  }
  const skipped = sides.length - added.length;
  if (skipped > 0) notes.push({ kind: 'unverified', text: added.length ? `확인 필요인 면은 ${part.label} 끝까지만 비교했습니다.` : `이 차이는 ${part.label}만 비교했습니다.` });
  if (part.axisNote) notes.push({ kind: 'axis', text: part.axisNote });
  const term = (side: ClearanceSide) => added.filter((a) => a.side === side).map((a) => `${SIDE_LABELS[side]} 여유 ${formatMm(a.mm)}`);
  const [first, last] = ORDER[axis];
  const terms = [...term(first), `${part.label} ${AXIS_LABELS[axis]} ${formatMm(size)}`, ...term(last)];
  const reference = round1(size + added.reduce((sum, a) => sum + a.mm, 0));
  return { reference, formula: added.length ? `${terms.join(' + ')} = ${formatMm(reference)}mm` : `${terms[0]}mm`, notes, missingSides };
}

function compare(base: Omit<InstallCheck, 'kind' | 'message' | 'difference'>, raw: string): InstallCheck {
  const parsed = parseFitMeasurement(raw);
  if (parsed.kind === 'empty') return { ...base, kind: 'unknown', message: `미측정 · 비교 기준 ${formatMm(base.reference!)}mm` };
  if (parsed.kind === 'invalid') return { ...base, kind: 'invalid', message: parsed.message };
  const difference = round1(parsed.mm - base.reference!);
  return { ...base, kind: difference < 0 ? 'short' : 'measured', difference, message: `${differenceText(difference)} · 기준 ${base.formula}` };
}

function axisCheck(model: InstallModel, field: InstallField, measure: Extract<InstallMeasure, { type: 'axis' }>, raw: string): InstallCheck[] {
  const part = model.parts.find((entry) => entry.id === measure.part);
  const checks: InstallCheck[] = [];
  const base = { id: field.key, field: field.key, label: field.label };
  if (model.envelope && model.envelope.part === measure.part) {
    const reference = model.envelope[measure.axis];
    checks.push(compare({ ...base, reference, formula: `확보 공간 외곽 ${AXIS_LABELS[measure.axis]} ${formatMm(reference)}mm(${part?.label ?? '스테이션'} 포함)`, notes: [{ kind: 'envelope', text: `이 값은 둘레 여유가 아니라 확보할 공간의 외곽 치수입니다(${part?.label ?? '스테이션'} 포함). ${part?.label ?? '스테이션'} 치수에 여유를 더하지 않았습니다(${model.envelope.where}).` }] }, raw));
  } else if (!part) {
    checks.push({ ...base, kind: 'manual', notes: [], message: '이 모델에는 비교할 부분의 치수가 없습니다.' });
  } else {
    const result = axisReference(model, part, measure.axis, measure.sides);
    if (!result) checks.push({ ...base, kind: 'manual', notes: [{ kind: 'basis', text: part.where }], message: `확인 필요 · ${part.label}의 ${AXIS_LABELS[measure.axis]} 값을 축이 밝혀진 치수로 확인하지 못해 계산하지 않습니다. ${part.basis}` });
    else checks.push(compare({ ...base, reference: result.reference, formula: result.formula, notes: result.notes, missingSides: result.missingSides }, raw));
  }
  if (measure.door && model.door) {
    const doorBase = { id: `${field.key}-door`, field: field.key, label: '같은 거리 · 문을 연 깊이와 비교' };
    if (model.door.openDepth === null) {
      checks.push({ ...doorBase, kind: 'manual', notes: [], message: `확인 필요 · 문을 연 깊이를 공식 자료에서 찾지 못해 비교하지 않습니다. ${model.door.basis} 문을 완전히 열 공간은 설치팀에 확인하세요.` });
    } else {
      const rear = model.clearances.find((c) => c.part === measure.part && c.side === 'rear');
      const rearMm = rear && rear.mm !== null && effectiveStatus(model, rear) === 'confirmed' ? rear.mm : 0;
      const reference = round1(rearMm + model.door.openDepth);
      const formula = `${rearMm ? `뒤 여유 ${formatMm(rearMm)} + ` : ''}문을 연 깊이 ${formatMm(model.door.openDepth)} = ${formatMm(reference)}mm`;
      checks.push(compare({ ...doorBase, reference, formula, notes: [{ kind: 'basis', text: model.door.basis }, ...(rearMm ? [] : [{ kind: 'unverified' as const, text: '뒤 여유는 확인 필요 — 더하지 않았습니다.' }])] }, raw));
    }
  }
  return checks;
}

function limitCheck(model: InstallModel, field: InstallField, key: InstallLimitKey, raw: string): InstallCheck {
  const base = { id: field.key, field: field.key, label: field.label };
  const limit = model.limits.find((entry) => entry.key === key);
  if (!limit || limit.mm === null || effectiveStatus(model, limit) !== 'confirmed') {
    const why = !limit ? '원문 확인 목록에 이 항목이 없습니다.' : limit.mm !== null ? `${limit.text} 설명서로 확인하지 못한 값이라 비교하지 않습니다.` : limit.text;
    return { ...base, kind: 'manual', notes: [], message: `확인 필요 · ${LIMIT_LABELS[key]}를 공식 자료로 확인하지 못했습니다. ${why}` };
  }
  const notes: InstallCheckNote[] = [{ kind: 'basis', text: `${limit.text} (${limit.where})` }];
  const parsed = parseFitMeasurement(raw);
  if (parsed.kind === 'empty') return { ...base, kind: 'unknown', reference: limit.mm, notes, message: `미측정 · 안내 값 ${formatMm(limit.mm)}mm` };
  if (parsed.kind === 'invalid') return { ...base, kind: 'invalid', reference: limit.mm, notes, message: parsed.message };
  const difference = round1(limit.mm - parsed.mm);
  return {
    ...base, kind: difference < 0 ? 'short' : 'measured', reference: limit.mm, difference, notes,
    message: difference < 0 ? `안내 값 ${formatMm(limit.mm)}mm를 ${formatMm(-difference)}mm 넘음` : difference === 0 ? `안내 값 ${formatMm(limit.mm)}mm와 같음(차이 0mm)` : `안내 값 ${formatMm(limit.mm)}mm보다 ${formatMm(difference)}mm 작음`,
  };
}

/** 입력 칸마다 기준을 만들고 차이를 낸다. 설치 가능 여부는 판정하지 않는다. */
export function checkInstall(model: InstallModel, inputs: InstallInputs): InstallCheck[] {
  return getInstallCategory(model.category).fields.flatMap((field) => {
    const raw = inputs[field.key] ?? '';
    return field.measure.type === 'axis' ? axisCheck(model, field, field.measure, raw) : [limitCheck(model, field, field.measure.limit, raw)];
  });
}

/** 화면·기록에서 쓰는 확인/확인 필요 수. 면별 여유와 조건을 함께 세고, 설명서 없는 모델의 비사양 항목은 확인 필요로 센다. */
export function installStatusCounts(model: InstallModel): { confirmed: number; unverified: number } {
  const statuses = [...model.clearances, ...model.conditions].map((item) => effectiveStatus(model, item));
  return { confirmed: statuses.filter((s) => s === 'confirmed').length, unverified: statuses.filter((s) => s === 'unverified').length };
}

/** 설명 절의 예시 계산. 집 치수는 가상의 값이고, 모델 치수는 데이터에서 읽는다. */
export const INSTALL_EXAMPLES: Record<InstallCategoryId, { model: string; title: string; inputs: InstallInputs }> = {
  washer: { model: 'DV17A9720BV', title: '가상의 세탁실 자리', inputs: { width: '750', depth: '1300', height: '1100' } },
  purifier: { model: 'CHPI-7400N', title: '가상의 싱크대 옆 조리대', inputs: { width: '400', depth: '600', height: '500' } },
  aircon: { model: 'CTH06QBW', title: '가상의 작은 방 벽과 실외기실', inputs: { indoorWidth: '1100', indoorHeight: '450', outdoorWidth: '1000', outdoorDepth: '1200', outdoorHeight: '600', heightDiff: '3000' } },
  robot: { model: 'VR50T95935W', title: '가상의 거실 벽 앞 자리', inputs: { width: '1200', depth: '1500', height: '700', threshold: '12' } },
};

export function installCheckHref(category?: InstallCategoryId, model?: string): string {
  const params = new URLSearchParams();
  if (category) params.set('category', category);
  if (model) params.set('model', model);
  const query = params.toString();
  return `/tools/install-check${query ? `?${query}` : ''}`;
}

export interface InstallSelection { category: InstallCategoryId; model: string; unknownModel?: string }
/** 주소에서는 품목과 모델만 읽는다. 모델이 있으면 그 모델의 품목이 우선이다. */
export function parseInstallSelection(models: InstallModel[], category: string | null, model: string | null): InstallSelection {
  const validCategory = INSTALL_CATEGORIES.find((entry) => entry.id === category)?.id;
  const wanted = model?.trim();
  if (wanted) {
    const found = models.find((entry) => entry.model.toUpperCase() === wanted.toUpperCase());
    if (found) return { category: found.category, model: found.model };
    return { category: validCategory ?? 'washer', model: '', unknownModel: wanted };
  }
  const chosen = validCategory ?? 'washer';
  return { category: chosen, model: models.find((entry) => entry.category === chosen)?.model ?? '' };
}

const dims = (part: InstallPart) => [part.width, part.depth, part.height].map((n) => (n === null ? '?' : formatMm(n))).join('×');

export function installCheckRecord(model: InstallModel, inputs: InstallInputs, prepared: string[], recordedAt?: string): string {
  const category = getInstallCategory(model.category);
  const checks = checkInstall(model, inputs);
  const tag = (status: InstallStatus) => valueTag(status === 'confirmed' ? 'official' : 'unverified');
  return [
    `살림랩 설치 공간 확인 기록 · ${category.label} · ${model.name} ${model.model}`,
    ...(recordedAt ? [`기록일: ${recordedAt}`] : []),
    `값 표시: ${valueTag('official')} 설명서·제조사 페이지 값 · ${valueTag('measured')} 집에서 잰 값 · ${valueTag('calculated')} 두 값으로 계산한 기준과 차이 · ${valueTag('unverified')} 원문에서 확인하지 못한 값`,
    ...(model.manualFound ? [] : [`${valueTag('unverified')} 모델명이 적힌 공식 설치 설명서를 찾지 못함 — 제품 페이지 사양 값만 공식 자료로 썼고, 설치 조건은 확인 필요로 두었습니다.`]),
    ...(model.manualNote ? [`참고: ${model.manualNote}`] : []),
    ...model.parts.map((part) => `${valueTag('official')} ${part.label}${part.model ? `(${part.model})` : ''} 폭×깊이×높이 ${dims(part)}mm · ${part.where}${part.axisNote ? ` · ${part.axisNote}` : ''}`),
    ...(model.envelope ? [`${valueTag('official')} 확보 공간 외곽 폭×깊이×높이 ${formatMm(model.envelope.width)}×${formatMm(model.envelope.depth)}×${formatMm(model.envelope.height)}mm · ${model.envelope.where}`] : []),
    ...(model.door ? [`${model.door.openDepth !== null ? `${valueTag('official')} 문을 연 깊이 ${formatMm(model.door.openDepth)}mm` : `${valueTag('unverified')} 문을 연 깊이 없음`} · ${model.door.basis}`] : []),
    '',
    '잰 값과 기준:',
    ...checks.map((check) => {
      const parsed = parseFitMeasurement(inputs[check.field] ?? '');
      const entered = check.kind === 'manual' ? valueTag('unverified') : parsed.kind === 'value' ? `${valueTag('measured')} ${(inputs[check.field] ?? '').trim()}mm` : parsed.kind === 'invalid' ? '입력 오류' : '미입력';
      const calc = check.kind === 'short' || check.kind === 'measured' ? `${valueTag('calculated')} ` : '';
      return [`- ${check.label}: ${entered} — ${calc}${check.message}`, ...check.notes.map((note) => `  · ${note.kind === 'unverified' || note.kind === 'conflict' ? `${valueTag('unverified')} ` : ''}${note.text}`)].join('\n');
    }),
    '',
    '면별 여유(원문):',
    ...model.clearances.map((c) => {
      const part = model.parts.find((entry) => entry.id === c.part);
      const status = effectiveStatus(model, c);
      return `- ${tag(status)} ${part ? `${part.label} ` : ''}${SIDE_LABELS[c.side]} ${c.mm !== null && status === 'confirmed' ? `${formatMm(c.mm)}mm` : '수치 확인 필요'}${c.troubleshooting ? ' (고장 진단 절의 안내)' : ''}${c.conflict ? ` (원문 안에서 엇갈림: ${c.conflict.map((v) => `${formatMm(v.mm)}mm ${v.where}`).join(' / ')})` : ''} — ${c.where}`;
    }),
    '',
    '설치 조건(원문):',
    ...model.conditions.map((c) => `- ${tag(effectiveStatus(model, c))} ${c.topic}: ${c.text} (${c.where})`),
    '',
    `상담 자료 준비: ${prepared.length ? prepared.join(', ') : '미확인'}`,
    `원문: ${model.document} / ${model.sourcePages} / 확인 ${model.checkedAt}`,
    model.sourceUrl,
    '치수 참고 계산이며 설치 가능 판정이 아닙니다. 확인 필요 항목과 실제 시공 조건은 설치팀·제조사에 확인하세요.',
    `도구: https://salimlab.kr${installCheckHref(model.category, model.model)}`,
    '입력한 치수와 체크 상태는 이 기록에만 들어가며 주소로 복원되지 않습니다.',
  ].join('\n');
}
