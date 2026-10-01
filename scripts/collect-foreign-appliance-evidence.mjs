/** Snapshot official U.S. ENERGY STAR public model tables for research only.
 * Run from repository root: node scripts/collect-foreign-appliance-evidence.mjs
 */
import fs from 'node:fs/promises';
import path from 'node:path';

const out = path.join(process.cwd(), 'research/evidence/2026-09-29');
const foreign = path.join(out, 'foreign');
const models = JSON.parse(await fs.readFile(path.join(out, 'models.json'), 'utf8'));
const normalized = (value) => String(value ?? '').toUpperCase().replace(/[^A-Z0-9]/g, '');
const catalog = new Map(models.flatMap((model) => model.modelNumber.split(/\s+\/\s+/).map((number) => [normalized(number), model])));
const datasets = [
  { name: 'us-epa-energy-star-dishwashers', id: 'q8py-6w3f', category: 'dishwasher' },
  { name: 'us-epa-energy-star-dryers', id: 't9u7-4d2j', category: 'dryer' },
  { name: 'us-epa-energy-star-washers', id: 'bghd-e2wd', category: 'washer' },
];

await fs.mkdir(foreign, { recursive: true });
const results = [];
for (const dataset of datasets) {
  const sourceUrl = `https://data.energystar.gov/resource/${dataset.id}.json`;
  const response = await fetch(`${sourceUrl}?$limit=50000`, { signal: AbortSignal.timeout(60000) });
  if (!response.ok) throw new Error(`${dataset.id}: HTTP ${response.status}`);
  const rows = await response.json();
  if (!Array.isArray(rows) || rows.length === 0 || rows.length >= 50000) throw new Error(`${dataset.id}: incomplete or unexpected response`);
  await fs.writeFile(path.join(foreign, `${dataset.name}.jsonl`), rows.map((row) => JSON.stringify(row)).join('\n') + '\n');
  const matches = rows.flatMap((row) => {
    const model = catalog.get(normalized(row.model_number));
    return model ? [{ catalogSlug: model.slug, catalogModelNumber: model.modelNumber, foreignModelNumber: row.model_number, rowId: row.pd_id ?? null }] : [];
  });
  results.push({ ...dataset, sourceUrl, datasetPage: `https://data.energystar.gov/d/${dataset.id}`, retrievedAt: '2026-09-29', rows: rows.length, exactNormalizedCatalogMatches: matches, scope: 'U.S. certified model records; ratings and test conditions are not interchangeable with Korean registrations' });
  console.log(`${dataset.id}: ${rows.length} rows, ${matches.length} catalog model matches`);
}
await fs.writeFile(path.join(foreign, 'energy-star-summary.json'), JSON.stringify(results, null, 2) + '\n');
