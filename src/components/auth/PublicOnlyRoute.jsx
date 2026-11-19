import { Navigate, Outlet } from 'react-router-dom';

import { ROUTES } from '../../constants/routes';
import useAuth from '../../hooks/useAuth';
import AuthLoading from './AuthLoading';

// 로그인/회원가입처럼 로그인하지 않은 사용자만 볼 화면을 감쌉니다.
function PublicOnlyRoute() {
  const { user, isLoading } = useAuth();

  if (isLoading) return <AuthLoading />;
  if (user) return <Navigate to={ROUTES.DASHBOARD} replace />;

  return <Outlet />;
}

export default PublicOnlyRoute;
