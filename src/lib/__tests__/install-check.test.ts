import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';
import InstallCheckPage, { metadata } from '@/app/tools/install-check/page';
import FridgeFitPage from '@/app/tools/fridge-fit/page';
import DishwasherFitPage from '@/app/tools/dishwasher-fit/page';
import sitemap from '@/app/sitemap';
import { FitSection } from '@/components/detail/fit-section';
import { SITE_URL } from '@/lib/constants';
import { allAppliances, getApplianceBySlug } from '@/lib/data/appliances';
import { INSTALL_MODELS, getInstallModel } from '@/lib/data/install-check';
import { lastRevisionFor } from '@/lib/data/site-revisions';
import { getDetailedReview } from '@/lib/data/detailed-reviews';
import {
  checkInstall, effectiveStatus, emptyInstallInputs, getInstallCategory, INSTALL_CATEGORIES, INSTALL_EXAMPLES, installCheckHref, installCheckRecord, installStatusCounts, parseInstallSelection,
  type ClearanceSide, type InstallAxis, type InstallModel, type InstallPartId,
} from '@/lib/install-check';
import { formatMm } from '@/lib/fridge-fit';
import { getTool, STORAGE_LABELS } from '@/lib/tool-directory';
import { VALUE_KIND_LABELS } from '@/lib/value-kind';

vi.mock('next/navigation', () => ({ useRouter: () => ({ replace: vi.fn() }), useSearchParams: () => new URLSearchParams() }));

interface JsonClearance { side: string; mm: number | null; status: string; text: string; where: string; part?: string }
interface JsonCondition { topic: string; status: string; text: string; where: string }
interface JsonDims { width: number | null; depth: number | null; height: number | null; where: string; part?: string; model?: string }
interface JsonModel {
  model: string; slug: string; category: string; document: string; sourceUrl: string; sourcePages: string; sha256: string; checkedAt: string;
  body: JsonDims; outdoor?: JsonDims; station?: JsonDims; door?: { openDepth: number | null; openWidth: number | null; where: string };
  clearances: JsonClearance[]; conditions: JsonCondition[]; notes: string[];
}
const EVIDENCE = join(process.cwd(), 'research/evidence/2026-10-29/install');
const JSON_MODELS: JsonModel[] = ['washer-dryer-purifier.json', 'aircon-robot.json'].flatMap((file) => JSON.parse(readFileSync(join(EVIDENCE, file), 'utf-8')));
const CATEGORY: Record<string, InstallModel['category']> = { 세탁기: 'washer', 건조기: 'washer', 정수기: 'purifier', 에어컨: 'aircon', 로봇청소기: 'robot' };
const PART: Record<string, InstallPartId> = { 실내기: 'indoor', 실외기: 'outdoor', 스테이션: 'station', 본체: 'robot' };
const numbers = (text: string) => text.match(/\d+(?:[.,]\d+)*/g) ?? [];
const text = (html: string) => html.replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/\s+/g, ' ').trim();
const escapeHtml = (value: string) => value.replaceAll('&', '&amp;');
const model = (name: string) => getInstallModel(name)!;
const check = (m: InstallModel, id: string, inputs: Record<string, string> = {}) => checkInstall(m, inputs).find((c) => c.id === id)!;

/** 화면 데이터의 문장 필드. 근거 JSON에 없는 숫자가 끼어들지 않았는지 본다. */
function stringFields(m: InstallModel): string[] {
  return [m.document, m.sourcePages, m.manualNote ?? '', ...m.notes,
    ...m.parts.flatMap((p) => [p.where, p.basis, p.axisNote ?? '', p.model ?? '']),
    ...(m.door ? [m.door.basis, m.door.where] : []), ...(m.envelope ? [m.envelope.text, m.envelope.where] : []),
    ...m.clearances.flatMap((c) => [c.text, c.where, ...(c.conflict ?? []).map((v) => v.where)]),
    ...m.limits.flatMap((l) => [l.text, l.where]), ...m.conditions.flatMap((c) => [c.text, c.where, c.topic])];
}

