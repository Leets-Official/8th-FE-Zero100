import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { authApi } from '../../api/admin';
import { errorMessage } from '../../api/adminClient';
import { useAuth } from '../../hooks/useAuth';
import FormError from '../common/FormError';

export default function AdminHeader() {
  const { acceptUser } = useAuth();
  const navigate = useNavigate();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');
  async function logout() {
    if (pending) return;
    setPending(true);
    setError('');
    try {
      await authApi.logout();
      acceptUser(null);
      navigate('/login', { replace: true });
    } catch (requestError) {
      setError(errorMessage(requestError));
      setPending(false);
    }
  }
  return (
    <>
      <header className="admin-header">
        <Link to="/" className="admin-brand">
          ZERO100 Admin
        </Link>
        <button type="button" className="logout-button" onClick={logout} disabled={pending}>
          {pending ? '로그아웃 중...' : '로그아웃'}
        </button>
      </header>
      {error && (
        <div className="header-error">
          <FormError message={error} />
        </div>
      )}
    </>
  );
}
