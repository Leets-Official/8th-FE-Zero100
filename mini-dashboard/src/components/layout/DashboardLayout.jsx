import { Outlet } from 'react-router';
import { useDashboard } from '../../hooks/useDashboard.js';
import StatusMessage from '../common/StatusMessage.jsx';
import Header from './Header.jsx';
import Sidebar from './Sidebar.jsx';
import Footer from './Footer.jsx';

function DashboardLayout() {
  const { status, reload } = useDashboard();

  return (
    <div className="flex min-h-dvh flex-col">
      <a
        href="#main-content"
        className="sr-only z-50 rounded bg-brand px-4 py-3 text-white focus:not-sr-only focus:absolute focus:top-2 focus:left-2"
      >
        본문 바로가기
      </a>
      <Header />
      <div className="flex-1 md:grid md:grid-cols-[200px_minmax(0,1fr)]">
        <Sidebar />
        <main id="main-content" className="min-w-0 px-5 py-7 sm:px-8 sm:py-8 lg:px-10">
          <div className="mx-auto max-w-6xl">
            {status === 'loading' ? (
              <StatusMessage status="loading">대시보드를 불러오고 있어요.</StatusMessage>
            ) : status === 'error' ? (
              <StatusMessage status="error" onRetry={reload}>
                정보를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.
              </StatusMessage>
            ) : (
              <Outlet />
            )}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default DashboardLayout;
