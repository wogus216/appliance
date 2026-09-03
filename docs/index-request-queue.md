# Search Console 색인 생성 요청 큐

측정 시점: 2026-08-25 / 대상: 라이브 사이트맵 61개 URL
자수 = 렌더된 본문 문자 수 (`node scripts/measure-page-length.mjs '' 0`)

## 왜 이 작업을 하는가

2026-08-25 Search Console 페이지 색인 리포트 기준 **색인 생성됨 1 / 미색인 379**였다.
내역은 발견됨-미색인 358, 크롤링됨-미색인 20, 리디렉션 1.

구글이 아는 URL 379개는 대부분 8월 통합 전 383페이지 시대의 잔재이고, **실제로 크롤된
것은 22개 남짓**(20+1+1)이다. 즉 읽고 거부당한 게 아니라 **읽으러 오지 않은** 상태다.
기술적 차단은 없다 — Googlebot·Mediapartners UA 모두 200, robots.txt 허용, canonical
정상, 끊긴 내부 링크 0건(고유 내부 경로 120개 전수 대조).

URL 검사 → 색인 생성 요청은 **크롤 순번을 앞당기는 수단이지 색인을 보장하지 않는다.**
근본 해결은 도메인 나이와 외부 링크이며, 이 큐는 그때까지의 임시 수단이다.

## 진행 상황

| 회차 | 날짜 | 상태 |
| --- | --- | --- |
| 1일차 | 2026-08-24 | 완료. **어떤 URL이었는지 기록이 없다 — 불명** |
| 2일차 | 2026-08-25~26 | 완료(8/25 할당량 초과 → 8/26 마무리). **몇 건이 들어갔는지 불명** |
| 3일차 | 2026-08-27 | 진행. 신규 4편 → A군 잔여(등록됨은 건너뜀) → B군 순 |
| 4일차 | 2026-09-02~ | 예정. 9/2 신규 3편 + 성분 사전 7페이지 → 3일차 잔여 순 |

일일 할당량의 정확한 수치와 리셋 시각은 구글이 공개하지 않는다(**불명**). 초과하면
"할당량 초과" 메시지가 뜨고, 통상 하루 뒤 다시 열린다.

**다음 회차를 시작하기 전에 할 일:** 아래 표의 URL을 GSC URL 검사에 넣었을 때 이미
"URL이 Google에 등록되어 있음"으로 나오면 요청하지 말고 건너뛴다. 할당량이 이 작업의
유일한 희소 자원이다.

## 요청하면 안 되는 URL (2026-08-25 기준 noindex)

8/25 배포로 사이트맵이 76 → 61이 되며 빠진 15개다. 색인 요청을 넣어도 소용없다.

**제품 5개 — 사진 0장** (`hasProductImage()` 미달)

    apple-airpods-pro3, sony-wf-1000xm5, anker-soundcore-liberty5,
    samsung-galaxy-buds3-pro, samsung-the-movingstyle

**브랜드 10개 — 색인 가능한 제품 0개** (`isBrandIndexable()` 미달)

    Anker, Apple, Coway, Cuckoo, Haier, QCY, Roborock, SKMagic, Sony, Winix

두 목록 모두 조건이 충족되면 코드 수정 없이 자동으로 사이트맵에 돌아온다. 제품 사진은
쿠팡 파트너스 링크를 기다리는 중이고, 브랜드는 그 브랜드 제품이 하나라도 색인되면 풀린다.

## 요청 순서

### A군 — 홈 + 블로그 (12)

**2026-09-02 신규 — 배포 후 A군 최상단으로.** 블로그 3편과, 항목이 2→6개가 되어 색인 게이트
(`MIN_DICTIONARY_ENTRIES` 6·항목당 600자)를 처음 넘긴 성분 사전 7페이지다. 자수는 빌드 산출물 렌더 측정
(`node scripts/measure-page-length.mjs '^(blog/(fridge|samsung-washer|dishwasher-water)|materials)' 0`).
사이트맵은 67 → 77.

| 자수 | URL |
| ---: | --- |
| 8,575 | `/blog/dishwasher-water-per-person` |
| 8,089 | `/blog/samsung-washer-check-codes` |
| 8,032 | `/blog/fridge-monthly-kwh-measurement` |
| 2,281 | `/materials` (허브, 항목 6개) |
| 1,507 | `/materials/sap` |
| 1,447 | `/materials/polypropylene-nonwoven` |
| 1,373 | `/materials/acrylic-acid-monomer` |
| 1,366 | `/materials/phthalate-plasticizers` |
| 1,300 | `/materials/fluorescent-whitening-agent` |
| 1,267 | `/materials/formaldehyde` |

성분 사전은 블로그·가이드보다 짧은 층이므로 블로그 3편 → 성분 허브 → 성분 항목 순으로 넣는다.

### B군 — 최장 허브 + 카테고리 가이드 (10)

