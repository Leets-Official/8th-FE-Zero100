import { NavLink } from 'react-router-dom';

const Sidebar = ({ items = [], activeItem, onItemClick }) => {
  return (
    <aside className="common-component common-sidebar" aria-label="사이드바 메뉴">
      {items.map((item) => {
        const isActive = activeItem === item.label;

        const className = ({ isActive: routeIsActive }) =>
          ['common-sidebar__item', (routeIsActive || isActive) && 'common-sidebar__item--active']
            .filter(Boolean)
            .join(' ');

        if (item.to) {
          return (
            <NavLink
              key={item.label}
              to={item.to}
              end={item.to === '/todolist'}
              className={className}
              onClick={() => onItemClick?.(item)}
            >
              {item.label}
            </NavLink>
          );
        }

        return (
          <button
            key={item.label}
            type="button"
            className={['common-sidebar__item', isActive && 'common-sidebar__item--active']
              .filter(Boolean)
              .join(' ')}
            aria-current={isActive ? 'page' : undefined}
            onClick={() => onItemClick?.(item)}
          >
            {item.label}
          </button>
        );
      })}
    </aside>
  );
};

export default Sidebar;
