import { Navigate, Outlet } from 'react-router';
import useAuth from '../context/useAuth.js';
import { ROUTES } from '../constants/routes.js';

export default function RequireAuth() {
  const { token, loading, error, retrySession, logout } = useAuth();
  if (loading) return <p role="status">로그인 정보를 확인하고 있습니다.</p>;
  if (!token) return <Navigate to={ROUTES.login} replace />;
  if (error)
    return (
      <section aria-label="로그인 확인 오류">
        <p role="alert">{error}</p>
        <button type="button" onClick={retrySession}>
          다시 시도
        </button>
        <button type="button" onClick={logout}>
          로그인 화면으로
        </button>
      </section>
    );
  return <Outlet />;
}
