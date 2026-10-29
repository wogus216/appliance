/** YYYY-MM-DD 날짜끼리의 계산. 시간대 영향을 받지 않도록 UTC 자정으로만 다룬다. */

/** 달력에 실제로 있는 날짜만 받는다. Date.UTC는 0~99년을 1900년대로 읽으므로 연도를 따로 넣는다. */
export function isoDateValue(value: string): number | undefined {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return undefined;
  const [year, month, day] = value.split('-').map(Number);
  if (year < 1900 || year > 9998) return undefined;
  const date = new Date(0);
  date.setUTCFullYear(year, month - 1, day);
  date.setUTCHours(0, 0, 0, 0);
  return date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day ? date.getTime() : undefined;
}

export const isIsoDate = (value: string) => isoDateValue(value) !== undefined;

/** from에서 to까지 지난 날 수. 날짜가 잘못되면 undefined. */
export function daysBetween(from: string, to: string): number | undefined {
  const start = isoDateValue(from);
  const end = isoDateValue(to);
  return start === undefined || end === undefined ? undefined : Math.round((end - start) / 86_400_000);
}

/** from에서 to까지 꽉 찬 개월 수(만 개월). 1월 31일 → 2월 28일은 0개월로 센다. */
export function fullMonthsBetween(from: string, to: string): number | undefined {
  if (isoDateValue(from) === undefined || isoDateValue(to) === undefined || to < from) return undefined;
  const [fy, fm, fd] = from.split('-').map(Number);
  const [ty, tm, td] = to.split('-').map(Number);
  return (ty - fy) * 12 + (tm - fm) - (td < fd ? 1 : 0);
}
