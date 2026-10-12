import Text from '../components/common/Text.jsx';
import AppHeader from '../components/layout/AppHeader.jsx';
import TodoFilters from '../components/todo/TodoFilters.jsx';
import TodoForm from '../components/todo/TodoForm.jsx';
import TodoList from '../components/todo/TodoList.jsx';
import { useTodos } from '../hooks/useTodos.js';

const emptyMessages = {
  all: '아직 할 일이 없어요. 새로운 할 일을 추가해 보세요.',
  active: '진행 중인 할 일이 없어요.',
  completed: '완료된 할 일이 없어요.',
};

function TodoPage() {
  const { todos, activeFilter, setActiveFilter, addTodo } = useTodos();
  const remainingCount = todos.filter((todo) => !todo.completed).length;
  const visibleTodos = todos.filter((todo) => {
    if (activeFilter === 'active') return !todo.completed;
    if (activeFilter === 'completed') return todo.completed;
    return true;
  });

  return (
    <main className="app-shell">
      <AppHeader subtitle="할 일을 입력하세요" />
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
