import type { Metadata } from 'next';
import Link from 'next/link';
import { AdSenseScript } from '@/components/adsense-script';
import { EvidenceBlock } from '@/components/evidence-block';
import { ERROR_CODE_SCOPE_NOTE } from '@/components/error-codes/evidence-section';
import { SITE_AUTHOR } from '@/lib/constants';
import { buildOpenGraph } from '@/lib/metadata';
import { ErrorActionCard } from '@/components/error-codes/action-card';
import { ErrorCodeNextTools } from '@/components/error-codes/next-tools';
import { CUCKOO_E4_ACTION_GUIDE } from '@/lib/data/error-codes/action-guides';

const PATH = '/error-codes/Cuckoo/dishwasher/e4';
const TITLE = '쿠쿠 CDW-A0611TW 식기세척기 E4: 멈춰야 할 때와 확인 순서';
const DESCRIPTION = 'CDW-A0611TW·CDW-A0611TS 공식 설명서의 E4 누수 및 기능점검 안내를 대조했습니다. 전원·중간밸브 차단과 접수 순서, 바닥에 물이 보일 때, 접수 때 물어볼 보증·비용 항목을 정리합니다.';
const MANUAL = 'https://www.cuckoo.co.kr/upload_cuckoo/_bo_rep/manual/200424%3Dz0383-0082a0%20rev.1_cdw-a0611t.pdf';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: buildOpenGraph({ title: TITLE, description: DESCRIPTION, url: PATH }),
};

