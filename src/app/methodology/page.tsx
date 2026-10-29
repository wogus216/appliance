import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_NAME } from '@/lib/constants';
import { buildOpenGraph } from '@/lib/metadata';
import { BreadcrumbJsonLd } from '@/components/jsonld';
import { ValueBadge } from '@/components/tools/value-badge';
import { allAppliances } from '@/lib/data/appliances';
import { VERIFIED_PRICES } from '@/lib/data/appliances/verified-specs';
import { CONSUMER_STANDARD_NOTICE } from '@/lib/data/consumer-standards';
import { KEPCO_RESIDENTIAL_LOW } from '@/lib/data/kepco-tariff';
import { WATER_PURIFIER_COST_CHECKED_AT } from '@/lib/data/water-purifier-cost';
import { lastRevisionFor } from '@/lib/data/site-revisions';
import { COMPARABLE_CAPACITY_GAP_PERCENT } from '@/lib/energy-comparison';
import { getTool, TOOLS, STORAGE_LABELS, type ToolSlug } from '@/lib/tool-directory';
import type { ValueKind } from '@/lib/value-kind';
import { PRICE_RECHECK_DAYS } from '@/lib/water-purifier-cost';

const TITLE = '계산 방법';
// 2026-10-09 4차: '10년 총비용 계산'을 공개한다고 약속했지만 그 계산은 꺼져 있다 — 실제로 하는 것만 적는다
// 2026-10-29 8단계: 생활 과제별 도구의 식과 값 종류 표시를 4절로 더했다.
const DESCRIPTION = `${SITE_NAME}이 가격을 어디서 옮기는지, 라벨의 소비전력량과 등급을 어떻게 읽는지, 도구가 어떤 식으로 무엇까지만 계산하는지, 그리고 제품에 점수를 매기지 않는 이유를 공개합니다.`;

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

/** 가격을 싣는 공개 제품의 가격 출처 종류 — 문장에 손으로 숫자를 적지 않는다 */
function countPriceSources() {
  const priced = allAppliances.filter((a) => a.price != null && VERIFIED_PRICES[a.slug]);
  const danawa = priced.filter((a) => VERIFIED_PRICES[a.slug].source.includes('danawa.com')).length;
  return { total: priced.length, danawa, other: priced.length - danawa };
}

/**
 * 이 페이지를 처음 쓴 날 — git에서 이 파일을 추가한 커밋(2ce3d01, 2026-08-23).
 * 빌드 때 git에서 읽지 않는다: 배포 환경이 얕은 복제를 하면 날짜가 뭉친다(site-revisions.ts 머리 주석).
 */
const WRITTEN_AT = '2026-08-23';

const link = 'text-blue-600 hover:underline';
const tariff = KEPCO_RESIDENTIAL_LOW;
const fuel = tariff.fuelAdjustment;

/**
 * 도구별 식. 도구 페이지의 설명 절을 옮기지 않고, 무엇과 무엇을 더하고 빼는지와 어디서 멈추는지만 적는다.
 * 각 식은 lib의 계산 함수와 같다(fridge-fit.fridgeFitTargets, install-check.axisReference,
 * home-energy-record.calculateHomeEnergy, water-purifier-cost.rentalPath·purchasePath·replacementsWithin,
 * repair-replace.calculateRepairReplace, consumer-standards.ts).
 */
