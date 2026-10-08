import { NavLink } from 'react-router';
import { TODO_TABS } from '../../../constants/routes';
import { cn } from '../../../utils/cn';

/** NavLink는 현재 주소와 같은 탭에 isActive를 알려주고, aria-current="page"도 자동으로 붙여준다. */
function TodoTabs() {
  return (
    <nav aria-label="할 일 메뉴" className="flex gap-6 border-b border-line-tab">
      {TODO_TABS.map(({ to, label }) => (
        <NavLink
          key={to}
          to={to}
          end
          className={({ isActive }) =>
            cn(
              '-mb-px border-b-2 pb-2 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-primary',
              isActive
                ? 'border-primary text-primary'
                : 'border-transparent text-ink-faint hover:text-ink',
            )
          }
        >
          {label}
        </NavLink>
      ))}
    </nav>
  );
}

export default TodoTabs;
