import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_NAME, SITE_AUTHOR, CONTACT_EMAIL, ADSENSE_NOT_APPROVED_AS_OF } from '@/lib/constants';
import { buildOpenGraph } from '@/lib/metadata';
import { BreadcrumbJsonLd } from '@/components/jsonld';
import { HUB_ACTION_SETS } from '@/lib/data/error-codes/action-guides';
import { getErrorCodeDirectory } from '@/lib/error-codes';
import { PRICE_RECHECK_DAYS } from '@/lib/water-purifier-cost';

const TITLE = '편집 원칙';
const DESCRIPTION = `${SITE_NAME}이 콘텐츠를 어떻게 만들고, 출처를 어떻게 쓰고, 후기를 어떻게 다루고, 잘못된 정보를 어떻게 고치는지에 대한 원칙.`;

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

/** 행동 카드 규칙 절의 숫자 — 문장에 손으로 적지 않고 카드 등록부에서 센다 */
function actionCardCounts() {
  const guides = HUB_ACTION_SETS.flatMap((set) => set.guides);
  const hazard = guides.filter((guide) => guide.hazard);
  return {
    entries: getErrorCodeDirectory().reduce((n, group) => n + group.codeCount, 0),
    cards: guides.length,
    noCard: HUB_ACTION_SETS.reduce((n, set) => n + set.noCard.length, 0),
    hazard: hazard.length,
    // 위험 코드인데 원문이 사용자 확인을 따로 허용해 확인 단계를 둔 카드(error-action-coverage.test.ts에 이름으로 고정)
    hazardWithCheck: hazard.filter((guide) => guide.action.type !== 'contact').length,
  };
}

