import { Navigate, Outlet, useLocation } from 'react-router';
import { useAuth } from '../../hooks/useAuth';

export default function GuestRoute() {
  const { user } = useAuth();
  const location = useLocation();
  const from = location.state?.from;
  const destination =
    typeof from === 'string' && /^\/(?:inquiries(?:\/[^?#]*)?|mypage)?$/.test(from) ? from : '/';
  return user ? <Navigate to={destination} replace /> : <Outlet />;
}
