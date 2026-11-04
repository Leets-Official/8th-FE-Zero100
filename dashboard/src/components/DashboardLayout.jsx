import { Outlet, useNavigate } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';

const DashboardLayout = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col bg-[#F9FAFB]">
      <Header onLogout={() => navigate('/login')} />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default DashboardLayout;
