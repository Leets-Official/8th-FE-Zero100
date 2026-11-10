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
  isAccessTokenStorageEvent,
  loadAccessToken,
  removeAccessToken,
  saveAccessToken,
} from '../../../services/tokenStorage.ts';
import { createRequestSequencer } from '../../../utils/requestSequencer.ts';
import { AuthContext, type AuthContextValue } from './AuthContext.ts';

const SESSION_EXPIRED_MESSAGE = '로그인이 만료되었습니다. 다시 로그인해주세요.';

// checking: 저장된 토큰을 서버에 확인 중
type AuthStatus = 'checking' | 'authenticated' | 'unauthenticated';

// 응답을 받지 못했거나(네트워크·시간 초과) 서버 오류라면 서버에 변경이 반영됐는지 알 수 없다.
function isUncertainFailure(error: unknown): boolean {
  return !(error instanceof ApiError) || error.status === null || error.status >= 500;
}

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
  // sessionIdRef와 같은 값. 세션이 바뀌면 저장된 토큰 확인을 다시 실행하기 위한 effect 의존성
  const [sessionKey, setSessionKey] = useState(0);
  // 같은 세션 안에서 내 정보 조회·수정 요청의 응답 순서가 뒤바뀌어도
  // 먼저 시작한 조회 응답이 최신 사용자 정보를 덮어쓰지 않도록 요청 순서를 기록한다.
  const [userRequests] = useState(createRequestSequencer);

  const startNewSession = useCallback(() => {
    sessionIdRef.current += 1;
    setSessionKey(sessionIdRef.current);
  }, []);

  // 토큰을 담아 보낸 요청이 401을 받으면 토큰을 지우고 로그아웃 상태로 전환
  // 인증 페이지 접근 처리(AuthRoute)가 로그인 페이지로 이동시킨다.
  useEffect(() => {
    setUnauthorizedHandler(() => {
      startNewSession();
      removeAccessToken();
      setUser(null);
      setStatus('unauthenticated');
      setAuthError(SESSION_EXPIRED_MESSAGE);
    });
    return () => setUnauthorizedHandler(null);
  }, [startNewSession]);

  // 다른 탭에서 로그인·로그아웃해 저장된 토큰이 바뀌면 이 탭도 새 세션으로 전환한다.
  // 토큰이 있으면 그 토큰으로 내 정보를 다시 확인하고, 없으면 로그아웃 상태로 바꾼다.
  // (이 탭의 화면은 이전 계정인데 요청은 새 토큰으로 보내지는 불일치를 막는다.)
  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (!isAccessTokenStorageEvent(event)) return;
      startNewSession();
      setUser(null);
      setAuthError('');
      setStatus(loadAccessToken() ? 'checking' : 'unauthenticated');
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [startNewSession]);

  // 새로고침 시 저장된 토큰이 유효한지 내 정보 조회 API로 확인해 로그인 상태를 복원
  useEffect(() => {
    if (status !== 'checking') return;
    const controller = new AbortController();
    const sessionId = sessionKey;
    // effect가 정리됐거나(언마운트·재실행) 확인 중 세션이 바뀌었다면 응답을 반영하지 않는다.
    const isCurrent = () => !controller.signal.aborted && sessionId === sessionIdRef.current;

    authApi
      .fetchMe(controller.signal)
      .then((me) => {
        if (!isCurrent()) return;
        setUser(me);
        setStatus('authenticated');
      })
      .catch((error: unknown) => {
        if (!isCurrent()) return;
        // 401은 unauthorizedHandler가 처리. 그 외(네트워크·서버 오류)는 토큰을 유지해 다음 접속 때 다시 확인
        if (error instanceof ApiError && error.status === 401) return;
        setStatus('unauthenticated');
        setAuthError(getErrorMessage(error));
      });

    return () => controller.abort();
  }, [status, sessionKey]);

  // 일반 로그인과 카카오 로그인은 응답 형식({ accessToken, user })이 같아 같은 방식으로 인증 상태를 저장
  const applyLogin = ({ accessToken, user: loggedInUser }: LoginResponse) => {
    startNewSession();
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
    startNewSession();
    removeAccessToken();
    setUser(null);
    setStatus('unauthenticated');
    setAuthError('');
  };

  // 페이지에서 effect 의존성으로 쓰므로 참조를 고정한다.
  // 1) 다른 세션에서 시작한 요청이면 반영하지 않는다. (기존 세션 검사)
  // 2) 같은 세션이라도 이 조회보다 나중에 시작한 조회가 이미 반영됐거나,
  //    조회 중에 이름 수정 등 변경 요청이 성공했다면 오래된 값이므로 반영하지 않는다.
  const refreshUser = useCallback(
    async (signal?: AbortSignal) => {
      const sessionId = sessionIdRef.current;
      const ticket = userRequests.startRead();
      const me = await authApi.fetchMe(signal);
      if (sessionId === sessionIdRef.current && ticket.commit()) setUser(me);
    },
    [userRequests],
  );

  // PATCH /api/auth/me는 수정된 User를 반환하므로 다시 조회하지 않고 응답으로 갱신
  // 성공 응답은 서버 처리 결과이므로 진행 중인 조회 응답보다 우선하고, 수정 요청이 여러 번이면
  // 마지막에 시작한 요청의 결과만 반영한다.
  const updateName = useCallback(
    async (name: string) => {
      const sessionId = sessionIdRef.current;
      const ticket = userRequests.startWrite();
      try {
        const updatedUser = await authApi.updateMyName({ name });
        if (sessionId === sessionIdRef.current && ticket.commit()) setUser(updatedUser);
      } catch (error) {
        // 시간 초과·서버 오류처럼 수정 여부를 알 수 없으면 서버 값을 다시 조회해 화면과 맞춘다.
        // (조회 실패는 무시하고, 수정 실패 오류는 그대로 던져 폼에 표시한다.)
        if (sessionId === sessionIdRef.current && isUncertainFailure(error)) {
          refreshUser().catch(() => {});
        }
        throw error;
      }
    },
    [refreshUser, userRequests],
  );

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
