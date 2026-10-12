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
      <Route path={ROUTES.home} element={<TodoApp />} />
      <Route path="*" element={<Navigate to={ROUTES.dashboard} replace />} />
    </Routes>
  );
}

export default App;
