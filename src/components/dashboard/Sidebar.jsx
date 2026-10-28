import { NavLink } from 'react-router-dom';

const menuItems = [
  { label: '대시보드 홈', to: '/dashboard', end: true },
  { label: '문의', to: '/dashboard/inquiry' },
  { label: 'Todolist', to: '/todolist' },
  { label: '마이페이지', to: '/dashboard/mypage' },
];

function Sidebar() {
  return (
    <nav className="w-60 shrink-0 border-r border-gray-200 bg-white py-4">
      <ul>
        {menuItems.map((item) => (
          <li key={item.to}>
            <NavLink
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `block h-11 px-6 pt-2.5 text-sm leading-5 text-black ${isActive ? 'bg-gray-100' : ''}`
              }
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Sidebar;
