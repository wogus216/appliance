/**
 * Build a dated, private research library from the published catalog and the
 * Korean Energy Agency's public certification tables.
 *
 * Run: node scripts/collect-appliance-evidence.mjs
 * Requires the repository's installed typescript and jsdom packages.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const ts = require('typescript');
const { JSDOM } = require('jsdom');
const root = process.cwd();
const out = path.join(root, 'research/evidence/2026-09-29');
const catalogDir = path.join(root, 'src/lib/data/appliances');
const checkedAt = '2026-09-29';

function loadLocalTs(file) {
  const source = require('node:fs').readFileSync(file, 'utf8');
  const js = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  const loadedModule = { exports: {} };
  // These trusted local data modules have no runtime imports apart from SITE_AUTHOR.
  const localRequire = (id) => {
    if (id === '@/lib/constants') return { SITE_AUTHOR: '살림랩' };
    throw new Error(`Unexpected runtime import in ${file}: ${id}`);
  };
  new Function('require', 'module', 'exports', js)(localRequire, loadedModule, loadedModule.exports);
  return loadedModule.exports;
}

function clean(value) {
  return value?.replace(/\s+/g, ' ').trim() ?? '';
}

function normalizeModel(value) {
  return value.toUpperCase().replace(/[^A-Z0-9]/g, '');
}

function sourceId(url) {
  return crypto.createHash('sha256').update(url).digest('hex').slice(0, 16);
}

function sourceKind(url, publisher) {
  const host = new URL(url).hostname;
  if (host.endsWith('danawa.com')) return 'seller_secondary';
  if (/samsung|lge\.co|lg\.com|apple\.com|sony\.co|dyson|skmagic|roborock|tcl\.com|mi\.com|coway|cuckoo|winix/i.test(host)) return 'manufacturer_or_support';
  if (/manual/i.test(url)) return 'manufacturer_manual';
  if (/techradar|soundguys|rtings|tomsguide|9to5mac|appleinsider/i.test(host)) return 'independent_review';
  if (/쿠팡|Coupang/i.test(publisher)) return 'seller_secondary';
  return 'other_reference';
}

function writeJsonl(file, rows) {
  return fs.writeFile(path.join(out, file), rows.map((r) => JSON.stringify(r)).join('\n') + '\n');
}

async function fetchRegistry(id, label) {
  const url = `https://eep.energy.or.kr/certification/certi_list_${id}.aspx`;
  const response = await fetch(url, { signal: AbortSignal.timeout(30000) });
  if (!response.ok) throw new Error(`KEA ${id}: HTTP ${response.status}`);
  const html = await response.text();
  const document = new JSDOM(html).window.document;
  const columns = [...document.querySelectorAll('#example thead th')].map((th) => clean(th.textContent));
  const rows = [...document.querySelectorAll('#example tbody tr')].map((tr) => {
    const cells = [...tr.querySelectorAll('td')].map((td) => clean(td.textContent));
    const detail = tr.querySelector('a[href*="certi_view"]');
    return {
      registryCategory: label,
      registryId: id,
      applicationNo: cells[1] || '',
      company: cells[2] || '',
      modelNumber: cells[3] || '',
      declaredCapacity: cells[4] || '',
      declaredEnergy: cells[5] || '',
      energyMetric: columns[5],
      efficiencyGrade: cells[6] || '',
      completedAt: cells.at(-2) || '',
      detailUrl: detail ? new URL(detail.getAttribute('href'), url).href : null,
      listUrl: url,
      retrievedAt: checkedAt,
    };
  }).filter((row) => /^\d+$/.test(row.applicationNo));
  if (rows.length < 10) throw new Error(`KEA ${id}: suspiciously few rows (${rows.length})`);
  await writeJsonl(`registry/kea-${id}.jsonl`, rows);
  return rows;
}

await fs.mkdir(path.join(out, 'registry'), { recursive: true });
const files = (await fs.readdir(catalogDir)).filter((name) => name.endsWith('.ts') && !['index.ts', 'unverified.ts', 'verified-specs.ts'].includes(name));
const all = files.flatMap((name) => Object.values(loadLocalTs(path.join(catalogDir, name))).flatMap((value) => Array.isArray(value) ? value : []));
const unverified = loadLocalTs(path.join(catalogDir, 'unverified.ts')).UNVERIFIED_SLUGS;
const published = all.filter((item) => !unverified.has(item.slug)).sort((a, b) => a.slug.localeCompare(b.slug));
const publishedSlugs = new Set(published.map((item) => item.slug));
if (published.length !== publishedSlugs.size) throw new Error('Duplicate published slug');
const editorial = loadLocalTs(path.join(root, 'src/lib/data/editorial/product-editorial.ts')).PRODUCT_EDITORIAL;
const verified = loadLocalTs(path.join(catalogDir, 'verified-specs.ts'));
const curated = JSON.parse(await fs.readFile(path.join(out, 'curated-sources.json'), 'utf8'));

const models = published.map((item) => ({
  slug: item.slug,
  brand: item.brand,
  name: item.name,
  modelNumber: item.modelNumber,
  category: item.category,
  coreTechnologyClaim: item.techSpecs?.coreTechnology ?? null,
  catalogFile: files.find((name) => Object.values(loadLocalTs(path.join(catalogDir, name))).some((value) => Array.isArray(value) && value.some((row) => row.slug === item.slug))),
  researchStatus: 'source_inventory_only',
}));
await fs.writeFile(path.join(out, 'models.json'), JSON.stringify(models, null, 2) + '\n');

const sources = new Map();
function addSource({ url, title, publisher, kind, modelSlug, origin, checkedAt: priorDate, use, limit, auditStatus }) {
  if (!url?.startsWith('http')) return;
  const key = url.trim();
  const old = sources.get(key) ?? {
    id: sourceId(key), url: key, title: title || null, publisher: publisher || null,
    kind: kind || 'other_reference', modelSlugs: [], origins: [],
    auditStatus: 'catalog_reference_unchecked', priorCheckedAt: null,
    use: null, limit: null,
  };
  if (modelSlug && publishedSlugs.has(modelSlug) && !old.modelSlugs.includes(modelSlug)) old.modelSlugs.push(modelSlug);
  if (origin && !old.origins.includes(origin)) old.origins.push(origin);
  if (priorDate) old.priorCheckedAt = priorDate;
  if (auditStatus) {
    old.auditStatus = auditStatus;
    old.title = title || old.title;
    old.publisher = publisher || old.publisher;
    old.kind = kind || old.kind;
    old.use = use || old.use;
    old.limit = limit || old.limit;
  }
  sources.set(key, old);
}

for (const [slug, record] of Object.entries(editorial)) {
  for (const source of record.sources ?? []) addSource({ ...source, modelSlug: slug, origin: 'product-editorial.ts', kind: sourceKind(source.url, source.publisher) });
}
for (const [slug, record] of Object.entries(verified.VERIFIED_SPECS)) addSource({ url: record.source, modelSlug: slug, origin: 'verified-specs.ts:VERIFIED_SPECS', kind: sourceKind(record.source, '') });
for (const [slug, record] of Object.entries(verified.VERIFIED_PRODUCT_PAGES)) addSource({ url: record.source, modelSlug: slug, origin: 'verified-specs.ts:VERIFIED_PRODUCT_PAGES', checkedAt: record.checkedAt, kind: sourceKind(record.source, '') });
for (const [slug, record] of Object.entries(verified.VERIFIED_PRICES)) addSource({ url: record.source, modelSlug: slug, origin: 'verified-specs.ts:VERIFIED_PRICES', checkedAt: record.checkedAt, kind: sourceKind(record.source, '') });
for (const item of curated) {
  for (const slug of item.modelSlugs ?? [null]) addSource({ ...item, modelSlug: slug, origin: 'curated-sources.json', auditStatus: 'reviewed_2026-09-29' });
}

const registrySpecs = [
  [269, '의류건조기 (기존 기준)'],
  [292, '식기세척기'],
  [298, '전기세탁기 일반'],
  [299, '전기세탁기 드럼'],
];
const registry = (await Promise.all(registrySpecs.map(([id, label]) => fetchRegistry(id, label)))).flat();
const additionalRows = (await fs.readFile(path.join(out, 'additional-registry-exact.jsonl'), 'utf8')).trim().split('\n').filter(Boolean).map(JSON.parse);
const additionalSearch = JSON.parse(await fs.readFile(path.join(out, 'additional-registry-search.json'), 'utf8'));
const independentTests = (await fs.readFile(path.join(out, 'independent-tests.jsonl'), 'utf8')).trim().split('\n').filter(Boolean).map(JSON.parse);
const eprelExamples = (await fs.readFile(path.join(out, 'foreign/eprel-dishwasher-examples.jsonl'), 'utf8')).trim().split('\n').filter(Boolean).map(JSON.parse);
const energyResearch = (await fs.readFile(path.join(out, 'energy-research.jsonl'), 'utf8')).trim().split('\n').filter(Boolean).map(JSON.parse);
const componentMap = (await fs.readFile(path.join(out, 'component-map.jsonl'), 'utf8')).trim().split('\n').filter(Boolean).map(JSON.parse);
const applicableIds = {
  '건조기': [269], '식기세척기': [292], '세탁기': [298, 299],
};
const exactRows = [];
const gaps = [];
for (const model of models) {
  const possible = applicableIds[model.category] ?? [];
  const candidates = model.modelNumber.split(/\s+\/\s+/).map(normalizeModel);
  const matches = registry.filter((row) => possible.includes(row.registryId) && candidates.includes(normalizeModel(row.modelNumber)));
  const extra = additionalRows.filter((row) => row.slug === model.slug && candidates.includes(normalizeModel(row.registryModelNumber)));
  if (matches.length) {
    for (const row of matches) {
      exactRows.push({ slug: model.slug, modelNumber: model.modelNumber, sourceId: sourceId(row.detailUrl), ...row, matchType: 'exact_normalized_model_number', performanceScope: 'efficiency_declaration_only', dryingOutcomeMeasured: false });
      addSource({ url: row.detailUrl, title: `${row.modelNumber} 한국에너지공단 효율 신고 상세`, publisher: '한국에너지공단', kind: 'certified_model_measurement', modelSlug: model.slug, origin: `kea-${row.registryId}.jsonl`, auditStatus: 'reviewed_2026-09-29', use: row.energyMetric, limit: '신고 기준값이며 실제 사용량이나 건조 완료 품질이 아님' });
    }
  }
  for (const row of extra) {
    exactRows.push({ ...row, sourceId: sourceId(row.detailUrl), performanceScope: 'efficiency_declaration_only', dryingOutcomeMeasured: false });
    addSource({ url: row.detailUrl, title: `${row.registryModelNumber} 한국에너지공단 효율 신고 상세`, publisher: '한국에너지공단', kind: 'certified_model_measurement', modelSlug: model.slug, origin: 'additional-registry-exact.jsonl', auditStatus: 'reviewed_2026-09-29', use: '해당 신고표의 모델별 효율·용량·등급 값', limit: '신고 당시 기준값이다. 동일 모델번호의 등록도 업체·완료일에 따라 값이 달라질 수 있음' });
  }
  if (!matches.length && !extra.length) {
    const searched = [...possible, ...additionalSearch.filter((row) => row.siteCategories.includes(model.category) && row.status === 'complete').map((row) => row.registryId)];
    gaps.push({ slug: model.slug, modelNumber: model.modelNumber, category: model.category, registrySearched: searched, exactRegistryMatch: false, reason: searched.length ? '검색한 한국에너지공단 공개 표의 정확한 모델번호 일치 항목 없음' : '이번 수집의 에너지공단 대상 품목 밖', sameConditionEnergy: null, sameConditionDryingOutcome: null });
  }
}

const sourceRows = [...sources.values()].map((row) => ({ ...row, modelSlugs: row.modelSlugs.sort(), origins: row.origins.sort() })).sort((a, b) => a.url.localeCompare(b.url));
await writeJsonl('sources.jsonl', sourceRows);
await writeJsonl('exact-model-measurements.jsonl', exactRows);
await writeJsonl('measurement-gaps.jsonl', gaps);
const coverage = models.map((model) => {
  const linked = sourceRows.filter((row) => row.modelSlugs.includes(model.slug));
  return {
    slug: model.slug,
    modelNumber: model.modelNumber,
    category: model.category,
    linkedSources: linked.length,
    manufacturerSourceCandidates: linked.filter((row) => ['manufacturer_or_support', 'manufacturer_spec', 'manufacturer_manual', 'manufacturer_component_spec', 'manufacturer_exact_model_consumable', 'manufacturer_exact_model_component_compatibility'].includes(row.kind)).length,
    reviewedManuals: linked.filter((row) => row.kind === 'manufacturer_manual' && row.auditStatus === 'reviewed_2026-09-29').length,
    exactKeaMeasurement: exactRows.some((row) => row.slug === model.slug),
    independentSameConditionDryingOutcome: false,
    relatedVariantIndependentSameConditionDryingOutcome: independentTests.some((row) => row.relatedCatalogSlug === model.slug && row.catalogRelation.startsWith('related_certification_variant')),
  };
});
await fs.writeFile(path.join(out, 'model-coverage.json'), JSON.stringify(coverage, null, 2) + '\n');
const facts = (await fs.readFile(path.join(out, 'verified-facts.jsonl'), 'utf8')).trim().split('\n').map(JSON.parse);
for (const fact of facts) {
  if (!publishedSlugs.has(fact.slug) || !sources.has(fact.sourceUrl)) throw new Error(`Fact has unknown model or source: ${JSON.stringify(fact)}`);
}
const rawManifest = JSON.parse(await fs.readFile(path.join(out, 'raw-manifest.json'), 'utf8'));
const modelComponentEvidence = JSON.parse(await fs.readFile(path.join(out, 'model-component-evidence.json'), 'utf8'));
const partLevelEvidence = (await fs.readFile(path.join(out, 'part-level-evidence.jsonl'), 'utf8')).trim().split('\n').map(JSON.parse);
const foreignSummary = JSON.parse(await fs.readFile(path.join(out, 'foreign/energy-star-summary.json'), 'utf8'));
for (const entry of rawManifest) {
  const data = await fs.readFile(path.join(out, entry.localFile));
  if (crypto.createHash('sha256').update(data).digest('hex') !== entry.sha256) throw new Error(`Raw file changed: ${entry.localFile}`);
}
const summary = {
  retrievedAt: checkedAt,
  publishedModels: models.length,
  sourceLinks: sourceRows.length,
  newlyReviewedSources: sourceRows.filter((row) => row.auditStatus === 'reviewed_2026-09-29').length,
  modelLinkedSourceLinks: sourceRows.filter((row) => row.modelSlugs.length).length,
  registryRows: Object.fromEntries(registrySpecs.map(([id]) => [id, registry.filter((row) => row.registryId === id).length])),
  additionalRegistryRowsSearched: Object.fromEntries(additionalSearch.map((row) => [row.registryId, row.searchedRows])),
  exactModelRegistryRows: exactRows.length,
  exactModelRegistryModels: [...new Set(exactRows.map((row) => row.slug))].length,
  modelsWithoutExactRegistryRow: gaps.length,
  independentSameConditionTestedModels: independentTests.length,
  exactCatalogIndependentSameConditionDryingOutcomeRows: independentTests.filter((row) => row.catalogRelation === 'exact_catalog_model').length,
  relatedVariantIndependentSameConditionDryingOutcomeRows: independentTests.filter((row) => row.catalogRelation.startsWith('related_certification_variant')).length,
  foreignEprelExampleModels: eprelExamples.length,
  energyResearchSources: energyResearch.length,
  componentArchitectureEvidenceRows: componentMap.length,
  modelLinkedComponentEvidenceModels: modelComponentEvidence.length,
  partLevelEvidenceRows: partLevelEvidence.length,
  modelsWithPartLevelEvidence: [...new Set(partLevelEvidence.map((row) => row.catalogSlug))].length,
  observedChipPartNumberRows: partLevelEvidence.filter((row) => row.partType.endsWith('_ic') && row.evidenceLevel === 'observed_in_exact_product_teardown').length,
  namedProcessorOrChipModels: modelComponentEvidence.filter((row) => row.namedSemiconductor).length,
  verifiedInternalChipPartNumberModels: modelComponentEvidence.filter((row) => row.verifiedInternalChipPartNumber).length,
  verifiedMajorAssemblyPartNumberModels: modelComponentEvidence.filter((row) => row.verifiedMajorAssemblyPartNumber).length,
  foreignEnergyStarRows: Object.fromEntries(foreignSummary.map((row) => [row.category, row.rows])),
  foreignEnergyStarExactCatalogMatches: foreignSummary.reduce((sum, row) => sum + row.exactNormalizedCatalogMatches.length, 0),
  reviewedModelManualLinks: sourceRows.filter((row) => row.kind === 'manufacturer_manual' && row.auditStatus === 'reviewed_2026-09-29' && row.modelSlugs.length).length,
  localManualPdfs: rawManifest.filter((row) => !row.documentType).length,
  localManufacturerCatalogPdfs: rawManifest.filter((row) => row.documentType === 'manufacturer_catalog').length,
  localIndependentTestPdfs: rawManifest.filter((row) => row.documentType === 'independent_test_report').length,
  localForeignProductInformationSheets: rawManifest.filter((row) => row.documentType === 'foreign_product_information_sheet').length,
  extractedVerifiedFacts: facts.length,
};
await fs.writeFile(path.join(out, 'summary.json'), JSON.stringify(summary, null, 2) + '\n');
console.log(JSON.stringify(summary, null, 2));
