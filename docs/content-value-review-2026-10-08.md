# 콘텐츠 가치 개선 검수 — 2026-10-08

사용자가 모아 둔 조사 자료와 `docs/claude-code-content-value-brief-2026-10-07.md`를 기준으로 기존 구매 판단의 근거·조건·본문 간 일치를 보강했다. 로컬 구현과 검수를 완료했으며 운영 배포와 AdSense 재심사 제출은 수행하지 않았다. 승인 확률이나 승인 보장은 산출하지 않는다.

## 결과와 범위

- 공개 제품 34개 전수 대조: 카탈로그 객체 30개 수정, 4개 유지. 비공개 모델 변경 0개.
- 기존 블로그 18개 대조: 15개 수정, 3개 유지. 새 글 0개.
- 카테고리 가이드 12개 대조: 12개 수정.
- 브랜드 15개 대조: Sony·Anker·Winix·TCL·Dyson·Apple의6개 프로필 수정.
- 핵심 근거표 15건 및 산식 4건을 기록했다. 모든 제품의 모든 사양을 새로 실측하거나 모든 저장 원문을 재검증한 작업은 아니다.

## 근거 기록과 사용 범위

- [핵심 주장](../research/evidence/content-value-2026-10-08/claims.jsonl): 모델, 페이지, 원문 위치, 관측일, 조건, 계산 및 한계.
- [제품 34개 상세 검수표](../research/evidence/content-value-2026-10-08/product-review.json), [글·가이드 30개 검수표](../research/evidence/content-value-2026-10-08/page-review.json).
- [자료 활용 목록](../research/evidence/content-value-2026-10-08/source-usage.json): 기존 파일 84개의 경로·해시·연결 주장. `inventory_and_reference_scan`은 목록/참조 검색이며 원문 재검증 완료가 아니다. `claim_scope_rechecked`도 새 주장과 관련된 범위의 대조다.
- [조사 기록](../research/evidence/content-value-2026-10-08/README.md): 공식 페이지 조회와 보관 원문 대조를 구분.

| 자료 묶음 | 사용 페이지와 판단 | 보류 또는 적용 한계 |
| --- | --- | --- |
| 2026-09-29 정확 모델 측정·신고 (45파일) | 냉장고 제조사 고지와 공단 신고 분리, RF85/T873 표시 차이 계산 | 시험 수치를 실청구액·모든 집의 소비 순위로 바꾸지 않음. RS84 제조사 과거 53.0은 이번 원문 재독해 불가로 과거 조사로 표시(**2차에서 2026-10-08 삼성 지원 페이지로 재확인**) |
| 2026-09-30 유지비·신뢰성 (12파일) | TP07/HP09 공통 965432-01 필터 자재비·권장 교체 조건 | 당시 59,000원이며 현재가·공임·촉매 서비스 비용은 별도. 고장률 자료 미확보로 확률·순위 산출 안 함 |
| 2026-10-01 인증·설치·공개 주장 (10파일) | Curv 도크 여유와 문턱 형태, Sony 두 기기 전환, Liberty 5 기능 조합별 재생시간. 정수기 기존 필터/인증 안내 유지 | 인증 목록·필터 시험을 완제품 실사용 성능으로 확장하지 않음. 국내외 형번·자동급배수형 혼용 안 함 |
| 2026-10-02 모델별 기능·관리 감사 (14파일) | Xiaomi CADR/필터 설명, Winix 물통·시험 조건, 제품별 설치·관리 조건 대조 | DN2H160 적용면적 60㎡ 미확보로 표시 제거. 외국형·유사 모델 원문은 정확 모델의 부품/코드 근거로 전용하지 않음 |
| 2026-10-07 코드·이어폰·TV (3파일) 및 공식 연결 원문 | WF24/WD25 오류 표기와 조치 분리, LDAC 조합 조건, Go 터치·세로·테이블, Max 실제/가상 채널과 분리 무게 | 공통 오류 번호를 모든 기종에 적용하지 않음. 앱별 터치 지원·사용 조건 필요 |
| 기존 삼성 모델 연결 설명서 | WD25 25/15kg과 이불·울 제한, DV17 이불 4kg 한 장. 제품·글·가이드 일치 | 공용 설명서 중 해당 모델 코스 범위만 적용. 옷감 수축 방지 및 모든 소재 건조를 보장하지 않음 |

## 제품 34개 결과

아래는 공개 페이지의 핵심 판단 요약이다. 상세 문단과 출처 전체는 제품 검수 JSON에 보존했다. 유지된 제품은 기존 모델별 분석의 핵심 질문을 그대로 표시하며, 새 시험을 확보했다는 의미가 아니다.

