import { Outlet } from 'react-router';
import { useAuth } from '../../features/auth/context/AuthContext.ts';
import Footer from './Footer.tsx';
import Header from './Header.tsx';
import Sidebar from './Sidebar.tsx';

const SIDEBAR_ITEMS = [
  { label: '대시보드 홈', to: '/dashboard', end: true },
  { label: '문의', to: '/dashboard/inquiries' },
  { label: '마이페이지', to: '/dashboard/mypage' },
];

function DashboardLayout() {
  const { logout } = useAuth();

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#f9fafb]">
      {/* 로그아웃하면 AuthRoute가 로그인 페이지로 이동시킨다. */}
      <Header title="ZERO100 Admin" titleAs="p" onLogout={logout} />
      <div className="flex flex-col md:flex-row flex-1">
        <Sidebar
          items={SIDEBAR_ITEMS}
          className="w-full border-r-0 border-b-[0.93px] md:w-[240px] md:shrink-0 md:border-r-[0.93px] md:border-b-0"
        />
        <main className="flex-1 min-w-0 p-[32px]">
          <Outlet />
        </main>
      </div>
      <Footer text="ZERO100 Admin" />
    </div>
  );
}

export default DashboardLayout;
