import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import TodoPage from './pages/TodoPage';
import AllPage from './pages/AllPage';
import CompletedPage from './pages/CompletedPage';
import StatsPage from './pages/StatsPage';

function App() {
  const [todos, setTodos] = useState(() => {
    try {
      const savedTasks = localStorage.getItem('tasks');
      const savedTodos = localStorage.getItem('todos');
      const data = savedTasks ?? savedTodos;

      if (!data) return [];

      const parsed = JSON.parse(data);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(todos));
  }, [todos]);

  const handleAdd = (text) => {
    const newTodo = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      text,
      completed: false,
    };

    setTodos((previous) => [...previous, newTodo]);
  };

  const handleToggle = (id) => {
    setTodos((previous) =>
      previous.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)),
    );
  };

  const handleDelete = (id) => {
    setTodos((previous) => previous.filter((todo) => todo.id !== id));
  };

  const handleEdit = (id, text) => {
    setTodos((previous) => previous.map((todo) => (todo.id === id ? { ...todo, text } : todo)));
  };

  const pageProps = {
    todos,
    onAdd: handleAdd,
    onToggle: handleToggle,
    onDelete: handleDelete,
    onEdit: handleEdit,
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TodoPage {...pageProps} />} />
        <Route path="/all" element={<AllPage {...pageProps} />} />
        <Route path="/completed" element={<CompletedPage {...pageProps} />} />
        <Route path="/stats" element={<StatsPage {...pageProps} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
