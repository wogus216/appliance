import type { Metadata } from 'next';
import Link from 'next/link';
import { HomeEnergyTool } from '@/components/tools/home-energy-tool';
import { buildOpenGraph } from '@/lib/metadata';

const title = '우리 집 가전 전력 기록';
const description = '기기별 누적 kWh와 측정 일수를 입력해 30일 사용량으로 환산하고, 정확한 냉장고 모델의 공식 신고값과 나란히 확인하세요.';
export const metadata: Metadata = { title, description, alternates: { canonical: '/tools/home-energy' }, openGraph: buildOpenGraph({ title, description, url: '/tools/home-energy' }) };

export default function HomeEnergyPage() {
  return <div id="home-energy-page" className="mx-auto max-w-6xl px-4 py-8 sm:py-10">
    <nav aria-label="현재 위치" className="mb-6 flex gap-2 text-sm text-gray-600 print:hidden"><Link href="/" className="text-blue-700 hover:underline">홈</Link><span aria-hidden="true">/</span><span>우리 집 전력 기록</span></nav>
    <h1 className="text-3xl font-bold leading-tight text-gray-900 print:hidden">이 가전, 우리 집에서 실제로 얼마나 썼을까?</h1>
    <p className="mt-4 max-w-prose text-base leading-relaxed text-gray-700 print:hidden">기기 한 대에서 측정한 누적 kWh와 기간을 넣으면 30일 기준으로 환산합니다. 정확한 냉장고 네 모델은 공단 신고값을 함께 볼 수 있습니다. 입력 내용은 서버나 주소에 저장하지 않습니다.</p>
    <HomeEnergyTool />
  </div>;
}
