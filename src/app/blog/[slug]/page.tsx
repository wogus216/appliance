import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { allBlogPosts, getBlogPost } from '@/lib/data/blog';
import { getApplianceBySlug } from '@/lib/data/appliances';
import { isPostIndexable } from '@/lib/blog';
import { SITE_NAME, SITE_URL } from '@/lib/constants';
import { buildOpenGraph } from '@/lib/metadata';
import { JsonLd, BreadcrumbJsonLd } from '@/components/jsonld';
import { AdSenseScript } from '@/components/adsense-script';
import { ApplianceCard } from '@/components/appliance-card';
import { EditorialMetaSection } from '@/components/detail/editorial-meta-section';
import { BlogComparisonTable } from '@/components/blog/comparison-table';
import { DecisionRules } from '@/components/blog/decision-rules';

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
  const products = post.productSlugs
    .map((s) => getApplianceBySlug(s))
    .filter((a): a is NonNullable<typeof a> => !!a);

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
          dateModified: post.updatedAt,
          author: { '@type': 'Organization', name: post.reviewedBy },
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

      <article className="mx-auto max-w-3xl px-4 py-10">
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
          <h1 className="text-3xl font-bold leading-snug text-gray-900 md:text-4xl">{post.title}</h1>
          <p className="mt-4 text-lg leading-relaxed text-gray-600">{post.question}</p>
          <p className="mt-4 text-xs text-gray-400">
            최종 검수 <time dateTime={post.updatedAt}>{post.updatedAt}</time> · {post.reviewedBy}
          </p>
        </header>

        <div className="space-y-14">
          {/* 결론을 먼저 놓는다. 스크롤을 내려야 답이 나오는 글은 읽는 사람 시간을 뺏는다. */}
          <section aria-labelledby="answer-heading" id="answer" className="scroll-mt-32">
            <h2 id="answer-heading" className="mb-4 text-2xl font-bold text-gray-900">
              결론부터
            </h2>
            <div className="space-y-4 rounded-2xl border-l-4 border-blue-500 bg-blue-50/50 p-5">
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
                  <ApplianceCard key={a.id} appliance={a} />
                ))}
              </div>
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
