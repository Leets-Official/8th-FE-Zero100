import { useCallback, useEffect, useMemo, useState } from 'react';

import * as authApi from '../api/authApi';
import { getAccessToken, removeAccessToken, saveAccessToken } from '../api/tokenStorage';
import AuthContext from './AuthContext';

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  // 저장된 토큰이 있으면 새로고침 후에도 로그인 상태를 복원해야 하므로, 확인이 끝날 때까지 로딩 상태로 시작합니다.
  const [isLoading, setIsLoading] = useState(() => Boolean(getAccessToken()));

  useEffect(() => {
    if (!getAccessToken()) return undefined;

    let ignore = false;

    authApi
      .getMe()
      .then((me) => {
        if (!ignore) setUser(me);
      })
      .catch(() => {
        // 401이면 axios 공통 처리에서 토큰을 지웁니다. 여기서는 로그아웃 상태로만 둡니다.
        if (!ignore) setUser(null);
      })
      .finally(() => {
        if (!ignore) setIsLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, []);

  // 토큰을 저장하고 내 정보를 불러와 로그인 상태로 만듭니다. (로그인 응답의 user에는 가입일이 없어 getMe를 한 번 더 호출)
  const completeLogin = useCallback(async ({ accessToken }) => {
    saveAccessToken(accessToken);

    try {
      setUser(await authApi.getMe());
    } catch (error) {
      removeAccessToken();
      throw error;
    }
  }, []);

  const login = useCallback(
    async (credentials) => {
      await completeLogin(await authApi.login(credentials));
    },
    [completeLogin],
  );

  const logout = useCallback(() => {
    removeAccessToken();
    setUser(null);
  }, []);

  // 이름 수정 등으로 바뀐 내 정보를 화면 전체에 반영합니다.
  // 요청 도중 로그아웃(또는 다른 계정으로 재로그인)했다면, 늦게 도착한 응답이 로그인 상태를 되살리지 않도록
  // "응답이 도착한 시점의 최신 user"를 기준으로 같은 사용자일 때만 반영합니다.
  const updateUser = useCallback((nextUser) => {
    setUser((previous) => {
      if (!previous) return previous;
      if (nextUser?.id && nextUser.id !== previous.id) return previous;

      return { ...previous, ...nextUser };
    });
  }, []);

  const value = useMemo(
    () => ({ user, isLoading, login, logout, completeLogin, updateUser }),
    [user, isLoading, login, logout, completeLogin, updateUser],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
