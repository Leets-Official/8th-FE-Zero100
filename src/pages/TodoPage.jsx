import Button from '../components/common/Button.jsx';
import Text from '../components/common/Text.jsx';
import TodoFilters from '../components/todo/TodoFilters.jsx';
import TodoForm from '../components/todo/TodoForm.jsx';
import TodoList from '../components/todo/TodoList.jsx';
import { useTodos } from '../hooks/useTodos.js';

const emptyMessages = {
  all: '아직 할 일이 없어요. 새로운 할 일을 추가해 보세요.',
  active: '진행 중인 할 일이 없어요.',
  completed: '완료된 할 일이 없어요.',
};

function TodoPage({ onViewCompleted }) {
  const { todos, activeFilter, setActiveFilter, addTodo } = useTodos();
  const remainingCount = todos.filter((todo) => !todo.completed).length;
  const visibleTodos = todos.filter((todo) => {
    if (activeFilter === 'active') return !todo.completed;
    if (activeFilter === 'completed') return todo.completed;
    return true;
  });
  const completedCount = todos.filter((todo) => todo.completed).length;

  return (
    <main className="app-shell">
      <header className="app-header">
        <div>
          <Text as="h1" variant="title">
            TodoMatic
          </Text>
          <Text as="p" variant="subtitle">
            할 일을 입력하세요
          </Text>
        </div>
        <Button
          variant="link"
          className="text-link"
          onClick={onViewCompleted}
          aria-label={`완료 목록 보기, 완료된 할 일 ${completedCount}개`}
        >
          완료 목록 <span aria-hidden="true">→</span>
        </Button>
      </header>

      <TodoForm onAddTodo={addTodo} />

      <TodoFilters activeFilter={activeFilter} onFilterChange={setActiveFilter} />

      <Text as="p" variant="count" aria-live="polite">
        남은 할 일 {remainingCount}개
      </Text>

      <TodoList todos={visibleTodos} emptyMessage={emptyMessages[activeFilter]} />
    </main>
  );
}

export default TodoPage;
