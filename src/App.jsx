import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './components/dashboard/DashboardLayout';
import ComponentsPage from './pages/dashboard/ComponentsPage';
import HomePage from './pages/todo/HomePage';
import CompletedPage from './pages/todo/CompletedPage';
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';

const loadTasks = () => {
  try {
    const saved = localStorage.getItem('tasks');
    if (!saved) return [];

    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

function App() {
  const [work, setWork] = useState(loadTasks);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(work));
  }, [work]);

  const addWork = (text) => {
    setWork((prev) => [...prev, { id: crypto.randomUUID(), text, done: false }]);
  };

  const checkClear = (id) => {
    setWork((prev) => prev.map((task) => (task.id === id ? { ...task, done: !task.done } : task)));
  };

  const deleteWork = (id) => {
    setWork((prev) => prev.filter((task) => task.id !== id));
  };

  const updateWork = (id, newText) => {
    setWork((prev) => prev.map((task) => (task.id === id ? { ...task, text: newText } : task)));
  };

  return (
    <Routes>
      <Route
        path="/todolist"
        element={
          <HomePage
            tasks={work}
            onAdd={addWork}
            onToggle={checkClear}
            onDelete={deleteWork}
            onUpdate={updateWork}
          />
        }
      />
      <Route
        path="/todolist/completed"
        element={
          <CompletedPage
            tasks={work}
            onToggle={checkClear}
            onDelete={deleteWork}
            onUpdate={updateWork}
          />
        }
      />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<ComponentsPage />} />
        <Route path="components" element={<ComponentsPage />} />
        <Route path="*" element={<p className="p-8">준비 중인 페이지입니다.</p>} />
      </Route>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export default App;
