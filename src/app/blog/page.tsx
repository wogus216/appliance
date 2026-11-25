import type { Metadata } from 'next';
import Link from 'next/link';
import { getIndexableBlogPosts } from '@/lib/blog';
import { BreadcrumbJsonLd } from '@/components/jsonld';

export const metadata: Metadata = {
  title: '가전 점검 안내', description: '에러코드의 공통 안내와 정확한 모델 설명서의 적용 범위를 구분해 읽는 해설입니다.',
  alternates: { canonical: '/blog' },
};

export default function BlogIndexPage() {
  return <div className="mx-auto max-w-3xl px-4 py-10">
    <BreadcrumbJsonLd items={[{ name: '홈', path: '/' }, { name: '점검 안내' }]} />
    <h1 className="text-3xl font-bold text-gray-900">가전 점검 안내</h1>
    <p className="mt-4 leading-relaxed text-gray-700">아래 글에서 삼성 드럼세탁기의 급수·배수·탈수·도어·누수 표시를 확인하세요. 삼성 공용 코드표와 WF24A9500KE·WD25DB8995BZ 설명서를 함께 볼 수 있습니다.</p>
    <ul className="mt-8 divide-y divide-gray-200">{getIndexableBlogPosts().map((post) => <li key={post.slug} className="py-5">
      <Link href={`/blog/${post.slug}`} className="text-lg font-semibold text-blue-700 underline underline-offset-4">{post.title}</Link>
      <p className="mt-3 leading-relaxed text-gray-700">{post.description}</p>
      <p className="mt-2 text-sm text-gray-600">자료 확인일 <time dateTime={post.updatedAt}>{post.updatedAt}</time></p>
    </li>)}</ul>
    <p className="mt-8 border-t pt-6 leading-relaxed text-gray-700">다른 제품의 표시를 찾는다면 <Link href="/error-codes" className="text-blue-700 underline underline-offset-4">제품군·브랜드별 에러코드</Link>에서 적용 모델과 원문을 확인하세요.</p>
  </div>;
}
