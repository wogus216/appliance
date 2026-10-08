# Claude Code 작업 지시서 — 살림랩 전체 콘텐츠 가치 보강

작성일: 2026-10-07. 이 문서 전체를 작업 요청으로 읽고 실행하라.

## 1. 역할과 최종 목표

너는 살림랩(salimlab.kr)의 콘텐츠 편집자·근거 검수자·구현 담당자다. 저장소는 `/Users/kwonjaehyeon/Programming/sancho/appliance`다.

목표는 확보된 제조사 문서·공단 신고·인증 목록·공개 시험·부품 및 유지비 자료를 활용하여, 독자가 자신의 조건에서 제품을 선택하고 관리하도록 돕는 콘텐츠를 사이트 전체에 구현하는 것이다. 계획서만 작성하고 끝내지 말고 근거 정리, 기존 콘텐츠 수정, 필요한 최소 구현, 테스트, 최종 검수 보고서까지 수행하라.

핵심 질문은 다음이다.

> 이 페이지에서 독자가 알게 되는 판단 중, 제조사 사양표나 쇼핑몰 상세페이지를 읽는 것만으로는 쉽게 얻기 어려운 것이 무엇인가?

우리 사이트는 직접 구매·실측한 리뷰 매체가 아니다. 공개 원문을 대조하고, 가능한 계산을 공개하고, 조건에 따라 달라지는 선택을 설명하는 편집 매체다. 독창성은 허구의 사용기나 실험 결과가 아니라 검증 가능한 자료 연결·계산·해석에서 만들어라. 애드센스 승인 확률이나 승인을 보장하는 문구는 작성하지 마라.

## 2. 작업 시작 시 확인할 현재 상태

- `AGENTS.md`, `CLAUDE.md`를 먼저 읽어라. Next.js 코드를 작성하기 전 `node_modules/next/dist/docs/`의 관련 가이드를 읽어라. 기존 경험으로 API를 추측하지 마라.
- `git status`, 현재 브랜치·커밋을 확인하고 사용자의 미커밋 변경을 보존하라. 이 문서의 날짜·개수보다 실행 시 실제 카탈로그와 페이지 목록을 우선하라.
- 아래 개수는 2026-10-07 완료 스냅샷이다: 공개 제품 34개, 기존 블로그 글 18개, 공개 제품 중 내부 색인 기준 통과 31개, 출처 수 부족으로 noindex인 제품 3개. 사이트맵 103개 URL. 테스트 23개 파일/1,909개.
- 최근 구현 기준 커밋은 `1d78f21`이고 배포·검증 문서 갱신 커밋은 `4080d26`이다. 이후 변경이 있으면 최신 작업을 보존하라.
- 34개 중 10개 상세 본문 재작성·24개 모델별 문단 추가를 이미 완료했다. 그러나 이 사실이 모든 페이지의 분석 깊이가 충분하다는 뜻은 아니다. 좋은 기존 분석을 유지하고 약한 부분을 더 깊게 고쳐라.
- `docs/adsense-all-products-review-2026-10-07.md`, `docs/adsense-release-readiness-2026-10-07.md`를 읽어 이미 교정한 잘못된 주장과 남은 한계를 파악하라.
- 지시서 작성 당시 AdSense 재심사는 미제출이다. 이 작업의 완료 기준은 검증된 사이트 수정과 검수 보고서다. 재심사 제출·운영 배포는 사용자가 별도로 지정한 실행 범위를 따른다. 이 문서만으로 Google 계정 조작이나 외부 메시지 발송을 시작하지 마라.

## 3. 반드시 활용할 자료와 읽는 순서

### 3.1 먼저 읽을 프로젝트 맥락

- `docs/adsense-foreign-benchmark-2026-09-29.md`
- `docs/adsense-two-site-deep-audit-2026-09-29.md`
- `docs/adsense-low-value-recovery-2026-10-02.md`
- `docs/adsense-all-products-review-2026-10-07.md`
- `docs/editorial-sources-todo.md`, `docs/spec-audit.md`, `docs/model-number-audit.md`
- `docs/superpowers/specs/2026-09-27-troubleshooting-identity-design.md`

벤치마킹 기록은 편집 구조와 독자 경험의 참고자료다. 다른 사이트의 실제 승인 상태가 독립적으로 확인됐다고 가정하거나 그 글·이미지를 복제하지 마라. 기존 기획의 수치·가설도 현재 사실과 구분하라.

### 3.2 2026-09-29 기본 근거 자료집

먼저 `research/evidence/2026-09-29/README.md`를 읽고, 같은 디렉터리의 아래 자료를 모델별로 연결하라.

