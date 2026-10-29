export type PurifierPart = 'nano' | 'carbon' | 'water' | 'cold' | 'ice' | 'hot';
export interface TechnologySource {
  id: 'manual' | 'energy';
  title: string;
  url: string;
  checkedAt: string;
}
export interface TechnologyPart {
  id: PurifierPart;
  label: string;
  shortLabel: string;
  hint: string;
  heading: string;
  explanation: string;
  everyday: string;
  care: string;
  limit: string;
  pages: string;
}
export interface PurifierCareItem {
  id: 'outlet' | 'tray' | 'filters' | 'icebin';
  title: string;
  timing: string;
  description: string;
  pages: string;
}
export interface PurifierTechnology {
  modelNumber: string;
  slug: string;
  title: string;
  diagramNote: string;
  sources: TechnologySource[];
  parts: TechnologyPart[];
  careItems: PurifierCareItem[];
  energy: { hotRatedWatts: number; monthlyDeclaredKwh: number; declarationId: string; testLab: string };
}

export function getTechnologyPart(technology: PurifierTechnology, id: string | null): TechnologyPart | undefined {
  return technology.parts.find((part) => part.id === (id === null ? 'cold' : id));
}

export function purifierTechnologyHref(technology: PurifierTechnology, part?: PurifierPart): string {
  return `/products/${technology.slug}${part ? `?tech=${part}` : ''}#technology-map`;
}

export function purifierCareRecord(technology: PurifierTechnology, selected: PurifierPart | null, prepared: string[]): string {
  const part = selected ? getTechnologyPart(technology, selected) : undefined;
  return [
    `${technology.title} · ${technology.modelNumber} 기술·관리 카드`,
    technology.diagramNote,
    ...(part ? [`선택 항목: ${part.label}\n${part.explanation}\n생활에서: ${part.everyday}\n관리: ${part.care}\n한계: ${part.limit}\n설명서 ${part.pages}`] : []),
    '관리 항목 — 체크는 설명서와 내 관리 내역을 확인했다는 표시이며, 세척·교체 완료나 수질 판정이 아닙니다.',
    ...technology.careItems.map((item) => `[${prepared.includes(item.id) ? '내역 확인함' : '확인 필요'}] ${item.title}: ${item.timing}\n${item.description}\n설명서 ${item.pages}`),
    `전력 수치: 온수 정격 ${technology.energy.hotRatedWatts.toLocaleString('ko-KR')}W / 공단 월간 신고 ${technology.energy.monthlyDeclaredKwh}kWh/월. 정격 전력과 월 사용량은 서로 다른 수치이며, 실제 요금이나 가정의 실측값이 아닙니다.`,
    ...technology.sources.map((source) => `${source.title} · 확인 ${source.checkedAt}\n${source.url}`),
    `최신 카드: https://salimlab.kr${purifierTechnologyHref(technology, part?.id)}`,
    '체크 상태는 주소에 저장되지 않습니다. 정확한 모델 라벨과 설명서 전체 절차를 확인하세요.',
  ].join('\n\n');
}
