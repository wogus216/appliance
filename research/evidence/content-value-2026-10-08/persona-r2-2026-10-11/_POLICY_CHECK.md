# 살림랩 공개 기준 점검표 (2026-10-11 고정 — 결과를 보고 바꾸지 않는다)

당신은 Google이 **공개한 문서의 문장**을 기준으로 살림랩(salimlab.kr)을 점검한다. 이 사이트를 만든 사람이 아니다. 칭찬하거나 깎아내릴 목적은 없다.

**이 점검은 Google의 판정이 아니다.** AdSense 심사 기준과 가중치는 공개되지 않았다. 그러므로 **승인 확률·승인 여부·"통과할 것 같다/안 될 것 같다"는 쓰지 않는다.** 항목별로 "공개 문장에 비춰 사이트가 어떤 상태인가"만 근거와 함께 적는다.

## 기준 문서 (직접 WebFetch로 열어 원문을 확인한다)
- A. AdSense 자격 요건 — https://support.google.com/adsense/answer/9724?hl=ko ("콘텐츠는 품질이 높고 독창적이어야 하며 잠재고객의 관심을 끌 수 있어야 합니다.")
- B. 사이트 페이지가 애드센스 사용에 적합한 상태인지 확인 — https://support.google.com/adsense/answer/7299563?hl=ko
- C. Creating helpful, reliable, people-first content (2026-10-05판) — https://developers.google.com/search/docs/fundamentals/creating-helpful-content
- D. Spam policies (2026-08-28판) — https://developers.google.com/search/docs/essentials/spam-policies (Scaled content abuse, Thin affiliation 절)

## 표본 (총 14페이지, 바꾸지 않는다)
| 구분 | 페이지 |
| --- | --- |
| 사이트 정보 | `/`, `/about`, `/methodology`, `/editorial-policy` |
| 제품 | `/products/samsung-bespoke-grande-dv17a9720`, `/products/lg-codezero-r5-robot`, `/products/qcy-melobuds-pro` |
| 블로그 | `/blog/fridge-monthly-kwh-measurement`, `/blog/sony-xm5-vs-qcy-melobuds`, `/blog/wall-aircon-samsung-vs-tcl-vs-haier` |
| 가이드 | `/category/air-purifier` |
| 오류 코드 | `/error-codes/Kiturami`, `/error-codes/Navien` |
| 브랜드 | `/brand/Coway` |

- 본문: `pages/<파일>.txt` (운영 사이트와 같은 빌드에서 `<main>` 추출. `[→/경로]`는 내부 링크). 목록: `pages/_INDEX.tsv` (사이트맵 103개 전체).
- 메뉴·머리글·바닥글처럼 `<main>` 밖 요소는 운영 화면(https://salimlab.kr/...)을 WebFetch로 본다.
- 사이트 전체 성격(페이지 유형별 개수, 주제 분포)은 `_INDEX.tsv`로 본다.

## 점검 항목 (13개, 각 항목: 충족 / 부분 / 미흡 / 판단 불가)
각 항목에 **근거 문서 문장**(A~D 중 무엇), **사이트 근거**(페이지 + 원문 인용 80자 이내), **판정 이유**를 적는다. 근거를 찾지 못하면 "판단 불가"로 둔다.

1. 독창성 — 원문 대조·계산·판단처럼 원래 출처를 베끼거나 고쳐 쓰는 데 그치지 않는 정보가 있는가 (A, B-3, C "original information… analysis", "avoid simply copying or rewriting")
2. 깊이·고유한 장점 — 주제를 충분히 다루고, 이 페이지만의 장점이 있는가 (B-1, C "substantial, complete", "beyond the obvious")
3. 탐색 — 메뉴가 명확하고 쓰기 쉬운가 (B-2)
4. 제목 — 제목·주 제목이 내용을 정확히 요약하고 과장하지 않는가 (C)
5. 사실 오류 — 쉽게 검증되는 오류가 있는가. 표본에서 **수치 주장 3개 이상**을 골라 페이지가 인용한 출처 원문과 WebFetch로 대조한다. 고른 주장·출처 URL·대조 결과를 모두 적는다 (C "easily-verified factual errors")
6. 신뢰 근거 — 출처 표기가 분명하고, 사이트를 조사한 사람이 신뢰할 만하다는 인상을 받겠는가 (C Expertise)
7. 전문성 — 주제를 잘 아는 전문가·애호가가 쓰거나 검수했음이 드러나는가. 직접 경험(first-hand expertise)이 드러나는가 (C)
8. 누가(Who) — 저자가 분명한가, 바이라인이 있는가, 바이라인이 저자 정보로 연결되는가 (C "Who")
9. 어떻게(How) — 자동화·AI 사용이 고지되는가, 어떻게 썼는지 설명하는가, 왜 유용했는지 설명하는가 (C "How")
10. 검색엔진 우선 신호 — 여러 주제 대량 생산, 광범위한 자동화, 남의 말 요약 위주, 실질 변경 없는 날짜 갱신, 독자가 다시 검색해야 하는 결말 (C "Avoid creating search engine-first content")
11. 대량 생산 남용 신호 — 생성형 AI로 독자에게 가치를 더하지 않은 페이지를 많이 만들었는가 (D Scaled content abuse)
12. 얇은 제휴 — 제휴 링크와 함께 판매처 설명·후기를 그대로 옮겼는가, 같은 틀의 페이지가 반복되는가 (D Thin affiliation)
13. 목적 — 사이트에 1차 목적·초점이 있고, 읽은 사람이 목적을 이룰 만큼 배우는가 (C "primary purpose", "learned enough")

## 규칙
- WebSearch 금지. WebFetch는 salimlab.kr, 페이지가 인용한 출처 URL, 위 기준 문서 A~D에만 쓴다.
- 저장소 파일을 고치지 않는다. 커밋하지 않는다.
- 사이트의 실제 트래픽·색인·심사 상태는 알 수 없다. 추측하지 않는다.

## 출력
1. JSON: `out/P9-policy-check.json`
   - `criteria`: 13개 항목 배열. 각 `{id, title, verdict, standard, evidence: [{page, quote}], reason}`
   - `factChecks`: 항목 5의 대조 기록 `[{page, claim, sourceUrl, result}]`
   - `remainingRisks`: 공개 문장에 비춰 남은 약점, 큰 순서로 최대 5개. 각 `{risk, standard, evidence, fix}`
   - `notJudged`: 판단하지 못한 것과 이유
2. 최종 답변(조정자에게, 12줄 이내):
   - 판정 분포(충족·부분·미흡·판단 불가 개수)
   - 미흡·부분 항목과 한 줄 이유
   - 사실 대조 결과
   - 남은 약점 상위 3개
