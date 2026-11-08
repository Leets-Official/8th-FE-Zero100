import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

import { getErrorMessage } from '../../api/getErrorMessage';
import { loginWithKakaoCode } from '../../api/authApi';
import AuthLoading from '../../components/auth/AuthLoading';
import { ROUTES } from '../../constants/routes';
import useAuth from '../../hooks/useAuth';

import './KakaoCallbackPage.css';

function KakaoCallbackPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { completeLogin } = useAuth();
  const [requestError, setRequestError] = useState('');
  // 개발 모드(StrictMode)에서 같은 인가코드로 API가 두 번 호출되지 않도록 막습니다.
  const hasRequested = useRef(false);

  const code = searchParams.get('code');
  const errorMessage =
    requestError || (code ? '' : '카카오 인가코드가 없습니다. 다시 로그인해주세요.');

  useEffect(() => {
    if (!code || hasRequested.current) return;
    hasRequested.current = true;

    loginWithKakaoCode(code)
      .then(async (data) => {
        await completeLogin(data);
        navigate(ROUTES.DASHBOARD, { replace: true });
      })
      .catch((error) => {
        const { status, data } = error.response ?? {};

        // 미가입 유저: 응답의 kakaoId를 들고 회원가입 화면으로 이동합니다.
        if (status === 401 && data?.error === 'unregistered') {
          navigate(ROUTES.SIGNUP, { replace: true, state: { kakaoId: data.kakaoId } });
          return;
        }

        setRequestError(getErrorMessage(error, '카카오 로그인에 실패했습니다.'));
      });
  }, [code, completeLogin, navigate]);

  if (!errorMessage) {
    return <AuthLoading message="카카오 로그인 처리 중입니다." />;
  }

  return (
    <main className="kakao-callback">
      <p className="kakao-callback__message" role="alert">
        {errorMessage}
      </p>
      <Link to={ROUTES.LOGIN} className="kakao-callback__link">
        로그인 화면으로 돌아가기
      </Link>
    </main>
  );
}

export default KakaoCallbackPage;
