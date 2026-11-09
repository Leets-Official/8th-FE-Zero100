import { createContext, useContext } from 'react';
import type { CurrentUser, LoginRequest } from '../types.ts';

export interface AuthContextValue {
  // 로그인 응답의 user 또는 내 정보 조회·이름 수정 결과. 로그인하지 않았으면 null
  // 사용자 정보는 이 값 하나로 관리하고 대시보드·마이페이지가 함께 읽는다.
  user: CurrentUser | null;
  isAuthenticated: boolean;
  // 저장된 토큰을 서버에 확인하는 중인지 여부
  isCheckingAuth: boolean;
  // 인증 만료, 새로고침 시 인증 확인 실패 등 로그인 화면에서 안내할 오류. 없으면 빈 문자열
  authError: string;
  login: (credentials: LoginRequest) => Promise<void>;
  // 카카오 콜백에서 받은 인가코드로 로그인. 실패하면 ApiError를 그대로 던진다.
  loginWithKakao: (code: string) => Promise<void>;
  logout: () => void;
  // 서버에서 내 정보를 다시 조회해 user를 갱신. 실패하면 ApiError를 던진다.
  refreshUser: () => Promise<void>;
  // 이름 수정 요청이 성공하면 응답의 사용자 정보로 user를 갱신. 실패하면 user는 그대로 두고 ApiError를 던진다.
  updateName: (name: string) => Promise<void>;
}

// 로그인 사용자, 인증 확인 상태, 로그인·로그아웃을 앱 전체에서 공유한다.
export const AuthContext = createContext<AuthContextValue | null>(null);

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth는 AuthProvider 안에서 사용해야 합니다.');
  return context;
}
