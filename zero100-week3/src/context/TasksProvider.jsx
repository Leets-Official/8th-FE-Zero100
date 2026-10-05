import { useEffect, useState } from 'react';
import { TasksContext } from './TasksContext';
import { loadTasks, STORAGE_KEY } from '../utils/taskStorage';

export default function TasksProvider({ children }) {
  // 초기 렌더에서 저장된 값을 읽어, 빈 배열이 기존 데이터를 먼저 덮어쓰지 않도록 합니다.
  const [initial] = useState(loadTasks);
  const [tasks, setTasks] = useState(initial.tasks);
  const [persistEnabled, setPersistEnabled] = useState(initial.persistEnabled);
  const [storageError, setStorageError] = useState(initial.warning);

  useEffect(() => {
    if (!persistEnabled) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
      setStorageError('');
    } catch {
      setStorageError(
        '브라우저에 저장하지 못했어요. 현재 화면에서는 사용할 수 있지만 새로고침하면 변경 내용이 사라질 수 있습니다.',
      );
    }
  }, [tasks, persistEnabled]);

  function addTask(text) {
    const trimmed = text.trim();
    if (!trimmed) return;
    const task = { id: crypto.randomUUID(), text: trimmed, completed: false };
    setPersistEnabled(true);
    setTasks((previous) => [...previous, task]);
  }
  function toggleTask(id) {
    setPersistEnabled(true);
    setTasks((previous) =>
      previous.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)),
    );
  }
  function editTask(id, text) {
    if (!text.trim()) return;
    setPersistEnabled(true);
    setTasks((previous) =>
      previous.map((task) => (task.id === id ? { ...task, text: text.trim() } : task)),
    );
  }
  function deleteTask(id) {
    setPersistEnabled(true);
    setTasks((previous) => previous.filter((task) => task.id !== id));
  }

  const completed = tasks.filter((task) => task.completed).length;
  const stats = {
    total: tasks.length,
    active: tasks.length - completed,
    completed,
    rate: tasks.length === 0 ? 0 : Math.round((completed / tasks.length) * 100),
  };

  return (
    <TasksContext.Provider
      value={{ tasks, addTask, toggleTask, editTask, deleteTask, stats, storageError }}
    >
      {children}
    </TasksContext.Provider>
  );
}
