import type { Metadata } from 'next';
import Link from 'next/link';
import { HouseholdCareTool } from '@/components/tools/household-care-tool';
import { HouseholdCareGuide } from '@/components/tools/guides/household-care-guide';
import { CARE_PLAN_PRODUCTS } from '@/lib/data/care-plan';
import { buildOpenGraph } from '@/lib/metadata';

const title = '우리 집 가전 관리 목록';
const description = '여러 제품의 관리 항목과 확인 날짜를 한 화면에 모으세요. 공식 주기와 직접 정한 날짜를 구별하고 각 설명서를 연결합니다.';
export const metadata: Metadata = { title, description, alternates: { canonical: '/tools/household-care' }, openGraph: buildOpenGraph({ title, description, url: '/tools/household-care' }) };

export default function HouseholdCarePage() {
  return <div id="household-care-page" className="mx-auto max-w-6xl px-4 py-8 sm:py-10">
    <nav aria-label="현재 위치" className="mb-6 flex gap-2 text-sm text-gray-600 print:hidden"><Link href="/" className="text-blue-700 hover:underline">홈</Link><span aria-hidden="true">/</span><Link href="/tools" className="text-blue-700 hover:underline">도구</Link><span aria-hidden="true">/</span><span>우리 집 가전 관리 목록</span></nav>
    <h1 className="text-3xl font-bold leading-tight text-gray-900 print:hidden">집 안의 가전, 무엇을 먼저 관리할까?</h1>
    <p className="mt-4 max-w-prose text-base leading-relaxed text-gray-700 print:hidden">공개된 34개 모델에서 관리 항목을 골라 한곳에 모으세요. 설명서 주기가 확인된 항목만 자동 계산하고, 나머지는 직접 날짜를 정합니다.</p>
    <HouseholdCareTool products={CARE_PLAN_PRODUCTS} />
    <HouseholdCareGuide products={CARE_PLAN_PRODUCTS} />
  </div>;
}
