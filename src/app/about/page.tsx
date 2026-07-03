import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_NAME, CONTACT_EMAIL } from '@/lib/constants';

export const metadata: Metadata = {
  title: '소개',
  description: `${SITE_NAME}는 가전제품의 스펙·가격·에너지효율·에러코드를 한눈에 비교·분석해 구매 판단을 돕는 정보 사이트입니다.`,
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{SITE_NAME} 소개</h1>
        <p className="mt-3 text-gray-600 leading-relaxed">
          {SITE_NAME}는 에어컨·제습기·세탁기·냉장고 등 생활가전을 스펙·가격·에너지효율·소음·에러코드
          기준으로 비교하고 분석해, 소비자가 자기 상황에 맞는 제품을 더 쉽게 고르도록 돕는 정보
          사이트입니다.
        </p>
      </div>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-gray-900">우리가 제공하는 것</h2>
        <ul className="list-disc pl-5 space-y-1.5 text-gray-700">
          <li>제품별 스펙·가격·에너지효율·소음 비교</li>
          <li>10년 총비용(TCO) 계산과 에너지등급이 전기요금에 미치는 영향</li>
          <li>브랜드·모델별 에러코드 원인과 자가진단·해결법</li>
          <li>여러 제품을 나란히 놓고 비교하는 비교 도구</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-gray-900">데이터와 평가 방식 (투명성 고지)</h2>
        <div className="rounded-xl border bg-gray-50 p-5 text-sm text-gray-700 leading-relaxed space-y-2">
          <p>
            <span className="font-semibold text-gray-900">에디터 평점·리뷰</span>는 공개된 스펙과
            일반적인 사용 특성을 바탕으로 편집팀이 작성한 <span className="font-semibold">종합 평가</span>이며,
            개별 구매자가 남긴 실제 사용자 후기가 아닙니다.
          </p>
          <p>
            <span className="font-semibold text-gray-900">가격·스펙·에러코드·고객센터 정보</span>는
            작성 시점 기준의 참고 정보로, 실제와 다르거나 변경될 수 있습니다. 구매·수리 전 반드시
            제조사·판매처의 최신 정보를 확인하세요.
          </p>
          <p>
            제품 이미지는 제조사·판매처가 공개한 제품 사진을 참고용으로 사용합니다.
          </p>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-gray-900">문의</h2>
        <p className="text-gray-700">
          정보 정정 요청, 제휴, 기타 문의는{' '}
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-blue-600 hover:underline">
            {CONTACT_EMAIL}
          </a>{' '}
          으로 보내주세요. 자세한 내용은{' '}
          <Link href="/contact" className="text-blue-600 hover:underline">문의 페이지</Link>를
          참고하세요.
        </p>
      </section>
    </div>
  );
}
