import { describe, it, expect } from 'vitest';
import { allCatalogAppliances } from '@/lib/data/appliances';
import { describeAxisBasis, getEditorScore, getScoreAxes, GRADE_SCORE } from '@/lib/scoring';
import type { Appliance, ApplianceCategory } from '@/types/appliance';

/**
 * 점수 체계가 스스로와, 그리고 같은 페이지에 실린 표기 스펙과 어긋나지 않는지 본다.
 *
 * 2026-09-09 점검에서 실제로 나온 어긋남을 그대로 회귀 테스트로 만든 것이다:
 *   - 4축이 완전히 같은 로봇청소기 두 대가 4.5와 4.1을 달고 있었다
 *   - 모든 축이 같거나 낮은데 종합점수가 높은 쌍이 4건 있었다
 *   - 2등급 냉장고의 효율 축이 9, 1등급 세탁기가 8이었다
 *   - 같은 60Hz TV 세 대의 주사율 축이 5·5·4였다
 *   - ANC ON 8시간 표기가 같은 이어폰 두 대의 배터리 축이 8과 7이었다
 */

const label = (a: Appliance) => `${a.brand} ${a.name} (${a.slug})`;

/** 효율관리기자재 대상 품목 — scoring.ts의 목록과 같아야 한다 */
const GRADE_CATEGORIES: ApplianceCategory[] = [
  '에어컨',
  '제습기',
  '세탁기',
  '건조기',
  '냉장고',
  '식기세척기',
];

function axisMap(a: Appliance): Map<string, number> {
  return new Map(getScoreAxes(a).map((ax) => [ax.label, ax.value]));
}

function extra(a: Appliance, name: string): string | undefined {
  return a.techSpecs.extraSpecs?.find((e) => e.label === name)?.value;
}

describe('종합 점수는 축에서 나온다', () => {
  it.each(allCatalogAppliances.map((a) => [label(a), a] as const))(
    '축 평균의 절반이다 — %s',
    (_name, a) => {
      const axes = getScoreAxes(a);
      expect(axes.length).toBeGreaterThan(0);
      const mean = axes.reduce((s, ax) => s + ax.value, 0) / axes.length;
      expect(getEditorScore(a)).toBe(Math.round((mean / 2) * 10) / 10);
    },
  );

  it('축 구성이 완전히 같은 제품은 종합 점수도 같다', () => {
    const byAxes = new Map<string, Appliance[]>();
    for (const a of allCatalogAppliances) {
      const key = getScoreAxes(a)
        .map((ax) => `${ax.label}=${ax.value}`)
        .join('|');
      byAxes.set(key, [...(byAxes.get(key) ?? []), a]);
    }
    const conflicts: string[] = [];
    for (const group of byAxes.values()) {
      const scores = new Set(group.map(getEditorScore));
      if (scores.size > 1) {
        conflicts.push(group.map((a) => `${label(a)}=${getEditorScore(a)}`).join(' vs '));
      }
    }
    expect(conflicts).toEqual([]);
  });

  it('같은 카테고리 안에서 지배 역전이 없다', () => {
    // 모든 축이 같거나 낮은데 종합 점수가 더 높은 쌍. 예전 카탈로그에 4건 있었다.
    const inversions: string[] = [];
    for (const a of allCatalogAppliances) {
      for (const b of allCatalogAppliances) {
        if (a === b || a.category !== b.category) continue;
        if (getEditorScore(a) <= getEditorScore(b)) continue;
        const av = axisMap(a);
        const bv = axisMap(b);
        // 축 구성이 다르면 비교 자체가 성립하지 않는다
        if (av.size !== bv.size || [...av.keys()].some((k) => !bv.has(k))) continue;
        const allLE = [...av].every(([k, v]) => v <= bv.get(k)!);
        const someLT = [...av].some(([k, v]) => v < bv.get(k)!);
        if (allLE && someLT) {
          inversions.push(`${label(a)} > ${label(b)}`);
        }
      }
    }
    expect(inversions).toEqual([]);
  });
});

