import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  getErrorCodeBrands,
  getBrandErrorCodes,
  errorCodeCategorySectionId,
  countDisplayCodes,
  formatCodeCount,
} from '@/lib/error-codes';
import { SITE_URL, BRAND_LABELS } from '@/lib/constants';

import { buildOpenGraph } from '@/lib/metadata';
import { AdSenseScript } from '@/components/adsense-script';
import { ErrorCodeEvidenceSection } from '@/components/error-codes/evidence-section';
import { getErrorCodeEditorial } from '@/lib/data/editorial/error-code-editorial';
import { getErrorCodeCategoryNote } from '@/lib/data/error-codes/category-notes';
import { getErrorCodeDetailPage } from '@/lib/data/error-codes/detail-pages';
import { isErrorCodeHubIndexable } from '@/lib/content-quality';
import {
  getEntryActionGuides,
  getEntryNoCard,
  getHubActionGuides,
  getHubNoCardCodes,
} from '@/lib/data/error-codes/action-guides';
import { ActionGuidesSection } from '@/components/error-codes/action-guides-section';
import { CodeActionGuide, CodeNoCardNote } from '@/components/error-codes/code-action';

type Props = {
  params: Promise<{ brand: string }>;
};

const SEVERITY_STYLES: Record<string, string> = {
  low: 'bg-green-50 text-green-800 border-green-200',
  medium: 'bg-yellow-50 text-yellow-800 border-yellow-200',
  high: 'bg-red-50 text-red-800 border-red-200',
};
const SEVERITY_LABELS: Record<string, string> = {
  low: '경미',
  medium: '주의',
  high: '긴급',
};

