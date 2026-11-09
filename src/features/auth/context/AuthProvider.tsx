import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import * as authApi from '../api/authApi.ts';
import {
  ApiError,
  getErrorMessage,
  setUnauthorizedHandler,
} from '../../../services/axiosInstance.ts';
import * as kakaoApi from '../api/kakaoApi.ts';
import type { CurrentUser, LoginRequest, LoginResponse } from '../types.ts';
import {
  loadAccessToken,
  removeAccessToken,
  saveAccessToken,
} from '../../../services/tokenStorage.ts';
import { AuthContext, type AuthContextValue } from './AuthContext.ts';

const SESSION_EXPIRED_MESSAGE = '로그인이 만료되었습니다. 다시 로그인해주세요.';

// checking: 저장된 토큰을 서버에 확인 중
type AuthStatus = 'checking' | 'authenticated' | 'unauthenticated';

interface AuthProviderProps {
  children: ReactNode;
}

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [status, setStatus] = useState<AuthStatus>(() =>
    loadAccessToken() ? 'checking' : 'unauthenticated',
  );
  // 인증 만료, 새로고침 시 인증 확인 실패 등 로그인 화면에서 안내할 오류
  const [authError, setAuthError] = useState('');
  // 로그인·로그아웃할 때마다 바뀌는 값. 요청 중에 로그아웃하거나 다른 계정으로 로그인했다면
  // 이전 계정의 응답으로 user를 덮어쓰지 않도록 요청 시작 시점의 값과 비교한다.
  const sessionIdRef = useRef(0);

  // 토큰을 담아 보낸 요청이 401을 받으면 토큰을 지우고 로그아웃 상태로 전환
  // 인증 페이지 접근 처리(AuthRoute)가 로그인 페이지로 이동시킨다.
  useEffect(() => {
    setUnauthorizedHandler(() => {
      sessionIdRef.current += 1;
      removeAccessToken();
      setUser(null);
      setStatus('unauthenticated');
      setAuthError(SESSION_EXPIRED_MESSAGE);
    });
    return () => setUnauthorizedHandler(null);
  }, []);

  // 새로고침 시 저장된 토큰이 유효한지 내 정보 조회 API로 확인해 로그인 상태를 복원
  useEffect(() => {
    if (status !== 'checking') return;
    let isIgnored = false;

    authApi
      .fetchMe()
      .then((me) => {
        if (isIgnored) return;
        setUser(me);
        setStatus('authenticated');
      })
      .catch((error: unknown) => {
        if (isIgnored) return;
        // 401은 unauthorizedHandler가 처리. 그 외(네트워크·서버 오류)는 토큰을 유지해 다음 접속 때 다시 확인
        if (error instanceof ApiError && error.status === 401) return;
        setStatus('unauthenticated');
        setAuthError(getErrorMessage(error));
      });

    return () => {
      isIgnored = true;
    };
  }, [status]);

  // 일반 로그인과 카카오 로그인은 응답 형식({ accessToken, user })이 같아 같은 방식으로 인증 상태를 저장
  const applyLogin = ({ accessToken, user: loggedInUser }: LoginResponse) => {
    sessionIdRef.current += 1;
    saveAccessToken(accessToken);
    setUser(loggedInUser);
    setStatus('authenticated');
    setAuthError('');
  };

  const login = async (credentials: LoginRequest) => {
    applyLogin(await authApi.login(credentials));
  };

  const loginWithKakao = async (code: string) => {
    applyLogin(await kakaoApi.loginWithKakao(code));
  };

  // Swagger에 로그아웃 API가 없으므로 저장된 토큰과 인증 상태만 초기화
  const logout = () => {
    sessionIdRef.current += 1;
    removeAccessToken();
    setUser(null);
    setStatus('unauthenticated');
    setAuthError('');
  };

  // 페이지에서 effect 의존성으로 쓰므로 참조를 고정한다.
  const refreshUser = useCallback(async () => {
    const sessionId = sessionIdRef.current;
    const me = await authApi.fetchMe();
    if (sessionId === sessionIdRef.current) setUser(me);
  }, []);

  // PATCH /api/auth/me는 수정된 User를 반환하므로 다시 조회하지 않고 응답으로 갱신
  const updateName = useCallback(async (name: string) => {
    const sessionId = sessionIdRef.current;
    const updatedUser = await authApi.updateMyName({ name });
    if (sessionId === sessionIdRef.current) setUser(updatedUser);
  }, []);

  const value: AuthContextValue = {
    user,
    isAuthenticated: status === 'authenticated',
    isCheckingAuth: status === 'checking',
    authError,
    login,
    loginWithKakao,
    logout,
    refreshUser,
    updateName,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
