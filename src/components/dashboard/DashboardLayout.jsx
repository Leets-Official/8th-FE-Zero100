import { Outlet } from 'react-router';
import Footer from './Footer.jsx';
import Header from './Header.jsx';
import Sidebar from './Sidebar.jsx';

// 문의, 마이페이지 라우트는 아직 구현 전이며 Figma 메뉴 구성에 맞춰 경로만 지정
const SIDEBAR_ITEMS = [
  { label: '대시보드 홈', to: '/dashboard', end: true },
  { label: '문의', to: '/inquiry' },
  { label: '마이페이지', to: '/mypage' },
];

// 로그아웃 API 연동 전이므로 버튼 UI만 표시
const handleLogout = () => {};

function DashboardLayout() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-[#f9fafb]">
      <Header title="ZERO100 Admin" titleAs="p" onLogout={handleLogout} />
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
