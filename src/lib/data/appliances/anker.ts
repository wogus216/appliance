import { Appliance } from '@/types/appliance';

export const ankerAppliances: Appliance[] = [
  // === 무선이어폰 ===
  {
    id: 'anker-soundcore-liberty5',
    slug: 'anker-soundcore-liberty5',
    brand: 'Anker',
    name: '앤커 사운드코어 리버티5',
    modelNumber: 'A3957',
    category: '무선이어폰',
    rating: 4.3,
    images: [],
    price: 89900,
    description:
      '앤커 사운드코어 리버티5(A3957). 10만원 이하 가격에 적응형 ANC 3.0, LDAC Hi-Res, 최대 48시간 배터리, IP55 방진방수, 돌비 오디오 공간음향까지 담은 가성비 만능형 ANC 이어폰.',
    oneliner: '가성비 만능형 ANC',
    editorComment:
      '10만원 이하에서 가장 균형 잡힌 선택지입니다. 적응형 ANC 3.0은 플래그십에는 못 미쳐도 이 가격대에선 우수하고, LDAC·돌비 오디오·무선충전·IP55까지 상위 기능을 두루 갖췄습니다. 최대 48시간 배터리는 특히 강점입니다. 기본 튜닝이 저음 강조형이라 취향을 탈 수 있고, 최상급 대비 음질·차음 디테일은 한 수 아래입니다. "제값 이상"을 원하는 실속형 사용자에게 추천합니다.',
    status: 'featured',
    tags: ['앤커', '사운드코어', '리버티5', '무선이어폰', 'ANC', '가성비', 'LDAC', 'IP55'],

    specs: {
      powerConsumption: 0,
      noise: 8,
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
        '10만원대에서 ANC·LDAC를 모두 원하는 실속형 사용자',
        '배터리 사용시간이 긴 제품을 원하는 사용자',
        '무선충전·방수 등 상위 기능을 저렴하게 쓰고 싶은 사용자',
      ],
      notRecommended: [
        '최상급 음질·차음 디테일을 원하는 사용자',
        '저음 강조 튜닝이 부담스러운 사용자',
        '특정 생태계(애플·삼성) 전용 연동이 필요한 사용자',
      ],
    },

    features: [
      '적응형 ANC 3.0(0.3초 단위 자동 보정)',
      'LDAC Hi-Res · 돌비 오디오 공간음향',
      '최대 48시간(ANC OFF) 롱런 배터리',
      'IP55 방진방수 · 무선충전 · 급속충전',
      '6개 마이크 + AI 통화 노이즈 캔슬링',
    ],

    priceAnalysis: {
      msrp: 99000,
      streetPrice: 89900,
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
    ],

    purchaseLinks: [
      { store: '앤커 공식', url: '#', price: 99000, isOfficial: true },
      { store: '다나와 최저가', url: '#', price: 89900 },
    ],

    similarProducts: ['qcy-melobuds-pro', 'samsung-galaxy-buds3-pro', 'sony-wf-1000xm5'],
  },
];
