# 빠진 에러코드 보강·코웨이 허브 조사 결과 — 2026-10-26

## 1. 못 한 것 / 추가하지 않은 코드

- **SK정수기 F01은 추가하지 않았다.** [SK인텔릭스서비스 공식 FAQ 검색 결과](https://www.skintellixservice.com/web/easy/easyMain.do?inputBasicKeyword=WPUIAC425SNW&tabIndex=3)에 `F01`을 포함한 정수기 오류 안내 제목이 나온다. 그러나 공개 카탈로그의 SK매직 정수기 `WPU-A710C`에 이 코드가 표시되는지 확인하지 못했다. FAQ 본문의 F01 뜻·조치도 이번 조사에서 직접 확인하지 못해 **불명**이다. 정수기 제품군을 SK매직 오류 허브에 신설하는 일은 지시서가 별도 승인 대상으로 정했다.
- **쿠쿠 E2를 CDW-A0611TW에, SK매직 dr을 DWA-81R0D에, 로보락 Error 2를 S8 Pro Ultra·Qrevo Curv에 적용하지 않았다.** 각 모델의 공식 자료에서 그 표시를 확인하지 못했다. 아래에서 추가한 카드는 각각 공식 자료가 명시한 다른 모델로 범위를 제한했다.
- **코웨이 허브 코드는 수정하지 않았다.** 작업 ②는 조사·보고 범위다. 다이슨·위닉스·샤오미 허브는 조사 범위 밖이다.

## 2. 코드별 결과

| 검색어 | 공식 출처 | 확인한 내용 요지 | 추가 여부 |
| --- | --- | --- | --- |
| 쿠쿠 식기세척기 E2 | [쿠쿠 CDW-CS0620T Series 설명서, 인쇄 26쪽](https://cdn.cuckoo.co.kr/upload_cuckoo/_bo_rep/manual/file_42564d7e-2cf0-4afa-a733-16ec86be146a.pdf); [CDW-A0611TW·TS 설명서, 인쇄 25쪽](https://www.cuckoo.co.kr/upload_cuckoo/_bo_rep/manual/200424%3Dz0383-0082a0%20rev.1_cdw-a0611t.pdf) | CS0620T 계열의 E2는 **히터 저온 점검**이다. 전원을 껐다 켜고 계속되면 A/S에 문의한다. A0611TW 코드표에는 E2가 없다. 검색 결과의 ‘배수’·‘급수’ 뜻을 가져오지 않았다. | **추가**: 제품 없는 CS0620T 계열 카드 |
| SK매직 식기세척기 DR | [SK매직 DWA19R0P·C0P·C1P 공용 설명서, 「TOUCH ON」](https://m.manual.skmagic.com/2019/model/DWA/DWA19R0P00BL/Manual.htm) | 문의 위쪽 끝을 눌러 닫고 `dr` 표시가 없어져야 완전히 닫힌 상태다. 표시가 남으면 상담센터에 문의한다. [DWA-81R0D 대조 기록](../research/evidence/2026-10-02/skmagic-dwa81-dr-code-scope-audit.md)은 해당 모델의 dr 표시를 확인하지 못했다. | **추가**: DWA19 계열 전용 카드 |
| 로보락 범퍼 오류 | [Roborock S7 공식 설명서, Errors 표](https://support.roborock.com/hc/en-us/article_attachments/900008254623); [로보락 코리아 AS 안내](https://kr.roborock.com/pages/roborock-service-warranty) | S7의 `Error 2`는 범퍼 걸림이다. 범퍼 청소·가벼운 두드림 후 위치를 옮겨 재시작하도록 한다. 계속되면 고객지원에 문의한다. S8 Pro Ultra·Qrevo Curv의 모델별 번호 근거는 확인되지 않았다. | **추가**: S7 전용 카드 |
| SK정수기 F01 | [SK인텔릭스서비스 정수기 FAQ 검색 결과](https://www.skintellixservice.com/web/easy/easyMain.do?inputBasicKeyword=WPUIAC425SNW&tabIndex=3) | 공식 목록에 `F01`이 들어간 FAQ 제목은 확인했다. F01의 뜻·자가 조치와 WPU-A710C 적용 여부는 **불명**이다. | **보류**: 제품군 신설 승인과 모델별 본문 확인 필요 |
| 식기세척기 F9 | [SK매직 DWA-81R0D 사용설명서, 「자가 진단하기」](https://m.manual.skmagic.com/2019/model/DWA/DWA81R0D00SL/Manual.htm) | `F1~F9`를 기능 이상으로 묶는다. F9만의 원인 부품은 지정하지 않으며, 전원 차단·플러그 분리·중간밸브 잠금 뒤 상담센터 문의가 안내된 조치다. 다른 브랜드·모델의 F9 뜻은 불명이다. | **추가**: DWA-81R0D 카드 |

출처의 긴 문장과 PDF 전체는 옮기지 않았다. 기존 [오류 허브 출처 메타데이터](../src/lib/data/editorial/error-code-editorial.ts)에 새 설명서와 적용 범위를 기록했다.

## 3. 변경 파일과 검증

| 파일 | 변경 |
| --- | --- |
| `src/lib/data/appliances/skmagic.ts` | DWA-81R0D F9 추가 |
| `src/lib/data/error-codes/standalone.ts` | CS0620T E2, DWA19 dr, S7 Error 2를 제품군 한정 카드로 추가 |
| `src/lib/data/editorial/error-code-editorial.ts` | 세 브랜드의 검수일·출처·모델 적용 범위 갱신 |
| `src/lib/data/error-codes/popular.ts` | dr 미수록이라는 오래된 주석 정정 |
| `src/lib/data/site-revisions.ts` | 실제 본문 변경 경로 8개를 2026-10-26 항목으로 기록 |
| `src/lib/__tests__/site-revisions.test.ts` | 홈·SK매직 오류 허브의 최신 개편일 기대값 갱신. `LATEST_EXPECTED_LASTMOD`는 이미 `2026-10-26`이라 값 변경 불필요 |
| `research/evidence/2026-10-26/changed-sitemap-vs-deployed.txt` | 빌드 본문 대조 원시 경로 목록 |
| `docs/error-code-gaps-report-2026-10-26.md` | 이 보고서 |

검증은 모두 로컬 작업 브랜치에서 실행했다.

| 명령 | 결과 |
| --- | --- |
| `npx tsc --noEmit` | 통과 |
| `npx eslint src` | 통과 |
| `npm run build` | 통과, Next.js 16.2.12 정적 페이지 157개 생성 |
| `npx vitest run` | **25개 파일·1,948개 테스트 통과** |

최종 `out`의 `<main>` 텍스트에서 쿠쿠 `E2`·`CDW-CS0620T`와 대조군 `E1`, SK매직 `dr`·`DWA19R0P`·`F9`와 대조군 `F3`, 로보락 `Error 2`·`Roborock S7`와 대조군 `Error 4`가 모두 확인됐다. 오류코드 목록 본문에도 새 코드가 나타난다.

## 4. SITE_REVISIONS 대조

배포 코드 `eb7bf74`를 별도 worktree에서 빌드했다. `node_modules`는 `cp -Rc`로 복제했다. `node scripts/changed-pages.mjs /tmp/appliance-eb7bf74/out out`으로 두 빌드의 사이트맵 경로별 `<main>`을 비교했다. 사이트맵 **97개 중 8개 변경**, 새 페이지 **0개**였다. 개편 기록에 적은 경로는 다음뿐이다.

```text
/
/error-codes
/about
/brand/Cuckoo
/brand/Roborock
/error-codes/SKMagic
/error-codes/Cuckoo
/error-codes/Roborock
```

대조 결과는 [changed-sitemap-vs-deployed.txt](../research/evidence/2026-10-26/changed-sitemap-vs-deployed.txt)에 남겼다. 이는 배포 전 빌드 비교이며 배포·색인 확인이 아니다.

## 5. 코웨이 허브 복구 가능성 (조사만)

`src/lib/data/appliances/coway.ts`에는 **6개 제품**이 있다. `src/lib/data/appliances/unverified.ts`의 5개는 모델 검증 보류로 공개 목록에서 빠지고, 공개 제품 **CHPI-7400N 1개에는 현재 `errorCodes`가 없다**. `getErrorCodeBrands()`는 공개 `allAppliances` 중 코드가 있는 브랜드 또는 독립 코드 그룹이 있는 브랜드만 넣는다. 코웨이는 두 조건 모두 충족하지 않아 `/error-codes/Coway`가 생성되지 않는다.

| 카탈로그 모델 | 현재 저장된 코드 | 공개 여부 |
| --- | --- | --- |
| AP-3023A | E1, FL, E2, CF, E8, C1 (6개) | 모델 미검증으로 제외 |
| AD-1018B | FL, E5, E1, CH, E4, C1 (6개) | 모델 미검증으로 제외 |
| CHP-7311N | ‘필터 교체’, ‘누수 감지’ 등 문구 6개 | 모델 미검증으로 제외 |
| CHPI-7400N | 없음 | 공개 |
| AP-2023C | E1, FL, CF, E2, E8, C1 (6개) | 모델 미검증으로 제외 |
| AD-1623A | FL, E5, CH, E1, E4, C1 (6개) | 모델 미검증으로 제외 |

위 보류 모델의 기존 30개 레코드는 **검증된 코드 수가 아니다**. [2026-10-02 대조 기록](../research/evidence/2026-10-02/coway-winix-troubleshooting-audit.md)은 CHPI-7400N 설명서의 증상별 점검을 기기 표시 코드 6개로 잘못 실었던 것을 확인해 제거했다. 그 결정 때문에 허브가 404가 됐으며, 코웨이 코드 전체가 존재하지 않는다는 뜻은 아니다.

이번에 확인한 **모델이 특정된 공식 표시 코드 17종**과 출처는 다음과 같다.

| 공식 자료 | 확인된 표시 | 범위와 한계 |
| --- | --- | --- |
| [코웨이 CHPI-7400N·CPI-7400N 공용 설명서, 인쇄 16쪽](https://www.coway.com/core/product/fmanual/download/274) | `AP1~AP5` **5종** | 공개 제품 CHPI-7400N의 Wi-Fi 상태 표시다. 공유기·암호·네트워크·서버 연결 점검이며 냉각·추출 고장 코드가 아니다. |
| [코웨이 노블 공기청정기 AP-1623M·AP-2023K 설명서, 인쇄 35~37쪽](https://www.coway.com/core/product/fmanual/download/273) | `E1~E11`, `E16` **12종** | 팬, 먼지·온습도 센서, 에어팝업, 조작부, 전원 등의 모델별 안내다. 그림 속 표시도 PDF 렌더로 대조했다. 현재 카탈로그의 `AP-2023C`나 `AP-3023A`에 전용하지 않는다. |
| [코웨이 CHPI-7430N 설명서, 인쇄 30쪽](https://www.coway.com/core/product/fmanual/download/311) | `AP1~AP5` **5종** | 다른 정수기에서도 같은 5종이 확인되는 대조군이다. 위 17종에는 중복 합산하지 않았다. |
| [코웨이 BAS40-A 비데 설명서, 인쇄 30쪽](https://www.coway.com/core/product/fmanual/download/251) | 번호 없음 | 급수 에러는 수압 LED 5단 점멸과 알림음으로 안내한다. 이번 조사에서 게시 가능한 숫자·문자 코드는 확인하지 못했다. |

**복구 제안:** 가장 작은 범위는 공개 CHPI-7400N의 `AP1~AP5`를 설명서의 Wi-Fi 연결 범위로만 정리해 제품 데이터에 5개 추가하고, `ERROR_CODE_EDITORIAL.Coway`에 공식 출처·검수일·범위·연락처를 넣는 일이다. 기존 `getErrorCodeBrands()`가 허브를 자동 생성하므로 라우팅 코드 변경은 예상되지 않는다. 공기청정기까지 넓히려면 AP-1623M·AP-2023K의 12개 항목을 독립 코드 그룹에 추가하거나 해당 모델의 제품 데이터를 먼저 공식 검증해 공개해야 한다. 보류된 AP-2023C·AP-3023A의 코드를 그대로 되살리면 과거의 모델 혼동이 반복된다. 비데는 번호 대신 LED 증상 안내라 별도 콘텐츠 판단이 필요하다. **SK매직 정수기 제품군 신설과 코웨이 허브 복구**는 함께 범위를 승인받아 다음 작업으로 진행할 항목이다.

다이슨·위닉스·샤오미는 이번에 별도로 재조사하지 않았다. 위닉스의 기존 [2026-10-02 대조 기록](../research/evidence/2026-10-02/coway-winix-troubleshooting-audit.md)은 `dF`를 고장 코드가 아닌 자동 제상 표시로 분류한다.
