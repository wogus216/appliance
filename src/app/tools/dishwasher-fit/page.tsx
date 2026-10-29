import type { Metadata } from 'next';
import Link from 'next/link';
import { DishwasherFitTool } from '@/components/tools/dishwasher-fit-tool';
import { buildOpenGraph } from '@/lib/metadata';

const title = '식기세척기 설치 전 확인표';
const description = '정확한 식기세척기 두 모델의 본체·문 개방 치수와 우리 집 자리를 비교하고 급수·배수·전원 상담 항목을 챙기세요.';
export const metadata: Metadata = { title, description, alternates: { canonical: '/tools/dishwasher-fit' }, openGraph: buildOpenGraph({ title, description, url: '/tools/dishwasher-fit' }) };

export default function DishwasherFitPage() {
  return <div id="dishwasher-fit-page" className="mx-auto max-w-6xl px-4 py-8 sm:py-10">
    <nav aria-label="현재 위치" className="mb-6 flex gap-2 text-sm text-gray-600 print:hidden"><Link href="/" className="text-blue-700 hover:underline">홈</Link><span aria-hidden="true">/</span><span>식기세척기 설치 확인표</span></nav>
    <h1 className="text-3xl font-bold leading-tight text-gray-900 print:hidden">식기세척기, 놓는 자리와 문 앞이 충분할까?</h1>
    <p className="mt-4 max-w-prose text-base leading-relaxed text-gray-700 print:hidden">쿠쿠 식탁형과 SK매직 프리스탠딩 두 모델의 공식 본체 치수를 집에서 잰 값과 비교합니다. 쿠쿠 모델은 문을 연 깊이도 확인할 수 있습니다. 미확인 여유와 급·배수 조건은 설치팀에 상담하세요.</p>
    <DishwasherFitTool />
  </div>;
}
