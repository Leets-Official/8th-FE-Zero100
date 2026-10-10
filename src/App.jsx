import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CompletedPage from './pages/CompletedPage';

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
        path="/"
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
        path="/completed"
        element={
          <CompletedPage
            tasks={work}
            onToggle={checkClear}
            onDelete={deleteWork}
            onUpdate={updateWork}
          />
        }
      />
    </Routes>
  );
}

export default App;
