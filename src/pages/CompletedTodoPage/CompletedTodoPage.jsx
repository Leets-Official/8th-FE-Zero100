import PageHeader from '../../components/PageHeader/PageHeader.jsx';
import PageLayout from '../../components/PageLayout/PageLayout.jsx';
import TodoList from '../../components/TodoList/TodoList.jsx';

const COMPLETED_TODOS = [{ id: 3, title: '리츠 출석하기', completed: true }];

function CompletedTodoPage() {
  const todos = COMPLETED_TODOS;
  const completedCount = todos.filter((todo) => todo.completed).length;

  return (
    <PageLayout>
      <PageHeader title="완료된 작업" navLabel="← 진행 중 목록" />
      <TodoList title={`완료된 목록 ${completedCount}개`} todos={todos} />
    </PageLayout>
  );
}

export default CompletedTodoPage;
