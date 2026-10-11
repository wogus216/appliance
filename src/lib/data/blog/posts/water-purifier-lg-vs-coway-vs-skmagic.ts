import type { BlogPost } from '@/types/blog';
import { SITE_AUTHOR } from '@/lib/constants';

// 정확한 모델의 제조사 제품 페이지·설명서 기준. 구성·필터 방식과 관리 안내를 구분한다.
export const waterPurifierLgVsCowayVsSkmagic: BlogPost = {
  slug: 'water-purifier-lg-vs-coway-vs-skmagic',
  title: 'LG·코웨이·SK매직 정수기 3종: 온수·얼음·필터 관리 비교',
  description: 'WD523ACB, CHPI-7400N, WPU-A710C를 얼음 여부, 필터를 누가 가는지, 살균 기능 뒤에 남는 관리, 공단 신고 전기요금과 LG 구매·구독 월 환산액으로 비교합니다.',
  kind: '비교',
  question: '이 세 정수기는 온수와 얼음, 필터 관리 방식이 어떻게 다른가요?',
  answer: [
    '얼음이 필요하면 세 모델 중 코웨이 CHPI-7400N뿐입니다. 정수는 직수식이지만 냉수 1L 칠링존과 얼음 0.74kg 저장고가 있어 저장고 청소가 관리 항목으로 남고, 후면·좌우 벽에서 10cm씩 띄워야 해 자리도 가장 넓게 필요합니다.',
    '얼음 없이 냉·온·정수만 쓴다면 필터를 누가 가는지로 갈립니다. LG WD523ACB는 설명서에 사용자 교체 절차가 있고 정품 필터 정상가로 연 자재비가 200,600원(2026-10-01)입니다. SK매직 WPU-A710C는 필터·피팅·튜빙 교체를 전문 기사에게 맡기도록 안내하지만 그 비용은 공개 자료에서 확인하지 못했습니다.',
    '전기요금은 고르는 기준이 되지 못합니다. 에너지공단 라벨 기준 세 모델의 차이는 연 최대 4,000원이고, LG의 연 필터 자재비는 라벨 전기요금의 약 8.7배라 유지비는 필터 조달 방식이 좌우합니다.',
  ],
  comparison: {
    caption: '정확한 모델 기준 확인된 구성',
    columns: ['LG WD523ACB', '코웨이 CHPI-7400N', 'SK매직 WPU-A710C'],
    rows: [
      { label: '출수', values: ['냉·온·정수', '냉·온·정수·얼음', '냉·온·정수'] },
      { label: '냉수 방식', values: ['직수식 순간 냉각', '냉수 1L 칠링존 저장 · 얼음 저장고 0.74kg', '직수 방식 · 빙축 1.2L 순간 냉각'], note: '각 제조사 사양·설명서 표기. 에너지공단 신고표의 냉수저장탱크 칸(1.5L·1.02L·1.2L)은 음용수를 저장하는지와 별개입니다.' },
      { label: '필터', values: ['중금속9 흡착·바이러스 클리어', '나노트랩 → 플러스이노센스(D)', '세디먼트 → 블록카본 복합 → 나노테크 PAC'] },
      { label: '필터 교체', values: ['사용자 교체 절차(설명서 29쪽)', '방문관리 2·4개월 선택(코웨이 본사 화면)', '전문 기사 교체(설명서)'] },
      { label: '폭', values: ['168mm', '240mm(좌우 10cm씩 이격)', '170mm(설명서 특장점 표기)'] },
      { label: '정격 온수 전력', values: ['2,820W', '2,950W', '2,900W'], note: '정격 전력은 가열 순간의 부하이며 월 소비전력량이 아닙니다.' },
      { label: '월간 소비전력량(공단 신고)', values: ['12.17kWh', '12.17kWh', '10.04kWh'], note: '한국에너지공단 효율 신고 상세(2026-10-08 확인). 금액 환산은 본문 「전력과 유지비를 구분해서 읽기」에 있습니다.' },
      { label: '필터 교체 주기', values: ['중금속9 6개월 · 바이러스 클리어 12개월', '나노트랩 필터 세트 4개월(10L/일)', '세디먼트·블록카본 4개월 · PAC 12개월(4인 가족 10L/일)'] },
      { label: '정품 필터 단품가', values: ['중금속9 73,000원 · 바이러스 클리어 54,600원', '공개 단품가 미확인', '공개 단품가 미확인'], note: '2026-10-01 제조사 공식 판매가. LG 회원할인·방문 교체비는 제외했습니다.' },
    ],
    footnote: '제조사 정확한 모델 사양과 설명서·구독 안내 기준. 필터 교체 주기는 각 설명서의 하루 10L 사용 기준이며, 방문 관리 횟수와 필터 교체 횟수는 다릅니다.',
  },
  sections: [
    {
      heading: '코웨이 CHPI-7400N은 얼음·온수 모델',
      body: [
        '코웨이 국내 사용설명서 기준 CHPI-7400N은 정수를 직수로 내고, 냉수는 1L 칠링존(냉수를 담아 식히는 칸)에, 얼음은 0.74kg 저장고에 담아 두며, 온수는 순간 가열합니다. 정수 방식은 정전흡착이고 필터는 나노트랩과 플러스이노센스(D) 두 단계입니다.',
        '폭 240mm, 깊이 473mm, 높이 465mm입니다. 설명서는 후면과 좌·우 벽면에서 최소 10cm 이상 띄우라고 하므로 필요한 깊이는 약 573mm이고, 양옆이 벽이면 폭도 약 440mm가 필요합니다. LG(168mm)·SK매직(170mm)과의 폭 차이보다 이 이격 거리가 설치 여부를 더 크게 가릅니다.',
        '나노트랩 필터 세트(설명서 영문 성능표의 필터 모델 CCNTN7-D-PLUS)의 국내 예상 교환 주기는 하루 10L 사용 기준 4개월입니다. 영문 성능표의 6개월은 다른 조건의 표기입니다. 코웨이 화면의 2개월·4개월 방문관리 옵션은 방문 주기이지 필터 교체 주기와 같은 뜻이 아닙니다.',
      ],
    },
    {
      heading: 'SK매직 필터는 나노테크 PAC',
      body: [
        'SK매직 공용 설명서의 WPU-A710C 규격 열에는 세디먼트, 블록카본 복합, 나노테크 PAC 필터가 기재됩니다. 나노테크 PAC의 재질은 나노알루미나 파이버·분말활성탄·부직포이며 정전흡착·여과 기능으로 설명됩니다.',
        '설명서는 필터·피팅·튜빙 교체에 SK매직 순정품을 사용하고 전문 기사에게 의뢰하라고 안내합니다. 사용자가 직접 필터를 갈아 비용을 줄이는 방식은 이 모델에서는 설명서가 안내하지 않습니다.',
        '4인 가족이 하루 10L를 쓰는 기준에서 세디먼트와 블록카본 복합 필터는 각각 4개월, 나노테크 PAC는 12개월 교체 주기입니다. 이 기준을 1년간 따르면 각각 3개·3개·1개, 합계 7개가 필요하지만 정품 단품가와 방문 교체비는 확인되지 않았습니다. 견적을 받을 때는 이 7개가 관리 계약에 포함되는지부터 확인하세요.',
        '규격표상 냉수·정수·온수는 모두 직수 방식이고, 냉수는 1.2L 빙축(얼음 축열)으로 순간 냉각합니다. 설치 조건도 구체적입니다. 반드시 냉수 배관에 연결하고(온수에 연결하면 필터 손상), 허용 수압 117~785kPa, 정격 15A 이상 접지 콘센트를 단독으로 쓰며 벽과 10cm 이상 띄워야 합니다. 어린이 출수 버튼은 냉수·정수 한 컵만 내고 온수는 나오지 않습니다.',
      ],
    },
    {
      heading: '정수 성능 인증은 대상을 확인해야 합니다',
      body: [
        '독립 기관 목록에서 확인되는 범위는 모델마다 다릅니다. 국내 품질검사(의무 항목: 유리잔류염소·색도·탁도·클로로포름)로 보면 LG WD523ACB와 코웨이 CHPI-7400N은 한국물기술인증원의 2026-07-09 기준 유효 제품 목록에 정확한 모델명으로 올라 있고(유효 정수량 1,500L·1,000L), SK매직 WPU-A710C는 한국정수기공업협동조합의 2018·2020년 합격 기록(1,200L)만 있고 현행 목록에는 없습니다.',
        '해외 인증은 대상이 다릅니다. 코웨이 CHPI-7400N은 미국수질협회(WQA)가 완제품을 NSF/ANSI 42·53·401의 명시 항목으로 인증했습니다. LG가 소개하는 WQA 인증은 LG 스스로 "정수기 제품이 아닌 적용 필터"에 대한 인증이라고 밝힙니다. 소비자단체 미래소비자행동의 필터 시험(클로로포름 80% 이상 유지 2,000L)도 LG 필터 세트를 따로 시험한 결과라 본체 성능 수치가 아닙니다.',
        '이 목록들에는 오염물질별 제거율이 없어 세 모델의 정수 성능을 순위로 매길 자료는 없습니다. 고를 때 쓸 수 있는 것은 "현행 국내 목록 등재 여부"와 "인증 대상이 완제품인지 필터인지" 두 가지입니다.',
      ],
    },
    {
      heading: '살균 기능이 대신하지 않는 관리',
      body: [
        '세 모델 모두 살균 기능을 내세우지만 설명서를 보면 사용자에게 남는 일이 다릅니다. LG WD523ACB는 직수관 고온살균이 매주, 출수구 내부 UVnano 살균이 1시간마다 자동으로 돌지만(LG 제품 페이지), 공용 설명서는 출수구 고온살균을 최소 3개월에 한 번 버튼으로 직접 실행하고 출수구를 부드러운 솔로 주기적으로 닦으라고 합니다. 필터를 바꾼 뒤에는 냉·온·정수를 각각 120mL씩 출수해 버려야 합니다.',
        '코웨이 CHPI-7400N 설명서는 UV LED가 출수 파우셋·얼음 파우셋·얼음 트레이·얼음 저장고를 매일 살균한다고 적지만, 얼음 저장고를 분리해 헹구는 청소와 물받이 주 1회 세척, 3일 이상 쓰지 않았을 때 저장된 물을 버리는 일은 사용자 몫입니다. SK매직 WPU-A710C는 코크 UV안심케어가 2시간 간격으로 자동 동작하고, UV LED 투시창 청소는 전문가가 방문해 맡습니다.',
        '제조사 소개 문구의 "직수"와 "자동살균"은 위 관리 작업을 없애 주지 않습니다. 직접 할 관리가 적은 쪽을 원하면 SK매직의 방문 관리 범위를, 얼음을 원하면 코웨이의 저장고 청소 부담을, 필터를 직접 다루려면 LG의 출수구 살균·교체 절차를 기준으로 고르세요.',
      ],
    },
    {
      heading: '전력과 유지비를 구분해서 읽기',
      body: [
        '온수 정격은 LG 2,820W, 코웨이 2,950W, SK매직 2,900W입니다. 온수를 추출할 때의 전력이라 이 수치만으로 월 요금을 계산할 수 없습니다. 월 전력량은 한국에너지공단 효율 신고값이 있습니다. LG와 코웨이는 월 12.17kWh·라벨 연간에너지비용 23,000원, SK매직은 월 10.04kWh·19,000원입니다(2026-10-08 확인). 차이는 연 4,000원이고 신고 시점이 2023·2026·2018년으로 달라 같은 기준인지도 확인하지 못했으므로, 전기요금으로 세 모델을 가르지 않습니다.',
        'LG WD523ACB의 공식 판매가는 중금속9 흡착 필터 73,000원, 바이러스 클리어 필터 54,600원입니다(2026-10-01). 안내된 6개월·12개월 주기에 따라 1년치 정품 필터 자재비만 계산하면 정상가 73,000×2+54,600 = 200,600원, LG 회원할인가 190,400원으로 라벨 전기요금의 약 8.7배입니다. 유지비를 가르는 것은 전기가 아니라 필터 조달 방식입니다.',
        '같은 날 LG 공식 화면은 구매 1,454,000원, 구독 월 31,900원부터(4·5·6년)를 표시했습니다. 구매를 같은 기간의 월 금액으로 바꾸면 (1,454,000원 + 200,600원 × 연수) ÷ 개월 수로, 4년 약 47,000원, 6년 약 36,900원입니다(첫 장착 필터를 빼지 않은 보수적 계산, 방문비·전기 제외). 구독 견적의 같은 기간 실제 월 청구액이 이보다 낮고 필터가 포함돼 있다면 자재비 기준으로는 구독이 유리합니다. 구독료에 필터가 들어 있으면 단품 필터값을 다시 더하지 않습니다.',
        '코웨이 CHPI-7400N은 2026-10-01 본사 화면에서 일시불 2,380,000원(1년 무상 서비스 뒤 관리비 미공개), 4개월 방문관리 3년 기본 렌탈료 월 56,900원이었습니다. 3년 렌탈 기본료 합계는 56,900원 × 36 = 2,048,400원이고 등록비 100,000원이 따로 표시됩니다. 일시불 쪽은 2·3년차 관리비를 알 수 없어 3년 총액을 비교하지 않았습니다. 이 페이지 아래 제품 카드의 "가격 미확인"은 이 사이트가 조사한 시중가(판매처 가격)가 없다는 뜻이고, 이 문단의 금액은 코웨이 본사 화면의 표시가입니다. SK매직 WPU-A710C는 정확한 모델의 공식 구매가·계약표를 찾지 못했습니다. 계약 기간과 관리 방식이 서로 달라 세 모델의 총비용 순위는 만들지 않습니다.',
      ],
    },
  ],
  decisionRules: [
    { when: '한 대에서 얼음까지 필요하다', then: '코웨이 CHPI-7400N입니다. 깊이 약 573mm(본체 473mm+후면 10cm) 자리와 얼음 저장고 청소, 4개월 필터 세트 교체를 감당할 수 있는지 먼저 확인하세요.', productSlug: 'coway-handpick-water-purifier-compact' },
    { when: '필터를 직접 교체하고 싶다', then: 'LG WD523ACB입니다. 설명서 29쪽에 사용자 교체 절차가 있고 공식몰이 WD523ACB용 정품 필터를 판매합니다. SK매직 WPU-A710C는 설명서가 전문 기사 교체를 안내합니다.', productSlug: 'lg-puricare-water-purifier-objet' },
    { when: '필터 교체와 UV 창 청소를 기사에게 맡기고 싶다', then: 'SK매직 WPU-A710C입니다. 견적에서 연간 필터 7개(세디먼트 3·블록카본 복합 3·PAC 1)가 관리 계약에 포함되는지 확인하세요.', productSlug: 'skmagic-allin-water-purifier-wpu' },
    { when: '설치 폭이 20cm 안팎이다', then: 'LG WD523ACB(168mm)와 SK매직 WPU-A710C(설명서 특장점 170mm)가 후보입니다. SK매직은 벽과 10cm 이상 띄우라고 안내하므로 그 여유까지 재세요. 코웨이 CHPI-7400N은 좌우 이격까지 넣으면 더 넓은 자리가 필요합니다.' },
    { when: 'LG 구독과 구매 사이에서 고민한다', then: '구매를 월 금액으로 바꾼 값(6년 약 36,900원, 4년 약 47,000원)과 구독 견적의 같은 기간 실제 월 청구액을 비교하세요. 견적이 더 낮고 필터가 포함돼 있으면 구독이 유리합니다.', productSlug: 'lg-puricare-water-purifier-objet' },
  ],
  faqs: [
    { question: '코웨이 CHPI-7400N에는 온수가 없나요?', answer: '있습니다. 코웨이 사용설명서는 CHPI-7400N에 냉수·온수·정수·얼음 기능이 있다고 명시합니다. 온수가 없는 모델은 CPI-7400N이므로 주문할 때 모델명 첫 글자를 확인하세요.' },
    { question: 'SK매직 WPU-A710C의 필터를 직접 교체하나요?', answer: '아니요. 공식 공용 설명서는 필터·피팅·튜빙 교체를 전문 기사에게 의뢰하도록 안내합니다. 필터를 직접 갈고 싶다면 설명서에 사용자 교체 절차가 있는 LG WD523ACB가 비교 대상입니다.' },
    { question: 'LG WD523ACB의 1년치 필터값은 얼마인가요?', answer: 'LG 공식 교체 안내의 중금속9 필터 6개월, 바이러스 클리어 필터 12개월 주기를 적용하면 정품 단품 정상가로 연 200,600원, LG 회원할인가로 연 190,400원입니다(2026-10-01). 자재비만 계산했으며 방문 교체비·구독료·전기요금은 제외했습니다.' },
  ],
  productSlugs: ['lg-puricare-water-purifier-objet', 'coway-handpick-water-purifier-compact', 'skmagic-allin-water-purifier-wpu'],
  sources: [
    { url: 'https://www.lge.co.kr/product/care-solutions/water-purifiers/wd523acb?modelId=MD10017831&pdpType=SUBSCRIPTION', title: 'LG WD523ACB 제품 사양·필터 교체 안내', publisher: 'LG전자' },
    { url: 'https://www.lge.co.kr/care-accessories/water-purifier/agm30040101', title: 'LG 중금속9 흡착 필터 AGM30040101 가격·적용 모델', publisher: 'LG전자' },
    { url: 'https://www.lge.co.kr/care-accessories/water-purifier/agm30063801', title: 'LG 바이러스 클리어 필터 AGM30063801 가격·적용 모델', publisher: 'LG전자' },
    { url: 'https://www.lge.co.kr/kr/images/care-accessories/water-purifier/md09043828/gallery/large01.jpg', title: 'LG AGM30040101 공식 제품 사진: QF0422L 라벨', publisher: 'LG전자' },
    { url: 'https://www.lge.co.kr/kr/images/care-accessories/water-purifier/md09830826/gallery/large01.jpg', title: 'LG AGM30063801 공식 제품 사진: QF1122L 라벨', publisher: 'LG전자' },
    { url: 'https://find.wqa.org/find-products/ctl/detail/mid/1054/cid/lg_electronics/sid/63?keyword=lg+electronics', title: 'WQA LG All-Puri 필터 시스템 NSF/ANSI 401 인증 목록', publisher: 'Water Quality Association' },
    { url: 'https://find.wqa.org/find-products/ctl/detail/mid/1054/cid/lg_electronics/sid/3?keyword=lg+electronics', title: 'WQA LG All-Puri 필터 시스템 NSF/ANSI 53 인증 목록', publisher: 'Water Quality Association' },
    { url: 'https://find.wqa.org/find-products/ctl/detail/mid/1054/cid/lg_electronics/sid/1?keyword=lg+electronics', title: 'WQA LG All-Puri 필터 시스템 NSF/ANSI 42 인증 목록', publisher: 'Water Quality Association' },
    { url: 'https://can.or.kr/board/view.php?boardinfo_idx=201&idx=1278', title: '미래소비자행동 정수기 제조사·호환용 필터 독립 시험 결과', publisher: '미래소비자행동' },
    { url: 'https://portal.kwtc.or.kr/common/fileDownload.do?atchFileId=426991&fileSn=1', title: '한국물기술인증원 정수기 품질검사 유효 제품현황(2026-07-09)', publisher: '한국물기술인증원' },
    { url: 'http://kowpic.kr/?page_id=1201&vid=525', title: 'SK매직 WPU-A710C 정수기 품질검사 합격 기록(2018-02-22)', publisher: '한국정수기공업협동조합' },
    { url: 'http://kowpic.kr/?page_id=1201&vid=1434', title: 'SK매직 WPU-A710C 정수기 품질검사 합격 기록(2020-02-27)', publisher: '한국정수기공업협동조합' },
    { url: 'https://www.coway.com/core/product/fmanual/download/274', title: '코웨이 CHPI-7400N 사용설명서', publisher: '코웨이' },
    { url: 'https://www.coway.com/product/detail?prdno=1148', title: '코웨이 CHPI-7400N 제품·방문관리 조건', publisher: '코웨이' },
    { url: 'https://find.wqa.org/find-products/ctl/detail/mid/1054/cid/coway_co_ltd/sid/63/keyword/7400n', title: 'WQA CHPI-7400N NSF/ANSI 401 완제품 인증 목록', publisher: 'Water Quality Association' },
    { url: 'https://find.wqa.org/find-products/ctl/detail/mid/1054/cid/coway_co_ltd/sid/3/keyword/7400n', title: 'WQA CHPI-7400N NSF/ANSI 53 완제품 인증 목록', publisher: 'Water Quality Association' },
    { url: 'https://find.wqa.org/find-products/ctl/detail/mid/1054/cid/coway_co_ltd/sid/1/keyword/7400n', title: 'WQA CHPI-7400N NSF/ANSI 42 완제품 인증 목록', publisher: 'Water Quality Association' },
    { url: 'https://qr.skmagic.com/2019/model/WPU/WPUA710CRERO/Manual.htm', title: 'SK매직 WPU-A710C 공용 사용설명서', publisher: 'SK매직' },
    { url: 'https://gscs-b2c.lge.com/open/downloadFile?fileId=jO7RH8OLgibKoMzZYJqKw', title: 'LG WD523A** 포함 데스크 정수기 공용 설명서 — 살균·필터 교체 절차', publisher: 'LG전자' },
    { url: 'https://eep.energy.or.kr/certification/certi_view_159.aspx?no=282230026', title: 'LG WD523ACB 전기냉온수기 효율 신고 상세', publisher: '한국에너지공단' },
    { url: 'https://eep.energy.or.kr/certification/certi_view_159.aspx?no=282260052', title: '코웨이 CHPI-7400N 전기냉온수기 효율 신고 상세', publisher: '한국에너지공단' },
    { url: 'https://eep.energy.or.kr/certification/certi_view_159.aspx?no=282180025', title: 'SK매직 WPU-A710C 전기냉온수기 효율 신고 상세', publisher: '한국에너지공단' },
  ],
  publishedAt: '2026-08-24',
  updatedAt: '2026-10-09',
  reviewedBy: SITE_AUTHOR,
  priceCheckedAt: '2026-10-01',
};
