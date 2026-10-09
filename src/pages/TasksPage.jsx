import { NavLink } from 'react-router';
import Text from '../components/commons/Text';
import TodoForm from '../components/todo/TodoForm';
import TodoList from '../components/todo/TodoList';
import { useTasks } from '../hooks/useTasks';
import { filterRules, filterLabels } from '../utils/taskFilters';

export default function TasksPage({ filter = 'all' }) {
  const { tasks, addTask } = useTasks();
  const visibleTasks = tasks.filter(filterRules[filter]);

  return (
    <section className="tasks-page" aria-labelledby="list-heading">
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

      <Text as="h2" id="list-heading" className="remaining-count" aria-live="polite">
        {filterLabels[filter]} {visibleTasks.length}개
      </Text>

      <TodoList tasks={visibleTasks} filter={filter} />
    </section>
  );
}
