# 새 블로그 글: 자동급배수 로봇청소기 설치 조건 (2026-10-16)

기준 커밋 `2a32377`. 작업 전 미커밋 변경(구매 가이드·제품 상세·비교 글 문장 편집, `docs/copy-editing-review-2026-10-14.md`)은 그대로 두었다. 두 작업은 겹치는 파일이 없다. 2026-10-17 커밋 `58e0f6d`로 이 글만 배포했다(아래 "배포와 운영 확인").

## 결과

- 글: `/blog/robot-vacuum-auto-water-install` — 「자동급배수 로봇청소기 구매 전 확인할 것 — 삼성 스팀 울트라·LG 로니의 설치 공간·배관·추가 비용」 (`kind: 가이드`)
- 대상: 삼성 VR90F01SAG(Bespoke AI 스팀 울트라 자동 급배수, ‘리폼+설치’는 VR90F01SAGS), LG N95TWU(RONi 히든스테이션). 물통형 짝으로 삼성 VR90F01AAH, LG N95THO를, 이 사이트 공개 제품인 로보락 Qrevo Curv·S8 Pro Ultra를 물통형 대안으로 다룬다.
- 제외: LG B95AWBTH(로보킹 AI 올인원 자동 급배수, 제품 페이지 단종 표시), 삼성 자동 급배수 프리스탠딩(설치가이드 도면 치수가 두 설명서와 맞지 않고 연결 제품이 일반형).
- 구성: 결론 3문단, 7절(설치 자리 / 공간 조건 ①~⑥ / 배관·전원 조건 ⑦~⑫ / 가상 주방 계산 / 견적 네 칸 / 상담 준비 치수·사진·질문 8개 / 확인하지 못한 것), 조건별 결론 6개, FAQ 4개, 출처 14개.

## 기존 구조로 해결한 방식

- 새 제품 상세는 등록하지 않았다. 블로그 `comparison` 표는 `columns[i] ↔ productSlugs[i]` 규약과 카탈로그 수치 대조 테스트가 걸려 있어 카탈로그 밖 두 모델에는 쓸 수 없다. 모델 대조는 공간·배관 절 안에서 번호 붙은 항목 문단(①~⑫)으로 쓰고, 각 수치 옆에 모델·쪽수·출처를 붙였다.
- `productSlugs`는 본문 물통형 대안 절과 조건별 결론에서 실제로 다루는 공개 제품 2개(`roborock-qrevo-curv`, `roborock-s8-proultra`)다. 두 제품 상세의 관련 글 목록에 이 글이 붙는다.
- UI·품질 게이트·출처 허용목록은 바꾸지 않았다. 출처 14개는 모두 기존 허용목록의 공식 도메인(samsung.com·lge.co.kr·roborock.com)이다. LG 설명서 PDF 직접 주소(lge.com 하위)는 허용목록 밖이라 lge.co.kr 매뉴얼 페이지를 출처로 걸고 PDF 주소는 근거 문서에 남겼다.

## 근거 기록

- `research/evidence/2026-10-16/auto-water-robot-vacuum-install.md`: 원문 목록(마크다운 링크), 모델 범위 결정, 주장 33건(ID·모델 범위·원문 위치·필수/권장/현장/계산/판단 분류), 상충·공백 10건, 계산 검산, 가상 주방 가정값.
- `research/evidence/2026-10-16/sources/`: 원문 발췌 10개 파일(긴 본문·PDF 전문은 넣지 않음).
- `.audit/auto-water-robot-2026-10-16/`(Git 제외): 원본 HTML·PDF·추출 텍스트·쪽 렌더 이미지, `verification/` 검증 로그.
- `src/lib/__tests__/blog.test.ts`의 `evidenceNotes`에 위 근거 문서를 추가했다(5차 교정 `pass5/blog-sources-2026-10-11.md`와 같은 절차). 출처 URL 위조 차단 검사 자체는 그대로다.
- `content-research-writer`·`blog-auto` 스킬은 로컬에 없어 저장소 절차로 진행했다. `copy-editing`은 명료성·문단 분리·줄표 정리에, `humanizer`는 마지막 반복 마무리 문장 정리에만 적용했다. 편집 뒤 본문 숫자 토큰 119종을 근거 문서·발췌와 대조해 가정값 외 근거 없는 숫자가 없음을 확인했다.

## 확인하지 못한 것·상충

1. LG 히든스테이션 깊이: 제품 페이지 600×147×500mm ↔ 설명서 59쪽 600×570×147mm.
2. 삼성 장 안팎 단차: 설명서 25쪽 “내부 바닥이 외부보다 3mm 이상 낮지 않은 곳” ↔ 설치가이드 “단차 2mm 이내, 내측이 더 높지 않아야”.
3. 삼성 일반형 전방 여유: 설명서 4쪽 약 0.8m ↔ 53쪽 1.0m. LG 수압 상한: 설치가이드 12kgf/cm² ↔ 설명서 1.25MPa.
4. 미공개: 삼성 ‘설치’ 제품 추가 설치비 단가, 두 회사 이사 재설치 비용, LG 원상복구 비용, LG 히든스테이션 급·배수 호스 포함 여부, 청소 1회 물 사용량, 삼성 리폼 기준 450mm의 측정 기준(외형/내측).
5. 제품 가격은 싣지 않았다(두 공식몰 모두 카드·쿠폰 조건의 최대 혜택가 표시). 카탈로그 제품의 가격·검수일은 바꾸지 않았다.

