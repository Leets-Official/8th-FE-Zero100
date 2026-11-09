import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { kakaoLogin } from '../api/auth';
import { getErrorMessage } from '../api/client';
import { useAuth } from '../context/AuthContext';

const KakaoCallbackPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { loginWithToken } = useAuth();
  const [errorMessage, setErrorMessage] = useState('');
  const hasRequested = useRef(false);
  const code = searchParams.get('code');

  useEffect(() => {
    if (!code || hasRequested.current) return;
    hasRequested.current = true;

    const handleKakaoLogin = async () => {
      try {
        const data = await kakaoLogin(code);
        await loginWithToken(data.accessToken);
        navigate('/', { replace: true });
      } catch (error) {
        const body = error.response?.data;
        if (error.response?.status === 401 && body?.error === 'unregistered') {
          navigate('/signup', { replace: true, state: { kakaoId: body.kakaoId } });
          return;
        }
        setErrorMessage(getErrorMessage(error, '카카오 로그인에 실패했습니다'));
      }
    };

    handleKakaoLogin();
  }, [code, loginWithToken, navigate]);

  const message = !code ? '카카오 인가코드가 없습니다' : errorMessage;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#F9FAFB]">
      {message ? (
        <>
          <p role="alert" className="text-sm text-red-500">
            {message}
          </p>
          <Link to="/login" className="text-sm text-black underline">
            로그인 화면으로
          </Link>
        </>
      ) : (
        <p className="text-sm text-gray-500">카카오 로그인 중...</p>
      )}
    </div>
  );
};

export default KakaoCallbackPage;
