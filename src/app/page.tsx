import { Metadata } from 'next';
import Link from 'next/link';
import { CategoryFilterGrid } from '@/components/category-filter-grid';
import { getCardAppliances, getAllCategories, getAllBrands } from '@/lib/data/appliances';
import { SITE_NAME, SITE_DESCRIPTION } from '@/lib/constants';
import { buildOpenGraph } from '@/lib/metadata';
import { AdSenseScript } from '@/components/adsense-script';
import { getIndexableBlogPosts } from '@/lib/blog';
import { formatCodeCount, getErrorCodeDirectory, resolvePopularCodes } from '@/lib/error-codes';
import { ErrorCodeFinder } from '@/components/home/error-code-finder';
import { getPurifierTechnology } from '@/lib/data/purifier-technology';
import { purifierTechnologyHref } from '@/lib/purifier-technology';
import { APPLIANCE_TECHNOLOGY_GUIDES } from '@/lib/data/appliance-technology';
import { technologyGuideHref } from '@/lib/appliance-technology';
import { carePlanHref } from '@/lib/care-plan';

/** 홈에 직접 걸 최근 글 수. 나머지는 /blog 목록으로 넘긴다 */
const HOME_POST_COUNT = 4;

export const metadata: Metadata = {
  title: SITE_NAME,
  description: SITE_DESCRIPTION,
  alternates: { canonical: '/' },
  openGraph: buildOpenGraph({ title: SITE_NAME, description: SITE_DESCRIPTION, url: '/' }),
};

