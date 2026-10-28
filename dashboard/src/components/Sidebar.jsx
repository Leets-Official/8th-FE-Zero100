import { NavLink } from 'react-router-dom';

const MENUS = [
  { label: '대시보드 홈', to: '/' },
  { label: '문의', to: '/inquiries' },
  { label: '마이페이지', to: '/mypage' },
];

const Sidebar = () => {
  return (
    <aside className="w-[240px] shrink-0 border-r border-[#E5E7EB] bg-white pt-4">
      <nav>
        <ul>
          {MENUS.map((menu) => (
            <li key={menu.to}>
              <NavLink
                to={menu.to}
                end={menu.to === '/'}
                className={({ isActive }) =>
                  `flex h-11 items-center px-5 text-sm text-black ${
                    isActive ? 'bg-[#F3F4F6]' : 'hover:bg-[#F9FAFB]'
                  }`
                }
              >
                {menu.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
