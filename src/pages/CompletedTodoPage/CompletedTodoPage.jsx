import PageHeader from '../../components/PageHeader/PageHeader.jsx';
import PageLayout from '../../components/PageLayout/PageLayout.jsx';
import TodoList from '../../components/TodoList/TodoList.jsx';

function CompletedTodoPage({ todos, onToggleTodo, onEditTodo, onDeleteTodo }) {
  const completedTodos = todos.filter((todo) => todo.completed);

  return (
    <PageLayout>
      <PageHeader title="완료된 작업" navLabel="← 진행 중 목록" navTo="/" />
      <TodoList
        title={`완료된 목록 ${completedTodos.length}개`}
        todos={completedTodos}
        onToggleTodo={onToggleTodo}
        onEditTodo={onEditTodo}
        onDeleteTodo={onDeleteTodo}
      />
    </PageLayout>
  );
}

export default CompletedTodoPage;
