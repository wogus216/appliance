import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_NAME, SITE_AUTHOR, SITE_DESCRIPTION, CONTACT_EMAIL, ADSENSE_NOT_APPROVED_AS_OF } from '@/lib/constants';
import { CORRECTIONS } from '@/lib/data/editorial/corrections';

export const metadata: Metadata = { title: '소개', description: SITE_DESCRIPTION, alternates: { canonical: '/about' } };

export default function AboutPage() {
  return <div className="mx-auto max-w-3xl space-y-10 px-4 py-10 leading-relaxed text-gray-700">
    <header><h1 className="text-3xl font-bold text-gray-900">{SITE_NAME} 소개</h1><p className="mt-4">가전 화면에 낯선 코드가 떴을 때 뜻과 조치를 찾기 어려워 이 사이트를 만들었습니다. 제조사 설명서와 서비스 자료를 제품군·모델 계열별로 대조해, 사용자가 확인할 것과 손대지 말아야 할 것을 구분합니다.</p></header>
    <section id="operator" className="scroll-mt-24 space-y-3">
      <h2 className="text-xl font-bold text-gray-900">누가 만드나</h2>
      <p>필명 {SITE_AUTHOR}로 활동하는 운영자 한 사람이 작성·검수합니다. 운영자는 개발자이며 가전 관련 자격증이나 업계 경력은 없습니다. 제조사나 공인 서비스센터가 아닙니다.</p>
      <p>이 사이트가 다루는 제품을 운영자가 직접 써 본 적은 없고 계측기로 재지도 않습니다. 사용 경험이나 직접 수리한 방법으로 소개하지 않으며, 외부 자료에서 확인한 내용은 원문과 적용 범위를 밝힙니다.</p>
    </section>
    <section className="space-y-3"><h2 className="text-xl font-bold text-gray-900">어떤 도움을 받을 수 있나요?</h2>
      <ul className="list-disc space-y-2 pl-5"><li><Link href="/error-codes" className="text-blue-700 underline">에러코드 안내</Link>에서 제품군과 브랜드를 고르고 공식 원문과 적용 모델을 확인합니다.</li><li><Link href="/tools" className="text-blue-700 underline">수리·관리 도구</Link>에서 견적과 빠진 비용을 정리하거나, 지원 모델의 관리일·구입일·수리·상담 내용을 보관합니다.</li><li><Link href="/blog/samsung-washer-check-codes" className="text-blue-700 underline">삼성 세탁기 점검 해설</Link>은 공통 코드와 정확한 모델 설명서의 차이를 풀어 설명합니다.</li></ul>
      <p>예를 들어 <Link href="/error-codes/SKMagic/dishwasher/e4" className="text-blue-700 underline">SK매직 식기세척기 E4</Link>는 제조사 FAQ 네 건의 적용 모델과 확인 순서를 한곳에 모았습니다. 명판의 모델명을 보고 해당하는 절부터 읽을 수 있습니다.</p>
    </section>
    <section className="space-y-3"><h2 className="text-xl font-bold text-gray-900">기록과 개인정보</h2><p>관리 수첩은 이 브라우저에 저장됩니다. 다른 기기로 자동 동기화되거나 제조사로 전달되지 않습니다. 중요한 기록은 파일로 내보내 보관하세요. 상담 기록에 주소나 연락처 등 불필요한 개인정보를 넣지 마세요.</p><p>입력·보관 방식은 각 도구와 <Link href="/privacy" className="text-blue-700 underline">개인정보처리방침</Link>에서 확인할 수 있습니다.</p></section>
    <section id="commerce" className="space-y-3"><h2 className="text-xl font-bold text-gray-900">운영과 광고</h2><p>{ADSENSE_NOT_APPROVED_AS_OF} 확인 기준 Google AdSense 승인 전입니다. 광고 설정이나 사이트의 자체 검사는 Google의 승인·품질 인증을 뜻하지 않습니다. 광고가 표시되더라도 문서의 판단과 근거를 광고주에게 맞추지 않습니다.</p></section>
    <section id="corrections" className="scroll-mt-24 space-y-3"><h2 className="text-xl font-bold text-gray-900">정정 기록</h2><p>과거 제품 소개를 포함해 잘못 싣던 내용과 바로잡은 근거를 보관합니다. 자료 확인일을 새 사용 경험이나 새 측정일로 바꾸지 않습니다.</p><details><summary className="min-h-11 cursor-pointer py-2 font-semibold text-gray-900">이전 문서의 정정 내용 보기</summary><ul className="mt-4 space-y-6">{CORRECTIONS.map((entry, i) => <li key={`${entry.subject}-${i}`}><p className="font-semibold text-gray-900">{entry.subject} <time className="text-sm font-normal text-gray-600" dateTime={entry.date}>{entry.date}</time></p><p className="mt-2">싣던 것: {entry.was}</p><p className="mt-1">바로잡은 것: {entry.now}</p>{entry.href.startsWith('/error-codes') && <Link href={entry.href} className="inline-flex min-h-11 items-center text-blue-700 underline">현재 안내 확인</Link>}</li>)}</ul></details></section>
    <section className="space-y-3"><h2 className="text-xl font-bold text-gray-900">오류를 발견했다면</h2><p>정확한 모델명, 해당 페이지 주소와 다른 내용을 확인한 공식 원문을 <a href={`mailto:${CONTACT_EMAIL}`} className="text-blue-700 underline">{CONTACT_EMAIL}</a>로 보내 주세요. 수리 접수나 긴급 상담을 받는 주소는 아닙니다.</p><p><Link href="/editorial-policy" className="text-blue-700 underline">편집 원칙</Link> · <Link href="/contact" className="text-blue-700 underline">문의 안내</Link></p></section>
  </div>;
}
