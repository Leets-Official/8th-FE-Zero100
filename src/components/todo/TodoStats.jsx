import { getTodoStatistics } from '../../utils/todoStatistics.js';
import Text from '../common/Text.jsx';

function TodoStats({ todos }) {
  const { total, active, completed, completionRate } = getTodoStatistics(todos);

  return (
    <section className="todo-stats" aria-labelledby="statistics-heading" aria-live="polite">
      <Text as="h2" variant="section-label" id="statistics-heading">
        할 일 통계
      </Text>
      <dl className="stats-counts">
        <div>
          <dt>전체</dt>
          <dd>
            {total}
            <span>개</span>
          </dd>
        </div>
        <div>
          <dt>진행 중</dt>
          <dd>
            {active}
            <span>개</span>
          </dd>
        </div>
        <div>
          <dt>완료</dt>
          <dd>
            {completed}
            <span>개</span>
          </dd>
        </div>
      </dl>
      <div className="stats-progress">
        <div className="stats-progress__label">
          <span>완료율</span>
          <strong>{completionRate}%</strong>
        </div>
        <progress value={completionRate} max="100" aria-label="할 일 완료율" />
      </div>
    </section>
  );
}

export default TodoStats;
