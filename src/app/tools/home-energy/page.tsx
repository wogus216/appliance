import type { Metadata } from 'next';
import Link from 'next/link';
import { HomeEnergyTool } from '@/components/tools/home-energy-tool';
import { HomeEnergyGuide } from '@/components/tools/guides/home-energy-guide';
import { HomeEnergyBillGuide } from '@/components/tools/home-energy-bill-guide';
import { buildOpenGraph } from '@/lib/metadata';

const title = '우리 집 가전 전력 기록';
const description = '기기별 누적 kWh와 측정 일수를 30일 사용량으로 환산하고 공단 신고값과 나란히 보세요. 기기 사용분이 아직 포함되지 않은 가구 사용량에 추가하는 요금 가정도 계산합니다.';
export const metadata: Metadata = { title, description, alternates: { canonical: '/tools/home-energy' }, openGraph: buildOpenGraph({ title, description, url: '/tools/home-energy' }) };

export default function HomeEnergyPage() {
  return <div id="home-energy-page" className="mx-auto max-w-6xl px-4 py-8 sm:py-10">
    <nav aria-label="현재 위치" className="mb-6 flex gap-2 text-sm text-gray-600 print:hidden"><Link href="/" className="text-blue-700 hover:underline">홈</Link><span aria-hidden="true">/</span><Link href="/tools" className="text-blue-700 hover:underline">도구</Link><span aria-hidden="true">/</span><span>우리 집 전력 기록</span></nav>
    <h1 className="text-3xl font-bold leading-tight text-gray-900 print:hidden">이 가전, 우리 집에서 실제로 얼마나 썼을까?</h1>
    <p className="mt-4 max-w-prose text-base leading-relaxed text-gray-700 print:hidden">기기 한 대에서 측정한 누적 kWh와 기간을 넣으면 30일 기준으로 환산합니다. 월간 kWh 신고가 있는 냉장고·에어컨·정수기 모델은 공단 신고값을 함께 볼 수 있습니다. 요금 계산은 이 기기가 아직 포함되지 않은 가구 사용량에 기기 사용분을 추가하는 가정입니다. 기존 기기의 실제 청구액을 분리하지는 않습니다. 입력 내용은 서버나 주소에 저장하지 않으며, 원하면 이 브라우저에만 기록을 저장합니다.</p>
    <HomeEnergyTool />
    <HomeEnergyGuide />
    <HomeEnergyBillGuide />
  </div>;
}
