import { useNavigate } from 'react-router-dom';

import { ROUTES } from '../../constants/routes';
import Footer from '../common/Footer';
import Header from '../common/Header';
import Sidebar from '../common/Sidebar';

import './DashboardLayout.css';

const SIDEBAR_ITEMS = [
  { label: '대시보드 홈', to: ROUTES.DASHBOARD },
  { label: '문의', to: ROUTES.INQUIRY },
  { label: 'Todolist', to: ROUTES.TODO },
  { label: '마이페이지', to: ROUTES.MYPAGE },
];

const DashboardLayout = ({ children }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // TODO: 로그인 API 연동 후 토큰 삭제 처리 추가
    navigate(ROUTES.LOGIN);
  };

  return (
    <div className="dashboard-layout">
      <Header onAction={handleLogout} />

      <div className="dashboard-layout__body">
        <Sidebar items={SIDEBAR_ITEMS} />
        <main className="dashboard-layout__main">{children}</main>
      </div>

      <Footer />
    </div>
  );
};

export default DashboardLayout;
