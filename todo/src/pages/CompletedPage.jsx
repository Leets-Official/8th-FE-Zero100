import { Link } from 'react-router-dom';
import Text from '../components/common/Text';
import TodoList from '../components/TodoList';
import { useTodos } from '../context/TodoContext';

const CompletedPage = () => {
  const { todos, toggleTodo, deleteTodo, editTodo } = useTodos();
  const completedTodos = todos.filter((todo) => todo.completed);

  return (
    <main className="app">
      <div className="flex items-center justify-between">
        <Text as="h1" variant="title">
          완료된 작업
        </Text>
        <Link to="/" className="text-sm text-indigo-600">
          ← 진행 중 목록
        </Link>
      </div>
      <Text as="h3" variant="count">
        완료된 목록 {completedTodos.length}개
      </Text>
      <TodoList
        todos={completedTodos}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
        onEdit={editTodo}
      />
    </main>
  );
};

export default CompletedPage;
