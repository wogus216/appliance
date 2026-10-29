// 코드 하나를 따로 다루는 상세 안내 페이지 목록.
//
// 브랜드 허브의 카드와 제품 상세의 코드 칩이 같은 목록을 보고 상세 페이지로 보낸다.
// 2026-10-11(페르소나 평가): 제품 페이지의 E4 칩이 E4 상세가 아니라 브랜드 목록으로 가서
// 독자가 이미 본 페이지로 돌아갔다. 허브 템플릿에 하드코딩돼 있던 세 링크를 여기로 옮겼다.

export interface ErrorCodeDetailPage {
  brand: string;
  category: string;
  code: string;
  href: string;
  /** 허브 카드 아래에 붙는 링크 문구 */
  label: string;
}

export const ERROR_CODE_DETAIL_PAGES: ErrorCodeDetailPage[] = [
  {
    brand: 'SKMagic',
    category: '식기세척기',
    code: 'E4',
    href: '/error-codes/SKMagic/dishwasher/e4',
    label: 'E4 모델별 의미와 확인 순서 보기 →',
  },
  {
    brand: 'Cuckoo',
    category: '식기세척기',
    code: 'E4',
    href: '/error-codes/Cuckoo/dishwasher/e4',
    label: 'E4 확인 순서와 AS 상담 기록 만들기 →',
  },
  {
    brand: 'Haier',
    category: '에어컨',
    code: 'F25',
    href: '/error-codes/Haier/air-conditioner/f25',
    label: 'F25 모델별 확인 순서와 AS 상담 기록 만들기 →',
  },
];

/** (브랜드, 카테고리, 코드)에 상세 안내가 있으면 그 페이지. 없으면 undefined */
export function getErrorCodeDetailPage(
  brand: string,
  category: string,
  code: string,
): ErrorCodeDetailPage | undefined {
  return ERROR_CODE_DETAIL_PAGES.find(
    (p) => p.brand === brand && p.category === category && p.code === code,
  );
}
