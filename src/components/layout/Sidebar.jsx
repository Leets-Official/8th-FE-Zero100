import { Link, NavLink, useLocation } from 'react-router';
import { NAV_ITEMS } from '../../constants/navigation';
import Icon from '../commons/Icon';
import logo from '../../assets/logo.svg';

export default function Sidebar() {
  const { pathname } = useLocation();
  return (
    <aside className="sidebar">
      <Link to="/" className="brand" aria-label="Zero100 대시보드 홈">
        <img src={logo} alt="" width="34" height="34" />
        <span>
          zero<span className="brand-number">100</span>
          <small>MY WORKSPACE</small>
        </span>
      </Link>
      <p className="nav-caption">WORKSPACE</p>
      <nav aria-label="주 메뉴" className="main-nav">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            aria-current={item.aliases?.includes(pathname) ? 'page' : undefined}
            className={({ isActive }) =>
              `nav-item ${isActive || item.aliases?.includes(pathname) ? 'nav-item--active' : ''}`
            }
          >
            <Icon name={item.icon} />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
      <div className="sidebar-note">
        <span className="sidebar-note-mark">0 → 100</span>
        <p>
          작은 시작이 모여
          <br />더 큰 변화를 만들어요.
        </p>
      </div>
      <div className="sidebar-profile">
        <span className="avatar avatar--small">나</span>
        <div>
          <strong>나의 워크스페이스</strong>
          <p>Zero100 mini dashboard</p>
        </div>
      </div>
    </aside>
  );
}
