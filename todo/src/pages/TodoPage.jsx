import { useState } from 'react';
import { Link } from 'react-router-dom';
import Text from '../components/common/Text';
import TodoForm from '../components/TodoForm';
import FilterButtons from '../components/FilterButtons';
import TodoList from '../components/TodoList';
import { useTodos } from '../context/TodoContext';

const TodoPage = () => {
  const { todos, addTodo, toggleTodo, deleteTodo, editTodo } = useTodos();
  const [filter, setFilter] = useState('all');

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const remainingCount = todos.filter((todo) => !todo.completed).length;

  return (
    <main className="app">
      <Link to="/completed">완료 목록 →</Link>
      <Text as="h1" variant="title">
        TodoMatic
      </Text>
      <Text as="h2" variant="subtitle">
        할 일을 입력하세요
      </Text>
      <TodoForm onAdd={addTodo} />
      <FilterButtons filter={filter} onChangeFilter={setFilter} />
      <Text as="h3" variant="count">
        남은 할 일 {remainingCount}개
      </Text>
      <TodoList
        todos={filteredTodos}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
        onEdit={editTodo}
      />
    </main>
  );
};

export default TodoPage;
