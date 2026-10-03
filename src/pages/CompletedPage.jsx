import Text from '../components/common/Text.jsx';
import AppHeader from '../components/layout/AppHeader.jsx';
import TodoList from '../components/todo/TodoList.jsx';
import { useTodos } from '../hooks/useTodos.js';

function CompletedPage() {
  const { todos } = useTodos();
  const completedTodos = todos.filter((todo) => todo.completed);

  return (
    <main className="app-shell">
      <AppHeader title="완료된 작업" isCompletedPage />
      <Text as="p" variant="section-label">
        완료된 작업 목록
      </Text>
      <TodoList todos={completedTodos} emptyMessage="아직 완료한 할 일이 없어요." />
    </main>
  );
}

export default CompletedPage;
