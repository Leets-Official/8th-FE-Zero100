import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router';
import { ROUTES } from '../../../constants/routes';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import Toast from '../Toast/Toast';
import { removeAccessToken } from '../../../utils/tokenStorage';

const SIDEBAR_ITEMS = [
  { to: ROUTES.DASHBOARD, label: '대시보드 홈', end: true },
  { to: ROUTES.DASHBOARD_INQUIRIES, label: '문의' },
  // Figma 대시보드 메인 화면 기준: 기존 Todo 화면으로 이동하는 메뉴
  { to: ROUTES.TODO, label: 'Todolist' },
  { to: ROUTES.DASHBOARD_MYPAGE, label: '마이페이지' },
];

/**
 * 대시보드 공통 레이아웃: 위 Header, 왼쪽 Sidebar, 가운데 페이지(<Outlet />), 아래 Footer.
 * 토스트는 레이아웃에 하나만 두고, 하위 페이지는 Outlet context의 showToast로 띄운다.
 */
function DashboardLayout() {
  const navigate = useNavigate();
  const [toast, setToast] = useState(null);

  const showToast = (message) => setToast({ id: Date.now(), message });

  // 서버에는 로그아웃 API가 없어서, 저장해 둔 토큰을 지우고 로그인 화면으로 보낸다.
  const logout = () => {
    removeAccessToken();
    navigate(ROUTES.LOGIN, { replace: true });
  };

  return (
    <div className="flex min-h-dvh flex-col bg-dash-bg">
      <Header actionLabel="로그아웃" onAction={logout} />
      <div className="flex flex-1 flex-col md:flex-row">
        <Sidebar items={SIDEBAR_ITEMS} />
        <main className="min-w-0 flex-1 p-6 md:p-8">
          <Outlet context={{ showToast }} />
        </main>
      </div>
      <Footer />

      {toast && <Toast key={toast.id} message={toast.message} onClose={() => setToast(null)} />}
    </div>
  );
}

export default DashboardLayout;
