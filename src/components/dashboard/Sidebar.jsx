import { NavLink } from 'react-router';
import { ROUTES } from '../../constants/routes';

const menus = [
  { to: ROUTES.DASHBOARD, label: '대시보드 홈' },
  { to: ROUTES.INQUIRIES, label: '문의' },
  { to: ROUTES.MYPAGE, label: '마이페이지' },
];

function Sidebar() {
  return (
    <aside className="min-h-[818px] w-[240px] shrink-0 border-r border-[#E5E7EB] bg-[#FFFFFF] py-[16px]">
      <nav aria-label="대시보드 메뉴">
        {menus.map((menu) => (
          <NavLink
            key={menu.to}
            to={menu.to}
            end={menu.to === ROUTES.DASHBOARD}
            className={({ isActive }) =>
              `block px-[24px] py-[12px] text-[14px] leading-[20px] hover:bg-[#F3F4F6] focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#364153] ${
                isActive ? 'bg-[#F3F4F6] font-medium text-[#000000]' : 'text-[#4A5565]'
              }`
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
