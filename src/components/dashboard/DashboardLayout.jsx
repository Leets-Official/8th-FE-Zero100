import { Outlet, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import DashboardModalProvider from '../../contexts/DashboardModalProvider';
import DashboardToastProvider from '../../contexts/DashboardToastProvider';

function DashboardLayout() {
  const navigate = useNavigate();

  function handleLogout() {
    // TODO: API 연동 후 토큰 삭제 처리
    navigate(ROUTES.LOGIN);
  }

  return (
    <div className="font-noto">
      <DashboardModalProvider>
        <DashboardToastProvider>
          <div className="flex min-h-screen flex-col">
            <Header onLogout={handleLogout} />
            <div className="flex flex-1">
              <Sidebar />
              <main className="flex-1 bg-gray-50 p-8">
                <Outlet />
              </main>
            </div>
            <Footer />
          </div>
        </DashboardToastProvider>
      </DashboardModalProvider>
    </div>
  );
}

export default DashboardLayout;
