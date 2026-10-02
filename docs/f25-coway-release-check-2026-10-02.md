# F25·CHPI-7400N 배포 점검 — 2026-10-02

## 변경과 근거

- `791e514`를 `main`에 푸시했고 GitHub Actions `36954357777`의 Cloudflare 배포가 성공했다.
- 하이얼 `CTH06QBW`·`CTH10QBW` 설명서 PDF의 SHA-256을 기존 조사 기록과 재대조했다. 각각 `bc74471b698ca3b966ced34e70cb2f986de9d7639aefd91db15868972019fb89`, `de0d9a7d79e7bc532598612c8c18ae447d953ab2abb948b58dfe3a53213a93f6`으로 일치했다. F25 페이지는 국내 설명서의 저온 표시 가능성과 10초 재시작을 안내하며 부품 고장은 지정하지 않는다.
- 코웨이 공식 설명서의 `CHPI-7400N` 기능·필터 코드·국내 4개월 교체 조건, WQA 완제품 `CHPI-7400N`의 인증 항목과 교체 요소 `CCNTN7-D-PLUS`, 한국물기술인증원 2026-07-09 목록의 323번 `CHPI-7400N`·유효 정수량 1,000 L를 원문에서 다시 확인했다. WQA의 150 US gal과 국내 1,000 L를 같은 시험 정격으로 비교하지 않았다. 본사 필터 단품가와 1년 후 멤버십 요금은 미확정으로 남겼다.

## 배포 전 검증

- 전체 테스트 23개 파일, 1,907개 통과. ESLint, `tsc --noEmit`, 프로덕션 빌드 통과. 정적 페이지 159개 생성.
- 빌드된 F25 상세와 하이얼 허브에서 상세 링크·canonical·H1을 확인했다. Coway 제품과 브랜드는 `noindex` 없이 생성되고 제품 페이지에 WQA·한국물기술인증원 출처 링크가 있다.
- 사이트맵은 96 URL이다. F25 상세, Coway 제품, Coway 브랜드가 포함된다.

## 라이브 확인

2026-10-02 KST에 라이브 응답을 직접 조회했다.

| 경로 | HTTP | 확인 내용 |
| --- | --- | --- |
| `/error-codes/Haier/air-conditioner/f25` | 200 | canonical, H1, 모델별 안내, 출처 |
| `/error-codes/Haier` | 200 | F25 상세 링크 |
| `/products/coway-handpick-water-purifier-compact` | 200 | canonical, `noindex` 없음, WQA·한국물기술인증원 링크 |
| `/brand/Coway` | 200 | canonical, `noindex` 없음 |
| `/sitemap.xml` | 200 | 96 URL, 위 신규 색인 대상 3개 포함 |

## 검색·광고 상태

GSC URL 검사 API로 F25 상세, Coway 제품, Coway 브랜드를 직접 조회했을 때 세 URL 모두 `URL is unknown to Google`이고 크롤 기록이 없었다. 이는 **배포와 라이브 확인 결과가 아니라 별도의 검색 색인 상태**다. 사이트맵에 실렸다는 사실도 색인 요청이나 색인 보장이 아니다.

AdSense 계정의 재심사 상태는 로그인된 계정에서 확인하지 못했다. 이 배포로 재심사를 요청했다고 기록하지 않는다.
