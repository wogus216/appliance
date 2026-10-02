import type { Metadata } from 'next';
import Link from 'next/link';
import { AdSenseScript } from '@/components/adsense-script';
import { EvidenceBlock } from '@/components/evidence-block';
import { SITE_AUTHOR } from '@/lib/constants';
import { buildOpenGraph } from '@/lib/metadata';

const PATH = '/error-codes/Haier/air-conditioner/f25';
const TITLE = '하이얼 CTH06QBW·CTH10QBW 에어컨 F25 확인 순서';
const DESCRIPTION =
  '국내 CTH06QBW·CTH10QBW 설명서의 F25 안내와 해외 하이얼 FAQ의 차이를 대조했습니다. 외기 온도, 재시작, 서비스 요청 기준을 확인하세요.';

const manual06 =
  'https://www.haier.co.kr/include/download.asp?file_name=HSU06_Series__CTH06_Series_%EC%82%AC%EC%9A%A9%EC%84%A4%EB%AA%85%EC%84%9C_20240221.pdf&file_full_name=00000002312024000262_file1.pdf&folder=0000000231';
const manual10 =
  'https://www.haier.co.kr/include/download.asp?file_name=HSU10Q_Series__CTH10Q_Series_%EC%82%AC%EC%9A%A9%EC%84%A4%EB%AA%85%EC%84%9C_20240221.pdf&file_full_name=00000002312024000264_file1.pdf&folder=0000000231';

const sources = [
  {
    url: 'https://www.haier.co.kr/board/board_manual/board_list.asp?scrID=0000000231&pageNum=3&subNum=7&ssubNum=1&page=1&s_string=CTH06QBW',
    title: 'CTH06QBW 모델별 설명서 검색 결과',
    publisher: '하이얼코리아',
  },
  {
    url: manual06,
    title: 'HSU06·CTH06 계열 사용설명서, 인쇄 28쪽',
    publisher: '하이얼코리아',
  },
  {
    url: 'https://www.haier.co.kr/board/board_manual/board_list.asp?scrID=0000000231&pageNum=3&subNum=7&ssubNum=1&page=1&s_string=CTH10QBW',
    title: 'CTH10QBW 모델별 설명서 검색 결과',
    publisher: '하이얼코리아',
  },
  {
    url: manual10,
    title: 'HSU10Q·CTH10Q 계열 사용설명서, 인쇄 28쪽',
    publisher: '하이얼코리아',
  },
  {
    url: 'https://www.haier.com/ae/service-support/self-service/20150213_83062.shtml',
    title: '해외 하이얼 F25 FAQ — 모델 적용 범위 미기재',
    publisher: '하이얼 UAE',
  },
];

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: buildOpenGraph({ title: TITLE, description: DESCRIPTION, url: PATH }),
};