describe('설치 데이터가 근거 JSON과 같다', () => {
  it('JSON의 15개 모델을 빠짐없이, 같은 카탈로그 제품으로 싣는다', () => {
    expect(JSON_MODELS).toHaveLength(15);
    expect(INSTALL_MODELS.map((m) => m.model).sort()).toEqual(JSON_MODELS.map((m) => m.model).sort());
    for (const json of JSON_MODELS) {
      const m = model(json.model);
      expect(m.slug, json.model).toBe(json.slug);
      expect(m.category, json.model).toBe(CATEGORY[json.category]);
      expect(getApplianceBySlug(m.slug)?.modelNumber, json.model).toBe(json.model);
      expect([m.sourceUrl, m.sha256, m.checkedAt], json.model).toEqual([json.sourceUrl, json.sha256, json.checkedAt]);
    }
  });

  it.each(JSON_MODELS.map((json) => [json.model, json] as const))('%s: 치수·문 개방·면별 여유·조건의 값과 status·where', (_, json) => {
    const m = model(json.model);
    const parts: [InstallPartId, JsonDims | undefined][] = [
      [json.body.part ? PART[json.body.part] : 'body', json.body],
      ['outdoor', json.outdoor],
      ['station', json.station && json.station.where.startsWith('해당 없음') ? undefined : json.station],
    ];
    for (const [id, dims] of parts) {
      const part = m.parts.find((p) => p.id === id);
      if (!dims) { expect(part, `${id} 없음`).toBeUndefined(); continue; }
      expect(part, id).toBeDefined();
      expect([part!.width, part!.depth, part!.height], id).toEqual([dims.width, dims.depth, dims.height]);
      expect(dims.where, `${id} where`).toContain(part!.where);
      if (dims.model) expect(part!.model, `${id} model`).toBe(dims.model);
    }
    if (json.door) {
      expect([m.door?.openDepth, m.door?.openWidth]).toEqual([json.door.openDepth, json.door.openWidth]);
      expect(json.door.where).toContain(m.door!.where);
    } else expect(m.door).toBeUndefined();
    expect(m.clearances.map((c) => [c.part, c.side, c.mm, c.status, c.where])).toEqual(json.clearances.map((c) => [c.part ? PART[c.part] : 'body', c.side, c.mm, c.status, c.where]));
    expect(m.conditions.map((c) => [c.topic, c.status, c.where])).toEqual(json.conditions.map((c) => [c.topic, c.status, c.where]));
  });

  it.each(INSTALL_MODELS.map((m) => [m.model, m] as const))('%s: 문장에 근거 JSON에 없는 숫자를 만들지 않는다', (_, m) => {
    const json = JSON_MODELS.find((entry) => entry.model === m.model)!;
    const source = new Set(numbers(JSON.stringify(json)));
    const invented = stringFields(m).flatMap(numbers).filter((n) => !source.has(n));
    expect(invented).toEqual([]);
    // 각 조건 문장의 숫자는 같은 순서의 JSON 조건 문장 안에 있어야 한다.
    m.conditions.forEach((c, i) => { for (const n of numbers(c.text)) expect(numbers(json.conditions[i].text), `${c.topic} ${n}`).toContain(n); });
    m.clearances.forEach((c, i) => { for (const n of numbers(c.text)) expect(numbers(json.clearances[i].text), `${c.side} ${n}`).toContain(n); });
  });

  it('상한값(문턱·높이차)은 같은 원문 조건에서 옮기고 단위만 mm로 바꾼다', () => {
    const cases: [string, 'threshold' | 'heightDiff', number | null, string][] = [
      ['RO585HGH', 'threshold', 20, '2cm'], ['Qrevo Curv', 'threshold', 30, '3cm'], ['VR50T95935W', 'threshold', 15, '1.5cm'], ['S8 Pro Ultra', 'threshold', null, ''],
      ['CTH06QBW', 'heightDiff', 5000, '5m'], ['CTH10QBW', 'heightDiff', 5000, '5m'], ['AR07A9170HCN', 'heightDiff', null, ''],
    ];
    for (const [name, key, mm, phrase] of cases) {
      const m = model(name);
      const limit = m.limits.find((l) => l.key === key)!;
      expect(limit.mm, name).toBe(mm);
      const source = JSON_MODELS.find((j) => j.model === name)!.conditions.find((c) => c.where === limit.where && (c.topic === '문턱' || c.topic === '배관 높이차'));
      expect(source, name).toBeDefined();
      expect(source!.status, name).toBe(limit.status);
      if (phrase) expect(source!.text.replace(/\s/g, ''), name).toContain(phrase);
    }
  });

  it('문서 단위 집계가 근거 md의 확인·미확인 수와 같다(설명서 없는 LG의 FAQ 문턱만 확인 필요로 내림)', () => {
    const md = { WF24A9500KE: [13, 4], WD25DB8995BZ: [12, 3], DV17A9720BV: [14, 1], 'CHPI-7400N': [11, 3], WD523ACB: [13, 2], 'WPU-A710C': [10, 3], AR07A9170HCN: [10, 11], CTH06QBW: [16, 6], CTH10QBW: [17, 6], 'TAC-08CSD/TPH11I': [3, 14], 'TAC-12CSD/TPH11I': [3, 14], RO585HGH: [2, 8], 'Qrevo Curv': [7, 5], 'S8 Pro Ultra': [8, 3], VR50T95935W: [9, 3] } as Record<string, [number, number]>;
    for (const m of INSTALL_MODELS) {
      const raw = [...m.clearances, ...m.conditions];
      expect([raw.filter((x) => x.status === 'confirmed').length, raw.filter((x) => x.status === 'unverified').length], m.model).toEqual(md[m.model]);
    }
    expect(installStatusCounts(model('RO585HGH'))).toEqual({ confirmed: 1, unverified: 9 });
  });
});

