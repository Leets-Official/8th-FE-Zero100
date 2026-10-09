import { useTasks } from '../../hooks/useTasks';

export default function TodoStats() {
  const { stats } = useTasks();
  return (
    <div aria-live="polite">
      <section className="completion-card" aria-label="완료율 통계">
        <div className="completion-summary flex items-center justify-between">
          <div>
            <h3 className="completion-title">완료율</h3>
            <p className="completion-description">
              전체 {stats.total}개 중 {stats.completed}개를 완료했어요.
            </p>
          </div>
          <p className="completion-rate">{stats.rate}%</p>
        </div>
        <progress
          className="completion-progress"
          aria-label="완료율"
          value={stats.rate}
          max="100"
        />
      </section>
      <dl className="stat-cards grid grid-cols-3" aria-label="작업 개수">
        {[
          ['전체', stats.total],
          ['진행 중', stats.active],
          ['완료', stats.completed],
        ].map(([label, value]) => (
          <div className="stat-card" key={label}>
            <dt>{label}</dt>
            <dd>
              <span className="stat-value">{value}</span>
              <span className="stat-unit">개</span>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
