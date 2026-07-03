import { Appliance } from '@/types/appliance';

export const sonyAppliances: Appliance[] = [
  // === 무선이어폰 ===
  {
    id: 'sony-wf-1000xm5',
    slug: 'sony-wf-1000xm5',
    brand: 'Sony',
    name: '소니 WF-1000XM5',
    modelNumber: 'WF-1000XM5',
    category: '무선이어폰',
    rating: 4.5,
    images: [],
    price: 359000,
    description:
      '소니 WF-1000XM5. 8.4mm Dynamic Driver X와 전용 QN2e·V2 프로세서로 동급 최상위 차음 성능을 구현한 플래그십 무선 이어폰. LDAC 코덱과 DSEE Extreme 업스케일링을 지원한다.',
    oneliner: 'ANC 끝판왕 플래그십',
    editorComment:
      '노이즈 캔슬링만 놓고 보면 여전히 기준점이 되는 제품입니다. 저음뿐 아니라 사람 목소리 대역까지 강하게 억제해 카페·사무실에서 정숙함이 탁월하고, LDAC 기반 음질도 정교합니다. 전작보다 25% 작아져 착용감도 좋아졌습니다. 다만 가격대가 높고, LDAC와 멀티포인트를 동시에 쓸 수 없으며 방수는 IPX4로 다소 아쉽습니다. 안드로이드 사용자 중 음질·차음을 최우선으로 본다면 최상위 선택입니다.',
    status: 'best',
    tags: ['소니', 'WF-1000XM5', '무선이어폰', 'ANC', '노이즈캔슬링', 'LDAC', '플래그십', '고음질'],

    specs: {
      powerConsumption: 0,
      noise: 8,
      energyEfficiency: 9,
      performance: 9,
      convenience: 8,
      durability: 7,
    },

    techSpecs: {
      coreTechnology: '8.4mm Dynamic Driver X · QN2e + V2 프로세서',
      capacity: '최대 24시간(케이스 포함)',
      extraSpecs: [
        { label: '드라이버', value: '8.4mm Dynamic Driver X' },
        { label: '코덱', value: 'LDAC · AAC · SBC' },
        { label: 'ANC', value: '적응형 ANC(QN2e 전용 프로세서)' },
        { label: '배터리', value: 'ANC ON 8h · 총 24h(케이스)' },
        { label: '방수', value: 'IPX4' },
        { label: '블루투스', value: '5.3' },
        { label: '멀티포인트', value: '지원(LDAC 사용 시 제한)' },
        { label: '무게', value: '약 5.9g(개당)' },
        { label: '공간음향', value: '360 Reality Audio · 헤드트래킹' },
        { label: '부가', value: 'DSEE Extreme 업스케일링' },
      ],
    },

    targetUsers: {
      recommended: [
        '음질·차음 성능을 최우선으로 보는 사용자',
        'LDAC 고음질 스트리밍을 즐기는 안드로이드 사용자',
        '작고 편안한 착용감을 원하는 사용자',
      ],
      notRecommended: [
        '가성비를 우선하는 소비자',
        'LDAC와 멀티포인트를 동시에 쓰려는 사용자',
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
      msrp: 359000,
      streetPrice: 259000,
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
    ],

    purchaseLinks: [
      { store: '소니 공식', url: '#', price: 359000, isOfficial: true },
      { store: '다나와 최저가', url: '#', price: 259000 },
    ],

    similarProducts: ['apple-airpods-pro3', 'samsung-galaxy-buds3-pro', 'anker-soundcore-liberty5'],
  },
];
