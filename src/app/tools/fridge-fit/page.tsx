import type { Metadata } from 'next';
import Link from 'next/link';
import { FridgeFitTool } from '@/components/tools/fridge-fit-tool';
import { FRIDGE_FIT_PRODUCTS } from '@/lib/data/fridge-installation';
import { buildOpenGraph } from '@/lib/metadata';

const title = '냉장고 설치 전 확인표';
const description = '냉장고 자리와 문 앞 공간을 직접 재고, 정확한 모델의 본체·문 개방 치수와 비교하세요. 부족한 항목과 설치 상담 질문을 저장할 수 있습니다.';
export const metadata: Metadata = {
  title, description, alternates: { canonical: '/tools/fridge-fit' },
  openGraph: buildOpenGraph({ title, description, url: '/tools/fridge-fit' }),
};

export default function FridgeFitPage() {
  return (
    <div id="fridge-fit-page" className="mx-auto max-w-6xl px-4 py-8 sm:py-10">
      <nav aria-label="현재 위치" className="mb-6 flex gap-2 text-sm text-gray-600 print:hidden"><Link href="/" className="text-blue-700 hover:underline">홈</Link><span aria-hidden="true">/</span><span>냉장고 설치 전 확인표</span></nav>
      <h1 className="text-3xl font-bold leading-tight text-gray-900">냉장고, 놓은 뒤에도 문을 열 수 있을까?</h1>
      <p className="mt-4 max-w-prose text-base leading-relaxed text-gray-700 print:hidden">본체가 들어가는 자리와 문을 펼칠 공간은 다릅니다. 집에서 잰 치수를 설명서와 비교하고, 구매·이사 전에 설치팀에 확인할 항목을 정리하세요. 지금은 삼성·LG 냉장고 네 모델을 지원합니다. 예시 주방으로 먼저 둘러본 뒤 우리 집 실측값을 넣어도 두 값은 섞이지 않습니다.</p>
      <FridgeFitTool products={FRIDGE_FIT_PRODUCTS} />
    </div>
  );
}
