import type { Metadata } from 'next';
import Link from 'next/link';
import { CarePlanTool } from '@/components/tools/care-plan-tool';
import { CarePlanGuide } from '@/components/tools/guides/care-plan-guide';
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
    <nav aria-label="현재 위치" className="mb-6 flex gap-2 text-sm text-gray-600 print:hidden"><Link href="/" className="text-blue-700 hover:underline">홈</Link><span aria-hidden="true">/</span><Link href="/tools" className="text-blue-700 hover:underline">도구</Link><span aria-hidden="true">/</span><span>가전 관리 일정표</span></nav>
    <h1 className="text-3xl font-bold leading-tight text-gray-900 print:hidden">{title}</h1>
    <p className="mt-4 max-w-prose text-base leading-relaxed text-gray-700 print:hidden">명판의 모델명과 마지막 관리일을 준비하세요. 공식 주기가 있는 항목은 다음 확인일이 계산됩니다. 주기가 없는 항목은 날짜를 직접 정해 달력 파일에 담을 수 있습니다.</p>
    <a href="#tool-guide" className="mt-2 inline-flex min-h-11 items-center text-sm font-semibold text-blue-700 underline underline-offset-4 print:hidden">관리 날짜 계산 예시 보기</a>
    <CarePlanTool products={CARE_PLAN_PRODUCTS} />
    <CarePlanGuide products={CARE_PLAN_PRODUCTS} />
  </div>;
}
