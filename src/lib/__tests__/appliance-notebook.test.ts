import { describe, expect, it } from 'vitest';
import {
  NOTEBOOK_FILE_MAX_BYTES, emptyNotebook, exportNotebookText, importNotebookText, newNotebookProduct, notebookRecord, notebookStandardItemId,
  readNotebook, serializeNotebook, type HouseholdNotebook,
} from '@/lib/appliance-notebook';
import { CARE_PLAN_PRODUCTS } from '@/lib/data/care-plan';

const purifier = CARE_PLAN_PRODUCTS.find((entry) => entry.modelNumber === 'CHPI-7400N')!;
const outlet = purifier.items.find((entry) => entry.id === 'outlet')!;
const aircon = CARE_PLAN_PRODUCTS.find((entry) => entry.category === '에어컨')!;
const dishwasher = CARE_PLAN_PRODUCTS.find((entry) => entry.category === '식기세척기')!;
const careEntry = { id: 'care-1', modelNumber: purifier.modelNumber, itemId: outlet.id, lastCareDate: '2026-10-20', chosenDate: '' };

describe('저장소 v1 → v2', () => {
  it('v2가 없으면 v1 관리 항목 배열을 옮겨 온다', () => {
    const notebook = readNotebook(null, JSON.stringify([careEntry]), CARE_PLAN_PRODUCTS);
    expect(notebook).toEqual({ version: 2, care: [careEntry], products: [] });
  });

  it('v2가 있으면 v1보다 v2를 읽는다', () => {
    const v2: HouseholdNotebook = { version: 2, care: [], products: [newNotebookProduct('p-1', purifier.modelNumber)] };
    expect(readNotebook(serializeNotebook(v2), JSON.stringify([careEntry]), CARE_PLAN_PRODUCTS)).toEqual(v2);
  });

  it('깨진 v2는 v1으로, 둘 다 깨지면 빈 수첩으로 돌아간다', () => {
    expect(readNotebook('{', JSON.stringify([careEntry]), CARE_PLAN_PRODUCTS).care).toHaveLength(1);
    expect(readNotebook('{', 'nope', CARE_PLAN_PRODUCTS)).toEqual(emptyNotebook());
  });

  it('알 수 없는 필드는 버리고 알려진 필드만 남긴다', () => {
    const raw = JSON.stringify({ version: 2, extra: 1, care: [{ ...careEntry, secret: 'x' }], products: [{ ...newNotebookProduct('p-1', purifier.modelNumber), note: 'x', repairs: [{ id: 'r-1', date: '2026-05-01', description: '필터 교체', costWon: 30000, by: 'x' }] }] });
    const notebook = readNotebook(raw, null, CARE_PLAN_PRODUCTS);
    expect(Object.keys(notebook.care[0]).sort()).toEqual(['chosenDate', 'id', 'itemId', 'lastCareDate', 'modelNumber']);
    expect(notebook.products[0]).not.toHaveProperty('note');
    expect(notebook.products[0].repairs[0]).toEqual({ id: 'r-1', date: '2026-05-01', description: '필터 교체', costWon: 30000 });
  });
});