export default function CuckooDishwasherE4Page() {
  return (
    <>
      <AdSenseScript />
      <section className="bg-gradient-to-b from-orange-50 to-white py-12">
        <div className="mx-auto max-w-4xl px-4">
          <nav aria-label="현재 위치" className="mb-4 text-sm text-gray-600">
            <Link href="/error-codes" className="text-blue-700 hover:underline">에러코드</Link>
            <span aria-hidden className="mx-2">/</span>
            <Link href="/error-codes/Cuckoo" className="text-blue-700 hover:underline">쿠쿠</Link>
            <span aria-hidden className="mx-2">/</span><span>식기세척기 E4</span>
          </nav>
          <h1 className="text-3xl font-bold leading-tight text-gray-900">{TITLE}</h1>
          <p className="mt-4 leading-relaxed text-gray-700">
            CDW-A0611TW의 E4는 공식 설명서에서 <strong>누수 및 기능점검</strong>으로 안내합니다.
            물이 안 들어오는 E1의 조치와 다릅니다. 물을 더 공급하거나 다시 세척하기 전에
            전원과 급수를 차단하고 서비스를 요청하는 것이 이 모델의 안내입니다.
          </p>
          <a href="#action-card" className="mt-4 inline-block text-sm font-semibold text-blue-700 underline underline-offset-4">모델 확인하고 AS 상담 기록 만들기</a>
        </div>
      </section>

      <article className="mx-auto max-w-4xl space-y-10 px-4 pb-16">
        {/* 2026-10-11(페르소나 평가 P2): 바닥에 물이 보이는 사람이 첫 소제목(모델 확인)을 지나 한 번 더
            내려가야 차단 순서가 나왔다. 설명서 25쪽 E4 조치를 첫 상자로 올리고 모델 확인은 아래로 내렸다. */}
        <section aria-labelledby="now-heading" className="rounded-xl border border-red-200 bg-red-50 p-5">
          <h2 id="now-heading" className="text-xl font-bold text-red-950">지금 할 일</h2>
          <ol className="mt-3 list-decimal space-y-3 pl-6 leading-relaxed text-red-950">
            <li>
              <strong>전원을 끕니다.</strong> 플러그를 콘센트에서 뽑습니다. 콘센트나 플러그 주변이
              젖었다면 직접 만지지 말고 안전하게 닿는 차단기에서 전원을 내리세요.
            </li>
            <li>
              <strong>중간밸브를 잠급니다.</strong> 설명서 12쪽 그림의 중간밸브는 싱크대 수전으로 가는
              급수 배관에 달린 밸브이고, 본문은 이것을 &lsquo;급수 연결구의 밸브&rsquo;라고 부릅니다.
              손잡이를 그림의 &lsquo;잠김&rsquo; 쪽으로 돌립니다.
            </li>
            <li>
              <strong>쿠쿠 서비스(<a href="tel:15888899" className="underline">1588-8899</a>)에 접수합니다.</strong>{' '}
              공식 사이트 표기 상담시간은 평일 09:00~18:00(점심 12:00~13:00), 토요일 09:00~13:00이고
              일요일·공휴일은 쉽니다. 설명서 32쪽은 홈페이지 1:1 채팅 상담으로도 고장 문의·A/S 접수를
              안내합니다(채팅 운영시간은 확인하지 못했습니다).
            </li>
          </ol>
          <p className="mt-3 text-sm leading-relaxed text-red-950">
            E4 항목에는 센서를 바꾸거나 기기를 기울여 물을 빼는 절차가 없습니다. 바닥을 열거나 누수
            감지부를 우회하지 말고, 물이 안 보여도 E4 표시만으로 다시 세척하지 마세요.
          </p>
        </section>

        <section aria-labelledby="water-heading">
          <h2 id="water-heading" className="text-xl font-bold">1. 바닥에 물이 보일 때</h2>
          <p className="mt-3 leading-relaxed text-gray-700">
            바닥에 고인 물을 닦아도 되는지, 문을 열어 식기를 꺼내도 되는지는 설명서에 없습니다.
            전원과 중간밸브를 잠근 뒤 접수할 때 상담원에게 확인하세요.
          </p>
          <p className="mt-3 leading-relaxed text-gray-700">
            E4 없이 문 아래쪽에서 물이 흐르는 경우는 설명서 27쪽 &lsquo;고장신고 전에 확인하십시오&rsquo;에
            따로 있습니다. 제품이 기울어 문이 완전히 닫히지 않으면 제품 밑의 높이 조절기로 수평을
            맞추고, 배수호스와 배수구의 연결, 급수호스와 수도꼭지의 연결 상태를 확인하라고 합니다.
            E4가 떠 있다면 이 점검보다 위의 차단과 접수가 먼저입니다.
          </p>
        </section>

        <section aria-labelledby="model-heading">
          <h2 id="model-heading" className="text-xl font-bold">2. 제품 명판의 모델을 확인하세요</h2>
          <p className="mt-3 leading-relaxed text-gray-700">
            이 안내의 근거는 쿠쿠 공용 설명서입니다. 인쇄 32쪽 규격표에 CDW-A0611TW와
            CDW-A0611TS가 함께 실려 있고, 인쇄 25쪽에 E4의 진단과 조치가 나옵니다.
            모델명이 다르면 쿠쿠 브랜드나 6인용이라는 용량만으로 같은 의미를 적용하지 마세요.
            다른 브랜드의 E4는 모델 계열에 따라 뜻이 달라서,
            <Link href="/error-codes/SKMagic/dishwasher/e4" className="mx-1 text-blue-700 hover:underline">SK매직의 모델별 E4 안내</Link>를
            쿠쿠 제품에 쓰지 않습니다.
            <a href={MANUAL} target="_blank" rel="noopener noreferrer" className="ml-1 text-blue-700 hover:underline">공식 설명서 열기</a>
          </p>
        </section>

        <ErrorActionCard guide={CUCKOO_E4_ACTION_GUIDE} />

        <section aria-labelledby="compare-heading">
          <h2 id="compare-heading" className="text-xl font-bold">3. E1·dr과 확인 순서가 다른 이유</h2>
          <div className="mt-4 overflow-x-auto rounded-xl border">
            <table className="w-full min-w-[540px] text-left text-sm">
              <thead className="bg-gray-50"><tr><th scope="col" className="p-4">표시</th><th scope="col" className="p-4">설명서의 점검 범위</th><th scope="col" className="p-4">먼저 할 일</th></tr></thead>
              <tbody className="divide-y text-gray-700">
                <tr><th scope="row" className="p-4">E4</th><td className="p-4">누수·기능점검</td><td className="p-4">전원과 중간밸브 차단, 서비스 문의</td></tr>
                <tr><th scope="row" className="p-4">E1</th><td className="p-4">급수점검</td><td className="p-4">단수, 밸브, 급수호스 상태 확인</td></tr>
                <tr><th scope="row" className="p-4">dr</th><td className="p-4">문열림</td><td className="p-4">문이 제대로 닫혔는지 확인</td></tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 leading-relaxed text-gray-700">
            E1의 밸브 열기나 dr의 문 닫기 조치를 E4에 적용하면 누수 점검을 건너뛰게 됩니다.
            물이 새거나 전원 부근이 젖었다면 다른 표시여도 운전을 멈추세요.
            {/* 2026-10-09 4차(오류 코드 담당 요청): "E4를 ‘수위센서 고장’으로만 설명할 근거도 없다"는 정정 흔적이라 뺐다 */}
          </p>
        </section>

        <section aria-labelledby="service-heading" className="rounded-xl bg-gray-50 p-5">
          <h2 id="service-heading" className="text-xl font-bold">4. 접수할 때 준비하고 물어볼 것</h2>
          <p className="mt-3 leading-relaxed text-gray-700">
            모델명, E4 화면 사진, 세척 시작 직후인지 진행 중인지, 눈에 보이는 누수 위치,
            최근 설치·이동·호스 작업 여부, 전원과 중간밸브 차단 여부를 전하세요.
            차단 전에 사진을 찍으려고 젖은 전원 부근에 접근할 필요는 없습니다.
          </p>
          <p className="mt-3 leading-relaxed text-gray-700">
            설명서 33쪽 제품보증서의 무상 보증기간은 구입일부터 1년입니다. 구입한 지 1년이 넘었다면
            무상수리 대상인지부터 확인하세요. 구입일을 확인할 수 없으면 제조일로부터 6개월이 지난
            날부터 계산하므로 영수증이나 구입일이 적힌 보증서를 준비합니다. 제조일이 제품 어디에
            표기되는지는 설명서에서 찾지 못해, 필요하면 상담 때 위치를 물어보세요.
          </p>
          <p className="mt-3 leading-relaxed text-gray-700">수리비는 코드만으로 알 수 없으니 접수할 때 다음을 물어보세요.</p>
          <ul className="mt-2 list-disc space-y-1 pl-6 leading-relaxed text-gray-700">
            <li>보증 적용 여부(구입일 기준)</li>
            <li>출장비와, 점검 결과 고장이 아닐 때도 드는지 — 33쪽 하단은 기구 세척·조정·사용 설명을 고장이 아니라고 적습니다</li>
            <li>예상 부품비와 부품 보유 여부 — 부품이 없다는 답이면 아래 33쪽 보상 기준으로 이어집니다</li>
          </ul>
          <p className="mt-3 leading-relaxed text-gray-700">
            같은 쪽 소비자 피해보상 안내는 정상 사용 중 고장이면 보증기간 안에서 하자에 무상수리,
            같은 하자가 반복되면 제품교환이나 구입가 환불을 적습니다. 쿠쿠 대리점·서비스센터 기사가
            아닌 사람이 수리·개조해 생긴 고장은 보증기간 안에도 유상수리로 분류하므로, 바닥 덮개를
            열거나 부품을 직접 바꾸기 전에 접수하세요.
          </p>
          <p className="mt-3 leading-relaxed text-gray-700">
            수리용 부품이 없어 수리할 수 없을 때는 보증기간 안이면 제품교환이나 구입가 환불, 보증기간이
            지난 뒤면 감가상각한 금액을 기준으로 환불한다는 칸이 있습니다(설명서 33쪽, 공정거래위원회 고시
            제2009-1호 근거). 가산 비율은 인쇄가 작아 읽지 못했으니 상담 때 확인하세요. 정상 사용 중
            고장의 다른 행은 &lsquo;보증기간 경과 후&rsquo; 칸이 비어 있어, 보증이 끝난 뒤의 수리비 기준은
            이 표만으로 알 수 없습니다.
          </p>
        </section>

        <ErrorCodeNextTools brand="Cuckoo" />

        <EvidenceBlock
          reviewedBy={SITE_AUTHOR}
          checkedAt="2026-10-11"
          covers="쿠쿠 공식 공용 설명서 인쇄 12쪽(중간밸브 그림), 25쪽(E4·E1·dr 조치), 27쪽(문 아래 누수 점검), 32쪽(적용 모델·1:1 채팅 접수), 33쪽(보증기간·소비자 피해보상)과 쿠쿠 공식 고객센터 상담시간을 대조했습니다. 젖은 전원 부근의 접근 중단과 접수 때 물어볼 항목은 살림랩이 정리한 판단 순서입니다. 실제 고장 부품·수리 결과·비용은 확인하지 못했습니다."
          sources={[
            { url: MANUAL, title: 'CDW-A0611TW·CDW-A0611TS 공용 설명서, 인쇄 12·25·27·32·33쪽', publisher: '쿠쿠' },
            { url: 'https://www.cuckoo.co.kr/customer', title: '고객센터 — 구매 제품 서비스 1588-8899 상담시간', publisher: '쿠쿠' },
          ]}
          footnote={<>{ERROR_CODE_SCOPE_NOTE} 모델이 다르거나 설명서가 개정됐다면 사용 중인 제품의 공식 안내를 우선하세요.</>}
        />
        <p className="border-t pt-6 text-sm"><Link href="/error-codes/Cuckoo" className="text-blue-700 hover:underline">← 쿠쿠 에러코드 목록으로</Link></p>
      </article>
    </>
  );
}
