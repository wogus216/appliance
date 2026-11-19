import type { Metadata } from 'next';
import Link from 'next/link';
import { WaterPurifierCostGuide } from '@/components/tools/guides/water-purifier-cost-guide';
import { WaterPurifierCostTool } from '@/components/tools/water-purifier-cost-tool';
import { buildOpenGraph } from '@/lib/metadata';

const title = '정수기 렌탈·구매 비용 비교';
const description = '코웨이 CHPI-7400N·LG WD523ACB의 공식 렌탈료·구매가·필터값으로 같은 기간 합계를 비교하고, 약관 산식대로 중도해지 비용을 계산합니다. 확인 못 한 비용은 빼고 부분 합계로 표시합니다.';
export const metadata: Metadata = { title, description, alternates: { canonical: '/tools/water-purifier-cost' }, openGraph: buildOpenGraph({ title, description, url: '/tools/water-purifier-cost' }) };

export default function WaterPurifierCostPage() {
  return <div id="water-purifier-cost-page" className="mx-auto max-w-6xl px-4 py-8 sm:py-10">
    <nav aria-label="현재 위치" className="mb-6 flex gap-2 text-sm text-gray-600 print:hidden"><Link href="/" className="text-blue-700 hover:underline">홈</Link><span aria-hidden="true">/</span><Link href="/tools" className="text-blue-700 hover:underline">도구</Link><span aria-hidden="true">/</span><span>정수기 렌탈·구매 비용 비교</span></nav>
    <h1 className="text-3xl font-bold leading-tight text-gray-900 print:hidden">정수기, 렌탈과 구매는 같은 기간에 얼마나 다를까?</h1>
    <p className="mt-4 max-w-prose text-base leading-relaxed text-gray-700 print:hidden">제조사 공식 화면의 렌탈료·등록비·구입가·필터값을 기본으로 채우고, 내 계약서 값으로 바꿀 수 있습니다. 확인하지 못한 비용은 합계에 넣지 않고 따로 적습니다. 렌탈과 구매 중 하나를 권하지 않습니다.</p>
    <WaterPurifierCostTool />
    <WaterPurifierCostGuide />
  </div>;
}
