import type { Metadata } from 'next';
import Link from 'next/link';
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
      <p className="mt-3 text-sm text-gray-500">최종 업데이트 <time dateTime="2026-11-25">2026년 11월 25일</time></p>

      <div className="mt-8 space-y-8 text-gray-700 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-xl font-bold text-gray-900">1. 수집하는 정보</h2>
          <p>
            {SITE_NAME}에는 회원가입 기능이 없습니다. 문의 메일을 보내면 운영자가 답변에 필요한 발신 주소와 메일 내용을 확인합니다.
            이용 통계와 광고를 위해 제3자 서비스가 방문 기록, 브라우저·기기 정보, 쿠키를 수집할 수 있습니다.
          </p>
          <p>
            수리 견적과 관리 날짜는 브라우저에서 처리합니다. 가전 수첩은 같은 브라우저의 저장소에 기록을 보관합니다.
            브라우저 데이터를 지우면 기록이 사라질 수 있으므로 필요한 기록은 파일로 내보내세요.
            세부 보관 방식은 <Link href="/methodology#storage" className="text-blue-600 hover:underline">입력과 보관 안내</Link>에 있습니다.
          </p>
          <p>에러코드 검색에 입력한 모델명과 코드는 해당 화면의 브라우저 메모리에서만 처리합니다. 검색어는 주소에 붙이거나, 저장하거나, Google 애널리틱스로 보내지 않습니다.</p>
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
            본 사이트는 Google AdSense를 통해 광고를 게재할 수 있습니다. 광고가 게재되면 Google과 광고 파트너는
            이용자의 브라우저에 쿠키를 저장하거나 기존 쿠키를 읽을 수 있습니다. 이 사이트와 다른 사이트의
            과거 방문 기록은 맞춤형 광고에 사용될 수 있습니다.
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>
              광고가 게재되는 과정에서 Google과 광고 파트너는 쿠키, 웹 비콘, IP 주소 또는 기타
              식별자를 사용해 정보를 수집·공유·이용할 수 있습니다.
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
              에서 참여 광고 공급업체의 맞춤 광고를 거부할 수 있습니다.
            </li>
            <li>
              자세한 내용은{' '}
              <a
                href="https://policies.google.com/technologies/partner-sites"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Google이 파트너 사이트 또는 앱의 정보를 사용하는 방식
              </a>
              에서 확인할 수 있습니다.
            </li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-bold text-gray-900">4. 이용 통계 분석(Google 애널리틱스)</h2>
          <p>
            본 사이트는 방문자 규모와 이용 패턴을 파악하기 위해 Google이 제공하는 웹 분석 서비스인
            Google 애널리틱스를 사용합니다. Google 애널리틱스는 쿠키와 이와 비슷한 기술로 방문한
            페이지, 들어온 경로, 머문 시간, 브라우저·기기 정보 같은 이용 정보를 수집하며, 이 정보는
            Google이 처리합니다. 운영자는 개인을 식별하지 않는 통계로만 확인합니다.
          </p>
          <p>
            도구 화면에서 결과가 나오면 그 사실과 도구 이름도 같은 방식으로 기록합니다. 입력한
            금액·관리 날짜와 상담 기록 본문은 Google 애널리틱스로 보내지 않습니다. 도구에서 고른 모델번호는
            주소에 남는 경우가 있어 방문한 페이지 주소의 일부로 함께 수집될 수 있습니다.
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>
              Google이 이 정보를 수집하고 처리하는 방식은{' '}
              <a
                href="https://policies.google.com/technologies/partner-sites"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Google이 파트너 사이트 또는 앱의 정보를 사용하는 방식
              </a>
              에서 확인할 수 있습니다.
            </li>
            <li>
              수집을 원하지 않으면 브라우저에서 쿠키를 차단하거나{' '}
              <a
                href="https://tools.google.com/dlpage/gaoptout"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Google 애널리틱스 차단 브라우저 부가기능
              </a>
              을 설치할 수 있습니다.
            </li>
          </ul>
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