const TOOL_RULES: { slug: ToolSlug; rule: string }[] = [
  {
    slug: 'fridge-fit',
    rule: '잰 값에서 설명서 기준을 뺀 mm를 냅니다. 자리 폭의 기준은 본체 폭에 설명서가 요구한 좌우 간격을 양쪽 더한 값이고, 문 앞 거리의 기준은 뒤 간격과 문을 연 깊이의 합입니다.',
  },
  {
    slug: 'dishwasher-fit',
    rule: '자리의 폭·깊이·높이에서 본체 치수를 뺍니다. 설명서에서 좌우·위쪽 간격 수치를 찾지 못해 기준에 간격을 더하지 않고, 그 조건은 결과 아래 확인 필요로 남깁니다.',
  },
  {
    slug: 'install-check',
    rule: '기준은 본체(실내기·실외기·스테이션) 치수에 원문으로 확인된 면의 여유만 더한 값입니다. 여유를 찾지 못한 면은 0mm로 치지 않고 기준에서 뺀 채 따로 적으며, 한 원문 안에서 값이 둘로 엇갈리면 어느 값도 쓰지 않습니다.',
  },
  {
    slug: 'home-energy',
    rule: '측정기의 누적 kWh × 30 ÷ 측정 일수로 30일 사용량을 냅니다. 공단 월간 신고값은 같은 모델일 때 옆에 둘 뿐이고, 두 값의 차이를 고장이나 절약으로 풀이하지 않습니다. 요금 차이는 위 3절의 요금표로만 계산합니다.',
  },
  {
    slug: 'care-plan',
    rule: '마지막 관리일에 설명서의 관리 주기를 더해 다음 확인일을 냅니다. 몇 개월 뒤 같은 날짜가 없는 달이면 그 달 말일로 맞춥니다. 설명서에 주기가 없는 항목은 날짜를 지어내지 않고 사용자가 고른 날짜만 씁니다.',
  },
  {
    slug: 'household-care',
    rule: `품질보증 종료일은 구입일(또는 인도일·교환일)에 ${CONSUMER_STANDARD_NOTICE.name}(${CONSUMER_STANDARD_NOTICE.notice}, 시행 ${CONSUMER_STANDARD_NOTICE.effectiveDate})의 품목별 기간을 더한 날입니다. 부품보유기간은 제조일부터 세므로 명판의 제조일을 넣었을 때만 계산합니다. 무상 수리를 받을 수 있는지와 부품 재고는 계산 대상이 아닙니다.`,
  },
  {
    slug: 'repair-replace',
    rule: '새 제품 가격과 그 추가 비용을 더한 뒤 받은 수리 견적을 뺍니다. 사이트가 가진 가격은 쓰지 않고 입력한 금액만 쓰며, 양쪽 포함 항목을 다 확인했다고 고르지 않으면 결과를 부분 비교로 표시합니다.',
  },
  {
    slug: 'water-purifier-cost',
    rule: '같은 개월 수로 렌탈은 월 렌탈료 × 개월 수에 등록비를, 구매는 구매가에 기간 안에 돌아오는 필터 교체 횟수 × 필터 가격을 더합니다. 첫 설치 때 들어 있는 필터와 기간이 끝나는 달의 교체는 세지 않습니다. 확인하지 못한 비용은 0원으로 넣지 않고 합계에서 뺀 뒤 부분 합계라고 밝히며, 중도 해지 위약금은 약관에 적힌 산식으로만 셉니다.',
  },
];

/** 값 종류마다 계산에서 다루는 방식. 뜻풀이는 /tools#value-kinds에 있고 여기서는 계산 규칙만 적는다. */
const VALUE_KIND_RULES: { kind: ValueKind; rule: string }[] = [
  { kind: 'official', rule: '계산의 기준선입니다. 도구에서 사용자가 고칠 수 없고, 옮겨 온 쪽·절과 확인일을 붙입니다.' },
  { kind: 'official-test', rule: `시험 조건이 같은 값끼리만 나란히 놓습니다. 모델끼리 비교는 품목과 신고 항목이 같고 정격 용량 차이가 ${COMPARABLE_CAPACITY_GAP_PERCENT}% 이내일 때만 합니다(살림랩이 정한 선이고 공단 기준이 아닙니다).` },
  { kind: 'measured', rule: '사용자가 잰 치수·전력량입니다. 숫자 형식과 허용 범위만 검사하고, 맞게 쟀는지는 확인하지 않습니다.' },
  { kind: 'entered', rule: '견적서·계약서·고지서에서 옮겨 적은 금액과 날짜입니다. 공식 가격으로 시작하는 칸도 사용자가 고치면 이 표시로 바뀝니다.' },
  { kind: 'calculated', rule: '앞의 값들로 만든 결과라, 넣은 치수·금액·측정값의 오차를 그대로 물려받습니다.' },
  { kind: 'example', rule: '설명 절의 예시 계산과 둘러보기용 장면에만 씁니다. 실제 집이나 계약을 가정한 값이 아닙니다.' },
  { kind: 'unverified', rule: '비교·합계·판정에 넣지 않습니다. 0이나 평균값으로 메우지 않고, 설치팀·제조사·판매처에 물을 항목으로 남깁니다.' },
];

