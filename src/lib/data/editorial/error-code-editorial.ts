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
    covers:
      '삼성 에어컨 번호표는 제품군 공통 안내로 분리했으며 AR07A9170HCN의 표시를 보증하지 않습니다. 2026-10-08에 공통 코드표(100~199·400~499번)와 E422 안내를 다시 열어, E101·E422·E458·E464의 뜻과 "분전반 차단기를 내렸다 올려 초기화"·벽걸이 스마트 리셋 방법을 원문대로 적었습니다. WF24A9500KE와 WD25DB8995BZ의 연결된 설명서는 LCD 안내 중심이어서 일반 제품의 진단표를 제거했고, 콤보의 5C는 배수 필터 안내(필터 잠김 확인·주 1회 이상 청소 포함)에서 확인했습니다. DV17A9720BV는 지원 페이지가 연결한 공용 설명서의 HC·TC5·9C2만 코드로 남겼고, 9C2는 설명서의 네 가지 전원 확인 순서대로 적었습니다. RF85C90D1AP·RS84B5061M9 냉장고와 VR50T95935W 로봇청소기도 정확한 모델에 적용할 수 없는 코드표를 제거했습니다.',
    sources: [
      {
        url: 'https://www.samsung.com/sec/support/model/WF24A9500KE/',
        title: 'WF24A9500KE 모델별 사용설명서 연결',
        publisher: '삼성전자',
      },
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
      {
        url: 'https://www.samsungsvc.co.kr/solution/39116',
        title: '구형 로봇청소기 C05~C09 안내 — 제트봇 AI 적용 범위 미확인',
        publisher: '삼성전자서비스',
      },
      {
        url: 'https://www.samsung.com/sec/support/model/RF85C90D1AP/',
        title: 'RF85C90D1AP 정확한 모델 공식 사양·지원',
        publisher: '삼성전자',
      },
      {
        url: 'https://www.samsung.com/sec/support/model/RS84B5061M9/',
        title: 'RS84B5061M9 정확한 모델 공식 사양·지원',
        publisher: '삼성전자',
      },
    ],
  },

  LG: {
    reviewedBy: REVIEWED_BY,
    updatedAt: '2026-10-08',
    covers:
      '냉장고 코드는 LG의 제품군 공통 안내로 분리했으며 T873MEE111·S834MWW1D의 표시를 보증하지 않습니다. 2026-10-08에 LG 공통 안내 두 쪽을 다시 열어 보니 자연 해동 시간이 「에러코드 유형」은 최소 8시간, 「ER FF·ER rF」(2026-07-08 게시)는 최소 24시간으로 달라 두 값을 함께 적었습니다. 두 모델 지원 페이지의 공용 설명서(인쇄 15쪽)는 에러 표시 시 전원을 끄지 말고 서비스센터에 먼저 상담하도록 안내하며, 전원을 끄면 수리 기사가 고장 부분을 찾기 어렵다는 이유를 듭니다. dH는 정상 제상이 아닌 제상 이상이며, 코드만으로 고장 부품을 특정할 수 없습니다. WD523ACB 정수기의 필터 시기는 주황색 표시등으로 안내하고 확인되지 않은 E1·E2·E3·CL·UV 진단표를 제거했습니다. RO585HGH는 확인되지 않은 문구형 오류 대신 공식 R5 증상별 점검을 제품 분석에 남겼습니다.',
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
      {
        url: 'https://gscs-b2c.lge.com/open/downloadFile?fileId=jO7RH8OLgibKoMzZYJqKw',
        title: 'WD523A** 포함 데스크 정수기 공용 설명서, 인쇄 17·29·31~33쪽',
        publisher: 'LG전자',
      },
      {
        url: 'https://www.lge.co.kr/support/solutions-20153096346359',
        title: '코드제로 R5 충돌·범퍼·라이다 증상별 점검',
        publisher: 'LG전자',
      },
    ],
  },

  SKMagic: {
    reviewedBy: REVIEWED_BY,
    updatedAt: '2026-10-08',
    covers:
      'DWA-81R0D 설명서의 자가 진단표는 E2를 급수 이상, E3를 배수 이상, F1~F9를 기능 이상, tS·tO를 온도 감지 이상으로 나눕니다. 2026-10-08에 이 표와 SK매직 서비스센터의 코드별 FAQ를 다시 대조했습니다. F1은 설명서가 필터·급수 중간밸브를 들지만 FAQ는 내부 센서·누수·단선 감지로도 설명해, 거름망 확인 뒤 남으면 전원·밸브 차단 후 접수하도록 고쳤습니다. E4·F3·AU는 설명서 표에 없고 FAQ에 근거합니다. AU FAQ는 SK매직이 DWA81R0D 제품코드에 직접 연결해 두었지만, E4·F3 FAQ는 DWA 제품 대부분에 일괄 연결돼 있어 E4의 뜻은 FAQ 본문의 12인용 구분에 기댑니다. E5는 설명서 표에 없고 E5 FAQ가 연결한 19개 제품코드에도 DWA81R0D가 없어 2026-10-08 목록에서 뺐습니다. 같은 문자라도 계열마다 뜻이 달라 지금 실린 것은 12인용·터치온 계열 기준이며, dr은 이 모델의 근거가 없어 싣지 않습니다. WPU-A710C 정수기의 문구형 항목과 얼음정수기 계열(WPUIAC425·506·606)의 FLS·oPn·FLO·F:01·F:11·F:41은 이 제품 코드가 아닙니다.',
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
      {
        url: 'https://qr.skmagic.com/2019/model/WPU/WPUA710CRERO/Manual.htm',
        title: '올인원 직수 정수기 WPU-A710C 사용설명서',
        publisher: 'SK매직',
      },
    ],
  },

  Cuckoo: {
    reviewedBy: REVIEWED_BY,
    updatedAt: '2026-10-08',
    covers:
      '정확한 모델 CDW-A0611TW가 표기된 공식 설명서 인쇄 25쪽의 코드표와 대조했습니다. E1·E3·E4·E6~E7·ED·dr을 싣고, 이 모델 표에 없는 E2는 제거했습니다. E4의 뜻은 설명서대로 누수 및 기능점검이며 수위센서 고장으로 단정하지 않습니다. 사용자 확인 항목이 있는 E1·E3은 주의로, 설명서가 전원·중간밸브 차단 후 문의만 지시하는 E4·E6·E7·ED는 긴급으로 맞췄습니다. 서비스 번호 1588-8899는 같은 설명서 뒤표지의 서비스 문의 번호입니다.',
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
    covers:
      'S8 Pro Ultra와 Qrevo Curv의 정확한 모델별 공식 고객지원 문서에서 Error 1·4·5·13을 각각 대조했고, 2026-10-08 재확인 때 두 문서의 문구가 같아 두 모델의 안내를 하나로 합쳤습니다. 공식 문서에 없는 원인 추정(가구 밑 끼임, 반사 바닥재·직사광, 베어링 마모)은 지우고 문서의 확인 순서 — 레이저 센서 회전, 어두운 카펫, 브러시 장착 홈과 카펫 모드, 도크 표시등 — 로 바꿨습니다. Error 9는 필터 측면 자석 확인 안내에 맞췄습니다. 두 페이지는 Error 1·4·5·7·8·9·10·13·18을 같은 문구로 싣고 있어, 2026-10-08에 Qrevo Curv의 Error 9와 두 모델의 Error 7(바퀴)·10(필터 젖음·막힘)·18(팬 이물질)을 추가했습니다. Error 8은 원문이 무엇을 확인하라는지 주어가 빠져 있어 싣지 않았습니다. 두 모델의 설명서에는 번호별 오류 표가 없고, 공식 문서는 미국 지역판입니다. AS 전화 1566-5534는 로보락 코리아 서비스·보증 안내 페이지에서 확인했습니다. 다른 로보락 모델에서 같은 숫자가 다른 뜻으로 쓰일 수 있습니다.',
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
    covers:
      'CTH06QBW·CTH10QBW의 제조사 설명서는 외부 온도 0℃ 미만에서 F25 표시 가능성과 10초간 껐다 재시작하는 조치를 안내합니다. 다른 계열의 F25 센서 고장 설명은 두 모델에 적용하지 않았습니다. E1~E6/F1의 모델별 진단표와 실제 수리 결과는 확인되지 않았습니다.',
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
    covers:
      '2026-10-08에 저장된 원문으로 문장을 다시 대조해, 01~03·E001~E003의 "외부 조건 때문인 경우가 많다"는 빈도 단정과 원문에 없는 요금 미납 사례를 지우고 같은 번호에 과열 차단이 포함된다는 점을 넣었습니다. 07은 강풍 때만 반복되면 시공업체, 아니면 A/S센터로 접수처를 나눴습니다. 귀뚜라미 공식 자가진단의 가스보일러 6개 제품군을 다시 대조했습니다. 10은 거꾸로 IN AD의 센서와 IoT 콘덴싱의 송풍기, 98은 거꾸로IN·IIHi의 물 부족과 IoT 콘덴싱의 과열로 나눴습니다. 4번 타는의 물 부족은 95로 안내하며 대기 차단식의 수동 보충 조건을 구분했습니다. 97은 제품군별 원인 설명과 가스 누설 경보 조치가 함께 있어 외부 전화·전기 조작 중단을 우선합니다. AST의 E204·E214·E224·E234는 여전히 센서 제목과 송풍기 조치가 어긋나 있어 원인을 확정하지 않습니다. 기름·전기보일러는 다루지 않습니다.',
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
    covers:
      '2026-10-08에 나비엔하우스 자가진단 가이드의 가스보일러 항목 13건 원문을 모두 다시 열어 사이트 문구와 대조했습니다. 그 결과 E594·E615는 원문의 첫 조치인 보일러 전원 코드 재연결을 넣었고, Er50은 퇴수코크로 난방배관 동결을 확인하는 방법과 동결 가이드의 "언 채로 가동하면 소음·과열로 고장" 경고로 바꿨으며, Er407은 원문이 같은 증상을 07·08·E407로도 표시한다고 안내해 표기를 함께 적었습니다. 분배기·직수·가스 중간밸브는 원문대로 위치와 "배관과 일자면 열림, 직각이면 잠김"을 넣었습니다. 경동나비엔은 같은 고장을 세대별로 다르게 표시하므로(Er51과 E351이 같은 저수위, Er03·E3·E003이 같은 불착화) 확인된 표기를 함께 적었습니다. kdnavien.co.kr의 quickfix 주소는 검색 결과에 남아 있지만 지금은 모두 404이고, 자가진단은 공식몰 navienhouse.com으로 옮겨져 있습니다. 2026-10-07에는 Er02·Er03·Er51 세 항목의 공급 확인·밸브·동결·누수 조치를 다시 대조했습니다. 기름보일러는 Er02만 가스와 공통으로 확인했고 나머지는 다루지 않았습니다. 이 사이트는 보일러 제품을 다루지 않으므로 코드 안내만 제공합니다.',
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
