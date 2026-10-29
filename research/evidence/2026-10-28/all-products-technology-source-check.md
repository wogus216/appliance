# 공개 제품 전체 기술·관리 근거 대조

확인일: 2026-10-28. 공개 카탈로그 34개 중 기존 4개를 유지하고 나머지 30개 정확 모델의 기술·사용 조건·관리 항목을 추가했다. 아래는 새 30개에 사용한 자료다. 숨김·미검증 제품을 공개하거나 유사 모델에 자동 적용하지 않았다.

## 확인 방법과 원문 기록

- 모델별 공식 지원 페이지·사양·사용설명서를 다시 수신해 주장과 관리 조건을 대조했다. PDF는 텍스트로 읽고 스캔 설명서는 해당 쪽 이미지로 확인했다. 제조사 광고의 효과를 독립 시험 결과로 표시하지 않았다.
- [원문 수신 기록](all-products-technology-sources.json)에 모델·출처 ID·URL·확인일·수신 결과·SHA-256을 보관한다. 해시는 당시 받은 문서의 동일성을 확인하기 위한 값이며 영구 유효성 보장은 아니다.
- Sony 사양·멀티포인트 도움말은 셸 요청이 403이어서 웹 도구로 공식 본문을 열었다. 이 두 자료에 수신 파일 해시를 만들지 않았다.
- Dyson 제품 페이지 일부는 403이었지만 공식 한국어 PDF는 수신·대조했다. 차단된 상품 페이지의 본문을 읽었다고 기록하거나 이를 새 근거로 쓰지 않았다.
- QCY 국내 수입사 주소는 한글 경로를 URL 인코딩해 재수신했고 HTTP 200 본문에서 LDAC·멀티포인트 제한을 확인했다. 글로벌 판매 페이지와 국내 HT08 사양의 범위를 구별했다.
- 하이얼 공용 설명서는 스캔 PDF다. CTH06 설명서 PDF 14쪽의 인쇄 25~26쪽 필터·손질 안내, CTH10 설명서 PDF 14쪽의 인쇄 23~24쪽 장기 보관 안내 등을 이미지로 읽었다. 추출 텍스트 길이가 짧다는 이유로 내용 확인 완료로 간주하지 않았다.

## 모델별 적용 내용

각 출처의 세부 절은 제품 데이터의 `evidence.location`에 연결했다. `manual`은 설명서, `spec`은 주요 공식 사양·제품 페이지, `extra`는 추가 공식 자료다. ID가 문서 종류를 완벽히 뜻하지는 않는다. 예를 들어 Apple의 추가 사양 페이지와 삼성 일부 광고 각주가 `extra`다.

