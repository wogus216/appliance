import { allAppliances } from '@/lib/data/appliances';
import { getApplianceTechnologyGuide } from '@/lib/data/appliance-technology';
import { getPurifierTechnology } from '@/lib/data/purifier-technology';
import { guideEvidenceLink } from '@/lib/appliance-technology';
import type { CareInterval, CarePlanProduct } from '@/lib/care-plan';

/** Only periods explicitly checked in the exact model's official care guidance. */
export const CARE_PLAN_INTERVALS: Record<string, CareInterval> = {
  'CHPI-7400N:outlet': { unit: 'days', amount: 7, basis: '출수구 주 1회 청소 안내' },
  'CHPI-7400N:tray': { unit: 'days', amount: 7, basis: '물받이 주 1회 청소 안내 · 고인 물은 하루 이상 방치하지 않음' },
  'CHPI-7400N:filters': { unit: 'months', amount: 4, basis: '필터 세트 예상 4개월 · 하루 10L 사용 기준. 수질·관리 계약에 따라 달라짐' },
  'AR07A9170HCN:filter': { unit: 'days', amount: 14, basis: '먼지거름 필터 약 2주 청소 · 하루 8시간 사용 기준. 먼지가 많으면 더 자주 확인' },
  'WF24A9500KE:drain': { unit: 'days', amount: 7, basis: '배수 필터 주 1회 이상 청소 안내. 급수 거름망은 별도 확인' },
  'S8 Pro Ultra:brush': { unit: 'days', amount: 14, basis: '메인 브러시 2주 청소 안내. 6~12개월 교체 기준은 별도' },
  'S8 Pro Ultra:filter': { unit: 'days', amount: 14, basis: '본체 세척 필터 2주 청소 안내. 6~12개월 교체 기준은 별도' },
  'Qrevo Curv:brush': { unit: 'days', amount: 14, basis: '메인 브러시 2주 청소 안내. 6~12개월 교체 기준은 별도' },
  'Qrevo Curv:filter': { unit: 'days', amount: 14, basis: '본체 세척 필터 2주 청소 안내. 6~12개월 교체 기준은 별도' },
};

