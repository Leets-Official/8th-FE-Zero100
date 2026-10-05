import { NavLink } from 'react-router';
import Text from '../components/commons/Text';
import TodoForm from '../components/todo/TodoForm';
import TodoList from '../components/todo/TodoList';
import { useTasks } from '../hooks/useTasks';

export default function TasksPage({ filter }) {
  const { addTask, stats } = useTasks();
  const completedPage = filter === 'completed';
  return (
    <section className="tasks-page" aria-labelledby="list-heading">
      {!completedPage && (
        <>
          <TodoForm onAdd={addTask} />
          <nav className="filters flex" aria-label="할 일 필터">
            <NavLink
              end
              to="/"
              className={({ isActive }) =>
                `button ${isActive ? 'button--primary' : 'button--secondary'}`
              }
            >
              전체보기
            </NavLink>
            <NavLink
              to="/active"
              className={({ isActive }) =>
                `button ${isActive ? 'button--primary' : 'button--secondary'}`
              }
            >
              진행 중
            </NavLink>
          </nav>
        </>
      )}
      <Text as="h2" id="list-heading" className="remaining-count" aria-live="polite">
        {completedPage ? `완료한 할 일 ${stats.completed}개` : `남은 할 일 ${stats.active}개`}
      </Text>
      <TodoList filter={filter} />
    </section>
  );
}