## 검증 (2026-10-16 로컬)

- `npx vitest run`: 24파일·1,941건 통과(직전 기록 1,934건 + 새 글 파라미터 테스트 7건). 첫 실행에서 `site-revisions.test.ts` 2건이 새 글 lastmod(2026-10-16) 때문에 실패했다. 이 상한은 주석대로 블로그 수정일이 늘면 함께 올리는 손 기록 값이고, 새 글 추가 때 올린 선례(71fda46)가 있어 `LATEST_EXPECTED_LASTMOD`를 `2026-10-16`으로 올렸다.
- `npx eslint`, `npx tsc --noEmit`, `npx next build`(정적 페이지 157개), `git diff --check` 통과.
- 품질 게이트: 색인 가능, 본문 10,399자(기준 2,400), 7절(기준 4), 인용 가능 발행처 3곳(기준 2), 출처 없는 전언 패턴 0건.
- 기준 빌드(HEAD + 기존 미커밋 diff, 새 글 없음)와 대조: 정적 HTML 154→155, 기존 페이지 robots·canonical 변화 0건, 새 페이지는 robots 지시 없음·canonical `https://salimlab.kr/blog/robot-vacuum-auto-water-install`. 사이트맵 96→97(새 URL만 추가, lastmod 2026-10-16), 기존 lastmod 변화 0건.
- `scripts/changed-pages.mjs`: 본문 변경 5개(`/`, `/blog`, `/about`, `/products/roborock-s8-proultra`, `/products/roborock-qrevo-curv`), 새 페이지 1개.
- 새 글 정적 HTML: 본문 11,710자(공백 제외), 내부 링크 8개 대상 파일 존재, 출처 링크 14개(새 창·noopener), Article(인용 14)·FAQPage(4문항)·BreadcrumbList 생성. 출처 14개 모두 HTTP 200(curl, 브라우저 UA).
- 기존 미커밋 편집 diff의 SHA-256이 작업 전과 같고(15211504…) 13개 파일 해시가 모두 일치한다.
- 실제 브라우저 시각 검수(모바일 폭)는 수행하지 않았다.

## 배포 준비 (2026-10-17)

- 범위: 이 글만 배포한다. 문장 편집 작업(`docs/copy-editing-review-2026-10-14.md`)은 커밋하지 않고 작업 트리에 그대로 둔다. 배포는 `main` 푸시 시 GitHub Actions가 커밋된 트리로 빌드하므로 미커밋 편집은 섞이지 않는다.
- 재대조: 출처 14개 HTTP 200, PDF 6개 SHA-256 동일, 웹 탐침 72개(실패 2건은 대조군에서도 실패한 탐침 오류), 삼성 사양 탭 값 동일. 그래서 `publishedAt`·`updatedAt`·`priceCheckedAt`을 2026-10-17로 두었다(새 글 추가 선례 71fda46도 게재일을 썼다).
- 배포된 빌드(2a32377)와 이 커밋만 적용한 빌드를 깨끗한 worktree 둘에서 대조: 본문 변경 5개(`/`, `/blog`, `/about`, `/products/roborock-s8-proultra`, `/products/roborock-qrevo-curv`), 새 페이지 1개. 이 5개를 `SITE_REVISIONS` 2026-10-17 항목으로 적었고 `LATEST_EXPECTED_LASTMOD`를 2026-10-17로 맞췄다. 목록: `research/evidence/2026-10-16/changed-sitemap-vs-deployed.txt`.
- AdSense 재심사·색인 요청은 하지 않는다. 내부 게이트 통과는 Google 색인이나 AdSense 승인을 뜻하지 않는다.

## 배포와 운영 확인 (2026-10-17)

- 커밋 `58e0f6d`(18개 파일)를 `main`에 푸시했다. 스테이징 트리 해시가 미리 빌드·테스트한 release worktree와 같았다(`c590794a…`).
- GitHub Actions `Deploy to Cloudflare` run 39003192743 성공(1분 15초): npm ci → lint → test → build → wrangler deploy. Node 20 지원 종료와 ubuntu-latest 이전 안내 경고 2건은 이번 변경과 무관하다.
- 운영 확인(curl, 캐시 우회 쿼리): 새 글과 본문이 바뀐 5개 경로가 HTTP 200이고 `<main>` 본문이 release 빌드와 같다. 새 글은 robots 지시 없음, canonical `https://salimlab.kr/blog/robot-vacuum-auto-water-install`, 검수일 표기 2026-10-17. 운영 사이트맵은 97개이고 새 글·홈·Qrevo Curv의 lastmod가 2026-10-17이다.
- 미커밋 문장 편집이 운영에 섞이지 않았다: `/blog/sony-xm5-vs-qcy-melobuds`, `/category/washer`의 운영 본문은 편집 전 빌드와 같고 편집본과 다르다.
- 대조군: 바뀌지 않은 `/blog/robot-vacuum-suction-numbers`도 운영 본문이 release 빌드와 같다.
- 하지 않은 것: AdSense 재심사, 색인 요청, 브라우저 시각 검수. 문장 편집 작업은 여전히 미커밋이다.
