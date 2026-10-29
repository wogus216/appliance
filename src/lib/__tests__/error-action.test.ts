import { describe, expect, it } from 'vitest';
import {
  CUCKOO_E4_ACTION_GUIDE as cuckoo,
  HAIER_F25_ACTION_GUIDE as haier,
  SKMAGIC_DR_ACTION_GUIDE as skDr,
  SKMAGIC_F9_ACTION_GUIDE as skF9,
  ROBOROCK_S7_ACTION_GUIDE as s7,
  getHubActionGuides,
} from '@/lib/data/error-codes/action-guides';
import { buildErrorActionSummary, getErrorActionAdvice, matchActionModel, type ErrorActionInput } from '@/lib/error-action';

const safe: ErrorActionInput = {
  model: 'CTH06QBW', safety: 'clear', outcome: 'not-tried', observation: '', timing: '', tried: '', temperature: 'below-zero',
};

describe('오류코드 행동 카드의 적용 경계', () => {
  it('대소문자·바깥 공백만 보정하며 다른 파생 모델은 허용하지 않는다', () => {
    expect(matchActionModel(haier, ' cth06qbw ')).toBeDefined();
    for (const model of ['', 'CTH06', 'CTH06QBW-X', 'CTH06QBW/CTH10QBW', '6평형', 'CDW-A0611TW']) {
      expect(matchActionModel(haier, model), model).toBeUndefined();
      expect(getErrorActionAdvice(haier, { ...safe, model }).kind).toBe('identify');
    }
  });

  it.each(haier.models)('$model은 해당 모델 설명서만 연결한다', (entry) => {
    const summary = buildErrorActionSummary(haier, { ...safe, model: entry.model }, 'https://salimlab.kr');
    expect(summary).toContain(entry.manualUrl);
    const other = haier.models.find((model) => model.model !== entry.model)!;
    expect(summary).not.toContain(other.manualUrl);
  });

  it.each(['', 'CTH06QBW', 'UNKNOWN'])('안전 문제가 있으면 모델 %s와 무관하게 중단을 먼저 안내한다', (model) => {
    const advice = getErrorActionAdvice(haier, { ...safe, model, safety: 'concern' });
    expect(advice.kind).toBe('stop');
    expect(advice.steps.join()).not.toContain('10초');
  });

  it.each(['', 'unknown'] as const)('안전 상태 %s에서는 재시작 안내를 보류한다', (safety) => {
    const advice = getErrorActionAdvice(haier, { ...safe, safety });
    expect(advice.kind).toBe('safety');
    expect(advice.steps.join()).not.toContain('10초');
  });

  it.each(cuckoo.models)('$model E4는 표시가 사라져도 서비스 요청을 유지한다', ({ model }) => {
    const advice = getErrorActionAdvice(cuckoo, { ...safe, model, outcome: 'cleared' });
    expect(advice.kind).toBe('contact');
    expect(advice.steps.join()).toContain('다시 세척하지');
    expect(advice.steps.join()).not.toContain('10초');
  });

  it.each(['unknown', 'at-least-zero'] as const)('하이얼 외기 온도 %s에서는 재시작 안내를 내보내지 않는다', (temperature) => {
    const advice = getErrorActionAdvice(haier, { ...safe, temperature });
    expect(advice.kind).toBe('contact');
    expect(advice.steps.join()).not.toContain('10초');
  });

  it('확인한 국내 모델·안전 상태·저온 조건에만 설명서의 재시작 안내를 제공한다', () => {
    expect(getErrorActionAdvice(haier, safe).kind).toBe('check');
    expect(getErrorActionAdvice(haier, safe).steps.join()).toContain('10초');
  });

  it('재발 시 반복 재시작을 권하지 않으며 표시 소멸을 수리 완료로 확정하지 않는다', () => {
    const repeated = getErrorActionAdvice(haier, { ...safe, outcome: 'repeated' });
    expect(repeated.kind).toBe('contact');
    expect(repeated.steps.join()).not.toContain('10초');
    const cleared = getErrorActionAdvice(haier, { ...safe, outcome: 'cleared' });
    expect(cleared.kind).toBe('record');
    expect(cleared.steps.join()).toContain('확정할 수 없습니다');
  });

  it('지원하지 않는 모델의 저장 기록에 다른 모델의 설명서·재시작 조치를 넣지 않는다', () => {
    const summary = buildErrorActionSummary(haier, { ...safe, model: 'CTH99' }, 'https://salimlab.kr');
    expect(summary).toContain('미확인 — 모델별 조치 적용 불가');
    expect(summary).not.toContain('공식 설명서:');
    expect(summary).not.toContain('10초');
  });

  it('미입력은 미기록으로 남기고 사용자 기록·버전·최신본 주소를 저장한다', () => {
    const summary = buildErrorActionSummary(haier, { ...safe, timing: '저녁 8시', tried: '아무 조치도 하지 않음' }, 'https://salimlab.kr');
    expect(summary).toContain('발생 시점: 저녁 8시');
    expect(summary).toContain('이미 해본 조치: 아무 조치도 하지 않음');
    expect(summary).toContain('증상·주변 상태: 미기록');
    expect(summary).toContain(`안내 버전: ${haier.version}`);
    expect(summary).toContain(`최신 안내: https://salimlab.kr${haier.href}#action-card`);
    expect(summary).toContain('설명서 대조일: 2026-10-02');
  });
});

