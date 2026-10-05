import { Link, NavLink } from 'react-router';

const menus = [
  { to: '/', label: '할 일 목록' },
  { to: '/stats', label: '통계' },
];

function TodoHeader() {
  return (
    <header className="mb-[20px]">
      <div className="mb-[20px] flex items-center justify-between gap-[16px]">
        <h1 className="text-[40px] leading-[1.5] font-extrabold text-[#111111]">TodoMatic</h1>

        <Link
          to="/completed"
          className="shrink-0 text-[16px] text-[#4f46e5] hover:underline focus-visible:outline-2 focus-visible:outline-[#4f46e5]"
        >
          완료 목록 →
        </Link>
      </div>

      <nav aria-label="주요 메뉴" className="flex gap-[24px] border-b border-[#eeeeee]">
        {menus.map((menu) => (
          <NavLink
            key={menu.to}
            to={menu.to}
            end
            className={({ isActive }) =>
              `border-b-2 pb-[10px] text-[14px] font-semibold focus-visible:outline-2 focus-visible:outline-[#4f46e5] ${
                isActive ? 'border-[#4f46e5] text-[#4f46e5]' : 'border-transparent text-[#888888]'
              } `
            }
          >
            {menu.label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}

export default TodoHeader;
