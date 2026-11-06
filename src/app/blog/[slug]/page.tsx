import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { allBlogPosts, getBlogPost } from '@/lib/data/blog';
import { getApplianceBySlug, toCardAppliance } from '@/lib/data/appliances';
import { isPostIndexable } from '@/lib/blog';
import { CATEGORY_LABELS, SITE_AUTHOR, SITE_NAME, SITE_URL } from '@/lib/constants';
import { buildOpenGraph } from '@/lib/metadata';
import { JsonLd, BreadcrumbJsonLd } from '@/components/jsonld';
import { AdSenseScript } from '@/components/adsense-script';
import { ApplianceCard } from '@/components/appliance-card';
import { EditorialMetaSection } from '@/components/detail/editorial-meta-section';
import { BlogComparisonTable } from '@/components/blog/comparison-table';
import { GuideVisualSummary } from '@/components/blog/guide-visual-summary';
import { DecisionRules } from '@/components/blog/decision-rules';
import { AuthorName } from '@/components/author-name';
import { getCategoryGuide } from '@/lib/data/category-guides';
import { getCategorySlug } from '@/lib/category-config';
import { lastRevisionFor, resolveLastModified } from '@/lib/data/site-revisions';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return allBlogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return { title: '글을 찾을 수 없습니다' };

  const url = `/blog/${post.slug}`;
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: url },
    openGraph: buildOpenGraph({ title: post.title, description: post.description, url }),
    // 판정은 사이트맵과 같은 함수(isPostIndexable)를 쓴다.
    ...(isPostIndexable(post) ? {} : { robots: { index: false, follow: true } }),
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const showAds = isPostIndexable(post);
  const revision = lastRevisionFor(`/blog/${post.slug}`);
  // 전체 블로그 개편이 새 글 작성일보다 앞섰다면 이 글의 편집 이력으로 표시하지 않는다.
  const contentChangedAt = revision && revision >= post.publishedAt ? revision : undefined;
  const products = post.productSlugs
    .map((s) => getApplianceBySlug(s))
    .filter((a): a is NonNullable<typeof a> => !!a);
  // 2026-10-11 5차(p2-aircon 요청): 블로그에서 그 제품군의 구매 가이드(허브 FAQ 포함)로 갈 길이 없었다 —
  // 이동 경로가 '홈 › 블로그'뿐이었다(P3). 다룬 제품의 카테고리 중 가이드가 있는 것만 잇는다.
  const guideLinks = [...new Set(products.map((a) => a.category))]
    .filter((c) => !!getCategoryGuide(c))
    .map((c) => ({ href: `/category/${getCategorySlug(c)}`, label: CATEGORY_LABELS[c] || c }));
  const isPurifierContract = post.slug === 'water-purifier-contract-dates';
  const isPurifierComparison = post.slug === 'water-purifier-lg-vs-coway-vs-skmagic';

  return (
    <>
      {showAds && <AdSenseScript />}
      <BreadcrumbJsonLd
        items={[{ name: '홈', path: '/' }, { name: '블로그', path: '/blog' }, { name: post.title }]}
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: post.title,
          description: post.description,
          inLanguage: 'ko',
          datePublished: post.publishedAt,
          dateModified: resolveLastModified(`/blog/${post.slug}`, post.updatedAt),
          // 소개 페이지가 밝힌 대로 글을 쓰는 것은 필명 운영자 한 사람이다 — 단체가 아니라 사람으로 표기한다.
          author: {
            '@type': 'Person',
            name: post.reviewedBy,
            ...(post.reviewedBy === SITE_AUTHOR ? { url: `${SITE_URL}/about#operator` } : {}),
          },
          publisher: { '@id': `${SITE_URL}/#organization` },
          mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
          // 인용한 자료를 스키마에도 남긴다 — 화면과 기계가 같은 출처를 본다.
          citation: post.sources.map((s) => s.url),
        }}
      />
      {post.faqs.length > 0 && (
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: post.faqs.map((f) => ({
              '@type': 'Question',
              name: f.question,
              acceptedAnswer: { '@type': 'Answer', text: f.answer },
            })),
          }}
        />
      )}

      <article id="article-start" className="mx-auto max-w-3xl scroll-mt-24 px-4 py-10">
        <nav aria-label="브레드크럼" className="mb-4 text-sm text-gray-500">
          <Link href="/" className="hover:text-gray-900">
            홈
          </Link>
          <span className="mx-2" aria-hidden>
            ›
          </span>
          <Link href="/blog" className="hover:text-gray-900">
            블로그
          </Link>
        </nav>

        <header className="mb-8">
          <p className="mb-3 inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
            {post.kind}
          </p>
          <h1 className="break-keep text-3xl font-bold leading-snug text-gray-900 md:text-4xl">{post.title}</h1>
          <p className="mt-4 text-lg leading-relaxed text-gray-600">{post.question}</p>
          <p className="mt-4 text-xs text-gray-400">
            본문 검수 <time dateTime={post.updatedAt}>{post.updatedAt}</time>{contentChangedAt && <> · 문서 편집 <time dateTime={contentChangedAt}>{contentChangedAt}</time></>} · <AuthorName name={post.reviewedBy} />
          </p>
        </header>

        {post.visualSummary && <GuideVisualSummary summary={post.visualSummary} />}

        <div id="guide-detail" className="scroll-mt-24 space-y-14">
          {/* 결론을 먼저 놓는다. 스크롤을 내려야 답이 나오는 글은 읽는 사람 시간을 뺏는다. */}
          <section aria-labelledby="answer-heading" id="answer" className="scroll-mt-32">
            <h2 id="answer-heading" className="mb-4 text-2xl font-bold text-gray-900">
              {post.visualSummary ? '설명과 적용 범위' : '결론부터'}
            </h2>
            <div className="space-y-4 rounded-xl bg-gray-50 p-5">
              {post.answer.map((p, i) => (
                <p key={i} className="leading-relaxed text-gray-800">
                  {p}
                </p>
              ))}
            </div>
          </section>

          {post.comparison && <BlogComparisonTable table={post.comparison} />}

          {post.sections.map((s, i) => (
            <section key={i} aria-labelledby={`section-${i}`}>
              <h2 id={`section-${i}`} className="mb-4 text-2xl font-bold text-gray-900">
                {s.heading}
              </h2>
              <div className="space-y-4">
                {s.body.map((p, j) => (
                  <p key={j} className="leading-relaxed text-gray-700">
                    {p}
                  </p>
                ))}
              </div>
              {s.links && s.links.length > 0 && (
                <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-sm">
                  {s.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="inline-flex min-h-11 items-center font-semibold text-blue-700 underline underline-offset-4">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          <DecisionRules rules={post.decisionRules} />

          {(isPurifierContract || isPurifierComparison) && (
            <section aria-labelledby="purifier-next-heading">
              <h2 id="purifier-next-heading" className="mb-4 text-2xl font-bold text-gray-900">
                내 계약과 견적에 적용하기
              </h2>
              <div className="space-y-4 leading-relaxed text-gray-700">
                {isPurifierContract ? (
                  <p>아직 제품 후보를 고르지 않았다면 <Link href="/blog/water-purifier-lg-vs-coway-vs-skmagic" className="text-blue-700 underline underline-offset-4">정수기 3종의 기능·필터·설치 조건 비교</Link>에서 필요한 기능과 관리 방식을 먼저 좁히세요.</p>
                ) : (
                  <p>후보를 골랐다면 <Link href="/blog/water-purifier-contract-dates" className="text-blue-700 underline underline-offset-4">의무사용 36개월·소유권 60개월 계약 사례</Link>에서 반환과 계속 사용의 차이를 확인하세요. 과거 공식 조건과 가상 설치일로 설명한 사례입니다.</p>
                )}
                <p>본인 견적의 월요금·기간·필터 단가를 확인했다면 <Link href="/tools/water-purifier-cost" className="text-blue-700 underline underline-offset-4">정수기 렌탈·구매 비용 비교</Link>에 옮겨 보세요. 도구의 지원 모델과 계약을 확인하고, 금액을 모르는 항목은 미확인으로 남겨 두세요.</p>
              </div>
            </section>
          )}

          {post.faqs.length > 0 && (
            <section aria-labelledby="faq-heading" id="faq" className="scroll-mt-32">
              <h2 id="faq-heading" className="mb-5 text-2xl font-bold text-gray-900">
                자주 묻는 질문
              </h2>
              <div className="space-y-3">
                {post.faqs.map((f, i) => (
                  <details key={i} className="group rounded-xl border p-4">
                    <summary className="flex cursor-pointer list-none items-center justify-between font-medium text-gray-900">
                      {f.question}
                      <span
                        className="text-gray-400 transition-transform group-open:rotate-180"
                        aria-hidden
                      >
                        ⌄
                      </span>
                    </summary>
                    <p className="mt-3 leading-relaxed text-gray-700">{f.answer}</p>
                  </details>
                ))}
              </div>
            </section>
          )}

          {/* 제품 상세와 같은 블록을 쓴다 — 근거 표시가 화면마다 다르면 신뢰 신호가 아니다. */}
          <div id="sources" className="scroll-mt-32">
            <EditorialMetaSection
              contentChangedAt={contentChangedAt}
              meta={{
                sources: post.sources,
                publishedAt: post.publishedAt,
                updatedAt: post.updatedAt,
                reviewedBy: post.reviewedBy,
                priceCheckedAt: post.priceCheckedAt,
              }}
            />
          </div>

          {products.length > 0 && (
            <section aria-labelledby="products-heading">
              <h2 id="products-heading" className="mb-4 text-xl font-bold text-gray-900">
                이 글에서 다룬 제품
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {products.map((a) => (
                  <ApplianceCard key={a.id} appliance={toCardAppliance(a)} />
                ))}
              </div>
              {guideLinks.length > 0 && (
                <p className="mt-4 text-sm text-gray-600">
                  제품군을 고르는 기준은{' '}
                  {guideLinks.map((g, i) => (
                    <span key={g.href}>
                      {i > 0 && '·'}
                      <Link href={g.href} className="text-blue-600 hover:underline">
                        {g.label} 가이드
                      </Link>
                    </span>
                  ))}
                  에 정리했습니다.
                </p>
              )}
            </section>
          )}

          <p className="border-t pt-6 text-sm text-gray-500">
            {SITE_NAME}의 다른 글은{' '}
            <Link href="/blog" className="text-blue-600 hover:underline">
              블로그 목록
            </Link>
            에서 볼 수 있습니다.
          </p>
        </div>
      </article>
    </>
  );
}
