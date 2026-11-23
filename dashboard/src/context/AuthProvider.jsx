import { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { getMe } from '../api/auth';
import { clearToken, getToken, setToken } from '../api/token';

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(() => Boolean(getToken()));

  useEffect(() => {
    if (!getToken()) return;
    getMe()
      .then(setUser)
      .catch(() => clearToken())
      .finally(() => setIsLoading(false));
  }, []);

  const loginWithToken = async (accessToken) => {
    setToken(accessToken);
    const me = await getMe();
    setUser(me);
  };

  const logout = () => {
    clearToken();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, isLoading, loginWithToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
