import type { Material } from '@/types/material';

/** kind: '소재' — 기저귀를 이루는 물질 */
export const materials: Material[] = [
  {
    slug: 'sap',
    name: '고흡수성수지(SAP)',
    aliases: ['폴리아크릴산나트륨', 'Super Absorbent Polymer', '흡수 폴리머'],
    kind: '소재',
    role: '흡수',
    what: '물에 녹지 않으면서 자기 무게의 200배가 넘는 물을 빨아들이는 알갱이 형태의 수지다. 원유에서 뽑은 아크릴산에 가성소다를 더해 중합하는 방식으로 만든다. 기저귀에서는 흡수층에 펄프와 섞여 들어간다.',
    whyUsed:
      '천연 펄프만으로는 자기 무게의 수십 배까지만 흡수하고, 눌리면 빨아들인 소변이 다시 새어 나온다. SAP는 흡수한 수분을 젤 형태로 가둬 압력을 받아도 역류가 적다. 얇으면서 흡수량이 많은 요즘 기저귀는 SAP 없이는 성립하지 않는다.',
    concern:
      'SAP 자체보다, 중합 반응에 참여하지 않고 남은 아크릴산이 관리 대상이다. 국내 일회용 기저귀 안전기준은 시험 항목에 아크릴산 단량체를 두고 있으며, KC 안전확인을 받은 제품은 이 항목의 시험을 거친다.',
    related: ['acrylic-acid-monomer'],
    sources: [
      {
        url: 'https://blog.lgchem.com/2021/06/28_bio_balanced_sap/',
        title:
          '폴리머 인사이트 #34 재생 원료로 만든 친환경 소재! 바이오 밸런스 SAP(Super Absorbent Polymer, 고흡수성 수지)',
        publisher: 'LG화학 블로그',
      },
      {
        url: 'https://scienceon.kisti.re.kr/srch/selectPORSrchReport.do?cn=KAR2010050687',
        title: '고흡수성수지의 기술개발',
        publisher: 'KISTI(한국과학기술정보연구원)',
      },
      // concern이 국내 안전기준·시험 항목을 언급하므로 규제 출처를 직접 붙인다.
      // acrylic-acid-monomer.sources와 동일한 두 건이다.
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