describe('기준은 확인된 여유만 더한다', () => {
  const sidesOf = (m: InstallModel, part: InstallPartId, sides: ClearanceSide[]) => m.clearances.filter((c) => c.part === part && sides.includes(c.side) && c.mm !== null && effectiveStatus(m, c) === 'confirmed').reduce((sum, c) => sum + c.mm!, 0);

  it('모든 모델·모든 칸에서 기준 = 본체 + 확인된 여유이고, 확인 필요 면은 결과에 남긴다', () => {
    for (const m of INSTALL_MODELS) {
      for (const field of getInstallCategory(m.category).fields) {
        if (field.measure.type !== 'axis') continue;
        const { part: partId, axis, sides } = field.measure as { part: InstallPartId; axis: InstallAxis; sides: ClearanceSide[] };
        const result = check(m, field.key);
        const part = m.parts.find((p) => p.id === partId)!;
        if (m.envelope) { expect(result.reference, `${m.model} ${field.key}`).toBe(m.envelope[axis]); continue; }
        if (part[axis] === null) { expect(result.kind, `${m.model} ${field.key}`).toBe('manual'); continue; }
        expect(result.reference, `${m.model} ${field.key}`).toBe(Math.round((part[axis]! + sidesOf(m, partId, sides)) * 10) / 10);
        for (const side of result.missingSides ?? []) expect(result.notes.some((n) => n.text.startsWith(`${({ top: '위', bottom: '아래', left: '왼쪽', right: '오른쪽', front: '앞', rear: '뒤' })[side]} 여유는 확인 필요 —`)), `${m.model} ${side}`).toBe(true);
      }
    }
  });

  it('위 여유를 찾지 못한 세탁기·정수기는 높이를 본체만으로 비교한다고 적는다', () => {
    const wf = check(model('WF24A9500KE'), 'height', { height: '1000' });
    expect(wf).toMatchObject({ reference: 984, kind: 'measured', difference: 16 });
    expect(wf.notes.map((n) => n.text)).toContain('이 차이는 본체만 비교했습니다.');
    expect(check(model('DV17A9720BV'), 'height', { height: '1000' })).toMatchObject({ reference: 1009, kind: 'short', difference: -9 });
    expect(check(model('CHPI-7400N'), 'height').reference).toBe(465);
    // LG는 위 100mm가 고장 진단 절의 '천장' 기준이다. 공식 자료로 더하되 출처 절을 남긴다.
    const lg = check(model('WD523ACB'), 'height');
    expect(lg.reference).toBe(498);
    expect(lg.notes.some((n) => n.kind === 'troubleshooting' && n.text.includes('고장 진단 절'))).toBe(true);
    const coway = check(model('CHPI-7400N'), 'width', { width: '439.9' });
    expect(coway).toMatchObject({ reference: 440, kind: 'short', difference: -0.1 });
    expect(coway.notes.filter((n) => n.kind === 'troubleshooting')).toHaveLength(2);
  });

  it('하이얼 실외기 배관 쪽 옆면은 60cm·30cm를 쪽과 함께 보여 주고 계산에 쓰지 않는다', () => {
    for (const name of ['CTH06QBW', 'CTH10QBW']) {
      const m = model(name);
      const right = m.clearances.find((c) => c.part === 'outdoor' && c.side === 'right')!;
      expect(right.conflict?.map((v) => v.mm)).toEqual([600, 300]);
      const width = check(m, 'outdoorWidth', { outdoorWidth: '1000' });
      expect(width.reference).toBe(300 + m.parts.find((p) => p.id === 'outdoor')!.width!);
      expect(width.formula).not.toContain('오른쪽');
      const conflict = width.notes.find((n) => n.kind === 'conflict')!;
      for (const piece of ['600mm', '300mm', '30쪽 설치도', '6쪽 본문', '계산에 쓰지 않았습니다']) expect(conflict.text).toContain(piece);
      expect(installCheckRecord(m, emptyInstallInputs('aircon'), [])).toContain('원문 안에서 엇갈림: 600mm');
    }
  });

  it('Qrevo Curv의 0.9·0.46·1.2m는 둘레 여유가 아니라 공간 외곽 치수로 바로 비교한다', () => {
    const q = model('Qrevo Curv');
    expect(q.envelope).toMatchObject({ width: 460, depth: 1200, height: 900 });
    expect(q.clearances.every((c) => c.mm === null)).toBe(true);
    const width = check(q, 'width', { width: '459' });
    expect(width).toMatchObject({ reference: 460, kind: 'short', difference: -1 });
    expect(width.formula).toContain('확보 공간 외곽');
    expect(width.formula).not.toContain('450');
    expect(width.notes[0].text).toContain('둘레 여유가 아니라');
  });

  it('축 표기가 없는 S8 Pro Ultra 도크는 자리 크기를 계산하지 않는다', () => {
    const s8 = model('S8 Pro Ultra');
    for (const key of ['width', 'depth', 'height']) expect(check(s8, key, { [key]: '1000' }).kind).toBe('manual');
    expect(check(s8, 'threshold', { threshold: '10' }).kind).toBe('manual');
  });

  it('문을 연 깊이는 확인된 모델(DV17)만 같은 앞쪽 거리로 비교한다', () => {
    expect(check(model('DV17A9720BV'), 'depth-door', { depth: '1300' })).toMatchObject({ reference: 1413, kind: 'short', difference: -113 });
    for (const name of ['WF24A9500KE', 'WD25DB8995BZ']) expect(check(model(name), 'depth-door', { depth: '1300' }).kind).toBe('manual');
    expect(check(model('CHPI-7400N'), 'depth-door')).toBeUndefined();
  });

  it('문턱·높이차는 안내 값과의 차이만 내고, 확인되지 않은 모델은 비교하지 않는다', () => {
    expect(check(model('VR50T95935W'), 'threshold', { threshold: '16' })).toMatchObject({ kind: 'short', message: '안내 값 15mm를 1mm 넘음' });
    expect(check(model('CTH06QBW'), 'heightDiff', { heightDiff: '3000' })).toMatchObject({ kind: 'measured', difference: 2000 });
    expect(check(model('AR07A9170HCN'), 'heightDiff', { heightDiff: '3000' }).kind).toBe('manual');
  });

  it('잘못된 입력은 계산하지 않고 칸 오류로 남긴다', () => {
    expect(check(model('WF24A9500KE'), 'width', { width: '72cm' }).kind).toBe('invalid');
    expect(check(model('WF24A9500KE'), 'width', { width: '7,26' }).kind).toBe('invalid');
    expect(installCheckRecord(model('WF24A9500KE'), { width: '72cm', depth: '', height: '' }, [])).toContain('세탁기 자리 폭: 입력 오류');
  });
});

