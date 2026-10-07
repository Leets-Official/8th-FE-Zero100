import { Link } from 'react-router';
import TodoItem from '../components/TodoItem/TodoItem';

function CompletedPage({ todos, onToggle, onDelete, onEdit }) {
  const completedTodos = todos.filter((todo) => todo.completed);

  return (
    <>
      <header className="mb-[24px] flex items-center justify-between gap-[16px]">
        <h1 className="text-[40px] leading-[1.5] font-extrabold text-[#111111]">완료된 작업</h1>

        <Link
          to="/"
          className="shrink-0 text-[16px] text-[#4f46e5] hover:underline focus-visible:outline-2 focus-visible:outline-[#4f46e5]"
        >
          ← 할 일 목록
        </Link>
      </header>

      <section aria-labelledby="completed-count">
        <h2 id="completed-count" className="todo-tasks__count" aria-live="polite">
          완료된 목록 {completedTodos.length}개
        </h2>

        {completedTodos.length === 0 ? (
          <p className="todo-tasks__empty">완료된 할 일이 없습니다.</p>
        ) : (
          <ul className="todo-list">
            {completedTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={onToggle}
                onDelete={onDelete}
                onEdit={onEdit}
              />
            ))}
          </ul>
        )}
      </section>
    </>
  );
}

export default CompletedPage;
