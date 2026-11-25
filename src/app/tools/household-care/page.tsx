import type { Metadata } from 'next';
import Link from 'next/link';
import { HouseholdCareTool } from '@/components/tools/household-care-tool';
import { HouseholdCareGuide } from '@/components/tools/guides/household-care-guide';
import { CARE_PLAN_PRODUCTS } from '@/lib/data/care-plan';
import { buildOpenGraph } from '@/lib/metadata';

const title = '우리 집 가전 수첩';
const description = '여러 제품의 관리 일정과 구입일·보증서 날짜·수리 기록을 한곳에 모으세요. 공정위 소비자분쟁해결기준의 품목별 기간으로 보증·부품 보유 종료일을 계산하고, 파일로 내보내 보관합니다.';
export const metadata: Metadata = { title, description, alternates: { canonical: '/tools/household-care' }, openGraph: buildOpenGraph({ title, description, url: '/tools/household-care' }) };

export default function HouseholdCarePage() {
  return <div id="household-care-page" className="mx-auto max-w-6xl px-4 py-8 sm:py-10">
    <nav aria-label="현재 위치" className="mb-6 flex gap-2 text-sm text-gray-600 print:hidden"><Link href="/" className="text-blue-700 hover:underline">홈</Link><span aria-hidden="true">/</span><Link href="/tools" className="text-blue-700 hover:underline">도구</Link><span aria-hidden="true">/</span><span>{title}</span></nav>
    <h1 className="text-3xl font-bold leading-tight text-gray-900 print:hidden">{title}</h1>
    <p className="mt-4 max-w-prose text-base leading-relaxed text-gray-700 print:hidden">제품별 관리 일정, 구입일과 수리 기록을 한곳에 모으세요. 품목과 날짜가 확인되면 공정위 기준의 보증 종료일도 볼 수 있습니다. 기록은 현재 브라우저에 남으니 다른 기기로 옮길 때는 파일로 내보내세요.</p>
    <a href="#tool-guide" className="mt-2 inline-flex min-h-11 items-center text-sm font-semibold text-blue-700 underline underline-offset-4 print:hidden">기록 보관과 옮기는 방법 보기</a>
    <HouseholdCareTool products={CARE_PLAN_PRODUCTS} />
    <HouseholdCareGuide products={CARE_PLAN_PRODUCTS} />
  </div>;
}
