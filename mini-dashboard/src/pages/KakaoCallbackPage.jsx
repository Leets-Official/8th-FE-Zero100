import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { exchangeKakaoCode } from '../api/auth.js';
import { getApiError } from '../api/client.js';
import { useDashboard } from '../hooks/useDashboard.js';

function KakaoCallbackPage() {
  const [code] = useState(() => new URLSearchParams(window.location.search).get('code'));
  const [error, setError] = useState('');
  const { acceptToken } = useDashboard();
  const navigate = useNavigate();
  useEffect(() => {
    if (!code) return;
    let active = true;
    window.history.replaceState(null, '', window.location.pathname);
    exchangeKakaoCode(code)
      .then(({ data }) => {
        if (!active) return;
        acceptToken(data?.data?.accessToken);
        navigate('/', { replace: true });
      })
      .catch((err) => {
        if (!active) return;
        if (err.response?.data?.error === 'unregistered' && err.response.data.kakaoId) {
          navigate('/signup', { replace: true, state: { kakaoId: err.response.data.kakaoId } });
        } else setError(getApiError(err));
      });
    return () => {
      active = false;
    };
  }, [code, navigate, acceptToken]);
  return (
    <main className="grid min-h-dvh place-items-center p-6">
      <div>
        {!code || error ? (
          <>
            <p role="alert">{error || '카카오 인증 코드를 받지 못했습니다.'}</p>
            <Link to="/login" className="underline">
              로그인으로 돌아가기
            </Link>
          </>
        ) : (
          <p role="status">카카오 로그인 처리 중입니다.</p>
        )}
      </div>
    </main>
  );
}
export default KakaoCallbackPage;
