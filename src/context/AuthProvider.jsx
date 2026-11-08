import { useEffect, useState } from 'react';
import { apiRequest } from '../api/client.js';
import { AuthContext } from './AuthContext.js';

const TOKEN_KEY = 'zero100-access-token';

function readToken() {
  try {
    return sessionStorage.getItem(TOKEN_KEY) || '';
  } catch {
    return '';
  }
}

export default function AuthProvider({ children }) {
  const [token, setToken] = useState(readToken);
  const [session, setSession] = useState({ token: '', user: null, error: '' });
  const [retry, setRetry] = useState(0);

  function logout() {
    sessionStorage.removeItem(TOKEN_KEY);
    setToken('');
    setSession({ token: '', user: null, error: '' });
  }

  async function login(email, password) {
    const data = await apiRequest('/api/auth/login', {
      method: 'POST',
      body: { email, password },
    });
    if (!data?.accessToken || !data?.user) throw new Error('로그인 응답을 확인할 수 없습니다.');
    sessionStorage.setItem(TOKEN_KEY, data.accessToken);
    setSession({ token: data.accessToken, user: data.user, error: '' });
    setToken(data.accessToken);
  }

  async function loginWithKakao(code) {
    const data = await apiRequest(`/api/auth/kakao/redirect?code=${encodeURIComponent(code)}`);
    if (!data?.accessToken || !data?.user)
      throw new Error('카카오 로그인 응답을 확인할 수 없습니다.');
    sessionStorage.setItem(TOKEN_KEY, data.accessToken);
    setSession({ token: data.accessToken, user: data.user, error: '' });
    setToken(data.accessToken);
  }

  useEffect(() => {
    if (!token) return;
    const controller = new AbortController();
    apiRequest('/api/auth/me', { token, signal: controller.signal })
      .then((user) => {
        if (!controller.signal.aborted) setSession({ token, user, error: '' });
      })
      .catch((error) => {
        if (controller.signal.aborted) return;
        if (error.status === 401 || error.status === 404) {
          sessionStorage.removeItem(TOKEN_KEY);
          setToken('');
          setSession({ token: '', user: null, error: '' });
        } else {
          setSession({ token, user: null, error: error.message });
        }
      });
    return () => controller.abort();
  }, [token, retry]);

  function retrySession() {
    setSession({ token: '', user: null, error: '' });
    setRetry((value) => value + 1);
  }

  async function updateName(name) {
    const user = await apiRequest('/api/auth/me', {
      token,
      method: 'PATCH',
      body: { name },
    });
    setSession((previous) => (previous.token === token ? { token, user, error: '' } : previous));
    setRetry((value) => value + 1);
    return user;
  }

  const value = {
    token,
    user: session.token === token ? session.user : null,
    loading: Boolean(token && session.token !== token),
    error: session.token === token ? session.error : '',
    login,
    loginWithKakao,
    logout,
    retrySession,
    updateName,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
