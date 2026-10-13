import { NavLink } from 'react-router';
import PageHeading from '../components/commons/PageHeading';
import Card from '../components/commons/Card';
import TodoForm from '../components/todo/TodoForm';
import TodoList from '../components/todo/TodoList';
import { useTasks } from '../hooks/useTasks';
import { filterRules, filterLabels } from '../utils/taskFilters';

const FILTER_LINKS = [
  { to: '/tasks', label: '전체', key: 'total' },
  { to: '/active', label: '진행 중', key: 'active' },
  { to: '/completed', label: '완료', key: 'completed' },
];

export default function TasksPage({ filter = 'all' }) {
  const { tasks, addTask, stats, storageError } = useTasks();
  const visibleTasks = tasks.filter(filterRules[filter]);
  return (
    <>
      <PageHeading title="나의 할 일" description="할 일을 기록하고 하나씩 완료해 보세요." />
      <Card className="tasks-panel">
        <TodoForm onAdd={addTask} />
        <p className={`save-status ${storageError ? 'save-status--error' : ''}`} role="status">
          {storageError ? '브라우저 저장 상태를 확인해 주세요.' : '이 브라우저에 자동 저장됩니다.'}
        </p>
        <nav className="filters flex flex-wrap" aria-label="할 일 필터">
          {FILTER_LINKS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end
              className={({ isActive }) => `task-filter ${isActive ? 'task-filter--active' : ''}`}
            >
              {item.label}
              <span>{stats[item.key]}</span>
            </NavLink>
          ))}
        </nav>
        <h2 className="remaining-count" aria-live="polite">
          {filterLabels[filter]} {visibleTasks.length}개
        </h2>
        <TodoList tasks={visibleTasks} filter={filter} />
      </Card>
    </>
  );
}
