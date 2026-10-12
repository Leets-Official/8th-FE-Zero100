import Text from '../components/common/Text/Text';
import PageHeader from '../components/layout/PageHeader/PageHeader';
import PageLayout from '../components/layout/PageLayout/PageLayout';
import TodoList from '../components/todo/TodoList/TodoList';
import { ROUTES } from '../constants/routes';
import { useTodos } from '../hooks/useTodos';
import { getCompletedTodos } from '../utils/filterTodos';

function CompletedPage() {
  const { todos } = useTodos();
  const completedTodos = getCompletedTodos(todos);

  return (
    <PageLayout>
      <PageHeader title="완료된 작업" linkTo={ROUTES.HOME} linkLabel="진행 중 목록" arrow="left" />

      <section className="flex flex-col gap-2" aria-labelledby="completed-count">
        <Text as="h2" variant="heading" id="completed-count" aria-live="polite">
          완료된 목록 {completedTodos.length}개
        </Text>
        <TodoList todos={completedTodos} emptyMessage="아직 완료한 할 일이 없어요." />
      </section>
    </PageLayout>
  );
}

export default CompletedPage;