| 모델 / 페이지 | 기존 약점 또는 유지 근거 | 활용 근거 | 독자 판단 | 계산·비교 조건 | 남은 한계 | 결과·이유 |
| --- | --- | --- | --- | --- | --- | --- |
| AR07A9170HCN [/products/samsung-wind-free-ar07a9170](https://salimlab.kr/products/samsung-wind-free-ar07a9170) | 이전 대상 안내: 15평 이상 거실 사용 (냉방력 부족) | [윈드프리 벽걸이 AR07A9170HCN 제품 사양](https://www.samsung.com/sec/support/model/AR07A9170HCN/); [윈드프리 벽걸이 AR07A9170HCN 가격 정보](https://prod.danawa.com/info/?pcode=122688519) | 삼성 AR07A9170HCN은 표시 냉방 면적 24.4㎡의 무풍 벽걸이 에어컨입니다. 실제 냉방과 설치비는 공간·배관·실외기 조건에 따라 달라집니다. 대상: recommended / notRecommended | 새 산식 없음; 기존 자료의 모델·조사일 조건 유지 | 공식 정격 냉방 소비전력은 850W, 효율등급은 3등급입니다. 등급 숫자만으로 1등급 제품의 실제 전기요금과 차이를 계산하지 않습니다. 비슷한 냉방 능력의 모델과 신고 조건을 맞추고, 운전 시간·온도 설정·추가 설치비를 함께 비교해야 합니다. 기존 가격은 조사일 기준이므로 현재 견적과 분리하세요. | 수정 — 모델 조건에 맞춰 요약·추천 대상·관리 판단을 정렬 |
| WF24A9500KE [/products/samsung-bespoke-grande-wf24a9500](https://salimlab.kr/products/samsung-bespoke-grande-wf24a9500) | 이전 대상 안내: 1~2인 가구 (오버스펙, 14kg 이하 추천) | `samsung-code-scope` | 삼성 WF24A9500KE는24kg 드럼세탁기이며 AI 맞춤세탁·버블워시와 자동 세제 투입을 안내합니다. 최대 용량과 코스별 적재량·관리 조건을 구분해야 합니다. 대상: recommended / notRecommended | 각 정확 모델 설명서 | 표시 효율은 1등급이지만 세탁 코스·부하·온도에 따라 실제 물과 전력 사용량이 달라집니다. 24kg라는 크기만으로 작은 빨래의 비용이 낭비되거나 대용량의 운영비가 낮다고 계산하지 않습니다. 조사일의 구매가와 현재 견적을 구분하고, 직렬 설치 키트·시공비 및 자동 투입부 관리 조건을 함께 확인하세요. | 수정 — 모델 조건에 맞춰 요약·추천 대상·관리 판단을 정렬 |
| DV17A9720BV [/products/samsung-bespoke-grande-dv17a9720](https://salimlab.kr/products/samsung-bespoke-grande-dv17a9720) | 이전 대상 안내: 전기요금에 매우 민감한 사용자 | `dv17-bedding` | 삼성 DV17A9720BV는 17kg 건조 용량과 AI 건조, 인버터 히트펌프·히터 조합을 갖춘 건조기입니다. 의류별 건조 가능 여부와 코스는 설명서를 확인해야 합니다. 대상: recommended / notRecommended | DV17A9720BV 연결 설명서 | 효율등급 1등급과 인버터 히트펌프·히터 조합은 실제 부하의 회당 전력량과 구분해야 합니다. 빨래 재질·탈수 상태·건조 코스가 달라 세탁기와의 비용 순위를 정할 근거는 없습니다. 현재 구매가는 확인하지 못했으므로 본체·직렬 설치 키트·시공비를 나눠 견적 받고, 필터 청소에 필요한 접근 공간도 설치 조건에 넣으세요. | 수정 — 모델 조건에 맞춰 요약·추천 대상·관리 판단을 정렬 |
| RF85C90D1AP [/products/samsung-bespoke-4door-rf85](https://salimlab.kr/products/samsung-bespoke-4door-rf85) | 이전 대상 안내: 1~2인 가구 (오버스펙) | `fridge-manufacturer-registry`, `rf85-t873-label-gap` | 삼성 비스포크 4도어 RF85C90D1AP. 875L 대용량과 디지털 인버터 컴프레서, 일반 쿨링커버(+엣지 쿨링)를 갖춘 모델. 대상: recommended / notRecommended | 각 모델 제조사 표기와 2026-09-29 신고; 제조사 표시 RF85·T873 | RF85의 월간소비전력량은 제조사 사양과 공단 신고의 조건을 구분해야 합니다. 효율등급이나 표시 정격 하나로 실제 청구액을 계산하지 않습니다. 큰 용량을 선택해 설치·수납 문제가 생기지 않는지 먼저 판단하고, 같은 용량·측정 제도의 월 전력량과 실제 사용 환경을 맞춰 비교하세요. | 수정 — 모델 조건에 맞춰 요약·추천 대상·관리 판단을 정렬 |
| RS84B5061M9 [/products/samsung-bespoke-sxs-rs84](https://salimlab.kr/products/samsung-bespoke-sxs-rs84) | 이전 대상 안내: 대용량은 원하지만 4도어가 부담스러운 가정 / 용량 대비 가성비를 보는 소비자 | `fridge-manufacturer-registry` | 삼성 RS84B5061M9 양문형 냉장고. 846L, 더블냉각, 디지털 인버터 컴프레서와 푸드쇼케이스 도어를 갖춘 모델입니다. 공식 사양은 패널 교체가 불가능하다고 명시합니다. 대상: recommended / notRecommended | 각 모델 제조사 표기와 2026-09-29 신고 | 삼성 공식 사양은 효율 2등급과 월간소비전력량 53.0kWh를 안내합니다. 이 표시값은 실제 가정의 전기요금과 같지 않습니다. RF85와 용량은 29L, 무게는 19kg 차이가 있지만 실제 반입·설치 비용은 경로와 작업에 따라 달라집니다. 현재 구매가를 확인하지 못했으므로 더 저렴한 대안이라는 결론은 보류하고 같은 설치 범위의 견적을 비교하세요. | 수정 — 모델 조건에 맞춰 요약·추천 대상·관리 판단을 정렬 |
| VR50T95735W [/products/samsung-bespoke-jetbot-ai](https://salimlab.kr/products/samsung-bespoke-jetbot-ai) | 기존 모델별 분석 유지: 물걸레가 없는 흡입형 VR50T95735W입니다. 자동 먼지비움 뒤에도 봉투·브러시 관리와 바닥 위험물 정리가 남습니다. 해외형 자료의 기능·교체 안내를 국내 판매 구성과 구분하고, 사물인식으로 모든 장애물을 피한다고 보장하지… | [VR50T95735W/SA 모델별 제품 자료](https://images.samsung.com/is/content/samsung/assets/nz/ha/guides/vac/VR50T95735W-SA_V2.pdf); [제트봇 브러시 이물질 제거 및 재조립 안내](https://www.samsungsvc.co.kr/solution/4048329) | 삼성 제트봇 AI VR50T95735W는 사물인식과 라이다 주행, 청정스테이션 자동 먼지비움, SmartThings 원격 제어와 홈 모니터링을 지원하는 흡입형 로봇청소기입니다. 사물 회피 결과는 형태와 주변 환경에 따라 달라질 수 있습니다. 대상: recommended / notRecommended | 새 산식 없음; 기존 자료의 모델·조사일 조건 유지 | 정확한 모델의 해외형 제품 자료는 본체 먼지통 0.2L, 청정스테이션 봉투 2.5L를 표기합니다. 필터 등급을 H13으로 확인하지 못했으므로 소모품 호환과 교체 가격은 모델번호로 확인해야 합니다. 도크를 포함한 월 전력량과 현재 시중가도 확보하지 못해 월 유지비 또는 가격 대비 성능 순위를 계산하지 않았습니다. | 수정 — 모델 조건에 맞춰 요약·추천 대상·관리 판단을 정렬 |
| WD25DB8995BZ [/products/samsung-bespoke-ai-combo-wd25](https://salimlab.kr/products/samsung-bespoke-ai-combo-wd25) | 이전 대상 안내: 히트펌프 저온 건조로 옷감을 보호하고 싶은 사용자 | `wd25-load-gap`, `wd25-course-limits`, `samsung-code-scope` | 삼성 비스포크 AI 콤보 세탁건조기. 세탁 25kg과 히트펌프 건조 15kg을 한 대에 담은 올인원 일체형으로, AI 맞춤세탁과 버블워시까지 갖춘 프리미엄 모델. 대상: recommended / notRecommended | WD25DB8995BZ 지원 페이지 연결 공용 설명서; 해당 모델 연결 설명서; 각 정확 모델 설명서 | 삼성 사양은 가열 세탁 정격 2,100W와 건조 정격 1,700W를 구분합니다. 이는 코스의 실제 사용량이 아니므로 분리형 건조기의 2,400W와 전기요금 순위를 정하지 않습니다. DV17A9720BV의 구매가를 확보하지 못해 분리형 합계와 가격 차이도 계산할 수 없습니다. 2026-08-24의 콤보 조사 가격은 당시 값으로 두고, 현재 견적에서 본체·호환 키트·시공·수거와 포함된 관리 항목을 나눠 비교하세요. | 수정 — 모델 조건에 맞춰 요약·추천 대상·관리 판단을 정렬 |
| KU27LSFM7AXXKR [/products/samsung-the-movingstyle](https://salimlab.kr/products/samsung-the-movingstyle) | 기존 모델별 분석 유지: QHD·120Hz 터치 화면을 실내에서 이동해 사용할 때의 후보입니다. 화면 5.2kg와 스탠드 포함 25.7kg을 구분하고, 최대 3시간 배터리와 별매 구성은 실제 사용 장소·일정에 맞춰 판단하세요. | [삼성 더 무빙스타일 상품 정보](https://prod.danawa.com/info/?pcode=98076260); [이동형 TV 비교 리뷰](https://dpg.danawa.com/news/view?boardSeq=63&listSeq=5942825) | 삼성 더 무빙스타일(KU27LSFM7AXXKR). 화면과 무빙 스탠드를 분리할 수 있는 27인치 QHD 이동식 터치 TV로, 120Hz 고주사율과 풀 모션 스탠드를 지원한다. 대상: recommended / notRecommended | 새 산식 없음; 기존 자료의 모델·조사일 조건 유지 | 고주사율과 터치 조작을 쓰면서 실내에서 이동시키려는 경우의 후보입니다. 주로 한 장소에서 큰 화면을 보거나 차량에 싣고 야외로 옮기려는 경우에는 27인치 화면과 25.7kg 스탠드가 필요한 이유부터 따져보세요. 동일 조건의 밝기·입력 지연·실제 배터리 시간을 측정하지 않아 화질이나 게임 반응성의 우열은 정하지 않습니다. | 유지 — 기존 모델별 판단과 조건 유지; 새 실측 없음 |
| SM-R630N [/products/samsung-galaxy-buds3-pro](https://salimlab.kr/products/samsung-galaxy-buds3-pro) | 이전 대상 안내: 충전 불량·이어팁 내구성 등 품질 이슈 보고에 민감한 사용자 | [삼성 갤럭시 버즈3 프로 상품 정보](https://prod.danawa.com/info/?pcode=59537216); [Galaxy Buds 3 Pro 가격·성능 분석](https://www.phonearena.com/news/galaxy-buds-3-pro-great-price_id180579) | 삼성 갤럭시 버즈3 프로(SM-R630N). 10.5mm 다이나믹과 6.1mm 평판형을 결합한 2-way 듀얼 드라이버, 적응형 ANC, 갤럭시 실시간 통역을 갖춘 삼성 생태계 최적화 하이엔드 버즈. 대상: recommended / notRecommended | 새 산식 없음; 기존 자료의 모델·조사일 조건 유지 | IP57은 정해진 시험 조건의 등급으로 물에 젖은 채 충전해도 된다는 뜻이 아닙니다. 삼성 연동이 꼭 필요한지와 착용 적합성, 실제 구매가를 기준으로 비교하세요. 초기 품질 이슈나 할인 폭을 모든 판매 개체의 상태로 일반화하지 않고, 구매처의 교환·서비스 조건을 확인하는 편이 구체적인 판단에 도움이 됩니다. | 수정 — 모델 조건에 맞춰 요약·추천 대상·관리 판단을 정렬 |
| T873MEE111 [/products/lg-dios-obje-4door-t873](https://salimlab.kr/products/lg-dios-obje-4door-t873) | 이전 대상 안내: 1~2인 가구 (오버스펙) | `fridge-manufacturer-registry`, `rf85-t873-label-gap` | LG 디오스 오브제컬렉션 4도어 냉장고. 870L 용량에 히든 버튼으로 여는 매직스페이스와 인버터 리니어 컴프레서를 갖춘 모델입니다. 공식 사양의 노크온 기능은 X입니다. 대상: recommended / notRecommended | 각 모델 제조사 표기와 2026-09-29 신고; 제조사 표시 RF85·T873 | LG 공식 사양 기준 월간소비전력량은 43.7kWh입니다. 리니어 인버터 컴프레서는 LG 핵심부품 보증 조건에 해당하면 10년 무상수리 대상이며, 해당 기간의 부품대와 수리비가 적용 범위에 포함됩니다. 보증은 실제 고장률이나 수명을 알려주지 않습니다. 압축기 교체의 유상 부품가와 기술료는 확인하지 못했습니다. 가격은 2026-08-24 조사 시점 기준이며 수시로 바뀝니다. | 수정 — 모델 조건에 맞춰 요약·추천 대상·관리 판단을 정렬 |
| WD523ACB [/products/lg-puricare-water-purifier-objet](https://salimlab.kr/products/lg-puricare-water-purifier-objet) | 이전 대상 안내: 필터 자가관리가 번거로워 관리·렌탈 서비스가 꼭 필요한 사용자 | [퓨리케어 오브제컬렉션 정수기 WD523ACB 제품 사양·필터 교체 주기](https://www.lge.co.kr/product/care-solutions/water-purifiers/wd523acb?modelId=MD10017831&pdpType=SUBSCRIPTION); [퓨리케어 오브제컬렉션 정수기 WD523ACB 제품 확인](https://prod.danawa.com/info/?pcode=21677045) | LG WD523ACB는 냉·온·정수를 제공하는 직수형 정수기입니다. 제조사가 안내하는 스테인리스 유로와 자동살균은 설계 기능이며 출수구·필터 관리를 대신하지 않습니다. 얼음은 지원하지 않으며 구매·구독의 포함 관리 항목을 확인해야 합니다. 대상: recommended / notRecommended | 새 산식 없음; 기존 자료의 모델·조사일 조건 유지 | LG 공식 사양의 정격입력은 2,820W이며 월 전력량을 뜻하지 않습니다. 공식 구독 케어 안내는 중금속9 흡착 필터를 6개월마다, 바이러스 클리어 필터를 12개월마다 교체한다고 표시합니다. 2026-10-01 정품 단품 정상가(중금속9 73,000원·바이러스 클리어 54,600원)를 적용한 1년치 필터 자재비는 200,600원이고 LG 회원할인가 기준으로는 190,400원입니다. 방문 교체비와 전기요금은 제외한 금액이며, 구독료에 필터 제공이 포함되는 계약에서는 이를 별도 비용으로 다시 합산하면 안 됩니다. | 수정 — 모델 조건에 맞춰 요약·추천 대상·관리 판단을 정렬 |
| RO585HGH [/products/lg-codezero-r5-robot](https://salimlab.kr/products/lg-codezero-r5-robot) | 이전 대상 안내: 정밀 매핑·카메라 AI 장애물 회피의 똑똑함을 최우선으로 보는 사용자 (로보락 상위 모델 고려) / 가성비를 최우선으로 보는 소비자 (샤오미·로보락 보급형) | [코드제로 R5 오브제컬렉션 로봇청소기 RO585HGH 제품 사양](https://www.lge.co.kr/product/vacuum-cleaners/ro585hgh); [코드제로 R5 오브제컬렉션 로봇청소기 RO585HGH 제품 확인](https://prod.danawa.com/info/?pcode=77208635) | LG 코드제로 R5 RO585HGH. 라이다 주행으로 흡입과 물걸레 청소를 함께 하고, 충전대에서 먼지를 자동으로 비웁니다. 대상: recommended / notRecommended | 새 산식 없음; 기존 자료의 모델·조사일 조건 유지 | 자동 먼지비움으로 먼지통을 비우는 수고를 덜 수 있으나 먼지봉투와 물걸레 관리는 남습니다. 소모품 비용은 사용 빈도와 함께 확인해야 합니다. | 수정 — 모델 조건에 맞춰 요약·추천 대상·관리 판단을 정렬 |
| S834MWW1D [/products/lg-dios-obje-sxs-s834](https://salimlab.kr/products/lg-dios-obje-sxs-s834) | 이전 대상 안내: 4도어는 부담스럽고 합리적 가격의 프리미엄 양문형을 찾는 가정 | `fridge-manufacturer-registry` | LG 디오스 오브제컬렉션 베이직 양문형 냉장고. 832L, 인버터 컴프레서, 2등급 효율. LG 공식 사양에서 노크온과 매직스페이스는 미지원입니다. 대상: recommended / notRecommended | 각 모델 제조사 표기와 2026-09-29 신고 | 공식 월간소비전력량은 모델별 사양을 기준으로 읽어야 합니다. 컴프레서 보증 조건은 실구매 모델의 보증서를 확인하세요. 이 모델에 리니어 컴프레서 보증을 적용할 근거는 없습니다. | 수정 — 모델 조건에 맞춰 요약·추천 대상·관리 판단을 정렬 |
| 27LX6TPGA [/products/lg-standbyme2](https://salimlab.kr/products/lg-standbyme2) | 기존 모델별 분석 유지: 27인치 QHD 분리 화면을 어디에 놓을지 정한 뒤 본체와 별매 거치 구성을 비교하세요. 60Hz와 최대 4시간 무선 재생은 각각 입력·운전 조건이며, 화면 분리만으로 네트워크와 충전 문제가 해결되지는 않습니다. | [LG 스탠바이미 2 상품 정보](https://prod.danawa.com/info/?pcode=75537515); [이동형 TV 비교 리뷰](https://dpg.danawa.com/news/view?boardSeq=63&listSeq=5942825) | LG 스탠바이미 2(27LX6TPGA). 화면을 원터치로 분리해 태블릿처럼 들고 다닐 수 있는 27인치 QHD 무선 이동식 TV로, 무빙휠 스탠드와 세로 모드를 지원한다. 대상: recommended / notRecommended | 새 산식 없음; 기존 자료의 모델·조사일 조건 유지 | 스탠바이미 2 Max의 32인치 4K보다 27인치 QHD가 설치 자리와 분리 화면 활용에 맞는지 먼저 판단하세요. 화면을 거의 분리하지 않는다면 분리 기능보다 화면 크기·거치 위치가 중요합니다. 동일 조건의 화질·배터리 수명 시험이 없어 선명도나 장기 내구성의 우열은 확인하지 못했습니다. | 수정 — 모델 조건에 맞춰 요약·추천 대상·관리 판단을 정렬 |
| 32LX6BPGA [/products/lg-standbyme2-max](https://salimlab.kr/products/lg-standbyme2-max) | 이전 대상 안내: 내장 스피커 사운드를 중시하는 사용자 | [LG 스탠바이미 2 Max 상품 정보](https://prod.danawa.com/info/?pcode=122632760); [스탠바이미 2 Max 32LX6BPGA 제품 사양](https://www.lge.co.kr/stan-by-me/32lx6bpga) | LG 스탠바이미 2 Max(32LX6BPGA)는 32인치 4K 이동식 TV입니다. 최대 배터리 안내는 4시간 30분이며 버추얼 11.1.2는 AI 음향 처리 채널입니다. 대상: recommended / notRecommended | 새 산식 없음; 기존 자료의 모델·조사일 조건 유지 | 32인치 4K가 필요한 장소와 시청 거리가 있을 때 검토할 모델입니다. 분리 화면을 자주 들어 옮기거나 120Hz가 필수인 용도라면 크기 확대만으로 문제가 해결되지 않습니다. 돌비 비전·버추얼 음향 지원을 실제 밝기·소리의 경쟁 우위로 바꾸지 않고, 사용 장소와 콘텐츠부터 맞추는 것이 이 비교의 기준입니다. | 수정 — 모델 조건에 맞춰 요약·추천 대상·관리 판단을 정렬 |
| 27LX5QKNA [/products/lg-standbyme-go](https://salimlab.kr/products/lg-standbyme-go) | 기존 모델별 분석 유지: 케이스 일체형 27인치 화면과 12.7kg 무게는 차량 운반·펼칠 자리와 함께 판단해야 합니다. 최대 3시간 배터리와 현장 네트워크 조건을 확인하세요. LG가 단종으로 표시하므로 재고·보증 시작일·배터리 서비스 조건도 구매 전… | `lg-go-touch` | LG 스탠바이미 Go(27LX5QKNA)는 케이스에 27인치 FHD 화면을 담은 이동식 TV입니다. 무게·전원·사용 환경을 확인해야 하며 방수 제품으로 가정하지 않습니다. 대상: recommended / notRecommended | 27LX5QKNA | 차량으로 옮기며 케이스를 펼쳐 쓰는 방식이 필요하면 Go의 구조가 선택 이유가 됩니다. 실내에서 바퀴로 이동하거나 화면만 분리할 계획이라면 스탠바이미 2와 목적이 다릅니다. 케이스·FHD·3시간이라는 조합을 실제 사용 일정에 맞추고, 캠핑이라는 이름만으로 날씨 노출이나 장시간 재생을 기대하지 마세요. | 수정 — 모델 조건에 맞춰 요약·추천 대상·관리 판단을 정렬 |
| TAC-08CSD/TPH11I [/products/tcl-tac-08csd-wall](https://salimlab.kr/products/tcl-tac-08csd-wall) | 기존 모델별 분석 유지: 표시 냉방 면적 18.7㎡에 맞는 공간과 설치 견적부터 확인하세요. 공단의 4등급·87.8kWh는 해당 실내기·실외기 조합의 신고 조건이며 실제 청구액은 아닙니다. 자동 내부 청소와 사용자 필터 관리는 구분해야 합니다. | [인버터 벽걸이 TAC-08CSD 제품 사양](https://prod.danawa.com/info/?pcode=51549299); [인버터 벽걸이 TAC-08CSD 제품 확인](https://www.tcl.com/kr/ko/air-conditioners/tac-08csd-tph11i) | TCL TAC-08CSD/TPH11I 인버터 벽걸이 에어컨. 제조사 표기 냉방 면적은 18.7㎡이며 4방향 기류와 7단계 풍속을 지원한다. 대상: recommended / notRecommended | 새 산식 없음; 기존 자료의 모델·조사일 조건 유지 | 한국에너지공단의 해당 조합 신고값은 4등급, 냉방기간 월간소비전력량 87.8kWh, 월간에너지비용 19,000원(1:1 기준)입니다. 이는 정해진 시험·산정 조건의 라벨 값입니다. 2026-08-24 조사한 제품 가격은 449,000원이었지만 현재 판매가나 설치 포함 총액은 아닙니다. 다른 모델과 비용을 비교하려면 냉방 면적·능력이 비슷한 제품의 신고값과 실제 설치 견적을 함께 봐야 하며, 등급 숫자만으로 몇 년 뒤 역전된다고 단정할 수 없습니다. | 수정 — 모델 조건에 맞춰 요약·추천 대상·관리 판단을 정렬 |
| TAC-12CSD/TPH11I [/products/tcl-tac-12csd-wall](https://salimlab.kr/products/tcl-tac-12csd-wall) | 이전 대상 안내: 캐리어보다 더 저렴한 옵션을 찾는 사용자 | [인버터 벽걸이 TAC-12CSD 제품 사양](https://prod.danawa.com/info/?pcode=53783573); [인버터 벽걸이 TAC-12CSD 제품 확인](https://www.tcl.com/kr/ko/air-conditioners/tac-12csd-tph11i) | TCL TAC-12CSD/TPH11I는 표시 냉방 면적 29.3㎡와 4방향 기류, 풍속 조절을 갖춘 인버터 벽걸이입니다. 대상: recommended / notRecommended | 새 산식 없음; 기존 자료의 모델·조사일 조건 유지 | 소비전력 1,160W에 에너지효율 4등급입니다. 6평형 모델과 효율 등급은 같지만 냉방능력이 3.5kW로 더 큽니다. 조사 시점 시중가 509,000원(2026-08-24 확인)으로 국산 동급보다 낮은 구간이면서 냉방 면적은 29.3㎡를 담당합니다. 다만 1등급 효율을 원하는 사용자에게는 4등급이 여전히 아쉬운 지점입니다. | 수정 — 모델 조건에 맞춰 요약·추천 대상·관리 판단을 정렬 |
| CTH06QBW [/products/haier-cth06qbw-wall](https://salimlab.kr/products/haier-cth06qbw-wall) | 이전 대상 안내: 전기요금에 민감한 사용자 (4등급) | [CTH06QBW 공식 사용설명서](https://www.haier.co.kr/board/board_manual/board_list.asp?scrID=0000000231&pageNum=3&subNum=7&ssubNum=1&page=1&s_string=CTH06QBW); [CTH06QBW 에너지소비효율 신고](https://eep.energy.or.kr/certification/certi_view_260.aspx?no=260240150) | 하이얼 CTH06QBW는 표시 냉방 면적 18.7㎡와 열교환기 셀프클리닝을 갖춘 인버터 벽걸이 에어컨입니다. 대상: recommended / notRecommended | 새 산식 없음; 기존 자료의 모델·조사일 조건 유지 | 공식 설명서의 정격 소비전력은 1,050W이며 한국에너지공단 신고는 4등급입니다. 정격 W에 사용 시간을 곱한 값은 인버터 운전의 실제 전력량이 아니므로 전기요금은 운전 조건과 함께 확인해야 합니다. 조사 시점 시중가 409,000원(2026-08-24 확인)으로 이 카탈로그의 벽걸이 중 가장 낮았습니다. | 수정 — 모델 조건에 맞춰 요약·추천 대상·관리 판단을 정렬 |
| CTH10QBW [/products/haier-cth10qbw-wall](https://salimlab.kr/products/haier-cth10qbw-wall) | 이전 대상 안내: 캐리어보다 더 저렴한 옵션을 원하는 소비자 | [CTH10QBW 공식 사용설명서](https://www.haier.co.kr/board/board_manual/board_list.asp?scrID=0000000231&pageNum=3&subNum=7&ssubNum=1&page=1&s_string=CTH10QBW); [CTH10QBW 에너지소비효율 신고](https://eep.energy.or.kr/certification/certi_view_260.aspx?no=260240148) | 하이얼 CTH10QBW는 표시 냉방 면적 33㎡의 셀프클리닝 인버터 벽걸이입니다. 실제 공간과 배관·실외기 설치 조건을 함께 확인해야 합니다. 대상: recommended / notRecommended | 새 산식 없음; 기존 자료의 모델·조사일 조건 유지 | 공식 설명서의 정격 소비전력은 1,500W이며 한국에너지공단 신고는 6평형과 같은 4등급입니다. 조사 시점 시중가 559,000원(2026-08-24 확인)으로 33㎡를 담당하는 벽걸이 중에서는 낮은 구간입니다. 정격 W만으로 두 모델의 실제 전기요금을 비교할 수 없습니다. | 수정 — 모델 조건에 맞춰 요약·추천 대상·관리 판단을 정렬 |
| TP07 [/products/dyson-pure-cool-tp07](https://salimlab.kr/products/dyson-pure-cool-tp07) | 이전 대상 안내: 아이·반려동물이 있어 날개 선풍기가 위험한 가정 | `dyson-shared-filter` | 다이슨 퓨어쿨 타워팬. 날개 없는 에어 멀티플라이어 송풍에 HEPA H13 공기청정을 결합한 프리미엄 선풍기. 대상: recommended / notRecommended | TP07·HP09 공통 HEPA+탄소 필터 | 보관 조사에서 정품 965432-01 HEPA+탄소 필터가 TP07·HP09에 호환되고 2026-09-30 단품가는 59,000원입니다. 제조사 FAQ의 하루 12시간·12개월 교체 권장을 적용하면 해당 조건의 교체 자재비 예산이며 현재 가격이나 실제 교체 횟수는 아닙니다. 정격 W를 실제 월 사용량으로 바꾸지 말고 사용 시간·단계·필터 알림을 함께 확인하세요. 송풍·청정 목적이라면 공통 필터 관리와 원하는 바람 조건을 먼저 맞추세요. | 수정 — 모델 조건에 맞춰 요약·추천 대상·관리 판단을 정렬 |
| HP09 [/products/dyson-hot-cool-hp09](https://salimlab.kr/products/dyson-hot-cool-hp09) | 이전 대상 안내: 아이·반려동물이 있어 날개·노출 열선이 위험한 가정 | `dyson-shared-filter` | 다이슨 퓨어 핫앤쿨 HP09. 에어 멀티플라이어 송풍에 히터와 HEPA H13 공기청정을 더한 송풍·난방·청정 타워팬. 포름알데히드를 분해하는 촉매 필터를 탑재했다. 대상: recommended / notRecommended | TP07·HP09 공통 HEPA+탄소 필터 | 보관 조사에서 정품 965432-01 HEPA+탄소 필터가 TP07·HP09에 호환되고 2026-09-30 단품가는 59,000원입니다. 제조사 FAQ의 하루 12시간·12개월 교체 권장을 적용하면 해당 조건의 교체 자재비 예산이며 현재 가격이나 실제 교체 횟수는 아닙니다. 정격 W를 실제 월 사용량으로 바꾸지 말고 사용 시간·단계·필터 알림을 함께 확인하세요. HP09의 촉매 필터 서비스와 난방 전력은 이 자재비에 포함되지 않습니다. | 수정 — 모델 조건에 맞춰 요약·추천 대상·관리 판단을 정렬 |
| AC-M16-SC [/products/xiaomi-smart-air-purifier-4](https://salimlab.kr/products/xiaomi-smart-air-purifier-4) | 기존 모델별 분석 유지: AC-M16-SC의 면적 28~48㎡·PM CADR 400㎥/h와 필터 여재 제거율은 다른 시험값입니다. 방 구조·오염원을 확인하고, 정품 RFID 인식과 실제 필터 교체 비용을 함께 판단하세요. PM2.5 표시만으로 모든 가… | `xiaomi-cadr-volume`, `xiaomi-filter-scope` | 샤오미 스마트 공기청정기 4(AC-M16-SC). 제조사는 3중 구조의 자체 고효율 필터, 유효 청정 면적 28~48㎡, PM CADR 400㎥/h를 표기합니다. OLED 화면의 PM2.5 표시와 Xiaomi Home 앱 제어를 지원합니다. 면적과 CADR은 제조사가 명시한 시험 조건의 수치입니다. 대상: recommended / notRecommended | AC-M16-SC; AC-M16-SC | 필터 수명은 사용 환경에 따라 달라져 6~12개월 안내만으로 연간 교체 비용을 고정할 수 없습니다. 정품 필터의 RFID를 본체가 인식하면 필터 수명은 자동으로 인식되며, 제조사 FAQ는 교체 뒤 수동 초기화가 필요 없다고 안내합니다. 정품 인식 메시지가 남으면 필터 장착 상태와 정품 여부를 확인하고 전원을 10초간 분리한 뒤 다시 켜 보세요. 해결되지 않으면 공식 서비스에 문의해야 합니다. 조사 시점 가격 277,200원은 2026-08-24 기준으로 현재 구매가나 필터 비용을 뜻하지 않습니다. | 유지 — 기존 모델별 판단과 조건 유지; 새 실측 없음 |
| CHPI-7400N [/products/coway-handpick-water-purifier-compact](https://salimlab.kr/products/coway-handpick-water-purifier-compact) | 기존 모델별 분석 유지: CHPI-7400N은 냉·온·정수·얼음과 냉수·얼음 저장부를 함께 갖췄습니다. 설치 깊이·통풍과 저장부 관리, 하루 10L 기준 국내 4개월 필터 조건을 확인하세요. 완제품 인증 항목과 구매·구독 관리 범위를 맞춰 비교해야 합… | [아이콘 얼음정수기 CHPI-7400N 사용설명서](https://www.coway.com/core/product/fmanual/download/274); [아이콘 얼음정수기 CHPI-7400N 제품 확인](https://www.coway.com/product/detail?prdno=1148) | 코웨이 아이콘 얼음정수기. CHPI-7400N은 냉수·온수·정수·얼음을 제공하며 나노트랩과 플러스이노센스 필터를 사용한다. 대상: recommended / notRecommended | 새 산식 없음; 기존 자료의 모델·조사일 조건 유지 | 코웨이 본사 선택 화면은 일시불 구매에도 방문관리 방식과 1년 무상 서비스 조건을 함께 표시합니다. 색상·관리 방식·계약 시점에 따라 가격 조건이 달라지므로 실제 계약 옵션을 확인해야 합니다. 본사 공개 소모품 목록에서는 이 모델의 필터 단품가와 1년 이후 멤버십 요금을 확인하지 못했습니다. 그래서 4개월마다 필요한 필터 세트의 연간 비용이나 일시불과 렌탈의 총비용 차이는 현재 공개 근거로 계산할 수 없습니다. | 유지 — 기존 모델별 판단과 조건 유지; 새 실측 없음 |
| DN2H160-IWK [/products/winix-posong-dehumidifier-16l](https://salimlab.kr/products/winix-posong-dehumidifier-16l) | 이전 대상 안내: 30만원대 가성비 제습기를 찾는 자취생·신혼부부 / 소형~대형(중대형 거실 포함) 주거에서 실내 빨래 건조 보조가 필요한 가정 | `winix-tank-ratio` | 위닉스 DN2H160-IWK 제습기. DN2 계열 설명서에 자동·연속제습, 강·약풍, 집중건조 키트, 연속배수와 자동 제상 기능이 안내된다. 대상: recommended / notRecommended | 27℃·상대습도 60% 제습 시험 | 정확한 DN2H160-IWK의 한국에너지공단 신고값은 제습효율 2.83L/kWh, 1시간 소비전력량 255Wh, 효율 1등급입니다. DN2 계열 설명서의 정격 소비전력 275W와는 측정 기준이 다르므로 같은 숫자로 바꾸어 쓰지 않습니다. 공단 표의 월간 에너지 비용 7,000원도 신고 조건의 값으로, 실제 전기요금은 가동 시간과 실내 환경에 따라 달라집니다. 384,000원은 2026-08-24 조사 가격이므로 현재 판매가로 취급하지 마세요. | 수정 — 모델 조건에 맞춰 요약·추천 대상·관리 판단을 정렬 |
| DWA-81R0D [/products/skmagic-touchon-dishwasher-dwa81](https://salimlab.kr/products/skmagic-touchon-dishwasher-dwa81) | 이전 대상 안내: 고온 살균·자동 건조로 유아 식기·이유식 용기 위생을 챙기고 싶은 집 | [터치온 식기세척기 12인용 DWA81 제품 사양](https://m.manual.skmagic.com/2019/model/DWA/DWA81R0D00SL/Manual.htm) | SK매직 DWA-81R0D 12인용 식기세척기. 공식 공용 설명서에 고온 세척, 자동 문열림과 일반·강력 코스의 열풍건조 추가 기능이 안내됩니다. 대상: recommended / notRecommended | 새 산식 없음; 기존 자료의 모델·조사일 조건 유지 | 공식 공용 설명서의 최대 소비전력은 2,150W입니다. 이 정격값만으로 코스 1회의 전력량이나 전기요금을 계산할 수 없고, 열풍건조를 추가한 경우의 소비전력량도 확인되지 않았습니다. 설치비와 구매·렌탈 비용은 실제 판매 조건으로 비교하세요. | 수정 — 모델 조건에 맞춰 요약·추천 대상·관리 판단을 정렬 |
| WPU-A710C [/products/skmagic-allin-water-purifier-wpu](https://salimlab.kr/products/skmagic-allin-water-purifier-wpu) | 기존 모델별 분석 유지: WPU-A710C는 냉·온·정수와 전문 기사 필터·피팅·튜빙 관리를 안내합니다. 본체 가격 외에 방문 주기·공임·필터 포함 여부를 확인하세요. 냉수 미지근함과 실제 누수의 조치는 다르므로 누수 때는 차단·상담을 우선합니다. | [올인원 직수 냉온정수기 WPU-A710C 제품 사양](https://qr.skmagic.com/2019/model/WPU/WPUA710CRERO/Manual.htm) | SK매직 올인원 직수 냉온정수기. 냉·온·정수에 직수 코크를 더한 올인원 구성에 세디먼트·블록카본 복합·나노테크 PAC 3단계 필터를 사용합니다. 필터·피팅·튜빙 교체는 전문 기사에게 의뢰하도록 안내됩니다. 대상: recommended / notRecommended | 새 산식 없음; 기존 자료의 모델·조사일 조건 유지 | 총 정격 소비전력은 2,955W이고 온수는 2,900W입니다. 이 정격은 월 사용량이 아닙니다. 정품 필터 가격과 방문 교체 비용을 확인하지 못해 총 유지비 비교는 보류합니다. | 수정 — 모델 조건에 맞춰 요약·추천 대상·관리 판단을 정렬 |
| CDW-A0611TW [/products/cuckoo-dishwasher-table-cdw61](https://salimlab.kr/products/cuckoo-dishwasher-table-cdw61) | 기존 모델별 분석 유지: CDW-A0611TW는 급배수 연결과 문 개방 깊이 812mm를 확인할 6인용입니다. 큰 식기의 실제 적재를 확인하고 E4는 급수 E1과 다르게 차단·서비스 문의를 따르세요. 표준 코스 8.3L와 1,170W 정격은 회당 실제… | [6인용 식탁형 식기세척기 CDW-A0611TW 제품 사양](https://prod.danawa.com/info/?pcode=10591083); [CDW-A0611TS·TW 사용설명서, 인쇄 9·15·25·32쪽](https://www.cuckoo.co.kr/upload_cuckoo/_bo_rep/manual/200424%3Dz0383-0082a0%20rev.1_cdw-a0611t.pdf) | 쿠쿠 CDW-A0611TW 6인용 식탁형 식기세척기. 공식 설명서는 급수호스·중간밸브를 통한 수돗물 연결과 배수호스 설치를 안내합니다. 표준 코스는 세척 55℃·헹굼 75℃, 표준 코스 물 사용량은 8.3L로 표기합니다. 대상: recommended / notRecommended | 새 산식 없음; 기존 자료의 모델·조사일 조건 유지 | 쿠쿠 공용 설명서의 물 소비량은 표준 코스 1회 기준 8.3L입니다. 소비전력 1,170W는 코스 1회의 전력량이 아니므로 이 값만으로 전기요금을 계산할 수 없습니다. 공식 효율등급 라벨 유무와 구매 시점 가격도 따로 확인하세요. | 수정 — 모델 조건에 맞춰 요약·추천 대상·관리 판단을 정렬 |
| S8 Pro Ultra [/products/roborock-s8-proultra](https://salimlab.kr/products/roborock-s8-proultra) | 기존 모델별 분석 유지: S8 Pro Ultra는 음파진동 물걸레와 자동 세척·건조 도크를 사용하지만 물통·봉투·브러시 관리는 남습니다. 6000Pa를 털 제거율로 바꾸지 않고, 도크 관리 동선과 실제 소모품 비용을 확인해야 합니다. | [S8 프로 울트라 로봇청소기 가격 정보](https://prod.danawa.com/info/?pcode=19522775); [S8 Pro Ultra 모델별 오류 안내](https://help.roborock.com/us/product/s8-pro-ultra-message?category=troubleshooting) | 로보락 S8 프로 울트라는 6000Pa HyperForce 흡입과 VibraRise 2.0 음파진동 물걸레를 갖춘 로봇청소기입니다. 도크는 자동 먼지비움·물걸레 세척·건조를 지원하며, 물통과 먼지봉투는 사용 상태에 따라 관리해야 합니다. Reactive 3D 장애물 회피와 PreciSense 라이다를 지원합니다. 대상: recommended / notRecommended | 새 산식 없음; 기존 자료의 모델·조사일 조건 유지 | 본체 정격만으로 도크를 포함한 월 전기요금을 판단할 수 없습니다. S8 Pro Ultra 소유자의 7일 전력계 기록에는 도크와 충전을 합친 콘센트 사용량 약 1.9kWh가 보고됐지만, 한 가정의 사용 패턴이므로 국내 제품의 월 비용으로 일반화하지 않습니다. 먼지봉투·필터·브러시 교체 비용과 실제 구매가도 함께 확인하세요. | 수정 — 모델 조건에 맞춰 요약·추천 대상·관리 판단을 정렬 |
| Qrevo Curv [/products/roborock-qrevo-curv](https://salimlab.kr/products/roborock-qrevo-curv) | 이전 대상 안내: 문턱·단차가 많은 구옥·복층 구조 거주자 / 반려동물 털·머리카락 청소 부담이 큰 다층·중대형 아파트 거주자 | `curv-dock-clearance`, `curv-threshold` | 로보락 Qrevo Curv는 제조사 최대 18,500Pa 흡입, DuoDivide 메인 브러시, 듀얼 회전 물걸레를 갖춘 로봇청소기입니다. AdaptiLift 섀시는 제조사 시험에서 단일 문턱 최대 3cm, 이중 문턱 최대 4cm를 넘도록 설계됐습니다. 다기능 도크는 자동 먼지비움·75℃ 온수 물걸레 세척·열풍건조를 지원합니다. 실제 통과 높이와 청소 결과는 문턱 형태·바닥재에 따라 달라집니다. 대상: recommended / notRecommended | Qrevo Curv 물탱크형; 18,500Pa는 완충·Max+, IEC 62885-2:2021/5.11(**2차 정정: 오기. kr 원문 각주 4는 오리피스 0mm 단일 팬 정압**); 문턱 시험과 별개 | 도크의 온수 세척·온풍건조와 본체 충전을 포함한 월 전력 사용량은 확인하지 못했습니다. 먼지봉투·필터·물걸레 같은 소모품의 교체 주기는 사용 빈도에 따라 달라집니다. 이 모델의 현재 시중가와 국내 서비스 접근성도 지역·판매처에 따라 확인해야 하며, 과거 정가만으로 장기 보유 비용을 계산할 수 없습니다. | 수정 — 모델 조건에 맞춰 요약·추천 대상·관리 판단을 정렬 |
| A3063 / A3064 / A3122 [/products/apple-airpods-pro3](https://salimlab.kr/products/apple-airpods-pro3) | 이전 대상 안내: 동급 최강 노이즈 캔슬링을 원하는 사용자 | [에어팟 프로 3 제품 페이지](https://www.apple.com/kr/airpods-pro/); [에어팟 프로 3 기술 사양](https://www.apple.com/kr/airpods-pro/specs/) | 애플 에어팟 프로 3세대(A3063·A3064·A3122, USB-C). H2 칩 기반으로 1세대 대비 최대 4배(에어팟 프로 2 대비 최대 2배, 애플 공식 표기) 강화된 노이즈 캔슬링에 심박수 센서·실시간 통역·청력 보조까지 더한 애플 생태계 완성형 이어폰. 대상: recommended / notRecommended | 새 산식 없음; 기존 자료의 모델·조사일 조건 유지 | 이어팁의 착용과 교체 가능 여부, 한쪽 유닛·케이스의 서비스 비용을 본체 구매가와 별도로 확인하세요. IP57을 수영·젖은 채 충전 가능으로 해석하지 않습니다. Apple 연동이나 건강 기능을 실제로 쓰지 않는다면 기능 목록보다 착용·전환 방식·배터리 조건을 다른 이어폰과 비교하는 편이 낫습니다. | 수정 — 모델 조건에 맞춰 요약·추천 대상·관리 판단을 정렬 |
| WF-1000XM5 [/products/sony-wf-1000xm5](https://salimlab.kr/products/sony-wf-1000xm5) | 기존 모델별 분석 유지: 폼 팁의 착용·교체 조건과 재생 기기의 코덱 지원을 먼저 확인하세요. 두 기기 연결은 오디오 혼합이 아니며 ANC 음악 8시간과 통신 6시간은 다른 조건입니다. 앱·펌웨어와 연결 기기의 지원 설정을 확인하세요. | `sony-two-devices` | 소니 WF-1000XM5는 8.4mm Dynamic Driver X와 QN2e·V2 프로세서, ANC, LDAC와 두 기기 연결을 지원하는 무선 이어폰입니다. 대상: recommended / notRecommended | WF-1000XM5 | 소니 사양의 ANC 사용 음악 재생은 이어폰 최대 8시간이며 케이스 충전 합계와 구분해야 합니다. 음악과 통화의 시험 조건은 다르므로 8시간 회의를 보장하는 값으로 쓰지 않습니다. 팁·유닛·배터리 서비스의 비용과 구매처 보증을 확인하고 해외 할인 가격을 국내 현재가로 대체하지 마세요. | 유지 — 기존 모델별 판단과 조건 유지; 새 실측 없음 |
| A3957 [/products/anker-soundcore-liberty5](https://salimlab.kr/products/anker-soundcore-liberty5) | 이전 대상 안내: 10만원 이하에서 ANC·LDAC를 모두 원하는 실속형 사용자 / 배터리 사용시간이 긴 제품을 원하는 사용자 | `liberty5-dual-runtime` | 앤커 사운드코어 Liberty 5(A3957)는 ANC 3.0, LDAC, 두 기기 연결과 Dolby Audio를 지원합니다. 최대 48시간은 ANC를 끈 케이스 포함 시간이며 기능 조합에 따라 재생 시간이 달라집니다. 대상: recommended / notRecommended | Dual Connections + LDAC 또는 Dolby Sound | 10만원 이하라는 과거 가격대만으로 가성비를 확정하지 않습니다. 현재 국내 구매가와 정식 서비스·이어팁 교체 조건을 확인하세요. 두 기기 연결과 LDAC의 동시 사용이 필요하면 해당 조건의 4시간 안내를 감당할 수 있는지, 긴 연속 통화가 우선이면 다른 배터리 조건을 더 중요하게 볼지 판단하세요. | 수정 — 모델 조건에 맞춰 요약·추천 대상·관리 판단을 정렬 |
| HT08 [/products/qcy-melobuds-pro](https://salimlab.kr/products/qcy-melobuds-pro) | 이전 대상 안내: 4만원대에서 ANC·LDAC를 경험하고 싶은 사용자 | [QCY 멜로버즈 프로 상품 정보](https://prod.danawa.com/info/?pcode=71645780); [멜로버즈 프로 제품 확인](https://ylshop.co.kr/product/qcy-ht08-멜로버즈-프로-플러스-블루투스-이어폰-노이즈캔슬링-블랙/977/category/24/display/1/) | QCY MeloBuds Pro(HT08)는 12mm 드라이버, LDAC, ANC와 저지연 모드를 갖춘 무선 이어폰입니다. 국내 판매 구성·지원 기기와 제조사의 시험 조건을 확인해야 합니다. 대상: recommended / notRecommended | 새 산식 없음; 기존 자료의 모델·조사일 조건 유지 | 국내 보증 접수처, 앱 설정과 교체용 팁, 정확한 충전 구성을 확인한 뒤 현재 구매가를 비교하세요. 두 기기 연결이 필요하면 실제 앱의 지원 설정을 확인하고, LDAC 등과의 동시 사용 조건을 제조사 안내로 확인하세요. 실측 차음·통화 결과 없이 저가형이라 성능이 나쁘거나 가격 대비 우수하다고 단정하지 않습니다. | 수정 — 모델 조건에 맞춰 요약·추천 대상·관리 판단을 정렬 |

## 블로그 18개 결과

| 페이지 / 독자 질문 | 결과·실질 판단 | 근거 범위 |
| --- | --- | --- |
| [/blog/airpods-pro3-review-meta-analysis](https://salimlab.kr/blog/airpods-pro3-review-meta-analysis) 에어팟 프로 3을 몇 달씩 사용하거나 직접 측정한 리뷰들은 무엇에 동의했고, 어디에서 서로 다른 결론을 냈나요? | 유지: 직접 사용·측정 근거를 공개한 전문 리뷰 7편을 같은 여섯 축으로 분석하며 착용감 합의 4대3 및 표본의 한계를 이미 분리한다. | [AirPods Pro 3: Better today than at launch](https://9to5mac.com/2026/04/14/airpods-pro-3-better-today-than-at-launch-video/); [AirPods Pro 3 long-term review: Three months …](https://appleinsider.com/articles/26/03/06/airpods-pro-3-long-term-review-apples-latest-earbuds-are-great-with-one-asterisk) |
| [/blog/fridge-monthly-kwh-measurement](https://salimlab.kr/blog/fridge-monthly-kwh-measurement) 냉장고 라벨에 "월간 소비전력량 43.0kWh"라고 적혀 있으면 우리 집 전기요금 고지서에도 그만큼 잡히나요? 같은 1등급인데 왜 kWh 숫자는 제품마다 다른가요? | 제조사 43.0/53.0/43.7/52.3과 신고 41.38/51.01/41.95/51.64를 구분. 같은 이름으로 상충 수치를 섞지 않고 RS84 과거값 범위를 표시. | [효율관리기자재 운용규정 — [별표 1] 전기냉장고 측정방법·등급 기준, [별표 1…](https://www.law.go.kr/행정규칙/효율관리기자재운용규정); [비스포크 4도어 RF85C90D1AP 제품 사양](https://www.samsung.com/sec/support/model/RF85C90D1AP/) |
| [/blog/samsung-washer-check-codes](https://salimlab.kr/blog/samsung-washer-check-codes) 세탁기 화면에 4C나 5C, UE 같은 글자가 뜨고 멈췄습니다. 당장 서비스를 불러야 하나요, 아니면 제가 해볼 수 있는 게 있나요? | WF24 표시 문구와 WD25 5C/LC 등 정확 모델 설명서 범위 분리. 누수·과열 및 반복 재운전의 판단 한계 유지. | [WF24A9500KE 연결 설명서 — LCD 점검 문구](https://downloadcenter.samsung.com/content/UM/202304/20230407100730025/Drum_WF8000AK_WF21A9400_WF24A9500_9501.pdf); [WD25DB8995BZ 연결 설명서 — 이불 4kg·울 2kg·배수 필터](https://downloadcenter.samsung.com/content/UM/202608/20260818083830741/OID76616_IB_T-PJT_WD8000D-AD_7LCD_KO_260814.pdf) |
| [/blog/dishwasher-water-per-person](https://salimlab.kr/blog/dishwasher-water-per-person) 식기세척기 스펙표의 "물 사용량 16.4L"는 손설거지보다 정말 적은 건가요? 12인용과 6인용 중 어느 쪽이 물을 아끼는지 이 숫자로 비교할 수 있나요? | 유지: 공개 시험의 코스·제품 시점과 용량 차이를 분리하고 인당 비례 소비로 일반화하지 않는 기존 분석이 유효하다. | [효율관리기자재 운용규정 — [별표 1] 45. 식기세척기 정격 용량·시험 조건·등…](https://www.law.go.kr/행정규칙/효율관리기자재운용규정); [SK매직 터치온 식기세척기 DWA-81R0D 사용설명서](https://m.manual.skmagic.com/2019/model/DWA/DWA81R0D00SL/Manual.htm) |
| [/blog/standbyme-go-vs-2-vs-max](https://salimlab.kr/blog/standbyme-go-vs-2-vs-max) 스탠바이미를 사려는데 Go·2·2 Max 중 뭘 골라야 하나요? 이름이 다 스탠바이미라 뭐가 다른지 모르겠습니다. | Go 터치/세로/테이블 모드, Max 실제 10W 2채널과 가상 11.1.2 분리. 정격과 측정 전력의 비교 조건 명시. | [스탠바이미 Go 27LX5QKNA 제품 사양](https://www.lge.co.kr/stan-by-me/27lx5qkna); [스탠바이미 2 27LX6TPGA 제품 사양](https://www.lge.co.kr/stan-by-me/27lx6tpga) |
| [/blog/sony-xm5-vs-qcy-melobuds](https://salimlab.kr/blog/sony-xm5-vs-qcy-melobuds) 4만원대 QCY 멜로버즈 프로도 LDAC와 노이즈 캔슬링을 지원한다는데, 23만원 주고 소니 WF-1000XM5를 살 이유가 있나요? | Sony 두 기기 연결의 음악 전환 절차를 바로잡고 코덱 제한 및 후속 모델로 인한 가격 가치 단정을 제거. | [Sony WF-1000XM5 두 기기 연결·재생 전환 안내](https://helpguide.sony.net/mdr/2963/v1/en/contents/TP1001106282.html); [QCY HT08 공식 글로벌 제품 사양](https://www.qcy.com/products/qcy-melobuds-pro) |
| [/blog/dehumidifier-liters-measurement](https://salimlab.kr/blog/dehumidifier-liters-measurement) 제습기 16L짜리를 사면 우리 집에서도 하루에 물 16리터가 나오나요? 10L 모델과는 얼마나 차이가 나는 건가요? | 16L 시험 조건과 4.5L 물통을 연결해 배수 동선을 판단. 실제 비움 횟수·미확보 적용면적·임의 월요금과 분리. | [위닉스 DN2 계열 설명서 — 4.5L 물통·시험 조건·제상](https://kr.object.ncloudstorage.com/w2r-commerce-winix/USEMANUAL/202507/250722111846926-78c8424e1fa84ce2bc3fd07992f4d6f2.pdf); [DN2H160-IWK 정확한 모델 효율 신고](https://eep.energy.or.kr/certification/certi_view_145.aspx?no=283190073) |
| [/blog/air-purifier-area-numbers](https://salimlab.kr/blog/air-purifier-area-numbers) 공기청정기 상세페이지의 적용면적 몇 평, CADR 몇 ㎥/h는 뭘 보고 판단해야 하나요? 국산 제품과 샤오미의 숫자를 그대로 비교해도 되나요? | CADR 400과 40㎡·높이2.4m의 공기 부피 계산 14.4분을 제시하되 방 청소 완료시간으로 해석하지 않음. 자체 고효율 필터와 H13 구분. | [효율관리기자재 운용규정 — 공기청정기 표시 항목·1㎡당 소비전력 정의](https://www.law.go.kr/행정규칙/효율관리기자재운용규정); [공기청정기 품질비교시험(비교공감 제2019-15호)](https://www.consumer.go.kr/user/ftc/consumer/cnsmrBBS/79/selectInfoRptDetail.do?infoId=A1078051) |
| [/blog/bespoke-rf85-vs-dios-t873](https://salimlab.kr/blog/bespoke-rf85-vs-dios-t873) 삼성 비스포크 4도어와 LG 디오스 오브제 4도어, 스펙이 거의 같은데 왜 가격이 다르고 무엇을 기준으로 골라야 하나요? | 표시 월전력 43.0/43.7의 연간 차이 8.4와 공단 신고 차이를 분리. 수납·문 열림·설치 견적 중심의 구매 판단 유지. | [비스포크 4도어 RF85C90D1AP 제품 사양](https://www.samsung.com/sec/support/model/RF85C90D1AP/); [디오스 오브제컬렉션 4도어 T873MEE111 제품 사양](https://www.lge.co.kr/product/refrigerators/t873mee111) |
| [/blog/fridge-4door-vs-side-by-side](https://salimlab.kr/blog/fridge-4door-vs-side-by-side) 4도어와 양문형 중 무엇을 골라야 하나요? 양문형이 더 작고 저렴하다는 말은 사실인가요? | 문짝 구성만으로 깊이/용량/전력 우열을 단정하지 않고 실측 통로·문 열림·모델별 설치 여유로 비교. | [비스포크 4도어 RF85C90D1AP 제품 사양](https://www.samsung.com/sec/support/model/RF85C90D1AP/); [삼성 양문형 RS84B5061M9 제품 사양](https://www.samsung.com/sec/support/model/RS84B5061M9/) |
| [/blog/wall-aircon-samsung-vs-tcl-vs-haier](https://salimlab.kr/blog/wall-aircon-samsung-vs-tcl-vs-haier) 벽걸이 에어컨을 40만원대 수입 브랜드로 살까요, 80만원 가까운 삼성으로 살까요? 가격 차이만큼 값을 하나요? | 표시 면적과 일사·단열·닫을 공간을 대조. 서향/거실이라는 이유로 일괄 상위 체급을 권하거나 정격을 요금으로 바꾸지 않음. | [삼성 윈드프리 벽걸이 AR07A9170HCN 제품 사양](https://www.samsung.com/sec/support/model/AR07A9170HCN/); [삼성 윈드프리 AR07A9170HCN 최저가](https://prod.danawa.com/info/?pcode=122688519) |
| [/blog/washer-dryer-combo-vs-separate](https://salimlab.kr/blog/washer-dryer-combo-vs-separate) 세탁기와 건조기를 따로 사야 하나요, 아니면 세탁부터 건조까지 되는 일체형 한 대로 끝내야 하나요? | 25kg 세탁→15kg 건조의 10kg 덜기, 이불4kg 한 장/울2kg 및 겹쳐 처리하는 동선 비교. 분리형의 절대 성능 우위는 미확보. | [WD25DB8995BZ 연결 설명서 — 이불 4kg·울 2kg·배수 필터](https://downloadcenter.samsung.com/content/UM/202608/20260818083830741/OID76616_IB_T-PJT_WD8000D-AD_7LCD_KO_260814.pdf); [DV17A9720BV 연결 설명서 — 이불 4kg·설치 온도](https://downloadcenter.samsung.com/content/UM/202504/20250401094234705/WM0013_IB_DV8700TK_DV19A9740_KO_250313.pdf) |
| [/blog/airpods-pro3-vs-buds3-pro-vs-liberty5](https://salimlab.kr/blog/airpods-pro3-vs-buds3-pro-vs-liberty5) 무선 이어폰을 고를 때 에어팟 프로 3, 갤럭시 버즈3 프로, 사운드코어 리버티5 중 무엇을 사야 하나요? 4배 가격 차이만큼 값을 하나요? | Liberty 5 이중연결+LDAC/Dolby 약4시간과 일반 조건8시간 분리. Galaxy 자동 전환과 일반 두 기기 연결 구분. | [Liberty 5 Dual Connections와 LDAC/Dolby 동시 사용·…](https://service.soundcore.com/article-description/Can-I-use-Dual-Connections-and-LDAC-or-Dolby-Sound-simultaneously); [에어팟 프로 3 기술 사양](https://www.apple.com/kr/airpods-pro/specs/) |
| [/blog/portable-tv-standbyme-vs-movingstyle](https://salimlab.kr/blog/portable-tv-standbyme-vs-movingstyle) LG 스탠바이미와 삼성 더 무빙스타일 중 무엇을 사야 하나요? 이동식 TV는 실제로 얼마나 이동할 수 있나요? | 전체/분리 무게, 앱별 터치 및 실제/가상 채널 분리. 전력 열의 정격/측정 조건을 명시하고 Max4.5시간을 일률 감산하지 않음. | [LG 27lx5qkna 공식 모델 사양](https://www.lge.co.kr/stan-by-me/27lx5qkna); [LG 27lx6tpga 공식 모델 사양](https://www.lge.co.kr/stan-by-me/27lx6tpga) |
| [/blog/robot-vacuum-suction-numbers](https://salimlab.kr/blog/robot-vacuum-suction-numbers) 로봇청소기 흡입력 Pa 숫자가 3배 차이 나면 청소도 3배 잘 되나요? 삼성처럼 W로 적힌 제품과는 어떻게 비교하나요? | Pa와 W의 비교 불가 및 시험 조건, Curv 단일3cm/이중4cm, 도크0.9m높이/0.46m폭/1.2m앞 여유를 활용. 회전형 절대 우위 단정 제거. | [Qrevo Curv 공식 설명서 — 도크 확보 공간](https://support.roborock.com/hc/en-us/article_attachments/46138473099289); [Qrevo Curv 제품 사양 (흡입력·물걸레·도크·섀시·치수)](https://kr.roborock.com/pages/roborock-qrevo-curv) |
| [/blog/water-purifier-lg-vs-coway-vs-skmagic](https://salimlab.kr/blog/water-purifier-lg-vs-coway-vs-skmagic) 이 세 정수기는 온수와 얼음, 필터 관리 방식이 어떻게 다른가요? | 유지: 온수·얼음·정품 필터 코드·가격 관측일·인증 범위 및 미확보 타사 비용을 이미 구분한다. | [LG WD523ACB 제품 사양·필터 교체 안내](https://www.lge.co.kr/product/care-solutions/water-purifiers/wd523acb?modelId=MD10017831&pdpType=SUBSCRIPTION); [LG 중금속9 흡착 필터 AGM30040101 가격·적용 모델](https://www.lge.co.kr/care-accessories/water-purifier/agm30040101) |
| [/blog/dishwasher-12-vs-6-countertop](https://salimlab.kr/blog/dishwasher-12-vs-6-countertop) 자취·신혼 주방에 6인용 식탁형 식기세척기로 충분한가요? 12인용과 무엇이 다른가요? | 쿠쿠6인용 급수호스 및 문열림812mm·설치형태, SK DWA81 독립형을 구분. 에너지등급만으로 물/전기 절약 확정 금지. | [SK매직 터치온 식기세척기 DWA-81R0D 사용설명서](https://m.manual.skmagic.com/2019/model/DWA/DWA81R0D00SL/Manual.htm); [쿠쿠 CDW-A0611T 계열 사용설명서](https://www.cuckoo.co.kr/upload_cuckoo/_bo_rep/manual/200424%3Dz0383-0082a0%20rev.1_cdw-a0611t.pdf) |
| [/blog/dyson-tp07-vs-hp09](https://salimlab.kr/blog/dyson-tp07-vs-hp09) 다이슨 퓨어쿨 TP07과 퓨어 핫앤쿨 HP09 중 무엇을 사야 하나요? 20만원 더 주고 난방 기능을 넣을 가치가 있나요? | 공통 필터965432-01의 관측가/권장 주기와 HP09 촉매 구분. 40W/2200W 정격 비율을 실제 요금 비율로 해석하지 않음. | [965432-01 TP07·HP09 호환 필터 — 2026-09-30 가격 조사](https://www.dyson.co.kr/360-glass-hepa-carbon-air-purifier-filter); [Dyson 필터 교체 FAQ — 하루 12시간·12개월 조건](https://www.dyson.co.kr/products/tools-and-accessories/air-purifier-filters) |

## 카테고리 가이드 12개 결과

| 페이지 | 결과·판단 | 한계 |
| --- | --- | --- |
| [/category/air-conditioner](https://salimlab.kr/category/air-conditioner) | 수정: 면적·일사·단열·설치 견적, 정격과 실제 요금 분리 | 해당 정확 모델·공식 시험 조건에 한정. 동일 조건의 모든 후보 실측 순위는 미확보 |
| [/category/dehumidifier](https://salimlab.kr/category/dehumidifier) | 수정: 16L 시험·4.5L 물통/연속배수, 미확보60㎡와 요금 단정 제외 | 해당 정확 모델·공식 시험 조건에 한정. 동일 조건의 모든 후보 실측 순위는 미확보 |
| [/category/fan](https://salimlab.kr/category/fan) | 수정: 날개 없음과 안전 보장 구분, 필터 자재비·정격 조건 | 해당 정확 모델·공식 시험 조건에 한정. 동일 조건의 모든 후보 실측 순위는 미확보 |
| [/category/washer](https://salimlab.kr/category/washer) | 수정: 세탁/건조 적재 차이, 코스 용량과 병행 동선 | 해당 정확 모델·공식 시험 조건에 한정. 동일 조건의 모든 후보 실측 순위는 미확보 |
| [/category/dryer](https://salimlab.kr/category/dryer) | 수정: DV17/WD25 방식·이불4kg 한 장·소재별 코스·설치 온도 | 해당 정확 모델·공식 시험 조건에 한정. 동일 조건의 모든 후보 실측 순위는 미확보 |
| [/category/dishwasher](https://salimlab.kr/category/dishwasher) | 수정: 호스 급수·독립형·도어 열림과 코스별 소비량 | 해당 정확 모델·공식 시험 조건에 한정. 동일 조건의 모든 후보 실측 순위는 미확보 |
| [/category/refrigerator](https://salimlab.kr/category/refrigerator) | 수정: 표시 전력과 실제 사용, 반입·문 열림 및 설치 간격 구분 | 해당 정확 모델·공식 시험 조건에 한정. 동일 조건의 모든 후보 실측 순위는 미확보 |
| [/category/water-purifier](https://salimlab.kr/category/water-purifier) | 수정: 자동 살균과 수동 관리 구분, 직수/저수조 위생 순위 및 일률적인 출수량 단정 제거. | 해당 정확 모델·공식 시험 조건에 한정. 동일 조건의 모든 후보 실측 순위는 미확보 |
| [/category/air-purifier](https://salimlab.kr/category/air-purifier) | 수정: CADR 부피 계산·필터 종류 및 세척 지침·사용 면적 | 해당 정확 모델·공식 시험 조건에 한정. 동일 조건의 모든 후보 실측 순위는 미확보 |
| [/category/robot-vacuum](https://salimlab.kr/category/robot-vacuum) | 수정: 도크 여유·문턱 형태·시험 Pa와 실제 청소 성능 구분 | 해당 정확 모델·공식 시험 조건에 한정. 동일 조건의 모든 후보 실측 순위는 미확보 |
| [/category/tv](https://salimlab.kr/category/tv) | 수정: Go 터치/세로/테이블·앱 지원, 전체/분리 무게, 실제/가상 채널 | 해당 정확 모델·공식 시험 조건에 한정. 동일 조건의 모든 후보 실측 순위는 미확보 |
| [/category/wireless-earbuds](https://salimlab.kr/category/wireless-earbuds) | 수정: 두 기기 연결/자동 전환·코덱 조합 재생시간 및 착용 조건 | 해당 정확 모델·공식 시험 조건에 한정. 동일 조건의 모든 후보 실측 순위는 미확보 |

## 나머지 공개 영역

| 영역 | 검토 결과와 유지/수정 이유 |
| --- | --- |
| 홈·제품/블로그/비교 목록 | 기존 질문·제품·관련 글 링크 구조 유지. 수정된 요약·제목·판단이 목록에도 반영됨. 단순 글 수 확대 없음 |
| 브랜드 15개 | Sony·Anker의 연결·재생 조건에 더해 Winix·TCL·Dyson·Apple의 제습 면적·판매 구성·실측 효과·지원 기기 조건을 교정.15개 전체의 모든 역사·사양을 새로 조사한 것은 아님 |
| 제품 쌍 비교 44개 | 기존 비교 템플릿이 수정된 모델 요약·대상 안내를 반영. 자동 비교의 noindex와 광고 비노출 유지. 독립 실측 우열을 새로 생성하지 않음 |
| 오류 코드 허브·모델별 안내 | 이전 정확 모델 감사와 연결 유지. 이번 삼성 블로그를 모델 범위에 맞춰 정렬. 공통 코드에서 부품 고장을 추정하거나 누수·과열 재운전을 권하지 않음 |
| 소재 사전 | 공통 재료 특성은 기존 교육 설명으로 유지. 제조사 여재 시험을 특정 완제품의 실사용 효과/수명/의학적 효능으로 바꾸지 않음 |
| 소개·편집 방법·정책·연락·교정 | 직접 구매 시험과 자료 기반 편집의 구분, 출처 없는 후기/평점 비노출, 제휴·한계 고지 유지. 승인 보장 문구 없음 |
| 색인·사이트맵·robots·canonical | URL 구조와 게이트 유지. 공개34/색인가능31/noindex3, 사이트맵103개 동일(**2차 이후 색인가능30/noindex4, 사이트맵102 — AR07 가격 철회**) |

## 대표 전후 사례

각 문장은 해당 제품·관련 글·가이드에 적용한 판단을 요약한다. 아래 전후는 편집 요약이며 원문 직접 인용이 아니다.

| 제품군 | 이전 문제 | 개선된 판단 | 사양표를 넘어선 가치 / 한계 |
| --- | --- | --- | --- |
| 세탁·건조 WD25/DV17 | 최대 용량만으로 적재·수축 방지·분리형 우위를 판단 | 25→15kg이면 10kg을 덜고, 이불4kg 한 장·울2kg 등 코스를 대조 | 한 주 빨래를 얼마나 나누고 병행할지 계획. 건조 실측 우열·모든 소재 허용은 미확보 |
| 로봇 Curv | 작은 도크 수치·높은Pa·4cm만 보고 설치/문턱 통과 확정 | 도크 높이0.9m/폭0.46m/앞1.2m 확보, 단일3cm/이중4cm 형태 확인 | 물통 인출과 실제 로봇 진입 동선 및 문턱 사진 대조. 모든 문턱 통과 보장 없음 |
| 이어폰 Liberty5/Sony | LDAC와 두 기기 연결이 불가능하거나 기능 조합에도8시간으로 설명 | 제조사 연결 절차 및 Liberty5 이중연결+LDAC/Dolby 약4시간 분리 | 연속 회의 중 충전 필요를 예산·착용·기기 조합에 연결. ANC/통화의 동일 조건 전 모델 순위 없음 |
| TV Go/Max | Go 터치·세로 불가, 가상 채널을 물리 구성처럼 설명 | Go 터치/세로/테이블 및 앱별 지원, Max10W2채널과 가상11.1.2 분리 | 실제 앱 사용·이동 시 분리 무게·리모컨 필요 판단. 정격과 측정 전력을 순위로 섞지 않음 |
| 식기세척기 쿠쿠/SK | 수동 물탱크·빌트인으로 잘못 설치 안내 | 쿠쿠 호스 급수·문열림812mm, SK 독립형으로 대조 | 수도·배수·식탁의 문 열림/그릇 동선을 먼저 확인. 라벨만으로 연간 절약액 산출 없음 |
| 공기청정 Xiaomi | H13·일률1.5배 용량 및 W를 청정 능력으로 해석 | 자체 고효율 필터와 CADR400, 방부피 환산14.4분의 의미 구분 | 닫을 공간·오염 유입과 운전 소음 선택. 계산은 제거 완료 시간 아님 |
| 제습 Winix | 미확보60㎡·16L를 실제 물통 비움/요금으로 사용 | 적용면적 표시 보류, 시험16L·물통4.5L 및 연속배수 구분 | 야간 물통 관리와 배수 위치 판단. 실제 하루 횟수·인버터 비용 회수는 미확보 |
| 냉장고 RF85/T873/S834 | 신고값과 제조사값 혼용, S83440.0으로 잘못 기재 | 제조사43.0/43.7/52.3과 신고값 별도 표기, 표시 연차8.4 계산 | 작은 표시 차이보다 반입/수납/문열림 판단. 표시 차이로 실제 요금 순위 확정 안 함 |
| Dyson TP07/HP09 | 필터 비용 불명확·정격55배를 요금55배처럼 해석 | 공통 필터 코드·과거59,000원·하루12시간/12개월 조건 제시 | 자재비 예산과 난방 운전 분리. 현재가·공임·촉매 서비스 비용은 별도 |
| 벽걸이 에어컨 | 서향·거실·정격W만으로 체급과 요금을 확정 | 닫을 면적·일사·단열·실외기와 설치 포함 견적 대조 | 설치 상담에 필요한 조건을 모음. 계속 켜기/끄기 실측 우열과 현재 요금 계산은 미확보 |

## 날짜·색인 정책

수정한 제품 30개 및 본문이 바뀐 글의 편집 검수일은 2026-10-08이다. 유지한 제품·글의 날짜와 기존 가격 관측일은 보존했다. 가이드 출처 확인일은 이번 자료 대조를 표시하며 새 실측일·새 가격 관측일이 아니다. `SITE_REVISIONS`의 날짜 정의는 **배포된 날**이므로 미배포 작업을 배포 이력에 넣지 않았다. 배포 시 실제 본문이 바뀐 경로 목록으로 해당 날짜의 이력을 등록해야 한다.

noindex는 `samsung-bespoke-sxs-rs84`, `skmagic-touchon-dishwasher-dwa81`, `skmagic-allin-water-purifier-wpu` 3개를 유지한다. 내용 개선 대상에 포함했고 독립 출처 부족은 해소됐다고 간주하지 않았다. 품질 게이트·후기 비노출·근거 없는 JSON-LD 리뷰/평점 비노출을 완화하지 않았다.

## 검증 결과

- `npm test`: 24개 파일, 1,930개 통과. 기존1,909개에서 근거표 모델 연결15개와 산식 검산4개 및 후속 교정 회귀2개 추가. 기존 검사 삭제/완화 없음.
- `npm run lint`, `npm run build`, `git diff --check`: 통과.
- 최종 정적 HTML 154개 대조: 본문 변경 114개, 새 페이지0개, robots/canonical 변화0개, 깨진 내부 링크0개.
- `scripts/changed-pages.mjs`: 사이트맵103개 중 본문 변경67개. 자동 비교와 noindex 제품 등 사이트맵 제외 경로도 별도 전체HTML 대조에 포함.
- 카탈로그 AST로30개 변경 객체 확인, 비공개 모델 변경0개. 전수 스냅샷34제품/18블로그/12가이드 대조.
- 핵심 계산:25−15=10kg;40×2.4÷400×60=14.4분;16÷4.5≈3.56(실제 비움 횟수 아님);(43.7−43.0)×12=8.4kWh/년.
- 브라우저 20개 경로 × 2개 폭 = 40개 검사 통과(실제 main 본문 확인). [검증 요약](../research/evidence/content-value-2026-10-08/verification.json)과 [브라우저 기록](../research/evidence/content-value-2026-10-08/browser.json)을 참조한다. 모바일390px/데스크톱1440px에서 실제 `<main>` 노출·페이지 오류·이미지·본문 링크·전체 가로 넘침을 검사했다. 긴 표는 컨테이너 내부 스크롤을 허용한다. 별도 [설치 UI 검사](../research/evidence/content-value-2026-10-08/fit-browser.json)에서는 위닉스의 미확인 적용면적 비노출과 설치 안내 글씨색을 두 폭에서 확인했다.

검증 중 미확보 적용면적을 제거하면서 발생한 타입 오류는 coverageArea 선택형 및 표시 조건으로 해결했다. 모델 연결 검사에서 제조사 URL 별칭은 기존 모델 메타데이터의 정확한 URL로 맞췄다. 기존 날짜 기대값은 실제 변경된 검수 날짜로 갱신했다. 테스트 기준·출처 수 기준은 낮추지 않았다.

설치 안내의 노란 배경 위 회색 글씨 대비 문제는 `text-yellow-900`으로 수정했다. 디자인 검사 억제 항목0개, 잔여 지적0개. 임시 정적 서버의 폴더 우선 라우팅 문제는 수정 후 실제 HTML로 브라우저 검사를 다시 수행했다.

## 남은 한계와 최소 후속 근거

- 모든 후보의 동일 조건 청소·ANC·건조·소음·전력 실측은 미확보다. 제조사 시험은 모델·코스·배터리·모드별 조건을 유지하며 독립 실측으로 표시하지 않는다.
- 국내 정확 모델의 고장/수리 확률과 장기 유지비 전체는 미확보다. 빈도·확률·전체 유지비 순위를 만들려면 표본·기간·부품/공임 범위가 공개된 자료가 필요하다.
- RS84·DWA81·WPU의 두 번째 독립 출처가 필요하다. 관련 없는 URL 추가나 같은 회사의 페이지 쪼개기로 게이트를 통과시키지 않는다.
- 현재 가격·현재 전기요금·현재 재고를 새로 수집한 작업이 아니다. 과거 가격으로 현재 가격 우위를 보장하지 않는다.
- 로컬 콘텐츠 개선은 끝났으며 운영 배포·배포일 이력 등록·재심사 제출은 별도 실행 범위다. Google의 심사 결과는 이번 검수의 통과 여부와 별개다.

## 실제 변경 경로

사이트맵 포함67개 경로:

```text
/
/blog
/blog/fridge-monthly-kwh-measurement
/blog/samsung-washer-check-codes
/blog/standbyme-go-vs-2-vs-max
/blog/sony-xm5-vs-qcy-melobuds
/blog/dehumidifier-liters-measurement
/blog/air-purifier-area-numbers
/blog/bespoke-rf85-vs-dios-t873
/blog/fridge-4door-vs-side-by-side
/blog/wall-aircon-samsung-vs-tcl-vs-haier
/blog/washer-dryer-combo-vs-separate
/blog/airpods-pro3-vs-buds3-pro-vs-liberty5
/blog/portable-tv-standbyme-vs-movingstyle
/blog/robot-vacuum-suction-numbers
/blog/water-purifier-lg-vs-coway-vs-skmagic
/blog/dishwasher-12-vs-6-countertop
/blog/dyson-tp07-vs-hp09
/category/air-conditioner
/category/dehumidifier
/category/air-purifier
/category/fan
/category/washer
/category/dryer
/category/refrigerator
/category/dishwasher
/category/water-purifier
/category/robot-vacuum
/category/tv
/category/wireless-earbuds
/brand/Samsung
/brand/LG
/brand/TCL
/brand/Dyson
/brand/Winix
/brand/Apple
/brand/Sony
/brand/Anker
/products/samsung-wind-free-ar07a9170
/products/samsung-bespoke-grande-wf24a9500
/products/samsung-bespoke-grande-dv17a9720
/products/samsung-bespoke-4door-rf85
/products/samsung-bespoke-jetbot-ai
/products/samsung-bespoke-ai-combo-wd25
/products/samsung-the-movingstyle
/products/samsung-galaxy-buds3-pro
/products/lg-dios-obje-4door-t873
/products/lg-puricare-water-purifier-objet
/products/lg-codezero-r5-robot
/products/lg-dios-obje-sxs-s834
/products/lg-standbyme2
/products/lg-standbyme2-max
/products/lg-standbyme-go
/products/tcl-tac-08csd-wall
/products/tcl-tac-12csd-wall
/products/haier-cth06qbw-wall
/products/haier-cth10qbw-wall
/products/dyson-pure-cool-tp07
/products/dyson-hot-cool-hp09
/products/coway-handpick-water-purifier-compact
/products/winix-posong-dehumidifier-16l
/products/cuckoo-dishwasher-table-cdw61
/products/roborock-s8-proultra
/products/roborock-qrevo-curv
/products/apple-airpods-pro3
/products/anker-soundcore-liberty5
/products/qcy-melobuds-pro
```

사이트맵 제외 경로를 포함한114개 본문 변경 전체는 [정적 HTML 검수 기록](../research/evidence/content-value-2026-10-08/static-check.json)에 기록했다.


## 페르소나 검수 후 교정 (2026-10-08)

초기 기술 검사 통과 이후 독창성과 독자 판단을 다시 읽으면서 누락을 발견해 교정했다. 기술 테스트 통과가 모든 문장의 정확성을 입증하지는 않는다.

- 냉장고 첫 답변의 26.9kWh를 하루 측정치로 표현한 오류: 보정 전 월 환산 약26.9kWh/월과 하루 역산 약0.884kWh/일을 구분. 산식은43.0÷1.6×12÷365이다. 네 모델 월 환산과 첫 모델 하루 역산·원래 라벨로의 재환산을 회귀 검사한다.
- Winix DN2H160-IWK의 추천 평수 소형·중형·대형에 해당하는7~35평 표시 제거. 미확인 추천 목록을 빈 배열로 두고 UI에서 빈 추천 항목을 숨긴다. 다른 모델의 확인된 추천 목록은 유지. 적용면적과 추천 평수는 별개의 표시이므로 두 항목 모두 점검했다.
- Dyson 비교 글의 본체 높이→상체/허리 아래 풍향 및 체감 단정 교정. 첫 답변·높이 해설·조건부 구매 결론을 설치 치수와 실제 자세/거리에서 확인할 풍향으로 정렬. 해당 모델 근거가 없는30cm 일률 설치 간격도 같은 문단에서 제거해 기존 제품 상세와 일치시켰다.
- 이 단계에서는 제품23개/글15개/가이드11개 수정이었다. 아래 확대 교정 이후의 최종 개수와 구분한다. 당시 테스트는24파일/1,930개 통과, 린트·빌드 통과. 정적HTML154개·robots/canonical변화0·깨진 내부 링크0을 다시 확인했다.
- 이전 전체 브라우저40검사는 최초 검수 기록이다. 후속 교정은 변경한3개 페이지×모바일/데스크톱의 [6개 검사](../research/evidence/content-value-2026-10-08/persona-browser.json) 및 [설치 UI 검사](../research/evidence/content-value-2026-10-08/fit-browser.json)로 별도 확인했다.

후속 브라우저 결과:3페이지×2폭의6개 검사 통과, 설치UI2개 검사 통과. 첫 전체 페이지 캡처는30초 시간 초과로 재시도했고,6개 검사는 화면 캡처 없이 DOM·오류·이미지·링크·넘침을 검사했다. 설치UI의 모바일/데스크톱 부분 캡처는 성공해 기존 근거 이미지를 최종 화면으로 갱신했다.

## 전체 콘텐츠 확대 교정 (2026-10-08)

앞선 세 문제 교정 후 공개 제품34개·블로그18개·가이드12개·브랜드15개로 검수 범위를 넓혔다. 최종 누적 수정은 제품30개·블로그15개·가이드12개·브랜드6개다. 문장을 다듬는 데 그치지 않고 요약·본문·표 주석·추천 대상·FAQ의 판단 조건을 맞췄다. 새 실측을 했다고 표현하지 않았다.

- TV: 전체 무게와 분리 화면 무게, 제조사 최대 배터리 시간과 실제 영화 재생을 구분. ‘Go만 야외 가능’, 시청 거리로 선명도를 확정하는 기준, 케이스 제조 원가 추측과 프로세서 세대→화질 순위 제거.
- 냉장고: 가구원 수별 용량 정답, 낮은 본체→설치 우위, 빈 공간→전기요금 증가, 모든 모델에5cm 방열 간격 적용을 제거. 칸별 용기·문/서랍·반입 경로와 모델 설치 안내로 판단.
- 제습기: 본문2014년·출처2024년이 맞지 않는 통계를 제외하고16L 시험 조건·4.5L 물통·제상 안내 범위를 구분. 미확인 면적과 소음 순위 및 계절별 자동 성공 단정 제거.
- 세탁/건조·식기세척·정수: 코스별 적재·키트 호환·배수·필터·서비스 조건을 유지. 살균 기능 이름이 관리 작업이나 식기 재질 확인을 대신한다는 표현 제거.
- 로봇·공기청정·선풍기·이어폰: 다층 자동 이동, 뜨거운 바닥 청소수, 자동 도크의 무관리, 센서 정확도·착용감·풍향의 미시험 우열을 제거. 남는 관리와 실제 사용할 기기/기능 조합을 설명.

[확대 검수 전후 기록](../research/evidence/content-value-2026-10-08/broad-audit.json)은 이번 단계의34제품·18글·12가이드 스냅샷과 브랜드를 포함한 문구 교정 이력을 보존한다. 미수정은 전체 사실을 새로 검증했다는 뜻이 아니다. 출처·조건·보류 사유와 독자 적용 절차를 더한 자체 편집 분석이며 직접 사용 후기는 아니다.

검사 환경의arm64용 네이티브 실행 파일이 빠져 동일 버전 패키지만 로컬node_modules에 복구했다. 앱의package.json·lockfile은 변경하지 않았다. 최종 검사 결과는 검증 요약과 확대 브라우저 기록에 반영한다.

최종 확대 브라우저:19경로×390px/1440px의 [38개 검사](../research/evidence/content-value-2026-10-08/broad-browser.json) 통과. 로컬 서버의 요청 연결 실패는 로그 출력을 분리하고 동시 연결 대기열을 늘린 뒤 재검사했다. 최종1,930테스트·린트·빌드·diff검사 통과. 정적154페이지 중114개 본문, 사이트맵103경로 중67개 본문이 변경됐고 깨진 내부 링크·robots/canonical변경은0개다.

## 2차 교정 — 남은 근거 없는 단정·재서술·일반론 (2026-10-08 오후)

1차 교정(위 절들)이 끝난 같은 날, 남은 콘텐츠를 다시 검토했다. 근거 없는 단정, 자료를 다시 말하는 데 그친 문장, 독자 판단에 쓸모없는 일반론을 찾아 고쳤다. 지운 자리에는 정확 모델 원문으로 확인한 조건별 판단 기준을 넣었고, 근거가 없으면 그냥 지웠다. 새 글은 만들지 않았다. 운영 배포·재심사 제출·커밋은 하지 않았다.

### 방법과 측정 사양

- **분담:** 10개 영역 담당이 같은 지시서로 작업했다. 제품군 8개(냉장고·세탁건조·에어컨·공기청정/송풍/제습·정수기/식기세척기·로봇청소기·이동식 TV·무선이어폰)와 오류 코드 안내, 사이트 공통(템플릿·홈·정책·브랜드·소재·비교)이다. 제품군 담당은 그 제품군의 제품 상세·블로그·가이드를 함께 맡았다. 같은 모델의 수치와 결론이 페이지끼리 어긋나지 않게 하기 위해서다. 조정자는 영역 사이 불일치·출처표·생성 스크립트·검증을 맡았다.
- **근거 우선순위:** 저장된 원문(`research/evidence/*`, `.audit/*`)을 먼저 봤다. 그다음 우리 데이터에 이미 인용된 공식 URL을 다시 열었다. 웹 검색은 쓰지 않았다. 새로 연 원문의 관측일은 2026-10-08이다.
- **영역별 기록:** `research/evidence/content-value-2026-10-08/pass2/<영역>.json` 10개. 형식은 변경·근거·계산·독자 판단·보류·범위 밖이다. 조정자 기록은 `pass2/coordinator.json`이다.
- **집계 단위:** 아래 "기록 항목 수"는 영역 기록의 항목 수다. 한 페이지에 항목이 여러 개일 수 있고, 같은 페이지를 두 영역이 각자 셀 수 있다. 실제로 바뀐 페이지 수는 정적 HTML 대조(교정 전 = 1차 완료 빌드, 2026-10-08 14:54)로 따로 셌다.

### 결과 요약

| 지표 | 값 | 측정 방법 |
| --- | --- | --- |
| 정적 HTML 본문 변경 | 154개 중 148개 | `<main>` 텍스트 대조. 변경 없음: 404·_not-found·하이얼 F25 상세·네이버 인증·privacy·terms |
| 사이트맵 경로 본문 변경 | 102개 중 99개 | `scripts/changed-pages.mjs` |
| 데이터 수정이 있었던 공개 제품 | 34개 중 34개 | 영역 기록 `productSlugsChanged`의 합집합 |
| 영역 기록 항목 | 변경 363·보류 68·범위 밖 64 | 10개 영역 JSON 합계(중복 가능) |
| 색인 변화 | AR07 1개가 noindex로 전환. 색인 가능 31개에서 30개로, 사이트맵 103개에서 102개로 | robots 메타 대조, `evaluateProductQuality` |
| canonical 변화·새 페이지·깨진 내부 링크 | 0·0·0 | 정적 HTML 전수 |

### 1차 판단을 뒤집은 것

1차 교정이 "유지"했거나 새로 넣은 내용 가운데 원문과 맞지 않던 것이다.

| 대상 | 1차 상태 | 2차 확인 결과 |
| --- | --- | --- |
| Qrevo Curv 18,500Pa 조건 | "완충·Max+, IEC 62885-2:2021/5.11" | S7 Max Ultra 비교 글의 각주를 옮긴 오기였다. kr 원문 각주 4는 "로보락 내부 시험, 오리피스 직경 0mm, 단일 팬 정압"이다(조정자가 직접 재확인). S8 6,000Pa(IEC 2016/5.8)와 나눈 3.1배는 같은 브랜드 안에서도 비교가 성립하지 않는다. `claims.jsonl` curv-threshold에 정정 이력을 남겼다 |
| 샤오미 AC-M16-SC 적용 면적 | 제조사 28~48㎡ 유지, 블로그는 "국산과 1:1 비교 포기" | 공단 신고 4건에서 표준사용면적 42.5~45.5㎡·2~3등급을 확인했다. 48㎡를 넘는 '중형' 칩을 지우고 신고값으로 비교했다. 산식 45.5×0.64=29.1W, ×7.2h×365=76.5kWh, ×160원≈12,200원은 신고 연간에너지비용 12,000원과 맞는다 |
| 냉장고 "냉동을 많이 하면 양문형" | 세 글·가이드에서 유지 | 공식 냉동 용량은 T873(4도어) 367L, RS84 320L, S834 308L, RF85 177L(+맞춤보관실 176L)이다. LG 4도어가 양문형 두 대보다 크다. 결론을 바꿨다 |
| 냉장고 설치 간격 "좌우·상단·후면 5cm" | 4개 제품에 남아 있었음 | LG 설명서 값은 후면 10cm·문 위 2.5cm·천장/좌우 10cm이고, 문을 끝까지 연 치수는 T873 1,667×1,293mm(인쇄 20쪽)·S834 1,635×1,358mm(21쪽)다. 삼성 두 모델은 원문을 확보하지 못해 "미확인"으로 적었다 |
| RS84 53.0kWh/월 | "재독해 불가, 과거 조사" | 삼성 지원 페이지로 재확인했다. 출처를 섞으면 양문형 두 대의 순위가 뒤집힌다(제조사 S834 52.3 < RS84 53.0, 신고 RS84 51.01 < S834 51.64) |
| 에어팟 프로 3 메타분석 "오류 언급 2편" | 유지 | SoundGuys 원문에 자동 연결 실패·오른쪽 채널 쏠림이 있어 7편 중 3편이다. TechRadar 5.5시간에 붙어 있던 "심박 측정 중"은 원문에 없는 조건이었다 |
| 벽걸이 에어컨 "요금 줄이려면 삼성" | 유지 | 공단 신고 월간소비전력량은 3등급 삼성이 103kWh로, 4등급 6평형(87.8·89.5kWh)보다 13.5~15.2kWh 많다. 근거와 반대 방향이라 지웠다 |
| 이동식 TV "터치는 무빙스타일만" | 유지 | LG 3종 공식 페이지에도 터치스크린 안내가 있다. 실제 차이는 일체형 킥스탠드, 갤럭시 화면 공유 터치, 각도 범위다 |

### 가격 출처의 모델 대조 (조정자)

공개 제품이 출처표에 연결한 다나와 페이지 33건을 다시 열어 상품 제목의 모델번호를 대조했다. 제목에 모델번호가 있는 것은 28건이고, 나머지 5건은 본문·제조사 페이지로 추가 대조했다(`pass2/coordinator.json`).

- **삼성 AR07A9170HCN — 가격 철회.** pcode=122688519는 AR07A9170HCS(2021년형·4등급·23.1㎡·0.75kW) 상품이다. 공개 모델 HCN(3등급·24.4㎡·850W)과 다르고, 다나와 통합검색 결과도 HCS 상품 3개뿐이었다. 그래서 다음을 했다.
  - 789,990원을 제품·블로그·심층리뷰에서 지웠다.
  - 출처표 항목을 지우고, 생성 스크립트의 `RETRACTED_SOURCES`로 이 출처를 뺐다.
  - 공단 신고 260200419(HCN·실외기 HAX)를 정확 모델 근거로 붙였다.
  - 그 결과 인정 발행처가 samsung.com 1곳이 되어 색인 게이트(서로 다른 발행처 2곳)에서 빠졌다. 공단 사이트는 `source-trust.ts`의 인정 도메인이 아니며, 게이트는 바꾸지 않았다.
- **삼성 WF24A9500KE — 조건 명시.** 출처 상품은 색상만 다른 WF24A9500KF(새틴 그린)다. 삼성 지원 페이지 대조 결과 KE(그레이지)와 24kg·686×984×850mm·110kg·1등급·가열세탁 2200W가 같다. 가격은 유지하고, 출처 제목과 가격을 쓰는 문장 네 곳에 이 조건을 붙였다.
- **삼성 RF85C90D1AP — 조건 명시.** 출처는 "비스포크 코타 RF85C90D1 (화이트)" 상품이고, 페이지에 "RF85C90D101, RF85C90D1AP 동일스펙"이 표기돼 있다. 가격을 근거로 결론을 내리는 다섯 곳에 "코타 화이트 구성"을 붙였다.
- **TCL TAC-08CSD — 유지.** 제목에 접미어가 없지만 사양(6평 18.7㎡·4등급·2.35kW·0.78kW)이 일치한다.

### 사양 필드 대조 (조정자)

출처표 테스트(`verified-specs`)가 검사하지 않는 짧은 사양 필드(냉매·필터·핵심 기술)를 공개 34개에서 나열해 의심 값을 원문과 대조했다. 두 담당이 "확인 필요"로 기록만 하고 값은 그대로 둔 것이 여기서 드러났다.

- **냉매:**
  - 삼성 AR07과 TCL 2종의 R32를 비웠다. 삼성 지원 페이지·설명서 규격표, TCL 제품 페이지·다나와 어디에도 냉매 항목이 없다.
  - 에어컨 글 표에서도 세 칸을 "미확인"으로 바꿨다.
  - 하이얼 2종(설명서 28쪽)과 냉장고 4종의 R600a(삼성 지원 페이지·LG 설명서)는 확인돼 유지했다.
- **필터:**
  - AR07 "HD 필터"를 삼성 사양 표기 "극세 필터"로 바꿨다.
  - TCL "항균 필터"는 제조사 페이지에 없는 표현이라 비웠다.
- **제트봇 라이다:**
  - 정확 모델 자료(VR50T95735W/SA PDF)에 LiDAR 언급이 없고, 근거는 "AI 사물인식으로 가구 위치를 지도에 표시"까지만 있다.
  - 그래서 설명·한 줄 소개·핵심 기술·추천 대상·기능 목록에서 라이다 표기를 지우고, 주행 센서 구성은 확인이 필요하다고 밝혔다.
  - 로봇 가이드의 "네 모델 모두 라이다"도 고쳤다. S8·Curv의 PreciSense LiDAR는 공식 페이지로 확인했다.
- **대조하지 않은 범위:** 기능 목록 전체와 비공개 제품. 기록은 `pass2/coordinator.json`의 `specFieldAudit`에 있다.

### 영역별 대표 교정

| 영역 | 대표 교정 (근거) |
| --- | --- |
| 세탁·건조 | 25·24kg은 표준 코스 상한이고, 자동 코스인 AI 맞춤은 두 모델 모두 9kg이다(WD25 43~44쪽, WF24 40쪽 — 조정자가 추출본으로 재확인). 25kg 세탁 후 건조하려면 10kg를 덜어야 하고, 9kg 이하면 덜 것이 없다. 점검 코드 글에서 출처에 없는 3C·tC·1C "부품 코드" 단정을 지우고, HC를 '건조 팬 모터 동작 이상'으로 고쳤다. 분리형의 시간 이득은 두 통이면 min(세탁, 건조), n통이면 그 n−1배라는 구조식으로 바꿨다 |
| 에어컨 | 정격 270W 차이를 공단 신고 월간소비전력량 87.8 대 89.5kWh(1.7kWh, 약 1.9%)로 바꿨다. 가격 위치 단정 세 건은 공개 4종의 2026-08-24 조사가로 고정했다. 하이얼 설명서 2종(SHA-256 대조)에서 셀프클리닝 18~21분(14쪽), 06형 좌우 풍향 수동·10형 리모컨(17쪽)을 확인해 추천 대상에 반영했다 |
| 공기·제습 | 다이슨 한국어 설명서로 촉매 필터 "교체 불필요", 온풍이 설정 온도에서 일시 정지한다는 것을 확인했다. 근거 없는 27㎡·30cm 이격·PTC 히터·4.99kg은 지웠다. 위닉스 연속배수는 내경 16mm 호스 별매·배수구가 호스보다 낮을 것. 시험 조건이면 4.5÷16×24≈6.8시간마다 물통이 찬다. 공기청정 글의 "같은 돈으로 두 대" 계산 오류를 바로잡았다(277,200×2=554,400원 > TP07 529,990원) |
| 정수기·식기세척기 | LG 출수구 살균은 최소 3개월마다 수동이다(설명서 14쪽). 구매를 월 금액으로 바꾸면 (1,454,000+200,600×연수)÷개월 = 4년 약 47,000원·6년 약 36,900원이다. 공단 신고 월 12.17·12.17·10.04kWh를 추가했다. 쿠쿠는 문 개방 812mm라 깊이 600mm 조리대에서 벽에 붙이면 약 212mm가 앞으로 나온다. 두 식기세척기의 "59분"은 기준 수온이 15℃와 25℃로 달라 같은 조건이 아니다. 설명서에 없는 '70도 이상 살균'·'3중 청정 분사' 등을 지웠다 |
| 로봇청소기 | LG R5의 근거 없는 평수 칩과 "반려동물 털" 추천을 지웠다. LG 비교표로 문턱 최대 2cm, 엉킴 방지 브러시·카메라 없음을 확인했다. S8 7일 계측은 1가구·168시간·건조 3시간 설정 조건을 밝혔다. 6회×3h×75W=1.35kWh는 1.9kWh의 약 71%라, 이 기록에서는 건조 시간 설정이 가장 큰 변수다 |
| 이동식 TV | 120Hz 입력은 HDMI 1 하나뿐이고, 삼성은 무선 모드에서 절전이 자동으로 켜진다. 그래서 "전원을 꽂은 자리의 기능"으로 한정했다. 근거가 Reddit 글 하나뿐이던 "최대 밝기 3시간 20분"을 지웠다. 2·2 Max 출시 간격 "반년 남짓"은 실제 14개월이고, 11.1.2 채널 합계 12는 14다 |
| 무선이어폰 | QCY의 근거 없는 AAC·IPX5·48dB를 지우고, 46dB에 공식 조건(20Hz~2,500Hz 범위)을 붙였다. 소니 추천 문구 "작고 가벼운(5.9g)"은 후보 다섯 중 가장 무거워 교체했다. 케이스가 보태는 시간(버즈3 26−6=20시간 등)과 케이스 외곽 부피(소니 68.5㎤ vs QCY 80.6㎤)를 계산해 넣었다 |
| 오류 코드 | SK매직 DWA-81R0D F1 "필터 막힘·경미"를 설명서 자가진단표("기능 이상")와 FAQ에 맞춰 바꾸고 심각도를 '주의'로 올렸다. 로보락 Error 1·4·5·13의 원문에 없는 원인 추정을 지우고, 중복 4건을 통합했다(허브 77→73개, 끊긴 앵커 0). 쿠쿠 E4 "견적을 받으세요"는 설명서 33쪽의 보증 조건으로 바꿨다. 서비스 번호 7개 브랜드를 1차 출처와 대조했다 |
| 사이트 공통 | 가격대 칩(priceTier) 표시를 중단했다. 기준 구간 없이 손으로 적은 값이라, 가격 미확인 제품 10개에 '프리미엄'이 붙고 조사가 순서와도 어긋났다. "같은 값이면 이것도"는 "함께 비교할 제품"으로 바꾸고, 같은 날 조사한 가격끼리만 차액을 보여 준다. 가격 미확인 제품의 "렌탈 전용일 수 있다" 추측과 추천 평수 칩 표시를 지웠다. S834 소음 블록의 출처 없는 '45dB 보통' 판정을 지우고, 비교 FAQ의 kWh 문구를 신고값 유무로 나눴다. 소재 사전을 고시 제2026-59호 원문과 대조했고(물수건 규격에 포름알데히드 항목 없음), /methodology의 kWh 환산식 오류를 고쳤다. 후속으로 다음을 고쳤다: 스탠드 포함 무게가 따로 있는 제품의 라벨을 "무게(스탠드 제외)"로 자동 표시, 비교표 "소비전력"을 "정격 소비전력"으로, 오류 코드 허브 꼬리말의 출처 없는 "출장 유상" 단정 삭제, 다이슨 "난방"을 설명서 표현 "온풍"으로 |

### 생성 스크립트·출처표 변경

- `scripts/generate-editorial.mjs`
  - `RETRACTED_SOURCES`(철회한 출처)와 `SOURCE_TITLE_OVERRIDES`(같은 사양·다른 구성 조건)를 추가했다.
  - 같은 URL이면 표의 제목이 기존 생성물 제목보다 우선하도록 고쳤다. 이 결함 때문에 1차에서 표에 적은 쪽수·조건 제목 15개가 화면에 반영되지 않고 있었다.
  - 가격 확인일은 가격 출처표에 남은 제품에만 둔다.
- 추가한 정확 모델 근거:
  - 공단 신고: AR07·샤오미 4건·LG 정수기·코웨이·SK 정수기
  - 하이얼 06·10 설명서 PDF
  - LG·삼성 보증 안내
  - S8 설명서·캐나다 사양 페이지
  - 제트봇 먼지봉투 부품 페이지
  - 무빙스타일 제품 페이지
- 출처 제목에 본문이 인용하는 설명서 쪽수를 반영했다. 검수일은 공개 34개 모두 2026-10-08이다.
- 조사 원문이 없는 출처는 넣지 않았다. 공단·소비자원 페이지 일부는 블로그 출처 검사를 통과시키려고 근거 문서에 확인 절을 덧붙였는데, 실제로 2026-10-08에 연 원문만 해당한다.

### 보류한 주장 (요약)

전체는 영역 기록의 `held`(68건)에 있다. 판단에 영향을 주는 것 위주로 적는다.

- **삼성 RF85·RS84 설명서:** 지원 페이지의 설명서 목록이 늦게 불러와져 받지 못했다. 그래서 다음은 미확인이다: 설치 이격·문 연 치수, 맞춤보관실 설정 범위, 제빙기 급수 방식, RF85 컴프레서 보증.
- **확인 필요로 남긴 값:**
  - 실물 에너지 라벨에 찍히는 값이 제조사 값인지 신고값인지
  - WF24 살균세탁의 스팀 장치
  - 직렬 설치 완성 높이, 세탁기·건조기 사이 간격
  - TCL TAC-12CSD의 공단 신고(3.5kW·4등급은 판매 정보값)
  - 하이얼06 24시간 타이머, 제트봇 주행 센서(라이다) 구성
  - TCL·AR07 냉매와 TCL 필터 종류는 근거가 없어 값을 비웠다
- **원문 접근 실패:** 다이슨·샤오미 국내 페이지(403), 소니 사양표(403), AppleInsider·RTINGS. 확인 못 한 값은 지우거나 저장된 기록의 관측일을 밝혔다.
- **나비엔 오류 코드 13건 중 원문을 다시 연 것은 Er54 하나.** 나머지는 확정형 단정만 지웠다.
- **TV:** 배터리 용량(Wh), 밝기(nit), VRR·ALLM, 일시불 구매 후 배터리 교체 비용.
- **식기세척기·정수기:** 1회 소비전력량, SK 순정 필터 단가·교체 공임.

### 남은 한계

- 동일 조건의 청소·ANC·건조·소음 실측, 고장률, 현재 가격은 여전히 없다. 2차 교정도 새 실측이 아니라 원문 대조·계산·편집이다.
- 화면에 나가지 않는 `reviews`·`purchaseLinks`(url '#') 데이터와 비공개 제품에는 사양과 어긋나는 문장이 남아 있다. 비공개 제품을 공개하기 전에 교정이 필요하다.
- 브랜드 메타 설명(`src/lib/brand-copy.ts`)은 제품 수·가격·코드 유무와 무관한 고정 문구다.
- `tco-calculator.tsx`·`energy-grade-impact.tsx`에는 출처 없는 비유와 고정 배율이 남아 있다. 지금은 공개 제품 0개에서 렌더된다.
- AR07은 정확 모델의 두 번째 인정 발행처가 생기기 전까지 noindex다. 같은 회사 페이지를 쪼개거나 관련 없는 출처를 넣어 되돌리지 않는다. (3차 정정: 2026-10-09 사용자 승인으로 삼성전자서비스의 AR07A9170HCN 모델별 다운로드 페이지를 등재해 색인으로 돌아갔다. 아래 3차 절 참조.)

### 검증

- `npm run lint`: 통과
- `npx vitest run`: 24개 파일 1,929건 통과
  - 1차의 1,930건보다 1건 적다. AR07 가격 출처를 지우면서 `VERIFIED_PRICES` 항목마다 도는 검사가 하나 줄었다(25→24항목).
  - 테스트 파일은 고치지 않았다.
  - 작업 중 걸린 회귀(버즈3 요약의 '갤럭시' 누락, 체험형 문구 검사에 걸린 표현 3건)는 데이터 쪽을 고쳐 통과시켰다.
- `npm run build`: 통과. 최종 소스 기준 빌드는 16:41이다. 그 뒤 바뀐 `src`·`scripts` 파일은 없다.
  - 사이트 공통 담당의 후속 수정과 조정자의 사양 필드 교정이 첫 검증 뒤에 들어왔다. 그래서 lint·tsc·테스트·빌드·HTML 대조·브라우저 검사를 최종 소스로 다시 돌렸고, 아래 수치는 그 결과다.
- `npx tsc --noEmit --incremental false`: 오류 0건
- 정적 HTML 154개 대조: 본문 변경 148, 새 페이지 0, canonical 변화 0, robots 변화 1(AR07), 깨진 내부 링크 0. 사이트맵 102개.
- 브라우저: 16개 경로를 390px·1440px로 32건 검사했다([기록](../research/evidence/content-value-2026-10-08/pass2/browser.json)).
  - 페이지 오류·가로 넘침·깨진 이미지 0건.
  - 가격대 칩과 "같은 값이면" 문구 0건.
  - aside 브라우저에 창 크기 API가 없어, 같은 출처 iframe의 폭을 고정해 미디어 쿼리를 적용했다.
  - 가격 섹션 모바일 화면은 [캡처](../research/evidence/content-value-2026-10-08/pass2/r5-value-390.png)로 확인했다.
- 조정자 표본 대조 7건 일치: WD25·WF24 AI 맞춤 9kg, T873·S834 문 연 치수, AR07 실외기 720×548×265mm, DV17 배수호스 90cm·70mm, DV17 물통 7ℓ(삼성 지원 페이지), Curv 각주 4. 쿠쿠 설명서는 저장 추출본이 비어 있어 이 방법으로는 대조하지 못했다.

### 배포할 때 할 일 (이번 범위 밖)

> 3차 교정 뒤 대상이 바뀌었다(100개 경로, AR07 색인 복귀). 배포 때는 아래 3차 절의 "배포할 때 할 일"을 따른다.

- `SITE_REVISIONS`에 배포일 항목을 등록한다. 대상 경로는 [사이트맵 본문 변경 99개](../research/evidence/content-value-2026-10-08/pass2/changed-sitemap.txt)다. 미배포 작업을 미리 넣지 않는다.
- 소재 사전 6개와 브랜드 15개의 `updated`(월 단위)를 배포일의 달로 올린다. 지금 올리면 월 단위 값이 사이트맵 lastmod로 나가 소재 날짜 형식 테스트가 깨진다. 그래서 배포 이력 등록과 함께 처리해야 한다.
- AR07의 noindex 전환이 운영 사이트맵에서 빠지는지 확인한다.

## 3차 교정 — 보류 항목의 원문 확인과 기능 목록 대조 (2026-10-08 밤 ~ 10-09 오전)

2차에서 보류한 항목을 1차 원문으로 다시 확인했다. 2차까지 대조하지 않았던 공개 제품의 기능 목록(`features[]`)도 정확 모델 자료와 하나씩 맞췄다. 2차 때 WebFetch 403이나 스크립트 로딩 때문에 열지 못한 원문은 브라우저(`aside repl`)로 열었다. 새 글은 만들지 않았다. 운영 배포·재심사 제출·커밋은 하지 않았다.

### 방법과 측정 사양

- **분담:** 2차와 같은 10개 영역 담당이 이어서 맡았다.
  - 판정은 확인·수정·삭제·확인 필요(유지) 네 가지로 나눴다.
  - 원문에서 찾지 못했고 같은 원문의 대조군 값은 잡히면 "삭제"로 판정했다.
  - 공용 설명서 값은 "공용 설명서 기준"으로 밝혔다.
  - 출처 등재(생성 스크립트·출처표)는 조정자가 맡았다.
- **원문 발췌:** 판정에 쓴 문장과 표 행만 [`pass3/sources/`](../research/evidence/content-value-2026-10-08/pass3/sources/)에 70개 파일로 저장했다.
  - 파일 첫 줄에 URL·열람 일시·방법을 적었다.
  - 페이지 전체, 쿠키, 토큰은 저장하지 않았다.
- **기록:** 영역 기록은 `pass3/<영역>.json` 10개다. 조정자 기록은 [`pass3/coordinator.json`](../research/evidence/content-value-2026-10-08/pass3/coordinator.json)이다.
- **집계 단위:** 아래 "기록 항목"은 영역 JSON의 항목 수다.
  - 한 항목이 여러 페이지를 고친 경우가 있다.
  - 담당이 메시지로 보고한 수와 1~2건 다를 수 있다. 표는 JSON 기준이다.
  - 페이지 변경은 정적 HTML의 `<main>` 텍스트로 따로 셌다.
  - 비교 기준은 2차 최종 빌드(2026-10-08 16:41)와 교정 전 빌드다.

### 결과 요약

| 지표 | 값 | 측정 방법 |
| --- | --- | --- |
| 보류 항목 원문 확인 | 155건: 확인 57·수정 81·삭제 6·확인 필요 11 | 영역 JSON `resolved` |
| 기능 목록 대조 | 공개 제품 34개 전부, 174건: 확인 121·수정 51·확인 필요 2 | 영역 JSON `featuresAudit`. 현재 기능 항목은 175개다. 대조 중 제트봇 1개가 추가되고 쿠쿠 1개가 둘로 나뉘었다 |
| 아직 확인하지 못한 것 | 31건 | 영역 JSON `stillHeld` (아래 절) |
| `<main>` 본문 변경 | 2차 대비 154개 중 122개, 교정 전 대비 148개 | [목록(2차 대비)](../research/evidence/content-value-2026-10-08/pass3/changed-html-vs-pass2.txt) |
| 사이트맵 본문 변경 경로 | 103개 중 100개 | 2차 목록 99개 + AR07 제품 페이지 |
| 색인·canonical·새 페이지·깨진 내부 링크 | 2차 대비 1·0·0·0 | 정적 HTML 전수. robots 변화 1건은 사용자 승인에 따른 AR07 noindex 해제다(아래 절). 색인 가능 31, noindex 3 |
| 출처 | 생성 스크립트에 33건 추가, 기존 출처 제목 5건 변경(다이슨 필터는 두 제품 항목에 같은 제목) | `pass3/coordinator.json` generatorChanges |

### 2차 판단을 뒤집은 것

2차가 지웠거나 "확인 필요"로 낮췄는데 원문에 있던 것, 그리고 2차가 썼는데 원문과 달랐던 것이다.

| 대상 | 2차 상태 | 3차 원문 확인 |
| --- | --- | --- |
| WF-1000XM5 케이스 포함 24시간·골전도 센서·XM4 대비 소형화 | "다나와 등록값" 표시 또는 삭제 | 소니 기능 페이지(features8·3·4)에 있다. NC 켬 24시간·끔 36시간, 약 25% 작고 20% 가벼움. 복원했다 |
| 제트봇 AI 라이다 | 조정자가 5곳에서 삭제 | 국내 지원 페이지 "LIDAR센서 있음"·"3D센서 있음". 복원했고 "3D 라이다"처럼 원문에 없는 합성어는 쓰지 않았다 |
| 제트봇 청정스테이션 305×525×450mm | 스테이션 치수로 표기 | 해외형 자료의 로봇 포함 전체 크기였다. 국내 지원 페이지 기준 전체 305×544×450mm, 국내 설명서 기준 스테이션 단독 272×416×544mm |
| 제트봇 먼지봉투 적용 모델 | "국내 코드 없음" | 부품몰 원문에 VR50T95935W가 있다. WebFetch 요약을 그대로 믿은 오류였다 |
| QCY HT08 "Melobuds Pro Plus" | 근거 없다고 삭제 | 수입사 상세 머리글이 "QCY-HT08 Melobuds Pro Plus (QCY멜로버즈프로)"로 두 이름을 함께 적는다. 같은 HT08의 국내 판매명으로 적었다 |
| LG WD523ACB 출수구 살균 | "수동" | UVnano가 출수구 내부를 1시간마다 10분 자동 살균한다. 수동은 출수구 고온살균이다. 4곳을 고쳤다 |
| 식기세척기 애벌 | "두 설명서 모두 애벌이 아니라 찌꺼기 제거" | 쿠쿠 설명서 2쪽은 찌든 때가 심한 식기는 애벌세척 후 넣으라고 권한다 |
| 삼성 냉장고 주위 온도 5~43℃, RF85 냉동실 정온 | 출처 없음으로 삭제 | 삼성 공용 설명서에 있다. 공용 설명서 기준으로 복원했다 |
| RF85 슬림 아이스메이커 | T873보다 나은 점처럼 서술 | 물컵에 직접 급수하는 방식이다. 네 대 모두 자동 급수 제빙이 아니다 |
| 삼성 HC/HE 점검 코드 | 건조 팬 모터 동작 이상 | 목록 화면과 달리 상세 안내(solution/1491476)는 "세탁 히터 동작 이상"이다 |
| 샤오미 FCADR 150㎥/h·활성탄 500,000mg | 삭제 | mi.com/kr 각주에 있다. FCADR은 시험 각주가 없고, 활성탄은 제조사 자체 실험실 수치라는 조건과 함께 복원했다 |
| TCL TAC-12CSD 공단 신고 | 미확인 | 260240214(TAC-12CSD/TPH11I-I·O): 3,515W·137kWh·CSPF 5.201·4등급. 9/29 조회는 모델명 완전 일치만 찾아 "-I" 접미사를 놓쳤다 |
| 다이슨 965432-01 필터 59,000원 | 연간 필터비 근거 | 9/30 값은 행사가였다. 2026-10-08 판매가는 79,000원이다. 두 시점을 함께 적었다 |
| 스탠바이미 2 배터리 90Wh | 제품 페이지 값 | 사용설명서 정격은 85.15Wh(15.52V·5,486mAh)다. 설명서 값으로 바꾸고 불일치를 밝혔다 |
| 나비엔 E594/E615 | "사용자가 다룰 수 없음" | 원문 첫 조치는 "전원 코드를 뽑았다 다시 꽂아 확인"이다. 심각도를 낮췄다. 2차에 넣은 "토치·열풍기 금지"는 원문 텍스트에 없어 지웠다 |
| 에어팟 프로 3 "멀티포인트 미지원" | 유지 | Apple 문서에 그런 표현이 없다. "같은 Apple 계정 기기 간 자동 전환, 타사 기기 동시 연결 안내 없음"으로 바꿨다 |

### 모델코드 교정: 제트봇 AI

카탈로그 모델코드 VR50T95735W는 해외 지역형 코드다. 국내 판매 모델은 VR50T95935W다. 이미 [모델번호 감사](model-number-audit.md)(182행)에 "미국 SKU, 한국 판매 모델은 VR50T95935W"로 기록돼 있었다.

- **바꾼 것:**
  - modelNumber를 국내 코드로 교정했다.
  - 사양은 국내 지원 페이지와 국내 공용 설명서(VR50T95**** 시리즈) 기준으로 맞췄다.
  - 국내 자료에 없는 값만 "해외 지역형" 꼬리표를 달아 남겼다: 흡입력 30W, 3D 센서 감지 범위, 봉투 교체 간격.
- **바꾸지 않은 것:** slug·제품명·이미지 경로는 그대로다.
- **옛 코드 정리:** 옛 코드가 남은 21곳을 [변경/의도적 유지/제거]로 분류했다(`pass3/robot.json`).
  - 범위 밖 2곳은 조정자가 국내 코드로 바꿨다: `error-code-editorial.ts`의 커버리지 문구와 `scripts/fetch-official-specs.mjs`의 수집 대상.
  - 테스트 이름 1곳은 테스트 파일이라 그대로 뒀다.

### 조정자 확인

- **표본 원문 대조 9건:**
  - TCL12 공단 신고
  - RF85 공단 신고
  - RF85 컴프레서 10년 조건(2026-04-01 이후 구매, 최초 구매자)
  - 스탠바이미 2 85.15Wh
  - LG 출수구 UVnano
  - 소니 24·36시간·골전도·25%
  - 제트봇 국내 설명서
  - Stacking kit 가이드
  - 로보락 독일 페이지

  8건은 일치했다. 담당이 "본문 없음"으로 제거를 요청한 로보락 독일 페이지는 브라우저 UA로 받으면 200·1.28MB로 정상이었다. 그래서 출처를 지우지 않았다.
- **하이얼 06·10형 "인버터 컴프레서":**
  - 담당은 설명서에 표기가 없어 "확인 필요(유지)"로 두었지만, 화면 문장은 단정형 그대로였다.
  - 다나와 정확 모델 상품 두 건의 등록 사양에 "인버터"가 있어 값은 남겼다.
  - 대신 "다나와 등록 사양 표기, 제조사 설명서에는 표기 없음"으로 출처 수준을 밝혔다. 고친 곳은 설명·핵심 기술·기능 각 2곳과 벽걸이 글 FAQ 1곳이다.
- **같은 페이지 안의 반복 문장:**
  - 최종 HTML에서 한 페이지 안에 40자 이상 같은 문장이 두 번 이상 나오는 곳을 전부 찾았다.
  - 다이슨 글의 "이전 판 27㎡" 정정 고지는 3회에서 1회로 줄였다.
  - HP09 설치 메모의 멀티탭·커튼 문장은 같은 페이지 심층 리뷰와 겹쳐 지웠다.
  - 남은 6건은 오류 코드 허브에서 코드마다 붙은 조치 문장이다. 독자가 자기 코드만 읽는 구조라 유지했다.
- **출처 연결:**
  - 삼성 HC/HE·FC/FE 상세 안내는 WD25가 아니라 WF24 출처에 붙였다. WD25 페이지는 이 코드를 다루지 않는다.
  - 샤오미 가격은 조사가(2026-08-24 다나와)를 유지했다. 공식 스토어 표시가(2026-10-08 188,000원)는 본문에 날짜와 함께 병기돼 있다. 한 제품만 기준을 바꾸면 가격표 기준이 섞인다.

### 아직 확인하지 못한 것 (31건)

전체는 영역 JSON의 `stillHeld`에 있다. 화면에는 값을 비우거나, 출처 수준을 밝히거나, "확인하지 못함"으로 표시했다.

- **사양 원문 없음:**
  - TCL 2종 냉매·실외기 치수
  - HP09 무게(2026-08-24 대조 기록으로 표시)
  - TP07 풍량 단계 수
  - 샤오미 ≤64dB(A)의 측정 조건
  - S8 본체 치수·문턱 높이
  - Curv 먼지통 용량
  - R5 "먼지통 비우기 300초"의 정의
  - 스탠바이미 2·Max 높이 조절 범위
  - 무빙스타일 VRR·ALLM
  - 화면 밝기(nit)
  - Liberty 5와 QCY의 AAC
  - QCY 무게
  - 버즈3 프로 급속 충전
- **가격·비용 원문 없음:**
  - AR07 정확 모델 조사가
  - RF85 패널 색상별 가격
  - SK매직 WPU-A710C 필터 단가·교체 공임
  - 스탠바이미 일시불 배터리 교체 단가
- **모델 지정 근거 없음:**
  - SK매직 E4·F3·tS/tO의 DWA-81R0D 적용(설명서 자가진단표·FAQ 본문 조건으로 유지)
  - 로보락 Error 8(원문의 점검 대상이 불분명해 싣지 않음)
- **그 밖:**
  - WF24 살균세탁의 스팀 장치
  - 쿠쿠 건조 방식
  - 삼성 냉장고 상부 여유 수치
  - 실물 에너지 라벨 이미지
  - 직렬 설치 그림의 위쪽 150mm 의미
  - 다이슨 필터 수명 각주의 적용 범위
  - RS84 최신 안내서(DRM)
  - 나비엔 해빙 요령(이미지만 있음)

### 사용자 결정과 반영: AR07 두 번째 발행처

- **찾은 것:** 삼성전자서비스(samsungsvc.co.kr)의 AR07A9170HCN 모델별 다운로드 페이지다.
  - 지금 인용 중인 공용 설명서(RAC068-02)를 이 모델의 매뉴얼로 연결해 준다.
  - 서버 HTML에서 모델코드와 설명서 두 종(RAC067·068)을 조정자가 직접 확인했다(2026-10-09).
  - 다나와에는 HCN 정확 모델 상품이 없다. HCS·HAS만 있고, 실외기 HAX 검색은 0건이었다.
- **판단 근거:**
  - samsungsvc.co.kr는 `OFFICIAL_DOMAINS`에 별도 발행처로 등재돼 있다(2026-09-02).
  - 제트봇 AI도 samsung.com과 samsungsvc.co.kr 두 도메인으로 게이트를 통과한다.
  - 반대 근거는 같은 삼성 계열이라는 점이다.
- **결정:** 사용자가 2026-10-09 등재를 승인했다(제트봇과 같은 기준).
- **반영:**
  - 출처표에 페이지를 넣었다.
  - 출처 목록에만 넣지 않고, 심층 리뷰 '디자인·설치'에 "공용 설명서를 이 모델의 매뉴얼로 연결한다"는 역할을 한 문장으로 밝혔다.
  - 같은 페이지의 2023년 개정판(RAC067-04)은 대조하지 않았다고 적었다.
- **결과:** AR07이 품질 게이트를 통과해 색인 가능 제품이 30개에서 31개가 됐다. 게이트 코드는 바꾸지 않았다.
- **남는 한계:**
  - AR07의 두 발행처는 삼성전자와 삼성전자서비스로 같은 계열이다.
  - 정확 모델의 조사가는 여전히 없다.
  - 2차 절의 "같은 회사 페이지를 쪼개 되돌리지 않는다"는 원칙은 samsung.com 안의 페이지를 뜻한다. 별도 인정 발행처인 삼성전자서비스는 이 결정으로 같은 기준을 적용했다.

### 검증

모두 최종 소스 기준이다. 빌드 시각은 AR07 출처 등재 뒤인 2026-10-09 08:30이다.

- **`npm run lint`:** 통과
- **`npx tsc --noEmit --incremental false`:** 출력 0줄
- **`npx vitest run`:** 24개 파일 1,929건 통과. 테스트 파일은 고치지 않았다.
- **`npm run build`:** 통과. `node scripts/generate-editorial.mjs`는 다시 돌려도 결과가 같다. `git diff --check`도 통과했다.
- **정적 HTML(2차 대비):** 154개 중 `<main>` 변경 122, 새 페이지·삭제 0, robots 변화 1(AR07 noindex 해제), canonical 변화 0, 깨진 내부 링크 0, 사이트맵 103개.
  - 교정 전 빌드와 비교하면 robots 변화는 0이다. AR07이 교정 전 상태(색인)로 돌아갔다.
  - 푸터 면책 문구를 고쳐 `<main>` 밖까지 보면 153개 페이지가 바뀐다.
- **브라우저:** 19개 검사(18개 경로)를 390px·1440px로 돌려 38건이다([기록](../research/evidence/content-value-2026-10-08/pass3/browser.json)).
  - 페이지 오류·가로 넘침·깨진 이미지·필수 문구 누락·금지 문구 잔존 모두 0건이다.
  - 필수·금지 문구의 예: 제트봇 VR50T95935W·305 × 544 × 450, 하이얼 "다나와 등록 사양", AR07 "RAC068-02", 방법론 "24개 중"(필수) / "대부분 다나와", AR07 "789,990"(금지)
  - AR07 페이지의 robots 메타가 비어 있는 것(색인 가능)도 기록했다.

### 남은 한계

- 2차 때와 같다. 같은 조건 실측·고장률·현재 가격은 없고, 이번 교정도 원문 대조와 편집이다.
- 원문 확인은 정확 모델 페이지·설명서·공단 신고로 했다. 판정 대부분은 담당이 저장한 발췌에 기대고, 조정자가 원문과 직접 대조한 것은 9건이다.
- Aside 브라우저에 담당들이 연 탭 4개가 남아 있다(공단 목록 2, sony.co.kr 사양 2). 이 버전에서는 `closeTab`이 실제로 닫지 못하고 `getTabs`도 없다.
- 마지막 출처 목록 추가 일부와 하이얼·HP09·다이슨 글 정리는 2026-10-09에 했다. 검수일 표기는 원문을 검토한 2026-10-08로 두었다. 운영 lastmod는 배포 이력 등록 때 배포일로 정해진다.

### 배포할 때 할 일

- `SITE_REVISIONS` 대상은 [3차 기준 사이트맵 본문 변경 100개](../research/evidence/content-value-2026-10-08/pass3/changed-sitemap.txt)다. 2차 목록 99개에 AR07 제품 페이지가 더해졌다.
- 푸터 문구만 바뀐 나머지 사이트맵 3개 경로(/privacy·/terms·하이얼 F25 상세)는 본문 변경이 아니어서 넣지 않는다.
- 소재·브랜드 `updated` 처리는 2차 절과 같다.
- 운영 사이트맵에 AR07이 다시 들어가는지(103개) 확인한다. 2차 절의 "AR07이 빠지는지 확인"은 이 항목으로 대체한다.

### 배포 기록 (2026-10-09)

- **커밋·배포:** 사용자 승인을 받아 1~3차 교정 전체를 `df89e08`로 main에 커밋하고 푸시했다.
  - GitHub Actions `Deploy to Cloudflare`가 성공했다(run 37860938729, 2026-10-08T23:42Z = 10-09 08:42 KST).
  - CI 단계는 lint·테스트·빌드·`wrangler deploy` 모두 통과했다.
- **배포 이력:**
  - `SITE_REVISIONS`에 2026-10-09 항목으로 사이트맵 본문 변경 경로 100개를 등록했다.
  - 브랜드 15곳·소재 6곳의 `updated`를 2026-10으로 올렸다. 카리어·신일은 공개 페이지가 없어 그대로 뒀다.
  - `site-revisions.test.ts`의 최신 lastmod 상한과 경로별 마지막 개편일 기대값 7개를 새 항목에 맞췄다. 와일드카드·비교 페어 신설일·접두사 누출 검사는 값이 그대로다.
- **운영 확인 (2026-10-09 08:4x KST, salimlab.kr 직접 요청):**
  - 사이트맵은 103개다. lastmod는 2026-10-09가 100개, 2026-10-02가 2개, 2026-08-25가 1개다.
  - 사이트맵의 103개 URL을 모두 받아 로컬 빌드와 `<main>` 본문을 대조했다. 103개가 같았고 다른 페이지·오류는 0이다.
  - AR07은 robots 메타가 없다(색인). "RAC068-02"·"삼성전자서비스"가 있고 "789,990"은 없다.
  - 제트봇은 VR50T95935W로 나간다. 하이얼은 "다나와 등록 사양"이 있고 "인버터 컴프레서"는 없다.
  - RS84·SK매직 2종은 `noindex, follow`다.
- **하지 않은 것:** AdSense 재심사 제출, Search Console 사이트맵 재제출.

## 외부 평가와 4차 교정 (2026-10-09)

배포 뒤 콘텐츠를 쓰지 않은 평가자 7명이 운영 사이트맵 103페이지 전부를 독립적으로 평가했다. 그 결과 가운데 사용자가 승인한 A(정확성 결함)와 B(반복·결론 없는 문장)를 고쳤다. C(글 통합·URL 변경·약한 페이지에 새 분석 추가)는 하지 않았다.

### 평가 방법과 결과

- **기준:** [평가 기준표](../research/evidence/content-value-2026-10-08/review-2026-10-09/_RUBRIC.md)를 결과를 보기 전에 고정했다.
  - 핵심 질문: "제조사 사양표나 쇼핑몰 상세만으로는 얻기 어려운 판단이 무엇인가"
  - 문단을 독자 분석·사양 재서술·일반론·근거 없는 단정으로 나누고, 0~3점과 문제 신호를 매겼다.
- **분담:** 평가자는 제품 2명, 블로그 2명, 가이드 1명, 허브 1명, 사실 검증 1명이다. 사실 검증 표본은 시드를 고정해 무작위로 뽑은 25페이지다.
- **점수:** 103페이지 분포는 0점 5, 1점 31, 2점 51, 3점 16이다.
  - 핵심 콘텐츠(제품·블로그 글·가이드)는 61개 중 53개가 2점 이상이고 0점은 없다.
  - 브랜드(평균 1.29)·오류 코드(1.50)·소재(1.29)는 재서술 비중이 높다.
- **대조군:** 원문을 실제로 연 33건 기준이다. 페이지의 가장 강한 판단이 원문에 없음 14, 부분적으로 있음 16, 그대로 있음 3이었다.
- **사실 검증:** 주장 40건 중 일치 39, 불일치 0, 출처 표기 누락 1. 페이지 안 계산 80개는 오류 0.
- **체험 위장 문장:** 0.
- **한계:**
  - 점수는 AI 평가자의 판정이라 탐색적이다.
  - 페이지마다 평가자가 1명이라 평가자 간 일치도는 재지 않았다.
  - 문단 비율은 눈으로 센 근사치다.
- 원본(평가자 JSON 7개, 지표, 분담표)은 [`review-2026-10-09/`](../research/evidence/content-value-2026-10-08/review-2026-10-09/)에 있다.

### 4차 교정 (A+B)

- **판정:** 영역 담당 10명이 평가 지적과 조정자 A 항목 315건을 원문과 대조해 고침 268, 기각 47로 판정했다. 영역별 기록은 [`pass4/`](../research/evidence/content-value-2026-10-08/pass4/)에 있다.
- **추론 오류 정정:**
  - 벽걸이 에어컨 글의 "약 40 냉방월"은 천 원 단위 라벨 요금에서 나온 값이었다. kWh 기준으로 다시 계산해 약 105~109 냉방월로 고쳤다. 계산은 라벨 암시 단가 216~224원/kWh × 1.7kWh = 월 368~380원, 40,000원 ÷ 그 값이다. CSPF를 이용한 같은 기준 비교도 더했다.
  - 스탠바이미 글의 "소비전력 1.8배·배터리 1.7배라 30분 차이"는 비율대로면 2 Max가 더 짧아야 해 모순이었다. 시험 모드가 다르다는 원문 조건으로 바꿨다.
- **페이지 안 모순 정정:**
  - T873·S834 높이는 "확실히 맞는다"고 단정하던 것을 두 기준으로 나눠 적었다: 상부장 아래 1,812·1,815mm, 천장 아래 1,887·1,890mm.
  - 본문이 부정한 숫자를 쓰던 제목 3개를 고쳤다(세탁 1,372mm, 냉장고 "1.6을 곱한", 이어폰 "4배").
  - /blog 약속 문장과 다이슨 요금 계산, 선풍기 가이드의 근거와 본문, /compare의 안내와 조합, 정수기 글의 가격과 카드가 서로 어긋나던 것을 맞췄다.
- **틀 문구:**
  - 가격 미확인 안내의 "도크·설치"·"아래 제품" 문구, 비보일러 허브의 가스 안내, 맥락 없는 "구매 후 참고용입니다.", "대표번호" 라벨(LG는 고객센터)을 고쳤다.
  - 상세 사양표가 위 절과 같은 크기·무게를 다시 싣던 중복은 34개 제품 전부에 있었고, 모두 고쳤다.
- **반복 정리:**
  - 결정 사실은 한 절에만 둔다.
  - 에디터 분석은 결론 1문장 + 근거 1개로 줄였다.
  - 결론 없는 FAQ·절은 조건부 답으로 바꾸거나 지웠다.
  - 정정 흔적 문장("이전 판…뺐습니다" 등)은 본문에서 지우고 코드 주석으로 옮겼다.
  - 브랜드 페이지에서 공개 제품이 없는 라인 약 20개를 덜어냈다.
- **가격 조건 표시:** WF24(색상만 다른 KF)·RF85(코타 화이트 구성) 가격 옆에 "…상품 가격"을 붙였다. 출처표 `variant` 필드를 쓴다.
- **기각 47건:** 대표 사례는 다음과 같다. 사유는 영역 JSON에 있다.
  - C 범위(새 분석·통합)
  - 테스트가 고정한 구조(비교 조합 선정 규칙, 브랜드별 라인 최소 1개)
  - 평가용 추출본에서만 보인 표시 문제
  - 출처 목록 정리 요청: 블로그가 인용하는 URL이고, 리버티5는 지우면 noindex가 된다

### 전후 지표

측정 단위는 사이트맵 경로 1개의 `<main>` 텍스트이고, 사이트맵 103 URL 전수다. 전은 배포본(df89e08), 후는 4차 빌드(13:23)다.

| 지표 | 전 | 후 |
| --- | --- | --- |
| 본문 글자 수 | 490,465 | 436,796 |
| 유보 표현 수 | 390 | 314 |
| 한 페이지 안 같은 문장(40자+) 반복 쌍 | 11 | 8 (모두 오류 코드 허브의 코드별 조치 문장) |
| 5페이지 이상에 같은 문장(30자+) 출현 수 | 550 | 378 |
| 지적된 틀 문구 출현 페이지 수 | 47 | 0 |
| 390px 가로 넘침 페이지 | 1 (/brand/Haier) | 0 |

### 검증 (4차, 2026-10-09 13:23 빌드)

- `npm run lint` 통과
- `npx tsc --noEmit --incremental false` 출력 0줄
- `npx vitest run` 24개 파일 1,929건 통과
- `npm run build` 통과, `git diff --check` 통과
- 배포본 대비 HTML 154페이지: 추가·삭제·robots·canonical 변화 0, 깨진 내부 링크 0, 사이트맵 103(본문 변경 97)
- 브라우저:
  - 390px 전수(103페이지) 가로 넘침 0
  - 4차 대상 19경로 × 390·1440px 38건 실패 0(필수·금지 문구 포함)
  - 작업 중 에어팟 메타분석 글에서 줄바꿈되지 않는 매체 나열로 생긴 넘침 1건을 찾아 고쳤다.

### 남은 한계

- 약한 페이지에 새 분석을 넣는 일과 겹치는 글 통합(스탠바이미 3종↔4종, 식기세척기 두 글 등)은 C로 남겼다.
- 제품 본문이 인용하지 않는 리뷰 출처가 일부 제품의 출처 목록에 남아 있다. 블로그가 그 URL을 쓰기 때문이다.
- 리버티5는 색인 게이트를 그 리뷰 출처로 통과한다.
- 4차 변경은 아래 배포 기록대로 2026-10-11에 배포했다. 10-09가 아니라 10-11에 배포했으므로, 10-09 항목에 덧붙이지 않고 10-11 항목에 97경로를 새로 등록했다.

### 4차 배포 기록 (2026-10-11)

- **커밋·배포:** 사용자 승인으로 `ec05998`을 main에 커밋하고 푸시했다. GitHub Actions `Deploy to Cloudflare` run 38111054430이 성공했다(2026-10-11T04:17Z). lint·테스트·빌드·`wrangler deploy` 모두 통과했다.
- **배포 이력:**
  - `SITE_REVISIONS`에 2026-10-11 항목으로 직전 배포 빌드 대비 `<main>`이 바뀐 사이트맵 경로 97개를 등록했다.
  - `site-revisions.test.ts`의 최신 lastmod 상한과 경로별 마지막 개편일 기대값 7개를 새 항목에 맞췄다. 와일드카드·비교 페어 신설일·접두사 누출 검사는 값이 그대로다.
- **커밋 전 검증:** lint·tsc(출력 0줄)·vitest 1,929건·build·`git diff --check` 통과. 로컬 사이트맵에서 lastmod 2026-10-11인 경로가 변경 목록 97개와 정확히 같았다.
- **운영 확인 (2026-10-11 13시대 KST, salimlab.kr 직접 요청):**
  - 사이트맵은 103개다. lastmod는 2026-10-11이 97개, 2026-10-09가 4개, 2026-10-02·2026-08-25가 각 1개다.
  - 103개 URL을 모두 받아 로컬 빌드와 `<main>`을 대조했다. 같음 103, 다름 0, 오류 0.
  - 다음 표본에서 필수 문구가 있고 금지 문구가 없음을 확인했다.
    - WD25 비교 카드의 "WF24A9500KF"(도크 문구 없음)
    - T873 "1,887"
    - 에어컨 글 "CSPF"("약 40 냉방월" 없음)
    - 메타분석 필수 고지
    - LG "고객센터"
    - 쿠쿠 허브(가스 밸브 없음)
    - /compare("자주 비교되는" 없음)
  - AR07은 robots 없음(색인), RS84·SK매직 2종은 `noindex, follow`다.
- **하지 않은 것:** AdSense 재심사 제출, Search Console 사이트맵 재제출, C 범위(글 통합·새 분석).
