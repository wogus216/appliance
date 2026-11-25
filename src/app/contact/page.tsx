import type { Metadata } from 'next';
import Link from 'next/link';
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

      <section className="space-y-3 text-gray-700 leading-relaxed">
        <h2 className="text-xl font-bold text-gray-900">1. 정보 정정 요청</h2>
        <p>
          에러코드의 뜻이나 적용 모델이 제조사 자료와 다르면 알려 주세요. 아래 내용을 함께 보내 주시면 해당 안내를 찾아 원문과 대조하겠습니다.
        </p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>해당 페이지 주소 (예: <code className="rounded bg-gray-100 px-1 py-0.5 text-sm">/error-codes/…</code>)</li>
          <li>명판에 적힌 모델명 전체와 화면에 뜬 코드</li>
          <li>다르게 안내된 문장과 제조사 설명서나 공식 안내 링크</li>
        </ul>
        <p>
          원문을 확인해 해당 모델에 맞게 고칩니다. 근거가 부족한 부분은 확인 범위를 밝히거나 내립니다.
          판단에 영향을 주는 수정은 <Link href="/about#corrections" className="text-blue-600 hover:underline">정정 기록</Link>에 남깁니다.
        </p>
      </section>

      <section className="space-y-3 text-gray-700 leading-relaxed">
        <h2 className="text-xl font-bold text-gray-900">2. 저작권·상표권 문의</h2>
        <p>
          제품 이미지와 브랜드명·제품명의 권리는 각 제조사·권리자에게 있으며, 이 사이트는
          제품을 식별하기 위한 참고 목적으로만 사용합니다. 권리자 또는 대리인께서 특정 자료의
          사용 중단을 요청하시는 경우, 해당 페이지 주소와 대상 자료를 특정해 보내주시면
          권리 관계를 확인한 뒤 삭제하거나 교체합니다. 확인 중에는 해당 자료를 내려 둡니다.
        </p>
      </section>

      <section className="space-y-3 text-gray-700 leading-relaxed">
        <h2 className="text-xl font-bold text-gray-900">3. 개인정보 관련 요청</h2>
        <p>
          이 사이트는 회원가입을 받지 않고 이름·연락처 같은 개인정보를 직접 수집하지 않습니다.
          다만 방문 분석과 광고를 위해 제3자 서비스가 쿠키를 사용할 수 있습니다. 수집 항목과
          거부 방법은{' '}
          <Link href="/privacy" className="text-blue-600 hover:underline">개인정보처리방침</Link>에
          정리해 두었으며, 열람·삭제 요청도 이 메일로 받습니다.
        </p>
      </section>

      <section className="space-y-3 text-gray-700 leading-relaxed">
        <h2 className="text-xl font-bold text-gray-900">4. 광고·제휴 제안</h2>
        <p>
          제휴 링크나 광고가 들어가는 경우 해당 위치에 그 사실을 표시합니다. 대가를 받고
          특정 제품의 평가·순위를 올려 주는 형태의 제안은 받지 않습니다. 어떤 협업이 가능한지는{' '}
          <Link href="/editorial-policy#commerce" className="text-blue-600 hover:underline">광고와 편집의 분리</Link> 항목을 참고해 주세요.
        </p>
      </section>

      <section className="space-y-3 text-gray-700 leading-relaxed">
        <h2 className="text-xl font-bold text-gray-900">답변까지 걸리는 시간</h2>
        <p>
          {/* /about은 "운영자 한 사람이 만듭니다"라고 쓴다 — '소수'와 어긋나 맞췄다(2026-10-08) */}
          {SITE_NAME}은 운영자 한 사람이 운영하는 사이트라 24시간 대응 창구를 두고 있지 않습니다.
          접수된 메일은 순서대로 확인하며, <span className="font-semibold text-gray-900">영업일
          기준 7일 이내 회신</span>을 목표로 합니다. 근거 확인이 필요한 정정 요청은 확인이
          끝난 뒤 결과를 함께 회신합니다. 전화 상담과 제품 수리 접수는 하지 않으니, 고장·수리는
          제조사 서비스센터로 문의해 주세요.{' '}
          <Link href="/error-codes" className="text-blue-600 hover:underline">브랜드별 에러코드 안내</Link>와{' '}
          <Link href="/error-codes#manufacturer-support" className="text-blue-600 hover:underline">코드표가 없는 브랜드의 공식 문의처</Link>를 확인할 수 있습니다.
        </p>
      </section>
    </div>
  );
}
