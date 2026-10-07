import type { Metadata } from 'next';
import Link from 'next/link';
import { AdSenseScript } from '@/components/adsense-script';
import { EvidenceBlock } from '@/components/evidence-block';
import { SITE_AUTHOR } from '@/lib/constants';
import { buildOpenGraph } from '@/lib/metadata';

const PATH = '/error-codes/Cuckoo/dishwasher/e4';
const TITLE = '쿠쿠 CDW-A0611TW 식기세척기 E4: 멈춰야 할 때와 확인 순서';
const DESCRIPTION = 'CDW-A0611TW·CDW-A0611TS 공식 설명서의 E4 누수 및 기능점검 안내를 대조했습니다. 모델 확인, 전원·급수 차단, 서비스 요청과 E1·dr의 차이를 정리합니다.';
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
        </div>
      </section>

      <article className="mx-auto max-w-4xl space-y-10 px-4 pb-16">
        <section aria-labelledby="model-heading">
          <h2 id="model-heading" className="text-xl font-bold">1. 제품 명판의 모델부터 확인하세요</h2>
          <p className="mt-3 leading-relaxed text-gray-700">
            이 안내의 근거는 쿠쿠 공용 설명서입니다. 인쇄 32쪽 규격표에 CDW-A0611TW와
            CDW-A0611TS가 함께 실려 있고, 인쇄 25쪽에 E4의 진단과 조치가 나옵니다.
            모델명이 다르면 쿠쿠 브랜드나 6인용이라는 용량만으로 같은 의미를 적용하지 마세요.
            <a href={MANUAL} target="_blank" rel="noopener noreferrer" className="ml-1 text-blue-700 hover:underline">공식 설명서 열기</a>
          </p>
          <p className="mt-3 leading-relaxed text-gray-700">
            화면 사진에 E4가 분명히 찍혔는지 확인하고 모델명 전체를 함께 기록하세요.
            다른 브랜드 식기세척기의 E4는 모델 계열에 따라 의미가 달라집니다.
            <Link href="/error-codes/SKMagic/dishwasher/e4" className="ml-1 text-blue-700 hover:underline">SK매직의 모델별 E4 안내</Link>는
            쿠쿠 제품의 수리 지침으로 사용하지 않습니다.
          </p>
        </section>

        <section aria-labelledby="stop-heading">
          <h2 id="stop-heading" className="text-xl font-bold">2. E4라면 재시작보다 차단과 접수가 먼저입니다</h2>
          <ol className="mt-4 list-decimal space-y-4 pl-6 leading-relaxed text-gray-700">
            <li><strong>운전을 중단합니다.</strong> 설명서의 E4 항목은 전원을 끄고 플러그를 분리하도록 안내합니다. 콘센트나 플러그 주변이 젖었다면 직접 만지지 말고 안전하게 접근할 수 있는 차단기에서 전원을 차단하세요.</li>
            <li><strong>식기세척기에 연결된 중간밸브를 잠급니다.</strong> 설명서는 급수호스와 중간밸브를 사용하는 설치를 안내합니다. 급수밸브를 잠근 상태에서 추가로 물을 넣거나 시험 세척하지 마세요. 어느 밸브인지 모르거나 접근하기 어렵다면 설치처에 도움을 요청하세요.</li>
            <li><strong>차단 상태로 고객센터에 문의합니다.</strong> E4 항목에는 사용자가 센서를 교체하거나 기기를 기울여 물을 빼는 절차가 없습니다. 바닥을 열거나 누수 감지부를 우회하지 마세요.</li>
          </ol>
          <p className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4 leading-relaxed text-amber-950">
            눈에 보이는 물이 없어도 E4 표시만으로 재가동해도 된다고 판단할 수 없습니다.
            설명서는 누수와 기능점검을 함께 묶을 뿐, 표시만으로 고장 부품을 특정하지 않습니다.
          </p>
        </section>

        <section aria-labelledby="compare-heading">
          <h2 id="compare-heading" className="text-xl font-bold">3. E1·dr과 확인 순서가 다른 이유</h2>
          <div className="mt-4 overflow-x-auto rounded-xl border">
            <table className="w-full min-w-[540px] text-left text-sm">
              <thead className="bg-gray-50"><tr><th scope="col" className="p-4">표시</th><th scope="col" className="p-4">설명서의 점검 범위</th><th scope="col" className="p-4">먼저 할 일</th></tr></thead>
              <tbody className="divide-y text-gray-700">
                <tr><th scope="row" className="p-4">E4</th><td className="p-4">누수·기능점검</td><td className="p-4">전원과 급수 차단, 서비스 문의</td></tr>
                <tr><th scope="row" className="p-4">E1</th><td className="p-4">급수점검</td><td className="p-4">단수, 밸브, 급수호스 상태 확인</td></tr>
                <tr><th scope="row" className="p-4">dr</th><td className="p-4">문열림</td><td className="p-4">문이 제대로 닫혔는지 확인</td></tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 leading-relaxed text-gray-700">
            E1의 밸브 열기나 dr의 문 닫기 조치를 E4에 적용하면 누수 점검을 건너뛰게 됩니다.
            물이 새거나 전원 부근이 젖었다면 다른 표시여도 운전을 멈추세요.
            E4를 ‘수위센서 고장’으로만 설명할 근거도 이 설명서에는 없습니다.
          </p>
        </section>

        <section aria-labelledby="service-heading" className="rounded-xl bg-gray-50 p-5">
          <h2 id="service-heading" className="text-xl font-bold">4. 상담 전에 남겨 둘 기록</h2>
          <p className="mt-3 leading-relaxed text-gray-700">
            모델명, E4 화면 사진, 세척 시작 직후인지 진행 중인지, 눈에 보이는 누수 위치,
            최근 설치·이동·호스 작업 여부, 전원과 중간밸브 차단 여부를 전하세요.
            차단 전에 사진을 찍으려고 젖은 전원 부근에 접근할 필요는 없습니다.
            이미 했던 조치를 기록하면 상담 때 같은 시험을 반복할 가능성을 줄일 수 있습니다.
          </p>
          <p className="mt-3 leading-relaxed text-gray-700">
            코드만으로 부품 가격·수리비·수리 시간을 알 수 없습니다. 점검 후 부품대와 공임,
            출장비, 보증 적용 여부를 구분해 견적을 받으세요.
          </p>
        </section>

        <EvidenceBlock
          reviewedBy={SITE_AUTHOR}
          checkedAt="2026-10-07"
          covers="쿠쿠 공식 공용 설명서 인쇄 25쪽의 E4·E1·dr 조치와 32쪽의 적용 모델을 대조했습니다. 젖은 전원 부근의 접근 중단과 상담 기록은 살림랩이 정리한 판단 순서입니다. 실제 고장 부품·수리 결과·비용은 확인하지 못했습니다."
          sources={[{ url: MANUAL, title: 'CDW-A0611TW·CDW-A0611TS 공용 설명서, 인쇄 25·32쪽', publisher: '쿠쿠' }]}
          footnote={<>모델이 다르거나 설명서가 개정됐다면 사용 중인 제품의 공식 안내를 우선하세요.</>}
        />
        <p className="border-t pt-6 text-sm"><Link href="/error-codes/Cuckoo" className="text-blue-700 hover:underline">← 쿠쿠 에러코드 목록으로</Link></p>
      </article>
    </>
  );
}
