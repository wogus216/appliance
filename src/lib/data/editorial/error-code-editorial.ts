// 에러코드 브랜드 허브의 근거.
//
// 배경(2026-09-09): 제품 상세와 블로그에는 "이 글의 근거" 블록이 있는데 에러코드
// 페이지 11개에는 출처도 검수일도 작성 주체도 없었다. 코드 279개 전부 무출처였다.
// 가전 수리 지시는 틀리면 사람이 다치거나 못 고칠 물건이 되는 문서인데, 이 사이트에서
// 근거가 가장 약한 자리였다.
//
// 여기 실린 URL은 직접 열어 내용을 확인한 것만이다. 브랜드 지원
// 페이지가 존재한다는 것만으로는 넣지 않았다 — 그 문서가 실제로 코드를 다루는지 보고
// `covers`에 무엇을 덮고 무엇을 못 덮는지 적었다. 확인하지 못한 브랜드는 레코드를
// 만들지 않는다(빈 껍데기를 만들면 게이트가 무의미해진다는 editorial.ts의 원칙).
//
// 확인 과정에서 걸러낸 예: 쿠쿠 「고장증상 한눈에 보기」는 카테고리 필터에 식기세척기·
// 정수기가 있지만 실제로 실린 코드는 안마의자뿐이라, 우리 식기세척기 코드의 근거가
// 되지 못한다. 그래서 쿠쿠는 매뉴얼 다운로드만 출처로 남겼다.

import type { EditorialMeta } from '@/types/editorial';
import { SITE_AUTHOR } from '@/lib/constants';

/** 브랜드 허브 근거 + 그 근거가 실제로 덮는 범위 */
export interface ErrorCodeEditorial extends EditorialMeta {
  /**
   * 이 출처들이 무엇을 덮고 무엇을 못 덮는지 한 문장.
   * 화면에 그대로 실린다 — 근거의 범위를 감추지 않는 것이 신뢰 신호의 핵심이다.
   */
  covers: string;
}

const REVIEWED_BY = SITE_AUTHOR;