describe('JSON 파일 불러오기 검증', () => {
  const notebook: HouseholdNotebook = {
    version: 2, care: [careEntry],
    products: [{ ...newNotebookProduct('p-1', purifier.modelNumber), purchaseDate: '2026-03-15', repairs: [{ id: 'r-1', date: '2026-05-01', description: '출수구 수리', costWon: 45000 }] }],
  };

  it('내보낸 파일을 그대로 다시 읽는다', () => {
    expect(importNotebookText(exportNotebookText(notebook, '2026-10-29'), CARE_PLAN_PRODUCTS)).toEqual({ kind: 'ok', notebook, dropped: 0 });
  });

  it('크기 제한을 넘으면 읽지 않는다', () => {
    const big = JSON.stringify({ version: 2, care: [], products: [], pad: 'x'.repeat(NOTEBOOK_FILE_MAX_BYTES) });
    expect(importNotebookText(big, CARE_PLAN_PRODUCTS)).toMatchObject({ kind: 'error' });
  });

  it('JSON이 아니거나, 다른 앱 파일이거나, 더 새로운 버전이면 거절한다', () => {
    expect(importNotebookText('{oops', CARE_PLAN_PRODUCTS)).toEqual({ kind: 'error', message: 'JSON 파일을 읽지 못했습니다.' });
    expect(importNotebookText(JSON.stringify({ app: 'other', care: [] }), CARE_PLAN_PRODUCTS)).toMatchObject({ kind: 'error' });
    expect(importNotebookText(JSON.stringify({ version: 3, care: [] }), CARE_PLAN_PRODUCTS)).toMatchObject({ kind: 'error' });
    expect(importNotebookText(JSON.stringify({ hello: 1 }), CARE_PLAN_PRODUCTS)).toMatchObject({ kind: 'error' });
    expect(importNotebookText('"text"', CARE_PLAN_PRODUCTS)).toMatchObject({ kind: 'error' });
  });

  it('v1 배열 파일도 받는다', () => {
    expect(importNotebookText(JSON.stringify([careEntry]), CARE_PLAN_PRODUCTS)).toMatchObject({ kind: 'ok', notebook: { care: [careEntry], products: [] } });
  });

  it('형식이 틀린 기록은 세어 빼고 나머지는 불러온다', () => {
    const raw = JSON.stringify({
      version: 2,
      care: [careEntry, { ...careEntry, id: 'bad id!' }],
      products: [
        { ...newNotebookProduct('p-1', purifier.modelNumber), purchaseDate: '2026-02-30', airconType: 'hot', repairs: [{ id: 'r-1', date: '2026-05-01', description: '', costWon: 1 }, { id: 'r-2', date: '2026-05-02', description: '수리', costWon: -5 }, { id: 'r-3', date: '2026-05-03', description: '수리', costWon: null }] },
        newNotebookProduct('p-2', 'UNKNOWN'),
        newNotebookProduct('p-3', purifier.modelNumber),
      ],
    });
    const result = importNotebookText(raw, CARE_PLAN_PRODUCTS);
    if (result.kind !== 'ok') throw new Error(result.message);
    expect(result.notebook.care).toHaveLength(1);
    expect(result.notebook.products).toHaveLength(1);
    expect(result.notebook.products[0]).toMatchObject({ purchaseDate: '', airconType: '' });
    expect(result.notebook.products[0].repairs.map((repair) => repair.id)).toEqual(['r-3']);
    expect(result.dropped).toBe(1 + 2 + 2);
  });
});

describe('제품 기록과 고시 품목', () => {
  it('에어컨은 구분을 고르기 전에는 고시 품목을 정하지 않는다', () => {
    const product = newNotebookProduct('p-1', aircon.modelNumber);
    expect(notebookStandardItemId(product, CARE_PLAN_PRODUCTS)).toBe('');
    expect(notebookStandardItemId({ ...product, airconType: 'cooling' }, CARE_PLAN_PRODUCTS)).toBe('aircon-cooling');
    expect(notebookStandardItemId({ ...product, airconType: 'heat-pump' }, CARE_PLAN_PRODUCTS)).toBe('aircon-heat-pump');
  });

  it('기록에 구입일 기산 종료일, 수리비 합계, 고시 미등재 품목을 남긴다', () => {
    const record = notebookRecord({
      version: 2, care: [],
      products: [
        { ...newNotebookProduct('p-1', purifier.modelNumber), purchaseDate: '2026-03-15', purchasePlace: '공식몰', repairs: [
          { id: 'r-1', date: '2026-05-01', description: '출수구 수리', costWon: 45000 },
          { id: 'r-2', date: '2026-06-01', description: '점검', costWon: null },
        ] },
        { ...newNotebookProduct('p-2', dishwasher.modelNumber), purchaseDate: '2026-03-15' },
      ],
    }, CARE_PLAN_PRODUCTS, '2026-10-29');
    expect(record).toContain('[사용자 입력] 구입일: 2026-03-15 · 구입처: 공식몰');
    expect(record).toContain('[계산값] 고시 기준 품질보증 종료일: 2027-03-15');
    expect(record).toContain('부품보유 종료일: 계산하지 않음');
    expect(record).toContain('[계산값] 입력한 수리비 합계: 45,000원 (1건, 금액 미입력 1건 제외)');
    expect(record).toContain('[확인 필요] 고시 표에 해당 분류 없음');
  });
});