| 파일/폴더 | 활용 목적 |
|---|---|
| `models.json`, `model-coverage.json`, `measurement-gaps.jsonl` | 공개 모델·자료 확보 상태·부족한 측정 항목 |
| `sources.jsonl`, `curated-sources.json`, `verified-facts.jsonl` | 출처 목록·검토 상태·확인한 사실 |
| `exact-model-measurements.jsonl`, `additional-registry-exact.jsonl` | 정확한 모델번호에 연결된 공단 신고값 |
| `registry/kea-*.jsonl`, `additional-registry-search.json` | 신고 후보군·검색 범위, 필요한 모델 행 필터링 |
| `independent-tests.jsonl` | 시험 대상 모델·코스·부하·품질·회당 전력량 |
| `energy-research.jsonl`, `energy-and-components.md` | 기술 원리와 시험 조건의 해석 |
| `model-component-evidence.json`, `component-map.jsonl`, `component-coverage.json` | 실제 모델 기술 구성과 일반 구조의 구분 |
| `part-level-evidence.jsonl`, `certification-identity-bridges.jsonl` | 부품 호환·실장·기준/파생모델 관계의 한계 |
| `component-evidence-audit.md`, `samsung-laundry-part-analysis.md`, `remaining-component-analysis.md` | 기존 자료를 대조한 분석과 금지할 해석 |
| `raw-manifest.json`, `raw/` | PDF 원본 위치·출처·해시·페이지 대조 |
| `foreign/` | ENERGY STAR·EPREL의 해외 시험/표시 사례 |
| `next-evidence-plan.md` | 필요한 후속 자료와 측정 설계 참고 |

자료집의 180개 출처, 수만 행 신고 후보군, 해외 인증 1,842행 등은 당시 수집 규모다. 모두 검증된 국내 제품 실측 자료라는 뜻이 아니다. 역사적 집계를 새로운 검증 건수로 홍보하지 마라. 대용량 원자료는 정확한 모델·관련 필드로 필터링하고 검색·매칭 결과를 남겨라.

`sources.jsonl`의 `catalog_reference_unchecked`는 미검증 후보 링크다. `reviewed_2026-09-29`도 독립 실측이나 모든 주장 검증의 뜻은 아니다. 링크 존재·모델 적용·구체적 주장 검증을 각각 확인하라.

### 3.3 2026-09-30 후속 조사

`research/evidence/2026-09-30/README.md`와 해당 폴더의 모든 감사 노트·JSONL을 목록화하고 읽어라. 특히 다음을 활용하라.

- `haier-exact-model-manuals.jsonl`: 하이얼 06·10 정확한 모델 설명서 연결.
- `maintenance-cost-evidence.jsonl`, `maintenance-reliability-audit.md`: 필터·배터리·선택 부품 가격과 교체 조건, 비용·고장률의 한계.
- `power-state-measurements.jsonl`, `power-trace-circuit-audit.md`: S8 Pro Ultra의 운전 상태별 공개 계측. 집계 기간과 지역형을 구분.
- `installed-parts-source-audit.md`: 실제 탑재 부품번호를 확정하지 못한 범위.
- `wash-dry-outcome-energy-audit.md`: 삼성 정확한 BZ와 파생 BB의 시험 차이.
- `error-code-source-audit.jsonl`, `error-code-diagnostic-audit.md`: 정확한 모델 오류와 같은 이름의 다른 코드 구분.
- `catalog-claim-conflict-audit.md`: 이미 교정한 기술 주장 충돌.
- `primary-source-requests.md`: 과거 조사 초안. 외부 문의 발송 지시로 해석하지 마라.

### 3.4 2026-10-01 인증·유지비 검수

`research/evidence/2026-10-01/`의 모든 문서를 읽어라. 정수기 필터 가격·교체 주기, LG 판매 부품과 QF 필터 코드의 연결, 완제품/필터 시스템 인증, 코웨이 WQA 목록, 한국물기술인증원 유효 제품 목록, SK매직 과거 검사 기록, 식기세척기 비교 가능성 및 공개 주장 검수가 들어 있다.

핵심 파일: `water-purifier-filter-cost-audit.md`, `water-purifier-comparable-cost-check.md`, `lg-filter-code-crosswalk.md`, `lg-sk-certification-scope-audit.md`, `coway-wqa-independent-performance.md`, `kwtc-exact-water-purifier-register.md`, `coway-sk-filter-price-followup.md`, `dishwasher-pair-publication-audit.md`, `public-catalog-claims-closeout.md`, `publication-maintenance-audit.md`.

### 3.5 2026-10-02·2026-10-07 모델별 교정

- `research/evidence/2026-10-02/`의 모든 모델별 감사: 냉장고, 로봇청소기, 정수기, 식기세척기, 다이슨, 위닉스, TCL, 하이얼의 코드·기능·설치·필터 근거와 게시 제한.
- `research/evidence/2026-10-07/samsung-lg-exact-model-code-scope-audit.md`
- `research/evidence/2026-10-07/boiler-code-scope-audit.md`
- `research/evidence/2026-10-07/cuckoo-e4-pilot-source-check.md`
- `src/lib/data/editorial/product-editorial.ts`, `error-code-editorial.ts`, `corrections.ts`: 현재 게시 출처·검수 날짜·교정 이력. 10월 7일에 추가된 이어폰·TV 공식 자료도 여기에 연결돼 있다.

최근 감사가 오래된 조사 후보의 잘못된 해석을 교정했다면 그 교정을 유지하라. 단순히 날짜가 최신이라는 이유만으로 다른 SKU나 시험 조건의 수치를 우선하지는 마라.

### 3.6 로컬 보관 자료와 이식성

같은 작업 공간에 있을 때 다음도 확인하라.

