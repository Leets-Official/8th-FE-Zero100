import { Link } from 'react-router-dom';
import Text from '../components/common/Text';
import TodoList from '../components/TodoList';
import { useTodos } from '../context/TodoContext';

const CompletedPage = () => {
  const { todos, toggleTodo, deleteTodo, editTodo } = useTodos();
  const completedTodos = todos.filter((todo) => todo.completed);

  return (
    <main className="app">
      <Link to="/">← 할 일 목록</Link>
      <Text as="h1" variant="title">
        완료 목록
      </Text>
      <Text as="h3" variant="count">
        완료한 일 {completedTodos.length}개
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
