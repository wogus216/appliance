import type { Metadata } from 'next';
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
      <p className="mt-3 text-sm text-gray-500">최종 업데이트: 2026년 7월</p>

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
          <h2 className="text-xl font-bold text-gray-900">5. 외부 링크·광고</h2>
          <p>
            사이트는 외부 사이트 링크 및 제3자 광고를 포함할 수 있으며, 외부 사이트의 콘텐츠와
            거래에 대해 책임지지 않습니다.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-bold text-gray-900">6. 문의</h2>
          <p>
            약관 관련 문의는{' '}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-blue-600 hover:underline">
              {CONTACT_EMAIL}
            </a>
            로 연락해 주세요. 본 약관은 필요 시 개정될 수 있습니다.
          </p>
        </section>
      </div>
    </div>
  );
}