describe('추가 모델의 코드별 안내', () => {
  it.each(skDr.models)('$model의 dr은 문 닫기만 안내하며 다른 제품의 온도 조건을 적용하지 않는다', ({ model }) => {
    const advice = getErrorActionAdvice(skDr, { ...safe, model, temperature: 'unknown' });
    expect(advice.kind).toBe('check');
    expect(advice.steps.join()).toContain('문의 위쪽 끝');
    expect(advice.steps.join()).not.toMatch(/10초|0℃|급수.*차단/);
  });

  it.each(skF9.models)('$model의 F9는 표시 소멸 후에도 기능 점검을 요청한다', ({ model }) => {
    const advice = getErrorActionAdvice(skF9, { ...safe, model, outcome: 'cleared' });
    expect(advice.kind).toBe('contact');
    expect(advice.steps.join()).toContain('F1~F9');
    expect(advice.steps.join()).not.toContain('문의 위쪽 끝');
  });

  it('SK매직의 dr과 F9 적용 모델을 섞지 않는다', () => {
    expect(getErrorActionAdvice(skDr, { ...safe, model: 'DWA-81R0D' }).kind).toBe('identify');
    expect(getErrorActionAdvice(skF9, { ...safe, model: 'DWA19R0P' }).kind).toBe('identify');
    expect(matchActionModel(skF9, 'DWA-81R0D00SL')).toBeUndefined();
  });

  it('S7 범퍼 안내를 다른 로보락 모델에 적용하지 않는다', () => {
    expect(getErrorActionAdvice(s7, { ...safe, model: 'S7' }).steps.join()).toContain('범퍼');
    for (const model of ['S7 MaxV', 'S8 Pro Ultra', 'Qrevo Curv']) {
      expect(getErrorActionAdvice(s7, { ...safe, model }).kind, model).toBe('identify');
    }
  });

  it.each([skDr, skF9, s7])('$id의 미확인·위험·재발 분기도 모델별 조치를 침범하지 않는다', (guide) => {
    const input = { ...safe, model: guide.models[0].model };
    expect(getErrorActionAdvice(guide, { ...input, safety: 'unknown' }).kind).toBe('safety');
    expect(getErrorActionAdvice(guide, { ...input, safety: 'concern' }).kind).toBe('stop');
    expect(getErrorActionAdvice(guide, { ...input, outcome: 'repeated' }).kind).toBe('contact');
    const summary = buildErrorActionSummary(guide, input, 'https://salimlab.kr');
    expect(summary).toContain(`최신 안내: https://salimlab.kr${guide.href}#${guide.anchor}`);
    expect(summary).not.toContain('발생 시점의 외기 온도:');
    expect(summary).toContain(guide.models[0].manualUrl);
  });

  // 2026-10-27 카드 다섯 개는 공용 설명서의 정확한 모델 목록(2+2+3+8+1=16)만 쓴다. 2026-10-29에 늘어난 카드는
  // 근거 JSON과 모델 목록을 한 건씩 대조하는 error-action-coverage.test.ts가 같은 원칙을 지킨다.
  it('2026-10-27 카드는 공용 설명서의 정확한 모델 16개만 쓰며 모든 허브 앵커는 고유하다', () => {
    expect([cuckoo, haier, skDr, skF9, s7].map((guide) => guide.models.length)).toEqual([2, 2, 3, 8, 1]);
    const brands = ['SKMagic', 'Cuckoo', 'Roborock', 'Samsung', 'LG', 'Haier', 'Kiturami', 'Navien'];
    const anchors = brands.flatMap((brand) => getHubActionGuides(brand)).flatMap((guide) => guide.anchor ? [guide.anchor] : []);
    expect(new Set(anchors).size).toBe(anchors.length);
    expect(getHubActionGuides('Unknown')).toEqual([]);
  });
});

