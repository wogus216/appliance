import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_NAME, SITE_DESCRIPTION } from '@/lib/constants';
import { buildOpenGraph } from '@/lib/metadata';
import { AdSenseScript } from '@/components/adsense-script';
import { ErrorCodeFinder } from '@/components/home/error-code-finder';
import { getErrorCodeDirectory, resolvePopularCodes } from '@/lib/error-codes';

export const metadata: Metadata = {
  title: SITE_NAME, description: SITE_DESCRIPTION, alternates: { canonical: '/' },
  openGraph: buildOpenGraph({ title: SITE_NAME, description: SITE_DESCRIPTION, url: '/' }),
};

export default function HomePage() {
  return <>
    <AdSenseScript />
    <div className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
      <header className="mb-10 max-w-3xl">
        <h1 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl">가전에 뜬 에러코드,<br className="hidden sm:block" /> 무엇부터 확인할까요?</h1>
        <p className="mt-5 max-w-prose leading-relaxed text-gray-700">제품군과 브랜드를 골라 표시의 뜻, 직접 확인할 수 있는 범위, 사용을 멈추고 문의해야 할 조건을 찾으세요. 제조사 설명서·서비스 자료의 적용 모델과 출처를 함께 확인할 수 있습니다.</p>
        <p className="mt-4 text-sm leading-relaxed text-gray-600">누수·연기·타는 냄새·가스 냄새가 있으면 코드 검색보다 안전 확보와 제조사·긴급기관 문의가 먼저입니다. 위험한 부품을 분해하거나 전원을 반복해서 켜지 마세요.</p>
      </header>
      <div id="home-error-finder" className="scroll-mt-24"><ErrorCodeFinder directory={getErrorCodeDirectory()} popular={resolvePopularCodes()} /></div>
      <section aria-labelledby="next-step-heading" className="border-t pt-8">
        <h2 id="next-step-heading" className="text-2xl font-bold text-gray-900">확인한 다음에 할 일</h2>
        <ul className="mt-5 divide-y divide-gray-200">
          {[
            ['/tools/repair-replace', '수리 견적과 교체 비용 비교', '받은 견적과 새 제품 가격을 적고, 빠진 비용과 보증·진단 질문을 챙기세요.'],
            ['/tools/household-care', '구입일·수리·상담 기록 보관', '지원 모델의 관리 날짜와 제품별 상담 내용을 이 브라우저에 모아 두세요.'],
            ['/tools/care-plan', '다음 관리 날짜 정하기', '지원 모델의 공식 관리 주기를 확인하고 달력에 남기세요.'],
          ].map(([href, title, description]) => <li key={href} className="py-5"><Link href={href} className="inline-flex min-h-11 items-center font-semibold text-blue-700 underline underline-offset-4">{title}</Link><p className="mt-1 max-w-prose text-sm leading-relaxed text-gray-700">{description}</p></li>)}
        </ul>
      </section>
      <section aria-labelledby="washer-guide-heading" className="mt-8 border-t pt-8">
        <h2 id="washer-guide-heading" className="text-xl font-bold text-gray-900">삼성 세탁기 표시를 찾고 있나요?</h2>
        <p className="mt-3 max-w-prose leading-relaxed text-gray-700">4C·5C·UE·dC·LC 공통 안내와 정확한 모델 설명서의 범위를 구분해 읽고, 직접 확인할 것과 상담할 것을 정리했습니다.</p>
        <Link href="/blog/samsung-washer-check-codes" className="mt-3 inline-flex min-h-11 items-center font-semibold text-blue-700 underline underline-offset-4">삼성 세탁기 점검 안내 보기</Link>
      </section>
    </div>
  </>;
}
