import { AdminFooter, AdminHeader, AdminSidebar } from './AdminUI.jsx';
import '../../pages/dashboard-page.css';

function AdminLayout({ children }) {
  return (
    <div className="dashboard-page">
      <div className="dashboard-shell">
        <AdminHeader />
        <AdminSidebar />
        <main className="dashboard-main">{children}</main>
        <AdminFooter />
      </div>
    </div>
  );
}

export default AdminLayout;
