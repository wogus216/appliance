import { describe, expect, it } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { renderToStaticMarkup } from 'react-dom/server';
import BrandErrorCodesPage from '@/app/error-codes/[brand]/page';
import SkMagicDishwasherE4Page from '@/app/error-codes/SKMagic/dishwasher/e4/page';
import {
  HUB_ACTION_SETS,
  NO_CARD_DEFAULT_NOTE,
  getEntryActionGuides,
  getEntryNoCard,
  getHubActionGuides,
  getHubNoCardCodes,
  hubActionAnchor,
} from '@/lib/data/error-codes/action-guides';
import { getBrandErrorCodes } from '@/lib/error-codes';
import { allAppliances } from '@/lib/data/appliances';
import { getStaticActionPlan, type ErrorActionGuide } from '@/lib/error-action';

// 2026-10-29 행동 카드 확대의 게이트. 카드의 모델 범위·근거는 research/evidence/2026-10-29/error-actions/ 의
// 원문 대조 JSON과 한 건씩 맞아야 하고, 허브의 모든 코드 항목은 카드나 「카드 없음」 안내를 가져야 한다.
// 같은 날 2026-10-27 이전 카드 4개도 원문을 다시 열어 legacy-cards.json에 넣었다 — 근거 파일 연결은 카드 전부(70/70)다.

type EvidenceModel = { model: string; manualUrl: string; manualLabel: string; checkedAt: string; faqUrl?: string };
type EvidenceRow = {
  file: string;
  hub: string;
  category: string;
  code: string;
  decision: 'card' | 'no-card';
  actionType: string;
  models: EvidenceModel[];
  serviceUrl: string;
  faqUrl?: string;
  /** legacy-cards.json만: 카드를 처음 만들 때 쓴 이전 대조 기록 */
  priorEvidence?: string[];
  quotes?: { where: string; text: string }[];
  sha256?: Record<string, string>;
};

const LEGACY_FILE = 'research/evidence/2026-10-29/error-actions/legacy-cards.json';
const EVIDENCE_FILES = [
  'research/evidence/2026-10-29/error-actions/skmagic-cuckoo-roborock.json',
  'research/evidence/2026-10-29/error-actions/samsung-lg-haier.json',
  'research/evidence/2026-10-29/error-actions/boilers.json',
  LEGACY_FILE,
];
const rows: EvidenceRow[] = EVIDENCE_FILES.flatMap((file) =>
  (JSON.parse(readFileSync(join(process.cwd(), file), 'utf8')) as Omit<EvidenceRow, 'file'>[]).map((row) => ({ ...row, file })),
);

const HUBS = ['SKMagic', 'Cuckoo', 'Roborock', 'Samsung', 'LG', 'Haier', 'Kiturami', 'Navien'];
const allGuides = HUB_ACTION_SETS.flatMap((set) => set.guides.map((guide) => ({ hub: set.brand, guide })));

/** JSON의 코드 표기와 허브 표기가 다른 경우(SK매직 정수기는 FAQ 제목 F01, 표 이미지 F:01) */
const SITE_CODE: Record<string, string> = { 'SKMagic|F01': 'F:01' };

/**
 * 원문 JSON의 판정을 리드가 바꾼 카드. 이유를 함께 적는다.
 * - 9C2: 저전압이라 전기 계통이지만 설명서 81쪽이 사용자 확인 네 가지를 허용한다. 5·6쪽 콘센트 안전을 단계 맨 앞에 둔다.
 * - 점화 실패 세 건: 원문이 가스밸브 확인·재가동(나비엔은 전원 재연결)을 허용한다. 반복 시 중단·연락을 멈춤 조건 맨 앞에 둔다.
 */
const LEAD_TYPE_OVERRIDES: Record<string, 'check' | 'contact'> = {
  'Samsung|9C2': 'check',
  'Kiturami|01 / 02 / 03': 'check',
  'Kiturami|E001 / E002 / E003': 'check',
  'Navien|Er03 / E3 / E003': 'check',
};

/** 위험 계통인데 check로 둔 카드 — 원문이 사용자 확인을 허용한 경우만 */
const HAZARD_CHECK_EXCEPTIONS = new Set([
  'samsung-dryer-9c2',
  'samsung-dryer-tc5', // 원문 분류는 압축기 온도 센서 문제, 조치는 2~3분 기다린 뒤 다시 시작(인쇄 81쪽)
  'kiturami-01-02-03',
  'kiturami-e001-e003',
  'navien-er03',
]);

