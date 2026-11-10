import { useEffect, useState } from 'react';
import { getErrorMessage } from '../services/axiosInstance.ts';

type RequestState<T> =
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; errorMessage: string };

// 컴포넌트가 마운트될 때 request를 실행하고 로딩·오류·다시 시도 상태를 관리한다.
// request는 effect 의존성이므로 모듈 함수나 useCallback처럼 참조가 고정된 함수를 전달해야 한다.
// 언마운트되거나 다시 요청하면 이전 요청을 signal로 취소하고, 이미 도착한 응답도 반영하지 않는다.
export function useRequest<T>(request: (signal: AbortSignal) => Promise<T>) {
  const [state, setState] = useState<RequestState<T>>({ status: 'loading' });
  // 값을 바꾸면 다시 요청한다. (다시 시도)
  const [requestKey, setRequestKey] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    request(signal)
      .then((data) => {
        if (!signal.aborted) setState({ status: 'success', data });
      })
      .catch((error: unknown) => {
        // 취소된 요청의 실패(취소 오류 포함)는 오류 상태로 바꾸지 않는다.
        if (!signal.aborted) setState({ status: 'error', errorMessage: getErrorMessage(error) });
      });

    return () => controller.abort();
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
