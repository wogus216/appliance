# Local Content Consistency Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox syntax for tracking.

**Goal:** 승인한 로컬 1차 A-C를 구현하여 제품 판단의 일관성과 세 독자 경로를 완성한다.
**Architecture:** 기존 데이터와 서버 렌더링을 유지한다. GuideSection에 선택적 관련 링크를 추가하고 공개 페이지는 Next Link로 출력한다. 제품·기사의 사실 수정은 기존 근거에 한정한다.
**Tech Stack:** Next.js16.2.12, React19, TypeScript, Vitest, Aside.
**Spec:** docs/superpowers/specs/2026-11-02-adsense-first-household-content-design.md

## Global Constraints
- 새 URL·의존성·저장 형식·알림·광고 경계 변경 없음.
- 현재 작업 트리의 이전 변경 보존. 커밋·푸시·배포·신청 없음.
- 공개 제품34개 핵심 판단 대조 결과 기록. 숨김 모델 제외.
- 새 원고·분야 확장은 다음 작업. 이번에 발행하지 않음.
- 현재 작업공간에서 직접 실행. 사용자의 진행 승인을 반영하며 실행방법 추가 승인 절차는 생략한다.

## Review Focus
- 모델명이 없는 도구 링크가 잘못된 기본 모델로 연결되지 않는지.
- 단독 설치와 직렬 설치 높이가 같은 승인 기준처럼 보이지 않는지.
- 음악·통화·최대 시험시간이 실제 일정 보장이 되지 않는지.
- 수동 관리 항목을 자동 날짜 계산으로 약속하지 않는지.
- noindex·광고 제외·원문 확인일·저장 데이터가 유지되는지.

### Task 1: 핵심 판단 수정
**Files:** detailed-reviews/group1,5,6,8.ts, appliances/qcy.ts, category-guides/dryer.ts,dehumidifier.ts, blog/posts/washer-dryer-combo-vs-separate.ts,sony-xm5-vs-qcy-melobuds.ts, brands/profiles.ts, 새 lib/data/customer-support.ts.
**Interfaces:** WINIX_SUPPORT { phone, url, checkedAt } 공통 데이터. 다른 타입 변경 없음.
- [x] 여섯 문제 수정. RF85 본체는 하한, TP07 수명 비례 제거, DV17 직렬 별도확인, QCY 실제 일정 보장 제거, CHPI 소유권 구분.
- [x] 위닉스 공식 고객지원 번호 재확인·공유. 가격·기존 확인일 유지.
- [x] 공개34개 독립 대조 결과를 수합하고 같은 유형 모순의 작은 수정.
- [x] 기존 콘텐츠·제품 근거 관련 검사 실행. 카피만 고정하는 새 테스트는 작성하지 않는다.

### Task 2: 세 가지 생활 과제 경로
**Files:** lib/data/category-guides/index.ts 및 refrigerator,washer,dryer,robot-vacuum,dishwasher.ts; app/category/[slug]/page.tsx; 기존 관련 blog3편; 새 lib/__tests__/category-action-links.test.ts.
**Interfaces:** GuideSection.links?: {label:string;href:string}[], 앵커 #buying-guide 유지.
- [x] 카테고리 렌더링에서 링크가 빠진 것을 잡는 실패 테스트 작성·실행. 기대: 대상 href 없음으로 FAIL.
- [x] 선택적 links 필드·문맥 링크를 구현하고 상단 가이드 이동 추가.
- [x] 냉장고→비교→모델 확인표, 세탁→콤보해설→설치/관리, 로봇→설치/흡입해설→모델관리 경로 연결.
- [x] 실제 지원 모델과 앵커 존재를 검증하는 검사 PASS.

### Task 3: 제목·소개·검증
**Files:** lib/constants.ts, app/about/page.tsx, app/blog/page.tsx, app/category/[slug]/page.tsx, app/compare/[pair]/page.tsx, lib/data/site-revisions.ts, research/evidence/2026-11-02/.
**Interfaces:** 기존 메타 API·URL·canonical 유지. 가이드 제목을 메타에도 사용.
- [x] 공통 설명·소개를 실제 범위로 수정. 카드 출처/글자 수 제거. 낡은 광고 하한 주석 정정.
- [x] 필수 전체 테스트, 변경 파일 lint, 정적 빌드. 예상: 모두 통과.
- [x] 이전 out/ main 본문과 비교해 실제 변경 경로만 수정 이력에 기록.
- [x] Aside390/1440에서 세 경로·입력 결과·키보드·넘침·저장보존 확인.
- [x] 새로운 독립 최종 리뷰. 중요 문제 수정 후 필요한 검사 재실행.
- [x] 로컬 결과·남은 미확인·배포 대기 보고.
