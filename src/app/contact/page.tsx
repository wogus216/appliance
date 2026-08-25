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
          가장 많이 받고 가장 반가운 문의입니다. 이 사이트의 수치는 제조사·공공기관·가격비교
          데이터베이스가 공개한 값을 옮긴 것이라, 원본이 바뀌었거나 저희가 잘못 읽은 경우가
          생깁니다. 아래 세 가지를 함께 보내주시면 확인이 빨라집니다.
        </p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>해당 페이지 주소 (예: <code className="rounded bg-gray-100 px-1 py-0.5 text-sm">/products/…</code>)</li>
          <li>어느 항목의 어떤 값이 틀렸는지 (예: &lsquo;소비전력 표기&rsquo;, &lsquo;에너지 등급&rsquo;)</li>
          <li>맞는 값과 그 근거 링크 — 제조사 공식 페이지나 공공 자료면 가장 좋습니다</li>
        </ul>
        <p>
          <span className="font-semibold text-gray-900">처리 방식:</span> 근거 링크를 확인한 뒤
          고칩니다. 근거를 확인하지 못하면 값을 다른 숫자로 바꾸는 대신 해당 항목을 화면에서
          내립니다 — 확인되지 않은 값을 남겨 두지 않는 것이 이 사이트의 원칙입니다 (
          <Link href="/editorial-policy" className="text-blue-600 hover:underline">편집 원칙</Link>).
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
          <Link href="/editorial-policy" className="text-blue-600 hover:underline">편집 원칙</Link>의
          &lsquo;광고와 제휴&rsquo; 항목을 참고해 주세요.
        </p>
      </section>

      <section className="space-y-3 text-gray-700 leading-relaxed">
        <h2 className="text-xl font-bold text-gray-900">답변까지 걸리는 시간</h2>
        <p>
          {SITE_NAME}은 소수가 운영하는 사이트라 24시간 대응 창구를 두고 있지 않습니다.
          접수된 메일은 순서대로 확인하며, <span className="font-semibold text-gray-900">영업일
          기준 7일 이내 회신</span>을 목표로 합니다. 근거 확인이 필요한 정정 요청은 확인이
          끝난 뒤 결과를 함께 회신합니다. 전화 상담과 제품 수리 접수는 하지 않으니, 고장·수리는
          제조사 서비스센터로 문의해 주세요. 브랜드별 에러코드 자가진단 정보는{' '}
          <Link href="/error-codes" className="text-blue-600 hover:underline">에러코드</Link>에
          정리해 두었습니다.
        </p>
      </section>
    </div>
  );
}
