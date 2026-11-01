import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { inquiryErrorMessage } from '../api/inquiryClient';
import type { ApiOptions } from '../types/inquiry';

type Resource<T> =
  | { status: 'loading'; data: null; error: '' }
  | { status: 'success'; data: T; error: '' }
  | { status: 'error'; data: null; error: string };

export function useResource<T>(load: (options?: ApiOptions) => Promise<T>) {
  const [resource, setResource] = useState<Resource<T>>({
    status: 'loading',
    data: null,
    error: '',
  });
  const [version, setVersion] = useState(0);
  const reload = useCallback(() => setVersion((previous) => previous + 1), []);
  useEffect(() => {
    const controller = new AbortController();
    let active = true;
    setResource({ status: 'loading', data: null, error: '' });
    load({ signal: controller.signal })
      .then((data) => {
        if (active) setResource({ status: 'success', data, error: '' });
      })
      .catch((error: unknown) => {
        if (active && !axios.isCancel(error))
          setResource({ status: 'error', data: null, error: inquiryErrorMessage(error) });
      });
    return () => {
      active = false;
      controller.abort();
    };
  }, [load, version]);
  return { ...resource, reload };
}
