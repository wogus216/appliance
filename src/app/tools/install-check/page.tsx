import type { Metadata } from 'next';
import Link from 'next/link';
import { InstallCheckTool } from '@/components/tools/install-check-tool';
import { InstallCheckGuide } from '@/components/tools/guides/install-check-guide';
import { INSTALL_MODELS } from '@/lib/data/install-check';
import { INSTALL_CATEGORIES } from '@/lib/install-check';
import { buildOpenGraph } from '@/lib/metadata';

const title = '설치 공간 확인표: 세탁기·정수기·에어컨·로봇청소기';
const description = `세탁기·건조기, 정수기, 벽걸이 에어컨, 로봇청소기 스테이션 ${INSTALL_MODELS.length}개 모델의 공식 치수와 원문에서 확인된 여유를 우리 집에서 잰 자리와 비교하고, 확인 필요 조건을 설치 상담 기록으로 남기세요.`;
export const metadata: Metadata = {
  title, description, alternates: { canonical: '/tools/install-check' },
  openGraph: buildOpenGraph({ title, description, url: '/tools/install-check' }),
};

export default function InstallCheckPage() {
  return <div id="install-check-page" className="mx-auto max-w-6xl px-4 py-8 sm:py-10">
    <nav aria-label="현재 위치" className="mb-6 flex gap-2 text-sm text-gray-600 print:hidden"><Link href="/" className="text-blue-700 hover:underline">홈</Link><span aria-hidden="true">/</span><Link href="/tools" className="text-blue-700 hover:underline">도구</Link><span aria-hidden="true">/</span><span>설치 공간 확인표</span></nav>
    <h1 className="text-3xl font-bold leading-tight text-gray-900 print:hidden">놓을 자리, 설명서가 요구하는 여유까지 들어갈까?</h1>
    <p className="mt-4 max-w-prose text-base leading-relaxed text-gray-700 print:hidden">{INSTALL_CATEGORIES.map((category) => `${category.label} ${INSTALL_MODELS.filter((model) => model.category === category.id).length}개`).join(', ')} 모델을 한 화면에서 고릅니다. 품목마다 재는 곳이 달라 입력 칸도 바뀝니다. 원문에서 확인된 여유만 본체 치수에 더해 기준을 만들고, 확인하지 못한 면과 조건은 설치 상담 때 물을 항목으로 남깁니다.</p>
    <p className="mt-3 max-w-prose text-sm leading-relaxed text-gray-700 print:hidden">냉장고와 식기세척기는 문 개방 치수를 따로 다루는 확인표가 있습니다. <Link href="/tools/fridge-fit" className="font-semibold text-blue-700 underline underline-offset-4">냉장고 설치 전 확인표</Link> · <Link href="/tools/dishwasher-fit" className="font-semibold text-blue-700 underline underline-offset-4">식기세척기 설치 전 확인표</Link></p>
    <InstallCheckTool models={INSTALL_MODELS} />
    <InstallCheckGuide models={INSTALL_MODELS} />
  </div>;
}
