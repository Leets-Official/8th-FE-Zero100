import { useState } from 'react';
import { Outlet } from 'react-router';
import { ROUTES } from '../../../constants/routes';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import Toast from '../Toast/Toast';

const SIDEBAR_ITEMS = [
  { to: ROUTES.DASHBOARD, label: '대시보드 홈', end: true },
  { to: ROUTES.DASHBOARD_INQUIRIES, label: '문의' },
  { to: ROUTES.DASHBOARD_MYPAGE, label: '마이페이지' },
];

/**
 * 대시보드 공통 레이아웃: 위 Header, 왼쪽 Sidebar, 가운데 페이지(<Outlet />), 아래 Footer.
 * 토스트는 레이아웃에 하나만 두고, 하위 페이지는 Outlet context의 showToast로 띄운다.
 */
function DashboardLayout() {
  const [toast, setToast] = useState(null);

  const showToast = (message) => setToast({ id: Date.now(), message });

  return (
    <div className="flex min-h-dvh flex-col bg-dash-bg">
      <Header
        actionLabel="로그아웃"
        onAction={() => showToast('로그아웃 기능은 다음 주차에 연결할 예정이에요.')}
      />
      <div className="flex flex-1">
        <Sidebar items={SIDEBAR_ITEMS} />
        <main className="min-w-0 flex-1 p-6 md:px-10 md:py-8">
          <Outlet context={{ showToast }} />
        </main>
      </div>
      <Footer />

      {toast && <Toast key={toast.id} message={toast.message} onClose={() => setToast(null)} />}
    </div>
  );
}

export default DashboardLayout;
