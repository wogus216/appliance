import type { Metadata } from 'next';
import { SITE_NAME, CONTACT_EMAIL } from '@/lib/constants';

export const metadata: Metadata = {
  title: '문의',
  description: `${SITE_NAME} 문의 안내 — 정보 정정, 제휴, 저작권, 개인정보 관련 문의를 받습니다.`,
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">문의</h1>
        <p className="mt-3 text-gray-600 leading-relaxed">
          {SITE_NAME}에 대한 문의는 아래 이메일로 보내주세요. 확인 후 순차적으로 답변드립니다.
        </p>
      </div>

      <div className="rounded-2xl border bg-white p-6">
        <p className="text-sm text-gray-500">이메일</p>
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="mt-1 inline-block text-lg font-semibold text-blue-600 hover:underline"
        >
          {CONTACT_EMAIL}
        </a>
      </div>

      <section className="space-y-2 text-gray-700">
        <h2 className="text-xl font-bold text-gray-900">이런 문의를 받습니다</h2>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>스펙·가격·에러코드 등 정보 정정 요청</li>
          <li>제품 이미지·콘텐츠 저작권 관련 문의</li>
          <li>개인정보 열람·삭제 등 요청</li>
          <li>광고·제휴 제안</li>
        </ul>
      </section>
    </div>
  );
}
