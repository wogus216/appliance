import type { FridgeFitProduct } from '@/lib/fridge-fit';

// 정확 모델 지원 페이지에서 연결된 공용 설명서. 상세 페이지의 치수와 일치하는 열만 사용한다.
// 원문 버전·도면 판독·재수신 근거: research/evidence/2026-10-27/fridge-fit-source-check.md
const samsung = {
  brandLabel: '삼성', rearGap: 50, sideGap: 50,
  sideBasis: '좌우 각 50mm는 고장 진단 절의 이격 안내입니다.',
  topNote: '대조한 설명서에서 상부 간격 수치는 확인하지 못했습니다. 수평 조절 후 높이와 필요한 상부 여유를 설치팀에 확인하세요.',
  transportNote: '문을 뺀 본체 깊이 도면은 785mm입니다. 이 값만으로 반입 가능 여부를 판정하지 않습니다. 문 분리는 설치팀에 문의하세요.',
  checkedAt: '2026-10-27',
};
const lg = {
  brandLabel: 'LG', rearGap: 100, sideGap: 100,
  sideBasis: '좌우 각 100mm는 고장 진단 절의 권고입니다. 설치 절에는 좌우 수치가 없어 현장 조건을 확인해야 합니다.',
  topNote: '설치 절은 문 위쪽~설치장 25mm 이상, 고장 진단 절은 천장~제품 100mm 이상을 안내합니다. 기준점이 달라 본체 높이에 하나의 여유값을 더하지 않았습니다. 수평 조절 후 직접 확인하세요.',
  // 깊이(G·F)는 최대로 연 문의 끝이 아니라 문을 여는 궤적에서 가장 앞으로 나오는 지점이다.
  // 근거: research/evidence/2026-10-29/fridge-doors/doors-source-check.md
  openWidthBasis: '최대 개방 도면의 전체 폭', openDepthBasis: '문을 여는 동안 가장 앞으로 나오는 지점',
  openingNote: '폭은 최대 개방 도면의 전체 폭, 깊이는 문이 열리는 궤적에서 가장 앞으로 나오는 지점입니다. 설명서에 각도 숫자가 없어 두 값을 같은 각도의 점유 범위로 보지 마세요.',
  transportNote: '대조한 설명서에서 문 분리 반입 절차를 확인하지 못했습니다. 설치팀에 문의하세요.',
  checkedAt: '2026-10-27',
};

export const FRIDGE_FIT_PRODUCTS: FridgeFitProduct[] = [
  {
    ...samsung, modelNumber: 'RF85C90D1AP', slug: 'samsung-bespoke-4door-rf85', width: 912, height: 1853, depth: 930,
    openWidth: 1498, openDepth: 1268, openWidthBasis: '최대 125° 개방', openDepthBasis: '90° 개방',
    openingNote: '폭은 최대 125° 개방, 깊이는 90° 개방 도면의 별도 값입니다. 같은 각도의 점유 직사각형으로 해석하지 마세요.',
    sourceUrl: 'https://downloadcenter.samsung.com/content/UM/202312/20231211100502613/RF9000C_CC_2023_UM_DA68-04671A_KO_UA_230804.pdf',
    sourcePages: '인쇄 5·74·97쪽, RF85/84C* 열', document: 'RF9000C 공용 설명서 ver.5.0',
  },
  {
    ...lg, modelNumber: 'T873MEE111', slug: 'lg-dios-obje-4door-t873', width: 914, height: 1787, depth: 918,
    openWidth: 1667, openDepth: 1293,
    sourceUrl: 'https://gscs-b2c.lge.com/open/downloadFile?fileId=a8sdGu0vrerKMqWmu5nkQ',
    sourcePages: '인쇄 20쪽 유형 1, 25·27쪽', document: 'MFL71401525 Rev.11_091025',
  },
  {
    ...samsung, modelNumber: 'RS84B5061M9', slug: 'samsung-bespoke-sxs-rs84', width: 912, height: 1780, depth: 915,
    openWidth: 1726, openDepth: 1364, openWidthBasis: '최대 165°/170° 개방', openDepthBasis: '90° 개방',
    openingNote: '폭은 최대 165°/170° 개방, 깊이는 90° 개방 도면의 별도 값입니다. 같은 각도의 점유 직사각형으로 해석하지 마세요.',
    sourceUrl: 'https://downloadcenter.samsung.com/content/UM/202206/20220608185736816/RS5000T_3Door.pdf',
    sourcePages: '인쇄 4·50·70쪽', document: 'RS5000T 공용 설명서 ver.1.0',
  },
  {
    ...lg, modelNumber: 'S834MWW1D', slug: 'lg-dios-obje-sxs-s834', width: 913, height: 1790, depth: 913,
    openWidth: 1635, openDepth: 1358,
    sourceUrl: 'https://gscs-b2c.lge.com/open/downloadFile?fileId=pYFpi7CzmmgetzthPkurQ',
    sourcePages: '인쇄 21·25쪽', document: 'MFL71401520 Rev.13_062926',
  },
];

export function getFridgeFitProduct(modelNumber: string): FridgeFitProduct | undefined {
  return FRIDGE_FIT_PRODUCTS.find((product) => product.modelNumber === modelNumber);
}
