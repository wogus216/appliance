// 에러코드 브랜드 허브의 근거.
//
// 배경(2026-09-09): 제품 상세와 블로그에는 "이 글의 근거" 블록이 있는데 에러코드
// 페이지 11개에는 출처도 검수일도 작성 주체도 없었다. 코드 279개 전부 무출처였다.
// 가전 수리 지시는 틀리면 사람이 다치거나 못 고칠 물건이 되는 문서인데, 이 사이트에서
// 근거가 가장 약한 자리였다.
//
// 여기 실린 URL은 전부 2026-09-09에 직접 열어 내용을 확인한 것만이다. 브랜드 지원
// 페이지가 존재한다는 것만으로는 넣지 않았다 — 그 문서가 실제로 코드를 다루는지 보고
// `covers`에 무엇을 덮고 무엇을 못 덮는지 적었다. 확인하지 못한 브랜드는 레코드를
// 만들지 않는다(빈 껍데기를 만들면 게이트가 무의미해진다는 editorial.ts의 원칙).
//
// 확인 과정에서 걸러낸 예: 쿠쿠 「고장증상 한눈에 보기」는 카테고리 필터에 식기세척기·
// 정수기가 있지만 실제로 실린 코드는 안마의자뿐이라, 우리 식기세척기 코드의 근거가
// 되지 못한다. 그래서 쿠쿠는 매뉴얼 다운로드만 출처로 남겼다.

import type { EditorialMeta } from '@/types/editorial';

/** 브랜드 허브 근거 + 그 근거가 실제로 덮는 범위 */
export interface ErrorCodeEditorial extends EditorialMeta {
  /**
   * 이 출처들이 무엇을 덮고 무엇을 못 덮는지 한 문장.
   * 화면에 그대로 실린다 — 근거의 범위를 감추지 않는 것이 신뢰 신호의 핵심이다.
   */
  covers: string;
}

const REVIEWED_BY = '살림랩 편집팀';
const REVIEWED_AT = '2026-09-09';

