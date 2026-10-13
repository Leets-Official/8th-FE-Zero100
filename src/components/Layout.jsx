import { Outlet } from 'react-router';
import Header from './layout/Header';
import Sidebar from './layout/Sidebar';
import { useTasks } from '../hooks/useTasks';

export default function Layout() {
  const { storageError } = useTasks();
  return (
    <div className="dashboard-shell">
      <a className="skip-link" href="#main-content">
        본문 바로가기
      </a>
      <Sidebar />
      <div className="workspace">
        <Header />
        <main id="main-content" className="workspace-content" tabIndex={-1}>
          {storageError && (
            <p role="alert" className="storage-warning">
              {storageError}
            </p>
          )}
          <Outlet />
        </main>
        <footer className="workspace-footer">Zero100 · 나의 작은 대시보드</footer>
      </div>
    </div>
  );
}
