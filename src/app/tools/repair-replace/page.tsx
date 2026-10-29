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
    <h1 className="text-3xl font-bold leading-tight text-gray-900 print:hidden">견적을 받았다면, 무엇을 더 확인해야 할까?</h1>
    <p className="mt-4 max-w-prose text-base leading-relaxed text-gray-700 print:hidden">수리 견적과 새 제품 가격을 직접 입력해 확인된 금액만 비교합니다. 보증과 진단, 설치·철거비를 빠뜨리지 않도록 질문을 정리하세요. 가격이 낮은 쪽을 자동으로 권하지 않습니다.</p>
    <RepairReplaceTool />
    <RepairReplaceGuide />
  </div>;
}
