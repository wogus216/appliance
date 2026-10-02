# 다이슨 TP07·HP09 코드표 대조 — 2026-10-02

- [다이슨 TP07 한국 고객지원](https://www.dyson.co.kr/products/air-quality/dyson-purifier-cool-formaldehyde/owners-tp07)이 연결한 [한국어 TP07·TP09 공용 설명서](https://www.dyson.co.uk/content/dam/dyson/maintenance/user-guides/kr_kr/EC_438E_TP09_07_User_Manual.pdf)를 확인했다. PDF 7–8쪽은 LCD·앱에서 남은 필터 수명을 확인하고, 전원 분리 후 필터를 교체한 다음 리모컨 야간 모드 버튼으로 수명 표시를 초기화하도록 안내한다.
- [다이슨 HP09 한국 고객지원](https://www.dyson.co.kr/products/air-quality/dyson-purifier-hot-cool-formaldehyde/owners)이 연결한 [한국어 HP09 설명서](https://www.dyson.co.uk/content/dam/dyson/maintenance/user-guides/kr_kr/EC_527E_HP09_User_Manual.pdf)도 필터 수명·교체·초기화 절차를 안내한다.
- 두 설명서에는 사이트가 TP07·HP09의 모델별 고장 코드라고 게시했던 `F·F2·E·AQ·CL·U1·HH·CN`의 의미를 대조할 수 있는 코드표가 없다. 따라서 이 항목들의 원인·재시작 시간·와이파이 초기화 조치를 해당 제품의 확정 진단으로 실을 근거가 없다. 두 제품의 `errorCodes`를 제거하고 `/error-codes/Dyson`을 정적 경로·사이트맵에서 제외한다.
- 필터 수명 표시는 이 제품에서 설명서로 확인 가능한 사용자 안내다. 제품 상세에는 교체 전 전원 분리, 호환 필터 확인, 교체 후 수명 표시 초기화 절차를 남긴다. 설명서에 코드표가 없다는 사실은 기기에 어떤 오류 표시도 존재하지 않는다는 뜻은 아니며, 특정 표시가 뜨면 기기 일련번호로 다이슨 고객지원에서 확인해야 한다.
