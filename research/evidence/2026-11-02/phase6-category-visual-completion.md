# Phase6 — 네 구매 가이드의 선택표와 확인 순서

## 결과
- 냉장고·세탁기·건조기·로봇청소기에 3열 선택 기준표4개, 3단계 확인 순서4개를 추가했다. 제품 목록보다 앞에 배치하고 모델별 설치·관리 도구 및 관련 해설로 연결한다.
- 기존 제품 사진·제품 목록·buying-guide/guide-N 앵커는 유지한다. 블로그4편의 분기형 ul은 그대로이고 카테고리는 순서형 ol이다.
- 네 페이지에서 자료 확인일과 본문 편집일을 구분한다. 기존 자료 확인일을 올리지 않았다.

## 검증
- RED: 새 렌더링 테스트4실패/2통과 → GREEN6통과. 이후 전체74파일2,812테스트 통과.
- 첫 집중 검사에서 jsdom의 쿼리 문자열 포함 CSS 속성 선택자가 href를 찾지 못했다. 실제 DOM href 목록으로 대조하도록 고쳐 모델 주소를 그대로 검증한다.
- 변경 파일 eslint 진단0. npm run build 종료0, TypeScript 및 정적 생성 완료.
- HTML168, 사이트맵110, 내부 링크12,233 검사: 누락 페이지·앵커0, sitemap/noindex 충돌0, noindex/광고 동시 적용0. 본문 텍스트 변경4경로가 개편 이력과 일치한다.
- Impeccable 정적 detector1회 결과[] (검사 대상: 카테고리 페이지·공유 시각 요약 컴포넌트).
- Aside390/1440에서 네 페이지를 배치 점검했다. 문서 폭은 각각390/1440, 표 폭358/768로 가로 넘침0. 모바일 표4개·순서 도식, 데스크톱 표·도식 스크린샷을 직접 확인했다. 키보드 Enter로 자세한 설명→buying-guide 이동 확인.
- 실제 링크 클릭: RF85 냉장고 설치 확인표, WD25 설치 확인표, DV17 관리 일정표, S8 기술 카드 및 관리 일정표. 정확한 모델 선택과 앵커 도착 확인.
- DV17의 첫 스냅샷은 초기 hydration 전 기본 선택을 보였다. 같은 링크를 확인하는 최종 확인1회에서 hydration 뒤 실제 값 DV17A9720BV를 확인했다. 제품 코드 변경은 필요하지 않았다.
- Aside의 locator.getByRole 연결은 지원되지 않아 첫 상호작용 스크립트가 중단됐다. 새 snapshot 참조로 수정하여 전체 링크 경로를 확인했다. 브라우저 실행 기록에 보관한다.

## 최종 리뷰와 범위 판단
- 신선한 최종 리뷰1회: phase6_category_visual_review, gpt-6-astra/high. Critical/Important/Minor 없음. 재리뷰·추가 구현 없음.
- Ruling: 새 사진 없이 기존 제품 사진과 새 표·도식에 집중한다 — 필요한 정보는 선택 구조이며 중복 이미지를 늘리지 않는다 — 새 생활 장면 사진·실측 증빙은 제공하지 않는다.
- Final Ruling: 이전 단계 미커밋 작업은 이번 리뷰에서 제외한다 — Phase6의 변경을 검토한다 — 이전 작업의 잠재 문제를 이번 리뷰가 보증하지 않는다.
- Final Ruling: 원자료 최신성·기존 사실 전체 재검증은 확대하지 않는다 — 기존 원고를 요약하고 자료 확인일을 유지한다 — 새 자료 확인 증빙은 늘지 않는다.
- Final Ruling: 리뷰어가 보류한 실제 화면·키보드·모델 선택·빌드는 실행자가 확인한다 — 위 브라우저·빌드·정적 결과로 완료 조건을 충족했다 — 코드 리뷰만의 보증 범위로 오해하지 않는다.
- Deferred minors: 없음.

## 기록
- phase6-before-main-hashes.json / phase6-changed-pages.txt / phase6-static-verification.json
- phase6-red.txt / phase6-focused.txt / phase6-tests.txt / phase6-lint.txt
- phase6-browser.txt / phase6-browser-links.txt / phase6-dv17-confirm.txt
- phase6-impeccable-detector.json
- 로컬 정적 프리뷰: http://127.0.0.1:3012/category/refrigerator#visual-summary-heading
- 배포·커밋·푸시·광고 신청은 하지 않았다.
