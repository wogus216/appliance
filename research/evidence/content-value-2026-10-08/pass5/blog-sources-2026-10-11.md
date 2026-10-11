# 5차 교정 블로그 출처 근거 — 2026-10-11

제품 페이지 본문이 인용하지 않는 원문은 제품 출처표에 올리지 않는다. 블로그만 쓰는 1차 출처는 이 문서에 원문 확인 내용을 남긴 뒤 블로그 출처로 쓴다(`src/lib/__tests__/blog.test.ts`의 `evidenceNotes`).

| 원문 | 확인한 내용 | 확인 방법 | 쓰는 곳 |
| --- | --- | --- | --- |
| [효율관리기자재 운용규정 별표 1](https://www.law.go.kr/LSW/flDownload.do?flSeq=164910885) (기후에너지환경부고시 제2026-137호, PDF 13쪽) | 전기냉방기 냉방기간월간소비전력량 = 연간소비전력량 ÷ 4. 1시간소비전력량 = 연간소비전력량 × 1000 ÷ 941시간. 월간에너지비용 = 냉방기간월간소비전력량 × 221원. 연간소비전력량 = 냉방기간총소비전력량 측정값 × 2.5. | 2026-10-11, 브라우저 UA curl → pdftotext, 13쪽 렌더 육안 판독. 발췌 `sources/aircon-regulation-cooler.txt` | `/blog/wall-aircon-samsung-vs-tcl-vs-haier` 표 주석 |
| [한전 주택용 전기요금표](https://cyber.kepco.co.kr/ckepco/front/jsp/CY/E/E/CYEEHP00101.jsp) | 주택용 저압 하계(7.1~8.31, 2023-11-09 적용): 300kWh 이하 120.0원/kWh, 301~450kWh 214.6원/kWh, 450kWh 초과 307.3원/kWh. | 2026-10-11, curl + EUC-KR 디코딩. 발췌 `sources/aircon-kepco-tariff.txt` | `/blog/wall-aircon-samsung-vs-tcl-vs-haier` 요금 설명 |

하루 약 7.8시간은 고시 값이 아니라 편집 계산이다(941시간 ÷ 4 = 235.25시간/월, 30일로 나눔). 본문에서도 계산값으로 표시한다.
