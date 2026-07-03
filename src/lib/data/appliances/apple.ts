import { Appliance } from '@/types/appliance';

export const appleAppliances: Appliance[] = [
  // === 무선이어폰 ===
  {
    id: 'apple-airpods-pro3',
    slug: 'apple-airpods-pro3',
    brand: 'Apple',
    name: '애플 에어팟 프로 3',
    modelNumber: 'A3048',
    category: '무선이어폰',
    rating: 4.5,
    images: [],
    price: 369000,
    description:
      '애플 에어팟 프로 3세대(A3048, USB-C). H2 칩 기반으로 전작 대비 최대 4배 강력해진 노이즈 캔슬링에 심박수 센서·실시간 통역·청력 보조까지 더한 애플 생태계 완성형 이어폰.',
    oneliner: 'ANC 최강 애플 완성형 이어폰',
    editorComment:
      '아이폰 사용자에게는 사실상 정답에 가깝습니다. H2 칩으로 노이즈 캔슬링이 업계 최고 수준까지 올라왔고, 심박수 측정·청력 검사 등 헬스 기능과 다이내믹 헤드트래킹 공간음향까지 갖췄습니다. 애플 기기 간 자동 전환도 매끄럽습니다. 다만 안드로이드에서는 기능이 크게 제한되고 멀티포인트를 정식 지원하지 않으며, 가격도 높은 편입니다. 아이폰·애플워치 사용자라면 ANC와 완성도 측면에서 후회 없는 선택입니다.',
    status: 'best',
    tags: ['애플', '에어팟프로', '에어팟프로3', '무선이어폰', 'ANC', '노이즈캔슬링', 'H2칩', '공간음향'],

    specs: {
      powerConsumption: 0,
      noise: 8,
      energyEfficiency: 8,
      performance: 10,
      convenience: 9,
      durability: 8,
    },

    techSpecs: {
      coreTechnology: '애플 커스텀 고편위 드라이버 · H2 칩',
      capacity: '최대 24시간(케이스 포함)',
      extraSpecs: [
        { label: '드라이버', value: '커스텀 고편위 드라이버' },
        { label: '코덱', value: 'SBC · AAC' },
        { label: 'ANC', value: 'H2 칩 · 전작 대비 최대 4배' },
        { label: '배터리', value: 'ANC ON 8h · 총 24h(케이스)' },
        { label: '방수', value: 'IP57' },
        { label: '블루투스', value: '5.3' },
        { label: '멀티포인트', value: '미지원(애플 기기 자동 전환)' },
        { label: '무게', value: '5.55g(개당)' },
        { label: '공간음향', value: '다이내믹 헤드트래킹' },
        { label: '헬스', value: '심박수 센서 · 청력 보조' },
      ],
    },

    targetUsers: {
      recommended: [
        '아이폰·애플워치 등 애플 생태계 사용자',
        '동급 최강 노이즈 캔슬링을 원하는 사용자',
        '심박수·청력 보조 등 헬스 기능을 활용하려는 사용자',
      ],
      notRecommended: [
        '안드로이드에서 주로 쓰는 사용자',
        '멀티포인트 동시 연결이 꼭 필요한 사용자',
        '가성비를 최우선으로 보는 소비자',
      ],
    },

    features: [
      'H2 칩 기반 최대 4배 강력한 ANC',
      '심박수 센서 · 운동 추적 · 청력 보조',
      '실시간 통역(애플 인텔리전스)',
      '다이내믹 헤드트래킹 공간음향',
      'IP57 방수방진 · 폼 인퓨즈드 팁(XXS~L)',
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
    ],

    purchaseLinks: [
      { store: '애플 공식', url: '#', price: 369000, isOfficial: true },
      { store: '다나와 최저가', url: '#', price: 369000 },
    ],

    similarProducts: ['samsung-galaxy-buds3-pro', 'sony-wf-1000xm5', 'anker-soundcore-liberty5'],
  },
];
