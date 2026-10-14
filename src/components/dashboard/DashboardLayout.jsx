import { Outlet } from 'react-router';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';

function DashboardLayout() {
  return (
    <div className="flex min-h-dvh flex-col bg-[#f9fafb]">
      <Header />

      <div className="flex flex-1">
        <Sidebar />

        <main className="min-w-0 flex-1 p-[24px]">
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
}

export default DashboardLayout;
