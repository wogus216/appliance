# Household Care Editorial Phase 2 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 사용자 요청의 2차 개선으로 기존 공식 자료를 새 생활 질문에 종합한 해설 한 편을 로컬에 추가한다.
**Architecture:** 기존 BlogPost와 선택적 section.links를 재사용. 홈·목록·제품 역참조는 기존 데이터로 자동 연결. 새 UI/도구/의존성 없음.
**Tech Stack:** Next16/React19/TypeScript/Vitest/Aside.
**Spec:** docs/superpowers/specs/2026-11-02-adsense-first-household-content-design.md 의 ‘이후 넣을 원고와 확장 기준’. 사용자가 2차 개선을 요청해 실행 범위를 추가 승인했다.

## Global Constraints
- 현재 미커밋 작업 보존, 같은 로컬에서 실행. 커밋·푸시·배포 없음.
- S8 Pro Ultra 물탱크형, CHPI-7400N, DV17A9720BV, CDW-A0611TW만 비교. 품목 간 성능 순위 없음.
- 자동 처리/남는 일/관리 시점/부품 접근/보류 조건을 해석한다. 임의 절약 시간·연간 총비용·주기 생성 금지.
- 새 URL은 해설 /blog/automatic-appliances-manual-care 하나. 기저귀·청소용품 확장은 후속이다.
- 자료 확인일과 발행일 구분. 기존 모델·가격의 확인일 갱신 없음.

## Review Focus
- 자동 운전·살균·먼지비움과 실제 세척·소모품 교체 혼동.
- 매회·횟수·상태 기준이 임의 일수 일정으로 바뀌는지.
- 물탱크형 도크와 자동급배수 구성이 섞이는지.
- 공용 설명서가 다른 모델이나 국내 규격까지 확대되는지.
- 가상의 사용 횟수 계산이 실측 절약 시간·비용으로 읽히는지.

### Task 1: 근거와 원고
**Files:** 새 blog/posts/automatic-appliances-manual-care.ts; blog/index.ts; research/evidence/2026-11-02/phase2-care-editorial-source-check.md.
**Interfaces:** BlogPost 기존 타입만 사용.
- [x] 공식 PDF 4종 재확인: S8/코웨이 웹 PDF, 삼성/쿠쿠 재수신+기존 해시 일치·쪽 대조.
- [x] 네 모델의 비교표·개별 적용 조건·독자 결정·한계·FAQ와 모델별 관리/기술 카드 링크 작성.
- [x] 블로그 기존 데이터 검사·목록/역참조 검증. 원고 문장 그대로 고정하는 테스트는 추가하지 않음.

### Task 2: 발견과 검증
**Files:** category-guides/{robot-vacuum,water-purifier,dryer,dishwasher}.ts; site-revisions.ts; evidence.
**Interfaces:** 기존 GuideSection.links를 사용.
- [x] 관리 작업을 설명하는 절에 새 해설로 가는 링크 추가. 기존 링크 유지.
- [x] 전체 테스트·변경 파일 lint·정적 빌드.
- [x] 독립 최종 내용 리뷰 후 중요한 문제 수정·필요 검사.
- [x] Aside390/1440 홈→원고→관리일 경로·표 가로 넘침·키보드 확인.
- [x] 빌드 전후 main 비교로 실제 수정 경로만 이력에 기록. sitemap/noindex/광고·내부 링크 정합성 확인.
