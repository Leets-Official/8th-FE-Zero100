import { useState, useEffect } from 'react';
import Text from './components/common/Text';
import TodoForm from './components/TodoForm';
import FilterButtons from './components/FilterButtons';
import TodoList from './components/TodoList';
import './App.css';

function App() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const [filter, setFilter] = useState('all');

  // 추가
  const addTodo = (text) => {
    setTodos((prev) => [...prev, { id: Date.now(), text, completed: false }]);
  };

  // 완료 표시 토글
  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)),
    );
  };

  // 삭제
  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  // 편집
  const editTodo = (id, text) => {
    setTodos((prev) => prev.map((todo) => (todo.id === id ? { ...todo, text } : todo)));
  };

  // 필터링
  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const remainingCount = todos.filter((todo) => !todo.completed).length;

  return (
    <main className="app">
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
}

export default App;
