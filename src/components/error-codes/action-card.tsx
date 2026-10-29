'use client';

import { useCallback, useState, type FormEvent } from 'react';
import { SITE_URL } from '@/lib/constants';
import {
  buildErrorActionSummary,
  getErrorActionAdvice,
  matchActionModel,
  type ErrorActionGuide,
  type ErrorActionInput,
} from '@/lib/error-action';

const FIELD_CLASS = 'mt-2 min-h-11 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-base text-gray-900 placeholder:text-gray-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700';
const BUTTON_CLASS = 'inline-flex min-h-11 items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700';

export function ErrorActionCard({ guide }: { guide: ErrorActionGuide }) {
  const fieldId = (field: string) => `${guide.anchor ?? 'action'}-${field}`;
  const [input, setInput] = useState<ErrorActionInput>({
    model: '', safety: '', outcome: 'not-tried', observation: '', timing: '', tried: '', temperature: 'unknown',
  });
  const [showSummary, setShowSummary] = useState(false);
  const [copyState, setCopyState] = useState<'idle' | 'copying' | 'copied' | 'failed'>('idle');
  const focusResult = useCallback((node: HTMLDivElement | null) => node?.focus(), []);
  const model = matchActionModel(guide, input.model);
  const advice = getErrorActionAdvice(guide, input);
  const summary = buildErrorActionSummary(guide, input, SITE_URL);

  function update<K extends keyof ErrorActionInput>(key: K, value: ErrorActionInput[K]) {
    setInput((current) => ({ ...current, [key]: value }));
    setShowSummary(false);
    setCopyState('idle');
  }

  function generate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setShowSummary(true);
    setCopyState('idle');
  }

  async function copySummary() {
    setCopyState('copying');
    try {
      await navigator.clipboard.writeText(summary);
      setCopyState('copied');
    } catch {
      setCopyState('failed');
    }
  }

  function downloadSummary() {
    const blob = new Blob([summary], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `salimlab-${guide.id}-상담기록.txt`;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  return (
    <section id={guide.anchor ?? 'action-card'} aria-labelledby={fieldId('card-heading')} className="scroll-mt-24 rounded-xl border border-gray-300 bg-white p-5 sm:p-7">
      <h2 id={fieldId('card-heading')} className="text-xl font-bold text-gray-900">AS에 전달할 내용을 정리하세요</h2>
      <p className="mt-2 max-w-prose text-sm leading-relaxed text-gray-700">
        모델명과 표시 상황을 적으면 다음 행동과 상담 준비 기록을 함께 만들 수 있습니다.
        작성 내용은 서버에 저장하지 않습니다.
      </p>

      <form onSubmit={generate} className="mt-6 space-y-6">
        <div>
          <label htmlFor={fieldId('model')} className="block text-sm font-semibold text-gray-900">명판의 모델명 전체</label>
          <input id={fieldId('model')} type="text" value={input.model} maxLength={100} autoComplete="off" spellCheck={false}
            aria-describedby={`${fieldId('model-help')} ${fieldId('model-status')}`} className={FIELD_CLASS}
            placeholder={`예: ${guide.models[0].model}`} onChange={(event) => update('model', event.target.value)} />
          <p id={fieldId('model-help')} className="mt-2 text-sm leading-relaxed text-gray-600">
            확인 가능한 모델: {guide.models.map((entry) => entry.model).join(' · ')}.
            설명서 표지나 안전하게 볼 수 있는 제품 명판을 확인하세요. 모델을 찾으려고 본체를 움직이거나 분해할 필요는 없습니다.
          </p>
          <p id={fieldId('model-status')} role="status" className="mt-2 text-sm font-medium text-gray-900">
            {model ? `${model.model} — 이 안내의 설명서 적용 모델과 일치합니다.`
              : input.model.trim() ? '이 모델의 설명서 적용은 미확인입니다. 기록은 만들 수 있지만 모델별 조치는 제공하지 않습니다.'
                : '모델명을 모르면 빈칸으로 두고 상담 준비 기록만 만들 수 있습니다.'}
          </p>
        </div>

        <fieldset>
          <legend className="text-sm font-semibold text-gray-900">타는 냄새·연기·젖은 전원 부근이 있나요?</legend>
          <p id={fieldId('safety-help')} className="mt-2 text-sm text-gray-600">안전한 위치에서 확인한 상태를 골라 주세요.</p>
          <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1">
            {([
              ['clear', '없음'], ['concern', '있음'], ['unknown', '확인 못함'],
            ] as const).map(([value, label]) => (
              <label key={value} className="flex min-h-11 cursor-pointer items-center gap-2 text-sm text-gray-900">
                <input type="radio" name={fieldId('safety')} value={value} checked={input.safety === value}
                  aria-describedby={fieldId('safety-help')} onChange={() => update('safety', value)}
                  className="size-4 accent-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700" />
                {label}
              </label>
            ))}
          </div>
          {input.safety === 'concern' && (
            <p role="alert" className="mt-2 text-sm font-semibold leading-relaxed text-red-800">
              재시작을 멈추세요. 젖은 전원 부근에 접근하지 말고 공식 서비스에 점검을 요청하세요.
            </p>
          )}
        </fieldset>

        {guide.action.type === 'cold-weather' && (
          <div>
            <label htmlFor={fieldId('temperature')} className="block text-sm font-semibold text-gray-900">표시가 나왔을 때의 외기 온도</label>
            <select id={fieldId('temperature')} value={input.temperature} className={FIELD_CLASS}
              onChange={(event) => update('temperature', event.target.value as ErrorActionInput['temperature'])}>
              <option value="unknown">확인 못함</option>
              <option value="below-zero">0℃ 미만</option>
              <option value="at-least-zero">0℃ 이상</option>
            </select>
          </div>
        )}

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor={fieldId('timing')} className="block text-sm font-semibold text-gray-900">표시가 나온 시점 <span className="font-normal text-gray-600">(선택)</span></label>
            <input id={fieldId('timing')} type="text" value={input.timing} maxLength={200} autoComplete="off"
              placeholder="예: 오늘 저녁, 작동을 시작한 직후" className={FIELD_CLASS}
              onChange={(event) => update('timing', event.target.value)} />
          </div>
          <div>
            <label htmlFor={fieldId('outcome')} className="block text-sm font-semibold text-gray-900">조치 후 표시 상태</label>
            <select id={fieldId('outcome')} value={input.outcome} className={FIELD_CLASS}
              onChange={(event) => update('outcome', event.target.value as ErrorActionInput['outcome'])}>
              <option value="not-tried">아직 조치 전</option>
              <option value="repeated">조치 후에도 같은 표시</option>
              <option value="cleared">현재 표시는 사라짐</option>
            </select>
          </div>
        </div>
        <div>
          <label htmlFor={fieldId('observation')} className="block text-sm font-semibold text-gray-900">증상과 주변 상태 <span className="font-normal text-gray-600">(선택)</span></label>
          <textarea id={fieldId('observation')} value={input.observation} maxLength={1000} rows={3}
            aria-describedby={fieldId('observation-help')} className={FIELD_CLASS}
            onChange={(event) => update('observation', event.target.value)} />
          <p id={fieldId('observation-help')} className="mt-2 text-sm leading-relaxed text-gray-600">{guide.observationHint}</p>
        </div>
        <div>
          <label htmlFor={fieldId('tried')} className="block text-sm font-semibold text-gray-900">이미 해본 조치 <span className="font-normal text-gray-600">(선택)</span></label>
          <textarea id={fieldId('tried')} value={input.tried} maxLength={1000} rows={2} className={FIELD_CLASS}
            placeholder="실제로 해본 것만 적어 주세요. 이름·주소·연락처는 적지 않아도 됩니다."
            onChange={(event) => update('tried', event.target.value)} />
        </div>
        <button type="submit" className={`${BUTTON_CLASS} bg-blue-700 text-white hover:bg-blue-800`}>다음 행동과 상담 기록 만들기</button>
      </form>

      {showSummary && (
        <div ref={focusResult} tabIndex={-1} aria-labelledby={fieldId('result-heading')}
          className="mt-8 border-t border-gray-300 pt-6 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-700">
          <h3 id={fieldId('result-heading')} className={`text-lg font-bold ${advice.kind === 'stop' ? 'text-red-800' : 'text-gray-900'}`}>{advice.title}</h3>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-gray-800">
            {advice.steps.map((step) => <li key={step}>{step}</li>)}
          </ul>
          <p className="mt-4 text-sm">
            <a href={guide.serviceUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-700 underline underline-offset-4">{guide.brand} 공식 서비스 안내 열기</a>
          </p>
          <label htmlFor={fieldId('summary')} className="mt-6 block text-sm font-semibold text-gray-900">상담 준비 기록</label>
          <textarea id={fieldId('summary')} readOnly value={summary} rows={12} className={`${FIELD_CLASS} text-sm leading-relaxed`} />
          <div className="mt-3 flex flex-wrap gap-3">
            <button type="button" onClick={copySummary} disabled={copyState === 'copying'}
              className={`${BUTTON_CLASS} bg-blue-700 text-white hover:bg-blue-800 disabled:cursor-wait disabled:opacity-60`}>
              {copyState === 'copying' ? '복사 중…' : '상담 기록 복사'}
            </button>
            <button type="button" onClick={downloadSummary} className={`${BUTTON_CLASS} border border-gray-300 text-gray-900 hover:bg-gray-50`}>텍스트 파일로 저장</button>
          </div>
          <p role="status" className="mt-3 text-sm leading-relaxed text-gray-700">
            {copyState === 'copied' ? '상담 기록을 복사했습니다. 서비스 문의에 붙여 넣으세요.'
              : copyState === 'failed' ? '클립보드에 복사하지 못했습니다. 위 기록을 직접 선택해 복사하거나 텍스트 파일로 저장하세요.'
                : '복사·저장한 기록에는 안내 버전과 최신 안내 주소가 함께 들어갑니다.'}
          </p>
          <p className="mt-3 text-xs leading-relaxed text-gray-600">
            안내 버전 {guide.version}{model && <> · 설명서 대조 {model.checkedAt} · <a href={model.manualUrl} target="_blank" rel="noopener noreferrer" className="text-blue-700 underline underline-offset-4">{model.manualLabel}</a></>}
          </p>
        </div>
      )}
    </section>
  );
}