// 기술 지도에서는 기능명을 쓰지만, 일정·수첩에는 기존 관리 설명의 행동을 이름으로 쓴다.
// 항목 id와 공식 주기는 바꾸지 않아 저장된 관리 기록도 그대로 이어진다.
const CARE_ACTION_TITLES: Record<string, string> = {
  '트리플 독립냉각': '설정 온도·문 닫힘 확인',
  '더블냉각': '설정 온도·문 닫힘 확인',
  '인버터 리니어·정온': '설정 온도·문 닫힘 확인',
  '인버터·정온': '설정 온도·문 닫힘 확인',
  '맞춤보관실': '보관실 용도·식품 배치 확인',
  '좌우 냉장·냉동': '냉장·냉동칸 식품 배치 확인',
  '매직스페이스': '수납칸 용도·식품 배치 확인',
  '양문형·수동 제빙': '수납칸 용도·식품 배치 확인',
  '문 열림·방열 공간': '문 열림·방열 간격 확인',
  '인버터 냉방': '실내기·실외기 조합과 설치 조건 확인',
  '마이크로홀·기류': '풍향·풍속·송풍 모드 확인',
  '자동 내부 청소': '필터 청소 방법·상태 확인',
  '흡입·송풍 공간': '흡입·배출구 장애물 확인',
  '먼지 필터': '먼지 필터 청소·건조',
  '장기 미사용·재사용': '장기 보관·재사용 절차 확인',
  '무풍·기류 조절': '무풍 모드·온도·풍향 확인',
  '먼지거름 필터': '먼지거름 필터 청소·건조',
  '내부 건조·보관': '내부 청소 표시·보관 방법 확인',
  '자동 투입 세제함': '세제 설정·세제함 청소 방법 확인',
  '무세제 통세척': '통세척·도어 관리 방법 확인',
  '세탁·히트펌프 건조': '세탁·건조 코스별 적재량 확인',
  '배수·건조 먼지 필터': '배수·건조 필터별 청소 기준 확인',
  '세제 자동 투입': '세제 종류·세제함 청소 방법 확인',
  '3D·LiDAR 센서': '바닥 장애물·센서 오염 확인',
  '본체 먼지통·필터': '먼지통·필터 청소와 브러시 상태 확인',
  '청정스테이션': '스테이션 먼지봉투·필터 상태 확인',
  '라이다 주행': '전선·작은 물건·금지 구역 확인',
  '흡입·물걸레': '걸레 장착·급수·바닥 사용 조건 확인',
  '올인원타워': '타워 먼지봉투·필터 교체 기준 확인',
  '송풍·풍향': '풍향·풍속·자동 모드 확인',
  'HEPA·탄소 필터': '필터 교체 알림·교체 방법 확인',
  '센서·외부 관리': '흡입구·센서·루프 먼지 확인',
  'HEPA·탄소·촉매': '필터 종류·교체 알림 확인',
  '온풍·송풍': '온도·풍향·안전 간격 확인',
  '자동 모드·센서': '센서·흡입구 오염과 표시 확인',
  '360도 흡입·송풍': '흡입·배출구 장애물과 간격 확인',
  '고효율·활성탄 필터': '교체 필터·수명·알림 확인',
  'OLED·앱 관리': '필터 알림·앱 연결 확인',
  '제습·흡입 공간': '습도·모드·흡입구 장애물 확인',
  '물통·연속배수': '물통·부레·배수호스 상태 확인',
  '세척형 프리필터': '프리필터 세척·건조 방법 확인',
  '중금속9·바이러스 필터': '필터별 교체 주기·계약 조건 확인',
  '직수관·출수구 관리': '살균 설정·온수 주의사항 확인',
  '출수구·물받이': '출수구·물받이 상태와 청소 방법 확인',
  '천장·상하 분사날개': '식기 배치·노즐 회전 공간 확인',
  '자동 문열림·열풍': '문열림 설정·문 앞 장애물 확인',
  '둥근·사각 거름망': '거름망·분사기 청소와 조립 확인',
  '3단계 직수 필터': '필터별 교체 주기·관리 이력 확인',
  '빙축열·순간 가열': '냉온수 설정·온수 주의사항 확인',
  '코크 UV·물받이': '출수부·물받이 청소 방법 확인',
  'DuoDivide 브러시': '메인 브러시 청소',
  '본체 세척 필터': '본체 필터 청소·건조',
  '듀얼 걸레·도크': '걸레·도크 탱크·필터 상태 확인',
  'QHD 화면·프로세서': '입력 단자·화면 모드 확인',
  '터치·화면 공유': '앱 터치 지원·연결 방법 확인',
  '분리 화면·배터리': '충전 조건·이동 시 고정 상태 확인',
  '분리형 QHD 화면': '화면 놓을 자리·필요 부속품 확인',
  'webOS·터치': '앱·화면 공유·터치 지원 확인',
  '배터리·USB-C': '충전 어댑터·단자 상태 확인',
  '32형 4K 화면': '해상도·주사율·게임 기능 조건 확인',
  '가상 채널 음향': '콘텐츠 음향 형식·음향 모드 확인',
  '144Wh 배터리': 'USB-C 충전기 전력·권장 어댑터 확인',
  '케이스·화면': '케이스 이물질·고정 상태 확인',
  '27형 화면·webOS': '화면 조절·설치 안정성 확인',
  '배터리·전원 스위치': '충전·장기 보관·스위치 사용법 확인',
  '2-way·듀얼 앰프': '이어팁 크기·착용 상태 확인',
  '코덱·자동 전환': '연결 기기·운영체제 지원 확인',
  'ANC·배터리·케이스': '배터리 시험 조건·방수 범위 확인',
  '드라이버·H2': '이어팁·착용·노이즈 제어 설정 확인',
  '기기 연결·기능 조건': '사용 기기·지역별 기능 지원 확인',
  '이어폰·충전 케이스': '충전 방식·방수·방진 조건 확인',
  '8.4mm 드라이버': '이어팁 호환·착용·손상 상태 확인',
  '멀티포인트': '두 기기 재생 전환 방법 확인',
  '코덱·배터리': '음질·노이즈 제어별 배터리 조건 확인',
  '울-페이퍼 드라이버': '이어팁·노이즈 제어 설정 확인',
  'LDAC·듀얼 연결': '음질·기기 전환별 배터리 조건 확인',
  'Dolby·케이스': '앱 기능·충전 상태 확인',
  '하이브리드 ANC': '이어팁 착용·노이즈 제어 모드 확인',
  'LDAC·멀티포인트': '앱·연결 기기의 음질·다중 연결 지원 확인',
  '배터리·Type-C': '충전·방수 조건 확인',
};

export const CARE_PLAN_PRODUCTS: CarePlanProduct[] = allAppliances.map((appliance) => {
  const purifier = getPurifierTechnology(appliance.modelNumber);
  if (purifier) {
    const manual = purifier.sources.find((source) => source.id === 'manual');
    if (!manual) throw new Error(`관리 일정 설명서 없음: ${appliance.modelNumber}`);
    return {
      modelNumber: appliance.modelNumber, slug: appliance.slug, title: purifier.title, category: appliance.category,
      items: purifier.careItems.map((care) => ({
        id: care.id, title: care.title, timing: care.timing, description: care.description,
        sourceLabel: `${manual.title} · ${care.pages}`, sourceUrl: manual.url,
        interval: CARE_PLAN_INTERVALS[`${appliance.modelNumber}:${care.id}`],
      })),
    };
  }
  const guide = getApplianceTechnologyGuide(appliance.modelNumber);
  if (!guide) throw new Error(`관리 일정 기술 지도 없음: ${appliance.modelNumber}`);
  return {
    modelNumber: appliance.modelNumber, slug: appliance.slug, title: guide.title, category: appliance.category,
    items: guide.careItems.map((care) => {
      const source = guideEvidenceLink(guide, care.evidence[0]);
      if (!source) throw new Error(`관리 일정 근거 없음: ${appliance.modelNumber}:${care.id}`);
      return {
        id: care.id,
        // The shared guide groups inlet mesh with the drain filter. Only the drain filter has a weekly interval.
        title: appliance.modelNumber === 'WF24A9500KE' && care.id === 'drain' ? '배수 필터 청소' : CARE_ACTION_TITLES[care.title] ?? care.title,
        timing: care.timing, description: care.description,
        sourceLabel: source.label, sourceUrl: source.href,
        interval: CARE_PLAN_INTERVALS[`${appliance.modelNumber}:${care.id}`],
      };
    }),
  };
});
