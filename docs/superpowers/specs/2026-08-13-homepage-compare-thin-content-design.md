# 홈페이지·compare thin content 해소 설계

작성일: 2026-08-13
대상: `src/app/page.tsx`, `src/app/compare/page.tsx`, `src/components/category-filter-grid.tsx`, `src/components/compare/compare-content.tsx`

> **상태:** 전체 승인 완료.

## 배경

브랜드 페이지 사이클(2026-08-12) 완료 후 사이트 전체 얇은 페이지가 26개(20%) → 11개(9%)로 줄었다. 남은 11개 중 두 개가 사이트에서 가장 많이 노출되는 자리다 — 홈페이지(336자)와 compare(269자). 애드센스 재신청을 검토하면서 이 둘을 방치하면 위험하다고 판단했다: 심사자는 통계적 샘플링이 아니라 몇 페이지를 직접 열어보는 방식이고, 그중 홈페이지는 거의 확실히 포함된다. "9%만 남았다"는 숫자와 별개로, 첫 페이지가 얇으면 첫인상 자체가 얇다.

## 원인 — 브랜드 페이지 때와 다르다

브랜드 페이지의 얇음은 원고가 없어서였다. 이번엔 다르다. `out/index.html`을 직접 열어 확인한 결과, 실제 제품 카드 텍스트는 하나도 없고 `animate-pulse` 스켈레톤 div 6개(빈 회색 박스)만 있었다. `out/compare.html`도 빈 `h-96` 박스 하나뿐이었다.

원인은 두 페이지의 실제 콘텐츠(제품 그리드, 비교 UI)가 `useSearchParams()`를 쓰는 클라이언트 컴포넌트 안에 있고, `<Suspense fallback={...}>`로 감싸져 있다는 것이다. Next.js 공식 문서(`node_modules/next/dist/docs/01-app/03-api-reference/04-functions/use-search-params.md`)를 확인한 결과:

> calling `useSearchParams` will cause the Client Component tree up to the closest `Suspense` boundary to be client-side rendered.

정적 export 빌드는 URL 쿼리를 빌드 시점에 알 수 없어서, `useSearchParams()`를 호출하는 컴포넌트부터 그걸 감싸는 Suspense까지는 정적 HTML에 **fallback만** 실리고 실제 콘텐츠는 클라이언트 하이드레이션 후에만 나타난다. 두 페이지 모두 이 fallback이 텍스트 없는 스켈레톤이라 얇게 측정된다.

## 결정 사항

- **`useSearchParams()` 호출 지점을 그리드/비교 콘텐츠에서 분리한다.** 콘텐츠 자체는 `useSearchParams()`를 쓰지 않고 `useState`의 기본값(필터 없음·정렬 기본값)만으로 렌더링해, 정적 HTML에 실제 콘텐츠가 실리게 한다.
- **URL 기반 기능(딥링크·공유 링크)은 하나도 없애지 않는다.** `useSearchParams()`는 화면에 아무것도 그리지 않는 작은 자식 컴포넌트로 옮기고, 그 컴포넌트만 `<Suspense fallback={null}>`로 감싼다. 마운트 후 URL을 읽어 부모 상태를 갱신한다.
- **에디토리얼 문구는 가볍게만 추가한다.** compare 페이지는 `selected`가 빈 배열이어도 제품 검색 섹션이 카탈로그 74개 전체를 이름·브랜드·카테고리·가격과 함께 나열하고 있어서(`src/components/compare/compare-content.tsx:191-227`), 구조 수정만으로 1,200자 게이트를 사실상 통과한다. 홈페이지 그리드도 마찬가지로 제품 카드 74개가 실텍스트를 갖고 있다. 그래서 이번 문구 추가는 "글자 수를 채우기 위해서"가 아니라 첫인상 품질을 위한 것이고, 브랜드 페이지처럼 여러 라운드짜리 집필 작업이 아니다.

## 아키텍처

**현재 구조 (두 페이지 공통 패턴):**
```
CategoryFilterGrid (client)
  └─ Suspense
       └─ CategoryFilterGridInner (client, useSearchParams 직접 호출)
            ├─ 필터/정렬 UI
            └─ 제품 카드 그리드   ← 정적 HTML에서 스켈레톤으로 대체됨
```

