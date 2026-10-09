import PageHeader from '../../components/todo/PageHeader.jsx';
import PageLayout from '../../components/todo/PageLayout.jsx';
import TodoList from '../../components/todo/TodoList.jsx';

function CompletedTodoPage({ todos, onToggleTodo, onEditTodo }) {
  const completedTodos = todos.filter((todo) => todo.completed);

  return (
    <PageLayout>
      <PageHeader title="완료된 작업" navLabel="← 진행 중 목록" navTo="/todolist" />
      <TodoList
        title={`완료된 목록 ${completedTodos.length}개`}
        todos={completedTodos}
        onToggleTodo={onToggleTodo}
        onEditTodo={onEditTodo}
      />
    </PageLayout>
  );
}

export default CompletedTodoPage;
