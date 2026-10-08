import { Appliance } from '@/types/appliance';

export const ankerAppliances: Appliance[] = [
  // === 무선이어폰 ===
  {
    id: 'anker-soundcore-liberty5',
    slug: 'anker-soundcore-liberty5',
    brand: 'Anker',
    name: '사운드코어 리버티5',
    modelNumber: 'A3957',
    category: '무선이어폰',
    image: '/images/appliances/anker/soundcore-liberty-5/main.webp',
    images: [],
    price: 91900,
    description:
      '앤커 사운드코어 Liberty 5(A3957)는 ANC 3.0, LDAC, 두 기기 연결과 Dolby Audio를 지원합니다. 최대 48시간은 ANC를 끈 케이스 포함 시간이며 기능 조합에 따라 재생 시간이 달라집니다.',
    oneliner: 'LDAC·두 기기 연결·ANC의 동시 사용 조건을 확인하는 이어폰',
    editorComment:
      'A3957은 LDAC·두 기기 연결을 지원하지만 공식 동시 기능 사용의 배터리 안내는 4시간입니다. ANC 켬 8시간·32시간과 끔 12시간·48시간을 구분하고, 앱 설정·팁·국내 서비스 비용을 실제 사용 방식에 맞춰 비교하세요.',
    status: 'featured',
    tags: ['앤커', '사운드코어', '리버티5', '무선이어폰', 'ANC', '가성비', 'LDAC', 'IP55'],

    specs: {
      noise: 9,
      energyEfficiency: 8,
      performance: 8,
      convenience: 8,
      durability: 9,
    },

    techSpecs: {
      coreTechnology: '9.2mm 울-페이퍼 다이어프램 다이나믹 드라이버',
      capacity: '최대 48시간(케이스 포함, ANC OFF)',
      extraSpecs: [
        { label: '드라이버', value: '9.2mm 울-페이퍼 다이어프램' },
        { label: '코덱', value: 'LDAC · AAC · SBC(Hi-Res)' },
        { label: 'ANC', value: '적응형 ANC 3.0' },
        { label: '배터리', value: 'ANC ON 8h · 총 32h(ANC OFF 48h)' },
        { label: '방수', value: 'IP55' },
        { label: '블루투스', value: '5.4' },
        { label: '멀티포인트', value: '지원' },
        { label: '무게', value: '약 4.6g(개당)' },
        { label: '공간음향', value: 'Dolby Audio' },
        { label: '충전', value: '무선충전 · 10분 충전 5시간 재생' },
      ],
    },

    targetUsers: {
      recommended: [
        "ANC·LDAC·두 기기 연결의 지원 조합을 확인하려는 사용자",
        "기본 ANC 음악 8시간과 동시 기능 4시간을 나눠 충전 계획을 세우는 사용자",
        'XXS~XL 여섯 가지 팁으로 착용을 맞춰 보려는 사용자',
      ],
      notRecommended: [
        "두 기기 연결+LDAC 또는 Dolby Sound를 중간 충전 없이 장시간 유지하려는 사용자",
        '사무실 대화를 완전히 차단하려는 사용자(제조사도 사람 목소리를 완전히 막지 못한다고 표기)',
        '특정 생태계(애플·삼성) 전용 연동이 필요한 사용자',
      ],
    },

    features: [
      '적응형 ANC 3.0(0.3초 단위 자동 보정)',
      'LDAC·Hi-Res Audio · Dolby Audio(soundcore 앱에서 켬)',
      '케이스 포함 최대 48시간(ANC 끔)·32시간(ANC 켬)',
      'IP55 · 무선충전 · 10분 충전 5시간 재생(시험 조건 미기재)',
      '6개 마이크 + 바람 대응 통화 알고리즘',
    ],

    priceAnalysis: {
      msrp: 91900,
      valueRating: 5,
      priceTier: 'mid',
      alternatives: ['qcy-melobuds-pro', 'samsung-galaxy-buds3-pro'],
    },

    reviews: [
      {
        userType: '가성비 따지는 대학생',
        rating: 5,
        text: '10만원도 안 되는데 ANC·LDAC·무선충전 다 되고 배터리도 오래 가요. 플래그십만큼은 아니어도 이 가격에 이 정도면 진짜 만족합니다.',
        pros: ['가성비', '긴 배터리', '풍부한 기능'],
        cons: ['저음 강조 튜닝'],
      },
      {
        userType: '이전에 플래그십 쓰던 사용자',
        rating: 4,
        text: 'ANC와 음질이 확실히 상급기보단 한 끗 아쉽긴 해요. 그래도 가격 생각하면 불만은 없고, IP55라 운동할 때 막 쓰기 좋습니다.',
        pros: ['방수', '가격 대비 성능'],
        cons: ['상급기 대비 ANC', '기본 튜닝 호불호'],
        source: '앤커 공식·다나와 사용기 종합',
        sourceUrl: 'https://prod.danawa.com/info/?pcode=91767473',
      },
      {
        userType: '해외 전문 리뷰 종합',
        rating: 4,
        text: '"에어팟의 견고한 저가 대안이지만 더 나은 선택지도 있다"는 게 해외 리뷰의 공통 평가입니다. 특히 통화 품질과 업무용(비즈니스) 활용에서 강점이 두드러지고, 딜 시즌에는 $90 안팎까지 내려가 가격 경쟁력이 더 커집니다.',
        pros: ['통화 품질', '딜가 기준 가격 경쟁력'],
        cons: ['동급 경쟁작 대비 확실한 우위는 아님'],
        source: 'TechRadar·scarbir 리뷰 종합',
        sourceUrl: 'https://www.techradar.com/audio/earbuds-airpods/anker-soundcore-liberty-5-review',
      },
      {
        userType: '리버티 시리즈 기존 사용자',
        rating: 3,
        text: '리버티4 NC나 4 프로에서 바꿀 예정이라면 LDAC·ANC·무선충전 등 자신에게 필요한 기능의 차이를 먼저 확인하세요. 같은 조건에서 측정한 성능 자료 없이 차음 성능의 우열을 단정하기는 어렵습니다.',
        pros: ['시리즈 전반의 무난한 기본기'],
        cons: ['전작 대비 신기능 부족', '상위 라인 5 프로 등장'],
        source: 'SoundGuys 리뷰 종합',
        sourceUrl: 'https://www.soundguys.com/anker-soundcore-liberty-5-review-137445/',
      },
    ],

    purchaseLinks: [
      { store: '앤커 공식', url: '#', price: 99000, isOfficial: true },
      { store: '쿠팡', url: 'https://link.coupang.com/a/g88WPAqttA' },
    ],

    similarProducts: ['qcy-melobuds-pro', 'samsung-galaxy-buds3-pro', 'sony-wf-1000xm5'],
  },
];