**바뀔 구조:**
```
CategoryFilterGrid (client, useSearchParams 없음)
  ├─ useState(기본값: 필터 없음·정렬 기본값)
  ├─ 필터/정렬 UI + 제품 카드 그리드   ← state만으로 렌더, 정적 HTML에 그대로 실림
  └─ Suspense(fallback=null)
       └─ UrlFilterSync (client, useSearchParams만 담당, return null)
            └─ 마운트 후 URL 읽어서 부모의 setState 호출
```

`CompareContent`도 동일 패턴 — `selected`(비교 대상 목록)의 초기값을 `useState([])`로 두고, `useSearchParams()`는 `UrlItemsSync` 같은 별도 자식으로 옮긴다.

기존 필터링 로직(`useMemo` 필터, `router.replace`로 URL 갱신)은 그대로 둔다 — 상태의 "초기값 출처"만 바뀐다.

**트레이드오프:** 딥링크(`/?category=에어컨`, `/compare?items=...`)로 들어온 사용자는 하이드레이션 전 짧은 순간 필터 안 걸린 기본 화면을 보다가 걸린 화면으로 전환된다. 지금은 그 순간에 빈 스켈레톤을 보고 있으므로 UX가 나빠지는 게 아니라 좋아진다.

## 에디토리얼 문구

**홈페이지**
- 히어로 아래 파생 통계 한 줄 — "현재 N개 카테고리 · N개 제품 · N개 브랜드를 비교할 수 있습니다" (브랜드 페이지 사이클의 "카탈로그 파생 통계, 집필 부담 0" 패턴 재사용 — `getAllCategories()`·`getCardAppliances()`·`getAllBrands()`에서 그대로 계산)
- "이렇게 고르세요" — 에너지효율·평수·가격 3가지 기준으로 고르는 법을 각 기준당 1문장씩, 총 2~3문장으로 설명. 사이트 전체에 하나만 쓰면 되므로 라운드 집필 불필요

**Compare 페이지**
- 기존 한 줄 설명("스펙, 가격, 에너지효율을 나란히 비교하세요") 아래 비교 시 볼 포인트 짧은 설명 추가
- "자주 비교되는 조합" 섹션 — 제품이 2개 이상인 카테고리마다 평점 상위 2개를 묶어 비교 링크(`/compare?items=...`)를 만든다. 순수 파생 데이터라 카탈로그가 바뀌어도 저절로 맞고, 브랜드 페이지의 "통계는 저장하지 않고 파생한다" 원칙과 같은 방식이다. 패딩이 아니라 실제 내비게이션 가치가 있는 링크

## 검증

1. `npm run build && node scripts/measure-page-length.mjs '^(index|compare)$' 1200` — 게이트 통과 확인 (브랜드 사이클과 같은 도구)
2. `npm test` — 전체 스위트 유지. `compare-content.test.ts`는 `parseSelectedParam` 순수 함수만 검증하므로 이번 구조 변경과 무관하게 그대로 통과해야 한다.
3. **하이드레이션 정합성** — 서버 렌더와 클라이언트 첫 렌더가 같은 기본 상태(필터 없음)로 시작해야 하이드레이션 경고가 안 남는다. 빌드 후 브라우저 콘솔에서 직접 확인한다.
4. **기능 회귀 확인 (Playwright)** — 딥링크(`/?category=에어컨`)가 마운트 후 실제로 필터링되는지, compare의 "URL 공유" 복사 링크가 그대로 동작하는지 실제로 클릭해서 확인한다.
5. `out/index.html`·`out/compare.html`에서 `animate-pulse` 스켈레톤 마커가 사라지고 실제 제품명·가격이 텍스트로 들어있는지 grep으로 확인한다.
6. `npm run lint` — 에러 없음.

## 범위 밖

- 홈페이지 정보구조 재설계(필터 UI 축소, 카테고리 허브화) — 근본 원인이 아키텍처 버그였다는 게 확인됐으므로 이번 사이클에서는 불필요. 향후 별도 논의.
- 리뷰 출처 보강(329개 중 24개), 성분 사전 본문 — 각자의 사이클.
- URL 파라미터를 아예 없애는 안 — compare의 "링크 복사" 기능(URL이 비교 상태의 단일 진실 공급원)이 실제 제품 기능이라 유지한다.
