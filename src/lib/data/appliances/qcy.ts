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
      'QCY MeloBuds Pro(HT08)는 12mm 드라이버, LDAC, ANC와 저지연 모드를 갖춘 무선 이어폰입니다. 국내 공식 수입사는 같은 HT08을 "멜로버즈 프로 플러스(Melobuds Pro Plus)"라는 이름으로 판매합니다.',
    oneliner: 'LDAC와 두 기기 연결을 함께 켤 수 없는 HT08 ANC 이어폰',
    editorComment:
      '국내 수입사 판매명은 멜로버즈 프로 플러스지만 모델은 같은 HT08입니다. 수입사 상세는 앱에서 LDAC를 켜면 멀티포인트가 자동으로 끊긴다고 적으므로, 폰·PC를 오가며 쓸 사람은 LDAC 없이 쓸지부터 정하세요. 최대 46dB는 제조사가 20Hz~2,500Hz 범위로 적은 값이며 시험 장치는 밝히지 않았습니다.',
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
      capacity: '최대 34시간(케이스 포함·ANC 끔) · ANC 켬 30시간',
      extraSpecs: [
        { label: '드라이버', value: '12mm 바이오 다이어프램' },
        { label: '코덱', value: 'LDAC(Hi-Res) · 그 밖의 코덱 공식 미기재' },
        { label: 'ANC', value: '하이브리드·적응형 ANC(최대 46dB, 20Hz~2,500Hz 표기)' },
        { label: '배터리', value: 'ANC 켬 7.5h/30h · 끔 8.5h/34h(이어폰/케이스 포함) · 통화 ANC 켬 3.5h' },
        { label: '방수', value: 'IPX5(국내 수입사 사양, 글로벌 페이지 미기재)' },
        { label: '블루투스', value: '5.3' },
        { label: '멀티포인트', value: '지원(앱에서 LDAC를 켜면 자동 해제)' },
        { label: '무게', value: '제조사 미기재' },
        { label: '충전', value: 'Type-C · 10분 충전 1시간 재생 · 국내 사양에 무선충전 표기 없음' },
        { label: '이어팁', value: 'S·M·L 각 1개' },
        { label: '게이밍', value: '저지연 80ms 모드(조건 미기재)' },
      ],
    },

    targetUsers: {
      recommended: [
        'LDAC를 켤 수 있는 안드로이드 기기로 주로 듣는 사용자',
        '첫 노이즈캔슬링 이어폰 또는 서브용을 찾는 사용자',
        '영상·게임에서 저지연 모드를 켜 쓸 사용자',
      ],
      notRecommended: [
        "최대 ANC 수치를 다른 모델의 차음 시험 결과와 직접 비교하려는 사용자",
        'AAC 연결을 확인하지 않은 채 iPhone에서 쓰려는 사용자',
        '두 기기 연결과 LDAC를 동시에 쓰려는 사용자(LDAC를 켜면 멀티포인트 자동 해제)',
      ],
    },

    features: [
      'LDAC · Hi-Res Wireless 인증 표기(LDAC를 켜면 멀티포인트·공간 음향 해제)',
      '하이브리드·적응형 ANC(최대 46dB, 20Hz~2,500Hz 표기)',
      '케이스 포함 ANC 끔 34시간·켬 30시간(국내 수입사 표기)',
      '저지연 80ms 모드 · 10분 충전 1시간 재생',
      '6개 마이크 ENC 통화 · IPX5(국내 수입사 사양)',
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
