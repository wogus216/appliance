import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_NAME, CONTACT_EMAIL, EDITOR_RATING_LABEL } from '@/lib/constants';
import { buildOpenGraph } from '@/lib/metadata';
import { BreadcrumbJsonLd } from '@/components/jsonld';

const TITLE = '편집 원칙';
const DESCRIPTION = `${SITE_NAME}가 콘텐츠를 어떻게 만들고, 출처를 어떻게 쓰고, 후기를 어떻게 다루고, 잘못된 정보를 어떻게 고치는지에 대한 원칙.`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/editorial-policy' },
  openGraph: buildOpenGraph({
    title: `${TITLE} — ${SITE_NAME}`,
    description: DESCRIPTION,
    url: '/editorial-policy',
  }),
};

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24 space-y-3">
      <h2 className="text-xl font-bold text-gray-900">{title}</h2>
      <div className="space-y-3 text-gray-700 leading-relaxed">{children}</div>
    </section>
  );
}

export default function EditorialPolicyPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: '홈', path: '/' }, { name: TITLE }]} />
      <div className="max-w-3xl mx-auto px-4 py-12 space-y-10">
        <header className="space-y-3">
          <h1 className="text-3xl font-bold text-gray-900">{TITLE}</h1>
          <p className="text-gray-600 leading-relaxed">{DESCRIPTION}</p>
        </header>

        <Section id="who" title="1. 누가 쓰는가">
          <p>
            {SITE_NAME}의 제품 문서·브랜드 문서·구매 가이드·에러코드 문서는 모두{' '}
            <strong>살림랩 편집팀</strong>이 작성하고 검수합니다. 제조사가 제공한 원고를 그대로
            싣지 않으며, 광고주가 문안을 지정하는 협찬 기사도 게재하지 않습니다.
          </p>
          <p>
            출처와 검수 이력이 확인된 문서는 상세 페이지 하단 &ldquo;이 글의 근거&rdquo; 블록에
            작성·검수 주체, 최초 작성일, 최종 검수일, 참고 자료를 표시합니다. 아직 출처를 붙이지
            못한 문서에는 그 사실을 그대로 적어 둡니다.
          </p>
        </Section>

        <Section id="sources" title="2. 출처를 쓰는 원칙">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>확인하지 않은 URL은 싣지 않습니다.</strong> 링크가 그럴듯해 보인다는 이유로
              주소를 만들어 넣지 않습니다.
            </li>
            <li>
              1차 자료를 우선합니다 — 제조사 공식 제품 페이지, 공식 고객지원 공지, 국가법령정보
              센터·소비자24 같은 공공 자료.
            </li>
            <li>
              2차 자료로는 편집권이 있는 매체와 대형 스펙·가격 데이터베이스를 씁니다.
            </li>
            <li>
              커뮤니티 글과 개인 블로그는 &ldquo;이런 이야기가 반복해서 나온다&rdquo;는 정성적
              근거로는 쓸 수 있지만, <strong>확인 가능한 출처의 수에는 넣지 않습니다.</strong>{' '}
              포털 뉴스 퍼머링크도 발행처가 아니라 배포처라 같은 취급을 합니다.
            </li>
            <li>
              같은 발행처의 페이지 두 장은 출처 두 건이 아닙니다. 근거의 수는 URL 개수가 아니라
              발행처의 가짓수로 셉니다.
            </li>
          </ul>
        </Section>

        <Section id="index" title="3. 색인 기준 — 근거가 없으면 검색에 내보내지 않는다">
          <p>
            제품 문서는 아래 조건을 모두 채울 때만 검색엔진 색인 대상으로 둡니다. 하나라도
            비면 해당 페이지에 <code className="rounded bg-gray-100 px-1 py-0.5 text-sm">noindex</code>
            를 걸고 사이트맵에서도 뺍니다.
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>서로 다른 발행처의 공식·신뢰 가능한 출처 2곳 이상</li>
            <li>최종 검수일과 검수 주체 표기</li>
            <li>제품 모델 번호</li>
            <li>그 제품에만 해당하는 고유한 편집팀 분석</li>
            <li>출처 없는 구매자 후기를 노출하지 않을 것</li>
            <li>
              제품 사진 1장 이상. 사진 없이 사양 표와 글만 있는 문서는 읽는 사람에게
              만들다 만 화면이라 색인하지 않습니다.
            </li>
          </ul>
          <p>
            조건을 채우려고 데이터를 급조하지 않습니다. 근거가 갖춰질 때까지 그 문서는 색인에서
            빠져 있는 편이 낫다고 봅니다.
          </p>
        </Section>

        <Section id="reviews" title="4. 후기를 다루는 원칙">
          <p>
            {SITE_NAME}은 <strong>개별 구매자 후기를 게시하지 않습니다.</strong> 구매자 평균
            별점, 추천 비율, 별점 분포도 표시하지 않습니다.
          </p>
          <p>
            이전에는 편집팀이 공개 스펙과 공개된 리뷰를 종합해 쓴 글을 구매자 후기 형태로
            보여 준 적이 있습니다. 실제 구매자가 남긴 글이 아닌데 그렇게 보이는 표기라
            전부 내렸습니다. 앞으로 후기를 다시 싣게 되더라도{' '}
            <strong>확인 가능한 출처가 붙은 것만</strong> 싣고, 어디서 온 이야기인지 링크로
            밝힙니다.
          </p>
          <p>
            같은 이유로 구조화 데이터(schema.org)에도 구매자 평점·AggregateRating을 넣지 않습니다.
          </p>
        </Section>

        <Section id="ratings" title="5. 점수 표기">
          <p>
            사이트에 나오는 모든 숫자 점수는 <strong>{EDITOR_RATING_LABEL}</strong>이며, 그렇게
            라벨을 붙입니다. 산출 방식은{' '}
            <Link href="/methodology" className="text-blue-600 hover:underline">
              평가 방법
            </Link>
            에 계산식까지 공개해 두었습니다.
          </p>
        </Section>

        <Section id="commerce" title="6. 광고와 제휴">
          <p>
            이 사이트는 Google AdSense 광고로 운영비를 충당합니다. 광고 게재 여부와 광고주는
            콘텐츠의 평가·순위에 영향을 주지 않습니다.
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>
              제휴 링크를 게재할 때는 해당 링크에{' '}
              <code className="rounded bg-gray-100 px-1 py-0.5 text-sm">rel=&quot;sponsored&quot;</code>
              를 붙이고, 제휴 고지 문구를 같은 화면에 표시합니다.
            </li>
            <li>
              아직 발급되지 않은 제휴 링크는 자리표시자로 두지 않고 아예 표시하지 않습니다.
              유효한 구매처가 하나도 없으면 구매처 섹션 자체를 그리지 않습니다.
            </li>
            <li>제휴 수수료 여부가 추천 여부를 바꾸지 않습니다.</li>
          </ul>
        </Section>

        <Section id="corrections" title="7. 수정 요청 절차">
          <p>
            잘못된 사양, 끊긴 링크, 바뀐 가격, 사실과 다른 서술을 발견하시면 알려 주세요.
            아래 내용을 함께 보내 주시면 확인이 빠릅니다.
          </p>
          <ol className="list-decimal pl-5 space-y-1.5">
            <li>해당 페이지 주소</li>
            <li>어느 문장·수치가 잘못되었는지</li>
            <li>맞는 정보와 그 근거(가능하면 공식 페이지 링크)</li>
          </ol>
          <p>
            보내실 곳:{' '}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-blue-600 hover:underline">
              {CONTACT_EMAIL}
            </a>{' '}
            (
            <Link href="/contact" className="text-blue-600 hover:underline">
              문의 페이지
            </Link>
            )
          </p>
          <p>
            접수된 지적은 확인 후 본문을 고치고, 해당 문서의 <strong>최종 검수일</strong>을
            갱신합니다. 사실관계가 바뀌는 수정이면 무엇을 고쳤는지 문서에 남깁니다. 확인에
            시간이 걸리는 사안이라도, 근거가 확인되기 전까지는 추측으로 채우지 않습니다.
          </p>
        </Section>

        <Section id="limits" title="8. 이 사이트가 하지 않는 것">
          <ul className="list-disc pl-5 space-y-1.5">
            <li>제품을 직접 구매해 실험실에서 측정하지 않습니다.</li>
            <li>안전 등급·인증 여부를 자체 판정하지 않습니다.</li>
            <li>수리·설치를 대행하거나 중개하지 않습니다.</li>
            <li>가격·재고를 실시간으로 갱신하지 않습니다.</li>
          </ul>
          <p className="text-sm text-gray-500">
            사이트 전반의 소개는{' '}
            <Link href="/about" className="text-blue-600 hover:underline">
              소개 페이지
            </Link>
            를 참고하세요.
          </p>
        </Section>
      </div>
    </>
  );
}
