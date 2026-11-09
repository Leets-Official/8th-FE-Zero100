import { Navigate, Outlet } from 'react-router';
import { useAuth } from '../context/AuthContext.ts';

// 인증 상태에 따른 페이지 접근 처리
// 기본: 로그인한 사용자만 접근, 아니면 /login으로 이동
// guestOnly: 로그인하지 않은 사용자만 접근, 로그인한 사용자는 /dashboard로 이동
// 저장된 토큰을 확인하는 동안에는 잘못 이동하지 않도록 아무것도 렌더링하지 않는다.
interface AuthRouteProps {
  guestOnly?: boolean;
}

function AuthRoute({ guestOnly = false }: AuthRouteProps) {
  const { isAuthenticated, isCheckingAuth } = useAuth();

  if (isCheckingAuth) return null;
  if (guestOnly) return isAuthenticated ? <Navigate to="/dashboard" replace /> : <Outlet />;
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}

export default AuthRoute;
