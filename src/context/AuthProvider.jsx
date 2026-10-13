import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';
import { authApi } from '../api/admin';
import { readSession, errorMessage, SESSION_EXPIRED_EVENT } from '../api/adminClient';

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState('');
  const [version, setVersion] = useState(0);
  const retry = useCallback(() => setVersion((v) => v + 1), []);
  const acceptUser = useCallback((nextUser) => {
    setUser(nextUser);
    setStatus('ready');
    setError('');
  }, []);
  useEffect(() => {
    const controller = new AbortController();
    let active = true;
    setStatus('loading');
    async function restore() {
      try {
        const current = readSession() ? await authApi.me({ signal: controller.signal }) : null;
        if (active) acceptUser(current);
      } catch (requestError) {
        if (!active || axios.isCancel(requestError)) return;
        if (requestError.response?.status === 401) acceptUser(null);
        else {
          setError(errorMessage(requestError));
          setStatus('error');
        }
      }
    }
    restore();
    return () => {
      active = false;
      controller.abort();
    };
  }, [version, acceptUser]);
  useEffect(() => {
    const expire = () => acceptUser(null);
    window.addEventListener(SESSION_EXPIRED_EVENT, expire);
    return () => window.removeEventListener(SESSION_EXPIRED_EVENT, expire);
  }, [acceptUser]);
  return (
    <AuthContext.Provider value={{ user, status, error, retry, acceptUser }}>
      {children}
    </AuthContext.Provider>
  );
}
