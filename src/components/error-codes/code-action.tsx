import Link from 'next/link';
import { getStaticActionPlan, type ErrorActionGuide, type ErrorActionModel } from '@/lib/error-action';
import { hubActionAnchor, NO_CARD_DEFAULT_NOTE, type NoCardCode } from '@/lib/data/error-codes/action-guides';
import { ActionRecordDisclosure } from './action-record-disclosure';

const TYPE_LABEL: Record<ErrorActionGuide['action']['type'], string> = {
  contact: '서비스 연락',
  check: '직접 확인',
  'cold-weather': '외기 온도 확인',
};

/** 같은 설명서를 공유하는 모델은 근거를 한 번만 적는다 */
function uniqueSources(models: ErrorActionModel[]) {
  const seen = new Map<string, ErrorActionModel>();
  for (const model of models) {
    const key = `${model.manualUrl}|${model.manualLabel}`;
    if (!seen.has(key)) seen.set(key, model);
  }
  return [...seen.values()];
}

/**
 * 상담 기록 폼에 넘기는 값. 폼이 쓰지 않는 멈춤 조건·근거 표시·허브 범위는 빼서 클라이언트 페이로드를 줄인다
 * (멈춤 조건은 이 블록이 정적 HTML로 이미 싣는다).
 */
function toRecordGuide(guide: ErrorActionGuide): ErrorActionGuide {
  return {
    id: guide.id,
    brand: guide.brand,
    category: guide.category,
    code: guide.code,
    href: guide.href,
    version: guide.version,
    models: guide.models,
    modelKind: guide.modelKind,
    serviceUrl: guide.serviceUrl,
    observationHint: guide.observationHint,
    anchor: guide.anchor,
    action: guide.action,
  };
}

/**
 * 허브 코드 카드 안의 행동 카드.
 *
 * 2026-10-29: 코드를 찾은 자리에서 다음 행동·사용 중지 조건·적용 범위를 바로 보게 했다. 이 블록은
 * 서버에서 정적 HTML로 나가며(크롤러가 읽는 본문), 상담 기록 폼은 펼칠 때만 그린다.
 * 상세 안내 페이지가 있는 카드(쿠쿠 E4·하이얼 F25)는 폼을 그 페이지에 두고 여기서는 링크만 건다.
 */
export function CodeActionGuide({ guide }: { guide: ErrorActionGuide }) {
  const anchor = hubActionAnchor(guide);
  const plan = getStaticActionPlan(guide);
  const unit = guide.modelKind === 'product-line' ? '제품군' : '모델';
  const sources = uniqueSources(guide.models);
  const faqs = [...new Set(guide.models.flatMap((m) => (m.faqUrl ? [m.faqUrl] : [])))];

  return (
    <section id={anchor} aria-labelledby={`${anchor}-title`} className="mt-4 scroll-mt-24 rounded-lg border border-gray-200 bg-white p-4 text-gray-900">
      <p className="text-xs font-semibold text-gray-600">다음 행동 · {TYPE_LABEL[guide.action.type]}</p>
      <h4 id={`${anchor}-title`} className="mt-1 text-base font-bold leading-snug">{plan.title}</h4>
      <p className="mt-2 break-words text-sm leading-relaxed text-gray-700">
        <span className="font-semibold text-gray-900">적용 {unit}:</span> {guide.models.map((m) => m.model).join(' · ')}
      </p>

      {guide.stopConditions && guide.stopConditions.length > 0 && (
        <div className="mt-3 rounded-md border border-red-200 bg-red-50 p-3">
          <p className="text-sm font-semibold text-red-900">이럴 때는 멈추고 서비스에 연락</p>
          <ul className="mt-1 list-disc space-y-1 pl-5 text-sm leading-relaxed text-red-900">
            {guide.stopConditions.map((stop) => <li key={stop}>{stop}</li>)}
          </ul>
        </div>
      )}

      <p className="mt-3 text-sm font-semibold">{guide.action.type === 'contact' ? '할 일' : '확인 순서'}</p>
      <ol className="mt-1 list-decimal space-y-1 pl-5 text-sm leading-relaxed text-gray-800">
        {plan.steps.map((step) => <li key={step}>{step}</li>)}
      </ol>

      <div className="mt-3 break-words text-xs leading-relaxed text-gray-600">
        <p>근거(대조 {guide.models[0].checkedAt}):</p>
        <ul className="mt-1 space-y-0.5">
          {sources.map((source) => (
            <li key={source.manualUrl + source.manualLabel}>
              <a href={source.manualUrl} target="_blank" rel="noopener noreferrer" className="text-blue-700 underline underline-offset-2">{source.manualLabel}</a>
            </li>
          ))}
          {faqs.map((faq) => (
            <li key={faq}><a href={faq} target="_blank" rel="noopener noreferrer" className="text-blue-700 underline underline-offset-2">제조사 서비스 FAQ 원문</a></li>
          ))}
          <li><a href={guide.serviceUrl} target="_blank" rel="noopener noreferrer" className="text-blue-700 underline underline-offset-2">{guide.brand} 공식 서비스 안내</a></li>
        </ul>
      </div>

      {guide.anchor ? (
        <ActionRecordDisclosure guide={toRecordGuide(guide)} />
      ) : (
        <Link href={`${guide.href}#action-card`} className="mt-4 inline-block text-sm font-semibold text-blue-700 underline underline-offset-4">
          상담 기록은 상세 안내에서 만들기 →
        </Link>
      )}
    </section>
  );
}

/**
 * 카드 없이 짧은 안내만 붙는 코드. 공식 자료에서 사용자 조치를 확인하지 못했거나, 모델을 적지 않은 공용 안내에만
 * 조치가 있는 코드(sharedGuide — 안내가 해결 문단의 출처 범위를 밝힌다). 내부 판정 사유 대신 짧은 안내만 싣는다
 */
export function CodeNoCardNote({ item }: { item: NoCardCode }) {
  return (
    <div className="mt-4 rounded-lg border border-gray-200 bg-white p-4 text-sm text-gray-800">
      <p className="font-semibold text-gray-900">다음 행동 · 공식 서비스 확인</p>
      <p className="mt-1 leading-relaxed">{item.note ?? NO_CARD_DEFAULT_NOTE}</p>
      <p className="mt-2 text-xs text-gray-600">
        공식 자료 대조 {item.checkedAt} ·{' '}
        <a href={item.serviceUrl} target="_blank" rel="noopener noreferrer" className="text-blue-700 underline underline-offset-2">공식 서비스 안내 열기</a>
      </p>
    </div>
  );
}