describe('2026-10-29 추가 카드의 적용 경계', () => {
  it('대소문자가 섞인 모델명과 설명서의 Series 표기를 같은 표기로만 맞춘다', () => {
    const roborock = getHubActionGuides('Roborock').find((guide) => guide.id === 'roborock-error4')!;
    expect(matchActionModel(roborock, 's8 pro ultra')?.model).toBe('S8 Pro Ultra');
    expect(matchActionModel(roborock, 'S8 Pro')).toBeUndefined();
    const cuckooE2 = getHubActionGuides('Cuckoo').find((guide) => guide.id === 'cuckoo-e2')!;
    expect(matchActionModel(cuckooE2, 'CDW-CS0620T')?.model).toBe('CDW-CS0620T Series');
    expect(matchActionModel(cuckooE2, 'cdw-cs0620t series')?.model).toBe('CDW-CS0620T Series');
    // 계열 표기 뒤에 글자가 더 붙은 명판 모델은 설명서 범위를 확정할 수 없다
    expect(matchActionModel(cuckooE2, 'CDW-CS0620TWE')).toBeUndefined();
    expect(matchActionModel(cuckooE2, 'CDW-A0611TW')).toBeUndefined();
  });

  it('제품군 단위 카드는 기록에 제품군으로 남기고 다른 제품군의 조치를 내보내지 않는다', () => {
    const krb98 = getHubActionGuides('Kiturami').find((guide) => guide.id === 'kiturami-98-water')!;
    const input = { ...safe, model: '거꾸로IN 가스보일러(제품군)' };
    expect(getErrorActionAdvice(krb98, input).kind).toBe('check');
    expect(buildErrorActionSummary(krb98, input, 'https://salimlab.kr')).toContain('제품군(사용자 선택): 거꾸로IN 가스보일러(제품군)');
    const other = getErrorActionAdvice(krb98, { ...safe, model: '거꾸로 IoT 콘덴싱 가스보일러(제품군)' });
    expect(other.kind).toBe('identify');
    expect(other.title).toContain('제품군');
  });

  it('FAQ로 뜻을 확인한 카드는 기록에 FAQ 주소를 남긴다', () => {
    const f01 = getHubActionGuides('SKMagic').find((guide) => guide.code === 'F:01')!;
    const summary = buildErrorActionSummary(f01, { ...safe, model: 'WPU-IAC506' }, 'https://salimlab.kr');
    expect(summary).toContain('공식 FAQ: https://www.skintellixservice.com/');
    expect(getErrorActionAdvice(f01, { ...safe, model: 'WPU-A710C' }).kind).toBe('identify');
  });
});
