# Laundry label journey implementation plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 세탁한 한 통을 그대로 건조할 수 있는지, 의류 표시와 정확 모델의 코스 조건을 함께 읽어 나눌 수 있게 한다.
**Architecture:** 기존 BlogPost·BlogSection.links·GuideSection.links를 재사용. 새 블로그 한 편과 세탁기/건조기 가이드·일체형 비교 글의 문맥 링크. 새 도구·상태·아이콘 라이브러리·의존성 없음.
**Tech Stack:** Next16/React19/TypeScript/Vitest/Aside. 관련 로컬 Next Link 안내를 읽었다.
**Scope:** 사용자의 ‘다음 가자’는 직전 완료 보고에서 후속으로 남긴 인접 살림 분야 확장을 이어가는 승인으로 해석. 기존 설계의 세탁표시 후보를 구현한다. 운영 배포·외부 문의·커밋·푸시는 제외. 미커밋 변경 보존.

## Reader contract
- 새 `/blog/laundry-label-before-drying`은 ‘라벨 확인→건조 후보/자연건조/확인 보류 분류→정확 코스/적재 조건→끝난 뒤 확인’의 경로를 제공한다.
- GINETEX 체계의 표시 설명과 국내 제조사 공용 안내를 구분한다. KS 전체 표준이나 모든 국가/연식의 기호 대응표라고 하지 않는다.
- 저온 코스나 울 코스가 금지 표시를 무효화하지 않는다. 다른 옷·소재 이름으로 라벨을 추측하지 않는다. 표시가 없음을 법적 금지라고 판정하지 않고 독자 판단의 보류로 남긴다.
- DV17A9720BV만 정확한 코스 예시로 사용. 6/3/1kg 상한과 덜 마른 종료는 해당 공용 설명서 35~36쪽 기준. 건조 정도 숫자를 공기 온도나 라벨의 점 수로 번역하지 않는다.
- 가상 빨래 바구니 사례는 가상 표시. 실제 의류 시험·수축률·소요시간·요금·허용 판정 도구 없음.

## Review Focus
기호 체계/기기 모델의 확대 적용, 세탁 허용과 건조 허용 혼동, 금지와 저온 코스 혼동, 건조 정도 숫자/온도/점 수의 혼동, 코스 상한을 안전 허용량으로 단정, 덜 마른 종료에 반복 가열 권장, 실제 시험처럼 보이는 가상 사례, 세탁기·건조기·기존 글과의 실제 왕복.

### Task 1: 근거·새 원고
- [x] GINETEX 원문, 삼성 서비스 41123, DV17 공용 설명서 16~20·35~36쪽 대조 및 근거 기록.
- [x] 원고·발행 목록·확인된 출처 URL 등록. 제품 연결은 코스 예시로 다룬 DV17만 포함.
- [x] 블로그 기존 무결성·품질·공개 제품/출처 검사 통과. 문장 복제 검사는 추가하지 않는다.

### Task 2: 읽기 경로·완료 검증
- [x] 경로 검사 RED→GREEN: 두 카테고리/기존 비교 글→새 가이드→DV17와 기존 비교 글.
- [x] 전체 테스트·변경 파일 lint·정적 빌드, 신선한 독립 최종 리뷰 1회.
- [x] Aside 390/1440px 경로·키보드·가로 넘침, 실제 main 변경 경로와 수정 이력, sitemap/noindex/광고 링크 정합성.
- [x] 검증 로그·완료 기록. 자료 숫자는 내부 승인 기준으로 설명하지 않는다.

## Ledger
- Baseline: `phase4-before-main-hashes.json`, 167개 HTML.
- Ruling: 이번에는 새 기호 사전/촬영 인식기를 만들지 않고 기존 블로그 한 편으로 완결한다 — 독자의 분류 결정은 현재 렌더러로 전달할 수 있다 — 비용은 자동 판독 기능이 제공되지 않는 것.

- Task 1 complete: 출처·모델 조건 대조와 원고/목록 등록 완료.
- Task 2: 경로 3개 RED(3실패/12통과)→GREEN(관련 블로그 포함293통과). 전체72파일/2798검사 통과, 변경 구현 파일 lint 통과. 최초 빌드 성공, 이력8경로 추가 뒤 최종 빌드 확인 중.

- Final: fixed browser navigation — 카테고리에서 진입 후 scrollY1040/titleTop-861 재현. Next16 Link의 문서화된 스크롤 보존 동작 때문에 글 시작을 건너뛰므로, 공통 글 시작 앵커와 홈/목록/제품 관련 글 카드·이번 문맥 링크에 진입점을 적용. DOM 경로 검사 4실패 RED→GREEN, 전체72파일/2799검사 통과. Aside390/1440에서 scrollY0/titleTop179 확인.
- Final review: phase4_laundry_final_review fresh context gpt-6-astra high. Critical/Important 없음, Minor1.
- Final: minor (deferred): washer/dryer의 화면 최종 검수일은 원문 확인일2026-10-09로 남아 있음. 본문 편집일과 자료 확인일의 표시를 구분하는 작업은 후속으로 남긴다. 근거 전체 재조사를 하지 않아 sourcesCheckedAt을 새 날짜로 올리지 않는다.
- Final: Ruling: 기존1~3차 사실관계 전면 재심사는 이번 리뷰에서 제외 — 이전 독립 검토를 바탕으로 새 원고/연결/필요한 원문 절을 점검 — 비용은 과거 검토에서 놓친 다른 문제를 이번 범위로 재검출하지 못하는 것.
- Final complete: 빌드·lint·내부 링크12206개(오류0), noindex/광고 충돌0, 본문 텍스트 변경8경로와 이력 일치. 본문 텍스트 비교와 별도로 공통 앵커/링크 속성 변경 페이지를 phase4-navigation-anchor-pages.txt에 기록.