- `.audit/adsense-2026-10-07/`: 삼성·LG·쿠쿠 설명서 PDF, 추출 TXT, 일부 페이지 이미지·HTML.
- `.audit/all-products-2026-10-07/before.json`, `after.json`, `decisions.json`: 직전 34개 개선 전후 데이터.
- 같은 폴더의 `live-verification.json`, `live-before/`, `live-after/`: 공개 HTML과 배포 검증 스냅샷.
- `.audit/official-specs.md`, `.audit/spec-compare.md`, `.audit/model-verify.json`, `.audit/danawa-pages.json`: 초기 사양·모델 확인 자료. 오래된 후보 자료이므로 최근 교정과 대조.

`.audit/`와 일부 `raw/`는 Git에 포함되지 않을 수 있다. 새로운 clone/worktree에서 없으면 기록된 원문 주소·manifest로 필요한 자료만 복구하고, 재확인하지 못한 항목은 미확인으로 남겨라. 사용자에게 같은 조사를 전부 다시 요구하지 마라. `.audit/`의 임시 수정 스크립트는 당시 작업 흔적이며 재실행하지 마라. 광범위한 정규식 치환으로 제품 경계를 넘어간 오류가 있었으므로 모델별 범위를 한정해 수정하라.

API 키·서비스 계정·쿠키·로그인 정보는 콘텐츠 근거가 아니다. 지시서·사이트·보고서·공개 저장소에 포함하지 마라. 로컬 PDF 전문과 출처의 긴 본문·이미지를 무단 재배포하지 마라.

## 4. 전체 사이트 작업 범위와 실제 수정 지점

| 영역 | 확인·수정 지점 | 요구 결과 |
|---|---|---|
| 제품 상세 34개 | `src/lib/data/appliances/*.ts`, `src/lib/data/detailed-reviews/group*.ts` | 모델별 상황·비교·관리 판단. 요약과 상세의 일관성 |
| 기존 글 18개 | `src/lib/data/blog/posts/*.ts`, `src/lib/data/blog/index.ts`, `src/lib/blog.ts` | 표·계산·본문·결론·FAQ의 근거와 조건 일치 |
| 자동 비교 페이지 | `src/app/compare/[pair]/page.tsx`, 관련 비교 컴포넌트 | 숫자의 높고 낮음보다 선택 조건과 비교 가능성 설명 |
| 카테고리 안내 | `src/lib/data/category-guides/*.ts`, `src/app/category/[slug]/page.tsx` | 구매 전에 정할 조건, 관련 제품·글로 이어지는 판단 경로 |
| 브랜드 안내 | `src/lib/data/brands/profiles.ts`, `src/app/brand/[brand]/page.tsx` | 근거 있는 브랜드 정보와 모델별 차이. 포괄적 브랜드 성능 우열 금지 |
| 오류·증상 안내 | `src/lib/data/error-codes/`, 관련 제품 데이터, `src/app/error-codes/` | 정확한 모델 적용, 안전한 조치, 서비스 문의 준비 |
| 홈·목록 | `src/app/page.tsx`, `/blog`, `/compare`, 공용 카드 | 사이트가 주는 가치를 구체적 질문·콘텐츠로 안내. 카드와 본문 일치 |
| 편집 원칙 | `/about`, `/methodology`, `/editorial-policy` | 실제 자료 조사·계산·편집 방식과 일치하는 설명 |
| 근거·품질 정책 | `src/lib/data/editorial/`, `src/lib/content-quality.ts`, `src/lib/source-trust.ts`, `src/lib/reviews.ts` | 주장별 출처와 적용 범위. 품질 게이트·출처 없는 후기 비노출 유지 |
| 표시 컴포넌트 | `src/components/detail/`, 비교·블로그 표시 컴포넌트 | 필요한 근거 표·계산·조건을 읽기 쉽게 표시 |
| 변경 날짜·색인 | `src/lib/data/site-revisions.ts`, `src/app/sitemap.ts`, 메타데이터 | 실제 바뀐 본문만 날짜 갱신, noindex와 sitemap 일치 |

사이트맵·정적 생성 경로를 기준으로 실제 공개 페이지 목록을 만들고 모든 영역을 검토하라. 모든 영역의 검토가 모든 파일의 수정이라는 뜻은 아니다. 이미 충분한 페이지는 유지 이유를 기록하고, 얕은 페이지에는 실질적인 개선을 수행하라. 공개된 소재 사전 등 다른 영역이 발견되면 정확성·맥락을 검토하되 새로운 주제로 확장하지 마라.

사양 데이터 전체에는 비공개 모델도 있다. 공개 34개 수정 때문에 비공개 제품의 설명·요약을 덮어쓰지 마라.

## 5. 사실·계산·해석을 분리하는 규칙

모든 핵심 판단을 다음 세 단계로 작성하라.

1. **확인한 사실:** 정확한 모델·지역·문서·페이지·시험 조건이 있는 값 또는 기능.
2. **계산 또는 해석:** 식·단위·입력·가정, 또는 사실에서 선택 기준으로 이어지는 논리.
3. **독자의 결론:** 어떤 상황에 맞고, 어떤 상황에서는 다른 제품/사용 방식이 맞는지. 결론을 바꾸는 조건까지 설명.

