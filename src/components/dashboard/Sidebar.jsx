import { NavLink } from 'react-router';
import { ROUTES } from '../../constants/routes';

const menus = [
  { to: ROUTES.DASHBOARD, label: '대시보드 홈' },
  { to: ROUTES.INQUIRIES, label: '문의' },
  { to: ROUTES.MYPAGE, label: '마이페이지' },
];

function Sidebar() {
  return (
    <aside className="min-h-[818px] w-[240px] shrink-0 bg-[#ffffff] py-[16px] shadow-[inset_-0.93px_0_0_#e5e7eb]">
      <nav aria-label="대시보드 메뉴">
        {menus.map((menu) => (
          <NavLink
            key={menu.to}
            to={menu.to}
            end={menu.to === ROUTES.DASHBOARD}
            className={({ isActive }) =>
              `block px-[24px] py-[12px] text-[14px] leading-[20px] text-[#222222] hover:bg-[#f3f4f6] focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#222222] ${isActive ? 'bg-[#f3f4f6] font-medium' : ''} `
            }
          >
            {menu.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
