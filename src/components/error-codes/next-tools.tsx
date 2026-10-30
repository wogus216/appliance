import Link from 'next/link';
import { getAppliancesByBrand } from '@/lib/data/appliances';
import { getTool } from '@/lib/tool-directory';

const link = 'font-semibold text-blue-700 underline underline-offset-4';

/**
 * 코드를 확인한 뒤 이어서 쓸 도구.
 *
 * 2026-10-30: 네이버 클릭 대부분이 에러코드 페이지로 들어오는데 거기서 도구로 가는 링크가 0개였다.
 * 수첩·관리 일정표는 공개 제품 모델만 고를 수 있으므로 그 브랜드의 제품이 있을 때만 잇는다.
 * 보일러 허브에서 이으면 찾는 모델이 없는 선택지를 만난다.
 */
export function ErrorCodeNextTools({ brand }: { brand?: string }) {
  const hasProducts = brand ? getAppliancesByBrand(brand).length > 0 : false;
  return (
    <section id="next-tools" aria-labelledby="next-tools-heading" className="scroll-mt-24 rounded-xl border border-gray-200 bg-gray-50 p-5">
      <h2 id="next-tools-heading" className="text-xl font-bold text-gray-900">코드를 확인한 다음</h2>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-gray-700">
        <li>수리 견적을 받았다면 <Link href="/tools/repair-replace" className={link}>{getTool('repair-replace').title}</Link>에 새 제품 비용과 함께 넣어 보세요. 모델 제한이 없습니다.</li>
        {hasProducts && <li>구입일을 알면 <Link href="/tools/household-care" className={link}>{getTool('household-care').title}</Link>에서 고시 기준 품질보증 종료일을 계산하고 수리 내역을 적어 둘 수 있습니다.</li>}
        {hasProducts && <li>정기 관리 날짜가 궁금하면 <Link href="/tools/care-plan" className={link}>{getTool('care-plan').title}</Link>에서 설명서 주기로 다음 확인일을 계산합니다.</li>}
      </ul>
      {hasProducts && <p className="mt-2 text-xs text-gray-600">수첩과 관리 일정표는 공개 제품 모델만 고를 수 있습니다.</p>}
      <p className="mt-3 text-sm"><Link href="/tools" className={link}>도구 모음 전체 보기</Link></p>
    </section>
  );
}
