import { useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import useAuth from '../context/useAuth.js';
import { ROUTES } from '../constants/routes.js';

function KakaoCallbackPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { loginWithKakao } = useAuth();
  const started = useRef(false);
  const code = searchParams.get('code');

  useEffect(() => {
    if (started.current) return;
    started.current = true;
    if (!code) {
      navigate(ROUTES.login, {
        replace: true,
        state: { message: '카카오 인증 정보를 받지 못했습니다. 다시 시도해주세요.' },
      });
      return;
    }
    loginWithKakao(code)
      .then(() => navigate(ROUTES.dashboard, { replace: true }))
      .catch((error) => {
        if (error.status === 401 && error.kakaoId) {
          navigate(ROUTES.signup, { replace: true, state: { kakaoId: error.kakaoId } });
          return;
        }
        navigate(ROUTES.login, { replace: true, state: { message: error.message } });
      });
  }, [code, loginWithKakao, navigate]);

  return <p role="status">카카오 로그인 정보를 확인하고 있습니다.</p>;
}

export default KakaoCallbackPage;
