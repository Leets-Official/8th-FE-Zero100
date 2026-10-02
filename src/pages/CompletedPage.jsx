import Button from '../components/common/Button.jsx';
import Text from '../components/common/Text.jsx';
import TodoList from '../components/todo/TodoList.jsx';

function CompletedPage({ todos, onToggleTodo, onUpdateTodo, onDeleteTodo, onBack }) {
  const completedTodos = todos.filter((todo) => todo.completed);

  return (
    <main className="app-shell">
      <header className="app-header app-header--completed">
        <Text as="h1" variant="title">
          완료된 작업
        </Text>
        <Button variant="link" className="text-link" onClick={onBack}>
          <span aria-hidden="true">←</span> 할 일 목록
        </Button>
      </header>

      <Text as="p" variant="section-label">
        완료된 작업 목록
      </Text>

      <TodoList
        todos={completedTodos}
        emptyMessage="아직 완료한 할 일이 없어요."
        onToggleTodo={onToggleTodo}
        onUpdateTodo={onUpdateTodo}
        onDeleteTodo={onDeleteTodo}
      />
    </main>
  );
}

export default CompletedPage;