각 핵심 주장에 내부 claim ID를 부여하고 근거표에 연결하라. 내부 ID·개발 정보를 독자 화면에 노출할 필요는 없다. 공개 본문에서는 문장 가까이 짧은 출처나 관련 근거 설명을 제공하고, 기존 하단 출처 블록도 유지하라. 하단 URL 수만 늘리는 것은 완료가 아니다.

근거 분류:

- 정확한 모델의 공식 사실.
- 계열/해외형/파생형의 제한된 참고 사실.
- 정확한 모델의 공개 실측 — 시험 주체와 조건 명시.
- 명시된 입력으로 재현 가능한 편집 계산.
- 근거를 연결한 조건부 편집 판단.
- 미확인 또는 비교 불가 — 이유와 필요한 근거 기록.

문서가 주장과 충돌하면 원문의 모델 범위·개정·시험 조건·단위부터 확인하라. 반증이 있으면 결론을 수정하라. 상충하는 값을 평균내거나 임의로 유리한 값을 선택하지 마라.

## 6. 계산·성능·안전에 관한 엄격한 기준

- W(순간/정격 전력), Wh/회, Wh/kg, kWh/월, kWh/년을 혼합하지 마라.
- DV17의 `154.7Wh/kg × 17kg`를 실제 1회 건조 사용량이라고 확정하지 마라.
- WD25DB8995BB의 소비자원 시험 결과를 WD25DB8995BZ의 실측값으로 옮기지 마라. 인증상 기준/파생모델 관계는 성능 동일성의 증거가 아니다.
- 공단 신고값은 지정 시험 조건의 표시값이다. 집의 실제 청구액·체감 성능을 보장하지 않는다.
- 정격 W × 임의 사용시간으로 실제 월 요금을 확정하지 마라. 열원·가변 출력·대기·가동 주기·과금 조건을 구분하라.
- 전기요금 시나리오가 필요하면 검증한 사용량과 명시적 단가를 사용하고, 실제 가정 청구액이 아닌 부분 추정임을 표시하라. 최신 요율을 주장한다면 공식 자료로 새로 확인하라.
- 필터 연간 자재비는 검증한 단가 × 명시한 교체 횟수로 계산한다. 공임·배송·전기요금·계약 포함 항목을 분리하고, 미확인 비용을 0원으로 처리하지 마라.
- 교체 권장 주기가 없는 배터리·선택 부품을 매년 교체한다고 계산하지 마라. 호환 부품번호를 출고 실장 부품이나 내구성의 증거로 쓰지 마라.
- 서로 다른 시험 기준·부하·코스·급수 온도·품질 종료 조건의 수치로 성능 우열을 정하지 마라.
- H13·여재 제거율·CADR·권장 면적은 서로 다른 지표다. 냄새·가스·방 전체 정화 결과까지 확대하지 마라.
- 최대 dB ANC, Pa 흡입력, 가상 음향 채널, 드라이버 크기를 서로 다른 모델의 실제 성능 순위로 바꾸지 마라.
- 후기를 통계적 고장률로 쓰지 마라. 분모·기간·표본·고장 정의 없는 모델별 고장률은 만들지 마라.
- 누수·가스·전기·고온의 조치와 오류 코드의 뜻은 정확한 설명서 범위만 사용하라. 센서 단락·기판 분해·강제 운전·임의 초기화·근거 없는 수리 견적을 제안하지 마라.
- 제조사 주장, 독립기관 시험, 편집 계산, 편집 추론을 구분하라. 시험을 우리가 수행한 것처럼 쓰지 마라.
- 조사일 가격을 현재 최저가로 표현하지 마라. 오래된 가격으로 할인 폭·시장 순위를 단정하지 마라.

현재 `tco-calculator.tsx`에는 연 소모품 3만원 등의 일반 가정, 등급 영향 컴포넌트에는 효율 차이 추정이 존재한다. `ValueSection`에서 월 전기요금 자료 존재 여부에 따라 조건부로 렌더한다. 코드가 존재한다는 이유로 현재 모든 제품에 노출된다고 단정하지 말고 실제 렌더 경로를 확인하라. 새 데이터를 넣어 계산기를 다시 켜는 경우 이 일반 가정이 정확한 제품 비용처럼 표시되지 않도록 먼저 고쳐라. 알 수 없는 비용을 0원으로 채워 계산기를 활성화하지 마라.

## 7. 제품군별 분석 과제

아래는 분석 질문이며 새 숫자를 만들어 채우라는 요구가 아니다. 근거가 부족한 항목은 밝혀 두고 확보된 사실로 가능한 판단을 완성하라.

