import type { Metadata } from 'next';
import Link from 'next/link';
import { CONSUMER_STANDARD_NOTICE } from '@/lib/data/consumer-standards';

export const metadata: Metadata = { title: '계산 방법', description: '수리 견적 차이, 관리 날짜와 가전 수첩의 보증 기간 계산 및 기록 보관 규칙입니다.', alternates: { canonical: '/methodology' } };

export default function MethodologyPage() {
  return <div className="mx-auto max-w-3xl space-y-10 px-4 py-10 leading-relaxed text-gray-700">
    <header><h1 className="text-3xl font-bold text-gray-900">도구의 계산 방법</h1><p className="mt-4">입력한 금액과 날짜를 어떻게 계산하고 어디까지 해석할 수 있는지 설명합니다. 각 도구 아래에는 입력 예시와 원문이 있습니다.</p></header>
    <section id="repair-replace" className="space-y-3"><h2 className="text-xl font-bold text-gray-900">수리·교체 비교</h2><p>두 금액의 차이 = 새 제품 가격 − 수리 견적입니다. 사용자가 넣은 금액으로 계산하고, 출장·설치·철거·추가 부품 비용이 포함됐는지 별도로 확인합니다. 알 수 없는 금액을 0원이라고 간주해 유불리를 확정하지 않습니다.</p><p>낮은 금액이 더 좋은 선택이라는 결론을 내지 않습니다. 정확한 고장 진단, 보증·수리 범위, 새 제품의 설치 조건과 기존 제품의 상태를 함께 확인해야 합니다.</p><Link href="/tools/repair-replace" className="inline-flex min-h-11 items-center text-blue-700 underline">수리·교체 비교표 열기</Link></section>
    <section id="care-plan" className="space-y-3"><h2 className="text-xl font-bold text-gray-900">관리 일정</h2><p>날짜 주기가 확인된 관리 항목은 마지막 관리일에 설명서의 주기를 더해 다음 확인일을 계산합니다. 일 단위는 달력 날짜로 더하고, 개월 단위는 같은 날짜가 없는 달에 그 달의 마지막 날로 맞춥니다.</p><p>날짜 주기를 확인하지 못한 항목은 다음 날짜를 직접 정합니다. 사용 환경에 따라 관리 시점이 달라질 수 있으며, 계산한 날짜는 고장 예방 보장이나 제품 상태의 진단이 아닙니다. 달력 파일은 해당 일정을 복사한 파일이며 자동 동기화·알림 서비스가 아닙니다.</p><Link href="/tools/care-plan" className="inline-flex min-h-11 items-center text-blue-700 underline">관리 일정표 열기</Link></section>
    <section id="household-care" className="space-y-3"><h2 className="text-xl font-bold text-gray-900">구입·보증·수리 기록</h2><p>품질보증·부품보유기간은 자료에서 확인한 품목의 기간과 기산 규칙으로 계산합니다. 품목의 구분, 구입·인도·제조일과 보증서 조건을 확인해야 하며, 도구의 날짜가 무상수리 승인이나 법적 결론을 뜻하지는 않습니다.</p><p>근거는 {CONSUMER_STANDARD_NOTICE.notice} <a href={CONSUMER_STANDARD_NOTICE.table3Url} target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">소비자분쟁해결기준 [별표 Ⅲ]</a>입니다. 원자료 확인일은 {CONSUMER_STANDARD_NOTICE.checkedAt}입니다. 기간과 기산점의 자세한 안내·출처는 수첩 아래에 있습니다.</p><Link href="/tools/household-care" className="inline-flex min-h-11 items-center text-blue-700 underline">가전 수첩 열기</Link></section>
    <section id="storage" className="space-y-3"><h2 className="text-xl font-bold text-gray-900">입력과 보관</h2><p>입력값은 제조사나 상담처에 전송되지 않습니다. 수첩은 이 브라우저의 localStorage에 저장되므로 다른 브라우저·기기와 공유되지 않고, 브라우저 데이터를 지우면 사라질 수 있습니다. 중요한 기록은 JSON 파일로 내보내세요.</p><p>파일을 불러올 때는 형식과 지원 모델을 확인하며, 보관된 기록의 날짜가 자료를 새로 확인한 날이 되지는 않습니다. 입력값, 공식 자료와 계산값은 화면에서 구분해 표시합니다.</p><p><Link href="/tools#value-kinds" className="text-blue-700 underline">값 종류 표시의 뜻</Link> · <Link href="/privacy" className="text-blue-700 underline">개인정보처리방침</Link> · <Link href="/editorial-policy" className="text-blue-700 underline">편집 원칙</Link></p></section>
  </div>;
}
