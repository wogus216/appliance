import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_NAME, EDITOR_RATING_LABEL } from '@/lib/constants';
import { buildOpenGraph } from '@/lib/metadata';
import { BreadcrumbJsonLd } from '@/components/jsonld';

const TITLE = '평가 방법';
const DESCRIPTION = `${SITE_NAME}가 에디터 평가 점수, 가격, 전기요금, 10년 총비용을 어떤 식으로 계산하는지 계산식 그대로 공개합니다.`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/methodology' },
  openGraph: buildOpenGraph({
    title: `${TITLE} — ${SITE_NAME}`,
    description: DESCRIPTION,
    url: '/methodology',
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

export default function MethodologyPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: '홈', path: '/' }, { name: TITLE }]} />
      <div className="max-w-3xl mx-auto px-4 py-12 space-y-10">
        <header className="space-y-3">
          <h1 className="text-3xl font-bold text-gray-900">{TITLE}</h1>
          <p className="text-gray-600 leading-relaxed">{DESCRIPTION}</p>
          <p className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900 leading-relaxed">
            먼저 분명히 해 둘 것 — {SITE_NAME}는 제품을 직접 구매해 실험실에서 측정하지
            않습니다. 여기 있는 숫자는 제조사가 공개한 사양과 공개된 리뷰를 근거로 편집팀이
            정리·환산한 값입니다. 측정값이 아니라 <strong>추정값</strong>이며, 실제 사용 환경에
            따라 달라집니다.
          </p>
        </header>

        <Section id="editor-rating" title={`1. ${EDITOR_RATING_LABEL} 점수 (5점 만점)`}>
          <p>
            제품 카드와 상세 페이지 상단에 있는 5점 만점 점수는 <strong>{EDITOR_RATING_LABEL}</strong>
            입니다. 구매자가 매긴 별점이 아니고, 별점 평균도 아닙니다. 편집팀이 아래 항목을 함께
            보고 하나의 숫자로 정리합니다.
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>공개 사양에서 확인되는 성능(냉방능력·제습량·세탁용량·흡입력 등)</li>
            <li>에너지소비효율등급과 표시 소비전력</li>
            <li>소음(dB) 표기</li>
            <li>편의 기능의 실효성 — 있는 기능 개수가 아니라 실제로 손이 덜 가게 만드는지</li>
            <li>내구성·A/S 관련해 공개적으로 반복 보고되는 이슈</li>
            <li>같은 카테고리 안에서의 상대 위치 — 절대 점수가 아니라 체급 안의 순위입니다</li>
          </ul>
          <p>
            상세 페이지의 6각형 그래프(효율·성능·편의·내구성 등)는 각 항목을 1~10으로 나눈
            것이고, 5점 만점 점수는 그 항목들을 종합한 편집 판단입니다. 가중치를 고정한 자동
            산식이 아니라, 카테고리마다 무엇이 중요한지가 달라 사람이 판단합니다.
          </p>
        </Section>

        <Section id="value-rating" title="2. 가성비 (5점 만점)">
          <p>
            가성비는 <strong>같은 카테고리·같은 체급</strong> 안에서 지불하는 값 대비 얻는 것을
            봅니다. 싼 제품이 자동으로 높은 점수를 받지 않습니다. 실거래가가 확인되면 정가가
            아니라 실거래가를 기준으로 봅니다. 이 점수 역시 {EDITOR_RATING_LABEL}입니다.
          </p>
        </Section>

        <Section id="price" title="3. 가격">
          <p>
            <strong>정가</strong>는 제조사 표시 가격, <strong>실거래가</strong>는 조사 시점에
            시중에서 확인된 가격입니다. 가격은 수시로 바뀌므로 사이트에 적힌 값은 참고용입니다.
          </p>
          <p>
            가격을 마지막으로 대조한 날짜가 확인된 제품은 상세 페이지 &ldquo;이 글의 근거&rdquo;
            블록에 <strong>가격 확인일</strong>로 표시합니다. 확인일이 없는 제품은 그 줄 자체를
            표시하지 않습니다 — 확인하지 않은 날짜를 적지 않기 위해서입니다.
          </p>
        </Section>

        <Section id="electricity" title="4. 전기요금">
          <p>
            상세 페이지의 &ldquo;월 전기요금&rdquo;은 제품의 표시 소비전력과 카테고리별 일반적인
            사용 패턴을 바탕으로 계산한 <strong>하루 8시간 사용 기준 월 추정치</strong>입니다.
            누진구간, 계약종별, 계절별 요금제는 반영하지 않습니다.
          </p>
          <p>
            총비용 계산기에서 하루 사용 시간을 바꾸면 전기요금은 시간에 정비례해 환산됩니다.
          </p>
          <p className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900 leading-relaxed">
            2026년 8월 점검에서 카탈로그의 월 전기요금 값 65건이 모두 출처 없이 적혀 있던 것을
            확인해 전부 삭제했습니다. 지금은 <strong>출처로 값을 확인한 제품에만</strong> 월
            전기요금과 10년 총비용 계산기를 표시합니다. 값이 없는 제품에서는 그 자리에 가격
            기반 정보만 보입니다.
          </p>
          <pre className="overflow-x-auto rounded-xl bg-gray-900 p-4 text-xs text-gray-100">
{`조정 월 전기요금 = 표시 월 전기요금 × (설정한 하루 사용 시간 ÷ 8)`}
          </pre>
        </Section>

        <Section id="energy-grade" title="5. 에너지등급별 전기요금 비교">
          <p>
            &ldquo;에너지등급이 전기요금에 미치는 영향&rdquo; 표는 1등급 대비 소비전력 배율을
            아래와 같이 고정해 계산합니다. 이 배율은 등급 간 격차의 <strong>일반적인 크기</strong>
            를 보여 주기 위한 값이며, 개별 모델의 실측 비율이 아닙니다.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border rounded-xl overflow-hidden">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-2 px-3 text-left font-semibold text-gray-600">등급</th>
                  <th className="py-2 px-3 text-right font-semibold text-gray-600">1등급 대비 배율</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['1등급', '1.00'],
                  ['2등급', '1.25'],
                  ['3등급', '1.55'],
                  ['4등급', '1.90'],
                  ['5등급', '2.30'],
                ].map(([grade, mult]) => (
                  <tr key={grade} className="border-t">
                    <td className="py-2 px-3 text-gray-800">{grade}</td>
                    <td className="py-2 px-3 text-right text-gray-800">{mult}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-500">
            에너지소비효율등급은 효율관리기자재 대상 품목(에어컨·제습기·세탁기·건조기·냉장고·
            식기세척기)에만 표기합니다. 선풍기·공기청정기·정수기·로봇청소기 등 비대상 품목에는
            등급을 적지 않습니다.
          </p>
        </Section>

        <Section id="tco" title="6. 10년 총비용(TCO)">
          <p>총비용 계산기는 세 가지를 더합니다.</p>
          <pre className="overflow-x-auto rounded-xl bg-gray-900 p-4 text-xs text-gray-100">
{`총비용 = 구매가 + 전기요금 + 소모품비

구매가   = 실거래가가 있으면 실거래가, 없으면 정가
전기요금 = 조정 월 전기요금 × 12 × 사용 연수
소모품비 = 30,000원 × 사용 연수   (필터·부품 연간 정액 가정)
월 평균  = 총비용 ÷ (사용 연수 × 12)`}
          </pre>
          <p>
            소모품비의 연 3만원은 카테고리를 가리지 않는 <strong>단일 가정값</strong>입니다.
            필터를 자주 갈아야 하는 공기청정기·정수기는 실제보다 낮게, 소모품이 사실상 없는
            선풍기는 높게 잡힙니다. 제품 간 비교의 기준선을 맞추기 위한 값으로 보시고, 절대
            금액으로 받아들이지 마세요.
          </p>
          <p>
            수리비, 설치비, 이사 시 재설치비, 폐기비는 포함하지 않습니다.
          </p>
        </Section>

        <Section id="reviews" title="7. 후기를 다루는 방식">
          <p>
            {SITE_NAME}는 현재 <strong>개별 구매자 후기를 게시하지 않습니다.</strong> 구매자
            평균 별점, 추천 비율, 별점 분포도 표시하지 않습니다. 확인 가능한 출처가 붙지 않은
            글을 구매자 후기처럼 보여 주는 것은 사실과 다르기 때문입니다.
          </p>
          <p>
            자세한 원칙은{' '}
            <Link href="/editorial-policy" className="text-blue-600 hover:underline">
              편집 원칙
            </Link>
            에 정리해 두었습니다.
          </p>
        </Section>

        <Section id="limits" title="8. 이 방법의 한계">
          <ul className="list-disc pl-5 space-y-1.5">
            <li>직접 측정하지 않습니다. 모든 성능 수치는 공개 사양 기반입니다.</li>
            <li>전기요금은 누진구간을 반영하지 않아 실제 청구액과 다를 수 있습니다.</li>
            <li>소모품비는 카테고리와 무관한 단일 가정값입니다.</li>
            <li>점수는 카테고리 내 상대 평가라, 카테고리가 다른 제품의 점수를 직접 비교할 수 없습니다.</li>
            <li>사양·가격은 수시로 바뀝니다. 구매 전 제조사·판매처의 최신 정보를 확인하세요.</li>
          </ul>
        </Section>
      </div>
    </>
  );
}
