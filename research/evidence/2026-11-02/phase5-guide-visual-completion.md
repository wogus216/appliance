# 가이드 사진·요약표·판단 도식 개선 완료

## 결과
- 가이드4편: 세탁표시·기저귀 포장·로봇청소기 급배수 설치·삼성 세탁기 점검 코드.
- 행동 요약표4개, 세 갈래 판단 도식4개. 제품 비교표 타입과 별도인 선택적 visualSummary 필드를 사용해 일반 가이드도 표를 쓸 수 있다.
- 긴 본문 앞에 한 문장 핵심→요약표→설명 사진(있는 글)→판단 도식, 이후 근거 설명. 기존 긴 답변 제목은 해당4편에서 ‘설명과 적용 범위’로 바꾸고 바로가기 제공.
- 최근2편에 내장 image_gen.imagegen으로 만든 설명용 사진2장. 가상 라벨/무지 포장, 브랜드·공식 기호·시험 결과 없음. 캡션이 AI임을 명시하며 실제 의류·시판품 증빙으로 쓰지 않는다.
- 파일: `public/images/guides/laundry-sorting.webp`(1536×1024, 약158KiB), `diaper-package-reading.webp`(1536×1024, 약53KiB). cwebp q82로 형식 변환, 자르기/주석/내용 수정 없음. 원본 PNG는 생성 폴더에 보존. 전체 최종 프롬프트와 모드는 phase5-image-prompts.json.
- 공유 블로그 제목은 한글 단어 단위로 줄바꿈하고, 기존 긴 답변 상자의 두꺼운 옆줄은 제거했다. 다른 글의 사실·제품/비교 데이터·색인/광고 게이트는 재작성하지 않았다.

## 사실/생성 경계
- 새 사실을 조사·발명하지 않고 기존4개 원고의 근거를 요약했다. 세탁의 코스 적합성과 기저귀 시험 대상은 phase3/4 근거, 설치/코드는 각 원고의 기존 공식 자료 범위를 따른다.
- 세탁: 라벨 허용만으로 코스 사용 확정 안 됨. 금지/불명확은 별도 경로. 기저귀: 무첨가/ND/적합 구별, 안감 시험 범위 유지. 설치: 치수/배관/원문 충돌을 확인하며 설치 가능 판정 안 함. 코드: 공통 문서와 모델별 LCD 안내 구별, 침수/누수감지 우선 중단.
- 독립 리뷰에서 dC·dE를 ‘문 잠김’으로 적은 잘못된 요약1건 발견. ‘문열림 감지’로 바로잡고 회귀 검사 및 최종 화면으로 확인했다.

## 검증 증거
- visual test 최초6개 실패→표/도식/사진/캡션/파일 연결 통과. 사진 파일 검사는 테스트 환경의 Next Image 최적화 URL에서 실제 asset URL을 추출한다(운영 정적 빌드는 unoptimized).
- door test RED1실패/6통과→수정→전체 **73파일/2806검사 통과** (`phase5-final-tests.txt`).
- 변경 파일 lint, 최종 정적 빌드, git diff --check 성공. build/lint 로그 보관.
- `phase5-static-verification.json`: HTML168, sitemap110, 내부 링크12210, 끊어진 페이지/앵커0, sitemap/noindex 충돌0, noindex/광고 겹침0. noindex57, 광고88.
- 본문 텍스트 변경4경로는 phase5-changed-pages.txt, SITE_REVISIONS와 일치. 공유 h1/상자 스타일과 guide-detail 앵커는 텍스트 비교 수에 포함하지 않는다.
- 독립 리뷰 phase5_guide_visual_review(fresh context gpt-6-astra high): Important1 수정 완료, Critical/Minor/판단 유보 없음. 재리뷰 반복 없이 실패 증명→코드 수정→전체 검사→화면 확인.
- Impeccable detector1회: 기존 border-l-4 지적을 제거했다. 무시 설정 없음.

## Aside 화면
- 390/1440px에서4개 표와 분기 확인. 표폭358/736px, body scrollWidth=viewport width. 요약표에 가로 스크롤 없음.
- 최근2개 사진 complete=true/naturalWidth1536. 2개 가이드×2기기폭의 표/사진/도식8장 캡처, 주요 모바일/데스크톱 시각 열람. 기존2개 표는 스냅샷/폭 확인.
- 긴 본문 바로가기 키보드 Enter→#guide-detail 확인. 도어 표현 수정 뒤390px 재확인.
- 첫 화면 세션: `~/.aside/u/0/sessions/2026-11-02_b25IW5i8t2o2sVRk/tmp/salimlab-phase5-*.png`.
- 최종 도어 화면: `~/.aside/u/0/sessions/2026-11-02_kyurMSvXEknZqNYm/tmp/salimlab-phase5-door-final-390.png`.

## 범위
사진은 직접 촬영 증빙 대신 설명용 생성 장면으로 정했다. 따라서 실제 포장/의류/설치 상태의 확인 자료로 사용할 수 없다. 기존12개 카테고리 가이드 전체에 새 사진을 자동 삽입하지 않았으며 이번 변경은 블로그의 가이드4편이다. 커밋·푸시·운영 배포·외부 문의 없음, 로컬3012에서 확인 가능.
