import { useEffect, useState } from 'react';
import { getErrorMessage } from '../services/axiosInstance.ts';

type RequestState<T> =
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; errorMessage: string };

// 컴포넌트가 마운트될 때 request를 실행하고 로딩·오류·다시 시도 상태를 관리한다.
// request는 effect 의존성이므로 모듈 함수나 useCallback처럼 참조가 고정된 함수를 전달해야 한다.
export function useRequest<T>(request: () => Promise<T>) {
  const [state, setState] = useState<RequestState<T>>({ status: 'loading' });
  // 값을 바꾸면 다시 요청한다. (다시 시도)
  const [requestKey, setRequestKey] = useState(0);

  useEffect(() => {
    // 언마운트되었거나 다시 요청을 시작했다면 이전 응답은 반영하지 않는다.
    let isIgnored = false;

    request()
      .then((data) => {
        if (!isIgnored) setState({ status: 'success', data });
      })
      .catch((error: unknown) => {
        if (!isIgnored) setState({ status: 'error', errorMessage: getErrorMessage(error) });
      });

    return () => {
      isIgnored = true;
    };
  }, [request, requestKey]);

  const reload = () => {
    setState({ status: 'loading' });
    setRequestKey((key) => key + 1);
  };

  return {
    data: state.status === 'success' ? state.data : undefined,
    isLoading: state.status === 'loading',
    errorMessage: state.status === 'error' ? state.errorMessage : '',
    reload,
  };
}
