import { useContext } from 'react';
import { AuthContext } from './AuthContext.js';

export default function useAuth() {
  const auth = useContext(AuthContext);
  if (!auth) throw new Error('AuthProvider 안에서 사용해야 합니다.');
  return auth;
}
