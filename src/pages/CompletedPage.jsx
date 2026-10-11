import Text from '../components/commons/Text';
import TodoList from '../components/todo/TodoList';
import { useTasks } from '../hooks/useTasks';
import { filterRules } from '../utils/taskFilters';

export default function CompletedPage() {
  const { tasks } = useTasks();
  const completedTasks = tasks.filter(filterRules.completed);

  return (
    <section className="tasks-page" aria-labelledby="completed-heading">
      <Text as="h2" id="completed-heading" className="remaining-count" aria-live="polite">
        완료한 할 일 {completedTasks.length}개
      </Text>

      <TodoList tasks={completedTasks} filter="completed" />
    </section>
  );
}
