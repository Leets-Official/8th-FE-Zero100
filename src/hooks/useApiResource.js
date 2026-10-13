import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { getApiErrorMessage } from '../api/client';

// loadResource는 모듈에서 선언한 함수 또는 useCallback으로 고정한 함수를 전달합니다.
export function useApiResource(loadResource) {
  const [requestVersion, setRequestVersion] = useState(0);
  const [resource, setResource] = useState({ status: 'loading', data: null, error: '' });
  const reload = useCallback(() => setRequestVersion((version) => version + 1), []);

  useEffect(() => {
    const controller = new AbortController();
    let isCurrentRequest = true;
    setResource({ status: 'loading', data: null, error: '' });

    async function load() {
      try {
        const data = await loadResource({ signal: controller.signal });
        if (isCurrentRequest) setResource({ status: 'success', data, error: '' });
      } catch (error) {
        if (!isCurrentRequest || axios.isCancel(error)) return;
        setResource({ status: 'error', data: null, error: getApiErrorMessage(error) });
      }
    }
    load();
    // 이전 요청이 늦게 완료되더라도 새 화면의 데이터를 덮어쓰지 않게 합니다.
    return () => {
      isCurrentRequest = false;
      controller.abort();
    };
  }, [loadResource, requestVersion]);

  return { ...resource, reload };
}
