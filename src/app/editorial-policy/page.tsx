import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_AUTHOR, CONTACT_EMAIL, ADSENSE_NOT_APPROVED_AS_OF } from '@/lib/constants';

export const metadata: Metadata = { title: '편집 원칙', description: '에러코드 안내의 출처·적용 범위·정정과 광고를 다루는 원칙입니다.', alternates: { canonical: '/editorial-policy' } };

export default function EditorialPolicyPage() {
  return <div className="mx-auto max-w-3xl space-y-10 px-4 py-10 leading-relaxed text-gray-700">
    <header><h1 className="text-3xl font-bold text-gray-900">편집 원칙</h1><p className="mt-4">에러코드를 찾은 사람이 자신의 제품에 적용할 수 있는 근거와 안전한 확인 범위를 알 수 있도록 다음 원칙으로 작성합니다.</p></header>
    <section className="space-y-3"><h2 className="text-xl font-bold text-gray-900">출처와 적용 모델</h2><p>제조사 설명서·공식 서비스 자료를 우선합니다. 같은 문자라도 브랜드·제품군·모델마다 뜻이 다를 수 있어, 다른 모델의 조치를 확인 없이 옮기지 않습니다. 공통 서비스 자료와 정확한 모델 설명서의 범위를 나눠 표시합니다.</p><p>원문 링크와 확인 범위를 문서에 붙입니다. 자료에서 확인하지 못한 원인·조치는 빈칸을 추측으로 채우지 않고 확인하지 못했다고 적습니다. 확인일은 자료를 읽은 날이며 현장 측정일이나 수리 성공일이 아닙니다.</p></section>
    <section className="space-y-3"><h2 className="text-xl font-bold text-gray-900">조치의 안전 경계</h2><p>공식 자료가 허용하는 사용자 확인과 서비스 점검을 구분합니다. 가스·누수·과열·전기 관련 표시에서 근거 없는 분해·우회·반복 초기화 방법을 만들지 않습니다. 안내를 읽고도 적용 모델이나 조치 범위가 불명확하면 제조사에 확인하세요.</p><p>코드는 진단의 단서이며 고장 부품이나 수리비의 확정값이 아닙니다. 화면 안내가 정확한 모델 설명서와 충돌하면 모델 설명서를 우선하고 해당 페이지를 제보해 주세요.</p></section>
    <section className="space-y-3"><h2 className="text-xl font-bold text-gray-900">작성과 검수</h2><p>{SITE_AUTHOR} 한 사람이 작성·검수하며, 운영자의 배경은 <Link href="/about#operator" className="text-blue-700 underline">소개</Link>에 공개합니다. 운영자의 제품 사용·계측·수리 경험으로 쓰지 않습니다. 개별 구매자 후기를 지어내거나 제품에 점수·별점을 매기지 않습니다.</p><p>출처 수·글자 수·테스트 통과는 자체 확인 수단입니다. 원고의 독창성, 사용자의 이해 또는 Google의 품질 판정을 보장하지 않습니다.</p></section>
    <section className="space-y-3"><h2 className="text-xl font-bold text-gray-900">계산과 기록</h2><p>수리·교체 도구는 입력한 견적과 새 제품 가격을 같은 범위로 비교하고, 아직 모르는 비용은 별도로 확인하도록 합니다. 가격이 낮다는 이유로 수리나 교체를 자동 추천하지 않습니다.</p><p>관리 주기는 설명서에서 확인한 항목에만 적용합니다. 달력상 확인일과 제품 상태의 진단을 혼동하지 않도록 구분하고, 직접 정한 날짜는 사용자 입력으로 표시합니다. 세부 규칙은 <Link href="/methodology" className="text-blue-700 underline">계산 방법</Link>에 있습니다.</p></section>
    <section id="commerce" className="space-y-3"><h2 className="text-xl font-bold text-gray-900">광고와 편집의 분리</h2><p>{ADSENSE_NOT_APPROVED_AS_OF} 확인 기준 Google AdSense 승인 전입니다. 광고가 게재될 경우에도 광고 여부가 코드의 뜻·위험 안내·조치·정정에 영향을 주지 않습니다. 광고를 공식 고객센터나 수리 접수 버튼처럼 꾸미지 않습니다.</p></section>
    <section id="corrections" className="space-y-3"><h2 className="text-xl font-bold text-gray-900">정정과 문의</h2><p>오류를 확인하면 해당 문장을 바로잡고, 판단에 영향을 주는 정정은 <Link href="/about#corrections" className="text-blue-700 underline">정정 기록</Link>에 무엇이 잘못됐고 어떻게 수정했는지 남깁니다. 편집일과 기존 원자료 확인일을 구분합니다.</p><p>해당 페이지 주소·정확한 모델·공식 원문을 <a href={`mailto:${CONTACT_EMAIL}`} className="text-blue-700 underline">{CONTACT_EMAIL}</a>로 보내 주세요. <Link href="/contact" className="text-blue-700 underline">문의 안내</Link>에서 접수 범위를 확인할 수 있습니다.</p></section>
  </div>;
}
