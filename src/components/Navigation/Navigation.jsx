import { Link } from 'react-router-dom';
import './Navigation.css';

const TABS = [
  { id: 'todo', to: '/', label: '할 일 목록' },
  { id: 'stats', to: '/stats', label: '통계' },
];

function Navigation({ active = 'todo' }) {
  return (
    <nav className="navigation" aria-label="메인 메뉴">
      {TABS.map((tab) => {
        const isActive = tab.id === active;

        return (
          <Link
            key={tab.id}
            to={tab.to}
            className={`navigation-item${isActive ? ' active' : ''}`}
            aria-current={isActive ? 'page' : undefined}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}

export default Navigation;
