import { describe, expect, it } from 'vitest';
import { getInstallModel } from '@/lib/data/install-check';
import { getInstallCategory, installCheckRecord, installConsultationRecord, installConsultationSummary } from '@/lib/install-check';

const model = (name: string) => getInstallModel(name)!;

describe('설치 상담 요약', () => {
  it('공간 부족·안내 상한 초과·미측정을 구분하고 실제 값에 맞춘 질문과 출처를 보낸다', () => {
    const m = model('Qrevo Curv');
    const inputs = { width: '450', threshold: '40' };
    const summary = installConsultationSummary(m, inputs);
    expect(summary.issues).toHaveLength(2);
    expect(summary.issues[0]).toContain('확보 공간 부족');
    expect(summary.issues[0]).toContain('10mm 부족');
    expect(summary.issues[1]).toContain('안내 상한 초과');
    expect(summary.issues[1]).toContain('30mm를 10mm 넘음');
    expect(summary.unmeasured).toEqual(['벽부터 앞 장애물까지 거리', '바닥부터 위쪽 장애물까지 높이']);
    expect(summary.invalid).toEqual([]);
    expect(summary.unverified.join('\n')).toContain('유럽(CE)');
    expect(summary.questions.join('\n')).toContain('문턱은 40mm');
    expect(summary.questions.join('\n')).toContain('문턱 모양·바닥재·진입 방향');
    expect(summary.questions.join('\n')).toContain('국내 판매 구성');
    const copied = installConsultationRecord(m, inputs, ['바닥재와 문턱 사진'], '2026-11-01');
    expect(copied).toContain(m.model);
    expect(copied).toContain('기록일: 2026-11-01');
    expect(copied).toContain(m.sourceUrl);
    expect(copied).toContain(m.checkedAt);
    expect(copied).toContain('상담 자료 준비: 바닥재와 문턱 사진');
    expect(copied).toContain('설치 가능 판정이 아닙니다');
    const full = installCheckRecord(m, inputs, [], '2026-11-01');
    for (const fact of [...summary.issues, ...summary.unmeasured, ...summary.unverified, ...summary.questions]) expect(full).toContain(fact);
  });

  it('같은 깊이로 본체와 문 열림을 비교해도 미측정 위치는 한 번만 적는다', () => {
    const m = model('WF24A9500KE');
    const summary = installConsultationSummary(m, {});
    expect(summary.unmeasured).toEqual(getInstallCategory('washer').fields.map((field) => field.label));
    expect(summary.issues).toEqual([]);
    expect(summary.measurements).toEqual([]);
    expect(summary.comparisonNote).toContain('아직 수치로 비교한 결과가 없습니다');
  });

  it('자료가 없어 계산하지 못하는 칸도 잘못된 입력과 미측정을 따로 알린다', () => {
    const summary = installConsultationSummary(model('RO585HGH'), { width: '100cm', depth: '1000', threshold: '-1' });
    expect(summary.invalid).toHaveLength(2);
    expect(summary.unmeasured).toEqual(['바닥부터 위쪽 장애물까지 높이']);
    expect(summary.issues).toEqual([]);
    expect(summary.measurements).toEqual(['벽부터 앞 장애물까지 거리: [사용자 실측] 1,000mm']);
    expect(summary.unverified.join('\n')).toContain('공식 설치 설명서를 찾지 못했습니다');
    expect(summary.questions.join('\n')).not.toContain('-1mm');
    expect(summary.questions.join('\n')).not.toContain('100cm');
  });

  it('수치가 넉넉해도 누락 여유·엇갈린 값과 높이차 현장 질문을 남긴다', () => {
    const summary = installConsultationSummary(model('CTH10QBW'), { outdoorWidth: '2000', heightDiff: '6000' });
    expect(summary.issues.join('\n')).toContain('안내 상한 초과');
    expect(summary.unverified.join('\n')).toContain('엇갈');
    expect(summary.questions.join('\n')).toContain('배관 경로');
    expect(summary.questions.join('\n')).toContain('6,000mm');
    expect(summary.unmeasured).not.toContain('실외기 자리 폭');
  });

  it('모든 치수가 커도 설치 승인으로 바꾸지 않고 원래 입력과 자료 확인을 남긴다', () => {
    const summary = installConsultationSummary(model('Qrevo Curv'), { width: '1000', depth: '2000', height: '1200', threshold: '10' });
    expect(summary.issues).toEqual([]);
    expect(summary.unmeasured).toEqual([]);
    expect(summary.measurements).toHaveLength(4);
    expect(summary.comparisonNote).toContain('입력한 범위');
    expect(summary.unverified.length).toBeGreaterThan(0);
    expect(summary.questions.join('\n')).toContain('문턱은 10mm');
  });
});