describe('설명서를 찾지 못한 모델', () => {
  const missing = INSTALL_MODELS.filter((m) => !m.manualFound);

  it('TCL 2종과 LG RO585HGH만 해당하고, 간격·조건은 제품 페이지 사양 값만 공식 자료로 남는다', () => {
    expect(missing.map((m) => m.model).sort()).toEqual(['RO585HGH', 'TAC-08CSD/TPH11I', 'TAC-12CSD/TPH11I']);
    for (const m of missing) {
      expect(m.clearances.every((c) => effectiveStatus(m, c) === 'unverified'), m.model).toBe(true);
      const official = m.conditions.filter((c) => effectiveStatus(m, c) === 'confirmed');
      expect(official.every((c) => c.productSpec), m.model).toBe(true);
      expect(official.every((c) => /탭|고지정보|성능/.test(c.where)), m.model).toBe(true);
      const record = installCheckRecord(m, emptyInstallInputs(m.category), []);
      expect(record).toContain('[확인 필요] 공식 설치 설명서를 찾지 못함');
    }
    // FAQ가 라인명 'R5'로 적은 문턱 2cm는 비교에 쓰지 않는다.
    expect(check(model('RO585HGH'), 'threshold', { threshold: '15' }).kind).toBe('manual');
  });

  it('화면 상단에 설명서를 찾지 못했다고 밝힌다', () => {
    const html = renderToStaticMarkup(createElement(InstallCheckPage));
    const guide = text(html.slice(html.indexOf('<section id="tool-guide"')));
    for (const m of missing) expect(guide).toContain(`${m.name} ${m.model} 제품 페이지`);
    expect(guide).toContain('공식 설치 설명서를 찾지 못했습니다');
  });
});

