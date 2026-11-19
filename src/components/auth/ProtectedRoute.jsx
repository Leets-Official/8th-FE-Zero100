import { Navigate, Outlet } from 'react-router-dom';

import { ROUTES } from '../../constants/routes';
import useAuth from '../../hooks/useAuth';
import AuthLoading from './AuthLoading';

// 로그인한 사용자만 접근할 수 있는 화면을 감쌉니다.
function ProtectedRoute() {
  const { user, isLoading } = useAuth();

  if (isLoading) return <AuthLoading />;
  if (!user) return <Navigate to={ROUTES.LOGIN} replace />;

  return <Outlet />;
}

export default ProtectedRoute;
