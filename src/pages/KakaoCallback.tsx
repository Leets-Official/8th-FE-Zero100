import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { api } from '../api/client';

export default function KakaoCallback() {
  const navigate = useNavigate();
  const started = useRef(false);
  const [message, setMessage] = useState('카카오 로그인 처리 중입니다.');

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');

    if (!code) {
      setMessage('카카오 인증 코드가 없습니다. 다시 로그인해 주세요.');
      return;
    }

    async function completeKakaoLogin() {
      try {
        const res = await api.get('/api/auth/kakao/redirect', {
          params: { code },
        });

        const accessToken = res.data?.data?.accessToken;

        if (!accessToken) {
          setMessage('로그인 토큰을 받지 못했습니다. 다시 시도해 주세요.');
          return;
        }

        localStorage.setItem('accessToken', accessToken);
        navigate('/dashboard', { replace: true });
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const body = error.response?.data as
            | { error?: string; kakaoId?: string }
            | undefined;

          if (
            error.response?.status === 401 &&
            body?.error === 'unregistered' &&
            body.kakaoId
          ) {
            navigate('/signup', {
              replace: true,
              state: { kakaoId: body.kakaoId },
            });
            return;
          }

          setMessage(body?.error ?? '카카오 로그인에 실패했습니다.');
          return;
        }

        setMessage('카카오 로그인에 실패했습니다.');
      }
    }

    void completeKakaoLogin();
  }, [navigate]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <p className="text-center text-sm text-gray-700">{message}</p>
    </main>
  );
}
