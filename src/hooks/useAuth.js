import { useContext } from 'react';

import AuthContext from '../contexts/AuthContext';

function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth는 AuthProvider 안에서만 사용할 수 있습니다.');
  }

  return context;
}

export default useAuth;