export const ERROR_CODE_EDITORIAL: Record<string, ErrorCodeEditorial> = {
  Samsung: {
    reviewedBy: REVIEWED_BY,
    updatedAt: '2026-10-08',
    // 이력: 2026-10-07 WF24A9500KE·WD25DB8995BZ·RF85C90D1AP·RS84B5061M9·VR50T95935W의 일반 진단표 제거, DV17은 HC·TC5·9C2만 유지. 2026-10-08 공통 코드표 재대조(pass3/sources/errorcodes-samsung-ac-common.txt). 2026-10-09 허브에 없는 코드(UE·4C·dC·LC·건조기 5C·로봇 C05~C09)와 코드가 없는 모델 지원 페이지 출처 정리.
    covers:
      '에어컨 E101·E422·E458·E464의 뜻과 초기화 방법은 삼성전자서비스의 에어컨 점검 코드표(100~199번·400~499번)와 벽걸이 E422 안내에서 확인했습니다. 제품군 공통 안내여서 AR07A9170HCN에 같은 코드가 뜨는지는 확인하지 못했습니다. 세탁기 5C는 WD25DB8995BZ 설명서의 배수 필터 안내에서, 건조기 HC·TC5·9C2는 DV17A9720BV 지원 페이지가 연결한 공용 설명서의 고장 신고 전 확인 표(인쇄 80~81쪽)에서 확인했습니다.',
    sources: [
      {
        url: 'https://www.samsung.com/sec/support/model/DV17A9720BV/',
        title: 'DV17A9720BV 모델별 사용설명서 연결',
        publisher: '삼성전자',
      },
      {
        url: 'https://www.samsung.com/sec/support/model/WD25DB8995BZ/',
        title: 'WD25DB8995BZ 모델별 사용설명서 연결',
        publisher: '삼성전자',
      },
      {
        url: 'https://www.samsung.com/sec/support/model/AR07A9170HCN/',
        title: 'AR07A9170HCN 모델별 사용설명서 연결',
        publisher: '삼성전자',
      },
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
    ],
  },

  LG: {
    reviewedBy: REVIEWED_BY,
    updatedAt: '2026-10-08',
    // 이력: 2026-10-07 냉장고 코드를 모델별에서 공통 안내로 분리, WD523ACB 정수기 E1·E2·E3·CL·UV와 RO585HGH 문구형 오류 제거. 2026-10-08 공통 안내 두 쪽 재대조(pass3/sources/errorcodes-lg-fridge-common.txt). 2026-10-09 허브에 없는 에어컨·세탁기·정수기·로봇청소기 출처 정리.
    covers:
      '냉장고 Er FF·Er rF·CF·dH·CO의 뜻과 조치는 LG전자의 「냉장고 에러코드 유형」과 「ER FF·ER rF 에러코드 원인과 해결 방법」에서 확인했습니다. 두 페이지는 자연 해동 시간을 각각 최소 8시간, 최소 24시간으로 다르게 적습니다. 제품군 공통 안내여서 T873MEE111·S834MWW1D에 같은 코드가 뜨는지는 확인하지 못했고, 두 모델의 공용 설명서(인쇄 15쪽)는 에러가 표시되면 전원을 끄지 말고 서비스센터에 먼저 연락하라고 안내합니다.',
    sources: [
      {
        url: 'https://www.lge.co.kr/support/product-T873MEE111',
        title: 'T873MEE111 모델별 공용 설명서 연결',
        publisher: 'LG전자',
      },
      {
        url: 'https://www.lge.co.kr/support/product-S834MWW1D',
        title: 'S834MWW1D 모델별 공용 설명서 연결',
        publisher: 'LG전자',
      },
      {
        url: 'https://www.lge.co.kr/support/solutions-20153810464793',
        title: '냉장고 에러코드 유형',
        publisher: 'LG전자',
      },
      {
        url: 'https://www.lge.co.kr/support/solutions-20153004152841',
        title: 'ER FF·ER rF 에러코드 원인과 해결 방법',
        publisher: 'LG전자',
      },
    ],
  },

  SKMagic: {
    reviewedBy: REVIEWED_BY,
    updatedAt: '2026-10-08',
    // 이력: 2026-09-16 FAQ 대조로 E2(배수→급수)·E4(누수→고온수) 정정, DWA2800 전용 E1 제거. 2026-10-02 dr 제거, WPU-A710C 정수기 문구형 항목 제거(얼음정수기 WPUIAC425·506·606의 FLS·oPn·FLO·F:01·F:11·F:41도 이 제품 코드 아님). 2026-10-08 E5 제거(pass3/sources/errorcodes-skmagic-dwa81-scope.txt). 2026-10-09 허브에 없는 정수기 설명서 출처 정리.
    covers:
      'DWA-81R0D 사용설명서의 자가 진단표에서 E2(급수 이상)·E3(배수 이상)·F1~F9(기능 이상)·tS·tO(온도 감지 이상)를 확인했습니다. E4·F3·AU의 뜻은 SK매직 서비스센터의 코드별 FAQ에 근거합니다. 이 가운데 AU FAQ는 SK매직이 DWA-81R0D에 연결해 둔 안내이고, E4·F3 FAQ는 식기세척기 대부분에 함께 연결돼 있어 E4는 FAQ 본문의 12인용 구분을 따랐습니다. 같은 글자도 모델 계열마다 뜻이 달라 여기 실린 내용은 12인용 터치온 계열 기준입니다.',
    sources: [
      {
        url: 'https://www.skintellixservice.com/web/easy/easyMain.do?tabIndex=0&selectedPrdCd=04&selectedSubPrdCd=DWA',
        title: '식기세척기 고객지원 — 코드별 FAQ',
        publisher: 'SK인텔릭스서비스',
      },
      {
        url: 'https://m.manual.skmagic.com/2019/model/DWA/DWA81R0D00SL/Manual.htm',
        title: '터치온 식기세척기 DWA-81R0D 사용설명서 — 자가 진단하기',
        publisher: 'SK매직',
      },
    ],
  },

  Cuckoo: {
    reviewedBy: REVIEWED_BY,
    updatedAt: '2026-10-08',
    // 이력: 2026-10-02 이 모델 표에 없는 E2 제거, E4를 수위센서 고장에서 누수 및 기능점검으로 정정. 2026-10-08 E1 긴급→주의, E6·E7 주의→긴급. 2026-10-09 E6·E7 카드를 한 항목(E6 / E7)으로 합침.
    covers:
      'CDW-A0611TW·TS 공용 설명서 인쇄 25쪽 코드표에서 E1·E3·E4·E6~E7·ED·dr의 뜻과 조치를, 뒤표지에서 서비스 번호 1588-8899를 확인했습니다. 설명서가 전원·중간밸브 차단 뒤 문의만 지시하는 E4·E6~E7·ED는 긴급, 사용자가 확인할 항목이 있는 E1·E3은 주의로 표시했습니다. 설명서는 어느 코드에도 고장 부품을 지정하지 않습니다.',
    sources: [
      {
        url: 'https://www.cuckoo.co.kr/upload_cuckoo/_bo_rep/manual/200424%3Dz0383-0082a0%20rev.1_cdw-a0611t.pdf',
        title: 'CDW-A0611TS·TW 사용설명서, 인쇄 25쪽 코드표·뒤표지 서비스 번호',
        publisher: '쿠쿠전자',
      },
    ],
  },

  Roborock: {
    reviewedBy: REVIEWED_BY,
    updatedAt: '2026-10-08',
    // 이력: 2026-10-02 Error 2·3·12(S8)·15·21(Curv) 제거, Error 9를 필터 자석 안내로 정정. 2026-10-08 공식 문서에 없는 원인 추정(가구 밑 끼임·반사 바닥재·베어링 마모) 삭제, 두 모델 안내 병합, Curv Error 9와 두 모델 Error 7·10·18 추가(pass3/sources/errorcodes-roborock-s8-curv.txt).
    covers:
      'S8 Pro Ultra와 Qrevo Curv의 모델별 공식 문제 해결 문서(미국 지역판)에서 Error 1·4·5·7·9·10·13·18의 확인 순서를 대조했습니다. 두 문서의 문구가 같아 두 모델에 같은 안내를 싣습니다. Error 8도 두 문서에 있지만 무엇을 확인하라는지 대상이 원문에 없어 싣지 않았습니다. 두 모델의 설명서에는 번호별 오류 표가 없고, 다른 로보락 모델에서는 같은 숫자가 다른 뜻일 수 있습니다. AS 전화 1566-5534는 로보락 코리아 서비스·보증 안내 페이지의 번호입니다.',
    sources: [
      {
        url: 'https://help.roborock.com/us/product/s8-pro-ultra-message?category=troubleshooting',
        title: 'S8 Pro Ultra 모델별 문제 해결',
        publisher: 'Roborock',
      },
      {
        url: 'https://help.roborock.com/us/product/roborock-qrevo-curv-message?category=troubleshooting',
        title: 'Qrevo Curv 모델별 문제 해결',
        publisher: 'Roborock',
      },
      {
        url: 'https://kr.roborock.com/pages/roborock-service-warranty',
        title: '로보락 코리아 서비스·보증 안내 — AS 전화',
        publisher: '로보락',
      },
    ],
  },

  Haier: {
    reviewedBy: REVIEWED_BY,
    updatedAt: '2026-09-30',
    // 이력: 2026-09-30 E1~E6/F1 상세 원인 게시 보류, 해외 하이얼 UAE의 F25 센서 고장 설명을 국내 두 모델에 적용하지 않음(research/evidence/2026-09-30/error-code-diagnostic-audit.md).
    covers:
      'F25는 하이얼코리아가 CTH06QBW·CTH10QBW 모델명으로 연결한 설명서(인쇄 28쪽)에서 확인했습니다. 두 모델의 다른 코드(E1~E6·F1)는 모델별 진단표를 찾지 못해 싣지 않았습니다. 확인 순서와 해외 안내와의 차이는 F25 상세 안내에 정리했습니다.',
    sources: [
      {
        url: 'https://www.haier.co.kr/board/board_manual/board_list.asp?scrID=0000000231&pageNum=3&subNum=7&ssubNum=1&page=1&s_string=CTH06QBW',
        title: 'CTH06QBW 제품설명서 목록',
        publisher: '하이얼코리아',
      },
      {
        url: 'https://www.haier.co.kr/board/board_manual/board_list.asp?scrID=0000000231&pageNum=3&subNum=7&ssubNum=1&page=1&s_string=CTH10QBW',
        title: 'CTH10QBW 제품설명서 목록',
        publisher: '하이얼코리아',
      },
    ],
  },

  // 카탈로그에 제품이 없는 브랜드다. 보일러를 리뷰할 근거는 우리에게 없지만
  // 코드를 정리할 근거는 제조사가 제품군 단위로 공개한다 — data/error-codes/standalone.ts.
  Kiturami: {
    reviewedBy: REVIEWED_BY,
    updatedAt: '2026-10-08',
    // 이력: 2026-09-16 6개 제품군 수집(.audit/kiturami/codes.json). 2026-10-07 10·98 계열 분리, 4번 타는 95 수동 보충 구분, 97 가스 누설 조치 우선. 2026-10-08 01~03·E001~E003의 빈도 단정과 원문에 없는 요금 미납 사례 삭제, 07 접수처 구분.
    covers:
      '귀뚜라미 공식 자가진단(krb.co.kr/self)의 가스보일러 제품군 페이지 6개 — 거꾸로IN, 거꾸로 IN AD, 거꾸로IIHi, 4번 타는, 거꾸로 IoT 콘덴싱, AST 콘덴싱 — 에서 코드별 뜻과 조치를 확인했습니다. 같은 번호도 제품군마다 뜻이 달라(10은 IN AD 센서·IoT 송풍기, 98은 IN·IIHi 물 부족·IoT 과열) 항목을 나누고 확인된 제품군을 각 항목에 적었습니다. AST 콘덴싱의 E204·E214·E224·E234는 공식 페이지의 제목(센서 이상)과 조치(송풍기 회전수)가 서로 어긋나 원인을 확정하지 않았습니다. 기름·전기보일러는 다루지 않습니다.',
    sources: [
      {
        url: 'https://krb.co.kr/self/192',
        title: '거꾸로 IN AD 코드 10·95·97 대조',
        publisher: '귀뚜라미',
      },
      {
        url: 'https://krb.co.kr/self/360',
        title: '거꾸로IIHi 코드 07·98 대조',
        publisher: '귀뚜라미',
      },
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
      {
        url: 'https://krb.co.kr/self/10759',
        title: 'AST 콘덴싱 가스보일러 에러코드',
        publisher: '귀뚜라미',
      },
    ],
  },

  // 경동나비엔도 카탈로그에 제품이 없다. 코드 안내만 제공한다.
  Navien: {
    reviewedBy: REVIEWED_BY,
    updatedAt: '2026-10-08',
    // 이력: 2026-09-16 13건 수집(scripts/collect-navien.mjs; kdnavien.co.kr quickfix 주소는 404, 자가진단은 navienhouse.com으로 이전). 2026-10-07 Er02·Er03·Er51 재대조. 2026-10-08 13건 원문 재대조(pass3/sources/errorcodes-navien-*.txt): E594·E615 전원 코드 재연결, Er50 퇴수코크·동결 가이드, Er407 표기 추가, Er407·Er54 빈도·부품 단정 삭제.
    covers:
      '나비엔하우스 자가진단 가이드(navienhouse.com)의 가스보일러 항목 13건에서 코드별 증상·예상 원인·조치를 확인했습니다. 경동나비엔은 같은 고장을 세대별로 다르게 표시해(Er51과 E351, Er03·E3·E003, Er07·Er08·E407) 원문에 나온 표기를 함께 적었습니다. 밸브 위치와 열림 판별(배관과 일자면 열림)은 원문의 TIP을 따랐습니다. 기름보일러는 Er02만 가스보일러와 공통으로 확인했습니다.',
    sources: [
      {
        url: 'https://www.navienhouse.com/support/guide/list/3210',
        title: '자가진단 가이드 — 가스보일러',
        publisher: '경동나비엔',
      },
      {
        url: 'https://www.navienhouse.com/support/guide/610?tab=32',
        title: 'Er51·E351 — 물 부족 시 보충 실패',
        publisher: '경동나비엔',
      },
      {
        url: 'https://www.navienhouse.com/support/guide/306?tab=32',
        title: 'Er03·E3·E003 — 점화 실패',
        publisher: '경동나비엔',
      },
      {
        url: 'https://www.navienhouse.com/support/guide/583?tab=32',
        title: 'Er02 — 개방식 물 부족, 자동 보충 적용 조건',
        publisher: '경동나비엔',
      },
      {
        url: 'https://www.navienhouse.com/support/guide/1010',
        title: 'Er54·E154 — 응축수 배출 불량',
        publisher: '경동나비엔',
      },
      {
        url: 'https://www.navienhouse.com/support/guide/981',
        title: 'E594·E615 — 컨트롤러 이상, 전원 코드 재연결',
        publisher: '경동나비엔',
      },
      {
        url: 'https://www.navienhouse.com/support/guide/604',
        title: 'Er50·E250 — 난방수 0도 이하, 퇴수코크로 동결 확인',
        publisher: '경동나비엔',
      },
      {
        url: 'https://www.navienhouse.com/support/guide/295',
        title: 'Er07·Er08·E407 — 온수온도센서 이상',
        publisher: '경동나비엔',
      },
      {
        url: 'https://www.navienhouse.com/support/guide/814',
        title: 'Er24·E324 — 난방배관 순환, 분배기 밸브 위치·열림',
        publisher: '경동나비엔',
      },
      {
        url: 'https://www.navienhouse.com/support/guide/13259',
        title: '배관이 얼었어요 — 난방배관 동결 시 전원 차단과 해빙',
        publisher: '경동나비엔',
      },
    ],
  },
};

/**
 * 브랜드 허브의 근거. 없으면 undefined —
 * 공식 모델별 코드 문서로 대조하지 못한 브랜드는 레코드를 만들지 않았다.
 */
export function getErrorCodeEditorial(brand: string): ErrorCodeEditorial | undefined {
  return ERROR_CODE_EDITORIAL[brand];
}
