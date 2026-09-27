/**
 * 홈에 바로가기로 거는 코드 — 사람들이 실제로 검색해서 들어온 코드만 싣는다.
 *
 * 측정 사양: 네이버 서치어드바이저 '검색어' 표 TOP 30 · PC+모바일 · 30일 · 기준일 2026-09-16
 * (스냅샷 `.audit/naver/salimlab.kr/2026-09-17.json`, gsc-watch를 돌리는 워크트리에 있다).
 * `impressions`는 같은 코드를 가리키는 질의 변형의 노출 합이다 — 예: 쿠쿠 E4 =
 * "쿠쿠 식기세척기 e4" 58 + "쿠쿠 식기세척기 e4에러" 19 + "쿠쿠 식세기 e4" 14.
 * TOP 30 밖은 보이지 않으므로 이 목록은 '수요가 확인된 코드'이지 '수요 전부'가 아니다.
 *
 * 앵커는 여기 적지 않는다. `resolvePopularCodes()`가 데이터에서 찾고, 코드가 데이터에서
 * 사라지면 테스트가 실패한다 — 손으로 적은 앵커가 조용히 허브 맨 위로 떨어지는 일을 막는다.
 *
 * 수요는 있는데 데이터에 없는 것(2026-09-27 확인): SK매직 정수기 "급배수 확인"(21)·
 * "F 표시"(8)·"냉각수 부족"(2)·"리셋 방법"(12). 공식 자료를 찾기 전에는 싣지 않는다.
 */
export type PopularCode = {
  brand: string;
  category: string;
  code: string;
  impressions: number;
};

export const POPULAR_CODES: PopularCode[] = [
  { brand: 'SKMagic', category: '식기세척기', code: 'E2', impressions: 148 },
  { brand: 'Cuckoo', category: '식기세척기', code: 'E4', impressions: 91 },
  { brand: 'SKMagic', category: '식기세척기', code: 'E4', impressions: 64 },
  { brand: 'SKMagic', category: '식기세척기', code: 'F3', impressions: 42 },
  { brand: 'LG', category: '냉장고', code: 'CF', impressions: 33 },
  { brand: 'Cuckoo', category: '식기세척기', code: 'E1', impressions: 29 },
  { brand: 'SKMagic', category: '식기세척기', code: 'F5', impressions: 24 },
  { brand: 'SKMagic', category: '식기세척기', code: 'dr', impressions: 15 },
  { brand: 'Cuckoo', category: '식기세척기', code: 'E3', impressions: 10 },
  { brand: 'Cuckoo', category: '식기세척기', code: 'dr', impressions: 8 },
];
