import { useState } from 'react';
import Text from './components/commons/Text';
import TodoForm from './components/todo/TodoForm';
import TodoFilters from './components/todo/TodoFilters';
import TodoList from './components/todo/TodoList';
import './App.css';
import { COUNT_LABELS, INITIAL_TODOS } from './constants/todos';

export default function App() {
  const [todos, setTodos] = useState(INITIAL_TODOS);
  const [filter, setFilter] = useState('all');

  // 원본 배열을 직접 수정하지 않고 새 배열로 상태를 갱신합니다.
  function addTodo(text) {
    const todo = { id: crypto.randomUUID(), text, completed: false };
    setTodos((previous) => [...previous, todo]);
    setFilter('all'); // 완료 필터에서 추가해도 방금 추가한 항목을 볼 수 있습니다.
  }

  function toggleTodo(id) {
    setTodos((previous) =>
      previous.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)),
    );
  }

  function deleteTodo(id) {
    setTodos((previous) => previous.filter((todo) => todo.id !== id));
  }

  function editTodo(id, text) {
    setTodos((previous) => previous.map((todo) => (todo.id === id ? { ...todo, text } : todo)));
  }

  const visibleTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  return (
    <main className="app">
      <Text as="h1" className="app-title">
        TodoMatic
      </Text>
      <TodoForm onAdd={addTodo} />
      <TodoFilters filter={filter} onFilterChange={setFilter} />
      <section aria-labelledby="todo-count-heading">
        <Text as="h2" id="todo-count-heading" className="todo-count" aria-live="polite">
          {COUNT_LABELS[filter]} {visibleTodos.length}개
        </Text>
        <TodoList
          todos={visibleTodos}
          filter={filter}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          onEdit={editTodo}
        />
      </section>
    </main>
  );
}