describe('주소는 품목과 모델만 복원한다', () => {
  it('품목·모델만 주소에 넣고 치수는 넣지 않는다', () => {
    expect(installCheckHref('aircon', 'TAC-08CSD/TPH11I')).toBe('/tools/install-check?category=aircon&model=TAC-08CSD%2FTPH11I');
    expect(installCheckHref()).toBe('/tools/install-check');
    const record = installCheckRecord(model('CTH06QBW'), { ...emptyInstallInputs('aircon'), indoorWidth: '1234' }, []);
    const toolLine = record.split('\n').find((line) => line.startsWith('도구: '))!;
    expect(toolLine).toBe('도구: https://salimlab.kr/tools/install-check?category=aircon&model=CTH06QBW');
    expect(toolLine).not.toContain('1234');
  });

  it('모델이 있으면 그 모델의 품목을, 없으면 품목의 첫 모델을 고른다', () => {
    const search = (q: string) => { const p = new URLSearchParams(q); return parseInstallSelection(INSTALL_MODELS, p.get('category'), p.get('model')); };
    expect(search('')).toEqual({ category: 'washer', model: 'WF24A9500KE' });
    expect(search('category=robot')).toEqual({ category: 'robot', model: 'RO585HGH' });
    expect(search('model=cth10qbw')).toEqual({ category: 'aircon', model: 'CTH10QBW' });
    expect(search('category=washer&model=TAC-08CSD%2FTPH11I')).toEqual({ category: 'aircon', model: 'TAC-08CSD/TPH11I' });
    expect(search('model=Qrevo+Curv')).toEqual({ category: 'robot', model: 'Qrevo Curv' });
    expect(search('category=purifier&model=XYZ')).toEqual({ category: 'purifier', model: '', unknownModel: 'XYZ' });
    expect(search('category=bogus')).toEqual({ category: 'washer', model: 'WF24A9500KE' });
    expect(STORAGE_LABELS[getTool('install-check').storage]).toContain('?category=·?model=');
  });
});

describe('정적 마크업: 품목마다 다른 설명 절', () => {
  const html = renderToStaticMarkup(createElement(InstallCheckPage));
  const guideHtml = html.slice(html.indexOf('<section id="tool-guide"'));
  const guide = text(guideHtml);

  it('메타데이터와 품목 네 개, 다른 설치 확인표 링크를 갖는다', () => {
    expect(metadata.alternates?.canonical).toBe('/tools/install-check');
    for (const category of INSTALL_CATEGORIES) expect(text(html)).toContain(category.label);
    expect(html).toContain('href="/tools/fridge-fit"');
    expect(html).toContain('href="/tools/dishwasher-fit"');
    expect(html).toContain('id="install-check-page"');
  });

  it('품목마다 재는 방법·계산식·모델별 기준·예시·오해·원문을 싣는다', () => {
    for (const category of INSTALL_CATEGORIES) {
      const start = guide.indexOf(`${category.label}: 재는 곳과 기준`);
      expect(start, category.id).toBeGreaterThan(-1);
      const next = INSTALL_CATEGORIES.map((c) => guide.indexOf(`${c.label}: 재는 곳과 기준`)).filter((i) => i > start).sort((a, b) => a - b)[0] ?? guide.length;
      const part = guide.slice(start, next);
      for (const heading of ['재는 방법', '이 품목의 계산식', '모델별 기준', '예시 계산', '자주 하는 오해', '원문']) expect(part, `${category.id} ${heading}`).toContain(heading);
      expect(part, category.id).toContain(VALUE_KIND_LABELS.example);
      for (const m of INSTALL_MODELS.filter((entry) => entry.category === category.id)) expect(part, m.model).toContain(m.model);
    }
    expect(guideHtml.match(/data-example/g)).toHaveLength(4);
    for (const m of INSTALL_MODELS) expect(guideHtml, m.model).toContain(`href="${escapeHtml(m.sourceUrl)}"`);
  });

  it('품목마다 오해 항목이 3~5개이고 서로 다르다', () => {
    const lists = guideHtml.split('자주 하는 오해').slice(1).map((chunk) => chunk.slice(0, chunk.indexOf('</ul>')));
    expect(lists).toHaveLength(4);
    for (const list of lists) {
      const count = (list.match(/<li>/g) ?? []).length;
      expect(count).toBeGreaterThanOrEqual(3);
      expect(count).toBeLessThanOrEqual(5);
    }
    expect(new Set(lists).size).toBe(4);
  });

  it('예시 계산이 계산 함수와 같은 값이고 예시값으로 표시된다', () => {
    for (const [id, example] of Object.entries(INSTALL_EXAMPLES)) {
      const m = model(example.model);
      expect(m.category).toBe(id);
      for (const c of checkInstall(m, example.inputs)) {
        if (c.difference !== undefined) expect(guide, `${id} ${c.label}`).toContain(c.message.split(' · ')[0]);
        if (c.formula) expect(guide, `${id} ${c.label}`).toContain(c.formula);
      }
    }
    expect(guide).toContain('113mm 부족');
    expect(guide).toContain(`= ${formatMm(1413)}mm`);
  });

  it('판정 문구를 쓰지 않는다', () => {
    expect(text(html)).not.toMatch(/설치(할 수 있습니다|가 가능합니다| 가능합니다)/);
  });
});