export default function EditorialPolicyPage() {
  const cards = actionCardCounts();
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
            {SITE_NAME}의 제품 문서·브랜드 문서·구매 가이드·에러코드 문서와 도구의 설명·계산식은
            모두 <strong>{SITE_AUTHOR}</strong>가 작성하고 검수합니다. 제조사가 제공한 원고를 그대로
            싣지 않으며, 광고주가 문안을 지정하는 협찬 기사도 게재하지 않습니다.
          </p>
          {/* 2026-10-11 5차 2회: 운영자가 직접 밝힌 사실. 소개 페이지 운영자 절과 같은 내용이다. */}
          <p>
            {SITE_AUTHOR}는 개발자이고 가전 관련 자격증이나 업계 경력은 없습니다. 다루는 제품을 직접
            써 본 적도 없어서, 이 사이트의 문서는 사용 경험이 아니라 공개된 자료의 대조와 계산을
            근거로 합니다.
          </p>
          {/* 2026-10-11 5차: AI 도구 사용 고지(사용자 결정). 소개 페이지 운영자 절과 같은 내용이다. */}
          <p>
            자료 찾기, 초안 쓰기, 원문 대조에는 생성형 AI 도구를 함께 씁니다. AI가 쓴 문장도 아래
            출처 원칙을 똑같이 따르고, 제품을 써 보거나 재 본 것처럼 쓰지 않습니다. 무엇을 싣고
            고칠지는 {SITE_AUTHOR}가 정합니다.
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

        {/* 2026-10-29 8단계: 1단계에서 허브 코드 항목 전부에 행동 카드 또는 「카드 없음」을 붙였다. 카드에 어떤
            조치만 싣는지(research/evidence/2026-10-29/error-actions/, actions/shared.ts 머리 주석)를 공개한다. */}
        <Section id="error-actions" title="3. 에러코드 행동 카드에 싣는 조치">
          <p>
            에러코드 허브의 코드 항목 {cards.entries}개에는 모두 행동 카드나 &lsquo;확인된 조치
            없음&rsquo; 안내가 붙어 있습니다(카드 {cards.cards}개, 안내 {cards.noCard}개). 카드를
            만드는 규칙은 다음과 같습니다.
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>정확한 모델의 공식 원문이 사용자에게 허용한 확인만 옮깁니다.</strong> 근거는 그
              코드가 나오는 모델의 설명서나 제조사 FAQ이고, 보일러처럼 제조사가 코드표를 제품군
              단위로 공개한 경우에는 그 제품군입니다. 같은 브랜드라도 다른 모델·계열 설명서의 문구는
              가져오지 않습니다.
            </li>
            <li>
              <strong>가스·누수·과열·전기 위험에 해당하는 코드는 사용 중지와 연락이 먼저입니다.</strong>{' '}
              이런 카드 {cards.hazard}개는 기기를 멈추고 공식 서비스에 알리는 순서만 싣고, 원문이
              사용자 확인 단계를 따로 적어 둔 {cards.hazardWithCheck}개에만 그 단계를 덧붙입니다. 원문에
              없는 재시작·분해·초기화 방법은 쓰지 않습니다.
            </li>
            <li>
              원문에서 사용자가 해 볼 조치를 찾지 못한 코드는 카드를 만들지 않고, 모델명과 표시를
              공식 서비스에 알리라는 안내만 둡니다. 비슷한 모델의 조치로 빈칸을 채우지 않습니다.
            </li>
            <li>
              카드의 AS 상담 기록은 입력한 모델명이 카드의 적용 모델과 정확히 같을 때만 확인 단계를
              보여 줍니다. 타는 냄새·연기·젖은 전원 같은 안전 문제가 있다고 고르면 모델과 상관없이
              재시작을 안내하지 않습니다.
            </li>
            <li>
              카드마다 적용 모델, 대조한 설명서와 대조일, 안내 버전을 남깁니다. 제조사가 FAQ나
              설명서를 고치면 원문을 다시 열어 맞추고, 틀리게 싣고 있던 조치는 소개 페이지의
              바로잡은 것 목록에 옮겨 적습니다.
            </li>
          </ul>
        </Section>

        <Section id="index" title="4. 색인 기준 — 근거가 없으면 검색에 내보내지 않는다">
          <p>
            제품 문서는 아래 조건을 모두 채울 때만 검색엔진 색인 대상으로 둡니다. 하나라도
            비면 해당 페이지에 <code className="rounded bg-gray-100 px-1 py-0.5 text-sm">noindex</code>
            를 걸고 사이트맵에서도 뺍니다.
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>서로 다른 발행처의 공식·신뢰 가능한 출처 2곳 이상</li>
            <li>최종 검수일과 검수 주체 표기</li>
            <li>제품 모델 번호</li>
            <li>그 제품에만 해당하는 고유한 분석</li>
            <li>출처 없는 구매자 후기를 노출하지 않을 것</li>
            <li>
              제품 사진 1장 이상. 사진 없이 사양 표와 글만 있는 문서는 읽는 사람에게
              만들다 만 화면이라 색인하지 않습니다.
            </li>
          </ul>
          <p>
            브랜드 허브처럼 제품을 모아 보여 주는 페이지는 <strong>그 안에 색인되는 제품이
            최소 하나 있을 때만</strong> 함께 색인합니다. 목록의 링크가 전부 색인 대상이 아니면
            그 페이지는 찾아온 사람에게도 검색엔진에게도 막다른 길입니다.
          </p>
          <p>
            조건을 채우려고 데이터를 급조하지 않습니다. 근거가 갖춰질 때까지 그 문서는 색인에서
            빠져 있는 편이 낫다고 봅니다.
          </p>
        </Section>

        <Section id="reviews" title="5. 후기를 다루는 원칙">
          <p>
            {SITE_NAME}은 <strong>개별 구매자 후기를 게시하지 않습니다.</strong> 구매자 평균
            별점, 추천 비율, 별점 분포도 표시하지 않습니다.
          </p>
          <p>
            이전에는 공개 스펙과 공개된 리뷰를 종합해 쓴 글을 구매자 후기 형태로
            보여 준 적이 있습니다. 실제 구매자가 남긴 글이 아닌데 그렇게 보이는 표기라
            전부 내렸습니다. 앞으로 후기를 다시 싣게 되더라도{' '}
            <strong>확인 가능한 출처가 붙은 것만</strong> 싣고, 어디서 온 이야기인지 링크로
            밝힙니다.
          </p>
          <p>
            같은 이유로 구조화 데이터(schema.org)에도 구매자 평점·AggregateRating을 넣지 않습니다.
          </p>
        </Section>

        <Section id="ratings" title="6. 점수를 매기지 않습니다">
          <p>
            이 사이트는 제품에 종합 점수·항목 점수·별점을 매기지 않습니다. 예전에는
            5점 만점 점수를 붙였는데, 그 점수의 대부분(성능·편의기능·내구성 같은 항목)이 대조할
            공개 수치 없이 판단으로 매긴 값이었습니다. 제품을 직접 써 보거나 재 보지 않는
            사이트에서 그런 판단은 숫자로 보여 줄 근거가 없다고 보고 모두 걷었습니다.
          </p>
          <p>
            제품끼리 우열을 보여 주는 값은 정부 고시에 따라 제조사가 표기한 에너지소비효율등급처럼
            출처가 있는 것만 싣습니다. 가격·전기요금 계산 방식은{' '}
            <Link href="/methodology" className="text-blue-600 hover:underline">
              계산 방법
            </Link>
            에 공개해 두었습니다.
          </p>
        </Section>

        <Section id="commerce" title="7. 광고와 제휴">
          {/* 2026-10-11 5차: '광고 게재를 준비하고 있습니다'는 실제와 달랐다 — 콘텐츠 페이지에는 이미 광고
              코드가 실려 있다(운영 HTML, pass5/sources/site-revenue-live-html.txt). 하는 일만 적고, 광고가
              실제로 나가는지(승인·게재)는 Google이 정하는 일이라 단정하지 않는다.
              2026-10-29 8단계: "수익원은 두 가지입니다"는 승인 전(2026-10-25 거절)인 지금 광고 수익이 있는 것처럼
              읽혀, 확인일과 함께 승인 전이라고 적었다. 도구 페이지 광고 제외 이유는 계획 문서 2단계의 결정이다. */}
          <p>
            광고와 제휴는 두 경로로 둡니다. 하나는 일부 제품 페이지의 쿠팡 파트너스 제휴 링크이고,
            다른 하나는 홈·제품·에러코드·블로그 등 일부 페이지에 넣어 둔 Google AdSense 광고
            코드입니다. 광고는 Google이 사이트를 승인한 뒤에 나가는데,{' '}
            <time dateTime={ADSENSE_NOT_APPROVED_AS_OF}>{ADSENSE_NOT_APPROVED_AS_OF}</time>에 확인한
            상태는 승인 전이라 광고로 생기는 수익은 아직 없습니다.
          </p>
          <p>
            소개·편집 원칙 같은 정책 페이지와 도구 페이지에는 광고 코드를 넣지 않습니다. 도구는 입력
            칸과 버튼 가까이에 광고가 붙으면 잘못 누르기 쉬워서입니다. 광고주와 광고 게재 여부, 제휴
            수수료는 어떤 제품을 싣는지와 무엇을 적는지에 영향을 주지 않습니다.
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

        <Section id="corrections" title="8. 수정 요청 절차">
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
            {/* 예전 문구 "사실관계가 바뀌는 수정이면 무엇을 고쳤는지 문서에 남깁니다"는 실제와
                달랐다 — 수정 기록은 /about의 '공식 자료와 대조해 바로잡은 것'(corrections.ts)에만
                있고, 문서마다 수정 이력을 싣지는 않는다. 하는 일만 적는다(2026-10-08). */}
            접수된 지적은 확인 후 본문을 고치고, 해당 문서의 <strong>최종 검수일</strong>을
            갱신합니다. 그중 에러코드 뜻·고객센터 번호·핵심 수치처럼 이전 내용을 믿고 행동했을 수
            있는 수정은 골라서{' '}
            <Link href="/about" className="text-blue-600 hover:underline">
              소개 페이지
            </Link>
            의 &lsquo;공식 자료와 대조해 바로잡은 것&rsquo;에 이전 내용과 함께 남깁니다. 문서마다
            수정 이력을 따로 싣지는 않습니다. 확인에 시간이 걸리는 사안이라도, 근거가 확인되기
            전까지는 추측으로 채우지 않습니다.
          </p>
          {/* 2026-10-29 8단계: 날짜가 지나면 틀려지는 값은 제보를 기다리지 않는다(구현 기록 '운영 유지 항목').
              식과 기간은 계산 방법 페이지에 있고, 여기에는 절차만 적는다. */}
          <p>
            날짜가 지나면 틀려지는 값은 제보를 기다리지 않고 정해 둔 때에 다시 엽니다. 정수기 판매
            조건은 확인일에서 {PRICE_RECHECK_DAYS}일이 넘으면 도구 화면이 먼저 재확인 경고를 띄우고,
            전기요금의 연료비조정단가는 한전이 분기마다 새로 내는 값이라 분기가 바뀔 때 요금표를
            갱신합니다. 갱신 전까지 확인하지 않은 달의 요금은 계산하지 않습니다. 값을 바꿀 때는 그
            값의 확인일도 함께 고칩니다.
          </p>
        </Section>

        <Section id="limits" title="9. 이 사이트가 하지 않는 것">
          <ul className="list-disc pl-5 space-y-1.5">
            <li>제품을 직접 구매해 실험실에서 측정하지 않습니다.</li>
            <li>안전 등급·인증 여부를 자체 판정하지 않습니다.</li>
            <li>수리·설치를 대행하거나 중개하지 않습니다.</li>
            <li>가격·재고를 실시간으로 갱신하지 않습니다.</li>
            {/* 2026-10-29 8단계: 계획 2절 3항의 판정 금지 영역. 도구별로 무엇을 계산하는지는 계산 방법에 있다. */}
            <li>
              도구 결과로 그 자리에 설치할 수 있는지, 제품이 얼마나 더 버틸지, 다시 고장 날
              가능성, 위약금·보증 적용 같은 법적 결과를 판정하지 않습니다. 도구는 금액과 치수의 차이를
              계산하고, 판단에 필요한 확인 질문을 남기는 데서 멈춥니다.
            </li>
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
