import { normalizeActionModel, type ErrorActionModel } from '@/lib/error-action';

export type LookupModel = Pick<ErrorActionModel, 'model' | 'manualUrl' | 'manualLabel' | 'checkedAt'> & {
  href: string;
};

export type LookupEntry = {
  category: string;
  code: string;
  href: string;
  models: LookupModel[];
};

export type LookupBrand = {
  brand: string;
  label: string;
  entries: LookupEntry[];
  serviceUrl?: string;
};

const normalizeCode = (code: string) => code.toUpperCase().replace(/\s+/g, '');

export function lookupErrorCode(entries: LookupEntry[], code: string, model: string) {
  const queryCode = normalizeCode(code);
  const queryModel = normalizeActionModel(model);
  const codeMatches = queryCode ? entries.filter((entry) => (
    normalizeCode(entry.code) === queryCode ||
    entry.code.split('/').some((part) => normalizeCode(part) === queryCode)
  )) : [];
  const modelMatches = queryModel ? codeMatches.flatMap((entry) => (
    entry.models
      .filter((source) => normalizeActionModel(source.model) === queryModel)
      .map((source) => ({ entry, source }))
  )) : [];

  return { codeMatches, modelMatches };
}