| 제품군 | 독자가 얻어야 할 판단 | 가능한 자료 활용 | 금지할 단정 |
|---|---|---|---|
| 세탁기·건조기·콤보 | 빨래 횟수·코스 적재량·직렬 설치·물통/직배수·병렬 작업 중 무엇이 선택을 바꾸는가 | 정확한 설명서의 적재량·설치/관리, 신고값, 시험 범위 대조 | 정격 W로 회당 요금 순위, 용량만으로 이불 적합성 보장 |
| 냉장고 | 합계 용량보다 도어·냉동실 형태·반입·문 개방·지원하지 않는 기능이 중요한 경우 | RF85/RS84/T873/S834 정확한 치수·기능·공단 신고 | 월 표시값을 실청구액으로, 부피만으로 식품 수납 보장 |
| 식기세척기 | 사람 수 대신 실제 식기·설치·급배수·코스 시간·건조 방식·관리로 선택 | 쿠쿠/SK매직 설명서, 물 사용량·설치 깊이·옵션 건조 시간 | 물 사용량/인용 인원으로 실제 1인분 설거지 비용 확정 |
| 정수기 | 얼음 필요·설치 여유·정품 필터 교체·방문 관리·구독 포함 비용 | 필터 코드 연결, 교체 주기·단가, 인증 대상·유효 목록 | 필터 인증을 완제품 실측으로, 미확인 타사 비용으로 유지비 순위 |
| 에어컨 | 닫힌 냉방 구역·일사·단열·기본/추가 설치 범위와 정확한 모델 기능 | 설명서·공단 신고·하이얼 냉매 차이·정확한 표시 조건 | 표시 면적의 모든 공간 냉방 보장, 같은 등급=같은 실제 요금 |
| 공기청정·청정 타워팬 | 냉방/송풍/온풍/청정 요구, 관리 대상 필터와 비교 가능한 지표 | TP07/HP09/Xiaomi 공식 필터·교체 조건·CADR·신고 범위 | 숨겨진 날개/열선=안전 보장, 촉매 영구=모든 필터 영구 |
| 제습기 | 제습 시험값·물통 용량·비움 횟수·배수 동선·저온 제상 | 위닉스 정확한 사양과 DN2 계열 적용 범위 | 16L/일이 모든 집의 실수거량, 4.5L 물통만으로 비움 횟수 확정 |
| 로봇청소기 | 자동화 후 남는 관리, 물걸레 방식·도크·문턱 시험·관리 동선 | 정확한 기능, 봉투/필터·공개 운전별 계측의 한계 | Pa=실제 털 제거율, 시험 문턱 높이=모든 집 통과 |
| 이동식 TV | 화면/스탠드 운반·분리 사용·시청 거리·네트워크·전원 계획 | 정확한 무게·분리/별매·해상도·가상 채널·최대 배터리 조건 | 120Hz=실측 게임 성능, 버추얼 채널=실제 스피커 수 |
| 이어폰 | 지원 기기·코덱·두 기기 전환·ANC/동시 기능 조건·재생/통화·팁 관리 | Anker 동시 기능 4시간, Sony 공식 연결 안내, Apple/Samsung 조건 | 최대 수치=항상 재생 시간, SSC=무손실, ANC 숫자=실차음 순위 |

예를 들어 Anker의 4시간은 먼저 공식 조건을 정확히 밝힌 뒤, 해당 기능 조합을 계속 쓰는 장시간 사용자가 중간 충전을 고려해야 하는 이유로 해석하라. 모든 사용자가 4시간만 쓸 수 있다고 일반화하지 마라. LG 필터 비용은 2026-10-01 정상가·교체 주기의 계산 사례이며 최신 가격을 주장하려면 다시 확인하라.

## 8. 문장과 결론의 작성 기준

기존 문장: “설치 조건을 확인하고 견적을 비교하세요.”

개선 방식: 이 모델의 어떤 치수/도어/급배수/키트가 설치를 좌우하는지, 구매자가 어디를 재거나 어떤 견적 항목을 맞춰야 하는지, 그 결과 어떤 선택이 바뀌는지를 설명한다. 여유 치수가 미확인이면 숫자를 만들어 넣지 말고 제조사 설치 조건을 연결한다.

기존 문장: “실제 성능은 환경에 따라 달라집니다.”

개선 방식: 실제로 영향을 주는 확인된 조건을 명시하고, 그 조건이 독자의 계획과 어떤 관계인지 설명한다. 모든 문단을 면책 문장으로 끝내지 마라.

제품마다 필요한 핵심 질문을 골라 자연스러운 구조로 작성하라. 동일한 5개 제목·동일한 경고를 모든 제품에 강제하지 마라. 독자는 ‘추천 상황 → 판단 근거 → 비교 갈림길 → 비용/관리 → 확인해야 할 한계’를 찾을 수 있어야 한다. 특정 문단 수·글자 수를 채우는 것은 성공 기준이 아니다.

각 페이지의 중요한 분석에는 다음 질문에 답할 수 있어야 한다.

- 어떤 구체적인 사실을 연결했는가?
- 사양표를 그대로 옮기는 것과 무엇이 다른가?
- 누가 이 결론으로 실제 선택을 바꿀 수 있는가?
- 결론을 바꾸는 조건이나 반대 상황은 무엇인가?
- 출처를 따라가면 같은 사실과 계산을 재현할 수 있는가?

모델명만 다른 것으로 바꿔도 그대로 성립하는 핵심 문단은 다시 작성하라. 다만 공통 안전 안내는 필요한 위치에서 일관되게 유지하라. 검수 과정의 “기존 주장을 제거했다”, “코드에서 제외했다” 등의 작업 이력은 보고서에 쓰고 제품 구매 흐름에는 결과만 설명하라.

## 9. 실행 단계와 요구 산출물

### 단계 A — 현황과 근거 전수 연결

