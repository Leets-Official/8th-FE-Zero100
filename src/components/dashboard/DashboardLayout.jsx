import { Outlet } from 'react-router-dom';

function DashboardLayout() {
  return (
    <div className="min-h-screen bg-white">
      {}
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default DashboardLayout;
