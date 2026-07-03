import type { Metadata } from 'next';
import { SITE_NAME, CONTACT_EMAIL } from '@/lib/constants';

export const metadata: Metadata = {
  title: '개인정보처리방침',
  description: `${SITE_NAME}의 개인정보 수집·이용, 쿠키 및 제3자 광고(Google AdSense) 정책 안내.`,
  alternates: { canonical: '/privacy' },
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900">개인정보처리방침</h1>
      <p className="mt-3 text-sm text-gray-500">최종 업데이트: 2026년 7월</p>

      <div className="mt-8 space-y-8 text-gray-700 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-xl font-bold text-gray-900">1. 수집하는 정보</h2>
          <p>
            {SITE_NAME}는 회원가입 기능이 없으며 이름·연락처 등 개인을 식별하는 정보를 직접
            수집하지 않습니다. 다만 서비스 개선과 광고 제공을 위해 방문 기록, 브라우저·기기 정보,
            쿠키 등 비식별 이용 데이터가 자동으로 수집될 수 있습니다.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-bold text-gray-900">2. 쿠키 사용</h2>
          <p>
            본 사이트는 이용 통계 분석과 광고 제공을 위해 쿠키(cookie)를 사용할 수 있습니다.
            이용자는 브라우저 설정에서 쿠키 저장을 거부하거나 삭제할 수 있으며, 이 경우 일부 기능
            이용에 제한이 있을 수 있습니다.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-bold text-gray-900">3. 제3자 광고 및 Google AdSense</h2>
          <p>
            본 사이트는 Google 등 제3자 광고 게시자를 통해 광고를 게재할 수 있습니다. 이들 광고
            공급업체는 쿠키를 사용하여 이용자의 이 사이트 및 다른 사이트 방문 기록을 바탕으로
            맞춤형 광고를 제공할 수 있습니다.
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>
              Google을 포함한 제3자 공급업체는 쿠키를 사용해 이용자의 과거 방문 정보를 기반으로
              광고를 게재합니다.
            </li>
            <li>
              Google의 광고 쿠키(DoubleClick 쿠키 포함) 사용으로 Google과 파트너는 맞춤 광고를
              제공할 수 있습니다.
            </li>
            <li>
              이용자는{' '}
              <a
                href="https://adssettings.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Google 광고 설정
              </a>
              에서 맞춤 광고를 거부할 수 있으며,{' '}
              <a
                href="https://www.aboutads.info"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                www.aboutads.info
              </a>
              에서 제3자 공급업체의 쿠키를 일괄 거부할 수 있습니다.
            </li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-bold text-gray-900">4. 이용 통계 분석</h2>
          <p>
            방문자 규모와 이용 패턴 파악을 위해 웹 분석 도구를 사용할 수 있으며, 이때 수집되는
            정보는 통계 목적의 비식별 데이터입니다.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-bold text-gray-900">5. 외부 링크</h2>
          <p>
            본 사이트는 제조사·판매처 등 외부 사이트로 연결되는 링크를 포함할 수 있습니다. 외부
            사이트의 개인정보 처리에 대해서는 본 방침이 적용되지 않으므로 해당 사이트의 정책을
            확인하시기 바랍니다.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-bold text-gray-900">6. 문의</h2>
          <p>
            개인정보 관련 문의는{' '}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-blue-600 hover:underline">
              {CONTACT_EMAIL}
            </a>
            로 연락해 주세요. 본 방침은 관련 법령 및 정책 변경에 따라 개정될 수 있으며, 변경 시 본
            페이지를 통해 공지합니다.
          </p>
        </section>
      </div>
    </div>
  );
}
