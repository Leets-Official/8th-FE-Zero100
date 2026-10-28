import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import DashboardModalProvider from '../../contexts/DashboardModalProvider';
import DashboardToastProvider from '../../contexts/DashboardToastProvider';

function DashboardLayout() {
  return (
    <div className="font-noto">
      <DashboardModalProvider>
        <DashboardToastProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            <div className="flex flex-1">
              <Sidebar />
              <main className="flex-1 bg-gray-50">
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
