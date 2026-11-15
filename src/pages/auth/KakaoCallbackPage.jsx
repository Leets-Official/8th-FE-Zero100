import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import AuthLayout from '../../components/auth/AuthLayout';
import { ROUTES } from '../../constants/routes';
import { kakaoLogin } from '../../api/auth';
import { getErrorMessage } from '../../api/client';
import { setToken } from '../../api/token';

function KakaoCallbackPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [error, setError] = useState('');
  const isRequested = useRef(false);
  const code = searchParams.get('code');
  const message = code ? error : '카카오 인증 정보가 없습니다.';

  useEffect(() => {
    if (!code || isRequested.current) return;
    isRequested.current = true;

    kakaoLogin(code)
      .then(({ accessToken }) => {
        setToken(accessToken);
        navigate(ROUTES.DASHBOARD, { replace: true });
      })
      .catch((err) => {
        const kakaoId = err.response?.data?.kakaoId;
        if (err.response?.status === 401 && kakaoId) {
          navigate(ROUTES.SIGNUP, { replace: true, state: { kakaoId } });
          return;
        }
        setError(getErrorMessage(err, '카카오 로그인에 실패했습니다.'));
      });
  }, [code, navigate]);

  return (
    <AuthLayout title="카카오 로그인">
      {message ? (
        <div className="flex flex-col items-center gap-4">
          <p role="alert" className="text-center text-sm leading-5 text-red-500">
            {message}
          </p>
          <Link to={ROUTES.LOGIN} className="text-sm leading-5 text-black underline">
            로그인 화면으로 돌아가기
          </Link>
        </div>
      ) : (
        <p className="text-center text-sm leading-5 text-gray-600">로그인 중입니다...</p>
      )}
    </AuthLayout>
  );
}

export default KakaoCallbackPage;