1. 현재 공개 모델·블로그·가이드·비교·브랜드·오류 안내·정책 페이지 목록을 생성하라.
2. 현재 렌더되는 본문을 기준으로 얕은 부분을 찾아라. 비노출 후기 데이터나 비공개 모델을 공개 콘텐츠로 오인하지 마라.
3. 근거 자료 폴더 전체의 파일 목록을 만들고 ‘검토/모델 연결/게시 활용/보류’ 상태를 기록하라. 모든 숫자를 게시할 필요는 없다.
4. 모델/주장별 근거표를 `research/evidence/content-value-<실제작업일>/claims.jsonl` 등으로 작성하라. 스키마에는 `claimId`, `productSlug/pagePath`, `claimType`, `sourceUrl`, `localEvidencePath`, `sourceLocation`, `modelScope`, `testConditions`, `observedAt`, `calculationInputs/formula`, `readerDecision`, `limitations`, `verificationStatus`를 필요한 만큼 포함하라.
5. 34개 모델 각각에 가장 중요한 독자 질문, 사용할 근거, 현재 부족한 분석, 구체적 개선을 기록하라. 계획 단계에서 멈추지 마라.

### 단계 B — 원문 확인과 주장 교정

필요한 핵심 주장부터 보관 원본·원문 주소를 확인하라. 최신 가격·기능·보증·공식 요금처럼 변할 수 있는 사실은 새로 확인하고 조사일을 기록하라. 대용량 수집기를 무작정 재실행해 과거 스냅샷을 덮어쓰지 마라. 새 조사는 새 날짜 폴더에 저장하라. 원문이 사라졌다면 실제 확보 상태를 기록하고 게시 강도를 낮춰라.

### 단계 C — 제품 34개 실질 개선

공개된 모든 제품을 검토하고 핵심 판단을 완성하라. 직전 작업에서 새로 쓴 10개도 예외가 아니다. 데이터·한 줄 소개·설명·에디터 코멘트·대상 사용자·기능 목록·상세 분석·연결 글의 결론을 함께 확인하라. 단순히 문단 한 개씩 덧붙이는 자동 처리는 피하라. 이미 충분한 분석은 유지하고, 반복 안내는 정리하며, 필요한 비교·계산·구체적 결론으로 보강하라.

### 단계 D — 기존 글과 사이트 전체 연결

기존 글 18개를 모두 읽고 표·본문·FAQ·결론의 불일치를 해결하라. 같은 제품에 대한 결론이 서로 다르면 수정하라. 기존 글과 목적이 겹치는 새 글을 대량 생성하지 마라. 새 글은 기존 글로 해결하지 못하는 독자 질문과 충분한 근거가 있을 때만 추가하라.

가이드·브랜드·자동 비교·홈에서 깊은 분석으로 이어지는 내부 링크와 짧은 선택 안내를 보강하라. 내부 링크 수만 늘리지 마라. 비교 페이지에 근거 없는 점수 순위가 있다면 표시 기준·한계와 실제 선택 근거를 함께 검토하라. 점수가 독립 실측 결과처럼 읽히지 않아야 한다.

근거 비교표·간단한 계산표·결정 흐름이 설명을 줄이는 경우 기존 UI를 재사용해 구현하라. 계산기는 입력과 근거가 확보된 경우에만 만들고, 데이터베이스·분석 시스템·페이지 디자인 전면 개편으로 범위를 확장하지 마라. 독자가 읽을 수 있는 정적 HTML을 기본으로 하라.

### 단계 E — 검증과 검수 보고서

아래 검증을 통과시키고 최종 결과를 작성하라. 자료가 부족한 부분은 정확한 이유와 다음에 필요한 최소 근거를 기록하되, 가능한 나머지 작업은 끝까지 완료하라. 최종 결과를 “진행할까요?”로 끝내지 마라.

## 10. 검증 요구

- 기본 검사: `npm run lint`, `npm test`, `npm run build`. 독립 TypeScript 검사나 브라우저 검수는 변경에 맞게 추가하라.
- 1,909개는 이전 테스트 수다. 신규 검사 또는 공개 범위 변경에 따라 달라질 수 있다. 숫자를 맞추려고 테스트를 삭제·약화하지 마라.
- 핵심 계산은 입력·단위·산식·반올림을 다시 계산하고, 의미 있는 계산/모델 연결 회귀 검사를 추가하라. 문장 존재 여부만 반복 검사하는 테스트는 늘리지 마라.
- 전체 34개 모델의 상세·요약 대응을 검증하라. 광범위 치환으로 다음 모델이나 비공개 모델을 바꾸지 않았는지 확인하라.
- 제품·비교·블로그·가이드의 같은 수치와 결론을 대조하라. 가격 조사일, ANC 조건, 실제/가상 채널, 적재량, 필터 주기 등이 특히 중요하다.
- `src/lib/content-quality.ts`의 출처 수·분석 분량 등 게이트를 완화하거나 같은 회사의 출처 표기를 쪼개어 통과시키지 마라. 관련 없는 출처를 추가하는 방식도 금지한다.
- 기존 noindex 제품을 삭제하거나 대량 noindex 처리해 작업 범위를 줄이지 마라. 출처가 실제로 보강되면 원래 기준으로 다시 평가하라. 내부 게이트 통과는 Google 승인·색인을 뜻하지 않는다.
- `src/lib/reviews.ts`의 출처 없는 후기 비노출 정책과 `ProductJsonLd`의 근거 없는 리뷰/평점 비노출을 유지하라.
- 사이트맵·robots·canonical·실제 공개 경로가 일치해야 한다. 기존 URL을 불필요하게 바꾸지 마라.
- 변경 전후 정적 HTML의 `<main>`을 비교하라. `scripts/changed-pages.mjs`를 활용하고 마지막 수정 후 다시 확인하라. 최종 본문이 바뀌지 않은 페이지를 변경 이력에 넣지 마라.
- `updatedAt`은 실제 검수한 날짜, 가격 조사일은 실제 가격 확인 날짜로 유지하라. 빌드 날짜를 검수일로 일괄 적용하지 마라.
- 대표 제품군·비교 글·가이드의 모바일/데스크톱 표시, 긴 표·출처 링크·내부 링크·정적 본문 노출을 브라우저에서 확인하라. UI를 수정했다면 해당 UI의 검수 증거를 남겨라. 브라우저 접근이 불가능하면 수행하지 못한 검증을 명시하라.
- 검증 단계에서 고친 내용은 관련 검사와 최종 빌드에 포함되어야 한다. 이전 빌드의 성공을 최종 소스의 성공으로 보고하지 마라.

