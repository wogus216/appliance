import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_NAME } from '@/lib/constants';
import { buildOpenGraph } from '@/lib/metadata';
import { BreadcrumbJsonLd } from '@/components/jsonld';

const TITLE = '계산 방법';
const DESCRIPTION = `${SITE_NAME}이 가격·전기요금·10년 총비용을 어떻게 옮기고 계산하는지, 그리고 제품에 점수를 매기지 않는 이유를 공개합니다.`;

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
            먼저 분명히 해 둘 것 — {SITE_NAME}은 제품을 직접 구매해 실험실에서 측정하지
            않습니다. 여기 있는 숫자는 제조사·공공기관·가격비교 DB가 공개한 값이고, 이 페이지는
            그 값을 어떻게 옮기고 계산하는지 적습니다. 측정값이 아니며 실제 사용 환경에 따라
            달라집니다.
          </p>
        </header>

        <Section id="no-scores" title="1. 제품에 점수를 매기지 않습니다">
          <p>
            예전에는 제품마다 5점 만점 점수와 항목 점수(10점 만점), 가성비 별점을 붙였습니다.
            종합 점수는 항목 점수의 평균을 2로 나눈 값이었는데, 생활가전의 항목 네 개 중 세
            개(성능·편의기능·내구성)가 <strong>대조할 공개 수치가 없어 판단으로 매긴 값</strong>
            이었습니다. 선풍기·공기청정기·정수기·로봇청소기는 항목 전부가 그랬습니다.
          </p>
          <p>
            판단이라고 라벨을 붙여도, 직접 써 보거나 재 보지 않은 제품에 매긴 판단은 숫자로
            보여 줄 근거가 없습니다. 그래서 종합 점수·항목 점수·가성비 별점을 모두 걷었습니다.
            제품 글의 &ldquo;이런 분께 맞다/맞지 않다&rdquo; 같은 판단은 점수가 아니라 문장으로만
            남깁니다.
          </p>
          <p>
            제품끼리 우열을 보여 주는 값은 <strong>출처가 있는 것만</strong> 싣습니다 — 정부
            고시에 따라 제조사가 표기한 에너지소비효율등급, 그리고 제조사가 공개한 정격
            소비전력(W)·소음(dB)입니다. 이 값들은 점수로 바꾸지 않고 단위 그대로 싣습니다.
            목록의 &lsquo;에너지등급순&rsquo; 정렬도 이 등급 표기를 그대로 씁니다.
          </p>
        </Section>

        <Section id="price" title="2. 가격">
          <p>
            가격은 <strong>조사 시점의 시중가 하나</strong>만 적습니다. 예전에는 정가와 실거래가를
            나눠 적었지만, 제조사 정가를 확인할 방법이 없어 2026년 8월에 그 표기를 없앴습니다.
            지금 사이트에 보이는 금액은 표시된 확인일에 판매처에서 대조한 값이고, 수시로 바뀌므로
            참고용입니다.
          </p>
          <p>
            가격을 마지막으로 대조한 날짜가 확인된 제품은 상세 페이지 &ldquo;이 글의 근거&rdquo;
            블록에 <strong>가격 확인일</strong>로 표시합니다. 확인일이 없는 제품은 그 줄 자체를
            표시하지 않습니다 — 확인하지 않은 날짜를 적지 않기 위해서입니다.
          </p>
        </Section>

        <Section id="electricity" title="3. 전기요금">
          <p className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900 leading-relaxed">
            <strong>현재 이 사이트는 어떤 제품에도 월 전기요금을 표시하지 않습니다.</strong> 2026년
            8월 점검에서 카탈로그에 적혀 있던 월 전기요금 65건이 전부 출처 없이 들어간 값임을
            확인해 삭제했고, 아직 근거를 확인한 값을 다시 채우지 못했습니다.
          </p>
          <p>
            금액을 다시 싣지 않는 데에는 이유가 하나 더 있습니다. 국내 주택용 전기요금은
            누진제라 같은 1kWh라도 그 집이 그 달에 이미 얼마를 썼는지에 따라 단가가 달라집니다.
            사용량을 모르는 상태에서 계산한 월 요금은 정확해 보이지만 근거가 없습니다.
          </p>
          <p>
            대신 확인한 <strong>정격 소비전력(W)</strong>과 <strong>에너지소비효율등급</strong>을
            그대로 싣습니다. 두 값의 출처는 제품 상세의 &ldquo;이 글의 근거&rdquo; 블록에
            표시됩니다. 요금이 궁금하시면 제품 라벨의 1회 또는 연간 소비전력량(kWh)에 사용
            횟수를 곱하고, 그 값을 최근 고지서의 사용량에 더해 어느 누진 구간에 걸리는지 보시는
            편이 정확합니다.
          </p>
          <p className="text-sm text-gray-500">
            아래 4번과 5번에 적은 등급별 비교표와 10년 총비용 계산기는 월 전기요금 값이 있어야
            동작합니다. 값이 없는 지금은 <strong>어느 제품 페이지에도 표시되지 않습니다.</strong>{' '}
            산식을 남겨 두는 것은 나중에 근거를 갖춰 되살릴 때 같은 기준을 쓰기 위해서입니다.
          </p>
        </Section>

        <Section id="energy-grade" title="4. 에너지등급별 전기요금 비교">
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

        <Section id="tco" title="5. 10년 총비용(TCO)">
          <p>총비용 계산기는 세 가지를 더합니다.</p>
          <pre className="overflow-x-auto rounded-xl bg-gray-900 p-4 text-xs text-gray-100">
{`총비용 = 구매가 + 전기요금 + 소모품비

구매가   = 조사 시점 시중가
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

        <Section id="reviews" title="6. 후기를 다루는 방식">
          <p>
            {SITE_NAME}은 현재 <strong>개별 구매자 후기를 게시하지 않습니다.</strong> 구매자
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

        <Section id="limits" title="7. 이 방법의 한계">
          <ul className="list-disc pl-5 space-y-1.5">
            <li>직접 측정하지 않습니다. 모든 성능 수치는 공개 사양 기반입니다.</li>
            <li>전기요금은 누진구간을 반영하지 않아 실제 청구액과 다를 수 있습니다.</li>
            <li>소모품비는 카테고리와 무관한 단일 가정값입니다.</li>
            <li>
              제조사 표기는 시험 조건이 제각각입니다. 같은 &lsquo;소음 dB&rsquo;라도 측정 거리와
              모드가 다를 수 있어, 브랜드를 가로질러 견줄 때는 조건을 함께 보셔야 합니다.
            </li>
            <li>사양·가격은 수시로 바뀝니다. 구매 전 제조사·판매처의 최신 정보를 확인하세요.</li>
          </ul>
        </Section>
      </div>
    </>
  );
}
