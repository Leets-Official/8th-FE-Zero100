import { createContext, useContext } from 'react';
import type { AuthUser, LoginRequest } from '../../types/auth.ts';

export interface AuthContextValue {
  // 로그인 응답의 user 또는 새로고침 시 내 정보 조회 결과. 로그인하지 않았으면 null
  user: AuthUser | null;
  isAuthenticated: boolean;
  // 저장된 토큰을 서버에 확인하는 중인지 여부
  isCheckingAuth: boolean;
  // 인증 만료, 새로고침 시 인증 확인 실패 등 로그인 화면에서 안내할 오류. 없으면 빈 문자열
  authError: string;
  login: (credentials: LoginRequest) => Promise<void>;
  logout: () => void;
}

// 로그인 사용자, 인증 확인 상태, 로그인·로그아웃을 앱 전체에서 공유한다.
export const AuthContext = createContext<AuthContextValue | null>(null);

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth는 AuthProvider 안에서 사용해야 합니다.');
  return context;
}
