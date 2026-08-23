// 모델번호를 확인하지 못해 공개를 보류한 제품 목록.
//
// 근거: docs/model-number-audit.md (2026-08-23, 74개 전수, 다나와 통합검색 대조).
// 여기 있는 slug는 카탈로그 데이터에는 남아 있지만 `allAppliances`에서 빠져
// 페이지가 생성되지 않고, 목록·비교·유사제품·에러코드 어디에도 나오지 않는다.
//
// 왜 지우지 않는가: 실재하지 않는다고 단정한 것이 아니라 확인하지 못한 것이다.
// 렌탈 전용(코웨이·SK매직·쿠쿠)은 다나와 미등록이 정상일 수 있다. 제조사 공식
// 페이지에서 모델번호와 사양을 확인하면 이 목록에서 한 줄 지우는 것만으로 되살아난다.
//
// ⚠️ 줄을 지우기 전에 반드시: ① 모델번호를 제조사 공식 페이지에서 확인하고
//    ② 그 URL을 src/lib/data/editorial/product-editorial.ts 에 출처로 남길 것.

export const UNVERIFIED_SLUGS: ReadonlySet<string> = new Set([
  // 에어컨
  'carrier-cpae-a100fwea', // CPAE-A100FWEA
  'carrier-cpam-a200pda', // CPAM-A200PDA
  // 공기청정기
  'coway-duo-air-purifier', // AP-2023C
  // 제습기
  'coway-inverter-dehumidifier-10l', // AD-1018B
  'coway-inverter-dehumidifier-16l', // AD-1623A
  // 공기청정기
  'coway-noble-ap-3023a', // AP-3023A
  // 정수기
  'coway-noble-water-purifier-chp', // CHP-7311N
  // 식기세척기
  'cuckoo-dishwasher-builtin-12', // CDW-A1200FW
  // 정수기
  'cuckoo-inspure-ice-water-purifier', // CP-ISN0210L
  // 냉장고
  'haier-mini-fridge-155', // HRB-155MDW
  // 세탁기
  'haier-mini-washer-wmd3', // HWM30-22
  // 로봇청소기
  'lg-codezero-r5-robot', // R585GA
  // 식기세척기
  'lg-dios-dishwasher-steam-14', // DUE14GW
  'lg-dios-dishwasher-truesteam-dt14', // DUBJ4ESS
  // 공기청정기
  'lg-puricare-360-as203nw3a', // AS203NW3A
  // 선풍기
  'lg-puricare-aerotower-fs061pwua', // FS061PWUA
  // 제습기
  'lg-puricare-dehumidifier-dq16sdwhs', // DQ16SDWHS
  // 세탁기
  'lg-tongdolyi-washer-tr25', // TR25WK1
  // 건조기
  'lg-trom-heatpump-dryer-rh14', // RH14ETN
  'lg-trom-mini-dryer-3kg', // RH3W
  'lg-trom-obje-dryer-rd20wswhs', // RD20WSWHS
  // 세탁기
  'lg-trom-obje-fw25eswhs', // FW25ESWHS
  // 제습기
  'lg-whisen-dehumidifier-20l', // DQ20GPWHS
  // 에어컨
  'lg-whisen-obje-fq25sdwhs', // FQ25SDWHS
  'lg-whisen-wall-sq07edawhs', // SQ07EDAWHS
  // 공기청정기
  'samsung-bespoke-cube-air-ax90', // AX90B7980WBD
  // 제습기
  'samsung-bespoke-dehumidifier-dg16a7500', // DG16A7500
  // 식기세척기
  'samsung-bespoke-dishwasher-dw60', // DW60A8375BB
  // 냉장고
  'samsung-bespoke-kitchenfit-rf60', // RF60A91R3AP
  // 에어컨
  'samsung-bespoke-wind-free-af25a9970', // AF25A9970
  // 세탁기
  'samsung-bubblewash-top-wa16', // WA16T6261BV
  // 건조기
  'samsung-grande-dryer-dv14', // DV14B8520BV
  'samsung-inverter-heatpump-dryer-dv10', // DV10B6320LV
  // 선풍기
  'shinil-bldc-stand-sif14bldc', // SIF-14BLDC
  'shinil-cordless-fan-sif10', // SIF-10CF
  // 정수기
  'skmagic-super-ice-water-purifier', // WPU-I9200C
  // 에어컨
  'tcl-tac-07cwa-window', // TAC-07CWA/TPH21I
  // 공기청정기
  'winix-tower-xq-azbe630', // AZBE630-IWK
  // 로봇청소기
  'xiaomi-robot-vacuum-x10', // BHR6068EU (EU/글로벌)
  // ── 2026-08-23 2차 감사에서 추가 (docs/spec-audit.md)
  // 로봇청소기
  'xiaomi-robot-vacuum-x20', // B116CN — 본품 상품 페이지 없음. 흡입력 6000Pa 표기가
  //   같은 카탈로그의 로보락 S8·삼성 제트봇과 동일해 근거가 없고, 다나와의 X20 Pro는 7,000Pa다.
  // 선풍기
  'xiaomi-mijia-dc-fan-1x', // BPLDS01DM — 부품 호환 표기로만 등장한다.
  //   국내 유통 본품은 BPLDS02DM·03DM·09DM 계열이라 어느 SKU인지 특정할 수 없다.
]);
