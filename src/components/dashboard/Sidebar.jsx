import { NavLink } from 'react-router';
import { twMerge } from 'tailwind-merge';

// Figma 공통 컴포넌트 Sidebar. 높이는 배치되는 레이아웃에 따라 달라지므로 className으로 지정
const BASE_CLASS_NAME =
  'box-border w-[240px] border-0 border-r-[0.93px] border-solid border-[#e5e7eb] bg-[#ffffff]';

const LINK_CLASS_NAME =
  'block px-[24px] py-[12px] font-[family-name:var(--font-family-base)] font-normal text-[14px] leading-[20px] tracking-[0px] text-[#000000] no-underline';

// Dashboard 전용 사이드바. 메뉴는 items({ label, to, end })로 전달하고, 그 외 내부 콘텐츠는 children으로 전달
// 현재 경로와 일치하는 메뉴는 NavLink가 aria-current="page"를 지정하고 배경색으로 구분
function Sidebar({ items, className, children, ...props }) {
  return (
    <aside className={twMerge(BASE_CLASS_NAME, className)} {...props}>
      {items?.length > 0 && (
        <nav className="py-[16px]">
          {items.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                isActive ? `${LINK_CLASS_NAME} bg-[#f3f4f6]` : LINK_CLASS_NAME
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      )}
      {children}
    </aside>
  );
}

export default Sidebar;