/** 뜻 자체가 가스·누수·과열·전기 위험인 카드. 위험 표시를 빼면 contact 검사를 피해 가므로 이름으로 고정한다 */
const REQUIRED_HAZARD: Record<string, NonNullable<ErrorActionGuide['hazard']>> = {
  'cuckoo-e4': 'leak',
  'skmagic-f01': 'leak',
  'samsung-dryer-hc': 'overheat',
  'samsung-dryer-tc5': 'overheat',
  'samsung-dryer-9c2': 'electric',
  'kiturami-01-02-03': 'gas',
  'kiturami-e001-e003': 'gas',
  'kiturami-97': 'gas',
  'kiturami-e297': 'gas',
  'kiturami-96': 'overheat',
  'kiturami-98-iot': 'overheat',
  'kiturami-e396-e399': 'overheat',
  'navien-er03': 'gas',
  'navien-er26': 'gas',
};

/** 2026-10-27에 만든 카드. 세 원문 JSON이 「다시 조사하지 않음」으로 뺐고, 2026-10-29에 legacy-cards.json으로 연결했다 */
const LEGACY_GUIDES = ['cuckoo-e4', 'skmagic-dr', 'skmagic-f9', 'roborock-s7-error2'];

const modelsOf = (row: EvidenceRow) =>
  row.models.map((m) => {
    const faqUrl = m.faqUrl ?? row.faqUrl;
    return { model: m.model, manualUrl: m.manualUrl, manualLabel: m.manualLabel, checkedAt: m.checkedAt, ...(faqUrl ? { faqUrl } : {}) };
  });
const guideModels = (guide: ErrorActionGuide) =>
  guide.models.map((m) => ({ model: m.model, manualUrl: m.manualUrl, manualLabel: m.manualLabel, checkedAt: m.checkedAt, ...(m.faqUrl ? { faqUrl: m.faqUrl } : {}) }));

function guidesForRow(row: EvidenceRow) {
  return allGuides.filter(({ hub, guide }) =>
    hub === row.hub &&
    guide.evidence?.file === row.file &&
    guide.evidence.code === row.code &&
    JSON.stringify(guideModels(guide).map((m) => m.model)) === JSON.stringify(row.models.map((m) => m.model)),
  );
}

const esc = (text: string) =>
  text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#x27;');

describe('원문 JSON과 행동 카드 대조', () => {
  const cardRows = rows.filter((row) => row.decision === 'card');

  it('근거 파일 네 개를 읽었고 card·no-card 행이 있다', () => {
    expect(new Set(rows.map((row) => row.file)).size).toBe(EVIDENCE_FILES.length);
    expect(cardRows.length).toBeGreaterThan(60);
    expect(rows.filter((row) => row.decision === 'no-card').length).toBeGreaterThan(5);
  });

  it.each(cardRows.map((row) => [`${row.hub} ${row.code} ${row.models[0]?.model ?? ''}`, row] as const))(
    '%s: 카드의 모델 범위·근거·서비스 주소·조치 유형이 원문 JSON과 같다',
    (_label, row) => {
      const matched = guidesForRow(row);
      expect(matched, `${row.hub} ${row.code}`).toHaveLength(1);
      const { guide } = matched[0];
      expect(guideModels(guide)).toEqual(modelsOf(row));
      expect(guide.serviceUrl).toBe(row.serviceUrl);
      expect(guide.category).toBe(row.category);
      expect(guide.code).toBe(SITE_CODE[`${row.hub}|${row.code}`] ?? row.code);
      expect(guide.action.type).toBe(LEAD_TYPE_OVERRIDES[`${row.hub}|${row.code}`] ?? row.actionType);
    },
  );

  it('카드 전부가 근거 파일을 가리키고(70/70), 각 카드는 JSON의 card 행 하나와 짝이 맞는다', () => {
    const linked = allGuides.filter(({ guide }) => guide.evidence && existsSync(join(process.cwd(), guide.evidence.file)));
    // 근거 파일이 실제로 있는 카드 수 = 전체 카드 수(2026-10-29 기준 70). 카드를 늘리면 근거 JSON 행도 같이 늘려야 한다
    expect(linked.length).toBe(allGuides.length);
    expect(allGuides.length).toBeGreaterThanOrEqual(70);
    for (const { hub, guide } of allGuides) {
      expect(guide.evidence, guide.id).toBeDefined();
      expect(EVIDENCE_FILES, guide.id).toContain(guide.evidence!.file);
      const matches = cardRows.filter((row) => guidesForRow(row).some((m) => m.guide === guide));
      expect(matches, `${hub} ${guide.id}`).toHaveLength(1);
    }
  });

  it('2026-10-27 이전 카드 4개는 legacy-cards.json(.md)을 가리키고, 이전 대조 기록·원문 인용·해시가 남아 있다', () => {
    const legacyRows = rows.filter((row) => row.file === LEGACY_FILE);
    expect(legacyRows).toHaveLength(LEGACY_GUIDES.length);
    expect(existsSync(join(process.cwd(), LEGACY_FILE.replace(/\.json$/, '.md')))).toBe(true);
    for (const id of LEGACY_GUIDES) {
      const guide = allGuides.find(({ guide: g }) => g.id === id)!.guide;
      expect(guide.evidence?.file, id).toBe(LEGACY_FILE);
      const row = legacyRows.find((r) => r.hub === guide.evidence!.hub && r.code === guide.evidence!.code)!;
      expect(row, id).toBeDefined();
      expect(row.priorEvidence?.length ?? 0, id).toBeGreaterThan(0);
      for (const prior of row.priorEvidence ?? []) expect(existsSync(join(process.cwd(), prior)), `${id} ${prior}`).toBe(true);
      expect(row.quotes?.length ?? 0, id).toBeGreaterThan(1);
      for (const hash of Object.values(row.sha256 ?? {})) expect(hash, id).toMatch(/^[0-9a-f]{64}$/);
      expect(Object.keys(row.sha256 ?? {}).length, id).toBeGreaterThan(0);
    }
  });

  it('no-card 행은 허브에 「카드 없음」으로 등록되고 같은 코드에 카드를 만들지 않는다', () => {
    for (const row of rows.filter((r) => r.decision === 'no-card')) {
      const item = getHubNoCardCodes(row.hub).find((n) => n.category === row.category && n.code === row.code);
      expect(item, `${row.hub} ${row.code}`).toBeDefined();
      expect(item!.serviceUrl).toBe(row.serviceUrl);
      expect(item!.evidence).toEqual({ file: row.file, hub: row.hub, code: row.code });
      expect(getHubActionGuides(row.hub).filter((g) => g.category === row.category && g.code === row.code)).toEqual([]);
    }
  });
});

