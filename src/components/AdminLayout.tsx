import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { logoutUser } from '../lib/appStorage';

const menuItems = [
  { label: '대시보드 홈', path: '/dashboard' },
  { label: '문의', path: '/inquiries' },
  { label: '마이페이지', path: '/mypage' },
];

function AdminLayout() {
  const navigate = useNavigate();

  function handleLogout() {
    logoutUser();
    navigate('/login', { replace: true });
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 text-gray-900">
      <header className="flex h-[60px] shrink-0 items-center justify-between border-b border-gray-200 bg-white px-6">
        <button
          type="button"
          onClick={() => navigate('/dashboard')}
          className="text-xl font-bold"
        >
          ZERO100 Admin
        </button>

        <button
          type="button"
          onClick={handleLogout}
          className="text-sm text-gray-600 hover:text-black"
        >
          로그아웃
        </button>
      </header>

      <div className="flex flex-1">
        <aside className="w-60 shrink-0 border-r border-gray-200 bg-white">
          <nav className="pt-4">
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/dashboard'}
                className={({ isActive }) =>
                  `flex h-11 items-center px-6 text-sm transition ${
                    isActive
                      ? 'bg-gray-100 font-medium text-black'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </aside>

        <main className="min-w-0 flex-1 p-8">
          <Outlet />
        </main>
      </div>

      <footer className="flex h-[60px] shrink-0 items-center justify-end border-t border-gray-200 bg-white px-6 text-sm text-gray-500">
        ZERO100 Admin
      </footer>
    </div>
  );
}

export default AdminLayout;
