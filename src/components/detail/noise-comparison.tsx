import {
  Volume2,
  Volume1,
  Leaf,
  Moon,
  BookOpen,
  Monitor,
  Refrigerator,
  MessageCircle,
  Utensils,
  WashingMachine,
  ArrowRight,
  BedDouble,
  TriangleAlert,
  type LucideIcon,
} from 'lucide-react';

const NOISE_LEVELS: { db: number; label: string; Icon: LucideIcon }[] = [
  { db: 20, label: '나뭇잎 흔들림', Icon: Leaf },
  { db: 25, label: '조용한 숨소리', Icon: Moon },
  { db: 30, label: '속삭임', Icon: Volume1 },
  { db: 35, label: '조용한 도서관', Icon: BookOpen },
  { db: 40, label: '일반 사무실', Icon: Monitor },
  { db: 45, label: '가정용 냉장고', Icon: Refrigerator },
  { db: 50, label: '일상 대화', Icon: MessageCircle },
  { db: 55, label: '식당 소음', Icon: Utensils },
  { db: 60, label: '세탁기 작동', Icon: WashingMachine },
];

function getNoiseGrade(db: number) {
  if (db <= 28) return { grade: '매우 조용', color: 'text-green-700', bg: 'bg-green-100', bar: 'bg-green-500' };
  if (db <= 34) return { grade: '조용', color: 'text-blue-700', bg: 'bg-blue-100', bar: 'bg-blue-500' };
  if (db <= 40) return { grade: '보통', color: 'text-yellow-700', bg: 'bg-yellow-100', bar: 'bg-yellow-500' };
  if (db <= 48) return { grade: '다소 시끄러움', color: 'text-orange-700', bg: 'bg-orange-100', bar: 'bg-orange-500' };
  return { grade: '시끄러움', color: 'text-red-700', bg: 'bg-red-100', bar: 'bg-red-500' };
}

export function NoiseComparison({ noise }: { noise: number }) {
  const grade = getNoiseGrade(noise);
  const maxDb = 60;
  const productPercent = Math.min((noise / maxDb) * 100, 100);

  return (
    <section>
      <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
        <Volume2 className="w-5 h-5 text-blue-600" />
        소음 {noise}dB — 어느 정도일까?
      </h2>
      <div className="bg-white border rounded-2xl p-6 space-y-6">
        {/* 소음 등급 뱃지 */}
        <div className="flex items-center gap-3">
          <span className={`px-4 py-2 rounded-full text-sm font-bold ${grade.bg} ${grade.color}`}>
            {grade.grade}
          </span>
          <span className="text-gray-500 text-sm">
            {noise <= 34 ? '밤에 틀어놓고 자도 수면 방해 없음' :
             noise <= 40 ? '일상생활에 큰 방해 없음' :
             noise <= 48 ? '조용한 환경에서 소리가 들림' :
             '소음에 민감하면 불편할 수 있음'}
          </span>
        </div>

        {/* 비교 바 차트 */}
        <div className="space-y-2">
          {NOISE_LEVELS.map(level => {
            const percent = (level.db / maxDb) * 100;
            const isProduct = Math.abs(level.db - noise) <= 3;
            const LevelIcon = level.Icon;

            return (
              <div key={level.db} className="flex items-center gap-3">
                <span className="w-6 flex justify-center">
                  <LevelIcon className="w-4 h-4 text-gray-400" aria-hidden />
                </span>
                <span className="text-xs text-gray-500 w-20 shrink-0">{level.label}</span>
                <div className="flex-1 h-5 bg-gray-100 rounded-full overflow-hidden relative">
                  <div
                    className={`h-full rounded-full transition-all ${
                      isProduct ? grade.bar + ' opacity-90' : 'bg-gray-300'
                    }`}
                    style={{ width: `${percent}%` }}
                  />
                </div>
                <span className={`text-xs font-mono w-10 text-right ${
                  isProduct ? grade.color + ' font-bold' : 'text-gray-400'
                }`}>
                  {level.db}dB
                </span>
              </div>
            );
          })}

          {/* 이 제품 위치 표시 */}
          <div className="flex items-center gap-3 bg-blue-50 rounded-lg p-2 mt-3">
            <span className="w-6 flex justify-center">
              <ArrowRight className="w-4 h-4 text-blue-600" aria-hidden />
            </span>
            <span className="text-xs text-blue-700 font-bold w-20 shrink-0">이 제품</span>
            <div className="flex-1 h-5 bg-blue-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${grade.bar}`}
                style={{ width: `${productPercent}%` }}
              />
            </div>
            <span className={`text-xs font-mono font-bold w-10 text-right ${grade.color}`}>
              {noise}dB
            </span>
          </div>
        </div>

        {/* 수면 팁 */}
        {noise <= 35 && (
          <p className="text-sm text-green-700 bg-green-50 p-3 rounded-lg flex items-start gap-2">
            <BedDouble className="w-5 h-5 shrink-0" aria-hidden />
            <span>수면 중 사용 OK — WHO 권장 야간 소음 기준(35dB 이하)을 충족합니다.</span>
          </p>
        )}
        {noise > 35 && noise <= 45 && (
          <p className="text-sm text-yellow-700 bg-yellow-50 p-3 rounded-lg flex items-start gap-2">
            <Moon className="w-5 h-5 shrink-0" aria-hidden />
            <span>수면 모드 사용 권장 — 수면 중에는 약풍/수면 모드로 전환하세요.</span>
          </p>
        )}
        {noise > 45 && (
          <p className="text-sm text-red-700 bg-red-50 p-3 rounded-lg flex items-start gap-2">
            <TriangleAlert className="w-5 h-5 shrink-0" aria-hidden />
            <span>수면 시 소음 주의 — 침실 사용 시 소음에 민감하다면 30dB 이하 모델을 고려하세요.</span>
          </p>
        )}
      </div>
    </section>
  );
}