export default function MethodologyPage() {
  const priceSources = countPriceSources();
  // 2026-10-11 5차: 날짜가 없어 언제 기준의 방법인지 알 수 없었다(P8). 마지막으로 본문이 바뀐 날은
  // 사이트맵 lastmod와 같은 개편 기록에서 읽는다 — 검수 기록이 아니라 변경 기록이라 '수정일'이라고 쓴다.
  const revisedAt = lastRevisionFor('/methodology');
  // 기록을 브라우저에 남기는 도구. 저장 방식 이름(STORAGE_LABELS의 키)에서 고른다.
  const savingTools = TOOLS.filter((tool) => tool.storage === 'browser' || tool.storage === 'session-save');
  const urlTools = TOOLS.filter((tool) => tool.storage === 'model-in-url' || tool.storage === 'selection-in-url');
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: '홈', path: '/' }, { name: TITLE }]} />
      <div className="max-w-3xl mx-auto px-4 py-12 space-y-10">
        <header className="space-y-3">
          <h1 className="text-3xl font-bold text-gray-900">{TITLE}</h1>
          <p className="text-gray-600 leading-relaxed">{DESCRIPTION}</p>
          <p className="text-xs text-gray-400">
            작성일 <time dateTime={WRITTEN_AT}>{WRITTEN_AT}</time>
            {revisedAt && (
              <>
                {' '}· 최종 수정일 <time dateTime={revisedAt}>{revisedAt}</time>
              </>
            )}
          </p>
          {/* 2026-10-29 8단계: 출처 종류를 소개 페이지(2026-10-09 4차 교정)와 맞추고, 도구에 사용자가 넣는 값을 구별했다. */}
          <p className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900 leading-relaxed">
            먼저 분명히 해 둘 것 — {SITE_NAME}은 제품을 직접 구매해 실험실에서 측정하지
            않습니다. 여기 있는 숫자는 제조사·국내 수입사·공공기관·가격비교 DB가 공개한 값이거나,
            도구에 사용자가 직접 넣은 값입니다. 이 페이지는 그 값을 어떻게 옮기고 계산하는지
            적습니다. 측정값이 아니라서, 냉방·적용 면적이나 라벨의 월간 소비전력량처럼 정해진 시험
            조건에서 나온 값은 그 조건과 다른 집에서 그대로 재현되지 않습니다.
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
            목록의 &lsquo;에너지등급순&rsquo; 정렬도 이 등급 표기를 그대로 씁니다. 소음(dB)은 측정
            거리·운전 상태를 확인하지 못한 표기값이라 &lsquo;조용함·보통&rsquo; 같은 등급이나
            생활 소음 예시로 바꾸지 않고, 비교표에서도 낮은 값을 따로 강조하지 않습니다.
          </p>
        </Section>

        <Section id="price" title="2. 가격">
          <p>
            가격은 <strong>조사 시점의 시중가 하나</strong>만 적습니다. 예전에는 정가와 실거래가를
            나눠 적었지만, 제조사 정가를 확인할 방법이 없어 2026년 8월에 그 표기를 없앴습니다.
            {/* '대부분'이라고 쓰지 않고 출처표(VERIFIED_PRICES)에서 센다(2026-10-08 3차) */}
            지금 가격을 싣는 제품 {priceSources.total}개 중 {priceSources.danawa}개는 가격비교
            DB(다나와)의 해당 모델 페이지 최저가이고, {priceSources.other}개는 제조사 공식몰
            판매가입니다. 어느 쪽인지는 제품마다 &ldquo;이 글의 근거&rdquo;의 참고 자료에 가격
            출처로 링크해 두었습니다. 구매처 링크의 판매가와는 다를 수 있습니다.
          </p>
          <p>
            가격을 마지막으로 대조한 날짜가 확인된 제품은 상세 페이지 &ldquo;이 글의 근거&rdquo;
            블록에 <strong>가격 확인일</strong>로 표시합니다. 확인일이 없는 제품은 그 줄 자체를
            표시하지 않습니다 — 확인하지 않은 날짜를 적지 않기 위해서입니다.
          </p>
          <p>
            일시불 판매가를 확인하지 못한 제품은 가격을 비워 두고, 다른 제품과의 가격 차이도
            계산하지 않습니다. 가격 차이는 두 제품의 가격을 <strong>같은 날 조사했을 때만</strong>{' '}
            적습니다. 보급형·중급·프리미엄 같은 <strong>가격대 등급은 붙이지 않습니다</strong> —
            등급을 가를 가격 구간을 근거와 함께 공개할 수 없고, 예전에는 가격을 모르는 제품에도
            &lsquo;프리미엄&rsquo;이 붙어 있었기 때문입니다(2026-10-08에 걷음).
          </p>
          {/* 2026-10-29 8단계: 정수기 비용 도구의 가격은 제품 가격과 출처·주기가 다르다(water-purifier-cost.ts). */}
          <p>
            <Link href={getTool('water-purifier-cost').href} className={link}>
              {getTool('water-purifier-cost').title}
            </Link>
            의 렌탈료·등록비·구매가·필터 가격은 위 시중가와 따로, 제조사 판매 화면과 약관에서{' '}
            <time dateTime={WATER_PURIFIER_COST_CHECKED_AT}>{WATER_PURIFIER_COST_CHECKED_AT}</time>에
            읽은 값입니다. 렌탈 조건은 자주 바뀌어 확인일에서 <strong>{PRICE_RECHECK_DAYS}일</strong>이
            지나면 도구 화면에 &lsquo;가격 재확인 필요&rsquo;가 뜹니다. 그때는 자기 계약서나 현재
            판매 화면의 금액으로 바꿔 넣고 계산하세요.
          </p>
        </Section>

        <Section id="electricity" title="3. 전기요금">
          {/* 2026-10-09 4차: "어떤 제품에도 월 전기요금을 표시하지 않는다"는 제품 본문·블로그가 공단 라벨 금액이나
              고시 산정식 계산(다이슨 HP09 라벨 197,000원/월, 하루 1시간 월 약 24,600원)을 쓰는 지금과 어긋났다.
              실제 규칙 — 월 요금 칸은 없고, 금액은 라벨·산정식으로 조건과 함께만 쓴다 — 으로 고쳤다. */}
          <p className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900 leading-relaxed">
            <strong>제품 상세에는 월 전기요금 칸이 없습니다.</strong> 2026년 8월 점검에서 카탈로그에
            적혀 있던 월 전기요금 65건이 전부 출처 없이 들어간 값임을 확인해 삭제했습니다. 본문이나
            블로그에 금액이 나온다면 한국에너지공단 라벨에 적힌 금액이거나 고시 산정식으로 계산한
            값이고, 그때는 산정 조건을 함께 적습니다.
          </p>
          <p>
            칸을 되살리지 않는 데에는 이유가 하나 더 있습니다. 국내 주택용 전기요금은 누진제라
            같은 1kWh라도 그 집이 그 달에 이미 얼마를 썼는지에 따라 단가가 달라집니다. 사용량을
            모르는 상태에서 계산한 월 요금은 정확해 보이지만 근거가 없습니다.
          </p>
          {/* 2026-10-29 8단계: 4단계 요금 차이 계산의 규칙(electricity-bill.ts·kepco-tariff.ts). 기간·요율은 데이터에서 읽는다. */}
          <p>
            그래서 원 단위 요금은 고지서의 가구 월 사용량을 사용자가 직접 넣는{' '}
            <Link href={getTool('home-energy').href} className={link}>
              {getTool('home-energy').title}
            </Link>
            에서만 계산합니다. 기기 사용분은 측정기로 잰 kWh의 30일 환산값만 받고, 공단 신고값으로는
            요금을 내지 않습니다. 계산은 기기 사용분을 더하기 전과 후의 가구 요금을 각각 구해 그
            차이를 보여 줍니다.
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>
              요금표는{' '}
              <a href={tariff.rateTableUrl} target="_blank" rel="noopener noreferrer" className={link}>
                {tariff.name}
              </a>
              ({tariff.scope})이고 <time dateTime={tariff.checkedAt}>{tariff.checkedAt}</time>에
              확인했습니다. 누진 구간별 기본요금과 전력량요금, 기후환경요금, 연료비조정요금을 더한 뒤
              부가가치세와 전력산업기반기금을 한전 요금표의 끝수 처리대로 붙입니다. 한전ON
              전기요금계산기의 사례와 항목별 금액이 원 단위까지 같은지 확인한 뒤 공개했습니다.
            </li>
            <li>
              연료비조정단가는 한전이 분기마다 새로 정합니다. 지금 넣어 둔 값은{' '}
              <a href={fuel.sourceUrl} target="_blank" rel="noopener noreferrer" className={link}>
                {fuel.label}
              </a>
              이라, {fuel.from}~{fuel.to} 사용분이 아닌 달은 계산하지 않고 &lsquo;요금표 갱신
              필요&rsquo;로 멈춥니다. 분기가 바뀌면 한전 공지를 다시 읽고 요금표를 바꿉니다.
            </li>
            <li>
              하계(7~8월)·동계(12~2월)에 {tariff.superUser.overKwh.toLocaleString('ko-KR')}kWh를
              넘는 슈퍼유저 구간과 복지할인 감액은 한전 계산기 사례로 맞춰 보지 못해 계산하지
              않습니다.
            </li>
          </ul>
          <p>
            대신 확인한 <strong>정격 소비전력(W)</strong>과 <strong>에너지소비효율등급</strong>을
            그대로 싣습니다. 두 값의 출처는 제품 상세의 &ldquo;이 글의 근거&rdquo; 블록에
            표시됩니다. 요금이 궁금하시면 먼저 라벨의 소비전력량을 한 달 사용량(kWh/월)으로
            맞추세요. 냉장고·에어컨의 <strong>월간 소비전력량</strong>은 그대로 쓰고, 건조기처럼
            <strong> 연간 환산값</strong>이 적힌 라벨은 12로 나누며, <strong>1회 소비전력량</strong>
            이 적힌 라벨이면 한 달 사용 횟수를 곱합니다. 셋 다 시험 조건의 값이라 실제 코스·운전
            시간과는 다릅니다. 그 값을 최근 고지서의 월 사용량에 더해 어느 누진 구간에 걸리는지
            보시는 편이 정확합니다.
            {/* 2026-10-08 교정: 예전 안내는 "1회 또는 연간 소비전력량에 사용 횟수를 곱하라"였다 —
                연간 값에 횟수를 곱하면 값이 수백 배 커진다. */}
          </p>
          {/* 예전 문구는 공기청정기를 '비대상 품목'으로 적었다. 이 사이트의 공기청정기 가이드와
              blog/air-purifier-area-numbers는 공기청정기가 효율관리기자재 지정품목이고 라벨에
              소비효율등급이 표시된다고 쓴다(효율관리기자재 운용규정 [별표 1]). 서로 어긋나 고쳤다. */}
          <p className="text-sm text-gray-500">
            에너지소비효율등급은 에어컨·제습기·세탁기·건조기·냉장고·식기세척기 제품에만 적고, 그중에서도
            해당 모델의 등급을 확인한 경우에만 싣습니다. 공기청정기도 효율관리기자재 지정품목이라 라벨에
            등급이 있습니다. 다만 공개 중인 샤오미 스마트 공기청정기 4는 같은 모델을 여러 수입사가 따로
            신고해 등급이 2~3등급으로 갈려, 등급 칸에 한 값으로 적지 않고 제품 글에 신고값 범위로
            적었습니다. 그 밖의 품목은 등급 대상 여부와 모델별 신고값을 확인하지 못해 등급을 적지
            않습니다.
          </p>
        </Section>

        {/* 2026-10-29 8단계: 계획 2절의 값 종류 표시와 판정 금지 영역을 도구 쪽에서 공개한다.
            도구가 무엇을 묻고 답하지 못하는지는 /tools 카드에 있어 여기서는 식·값 다루기·보관만 적는다. */}
        <Section id="tools" title="4. 도구의 계산 규칙">
          <p>
            <Link href="/tools" className={link}>도구 모음</Link>의 {TOOLS.length}개 도구는 집에서 잰
            값이나 받은 금액을 공식 자료 옆에 놓고 더하고 빼는 데서 멈춥니다. 그 자리에 설치할 수
            있는지, 제품이 몇 년 더 갈지, 다시 고장 날 확률이 얼마인지, 위약금·보증이 법적으로 어떻게
            적용되는지는 계산 결과로 말하지 않습니다. 그런 판단에 필요한 것은 결과 아래에 물어볼
            항목으로 남깁니다.
          </p>
          <h3 className="font-semibold text-gray-900 pt-1">도구마다 쓰는 식</h3>
          <ul className="list-disc pl-5 space-y-2">
            {TOOL_RULES.map(({ slug, rule }) => {
              const tool = getTool(slug);
              return (
                <li key={slug}>
                  <Link href={tool.href} className={link}>{tool.title}</Link> — {rule}
                </li>
              );
            })}
          </ul>
          <h3 className="font-semibold text-gray-900 pt-1">값 종류 표시를 계산에서 다루는 방식</h3>
          <p>
            결과의 숫자에는 아래 일곱 가지 표시 중 하나가 붙고, 복사·인쇄·내보낸 기록에도 같은 이름이
            남습니다. 각 표시가 무엇을 뜻하는지는{' '}
            <Link href="/tools#value-kinds" className={link}>도구 모음의 풀이</Link>에 있고, 여기에는
            계산할 때 지키는 규칙만 적습니다.
          </p>
          <dl className="space-y-2">
            {VALUE_KIND_RULES.map(({ kind, rule }) => (
              <div key={kind} className="flex flex-col gap-1 sm:flex-row sm:gap-3">
                <dt className="shrink-0 sm:w-28"><ValueBadge kind={kind} /></dt>
                <dd>{rule}</dd>
              </div>
            ))}
          </dl>
          <h3 className="font-semibold text-gray-900 pt-1">입력값의 보관</h3>
          <p>
            이 사이트는 정적 페이지로만 이루어져 입력을 받아 두는 서버가 없습니다. 주소(URL)에는 치수·금액·사용량·날짜를
            넣지 않아, 도구 화면의 링크를 다른 사람에게 보내도 내가 넣은 값은 따라가지 않습니다.
            {urlTools.length > 0 && <> 주소에 남는 것은 {urlTools.map((tool) => tool.title).join(', ')}에서 고른 품목과 모델번호뿐입니다.</>}{' '}
            기록을 남길 수 있는 도구는 {savingTools.map((tool) => tool.title).join('와 ')}이고, 그 기록도
            지금 쓰는 브라우저의 저장소에만 둡니다. 도구별 보관 방식은 도구 모음의 각 카드 &lsquo;입력
            보관&rsquo;에 적었습니다({Object.keys(STORAGE_LABELS).length}가지).
          </p>
        </Section>

        {/* 2026-10-09 4차: 예전 4절(등급별 비교표·배율 표)과 5절(10년 총비용 산식)은 꺼져 있는 기능 설명이
            페이지의 3분의 1을 차지한다는 지적을 받았다. 한 절로 줄이고, 쓰던 가정값만 남겼다. */}
        <Section id="disabled" title="5. 현재 표시하지 않는 항목">
          <p>
            &ldquo;에너지등급별 전기요금 비교표&rdquo;와 &ldquo;10년 총비용 계산기&rdquo;는 월
            전기요금 값이 있어야 동작해, 지금은 어느 페이지에도 나오지 않습니다. 예전에 쓰던 가정값 —
            1등급 대비 소비전력 배율(2등급 1.25·3등급 1.55·4등급 1.90·5등급 2.30)과 품목을 가리지 않은
            소모품비 연 30,000원 — 은 고시나 제조사 자료에서 나온 값이 아닙니다. 되살린다면 품목별
            고시 등급 기준과 실제 소모품 단가로 다시 정합니다.
          </p>
          {/* 2026-10-29 8단계: 정수기 비용 도구가 생겨 '총비용 계산기가 없다'는 문장과 어긋나 보일 수 있어 구별했다. */}
          <p>
            정수기 렌탈·구매 비용 도구는 이 계산기를 되살린 것이 아닙니다. 가정 배율이나 일괄
            소모품비를 쓰지 않고, 제조사가 공개한 판매 조건과 설명서의 필터 주기로 확인된 비용만
            더합니다.
          </p>
        </Section>

        <Section id="reviews" title="6. 후기를 다루는 방식">
          <p>
            {SITE_NAME}은 현재 <strong>개별 구매자 후기를 게시하지 않습니다.</strong> 후기를 모아
            낸 평균 별점·추천 비율·별점 분포 같은 집계도 보여 주지 않습니다. 확인 가능한 출처가 붙지 않은
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
            {/* 예전 목록에는 "전기요금은 누진구간을 반영하지 않는다"·"소모품비는 단일 가정값"이 있었다.
                둘 다 지금은 어느 페이지에도 표시되지 않는 계산(3절)의 한계라 독자에게 해당하지 않는다.
                "사양·가격은 수시로 바뀝니다"는 2절과 반복이라 뺐다. */}
            <li>직접 측정하지 않습니다. 모든 성능 수치는 공개 사양 기반입니다.</li>
            <li>
              제조사 표기는 시험 조건이 제각각입니다. 같은 &lsquo;소음 dB&rsquo;라도 측정 거리와
              모드가 다를 수 있어, 브랜드를 가로질러 견줄 때는 조건을 함께 보셔야 합니다.
            </li>
            <li>
              가격은 조사일 하루의 값입니다. 할인·구성 변경은 반영하지 않으며, 일시불 판매가를
              확인하지 못한 제품은 가격 비교에서 빠집니다.
            </li>
            {/* 2026-10-29 8단계: 도구의 사용자 실측값은 사이트의 측정이 아니다. */}
            <li>
              도구의 사용자 실측값은 그 집에서 사용자가 잰 값입니다. 사이트의 측정이 아니어서 다른
              집이나 다른 제품의 결과로 넓혀 읽지 마세요.
            </li>
          </ul>
        </Section>
      </div>
    </>
  );
}