export default function HomePage() {
  const appliances = getCardAppliances();
  const categories = getAllCategories();
  const brandCount = getAllBrands().length;
  // 홈에서 글 하나까지 한 번에 닿게 한다. 목록을 한 번 거치면 크롤 깊이가 늘고,
  // 방문자에게도 이 사이트가 제품 목록만 있는 곳으로 보인다.
  const posts = getIndexableBlogPosts().slice(0, HOME_POST_COUNT);
  const directory = getErrorCodeDirectory();
  const popular = resolvePopularCodes();
  const codeBrandCount = new Set(directory.flatMap((g) => g.brands.map((b) => b.brand))).size;
  const codeCount = directory.reduce((n, g) => n + g.codeCount, 0);
  // 2026-10-11 5차: 귀뚜라미처럼 '01 / 02 / 03'을 한 항목으로 묶는 브랜드가 있어 항목 수와 코드 수가 다르다
  const displayCodeCount = directory.reduce((n, g) => n + g.displayCodeCount, 0);
  const purifierTechnology = getPurifierTechnology('CHPI-7400N');

  return (
    <>
        <AdSenseScript />
        <section className="bg-gradient-to-b from-orange-50 to-white py-16">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              지금 가전 때문에 무엇을 하려고 하나요?
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              제품을 고르고, 설치하고, 계속 쓰고, 고장을 해결하고, 수리할지 교체할지 판단할 때 필요한 근거와 확인표를 모았습니다.
            </p>
            <nav aria-label="생활 과제별 도구" className="mt-8 grid gap-3 text-left sm:grid-cols-2 lg:grid-cols-5">
              {[
                { title: '고르기', detail: '전기사용량 비교', href: '/compare#energy-compare' },
                { title: '설치하기', detail: '자리와 문 열림 확인', href: '#home-install-heading' },
                { title: '쓰기·관리하기', detail: '관리 날짜와 실측 전력', href: '/tools/care-plan' },
                { title: '고장 해결하기', detail: '오류코드와 안전 행동', href: '#home-error-finder' },
                { title: '수리·교체하기', detail: '견적과 빠진 비용 확인', href: '/tools/repair-replace' },
              ].map((task) => <Link key={task.title} href={task.href} className="rounded-xl border border-orange-200 bg-white p-4 shadow-sm transition-colors hover:border-orange-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"><span className="block font-bold text-gray-900">{task.title}</span><span className="mt-1 block text-sm text-gray-600">{task.detail}</span></Link>)}
            </nav>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 py-8">
          <div id="home-error-finder" className="scroll-mt-20">
            <p className="mb-3 text-sm text-gray-600">{codeBrandCount}개 브랜드 · {directory.length}개 제품군 · 에러코드 {formatCodeCount(codeCount, displayCodeCount)}</p>
            <ErrorCodeFinder directory={directory} popular={popular} />
          </div>

          <section aria-labelledby="home-energy-heading" className="mb-12 border-y border-gray-200 py-6">
            <h2 id="home-energy-heading" className="text-xl font-bold text-gray-900">냉장고 전기사용량, 얼마나 차이 날까?</h2>
            <p className="mt-2 max-w-prose text-sm leading-relaxed text-gray-700">정확한 모델 두 개의 공단 신고값을 골라 월·연 사용량 차이를 확인하세요. 설치 공간과 수납 구성도 함께 살펴볼 수 있습니다.</p>
            <Link href="/compare#energy-compare" className="mt-3 inline-block text-sm font-semibold text-blue-700 underline underline-offset-4">냉장고 전기사용량 비교하기</Link>
          </section>

          <section aria-labelledby="home-install-heading" className="mb-12 scroll-mt-20">
            <h2 id="home-install-heading" className="text-xl font-bold text-gray-900">설치 전에 우리 집 공간을 확인하세요</h2>
            <p className="mt-2 max-w-prose text-sm leading-relaxed text-gray-700">집에서 잰 자리·문 앞 공간을 정확한 모델의 설명서 치수와 비교하고, 설치 상담에 필요한 질문을 챙기세요.</p>
            <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2"><Link href="/tools/fridge-fit" className="text-sm font-semibold text-blue-700 underline underline-offset-4">냉장고 4개 모델 설치 확인</Link><Link href="/tools/dishwasher-fit" className="text-sm font-semibold text-blue-700 underline underline-offset-4">식기세척기 2개 모델 설치 확인</Link></div>
          </section>

          {purifierTechnology && <section aria-labelledby="home-technology-heading" className="mb-12 border-t border-gray-200 pt-6">
            <h2 id="home-technology-heading" className="text-xl font-bold text-gray-900">가전 속 기술, 내가 관리할 곳은 어디일까?</h2>
            <p className="mt-2 max-w-prose text-sm leading-relaxed text-gray-700">필터와 물통부터 연결·충전 조건까지, 제품의 기능과 직접 챙길 관리를 함께 확인하세요.</p>
            <Link href={purifierTechnologyHref(purifierTechnology)} className="mt-3 inline-block text-sm font-semibold text-blue-700 underline underline-offset-4">얼음정수기 기술·관리 지도 보기</Link>
            <ul className="mt-3 space-y-3">
              {APPLIANCE_TECHNOLOGY_GUIDES.slice(0, 3).map((guide) => <li key={guide.modelNumber}><Link href={technologyGuideHref(guide)} className="text-sm font-semibold text-blue-700 underline underline-offset-4">{guide.title} 기술·관리 지도 보기</Link><span className="ml-2 inline-block text-xs text-gray-600">{guide.modelNumber}</span></li>)}
            </ul>
            <details className="mt-5 text-sm leading-relaxed">
              <summary className="min-h-11 cursor-pointer py-2 font-semibold text-gray-900 focus-visible:outline-2 focus-visible:outline-blue-700">다른 {APPLIANCE_TECHNOLOGY_GUIDES.length - 3}개 제품의 기술·관리 지도 찾기</summary>
              <ul className="mt-3 grid gap-4 sm:grid-cols-2">
                {APPLIANCE_TECHNOLOGY_GUIDES.slice(3).map((guide) => <li key={guide.modelNumber}><Link href={technologyGuideHref(guide)} className="font-semibold text-blue-700 underline underline-offset-4">{guide.title}</Link><span className="mt-1 block break-all text-xs text-gray-600">{guide.modelNumber}</span></li>)}
              </ul>
            </details>
          </section>}

          <section aria-labelledby="home-care-plan-heading" className="mb-12 border-t border-gray-200 pt-6">
            <h2 id="home-care-plan-heading" className="text-xl font-bold text-gray-900">관리할 날짜를 달력에 남기고 싶다면?</h2>
            <p className="mt-2 max-w-prose text-sm leading-relaxed text-gray-700">제품과 관리 항목을 골라 다음 확인일을 정하세요. 설명서에 날짜 주기가 있는 항목은 마지막 관리일로 계산하고, 나머지는 직접 날짜를 고를 수 있습니다.</p>
            <Link href={carePlanHref()} className="mt-3 inline-block text-sm font-semibold text-blue-700 underline underline-offset-4">가전 관리 일정표 만들기</Link>
            <Link href="/tools/household-care" className="ml-5 mt-3 inline-block text-sm font-semibold text-blue-700 underline underline-offset-4">여러 가전의 관리 목록 만들기</Link>
          </section>

          <section aria-labelledby="home-energy-record-heading" className="mb-12 border-t border-gray-200 pt-6">
            <h2 id="home-energy-record-heading" className="text-xl font-bold text-gray-900">우리 집에서 실제로 쓴 전기는?</h2>
            <p className="mt-2 max-w-prose text-sm leading-relaxed text-gray-700">기기별로 측정한 누적 kWh와 기간을 입력해 30일 사용량을 확인하세요. 냉장고 네 모델은 공식 신고값도 함께 볼 수 있습니다.</p>
            <Link href="/tools/home-energy" className="mt-3 inline-block text-sm font-semibold text-blue-700 underline underline-offset-4">우리 집 전력 기록하기</Link>
          </section>

          <section aria-labelledby="home-repair-heading" className="mb-12 border-t border-gray-200 pt-6">
            <h2 id="home-repair-heading" className="text-xl font-bold text-gray-900">수리 견적을 받았는데, 교체가 나을까?</h2>
            <p className="mt-2 max-w-prose text-sm leading-relaxed text-gray-700">받은 견적과 새 제품 가격을 적고, 비용에 빠진 항목과 보증·진단 질문을 확인하세요.</p>
            <Link href="/tools/repair-replace" className="mt-3 inline-block text-sm font-semibold text-blue-700 underline underline-offset-4">수리·교체 비교표 만들기</Link>
          </section>

          {/* 최근 글 — 제품 목록보다 먼저 놓는다.
              이 사이트에서 판단이 담긴 자리는 카탈로그가 아니라 이쪽이다. */}
          {posts.length > 0 && (
            <section aria-labelledby="recent-posts" className="mb-12">
              <div className="flex items-baseline justify-between mb-4">
                {/* 글이 전부 비교는 아니다 — 18편 중 7편은 라벨 숫자·점검 코드를 푸는 해설·가이드다
                    (2026-10-08, kind 기준 비교 11·해설 6·가이드 1). 그래서 '나란히 놓고'라고 쓰지 않는다. */}
                <h2 id="recent-posts" className="text-xl font-bold text-gray-900">
                  제품과 숫자를 따져 본 글
                </h2>
                <Link href="/blog" className="text-sm text-blue-600 hover:underline">
                  전체 보기 →
                </Link>
              </div>
              <ul className="grid gap-4 sm:grid-cols-2">
                {posts.map((p) => (
                  <li key={p.slug}>
                    <Link
                      href={`/blog/${p.slug}`}
                      className="block h-full rounded-2xl border p-5 transition-colors hover:border-blue-300"
                    >
                      <div className="mb-2 flex flex-wrap items-center gap-2 text-xs">
                        <span className="rounded-full bg-blue-50 px-2.5 py-0.5 font-semibold text-blue-700">
                          {p.kind}
                        </span>
                        <span className="text-gray-400">
                          최종 검수 <time dateTime={p.updatedAt}>{p.updatedAt}</time>
                        </span>
                      </div>
                      <p className="mb-1.5 font-bold leading-snug text-gray-900">{p.title}</p>
                      <p className="text-sm leading-relaxed text-gray-600">{p.question}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* 카테고리 필터 + 제품 그리드. 고르는 법 세 줄은 제품 목록에 대한 안내라 여기 붙인다 */}
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            제품 스펙 비교 <span className="text-sm font-normal text-gray-400">{categories.length}개 카테고리 · {appliances.length}개 제품 · {brandCount}개 브랜드</span>
          </h2>
          <div className="grid sm:grid-cols-3 gap-6 mb-10 text-sm text-gray-600">
            {/* 세 줄 모두 예전엔 근거 없는 단정이었다(2026-10-08 교정).
                - "등급 한 칸 차이가 여름 전기요금에서 실제 금액으로 드러난다": 사이트는 요금을
                  계산하지 않고(/methodology 3절), 등급이 같아도 라벨 kWh는 모델마다 다르다.
                - "평수별 추천을 함께 확인": 추천 평수 칩은 근거가 제품마다 달라 고르는 기준으로
                  권할 수 없다. 표시 면적(㎡)이 제조사 시험값이다.
                - "수시로 바뀝니다": 카드에 이미 조사일이 붙어 있어 반복이다. */}
            {/* 2026-10-09 4차: 유보 표현 밀도가 사이트 최고(1천 자당 2.40)라는 지적 — 세 줄은 판단만 말하고,
                조건·한계는 아래 한 줄에 묶었다(카드의 '가격 미확인'은 데이터 표시라 그대로 둔다). */}
            <div>
              <p className="font-semibold text-gray-900 mb-1">에너지등급으로</p>
              <p>
                등급은 같은 품목 안에서만 견주고, 요금은 라벨의 소비전력량(kWh)을 같은 단위로 맞춰
                따집니다.
              </p>
            </div>
            <div>
              <p className="font-semibold text-gray-900 mb-1">면적으로</p>
              <p>
                에어컨·공기청정기는 평형 이름 대신 제품 상세의 표시 면적(㎡)을 실제 방 면적과
                맞춥니다. 6평형 에어컨의 18.7㎡는 약 5.7평입니다.
              </p>
            </div>
            <div>
              <p className="font-semibold text-gray-900 mb-1">가격으로</p>
              <p>카드의 가격은 옆에 적힌 날짜에 가격비교 DB나 제조사 공식몰에서 확인한 값입니다.</p>
            </div>
          </div>
          <p className="-mt-6 mb-10 text-xs text-gray-500">
            표시 면적과 라벨 kWh는 시험 조건의 값이라 창·단열·천장 높이·사용 시간이 다르면 실제와
            차이가 나고, 일시불 판매가를 확인하지 못한 제품은 카드에 &lsquo;가격 미확인&rsquo;으로 둡니다.
          </p>

          <CategoryFilterGrid appliances={appliances} categories={categories} />
        </section>
    </>
  );
}
