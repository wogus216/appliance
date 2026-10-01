import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { resolve, dirname } from 'node:path';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dir = resolve(root, 'research/evidence/2026-09-29');
const models = JSON.parse(readFileSync(resolve(dir, 'models.json'), 'utf8'));
const evidence = JSON.parse(readFileSync(resolve(dir, 'model-component-evidence.json'), 'utf8'));
const parts = readFileSync(resolve(dir, 'part-level-evidence.jsonl'), 'utf8').trim().split('\n').map(JSON.parse);
const bySlug = new Map();

for (const item of evidence) {
  if (bySlug.has(item.catalogSlug)) throw new Error(`Duplicate evidence: ${item.catalogSlug}`);
  bySlug.set(item.catalogSlug, item);
}
for (const part of parts) {
  const model = models.find((item) => item.slug === part.catalogSlug);
  if (!model || model.modelNumber !== part.modelNumber) {
    throw new Error(`Part evidence model mismatch: ${part.catalogSlug}: ${part.modelNumber}`);
  }
}

const coverage = models.map((model) => {
  const item = bySlug.get(model.slug);
  if (item && item.modelNumber !== model.modelNumber) {
    throw new Error(`Model mismatch: ${model.slug}: ${item.modelNumber} != ${model.modelNumber}`);
  }
  return {
    catalogSlug: model.slug,
    modelNumber: model.modelNumber,
    category: model.category,
    componentEvidence: item?.identity ?? 'none_reviewed',
    namedProcessorOrChip: Boolean(item?.namedSemiconductor),
    internalChipPartNumberVerified: Boolean(item?.verifiedInternalChipPartNumber),
    majorAssemblyPartNumberVerified: Boolean(item?.verifiedMajorAssemblyPartNumber),
    sourceUrl: item?.sourceUrl ?? null,
    partEvidenceRows: parts.filter((part) => part.catalogSlug === model.slug).length,
    catalogConflict: item?.catalogConflict ?? null,
    nextEvidence: item?.unverified ?? '정확한 모델의 제조사 부품표·서비스 문서·분해 자료 확보 필요'
  };
});

for (const slug of bySlug.keys()) {
  if (!models.some((model) => model.slug === slug)) throw new Error(`Unknown catalog slug: ${slug}`);
}

const output = {
  auditedAt: '2026-09-29',
  counts: {
    catalogModels: models.length,
    modelLinkedComponentEvidence: evidence.length,
    withoutModelLinkedComponentEvidence: models.length - evidence.length,
    namedProcessorOrChip: coverage.filter((item) => item.namedProcessorOrChip).length,
    internalChipPartNumberVerified: coverage.filter((item) => item.internalChipPartNumberVerified).length,
    majorAssemblyPartNumberVerified: coverage.filter((item) => item.majorAssemblyPartNumberVerified).length,
    catalogConflictOrUnverifiedClaim: coverage.filter((item) => item.catalogConflict).length,
    partEvidenceRows: parts.length,
    modelsWithPartEvidence: coverage.filter((item) => item.partEvidenceRows).length,
    observedChipPartNumberRows: parts.filter((item) => item.partType.endsWith('_ic') && item.evidenceLevel === 'observed_in_exact_product_teardown').length
  },
  models: coverage
};

writeFileSync(resolve(dir, 'component-coverage.json'), `${JSON.stringify(output, null, 2)}\n`);
console.log(JSON.stringify(output.counts));
