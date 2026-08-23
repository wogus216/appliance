import { Appliance } from '@/types/appliance';

export const cowayAppliances: Appliance[] = [
  // === 공기청정기 ===
  {
    id: 'coway-noble-ap-3023a',
    slug: 'coway-noble-ap-3023a',
    brand: 'Coway',
    name: '노블 공기청정기 AP-3023A',
    modelNumber: 'AP-3023A',
    category: '공기청정기',
    rating: 4.5,
    image: '/images/appliances/coway/ap-3023a/main.webp',
    images: [],
    price: 690000,
    description: '코웨이 노블 공기청정기. 듀얼 파워 청정과 멀티 마이크로 필터로 30평까지 커버하는 프리미엄 대형 모델.',
    oneliner: '30평 커버 듀얼 파워 청정, 공기청정 1위 브랜드의 프리미엄',
    editorComment: '국내 공기청정기 점유율 1위 코웨이의 플래그십입니다. 적용면적 98m2(30평)로 거실 전체를 책임지고, 듀얼 파워 청정으로 양방향 흡입·토출이라 청정 속도가 빠릅니다. 강점은 필터 성능과 검증된 A/S·렌탈 인프라. 약점은 가격과 큰 부피로, 작은 방엔 오버스펙입니다. 넓은 거실에 한 대 제대로 놓을 거라면 1순위지만, 원룸이라면 위닉스 같은 중형이 합리적입니다.',
    status: 'featured',
    tags: ['코웨이', '노블', '공기청정기', '30평', '대형', '헤파', 'H13', '1등급'],

    specs: {
      powerConsumption: 70,
      noise: 52,
      energyEfficiency: 8,
      performance: 9,
      convenience: 9,
      durability: 9,
    },

    techSpecs: {
      coreTechnology: '듀얼 파워 청정 + 멀티 마이크로 필터 시스템',
      filterType: 'H13 헤파 + 활성탄 탈취 + 극세 프리필터',
      capacity: '30평형 (98m2)',
      dimensions: '395 x 745 x 395mm',
      weight: 13.4,
    },

    roomFit: {
      recommendedSize: ['중형', '대형', '초대형'],
      coverageArea: 98,
      installationType: '이동식 스탠드',
      installationNote: '양방향 흡입을 위해 벽에서 15cm 이상 띄워 배치. 필터 약 1년 주기 교체',
    },

    errorCodes: [
      {
        code: 'E1',
        description: '먼지 센서 이상',
        cause: '먼지 센서 렌즈에 이물질 누적 또는 센서 불량',
        solution: '센서 커버를 열고 먼지를 부드럽게 제거 후 재가동. 반복 시 코웨이 고객센터(1588-5200) 문의',
        severity: 'low',
      },
      {
        code: 'FL',
        description: '필터 교체 알림',
        cause: '헤파 필터 사용 시간이 권장 주기(약 12개월)에 도달',
        solution: '정품 필터로 교체 후 필터 리셋 버튼을 3초간 눌러 알림 해제',
        severity: 'low',
      },
      {
        code: 'E2',
        description: '가스(냄새) 센서 이상',
        cause: '복합 가스 센서 오염 또는 단선으로 냄새 감지가 비정상',
        solution: '전원을 끄고 30분간 환기 후 재가동. 자동운전이 계속 최대로 돌면 코웨이 고객센터(1588-5200)로 점검 요청',
        severity: 'low',
      },
      {
        code: 'CF',
        description: '전면 커버 열림 / 필터 미장착',
        cause: '전면 커버가 완전히 닫히지 않았거나 필터가 정위치에 안착되지 않음',
        solution: '필터를 정위치에 다시 끼우고 커버를 끝까지 닫은 뒤 재가동. 지속되면 코웨이 고객센터(1588-5200) 문의',
        severity: 'low',
      },
      {
        code: 'E8',
        description: 'BLDC 팬모터 이상',
        cause: '팬에 이물질이 끼었거나 모터·구동 회로 불량으로 풍량이 나오지 않음',
        solution: '전원 코드를 분리하고 흡입구 이물질을 확인 후 재연결. 풍량 저하·소음이 지속되면 코웨이 고객센터(1588-5200) 점검 필요',
        severity: 'high',
      },
      {
        code: 'C1',
        description: 'IoCare 와이파이 통신 끊김',
        cause: '공유기 신호 약화 또는 비밀번호 변경으로 앱 연동이 해제됨',
        solution: '공유기와의 거리를 좁히고 IoCare 앱에서 기기 재등록. 반복되면 코웨이 고객센터(1588-5200)로 문의',
        severity: 'low',
      },
    ],

    targetUsers: {
      recommended: [
        '25평 이상 넓은 거실 공기질 관리가 필요한 가정',
        '검증된 A/S와 렌탈 서비스를 선호하는 사용자',
        '미세먼지·알레르기에 민감한 가정',
        '빠른 청정 속도를 원하는 사용자',
      ],
      notRecommended: [
        '원룸·작은 방 전용 (오버스펙)',
        '가성비를 최우선으로 보는 소비자',
        '저소음 취침 청정만 주로 쓰는 경우',
      ],
    },

    features: [
      '듀얼 파워 청정 (양방향 흡입·토출)',
      'H13 헤파 + 탈취 멀티 필터',
      '실시간 공기질 색상 표시 + 자동 운전',
      'IoCare 앱 원격 제어·필터 알림',
      '24시간 누적 미세먼지 리포트',
    ],

    priceAnalysis: {
      msrp: 690000,
      streetPrice: 590000,
      monthlyCost: 9000,
      valueRating: 3,
      priceTier: 'premium',
      alternatives: ['samsung-bespoke-cube-air-ax90', 'lg-puricare-360-as203nw3a'],
    },

    reviews: [
      {
        userType: '34평 아파트 거주자',
        rating: 5,
        text: '거실에 놓으니 고기 구워도 금방 잡아줍니다. 청정 속도가 확실히 빨라요. 렌탈로 쓰는데 필터 관리까지 해줘서 신경 쓸 게 없습니다.',
        pros: ['빠른 청정', '냄새 제거', '렌탈 관리 편함'],
        cons: ['렌탈료 부담'],
      },
      {
        userType: '공기청정기 여러 대 써본 사용자',
        rating: 4,
        text: '성능은 최상급인데 덩치가 큽니다. 작은 방엔 부담스러워요. 거실용으로는 후회 없는 선택.',
        pros: ['최상급 성능', '넓은 적용면적'],
        cons: ['큰 부피', '작은 방엔 오버스펙'],
      },
      {
        userType: '알레르기 비염 가족',
        rating: 5,
        text: '봄마다 비염으로 고생하던 아이가 확실히 덜 막혀합니다. 자동운전으로 두면 미세먼지 나쁜 날 알아서 풍량을 올려줘서 믿음이 가요. 청정 능력만큼은 의심의 여지가 없습니다.',
        pros: ['비염 완화', '똑똑한 자동운전', '강력한 필터'],
        cons: ['최대 풍량 시 소음'],
      },
      {
        userType: '거실 겸 주방 오픈형 구조 거주자',
        rating: 3,
        text: '청정력은 만족인데 강풍으로 돌리면 52dB이 빈말이 아니라 TV 볼륨을 올리게 됩니다. 취침 모드는 조용하지만 그땐 청정 속도가 확 떨어져요. 성능과 정숙을 동시에 기대하면 애매합니다.',
        pros: ['강력한 청정력'],
        cons: ['강풍 소음', '취침모드 청정 저하'],
      },
      {
        userType: '가전 가성비 따지는 신혼부부',
        rating: 4,
        text: '솔직히 가격은 비쌉니다. 그래도 1위 브랜드 A/S와 필터 검증된 게 안심이라 결국 이걸로 갔어요. 30평 거실 한 대로 끝내는 콘셉트라면 만족, 방마다 둘 거면 다른 선택지를 보세요.',
        pros: ['검증된 A/S', '대형 거실 커버'],
        cons: ['높은 가격'],
      },
    ],

    purchaseLinks: [
      { store: '코웨이 공식', url: '#', price: 690000, isOfficial: true },
      { store: '쿠팡', url: '#', price: 590000 },
    ],

    similarProducts: ['samsung-bespoke-cube-air-ax90', 'lg-puricare-360-as203nw3a', 'winix-tower-xq-azbe630'],
  },
  // === 제습기 ===
  {
    id: 'coway-inverter-dehumidifier-10l',
    slug: 'coway-inverter-dehumidifier-10l',
    brand: 'Coway',
    name: '인버터 제습기 10L AD-1018B',
    modelNumber: 'AD-1018B',
    category: '제습기',
    rating: 4.5,
    image: '/images/appliances/coway/ad-1018b/main.webp',
    images: [],
    price: 449000,
    description: '코웨이 인버터 제습기 10L. 인버터 컴프레서로 39dB 저소음·절전을 구현하고, H13 헤파 공기청정과 IoCare 앱 자동 습도 조절을 더한 중급 이동식 모델.',
    oneliner: '인버터 저소음·절전 10L 제습 + H13 헤파 공기청정 겸용',
    editorComment: '장마철 거실용 16L 대형이 부담스러운 1~2인 가구를 겨냥한 중급 모델입니다. 인버터 컴프레서로 39dB 저소음·절전을 잡았고, 코웨이답게 H13 헤파를 더해 간이 공기청정까지 겸합니다. 강점은 낮은 소음과 전기료, 약점은 10L/일이라 넓은 거실이나 본격 의류건조엔 제습력이 달린다는 점입니다. 삼성·LG의 16L 프리미엄이 오버스펙인 원룸·소형 공간이라면 가격·크기·소음 모두 합리적인 선택입니다.',
    status: 'new',
    tags: ['코웨이', '인버터', '제습기', '10L', '이동식', '헤파', '저소음', 'IoCare'],

    specs: {
      powerConsumption: 240,
      noise: 39,
      energyEfficiency: 8,
      performance: 7,
      convenience: 8,
      durability: 8,
    },

    techSpecs: {
      coreTechnology: '인버터 컴프레서 제습 + H13 헤파 공기청정 겸용',
      filterType: 'H13 헤파 필터 + 극세 프리필터',
      capacity: '10L/일',
      dimensions: '300 x 545 x 240mm',
      weight: 9.8,
      energyGrade: '1등급',
    },

    roomFit: {
      recommendedSize: ['원룸', '소형'],
      coverageArea: 43,
      installationType: '이동식',
      installationNote: '캐스터(바퀴) 부착으로 이동 편리. 장시간 운전 시 배수 호스 연결로 연속 배수 가능',
    },

    errorCodes: [
      {
        code: 'FL',
        description: '물통 만수',
        cause: '응축수 물통이 가득 찼거나 물통이 제대로 장착되지 않음',
        solution: '물통을 꺼내 비운 뒤 정위치에 다시 장착. 장시간 운전 시 배수 호스를 연결해 연속 배수 권장',
        severity: 'low',
      },
      {
        code: 'E5',
        description: '습도센서 이상',
        cause: '습도센서 불량 또는 결로·먼지로 인한 감지 오류',
        solution: '전원을 끄고 10분 후 재가동. 반복되면 코웨이 고객센터(1588-5200)로 점검 요청',
        severity: 'medium',
      },
      {
        code: 'E1',
        description: '실내 온도센서 이상',
        cause: '온도센서 단선 또는 접촉 불량',
        solution: '전원 코드를 분리하고 30분 뒤 재연결. 증상이 지속되면 코웨이 고객센터(1588-5200)로 서비스 점검 요청',
        severity: 'medium',
      },
      {
        code: 'CH',
        description: '저온 제상(De-Frost) 동작 / 증발기 결빙',
        cause: '실내온도 18℃ 미만에서 증발기 결빙을 막기 위한 자동 제상 운전 진입',
        solution: '실내온도를 18℃ 이상으로 올려 사용. 결빙·제상이 잦으면 코웨이 고객센터(1588-5200) 점검',
        severity: 'low',
      },
      {
        code: 'E4',
        description: '인버터 컴프레서 보호정지',
        cause: '과부하·과열로 인버터 컴프레서가 보호 동작으로 정지',
        solution: '전원을 끄고 1시간 이상 식힌 뒤 재가동. 반복되면 코웨이 고객센터(1588-5200)로 점검 요청',
        severity: 'high',
      },
      {
        code: 'C1',
        description: 'IoCare 와이파이 통신 끊김',
        cause: '공유기 신호 약화 또는 네트워크 변경으로 앱 연동 해제',
        solution: '공유기 근처에서 IoCare 앱으로 기기를 재등록. 지속되면 코웨이 고객센터(1588-5200) 문의',
        severity: 'low',
      },
    ],

    targetUsers: {
      recommended: [
        '원룸·소형 공간 습도 관리가 필요한 1~2인 가구',
        '저소음·절전을 중시해 취침 중에도 돌리고 싶은 사용자',
        '제습과 간이 공기청정을 한 대로 해결하고 싶은 사용자',
        '코웨이 A/S·렌탈 인프라를 선호하는 사용자',
      ],
      notRecommended: [
        '25평 이상 넓은 거실·강력 제습이 필요한 경우 (16L급 추천)',
        '실내 빨래 건조를 본격적으로 자주 하는 가정',
        '전문 공기청정기 수준의 청정 성능이 필요한 경우',
      ],
    },

    features: [
      '인버터 컴프레서 저소음·절전 운전 (39dB)',
      'H13 헤파 공기청정 겸용',
      '자동 습도 조절 (40~70%)',
      '물통 만수 알림 + 연속 배수 호스 연결',
      'IoCare 앱 원격 제어·실시간 습도 모니터링',
    ],

    priceAnalysis: {
      msrp: 449000,
      streetPrice: 359000,
      monthlyCost: 6000,
      valueRating: 4,
      priceTier: 'mid',
      alternatives: ['winix-posong-dehumidifier-16l'],
    },

    reviews: [
      {
        userType: '원룸 자취생',
        rating: 5,
        text: '밤에 켜놓고 자도 소음이 거슬리지 않아요. 인버터라 그런지 전기료도 부담 없고, 비 오는 날 빨래 말릴 때 확실히 뽀송해집니다. 물통은 이틀에 한 번 정도 비워요.',
        pros: ['저소음', '낮은 전기료', '빨래 건조'],
        cons: ['물통 자주 비움'],
      },
      {
        userType: '제습기 처음 구매한 사용자',
        rating: 4,
        text: '원룸엔 딱인데 거실까지 욕심내면 10L는 살짝 부족합니다. 헤파 공기청정은 보조 수준으로 보는 게 맞고요. 조용하고 작아서 만족, 큰 집이면 16L 가세요.',
        pros: ['조용함', '컴팩트 사이즈'],
        cons: ['거실엔 제습력 부족', '공기청정은 보조 수준'],
      },
      {
        userType: '신축 아파트 곰팡이 걱정 주부',
        rating: 5,
        text: '드레스룸하고 작은방 습기 잡으려고 샀는데 만수 알림 뜰 때까지 물이 꽤 나옵니다. 앱으로 습도 보면서 60% 맞춰두니 옷에 곰팡이 안 슬어서 좋아요. 바퀴 달려서 방 옮기기도 편합니다.',
        pros: ['습도 자동조절', '이동 편리', '앱 모니터링'],
        cons: ['소형 공간 위주'],
      },
      {
        userType: '반지하 거주 1인 가구',
        rating: 3,
        text: '습한 반지하라 그런지 10L로는 종일 돌려도 벽 결로가 완전히 안 잡힙니다. 조용하고 전기료 착한 건 인정하는데 환경이 습하면 용량이 아쉬워요. 보송한 방이면 충분했을 텐데 제 집엔 약간 모자랍니다.',
        pros: ['저소음', '절전'],
        cons: ['고습 환경엔 용량 부족', '종일 가동 필요'],
      },
      {
        userType: '인버터 제습기 비교 구매자',
        rating: 4,
        text: '같은 10L급에서 작동음 비교하다가 코웨이로 갔습니다. 확실히 컴프레서 켜질 때 진동·소음이 적어요. 다만 정가는 비싼 편이라 할인가 떴을 때 사는 걸 추천. A/S 믿고 가는 사람한테 맞습니다.',
        pros: ['낮은 진동·소음', '코웨이 A/S'],
        cons: ['정가 비쌈'],
      },
    ],

    purchaseLinks: [
      { store: '코웨이 공식', url: '#', price: 449000, isOfficial: true },
      { store: '쿠팡', url: '#', price: 359000 },
    ],

    similarProducts: ['samsung-bespoke-dehumidifier-dg16a7500', 'lg-puricare-dehumidifier-dq16sdwhs', 'winix-posong-dehumidifier-16l'],
  },
  // === 정수기 ===
  {
    id: 'coway-noble-water-purifier-chp',
    slug: 'coway-noble-water-purifier-chp',
    brand: 'Coway',
    name: '노블 정수기 CHP-7311N',
    modelNumber: 'CHP-7311N',
    category: '정수기',
    rating: 4.5,
    image: '/images/appliances/coway/chp-7311n/main.webp',
    images: [],
    price: 1090000,
    description: '코웨이 노블 정수기. 저수조 없는 직수형 냉·온·정수에 나노트랩 멤브레인 다단 필터, IoCare 앱 관리, 자동 살균 코크를 갖춘 프리미엄 직수 정수기. 일시불 환산 100만원대 또는 렌탈로 이용 가능.',
    oneliner: '나노트랩 직수 냉온정 + 자동 살균 코크, 코디 관리까지 되는 프리미엄 정수기',
    editorComment: '코웨이 노블은 직수형 냉온정 정수기 중에서도 상단 포지션입니다. 나노트랩 멤브레인 다단 필터와 자동 살균 코크로 위생 설계가 탄탄하고, IoCare 앱으로 필터 교체 시기와 사용량까지 관리됩니다. 강점은 검증된 코디 방문관리·A/S와 저수조 없는 슬림한 직수 설계, 약점은 일시불 100만원대의 높은 가격과 냉수 추출 시 컴프레서 소음입니다. RO 역삼투압처럼 미네랄까지 거른 순수가 필요한 게 아니라면, 직수의 깔끔한 물맛과 관리 편의를 중시하는 가정에 1순위로 추천합니다.',
    status: 'featured',
    tags: ['코웨이', '노블', '정수기', '냉온정', '직수형', '나노트랩', 'IoCare', '자동살균코크'],

    specs: {
      powerConsumption: 350,
      noise: 38,
      energyEfficiency: 8,
      performance: 9,
      convenience: 9,
      durability: 8,
    },

    techSpecs: {
      coreTechnology: '나노트랩 멤브레인 다단 직수 정수 + 순간 냉·온수 + 자동 살균 코크',
      filterType: '3단계 직수 필터 (세디먼트·선카본 복합 → 나노트랩 멤브레인 → 후카본 블록)',
      capacity: '냉온정 직수형 (정수·냉수·온수, 저수조 없음)',
      dimensions: '180 x 460 x 400mm',
      weight: 11.5,
    },

    roomFit: {
      recommendedSize: ['소형', '중형', '대형'],
      coverageArea: 0,
      installationType: '직수형(카운터탑)',
      installationNote: '수도 직결 직수형으로 코웨이 전문기사 방문 설치. 싱크대 옆 카운터탑에 설치하며 정수 전용 수전 분기와 배수 연결이 필요. 저수조가 없어 장기 미사용 후에도 위생 관리가 쉬움',
    },

    errorCodes: [
      {
        code: '필터 교체',
        description: '필터 교체 알림 (필터 LED 점등)',
        cause: '필터 사용량 또는 사용 기간이 권장 교체 주기에 도달',
        solution: '정품 필터로 교체하거나 코웨이 코디 방문 교체 후 필터 리셋 버튼으로 알림 해제',
        severity: 'low',
      },
      {
        code: '누수 감지',
        description: '누수 감지 (자동 입수 차단)',
        cause: '본체 하단 누수감지 센서가 물기를 감지하여 안전을 위해 급수를 차단',
        solution: '수도 밸브와 전원을 잠그고 바닥 물기를 제거. 재발 시 코웨이 고객센터(1588-5200)로 점검 요청',
        severity: 'high',
      },
      {
        code: '온수 잠금',
        description: '온수 안전 잠금 / 과열 보호',
        cause: '어린이 보호용 온수 안전 잠금이 활성화되었거나 온수 히터 과열이 감지됨',
        solution: '온수 잠금 버튼을 길게 눌러 해제. 과열 시 일정 시간 후 자동 복귀되며, 증상이 지속되면 코웨이 고객센터(1588-5200) 점검',
        severity: 'medium',
      },
      {
        code: '냉수 약함',
        description: '냉수 온도 미달 (냉각 성능 저하)',
        cause: '단시간 다량 추출로 냉각이 지연되었거나 방열구 막힘·주변 통풍 부족',
        solution: '본체 측면·후면 통풍 공간을 확보하고 10~20분 후 재추출. 지속되면 코웨이 고객센터(1588-5200)로 점검 요청',
        severity: 'medium',
      },
      {
        code: '입수 지연',
        description: '정수 추출 느림 / 입수 지연',
        cause: '원수 수압 저하 또는 필터 막힘으로 직수 유량이 감소',
        solution: '수도 밸브가 완전히 열렸는지 확인하고 필터 교체 주기를 점검. 개선되지 않으면 코웨이 고객센터(1588-5200) 문의',
        severity: 'low',
      },
      {
        code: '통신 오류',
        description: 'IoCare 앱 연동 통신 오류',
        cause: '와이파이 신호 약화 또는 공유기 설정 변경으로 앱 연동 해제',
        solution: '공유기 근처에서 IoCare 앱으로 기기를 재등록. 반복되면 코웨이 고객센터(1588-5200)로 문의',
        severity: 'low',
      },
    ],

    targetUsers: {
      recommended: [
        '냉·온·정수를 한 대로 해결하려는 일반 가정',
        '저수조 없는 직수 위생과 슬림한 디자인을 원하는 사용자',
        '코디 방문관리·렌탈 등 검증된 A/S 인프라를 선호하는 사용자',
        '앱으로 필터 교체 시기·사용량을 관리하고 싶은 사용자',
      ],
      notRecommended: [
        '정수 기능만 필요해 냉온정 비용이 아까운 1인 가구 (정수 전용 추천)',
        'RO 역삼투압으로 미네랄까지 제거된 순수를 원하는 사용자',
        '초기 비용을 최소화하려는 가성비 우선 소비자',
      ],
    },

    features: [
      '나노트랩 멤브레인 다단 직수 필터 (저수조 없는 직수 방식)',
      '순간 냉·온수 추출 (저수조 없이 즉시 냉수·온수)',
      '자동 살균 코크 (추출구 자동 살균으로 위생 관리)',
      'IoCare 앱 원격 관리·필터 교체 알림·사용량 모니터링',
      '온수 안전 잠금 + 누수 감지 자동 차단',
    ],

    priceAnalysis: {
      msrp: 1090000,
      streetPrice: 950000,
      monthlyCost: 33000,
      valueRating: 3,
      priceTier: 'premium',
      alternatives: ['skmagic-allin-water-purifier-wpu'],
    },

    reviews: [
      {
        userType: '3인 가족, 렌탈 사용',
        rating: 5,
        text: '직수라 물맛이 깔끔하고 온수가 바로 나와서 좋아요. 코디님이 정기적으로 필터 갈아주고 살균까지 해주니 신경 쓸 게 없네요. 다만 냉수 받을 때 컴프레서 도는 소리는 조금 납니다.',
        pros: ['깔끔한 물맛', '즉시 온수', '코디 관리'],
        cons: ['냉수 추출 시 소음'],
      },
      {
        userType: '일시불로 구매한 사용자',
        rating: 4,
        text: '디자인이 슬림하고 자동 살균 코크가 있어 위생적으로 안심됩니다. 다만 일시불 가격이 만만치 않고, 정수만 쓸 거면 굳이 냉온정까지 필요했나 싶어요. 자가 필터 교체는 생각보다 쉽습니다.',
        pros: ['슬림 디자인', '자동 살균 코크', '쉬운 필터 교체'],
        cons: ['높은 일시불가', '정수만 쓰면 과한 사양'],
      },
      {
        userType: '아기 분유 타는 신생아 부모',
        rating: 5,
        text: '분유 온도 맞추기가 정말 편합니다. 원하는 온도로 바로 나와서 끓였다 식힐 필요가 없어요. 저수조 없는 직수에 자동 살균까지 되니 아기 물이라 더 안심이고요. 온수 잠금도 있어서 안전합니다.',
        pros: ['분유에 편리한 온수', '직수 위생', '온수 안전잠금'],
        cons: ['설치 공간 필요'],
      },
      {
        userType: '렌탈 약정 부담 느낀 사용자',
        rating: 3,
        text: '물맛이나 위생은 흠잡을 데 없습니다. 그런데 월 렌탈료에 의무약정까지 따지면 부담이 꽤 큽니다. 자동 살균이 좋긴 한데 그만큼 전기를 계속 쓰는 느낌이고요. 기능은 만족, 비용 구조는 다시 생각하게 됩니다.',
        pros: ['우수한 위생 설계', '안정적 물맛'],
        cons: ['렌탈료·약정 부담', '상시 전력 소모'],
      },
      {
        userType: 'RO 정수기에서 넘어온 사용자',
        rating: 4,
        text: '역삼투압 쓰다가 직수로 바꿨는데 물 버리는 양이 없고 추출이 빨라서 만족합니다. 미네랄 남는 직수라 물맛도 제 입엔 더 맞아요. 다만 순수 원하는 분은 직수가 아쉬울 수 있으니 취향 차이입니다.',
        pros: ['빠른 추출', '버리는 물 없음', '부드러운 물맛'],
        cons: ['초순수 아님'],
      },
    ],

    purchaseLinks: [
      { store: '코웨이 공식', url: '#', price: 1090000, isOfficial: true },
      { store: '쿠팡', url: '#', price: 950000 },
    ],

    similarProducts: ['lg-puricare-water-purifier-objet', 'skmagic-allin-water-purifier-wpu', 'coway-handpick-water-purifier-compact'],
  },
  // === 정수기 ===
  {
    id: 'coway-handpick-water-purifier-compact',
    slug: 'coway-handpick-water-purifier-compact',
    brand: 'Coway',
    name: '한뼘 정수기 냉정 CHPI-7400N',
    modelNumber: 'CHPI-7400N',
    category: '정수기',
    rating: 4.3,
    image: '/images/appliances/coway/chpi-7400n/main.webp',
    images: [],
    price: 590000,
    description: '코웨이 한뼘 정수기. 폭 약 13.5cm 슬림 바디의 컴팩트 직수형으로, 저수조 없이 나노트랩(중공사막 UF) 멤브레인으로 정수하고 전자제어 냉수까지 제공한다. 좁은 주방·1인 가구를 겨냥한 50만원대 mid 포지션 모델(일시불 또는 렌탈).',
    oneliner: '폭 13.5cm 한뼘 슬림 직수 — 좁은 주방·1인 가구용 정수·냉수',
    editorComment: '코웨이 한뼘 정수기는 폭이 한 뼘(약 13.5cm)밖에 안 되는 슬림 직수형으로, 싱크대 옆 자투리 공간이 아쉬운 좁은 주방과 1인 가구를 정확히 겨냥합니다. 저수조 없는 직수 구조에 나노트랩 멤브레인을 더해 위생을 챙겼고, 냉수까지 제공하면서도 가격은 50만원대 mid 포지션에 머뭅니다. 다만 온수가 없어 분유·차를 자주 쓰는 가정엔 상위 냉온정 모델이 맞고, 대가족의 대용량 연속 추출에도 약합니다. 자리·위생·가격의 균형을 원하면 합리적인 선택이지만, 온수가 꼭 필요하면 냉온정으로 올라가야 합니다.',
    status: 'new',
    tags: ['코웨이', '한뼘 정수기', '정수기', '직수형', '냉정수', '나노트랩', '컴팩트', '1인 가구'],

    specs: {
      powerConsumption: 110,
      noise: 41,
      energyEfficiency: 8,
      performance: 7,
      convenience: 7,
      durability: 8,
    },

    techSpecs: {
      coreTechnology: '컴팩트 직수 정수 + 나노트랩(중공사막 UF) 멤브레인 · 전자제어 냉수',
      filterType: '직수 2단계: 프리카본 필터(세디먼트+활성탄 복합) → 나노트랩 중공사막(UF) 멤브레인',
      capacity: '직수형 (정수·냉수) · 컴팩트(한뼘 슬림)',
      dimensions: '240 x 465 x 473mm',
      weight: 8.5,
    },

    roomFit: {
      recommendedSize: ['원룸', '소형'],
      coverageArea: 0,
      installationType: '직수형(카운터탑)',
      installationNote: '수도 직결(직수) 설치 — 전문기사 방문 설치 필요. 폭 약 13.5cm 슬림 바디로 좁은 싱크대 옆에도 배치 가능하며, 저수조가 없어 정체수 없이 위생 관리가 간편하다. 방열을 위해 측면·후면에 10cm 이상 통풍 공간 확보 권장.',
    },

    errorCodes: [
      {
        code: '필터 교체등',
        description: '필터 교체 알림 표시등 점등',
        cause: '직수 필터(프리카본·나노트랩)의 사용 기간 또는 누적 정수량이 권장 교체 주기에 도달',
        solution: '정품 필터로 교체 후 필터 리셋 버튼을 눌러 알림 해제. 렌탈 이용 시 코디 방문 점검·교체로 처리',
        severity: 'low',
      },
      {
        code: '누수 감지',
        description: '워터가드 누수 감지 시 급수 자동 차단',
        cause: '본체 하부 누수 센서가 물을 감지(호스 연결부 누수 또는 과도한 결로)',
        solution: '수도 밸브를 잠그고 전원을 분리한 뒤 누수 부위를 확인. 자가 조치가 어려우면 코웨이 고객센터(1588-5200)로 점검 요청',
        severity: 'high',
      },
      {
        code: '냉각 이상',
        description: '냉수가 충분히 차갑지 않음(냉각 성능 저하)',
        cause: '방열구 막힘·주변 통풍 부족, 또는 단시간 다량 추출로 냉각이 지연됨',
        solution: '본체 측면·후면 통풍 공간을 10cm 이상 확보하고 30분 후 재확인. 증상이 지속되면 코웨이 고객센터(1588-5200) 문의',
        severity: 'medium',
      },
      {
        code: '추출 약함',
        description: '정수 추출 유량 저하 / 물이 약하게 나옴',
        cause: '원수 수압 부족 또는 필터 막힘으로 직수 유량이 감소',
        solution: '수도 밸브가 끝까지 열렸는지 확인하고 필터 교체 주기를 점검. 개선되지 않으면 코웨이 고객센터(1588-5200) 문의',
        severity: 'low',
      },
      {
        code: '추출 잠금',
        description: '연속 추출 안전 잠금 동작',
        cause: '버튼이 눌린 채 고정되거나 장시간 연속 추출로 안전 잠금이 활성화됨',
        solution: '추출 버튼 주변 이물질·끼임을 확인하고 잠시 후 재시도. 잠금이 풀리지 않으면 코웨이 고객센터(1588-5200) 점검',
        severity: 'low',
      },
      {
        code: '통신 끊김',
        description: 'IoCare 앱 연동 통신 끊김',
        cause: '와이파이 신호 약화 또는 공유기 비밀번호 변경으로 연동 해제',
        solution: '공유기 근처에서 IoCare 앱으로 기기를 재등록. 반복되면 코웨이 고객센터(1588-5200)로 문의',
        severity: 'low',
      },
    ],

    targetUsers: {
      recommended: [
        '좁은 주방·싱크대를 가진 1인 가구',
        '저수조 없는 직수형의 위생을 선호하는 사용자',
        '정수와 함께 시원한 냉수까지 필요한 사용자',
        '코웨이 코디 렌탈·A/S 관리를 원하는 사용자',
      ],
      notRecommended: [
        '온수(분유·차)가 꼭 필요한 가정 — 냉온정 모델 권장',
        '대가족·카페 수준의 대용량 연속 추출이 필요한 경우',
        '수도 직결(직수) 설치가 불가능한 주거 환경',
      ],
    },

    features: [
      '폭 약 13.5cm 한뼘 슬림 바디 — 좁은 주방 최적화',
      '저수조 없는 직수형 — 정체수 없는 위생 설계',
      '나노트랩(중공사막 UF) 멤브레인 — 바이러스·세균까지 거름',
      '전자제어 냉수 — 시원한 정수 제공',
      '인앤아웃 2필터 간편 교체 + IoCare 앱 사용량·필터 알림',
    ],

    priceAnalysis: {
      msrp: 590000,
      streetPrice: 490000,
      monthlyCost: 9000,
      valueRating: 4,
      priceTier: 'mid',
      alternatives: ['skmagic-allin-water-purifier-wpu'],
    },

    reviews: [
      {
        userType: '원룸 자취 1인 가구',
        rating: 5,
        text: '폭이 진짜 한 뼘이라 좁은 싱크대 옆에 딱 들어갑니다. 직수라 물 비린내 없고 냉수도 충분히 시원해요. 온수가 없는 건 알고 샀고, 차 마실 때만 따로 끓이면 돼서 저한테는 문제 없네요.',
        pros: ['초슬림 사이즈', '깔끔한 물맛', '시원한 냉수'],
        cons: ['온수 없음'],
      },
      {
        userType: '냉온정에서 갈아탄 사용자',
        rating: 4,
        text: '온수 거의 안 쓰는 집이라 냉정으로 충분합니다. 자리 적게 먹는 게 제일 만족스러워요. 다만 연속으로 냉수 많이 뽑으면 살짝 미지근해질 때가 있고, 일시불로 사면 필터값은 따로 챙겨야 합니다.',
        pros: ['공간 절약', '냉정 기능 충분'],
        cons: ['연속 추출 시 냉각 지연', '필터값 별도'],
      },
      {
        userType: '주방 좁은 신혼집 거주자',
        rating: 5,
        text: '냉장고하고 싱크대 사이 자투리 공간에 쏙 들어가서 신세계입니다. 저수조 없는 직수라 위생도 안심되고 디자인도 깔끔해요. 둘이 마시는 양으로는 냉수도 모자란 적 없습니다. 좁은 집엔 이만한 게 없어요.',
        pros: ['자투리 공간 활용', '직수 위생', '깔끔한 디자인'],
        cons: ['2인 이상 대용량엔 한계'],
      },
      {
        userType: '온수 필요했던 4인 가족',
        rating: 2,
        text: '슬림한 건 좋은데 가족이 늘면서 온수 없는 게 너무 불편합니다. 분유에 차에 결국 물을 따로 끓이게 되더라고요. 1인 가구용이라는 설명을 흘려들은 제 잘못이지만, 식구 많으면 절대 비추입니다.',
        pros: ['슬림 디자인'],
        cons: ['온수 없음', '대가족엔 부적합'],
      },
      {
        userType: '렌탈로 설치한 사용자',
        rating: 4,
        text: '코디 방문 관리받으니 필터나 위생은 신경 쓸 게 없어서 편합니다. 냉수도 적당히 시원하고요. 다만 한여름에 얼음처럼 차가운 물을 기대하면 살짝 아쉬울 수 있어요. 자리 안 차지하는 게 가장 큰 장점입니다.',
        pros: ['코디 관리 편함', '컴팩트'],
        cons: ['한여름 냉수 아쉬움'],
      },
    ],

    purchaseLinks: [
      { store: '코웨이 공식', url: '#', price: 590000, isOfficial: true },
      { store: '쿠팡', url: '#', price: 490000 },
    ],

    similarProducts: ['skmagic-allin-water-purifier-wpu', 'coway-noble-water-purifier-chp', 'lg-puricare-water-purifier-objet'],
  },
  // === 공기청정기 ===
  {
    id: 'coway-duo-air-purifier',
    slug: 'coway-duo-air-purifier',
    brand: 'Coway',
    name: '듀얼파워 공기청정기',
    modelNumber: 'AP-2023C',
    category: '공기청정기',
    rating: 4.5,
    image: '/images/appliances/coway/ap-2023c/main.webp',
    images: [],
    price: 459000,
    description: '코웨이 듀얼파워 공기청정기. 양방향 듀얼 흡입과 멀티순환청정으로 적용면적 약 66m2(20평)를 커버하고, IoCare 스마트 제어를 갖춘 중급 거실용 모델.',
    oneliner: '양방향 듀얼 흡입 + 멀티순환청정, 20평 거실을 잡는 코웨이 중급기',
    editorComment: '코웨이 공기청정기 라인업에서 플래그십 노블과 가성비 중형 사이를 메우는 실속형입니다. 양방향 듀얼 흡입으로 좌우에서 빨아들이고 멀티순환청정으로 실내 공기를 빠르게 돌려, 적용면적 66m2(20평)답지 않게 거실 청정 속도가 준수합니다. 강점은 1위 브랜드의 검증된 필터·A/S와 IoCare 스마트 제어, 약점은 30평급 노블만큼의 풍량은 아니라는 점입니다. 큰 거실 단독 청정엔 노블이 맞지만, 20평 안팎 거실에서 가격·성능 균형을 원한다면 이 모델이 합리적인 1순위입니다.',
    status: 'new',
    tags: ['코웨이', '듀얼파워', '공기청정기', '20평', '양방향흡입', '멀티순환청정', '헤파', 'IoCare'],

    specs: {
      powerConsumption: 60,
      noise: 50,
      energyEfficiency: 8,
      performance: 8,
      convenience: 8,
      durability: 8,
    },

    techSpecs: {
      coreTechnology: '양방향 듀얼 흡입 + 멀티순환청정 시스템',
      filterType: 'H13 헤파 + 활성탄 탈취 + 극세 프리필터',
      capacity: '20평형 (66m2)',
      dimensions: '356 x 660 x 356mm',
      weight: 10.6,
    },

    roomFit: {
      recommendedSize: ['소형', '중형', '대형'],
      coverageArea: 66,
      installationType: '이동식 스탠드',
      installationNote: '양방향 흡입을 위해 좌우 벽에서 15cm 이상 띄워 배치. 필터 약 12개월 주기 교체',
    },

    errorCodes: [
      {
        code: 'E1',
        description: '먼지 센서 이상',
        cause: '먼지 센서 렌즈에 이물질이 쌓였거나 센서 접촉 불량',
        solution: '센서 커버를 열어 렌즈를 부드럽게 닦은 뒤 재가동. 반복 시 코웨이 고객센터(1588-5200)로 점검 요청',
        severity: 'low',
      },
      {
        code: 'FL',
        description: '필터 교체 알림',
        cause: '헤파 필터 사용 시간이 권장 주기(약 12개월)에 도달',
        solution: '정품 필터로 교체 후 필터 리셋 버튼을 3초간 눌러 알림 해제. 렌탈 이용 시 코디 방문 교체로 처리',
        severity: 'low',
      },
      {
        code: 'CF',
        description: '전면 커버 열림 / 필터 미장착',
        cause: '전면 커버가 완전히 닫히지 않았거나 필터가 정위치에 장착되지 않음',
        solution: '필터를 정위치에 다시 끼우고 전면 커버를 끝까지 닫은 뒤 재가동. 지속되면 코웨이 고객센터(1588-5200) 문의',
        severity: 'low',
      },
      {
        code: 'E2',
        description: '가스(냄새) 센서 이상',
        cause: '복합 가스 센서 오염 또는 접촉 불량으로 냄새 감지가 비정상',
        solution: '전원을 끄고 30분 환기 후 재가동. 자동운전이 계속 최대 풍량으로 돌면 코웨이 고객센터(1588-5200) 문의',
        severity: 'low',
      },
      {
        code: 'E8',
        description: 'BLDC 팬모터 이상',
        cause: '팬에 이물질이 끼었거나 모터·구동부 불량으로 풍량이 약함',
        solution: '전원 코드를 분리하고 흡입구 이물질을 확인 후 재연결. 풍량 저하·이상 소음이 지속되면 코웨이 고객센터(1588-5200) 점검',
        severity: 'high',
      },
      {
        code: 'C1',
        description: 'IoCare 와이파이 통신 끊김',
        cause: '공유기 신호 약화 또는 네트워크 변경으로 앱 연동 해제',
        solution: '공유기 근처에서 IoCare 앱으로 기기를 재등록. 반복되면 코웨이 고객센터(1588-5200)로 문의',
        severity: 'low',
      },
    ],

    targetUsers: {
      recommended: [
        '20평 안팎 거실 공기질 관리가 필요한 가정',
        '가격과 청정 성능의 균형을 원하는 사용자',
        '코웨이 A/S·렌탈 인프라를 선호하는 사용자',
        'IoCare 앱으로 원격 제어·필터 관리를 하고 싶은 사용자',
      ],
      notRecommended: [
        '30평 이상 넓은 거실 단독 청정 (노블 등 대형 추천)',
        '원룸·작은 방 전용 (오버스펙)',
        '초저소음 취침 청정만 주로 쓰는 경우',
      ],
    },

    features: [
      '양방향 듀얼 흡입 (좌우 동시 흡입)',
      '멀티순환청정으로 빠른 실내 공기 순환',
      'H13 헤파 + 활성탄 탈취 멀티 필터',
      '실시간 공기질 색상 표시 + 자동 운전',
      'IoCare 앱 원격 제어·필터 교체 알림',
    ],

    priceAnalysis: {
      msrp: 459000,
      streetPrice: 379000,
      monthlyCost: 7000,
      valueRating: 4,
      priceTier: 'mid',
      alternatives: ['coway-noble-ap-3023a', 'winix-tower-xq-azbe630'],
    },

    reviews: [
      {
        userType: '24평 아파트 거주자',
        rating: 5,
        text: '양쪽에서 빨아들여서 그런지 거실 공기가 금방 정리됩니다. 요리하고 나서도 색상 표시가 빨갛다가 금세 파래져요. 노블은 부담스러웠는데 이 정도면 거실용으로 딱 만족합니다.',
        pros: ['빠른 청정', '직관적 색상 표시', '가성비'],
        cons: ['최대 풍량 소음'],
      },
      {
        userType: '공기청정기 비교하고 산 사용자',
        rating: 4,
        text: '20평 거실엔 충분한데 욕심내서 30평 거실에 단독으로 쓰기엔 풍량이 살짝 아쉽습니다. 면적 보고 사면 후회 없어요. 앱 연동되고 코웨이라 관리도 편합니다.',
        pros: ['20평 커버 적정', '앱 연동', '코웨이 관리'],
        cons: ['30평 단독엔 풍량 부족'],
      },
      {
        userType: '반려동물 키우는 가정',
        rating: 4,
        text: '강아지 두 마리라 털하고 냄새가 걱정이었는데 자동으로 풍량 올려주니 거실이 한결 쾌적합니다. 프리필터에 털이 잘 걸려서 청소도 편하고요. 다만 탈취는 강력한 펫 전용 모델만큼은 아니라 환기는 같이 해줍니다.',
        pros: ['털·냄새 관리', '프리필터 청소 편함'],
        cons: ['탈취는 보통 수준'],
      },
      {
        userType: '예민한 잠귀 사용자',
        rating: 3,
        text: '청정력은 가격대비 좋은데 자동운전으로 두면 한밤중에 갑자기 풍량이 올라가 잠을 깨웁니다. 결국 취침엔 수동 약풍으로 고정해서 써요. 50dB이 수치상 낮아 보여도 조용한 밤엔 은근 거슬립니다.',
        pros: ['준수한 청정력', '합리적 가격'],
        cons: ['야간 자동 풍량 변동', '취침 소음'],
      },
      {
        userType: '노블에서 거실 보조로 추가한 사용자',
        rating: 5,
        text: '안방용으로 하나 더 들였는데 듀얼 흡입이라 20평 안방도 금방 잡아줍니다. 노블보다 가볍고 덜 차지해서 옮기기도 편해요. 같은 IoCare 앱으로 두 대 같이 관리되는 것도 깔끔합니다.',
        pros: ['가벼움', '빠른 흡입', '앱 통합 관리'],
        cons: ['대형 거실 단독엔 부족'],
      },
    ],

    purchaseLinks: [
      { store: '코웨이 공식', url: '#', price: 459000, isOfficial: true },
      { store: '쿠팡', url: '#', price: 379000 },
    ],

    similarProducts: ['coway-noble-ap-3023a', 'samsung-bespoke-cube-air-ax90', 'lg-puricare-360-as203nw3a'],
  },
  // === 제습기 ===
  {
    id: 'coway-inverter-dehumidifier-16l',
    slug: 'coway-inverter-dehumidifier-16l',
    brand: 'Coway',
    name: '인버터 제습기 16L',
    modelNumber: 'AD-1623A',
    category: '제습기',
    rating: 4.5,
    image: '/images/appliances/coway/ad-1623a/main.webp',
    images: [],
    price: 599000,
    description: '코웨이 인버터 제습기 16L. 인버터 컴프레서로 16L/일 강력 제습과 저소음·절전을 잡고, H13 헤파 공기청정을 겸하는 1등급 에너지효율 거실용 모델.',
    oneliner: '인버터 저소음 16L 강력 제습 + H13 헤파 공기청정 겸용, 1등급 절전',
    editorComment: '코웨이 10L 모델의 형님 격으로, 장마철 거실과 실내 의류건조까지 책임지는 16L 거실용입니다. 인버터 컴프레서로 16L/일 제습량을 내면서도 작동음과 전기료를 잡아 에너지효율 1등급을 받았고, H13 헤파를 더해 제습+공기청정을 한 대로 겸합니다. 강점은 16L급치고 조용한 저소음과 1등급 절전, 약점은 위닉스 16L 대비 높은 가격입니다. 위닉스 가성비 16L가 작동음·디자인에서 아쉬웠던 분, 또는 코웨이 A/S·렌탈로 한 대 제대로 들이려는 가정에 잘 맞습니다.',
    status: 'new',
    tags: ['코웨이', '인버터', '제습기', '16L', '1등급', '저소음', '헤파', 'IoCare'],

    specs: {
      powerConsumption: 285,
      noise: 42,
      energyEfficiency: 9,
      performance: 8,
      convenience: 8,
      durability: 8,
    },

    techSpecs: {
      coreTechnology: '인버터 컴프레서 제습 + H13 헤파 공기청정 겸용',
      filterType: 'H13 헤파 필터 + 극세 프리필터',
      capacity: '16L/일',
      dimensions: '360 x 590 x 285mm',
      weight: 13.2,
      energyGrade: '1등급',
    },

    roomFit: {
      recommendedSize: ['소형', '중형', '대형'],
      coverageArea: 66,
      installationType: '이동식',
      installationNote: '캐스터(바퀴)로 이동 편리. 배수 호스 연결 시 연속배수 가능, 물통 만수 시 안전 자동정지',
    },

    errorCodes: [
      {
        code: 'FL',
        description: '물통 만수',
        cause: '응축수 물통이 가득 찼거나 물통이 정위치에 장착되지 않음',
        solution: '물통을 꺼내 비운 뒤 정위치에 다시 장착. 자주 가득 차면 배수 호스를 연결해 연속배수 권장',
        severity: 'low',
      },
      {
        code: 'E5',
        description: '습도센서 이상',
        cause: '습도센서 불량 또는 결로·먼지로 인한 감지 오류',
        solution: '전원을 끄고 10분 후 재가동. 반복되면 코웨이 고객센터(1588-5200)로 점검 요청',
        severity: 'medium',
      },
      {
        code: 'CH',
        description: '저온 환경 제상(De-Frost) / 증발기 온도센서 이상',
        cause: '실내온도 18℃ 미만에서 증발기 결빙 방지 제상 동작 또는 온도센서 접촉 불량',
        solution: '실내온도 18℃ 이상에서 사용하고 전원을 재투입. 지속되면 코웨이 고객센터(1588-5200) 점검',
        severity: 'medium',
      },
      {
        code: 'E1',
        description: '실내 온도센서 이상',
        cause: '온도센서 단선 또는 접촉 불량으로 실내온도 감지 오류',
        solution: '전원 코드를 분리하고 30분 뒤 재연결. 증상이 지속되면 코웨이 고객센터(1588-5200)로 서비스 점검 요청',
        severity: 'medium',
      },
      {
        code: 'E4',
        description: '인버터 컴프레서 보호정지',
        cause: '과부하·과열로 인버터 컴프레서가 보호 동작으로 정지',
        solution: '전원을 끄고 1시간 이상 식힌 뒤 재가동. 반복되면 코웨이 고객센터(1588-5200)로 점검 요청',
        severity: 'high',
      },
      {
        code: 'C1',
        description: 'IoCare 와이파이 통신 끊김',
        cause: '공유기 신호 약화 또는 네트워크 변경으로 앱 연동 해제',
        solution: '공유기 근처에서 IoCare 앱으로 기기를 재등록. 지속되면 코웨이 고객센터(1588-5200) 문의',
        severity: 'low',
      },
    ],

    targetUsers: {
      recommended: [
        '장마철 거실·중대형 공간 강력 제습이 필요한 가정',
        '실내 빨래 건조를 자주 하는 가정',
        '16L급이면서 저소음·절전을 중시하는 사용자',
        '제습+공기청정을 한 대로 해결하고 코웨이 A/S를 선호하는 사용자',
      ],
      notRecommended: [
        '원룸·소형 공간 (10L급이면 충분, 오버스펙)',
        '30만원대 가성비 16L를 찾는 소비자 (위닉스 등 추천)',
        '전문 공기청정기 수준의 청정 성능이 필요한 경우',
      ],
    },

    features: [
      '인버터 컴프레서 16L/일 강력 제습',
      '저소음·절전 운전 + 에너지효율 1등급',
      'H13 헤파 공기청정 겸용',
      '연속배수 호스 연결 + 만수 안전 자동정지',
      'IoCare 앱 원격 제어·실시간 습도 모니터링',
    ],

    priceAnalysis: {
      msrp: 599000,
      streetPrice: 499000,
      monthlyCost: 8000,
      valueRating: 4,
      priceTier: 'mid',
      alternatives: ['winix-posong-dehumidifier-16l', 'coway-inverter-dehumidifier-10l'],
    },

    reviews: [
      {
        userType: '거실에서 쓰는 4인 가족',
        rating: 5,
        text: '16L라 장마철에 물 정말 잘 뽑고, 실내 빨래도 반나절이면 뽀송해집니다. 인버터라 16L치고 조용하고 전기료도 1등급이라 부담 적어요. 헤파 공기청정 겸용이라 한 대로 두 가지 되는 게 만족스럽습니다.',
        pros: ['강력한 제습', '저소음', '1등급 절전', '공기청정 겸용'],
        cons: ['무게 있음'],
      },
      {
        userType: '위닉스에서 갈아탄 사용자',
        rating: 4,
        text: '확실히 전 제품보다 조용하고 절전됩니다. 공기청정 겸용도 보조로는 쓸 만하고요. 다만 가성비 16L보다는 가격이 있는 편이라, 조용함과 코웨이 관리를 살 거면 추천. 단순 제습만이면 더 싼 것도 많습니다.',
        pros: ['낮은 작동음', '절전', '코웨이 A/S'],
        cons: ['가성비 16L보다 비쌈'],
      },
      {
        userType: '실내 건조 자주 하는 맞벌이 부부',
        rating: 5,
        text: '베란다 없는 집이라 빨래를 실내에서 말리는데, 송풍구 앞에 걸어두면 두세 시간이면 보송합니다. 연속배수 호스 연결해두니 물통 비울 일도 없어 편해요. 16L급인데 밤에 돌려도 견딜 만한 소음입니다.',
        pros: ['빠른 의류건조', '연속배수 편리', '야간 사용 가능'],
        cons: ['호스 설치 자리 필요'],
      },
      {
        userType: '저온 지하 작업실 사용자',
        rating: 3,
        text: '여름엔 물 잘 뽑는데 기온 떨어지는 환절기 지하에선 제상 동작으로 자꾸 멈췄다 돌아서 효율이 뚝 떨어집니다. 컴프레서 제습기 공통 한계라 알고는 있었지만 아쉬워요. 따뜻한 거실에선 만족, 저온 환경엔 한계가 분명합니다.',
        pros: ['여름철 강력 제습'],
        cons: ['저온 환경 효율 저하', '잦은 제상 정지'],
      },
      {
        userType: '제습+청정 겸용 노린 1인 가구',
        rating: 4,
        text: '한 대로 제습이랑 공기청정 같이 되는 게 매력이라 샀습니다. 제습은 확실히 강하고, 공기청정은 헤파라 미세먼지 보조로는 충분해요. 다만 16L라 무게가 있어서 매번 방 옮기긴 좀 무겁습니다. 한자리 고정용이면 딱입니다.',
        pros: ['제습·청정 겸용', '강한 제습력'],
        cons: ['무거운 본체', '공기청정은 보조 수준'],
      },
    ],

    purchaseLinks: [
      { store: '코웨이 공식', url: '#', price: 599000, isOfficial: true },
      { store: '쿠팡', url: '#', price: 499000 },
    ],

    similarProducts: ['winix-posong-dehumidifier-16l', 'coway-inverter-dehumidifier-10l', 'samsung-bespoke-dehumidifier-dg16a7500'],
  },
];
