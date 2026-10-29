import { parseFitMeasurement, formatMm, type MeasurementInput } from '@/lib/fridge-fit';
import { valueTag } from '@/lib/value-kind';

/** 설명서에서 찾은 조건만 confirmed로 둔다. 찾지 못한 수치는 unverified로 남기고 판정에 쓰지 않는다. */
export interface InstallCondition {
  topic: string;
  status: 'confirmed' | 'unverified';
  text: string;
  where: string;
}

export interface DishwasherFitProduct {
  model: string;
  slug: string;
  name: string;
  placement: string;
  width: number;
  depth: number;
  height: number;
  openDepth?: number;
  sourceUrl: string;
  sourcePages: string;
  checkedAt: string;
  conditions: InstallCondition[];
}

// 원문 재확인과 해시: research/evidence/2026-10-29/dishwasher-install-source-check.md
export const DISHWASHER_FIT_PRODUCTS: DishwasherFitProduct[] = [
  {
    model: 'CDW-A0611TW', slug: 'cuckoo-dishwasher-table-cdw61', name: '쿠쿠 6인용 식탁형', placement: '조리대 위',
    width: 550, depth: 515, height: 438, openDepth: 812,
    sourceUrl: 'https://www.cuckoo.co.kr/upload_cuckoo/_bo_rep/manual/200424%3Dz0383-0082a0%20rev.1_cdw-a0611t.pdf',
    sourcePages: 'CDW-A0611TS/TW 공용 설명서 4·8~12·32쪽',
    checkedAt: '2026-10-29',
    conditions: [
      { topic: '급수', status: 'confirmed', text: '싱크대 수도의 중간밸브에 급수호스를 연결합니다. 급수호스와 급수 연결 키트는 설치 기사가 가져옵니다. 사용 급수압 0.05~0.8MPa.', where: '8·11·12·32쪽' },
      { topic: '급수 온도', status: 'unverified', text: '허용 급수 온도 범위는 설명서에서 찾지 못했습니다. 시험 조건의 수온 25℃만 적혀 있습니다.', where: '15쪽' },
      { topic: '배수', status: 'confirmed', text: '본체 뒤의 배수호스로 세척 후 오수를 내보냅니다. 배수 연장호스는 별매입니다.', where: '10·11쪽' },
      { topic: '배수호스 길이·배수 높이', status: 'unverified', text: '기본 배수호스 길이와 배수 높이 조건은 설명서에서 찾지 못했습니다.', where: '9~12·32쪽' },
      { topic: '전원', status: 'confirmed', text: '접지된 정격 15A 이상 교류 220V 전용 콘센트. 연장 코드는 220V·15A 이상을 씁니다.', where: '4·9쪽' },
      { topic: '좌우·상부·후면 여유', status: 'unverified', text: '띄울 간격의 수치는 설명서에서 찾지 못했습니다.', where: '4~11·32쪽' },
      { topic: '수평', status: 'confirmed', text: '나사식 다리로 높이를 조절해 수평을 맞춥니다. 조절 범위는 적혀 있지 않습니다.', where: '9쪽' },
      { topic: '열원', status: 'confirmed', text: '급·배수호스와 전원선이 보일러 분배기 등 뜨거운 곳에 닿지 않게 둡니다.', where: '9쪽' },
      { topic: '추가 부품비', status: 'confirmed', text: '연장 전원코드·배수 연장호스는 별매이며 별도 설치로 생기는 추가 부품비는 소비자 부담입니다.', where: '11쪽' },
    ],
  },
  {
    model: 'DWA-81R0D', slug: 'skmagic-touchon-dishwasher-dwa81', name: 'SK매직 12인용 프리스탠딩', placement: '바닥 설치',
    width: 598, depth: 596, height: 845,
    sourceUrl: 'https://m.manual.skmagic.com/2019/model/DWA/DWA81R0D00SL/Manual.htm',
    sourcePages: '공식 공용 설명서 제품 규격·사용 전 준비하기·부속품·별매품, 공통 주의사항 설치 관련',
    checkedAt: '2026-10-29',
    conditions: [
      { topic: '설치 유형', status: 'confirmed', text: '제품 규격 표에서 DWA-81R0D는 프리스탠딩입니다. 설명서의 빌트인 설치 절은 DWA-8***B 계열 대상이라 이 모델에 쓰지 않습니다.', where: '제품 규격·빌트인 설치하기' },
      { topic: '급수', status: 'confirmed', text: '급수 연결구의 중간밸브에 연결하며 부속품에 급수 연결 키트·Y-자관이 있습니다. 사용 수압 0.09~0.78MPa, 수온 60℃ 이하.', where: '제품 규격·사용 전 준비하기·부속품' },
      { topic: '배수', status: 'confirmed', text: '부속품에 배수호스 클램프가 있고 배수호스 연장관·연장 배수호스는 별매입니다.', where: '부속품·별매품' },
      { topic: '배수호스 길이·배수 높이', status: 'unverified', text: '기본 배수호스 길이와 배수 높이 조건은 설명서에서 찾지 못했습니다.', where: '설명서 전체 본문' },
      { topic: '전원', status: 'confirmed', text: '접지된 교류 220V/60Hz 정격 15A 이상 콘센트를 단독으로 씁니다. 연장 코드는 별도 판매하는 220V/15A 이상 접지형을 씁니다.', where: '공통 주의사항 설치 관련' },
      { topic: '후면', status: 'confirmed', text: '제품 뒷면은 벽면에 붙여서 설치합니다. 띄울 간격의 수치는 없습니다.', where: '공통 주의사항 설치 관련' },
      { topic: '좌우·상부 여유', status: 'unverified', text: '띄울 간격의 수치는 설명서에서 찾지 못했습니다.', where: '설명서 전체 본문' },
      { topic: '수평·고정', status: 'unverified', text: '공통 주의사항은 튼튼하고 수평인 바닥에 두고 싱크장에 고정하라고 하지만, 레벨러 40mm 조절 안내는 빌트인 설치 절에만 있어 이 모델의 수평 조절 범위는 확인하지 못했습니다.', where: '공통 주의사항·빌트인 설치하기' },
      { topic: '열원', status: 'confirmed', text: '가스레인지 등 불·고열 제품에서 15cm 이상 떨어뜨려 설치합니다.', where: '공통 주의사항 설치 관련' },
      { topic: '문 개방 깊이', status: 'unverified', text: '문을 연 전체 깊이는 설명서 본문과 도면 이미지에서 찾지 못했습니다. 앞 공간 비교를 제공하지 않습니다.', where: '설명서 전체 본문·도면' },
      { topic: '추가 부품비', status: 'confirmed', text: '연장 전원코드·배수호스 연장관·연장 급수호스·연장 배수호스는 별매이며 추가 부품비는 소비자 부담입니다.', where: '별매품' },
    ],
  },
];

