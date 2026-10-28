import { Link } from 'react-router';
import { useTasks } from '../../hooks/useTasks';
import Card from '../commons/Card';
import EmptyState from '../commons/EmptyState';

export default function TaskOverview() {
  const { tasks, stats, toggleTask } = useTasks();
  const activeTasks = tasks.filter((task) => !task.completed).slice(0, 4);
  return (
    <Card
      title="오늘의 할 일"
      description="작은 목표부터 하나씩 완료해 보세요."
      action={
        <Link className="text-link" to="/tasks">
          전체 보기 →
        </Link>
      }
    >
      <div className="task-progress">
        <div>
          <span>나의 완료율</span>
          <strong>{stats.rate}%</strong>
        </div>
        <progress value={stats.rate} max={100} aria-label="나의 할 일 완료율" />
        <p>
          {stats.total}개 중 {stats.completed}개 완료
        </p>
      </div>
      {activeTasks.length ? (
        <ul className="task-preview-list">
          {activeTasks.map((task) => (
            <li key={task.id}>
              <label>
                <input type="checkbox" checked={false} onChange={() => toggleTask(task.id)} />
                <span>{task.text}</span>
              </label>
            </li>
          ))}
        </ul>
      ) : (
        <EmptyState
          title={stats.total ? '모든 할 일을 완료했어요!' : '첫 할 일을 추가해 보세요'}
          description="할 일 페이지에서 나만의 목표를 관리할 수 있어요."
        />
      )}
      <Link to="/tasks" className="button button--secondary w-full">
        할 일 관리하기
      </Link>
    </Card>
  );
}
