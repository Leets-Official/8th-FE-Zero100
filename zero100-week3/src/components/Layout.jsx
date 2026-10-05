import { Link, NavLink, Outlet, useLocation } from 'react-router';
import Text from './commons/Text';
import { useTasks } from '../hooks/useTasks';

export default function Layout() {
  const { storageError } = useTasks();
  const { pathname } = useLocation();
  const isListPage = ['/', '/active', '/completed', '/all'].includes(pathname);
  const isCompleted = pathname === '/completed';
  return (
    <main className="app-shell mx-auto">
      <header className="app-header flex items-center justify-between">
        <Text as="h1" className="app-title">
          TodoMatic
        </Text>
        <Link className="completed-link" to={isCompleted ? '/' : '/completed'}>
          {isCompleted ? '할 일 목록 →' : '완료 목록 →'}
        </Link>
      </header>
      <nav className="page-tabs flex" aria-label="주 메뉴">
        <Link
          className={`page-tab ${isListPage ? 'page-tab--active' : ''}`}
          to="/"
          aria-current={isListPage ? 'page' : undefined}
        >
          할 일 목록
        </Link>
        <NavLink
          className={({ isActive }) => `page-tab ${isActive ? 'page-tab--active' : ''}`}
          to="/stats"
        >
          통계
        </NavLink>
      </nav>
      {storageError && (
        <Text role="alert" className="storage-warning">
          {storageError}
        </Text>
      )}
      <Outlet />
    </main>
  );
}
