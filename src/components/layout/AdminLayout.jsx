import { NavLink, Outlet } from 'react-router';
import AdminHeader from './AdminHeader';

const links = [
  { to: '/', label: '대시보드 홈', end: true },
  { to: '/inquiries', label: '문의' },
  { to: '/mypage', label: '마이페이지' },
];
export default function AdminLayout() {
  return (
    <div className="admin-shell">
      <a className="skip-link" href="#admin-main">
        본문 바로가기
      </a>
      <AdminHeader />
      <div className="admin-body">
        <aside className="admin-sidebar">
          <nav aria-label="주 메뉴">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={({ isActive }) => `admin-nav-link ${isActive ? 'is-active' : ''}`}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </aside>
        <main className="admin-main" id="admin-main" tabIndex={-1}>
          <Outlet />
        </main>
      </div>
      <footer className="admin-footer">
        <span className="demo-badge">로컬 데모</span>
        <span>ZERO100 Admin</span>
      </footer>
    </div>
  );
}