| 품목 | 정확 모델 | 기능·관리 영역 | 대조한 원문 |
| --- | --- | --- | --- |
| 에어컨 | AR07A9170HCN | 무풍·기류 조절 · 먼지거름 필터 · 내부 건조·보관 | [manual](https://downloadcenter.samsung.com/content/UM/202105/20210513131032816/RAC068-02_IB_21Y_AR9500T_MOTION_DETECT_KR_KO_210428-D04.pdf) · [spec](https://www.samsung.com/sec/support/model/AR07A9170HCN/) · [extra](https://www.samsungsvc.co.kr/download/view?code=AR07A9170HCN&prd1DepNm=%EC%97%90%EC%96%B4%EC%BB%A8&prd2DepNm=%EB%B2%BD%EA%B1%B8%EC%9D%B4%28%EC%B0%BD%EB%AC%B8%29%20%EC%97%90%EC%96%B4%EC%BB%A8) |
| 세탁기 | WF24A9500KE | 자동 투입 세제함 · 급수 거름망·배수 필터 · 무세제 통세척 | [manual](https://downloadcenter.samsung.com/content/UM/202304/20230407100730025/Drum_WF8000AK_WF21A9400_WF24A9500_9501.pdf) · [spec](https://www.samsung.com/sec/support/model/WF24A9500KE/) |
| 냉장고 | RF85C90D1AP | 트리플 독립냉각 · 맞춤보관실 · 문 열림·방열 공간 | [manual](https://downloadcenter.samsung.com/content/UM/202312/20231211100502613/RF9000C_CC_2023_UM_DA68-04671A_KO_UA_230804.pdf) · [spec](https://www.samsung.com/sec/support/model/RF85C90D1AP/) |
| 냉장고 | RS84B5061M9 | 더블냉각 · 좌우 냉장·냉동 · 문 열림·방열 공간 | [manual](https://downloadcenter.samsung.com/content/UM/202206/20220608185736816/RS5000T_3Door.pdf) · [spec](https://www.samsung.com/sec/support/model/RS84B5061M9/) |
| 로봇청소기 | VR50T95935W | 3D·LiDAR 센서 · 본체 먼지통·필터 · 청정스테이션 | [manual](https://downloadcenter.samsung.com/content/UM/202512/20251216141652843/O-DJ68-00846A-16_IB_VR9500_KO_KO_251209.pdf) · [spec](https://www.samsung.com/sec/support/model/VR50T95935W/) |
| 세탁기 | WD25DB8995BZ | 세탁·히트펌프 건조 · 배수·건조 먼지 필터 · 세제 자동 투입 | [manual](https://downloadcenter.samsung.com/content/UM/202608/20260818083830741/OID76616_IB_T-PJT_WD8000D-AD_7LCD_KO_260814.pdf) · [spec](https://www.samsung.com/sec/support/model/WD25DB8995BZ/) |
| TV | KU27LSFM7AXXKR | QHD 화면·프로세서 · 터치·화면 공유 · 분리 화면·배터리 | [manual](https://downloadcenter.samsung.com/content/EM/202605/20260508041921001/BN68-23869C-01_SUG_LSM7F%2027_KR_KOR_260417.0.pdf) · [spec](https://www.samsung.com/sec/support/model/KU27LSFM7AXXKR/) · [extra](https://www.samsung.com/sec/tvs/the-movingstyle-lsfm7-d2c/KU27LSFM7AXXKR/) |
| 무선이어폰 | SM-R630N | 2-way·듀얼 앰프 · 코덱·자동 전환 · ANC·배터리·케이스 | [spec](https://www.samsung.com/sec/buds/galaxy-buds/galaxy-buds3-pro/) · [extra](https://www.samsung.com/sec/buds/galaxy-buds/galaxy-buds3-pro/specs/) |
| 냉장고 | T873MEE111 | 인버터 리니어·정온 · 매직스페이스 · 문 열림·방열 공간 | [manual](https://gscs-b2c.lge.com/open/downloadFile?fileId=a8sdGu0vrerKMqWmu5nkQ) · [spec](https://www.lge.co.kr/product/refrigerators/t873mee111) |
| 정수기 | WD523ACB | 중금속9·바이러스 필터 · 직수관·출수구 관리 · 출수구·물받이 | [manual](https://gscs-b2c.lge.com/open/downloadFile?fileId=jO7RH8OLgibKoMzZYJqKw) · [spec](https://www.lge.co.kr/product/care-solutions/water-purifiers/wd523acb?modelId=MD10017831&pdpType=SUBSCRIPTION) · [extra](https://www.lge.co.kr/product/object-collection/wd523acb) |
| 로봇청소기 | RO585HGH | 라이다 주행 · 흡입·물걸레 · 올인원타워 | [spec](https://www.lge.co.kr/product/vacuum-cleaners/ro585hgh) |
| 냉장고 | S834MWW1D | 인버터·정온 · 양문형·수동 제빙 · 문 열림·방열 공간 | [manual](https://gscs-b2c.lge.com/open/downloadFile?fileId=pYFpi7CzmmgetzthPkurQ) · [spec](https://www.lge.co.kr/product/refrigerators/s834mww1d) |
| TV | 27LX6TPGA | 분리형 QHD 화면 · webOS·터치 · 배터리·USB-C | [manual](https://gscs-b2c.lge.com/open/downloadFile?fileId=Tl3sJzEVjhEk8mS5e3tmw) · [spec](https://www.lge.co.kr/stan-by-me/27lx6tpga) |
| TV | 32LX6BPGA | 32형 4K 화면 · 가상 채널 음향 · 144Wh 배터리 | [manual](https://gscs-b2c.lge.com/open/downloadFile?fileId=QtVqT3GbiUtdGG5demnHcg) · [spec](https://www.lge.co.kr/stan-by-me/32lx6bpga) |
| TV | 27LX5QKNA | 케이스·화면 · 27형 화면·webOS · 배터리·전원 스위치 | [manual](https://gscs-b2c.lge.com/open/downloadFile?fileId=z0LRJfepnQfS0bHp7CZT4g) · [spec](https://www.lge.co.kr/stan-by-me/27lx5qkna) |
| 에어컨 | TAC-08CSD/TPH11I | 인버터 냉방 · 마이크로홀·기류 · 자동 내부 청소 | [spec](https://www.tcl.com/kr/ko/air-conditioners/tac-08csd-tph11i) |
| 에어컨 | TAC-12CSD/TPH11I | 인버터 냉방 · 마이크로홀·기류 · 자동 내부 청소 | [spec](https://www.tcl.com/kr/ko/air-conditioners/tac-12csd-tph11i) |
| 에어컨 | CTH06QBW | 흡입·송풍 공간 · 먼지 필터 · 장기 미사용·재사용 | [manual](https://www.haier.co.kr/include/download.asp?file_name=HSU06_Series__CTH06_Series_%EC%82%AC%EC%9A%A9%EC%84%A4%EB%AA%85%EC%84%9C_20240221.pdf&file_full_name=00000002312024000262_file1.pdf&folder=0000000231) · [spec](https://www.haier.co.kr/board/board_manual/board_list.asp?scrID=0000000231&pageNum=3&subNum=7&ssubNum=1&page=1&s_string=CTH06QBW) |
| 에어컨 | CTH10QBW | 흡입·송풍 공간 · 먼지 필터 · 장기 미사용·재사용 | [manual](https://www.haier.co.kr/include/download.asp?file_name=HSU10Q_Series__CTH10Q_Series_%EC%82%AC%EC%9A%A9%EC%84%A4%EB%AA%85%EC%84%9C_20240221.pdf&file_full_name=00000002312024000264_file1.pdf&folder=0000000231) · [spec](https://www.haier.co.kr/board/board_manual/board_list.asp?scrID=0000000231&pageNum=3&subNum=7&ssubNum=1&page=1&s_string=CTH10QBW) |
| 선풍기 | TP07 | 송풍·풍향 · HEPA·탄소 필터 · 센서·외부 관리 | [manual](https://www.dyson.co.uk/content/dam/dyson/maintenance/user-guides/kr_kr/EC_438E_TP09_07_User_Manual.pdf) |
| 선풍기 | HP09 | HEPA·탄소·촉매 · 온풍·송풍 · 자동 모드·센서 | [manual](https://www.dyson.co.uk/content/dam/dyson/maintenance/user-guides/kr_kr/EC_527E_HP09_User_Manual.pdf) |
| 공기청정기 | AC-M16-SC | 360도 흡입·송풍 · 고효율·활성탄 필터 · OLED·앱 관리 | [spec](https://www.mi.com/kr/product/xiaomi-smart-air-purifier-4/) · [extra](https://www.mi.com/kr/product/xiaomi-smart-air-purifier-4/specs/) |
| 제습기 | DN2H160-IWK | 제습·흡입 공간 · 물통·연속배수 · 세척형 프리필터 | [manual](https://kr.object.ncloudstorage.com/w2r-commerce-winix/USEMANUAL/202507/250722111846926-78c8424e1fa84ce2bc3fd07992f4d6f2.pdf) · [spec](https://www.winix.com/product/790) |
| 식기세척기 | DWA-81R0D | 천장·상하 분사날개 · 자동 문열림·열풍 · 둥근·사각 거름망 | [spec](https://m.manual.skmagic.com/2019/model/DWA/DWA81R0D00SL/Manual.htm) |
| 정수기 | WPU-A710C | 3단계 직수 필터 · 빙축열·순간 가열 · 코크 UV·물받이 | [spec](https://qr.skmagic.com/2019/model/WPU/WPUA710CRERO/Manual.htm) |
| 로봇청소기 | Qrevo Curv | DuoDivide 브러시 · 본체 세척 필터 · 듀얼 걸레·도크 | [manual](https://support.roborock.com/hc/en-us/article_attachments/46138473099289) · [spec](https://kr.roborock.com/pages/roborock-qrevo-curv) · [extra](https://help.roborock.com/us/product/roborock-qrevo-curv-message?category=troubleshooting) |
| 무선이어폰 | A3063 / A3064 / A3122 | 드라이버·H2 · 기기 연결·기능 조건 · 이어폰·충전 케이스 | [spec](https://www.apple.com/kr/airpods-pro/) · [extra](https://www.apple.com/kr/airpods-pro/specs/) |
| 무선이어폰 | WF-1000XM5 | 8.4mm 드라이버 · 멀티포인트 · 코덱·배터리 | [spec](https://www.sony.co.kr/headphones/products/wf-1000xm5/spec) · [extra](https://helpguide.sony.net/mdr/2963/v1/en/contents/TP1001106282.html) |
| 무선이어폰 | A3957 | 울-페이퍼 드라이버 · LDAC·듀얼 연결 · Dolby·케이스 | [spec](https://www.soundcore.com/products/a3957-liberty-5-tws-earbuds?variant=45054923014334) · [extra](https://service.soundcore.com/article-description/Can-I-use-Dual-Connections-and-LDAC-or-Dolby-Sound-simultaneously) |
| 무선이어폰 | HT08 | 하이브리드 ANC · LDAC·멀티포인트 · 배터리·Type-C | [spec](https://www.qcy.com/products/qcy-melobuds-pro?spec=1879) · [extra](https://ylshop.co.kr/product/qcy-ht08-멜로버즈-프로-플러스-블루투스-이어폰-노이즈캔슬링-블랙/977/category/24/display/1/) |

## 모델 간 혼동을 막은 조건

- 냉장고: RF85의 맞춤보관실과 RS84의 양문형·푸드쇼케이스를 구별한다. T873의 노크온, S834의 노크온·매직스페이스·자동 제빙은 미지원으로 명시한다. 문 개방·방열 공간은 기존 설치 도구의 모델별 설명서 범위를 따른다.
- 세탁·건조: WF24와 WD25의 자동 세제함 관리, 배수 필터와 건조 먼지 필터를 나눈다. WD25는 배수 필터 주 1회 이상과 건조 코스 후 매번 청소를 구별한다.
- 로봇청소기: 삼성 제트봇 본체의 물 세척 허용 필터와 스테이션의 물 세척 금지 고성능 필터를 나눈다. Qrevo Curv의 걸레 1~3개월과 기존 S8 Pro Ultra의 3~6개월 교체 기준을 합치지 않는다. Qrevo 공식 영문 자료는 국내 동봉 설명서 우선, 선택형 자동급배수는 미가정이다.
- LG R5와 TCL 두 모델은 공식 제품 기능 설명은 확보했지만 이번 자료에서 필터별 고정 청소 주기는 확인하지 못했다. 사용자에게 이 범위를 표시하며 다른 제품의 주기를 가져오지 않는다.
- Dyson TP07은 공용 설명서의 TP09 촉매를 적용하지 않는다. HP09의 교체 불필요 촉매와 교체형 HEPA·카본을 구별한다. 선풍 기능을 실내 냉방기로 해석하지 않는다.
- LG WD523은 중금속9·바이러스 클리어 필터의 서로 다른 관리 제공 주기와 계약·수질 조건을 함께 표시한다. SK매직 WPU는 이 모델의 설명서만 사용하고 코웨이 필터 자가 교체 시 전원 예외를 옮기지 않는다.
- 이동형 TV: 삼성 QHD 패널과 AI 4K 프로세서 이름, LG Max 물리 2.0ch와 가상 11.1.2 처리를 구별한다. LG 27형·32형 충전 조건과 Go 후면 전원 스위치를 모델별로 둔다. 휴대용 케이스를 방수 보장으로 해석하지 않는다.
- 이어폰: Liberty 5는 두 기기와 LDAC 또는 Dolby 동시 사용 조건, HT08은 LDAC 사용 시 멀티포인트 해제를 각각 연결한다. Sony 두 기기 전환을 동시 음원 혼합으로 표현하지 않는다. Galaxy·Apple 전용 기능은 기기·OS·지역 조건을 둔다.

## 기존 4개와 표현 범위

기존 [쿠쿠·삼성 건조기·로보락 S8 대조](appliance-technology-source-check.md) 및 [코웨이 근거 기록](../2026-10-27/purifier-technology-source-check.md)의 내용을 유지한다. 과거 기록의 ‘세 모델만’은 당시 추가 범위이며, 현재 공개 적용 범위는 34개다.

범용 연결도는 확인한 기능·관리 영역을 묶는다. 실제 냉매·전기·배관 회로나 내부 부품 배치, 검증되지 않은 동작 순서를 그리지 않는다. 관리 확인 체크는 설명서와 내 내역을 확인했다는 표시이며 실제 청소 완료·잔여 수명·성능 판정이 아니다. 소비전력·월 전기요금·살균 결과를 이 연결도로 추정하지 않는다.
