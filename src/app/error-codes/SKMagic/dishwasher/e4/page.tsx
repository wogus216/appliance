import type { Metadata } from 'next';
import Link from 'next/link';
import { AdSenseScript } from '@/components/adsense-script';
import { EvidenceBlock } from '@/components/evidence-block';
import { ERROR_CODE_SCOPE_NOTE } from '@/components/error-codes/evidence-section';
import { buildOpenGraph } from '@/lib/metadata';
import { SITE_AUTHOR } from '@/lib/constants';

// 2026-10-29 개정: SK인텔릭스서비스가 2026-10-28 E4 FAQ를 계열별 네 건으로 나눴다. 예전 출처 FAQ210104033077은
// 이제 DWA2900~2930 전용(연결 4개)이고, 새 12인용·클림 FAQ(연결 93개)를 포함해 어느 FAQ에도 DWA81* 제품코드가 없다.
// 그래서 「DWA-81R0D 등 12인용」 표기를 빼고 각 FAQ의 해당모델·연결 제품 범위대로 다시 썼다. URL과 기존 앵커는 유지한다.
// 근거: research/evidence/2026-10-29/error-actions/skmagic-cuckoo-roborock.md 「E4」 절

const PATH = '/error-codes/SKMagic/dishwasher/e4';
const TITLE = 'SK매직 식기세척기 E4 — 모델별 뜻과 확인 순서';
const DESCRIPTION =
  'SK매직 식기세척기 E4는 계열에 따라 고온 급수, 거품·누수·가열 불량, 수동 급수 물 넘침, 세척수 순환 문제를 뜻합니다. DWA-81 터치온은 공식 근거가 없어 서비스 문의가 먼저입니다.';

const FAQ = (id: string) =>
  `https://www.skintellixservice.com/web/easy/easyMain.do?tabIndex=0&subIndex=0&selectedPrdCd=04&selectedSubPrdCd=DWA&inputFaqId=${id}`;

const sources = [
  { url: FAQ('FAQ261028039824'), title: '[E4] 표시가 떠요 (DWA16 클림 계열, DWA12인용) — FAQ261028039824, 2026-10-28 신설', publisher: 'SK인텔릭스서비스' },
  { url: FAQ('FAQ210104033077'), title: '[E4] 표시가 떠요 (DWA2900/2910/2920/2930) — FAQ210104033077, 2026-10-28 갱신', publisher: 'SK인텔릭스서비스' },
  { url: FAQ('FAQ261028039815'), title: '[E1] [E4] 표시가 떠요 (DWA2820, DWA2810, DWA2800) — FAQ261028039815, 2026-10-28 신설', publisher: 'SK인텔릭스서비스' },
  { url: FAQ('FAQ261028039822'), title: '[E4] 표시가 떠요 (DWA19R) — FAQ261028039822, 2026-10-28 신설', publisher: 'SK인텔릭스서비스' },
  {
    url: 'https://m.manual.skmagic.com/2019/model/DWA/DWA81R0D00SL/Manual.htm',
    title: 'DWA-81R0D 등 터치온 식기세척기 공용 설명서 — 자가 진단하기(E4 없음)·제품규격',
    publisher: 'SK매직',
  },
  { url: 'https://www.skintellixservice.com/web/main/main.do', title: '고객상담센터 1600-1661 상담시간', publisher: 'SK인텔릭스서비스' },
];

