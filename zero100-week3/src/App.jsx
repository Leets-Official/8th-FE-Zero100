import { Navigate, Route, Routes } from 'react-router';
import Layout from './components/Layout';
import TasksPage from './pages/TasksPage';
import StatsPage from './pages/StatsPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<TasksPage filter="all" />} />
        <Route path="active" element={<TasksPage filter="active" />} />
        <Route path="all" element={<Navigate to="/" replace />} />
        <Route path="completed" element={<TasksPage filter="completed" />} />
        <Route path="stats" element={<StatsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
