import { allAppliances } from '@/lib/data/appliances';
import { getApplianceTechnologyGuide } from '@/lib/data/appliance-technology';
import { getPurifierTechnology } from '@/lib/data/purifier-technology';
import { guideEvidenceLink } from '@/lib/appliance-technology';
import type { CareInterval, CarePlanProduct } from '@/lib/care-plan';

/** Only periods explicitly checked in the exact model's official care guidance. */
export const CARE_PLAN_INTERVALS: Record<string, CareInterval> = {
  'CHPI-7400N:outlet': { unit: 'days', amount: 7, basis: '출수구 주 1회 청소 안내' },
  'CHPI-7400N:tray': { unit: 'days', amount: 7, basis: '물받이 주 1회 청소 안내 · 고인 물은 하루 이상 방치하지 않음' },
  'CHPI-7400N:filters': { unit: 'months', amount: 4, basis: '필터 세트 예상 4개월 · 하루 10L 사용 기준. 수질·관리 계약에 따라 달라짐' },
  'AR07A9170HCN:filter': { unit: 'days', amount: 14, basis: '먼지거름 필터 약 2주 청소 · 하루 8시간 사용 기준. 먼지가 많으면 더 자주 확인' },
  'WF24A9500KE:drain': { unit: 'days', amount: 7, basis: '배수 필터 주 1회 이상 청소 안내. 급수 거름망은 별도 확인' },
  'S8 Pro Ultra:brush': { unit: 'days', amount: 14, basis: '메인 브러시 2주 청소 안내. 6~12개월 교체 기준은 별도' },
  'S8 Pro Ultra:filter': { unit: 'days', amount: 14, basis: '본체 세척 필터 2주 청소 안내. 6~12개월 교체 기준은 별도' },
  'Qrevo Curv:brush': { unit: 'days', amount: 14, basis: '메인 브러시 2주 청소 안내. 6~12개월 교체 기준은 별도' },
  'Qrevo Curv:filter': { unit: 'days', amount: 14, basis: '본체 세척 필터 2주 청소 안내. 6~12개월 교체 기준은 별도' },
};

export const CARE_PLAN_PRODUCTS: CarePlanProduct[] = allAppliances.map((appliance) => {
  const purifier = getPurifierTechnology(appliance.modelNumber);
  if (purifier) {
    const manual = purifier.sources.find((source) => source.id === 'manual');
    if (!manual) throw new Error(`관리 일정 설명서 없음: ${appliance.modelNumber}`);
    return {
      modelNumber: appliance.modelNumber, slug: appliance.slug, title: purifier.title, category: appliance.category,
      items: purifier.careItems.map((care) => ({
        id: care.id, title: care.title, timing: care.timing, description: care.description,
        sourceLabel: `${manual.title} · ${care.pages}`, sourceUrl: manual.url,
        interval: CARE_PLAN_INTERVALS[`${appliance.modelNumber}:${care.id}`],
      })),
    };
  }
  const guide = getApplianceTechnologyGuide(appliance.modelNumber);
  if (!guide) throw new Error(`관리 일정 기술 지도 없음: ${appliance.modelNumber}`);
  return {
    modelNumber: appliance.modelNumber, slug: appliance.slug, title: guide.title, category: appliance.category,
    items: guide.careItems.map((care) => {
      const source = guideEvidenceLink(guide, care.evidence[0]);
      if (!source) throw new Error(`관리 일정 근거 없음: ${appliance.modelNumber}:${care.id}`);
      return {
        id: care.id,
        // The shared guide groups inlet mesh with the drain filter. Only the drain filter has a weekly interval.
        title: appliance.modelNumber === 'WF24A9500KE' && care.id === 'drain' ? '배수 필터 청소' : care.title,
        timing: care.timing, description: care.description,
        sourceLabel: source.label, sourceUrl: source.href,
        interval: CARE_PLAN_INTERVALS[`${appliance.modelNumber}:${care.id}`],
      };
    }),
  };
});
