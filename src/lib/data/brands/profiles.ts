import type { BrandProfile } from '@/types/brand';

/**
 * 브랜드 프로필.
 *
 * 집필 순서가 정해져 있다 — LG·QCY를 먼저 써서 가장 큰 브랜드와 가장 작은 브랜드
 * 양극단에서 구조가 성립하는지 확인하고, 그 뒤 나머지를 3~4개씩 라운드로 검수받는다.
 * 한 번에 17개를 쏟아내지 않는다. 그것이 구글이 말하는 대량 생성 패턴이고,
 * 이 사이트가 애드센스에서 거절당한 이유와 같은 부류다.
 */
export const brandProfiles: BrandProfile[] = [
  {
    brand: 'LG',
    intro:
      'LG전자는 에어컨·세탁기·냉장고·청소기·공기청정기 등 생활가전 전 카테고리를 자체 라인업 브랜드로 나눠 판매한다. 라인업 이름은 카테고리별로 고정되어 있고, 오브제컬렉션은 특정 카테고리가 아니라 여러 제품군에 걸친 인테리어 디자인 컬렉션이다.',
    lines: [
      {
        name: '휘센',
        what: '에어컨과 제습기 라인. 스탠드·벽걸이 에어컨과 제습기가 이 이름으로 나온다.',
        categories: ['에어컨', '제습기'],
      },
      {
        name: '트롬',
        what: '세탁기·건조기·워시타워·워시콤보 라인.',
        categories: ['세탁기', '건조기'],
      },
      {
        name: '디오스',
        what: '냉장고·식기세척기·전자레인지·인덕션 등 주방 가전 라인.',
        categories: ['냉장고', '식기세척기'],
      },
      {
        name: '오브제컬렉션',
        what: '특정 카테고리가 아니라 에어컨·세탁기·냉장고·청소기·공기청정기 등 여러 제품군에 인테리어 디자인을 입힌 상위 라인이다. 휘센·트롬·디오스·퓨리케어·코드제로 제품에 함께 붙어 팔린다.',
      },
      {
        name: '퓨리케어',
        what: '공기청정기·정수기·가습기·서큘레이터(에어로타워) 등 공기·물 관련 라인.',
        categories: ['공기청정기', '정수기', '선풍기'],
      },
      {
        name: '코드제로',
        what: '로봇청소기·무선청소기 라인.',
        categories: ['로봇청소기'],
      },
    ],
    serviceCenter: {
      phone: '1544-7777',
      sourceUrl: 'https://www.lge.co.kr/support/notice-NTC20260806568003',
      note: 'LG전자 고객센터 대표번호. 전화상담·서비스 예약/접수 공용.',
    },
    errorCodePattern:
      '카테고리마다 표기 체계가 다르다. 에어컨은 "CH" 뒤에 두 자리 숫자를 스페이스로 구분해 붙이고(CH 01), 세탁기·건조기·식기세척기는 UE·OE·dE·IE처럼 대소문자를 섞은 알파벳 2~3자 약어를 쓰며, 로봇청소기는 코드 대신 "라이다(LDS) 센서 확인"처럼 점검 항목을 문장으로 표시한다.',
    editorNote:
      '카탈로그에 등록된 LG 제품은 에어컨·세탁기·건조기·냉장고·식기세척기·공기청정기·제습기·선풍기·정수기·로봇청소기·TV까지 11개 카테고리, 20개 모델로 가장 넓다. 오브제컬렉션이 붙은 제품이 다수를 차지해 인테리어 가전 수요가 카탈로그 구성에도 그대로 반영되어 있다.',
    sources: [
      {
        url: 'https://www.lge.co.kr/home',
        title: 'LGE.COM | LG전자',
        publisher: 'LG전자',
      },
      {
        url: 'https://www.lge.co.kr/support/notice-NTC20260806568003',
        title: '[안내] 8월 서비스센터 및 고객센터 휴무 안내',
        publisher: 'LG전자',
      },
    ],
    updated: '2026-08',
  },
  {
    brand: 'QCY',
    intro:
      'QCY는 중국의 무선이어폰 제조사로, 국내에는 공식 수입사 와이엘사이언스가 운영하는 QCY STORE를 통해 정식 유통된다. 카탈로그에는 ANC 탑재 중가형 모델 1종만 등록되어 있지만, 실제 라인업은 T·HT·CT 세 시리즈로 나뉘어 보급형부터 상위 모델까지 이어진다.',
    lines: [
      {
        name: 'T 시리즈',
        what: '가장 저변이 넓은 보급형 무선이어폰 라인이다. T13처럼 색상 다양화를 앞세운 모델, T41 같은 오픈형, T43 같은 ENC 통화 노이즈 저감 모델까지 폼팩터가 다양하며 매년 여러 모델이 나온다.',
        categories: ['무선이어폰'],
      },
      {
        name: 'HT 시리즈',
        what: 'ANC(노이즈캔슬링)를 탑재한 중가형 라인으로, 대부분 "멜로버즈(MeloBuds)"라는 제품명을 함께 쓴다. 카탈로그의 멜로버즈 프로(HT08, 공식 판매명은 멜로버즈 프로 플러스)를 비롯해 Hi-Res LDAC를 지원하는 HT10, HT16, HT20(MeloBuds NEO)이 이 시리즈다.',
        categories: ['무선이어폰'],
      },
      {
        name: 'CT 시리즈',
        what: '오픈형(귀찌형) 디자인의 상위 라인이다. 대표 모델 CT06은 블루투스 6.0을 지원하며, 러닝·자전거 등 운동 중 착용을 겨냥한 이어커프 형태다.',
        categories: ['무선이어폰'],
      },
    ],
    serviceCenter: {
      phone: '02-853-1107',
      sourceUrl: 'https://ylshop.co.kr/',
      note: '제조사 직영 A/S가 아니라 국내 공식 수입사(주식회사 와이엘사이언스)를 통한 A/S다. 전화 상담은 평일 오전 10시~오후 4시(점심시간 11:40~13:00 제외)만 운영한다.',
    },
    errorCodePattern: '무선이어폰이라 별도 에러코드 체계 없이, 전용 앱과 LED 점멸 패턴으로 상태를 안내한다.',
    editorNote:
      '카탈로그에는 멜로버즈 프로(HT08) 1종만 등록되어 있다. 4만원대에 LDAC·하이브리드 ANC를 넣은 가성비형 모델로, QCY 라인업 전체에서는 ANC를 탑재한 중가형 HT 시리즈, 그중에서도 "멜로버즈" 제품군에 해당한다.',
    sources: [
      {
        url: 'https://ylshop.co.kr/',
        title: 'QCY STORE',
        publisher: '와이엘사이언스',
      },
      {
        url: 'https://shop.coupang.com/ylscience/272978',
        title: 'QCY 정품 국내공식수입사',
        publisher: '와이엘사이언스',
      },
    ],
    updated: '2026-08',
  },
  {
    brand: 'Samsung',
    intro:
      '삼성전자는 냉장고·세탁기/건조기·청소기·에어컨 등 리빙가전 전반에 \'비스포크(Bespoke)\'라는 디자인 라인을 공통으로 씌워 판매한다. 그 아래에서 카테고리별 하위 라인 이름은 따로 붙는데, 세탁기·건조기 콤보는 \'Bespoke Grande AI\', 에어컨은 \'무풍\', 공기청정기는 \'Infinite AI\'·\'블루스카이\'로 나뉜다. 냉장고·세탁기건조기·청소기·에어컨 카테고리 페이지 모두 이런 라인 이름을 상단 필터 탭으로 두고 있어, 어느 라인인지는 제품 상세 페이지가 아니라 목록 단계에서부터 구분된다.',
    lines: [
      {
        name: '비스포크',
        what: '냉장고·세탁기/건조기·청소기·에어컨 등 여러 카테고리에 공통으로 붙는 디자인 라인이다. 냉장고 카테고리 페이지의 필터 탭은 "전체" 다음 자리에 "Bespoke AI"를 두고 있어, 삼성 냉장고 라인업의 사실상 기본값으로 자리 잡았다.',
        categories: ['냉장고', '세탁기', '건조기', '로봇청소기'],
      },
      {
        name: 'Bespoke Grande AI',
        what: '세탁기·건조기 상위 라인으로, 세탁기와 건조기를 위아래로 합친 콤보 제품에 주로 쓰인다. 공식 이벤트 페이지 주소에도 "bespoke-grande-ai"라는 이름이 그대로 들어간다.',
        categories: ['세탁기', '건조기'],
      },
      {
        name: '무풍',
        what: '에어컨 라인으로, "Bespoke AI 무풍콤보 갤러리 프로"·"무풍 윈도우핏"처럼 직접 바람 없이 냉방하는 제품 이름에 공통으로 들어간다.',
        categories: ['에어컨'],
      },
      {
        name: 'Infinite AI · 블루스카이',
        what: '공기청정기의 두 축이다. Infinite AI는 리유저블·S 필터를 함께 파는 상위 라인이고, 블루스카이는 그보다 낮은 가격대의 실속형 라인이다.',
        categories: ['공기청정기'],
      },
      {
        name: 'Bespoke AI 스팀',
        what: '로봇청소기 라인으로, 물걸레 자동 세척과 급배수 기능을 갖춘 상위 모델에 붙는다.',
        categories: ['로봇청소기'],
      },
    ],
    serviceCenter: {
      phone: '1588-3366',
      sourceUrl: 'https://www.samsung.com/sec/',
      note: '삼성닷컴 구매 문의(1588-6084)와는 다른, 제품/서비스/멤버십 공용 번호다.',
    },
    errorCodePattern:
      "카테고리마다 기본 틀은 'E' 뒤에 숫자 한 자리에서 세 자리를 붙이는 방식이지만 세부 규칙은 갈린다. 세탁기·건조기는 UE·tS·HC처럼 알파벳 2~3자만 쓰는 코드가 섞여 있고, 냉장고는 '22 E'처럼 숫자와 알파벳 사이를 띄어 쓰며, 로봇청소기는 코드 대신 '바퀴 끼임'처럼 증상을 문장으로 표시하기도 한다.",
    editorNote:
      '카탈로그에 등록된 삼성 제품은 에어컨·제습기·세탁기·건조기·공기청정기·냉장고·식기세척기·로봇청소기·TV·무선이어폰까지 10개 카테고리 17개 모델로, LG 다음으로 폭이 넓다. 비스포크 패널이 붙은 프리미엄 모델이 다수를 차지해 가격대가 전반적으로 높게 형성돼 있고, 위닉스·캐리어처럼 한두 카테고리에 집중한 브랜드와는 카탈로그 구성부터 다르다.',
    sources: [
      {
        url: 'https://www.samsung.com/sec/',
        title: 'Samsung 대한민국 | 모바일 | TV | 가전 | IT',
        publisher: '삼성전자',
      },
      {
        url: 'https://www.samsung.com/sec/washers-and-dryers/all-washers-and-dryers/',
        title: '세탁기 건조기 | Samsung 대한민국',
        publisher: '삼성전자',
      },
      {
        url: 'https://www.samsung.com/sec/air-conditioners/all-air-conditioners/',
        title: '에어컨 | Samsung 대한민국',
        publisher: '삼성전자',
      },
      {
        url: 'https://www.samsung.com/sec/air-cleaner/all-air-cleaner/',
        title: '공기청정기 | Samsung 대한민국',
        publisher: '삼성전자',
      },
      {
        url: 'https://www.samsung.com/sec/vacuum-cleaners/all-vacuum-cleaners/',
        title: '청소기 | Samsung 대한민국',
        publisher: '삼성전자',
      },
    ],
    updated: '2026-08',
  },
  {
    brand: 'Coway',
    intro:
      "코웨이는 정수기·공기청정기·제습기·비데 등을 구매와 렌탈 두 가지 방식으로 함께 파는 브랜드로, 국내 정수기·공기청정기 렌탈 시장에서 오래 자리 잡았다. 상위 라인에는 '노블'이라는 이름을 여러 카테고리에 공통으로 붙이고, 정수기는 얼음정수기 중심의 '아이콘' 라인을 따로 두고 있다. 코디(전속 방문관리 인력)를 통한 정기 관리가 렌탈 계약의 기본값이라, 다른 브랜드보다 서비스 접점이 촘촘한 편이다.",
    lines: [
      {
        name: '노블',
        what: '공기청정기·제습기·가습기·정수기에 걸쳐 붙는 상위 라인이다. 공기청정기 카테고리 페이지에는 "노블 시리즈"라는 필터 탭이 따로 있고, 노블 공기청정기2만 해도 53㎡부터 133㎡까지 평형별로 나뉜다.',
        categories: ['공기청정기', '제습기', '정수기'],
      },
      {
        name: '아이콘',
        what: '얼음정수기를 중심으로 한 정수기 라인이다. "아이콘 얼음정수기 미니·스탠다드·맥스·오리지널"이 현재 정수기 카테고리 판매 순위 1~4위를 차지하고 있다.',
        categories: ['정수기'],
      },
      {
        name: '스퀘어핏',
        what: '공기청정기의 슬림형 라인으로, 38㎡부터 82㎡까지 평형별 모델이 있고 노블보다 낮은 가격대를 겨냥한다.',
        categories: ['공기청정기'],
      },
    ],
    serviceCenter: {
      phone: '1588-5200',
      sourceUrl: 'https://www.coway.com/cs/main',
      note: '고객지원 페이지에 "고객센터 1588-5200, 긴급상담 365일 24시간"으로 안내돼 있고, 같은 페이지에서 A/S·이전설치 신청도 함께 접수한다.',
    },
    errorCodePattern:
      "공기청정기·제습기는 E1·FL·CF·C1처럼 알파벳 한두 글자와 숫자를 섞어 쓰는데, 정수기는 코드 대신 '누수 감지'·'온수 잠금'처럼 증상을 그대로 문구로 표시한다.",
    editorNote:
      '현재 공개 중인 코웨이 제품은 정수기 1종(한뼘 정수기 냉정 CHPI-7400N)이다. 저수조 없는 직수형에 정수와 냉수만 갖춘 컴팩트 모델로, 온수를 빼고 자리와 가격을 줄인 쪽에 서 있다. 나머지 모델은 모델번호를 확인하지 못해 공개를 보류했고, 이 제품의 시중가도 확인하지 못했다.',
    sources: [
      {
        url: 'https://www.coway.com/cs/main',
        title: '고객지원 | coway',
        publisher: '코웨이',
      },
      {
        url: 'https://www.coway.com/product/detail?prdno=1068',
        title: '노블 공기청정기2 (53㎡) - 코웨이 청정기/에어컨 | coway',
        publisher: '코웨이',
      },
      {
        url: 'https://www.coway.com/product/air-purifier-air-conditioner/all/all',
        title: '코웨이 청정기/에어컨 전체보기 | coway',
        publisher: '코웨이',
      },
      {
        url: 'https://www.coway.com/product/water-purifier/all/all',
        title: '코웨이 정수기 전체보기 | coway',
        publisher: '코웨이',
      },
    ],
    updated: '2026-08',
  },
  {
    brand: 'Winix',
    intro:
      "위닉스는 공기청정기와 제습기 두 카테고리에 집중하는 국내 생활가전 브랜드로, 코웨이·삼성보다 낮은 가격대에서 '방마다 한 대씩' 수요를 겨냥한다. 공기청정기는 '타워', 제습기는 '뽀송'이라는 이름을 각각 대표 라인으로 쓰고, 두 라인 모두 용량·평형별로 세분화된 모델을 여럿 낸다.",
    lines: [
      {
        name: '타워',
        what: '세로로 슬림한 공기청정기 라인이다. "타워엣지"·"타워엣지 컴팩트"·"타워프라임"·"타워프라임 플러스" 순으로 크기와 청정 면적이 커지며, 최상위 "타워프라임 플러스"는 37평형까지 담당한다.',
        categories: ['공기청정기'],
      },
      {
        name: '뽀송',
        what: '제습기 라인으로 12L부터 인버터 24L까지 용량별 모델이 있다. "인버터"가 붙은 모델(19L·21L·22L·24L)은 저소음·저전력 컴프레서를, 일반 모델(12L·17L·18L)은 낮은 가격을 겨냥한다.',
        categories: ['제습기'],
      },
    ],
    serviceCenter: {
      phone: '1544-5081',
      sourceUrl: 'https://www.winix.com/customer/product',
      note: '위닉스 고객만족센터 번호로 평일 09:00~18:00만 운영하고 주말·공휴일은 쉰다. 창문형 에어컨 설치 상담은 1670-3230으로 별도 운영된다.',
    },
    errorCodePattern:
      "공기청정기는 A1·A2·A3·C1·Cd처럼 알파벳(대소문자 혼용)에 숫자를 붙이고, 제습기는 E1·E2·DF·E3·CF 코드와 '만수 표시등' 같은 문구를 함께 쓴다.",
    editorNote:
      '현재 공개 중인 위닉스 제품은 제습기 1종(뽀송 16L)이다. 조사 시점 시중가는 38만원대로, 대형 브랜드 동급 모델보다 낮은 구간에 자리한다는 위닉스의 포지셔닝이 이 한 모델에도 드러난다. 공기청정기 라인은 모델번호를 확인하지 못해 공개를 보류했다.',
    sources: [
      {
        url: 'https://www.winix.com/customer/product',
        title: '위닉스 고객지원 - 제품 FAQ',
        publisher: '위닉스',
      },
      {
        url: 'https://www.winix.com/product/list/001',
        title: '공기청정기 | 위닉스',
        publisher: '위닉스',
      },
      {
        url: 'https://www.winix.com/product/list/003',
        title: '제습기 | 위닉스',
        publisher: '위닉스',
      },
    ],
    updated: '2026-08',
  },
  {
    brand: 'Carrier',
    intro:
      "캐리어는 1902년 에어컨을 발명한 미국 캐리어(Carrier)의 한국 브랜드로, 국내에서는 오텍캐리어가 판매와 서비스를 맡는다. 카탈로그와 공식 사이트 모두 에어컨에 집중돼 있고, 벽걸이·스탠드 상위 모델에는 '에어로'라는 이름을 공통으로 쓴다.",
    lines: [
      {
        name: '에어로',
        what: '18단으로 바람 세기를 조절하는 벽걸이·스탠드 공용 상위 라인이다. AI 쾌적제어(PMV)와 자체 AI 플랫폼 "AI MASTER"를 탑재했고, 공식 사이트는 이를 "국내 최초 AI플러스 인증"으로 소개한다.',
        categories: ['에어컨'],
      },
      {
        name: '디오퍼스(The Opus)',
        what: '에어로보다 상위인 프리미엄 스탠드 라인으로, 공식 사이트 배너에는 "The Opus+"라는 이름으로 소개된다. 스탠드형 목록에는 "디오퍼스 에어컨"이라는 제품명으로 등록돼 있다.',
        categories: ['에어컨'],
      },
    ],
    serviceCenter: {
      phone: '1588-8866',
      sourceUrl: 'https://www.carrier.co.kr/main',
      note: '"서비스 문의" 번호로, 제품 구매 상담(1588-8855)과는 다른 번호다.',
    },
    errorCodePattern:
      "'E'+숫자 한 자리(E1·E4·E5·E6)를 기본으로 쓰고, 냉매·배수 관련 이상은 CH·LC·EC·P0 같은 두 글자 코드로 따로 구분한다.",
    editorNote:
      '카탈로그에 등록된 캐리어 제품은 벽걸이 에어컨과 스탠드 에어컨 각 1종으로 총 2개 모델이다. 벽걸이는 69만원대 가성비형이고 스탠드는 189만원대로, 삼성·LG의 동급 20평형대 스탠드보다 100만원가량 저렴한 실속형 포지션을 카탈로그 안에서도 확인할 수 있다.',
    sources: [
      {
        url: 'https://www.carrier.co.kr/main',
        title: 'Carrier',
        publisher: '오텍캐리어',
      },
      {
        url: 'https://www.carrier.co.kr/product/productsByCtgCd?hrnkMenu=FPD0104',
        title: 'Carrier - 제품 리스트 (벽걸이형 에어컨)',
        publisher: '오텍캐리어',
      },
      {
        url: 'https://www.carrier.co.kr/product/productsByCtgCd?hrnkMenu=FPD0102',
        title: 'Carrier - 제품 리스트 (스탠드형 에어컨)',
        publisher: '오텍캐리어',
      },
    ],
    updated: '2026-08',
  },
  {
    brand: 'TCL',
    intro:
      "TCL은 중국 TCL그룹의 가전 브랜드로, 한국에는 TCL코리아가 TV·태블릿과 함께 벽걸이 에어컨을 공식 판매하지만 실제 유통은 쿠팡 중심이다. 카탈로그의 6평·9평형 벽걸이 두 종은 TCL 코리아 공식 사이트에 'Breeze IN 시리즈'로 등록돼 있고, 4.5평형 창문형 모델은 같은 사이트에 없이 쿠팡 전용으로만 유통된다.",
    lines: [
      {
        name: 'Breeze IN 시리즈',
        what: '직바람을 줄인 벽걸이 에어컨 라인이다. TCL 코리아 공식 사이트에 6평형·9평형 모델이 이 이름으로 게재돼 있고, "부드러운 바람"과 "자동 세척 기능"을 공통 특징으로 내세운다.',
        categories: ['에어컨'],
      },
    ],
    serviceCenter: {
      phone: '1577-2420',
      sourceUrl:
        'https://solutions.coupang.com/hc/ko/articles/58375688262681--TCL-창문형-에어컨-에어컨-작동-시-오류-알림(에러코드)-해결-방법을-알고-싶어요',
      note: 'TCL 본사나 국내 총판이 아니라 쿠팡의 A/S 기술지원센터로 연결되는 번호다. TCL 코리아 공식 사이트(tcl.com/kr)에는 전화번호 없이 문의 폼만 있고, 카탈로그의 TCL 에어컨 3종 모두 쿠팡에서만 판매된다.',
    },
    errorCodePattern:
      "벽걸이 모델은 'E' 뒤에 숫자 한 자리(E0~E6)를 기본으로 쓰고 냉매 이상은 F0, 컴프레서 보호정지는 P4처럼 별도 코드를 쓰는데, 창문형 모델은 EA·EE·EC처럼 E 뒤에 알파벳을 붙이는 코드도 함께 쓴다.",
    editorNote:
      '현재 공개 중인 TCL 제품은 벽걸이 에어컨 2종(6평형 TAC-08CSD, 9평형 TAC-12CSD)이다. 조사 시점 시중가가 각각 44만원대와 50만원대로, 국산 동급 대비 낮은 가격을 앞세운 구간에 있다. 다만 두 모델 모두 에너지소비효율 4등급이고, A/S가 브랜드 직영이 아니라 유통 채널을 경유한다는 점은 구매 전에 확인할 항목이다. 창문형 등 나머지 모델은 모델번호를 확인하지 못해 공개를 보류했다.',
    sources: [
      {
        url: 'https://www.tcl.com/kr/ko/air-conditioners/tac-08csd-tph11i',
        title: 'TCL 18.7㎡인버터 벽걸이 에어컨 TAC-08CSD/TPH11I - TCL Korea',
        publisher: 'TCL코리아',
      },
      {
        url: 'https://www.tcl.com/kr/ko/air-conditioners',
        title: 'TCL Air Conditioners',
        publisher: 'TCL코리아',
      },
      {
        url: 'https://solutions.coupang.com/hc/ko/articles/58375688262681--TCL-창문형-에어컨-에어컨-작동-시-오류-알림(에러코드)-해결-방법을-알고-싶어요',
        title: '[TCL / 창문형 에어컨] 에어컨 작동 시 오류 알림(에러코드) 해결 방법을 알고 싶어요',
        publisher: '쿠팡',
      },
    ],
    updated: '2026-08',
  },
  {
    brand: 'Haier',
    intro:
      "하이얼은 세계 가전 판매량 1위를 내세우는 중국 브랜드로, 한국에서는 하이얼코리아가 고객센터를 직접 운영한다. 카탈로그에는 셀프클리닝 벽걸이 에어컨과 미니 냉장고·미니 세탁기가 올라 있는데, 에어컨은 공식 사이트의 'Self-Cleaning' 라인과 이름이 일치하지만 미니 냉장고는 하이얼코리아가 내세우는 '컨버터블'·'레트로'·'글램글라스' 냉장고 라인 어디에도 명시적으로 속하지 않는 별도 보급형 모델이다.",
    lines: [
      {
        name: 'Self-Cleaning(셀프클리닝)',
        what: '벽걸이 에어컨 라인으로, 하이얼코리아 공식 사이트 홈에 "6·8·10평형 맞춤 선택"으로 소개된다. 냉각→해동→건조 3단계로 열교환기 내부를 자동 세척하는 기능이 라인 이름의 유래다.',
        categories: ['에어컨'],
      },
      {
        name: '컨버터블 · 레트로 · 글램글라스',
        what: '하이얼코리아 냉장고 라인으로, 공식 사이트 홈에 김치냉장고 컨버터블 라인, 레트로 감성의 미니 냉장고, 4도어 글램글라스가 각각 소개돼 있다. 보급형 소형 모델 중에는 공식 사이트에서 라인 소속이 확인되지 않는 것도 있다.',
        categories: ['냉장고'],
      },
    ],
    serviceCenter: {
      phone: '1588-6645',
      sourceUrl:
        'https://www.haier.co.kr/board/board_center/board_list.asp?scrID=0000000228&pageNum=3&subNum=4&ssubNum=1',
      note: '하이얼코리아 고객센터 번호로, 총판이나 수입사가 아니라 한국 법인이 직접 운영한다. 토요일·일요일·공휴일은 휴무이며 이 경우 콜백 시스템으로 접수된다.',
    },
    errorCodePattern:
      "에어컨·세탁기는 'E' 뒤에 숫자 한 자리(E1~E6)를 기본으로 쓰지만, 같은 저압·냉매 부족 보호 증상도 모델마다 표기가 다르다 — 6평형은 E3와 별도로 F1을 냉매 순환 이상 전용 코드로 두는데, 10평형은 F1 없이 같은 증상을 E3 하나로만 표기한다. 냉장고는 E0~E2 숫자 코드와 EH·Fr·FD 같은 알파벳 코드를 섞어 쓴다.",
    editorNote:
      '현재 공개 중인 하이얼 제품은 벽걸이 에어컨 2종(6평형 CTH06QBW, 10평형 CTH10QBW)이다. 조사 시점 시중가가 41만원대와 56만원대로 TCL과 함께 최저가 구간을 형성한다. 다만 6평형은 에너지소비효율 5등급, 10평형은 4등급이라 오래 켜 두는 방에서는 초기 가격 이점이 전기요금으로 상쇄될 수 있다. 미니 냉장고·세탁기 등 나머지 모델은 모델번호를 확인하지 못해 공개를 보류했다.',
    sources: [
      {
        url: 'https://www.haier.co.kr/',
        title: '하이얼코리아 공식 홈페이지',
        publisher: '하이얼코리아',
      },
      {
        url: 'https://www.haier.co.kr/board/board_center/board_list.asp?scrID=0000000228&pageNum=3&subNum=4&ssubNum=1',
        title: '고객센터 안내',
        publisher: '하이얼코리아',
      },
    ],
    updated: '2026-08',
  },
  {
    brand: 'Shinil',
    intro:
      "신일전자는 1959년 설립된 국내 생활가전 제조사로, 선풍기·계절가전을 직영 공식몰과 자체 고객센터로 판매·지원한다. 공식 사이트는 선풍기를 브랜드 마케팅용 시리즈명이 아니라 '지상용·천장용·DC팬·소형팬·타워팬' 같은 형태별 카테고리로만 분류하고 있어, 카탈로그의 두 모델도 이 분류 체계 안에서 설명하는 편이 정확하다.",
    lines: [
      {
        name: 'DC팬',
        what: '신일전자 공식 사이트가 선풍기를 분류하는 카테고리 중 하나로, BLDC(DC) 모터를 쓰는 저소음·저전력 모델을 묶는다. 브랜드 시리즈 이름이 아니라 사이트 상품 분류명이다.',
        categories: ['선풍기'],
      },
    ],
    serviceCenter: {
      phone: '1577-6667',
      sourceUrl: 'https://www.shinil.co.kr/',
      note: '신일전자 홈페이지 하단에 "TEL : 1577-6667(통화요금 발신자부담)"으로 직접 게재된, 국내 제조사가 직영하는 번호다.',
    },
    errorCodePattern: "선풍기 두 모델 모두 'E' 뒤에 숫자 한 자리(E1~E6)를 붙이는 코드 체계를 쓴다.",
    editorNote:
      '카탈로그에 등록된 신일 제품은 선풍기 2종뿐이다. 12만원대 BLDC 스탠드형은 리모컨·12단 풍량·자연풍 모드로 거치형 수요를, 5만원대 무선 충전식은 8000mAh 배터리와 USB-C 충전으로 콘센트 없는 캠핑·차박 수요를 나눠 맡아 같은 카테고리 안에서도 두 모델의 용도가 겹치지 않는다.',
    sources: [
      {
        url: 'https://www.shinil.co.kr/',
        title: '신일전자',
        publisher: '신일전자',
      },
      {
        url: 'https://www.shinil.co.kr/ko/product/product_list.html?c_id=A',
        title: '선풍기 | 신일전자',
        publisher: '신일전자',
      },
    ],
    updated: '2026-08',
  },
  {
    brand: 'Xiaomi',
    intro:
      '샤오미는 중국 스마트 가전 브랜드로, 한국에는 샤오미테크놀로지코리아가 mi.com/kr 공식 스토어를 운영하며 070-8015-1154 번호로 A/S를 직접 접수한다. 다만 카탈로그의 로봇청소기 X10처럼 공식 스토어에 없는 병행수입 제품은 이 공식 A/S 대상에서 벗어날 수 있어, 같은 브랜드 안에서도 구매 경로에 따라 A/S 여부가 갈린다.',
    lines: [
      {
        name: 'Xiaomi Mijia(미지아)',
        what: '샤오미 본사의 생활가전 서브브랜드로, mi.com/kr 공식 스토어에도 "Xiaomi Mijia 스탠딩 선풍기"처럼 제품명에 그대로 쓰인다.',
        categories: ['선풍기'],
      },
    ],
    serviceCenter: {
      phone: '070-8015-1154',
      sourceUrl: 'https://www.mi.com/kr/support/warranty/',
      note: 'mi.com/kr 공식 스토어와 정식 유통 제품에 적용되는 번호다. 병행수입으로 유통된 제품은 이 공식 채널의 보증 대상이 아닐 수 있다.',
    },
    errorCodePattern:
      "선풍기·공기청정기는 'E' 뒤에 숫자 한 자리를 붙이는 흔한 방식을 쓰지만, 로봇청소기는 알파벳을 줄이지 않고 'Error' 뒤에 숫자를 그대로 붙이는 표기를 쓴다.",
    editorNote:
      '샤오미는 같은 카테고리 안에서도 보급형과 상위 모델의 가격·기능 격차를 크게 벌려 놓는 구성을 쓴다. 국내에는 정식 유통과 병행수입이 섞여 들어와 같은 이름의 제품이라도 보증 조건이 다를 수 있어, 구매 채널을 함께 확인해야 한다.',
    sources: [
      {
        url: 'https://www.mi.com/kr/support/warranty/',
        title: '지원 - 보증 | Xiaomi Korea',
        publisher: '샤오미테크놀로지코리아',
      },
      {
        url: 'https://www.mi.com/kr/',
        title: 'Xiaomi® Korea | Xiaomi 공식 웹사이트',
        publisher: '샤오미테크놀로지코리아',
      },
    ],
    updated: '2026-08',
  },
  {
    brand: 'SKMagic',
    intro:
      'SK매직은 정수기·공기청정기·식기세척기·비데 등을 렌탈(구독)과 일시불 구매로 함께 파는 브랜드로, 운영법인은 2026년 현재 SK매직에서 SK인텔릭스(주)로 바뀌었지만 제품에는 SK매직 상표를 그대로 쓴다. SK매직몰(공식 쇼핑몰)은 정수기를 하나의 마케팅 시리즈로 묶지 않고 얼음 정수기·직수 정수기·대용량 정수기라는 사이트 상품 분류로 나눈 뒤, 제품마다 MEGA ICE·투워터처럼 다른 이름을 붙인다. 반면 식기세척기는 터치온(TouchOn)이라는 이름을 여러 모델에 공통으로 쓴다.',
    lines: [
      {
        name: '터치온(TouchOn)',
        what: '식기세척기 라인 이름이다. SK매직몰 검색 결과에 "(12인용) 터치온 식기세척기"와 "프리미엄 파워워시 식기세척기 TouchOn UV"가 함께 걸려 있어, 한 모델만이 아니라 여러 모델에 걸쳐 쓰이는 이름임을 확인했다.',
        categories: ['식기세척기'],
      },
      {
        name: '얼음 정수기 · 직수 정수기(상품 분류)',
        what: 'SK매직몰은 정수기를 하나의 시리즈 브랜드로 묶지 않고, 얼음 정수기·직수 정수기·대용량 정수기라는 사이트 상품 분류 아래 MEGA ICE·투워터·원코크 플러스·초소형처럼 제품마다 다른 이름을 붙인다. 카탈로그의 올인원 직수 냉온정수기·슈퍼 정수기 얼음은 이 분류 체계에 있던 이전 세대 제품으로, 지금 SK매직몰 검색에서는 나오지 않는다.',
        categories: ['정수기'],
      },
    ],
    serviceCenter: {
      phone: '1600-1661',
      sourceUrl: 'https://www.skintellixservice.com/web/main/main.do',
      note: 'SK매직몰은 이 번호를 "구독계약상담 및 문의"로 표기하지만, SK매직 서비스센터(SK인텔릭스서비스)의 FAQ·ARS 안내는 같은 1600-1661번을 정수기 이전설치·고장 상담 같은 실제 A/S 접수 창구로도 함께 안내한다. 렌탈 계약 문의와 수리 접수가 창구부터 나뉘어 있지 않다는 뜻이다.',
    },
    errorCodePattern:
      '식기세척기는 E1·E2·E4처럼 E 뒤에 숫자를 붙이거나 dr(도어)·F5(거품)·t5/t0(온도)처럼 알파벳과 숫자를 섞어 쓰는데, 정수기 2종은 이런 코드 없이 "필터 교체 알림"·"누수 감지"·"온수 히터 이상"처럼 증상을 그대로 문구로 표시한다.',
    editorNote:
      '현재 공개 중인 SK매직 제품은 식기세척기 1종(터치온 12인용 DWA-81R0D)과 정수기 1종(올인원 직수 냉온정수기 WPU-A710C)으로 2개 모델, 2개 카테고리다. 정수기는 필터를 직접 갈아 끼우는 자가관리로 방문관리 비용을 덜어 낸 쪽이고, 식기세척기는 70도 이상 고온 살균과 세척 후 자동 문열림 건조를 갖춘 국산 12인용이다. 두 제품 모두 시중가는 확인하지 못했다. 얼음 겸용 정수기 등 나머지 모델은 모델번호를 확인하지 못해 공개를 보류했다.',
    sources: [
      {
        url: 'https://www.skmagic.com/',
        title: 'SK매직몰',
        publisher: 'SK인텔릭스',
      },
      {
        url: 'https://www.skmagic.com/customer/indexCustomer',
        title: '고객지원 | SK매직몰',
        publisher: 'SK인텔릭스',
      },
      {
        url: 'https://www.skintellixservice.com/web/main/main.do',
        title: 'SK인텔릭스서비스',
        publisher: 'SK인텔릭스',
      },
      {
        url: 'https://www.skmagic.com/goods/indexGoodsList?dispClsfNo=100000005&mstDispClsfNo=100000003&dispLvl=2&menuNo=1001',
        title: '정수기 추천 목록, 가격 비교 | 정수기 | SK매직몰',
        publisher: 'SK인텔릭스',
      },
      {
        url: 'https://www.skmagic.com/search/searchResult?searchType=recent&srchWord=%EC%8B%9D%EA%B8%B0%EC%84%B8%EC%B2%99%EA%B8%B0&srchWordBefore=',
        title: '검색 결과 | SK매직몰',
        publisher: 'SK인텔릭스',
      },
    ],
    updated: '2026-08',
  },
  {
    brand: 'Cuckoo',
    intro:
      '쿠쿠는 밥솥으로 잘 알려진 국내 가전사로, 정수기·비데는 렌탈(구독) 위주로 팔고 식기세척기는 일시불 구매로 판매한다. 고객센터도 이 구조를 그대로 따라가 렌탈 고객 서비스(1577-0010)와 일반 구매 제품 A/S(1588-8899)를 처음부터 분리해 운영한다. 정수기 라인 중 하나인 인스퓨어는 지금도 셀프 직수 얼음정수기로 판매되고, 식기세척기는 최근 스팀샷이라는 이름의 고온 스팀 살균 모델을 앞세운다.',
    lines: [
      {
        name: '인스퓨어',
        what: '정수기 라인 이름 중 하나다. 쿠쿠몰에는 "인스퓨어셀프직수얼음정수기"(CP-SS011WSV)가 지금도 판매 중이며, 저수조 없이 그때그때 걸러내는 직수형과 코크·유로 UV살균을 공통 특징으로 내세운다.',
        categories: ['정수기'],
      },
      {
        name: '스팀샷',
        what: '식기세척기 최신 라인이다. "쿠쿠 스팀샷 식기세척기(14인용)"·"120도 스팀 살균 14인용 글라스도어 식기세척기"가 지금 쿠쿠몰의 대표 모델이며, 카탈로그의 6인용 식탁형·12인용 모델은 이 스팀샷 세대 이전 제품으로 보이고 쿠쿠몰에서 같은 모델명은 확인되지 않는다.',
        categories: ['식기세척기'],
      },
    ],
    serviceCenter: {
      phone: '1588-8899',
      sourceUrl: 'https://www.cuckoo.co.kr/customer',
      note: '쿠쿠는 렌탈(구독) A/S·설치·점검(1577-0010)과 일반 구매 제품 A/S(1588-8899)를 창구부터 분리해 운영한다. 카탈로그의 식기세척기·정수기 3종은 모두 구매 가격이 매겨진 일반 구매 제품이라 구매 서비스 번호를 확인해 실었다.',
    },
    errorCodePattern:
      '식기세척기는 E1부터 E7까지의 숫자 코드에 ED·dr 같은 알파벳 코드를 더해 쓰지만, 번호가 모델 간에 그대로 대응하지는 않는다 — E4는 6인용 식탁형에서는 수위센서 오류를 가리키는데 12인용 빌트인 겸용에서는 누수 감지(워터가드)를 가리키고, 수위센서 오류는 12인용에서 E5로 번호가 옮겨간다. 정수기 인스퓨어 아이스는 같은 E-코드(E1·E3·E5) 사이에 PL(온수 잠금)·UV(살균 모듈)처럼 숫자 없이 알파벳만 쓰는 코드와 "필터 교체 알림등" 같은 문구형 알림이 섞여 있다.',
    editorNote:
      '현재 공개 중인 쿠쿠 제품은 식기세척기 1종(6인용 식탁형 CDW-A0611TW)이다. 조사 시점 시중가 39만원대로, 빌트인 배관 공사 없이 조리대에 올려 쓰는 카운터탑 형태다. 수도 직결과 물탱크 급수를 모두 지원해 수도 분기가 불가능한 전월세에서도 설치된다는 점이 이 제품의 실질적인 강점이다. 12인용 빌트인과 정수기 라인은 모델번호를 확인하지 못해 공개를 보류했다.',
    sources: [
      {
        url: 'https://www.cuckoo.co.kr/',
        title: 'CUCKOO',
        publisher: '쿠쿠전자',
      },
      {
        url: 'https://www.cuckoo.co.kr/customer',
        title: '고객지원 | CUCKOO',
        publisher: '쿠쿠전자',
      },
      {
        url: 'https://www.cuckoo.co.kr/rental/productList?cateUid=223',
        title: '얼음 정수기 | 쿠쿠렌탈',
        publisher: '쿠쿠전자',
      },
      {
        url: 'https://www.cuckoo.co.kr/mall/productList?categoryCd=73',
        title: '식기세척기 | 쿠쿠몰',
        publisher: '쿠쿠전자',
      },
    ],
    updated: '2026-08',
  },
  {
    brand: 'Roborock',
    intro:
      '로보락은 중국 로봇청소기 제조사로, 한국에는 주식회사 로보락 코리아가 kr.roborock.com 공식 스토어와 A/S를 직접 운영한다. 라인업은 최상위 Saros, 물걸레·문턱 주파력에 강한 Qrevo, 그 아래 S8 시리즈로 나뉘는데, 카탈로그의 S8 프로 울트라는 이 S8 Pro 시리즈에 속했던 모델로 현재 공식 사이트에는 같은 모델명 페이지가 남아 있지 않다. 반면 Qrevo Curv는 지금도 공식 스토어에서 그대로 판매 중이다.',
    lines: [
      {
        name: 'Qrevo',
        what: '문턱·단차 주파력과 물걸레 청소를 앞세운 상위 라인이다. 공식 사이트에 Qrevo Curv·Qrevo Curv 2 Flow·Qrevo Edge 2·Qrevo C 등 여러 모델이 걸려 있고, 카탈로그의 Qrevo Curv도 이 라인의 현재 판매 모델이다.',
        categories: ['로봇청소기'],
      },
      {
        name: 'S8 시리즈',
        what: 'Saros(최상위)와 Qrevo 아래에 있는 라인으로, 공식 사이트의 "Roborock S8 Pro 시리즈" 페이지에는 S8 Pro·S8 Pro+가 올라 있다. 카탈로그의 S8 프로 울트라는 이 시리즈에 속했던 모델명이지만 같은 URL 패턴(roborock-s8-pro-ultra)으로 접속하면 홈으로 넘어가, 지금은 판매 목록에서 빠진 것으로 보인다.',
        categories: ['로봇청소기'],
      },
    ],
    serviceCenter: {
      phone: '1566-5534',
      sourceUrl: 'https://kr.roborock.com/pages/roborock-service-warranty',
      note: '서비스 및 보증 페이지에 "AS 전화 문의 1566 5534"로 명시된, 주식회사 로보락 코리아가 직접 운영하는 번호다.',
    },
    errorCodePattern:
      '두 모델 모두 "Error" 뒤에 숫자를 붙이는 표기를 쓰는데, 겹치는 기능은 같은 번호를 쓴다 — 라이다 센서 막힘은 둘 다 Error 1, 낭떠러지 센서 오류는 둘 다 Error 4, 충전 실패는 둘 다 Error 13이다. 반면 S8 프로 울트라에만 있는 범퍼·바퀴·먼지통·배터리 오류는 Error 2·3·9·12로, Qrevo Curv에만 있는 회전 물걸레·물탱크 오류는 Error 15·21로 따로 번호를 매긴다.',
    editorNote:
      '현재 공개 중인 로보락 제품은 로봇청소기 2종으로, S8 프로 울트라(조사 시점 177만원대)와 Qrevo Curv(시중가 확인하지 못함) 모두 흡입·물걸레·유지관리를 도크가 알아서 처리하는 올인원 스테이션 구성이다. 두 모델의 차이는 물걸레 방식에 있는데, S8 프로 울트라는 음파진동으로 문지르고 Qrevo Curv는 듀얼 회전판을 돌려 닦으며 몸체를 들어 올려 문턱까지 넘는 AdaptiLift 섀시를 더 얹었다.',
    sources: [
      {
        url: 'https://kr.roborock.com/',
        title: 'Roborock South Korea | 로보락',
        publisher: '로보락 코리아',
      },
      {
        url: 'https://kr.roborock.com/pages/roborock-service-warranty',
        title: '서비스 및 보증 | Roborock South Korea',
        publisher: '로보락 코리아',
      },
      {
        url: 'https://kr.roborock.com/pages/roborock-s8-pro-series',
        title: 'Roborock S8 Pro 시리즈 - 타협하지 않는 우수함 | Roborock South Korea',
        publisher: '로보락 코리아',
      },
      {
        url: 'https://kr.roborock.com/pages/roborock-qrevo-curv',
        title: 'Roborock Qrevo Curv - 엉킴 없는 청소, 간편한 우아함 | Roborock South Korea',
        publisher: '로보락 코리아',
      },
    ],
    updated: '2026-08',
  },
  {
    brand: 'Dyson',
    intro:
      '다이슨은 영국의 가전 제조사로, 한국에는 다이슨 코리아가 공식몰과 A/S를 직접 운영하며 고객센터는 유료(1588-4253)와 수신자부담(080-300-4253) 두 번호를 함께 안내한다. 선풍기·공기청정기 라인은 최근 이름이 크게 바뀌었는데, 카탈로그의 퓨어쿨(TP07)이 속했던 "퓨어쿨"이라는 이름은 현재 다이슨 공식몰 상품 목록에서 확인되지 않고, 대신 허쉬젯·파인드+팔로우·빅+콰이엇 같은 새 이름의 제품이 그 자리를 채우고 있다. 다만 핫앤쿨(HP09가 속한 라인)은 지금도 판매 중이다.',
    lines: [
      {
        name: '핫앤쿨(Hot+Cool)',
        what: '냉방·난방·공기청정을 한 대에 담은 라인이다. 다이슨 공기청정기 카테고리 페이지에 "다이슨 핫앤쿨 공기청정기 HP2"가 올라 있어, 카탈로그의 HP09가 속했던 라인이 지금도 이어지고 있음을 확인했다. 다만 현재 판매 모델명은 HP2로 HP09보다 뒤 세대다.',
        categories: ['선풍기'],
      },
      {
        name: '퓨어쿨(단종 추정)',
        what: '카탈로그의 TP07이 속했던 날개 없는 타워팬 겸 공기청정기 라인이다. 다이슨 공기청정기·선풍기 카테고리 페이지 어디에도 "퓨어쿨"이라는 이름이 남아 있지 않아, 허쉬젯·파인드+팔로우 같은 후속 라인으로 대체된 것으로 보인다.',
        categories: ['선풍기'],
      },
    ],
    serviceCenter: {
      phone: '1588-4253',
      sourceUrl: 'https://www.dyson.co.kr/support/support-home',
      note: '유료 1588-4253과 수신자부담 080-300-4253 두 번호를 함께 안내하며, 평일 오전 9시~오후 6시만 운영하고 주말은 쉰다.',
    },
    errorCodePattern:
      '두 모델 모두 필터 알림은 F(교체 시기)·F2(미장착)로 같고 본체 이상은 E로 표시하지만, 세부 코드는 기능 차이만큼 갈린다 — Wi-Fi 연결 오류가 TP07은 CL, HP09는 CN으로 다르고, HP09에는 난방 과열을 감지하는 HH가 따로 있는 대신 TP07에만 있는 모터 회전 이상 코드 U1은 HP09에 없다.',
    editorNote:
      '현재 공개 중인 다이슨 제품은 선풍기(공기청정기 겸용) 2종으로, 조사 시점 52만원대 퓨어쿨 TP07과 73만원대 퓨어 핫앤쿨 HP09 모두 날개 없는 에어 멀티플라이어 송풍과 HEPA H13 필터를 공유한다. 20만원가량의 가격 차이가 향하는 곳은 난방 기능인데, 정격 소비전력이 TP07 40W와 HP09 2,200W로 55배 벌어진다. 난방을 얼마나 쓰느냐가 유지비를 가르는 핵심 변수라는 사실이 이 한 줄에 드러난다.',
    sources: [
      {
        url: 'https://www.dyson.co.kr/',
        title: '다이슨 공식몰 | 다이슨 코리아',
        publisher: '다이슨코리아',
      },
      {
        url: 'https://www.dyson.co.kr/support/support-home',
        title: '다이슨 고객 지원 | 다이슨 | www.dyson.co.kr',
        publisher: '다이슨코리아',
      },
      {
        url: 'https://www.dyson.co.kr/products/air-quality/air-quality-purifiers',
        title: '공기청정기 | 다이슨 | www.dyson.co.kr',
        publisher: '다이슨코리아',
      },
      {
        url: 'https://www.dyson.co.kr/products/air-quality/fans-and-heaters',
        title: '선풍기 - 공기청정기 및 선풍기 - 제품',
        publisher: '다이슨코리아',
      },
    ],
    updated: '2026-08',
  },
  {
    brand: 'Apple',
    intro:
      '애플은 에어팟 제품군을 apple.com/kr 공식몰과 리테일 매장에서 직접 판매하고, A/S는 소니·삼성처럼 지역 서비스센터를 두는 대신 Genius Bar와 "Apple 공인 서비스 제공업체(AASP)"라는 위탁 수리망으로 처리한다. 카탈로그에는 에어팟 프로 3세대 1종만 올라 있지만, 실제 제품군은 기본형 에어팟·에어팟 프로·에어팟 맥스 세 갈래로 나뉘고 각 갈래 안에서도 세대가 갈린다.',
    lines: [
      {
        name: 'AirPods(에어팟)',
        what: '보급형 인이어 라인이다. 공식 사이트에는 199,000원부터 시작하는 기본형과 액티브 노이즈 캔슬링을 더한 269,000원 모델(AirPods 4)로 나뉘어 있다.',
        categories: ['무선이어폰'],
      },
      {
        name: 'AirPods Pro(에어팟 프로)',
        what: '카탈로그의 에어팟 프로 3(369,000원)이 속한 인이어 상위 라인이다. AirPods Pro 3까지 3세대를 거치며 액티브 노이즈 캔슬링과 심박수 센서·청력 보조 같은 헬스 기능이 이 라인에만 먼저 들어온다.',
        categories: ['무선이어폰'],
      },
      {
        name: 'AirPods Max(에어팟 맥스)',
        what: '오버이어 헤드폰 라인으로, 최신 모델 AirPods Max 2는 849,000원으로 에어팟 제품군 중 가장 비싸다. 인이어형인 프로·기본형과 폼팩터 자체가 다르다.',
        categories: ['무선이어폰'],
      },
    ],
    serviceCenter: {
      phone: '080-333-4000',
      sourceUrl: 'https://support.apple.com/ko-kr/106932',
      note: '전화 문의는 이 번호로 받지만, 실제 하드웨어 수리는 전화가 아니라 getsupport.apple.com 온라인 절차로 접수해 Genius Bar나 Apple 공인 서비스 제공업체(AASP) 매장에 방문하는 방식이 기본이다. AASP는 자체적으로 서비스 요금을 책정할 수 있다고 애플 공식 페이지에 명시돼 있다.',
    },
    editorNote:
      '현재 공개 중인 애플 제품은 에어팟 프로 3(조사 시점 369,000원) 1종으로, 기본형(199,000원부터)과 맥스(849,000원) 사이 가운데 가격대에 위치한다. H2 칩 기반 노이즈 캔슬링과 심박수 센서·청력 보조를 갖췄지만 초기 사용자 사이에서는 폼팁 접착 불량과 왼쪽 유닛 연결 문제가 반복 보고되어, 커뮤니티에서는 AppleCare+ 동시 가입을 권하는 여론이 우세하다.',
    sources: [
      {
        url: 'https://support.apple.com/ko-kr/106932',
        title: 'Apple 지원에 문의하기',
        publisher: 'Apple 공식 지원',
      },
      {
        url: 'https://www.apple.com/kr/airpods/',
        title: 'AirPods - Apple (KR)',
        publisher: 'Apple',
      },
      {
        url: 'https://support.apple.com/ko-kr/airpods/repair?services=service',
        title: 'AirPods을 위한 Apple 서비스, 수리 및 교체',
        publisher: 'Apple 공식 지원',
      },
    ],
    updated: '2026-08',
  },
  {
    brand: 'Sony',
    intro:
      '소니는 한국 법인 소니코리아(주)가 별도 수입사 없이 판매와 A/S를 직접 운영한다. 헤드폰·이어폰은 모델 코드 앞자리로 계열이 갈리는데, 오버이어형은 WH-, 완전무선 이어폰은 WF-로 시작하고 그중 최상위 노이즈 캔슬링 라인에는 "1000X Series"라는 이름이 공통으로 붙는다. 카탈로그의 WF-1000XM5는 이 1000X 시리즈의 완전무선 쪽 모델이다.',
    lines: [
      {
        name: '1000X Series(WH-/WF-)',
        what: '오버이어(WH-1000XM6)와 완전무선(WF-1000XM5) 두 폼팩터에 걸쳐 붙는 노이즈 캔슬링 플래그십 라인이다. 카탈로그의 WF-1000XM5도 이 라인의 완전무선 쪽 모델이며, 소니 공식몰에는 후속작 WH-1000XM6이 619,000원에 판매 중이다.',
        categories: ['무선이어폰'],
      },
      {
        name: 'LinkBuds',
        what: '오픈이어형 라이프스타일 라인이다. 공식몰에 LinkBuds Clip처럼 귀를 막지 않고 하루 종일 착용하는 데 초점을 맞춘 모델이 올라 있어, 차음을 우선하는 1000X 시리즈와 성격이 다르다.',
      },
      {
        name: 'INZONE',
        what: '게이밍 전용 오디오 라인으로, 무선 노이즈 캔슬링 게이밍 이어버드 INZONE Buds(219,000원부터)와 오버이어 헤드셋을 함께 낸다. 음악 감상용 헤드폰·이어폰 라인과는 별도 카테고리로 운영된다.',
      },
      {
        name: 'Signature Series',
        what: '하이레조 음원 재생에 특화된 상위 오디오 라인으로, 소니 공식몰이 헤드폰 카테고리 안에서 별도 섹션으로 소개한다.',
      },
    ],
    serviceCenter: {
      phone: '1588-0911',
      sourceUrl: 'https://www.sony.co.kr/electronics/support',
      note: '소니코리아(주)가 직접 운영하는 고객지원센터 번호로, QCY처럼 별도 수입사를 거치는 구조가 아니라 소니 본사의 한국 법인이 A/S를 직할한다.',
    },
    editorNote:
      '현재 공개 중인 소니 제품은 WF-1000XM5(조사 시점 231,450원) 1종이다. 2026년 2월 후속작 WF-1000XM6이 나오며 세대가 밀렸지만 그만큼 할인폭이 커져 "할인가에 사는 플래그십"으로 가치가 오히려 커졌고, LDAC와 멀티포인트를 동시에 쓸 수 없다는 제약과 기본 폼 이어팁이 빨리 마모된다는 불만은 여전히 남아 있다.',
    sources: [
      {
        url: 'https://www.sony.co.kr/electronics/support',
        title: '소니 제품 지원',
        publisher: '소니코리아',
      },
      {
        url: 'https://www.sony.co.kr/headphones/products/wf-1000xm5',
        title: 'WF-1000XM5 | 무선 노이즈캔슬링 이어폰',
        publisher: '소니코리아',
      },
      {
        url: 'https://www.sony.co.kr/headphones',
        title: '헤드폰/이어폰 | 소니코리아',
        publisher: '소니코리아',
      },
    ],
    updated: '2026-08',
  },
  {
    brand: 'Anker',
    intro:
      '앤커는 한국 법인 앤커이노베이션코리아(주)가 판매와 A/S를 직접 운영한다. 오디오 제품은 "사운드코어(Soundcore)"라는 서브브랜드로 나오는데, 완전무선 이어폰 대표 라인인 "리버티(Liberty)" 시리즈는 카탈로그의 리버티5를 시작으로 리버티5 프로, 리버티5 프로 맥스까지 세 단계 위계로 나뉜다.',
    lines: [
      {
        name: '리버티(Liberty) 시리즈',
        what: '사운드코어 완전무선 이어폰의 주력 라인이다. 카탈로그의 리버티5(적응형 ANC 3.0)가 가장 아래이고, 그 위에 적응형 ANC 4.0과 기네스 세계기록 인증 통화 품질을 갖춘 리버티5 프로, 최상위에 AI 녹음기와 디스플레이 컨트롤을 더한 리버티5 프로 맥스가 있다.',
        categories: ['무선이어폰'],
      },
      {
        name: '에어로클립(AeroClip)',
        what: '귀를 막지 않는 오픈형(귀걸이형) 이어폰 라인으로, 사운드코어 공식몰에 리버티 시리즈와 별도 카테고리로 올라 있다.',
      },
      {
        name: 'P 시리즈',
        what: 'P42i처럼 리버티보다 낮은 가격대를 겨냥한 보급형 무선이어폰 라인이다.',
      },
    ],
    serviceCenter: {
      phone: '1666-8470',
      sourceUrl: 'https://ankerkorea.co.kr/article/개인-고객-문의/3001/27/',
      note: '앤커의 한국 법인 앤커이노베이션코리아(주)가 직접 운영하는 대표번호로, QCY처럼 별도 수입사를 거치지 않는다. 이어폰을 포함한 소형 액세서리는 기본 보증 18개월(회원가입 시 24개월로 연장)이고, 보증 기간 내 하자가 확인되면 수리가 아니라 1:1 새 제품 교체로 처리된다.',
    },
    editorNote:
      '현재 공개 중인 앤커 제품은 사운드코어 리버티5(조사 시점 91,900원) 1종이다. 10만원 이하에서 적응형 ANC·LDAC·무선충전·IP55를 두루 갖춘 실속형이지만, 2026년 상위 라인 리버티5 프로가 통화 품질로 기네스 인증까지 받으며 새로 출시돼 리버티5는 그 아래 실속형 자리로 포지션이 정리됐다.',
    sources: [
      {
        url: 'https://ankerkorea.co.kr/article/개인-고객-문의/3001/27/',
        title: '배송, A/S, 교환 및 반품 안내',
        publisher: '앤커코리아',
      },
      {
        url: 'https://ankerkorea.co.kr/',
        title: '앤커코리아',
        publisher: '앤커이노베이션코리아',
      },
      {
        url: 'https://ankerkorea.co.kr/lp/soundcore-liberty-5-pro-series.html',
        title: '사운드코어 리버티 5 프로 시리즈 | 앤커 최강 노이즈 캔슬링 이어폰',
        publisher: '앤커코리아',
      },
    ],
    updated: '2026-08',
  },
];