describe('행동 카드의 필수 근거와 안전 기준', () => {
  it.each(allGuides.map(({ guide }) => [guide.id, guide] as const))('%s: 모델마다 설명서 주소·대조일, 카드마다 서비스 주소와 멈춤 조건이 있다', (_id, guide) => {
    expect(guide.models.length).toBeGreaterThan(0);
    for (const model of guide.models) {
      expect(model.manualUrl, model.model).toMatch(/^https:\/\//);
      expect(model.manualLabel.length, model.model).toBeGreaterThan(0);
      expect(model.checkedAt, model.model).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
    expect(guide.serviceUrl).toMatch(/^https:\/\//);
    expect(guide.stopConditions?.length ?? 0).toBeGreaterThan(0);
    expect(getStaticActionPlan(guide).steps.length).toBeGreaterThan(0);
  });

  it('가스·누수·과열·전기 위험 카드는 contact다(원문이 사용자 확인을 허용한 9C2·TC5·점화 실패 세 건만 예외)', () => {
    for (const [id, hazard] of Object.entries(REQUIRED_HAZARD)) {
      const guide = allGuides.find(({ guide: g }) => g.id === id)?.guide;
      expect(guide?.hazard, id).toBe(hazard);
    }
    for (const { guide } of allGuides) {
      if (!guide.hazard) continue;
      expect(guide.action.type, guide.id).toBe(HAZARD_CHECK_EXCEPTIONS.has(guide.id) ? 'check' : 'contact');
    }
  });

  it('점화 실패 check 카드는 「같은 표시가 반복되면 재가동을 멈추고 연락」을 멈춤 조건 맨 앞에 둔다', () => {
    for (const id of ['kiturami-01-02-03', 'kiturami-e001-e003', 'navien-er03']) {
      const guide = allGuides.find(({ guide: g }) => g.id === id)!.guide;
      expect(guide.stopConditions![0], id).toMatch(/(같은|동일).*(거듭|반복)/);
      expect(guide.stopConditions![0], id).toMatch(/연락|점검/);
      expect(getStaticActionPlan(guide).steps.join(' '), id).toMatch(/밸브/);
    }
  });

  it('9C2는 같은 설명서의 전용 콘센트(5쪽)·문어발 금지(6쪽)를 단계 맨 앞에 둔다', () => {
    const guide = getHubActionGuides('Samsung').find((g) => g.code === '9C2')!;
    const steps = getStaticActionPlan(guide).steps;
    expect(steps[0]).toContain('전용 콘센트');
    expect(steps[0]).toContain('5쪽');
    expect(steps[1]).toContain('문어발');
    expect(steps[1]).toContain('6쪽');
    expect(steps.slice(2).join(' ')).toMatch(/220V 16A/);
  });

  it('가스 누설 대처 절차(환기)는 귀뚜라미 97·E297 카드에만 있고 나비엔 카드에는 가스 냄새 절차가 없다', () => {
    for (const { hub, guide } of allGuides) {
      const text = [...getStaticActionPlan(guide).steps, ...(guide.stopConditions ?? [])].join(' ');
      if (!['kiturami-97', 'kiturami-e297'].includes(guide.id)) expect(text, guide.id).not.toContain('환기');
      if (hub === 'Navien') expect(text, guide.id).not.toContain('가스 냄새');
    }
  });
});

describe('SK매직 DWA-81 터치온의 E4', () => {
  const dwa81 = allAppliances.find((a) => a.slug === 'skmagic-touchon-dishwasher-dwa81')!;

  it('DWA-81R0D 제품 데이터에 E4가 없고, E4 카드도 만들지 않는다', () => {
    expect(dwa81.errorCodes?.some((code) => code.code === 'E4')).toBe(false);
    expect(getHubActionGuides('SKMagic').filter((g) => g.code === 'E4')).toEqual([]);
  });

  it('허브의 E4 항목은 DWA-81에 뜻을 붙이지 않고 「공식 근거 없음」 안내를 단다', () => {
    const e4 = getBrandErrorCodes('SKMagic').find((g) => g.category === '식기세척기')!.entries.filter((e) => e.code === 'E4');
    expect(e4).toHaveLength(1);
    expect(e4[0].anchorId).toBe('dishwasher-e4');
    expect(e4[0].products).toEqual([]);
    expect((e4[0].productLines ?? []).some((line) => /DWA-?81/.test(line))).toBe(false);
    expect(e4[0].cause).toContain('DWA-81 터치온');
    expect(e4[0].cause).toContain('확인하지 못했습니다');
    const note = getEntryNoCard('SKMagic', '식기세척기', e4[0]);
    expect(note?.note).toContain('DWA-81');
  });

  it('E4 상세 안내는 URL·기존 앵커를 유지하고 DWA-81R0D를 12인용 E4 계열로 적지 않는다', () => {
    const html = renderToStaticMarkup(SkMagicDishwasherE4Page());
    for (const id of ['dwa12', 'dwa29', 'dwa28', 'dwa19', 'dwa81']) expect(html).toContain(`id="${id}"`);
    expect(html).not.toContain('DWA-81R0D 등 12인용');
    expect(html).not.toContain('DWA90');
    for (const faq of ['FAQ261028039824', 'FAQ210104033077', 'FAQ261028039815', 'FAQ261028039822']) expect(html).toContain(faq);
    expect(html).toContain('공식 근거 없음');
  });
});

describe('허브 화면의 정적 마크업', () => {
  it.each(HUBS)('%s: 코드 항목마다 카드 또는 「카드 없음」이 붙고, 카드는 한 항목에만 붙는다', (brand) => {
    const entries = getBrandErrorCodes(brand).flatMap((g) => g.entries.map((e) => ({ category: g.category, e })));
    for (const { category, e } of entries) {
      const guides = getEntryActionGuides(brand, category, e);
      const noCard = getEntryNoCard(brand, category, e);
      expect(guides.length > 0 || Boolean(noCard), `${brand} ${category} ${e.code} (${e.anchorId})`).toBe(true);
      expect(guides.length > 0 && Boolean(noCard), `${brand} ${e.code}: 카드와 카드 없음이 함께 붙음`).toBe(false);
    }
    for (const guide of getHubActionGuides(brand)) {
      const attached = entries.filter(({ category, e }) => getEntryActionGuides(brand, category, e).includes(guide));
      expect(attached, guide.id).toHaveLength(1);
    }
  });

  it.each(HUBS)('%s: 정적 HTML에 카드 제목·적용 범위·멈춤 조건·확인 순서와 「카드 없음」 안내가 있다', async (brand) => {
    const html = renderToStaticMarkup(await BrandErrorCodesPage({ params: Promise.resolve({ brand }) }));
    expect(html).toContain('id="service-record"');
    for (const guide of getHubActionGuides(brand)) {
      const plan = getStaticActionPlan(guide);
      expect(html, guide.id).toContain(`id="${hubActionAnchor(guide)}"`);
      expect(html, guide.id).toContain(esc(plan.title));
      expect(html, guide.id).toContain(esc(guide.models.map((m) => m.model).join(' · ')));
      for (const stop of guide.stopConditions ?? []) expect(html, guide.id).toContain(esc(stop));
      for (const step of plan.steps) expect(html, guide.id).toContain(esc(step));
    }
    for (const item of getHubNoCardCodes(brand)) expect(html, item.code).toContain(esc(item.note ?? NO_CARD_DEFAULT_NOTE));
    // 상담 기록 폼은 펼칠 때만 그린다 — 정적 HTML에는 본문만 나간다
    expect(html).not.toContain('AS에 전달할 내용을 정리하세요');
  });
});
