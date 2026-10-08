import type { CategoryGuide } from './index';
import { SITE_AUTHOR } from '@/lib/constants';

export const wirelessEarbudsGuide: CategoryGuide = {
  category: '무선이어폰',
  title: '무선이어폰, 스펙표보다 생태계와 ANC 체감을 먼저 보세요',
  intro:
    "공개 모델은 ANC·코덱·기기 전환을 서로 다른 조합으로 지원합니다. 같은 기능 이름이나 가격만으로 차음·통화 만족도를 정하지 않고, 주 사용 휴대전화·회의 앱·연속 사용 시간과 착용 조건에 맞춰 후보를 좁힙니다.",
  sections: [
    {
      heading: 'ANC 성능은 dB 숫자로 판단하기 어렵습니다',
      body: '제조사의 ANC 수치는 시험 조건과 비교 대상을 먼저 읽어야 합니다. Apple의 최대 4배는 AirPods Pro 1세대 대비, 최대 2배는 2세대 대비이며 안내 시험 규격은 IEC 60268-24입니다. QCY는 최대 46dB를 20Hz~2,500Hz 범위의 감소로 적고, soundcore는 Liberty 5가 전작보다 사람 목소리 대역(300Hz~3kHz)에서 6.5dB 더 줄인다고 적으면서도 목소리를 완전히 막지는 않는다고 덧붙입니다. Sony는 감쇠 수치 대신 "최고의 노이즈 캔슬링"을 적는데, 각주상 2024년 9월 1일 기준 JEITA 호환 가이드라인으로 점유율 상위 10개 브랜드를 잰 자체 조사입니다. Apple도 2025년 7월 IEC 60268-24로 가장 많이 팔린 인이어 제품과 비교해 "세계 최고"를 적습니다. 두 "최고"는 시점·규격·비교군이 달라 서로를 반증하지도, 현재 후보의 순위를 정해 주지도 않습니다. 세대 비교 배수, 범위 안 최대값, 전작 대비 차이도 서로 다른 잣대입니다. 지하철 저음 소음인지 사무실 대화인지 차단하려는 소음을 먼저 정하고, 반품 기간 안에 팁을 바꿔 가며 확인하세요.',
    },
    {
      heading: '코덱보다 먼저 확인할 것은 어떤 폰과 쓰는지입니다',
      body: "사용 휴대전화의 운영체제·모델과 필요한 기능을 먼저 정하세요. Buds3 Pro의 24bit/96kHz 재생은 One UI 6.1.1 이상의 S23·S24 시리즈, Z 폴드5·6, Z 플립5·6, 탭 S9 시리즈에서, 자동 전환은 One UI 4.1.1 이상 갤럭시 폰·태블릿과 One UI 6.0 이상 갤럭시 북에서 삼성 계정 로그인 시 안내됩니다(2026-10-08 삼성 페이지 각주). AirPods의 자동 전환·심박수·청력 보조·통역도 Apple 기기와 지역 조건을 따릅니다. Sony·Liberty 5·HT08의 LDAC는 iPhone에서 쓸 수 없고, HT08은 제조사 페이지와 다나와 모두 AAC를 적지 않아 iPhone 사용자는 연결 코덱을 판매처에 확인해야 합니다.",
    },
    {
      heading: '두 기기 연결과 코덱 조합은 모델마다 안내가 다릅니다',
      body: '일반 두 기기 연결과 생태계 자동 전환을 구분하세요. Sony 공식 도움말은 WF-1000XM5를 두 기기에 연결한 뒤 한쪽 재생을 멈추고 다른 기기에서 재생하는 절차를 안내하고, 이어폰으로 통화하는 중 다른 기기에 걸려 온 전화는 그 기기에서 벨이 울린다고 적습니다. 같은 도움말에는 두 기기 연결 중 LDAC 사용 여부가 없습니다. Liberty 5는 제조사 페이지가 LDAC를 켠 상태에서도 두 기기를 오갈 수 있다고 적지만, 지원 문서는 두 기기 연결과 LDAC 또는 Dolby Sound를 함께 쓰면 배터리가 4시간만 간다고 답합니다. HT08은 국내 수입사 상세에 앱에서 LDAC를 켜면 멀티포인트가 자동으로 끊긴다고 적혀 있어 두 기능을 함께 쓸 수 없습니다. AirPods의 자동 전환은 Apple 사용 설명서상 같은 Apple 계정의 Apple 기기 사이 기능이고 타사 기기는 Bluetooth 헤드셋으로 따로 페어링하며, Buds3 Pro의 오토 스위치도 갤럭시 기기·갤럭시 북까지입니다. 회사 Windows PC는 두 목록에 없으므로 일반 폰·PC 멀티포인트와 동일하게 보지 마세요.',
    },
    {
      heading: '통화 품질은 음질과 별개의 항목입니다',
      body: '마이크 수와 기능 이름은 통화 품질 순위가 아닙니다. Sony는 골전도 센서와 AI 노이즈 감소, Samsung은 슈퍼 클리어 콜(슈퍼 와이드밴드 콜은 One UI 6.1.1 이상 Z 폴드6·Z 플립6 한정), Liberty 5는 6개 마이크와 바람 대응 알고리즘, QCY는 6개 마이크·ENC 구성을 안내하지만 같은 기기·앱·바람·소음 조건의 비교 시험을 확보하지 못했습니다. 통화 배터리도 따로 봐야 합니다. ANC를 켠 이어폰 통화 시간은 Sony 6시간(사양표 "연속 통신 시간"), Buds3 Pro 4.5시간, HT08 3.5시간(국내 수입사 사양)으로 각각 음악보다 2시간·1.5시간·4시간 짧고, Apple·soundcore 페이지에서는 통화 시간 항목을 찾지 못했습니다(2026-10-08 확인). 화상회의가 주 용도라면 이 통화 시간이나 판매처에 문의한 값을 기준으로 삼으세요.',
    },
    {
      heading: '배터리는 한 번에 이어 쓰는 시간으로 보세요',
      body: '케이스 합계와 이어폰 연속 사용을 분리하세요. 제조사 ANC 음악 안내는 AirPods Pro 3·WF-1000XM5·Liberty 5 최대 8시간, HT08 7.5시간, Buds3 Pro 6시간이지만 같은 시험 장치·설정인지 확인하지 못했습니다. 그래서 순위 대신 내 사용 시간이 어느 값을 넘는지로 읽습니다. 7시간 비행이면 표기상 Buds3 Pro만 중간 충전이 필요하고, Liberty 5를 두 기기 연결+LDAC 또는 Dolby Sound로 쓰면 4시간, AirPods Pro 3를 운동 심박 측정과 함께 쓰면 6.5시간이 기준이 됩니다. HT08의 케이스 포함 34시간은 국내 수입사 상세 기준 ANC 끔 값(켬 30시간)이고, WF-1000XM5의 케이스 포함 24시간은 소니 기능 페이지 각주의 NC 켬 값(이어폰 8+케이스 16)입니다.',
    },
    {
      heading: '방수 등급과 무게, 오래 쓰는 조건',
      body: '같은 IP 표기라도 제조사가 밝힌 범위가 다릅니다. 삼성은 Buds3 Pro의 IP57을 최대 1m 담수에 최대 30분 담그는 내부 시험으로 설명하고, 해변·수영장 사용은 권장하지 않으며 충전 케이스는 방수가 되지 않는다고 적습니다. Sony의 IPX4 상응도 충전 케이스와 이어버드 팁은 제외입니다. Apple은 이어폰과 충전 케이스 모두 IP57로 표기하지만 젖은 상태로 충전하지 말라고 적습니다. Liberty 5의 IP55는 케이스 적용 여부가 없고, HT08의 IPX5는 제조사 글로벌 페이지에는 없고 국내 수입사 사양표에 있으며 케이스 적용 여부는 적혀 있지 않습니다. 운동 용도라면 등급보다 땀 노출 뒤 건조 절차와 빠짐을 확인하고, 무게보다 팁 구성(AirPods XXS~L 다섯 가지, Liberty 5 XXS~XL 여섯 가지, WF-1000XM5 SS 포함 네 가지, Buds3 Pro S·M·L 세 가지)이 귀에 맞는지를 먼저 보세요.',
    },
    {
      heading: '가격보다 먼저 맞출 조건',
      body: '2026-08-24 조사 가격은 AirPods Pro 3 369,000원, Buds3 Pro 237,390원, WF-1000XM5 231,450원, Liberty 5 91,900원, HT08 46,900원이었고 현재 견적과 구분해야 합니다. 가격으로 ANC·통화 등급을 정하지 않는 대신, 차액이 사는 것 가운데 확인 가능한 부분을 보세요. AirPods와 Buds는 같은 제조사 기기가 있을 때만 값이 생기는 자동 전환·건강·통역 기능, Sony는 통화 시간·충전 시간·두 기기 전환 절차까지 공개한 문서 범위가 있습니다. HT08은 국내 수입사가 멜로버즈 프로 플러스라는 이름으로 팔며(같은 HT08), 방수·통화 시간·보증 12개월은 수입사 상세에 있지만 무게·AAC는 어디에도 없으므로 그 항목이 필요하면 판매처 답을 받은 뒤 비교하세요. 마지막으로 같은 날의 국내 판매가·교체 팁·한쪽 유닛 서비스 조건을 맞춰 봅니다.',
    },
  ],
  faqs: [
    {
      question: '아이폰에 갤럭시 버즈를, 갤럭시에 에어팟을 써도 되나요?',
      answer:
        "Bluetooth 재생은 되지만 기능별 지원은 따로입니다. Buds3 Pro의 24bit 재생·자동 전환·통역은 삼성이 지정한 갤럭시 기기와 삼성 계정 조건에서만 안내되고, Apple은 AirPods Pro 3를 Android 같은 타사 기기에 Bluetooth 헤드셋으로 연결할 수 있지만 Siri는 쓸 수 없고 일부 기능이 제한된다고 적습니다. 주 사용 기기와 다음에 바꿀 기기를 적어 각 기능의 공식 지원 목록에 대조한 뒤 선택하세요.",
    },
    {
      question: 'LDAC를 지원하면 음질이 확실히 좋아지나요?',
      answer:
        'LDAC 지원만으로 체감 음질 우위를 보장하지 않습니다. 재생 기기의 지원·실제 활성화 상태와 음원·이어팁 밀폐를 확인하세요. Sony 도움말의 두 기기 연결 절차에는 LDAC 제한 문구가 없어, 두 기능을 반드시 양자택일해야 한다는 근거는 확보하지 못했습니다. Liberty 5는 LDAC를 켠 채 두 기기를 오갈 수 있다고 제조사가 적지만, 이 조합에서는 배터리가 4시간으로 안내됩니다. HT08은 국내 수입사 상세상 LDAC를 켜면 멀티포인트가 끊기고, 공간 음향을 켜면 LDAC가 꺼집니다. iPhone에서는 LDAC를 쓸 수 없습니다.',
    },
    {
      question: '10만원 이하 ANC 이어폰도 지하철 통근에 쓸 만한가요?',
      answer:
        '후보로 검토할 수 있지만 가격만으로 통근 차음이 충분하다고 보장하지 않습니다. 배터리는 계산할 수 있습니다. Liberty 5(2026-08-24 조사가 91,900원)는 ANC 켬 이어폰 8시간·케이스 포함 32시간, HT08(46,900원)은 ANC 켬 7.5시간이므로 왕복 2시간 통근은 한 번 충전 범위 안입니다. 차음은 같은 조건 비교 시험이 없으므로, 지하철 저음 소음에서 팁 밀폐를 맞춰 볼 수 있는 반품 조건을 먼저 확인하세요.',
    },
    {
      question: '멀티포인트는 꼭 필요한 기능인가요?',
      answer:
        "휴대전화와 PC를 번갈아 쓴다면 두 기기를 연결한 뒤 재생·회의를 전환하는 절차를 확인하세요. Sony는 한쪽 재생을 멈추고 다른 기기에서 시작하는 방식이고, Liberty 5는 두 기기 연결과 LDAC 또는 Dolby Sound를 함께 켜면 4시간, HT08은 LDAC를 켜면 멀티포인트가 자동으로 끊깁니다. Apple 자동 전환과 Galaxy 자동 전환은 같은 제조사 기기·계정 조건을 따르므로, 회사 Windows PC가 끼어 있다면 일반 두 기기 연결을 지원하는 모델이 필요합니다.",
    },
    {
      question: '운동용으로는 어느 정도 방수 등급이 필요한가요?',
      answer:
        '등급 숫자를 운동용 합격선으로 정하지 않습니다. 모델별 적용 부위·시험 범위·물 노출 뒤 건조 절차를 확인하세요. 수영·샤워·세제·온수에 사용할 수 있다는 뜻은 아니며 케이스 등급도 별도 확인해야 합니다. 운동 중 빠짐과 압박은 실제 착용 조건으로 판단하세요.',
    },
  ],
  sources: [
    { url: "https://helpguide.sony.net/mdr/2963/v1/en/contents/TP1001106282.html", title: "Sony WF-1000XM5 두 기기 연결·재생 전환 안내", publisher: "Sony" },
    { url: "https://service.soundcore.com/article-description/Can-I-use-Dual-Connections-and-LDAC-or-Dolby-Sound-simultaneously", title: "Liberty 5 Dual Connections와 LDAC/Dolby 동시 사용·4시간 안내", publisher: "Soundcore" },
    { url: 'https://www.soundcore.com/products/a3957-liberty-5-tws-earbuds?variant=45054923014334', title: 'A3957 Liberty 5 사양 — 재생 시간·IP55·이어팁 6종·목소리 대역 ANC 표기', publisher: 'soundcore' },
    { url: 'https://www.samsung.com/sec/buds/galaxy-buds/galaxy-buds3-pro/', title: '갤럭시 버즈3 프로 — 재생 시간 시험 조건·IP57·SSC 지원 기기·오토 스위치 조건', publisher: '삼성전자' },
    { url: 'https://www.samsung.com/sec/buds/galaxy-buds/galaxy-buds3-pro/specs/', title: '갤럭시 버즈3 프로 상세 스펙 — 통화 시간·배터리 용량', publisher: '삼성전자' },
    { url: 'https://www.sony.co.kr/headphones/products/wf-1000xm5/features8', title: 'WF-1000XM5 기능성 — 케이스 포함 24·36시간, 케이스·팁 방수 제외 각주', publisher: 'Sony' },
    { url: 'https://support.apple.com/ko-kr/guide/airpods/dev499c9718b/web', title: '타사 기기와 AirPods 페어링하기', publisher: 'Apple' },
    { url: 'https://ylshop.co.kr/product/qcy-ht08-멜로버즈-프로-플러스-블루투스-이어폰-노이즈캔슬링-블랙/977/category/24/display/1/', title: 'QCY-HT08 멜로버즈 프로 플러스 국내 수입사 상품 상세 — 사양표·LDAC와 멀티포인트 조건', publisher: 'QCY 공식 수입사 와이엘사이언스' },
    {
      url: 'https://www.qcy.com/products/qcy-melobuds-pro',
      title: 'QCY HT08 공식 글로벌 사양 — 34시간, ANC 20Hz~2,500Hz 범위, 360도 공간음향',
      publisher: 'QCY',
    },
    {
      url: 'https://www.apple.com/kr/airpods-pro/specs/',
      title: 'AirPods Pro 3 기술 사양 — IP57, ANC 최대 8시간·케이스 포함 24시간, Bluetooth 5.3, H2 칩, 이어팁 XXS~L',
      publisher: 'Apple',
    },
    {
      url: 'https://www.apple.com/kr/airpods-pro/',
      title: 'AirPods Pro 3 제품 페이지 — ANC 배수 표기(2세대 대비 최대 2배, 1세대 대비 최대 4배)와 IEC 60268-24 시험 기준',
      publisher: 'Apple',
    },
  ],
  covers: "Apple의 ANC 비교 대상·시험 조건은 기존 근거를 유지했고, Apple 사양표(케이스 IP57·기능별 청취 시간), 삼성 버즈3 프로 페이지(재생 시간 시험 조건·IP57·SSC 지원 기기·오토 스위치 조건), soundcore A3957 페이지와 지원 문서(팁 구성·목소리 대역 표기·동시 사용 4시간), QCY 글로벌 사양(ANC 범위·누락 항목), Sony 두 기기 연결 도움말을 2026-10-08에 다시 대조했습니다. 같은 날 브라우저로 Sony 사양표·기능 페이지(케이스 포함 24·36시간, 연속 통신 시간, 케이스·팁 방수 제외, 골전도 센서, ‘최고’ 각주), 삼성 상세 스펙(통화 시간·충전 케이스 방수 아님·팁 S·M·L), Apple 사용 설명서(같은 계정 Apple 기기 간 전환·타사 기기 페어링), QCY 국내 수입사 상세(판매명 멜로버즈 프로 플러스=HT08, IPX5·통화 시간·케이스 포함 ANC 켬 30시간·LDAC와 멀티포인트 배타)도 열어 대조했습니다. ANC·통화·착용 우열의 동일 조건 시험은 확보하지 못했습니다.",
  reviewedBy: SITE_AUTHOR,
  sourcesCheckedAt: '2026-10-08',
  updated: '2026-10',
};