export default function HaierAirConditionerF25Page() {
  return (
    <>
      <AdSenseScript />
      <section className="bg-gradient-to-b from-orange-50 to-white py-12">
        <div className="mx-auto max-w-4xl px-4">
          <nav aria-label="현재 위치" className="mb-4 text-sm text-gray-600">
            <Link href="/error-codes" className="text-blue-700 hover:underline">에러코드</Link>
            <span aria-hidden className="mx-2">/</span>
            <Link href="/error-codes/Haier" className="text-blue-700 hover:underline">하이얼</Link>
            <span aria-hidden className="mx-2">/</span>
            <span>F25</span>
          </nav>
          <h1 className="text-3xl font-bold leading-tight text-gray-900">{TITLE}</h1>
          <p className="mt-4 leading-relaxed text-gray-700">
            F25라는 글자만 보고 센서를 주문하지 마세요. 하이얼코리아가 두 모델명으로 연결한
            설명서는 외부 온도가 0℃ 미만일 때 이 표시가 나올 수 있다고 적고, 장치를 10초간
            껐다 다시 시작하도록 안내합니다. 설명서에는 F25의 고장 부품을 지정하지 않습니다.
          </p>
        </div>
      </section>

      <article className="mx-auto max-w-4xl space-y-10 px-4 pb-16">
        <section aria-labelledby="models-heading">
          <h2 id="models-heading" className="text-xl font-bold">1. 모델명부터 맞추세요</h2>
          <p className="mt-3 leading-relaxed text-gray-700">
            아래 연결은 하이얼코리아의 <strong>정확한 모델명 검색 결과</strong>와 PDF를 직접
            대조한 것입니다. 설명서의 사양표는 계열명으로 묶여 있으므로, 같은 하이얼 브랜드의
            모든 에어컨에 이 안내를 적용할 수는 없습니다.
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead className="bg-gray-50 text-gray-700">
                <tr><th scope="col" className="p-4">국내 모델</th><th scope="col" className="p-4">연결된 설명서</th><th scope="col" className="p-4">F25 위치</th></tr>
              </thead>
              <tbody className="divide-y text-gray-700">
                <tr><th scope="row" className="p-4 font-semibold">CTH06QBW</th><td className="p-4">HSU06·CTH06 계열</td><td className="p-4">인쇄 28쪽</td></tr>
                <tr><th scope="row" className="p-4 font-semibold">CTH10QBW</th><td className="p-4">HSU10Q·CTH10Q 계열</td><td className="p-4">인쇄 28쪽</td></tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-sm text-gray-600">제품 명판의 모델명이 다르면 해당 제품 설명서를 먼저 찾으세요.</p>
        </section>

        <section aria-labelledby="steps-heading">
          <h2 id="steps-heading" className="text-xl font-bold">2. 표시 상황에 따라 확인하세요</h2>
          <ol className="mt-4 list-decimal space-y-4 pl-6 leading-relaxed text-gray-700">
            <li><strong>외부 온도를 확인합니다.</strong> 표시가 나온 시각과 당시 외기 온도를 적어 두세요. 설명서는 0℃ 미만에서 F25가 표시될 수 있다고만 합니다. 외기가 추웠다는 사실만으로 기기가 정상이라고 확정할 수는 없습니다.</li>
            <li><strong>기기를 끄고 10초 뒤 다시 시작합니다.</strong> 이는 두 국내 모델 설명서의 조치입니다. 작동 중인 실외기의 덮개를 열거나 배선·센서를 만질 필요가 없습니다.</li>
            <li><strong>다시 표시되면 사용을 멈추고 서비스를 요청합니다.</strong> 외기가 0℃ 이상인데 표시됐거나, 재시작 뒤에도 F25가 반복되면 코드 사진·모델명·발생 시각·외기 온도·운전 모드를 함께 전하세요. 설명서만으로 고장 부품을 확정할 수 없습니다.</li>
          </ol>
          <p className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4 leading-relaxed text-amber-950">
            타는 냄새, 연기, 물에 젖은 전원 부근 등 안전 문제가 보이면 재시작하지 말고
            안전하게 접근할 수 있는 곳에서 전원을 끈 뒤 점검을 요청하세요.
          </p>
        </section>

        <section aria-labelledby="scope-heading">
          <h2 id="scope-heading" className="text-xl font-bold">3. 해외의 ‘센서 교체’ 안내를 그대로 쓰지 않는 이유</h2>
          <p className="mt-3 leading-relaxed text-gray-700">
            하이얼 UAE의 별도 F25 FAQ는 압축기 토출 센서를 원인으로 쓰고 서비스 교체를
            안내합니다. 하지만 그 페이지에는 CTH06QBW·CTH10QBW 또는 국내 판매형의
            적용 모델번호가 없습니다. 국내 모델별 설명서는 저온 표시 가능성과 재시작만
            안내합니다. <strong>코드가 같다는 이유만으로 해외 문서의 부품 진단을 두 국내
            모델에 옮길 근거는 없습니다.</strong>
          </p>
          <p className="mt-3 leading-relaxed text-gray-700">
            재시작으로 표시가 사라져도 수리 완료로 기록할 수 없고, 반복돼도 곧바로 센서
            불량이라고 단정할 수 없습니다. 두 경우 모두 실제 원인을 확인하려면 제품 상태를
            현장에서 점검해야 합니다.
          </p>
        </section>

        <section className="rounded-xl bg-gray-50 p-5 text-sm leading-relaxed text-gray-700">
          <h2 className="text-lg font-bold text-gray-900">점검을 요청할 때</h2>
          <p className="mt-2">
            하이얼코리아 고객센터는 <a href="tel:15886645" className="text-blue-700 hover:underline">1588-6645</a>입니다.
            모델명 전체와 F25 사진, 발생 시각의 외기 온도, 재시작 후 재발 여부를 알려 주세요.
          </p>
        </section>

        <EvidenceBlock
          reviewedBy={SITE_AUTHOR}
          checkedAt="2026-10-02"
          covers="하이얼코리아의 두 정확한 모델별 설명서 연결, 인쇄 28쪽의 F25 안내, 해외 하이얼 FAQ의 모델 적용 범위를 대조했습니다. 외기 온도 기록과 서비스 요청 경계는 살림랩이 자료의 범위 안에서 정리한 판단 순서입니다. 국내 두 모델의 부품 고장 원인·수리 결과는 확인하지 못했습니다."
          sources={sources}
          footnote={<>사용 중인 제품의 정확한 모델 설명서가 이 페이지와 다르면 해당 설명서를 따르세요.</>}
        />
        <p className="border-t pt-6 text-sm">
          <Link href="/error-codes/Haier" className="text-blue-700 hover:underline">← 하이얼 에러코드 목록으로</Link>
        </p>
      </article>
    </>
  );
}
