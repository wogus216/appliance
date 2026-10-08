import type { Metadata } from 'next';
import Link from 'next/link';
import { AdSenseScript } from '@/components/adsense-script';
import { EvidenceBlock } from '@/components/evidence-block';
import { buildOpenGraph } from '@/lib/metadata';
import { SITE_AUTHOR } from '@/lib/constants';

const PATH = '/error-codes/SKMagic/dishwasher/e4';
const TITLE = 'SK매직 식기세척기 E4 — 모델별 뜻과 확인 순서';
const DESCRIPTION =
  'SK매직 식기세척기 E4는 모델에 따라 고온 급수, 거품·누수, 수동 급수 물 넘침, 물 순환 문제를 뜻합니다. 모델명을 확인한 뒤 안전하게 점검할 순서를 정리했습니다.';

const sources = [
  {
    url: 'https://www.skintellixservice.com/web/easy/easyMain.do?tabIndex=0&subIndex=0&selectedPrdCd=04&selectedSubPrdCd=DWA&inputFaqId=FAQ210104033077',
    title: '식기세척기 E4 표시가 떠요 — FAQ210104033077',
    publisher: 'SK인텔릭스서비스',
  },
  {
    url: 'https://m.manual.skmagic.com/2019/model/DWA/DWA81R0D00SL/Manual.htm',
    title: 'DWA-81R0D 등 터치온 식기세척기 사용설명서 — 급수 수온과 안전 주의',
    publisher: 'SK매직',
  },
];

const modelGroups = [
  { id: 'dwa12', model: 'DWA-81R0D 등 12인용·DWA16 클림', meaning: '60℃ 이상 고온 급수 감지' },
  { id: 'dwa29', model: 'DWA2910·2920·2930', meaning: '주방세제 등에 의한 거품 과다·누수' },
  { id: 'dwa28', model: 'DWA2800·2810·2820', meaning: '수동 급수 중 물 넘침·누수 감지' },
  { id: 'dwa19', model: 'DWA19·DWA90 계열', meaning: '거름망·분사날개 막힘 또는 거품에 따른 순환 문제' },
] as const;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: buildOpenGraph({ title: TITLE, description: DESCRIPTION, url: PATH }),
};