describe('에너지등급 축', () => {
  it('효율관리기자재 대상 품목에서 등급 표기를 그대로 환산한다', () => {
    const checked = allCatalogAppliances.filter(
      (a) => GRADE_CATEGORIES.includes(a.category) && a.techSpecs.energyGrade,
    );
    expect(checked.length).toBeGreaterThan(0);
    for (const a of checked) {
      expect(axisMap(a).get('에너지등급'), label(a)).toBe(
        GRADE_SCORE[a.techSpecs.energyGrade!],
      );
    }
  });

  it('등급 비대상 품목에는 에너지 축을 그리지 않는다', () => {
    // 등급을 적지 않으면서 '에너지효율 8/10'을 그리면 그 8의 출처를 말할 수 없다.
    const nonTarget = allCatalogAppliances.filter(
      (a) => !GRADE_CATEGORIES.includes(a.category),
    );
    expect(nonTarget.length).toBeGreaterThan(0);
    for (const a of nonTarget) {
      const labels = getScoreAxes(a).map((ax) => ax.label);
      expect(labels, label(a)).not.toContain('에너지등급');
      expect(labels, label(a)).not.toContain('에너지효율');
    }
  });
});

describe('소비전력·소음은 점수로 환산하지 않는다', () => {
  it.each(allCatalogAppliances.map((a) => [label(a), a] as const))(
    '저전력·저소음 축이 없다 — %s',
    (_name, a) => {
      const labels = getScoreAxes(a).map((ax) => ax.label);
      expect(labels).not.toContain('저전력');
      expect(labels).not.toContain('저소음');
    },
  );
});

describe('TV 축은 표기 스펙을 따른다', () => {
  const tvs = allCatalogAppliances.filter((a) => a.category === 'TV');

  it('비교할 TV가 카탈로그에 있다', () => {
    expect(tvs.length).toBeGreaterThan(0);
  });

  it('화질 축은 해상도 표기에서 나온다 (4K 8 · QHD 7 · FHD 6)', () => {
    let checked = 0;
    for (const a of tvs) {
      const res = extra(a, '해상도');
      if (!res) continue;
      const expected = res.includes('4K') ? 8 : res.includes('QHD') ? 7 : res.includes('FHD') ? 6 : null;
      if (expected == null) continue;
      expect(axisMap(a).get('화질'), `${label(a)} — ${res}`).toBe(expected);
      checked++;
    }
    expect(checked).toBeGreaterThan(0);
  });

  it('주사율 축은 Hz 표기에서 나온다 (120Hz 8 · 60Hz 5)', () => {
    let checked = 0;
    for (const a of tvs) {
      const hz = extra(a, '주사율');
      if (!hz) continue;
      const value = Number(hz.match(/(\d+)\s*Hz/)?.[1]);
      const expected = value >= 120 ? 8 : 5;
      expect(axisMap(a).get('주사율'), `${label(a)} — ${hz}`).toBe(expected);
      checked++;
    }
    expect(checked).toBeGreaterThan(0);
  });
});

describe('무선이어폰 축은 표기 스펙을 따른다', () => {
  const buds = allCatalogAppliances.filter((a) => a.category === '무선이어폰');

  it('비교할 이어폰이 카탈로그에 있다', () => {
    expect(buds.length).toBeGreaterThan(0);
  });

  it('배터리 축 = ANC 켠 재생시간(내림) + 총 재생시간 30시간 이상이면 1', () => {
    let checked = 0;
    for (const a of buds) {
      const text = extra(a, '배터리');
      if (!text) continue;
      const anc = Number(text.match(/ANC ON ([\d.]+)h/)?.[1]);
      const total = Number(text.match(/총 (\d+)h/)?.[1]);
      if (!anc || !total) continue;
      const expected = Math.min(10, Math.floor(anc) + (total >= 30 ? 1 : 0));
      expect(axisMap(a).get('배터리'), `${label(a)} — ${text}`).toBe(expected);
      checked++;
    }
    expect(checked).toBeGreaterThan(0);
  });

  it('연결성 축 = 블루투스 5.4면 8·5.3이면 7, 멀티포인트 지원이면 +1', () => {
    let checked = 0;
    for (const a of buds) {
      const bt = extra(a, '블루투스');
      const mp = extra(a, '멀티포인트');
      if (!bt || !mp) continue;
      // '미지원'도 '지원'을 포함한다 — 접두사로 판정한다
      const expected = (bt.includes('5.4') ? 8 : 7) + (mp.startsWith('지원') ? 1 : 0);
      expect(axisMap(a).get('연결성'), `${label(a)} — BT ${bt} / 멀티포인트 ${mp}`).toBe(
        expected,
      );
      checked++;
    }
    expect(checked).toBeGreaterThan(0);
  });
});

