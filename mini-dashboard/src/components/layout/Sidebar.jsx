import { NavLink } from 'react-router';

const menus = [
  { to: '/', label: '대시보드', end: true },
  { to: '/inquiries', label: '문의' },
  { to: '/mypage', label: '마이페이지' },
];

function Sidebar() {
  return (
    <aside className="border-b border-line bg-white md:border-r md:border-b-0">
      <p className="hidden px-6 pt-7 pb-3 text-xs font-semibold tracking-wider text-muted md:block">
        MAIN
      </p>
      <nav aria-label="주요 메뉴" className="flex md:block">
        {menus.map(({ to, label, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex min-h-12 flex-1 items-center justify-center px-4 text-sm transition-colors hover:bg-page md:justify-start md:px-6 ${isActive ? 'bg-[#f1f3f5] font-semibold text-brand' : 'text-[#495057]'}`
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
