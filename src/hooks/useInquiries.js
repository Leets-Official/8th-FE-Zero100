import { useEffect, useState } from 'react';
import { apiRequest } from '../api/client.js';
import useAuth from '../context/useAuth.js';

export default function useInquiries() {
  const { token } = useAuth();
  const [attempt, setAttempt] = useState(0);
  const [result, setResult] = useState(null);
  useEffect(() => {
    const controller = new AbortController();
    apiRequest('/api/inquiries', { token, signal: controller.signal })
      .then((data) => {
        if (!Array.isArray(data)) throw new Error('문의 목록을 확인할 수 없습니다.');
        if (!controller.signal.aborted) setResult({ token, attempt, data, error: '', status: 200 });
      })
      .catch((error) => {
        if (!controller.signal.aborted)
          setResult({ token, attempt, data: [], error: error.message, status: error.status });
      });
    return () => controller.abort();
  }, [token, attempt]);
  const current = result?.token === token && result?.attempt === attempt;
  return {
    inquiries: current ? result.data : [],
    loading: !current,
    error: current ? result.error : '',
    status: current ? result.status : null,
    reload: () => setAttempt((value) => value + 1),
  };
}
