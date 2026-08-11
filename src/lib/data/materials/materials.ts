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
      'https://blog.lgchem.com/2021/06/28_bio_balanced_sap/',
      'https://scienceon.kisti.re.kr/srch/selectPORSrchReport.do?cn=KAR2010050687',
    ],
    updated: '2026-08',
  },
];
