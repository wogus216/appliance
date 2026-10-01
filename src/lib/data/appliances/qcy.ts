import { Appliance } from '@/types/appliance';

export const qcyAppliances: Appliance[] = [
  // === 무선이어폰 ===
  {
    id: 'qcy-melobuds-pro',
    slug: 'qcy-melobuds-pro',
    brand: 'QCY',
    name: '멜로버즈 프로',
    modelNumber: 'HT08',
    category: '무선이어폰',
    image: '/images/appliances/qcy/ht08/main.webp',
    images: [],
    price: 46900,
    description:
      'QCY 멜로버즈 프로(HT08). 4만원대 가격에 12mm 대구경 드라이버, LDAC Hi-Res, 하이브리드 ANC(최대 -46dB), 저지연 게이밍 모드를 담은 초가성비 노이즈캔슬링 이어폰.',
    oneliner: '4만원대 LDAC ANC',
    editorComment:
      'HT08은 LDAC와 액티브 노이즈 캔슬링을 갖춘 저가형 이어폰입니다. 제조사 공식 글로벌 페이지에는 최대 46dB ANC와 케이스 포함 최대 34시간(케이스 총량의 ANC 조건 미기재), 360도 공간음향과 무선충전이 표기돼 있습니다. 국내 판매 구성의 세부 기능은 구매처 표기도 함께 확인하세요. ANC 수치만으로 다른 브랜드와 실제 차음 성능을 비교할 수는 없습니다.',
    status: 'featured',
    tags: ['QCY', '멜로버즈프로', '무선이어폰', 'ANC', '가성비', 'LDAC', '저가', '게이밍모드'],

    specs: {
      noise: 8,
      energyEfficiency: 7,
      performance: 6,
      convenience: 6,
      durability: 8,
    },

    techSpecs: {
      coreTechnology: '12mm 바이오 다이어프램 다이나믹 드라이버',
      capacity: '최대 34시간(케이스 포함, ANC 조건 미기재)',
      extraSpecs: [
        { label: '드라이버', value: '12mm 바이오 다이어프램' },
        { label: '코덱', value: 'LDAC · AAC · SBC(Hi-Res)' },
        { label: 'ANC', value: '하이브리드 ANC(최대 -46dB)' },
        { label: '배터리', value: 'ANC ON 7.5h(이어버드) · 최대 34h(케이스, 조건 미기재)' },
        { label: '방수', value: 'IPX5' },
        { label: '블루투스', value: '5.3' },
        { label: '멀티포인트', value: '지원' },
        { label: '무게', value: '약 4~5g(개당)' },
        { label: '게이밍', value: '저지연 모드' },
      ],
    },

    targetUsers: {
      recommended: [
        '4만원대에서 ANC·LDAC를 경험하고 싶은 사용자',
        '첫 노이즈캔슬링 이어폰 또는 서브용을 찾는 사용자',
        '저지연 게이밍 모드가 필요한 캐주얼 게이머',
      ],
      notRecommended: [
        '플래그십급 ANC·음질을 기대하는 사용자',
        '통화 품질을 중시하는 사용자',
        '동일 조건의 ANC·통화 성능을 실측해 비교하려는 사용자',
      ],
    },

    features: [
      '4만원대에 LDAC Hi-Res 지원',
      '하이브리드 ANC(최대 -46dB)',
      '케이스 포함 최대 34시간(ANC 조건 미기재)',
      '저지연 게이밍 모드 · IPX5 생활방수',
      '6개 마이크 ENC 통화 노이즈 저감',
    ],

    priceAnalysis: {
      msrp: 46900,
      valueRating: 5,
      priceTier: 'budget',
      alternatives: ['anker-soundcore-liberty5', 'samsung-galaxy-buds3-pro'],
    },

    reviews: [
      {
        userType: '첫 ANC 이어폰 구매자',
        rating: 5,
        text: '4만원대인데 노이즈 캔슬링이 되고 LDAC까지 지원해서 놀랐어요. 저음도 빵빵하고 배터리도 오래 갑니다. 가격 생각하면 흠잡기 어려워요.',
        pros: ['초가성비', 'LDAC 지원', '긴 배터리'],
        cons: ['통화 품질 평범'],
      },
      {
        userType: '플래그십과 비교한 사용자',
        rating: 3,
        text: '저음 위주 튜닝은 취향을 타고 ANC 체감은 착용 상태와 소음 환경에 따라 달라집니다. 제조사 공식 HT08 페이지에는 공간음향과 무선충전이 표기돼 있으니 구매하려는 국내 판매 구성도 확인하는 편이 좋습니다.',
        pros: ['가격', '기본기'],
        cons: ['ANC 성능의 조건별 비교 자료 부족'],
        source: 'QCY 공식·다나와 사용기 종합',
        sourceUrl: 'https://prod.danawa.com/info/?pcode=71645780',
      },
      {
        userType: '해외 전문 리뷰 종합',
        rating: 4,
        text: '"QCY가 돌아왔다"는 평가가 나올 만큼 이 가격대에서 완성도가 높다는 게 해외 리뷰의 공통 결론입니다. 46dB ANC·LDAC·멀티포인트·ANC ON 7시간 배터리 등 스펙 대비 가격 우위가 뚜렷하고, 통화 품질도 저가형 치고 준수하다는 평입니다.',
        pros: ['스펙 대비 가격 우위', '멀티포인트·LDAC'],
        cons: ['브랜드 인지도·AS 접근성'],
        source: 'scarbir·Head-Fi 리뷰 종합',
        sourceUrl: 'https://www.scarbir.com/tws/qcy-melobuds-pro-review',
      },
    ],

    purchaseLinks: [
      { store: 'QCY 공식', url: '#', price: 49900, isOfficial: true },
      { store: '쿠팡', url: 'https://link.coupang.com/a/g88WThUfFk' },
    ],

    similarProducts: ['anker-soundcore-liberty5', 'samsung-galaxy-buds3-pro', 'sony-wf-1000xm5'],
  },
];