## 11. 최종 완료 기준과 보고 형식

필수 산출물:

1. 저장소에 구현된 콘텐츠 변경과 필요한 최소 UI 변경.
2. 신규 claim 근거표, 신규 조사 기록 및 계산 근거.
3. `docs/content-value-review-<실제작업일>.md`: 전체 사이트 검수 보고서.
4. 34개 모델 전수 결과표: `모델/페이지 → 기존 약점 → 활용한 근거 → 추가된 독자 판단 → 계산/비교 조건 → 남은 한계 → 수정 또는 유지 이유`.
5. 기존 블로그 18개 및 그 밖의 공개 영역의 검토 결과표. 수정하지 않은 글에도 유지 이유를 기록하라.
6. 자료 활용표: 각 자료 묶음의 사용 페이지, 사용한 주장, 보류한 이유. 원자료가 많다는 사실 자체를 콘텐츠 가치로 세지 마라.
7. 대표 전후 사례: 제품군별 주요 사례를 골라 기존 문장·개선 문장·사양표를 넘어선 판단을 비교하라. 과장 없이 강한 개선과 남은 약점을 보여라.
8. 실행한 검사·실패 교정·최종 통과 결과, 브라우저 검수, 변경 경로와 색인 상태 변화.

작업 완료 여부는 각 페이지의 독자 질문에 답할 수 있는지로 판단하라. 모든 페이지를 직접 실측 리뷰 수준으로 만들었다고 주장할 필요는 없다. 근거가 제한된 페이지에서도 기능의 실제 차이·사용 동선·조건부 선택·확인할 비용 등을 구체적으로 설명할 수 있어야 한다.

최종 답변에서는 전체 검토 범위, 실제 바뀐 내용, 독자가 새로 얻는 판단, 남은 근거 공백, 검증 결과를 구분하라. 애드센스 통과 가능성을 임의의 백분율로 제시하지 마라.

## 12. 시작 요청

지금 저장소와 자료집을 읽고 위 단계 A부터 E까지 실행하라. 기존 성과를 보존하며 전체 사이트의 콘텐츠 가치를 실질적으로 높여라. 사용자에게 이미 있는 자료를 다시 모아 달라고 요구하거나, 조사 목록·초안만 제시하고 작업을 중단하지 마라.

아래 부록은 시작 시 누락을 막기 위한 모델·글 목록이다. 실행 시 실제 카탈로그와 대조하여 최신 목록으로 작업하라.

## 부록 A — 공개 제품 34개 체크리스트

