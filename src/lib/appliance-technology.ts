export interface GuideEvidence { source: string; location: string; pdfPage?: number }
export interface GuideSource { id: string; label: string; url: string; checkedAt: string }
export interface GuidePart {
  id: string; title: string; hint: string; heading: string;
  how: string; everyday: string; care: string; limit: string; evidence: GuideEvidence[];
}
export interface GuideCare {
  id: string; title: string; timing: string; description: string; evidence: GuideEvidence[];
}
export interface ApplianceTechnologyGuide {
  modelNumber: string; slug: string; title: string; question: string; introduction: string;
  diagramNote: string; defaultPart: string;
  groups: { title: string; description: string; parts: string[] }[];
  parts: GuidePart[]; careItems: GuideCare[]; sources: GuideSource[]; safetyNote: string;
}

export function selectedGuidePart(guide: ApplianceTechnologyGuide, id: string | null): GuidePart | undefined {
  return guide.parts.find((part) => part.id === (id === null ? guide.defaultPart : id));
}
export function technologyGuideHref(guide: ApplianceTechnologyGuide, part?: string): string {
  return `/products/${guide.slug}${part ? `?tech=${encodeURIComponent(part)}` : ''}#technology-map`;
}
export function guideEvidenceLink(guide: ApplianceTechnologyGuide, evidence: GuideEvidence): { label: string; href: string } | undefined {
  const source = guide.sources.find((source) => source.id === evidence.source);
  return source ? { label: `${source.label} · ${evidence.location}`, href: source.url + (evidence.pdfPage ? `#page=${evidence.pdfPage}` : '') } : undefined;
}
export function technologyGuideRecord(guide: ApplianceTechnologyGuide, selected: string | null, checked: string[]): string {
  const part = selected === null ? undefined : selectedGuidePart(guide, selected);
  const references = (items: GuideEvidence[]) => items.flatMap((item) => {
    const link = guideEvidenceLink(guide, item);
    return link ? [`${link.label}\n${link.href}`] : [];
  }).join('\n');
  return [
    `${guide.title} · ${guide.modelNumber} 기술·관리 카드`, guide.diagramNote,
    ...(part ? [`선택 항목: ${part.title}\n${part.how}\n생활에서: ${part.everyday}\n관리할 곳: ${part.care}\n해석 범위: ${part.limit}\n${references(part.evidence)}`] : []),
    '체크는 설명서와 내 관리 내역을 확인했다는 표시입니다. 청소·교체 완료나 성능 판정이 아닙니다.',
    ...guide.careItems.map((item) => `[${checked.includes(item.id) ? '내역 확인함' : '확인 필요'}] ${item.title}: ${item.timing}\n${item.description}\n${references(item.evidence)}`),
    guide.safetyNote,
    ...guide.sources.map((source) => `${source.label} · 원문 확인 ${source.checkedAt}\n${source.url}`),
    `최신 카드: https://salimlab.kr${technologyGuideHref(guide, part?.id)}`,
    '체크 상태는 공유 주소에 포함되지 않으며 새로고침하면 비워집니다.',
  ].join('\n\n');
}
