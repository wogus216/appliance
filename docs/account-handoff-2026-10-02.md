# 살림랩 작업 인계 — 2026-10-02

> 아래는 당시의 기록이다. Haier F25와 Coway 보강은 `791e514`로 이미 배포됐으며, 미배포라는 아래 설명은 현재 상태가 아니다. 2026-10-07 후속 작업은 [최신 배포 점검](adsense-release-readiness-2026-10-07.md)을 우선한다.

새 계정의 작업자는 **이 문서보다 현재 작업 트리와 원문 출처를 우선**한다. 작업 디렉터리는 `/Users/kwonjaehyeon/Programming/sancho/appliance`, 사이트는 https://salimlab.kr 이다. 이전 Orca 세션은 참고 자료일 뿐이며 재개하거나 수정하지 않는다. 인증 정보는 이 문서에 없다.

## 목표와 현재 위치

목표는 AdSense 재심사 전에 사이트의 독자적인 문제 해결 가치와 출처 정확성을 높이는 것이다. 승인 확률을 올린다는 명목으로 페이지 수나 글자 수만 늘리지 않는다. 제조사 설명서와 독립 기관 자료의 적용 모델, 시험 범위, 불확실성을 대조한 분석이 핵심이다. **AdSense 재심사는 아직 요청하지 않았다.** 이전에 말한 `30~40%`는 검증된 통계가 아니라 당시의 주관적 위험 평가였으므로 목표 지표로 쓰지 않는다.

2026-10-02 배포 완료: 홈과 내비게이션의 에러코드 중심 개편, 제품 주장 검수, SK매직 식기세척기 E4 모델별 상세. `main`의 `7e18bd5`, `ee6c2e5`가 원격에 반영됐고 Cloudflare 배포가 성공했다. 배포와 라이브 확인 내용은 [배포 점검](adsense-release-readiness-2026-10-02.md)에 기록했다. 라이브 사이트맵은 93 URL이었다. 내용이 부실한 제품 4개와 코웨이 브랜드 허브는 `200` + `noindex, follow`이고, 검증된 코드가 없는 TCL 에러코드 허브는 `404`다.

Google Search Console 사이트맵은 2026-10-02 KST에 공식 API로 재제출했고 응답 204 및 조회 결과 오류 0, 경고 0을 확인했다. 당시 확인한 에러코드 허브 6개는 `Crawled - currently not indexed`였으나 마지막 크롤은 **2026-09-27**, 즉 이번 배포 전이었다. 새 E4 URL은 `URL is unknown to Google`이었다. 사이트맵 제출은 색인 요청이나 색인 보장이 아니다. 다음 확인은 새 배포 후 크롤·색인 상태와 실제 AdSense 심사 결과를 구분해서 기록한다.

## 작업 트리에 남은 변경: Haier F25

`main` 최신 커밋은 `ee6c2e5`이고 아래 변경은 **커밋·푸시·배포 전**이다.

- `src/app/error-codes/Haier/air-conditioner/f25/page.tsx` 신규: 국내 `CTH06QBW`·`CTH10QBW`의 F25 안내를 모델별 설명서에 연결해 해설한다.
- `src/app/error-codes/[brand]/page.tsx`: 하이얼 허브에서 상세 페이지로 링크.
- `src/app/sitemap.ts`: F25 URL과 `2026-10-02` 최종 수정일.
- `src/lib/__tests__/adsense.test.ts`: 새 광고 노출 경로 등록.
- `research/evidence/2026-10-02/haier-f25-model-specific-source-check.md`: 모델 검색 결과, PDF, 페이지 위치, 원문 대조 기록.

하이얼코리아의 두 정확한 모델명 검색 결과가 각각 공식 PDF로 연결된다. 두 설명서의 인쇄 28쪽에는 외기 0℃ 미만에서 F25가 표시될 수 있으며 10초간 끈 뒤 재시작하라는 안내가 있다. **고장 부품은 지정하지 않는다.** 해외 하이얼 FAQ는 센서 교체를 언급하지만 두 국내 모델에 적용된다는 근거가 없다. 상세 페이지는 이 차이를 명시한다. 게시 전 원문과 렌더 결과를 마지막으로 확인한다.

F25에 대해 통과한 검증: 관련 테스트 44개, ESLint, TypeScript, 정적 빌드. 로컬 사이트맵은 94 URL, 빌드는 159 정적 페이지였다. **전체 테스트는 아직 실행하지 않았다.** 다음 작업자가 `npm test -- --run`, `npm run lint`, `npx tsc --noEmit`, `npm run build`를 실행하고 차이를 검토한 뒤 커밋·배포한다. 배포 후 실제 F25 URL, 하이얼 허브 링크, canonical, 출처 링크, 사이트맵을 확인한다.