const modelGroups = [
  { id: 'dwa12', model: 'DWA16 클림 계열·DWA12인용', meaning: '60℃ 이상 온수 급수' },
  { id: 'dwa29', model: 'DWA2900·2910·2920·2930', meaning: '세제 거품 과다·누수, 또는 세척수·헹굼수 가열 불량' },
  { id: 'dwa28', model: 'DWA2800·2810·2820', meaning: '수동 급수 때 물 넘침(E1과 같은 FAQ)' },
  { id: 'dwa19', model: 'DWA19R·DWA19C', meaning: '배수필터·하부 세척 날개 막힘 또는 거품으로 세척수 순환이 안 됨' },
  { id: 'dwa81', model: 'DWA-81 터치온(DWA-81R0D 등 8개)', meaning: '공식 근거 없음 — 서비스 문의' },
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
            E4라는 글자만으로 고장 부품을 정할 수 없습니다. SK매직 서비스센터(SK인텔릭스서비스)는
            2026년 10월 28일 E4 안내를 모델 계열별 FAQ 네 건으로 나눴고, 계열마다 서로 다른 상황을
            설명합니다. 먼저 제품의 모델명을 확인하고, 아래에서 해당하는 계열을 고르세요.
          </p>
          <p className="mt-3 text-sm text-gray-600">
            DWA-81R0D 등 터치온 식기세척기는 설명서에도, 네 FAQ의 연결 제품에도 E4가 없습니다. 모델명이
            목록에 없거나 읽히지 않으면 다른 계열의 조치를 적용하지 말고 SK매직 고객상담센터(1600-1661)에서 확인하세요.
          </p>
        </div>
      </section>

      <article className="mx-auto max-w-4xl space-y-10 px-4 pb-16">
        {/* 2026-10-11(페르소나 평가): 물이 보이는 사람에게 필요한 차단 순서가 모델 표 아래에 있었다.
            DWA-81R0D 설명서 자가진단 '기능 이상' 조치(전원 플러그 분리 → 중간밸브 잠금 → 1600-1661)를 첫 상자로 올렸다. */}
        <section aria-labelledby="now-heading" className="rounded-xl border border-amber-200 bg-amber-50 p-5">
          <h2 id="now-heading" className="text-lg font-bold text-amber-950">지금 할 일 — 물이 보이면</h2>
          <ol className="mt-2 list-decimal space-y-2 pl-6 leading-relaxed text-amber-950">
            <li>세척을 다시 시작하지 않습니다. 작동 중에는 뜨거운 물과 증기가 나올 수 있으니 문을 갑자기 열지 마세요.</li>
            <li>안전하게 닿는 곳에서 전원을 차단합니다. 젖은 플러그를 맨손으로 만지거나 본체를 분해하지 마세요.</li>
            <li>식기세척기로 가는 중간밸브를 잠급니다.</li>
            <li>
              SK매직 고객상담센터(<a href="tel:16001661" className="underline">1600-1661</a>)에 접수합니다.
              공식 사이트 표기 상담시간은 평일 09:00~18:00, 토요일 09:00~13:00이고 일요일·공휴일은 쉽니다.
            </li>
          </ol>
          <p className="mt-2 text-sm leading-relaxed text-amber-950">물이 보이지 않으면 아래 1에서 모델 계열부터 고르세요.</p>
        </section>

        <section aria-labelledby="model-heading">
          <h2 id="model-heading" className="text-xl font-bold text-gray-900">1. 모델명에 맞는 E4를 찾으세요</h2>
          <p className="mt-2 text-sm text-gray-600">
            아래 구분은 각 FAQ 본문의 「해당모델」 표기와 그 FAQ가 연결된 제품코드를 따른 것입니다.
            ‘12인용’이라는 용량 표기만 보고 정확한 모델을 확인한 것으로 여기지 마세요.
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border">
            <table className="w-full min-w-[600px] text-left text-sm">
              <thead className="bg-gray-50 text-gray-700">
                <tr><th scope="col" className="p-4">모델 계열</th><th scope="col" className="p-4">공식 자료의 E4 의미</th></tr>
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

        <section id="dwa12" aria-labelledby="dwa12-heading" className="scroll-mt-24 border-t pt-8">
          <h2 id="dwa12-heading" className="text-xl font-bold">2. DWA16 클림 계열·DWA12인용</h2>
          <p className="mt-3 leading-relaxed text-gray-700">
            FAQ261028039824는 해당모델을 「DWA16 클림 계열, DWA12인용」으로 적고, 급수할 때 60℃ 이상의 높은
            온도의 온수를 사용했을 경우 E4가 발생한다고 설명합니다. 이 FAQ는 DWA16 계열을 포함한 93개
            제품코드에 연결돼 있지만 DWA-81 터치온 제품코드는 그 목록에 없습니다. 같은 목록에 들어 있는
            DWA2800~2820·DWA2900~2930은 제목에 모델명을 적은 전용 E4 FAQ가 따로 있어 아래 3·4에 나눠 실었습니다.
          </p>
          <ol className="mt-4 list-decimal space-y-2 pl-6 leading-relaxed text-gray-700">
            <li>급수호스가 냉수에 연결돼 있는지 확인합니다. 배관을 직접 분리하지 않습니다.</li>
            <li>냉수에 연결돼 있고 주변이 젖지 않았다면 전원코드를 분리한 뒤 다시 연결합니다.</li>
            <li>같은 에러가 다시 뜨거나 연결 상태를 알 수 없으면 서비스 점검을 요청합니다. 센서나 히터 고장이라고 추정해 부품을 교체하지 않습니다.</li>
          </ol>
        </section>

        <section id="dwa29" aria-labelledby="dwa29-heading" className="scroll-mt-24 border-t pt-8">
          <h2 id="dwa29-heading" className="text-xl font-bold">3. DWA2900·2910·2920·2930</h2>
          <p className="mt-3 leading-relaxed text-gray-700">
            FAQ210104033077(2026-10-28 갱신, 연결 제품 DWA2900·2910·2920·2930)은 주방 세제·액체 전용세제를
            쓰거나 전용세제를 너무 많이 넣어 거품이 과하게 생기고 누수가 발생한 경우, 그리고 세척수·헹굼수
            가열이 되지 않는 경우에 E4가 발생한다고 설명합니다. 급수 온도를 바꾸는 조치가 아닙니다.
          </p>
          <ol className="mt-4 list-decimal space-y-2 pl-6 leading-relaxed text-gray-700">
            <li>세척을 멈추고, 밖으로 물이 새는지 확인합니다. 누수가 보이면 맨 위 &lsquo;지금 할 일&rsquo; 순서대로 전원과 중간밸브를 차단합니다.</li>
            <li>거품이 보이면 제품 내부와 바구니를 깨끗한 젖은 행주로 닦아 남은 거품을 없앱니다. 다른 세제나 화학약품을 넣지 않습니다.</li>
            <li>FAQ는 전원을 끄고 전원 코드를 콘센트에서 뺀 뒤 1~2일 지나 다시 연결해 사용하도록 안내합니다.</li>
            <li>거품을 없애고 전원을 다시 연결한 뒤에도 같은 에러가 나면 서비스 점검을 요청합니다.</li>
          </ol>
        </section>

        <section id="dwa28" aria-labelledby="dwa28-heading" className="scroll-mt-24 border-t pt-8">
          <h2 id="dwa28-heading" className="text-xl font-bold">4. DWA2800·2810·2820</h2>
          <p className="mt-3 leading-relaxed text-gray-700">
            FAQ261028039815는 이 계열의 E1·E4를 함께 다룹니다. 수동 급수(무설치)로 물탱크에 물이 가득 차면
            부저가 울리고 표시창의 수도꼭지 표시가 사라지는데, 그 뒤에도 물을 더 부으면 물이 넘치거나 E4가
            뜨며 작동하지 않습니다. FAQ는 전원코드를 분리한 뒤 제품을 한쪽으로 들어 물을 빼고 밑면을 닦는
            방법까지 안내하지만, 전기 부품과 물이 닿았는지 사용자가 확인할 수 없습니다.
          </p>
          <ol className="mt-4 list-decimal space-y-2 pl-6 leading-relaxed text-gray-700">
            <li>물 붓기를 즉시 멈추고, 주변이 젖었다면 안전한 위치에서 전원을 차단합니다.</li>
            <li>바닥에 보이는 물만 닦고 본체를 기울이거나 하부 덮개를 열지 않습니다.</li>
            <li>본체 아래에서 물이 나왔거나 E4가 반복되면 SK매직에 점검을 요청합니다.</li>
          </ol>
        </section>

        <section id="dwa19" aria-labelledby="dwa19-heading" className="scroll-mt-24 border-t pt-8">
          <h2 id="dwa19-heading" className="text-xl font-bold">5. DWA19R·DWA19C</h2>
          <p className="mt-3 leading-relaxed text-gray-700">
            FAQ261028039822는 제목에 「DWA19R」을 적고 DWA19R·DWA19C 제품코드 10개에 연결돼 있습니다. 배수필터나
            하부 세척 날개의 노즐이 이물질로 막혔거나, 세제 거품 때문에 세척수가 순환하지 않을 때 E4가 발생한다고
            설명합니다.
          </p>
          <ol className="mt-4 list-decimal space-y-2 pl-6 leading-relaxed text-gray-700">
            <li>제품 내부에 거품이 있으면 깨끗한 젖은 행주로 닦아 남은 거품을 없앱니다.</li>
            <li>기기가 멈추고 내부가 식은 뒤, FAQ와 해당 모델 설명서대로 하부 세척 날개를 분리해 아래쪽 톱니 부분의 이물질을 확인하고 제거합니다.</li>
            <li>FAQ는 전원을 끄고 전원코드를 뺀 뒤 하루가 지나 다시 연결해 가동하도록 안내합니다.</li>
            <li>청소 후에도 표시가 반복되거나 물이 새면 작동을 멈추고 서비스를 요청합니다.</li>
          </ol>
        </section>

        <section id="dwa81" aria-labelledby="dwa81-heading" className="scroll-mt-24 border-t pt-8">
          <h2 id="dwa81-heading" className="text-xl font-bold">6. DWA-81 터치온(DWA-81R0D 등) — 공식 근거 없음</h2>
          <p className="mt-3 leading-relaxed text-gray-700">
            DWA-81R0D 공용 설명서(DWA-81R0D·R1D·U0D·U1D·R5B·R6B·U5B·U6B)의 자가 진단표에는 E2·E3·F1~F9·tS·tO만
            있고 E4가 없습니다. 2026-10-28에 나뉜 E4 FAQ 네 건의 연결 제품코드에도 DWA-81 계열은 없습니다. 그래서
            이 모델에서 E4가 무엇을 뜻하는지, 사용자가 무엇을 해 볼 수 있는지는 공식 자료로 확인하지 못했습니다.
          </p>
          <ol className="mt-4 list-decimal space-y-2 pl-6 leading-relaxed text-gray-700">
            <li>위 계열의 조치(냉수 연결 확인, 1~2일 뒤 재연결, 세척 날개 분리 등)를 옮겨 쓰지 않습니다.</li>
            <li>물이 보이면 맨 위 &lsquo;지금 할 일&rsquo;을 따릅니다.</li>
            <li>명판의 모델명 전체와 E4 표시, 표시 직전 상황을 SK매직 고객상담센터(1600-1661)에 알려 확인합니다.</li>
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
          checkedAt="2026-10-29"
          covers="계열별 E4 의미와 조치는 SK인텔릭스서비스가 2026-10-28 나눈 E4 FAQ 네 건의 본문과 연결 제품코드에서, DWA-81 터치온에 E4가 없다는 것은 DWA-81R0D 공용 설명서 자가 진단표와 네 FAQ의 연결 목록에서 확인했습니다. 물이 보일 때의 차단 순서(전원 플러그 분리·중간밸브 잠금·고객상담센터 문의)는 DWA-81R0D 설명서의 기능 이상 조치이고, 상담시간은 SK인텔릭스서비스 공식 사이트에서 확인했습니다. DWA2800~2820에서 본체를 기울이지 않도록 한 것은 살림랩의 안전 판단입니다. 특정 부품의 고장이나 수리 비용, FAQ에 연결되지 않은 모델의 코드 적용은 확인하지 않았습니다."
          sources={sources}
          footnote={<>{ERROR_CODE_SCOPE_NOTE} 제품에 동봉된 설명서와 모델별 공식 안내가 이 페이지와 다르면 해당 모델 설명서를 따르세요.</>}
        />
        <p className="border-t pt-6 text-sm">
          <Link href="/error-codes/SKMagic" className="text-blue-700 hover:underline">← SK매직 에러코드 목록으로</Link>
        </p>
      </article>
    </>
  );
}
