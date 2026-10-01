# 살림랩 개편 배포 점검 — 2026-10-02

## 이번 배포의 핵심

- 홈과 내비게이션은 에러코드 문제 해결을 첫 진입점으로 둔다. 점수형 제품 평가는 제거하고, 모델별로 확인 가능한 설명서·인증·가격 근거를 바로잡았다.
- [SK매직 식기세척기 E4 모델별 상세](../src/app/error-codes/SKMagic/dishwasher/e4/page.tsx)를 추가했다. [공식 FAQ와 설명서 대조 기록](../research/evidence/2026-10-02/skmagic-dishwasher-e4-source-check.md)을 따른다. 모델 계열마다 다른 의미, 누수 시 중지 조건, 사용자가 확인할 항목과 서비스 요청 시점을 분리했다.
- [편집 원칙](../src/app/editorial-policy/page.tsx)의 광고 수익 현재형 문구를 실제 상태에 맞게 수정했다.

## 사이트맵과 색인 범위

개편 전 `main` (`f12a8d6`)과 이번 빌드의 `<main>` 본문을 `scripts/changed-pages.mjs`로 비교했다. 사이트맵은 **98개에서 93개**다. 현재 93개 가운데 기존 **82개**의 본문이 달라졌고 E4 상세 **1개**가 추가됐다. 이 83개에만 2026-10-02 `lastmod`가 적용되는지 빌드 산출물에서 대조했다. 본문이 그대로인 10개에는 오늘 날짜가 붙지 않는다.

기존 6개 URL은 정적 페이지로 남지만 사이트맵에서 빠지고 `noindex` 판정을 받는다.

| URL | 이유 |
| --- | --- |
| `/products/coway-handpick-water-purifier-compact` | 확인 가능한 발행처 1곳, 고유 분석 분량 부족 |
| `/products/lg-codezero-r5-robot` | 고유 분석 분량 부족 |
| `/products/lg-dios-obje-sxs-s834` | 고유 분석 분량 부족 |
| `/products/samsung-bespoke-4door-rf85` | 고유 분석 분량 부족 |
| `/brand/Coway` | 색인 가능한 코웨이 제품이 0개 |
| `/error-codes/TCL` | 근거 검수 후 남은 코드 항목이 0개 |

이는 [콘텐츠 품질 판정](../src/lib/content-quality.ts)을 일관되게 적용한 결과다. 분량을 채우기 위한 미확인 문장을 추가하지 않는다.

## 검증

- `npm test -- --run`: 1,907개 통과.
- `npm run lint`, `npx tsc --noEmit`, `npm run build`: 통과. Next.js가 정적 페이지 158개를 생성했다.
- 정적 E4 페이지에서 H1 1개, 제조사 근거 링크 2개, canonical, SK매직 허브 링크, 사이트맵 항목을 확인했다.
- 배포 후 라이브의 홈·에러코드 허브·E4·소개·편집 원칙·사이트맵을 확인하고, GSC 색인 상태와 AdSense 심사 결과를 **각각** 기록한다. 이번 변경이 AdSense 승인을 보장한다는 근거는 없다.