| 제품군 | 정확한 모델 | 제품 slug |
|---|---|---|
| 에어컨 | AR07A9170HCN | `samsung-wind-free-ar07a9170` |
| 세탁기 | WF24A9500KE | `samsung-bespoke-grande-wf24a9500` |
| 건조기 | DV17A9720BV | `samsung-bespoke-grande-dv17a9720` |
| 냉장고 | RF85C90D1AP | `samsung-bespoke-4door-rf85` |
| 냉장고 | RS84B5061M9 | `samsung-bespoke-sxs-rs84` |
| 로봇청소기 | VR50T95735W | `samsung-bespoke-jetbot-ai` |
| 세탁기 | WD25DB8995BZ | `samsung-bespoke-ai-combo-wd25` |
| TV | KU27LSFM7AXXKR | `samsung-the-movingstyle` |
| 무선이어폰 | SM-R630N | `samsung-galaxy-buds3-pro` |
| 냉장고 | T873MEE111 | `lg-dios-obje-4door-t873` |
| 정수기 | WD523ACB | `lg-puricare-water-purifier-objet` |
| 로봇청소기 | RO585HGH | `lg-codezero-r5-robot` |
| 냉장고 | S834MWW1D | `lg-dios-obje-sxs-s834` |
| TV | 27LX6TPGA | `lg-standbyme2` |
| TV | 32LX6BPGA | `lg-standbyme2-max` |
| TV | 27LX5QKNA | `lg-standbyme-go` |
| 에어컨 | TAC-08CSD/TPH11I | `tcl-tac-08csd-wall` |
| 에어컨 | TAC-12CSD/TPH11I | `tcl-tac-12csd-wall` |
| 에어컨 | CTH06QBW | `haier-cth06qbw-wall` |
| 에어컨 | CTH10QBW | `haier-cth10qbw-wall` |
| 선풍기 | TP07 | `dyson-pure-cool-tp07` |
| 선풍기 | HP09 | `dyson-hot-cool-hp09` |
| 공기청정기 | AC-M16-SC | `xiaomi-smart-air-purifier-4` |
| 정수기 | CHPI-7400N | `coway-handpick-water-purifier-compact` |
| 제습기 | DN2H160-IWK | `winix-posong-dehumidifier-16l` |
| 식기세척기 | DWA-81R0D | `skmagic-touchon-dishwasher-dwa81` |
| 정수기 | WPU-A710C | `skmagic-allin-water-purifier-wpu` |
| 식기세척기 | CDW-A0611TW | `cuckoo-dishwasher-table-cdw61` |
| 로봇청소기 | S8 Pro Ultra | `roborock-s8-proultra` |
| 로봇청소기 | Qrevo Curv | `roborock-qrevo-curv` |
| 무선이어폰 | A3063 / A3064 / A3122 | `apple-airpods-pro3` |
| 무선이어폰 | WF-1000XM5 | `sony-wf-1000xm5` |
| 무선이어폰 | A3957 | `anker-soundcore-liberty5` |
| 무선이어폰 | HT08 | `qcy-melobuds-pro` |

기존 noindex 3개: `samsung-bespoke-sxs-rs84`, `skmagic-touchon-dishwasher-dwa81`, `skmagic-allin-water-purifier-wpu`. 내용 개선 대상에서 제외하지 마라.

## 부록 B — 기존 블로그 18개 체크리스트

- `/blog/air-purifier-area-numbers` — `src/lib/data/blog/posts/air-purifier-area-numbers.ts`
- `/blog/airpods-pro3-review-meta-analysis` — `src/lib/data/blog/posts/airpods-pro3-review-meta-analysis.ts`
- `/blog/airpods-pro3-vs-buds3-pro-vs-liberty5` — `src/lib/data/blog/posts/airpods-pro3-vs-buds3-pro-vs-liberty5.ts`
- `/blog/bespoke-rf85-vs-dios-t873` — `src/lib/data/blog/posts/bespoke-rf85-vs-dios-t873.ts`
- `/blog/dehumidifier-liters-measurement` — `src/lib/data/blog/posts/dehumidifier-liters-measurement.ts`
- `/blog/dishwasher-12-vs-6-countertop` — `src/lib/data/blog/posts/dishwasher-12-vs-6-countertop.ts`
- `/blog/dishwasher-water-per-person` — `src/lib/data/blog/posts/dishwasher-water-per-person.ts`
- `/blog/dyson-tp07-vs-hp09` — `src/lib/data/blog/posts/dyson-tp07-vs-hp09.ts`
- `/blog/fridge-4door-vs-side-by-side` — `src/lib/data/blog/posts/fridge-4door-vs-side-by-side.ts`
- `/blog/fridge-monthly-kwh-measurement` — `src/lib/data/blog/posts/fridge-monthly-kwh-measurement.ts`
- `/blog/portable-tv-standbyme-vs-movingstyle` — `src/lib/data/blog/posts/portable-tv-standbyme-vs-movingstyle.ts`
- `/blog/robot-vacuum-suction-numbers` — `src/lib/data/blog/posts/robot-vacuum-suction-numbers.ts`
- `/blog/samsung-washer-check-codes` — `src/lib/data/blog/posts/samsung-washer-check-codes.ts`
- `/blog/sony-xm5-vs-qcy-melobuds` — `src/lib/data/blog/posts/sony-xm5-vs-qcy-melobuds.ts`
- `/blog/standbyme-go-vs-2-vs-max` — `src/lib/data/blog/posts/standbyme-go-vs-2-vs-max.ts`
- `/blog/wall-aircon-samsung-vs-tcl-vs-haier` — `src/lib/data/blog/posts/wall-aircon-samsung-vs-tcl-vs-haier.ts`
- `/blog/washer-dryer-combo-vs-separate` — `src/lib/data/blog/posts/washer-dryer-combo-vs-separate.ts`
- `/blog/water-purifier-lg-vs-coway-vs-skmagic` — `src/lib/data/blog/posts/water-purifier-lg-vs-coway-vs-skmagic.ts`

## 부록 C — 전달과 실행 방법

같은 로컬 저장소의 Claude Code에서 이 문서를 읽게 하라. 다른 작업 공간으로 옮길 때는 Git 추적 자료뿐 아니라 필요한 연구용 원본·`.audit` 스냅샷의 존재 여부도 확인해야 한다. 누락 자료는 공개 원문·manifest로 복구하며 비밀 설정 파일을 복사하지 않는다. 이 문서 자체는 후속 작업 지시서이고 실제 콘텐츠 개선 완료 보고서가 아니다.
