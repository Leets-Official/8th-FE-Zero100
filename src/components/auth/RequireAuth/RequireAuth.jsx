import { Navigate, useLocation } from 'react-router';
import { ROUTES } from '../../../constants/routes';
import { getAccessToken } from '../../../utils/tokenStorage';

/**
 * 로그인해야 볼 수 있는 화면을 감싼다. 토큰이 없으면 로그인 화면으로 보내고,
 * 로그인한 뒤 원래 가려던 주소로 돌아올 수 있게 from에 지금 주소를 담아 둔다.
 */
function RequireAuth({ children }) {
  const location = useLocation();

  if (!getAccessToken()) {
    return <Navigate to={ROUTES.LOGIN} replace state={{ from: location.pathname }} />;
  }

  return children;
}

export default RequireAuth;
