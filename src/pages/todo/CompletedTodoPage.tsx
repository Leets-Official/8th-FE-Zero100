import PageHeader from '../../features/todo/components/PageHeader.tsx';
import PageLayout from '../../features/todo/components/PageLayout.tsx';
import TodoList from '../../features/todo/components/TodoList.tsx';
import type { Todo } from '../../features/todo/types.ts';

interface CompletedTodoPageProps {
  todos: Todo[];
  onToggleTodo: (id: string) => void;
  onEditTodo: (id: string, title: string) => void;
}

function CompletedTodoPage({ todos, onToggleTodo, onEditTodo }: CompletedTodoPageProps) {
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
