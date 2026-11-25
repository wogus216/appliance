import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { allBlogPosts, getBlogPost } from '@/lib/data/blog';
import { isPostIndexable } from '@/lib/blog';
import { SITE_AUTHOR, SITE_NAME, SITE_URL } from '@/lib/constants';
import { buildOpenGraph } from '@/lib/metadata';
import { JsonLd, BreadcrumbJsonLd } from '@/components/jsonld';
import { AdSenseScript } from '@/components/adsense-script';
import { EditorialMetaSection } from '@/components/detail/editorial-meta-section';
import { BlogComparisonTable } from '@/components/blog/comparison-table';
import { GuideVisualSummary } from '@/components/blog/guide-visual-summary';
import { DecisionRules } from '@/components/blog/decision-rules';
import { AuthorName } from '@/components/author-name';
import { lastRevisionFor, resolveLastModified } from '@/lib/data/site-revisions';

import { PUBLISHED_BLOG_SLUGS } from '@/lib/site-scope';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return allBlogPosts.filter((post) => PUBLISHED_BLOG_SLUGS.has(post.slug)).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post || !PUBLISHED_BLOG_SLUGS.has(post.slug)) return { title: '글을 찾을 수 없습니다' };

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
  if (!post || !PUBLISHED_BLOG_SLUGS.has(post.slug)) notFound();

  const revision = lastRevisionFor(`/blog/${post.slug}`);
  // 전체 블로그 개편이 새 글 작성일보다 앞섰다면 이 글의 편집 이력으로 표시하지 않는다.
  const contentChangedAt = revision && revision >= post.publishedAt ? revision : undefined;

  return (
    <>
      {post.slug === 'samsung-washer-check-codes' && <AdSenseScript />}
      <BreadcrumbJsonLd
        items={[{ name: '홈', path: '/' }, { name: '점검 안내', path: '/blog' }, { name: post.title }]}
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
            점검 안내
          </Link>
        </nav>

        <header className="mb-8">
          <h1 className="break-keep text-3xl font-bold leading-snug text-gray-900 md:text-4xl">{post.title}</h1>
          <p className="mt-4 text-lg leading-relaxed text-gray-600">{post.question}</p>
          <p className="mt-4 text-xs text-gray-400">
            본문 검수 <time dateTime={post.updatedAt}>{post.updatedAt}</time>{contentChangedAt && <> · 문서 편집 <time dateTime={contentChangedAt}>{contentChangedAt}</time></>} · <AuthorName name={post.reviewedBy} />
          </p>
        </header>

        {post.visualSummary && <GuideVisualSummary summary={post.visualSummary} />}

        {post.sections.length > 0 && (
          <nav aria-label="본문 바로가기" className="mb-10 border-y border-gray-200 py-4">
            <p className="font-semibold text-gray-900">본문 바로가기</p>
            <ul className="mt-2 space-y-1 text-sm">
              {post.sections.map((section, index) => (
                <li key={index}>
                  <a href={`#section-${index}`} className="inline-flex min-h-8 items-center py-1 text-blue-700 underline underline-offset-4">{section.heading}</a>
                </li>
              ))}
            </ul>
          </nav>
        )}

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
              <h2 id={`section-${i}`} className="mb-4 scroll-mt-24 text-2xl font-bold text-gray-900">
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

          <p className="border-t pt-6 text-sm text-gray-500">
            {SITE_NAME}의 점검 안내는{' '}
            <Link href="/blog" className="text-blue-600 hover:underline">
              점검 안내 목록
            </Link>
            에서 볼 수 있습니다.
          </p>
        </div>
      </article>
    </>
  );
}
