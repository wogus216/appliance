import type { Metadata } from 'next';
import Link from 'next/link';
import { CarePlanTool } from '@/components/tools/care-plan-tool';
import { CARE_PLAN_PRODUCTS } from '@/lib/data/care-plan';
import { buildOpenGraph } from '@/lib/metadata';

const title = '가전 관리 일정표';
const description = '정확한 제품 모델과 관리 항목을 고르세요. 설명서에 확인된 주기로 다음 확인일을 계산하거나 직접 날짜를 정해 달력·인쇄용으로 저장할 수 있습니다.';
export const metadata: Metadata = {
  title, description, alternates: { canonical: '/tools/care-plan' },
  openGraph: buildOpenGraph({ title, description, url: '/tools/care-plan' }),
};

export default function CarePlanPage() {
  return <div id="care-plan-page" className="mx-auto max-w-6xl px-4 py-8 sm:py-10">
    <nav aria-label="현재 위치" className="mb-6 flex gap-2 text-sm text-gray-600 print:hidden"><Link href="/" className="text-blue-700 hover:underline">홈</Link><span aria-hidden="true">/</span><span>가전 관리 일정표</span></nav>
    <h1 className="text-3xl font-bold leading-tight text-gray-900 print:hidden">다음에 무엇을, 언제 확인할까?</h1>
    <p className="mt-4 max-w-prose text-base leading-relaxed text-gray-700 print:hidden">공개된 34개 제품에서 관리 항목을 고르세요. 날짜 주기가 확인된 항목은 마지막 관리일을 기준으로 계산하고, 나머지는 직접 점검일을 정할 수 있습니다. 구입일과 관리일은 주소나 서버에 저장하지 않습니다.</p>
    <p className="mt-3 print:hidden"><Link href="/tools/household-care" className="text-sm font-semibold text-blue-700 underline underline-offset-4">여러 가전의 관리 항목을 한곳에 모으기</Link></p>
    <CarePlanTool products={CARE_PLAN_PRODUCTS} />
  </div>;
}