## 다음으로 가치 있는 개선 후보

코웨이 `CHPI-7400N` 제품 페이지는 현재 색인 자격 검사에서 발행처가 코웨이 1곳뿐이고 고유 분석 분량도 부족해 `noindex`다. 이 제품이 색인 가능해지면 `/brand/Coway`도 다시 자격을 얻을 수 있다. 이미 수집한 자료:

- `research/evidence/2026-10-01/coway-wqa-independent-performance.md`: WQA의 **완제품** `CHPI-7400N` NSF/ANSI 42·53·401 목록과 필터 `CCNTN7-D-PLUS` 목록을 구분한다. 필터 부품 항목의 시험 각주를 필터 단독의 인증 제거율로 바꾸지 않는다.
- `research/evidence/2026-10-01/kwtc-exact-water-purifier-register.md`: 한국물기술인증원 목록의 정확한 모델, 유효 정수량 1,000 L. WQA의 150 US gal과 제도·시험 범위가 달라 동일 정격으로 취급하지 않는다.
- `research/evidence/2026-10-01/coway-sk-filter-price-followup.md`: 가격·필터 비용의 확인 범위. 공식 판매가의 특정 옵션·시점과 장기 유지비를 구분하고, 확인되지 않은 필터 단품 가격·총비용은 추정하지 않는다.

출처 원문을 다시 확인한 뒤 `src/lib/data/editorial/product-editorial.ts`의 해당 제품 출처와 `src/lib/data/detailed-reviews/group8.ts`의 해당 리뷰를 보강한다. 설치 공간, 정수·제빙 구조, 인증 적용 범위, 교체 주기 조건, 확인 불가능한 유지비가 실제 구매 판단에 어떤 차이를 만드는지 제품 고유의 분석으로 작성한다. `src/lib/content-quality.ts`의 자격 검사와 실제 페이지를 함께 점검한다. 숫자 기준을 통과하려고 문장을 반복하지 않는다. `updatedAt`과 `src/lib/data/site-revisions.ts`의 수정일은 실제 변경에 맞게 갱신한다.

이 후보의 출처 또는 분석이 충분하지 않으면 `noindex`를 유지하고 다음 근거가 있는 모델로 이동한다. 색인 URL 수를 임의 목표로 삼지 않는다.

## 재심사와 운영 확인

AdSense 계정 로그인과 재심사 요청은 아직 완료되지 않았다. 이전 브라우저는 다른 Google 계정으로 로그인되어 있었고, 계정 선택 후 비밀번호 입력 화면에서 사용자에게 조작을 넘겼다. 새 계정에서 이전 브라우저 상태를 전제로 삼지 말고 사용자 본인의 로그인이 된 계정으로 AdSense 상태를 확인한다. 인증 정보는 요청하거나 문서에 저장하지 않는다. 추가 콘텐츠와 라이브 검증이 끝난 시점에 재심사 요청 가능 상태인지 확인하고, 요청했다면 날짜와 화면 상태를 기록한다.

GSC 상태 확인 도구는 `scripts/gsc-inspect.mjs`다. 서비스 계정 권한이 새 환경에서도 유효한지 확인한다. 배포 직후 색인 여부가 그대로여도 이전 크롤 날짜와 비교해야 한다. `docs/adsense-release-readiness-2026-10-02.md`는 **직전 배포** 기록이므로 F25 배포 뒤에는 새 결과를 별도로 남긴다.

배포는 `main` 푸시 시 `.github/workflows/deploy.yml`이 Cloudflare에 반영한다. 푸시 전 변경 파일과 테스트 결과를 확인하고, 배포 후 라이브 URL을 확인한다. 이 저장소의 Next.js는 16.2.12이므로 **코드를 작성하기 전에 해당 API의 `node_modules/next/dist/docs/` 가이드를 읽는다** (`AGENTS.md`).

## 새 계정에 바로 전달할 요청

> `/Users/kwonjaehyeon/Programming/sancho/appliance`의 `docs/account-handoff-2026-10-02.md`를 읽고 `git status`와 현재 파일을 우선 확인해 주세요. 미배포 Haier F25 변경을 검증·완료하고, 이어서 Coway CHPI-7400N의 독립 인증 자료를 제품별 분석에 반영할 수 있는지 검토해 주세요. 근거 없는 주장이나 분량 채우기를 피하고, 테스트·빌드·라이브 확인 결과와 AdSense/GSC의 실제 상태를 구분해 보고해 주세요.
