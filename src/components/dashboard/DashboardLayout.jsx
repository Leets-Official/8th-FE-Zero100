import { Outlet } from 'react-router';
import Footer from './Footer.jsx';
import Header from './Header.jsx';
import Sidebar from './Sidebar.jsx';

const SIDEBAR_ITEMS = [
  { label: '대시보드 홈', to: '/dashboard', end: true },
  { label: '문의', to: '/dashboard/inquiries' },
  { label: '마이페이지', to: '/dashboard/mypage' },
];

function DashboardLayout() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-[#f9fafb]">
      {/* 로그아웃 API 연동 전이므로 비활성화. 연동 시 logoutDisabled를 onLogout으로 교체 */}
      <Header title="ZERO100 Admin" titleAs="p" logoutDisabled />
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
