import type { ApplianceCategory } from '@/types/appliance';
import type { SourceRef } from '@/types/source';
import type { IsoDate } from '@/types/editorial';

/**
 * 카테고리 구매 가이드 — 카테고리 랜딩(/category/[slug])에 렌더되는 정보성 콘텐츠.
 * 제품 DB 나열만으로는 thin content로 판정될 수 있어, 카테고리별 선택 기준·FAQ를
 * 서술형으로 제공해 E-E-A-T를 보강한다. FAQ는 FAQPage JSON-LD로도 내보낸다.
 */

export interface GuideSection {
  /** 소제목 (예: '평수별 냉방능력 고르기') */
  heading: string;
  /** 본문 3~6문장. 사실 기반, 특정 제품 언급 시 카탈로그 내 제품만 */
  body: string;
}

export interface GuideFaq {
  question: string;
  /** 2~4문장의 완결된 답변 (FAQPage 스키마로 노출됨) */
  answer: string;
}

export interface CategoryGuide {
  category: ApplianceCategory;
  /** 가이드 제목 (예: '에어컨 후회 없이 고르는 법') */
  title: string;
  /** 도입부 2~3문장 */
  intro: string;
  sections: GuideSection[];
  faqs: GuideFaq[];
  /** 마지막 검수 시점 'YYYY-MM' */
  updated: string;

  /**
   * 이 가이드가 대조한 자료.
   *
   * 2026-09-09까지 이 타입에는 이 필드가 아예 없었다. 그래서 12편 전부 출처가 0이었는데,
   * 정작 본문은 소비자원 시험값·한전 누진 구간·KS 규격 같은 구체 수치를 링크 없이
   * 단언하고 있었다 — 제품 상세에는 발행처 2곳을, 블로그에는 2곳을 요구하면서
   * 사이트에서 가장 실용적인 문서에만 근거를 요구하지 않은 셈이다.
   *
   * 여기 실린 URL은 직접 열어 내용을 확인한 것만이다. 확인하지 못한 가이드는
   * 필드를 비워 두고, 화면이 "대조하지 못했다"고 밝힌다.
   */
  sources?: SourceRef[];
  /** 근거가 덮는 범위와 덮지 못하는 범위. sources가 있으면 함께 적는다 */
  covers?: string;
  /** 작성·검수 주체 */
  reviewedBy?: string;
  /** 마지막 근거 대조일 'YYYY-MM-DD' */
  sourcesCheckedAt?: IsoDate;
}

import { airConditionerGuide } from './air-conditioner';
import { dehumidifierGuide } from './dehumidifier';
import { fanGuide } from './fan';
import { washerGuide } from './washer';
import { dryerGuide } from './dryer';
import { dishwasherGuide } from './dishwasher';
import { refrigeratorGuide } from './refrigerator';
import { waterPurifierGuide } from './water-purifier';
import { airPurifierGuide } from './air-purifier';
import { robotVacuumGuide } from './robot-vacuum';
import { tvGuide } from './tv';
import { wirelessEarbudsGuide } from './wireless-earbuds';

const guides: Partial<Record<ApplianceCategory, CategoryGuide>> = {
  에어컨: airConditionerGuide,
  제습기: dehumidifierGuide,
  선풍기: fanGuide,
  세탁기: washerGuide,
  건조기: dryerGuide,
  식기세척기: dishwasherGuide,
  냉장고: refrigeratorGuide,
  정수기: waterPurifierGuide,
  공기청정기: airPurifierGuide,
  로봇청소기: robotVacuumGuide,
  TV: tvGuide,
  무선이어폰: wirelessEarbudsGuide,
};

export function getCategoryGuide(category: ApplianceCategory): CategoryGuide | undefined {
  return guides[category];
}

export function getAllCategoryGuides(): CategoryGuide[] {
  return Object.values(guides).filter((g): g is CategoryGuide => !!g);
}
