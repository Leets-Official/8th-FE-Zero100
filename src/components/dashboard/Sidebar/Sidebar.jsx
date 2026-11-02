import { NavLink } from 'react-router';
import { cn } from '../../../utils/cn';

/**
 * 현재 주소와 같은 메뉴는 NavLink가 isActive로 알려주고, aria-current="page"도 자동으로 붙는다.
 * 좁은 화면(md 미만)에서는 본문 자리가 부족하지 않도록 위쪽 가로 메뉴로 바뀐다.
 */
function Sidebar({ items }) {
  return (
    <nav
      aria-label="대시보드 메뉴"
      className="flex shrink-0 overflow-x-auto border-b border-dash-line bg-white md:w-60 md:flex-col md:border-r md:border-b-0"
    >
      {items.map(({ to, label, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          className={({ isActive }) =>
            cn(
              'flex min-h-11 shrink-0 items-center px-6 py-2.5 text-sm leading-5 whitespace-nowrap text-dash-black transition-colors hover:bg-dash-active',
              'focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-dash-muted',
              isActive && 'bg-dash-active font-medium',
            )
          }
        >
          {label}
        </NavLink>
      ))}
    </nav>
  );
}

export default Sidebar;
