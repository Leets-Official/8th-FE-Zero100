import { createBrowserRouter, Navigate } from 'react-router';
import TodoTabsLayout from './components/layout/TodoTabsLayout/TodoTabsLayout';
import { ROUTES } from './constants/routes';
import CompletedPage from './pages/CompletedPage';
import NotFoundPage from './pages/NotFoundPage';
import StatsPage from './pages/StatsPage';
import TodoListPage from './pages/TodoListPage';

export const router = createBrowserRouter([
  { path: '/', element: <Navigate to={ROUTES.TODO} replace /> },
  {
    // 중첩 라우팅: 할 일 목록과 통계는 TodoTabsLayout의 제목/탭을 함께 쓴다.
    element: <TodoTabsLayout />,
    children: [
      { path: ROUTES.TODO, element: <TodoListPage /> },
      { path: ROUTES.TODO_STATS, element: <StatsPage /> },
    ],
  },
  { path: ROUTES.TODO_COMPLETED, element: <CompletedPage /> },
  { path: '*', element: <NotFoundPage /> },
]);
