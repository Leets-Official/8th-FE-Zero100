import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { errorMessage } from '../api/adminClient';

export function useAdminResource(load) {
  const [version, setVersion] = useState(0);
  const [state, setState] = useState({ status: 'loading', data: null, error: '' });
  const reload = useCallback(() => setVersion((v) => v + 1), []);
  useEffect(() => {
    const controller = new AbortController();
    let active = true;
    setState({ status: 'loading', data: null, error: '' });
    load({ signal: controller.signal })
      .then((data) => {
        if (active) setState({ status: 'success', data, error: '' });
      })
      .catch((error) => {
        if (active && !axios.isCancel(error))
          setState({ status: 'error', data: null, error: errorMessage(error) });
      });
    return () => {
      active = false;
      controller.abort();
    };
  }, [load, version]);
  return { ...state, reload };
}
