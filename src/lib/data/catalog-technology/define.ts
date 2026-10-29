import type { ApplianceTechnologyGuide, GuidePart } from '@/lib/appliance-technology';
import { CATALOG_TECHNOLOGY_SOURCES } from './sources';

/** 작성자가 모델별로 대조한 문장만 받는다. 카탈로그의 자유 문장에서 부품·주기를 추출하지 않는다. */
export function part(id: string, title: string, hint: string, how: string, everyday: string, care: string, limit: string, timing: string, source: string, location: string): GuidePart & { timing: string } {
  return { id, title, hint, heading: title, how, everyday, care, limit, timing, evidence: [{ source, location }] };
}
export function defineGuide(modelNumber: string, slug: string, title: string, question: string, parts: ReturnType<typeof part>[], safetyNote: string, note = ''): ApplianceTechnologyGuide {
  const sources = CATALOG_TECHNOLOGY_SOURCES[modelNumber];
  if (!sources?.length) throw new Error(`기술 지도 출처 없음: ${modelNumber}`);
  return {
    modelNumber, slug, title, question, defaultPart: parts[0].id,
    introduction: '기능별 사용 조건과 직접 챙길 항목을 연결해 확인하세요.',
    diagramNote: `확인한 기능과 관리 영역의 연결도입니다. 실제 내부 구조·배관·전기 회로·부품 배치나 동작 순서를 재현하지 않았습니다.${note ? ` ${note}` : ''}`,
    groups: [
      { title: '기능과 사용 조건', description: '항목을 눌러 이 모델의 특징과 적용 조건을 확인하세요.', parts: parts.slice(0, 2).map((p) => p.id) },
      { title: '함께 챙길 관리와 사용 환경', description: '관리할 곳과 확인되지 않은 범위를 살펴보세요.', parts: parts.slice(2).map((p) => p.id) },
    ].filter((g) => g.parts.length),
    parts,
    careItems: parts.map((p) => ({ id: p.id, title: p.title, timing: p.timing, description: p.care, evidence: p.evidence })),
    sources, safetyNote,
  };
}
