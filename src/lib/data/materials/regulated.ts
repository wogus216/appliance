import type { Material } from '@/types/material';

/** kind: '규제항목' — KC 안전확인이 시험하는 대상 */
export const regulated: Material[] = [
  {
    slug: 'acrylic-acid-monomer',
    name: '아크릴산 단량체',
    aliases: ['잔류 아크릴산', 'acrylic acid monomer'],
    kind: '규제항목',
    role: '흡수',
    what: '고흡수성수지(SAP)를 만들 때 원료로 쓰는 아크릴산 중, 중합 반응에 참여하지 않고 남은 것을 말한다. 완성된 수지가 아니라 반응하지 않은 원료다.',
    whyUsed:
      '흡수층은 소변으로 젖은 상태에서 피부와 오래 맞닿는다. 잔류 단량체는 완성된 고분자와 성질이 달라 따로 관리하며, 그래서 국내 일회용 기저귀 안전기준의 시험 항목에 들어 있다.',
    concern:
      '"SAP가 들어 있으니 위험하다"는 말이 도는데, 규제가 보는 것은 SAP의 존재가 아니라 잔류 단량체의 양이다. 안전확인을 받은 제품은 이 항목을 시험한 것이다.',
    related: ['sap'],
    sources: [
      {
        url: 'https://www.law.go.kr/%ED%96%89%EC%A0%95%EA%B7%9C%EC%B9%99/%EC%95%88%EC%A0%84%ED%99%95%EC%9D%B8%EB%8C%80%EC%83%81%EC%96%B4%EB%A6%B0%EC%9D%B4%EC%A0%9C%ED%92%88%EC%9D%98%EC%95%88%EC%A0%84%EA%B8%B0%EC%A4%80',
        title: '안전확인대상어린이제품의 안전기준',
        publisher: '국가법령정보센터',
      },
      {
        url: 'https://www.consumer.go.kr/user/ftc/consumer/crtfc/73/selectCrtfcInfo.do?crtfcSn=CRTF_000000000188441',
        title: '어린이용 일회용기저귀 KC인증 정보',
        publisher: '소비자24',
      },
    ],
    updated: '2026-08',
  },
];
