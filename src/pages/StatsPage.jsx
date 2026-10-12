import Text from '../components/common/Text/Text';
import CompletionRateCard from '../components/stats/CompletionRateCard/CompletionRateCard';
import StatCard from '../components/stats/StatCard/StatCard';
import { useTodos } from '../hooks/useTodos';
import { getTodoStats } from '../utils/getTodoStats';

function StatsPage() {
  const { todos } = useTodos();
  const { totalCount, activeCount, completedCount, completionRate } = getTodoStats(todos);

  return (
    <section className="flex flex-col gap-4" aria-labelledby="stats-title">
      <div className="flex flex-col gap-1.5">
        <Text as="h2" id="stats-title" className="text-[22px] font-bold text-ink-sub">
          할 일 통계
        </Text>
        <p className="text-sm text-ink-muted">할 일을 얼마나 완료했는지 한눈에 확인하세요.</p>
      </div>

      <CompletionRateCard
        totalCount={totalCount}
        completedCount={completedCount}
        completionRate={completionRate}
      />

      <dl className="mt-3 flex gap-2.5">
        <StatCard label="전체" value={totalCount} />
        <StatCard label="진행 중" value={activeCount} />
        <StatCard label="완료" value={completedCount} />
      </dl>
    </section>
  );
}

export default StatsPage;