export const ERROR_CODE_EDITORIAL: Record<string, ErrorCodeEditorial> = {
  Samsung: {
    reviewedBy: REVIEWED_BY,
    updatedAt: REVIEWED_AT,
    covers:
      '에어컨 코드는 삼성전자서비스가 번호대별로 공개한 점검코드 표와 대조했고, 세탁기·건조기 코드는 코드별 안내 문서를 하나씩 열어 확인했습니다. 냉장고·로봇청소기 코드는 제품 사용설명서 기준이라 서비스 문서와 문장 단위로 대조하지는 못했습니다.',
    sources: [
      {
        url: 'https://www.samsungsvc.co.kr/solution/1481874',
        title: '에어컨 점검 코드 100~199번',
        publisher: '삼성전자서비스',
      },
      {
        url: 'https://www.samsungsvc.co.kr/solution/1482712',
        title: '에어컨 점검 코드 400~499번',
        publisher: '삼성전자서비스',
      },
      {
        url: 'https://www.samsungsvc.co.kr/solution/39779',
        title: '에어컨 E422 — 스마트 리셋 안내',
        publisher: '삼성전자서비스',
      },
      {
        url: 'https://www.samsungsvc.co.kr/solution/1490485',
        title: '세탁기 UE — 세탁물 불균형',
        publisher: '삼성전자서비스',
      },
      {
        url: 'https://www.samsungsvc.co.kr/solution/546221',
        title: '드럼 세탁기 불균형 조치 방법',
        publisher: '삼성전자서비스',
      },
      {
        url: 'https://www.samsungsvc.co.kr/solution/1489265',
        title: '세탁기 4C — 급수 이상',
        publisher: '삼성전자서비스',
      },
      {
        url: 'https://www.samsungsvc.co.kr/solution/1489272',
        title: '세탁기 5C — 배수 이상',
        publisher: '삼성전자서비스',
      },
      {
        url: 'https://www.samsungsvc.co.kr/solution/1488876',
        title: '세탁기 배수 필터 청소 방법',
        publisher: '삼성전자서비스',
      },
      {
        url: 'https://www.samsungsvc.co.kr/solution/1491447',
        title: '세탁기 dC — 도어 열림',
        publisher: '삼성전자서비스',
      },
      {
        url: 'https://www.samsungsvc.co.kr/solution/1491460',
        title: '세탁기 LC — 누수 감지',
        publisher: '삼성전자서비스',
      },
      {
        url: 'https://www.samsungsvc.co.kr/solution/41121',
        title: '건조기 5C — 배수 이상과 겨울철 결빙',
        publisher: '삼성전자서비스',
      },
    ],
  },

  LG: {
    reviewedBy: REVIEWED_BY,
    updatedAt: REVIEWED_AT,
    covers:
      '냉장고 코드는 LG전자가 공개한 에러코드 유형 문서와 대조했고, 에어컨·세탁기 코드는 코드별 안내 문서를 열어 확인했습니다. 정수기·로봇청소기 코드는 제품 사용설명서 기준이라 서비스 문서와 대조하지 못했습니다.',
    sources: [
      {
        url: 'https://www.lge.co.kr/support/solutions-20153810464793',
        title: '냉장고 에러코드 유형',
        publisher: 'LG전자',
      },
      {
        url: 'https://www.lge.co.kr/support/solutions-20153004152841',
        title: '냉장고 Er rF — 성에 제거 안내',
        publisher: 'LG전자',
      },
      {
        url: 'https://www.lge.co.kr/support/solutions-20150310809781',
        title: '에어컨 CH05 — 실내외기 통신 이상',
        publisher: 'LG전자',
      },
      {
        url: 'https://www.lge.co.kr/support/solutions-20154389991658',
        title: '에어컨 에러 안내',
        publisher: 'LG전자',
      },
      {
        url: 'https://www.lge.co.kr/support/solutions-20150332177008',
        title: '세탁기 FE — 물넘침(Over Flow)',
        publisher: 'LG전자',
      },
    ],
  },

  SKMagic: {
    reviewedBy: REVIEWED_BY,
    updatedAt: REVIEWED_AT,
    covers:
      '식기세척기 코드는 SK매직 서비스센터가 코드별로 공개한 FAQ와 하나씩 대조했습니다(2026-09-16). 이 과정에서 세 건을 바로잡았습니다 — E2를 배수로, E4를 누수로 적고 있었고, E1은 DWA2800·2810·2820 전용 코드인데 이 제품에 싣고 있었습니다. SK매직은 같은 문자라도 모델 계열마다 뜻이 달라, 지금 실린 것은 12인용·터치온 계열 기준입니다. 다만 dr 표시는 설명서·FAQ 어느 쪽에서도 확인하지 못했습니다. 정수기 코드는 모델별 설명서 기준이며, 얼음정수기 계열(WPUIAC425·506·606)에서 쓰는 FLS·oPn·FLO·F:01·F:11·F:41은 이 제품 코드가 아니라 아직 싣지 않았습니다.',
    sources: [
      {
        url: 'https://service.skmagic.com/web/easy/easyMain.do?tabIndex=0&selectedPrdCd=04&selectedSubPrdCd=DWA',
        title: '식기세척기 고객지원 — 코드별 FAQ',
        publisher: 'SK인텔릭스서비스',
      },
      {
        url: 'https://m.manual.skmagic.com/2019/model/DWA/DWA81R0D00SL/Manual.htm',
        title: '터치온 식기세척기 DWA-81R0D 사용설명서',
        publisher: 'SK매직',
      },
      {
        url: 'https://qr.skmagic.com/2019/model/WPU/WPUA710CRERO/Manual.htm',
        title: '올인원 직수 정수기 WPU-A710C 사용설명서',
        publisher: 'SK매직',
      },
    ],
  },

  Cuckoo: {
    reviewedBy: REVIEWED_BY,
    updatedAt: REVIEWED_AT,
    covers:
      '쿠쿠는 모델별 사용설명서를 내려받는 페이지만 공개합니다. 고객지원의 「고장증상 한눈에 보기」에도 들어가 봤지만 실제로 실린 코드는 안마의자뿐이라 식기세척기 근거로 쓰지 않았습니다. 아래 코드는 제품 설명서 기준입니다.',
    sources: [
      {
        url: 'https://www.cuckoo.co.kr/customer/customerSvCProdMualDnloadProdFamSch',
        title: '제품설명서 다운로드',
        publisher: '쿠쿠전자',
      },
    ],
  },

  Coway: {
    reviewedBy: REVIEWED_BY,
    updatedAt: REVIEWED_AT,
    covers:
      '코웨이는 코드를 모아 공개한 문서가 없고 모델별 설명서를 찾는 페이지만 있습니다. 아래 코드는 제품 설명서 기준이며, 공식 코드표와 대조하지 못했습니다.',
    sources: [
      {
        url: 'https://www.coway.com/cs/findmanual',
        title: '제품 설명서 찾기',
        publisher: '코웨이',
      },
    ],
  },

  Roborock: {
    reviewedBy: REVIEWED_BY,
    updatedAt: REVIEWED_AT,
    covers:
      '로보락 한국 공식 고객지원 페이지를 근거로 두었습니다. 코드별 개별 문서와 문장 단위로 대조하지는 못했습니다.',
    sources: [
      {
        url: 'https://kr.roborock.com/pages/support',
        title: '고객지원',
        publisher: '로보락 코리아',
      },
    ],
  },

  Xiaomi: {
    reviewedBy: REVIEWED_BY,
    updatedAt: REVIEWED_AT,
    covers:
      '샤오미 한국 공식 지원 페이지를 근거로 두었습니다. 코드별 개별 문서와 대조하지는 못했습니다.',
    sources: [
      {
        url: 'https://www.mi.com/kr/support',
        title: '고객 지원',
        publisher: '샤오미 코리아',
      },
    ],
  },

  TCL: {
    reviewedBy: REVIEWED_BY,
    updatedAt: REVIEWED_AT,
    covers:
      'TCL 한국 공식 지원 페이지와 제품 페이지를 근거로 두었습니다. 국내 A/S가 유통 채널(쿠팡 기술지원센터)을 경유하는 구조라 제조사 코드표는 공개되어 있지 않습니다.',
    sources: [
      {
        url: 'https://www.tcl.com/kr/ko/support',
        title: '고객 지원',
        publisher: 'TCL 코리아',
      },
      {
        url: 'https://www.tcl.com/kr/ko/air-conditioners/tac-08csd-tph11i',
        title: '인버터 벽걸이 TAC-08CSD 제품 페이지',
        publisher: 'TCL 코리아',
      },
    ],
  },

  // 카탈로그에 제품이 없는 브랜드다. 보일러를 리뷰할 근거는 우리에게 없지만
  // 코드를 정리할 근거는 제조사가 제품군 단위로 공개한다 — data/error-codes/standalone.ts.
  Kiturami: {
    reviewedBy: REVIEWED_BY,
    updatedAt: '2026-09-16',
    covers:
      '귀뚜라미 공식 자가진단 매뉴얼의 제품군별 에러코드 표와 대조했습니다. 가스보일러 6개 제품군(거꾸로IN·거꾸로 IN AD·거꾸로IIHi·4번 타는·거꾸로 IoT 콘덴싱·AST 콘덴싱)을 받아 코드를 맞춰 봤고, 여기 실은 것은 여러 제품군에 공통으로 나오는 코드입니다. 각 항목에 확인된 제품군을 적었습니다. AST 콘덴싱은 E001·E106처럼 세 자리 E 코드를 쓰는 다른 체계라 섞지 않았고 아직 다루지 않습니다. 기름보일러·전기보일러도 미수록입니다. 이 사이트는 보일러 제품을 다루지 않으므로 코드 안내만 제공합니다.',
    sources: [
      {
        url: 'https://krb.co.kr/self',
        title: '자가진단 매뉴얼',
        publisher: '귀뚜라미',
      },
      {
        url: 'https://krb.co.kr/self/10762',
        title: '거꾸로 IoT 콘덴싱 가스보일러 에러코드',
        publisher: '귀뚜라미',
      },
      {
        url: 'https://krb.co.kr/self/359',
        title: '거꾸로IN 가스보일러 에러코드',
        publisher: '귀뚜라미',
      },
      {
        url: 'https://krb.co.kr/self/352',
        title: '4번 타는 가스보일러 에러코드',
        publisher: '귀뚜라미',
      },
    ],
  },
};

/**
 * 브랜드 허브의 근거. 없으면 undefined —
 * 위닉스·하이얼·다이슨은 국내 공식 코드 문서를 찾지 못해 레코드를 만들지 않았다.
 */
export function getErrorCodeEditorial(brand: string): ErrorCodeEditorial | undefined {
  return ERROR_CODE_EDITORIAL[brand];
}
