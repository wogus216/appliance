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
        what: '특정 카테고리가 아니라 에어컨·세탁기·냉장고·청소기·공기청정기 등 여러 제품군에 붙는 디자인 컬렉션 이름이다. 휘센·트롬·디오스·퓨리케어·코드제로 제품에 함께 붙어 팔리며, 공개 냉장고 S834MWW1D처럼 "베이직"이 붙은 모델도 있어 이름이 상위 기능을 뜻하지는 않는다.',
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
      // 2026-10-08 교정: 에어컨 "CH 01"·세탁기 UE·로봇청소기 "라이다(LDS) 센서 확인"은 공개 모델의
      // 정확한 자료로 확인되지 않은 계열 일반 서술이었다(R5 문구는 2026-10-02 lg-ro585hgh 감사에서 제거).
      // 오류 허브에 실린 LG 코드는 냉장고 5개뿐이고, 근거는 LG 냉장고군 공통 오류 안내다.
      'LG 냉장고 공통 오류 안내는 Er FF(냉동실 팬)·Er rF(냉장실 팬)·dH(제상 이상)처럼 영문 약어로 점검할 계통을 가리킨다. 이 안내는 T873·S834 각각의 설명서가 아니라 냉장고군 일반 유형이라, 표시가 뜨면 모델번호와 화면 사진으로 서비스에 확인하는 편이 정확하다. 에어컨·세탁기·로봇청소기 코드는 공개 모델의 정확한 자료로 확인하지 못해 싣지 않았다.',
    editorNote:
      // 2026-10-08 교정: "사양을 정리한 20개 모델로 브랜드 중 가장 넓다"(비공개 모델 집계)와
      // "인테리어 가전 수요가 구성에 드러난다"(수요 자료 없음)를 뺐다.
      '현재 공개 중인 LG 제품은 냉장고·정수기·로봇청소기·TV 4개 카테고리 7개 모델이다. 오브제컬렉션은 기능 등급이 아니라 디자인 컬렉션 이름이라, 같은 이름 안에서도 기능은 모델번호마다 갈린다. 4도어 T873MEE111은 노크온 없이 히든 버튼으로 매직스페이스를 열고, 양문형 S834MWW1D에는 매직스페이스가 없다. 코드제로 R5(RO585HGH)는 충전대 자동 먼지비움은 있지만 물걸레 자동 세척·건조는 없다. 라인 이름보다 모델번호의 공식 사양표로 고르는 편이 정확하다.',
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
    updated: '2026-10',
  },
  {
    brand: 'QCY',
    intro:
      'QCY는 중국의 무선이어폰 제조사로, 국내에는 공식 수입사 와이엘사이언스가 운영하는 QCY STORE를 통해 정식 유통된다. 공개 모델은 멜로버즈 프로(HT08) 1종이고, QCY 라인업은 T·HT·CT 세 시리즈로 나뉜다.',
    lines: [
      {
        name: 'T 시리즈',
        // 2026-10-08 3차(ylshop.co.kr 재확인, pass3/sources/site-qcy-ylshop.txt): T41·T43은 QCY STORE에서
        // 0건이라 뺐고, "가장 저변이 넓은 보급형"·"매년 여러 모델"은 근거가 없어 뺐다.
        what: 'T13 계열 무선이어폰 라인이다. 2026-10-08 QCY STORE에는 색상 모델 T13 퍼플과 ANC를 넣은 T13PRO가 올라 있다.',
        categories: ['무선이어폰'],
      },
      {
        name: 'HT 시리즈',
        // 2026-10-08 교정: "공식 판매명은 멜로버즈 프로 플러스"는 제품명·공식 URL(qcy-melobuds-pro)과
        // 어긋났고, HT10·HT16·HT20의 LDAC 지원은 저장된 원문이 없어 뺐다.
        // 2026-10-08 3차(ylshop.co.kr 재확인): HT10은 멜로버즈가 아니라 AilyBudsPro+로 적혀 있어 "멜로버즈를
        // 함께 쓴다"를 모델 단위로 좁혔다. 수입사 표기 "HT08 Melobuds Pro Plus"를 밝혔다(2차에서 근거 없다고
        // 지운 '프로 플러스' 이름은 수입사 스토어에 실제로 있었다 — 2차 판단 정정).
        what: 'HT08·HT16·HT20처럼 "멜로버즈(MeloBuds)" 이름을 함께 쓰는 모델이 속한 라인이다(HT10은 AilyBudsPro+로 표기). 공개 모델 멜로버즈 프로(HT08)도 이 라인이고, "멜로버즈 프로 플러스(Melobuds Pro Plus)"는 같은 HT08의 국내 수입사 판매명이다(수입사 상세 표기 "QCY-HT08 Melobuds Pro Plus (QCY멜로버즈프로)"). 판매처마다 이름이 달라도 모델명 HT08로 같은 제품인지 확인할 수 있다.',
        categories: ['무선이어폰'],
      },
      {
        name: 'CT 시리즈',
        // 2026-10-08 3차(ylshop.co.kr 재확인): CT06 상품명·배너로 확인됐다.
        what: '오픈형(귀찌형) 이어커프 라인이다. 2026-10-08 QCY STORE는 CT06을 블루투스 6.0 제품으로, 상품명에 러닝·자전거 같은 운동용을 적어 판다.',
        categories: ['무선이어폰'],
      },
    ],
    serviceCenter: {
      phone: '02-853-1107',
      sourceUrl: 'https://ylshop.co.kr/',
      note: '제조사 직영 A/S가 아니라 국내 공식 수입사(주식회사 와이엘사이언스)를 통한 A/S다. 전화 상담은 평일 오전 10시~오후 4시(점심시간 11:40~13:00 제외)만 운영한다.',
    },
    // 2026-10-08 교정: "무선이어폰이라 별도 에러코드 체계 없이"는 확인한 적 없는 전칭이라 확인 범위로 고쳤다.
    errorCodePattern: '공개 모델 멜로버즈 프로의 제조사 자료에서 에러코드표는 확인하지 못했고, 상태는 전용 앱과 LED 점멸로 안내한다.',
    editorNote:
      // 2026-10-08 교정: "가성비형"·"중가형"은 서로 어긋난 가격 포지션 단정이라 뺐다.
      // 2026-10-08 3차(이어폰 담당 전달, pass3/sources/earbuds-qcy-ylshop-ht08.txt): 수입사 상세에 ANC 켬·끔 조건이
      // 적혀 있어 "34시간은 ANC 조건이 적혀 있지 않다"를 고치고, LDAC와 멀티포인트의 상호 배제를 더했다.
      '공개 모델 멜로버즈 프로(HT08)는 수입사 상세 기준 ANC를 켜면 이어폰 7.5시간·케이스 포함 30시간, 끄면 8.5시간·34시간이다. 앱에서 LDAC를 켜면 멀티포인트가 자동으로 꺼지고 사용 시간도 줄어든다고 수입사가 밝히므로, 두 기기를 오가며 쓸 사람은 LDAC와 멀티포인트 중 하나를 골라야 한다. 수입사 상세는 iOS 기기가 LDAC를 지원하지 않는다고도 적는다. 국내 A/S는 수입사 창구라 평일 상담 시간 안에 접수해야 한다.',
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
    updated: '2026-10',
  },
  {
    brand: 'Samsung',
    intro:
      '삼성전자는 냉장고·세탁기/건조기·청소기·에어컨 등 리빙가전 전반에 \'비스포크(Bespoke)\'라는 디자인 라인을 공통으로 씌워 판매한다. 그 아래에서 카테고리별 하위 라인 이름은 따로 붙는데, 세탁기·건조기는 \'Bespoke Grande AI\', 에어컨은 \'무풍\', 공기청정기는 \'Infinite AI\'·\'블루스카이\'로 나뉜다. 냉장고·세탁기건조기·청소기·에어컨 카테고리 페이지 모두 이런 라인 이름을 상단 필터 탭으로 두고 있어, 어느 라인인지는 제품 상세 페이지가 아니라 목록 단계에서부터 구분된다.',
    lines: [
      {
        name: '비스포크',
        // 2026-10-08 교정: "사실상 기본값으로 자리 잡았다"는 필터 탭 순서에서 끌어낸 추론이라 뺐다.
        what: '냉장고·세탁기/건조기·청소기·에어컨 등 여러 카테고리에 공통으로 붙는 디자인 라인이다. 냉장고 카테고리 페이지의 필터 탭은 "전체" 다음 자리에 "Bespoke AI"를 둔다. 이름이 패널 교체를 보장하지는 않아, 공개 냉장고 중 4도어 RF85C90D1AP는 도어 패널을 바꿀 수 있지만 양문형 RS84B5061M9는 공식 사양에 패널 교체 불가로 적혀 있다.',
        categories: ['냉장고', '세탁기', '건조기', '로봇청소기'],
      },
      {
        name: 'Bespoke Grande AI',
        // 2026-10-08 교정: "세탁기와 건조기를 합친 콤보 제품에 주로 쓰인다"는 공개 모델 이름과 어긋났다.
        what: '세탁기·건조기 라인 이름이다. 공개 모델 중 세탁기 WF24A9500KE와 건조기 DV17A9720BV가 이 이름을 쓰고, 세탁·건조 일체형 WD25DB8995BZ는 "비스포크 AI 콤보"로 따로 판다. 공식 이벤트 페이지 주소에도 "bespoke-grande-ai"라는 이름이 그대로 들어간다.',
        categories: ['세탁기', '건조기'],
      },
      {
        name: '무풍',
        what: '에어컨 라인으로, "Bespoke AI 무풍콤보 갤러리 프로"·"무풍 윈도우핏"처럼 직접 바람 없이 냉방하는 제품 이름에 공통으로 들어간다.',
        categories: ['에어컨'],
      },
      {
        name: 'Infinite AI · 블루스카이',
        // 2026-10-08 교정: 상위·실속형 가격 포지션은 저장된 근거가 없어 뺐다.
        what: '공기청정기 카테고리 페이지에 쓰이는 두 라인 이름이다. 공개 중인 삼성 공기청정기가 없어 두 라인의 사양·가격 차이는 정리하지 않았다.',
        categories: ['공기청정기'],
      },
      {
        name: 'Bespoke AI 스팀',
        // 2026-10-08 3차(samsung.com 청소기 카테고리 재확인, pass3/sources/site-samsung-vacuum-steam.txt):
        // 급배수는 '자동 급배수' 구성에만 있어 "급배수를 갖춘 상위 모델"을 고쳤다.
        what: '로봇청소기 라인이다. 2026-10-08 삼성 청소기 카테고리에는 스팀·스팀 플러스·스팀 울트라가 각각 일반 구성과 "자동 급배수" 구성으로 올라 있고, 스테이션으로 돌아오면 물걸레를 65℃로 세척한 뒤 100℃ 스팀을 분사한다고 안내한다. 급배수는 자동 급배수 구성에만 있다. 공개 모델 비스포크 제트봇 AI는 이 라인이 아니다.',
        categories: ['로봇청소기'],
      },
    ],
    serviceCenter: {
      phone: '1588-3366',
      sourceUrl: 'https://www.samsung.com/sec/',
      note: '삼성닷컴 구매 문의(1588-6084)와는 다른, 제품/서비스/멤버십 공용 번호다.',
    },
    errorCodePattern:
      // 2026-10-08 교정: 냉장고 '22 E'와 로봇청소기 '바퀴 끼임'은 2026-10-02 모델 감사
      // (samsung-rf85-rs84·samsung-vr50t95735w)에서 정확한 모델 자료로 확인되지 않아 허브에서 뺀 표시였다.
      // UE·tS도 공개 세탁기·건조기 설명서 추출본에서 확인되지 않았다. 오류 허브에 실린 코드 기준으로 고쳤다.
      '공개 모델에서 확인한 표시는 품목마다 형식이 다르다. 에어컨은 E101(실내기·실외기 통신)처럼 E 뒤에 세 자리 숫자를 쓰고, 세탁기는 5C(배수), 건조기는 HC(압축기 과열)·9C2(저전압)처럼 숫자와 영문을 섞는다. 냉장고 RF85·RS84의 숫자+E 표시와 제트봇 AI의 안내 문구는 정확한 모델 자료에서 의미와 해제 방법을 확인하지 못해 싣지 않았다.',
    editorNote:
      // 2026-10-08 교정: "사양을 정리한 17개 모델"(비공개 모델 집계)과 "비스포크 패널이 붙은
      // 프리미엄 모델이 다수라 가격대가 높다"(패널은 RF85뿐, 9개 중 일부는 가격 미확인)를 뺐다.
      '현재 공개 중인 삼성 제품은 세탁기·건조기·냉장고·무선이어폰·에어컨·로봇청소기·TV 7개 카테고리 9개 모델이다. 세탁·건조를 한 대로 할지 두 대로 나눌지 고르는 중이라면, 일체형 WD25DB8995BZ는 세탁 25kg·건조 15kg을 한 자리에 두고, WF24A9500KE(24kg)와 DV17A9720BV(17kg) 조합은 세탁과 건조를 동시에 돌릴 수 있는 대신 두 대 분량의 설치 공간이 필요하다. 설치할 자리의 폭·높이와 한 번에 돌리는 빨래 양으로 먼저 좁히는 편이 정확하다.',
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
    updated: '2026-10',
  },
  {
    brand: 'Coway',
    intro:
      // 2026-10-08 교정: "렌탈 시장에서 오래 자리 잡았다", "다른 브랜드보다 서비스 접점이 촘촘한 편"은
      // 비교 자료 없이 쓴 시장·서비스 우열 단정이라 뺐다.
      "코웨이는 정수기·공기청정기·제습기·비데 등을 구매와 렌탈 두 가지 방식으로 함께 파는 브랜드다. 상위 라인에는 '노블'이라는 이름을 여러 카테고리에 공통으로 붙이고, 정수기는 얼음정수기 중심의 '아이콘' 라인을 따로 두고 있다. 렌탈 계약에는 코디(전속 방문관리 인력)의 정기 관리가 붙어, 일시불로 살 때와 관리 조건이 달라진다.",
    lines: [
      {
        name: '노블',
        what: '공기청정기·제습기·가습기·정수기에 걸쳐 붙는 상위 라인이다. 공기청정기 카테고리 페이지에는 "노블 시리즈"라는 필터 탭이 따로 있고, 노블 공기청정기2만 해도 53㎡부터 133㎡까지 평형별로 나뉜다.',
        categories: ['공기청정기', '제습기', '정수기'],
      },
      {
        name: '아이콘',
        // 2026-10-08 교정: "판매 순위 1~4위"는 관측일·기준이 없는 순위라 뺐다.
        what: '얼음정수기를 중심으로 한 정수기 라인이다. 정수기 카테고리 페이지에 "아이콘 얼음정수기 미니·스탠다드·맥스·오리지널"이 함께 올라 있고, 공개 모델 CHPI-7400N도 이 라인이다.',
        categories: ['정수기'],
      },
      {
        name: '스퀘어핏',
        what: '공기청정기의 슬림형 라인으로, 38㎡부터 82㎡까지 평형별 모델이 있다.',
        categories: ['공기청정기'],
      },
    ],
    serviceCenter: {
      phone: '1588-5200',
      sourceUrl: 'https://www.coway.com/cs/main',
      note: '고객지원 페이지에 "고객센터 1588-5200, 긴급상담 365일 24시간"으로 안내돼 있고, 같은 페이지에서 A/S·이전설치 신청도 함께 접수한다.',
    },
    errorCodePattern:
      // 2026-10-08: 이 문장은 이제 코드 0개 브랜드에도 화면에 나간다(error-code-summary.tsx). 독자가 본 적 없는
      // 옛 주장을 부정하던 둘째 문장은 뺐다.
      '공개 중인 CHPI-7400N 설명서에는 고장 코드표 대신 증상별 점검표가 있다.',
    editorNote:
      // 2026-10-08 교정: 사양을 다시 읊던 문장을 구매 방식 판단으로 바꿨다(근거: coway.ts CHPI-7400N editorComment).
      '현재 공개 중인 코웨이 제품은 정수기 1종(아이콘 얼음정수기 CHPI-7400N)이고, 일시불 판매가는 확인하지 못했다. 이 브랜드에서 먼저 정할 것은 구매 방식이다. 2026-10-01 코웨이 화면은 일시불 구매에 1년 무상 서비스만 표시하고 그 뒤 관리비를 적지 않아, 일시불과 방문관리 렌탈의 총액을 같은 기간으로 맞추려면 2·3년차 관리비 견적을 따로 받아야 한다. 설치 자리는 설명서 기준 후면·좌우 벽에서 10cm 이상 띄울 공간이 필요하다.',
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
    updated: '2026-10',
  },
  {
    brand: 'Winix',
    intro:
      "위닉스는 공기청정기 '타워'와 제습기 '뽀송' 라인을 운영한다. 공개 모델은 뽀송 제습기 DN2H160-IWK 1종이다.",
    lines: [
      {
        name: '타워',
        // 2026-10-08 교정: 모델 순서와 "37평형까지"는 저장된 원문이 없어 뺐다.
        what: '세로로 슬림한 공기청정기 라인 이름이다. 공개 중인 위닉스 공기청정기가 없어 모델별 청정 면적은 정리하지 않았다.',
        categories: ['공기청정기'],
      },
      {
        name: '뽀송',
        what: '제습기 라인이다. 같은 뽀송이라도 용량과 인버터 여부가 모델마다 달라, 다른 용량 모델의 소음·전력량 자료를 공개 모델 DN2H160-IWK에 옮겨 읽으면 안 된다.',
        categories: ['제습기'],
      },
    ],
    serviceCenter: {
      phone: '1544-5081',
      sourceUrl: 'https://www.winix.com/customer/product',
      note: '위닉스 고객만족센터 번호로 평일 09:00~18:00만 운영하고 주말·공휴일은 쉰다. 창문형 에어컨 설치 상담은 1670-3230으로 별도 운영된다.',
    },
    errorCodePattern:
      'DN2 계열 설명서에서 확인한 dF는 고장 코드가 아니라 자동 제상 중 표시다. E1·E2·E3·CF의 의미는 이 모델의 공식 설명서에서 확인하지 못했다.',
    editorNote:
      // 2026-10-08 교정: "대형 브랜드 동급 모델보다 낮은 구간"은 비교한 가격 자료가 없는 단정이었다.
      // 계산: 4.5L ÷ 16L/일 × 24h = 6.75h, 16 ÷ 4.5 ≈ 3.6통/일 (README 검산과 같음).
      '공개 모델 뽀송 DN2H160-IWK의 16L/일은 27℃·상대습도 60%에서 최대 풍량으로 연속 운전한 시험값이고 물통은 4.5L다. 그 조건이 이어지면 하루 약 3.6통, 약 6.8시간마다 물통이 차서 운전이 멈춘다. 밤새 돌리거나 집을 비울 때 쓸 생각이라면 제습량보다 연속배수 호스를 연결할 배수구 위치를 먼저 정하는 편이 맞다.',
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
    updated: '2026-10',
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
      // 2026-10-08 교정: "실제 유통은 쿠팡 중심", "창문형은 쿠팡 전용"은 저장된 근거가 없고
      // 창문형은 비공개 모델이라 뺐다.
      "TCL은 중국 TCL그룹의 가전 브랜드로, 한국에는 TCL코리아가 TV·태블릿과 함께 벽걸이 에어컨을 공식 판매한다. 공개 중인 6평·9평형 벽걸이 두 종은 TCL 코리아 공식 사이트에 'Breeze IN 시리즈'로 등록돼 있다.",
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
        'https://solutions.coupang.com/hc/ko/articles/59119555659801',
      note: 'TCL 본사나 국내 총판이 아니라 쿠팡의 A/S 기술지원센터로 연결되는 번호다. TCL 코리아 공식 사이트(tcl.com/kr)에는 전화번호 없이 문의 폼만 있다. 이 사이트가 확인한 공개 모델 2종의 판매처와 A/S 안내는 쿠팡이라, 다른 판매처에서 사면 접수 창구가 같은지 따로 확인해야 한다.',
    },
    errorCodePattern:
      '쿠팡 벽걸이 에어컨 A/S 안내는 E1·E2·P6·P7과 E3·E7·EH·P8을 각각 묶어 일반 점검 순서를 제시한다. TAC-08CSD/TPH11I·TAC-12CSD/TPH11I 각각의 코드별 부품 원인은 공개된 설명서에서 확인되지 않았다.',
    editorNote:
      // 2026-10-08 교정: 1차 교정문의 띄어쓰기 누락을 바로잡고, "4등급만으로 요금 순위를 정하지 않는다"는
      // 부정문을 공단 신고값 대조로 바꿨다. 계산: 89.5 − 87.8 = 1.7kWh/월(tcl.ts·haier.ts 공단 신고·1:1).
      // TAC-12CSD의 월간소비전력량은 데이터에 없어 비교하지 않았다.
      '현재 공개 TCL 모델은 TAC-08CSD/TPH11I와 TAC-12CSD/TPH11I이고 제조사 냉방 면적은 18.7㎡와 29.3㎡다. 6평형 TAC-08CSD의 공단 신고 월간소비전력량은 87.8kWh로, 같은 18.7㎡인 하이얼 CTH06QBW(89.5kWh)와 월 1.7kWh 차이다. 두 모델 사이에서는 운전비보다 설치 포함 견적과 서비스 접수 경로가 선택을 가를 가능성이 크다. 44만원대·50만원대는 2026-08-24 조사 가격이다.',
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
        url: 'https://solutions.coupang.com/hc/ko/articles/50008291280409',
        title: 'TAC-08CSD·TAC-12CSD 벽걸이 에어컨 사용설명서',
        publisher: '쿠팡무상A/S',
      },
      {
        url: 'https://solutions.coupang.com/hc/ko/articles/59119555659801',
        title: 'TCL 벽걸이 에어컨 오류 표시 안내',
        publisher: '쿠팡',
      },
    ],
    updated: '2026-10',
  },
  {
    brand: 'Haier',
    intro:
      // 2026-10-08 교정: "세계 가전 판매량 1위를 내세우는"은 haier.co.kr(2026-10-08 확인)에 '판매량'이
      // 아니라 출처·연도 없는 "세계 1위 가전브랜드" 문구만 있어 뺐다. 미니 냉장고·세탁기는 비공개 모델이다.
      // 2026-10-08 3차: 공식 에어컨 목록(pass3/sources/site-haier-ac-list.txt)에 CTH 모델이 없어 "라인 이름과
      // 일치한다"를 확인한 사실로 좁혔다.
      "하이얼은 중국 가전 브랜드로, 한국에서는 하이얼코리아가 고객센터를 직접 운영한다. 공개 중인 벽걸이 에어컨 두 종(CTH06QBW·CTH10QBW)도 이름에 셀프클리닝이 붙지만, 2026-10-08 하이얼코리아 공식 에어컨 목록에는 다른 모델번호(HSU 계열)만 올라 있다.",
    lines: [
      {
        name: 'Self-Cleaning(셀프클리닝)',
        // 2026-10-08 3차: 홈 배너 문구 "6·8·10평형 맞춤 선택"은 홈(curl)에서 0건 — 배너는 제습기·냉장고·식기세척기
        // ·와인셀러·레트로 냉장고였다. 평형 구성은 공식 에어컨 목록(aside)에서 확인돼 출처를 그쪽으로 고쳤다.
        what: '벽걸이 에어컨 라인이다. 2026-10-08 하이얼코리아 공식 에어컨 목록에는 "셀프클리닝 인버터 벽걸이 에어컨" 6·8·10평형(HSU06QAPIW·HSU06QAHIW·HSU08QAHIW·HSU10QAHIW)이 올라 있다. 공개 모델 CTH06QBW·CTH10QBW의 공식 설명서는 셀프클리닝을 실내 열교환기 청소 모드로 설명하며 약 18~21분 작동한다고 안내한다.',
        categories: ['에어컨'],
      },
      {
        name: '컨버터블 · 레트로 · 글램글라스',
        what: '하이얼코리아 냉장고 라인으로, 공식 사이트 홈에 김치냉장고 컨버터블 라인, 레트로 감성의 미니 냉장고, 4도어 글램글라스가 각각 소개돼 있다. 공개 중인 하이얼 냉장고는 없다.',
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
      'CTH06QBW·CTH10QBW 공식 사용설명서는 외부 온도 0℃ 미만에서 F25가 표시될 수 있고 10초간 껐다 재시작하라고 안내한다. E1~E6/F1의 이 모델별 의미와 부품 원인은 확인되지 않아 게시하지 않는다.',
    editorNote:
      // 2026-10-08 교정: 409,000·559,000원을 "41만원대·56만원대"로 적었고(실제 40만원대·55만원대),
      // "TCL과 함께 최저가 구간"은 시장 가격 조사 없이 쓴 단정이라 뺐다.
      '현재 공개 중인 하이얼 제품은 벽걸이 에어컨 2종(6평형 CTH06QBW, 10평형 CTH10QBW)이고, 2026-08-24 조사 가격은 409,000원과 559,000원이다. 두 모델 모두 공단 신고 4등급이지만 월간소비전력량은 89.5kWh와 154.2kWh로 용량만큼 차이가 나, 등급이 같다는 이유로 운전비가 비슷하다고 볼 수 없다. 6평형 설명서는 R410A, 10평형 설명서는 R32 냉매를 명시해, 같은 라인 안에서도 냉매가 다르다.',
    sources: [
      {
        url: 'https://www.haier.co.kr/',
        title: '하이얼코리아 공식 홈페이지',
        publisher: '하이얼코리아',
      },
      {
        url: 'https://www.haier.co.kr/board/board_product/board_list.asp?scrID=0000000220&pageNum=2&subNum=4&ssubNum=1',
        title: '에어컨 제품 목록 — 셀프클리닝 인버터 벽걸이 6·8·10평형 (2026-10-08 확인)',
        publisher: '하이얼코리아',
      },
      {
        url: 'https://www.haier.co.kr/board/board_center/board_list.asp?scrID=0000000228&pageNum=3&subNum=4&ssubNum=1',
        title: '고객센터 안내',
        publisher: '하이얼코리아',
      },
      {
        url: 'https://www.haier.co.kr/board/board_manual/board_list.asp?scrID=0000000231&pageNum=3&subNum=7&ssubNum=1&page=1&s_string=CTH06QBW',
        title: 'CTH06QBW 공식 설명서',
        publisher: '하이얼코리아',
      },
      {
        url: 'https://www.haier.co.kr/board/board_manual/board_list.asp?scrID=0000000231&pageNum=3&subNum=7&ssubNum=1&page=1&s_string=CTH10QBW',
        title: 'CTH10QBW 공식 설명서',
        publisher: '하이얼코리아',
      },
    ],
    updated: '2026-10',
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
      // 2026-10-08 교정: 예시였던 로봇청소기 X10은 비공개 모델이라 뺐다.
      '샤오미는 중국 스마트 가전 브랜드로, 한국에는 샤오미테크놀로지코리아가 mi.com/kr 공식 스토어를 운영하며 070-8015-1154 번호로 A/S를 직접 접수한다. 공식 스토어에 없는 병행수입 제품은 이 공식 A/S 대상에서 벗어날 수 있어, 같은 브랜드 안에서도 구매 경로에 따라 A/S 여부가 갈린다.',
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
      // 2026-10-08: 코드 0개 브랜드에도 화면에 나가게 되면서 일반론인 둘째 문장을 뺐다.
      '스마트 공기청정기 4의 공식 제품 자료와 FAQ에서는 E1~E6을 이 모델의 진단표로 확인하지 못했다.',
    editorNote:
      // 2026-10-08 교정: "보급형과 상위 모델의 격차를 크게 벌려 놓는 구성"은 근거 없는 일반론이었고,
      // 병행수입 이야기는 intro와 같은 말의 반복이었다. 공개 모델의 면적 표기 차이로 바꿨다(xiaomi.ts capacity).
      '공개 모델 스마트 공기청정기 4(AC-M16-SC)에는 면적이 두 가지로 적혀 있다. 제조사 제품 페이지의 유효 청정 면적 28~48㎡(CADR 400㎥/h와 함께 표기)와, 같은 모델을 국내 수입사들이 한국에너지공단에 신고한 표준사용면적 42.5~45.5㎡(효율 2~3등급)다. 시험 체계가 다른 값이라, 다른 국내 제품과 견줄 때는 국내 신고 표준사용면적끼리 맞춰 보는 편이 정확하다. 병행수입품은 공식 A/S 대상이 아닐 수 있어 구매처가 정식 유통인지 먼저 확인해야 한다.',
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
    updated: '2026-10',
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
        what: 'SK매직몰은 정수기를 하나의 시리즈 브랜드로 묶지 않고, 얼음 정수기·직수 정수기·대용량 정수기라는 사이트 상품 분류 아래 MEGA ICE·투워터·원코크 플러스·초소형처럼 제품마다 다른 이름을 붙인다. 공개 모델 올인원 직수 냉온정수기 WPU-A710C는 지금 SK매직몰 검색에서는 나오지 않는다.',
        categories: ['정수기'],
      },
    ],
    serviceCenter: {
      phone: '1600-1661',
      sourceUrl: 'https://www.skintellixservice.com/web/main/main.do',
      note: 'SK매직몰은 이 번호를 "구독계약상담 및 문의"로 표기하지만, SK매직 서비스센터(SK인텔릭스서비스)의 FAQ·ARS 안내는 같은 1600-1661번을 정수기 이전설치·고장 상담 같은 실제 A/S 접수 창구로도 함께 안내한다. 렌탈 계약 문의와 수리 접수가 창구부터 나뉘어 있지 않다는 뜻이다.',
    },
    errorCodePattern:
      // 2026-10-08 교정(오류 코드 담당 전달): E4·AU의 근거는 설명서가 아니라 서비스센터 코드별 FAQ다
      // (error-code-editorial SKMagic covers). 출처 성격을 나눠 적었다.
      // 2026-10-08 3차(오류 코드 담당 전달, pass3/sources/errorcodes-skmagic-dwa81-scope.txt): E5는 허브에서
      // 빠졌고, FAQ가 DWA81R0D 제품코드에 직접 연결한 것은 AU뿐이다(E4·F3 FAQ는 DWA 제품 대부분에 일괄 연결).
      'DWA-81R0D 설명서의 자가 진단표는 E2(급수)·E3(배수)·F1~F9(기능 이상)·tS/tO(온도 감지)를 싣는다. 오류 허브의 AU·E4는 설명서가 아니라 SK매직 서비스센터의 코드별 FAQ에 근거하는데, 이 모델 제품코드에 직접 연결된 FAQ는 AU(도어가 안 열림)뿐이다. E4 FAQ는 DWA 제품 대부분에 일괄 연결돼 있어, 이 모델에 실은 뜻(60℃ 이상 고온수)은 FAQ 본문의 12인용 구분과 설명서의 급수 온도 60℃ 이하 조건에 기댄 것이다. WPU-A710C 정수기는 공식 설명서에서 코드표가 확인되지 않아 오류 허브에 싣지 않고, 제품 페이지의 증상별 점검으로 안내한다.',
    editorNote:
      // 2026-10-08 교정: "70도 이상 고온 살균"·"국산"은 DWA-81R0D 자료에서 확인되지 않아 뺐다
      // (같은 검색에서 "급수 60℃ 이하"는 잡혀 검색은 살아 있었다). 근거: skmagic.ts editorComment 두 건.
      '현재 공개 중인 SK매직 제품은 식기세척기 1종(터치온 12인용 DWA-81R0D)과 정수기 1종(올인원 직수 냉온정수기 WPU-A710C)이고, 두 제품 모두 일시불 판매가는 확인하지 못했다. 정수기는 필터를 직접 갈 수 없고 설명서 기준 1년에 필터 7개(세디먼트 3·블록카본 복합 3·나노테크 PAC 1) 교체를 기사에게 맡기는 구조라, 계약을 비교할 때는 이 교체가 포함되는지와 방문 주기를 먼저 맞춰야 한다. 식기세척기 DWA-81R0D는 프리스탠딩 12인용이고, 연장 급수·배수호스가 별매라 싱크대까지의 거리를 먼저 재야 한다.',
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
    updated: '2026-10',
  },
  {
    brand: 'Cuckoo',
    intro:
      '쿠쿠는 밥솥으로 잘 알려진 국내 가전사로, 정수기·비데는 렌탈(구독) 위주로 팔고 식기세척기는 일시불 구매로 판매한다. 고객센터도 이 구조를 그대로 따라가 렌탈 고객 서비스(1577-0010)와 일반 구매 제품 A/S(1588-8899)를 처음부터 분리해 운영한다. 정수기 라인 중 하나인 인스퓨어는 지금도 셀프 직수 얼음정수기로 판매되고, 식기세척기는 최근 스팀샷이라는 이름의 고온 스팀 살균 모델을 앞세운다.',
    lines: [
      {
        name: '인스퓨어',
        what: '정수기 라인 이름 중 하나다. 쿠쿠몰에는 "인스퓨어셀프직수얼음정수기"(CP-SS011WSV)가 지금도 판매 중이며, 저수조 없이 그때그때 걸러내는 직수형과 코크·유로 UV 살균을 공통 특징으로 내세운다.',
        categories: ['정수기'],
      },
      {
        name: '스팀샷',
        // 2026-10-08 교정: "이 스팀샷 세대 이전 제품으로 보이고"는 추정이라 뺐다. 12인용은 비공개 모델이다.
        what: '식기세척기 라인이다. 쿠쿠몰에 "쿠쿠 스팀샷 식기세척기(14인용)"·"120도 스팀 살균 14인용 글라스도어 식기세척기"가 올라 있다. 공개 모델 6인용 식탁형 CDW-A0611TW는 쿠쿠몰에서 같은 모델명이 확인되지 않는다.',
        categories: ['식기세척기'],
      },
    ],
    serviceCenter: {
      phone: '1588-8899',
      sourceUrl: 'https://www.cuckoo.co.kr/customer',
      note: '쿠쿠는 렌탈(구독) A/S·설치·점검(1577-0010)과 일반 구매 제품 A/S(1588-8899)를 창구부터 분리해 운영한다. 공개 중인 식탁형 식기세척기는 구매 가격이 매겨진 일반 구매 제품이라 구매 서비스 번호를 확인해 실었다.',
    },
    errorCodePattern:
      '공개된 CDW-A0611TW 설명서의 코드표는 E1(급수), E3(히터), E4(누수 및 기능), E6~E7(온도센서), ED(PBA), dr(문열림)입니다. 이 모델의 코드표에 E2는 없습니다. 다른 제품군의 코드 의미를 그대로 옮기지 않아야 합니다.',
    editorNote:
      // 2026-10-08 교정: "설치 조건부터 확인해야 한다"를 설명서의 재야 할 값으로 바꿨다(cuckoo.ts installationNote).
      '현재 공개 중인 쿠쿠 제품은 식기세척기 1종(6인용 식탁형 CDW-A0611TW)이고, 2026-08-24 조사 가격은 39만원대다. 조리대에 올려 쓰지만 물탱크형이 아니다 — 공식 설명서는 중간밸브에 급수호스(급수압 0.05~0.8MPa)와 배수호스를 연결하도록 안내하고 수동 물탱크 급수는 확인되지 않는다. 사기 전에 조리대의 폭 550·깊이 515·높이 438mm 자리와 문을 열었을 때 812mm까지 늘어나는 깊이, 중간밸브 위치를 재 보는 편이 정확하다.',
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
    updated: '2026-10',
  },
  {
    brand: 'Roborock',
    intro:
      // 2026-10-08 교정: "문턱 주파력에 강한"은 비교 시험 없이 쓴 우열 표현이라 뺐다.
      '로보락은 중국 로봇청소기 제조사로, 한국에는 주식회사 로보락 코리아가 kr.roborock.com 공식 스토어와 A/S를 직접 운영한다. 라인업은 최상위 Saros, 물걸레와 문턱 넘기를 내세우는 Qrevo, 그 아래 S8 시리즈로 나뉘는데, 공개 모델 S8 프로 울트라는 이 S8 Pro 시리즈에 속했던 모델로 현재 공식 사이트에는 같은 모델명 페이지가 남아 있지 않다. 반면 Qrevo Curv는 지금도 공식 스토어에서 그대로 판매 중이다.',
    lines: [
      {
        name: 'Qrevo',
        what: '문턱·단차 넘기와 물걸레 청소를 앞세운 라인이다. 공식 사이트에 Qrevo Curv·Qrevo Curv 2 Flow·Qrevo Edge 2·Qrevo C 등 여러 모델이 걸려 있고, 공개 모델 Qrevo Curv도 이 라인의 현재 판매 모델이다.',
        categories: ['로봇청소기'],
      },
      {
        name: 'S8 시리즈',
        what: 'Saros(최상위)와 Qrevo 아래에 있는 라인으로, 공식 사이트의 "Roborock S8 Pro 시리즈" 페이지에는 S8 Pro·S8 Pro+가 올라 있다. 공개 모델 S8 프로 울트라는 이 시리즈에 속했던 모델명이지만 같은 URL 패턴(roborock-s8-pro-ultra)으로 접속하면 홈으로 넘어가, 지금은 판매 목록에서 빠진 것으로 보인다.',
        categories: ['로봇청소기'],
      },
    ],
    serviceCenter: {
      phone: '1566-5534',
      sourceUrl: 'https://kr.roborock.com/pages/roborock-service-warranty',
      note: '서비스 및 보증 페이지에 "AS 전화 문의 1566 5534"로 명시된, 주식회사 로보락 코리아가 직접 운영하는 번호다.',
    },
    errorCodePattern:
      // 2026-10-08 교정(오류 코드 담당 전달): Error 9가 S8 전용처럼 읽혔다 — Qrevo Curv 공식 문서에도 있다.
      // "기존 내용을 제거했습니다"는 독자가 본 적 없는 이력이라 빼고, 근거의 한계(설명서에 번호표 없음)를 적었다.
      // 2026-10-08 3차(오류 코드 담당 전달, pass3/sources/errorcodes-roborock-s8-curv.txt): 두 모델 페이지가 같은
      // 문구로 싣는 9개 중 Error 8(조치의 대상이 원문에서 불명)을 뺀 8개를 허브에 싣는다.
      'S8 Pro Ultra와 Qrevo Curv의 공식 문제 해결 페이지(미국 지역판)는 Error 1·4·5·7·8·9·10·13·18을 같은 문구로 싣는다. 오류 허브에는 그중 8개 — 1(레이저)·4(낙하 방지 센서)·5(메인브러시)·7(바퀴)·9(필터 자석)·10(필터 막힘·젖음)·13(충전)·18(흡입 팬 이물질) — 를 실었고, 무엇을 점검하라는지 원문에서 대상이 분명하지 않은 Error 8은 싣지 않았다. 두 모델의 설명서에는 번호별 오류 표가 없다.',
    editorNote:
      // 2026-10-08 교정: 1,766,390원을 "177만원대"로 적었고(실제 176만원대), "유지관리를 도크가 알아서
      // 처리"는 제품 데이터("깨끗한 물·오수통은 직접 채우고 비운다")와 어긋났다. 문턱 수치는 제조사 내부 시험값.
      '현재 공개 중인 로보락 제품은 로봇청소기 2종으로, S8 프로 울트라는 2026-08-24 조사 가격 1,766,390원이고 Qrevo Curv는 가격을 확인하지 못했다. 두 모델 모두 도크가 먼지를 비우고 걸레를 세척·건조하지만, 기본 물탱크형 도크는 깨끗한 물통과 오수통을 사람이 채우고 비워야 한다. 물걸레 방식은 S8 프로 울트라가 음파진동, Qrevo Curv가 듀얼 회전판이고, Qrevo Curv의 AdaptiLift 섀시는 제조사 내부 시험에서 표준 문턱 최대 3cm·이중 문턱 최대 4cm를 넘었다. 문턱 높이가 구매 조건이라면 S8 프로 울트라의 통과 높이는 공식 사양에서 확인하지 못했다는 점을 함께 봐야 한다.',
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
    updated: '2026-10',
  },
  {
    brand: 'Dyson',
    intro:
      '다이슨은 영국의 가전 제조사로, 한국에는 다이슨 코리아가 공식몰과 A/S를 직접 운영하며 고객센터는 유료(1588-4253)와 수신자부담(080-300-4253) 두 번호를 함께 안내한다. 2026년 8월 확인 당시 다이슨 공식몰 상품 목록에서 공개 모델 TP07의 "퓨어쿨"이라는 이름은 찾지 못했고, 허쉬젯·파인드+팔로우·빅+콰이엇 같은 이름의 제품이 올라 있었다. HP09가 속한 핫앤쿨 라인은 같은 시점에 판매 목록에 있었다. 2026-10-08 다이슨코리아 공식몰은 TP07·HP09 두 제품 페이지에 "현재 공식 홈페이지에서 판매하지 않는 제품"이라고 표시한다.',
    lines: [
      {
        name: '핫앤쿨(Hot+Cool)',
        // 2026-10-08 교정: "HP2는 HP09보다 뒤 세대"는 저장된 근거 없는 추론이라 뺐다. 송풍은 실내 온도를
        // 낮추는 냉방이 아니라서(dyson.ts TP07 editorComment) "냉방"을 "송풍"으로 고쳤다.
        what: '송풍·온풍·공기청정을 한 대에 담은 라인이다. 2026년 8월 확인 당시 다이슨 공기청정기 카테고리 페이지에 "다이슨 핫앤쿨 공기청정기 HP2"가 올라 있었고, 공개 모델 HP09도 이 라인이다.',
        categories: ['선풍기'],
      },
      {
        // 2026-10-08 교정: 라인 이름에 붙어 있던 "(단종 추정)"과 "후속 라인으로 대체된 것으로 보인다"는
        // 추정이라 뺐다. 확인한 것은 2026-08 공식몰 목록에 이름이 없었다는 사실뿐이다.
        name: '퓨어쿨',
        what: '공개 모델 TP07이 속한 날개 없는 타워팬 겸 공기청정기 라인 이름이다. 2026년 8월 확인 당시 다이슨 공기청정기·선풍기 카테고리 페이지에서는 이 이름을 찾지 못했다.',
        categories: ['선풍기'],
      },
    ],
    serviceCenter: {
      phone: '1588-4253',
      sourceUrl: 'https://www.dyson.co.kr/support/support-home',
      note: '유료 1588-4253과 수신자부담 080-300-4253 두 번호를 함께 안내하며, 평일 오전 9시~오후 6시만 운영하고 주말은 쉰다.',
    },
    errorCodePattern:
      // 2026-10-08: 코드 0개 브랜드에도 화면에 나가게 되면서 "기존에 게시했던"이라는 내부 이력 표현을 뺐다.
      'TP07·HP09의 공식 사용설명서에는 필터 수명 확인과 교체 후 초기화 절차가 있고, F·F2·E·AQ·CL·CN·HH·U1 같은 문자 진단표는 두 설명서에서 확인되지 않았다.',
    editorNote:
      // 2026-10-08 교정: 1차 교정문의 띄어쓰기 누락을 바로잡고, "필터 자재비·공임을 나눠 비교"는
      // 사용자가 직접 교체하는 필터라 사실과 달라 저장된 교체 주기·가격으로 바꿨다
      // (dyson.ts, research/evidence/2026-09-30/maintenance-cost-evidence.jsonl). 계산: 737,290 − 529,990 = 207,300원, 2,200W ÷ 220V = 10A.
      // 2026-10-08 3차(공기질 담당 전달): 필터 판매가 79,000원(pass3/sources/airquality-dyson-filter.txt)과
      // 본체 공식몰 판매 종료 표시(pass3/sources/airquality-dyson-kr-pages.txt)를 09-30 값과 함께 적었다.
      '공개 모델 TP07과 HP09는 송풍·공기청정 구성이 같고 교체 필터(965432-01)도 같다. HP09가 더하는 것은 온풍과 포름알데히드 촉매 필터이고, 2026-08-24 조사 가격 차이는 207,300원이다. 온풍이 필요 없다면 그 차이를 낼 이유가 크게 줄어든다. 설명서 기준 촉매 필터는 교체할 필요가 없어 차이가 유지비로 이어지지는 않는다. 필터는 두 모델 모두 사용자가 직접 갈며, 제조사는 하루 12시간 사용 기준 12개월 교체를 권한다. 공식몰 필터 가격은 2026-09-30에 59,000원(할인가, 정가 79,000원)이었고 2026-10-08에는 79,000원이라, 1년 필터비는 할인 시점에 따라 59,000~79,000원으로 잡아야 한다. 본체는 2026-10-08 기준 두 모델 모두 공식몰에서 팔지 않아 다른 판매처를 거쳐야 한다. HP09의 온풍 정격 2,200W는 220V에서 약 10A라, 콘센트·멀티탭 정격부터 확인해야 한다.',
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
        url: 'https://www.dyson.co.kr/360-glass-hepa-carbon-air-purifier-filter',
        title: '360º 글라스 헤파+탄소 필터(965432-01) — 2026-10-08 판매가·교체 주기',
        publisher: '다이슨코리아',
      },
      {
        url: 'https://www.dyson.co.kr/dyson-purifier-cool-white-silver',
        title: '다이슨 쿨 공기청정기(TP07) 제품 페이지 — 2026-10-08 공식몰 판매 종료 표시',
        publisher: '다이슨코리아',
      },
      {
        url: 'https://www.dyson.co.kr/dyson-purifier-hot-cool-formaldehyde-white-nickel-gold',
        title: '다이슨 핫앤쿨 포름알데히드(HP09) 제품 페이지 — 2026-10-08 공식몰 판매 종료 표시',
        publisher: '다이슨코리아',
      },
      {
        url: 'https://www.dyson.co.kr/products/air-quality/fans-and-heaters',
        title: '선풍기 - 공기청정기 및 선풍기 - 제품',
        publisher: '다이슨코리아',
      },
    ],
    updated: '2026-10',
  },
  {
    brand: 'Apple',
    intro:
      '애플은 에어팟 제품군을 apple.com/kr 공식몰과 리테일 매장에서 직접 판매하고, A/S는 소니·삼성처럼 지역 서비스센터를 두는 대신 Genius Bar와 "Apple 공인 서비스 제공업체(AASP)"라는 위탁 수리망으로 처리한다. 공개 모델은 에어팟 프로 3 1종이고, 에어팟 제품군은 기본형 에어팟·에어팟 프로·에어팟 맥스 세 갈래로 나뉜다.',
    lines: [
      {
        name: 'AirPods(에어팟)',
        // 2026-10-08 교정: 관측일 없는 가격(199,000·269,000원)과 세대명은 2026-10-08 apple.com/kr 화면과
        // 맞지 않아 뺐다. 공개 모델이 아니라 세대별 가격·기능은 정리하지 않는다.
        what: '기본형 인이어 라인이다. 공개 모델이 아니어서 세대별 가격·기능은 정리하지 않았다.',
        categories: ['무선이어폰'],
      },
      {
        name: 'AirPods Pro(에어팟 프로)',
        // 2026-10-08 교정: "헬스 기능이 이 라인에만 먼저 들어온다"는 저장된 근거가 없어 뺐다.
        what: '공개 모델 에어팟 프로 3가 속한 인이어 상위 라인이다. 에어팟 프로 3에는 액티브 노이즈 캔슬링과 심박수 센서·청력 보조 기능이 있다.',
        categories: ['무선이어폰'],
      },
      {
        name: 'AirPods Max(에어팟 맥스)',
        what: '오버이어 헤드폰 라인으로, 인이어형인 프로·기본형과 폼팩터 자체가 다르다.',
        categories: ['무선이어폰'],
      },
    ],
    serviceCenter: {
      phone: '080-333-4000',
      sourceUrl: 'https://support.apple.com/ko-kr/106932',
      note: '전화 문의는 이 번호로 받지만, 실제 하드웨어 수리는 전화가 아니라 getsupport.apple.com 온라인 절차로 접수해 Genius Bar나 Apple 공인 서비스 제공업체(AASP) 매장에 방문하는 방식이 기본이다. AASP는 자체적으로 서비스 요금을 책정할 수 있다고 애플 공식 페이지에 명시돼 있다.',
    },
    editorNote:
      // 2026-10-08 교정: 1차 교정문의 띄어쓰기 누락을 바로잡고, "플랫폼 이름만으로 가격 가치를 확정하지
      // 않는다" 같은 부정문을 apple.ts 사양(코덱 미기재·LDAC 미지원·멀티포인트 미지원)에서 나온 판단으로 바꿨다.
      '공개 모델 AirPods Pro 3의 369,000원은 2026-08-24 Apple 공식몰 가격이다. 코덱은 Apple 사양표에 적혀 있지 않고 LDAC는 지원하지 않으며, 두 기기를 동시에 잇는 멀티포인트 대신 Apple 기기 사이의 자동 전환을 쓴다. 안드로이드 폰과 윈도우 노트북을 오가며 쓰는 사람에게는 이 전환 방식이 가격보다 먼저 걸리는 조건이다. ANC를 켠 재생은 최대 8시간, 케이스 포함 24시간이다.',
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
    updated: '2026-10',
  },
  {
    brand: 'Sony',
    intro:
      // 2026-10-08 교정: "별도 수입사 없이"는 저장된 원문이 없고 내부 설계 문서(2026-08-12 brand-page-design)와도
      // 충돌해 뺐다. 확인된 것은 소니코리아가 고객지원 창구를 운영한다는 사실이다.
      '소니는 한국 법인 소니코리아(주)가 판매와 고객지원 창구를 운영한다. 헤드폰·이어폰은 모델 코드 앞자리로 계열이 갈리는데, 오버이어형은 WH-, 완전무선 이어폰은 WF-로 시작하고 그중 최상위 노이즈 캔슬링 라인에는 "1000X Series"라는 이름이 공통으로 붙는다. 공개 모델 WF-1000XM5는 이 1000X 시리즈의 완전무선 쪽 모델이다.',
    lines: [
      {
        name: '1000X Series(WH-/WF-)',
        what: '오버이어(WH-1000XM6)와 완전무선(WF-1000XM5) 두 폼팩터에 걸쳐 붙는 노이즈 캔슬링 라인이다. 공개 모델 WF-1000XM5가 이 라인의 완전무선 쪽 모델이다. WH-1000XM6은 오버이어 헤드폰이라 WF-1000XM5의 후속작이 아니다.',
        categories: ['무선이어폰'],
      },
      {
        name: 'LinkBuds',
        what: '오픈이어형 라이프스타일 라인이다. 공식몰에 LinkBuds Clip처럼 귀를 막지 않고 하루 종일 착용하는 데 초점을 맞춘 모델이 올라 있어, 차음을 우선하는 1000X 시리즈와 성격이 다르다.',
      },
      {
        name: 'INZONE',
        // 2026-10-08 3차(sony.co.kr/headphones 재확인): 페이지에서 확인한 소개 문구로 좁혔다. INZONE Buds 등
        // 개별 제품 구성은 이번 발췌에서 확인하지 않아 뺐다.
        what: '게이밍 라인이다. 2026-10-08 소니 헤드폰 페이지는 INZONE을 "프로 게이머들과 공동 개발한 다양한 게이밍 장비"로 소개한다.',
      },
      {
        name: 'Signature Series',
        what: '하이 레졸루션 사운드를 내세우는 라인으로, 소니 헤드폰 페이지가 별도 섹션으로 소개한다(2026-10-08 확인).',
      },
    ],
    serviceCenter: {
      phone: '1588-0911',
      sourceUrl: 'https://www.sony.co.kr/electronics/support',
      note: '소니코리아(주) 제품 지원 페이지에 안내된 고객지원센터 번호다.',
    },
    editorNote:
      // 2026-10-08 교정: "후속 모델 출시만으로 할인폭이나 성능 가치를 단정하지 않는다" 같은 부정문을
      // sony.ts 사양(코덱·배터리)에서 나온 판단으로 바꿨다.
      '공개 모델 WF-1000XM5의 231,450원은 2026-08-24 조사 가격이다. 공식 도움말이 안내하는 두 기기 연결은 한쪽 재생을 멈춘 뒤 다른 기기에서 재생을 시작하는 방식이라, 두 기기 소리를 동시에 들어야 하는 용도와는 다르다. 코덱은 LDAC·AAC·SBC·LC3를 지원하고, NC를 켠 재생은 이어폰 단독 음악 8시간·통화 6시간이다.',
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
    updated: '2026-10',
  },
  {
    brand: 'Anker',
    intro:
      '앤커는 한국 법인 앤커이노베이션코리아(주)가 판매와 A/S를 직접 운영한다. 오디오 제품은 "사운드코어(Soundcore)"라는 서브브랜드로 나오는데, 완전무선 이어폰 대표 라인인 "리버티(Liberty)" 시리즈는 공개 모델 리버티5를 시작으로 리버티5 프로, 리버티5 프로 맥스까지 세 단계 위계로 나뉜다.',
    lines: [
      {
        name: '리버티(Liberty) 시리즈',
        // 2026-10-08 교정: 기네스 인증은 제조사 주장이라 주어를 밝혔다.
        what: '사운드코어 완전무선 이어폰의 주력 라인이다. 공개 모델 리버티5(적응형 ANC 3.0)가 가장 아래이고, 그 위에 적응형 ANC 4.0을 넣고 제조사가 통화 품질의 기네스 세계기록 인증을 내세우는 리버티5 프로, 최상위에 AI 녹음기와 디스플레이 컨트롤을 더한 리버티5 프로 맥스가 있다.',
        categories: ['무선이어폰'],
      },
      {
        name: '에어로클립(AeroClip)',
        what: '귀를 막지 않는 오픈형(귀걸이형) 이어폰 라인으로, 사운드코어 공식몰에 리버티 시리즈와 별도 카테고리로 올라 있다.',
      },
      {
        name: 'P 시리즈',
        // 2026-10-08 교정: "리버티보다 낮은 가격대"는 저장된 가격 자료가 없어 뺐다.
        what: 'P42i 같은 모델이 속한 무선이어폰 라인이다.',
      },
    ],
    serviceCenter: {
      phone: '1666-8470',
      sourceUrl: 'https://ankerkorea.co.kr/article/개인-고객-문의/3001/27/',
      note: '앤커의 한국 법인 앤커이노베이션코리아(주)가 직접 운영하는 대표번호로, QCY처럼 별도 수입사를 거치지 않는다. 이어폰을 포함한 소형 액세서리는 기본 보증 18개월(회원가입 시 24개월로 연장)이고, 보증 기간 내 하자가 확인되면 수리가 아니라 1:1 새 제품 교체로 처리된다.',
    },
    editorNote:
      '공개 모델 Liberty 5(A3957)의 91,900원은 2026-08-24 조사 가격이다. 공식 지원 문서는 Dual Connections와 LDAC 또는 Dolby Sound의 동시 사용을 지원하고 해당 조건의 재생 시간을 4시간으로 안내한다. ANC 기본 음악 최대 8시간과 구분하면 장시간 업무에서 중간 충전이 필요한지 판단할 수 있다. 위 기네스 인증은 리버티5 프로 이야기라 이 모델의 통화 품질 근거로 쓸 수 없다.',
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
    updated: '2026-10',
  },
];
