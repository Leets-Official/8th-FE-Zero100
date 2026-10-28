import { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { ROUTES } from './constants/routes';
import DashboardPage from './pages/dashboard/DashboardPage';
import ComponentPreview from './pages/preview/ComponentPreview';
import AllPage from './pages/todolist/AllPage';
import CompletedPage from './pages/todolist/CompletedPage';
import StatsPage from './pages/todolist/StatsPage';
import TodoPage from './pages/todolist/TodoPage';

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

    ```
setTodos((previous) => [...previous, newTodo]);
```;
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
      {' '}
      <Routes>
        <Route path="/" element={<Navigate to={ROUTES.DASHBOARD} replace />} />

        <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />

        <Route path={ROUTES.TODO} element={<TodoPage {...pageProps} />} />
        <Route path={ROUTES.TODO_ALL} element={<AllPage {...pageProps} />} />
        <Route path={ROUTES.TODO_COMPLETED} element={<CompletedPage {...pageProps} />} />
        <Route path={ROUTES.TODO_STATS} element={<StatsPage {...pageProps} />} />

        <Route path={ROUTES.COMPONENT_PREVIEW} element={<ComponentPreview />} />

        <Route path="*" element={<Navigate to={ROUTES.DASHBOARD} replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
