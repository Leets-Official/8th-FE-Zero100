import { Link, NavLink, useNavigate } from 'react-router';
import useAuth from '../../context/useAuth.js';
import { ROUTES } from '../../constants/routes.js';

export function AdminButton({ children, variant = 'primary', size = 'normal', ...props }) {
  return (
    <button
      className={`admin-button admin-button--${variant} admin-button--${size}`}
      type="button"
      {...props}
    >
      {children}
    </button>
  );
}

export function AdminTextInput({ label, error, ...props }) {
  const inputId = props.id;

  return (
    <div className="admin-field">
      {label && <label htmlFor={inputId}>{label}</label>}
      <input
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${inputId}-error` : undefined}
        {...props}
      />
      {error && (
        <span className="admin-field__error" id={`${inputId}-error`}>
          {error}
        </span>
      )}
    </div>
  );
}

export function AdminTextArea({ label, ...props }) {
  return (
    <div className="admin-field">
      {label && <label htmlFor={props.id}>{label}</label>}
      <textarea {...props} />
    </div>
  );
}

export function AdminHeader() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  return (
    <header className="admin-header">
      <strong>ZERO100 Admin</strong>
      <button
        type="button"
        className="admin-logout"
        onClick={() => {
          logout();
          navigate(ROUTES.login, { replace: true });
        }}
      >
        로그아웃
      </button>
    </header>
  );
}

export function AdminFooter() {
  return <footer className="admin-footer">ZERO100 Admin</footer>;
}

export function AdminSidebar() {
  return (
    <nav className="admin-sidebar" aria-label="대시보드 메뉴">
      <NavLink
        to={ROUTES.dashboard}
        end
        className={({ isActive }) => (isActive ? 'admin-sidebar__current' : undefined)}
      >
        대시보드 홈
      </NavLink>
      <NavLink
        to={ROUTES.inquiries}
        className={({ isActive }) => (isActive ? 'admin-sidebar__current' : undefined)}
      >
        문의
      </NavLink>
      <Link to={ROUTES.home}>Todolist</Link>
      <NavLink
        to={ROUTES.mypage}
        className={({ isActive }) => (isActive ? 'admin-sidebar__current' : undefined)}
      >
        마이페이지
      </NavLink>
    </nav>
  );
}

export function CheckIcon() {
  return (
    <span className="admin-check-icon" aria-hidden="true">
      ✓
    </span>
  );
}

export function AdminModal({ onCancel, onConfirm }) {
  return (
    <div
      className="admin-modal"
      role="dialog"
      aria-modal="false"
      aria-labelledby="admin-modal-title"
    >
      <p id="admin-modal-title">문의를 삭제하시겠습니까?</p>
      <div className="admin-modal__actions">
        <AdminButton variant="secondary" onClick={onCancel}>
          취소
        </AdminButton>
        <AdminButton onClick={onConfirm}>확인</AdminButton>
      </div>
    </div>
  );
}

export function AdminToast({ children }) {
  return (
    <div className="admin-toast" role="status">
      <CheckIcon />
      <span>{children}</span>
    </div>
  );
}
