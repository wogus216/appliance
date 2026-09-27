import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_NAME, SITE_AUTHOR, CONTACT_EMAIL } from '@/lib/constants';
import { allAppliances, getAllCategories } from '@/lib/data/appliances';
import { allBlogPosts } from '@/lib/data/blog';
import { getAllCategoryGuides } from '@/lib/data/category-guides';
import { getCategorySlug } from '@/lib/category-config';
import { getErrorCodeDirectory } from '@/lib/error-codes';
import { CORRECTIONS, type Correction } from '@/lib/data/editorial/corrections';

export const metadata: Metadata = {
  title: '소개',
  description: `${SITE_NAME}은 가전 에러코드의 뜻과 직접 해볼 수 있는 조치를 제조사 설명서·서비스센터 자료와 대조해 정리하는 사이트입니다.`,
  alternates: { canonical: '/about' },
};

function CorrectionList({ items }: { items: Correction[] }) {
  return (
    <ul className="space-y-3">
      {items.map((c) => (
        <li key={`${c.subject}-${c.date}`} className="rounded-xl border p-4 text-sm leading-relaxed">
          <p className="font-semibold text-gray-900">
            <Link href={c.href} className="hover:text-blue-700 hover:underline">
              {c.subject}
            </Link>{' '}
            <time dateTime={c.date} className="font-normal text-gray-400">
              {c.date}
            </time>
          </p>
          <p className="mt-1 text-gray-600">
            <span className="text-gray-500">{c.kind === 'ours' ? '싣던 것' : '공식 문서'}</span> —{' '}
            {c.was}
          </p>
          <p className="mt-1 text-gray-800">
            <span className="text-gray-500">{c.kind === 'ours' ? '바로잡은 것' : '우리가 한 일'}</span> —{' '}
            {c.now}
          </p>
        </li>
      ))}
    </ul>
  );
}

export default function AboutPage() {
  // 숫자를 손으로 적지 않는 이유: 카탈로그가 바뀌면 문장이 조용히 거짓이 된다.
  // 산문에 박아 둔 집계 숫자가 데이터와 어긋나는 사고를 이미 여러 번 냈다.
  // 색인 대상 수·공개 보류 수 같은 운영 수치는 싣지 않는다 — 독자가 아니라 우리에게 필요한 숫자다.
  const categories = getAllCategories();
  const published = allAppliances.length;
  const guides = getAllCategoryGuides().length;
  const posts = allBlogPosts.length;
  const directory = getErrorCodeDirectory();
  const codeCount = directory.reduce((n, g) => n + g.codeCount, 0);
  const codeBrands = new Set(directory.flatMap((g) => g.brands.map((b) => b.brand))).size;
  const ours = CORRECTIONS.filter((c) => c.kind === 'ours');
  const maker = CORRECTIONS.filter((c) => c.kind === 'maker');

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{SITE_NAME} 소개</h1>
        <p className="mt-3 text-gray-600 leading-relaxed">
          {SITE_NAME}은 가전이 멈췄을 때 화면에 뜬 에러코드가 무슨 뜻인지, 서비스를 부르기 전에
          직접 해볼 수 있는 것과 손대지 말아야 할 것을 정리하는 사이트입니다. 제조사 설명서와
          서비스센터 자료를 코드마다 대조하고, 같은 글자가 모델 계열마다 다른 뜻일 때는 그 차이를
          나눠 적습니다. 가전을 고를 때 참고할 구매 가이드와 스펙 비교도 함께 둡니다.
        </p>
      </div>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-gray-900">누가 만드나</h2>
        <p className="text-gray-700 leading-relaxed">
          {SITE_NAME}은 필명 <span className="font-semibold text-gray-900">{SITE_AUTHOR}</span>로
          활동하는 운영자 한 사람이 만듭니다. 문서마다 아래쪽 &ldquo;이 글의 근거&rdquo;에 어떤
          자료와 대조했는지, 대조하지 못한 것은 무엇인지 적어 둡니다.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-gray-900">다루는 범위</h2>
        <ul className="list-disc pl-5 space-y-1.5 text-gray-700">
          <li>
            <Link href="/error-codes" className="text-blue-600 hover:underline">에러코드</Link>{' '}
            — {codeBrands}개 브랜드 · {directory.length}개 제품군 · {codeCount}개 코드의 뜻과 조치
          </li>
          <li>구매 가이드 {guides}편 — 카테고리마다 한 편</li>
          <li>제품 두세 개를 맞붙여 고르는 기준을 쓴 글 {posts}편</li>
          <li>공개 중인 제품 {published}개의 스펙·가격 비교</li>
        </ul>
        <p className="text-gray-700 leading-relaxed">
          다루는 가전 카테고리는 {categories.length}개입니다.
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
        </ol>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-gray-900">공식 자료와 대조해 바로잡은 것</h2>
        <p className="text-gray-700 leading-relaxed">
          틀린 에러코드 설명은 사람을 엉뚱한 곳으로 보냅니다. 코드를 제조사 자료와 하나씩
          대조하다 찾은 것을 그대로 남깁니다 — 우리가 틀리게 싣고 있던 것 {ours.length}건,
          제조사 문서에 문제가 있어 그대로 옮기지 않은 것 {maker.length}건입니다.
        </p>
        <h3 className="font-semibold text-gray-900 pt-1">우리가 틀리게 싣고 있던 것</h3>
        <CorrectionList items={ours} />
        <h3 className="font-semibold text-gray-900 pt-1">제조사 문서를 그대로 옮기지 않은 것</h3>
        <CorrectionList items={maker} />
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-gray-900">공개하지 않기로 한 것</h2>
        <ul className="list-disc pl-5 space-y-1.5 text-gray-700 leading-relaxed">
          <li>
            모델 번호를 확인하지 못한 제품은 공개하지 않습니다. 실재하지 않는 모델에 사양을 붙여
            두는 것이 정보가 적은 것보다 나쁘다고 봅니다.
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
        <h2 className="text-xl font-bold text-gray-900">데이터를 다루는 방식 (투명성 고지)</h2>
        <div className="rounded-xl border bg-gray-50 p-5 text-sm text-gray-700 leading-relaxed space-y-2">
          <p>
            <span className="font-semibold text-gray-900">제품에 점수나 별점을 매기지 않습니다.</span>{' '}
            직접 써 보거나 재 보지 않은 제품에 점수를 붙이면 판단이 숫자처럼 보이기 때문입니다.
            제품끼리 우열을 보여 주는 값은 에너지소비효율등급처럼 제조사가 표기한 것만 싣습니다.
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
            <Link href="/methodology" className="text-blue-600 hover:underline">계산 방법</Link>
            {' '}— 점수를 매기지 않는 이유, 가격·전기요금 계산식
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
