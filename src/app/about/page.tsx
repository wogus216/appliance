import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_NAME, CONTACT_EMAIL, EDITOR_RATING_LABEL } from '@/lib/constants';
import { allAppliances, allCatalogAppliances, getAllCategories } from '@/lib/data/appliances';
import { allBlogPosts } from '@/lib/data/blog';
import { getAllCategoryGuides } from '@/lib/data/category-guides';
import { getCategorySlug } from '@/lib/category-config';
import { isProductIndexable } from '@/lib/content-quality';

export const metadata: Metadata = {
  title: '소개',
  description: `${SITE_NAME}은 가전제품의 스펙·가격·에너지효율·에러코드를 한눈에 비교·분석해 구매 판단을 돕는 정보 사이트입니다.`,
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  // 숫자를 손으로 적지 않는 이유: 카탈로그가 바뀌면 문장이 조용히 거짓이 된다.
  // 산문에 박아 둔 집계 숫자가 데이터와 어긋나는 사고를 이미 여러 번 냈다.
  const categories = getAllCategories();
  const published = allAppliances.length;
  const withheld = allCatalogAppliances.length - published;
  const indexed = allAppliances.filter(isProductIndexable).length;
  const guides = getAllCategoryGuides().length;
  const posts = allBlogPosts.length;

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{SITE_NAME} 소개</h1>
        <p className="mt-3 text-gray-600 leading-relaxed">
          {SITE_NAME}은 에어컨·제습기·세탁기·냉장고 등 생활가전을 스펙·가격·에너지효율·소음·에러코드
          기준으로 비교하고 분석해, 소비자가 자기 상황에 맞는 제품을 더 쉽게 고르도록 돕는 정보
          사이트입니다.
        </p>
      </div>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-gray-900">우리가 제공하는 것</h2>
        <ul className="list-disc pl-5 space-y-1.5 text-gray-700">
          <li>제품별 스펙·가격·에너지효율·소음 비교</li>
          <li>10년 총비용(TCO) 계산과 에너지등급이 전기요금에 미치는 영향</li>
          <li>브랜드·모델별 에러코드 원인과 자가진단·해결법</li>
          <li>여러 제품을 나란히 놓고 비교하는 비교 도구</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-gray-900">다루는 범위</h2>
        <p className="text-gray-700 leading-relaxed">
          현재 {categories.length}개 카테고리를 다룹니다. 카테고리마다 구매 가이드가 한 편씩
          붙어 있고({guides}편), 제품 두세 개를 실제로 맞붙여 고르는 기준을 쓴 비교 글이{' '}
          {posts}편 있습니다. 공개 중인 제품은 {published}개이며, 그중 {indexed}개가 검색 색인
          대상입니다.
        </p>
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <Link
              key={c}
              href={`/category/${getCategorySlug(c)}`}
              className="rounded-full border px-3 py-1 text-sm text-gray-700 hover:bg-gray-50"
            >
              {c}
            </Link>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-gray-900">제품 하나가 공개되기까지</h2>
        <p className="text-gray-700 leading-relaxed">
          이 사이트는 제품 정보를 모아서 옮겨 적는 곳이 아니라, <span className="font-semibold text-gray-900">
          근거를 확인하지 못한 값은 지우는 것</span>을 원칙으로 만듭니다. 순서는 이렇습니다.
        </p>
        <ol className="list-decimal pl-5 space-y-2 text-gray-700 leading-relaxed">
          <li>
            <span className="font-semibold text-gray-900">모델 번호부터 확인합니다.</span>{' '}
            제조사 공식 제품·지원 페이지나 대형 가격비교 DB에서 그 모델 번호가 실제로 존재하는지
            먼저 봅니다. 확인되지 않으면 그 제품은 공개하지 않습니다.
          </li>
          <li>
            <span className="font-semibold text-gray-900">수치는 출처와 함께 저장합니다.</span>{' '}
            가격·소비전력·소음·크기·무게는 제품별로 &lsquo;어느 URL에서 언제 확인했는지&rsquo;를
            같이 기록합니다. 기록이 없는 값은 화면에서 그 항목 자체를 감춥니다 — 빈칸으로 두거나
            추정치로 채우지 않습니다.
          </li>
          <li>
            <span className="font-semibold text-gray-900">분석을 씁니다.</span> 스펙 표만으로는
            고를 수 없는 부분(설치 조건, 유지비, 어떤 사람에게 안 맞는지)을 제품마다 따로 씁니다.
          </li>
          <li>
            <span className="font-semibold text-gray-900">색인 여부를 판정합니다.</span>{' '}
            서로 다른 발행처 두 곳 이상의 출처, 검수일, 사진, 고유한 분석을 모두 갖춘 페이지만
            검색에 내보냅니다. 기준은{' '}
            <Link href="/editorial-policy" className="text-blue-600 hover:underline">편집 원칙</Link>에
            적어 두었습니다.
          </li>
        </ol>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-gray-900">공개하지 않기로 한 것</h2>
        <ul className="list-disc pl-5 space-y-1.5 text-gray-700 leading-relaxed">
          <li>
            모델 번호를 확인하지 못한 제품 <span className="font-semibold text-gray-900">{withheld}개</span>는
            카탈로그에 있지만 공개하지 않습니다. 실재하지 않는 모델에 사양을 붙여 두는 것이
            정보가 적은 것보다 나쁘다고 봅니다.
          </li>
          <li>
            출처를 찾지 못한 월 전기요금·소음 수치는 전부 삭제했습니다. 그럴듯한 값을 채워 넣는
            대신 항목을 비웠습니다.
          </li>
          <li>
            개별 구매자 후기, 평균 별점, 추천 비율은 게시하지 않습니다.
          </li>
          <li>
            직접 분해하거나 계측기로 측정하지 않습니다. 이 사이트의 수치는 전부 제조사·공공기관·
            가격비교 DB가 공개한 값이며, 그 사실을 각 페이지에 출처로 밝힙니다.
          </li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-gray-900">데이터와 평가 방식 (투명성 고지)</h2>
        <div className="rounded-xl border bg-gray-50 p-5 text-sm text-gray-700 leading-relaxed space-y-2">
          <p>
            사이트에 나오는 <span className="font-semibold text-gray-900">모든 숫자 점수는{' '}
            {EDITOR_RATING_LABEL}</span>입니다. 편집팀이 공개된 스펙과 공개된 리뷰를 근거로 매긴
            값이며, 구매자가 남긴 별점이 아닙니다. 계산 방식은{' '}
            <Link href="/methodology" className="text-blue-600 hover:underline">평가 방법</Link>에
            공개해 두었습니다.
          </p>
          <p>
            <span className="font-semibold text-gray-900">개별 구매자 후기는 게시하지 않습니다.</span>{' '}
            구매자 평균 별점·추천 비율·별점 분포도 표시하지 않습니다. 확인 가능한 출처가 붙지
            않은 글을 구매자 후기로 보여 주지 않는다는 것이 이 사이트의 원칙입니다 (
            <Link href="/editorial-policy" className="text-blue-600 hover:underline">편집 원칙</Link>).
          </p>
          <p>
            <span className="font-semibold text-gray-900">가격·스펙·에러코드·고객센터 정보</span>는
            작성 시점 기준의 참고 정보로, 실제와 다르거나 변경될 수 있습니다. 구매·수리 전 반드시
            제조사·판매처의 최신 정보를 확인하세요.
          </p>
          <p>
            제품 이미지는 제조사·판매처가 공개한 제품 사진을 참고용으로 사용합니다.
          </p>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-gray-900">더 읽어볼 것</h2>
        <ul className="list-disc pl-5 space-y-1.5 text-gray-700">
          <li>
            <Link href="/editorial-policy" className="text-blue-600 hover:underline">편집 원칙</Link>
            {' '}— 누가 쓰는지, 출처를 어떻게 쓰는지, 후기를 어떻게 다루는지, 수정 요청 절차
          </li>
          <li>
            <Link href="/methodology" className="text-blue-600 hover:underline">평가 방법</Link>
            {' '}— {EDITOR_RATING_LABEL} 점수·가격·전기요금·10년 총비용 계산식
          </li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-gray-900">문의</h2>
        <p className="text-gray-700">
          정보 정정 요청, 제휴, 기타 문의는{' '}
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-blue-600 hover:underline">
            {CONTACT_EMAIL}
          </a>{' '}
          으로 보내주세요. 자세한 내용은{' '}
          <Link href="/contact" className="text-blue-600 hover:underline">문의 페이지</Link>를
          참고하세요.
        </p>
      </section>
    </div>
  );
}
