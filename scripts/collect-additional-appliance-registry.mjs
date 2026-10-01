/** Search further Korean Energy Agency categories against the published model list.
 * Run from repository root: node scripts/collect-additional-appliance-registry.mjs
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { JSDOM } = require('jsdom');
const out = path.join(process.cwd(), 'research/evidence/2026-09-29');
const models = JSON.parse(await fs.readFile(path.join(out, 'models.json'), 'utf8'));
const retrievedAt = '2026-09-29';
const categories = [
  { id: 252, name: '전기냉장고', siteCategories: ['냉장고'] },
  { id: 260, name: '전기냉방기', siteCategories: ['에어컨'] },
  { id: 121, name: '공기청정기', siteCategories: ['공기청정기'] },
  { id: 145, name: '제습기', siteCategories: ['제습기'] },
  { id: 143, name: '텔레비전수상기', siteCategories: ['TV'] },
  { id: 140, name: '전기냉온수기', siteCategories: ['정수기'] },
  { id: 159, name: '전기냉온수기(순간식)', siteCategories: ['정수기'] },
  { id: 119, name: '선풍기', siteCategories: ['선풍기'] },
  { id: 115, name: '전기진공청소기', siteCategories: ['로봇청소기'] },
];
const norm = (value) => value.toUpperCase().replace(/[^A-Z0-9]/g, '');
const clean = (value) => value?.replace(/\s+/g, ' ').trim() ?? '';

async function collect(category) {
  const url = `https://eep.energy.or.kr/certification/certi_list_${category.id}.aspx`;
  const response = await fetch(url, { signal: AbortSignal.timeout(90000) });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const html = await response.text();
  const document = new JSDOM(html).window.document;
  const headers = [...document.querySelectorAll('#example thead th')].map((cell) => clean(cell.textContent));
  const modelIndex = headers.findIndex((header) => header.includes('모델명'));
  const applicationIndex = headers.findIndex((header) => header.includes('신청번호'));
  if (modelIndex < 0 || applicationIndex < 0) throw new Error(`Unknown table columns: ${headers.join('|')}`);
  const relevant = models.filter((model) => category.siteCategories.includes(model.category));
  const matches = [];
  let searchedRows = 0;
  for (const tr of document.querySelectorAll('#example tbody tr')) {
    const cells = [...tr.querySelectorAll('td')].map((cell) => clean(cell.textContent));
    const applicationNo = cells[applicationIndex];
    if (!/^\d+$/.test(applicationNo)) continue;
    searchedRows += 1;
    const registryModel = cells[modelIndex];
    const exact = relevant.filter((model) => model.modelNumber.split(/\s+\/\s+/).some((number) => norm(number) === norm(registryModel)));
    if (!exact.length) continue;
    const detailLink = tr.querySelector('a[href*="certi_view"]');
    for (const model of exact) matches.push({
      slug: model.slug, catalogModelNumber: model.modelNumber,
      registryModelNumber: registryModel, registryCategory: category.name,
      registryId: category.id, applicationNo,
      fields: Object.fromEntries(headers.map((header, i) => [header || `column_${i}`, cells[i] ?? ''])),
      detailUrl: detailLink ? new URL(detailLink.getAttribute('href'), url).href : null,
      listUrl: url, retrievedAt, matchType: 'exact_normalized_model_number',
    });
  }
  return { category, searchedRows, matches, status: 'complete' };
}

const results = [];
for (let i = 0; i < categories.length; i += 3) {
  const batch = await Promise.allSettled(categories.slice(i, i + 3).map(collect));
  for (let j = 0; j < batch.length; j++) {
    const result = batch[j];
    if (result.status === 'fulfilled') {
      results.push(result.value);
      console.log(`${result.value.category.id}: ${result.value.searchedRows} rows, ${result.value.matches.length} exact matches`);
    } else {
      const category = categories[i + j];
      results.push({ category, searchedRows: null, matches: [], status: 'fetch_error', error: String(result.reason) });
      console.error(`${category.id}: ${result.reason}`);
    }
  }
}

const exact = results.flatMap((result) => result.matches);
await fs.writeFile(path.join(out, 'additional-registry-exact.jsonl'), exact.map((row) => JSON.stringify(row)).join('\n') + (exact.length ? '\n' : ''));
await fs.writeFile(path.join(out, 'additional-registry-search.json'), JSON.stringify(results.map(({ category, searchedRows, matches, status, error }) => ({ registryId: category.id, registryCategory: category.name, siteCategories: category.siteCategories, listUrl: `https://eep.energy.or.kr/certification/certi_list_${category.id}.aspx`, searchedRows, exactMatches: matches.length, status, error: error ?? null, retrievedAt })), null, 2) + '\n');
console.log(`Additional exact matches: ${exact.length}`);
