import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import DashboardModalProvider from '../../contexts/DashboardModalProvider';

function DashboardLayout() {
  return (
    <DashboardModalProvider>
      <div className="flex min-h-screen flex-col">
        <Header />
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1">
            <Outlet />
          </main>
        </div>
        <Footer />
      </div>
    </DashboardModalProvider>
  );
}

export default DashboardLayout;
