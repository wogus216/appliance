import type { Appliance } from '@/types/appliance';
import { allAppliances } from '@/lib/data/appliances';
import { WATER_PURIFIER_MODELS } from '@/lib/data/water-purifier-cost';
import { INSTALL_MODELS } from '@/lib/data/install-check';
import { getPurifierTechnology } from '@/lib/data/purifier-technology';
import { effectiveStatus, installCheckHref, SIDE_LABELS } from '@/lib/install-check';
import type { CostSource } from '@/lib/water-purifier-cost';

export interface PurifierComparisonFact {
  lines: string[];
  sources: CostSource[];
}
export interface PurifierComparisonFacts {
  modelNumber: string;
  management: PurifierComparisonFact;
  filters: PurifierComparisonFact;
  space: PurifierComparisonFact;
  connections: PurifierComparisonFact;
  installHref: string;
}
export type PurifierComparisonMap = Record<string, PurifierComparisonFacts>;
const unverified = (): PurifierComparisonFact => ({ lines: ['이 정확한 모델의 자료는 확인 필요입니다. 제조사 설명서와 계약서를 확인하세요.'], sources: [] });
// 비용 도구의 합산 설명은 관리 조건을 비교하는 이 표에서 제외한다.
const managementDescription = (note: string) => note.replace(' 필터 구입비를 따로 더하지 않았습니다.', '').replace(' 필터 자재비만 계산했습니다.', '');

/** 원자료는 서버에서 대조하고 정확한 모델의 표시 문장과 출처만 클라이언트에 전달한다. */
export function getPurifierComparisonFacts(
  products: Pick<Appliance, 'category' | 'slug' | 'modelNumber'>[] = allAppliances,
): PurifierComparisonMap {
  return Object.fromEntries(products.filter((product) => product.category === '정수기').map((product) => {
    const cost = WATER_PURIFIER_MODELS.find((entry) => entry.modelNumber === product.modelNumber && entry.slug === product.slug);
    const install = INSTALL_MODELS.find((entry) => entry.category === 'purifier' && entry.model === product.modelNumber && entry.slug === product.slug);
    const technology = getPurifierTechnology(product.modelNumber);
    const manual = technology?.slug === product.slug ? technology.sources.find((source) => source.id === 'manual') : undefined;
    const management = unverified();
    const filters = unverified();
    if (cost?.available) {
      management.lines = [managementDescription(cost.rental.includedNote), `일시불 구매: ${managementDescription(cost.purchase.note)}`];
      management.sources = [cost.rental.sources[0], ...cost.purchase.sources.filter((source, index) => index === 0 || source.label.includes('설명서'))];
      if (cost.purchase.filters.length) {
        filters.lines = cost.purchase.filters.map((filter) => `${filter.name} (${filter.partNumber}): ${filter.cycleMonths}개월 · ${filter.cycleBasis}`);
        filters.sources = cost.purchase.sources.filter((source) => source.label.includes('설명서'));
      }
    } else if (cost) {
      management.lines = cost.facts.filter((fact) => fact.label === '필터 구매·교체').map((fact) => fact.value);
      management.lines.push('렌탈·구독 관리 계약과 방문 주기는 확인 필요입니다.');
      management.sources = cost.facts.filter((fact) => fact.label === '필터 구매·교체').map((fact) => fact.source);
      const filterFact = cost.facts.find((fact) => fact.label === '필터 교체 주기');
      if (filterFact) Object.assign(filters, { lines: [filterFact.value], sources: [filterFact.source] });
    }
    if (manual && technology) {
      const filter = technology.careItems.find((item) => item.id === 'filters');
      if (filter) {
        filters.lines = [`${filter.title}: ${filter.timing}`, filter.description];
        filters.sources = [{ label: `${manual.title} · ${filter.pages}`, url: manual.url, checkedAt: manual.checkedAt }];
      }
      const icebin = technology.careItems.find((item) => item.id === 'icebin');
      if (icebin) {
        management.lines.push(`${icebin.title}: ${icebin.description}`);
        management.sources.push({ label: `${manual.title} · ${icebin.pages}`, url: manual.url, checkedAt: manual.checkedAt });
      }
    }
    const space = unverified();
    const connections = unverified();
    if (install) {
      const source = { label: install.document, url: install.sourceUrl, checkedAt: install.checkedAt };
      const body = install.parts.find((part) => part.id === 'body');
      space.lines = [
        ...(body ? [`본체 폭×깊이×높이: ${body.width ?? '미확인'}×${body.depth ?? '미확인'}×${body.height ?? '미확인'}mm (${body.where})`, body.basis] : ['본체 치수 확인 필요']),
        ...install.clearances.map((clearance) => `${effectiveStatus(install, clearance) === 'unverified' || clearance.conflict ? '확인 필요 · ' : ''}${SIDE_LABELS[clearance.side]}: ${clearance.text} (${clearance.where})`),
      ];
      space.sources = [source];
      connections.lines = install.conditions.filter((condition) => ['급수', '배수', '배수 높이', '전원'].includes(condition.topic)).map((condition) => `${effectiveStatus(install, condition) === 'unverified' ? '확인 필요 · ' : ''}${condition.topic}: ${condition.text} (${condition.where})`);
      connections.sources = [source];
    }
    for (const fact of [management, filters, space, connections]) {
      fact.sources = fact.sources.filter((source, index, sources) => sources.findIndex((other) => other.url === source.url && other.label === source.label) === index);
    }
    return [product.slug, { modelNumber: product.modelNumber, management, filters, space, connections, installHref: install ? installCheckHref('purifier', install.model) : '/tools/install-check' }];
  }));
}
