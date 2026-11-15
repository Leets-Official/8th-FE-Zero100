import { Navigate, Outlet } from 'react-router-dom';
import { getToken } from '../../api/token';
import { ROUTES } from '../../constants/routes';

function RequireAuth() {
  if (!getToken()) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }
  return <Outlet />;
}

export default RequireAuth;