| 자수 | URL |
| ---: | --- |
| 9,182 | `/error-codes/Samsung` |
| 6,182 | `/category/robot-vacuum` |
| 6,131 | `/category/dryer` |
| 5,814 | `/category/washer` |
| 5,666 | `/category/dehumidifier` |
| 5,584 | `/category/water-purifier` |
| 5,361 | `/category/refrigerator` |
| 5,340 | `/category/air-purifier` |
| 5,318 | `/category/dishwasher` |
| 5,322 | `/error-codes` |

`/error-codes/Samsung`은 9,182자로 블로그 글 다음가는 사이트 최장 페이지다. 분류상
에러코드라 뒤로 밀리기 쉬우니 여기에 올려 둔다.

### C군 — 남은 카테고리 + 상위 제품 + 브랜드 (10)

| 자수 | URL |
| ---: | --- |
| 5,312 | `/category/fan` |
| 5,302 | `/category/air-conditioner` |
| 4,067 | `/products/lg-puricare-water-purifier-objet` |
| 4,023 | `/products/dyson-hot-cool-hp09` |
| 3,973 | `/products/lg-dios-obje-sxs-s834` |
| 3,843 | `/products/samsung-bespoke-4door-rf85` |
| 3,816 | `/products/lg-dios-obje-4door-t873` |
| 3,791 | `/error-codes/Roborock` |
| 3,765 | `/products/xiaomi-smart-air-purifier-4` |
| 2,944 | `/brand/Samsung` |

### D군 — 나머지 (19)

    /category/wireless-earbuds  5,360   ← 뒤로 미룸, 아래 참조
    /category/tv                4,555   ← 뒤로 미룸, 아래 참조
    /error-codes/SKMagic        3,375
    /error-codes/LG             3,221
    /products/samsung-bespoke-ai-combo-wd25      3,591
    /products/dyson-pure-cool-tp07               3,484
    /products/tcl-tac-08csd-wall                 3,412
    /products/samsung-bespoke-grande-wf24a9500   3,129
    /products/samsung-bespoke-grande-dv17a9720   3,081
    /products/tcl-tac-12csd-wall                 3,016
    /products/samsung-wind-free-ar07a9170        2,951
    /error-codes/Haier          3,052
    /error-codes/TCL            2,493
    /error-codes/Dyson          2,431
    /error-codes/Cuckoo         2,400
    /error-codes/Xiaomi         1,806
    /error-codes/Coway          1,509
    /error-codes/Winix          1,407
    /brand/LG 2,004 · /brand/Dyson 1,947 · /brand/TCL 1,630 · /brand/Xiaomi 1,311
    /methodology 3,034 · /editorial-policy 2,557 · /about 2,070 · /compare 2,056
    /terms 2,000 · /contact 1,479 · /privacy 1,270

**`/category/wireless-earbuds`와 `/category/tv`를 자수 순위보다 뒤로 미룬 이유:**
본문인 구매 가이드는 멀쩡한데 그 아래 제품 링크가 **전부 noindex**라, 크롤러가 목록을
따라가면 막다른 길이다. 사진이 들어와 해당 제품이 색인되면 B군으로 올릴 것.

## 색인 상태를 기계로 재려면 (2026-09-03 추가)

    GSC_KEY_FILE=~/.config/gsc/service-account.json node scripts/gsc-inspect.mjs
    node scripts/gsc-inspect.mjs --site sc-domain:allrunabout.com   # 러닝슈즈도 같은 스크립트

Search Console **URL 검사 API**(하루 2,000건)로 사이트맵 전체를 검사해 색인됨·발견됨-미색인·
크롤됨-미색인 수를 세고, `.audit/gsc/<속성>/<날짜>.json`에 스냅샷을 남긴다. 이전 스냅샷과 비교해
"새로 색인·처음 크롤·색인 이탈"을 보여 주고, **요청 후보를 구글이 모름 → 발견됨 → 크롤됨 순으로**
상위 12개 뽑아 준다. 색인 요청 버튼 자체는 API가 없어 여전히 손(또는 브라우저 자동화)으로 넣는다.

준비는 사용자 계정으로 한 번: Cloud 프로젝트에 Search Console API 사용 설정 → 서비스 계정 JSON 키
→ 두 속성의 "사용자 및 권한"에 서비스 계정 이메일을 **전체** 권한으로 추가. 키는 리포 밖에 둔다.

위 "진행 상황" 표의 '불명' 칸은 이 스냅샷이 쌓이면 더 생기지 않는다.

## 목록을 다시 만들려면

    curl -s https://salimlab.kr/sitemap.xml | grep -o '<loc>[^<]*</loc>'
    node scripts/measure-page-length.mjs '' 0

사이트맵은 `isProductIndexable`·`isBrandIndexable` 등 `src/lib/content-quality.ts`의
판정을 그대로 따르므로, 사이트맵에 있는 URL은 정의상 noindex가 아니다. 사이트맵을 기준
집합으로 삼으면 "요청하면 안 되는 URL"을 손으로 관리할 필요가 없다.
