import { createBrowserRouter } from 'react-router';
import TodoTabsLayout from './components/layout/TodoTabsLayout/TodoTabsLayout';
import { ROUTES } from './constants/routes';
import CompletedPage from './pages/CompletedPage';
import NotFoundPage from './pages/NotFoundPage';
import TodoListPage from './pages/TodoListPage';

export const router = createBrowserRouter([
  {
    // 중첩 라우팅: 할 일 목록(/)과 통계(/stats)는 TodoTabsLayout의 제목/탭을 함께 쓴다.
    element: <TodoTabsLayout />,
    children: [{ path: ROUTES.HOME, element: <TodoListPage /> }],
  },
  { path: ROUTES.COMPLETED, element: <CompletedPage /> },
  { path: '*', element: <NotFoundPage /> },
]);
