import { NavLink } from 'react-router-dom';

export default function Sidebar() {
  const menuItems = [
    { name: '대시보드 홈', path: '/dashboard' },
    { name: '문의', path: '/inquiries' },
    { name: '마이페이지', path: '/mypage' },
  ];

  return (
    <aside className="w-full shrink-0 border-b border-gray-200 bg-white p-5 md:min-h-screen md:w-60 md:border-b-0 md:border-r">
      <h2 className="mb-8 text-xl font-bold tracking-tight text-gray-900">
        ZERO100 Admin
      </h2>

      <nav className="flex gap-2 md:flex-col">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end
            className={({ isActive }) =>
              `rounded-lg px-4 py-3 text-sm font-medium transition ${
                isActive
                  ? 'bg-black text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`
            }
          >
            {item.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}