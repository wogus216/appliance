import { Appliance } from '@/types/appliance';

export const appleAppliances: Appliance[] = [
  // === 무선이어폰 ===
  {
    id: 'apple-airpods-pro3',
    slug: 'apple-airpods-pro3',
    brand: 'Apple',
    name: '에어팟 프로 3',
    // 애플 공식 사양 페이지 '상품정보표시'에 표기된 모델 번호 3종(좌·우 유닛·케이스).
    // 2026-08-23 https://www.apple.com/kr/airpods-pro/specs/ 에서 확인.
    modelNumber: 'A3063 / A3064 / A3122',
    category: '무선이어폰',
    image: '/images/appliances/apple/airpods-pro-3/main.webp',
    images: [],
    price: 369000,
    description:
      '애플 에어팟 프로 3세대(A3063·A3064·A3122, USB-C). H2 칩, 1세대 대비 최대 4배·에어팟 프로 2 대비 최대 2배(애플 공식 표기) 노이즈 캔슬링, 심박수 센서·실시간 통역·청력 보조 기능을 갖춘 이어폰입니다.',
    oneliner: 'Apple 기기 연동·건강 기능·ANC 재생 조건을 확인하는 이어폰',
    editorComment:
      '에어팟 프로 3은 아이폰·Mac을 같은 Apple 계정으로 쓰는 사람에게 맞는 이어폰입니다. 이어폰 ANC 재생은 8시간으로 늘었지만 케이스 포함 합계가 24시간이라 케이스가 보태는 양은 16시간(완충 2회)입니다.',
    status: 'best',
    tags: ['애플', '에어팟프로', '에어팟프로3', '무선이어폰', 'ANC', '노이즈캔슬링', 'H2칩', '공간음향'],

    specs: {
      noise: 7,
      energyEfficiency: 8,
      performance: 10,
      convenience: 9,
      durability: 8,
    },

    techSpecs: {
      coreTechnology: '맞춤 제작 드라이버·앰프 · H2 칩',
      capacity: '최대 24시간(케이스 포함·ANC 켬)',
      extraSpecs: [
        { label: '드라이버', value: '맞춤 제작 드라이버·앰프(Apple 표기)' },
        { label: '코덱', value: 'Apple 사양표 미기재(LDAC 미지원)' },
        { label: 'ANC', value: 'H2 칩 · 1세대 대비 최대 4배(에어팟 프로 2 대비 최대 2배)' },
        { label: '배터리', value: 'ANC 켬 8h · 케이스 포함 24h · 주변음+보청기 10h' },
        { label: '방수', value: 'IP57(이어폰·충전 케이스, IEC 60529)' },
        { label: '블루투스', value: '5.3' },
        { label: '멀티포인트', value: '같은 Apple 계정 Apple 기기 간 자동 전환 · 타사 기기 동시 연결 안내 없음' },
        { label: '무게', value: '5.55g(개당)' },
        { label: '공간음향', value: '다이내믹 헤드트래킹' },
        { label: '헬스', value: '심박수 센서 · 청력 보조' },
      ],
    },

    targetUsers: {
      recommended: [
        '아이폰·애플워치 등 애플 생태계 사용자',
        '한 번 충전의 ANC 청취 시간(최대 8시간)이 케이스 합계보다 중요한 사용자',
        '심박수·청력 보조 등 헬스 기능을 활용하려는 사용자',
      ],
      notRecommended: [
        '안드로이드에서 주로 쓰는 사용자',
        'Windows PC·안드로이드와 iPhone을 동시에 연결해 두려는 사용자(Apple 안내는 같은 계정 Apple 기기 간 전환뿐)',
        '케이스를 며칠씩 충전하지 않는 사용자(케이스 포함 ANC 24시간, 에어팟 프로 2는 30시간)',
      ],
    },

    features: [
      'ANC 최초 AirPods Pro 대비 최대 4배·Pro 2 대비 최대 2배(IEC 60268-24, Apple 표기)',
      '심박수 센서(iOS 26 이상 피트니스·호환 앱) · 청력 보조(만 18세 이상)',
      '실시간 번역(Apple Intelligence 켠 iOS 26 이상 iPhone, 베타)',
      '동적 머리 추적 공간 음향(지원 앱·콘텐츠)',
      'IP57(이어폰·충전 케이스) · 폼 인퓨즈드 팁 5가지(XXS~L)',
    ],

    priceAnalysis: {
      msrp: 369000,
      valueRating: 4,
      priceTier: 'premium',
      alternatives: ['samsung-galaxy-buds3-pro', 'sony-wf-1000xm5'],
    },

    reviews: [
      {
        userType: '아이폰·애플워치 사용자',
        rating: 5,
        text: '노이즈 캔슬링이 진짜 강력합니다. 지하철·비행기에서 압도적이고, 애플 기기끼리 전환도 자동이라 편해요. 심박수까지 재주니 러닝할 때 워치 대용으로도 씁니다.',
        pros: ['최강 ANC', '애플 생태계 연동', '헬스 기능'],
        cons: ['비싼 가격'],
      },
      {
        userType: '안드로이드도 함께 쓰는 사용자',
        rating: 4,
        text: '아이폰에서는 최고인데 안드로이드 태블릿에 물리면 기능이 확 줄어요. 멀티포인트도 정식 지원이 아니라 기기 여러 대 오가는 사람은 감안해야 합니다.',
        pros: ['음질', 'ANC'],
        cons: ['안드로이드 제한', '멀티포인트 미지원'],
        source: '애플 공식 스펙·전문 리뷰 종합',
        sourceUrl: 'https://www.apple.com/kr/airpods-pro/',
      },
      {
        userType: '반년 이상 장기 사용자',
        rating: 5,
        text: '출시 직후보다 지금이 더 좋다는 게 장기 리뷰들의 공통 결론입니다. 펌웨어 업데이트로 실사용 품질이 개선됐고, ANC·마이크·착용감은 여전히 동급 최상위라는 평가입니다.',
        pros: ['펌웨어로 지속 개선', '동급 최상위 ANC·마이크'],
        cons: ['프로2 대비 업그레이드 필요성은 사람마다 다름'],
        source: 'AppleInsider·9to5Mac 장기 리뷰 종합',
        sourceUrl: 'https://9to5mac.com/2026/04/14/airpods-pro-3-better-today-than-at-launch-video/',
      },
    ],

    purchaseLinks: [
      { store: '애플 공식', url: '#', price: 369000, isOfficial: true },
      { store: '쿠팡', url: 'https://link.coupang.com/a/g88WHHtvr2' },
    ],

    similarProducts: ['samsung-galaxy-buds3-pro', 'sony-wf-1000xm5', 'anker-soundcore-liberty5'],
  },
];
