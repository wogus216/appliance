import type { Metadata } from 'next';
import Link from 'next/link';
import { RepairReplaceTool } from '@/components/tools/repair-replace-tool';
import { RepairReplaceGuide } from '@/components/tools/guides/repair-replace-guide';
import { buildOpenGraph } from '@/lib/metadata';

const title = '가전 수리·교체 비교표';
const description = '받은 수리 견적과 새 제품 가격을 비교하고, 빠진 비용·보증·진단 정보를 확인하는 판단 카드입니다.';
export const metadata: Metadata = { title, description, alternates: { canonical: '/tools/repair-replace' }, openGraph: buildOpenGraph({ title, description, url: '/tools/repair-replace' }) };

export default function RepairReplacePage() {
  return <div id="repair-replace-page" className="mx-auto max-w-6xl px-4 py-8 sm:py-10">
    <nav aria-label="현재 위치" className="mb-6 flex gap-2 text-sm text-gray-600 print:hidden"><Link href="/" className="text-blue-700 hover:underline">홈</Link><span aria-hidden="true">/</span><Link href="/tools" className="text-blue-700 hover:underline">도구</Link><span aria-hidden="true">/</span><span>수리·교체 비교표</span></nav>
    <h1 className="text-3xl font-bold leading-tight text-gray-900 print:hidden">{title}</h1>
    <p className="mt-4 max-w-prose text-base leading-relaxed text-gray-700 print:hidden">받은 수리 견적과 새 제품 가격을 준비하세요. 설치·철거·배송비는 금액을 확인한 항목부터 적으세요. 비교표는 입력한 금액의 차이와 보증·진단·추가 비용에서 더 물어볼 질문을 보여 줍니다.</p>
    <a href="#tool-guide" className="mt-2 inline-flex min-h-11 items-center text-sm font-semibold text-blue-700 underline underline-offset-4 print:hidden">견적 입력 예시와 계산식 보기</a>
    <RepairReplaceTool />
    <RepairReplaceGuide />
  </div>;
}
