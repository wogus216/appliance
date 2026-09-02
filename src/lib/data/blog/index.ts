import type { BlogPost } from '@/types/blog';
import { bespokeRf85VsDiosT873 } from './posts/bespoke-rf85-vs-dios-t873';
import { airpodsPro3VsBuds3ProVsLiberty5 } from './posts/airpods-pro3-vs-buds3-pro-vs-liberty5';
import { washerDryerComboVsSeparate } from './posts/washer-dryer-combo-vs-separate';
import { dysonTp07VsHp09 } from './posts/dyson-tp07-vs-hp09';
import { fridge4doorVsSideBySide } from './posts/fridge-4door-vs-side-by-side';
import { wallAirconSamsungVsTclVsHaier } from './posts/wall-aircon-samsung-vs-tcl-vs-haier';
import { portableTvStandbymeVsMovingstyle } from './posts/portable-tv-standbyme-vs-movingstyle';
import { robotVacuumSuctionNumbers } from './posts/robot-vacuum-suction-numbers';
import { waterPurifierLgVsCowayVsSkmagic } from './posts/water-purifier-lg-vs-coway-vs-skmagic';
import { dishwasher12Vs6Countertop } from './posts/dishwasher-12-vs-6-countertop';
import { standbymeGoVs2VsMax } from './posts/standbyme-go-vs-2-vs-max';
import { sonyXm5VsQcyMelobuds } from './posts/sony-xm5-vs-qcy-melobuds';
import { dehumidifierLitersMeasurement } from './posts/dehumidifier-liters-measurement';
import { airPurifierAreaNumbers } from './posts/air-purifier-area-numbers';
import { fridgeMonthlyKwhMeasurement } from './posts/fridge-monthly-kwh-measurement';
import { samsungWasherCheckCodes } from './posts/samsung-washer-check-codes';
import { dishwasherWaterPerPerson } from './posts/dishwasher-water-per-person';

/**
 * 블로그 글 목록. 최신 글이 앞에 오도록 직접 정렬해 둔다.
 *
 * 날짜로 정렬하지 않는 이유 — 같은 날 올린 글의 순서가 파일 순서에 좌우되면
 * 빌드마다 목록이 흔들릴 수 있다. 순서는 편집 판단이므로 손으로 정한다.
 *
 * ⚠️ 출처 URL은 **직접 열어 본 것만** 넣는다. blog.test.ts가 이 사이트의 다른
 *    곳에서 이미 검증된 URL 집합에 없는 주소를 발견하면 실패시킨다.
 */
export const allBlogPosts: BlogPost[] = [
  fridgeMonthlyKwhMeasurement,
  samsungWasherCheckCodes,
  dishwasherWaterPerPerson,
  standbymeGoVs2VsMax,
  sonyXm5VsQcyMelobuds,
  dehumidifierLitersMeasurement,
  airPurifierAreaNumbers,
  bespokeRf85VsDiosT873,
  fridge4doorVsSideBySide,
  wallAirconSamsungVsTclVsHaier,
  washerDryerComboVsSeparate,
  airpodsPro3VsBuds3ProVsLiberty5,
  portableTvStandbymeVsMovingstyle,
  robotVacuumSuctionNumbers,
  waterPurifierLgVsCowayVsSkmagic,
  dishwasher12Vs6Countertop,
  dysonTp07VsHp09,
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return allBlogPosts.find((p) => p.slug === slug);
}

/** 특정 제품을 다룬 글. 제품 상세에서 역참조할 때 쓴다 */
export function getBlogPostsForProduct(productSlug: string): BlogPost[] {
  return allBlogPosts.filter((p) => p.productSlugs.includes(productSlug));
}
