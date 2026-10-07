import { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router';
import TodoPage from './pages/TodoPage';
import CompletedPage from './pages/CompletedPage';
import { loadTodos, TODO_STORAGE_KEY } from './utils/todoStorage';
import './App.css';
import StatsPage from './pages/StatsPage';
import Layout from './components/Layout/Layout';

function App() {
  const [todos, setTodos] = useState(loadTodos);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    try {
      localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(todos));
    } catch (error) {
      console.error('할 일 목록을 저장하지 못했습니다.', error);
    }
  }, [todos]);

  function handleAdd(text) {
    const newTodo = {
      id: crypto.randomUUID(),
      text,
      completed: false,
    };

    setTodos((prev) => [...prev, newTodo]);
  }

  function handleToggle(id) {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)),
    );
  }

  function handleDelete(id) {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }

  function handleEdit(id, text) {
    setTodos((prev) => prev.map((todo) => (todo.id === id ? { ...todo, text } : todo)));
  }

  const todoProps = {
    todos,
    onToggle: handleToggle,
    onDelete: handleDelete,
    onEdit: handleEdit,
  };

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route
          index
          element={
            <TodoPage {...todoProps} filter={filter} onFilterChange={setFilter} onAdd={handleAdd} />
          }
        />

        <Route path="completed" element={<CompletedPage {...todoProps} />} />

        <Route path="stats" element={<StatsPage todos={todos} />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