export default function SkMagicDishwasherE4Page() {
  return (
    <>
      <AdSenseScript />
      <section className="bg-gradient-to-b from-orange-50 to-white py-12">
        <div className="mx-auto max-w-4xl px-4">
          <nav aria-label="현재 위치" className="mb-4 text-sm text-gray-600">
            <Link href="/error-codes" className="text-blue-700 hover:underline">에러코드</Link>
            <span aria-hidden className="mx-2">/</span>
            <Link href="/error-codes/SKMagic" className="text-blue-700 hover:underline">SK매직</Link>
            <span aria-hidden className="mx-2">/</span>
            <span>E4</span>
          </nav>
          <h1 className="text-3xl font-bold leading-tight text-gray-900">{TITLE}</h1>
          <p className="mt-4 leading-relaxed text-gray-700">
            E4라는 글자만으로 고장 부품을 정할 수 없습니다. SK매직의 공식 고객지원 문서는
            식기세척기 모델 계열을 네 갈래로 나눠 서로 다른 상황을 설명합니다. 먼저 제품의
            모델명을 확인하고, 아래에서 해당하는 계열을 고르세요.
          </p>
          <p className="mt-3 text-sm text-gray-600">
            모델명이 목록에 없거나 읽히지 않으면 다른 계열의 조치를 적용하지 말고 제품 설명서나
            SK매직 고객상담센터(1600-1661)에서 확인하세요.
          </p>
        </div>
      </section>

      <article className="mx-auto max-w-4xl space-y-10 px-4 pb-16">
        <section aria-labelledby="model-heading">
          <h2 id="model-heading" className="text-xl font-bold text-gray-900">1. 모델명에 맞는 E4를 찾으세요</h2>
          <p className="mt-2 text-sm text-gray-600">
            아래 구분은 공식 FAQ의 모델 표기를 따른 것입니다. ‘12인용’이라는 용량 표기만 보고
            정확한 모델을 확인한 것으로 여기지 마세요.
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border">
            <table className="w-full min-w-[600px] text-left text-sm">
              <thead className="bg-gray-50 text-gray-700">
                <tr><th scope="col" className="p-4">모델 계열</th><th scope="col" className="p-4">공식 FAQ의 E4 의미</th></tr>
              </thead>
              <tbody className="divide-y">
                {modelGroups.map((group) => (
                  <tr key={group.id}>
                    <th scope="row" className="p-4 font-semibold">
                      <a href={`#${group.id}`} className="text-blue-700 hover:underline">{group.model}</a>
                    </th>
                    <td className="p-4 text-gray-700">{group.meaning}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section aria-labelledby="safety-heading" className="rounded-xl border border-amber-200 bg-amber-50 p-5">
          <h2 id="safety-heading" className="text-lg font-bold text-amber-950">2. 물이 보이면 먼저 사용을 멈추세요</h2>
          <p className="mt-2 leading-relaxed text-amber-950">
            바닥이나 본체 아래로 물이 나오거나 전원 플러그 주변이 젖었다면 세척을 다시 시작하지
            마세요. 안전하게 접근할 수 있을 때 급수 밸브를 잠그고 전원을 차단한 뒤 서비스를
            요청하세요. 젖은 플러그를 맨손으로 만지거나 본체를 분해하지 마세요. 작동 중에는
            뜨거운 물과 증기가 나올 수 있으므로 문도 갑자기 열지 마세요.
          </p>
        </section>

        <section id="dwa12" aria-labelledby="dwa12-heading" className="scroll-mt-24 border-t pt-8">
          <h2 id="dwa12-heading" className="text-xl font-bold">3. DWA-81R0D 등 12인용·DWA16 클림</h2>
          <p className="mt-3 leading-relaxed text-gray-700">
            공식 FAQ에서 E4는 급수할 때 60℃ 이상의 물이 들어온 경우입니다. DWA-81R0D를
            포함한 터치온 설명서도 급수 수온 범위를 60℃ 이하로 적습니다. 기기 안의 세척·헹굼
            온도와 수도에서 들어오는 물의 온도는 서로 다른 항목입니다. 다만 이 설명서의 자가
            진단표에는 E2·E3·F1~F9·tS·tO만 있고 E4는 없어, E4의 뜻은 FAQ의 ‘12인용’ 구분에
            기대고 있습니다.
          </p>
          <ol className="mt-4 list-decimal space-y-2 pl-6 leading-relaxed text-gray-700">
            <li>외부에서 볼 수 있는 급수 연결이 냉수 쪽인지 확인합니다. 배관을 직접 분리하지 않습니다.</li>
            <li>냉수 연결이 확인되고 주변이 젖지 않았다면 전원을 끄고 플러그를 분리한 뒤 다시 연결해 표시가 재발하는지 확인합니다.</li>
            <li>냉수 연결인데 E4가 다시 뜨거나 연결 상태를 알 수 없으면 서비스를 요청합니다. 센서나 히터 고장이라고 추정해 부품을 교체하지 않습니다.</li>
          </ol>
        </section>

        <section id="dwa29" aria-labelledby="dwa29-heading" className="scroll-mt-24 border-t pt-8">
          <h2 id="dwa29-heading" className="text-xl font-bold">4. DWA2910·2920·2930</h2>
          <p className="mt-3 leading-relaxed text-gray-700">
            이 계열의 E4는 주방세제 사용 등으로 거품이 과하게 생기고 누수가 발생한 증상으로
            안내됩니다. 급수 온도를 바꾸는 조치가 아닙니다.
          </p>
          <ol className="mt-4 list-decimal space-y-2 pl-6 leading-relaxed text-gray-700">
            <li>세척을 멈추고, 밖으로 물이 새는지 확인합니다. 누수가 보이면 위의 안전 안내대로 급수와 전원을 차단합니다.</li>
            <li>최근 사용한 세제가 식기세척기 전용인지 확인합니다. 공식 FAQ는 전용 세제 또는 가루세제를 정량만 쓰도록 안내합니다.</li>
            <li>누수가 있었거나 전용 세제를 썼는데도 E4가 반복되면 서비스를 요청합니다. 거품을 없애려고 다른 세제나 화학약품을 넣지 않습니다.</li>
          </ol>
        </section>

        <section id="dwa28" aria-labelledby="dwa28-heading" className="scroll-mt-24 border-t pt-8">
          <h2 id="dwa28-heading" className="text-xl font-bold">5. DWA2800·2810·2820</h2>
          <p className="mt-3 leading-relaxed text-gray-700">
            수동 급수형에서 물 가득 찼다는 알림 뒤에도 물을 계속 부어 넘치면 누수가 감지될 수
            있습니다. 공식 FAQ는 전원을 분리한 뒤 제품을 기울여 밑면의 물을 닦는 방법까지
            안내하지만, 전기 부품과 물이 닿았는지 사용자가 확인할 수 없습니다.
          </p>
          <ol className="mt-4 list-decimal space-y-2 pl-6 leading-relaxed text-gray-700">
            <li>물 붓기를 즉시 멈추고, 주변이 젖었다면 안전한 위치에서 전원을 차단합니다.</li>
            <li>바닥에 보이는 물만 닦고 본체를 기울이거나 하부 덮개를 열지 않습니다.</li>
            <li>본체 아래에서 물이 나왔거나 E4가 반복되면 SK매직에 점검을 요청합니다.</li>
          </ol>
        </section>

        <section id="dwa19" aria-labelledby="dwa19-heading" className="scroll-mt-24 border-t pt-8">
          <h2 id="dwa19-heading" className="text-xl font-bold">6. DWA19·DWA90 계열</h2>
          <p className="mt-3 leading-relaxed text-gray-700">
            거름망이나 분사날개 구멍의 이물질, 또는 과한 거품 때문에 물이 잘 순환하지 않을
            때의 E4입니다. 공식 FAQ는 전용 고체·가루 세제의 정량 사용과 거름망·분사날개
            청소를 안내합니다.
          </p>
          <ol className="mt-4 list-decimal space-y-2 pl-6 leading-relaxed text-gray-700">
            <li>기기가 멈추고 내부가 식은 뒤, 손으로 접근할 수 있는 거름망과 분사날개의 이물질을 해당 모델 설명서대로 확인합니다.</li>
            <li>식기세척기 전용 세제를 정량 사용했는지 확인합니다.</li>
            <li>청소 후에도 표시가 반복되거나 물이 새면 작동을 멈추고 서비스를 요청합니다.</li>
          </ol>
        </section>

        <section className="rounded-xl bg-gray-50 p-5 text-sm leading-relaxed text-gray-700">
          <h2 className="text-lg font-bold text-gray-900">서비스를 요청할 때 전할 내용</h2>
          <p className="mt-2">
            모델명 전체, E4가 뜬 시점, 물이나 거품이 보였는지, 급수 연결과 사용 세제, 이미
            해 본 조치를 적어 두면 상담원이 같은 확인을 다시 요청할 가능성을 줄일 수 있습니다.
            SK매직 고객상담센터는 <a href="tel:16001661" className="text-blue-700 hover:underline">1600-1661</a>입니다.
          </p>
        </section>

        <EvidenceBlock
          reviewedBy={SITE_AUTHOR}
          checkedAt="2026-10-08"
          covers="네 계열의 E4 의미와 제조사가 제시한 확인 항목을 대조했습니다. 2026-10-08에는 DWA-81R0D 설명서의 자가 진단표에 E4가 없다는 점을 다시 확인해 본문에 밝혔습니다. 냉수 연결 확인·세제 확인·접근 가능한 거름망 청소를 독자가 안전하게 실행할 순서로 묶은 것은 살림랩의 편집 판단입니다. 특정 부품의 고장이나 수리 비용, 모든 하위 모델의 코드 적용은 확인하지 않았습니다."
          sources={sources}
          footnote={<>제품에 동봉된 설명서와 모델별 공식 안내가 이 페이지와 다르면 해당 모델 설명서를 따르세요. 누수나 전기 안전 문제가 보이면 자가 조치보다 서비스 점검을 우선하세요.</>}
        />
        <p className="border-t pt-6 text-sm">
          <Link href="/error-codes/SKMagic" className="text-blue-700 hover:underline">← SK매직 에러코드 목록으로</Link>
        </p>
      </article>
    </>
  );
}