describe('도구 모음·사이트맵·제품 상세에 연결된다', () => {
  it('도구 모음에 설치 과제로 등록하고 범위를 데이터에서 센다', () => {
    const tool = getTool('install-check');
    expect(tool.task).toBe('install');
    for (const m of INSTALL_MODELS) expect(tool.scope).toContain(m.model);
    expect(tool.scope).toContain('세탁기·건조기 3개');
    expect(tool.scope).toContain('벽걸이 에어컨 5개');
  });

  it('사이트맵에 넣고 개편 기록 범위(/tools/*)에 든다', () => {
    expect(sitemap().map((entry) => entry.url)).toContain(`${SITE_URL}/tools/install-check`);
    expect(lastRevisionFor('/tools/install-check')).toBe('2026-10-29');
  });

  it('냉장고·식기세척기 확인표에서 이 도구로 간다', () => {
    for (const page of [FridgeFitPage, DishwasherFitPage]) expect(renderToStaticMarkup(createElement(page))).toContain('href="/tools/install-check"');
  });

  it('지원 모델의 제품 상세 적합성 절에만 이 도구 링크가 붙는다', () => {
    for (const appliance of allAppliances) {
      const html = renderToStaticMarkup(createElement(FitSection, { appliance }));
      const supported = getInstallModel(appliance.modelNumber);
      if (supported) expect(html, appliance.slug).toContain(`href="${escapeHtml(installCheckHref(supported.category, supported.model))}"`);
      else expect(html, appliance.slug).not.toContain('/tools/install-check');
    }
  });
});

describe('카탈로그 정정', () => {
  it('TCL TAC-08CSD 설치 안내는 현재 제품 페이지의 실외기 치수를 적는다', () => {
    const tcl = getApplianceBySlug('tcl-tac-08csd-wall')!;
    expect(tcl.roomFit?.installationNote).toContain('722×276×459mm(W*D*H)');
    expect(tcl.roomFit?.installationNote).toContain('2026-10-29');
    expect(tcl.roomFit?.installationNote).not.toContain('수치가 없어');
    // 실내기 788×275×192의 축 표기는 추정만 있어 바꾸지 않는다.
    expect(tcl.techSpecs.dimensions).toBe('788 x 275 x 192mm');
    expect(model('TAC-08CSD/TPH11I').parts.find((p) => p.id === 'outdoor')).toMatchObject({ width: 722, depth: 276, height: 459 });
  });

  it('TCL 두 모델의 심층 리뷰도 실외기 치수가 없다고 말하지 않는다', () => {
    const body = (slug: string) => getDetailedReview(slug)!.map((section) => section.body).join(' ');
    expect(body('tcl-tac-08csd-wall')).toContain('722×276×459mm');
    expect(body('tcl-tac-08csd-wall')).not.toContain('수치가 없어(2026-10-08 확인)');
    expect(body('tcl-tac-12csd-wall')).toContain('787×290×498mm');
    expect(body('tcl-tac-12csd-wall')).not.toContain('실외기 치수는 제조사 자료에 없습니다');
  });
});
