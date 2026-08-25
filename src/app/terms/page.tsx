import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_NAME, CONTACT_EMAIL } from '@/lib/constants';

export const metadata: Metadata = {
  title: '이용약관',
  description: `${SITE_NAME} 이용약관 — 정보 제공 목적, 정확성 비보장, 저작권, 책임의 한계 안내.`,
  alternates: { canonical: '/terms' },
};

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900">이용약관</h1>
      <p className="mt-3 text-sm text-gray-500">최종 업데이트: 2026년 8월</p>

      <div className="mt-8 space-y-8 text-gray-700 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-xl font-bold text-gray-900">1. 목적</h2>
          <p>
            본 약관은 {SITE_NAME}(이하 &lsquo;사이트&rsquo;)가 제공하는 가전제품 비교·정보 서비스의
            이용 조건을 규정합니다. 사이트를 이용함으로써 본 약관에 동의한 것으로 봅니다.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-bold text-gray-900">2. 정보의 성격과 정확성</h2>
          <p>
            사이트가 제공하는 스펙·가격·에너지효율·에러코드·점수 등 모든 정보는 참고용이며,
            정확성·완전성·최신성을 보장하지 않습니다. 사이트에 표시되는 모든 점수는 편집팀이
            매긴 에디터 평가로 구매자 평점이 아니며, 개별 구매자 후기는 게시하지 않습니다.
            제품 구매·수리 등 의사결정에 앞서 제조사·판매처의 공식 정보를 반드시 확인하시기
            바랍니다.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-bold text-gray-900">3. 책임의 한계</h2>
          <p>
            사이트는 제공된 정보를 신뢰하여 이용자가 내린 결정 및 그 결과에 대해 법적 책임을 지지
            않습니다. 에러코드 자가진단 등은 참고 정보이며, 실제 수리는 반드시 제조사 서비스센터
            또는 전문가를 통해 진행하시기 바랍니다.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-bold text-gray-900">4. 저작권</h2>
          <p>
            사이트의 콘텐츠에 대한 권리는 {SITE_NAME}에 있습니다. 다만 브랜드명·제품명·제품
            이미지 등은 각 제조사·권리자에게 저작권 및 상표권이 있으며 참고 목적으로 사용됩니다.
            권리 관련 문의는 아래 연락처로 접수해 주세요.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-bold text-gray-900">5. 외부 링크·광고·제휴</h2>
          <p>
            사이트는 외부 사이트 링크 및 제3자 광고를 포함할 수 있으며, 외부 사이트의 콘텐츠와
            거래에 대해 책임지지 않습니다. 구매 링크 중 일부는 제휴 링크일 수 있고, 이 경우
            이용자가 추가로 부담하는 금액 없이 사이트가 수수료를 받을 수 있습니다. 제휴 링크가
            포함된 위치에는 그 사실을 표시합니다.
          </p>
          <p>
            광고·제휴 여부는 제품의 평가 점수·순위·게재 여부에 영향을 주지 않습니다. 평가
            산출 방식은{' '}
            <Link href="/methodology" className="text-blue-600 hover:underline">평가 방법</Link>에,
            편집과 광고를 어떻게 분리하는지는{' '}
            <Link href="/editorial-policy" className="text-blue-600 hover:underline">편집 원칙</Link>에
            공개되어 있습니다.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-bold text-gray-900">6. 이용자의 의무</h2>
          <p>
            이용자는 사이트를 이용하면서 다음 행위를 해서는 안 됩니다.
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>사이트 콘텐츠를 무단으로 대량 복제·전재하거나 재배포하는 행위</li>
            <li>자동화된 수단으로 서비스 운영에 지장을 주는 수준의 트래픽을 유발하는 행위</li>
            <li>사이트의 정보를 사실과 다르게 편집해 제3자에게 제공하는 행위</li>
            <li>기타 관계 법령을 위반하거나 타인의 권리를 침해하는 행위</li>
          </ul>
          <p>
            사이트 콘텐츠의 인용은 출처를 밝히고 원문 링크를 함께 표기하는 범위에서 가능합니다.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-bold text-gray-900">7. 서비스의 변경·중단</h2>
          <p>
            사이트는 다루는 카테고리·제품 목록·페이지 구성을 사전 통지 없이 변경할 수 있습니다.
            근거가 확인되지 않은 정보는 예고 없이 내려갈 수 있으며, 이는 오류를 남겨 두지 않기
            위한 조치입니다. 기술적 사유로 서비스가 일시 중단될 수 있고, 이로 인한 이용자의
            손해에 대해 사이트는 고의 또는 중대한 과실이 없는 한 책임지지 않습니다.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-bold text-gray-900">8. 개인정보</h2>
          <p>
            사이트는 회원가입을 받지 않으며 이름·연락처 등 개인정보를 직접 수집하지 않습니다.
            방문 분석·광고를 위한 제3자 쿠키 사용 및 거부 방법은{' '}
            <Link href="/privacy" className="text-blue-600 hover:underline">개인정보처리방침</Link>에
            따릅니다.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-bold text-gray-900">9. 준거법과 분쟁 해결</h2>
          <p>
            본 약관과 사이트 이용에는 대한민국 법을 적용합니다. 분쟁이 생긴 경우 먼저 아래
            연락처를 통한 협의로 해결하도록 노력하며, 협의가 이루어지지 않으면 민사소송법에
            따른 관할 법원에 제기합니다.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-bold text-gray-900">10. 약관의 개정과 문의</h2>
          <p>
            본 약관은 필요 시 개정될 수 있으며, 개정된 약관은 이 페이지에 게시한 시점부터
            적용됩니다. 개정 시에는 이 페이지 상단의 최종 업데이트 날짜를 함께 갱신합니다.
            약관 관련 문의는{' '}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-blue-600 hover:underline">
              {CONTACT_EMAIL}
            </a>
            로 연락해 주세요. 접수·처리 절차는{' '}
            <Link href="/contact" className="text-blue-600 hover:underline">문의</Link> 페이지에
            안내되어 있습니다.
          </p>
        </section>
      </div>
    </div>
  );
}
