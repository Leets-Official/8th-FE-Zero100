import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CompletedPage from './pages/CompletedPage';
import './App.css'

function App() {
  const [work, setWork] = useState(() => {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(work));
  }, [work]);

  const addWork = (text) => {
    setWork([...work, { id: crypto.randomUUID(), text, done: false }]);
  };

  const checkClear = (id) => {
    const newWork = work.map((task) => {
      if (task.id === id) {
        return {...task, done: !task.done};
      } else {
        return task;
      }
    });
    setWork(newWork);
  }

  const deleteWork = (id) => {
    setWork(work.filter((task) => task.id !== id));
  };

  const updateWork = (id, newText) => {
    setWork(work.map((task) =>
      task.id === id ? { ...task, text: newText } : task
    ));
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
