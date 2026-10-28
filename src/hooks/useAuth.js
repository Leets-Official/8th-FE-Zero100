import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('AuthProvider가 필요합니다.');
  return context;
}
