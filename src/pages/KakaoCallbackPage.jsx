import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router';

import { loginWithKakaoCode } from '../api/auth';
import { ROUTES } from '../constants/routes';
import { setAccessToken } from '../utils/authStorage';
import { getApiErrorMessage } from '../utils/getApiErrorMessage';

function KakaoCallbackPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState('');

  const requestRef = useRef(null);

  const code = searchParams.get('code');
  const kakaoError = searchParams.get('error');

  useEffect(() => {
    if (kakaoError || !code) return;

    let active = true;

    if (!requestRef.current) {
      requestRef.current = loginWithKakaoCode(code);
    }

    async function completeLogin() {
      try {
        const result = await requestRef.current;

        if (!active) return;

        if (typeof result?.accessToken !== 'string' || !result.accessToken.trim()) {
          setMessage('로그인 응답을 확인하지 못했습니다.');
          return;
        }

        setAccessToken(result.accessToken);

        navigate(ROUTES.DASHBOARD, {
          replace: true,
        });
      } catch (error) {
        if (!active) return;

        const responseData = error.response?.data;

        if (
          error.response?.status === 401 &&
          responseData?.error === 'unregistered' &&
          typeof responseData.kakaoId === 'string' &&
          responseData.kakaoId
        ) {
          navigate(ROUTES.SIGNUP, {
            replace: true,
            state: {
              kakaoId: responseData.kakaoId,
            },
          });

          return;
        }

        setMessage(getApiErrorMessage(error, '카카오 로그인에 실패했습니다.'));
      }
    }

    completeLogin();

    return () => {
      active = false;
    };
  }, [code, kakaoError, navigate]);

  const errorMessage = kakaoError
    ? '카카오 로그인이 취소되었거나 승인되지 않았습니다.'
    : !code
      ? '카카오 인증 코드가 없습니다.'
      : message;

  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-[16px] bg-[#F9FAFB] p-[24px]">
      <h1 className="text-[24px] font-bold text-[#000000]">카카오 로그인</h1>

      <p role="status" className="text-[14px] text-[#364153]">
        {errorMessage || '카카오 로그인을 처리하고 있습니다.'}
      </p>

      {errorMessage && (
        <Link
          to={ROUTES.LOGIN}
          replace
          className="rounded-[4px] text-[14px] text-[#000000] underline focus-visible:outline-2 focus-visible:outline-[#364153]"
        >
          로그인 화면으로
        </Link>
      )}
    </main>
  );
}

export default KakaoCallbackPage;