export type DishwasherFitField = 'width' | 'depth' | 'height' | 'openDepth';
export type DishwasherFitInputs = Record<DishwasherFitField, string>;
export const EMPTY_DISHWASHER_FIT_INPUTS: DishwasherFitInputs = { width: '', depth: '', height: '', openDepth: '' };

export function checkDishwasherFit(product: DishwasherFitProduct, inputs: DishwasherFitInputs) {
  const fields: { key: DishwasherFitField; label: string; target?: number }[] = [
    { key: 'width', label: '설치 자리의 실제 폭', target: product.width },
    { key: 'depth', label: '설치 자리의 실제 깊이', target: product.depth },
    { key: 'height', label: '위쪽 장애물까지 높이', target: product.height },
    { key: 'openDepth', label: '뒷면부터 문 앞 장애물까지 거리', target: product.openDepth },
  ];
  return fields.map(({ key, label, target }) => {
    const measured: MeasurementInput = parseFitMeasurement(inputs[key]);
    if (target === undefined) return { key, label, kind: 'manual' as const, message: '확인 필요 · 이 모델의 문 개방 깊이는 공식 자료에서 확인하지 못했습니다. 실제 문 열림과 앞 통로는 설치팀에 확인하세요.' };
    if (measured.kind === 'empty') return { key, label, kind: 'unknown' as const, message: `미측정 · 비교 기준 ${formatMm(target)}mm` };
    if (measured.kind === 'invalid') return { key, label, kind: 'invalid' as const, message: measured.message };
    const difference = Math.round((measured.mm - target) * 10) / 10;
    return { key, label, kind: difference < 0 ? 'short' as const : 'measured' as const,
      message: `${difference < 0 ? `${formatMm(-difference)}mm 부족` : `본체·문 치수보다 ${formatMm(difference)}mm 큼`} · 공식 비교 치수 ${formatMm(target)}mm. 설치 여유·반입·수평은 별도 확인하세요.` };
  });
}

export function dishwasherFitRecord(product: DishwasherFitProduct, inputs: DishwasherFitInputs, prepared: string[], recordedAt?: string): string {
  return [
    `살림랩 식기세척기 설치 상담 기록 · ${product.name} ${product.model}`,
    ...(recordedAt ? [`기록일: ${recordedAt}`] : []),
    `${valueTag('official')} 본체 ${product.width}×${product.depth}×${product.height}mm · ${product.placement}${product.openDepth ? ` · 문을 연 깊이 ${product.openDepth}mm` : ''}`,
    ...checkDishwasherFit(product, inputs).map((check) => {
      const parsed = parseFitMeasurement(inputs[check.key]);
      const entered = parsed.kind === 'value' ? `${valueTag('measured')} ${inputs[check.key].trim()}mm` : parsed.kind === 'invalid' ? '입력 오류' : '미입력';
      return `${check.label}: ${check.kind === 'manual' ? valueTag('unverified') : entered} — ${check.kind === 'short' || check.kind === 'measured' ? `${valueTag('calculated')} ` : ''}${check.message}`;
    }),
    '설치 조건(설명서):',
    ...product.conditions.map((condition) => `- ${valueTag(condition.status === 'confirmed' ? 'official' : 'unverified')} ${condition.topic}: ${condition.text} (${condition.where})`),
    `급수·배수·전원·수평 자료 준비: ${prepared.length ? prepared.join(', ') : '미확인'}`,
    `설명서: ${product.sourcePages} / 원문 재확인 ${product.checkedAt} / ${product.sourceUrl}`,
    '치수 참고 계산이며 설치 가능 판정이 아닙니다. 확인 필요 항목과 실제 시공 조건은 설치팀에 확인하세요.',
    'https://salimlab.kr/tools/dishwasher-fit',
  ].join('\n');
}
