import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';
import { allAppliances } from '@/lib/data/appliances';
import { UNVERIFIED_SLUGS } from '@/lib/data/appliances/unverified';
import { CARE_PLAN_INTERVALS, CARE_PLAN_PRODUCTS } from '@/lib/data/care-plan';
import {
  addCalendarDays, addCalendarMonths, calculateCarePlan, carePlanHref, carePlanIcs,
  carePlanRecord, parseCareModel, type CarePlanInput,
} from '@/lib/care-plan';
import { CarePlanTool } from '@/components/tools/care-plan-tool';

vi.mock('next/navigation', () => ({ useSearchParams: () => new URLSearchParams() }));

const today = '2026-10-28';
const empty: CarePlanInput = { purchaseDate: '', lastCareDate: '', chosenDate: '' };
const coway = CARE_PLAN_PRODUCTS.find((product) => product.modelNumber === 'CHPI-7400N')!;
const outlet = coway.items.find((item) => item.id === 'outlet')!;
const icebin = coway.items.find((item) => item.id === 'icebin')!;

describe('공개 제품과 설명서 주기만 일정에 적용', () => {
  it('34개 공개 모델만 정확히 한 번 등록하고 각 항목을 원문과 연결한다', () => {
    expect(CARE_PLAN_PRODUCTS).toHaveLength(34);
    expect(new Set(CARE_PLAN_PRODUCTS.map((p) => p.modelNumber)).size).toBe(34);
    expect(CARE_PLAN_PRODUCTS.map((p) => p.slug).sort()).toEqual(allAppliances.map((p) => p.slug).sort());
    for (const product of CARE_PLAN_PRODUCTS) {
      expect(UNVERIFIED_SLUGS.has(product.slug)).toBe(false);
      expect(product.items.length).toBeGreaterThan(0);
      for (const item of product.items) {
        expect(item.sourceUrl).toMatch(/^https:\/\//);
        expect(item.sourceLabel).not.toBe('');
        expect(item.description).not.toBe('');
        expect(item.interval).toEqual(CARE_PLAN_INTERVALS[`${product.modelNumber}:${item.id}`]);
      }
    }
    const definedKeys = CARE_PLAN_PRODUCTS.flatMap((product) => product.items.map((item) => `${product.modelNumber}:${item.id}`));
    expect(Object.keys(CARE_PLAN_INTERVALS).every((key) => definedKeys.includes(key))).toBe(true);
    expect(Object.keys(CARE_PLAN_INTERVALS)).toHaveLength(9);
    expect(CARE_PLAN_PRODUCTS.find((p) => p.modelNumber === 'RO585HGH')!.items.every((item) => !item.interval)).toBe(true);
  });

  it('모델 주소는 정확 모델만 받고 개인 날짜를 넣지 않는다', () => {
    const url = new URL(carePlanHref('A3063 / A3064 / A3122'), 'https://salimlab.kr');
    expect(parseCareModel(url.searchParams.get('model'), CARE_PLAN_PRODUCTS)).toBe('A3063 / A3064 / A3122');
    expect([...url.searchParams.keys()]).toEqual(['model']);
    expect(parseCareModel('RF85', CARE_PLAN_PRODUCTS)).toBe('');
    expect(parseCareModel('__proto__', CARE_PLAN_PRODUCTS)).toBe('');
    expect(parseCareModel(null, CARE_PLAN_PRODUCTS)).toBe('');
  });
});

describe('달력 날짜와 입력 경계', () => {
  it('날짜 경계와 월말을 달력대로 계산한다', () => {
    expect(addCalendarDays('2026-10-25', 7)).toBe('2026-11-01');
    expect(addCalendarMonths('2024-01-31', 1)).toBe('2024-02-29');
    expect(addCalendarMonths('2025-01-31', 1)).toBe('2025-02-28');
    expect(addCalendarMonths('2025-11-30', 3)).toBe('2026-02-28');
    expect(addCalendarDays('2026-02-30', 7)).toBeUndefined();
  });

  it('주기가 확인된 항목은 마지막 관리일로만 계산하고 지난 날짜는 오늘 확인 일정으로 낸다', () => {
    const due = calculateCarePlan(outlet, { ...empty, purchaseDate: '2020-01-01', lastCareDate: '2026-10-24' }, today);
    expect(due).toMatchObject({ kind: 'ready', dueDate: '2026-10-31', calendarDate: '2026-10-31', overdue: false });
    const overdue = calculateCarePlan(outlet, { ...empty, lastCareDate: '2026-10-01' }, today);
    expect(overdue).toMatchObject({ kind: 'ready', dueDate: '2026-10-08', calendarDate: today, overdue: true });
    expect(calculateCarePlan(outlet, { ...empty, purchaseDate: '2026-10-01' }, today).kind).toBe('empty');
  });

  it('고정 주기가 없는 항목은 공식 주기로 계산하지 않고 사용자의 날짜만 받는다', () => {
    expect(calculateCarePlan(icebin, empty, today)).toMatchObject({ kind: 'empty', message: expect.stringContaining('고정 주기') });
    expect(calculateCarePlan(icebin, { ...empty, chosenDate: '2026-11-05' }, today)).toMatchObject({ kind: 'ready', dueDate: '2026-11-05', basis: expect.stringContaining('직접 정한') });
    expect(calculateCarePlan(icebin, { ...empty, chosenDate: '2026-10-20' }, today).kind).toBe('invalid');
  });

  it.each([
    { ...empty, purchaseDate: '2026-10-29', lastCareDate: '2026-10-01' },
    { ...empty, lastCareDate: '2026-10-29' },
    { ...empty, lastCareDate: '2026-02-30' },
  ])('미래·존재하지 않는 입력 날짜를 거절한다', (input) => {
    expect(calculateCarePlan(outlet, input, today).kind).toBe('invalid');
  });
});

describe('사용자에게 남는 기록', () => {
  const input = { ...empty, purchaseDate: '2025-06-01', lastCareDate: '2026-10-24' };
  const result = calculateCarePlan(outlet, input, today);
  if (result.kind !== 'ready') throw new Error('fixture due date missing');

  it('원문·조건·모델을 기록하고 날짜를 한 번만 달력에 넣는다', () => {
    const record = carePlanRecord(coway, outlet, input, result);
    expect(record).toContain('CHPI-7400N');
    expect(record).toContain('구입일: 2025-06-01 · 계산에 사용하지 않음');
    expect(record).toContain('마지막 관리일: 2026-10-24');
    expect(record).toContain('확인 기준일: 2026-10-31');
    expect(record).toContain(outlet.sourceUrl);
    const ics = carePlanIcs(coway, outlet, input, result, 'test-123', new Date('2026-10-28T00:00:00.000Z'));
    expect(ics).toContain('DTSTART;VALUE=DATE:20261031\r\n');
    expect(ics).toContain('DTEND;VALUE=DATE:20261101\r\n');
    expect(ics).toContain('UID:test-123@salimlab.kr');
    expect(ics).not.toContain('RRULE');
    expect(ics).toContain('BEGIN:VEVENT');
    expect(ics).toContain('END:VCALENDAR\r\n');
    expect(ics.split('\r\n').every((line) => new TextEncoder().encode(line).length <= 75)).toBe(true);
  });

  it('정적 첫 화면에서도 34개 모델과 근거 안내를 읽을 수 있다', () => {
    const html = renderToStaticMarkup(createElement(CarePlanTool, { products: CARE_PLAN_PRODUCTS }));
    expect(html.match(/<option value="/g)).toHaveLength(36);
    expect(html).toContain('정확한 모델과 항목을 고르세요');
    expect(html).toContain('다음 확인 일정');
  });
});