describe('레이더 캡션은 그려진 축만 설명한다', () => {
  it.each(allCatalogAppliances.map((a) => [label(a), a] as const))(
    '설명한 축이 실제로 그려진 축과 일치한다 — %s',
    (_name, a) => {
      const axes = getScoreAxes(a);
      const caption = describeAxisBasis(axes);
      for (const ax of axes) {
        expect(caption).toContain(ax.label);
      }
      // 그리지 않는 축을 설명하지 않는다
      for (const gone of ['저전력', '저소음']) {
        expect(caption).not.toContain(gone);
      }
    },
  );

  it('축 이름 뒤에 은/는을 붙이지 않는다', () => {
    // 'HDR·스마트OS은' 같은 조사 오류를 막는다. 축 이름은 데이터에서 오므로
    // 받침을 미리 알 수 없다.
    for (const a of allCatalogAppliances) {
      const caption = describeAxisBasis(getScoreAxes(a));
      for (const ax of getScoreAxes(a)) {
        expect(caption, `${label(a)} — ${ax.label}`).not.toContain(`${ax.label}은 `);
        expect(caption, `${label(a)} — ${ax.label}`).not.toContain(`${ax.label}는 `);
      }
    }
  });
});

describe('편집팀 판단 축은 판단의 범위를 밝힌다', () => {
  it.each(allCatalogAppliances.map((a) => [label(a), a] as const))(
    '모든 editor 축에 scope가 있다 — %s',
    (_name, a) => {
      // 규칙으로 묶을 수 없는 축이라 최소한 무엇을 보고 매겼는지는 적어야 한다.
      // 새 카테고리를 붙이면서 AXIS_SCOPE를 빠뜨리면 여기서 걸린다.
      for (const ax of getScoreAxes(a).filter((x) => x.basis === 'editor')) {
        expect(ax.scope, `${label(a)} — ${ax.label}`).toBeTruthy();
      }
    },
  );

  it('근거가 있는 축(grade·spec)에는 scope를 붙이지 않는다', () => {
    // 규칙이 있는 축은 규칙 자체가 설명이다. 범위 문장을 덧대면 두 설명이 갈린다.
    for (const a of allCatalogAppliances) {
      for (const ax of getScoreAxes(a).filter((x) => x.basis !== 'editor')) {
        expect(ax.scope, `${label(a)} — ${ax.label}`).toBeUndefined();
      }
    }
  });

  it('scope는 측정했다고 주장하지 않는다', () => {
    // '측정', '시험' 같은 말이 들어가면 판단 축이 측정값처럼 읽힌다.
    const banned = ['측정', '시험', '실측', '인증'];
    for (const a of allCatalogAppliances) {
      for (const ax of getScoreAxes(a)) {
        for (const w of banned) {
          expect(ax.scope ?? '', `${label(a)} — ${ax.label}`).not.toContain(w);
        }
      }
    }
  });
});

describe('가성비 점수는 가격을 확인한 제품에만 쓴다', () => {
  it('가격 미확인 제품에도 valueRating 값 자체는 남아 있다(화면에서만 감춘다)', () => {
    // 데이터에서 지우지 않는 이유: 가격을 다시 확인하면 그대로 살아나야 한다.
    // 화면 쪽 규칙은 hero-section·verdict-section·value-section이 msrp로 건다.
    for (const a of allCatalogAppliances) {
      expect(typeof a.priceAnalysis.valueRating, label(a)).toBe('number');
    }
  });
});
