import { useEffect, useState } from 'react';
import { getErrorMessage } from '../../api/axiosInstance.ts';
import { useAuth } from '../../contexts/dashboard/AuthContext.ts';

type MyInfoState =
  { status: 'loading' } | { status: 'success' } | { status: 'error'; message: string };

// 페이지 진입 시 서버에서 내 정보를 다시 조회해 AuthContext의 user를 최신으로 맞춘다.
// 사용자 정보 자체는 AuthContext의 user 하나로 관리하고, 이 훅은 조회 상태(로딩·오류)만 다룬다.
// 401은 공통 인증 만료 처리가 로그인 페이지로 이동시킨다.
export function useMyInfo() {
  const { refreshUser } = useAuth();
  const [state, setState] = useState<MyInfoState>({ status: 'loading' });
  // 값을 바꾸면 다시 조회한다. (다시 시도)
  const [requestKey, setRequestKey] = useState(0);

  useEffect(() => {
    let isIgnored = false;

    refreshUser()
      .then(() => {
        if (!isIgnored) setState({ status: 'success' });
      })
      .catch((error: unknown) => {
        if (!isIgnored) setState({ status: 'error', message: getErrorMessage(error) });
      });

    return () => {
      isIgnored = true;
    };
  }, [refreshUser, requestKey]);

  const reload = () => {
    setState({ status: 'loading' });
    setRequestKey((key) => key + 1);
  };

  return {
    isLoading: state.status === 'loading',
    errorMessage: state.status === 'error' ? state.message : '',
    reload,
  };
}
