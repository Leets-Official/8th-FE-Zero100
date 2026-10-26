import TodoList from '../components/TodoList.jsx';
import { useTodos } from '../context/useTodos.js';

function CompletedPage() {
  const { todos, completedCount } = useTodos();
  const completedTodos = todos.filter((todo) => todo.completed);

  return (
    <section aria-label="완료 목록" className="flex flex-col gap-2">
      <h2 className="text-[17.6px] leading-[26.4px] font-bold text-[#222]">
        완료한 할 일 {completedCount}개
      </h2>
      <TodoList todos={completedTodos} />
    </section>
  );
}

export default CompletedPage;