export function generateStaticParams() {
  return getErrorCodeBrands().map((brand) => ({ brand }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { brand } = await params;
  const groups = getBrandErrorCodes(brand);
  if (groups.length === 0) return { title: '에러코드를 찾을 수 없습니다' };

  const brandLabel = BRAND_LABELS[brand] || brand;
  const total = groups.reduce((s, g) => s + g.entries.length, 0);
  const cats = groups.map((g) => g.category).join('·');

  // 제목에 제품군을 넣는다.
  //
  // 2026-09-16 네이버 실적: /error-codes/Winix 가 노출 111에 클릭 0이었다. 제목이
  // "위닉스 에러코드 전체"인데 실제로 실린 것은 제습기 6개뿐이고, 위닉스 주력은
  // 공기청정기다. 찾아온 사람이 스니펫에서 자기 제품이 아님을 보고 지나간 셈이다.
  // "전체"는 다섯 카테고리를 덮는 삼성에는 맞지만 한 카테고리뿐인 브랜드에는 과장이다.
  //
  // 검색어 쪽에서도 같은 방향을 가리킨다 — "sk매직 식기세척기 e4", "쿠쿠 식기세척기
  // e4에러"처럼 질의가 대부분 '브랜드 + 제품군 + 코드' 형태다. 제품군이 제목에 있으면
  // 그 질의와 글자가 겹친다.
  const title =
    groups.length <= 2
      ? `${brandLabel} ${cats} 에러코드 — 원인·해결법`
      : `${brandLabel} 에러코드 전체 — 원인·해결법`;

  // 설명에는 실제 코드를 앞에 깐다. 사람들은 코드 하나를 들고 검색하므로,
  // 스니펫에 그 글자가 보이는 것이 "자가진단 해결법" 같은 총론보다 낫다.
  // 2026-10-29 8단계: 같은 글자가 제품군별 항목으로 두 번 실리면(귀뚜라미 10) 스니펫에 '10·10'이 찍혔고,
  // 항목 안의 ' / '와 항목 사이의 '·'가 섞여 경계가 안 보였다. 같은 코드는 한 번만, 항목 사이는 쉼표로 쓴다.
  const codeList = [...new Set(groups.flatMap((g) => g.entries.map((e) => e.code)))]
    .slice(0, 8)
    .join(', ');
  // 2026-10-11(P8): '01 / 02 / 03'을 한 항목으로 묶는 브랜드는 항목 수와 코드 수가 다르다
  const countLabel = formatCodeCount(total, countDisplayCodes(groups.flatMap((g) => g.entries)));
  const description =
    `${brandLabel} ${cats} 에러코드 ${countLabel} — ${codeList}${total > 8 ? ' 등' : ''}의 ` +
    `원인과 해결법. 서비스센터에 연락하기 전에 먼저 확인하세요.`;
  const url = `/error-codes/${brand}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: buildOpenGraph({ title, description, url }),
    ...(isErrorCodeHubIndexable({ entryCount: total }) ? {} : { robots: { index: false, follow: true } }),
  };
}

export default async function BrandErrorCodesPage({ params }: Props) {
  const { brand } = await params;
  const groups = getBrandErrorCodes(brand);
  if (groups.length === 0) notFound();

  const brandLabel = BRAND_LABELS[brand] || brand;
  const total = groups.reduce((s, g) => s + g.entries.length, 0);
  const countLabel = formatCodeCount(total, countDisplayCodes(groups.flatMap((g) => g.entries)));
  const editorial = getErrorCodeEditorial(brand);
  const contact = editorial?.contact;
  const actionGuides = getHubActionGuides(brand);
  const noCardCodes = getHubNoCardCodes(brand);

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '홈', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: '에러코드', item: `${SITE_URL}/error-codes` },
      {
        '@type': 'ListItem',
        position: 3,
        name: brandLabel,
        item: `${SITE_URL}/error-codes/${brand}`,
      },
    ],
  };

  return (
    <>
      {isErrorCodeHubIndexable({ entryCount: total }) && <AdSenseScript />}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, '\\u003c'),
        }}
      />

      <section className="bg-gradient-to-b from-orange-50 to-white py-12">
        <div className="max-w-4xl mx-auto px-4">
          <nav className="text-sm text-gray-500 mb-3">
            <Link href="/" className="hover:text-gray-900">
              홈
            </Link>
            <span className="mx-1.5">/</span>
            <Link href="/error-codes" className="hover:text-gray-900">
              에러코드
            </Link>
            <span className="mx-1.5">/</span>
            <span className="text-gray-900">{brandLabel}</span>
          </nav>
          {/* 제목도 제품군을 밝힌다 — 근거는 generateMetadata의 주석 참조 */}
          <h1 className="text-3xl font-bold text-gray-900">
            {groups.length <= 2
              ? `${brandLabel} ${groups.map((g) => g.category).join('·')} 에러코드`
              : `${brandLabel} 에러코드`}
          </h1>
          <p className="text-gray-600 mt-2">
            {groups.length === 1 ? (
              <>
                {/* 2026-10-09 4차: '이 브랜드의 다른 제품군은 아직 다루지 않습니다'는 정보가 없어 뺐다 */}
                {brandLabel} {groups[0].category} 에러코드 {countLabel}의 뜻과 확인 순서를 정확한 모델
                설명서나 제조사 공식 안내와 대조해 정리했습니다.
              </>
            ) : (
              <>
                {brandLabel} 에러코드 {countLabel}의 뜻과 확인 순서를 정확한 모델 설명서나 제조사 공식
                안내와 대조해 정리했습니다. 같은 코드라도 제품 종류에 따라 의미가 다르므로 종류별로
                나눠 정리했습니다.
              </>
            )}
          </p>
          {/* 접수 준비 — 제조사 설명서(예: 삼성 DV17A9720BV 뒤표지)가 접수 때 요구하는 정보와
              각 상세 안내(쿠쿠 E4·SK매직 E4·하이얼 F25)의 기록 항목을 브랜드 공통으로 묶었다 */}
          <p className="mt-3 text-sm text-gray-600">
            서비스를 접수하기 전에 제품 명판의 모델명 전체(용량 표기만으로는 부족합니다), 화면에 뜬
            글자 그대로와 사진, 표시가 뜬 시점(작동 직후·진행 중·특정 날씨), 이미 해 본 조치를 적어
            두세요.
            {/* 2026-10-09 4차: 공통 안전 문장(누수·타는 냄새·가스)은 품목마다 맞지 않았다 — 식기세척기·로봇청소기
                허브에도 가스 안내가 붙었다. 품목별 문구(category-notes.ts, 근거는 그 파일 주석)를 각 절 위에 둔다. */}
          </p>

          {/* 2026-10-11(페르소나 평가): 새벽·저녁에 지금 전화가 되는지 알 수 없었다.
              운영시간은 공식 사이트에서 확인한 브랜드에만 싣는다(error-code-editorial.ts contact). */}
          {contact && (
            <p className="mt-3 text-sm text-gray-700">
              <span className="font-semibold">{brandLabel} 고객센터</span>{' '}
              <a href={`tel:${contact.phone.replace(/-/g, '')}`} className="font-semibold text-blue-700 hover:underline">
                {contact.phone}
              </a>
              {contact.hours && <> · {contact.hours}</>}
              {contact.note && <> · {contact.note}</>}{' '}
              <a href={contact.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:underline">
                (공식 표기, {contact.checkedAt} 확인)
              </a>
            </p>
          )}

          {(actionGuides.length > 0 || noCardCodes.length > 0) && (
            <a href="#service-record" className="mt-4 inline-block text-sm font-semibold text-blue-700 underline underline-offset-4">코드별 다음 행동 바로가기</a>
          )}

          {/* 코드 바로가기 — 카드마다 앵커 id가 있다. 휴대폰에서 원하는 코드까지 내려가지 않아도 되게 한다 */}
          <nav aria-label="코드 바로가기" className="mt-5 space-y-2">
            {groups.map((g) => (
              <div key={g.category} className="flex flex-wrap items-center gap-1.5">
                <a
                  href={`#${errorCodeCategorySectionId(g.category)}`}
                  className="mr-1 text-sm font-semibold text-gray-700 hover:text-blue-600"
                >
                  {g.category}
                </a>
                {g.entries.map((e) => (
                  <a
                    key={e.anchorId}
                    href={`#${e.anchorId}`}
                    className="rounded-full border bg-white px-2.5 py-1 font-mono text-xs text-gray-700 hover:border-blue-300 hover:text-blue-600 transition-colors"
                  >
                    {e.code}
                  </a>
                ))}
              </div>
            ))}
          </nav>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-12">
        {groups.map((g) => (
          <section key={g.category} id={errorCodeCategorySectionId(g.category)} className="scroll-mt-24">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {brandLabel} {g.category} 에러코드
            </h2>
            {getErrorCodeCategoryNote(g.category, brand) && (
              <p className="mb-4 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900 leading-relaxed">
                {getErrorCodeCategoryNote(g.category, brand)}
              </p>
            )}

            <div className="space-y-3">
              {g.entries.map((e) => (
                <div
                  key={e.anchorId}
                  id={e.anchorId}
                  className={`scroll-mt-24 border rounded-xl p-5 ${SEVERITY_STYLES[e.severity] || ''}`}
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <h3 className="font-mono font-bold text-lg">{e.code}</h3>
                    <span className="text-xs px-2 py-1 rounded-full border font-medium shrink-0">
                      {SEVERITY_LABELS[e.severity] || e.severity}
                    </span>
                  </div>

                  <p className="font-medium mb-2">{e.description}</p>
                  <div className="space-y-1 text-sm">
                    <p>
                      <span className="font-medium">원인:</span> {e.cause}
                    </p>
                    <p>
                      <span className="font-medium">해결:</span> {e.solution}
                    </p>
                  </div>

                  {/* 공식 원문의 확인 순서 — 카드 하나에서 절차를 끝낼 수 있게 한다(standalone.ts steps) */}
                  {e.steps && e.steps.length > 0 && (
                    <ol className="mt-3 list-decimal space-y-1 pl-5 text-sm">
                      {e.steps.map((step) => (
                        <li key={step}>{step}</li>
                      ))}
                    </ol>
                  )}

                  {e.links && e.links.length > 0 && (
                    <ul className="mt-3 space-y-1 text-sm">
                      {e.links.map((l) => (
                        <li key={l.href}>
                          {l.href.startsWith('#') ? (
                            <a href={l.href} className="text-blue-700 hover:underline">
                              {l.label} ↓
                            </a>
                          ) : (
                            <a href={l.href} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline">
                              {l.label} (새 창)
                            </a>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}

                  {(() => {
                    const detail = getErrorCodeDetailPage(brand, g.category, e.code);
                    return detail ? (
                      <Link
                        href={detail.href}
                        className="mt-4 inline-block text-sm font-semibold text-blue-700 hover:underline"
                      >
                        {detail.label}
                      </Link>
                    ) : null;
                  })()}

                  {/* 카탈로그 제품이 있으면 상세로 링크하고, 제품 없이 실린 코드(보일러 등)는
                      공식 문서에서 확인한 제품군 이름을 밝힌다. 링크할 곳이 없다고 출처를
                      비워 두면 "어느 모델 이야기인지"를 알 수 없다 — SK매직에서 같은 문자가
                      계열마다 다른 뜻이던 일을 겪었다. */}
                  {e.products.length > 0 ? (
                    <p className="mt-3 text-sm">
                      <span className="text-gray-600">이 코드가 표시되는 제품: </span>
                      {e.products.map((p, i) => (
                        <span key={p.slug}>
                          {i > 0 && <span className="text-gray-400"> · </span>}
                          <Link href={`/products/${p.slug}`} className="text-blue-600 hover:underline">
                            {p.name}
                          </Link>
                        </span>
                      ))}
                    </p>
                  ) : e.productLines?.length ? (
                    <p className="mt-3 text-sm text-gray-600">
                      <span>확인된 제품군: </span>
                      {e.productLines.join(' · ')}
                    </p>
                  ) : null}

                  {/* 2026-10-29: 코드를 찾은 자리에서 다음 행동을 본다 — 원문 대조 카드 또는 「카드 없음」 안내 */}
                  {getEntryActionGuides(brand, g.category, e).map((guide) => (
                    <CodeActionGuide key={guide.id} guide={guide} />
                  ))}
                  {(() => {
                    const noCard = getEntryNoCard(brand, g.category, e);
                    return noCard ? <CodeNoCardNote item={noCard} /> : null;
                  })()}
                </div>
              ))}
            </div>
          </section>
        ))}

        <ActionGuidesSection guides={actionGuides} noCard={noCardCodes} />

        <ErrorCodeEvidenceSection brandLabel={brandLabel} meta={editorial} />

        <div className="border-t pt-6 mt-12">
          <Link href="/error-codes" className="text-sm text-blue-600 hover:underline">
            ← 전체 에러코드 목록
          </Link>
        </div>
      </div>
    </>
  );
}
