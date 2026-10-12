import { Navigate, Route, Routes } from 'react-router';
import { ROUTES } from './constants/routes.js';
import ComponentsPage from './pages/ComponentsPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import TodoApp from './pages/TodoApp.jsx';

function App() {
  return (
    <Routes>
      <Route path={ROUTES.dashboard} element={<DashboardPage />} />
      <Route path={ROUTES.components} element={<ComponentsPage />} />
      <Route path="/todolist/*" element={<TodoApp />} />
      <Route path="/stats" element={<Navigate to={ROUTES.stats} replace />} />
      <Route path="/completed" element={<Navigate to={ROUTES.completed} replace />} />
      <Route path="*" element={<Navigate to={ROUTES.dashboard} replace />} />
    </Routes>
  );
}

export default App;
