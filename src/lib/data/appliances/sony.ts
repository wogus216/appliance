import { Appliance } from '@/types/appliance';

export const sonyAppliances: Appliance[] = [
  // === 무선이어폰 ===
  {
    id: 'sony-wf-1000xm5',
    slug: 'sony-wf-1000xm5',
    brand: 'Sony',
    name: 'WF-1000XM5',
    modelNumber: 'WF-1000XM5',
    category: '무선이어폰',
    image: '/images/appliances/sony/wf-1000xm5/main.webp',
    images: [],
    price: 231450,
    description:
      '소니 WF-1000XM5는 8.4mm Dynamic Driver X와 QN2e·V2 프로세서, ANC, LDAC와 두 기기 연결을 지원하는 무선 이어폰입니다.',
    oneliner: 'LDAC와 두 기기 연결, 폼 계열 팁을 갖춘 이어폰',
    editorComment:
      '폼 팁의 착용·교체 조건과 재생 기기의 코덱 지원을 먼저 확인하세요. 두 기기 연결은 오디오 혼합이 아니며 ANC 음악 8시간과 통신 6시간은 다른 조건입니다. 앱·펌웨어와 연결 기기의 지원 설정을 확인하세요.',
    status: 'best',
    tags: ['소니', 'WF-1000XM5', '무선이어폰', 'ANC', '노이즈캔슬링', 'LDAC', '플래그십', '고음질'],

    specs: {
      noise: 8,
      energyEfficiency: 9,
      performance: 9,
      convenience: 8,
      durability: 8,
    },

    techSpecs: {
      coreTechnology: '8.4mm Dynamic Driver X · QN2e + V2 프로세서',
      capacity: '최대 24시간(케이스 포함)',
      extraSpecs: [
        { label: '드라이버', value: '8.4mm Dynamic Driver X' },
        { label: '코덱', value: 'LDAC · AAC · SBC · LC3' },
        { label: 'ANC', value: '적응형 ANC(QN2e 전용 프로세서)' },
        { label: '배터리', value: 'ANC ON 8h · 총 24h(케이스)' },
        { label: '방수', value: 'IPX4' },
        { label: '블루투스', value: '5.3' },
        { label: '멀티포인트', value: '지원(두 기기 연결·재생 전환)' },
        { label: '무게', value: '약 5.9g(개당)' },
        { label: '공간음향', value: '360 Reality Audio · 헤드트래킹' },
        { label: '부가', value: 'DSEE Extreme 업스케일링' },
      ],
    },

    targetUsers: {
      recommended: [
        '음질·차음 성능을 최우선으로 보는 사용자',
        'LDAC 고음질 스트리밍을 즐기는 안드로이드 사용자',
        '작고 가벼운(개당 약 5.9g) 이어버드를 원하는 사용자',
      ],
      notRecommended: [
        '가성비를 우선하는 소비자',
        '여러 기기의 소리를 동시에 혼합하려는 사용자',
        '운동·야외에서 높은 방수 등급이 필요한 사용자',
      ],
    },

    features: [
      '동급 최상위 적응형 노이즈 캔슬링',
      'LDAC · DSEE Extreme 고음질',
      '전작 대비 25% 작아진 소형·경량 하우징',
      '골전도 센서 기반 정밀 통화 픽업',
      '무선(Qi)·USB-C 충전 지원',
    ],

    priceAnalysis: {
      msrp: 231450,
      valueRating: 4,
      priceTier: 'premium',
      alternatives: ['samsung-galaxy-buds3-pro', 'apple-airpods-pro3'],
    },

    reviews: [
      {
        userType: '카페에서 일하는 프리랜서',
        rating: 5,
        text: '노이즈 캔슬링이 정말 조용합니다. 옆 테이블 대화까지 눌러줘서 집중이 잘 돼요. LDAC로 들으면 음질도 세밀하고, 작아서 오래 껴도 안 아픕니다.',
        pros: ['압도적 ANC', 'LDAC 음질', '편안한 착용감'],
        cons: ['비싼 가격'],
      },
      {
        userType: '운동하며 쓰는 사용자',
        rating: 4,
        text: '음질·차음은 최고인데 IPX4라 땀 많이 나는 격한 운동엔 살짝 불안해요. LDAC 켜면 멀티포인트가 막히는 것도 아쉽습니다.',
        pros: ['음질', 'ANC'],
        cons: ['IPX4 방수', 'LDAC+멀티포인트 제한'],
        source: '소니 공식·다나와 사용기 종합',
        sourceUrl: 'https://prod.danawa.com/info/?pcode=27250154',
      },
      {
        userType: '폼 이어팁에 불만인 장기 사용자',
        rating: 3,
        text: '기본 폼 이어팁이 약해서 빨리 마모된다는 후기가 워낙 많아 걱정했는데 실제로도 그렇다는 보고가 이어집니다. 소모품 교체 비용과 소니 지원 대응에 대한 불만이 XM5·XM6 공통으로 제기되고 있어요.',
        pros: ['차음·음질 자체는 최상위'],
        cons: ['폼 이어팁 내구성', '소모품 교체 비용'],
        source: 'Reddit r/SonyHeadphones 커뮤니티 종합',
        sourceUrl: 'https://www.reddit.com/r/SonyHeadphones/comments/1v4zdk1/why_you_should_avoid_sony_wf_1000xm5xm6/',
      },
      {
        userType: 'XM6 출시 후 할인가 구매자',
        rating: 5,
        text: 'XM6가 나온 뒤 해외에선 $150 세일까지 등장했습니다. XM6의 ANC 개선은 25% 수준이라, 절반 가까운 가격이면 XM5가 여전히 합리적이라는 의견이 커뮤니티에서 우세합니다.',
        pros: ['후속작 출시 후 대폭 할인', '여전히 기준점급 ANC'],
        cons: ['최신 XM6 대비 구형 프로세서'],
        source: 'Reddit r/SonyHeadphones·Android Authority 종합',
        sourceUrl: 'https://www.reddit.com/r/SonyHeadphones/comments/1v60vj3/ive_found_sony_wf1000xm5_earbuds_on_sale_for/',
      },
    ],

    purchaseLinks: [
      { store: '소니 공식', url: '#', price: 359000, isOfficial: true },
      { store: '쿠팡', url: 'https://link.coupang.com/a/g88WLxu4uy' },
    ],

    similarProducts: ['apple-airpods-pro3', 'samsung-galaxy-buds3-pro', 'anker-soundcore-liberty5'],
  },
];
