import { Navigate, Route, Routes } from 'react-router';
import Layout from './components/Layout';
import DashboardPage from './pages/DashboardPage';
import UsersPage from './pages/UsersPage';
import PostsPage from './pages/PostsPage';
import TasksPage from './pages/TasksPage';
import StatsPage from './pages/StatsPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<DashboardPage />} />
        <Route path="users" element={<UsersPage />} />
        <Route path="posts" element={<PostsPage />} />
        <Route path="tasks" element={<TasksPage />} />
        <Route path="active" element={<TasksPage filter="active" />} />
        <Route path="completed" element={<TasksPage filter="completed" />} />
        <Route path="stats" element={<StatsPage />} />
        <Route path="all" element={<Navigate to="/tasks" replace />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
