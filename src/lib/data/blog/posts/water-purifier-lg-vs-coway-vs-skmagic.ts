import type { BlogPost } from '@/types/blog';
import { SITE_AUTHOR } from '@/lib/constants';

// 정확한 모델의 제조사 제품 페이지·설명서 기준. 구성·필터 방식과 관리 안내를 구분한다.
export const waterPurifierLgVsCowayVsSkmagic: BlogPost = {
  slug: 'water-purifier-lg-vs-coway-vs-skmagic',
  title: 'LG·코웨이·SK매직 정수기 3종: 온수·얼음·필터 관리 비교',
  description: 'WD523ACB, CHPI-7400N, WPU-A710C의 출수 기능, 필터 교체 주기와 확인된 정품 가격을 비교합니다.',
  kind: '비교',
  question: '이 세 정수기는 온수와 얼음, 필터 관리 방식이 어떻게 다른가요?',
  answer: [
    '코웨이 CHPI-7400N은 아이콘 얼음정수기입니다. 냉수·온수·정수·얼음을 제공하며 정수는 직수식, 냉수와 얼음은 저장부를 둡니다.',
    'SK매직 WPU-A710C는 냉·온·정수 모델입니다. 공용 설명서의 WPU-A710C 규격에는 세디먼트·블록카본 복합·나노테크 PAC 필터가 기재됩니다.',
    'SK매직 설명서는 필터·피팅·튜빙 교체를 전문 기사에게 의뢰하도록 안내합니다. 이 모델을 필터 셀프 교체형으로 보아 관리비가 절감된다고 계산할 근거는 없습니다.',
    'LG WD523ACB는 중금속9 흡착 필터를 6개월마다, 바이러스 클리어 필터를 12개월마다 교체하도록 구독 케어 안내에 표시합니다. 정품 단품가로 계산한 1년치 필터 자재비는 정상가 200,600원이며 방문 교체비는 포함하지 않습니다.',
  ],
  comparison: {
    caption: '정확한 모델 기준 확인된 구성',
    columns: ['LG WD523ACB', '코웨이 CHPI-7400N', 'SK매직 WPU-A710C'],
    rows: [
      { label: '출수', values: ['냉·온·정수', '냉·온·정수·얼음', '냉·온·정수'] },
      { label: '필터', values: ['중금속9 흡착·바이러스 클리어', '나노트랩 → 플러스이노센스(D)', '세디먼트 → 블록카본 복합 → 나노테크 PAC'] },
      { label: '폭', values: ['168mm', '240mm', '공용 설명서에서 미확인'] },
      { label: '정격 온수 전력', values: ['2,820W', '2,950W', '2,900W'], note: '정격 전력은 가열 순간의 부하이며 월 소비전력량이 아닙니다.' },
      { label: '필터 교체 주기', values: ['중금속9 6개월 · 바이러스 클리어 12개월', '나노트랩 필터 세트 4개월(10L/일)', '세디먼트·블록카본 4개월 · PAC 12개월(4인 가족 10L/일)'] },
      { label: '정품 필터 단품가', values: ['중금속9 73,000원 · 바이러스 클리어 54,600원', '공개 단품가 미확인', '공개 단품가 미확인'], note: '2026-10-01 제조사 공식 판매가. LG 회원할인·방문 교체비는 제외했습니다.' },
    ],
    footnote: '제조사 정확한 모델 사양과 설명서·구독 안내 기준. 필터 교체 주기는 사용량·수질에 따라 달라질 수 있습니다. 방문 관리 횟수와 필터 교체 횟수는 구분해야 합니다.',
  },
  sections: [
    {
      heading: '코웨이 CHPI-7400N은 얼음·온수 모델',
      body: [
        '코웨이 국내 사용설명서는 CHPI-7400N을 아이콘 얼음정수기로 표시하고 냉수·온수·정수·제빙 기능을 기재합니다. 냉수 1L 칠링존, 얼음 0.74kg 저장고, 정수 직수식, 순간온수 가열방식을 구분합니다.',
        '폭 240mm, 깊이 473mm, 높이 465mm입니다. 후면 통풍구는 벽에서 약 10cm 이상 띄우도록 안내합니다. 폭만으로 설치 가능 여부를 판단하면 부족합니다.',
        '정수 방식은 정전흡착이며 필터는 나노트랩과 플러스이노센스(D)입니다. 나노트랩을 UF 중공사막으로 부르면 공식 규격과 달라집니다.',
        '사용설명서의 나노트랩 필터 세트 예상 교환 주기는 하루 10L 사용 기준 4개월입니다. 같은 설명서의 영문 정수 성능표는 필터 모델을 CCNTN7-D-PLUS로 표시하지만 사용 기간은 6개월로 표기합니다. 국내 관리 주기와 인증 성능표의 기간을 바꾸어 적용하지 않습니다. 2개월·4개월 방문관리 옵션도 필터 교체 주기와 같은 뜻이 아닙니다.',
        'WQA 공개 인증 목록은 CHPI-7400N 완제품의 교체 요소를 CCNTN7-D-PLUS로 연결하고, NSF/ANSI 42의 잔류염소·맛·냄새·미립자, 53의 낭포·마이크로시스틴·탁도·일부 유기물, 401의 미세플라스틱 등 명시된 항목을 인증합니다. 인증은 완제품과 표시된 시험 조건에 해당합니다. 필터 부품 단독 목록은 제거 성능을 인증 항목으로 표시하지 않으므로 다른 정수기와의 성능 우위나 모든 오염물질 제거로 확대할 수 없습니다.',
      ],
    },
    {
      heading: 'SK매직 필터는 나노테크 PAC',
      body: [
        'SK매직 공용 설명서의 WPU-A710C 규격 열에는 세디먼트, 블록카본 복합, 나노테크 PAC 필터가 기재됩니다. 나노테크 PAC의 재질은 나노알루미나 파이버·분말활성탄·부직포이며 정전흡착·여과 기능으로 설명됩니다.',
        '설명서는 필터·피팅·튜빙 교체에 SK매직 순정품을 사용하고 전문 기사에게 의뢰하라고 안내합니다. 셀프 필터 교체로 렌탈비가 낮아진다는 기존 주장은 이 모델에 적용하지 않습니다.',
        '4인 가족이 하루 10L를 쓰는 기준에서 세디먼트와 블록카본 복합 필터는 각각 4개월, 나노테크 PAC는 12개월 교체 주기입니다. 이 기준을 1년간 따르면 각각 3개·3개·1개가 필요하지만 정품 단품가와 방문 교체비는 확인되지 않았습니다.',
      ],
    },
    {
      heading: '정수 성능 인증은 대상을 확인해야 합니다',
      body: [
        'LG WD523ACB 제품 페이지는 올 퓨리 필터 시스템의 WQA 인증을 소개하면서, 인증 대상은 정수기 완제품이 아니라 적용 필터라고 명시합니다. LG 공식몰에서 WD523ACB.AKOR용으로 판매하는 AGM30040101·AGM30063801의 제품 사진에는 필터 라벨이 각각 QF0422L·QF1122L로 표시됩니다. 이 코드는 WQA All-Puri Filter System의 교체 요소 코드와 일치합니다. 다만 필터 시스템의 인증 항목을 WD523ACB 완제품의 실측 제거율로 옮기지는 않습니다.',
        '한국물기술인증원의 2026-07-09 기준 품질검사 유효 제품 목록에는 LG WD523ACB와 코웨이 CHPI-7400N이 정확한 모델명으로 등재되어 있습니다. 의무정수성능 항목은 유리잔류염소·색도·탁도·클로로포름이며 표시된 유효 정수량은 각각 1,500L와 1,000L입니다. 이 목록은 개별 오염물질의 실측 제거율이나 장착 필터 품번을 제공하지 않으므로, 두 용량만으로 정수 성능의 우열을 정하지 않습니다.',
        '한국정수기공업협동조합의 과거 품질검사 공개 기록에는 SK매직 WPU-A710C가 정확한 모델명으로 2018년과 2020년에 각각 합격한 내역이 있습니다. 의무정수성능은 유리잔류염소·색도·탁도·클로로포름이고, 선택 항목에는 총트리할로메탄·대장균 등이 적혀 있으며 유효 정수량은 1,200L입니다. 이는 SK매직 설명서의 표시와 일치합니다. 다만 2026-07-09 기준 유효 제품 목록에는 이 모델이 없어 현재 인증 상태는 확인되지 않고, 과거 공개 기록에는 오염물질별 실측 제거율과 필터 부품번호도 없습니다. 코웨이는 앞서 확인한 WQA 목록에 CHPI-7400N 완제품과 교체 요소 CCNTN7-D-PLUS가 함께 적혀 있습니다.',
        '미래소비자행동은 LG QF0422L·QF1122L 필터 세트를 별도로 시험해 클로로포름 제거율 80% 이상이 유지된 정수량을 2,000L로 보고했습니다. LG 공식몰의 AGM 판매 페이지 사진으로 이 QF 필터와 WD523ACB용 판매 부품의 연결은 확인했지만, 보고서가 WD523ACB 완제품을 시험한 것은 아닙니다. 따라서 2,000L를 이 본체의 국내 정격이나 실측 성능으로 쓰지 않습니다. 같은 보고서의 SK매직 시험품은 스탠드형 UF/엠브레인 구성으로 WPU-A710C의 나노테크 PAC 구성과 다릅니다.',
      ],
    },
    {
      heading: '전력과 유지비를 구분해서 읽기',
      body: [
        '온수 정격은 LG 2,820W, 코웨이 2,950W, SK매직 2,900W입니다. 온수를 추출할 때의 전력과 월간 전력량은 다르므로 이 수치만으로 월 요금을 계산할 수 없습니다.',
        'LG WD523ACB의 공식 판매가는 중금속9 흡착 필터 73,000원, 바이러스 클리어 필터 54,600원입니다(2026-10-01). 안내된 6개월·12개월 주기에 따라 1년치 정품 필터 자재비만 계산하면 정상가 200,600원, LG 회원할인가 190,400원입니다. 구매·구독 형태, 교체 공임, 방문관리와 전기요금은 이 금액에 들어 있지 않습니다.',
        '코웨이 CHPI-7400N과 SK매직 WPU-A710C의 정품 단품가와 방문 교체비가 확인되지 않아 세 제품의 연간 총 유지비 우열은 아직 정할 수 없습니다. LG 구독료에는 선택한 관리 방식의 필터 제공이 반영되므로 단품 필터값을 구독료에 다시 더하지 않습니다.',
      ],
    },
  ],
  decisionRules: [
    { when: '한 대에서 얼음까지 필요하다', then: '코웨이 CHPI-7400N의 냉·온·정수와 제빙 기능을 확인하세요.', productSlug: 'coway-handpick-water-purifier-compact' },
    { when: '필터를 직접 교체하고 싶다', then: 'SK매직 WPU-A710C의 공식 설명서는 전문 기사 교체를 안내하므로, 자가교체가 명시된 다른 정확한 모델을 찾으세요.' },
    { when: '설치 폭이 20cm 안팎이다', then: 'LG WD523ACB의 폭 168mm를 검토하고 후면·측면 방열 여유까지 실측하세요.', productSlug: 'lg-puricare-water-purifier-objet' },
  ],
  faqs: [
    { question: '코웨이 CHPI-7400N에는 온수가 없나요?', answer: '있습니다. 코웨이 사용설명서는 CHPI-7400N에 냉수·온수·정수·얼음 기능이 있다고 명시합니다.' },
    { question: 'SK매직 WPU-A710C의 필터를 직접 교체하나요?', answer: '공식 공용 설명서는 필터·피팅·튜빙 교체를 전문 기사에게 의뢰하도록 안내합니다.' },
    { question: 'LG WD523ACB의 1년치 필터값은 얼마인가요?', answer: 'LG 공식 교체 안내의 중금속9 필터 6개월, 바이러스 클리어 필터 12개월 주기를 적용하면 정품 단품 정상가로 연 200,600원, LG 회원할인가로 연 190,400원입니다(2026-10-01). 자재비만 계산했으며 방문 교체비·구독료·전기요금은 제외했습니다.' },
    { question: '정격 소비전력만으로 월 전기요금을 알 수 있나요?', answer: '알 수 없습니다. 각 기능의 사용 시간, 냉각 운전과 대기 전력 등을 포함한 전력량 자료가 필요합니다.' },
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
  ],
  publishedAt: '2026-08-24',
  updatedAt: '2026-10-01',
  reviewedBy: SITE_AUTHOR,
  priceCheckedAt: '2026-10-01',
};
