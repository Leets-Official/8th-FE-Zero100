import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router';
import { loginWithKakao } from '../../api/authApi';
import AuthCard from '../../components/auth/AuthCard/AuthCard';
import { ROUTES } from '../../constants/routes';
import { getErrorMessage } from '../../utils/getErrorMessage';
import { saveAccessToken } from '../../utils/tokenStorage';

/**
 * 카카오 로그인을 마치면 카카오가 이 페이지로 ?code=... 를 붙여 돌려보낸다.
 * code로 서버에 로그인하고, 가입하지 않은 카카오 계정이면 회원가입 화면으로 kakaoId를 넘긴다.
 */
function KakaoCallbackPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');
  // 사용자가 카카오 동의 화면에서 취소하면 code 대신 error가 붙어서 온다.
  const [errorMessage, setErrorMessage] = useState(
    code ? '' : '카카오 로그인이 취소되었거나 실패했어요.',
  );
  // 인가 코드는 한 번만 쓸 수 있다. 개발 모드(StrictMode)에서 effect가 두 번 실행돼도 한 번만 요청한다.
  const hasRequestedRef = useRef(false);

  useEffect(() => {
    if (!code || hasRequestedRef.current) return;
    hasRequestedRef.current = true;

    loginWithKakao(code)
      .then(({ accessToken }) => {
        saveAccessToken(accessToken);
        navigate(ROUTES.DASHBOARD, { replace: true });
      })
      .catch((error) => {
        const { status, data } = error.response ?? {};
        // 서버는 잘못된 code에도 kakaoId가 "undefined"인 unregistered를 보내므로, 진짜 kakaoId가 있을 때만 가입으로 보낸다.
        const isUnregistered = status === 401 && data?.error === 'unregistered';
        const hasKakaoId = data?.kakaoId && data.kakaoId !== 'undefined';
        if (isUnregistered && hasKakaoId) {
          navigate(ROUTES.SIGNUP, { replace: true, state: { kakaoId: data.kakaoId } });
          return;
        }
        setErrorMessage(
          isUnregistered
            ? '카카오 계정 정보를 확인하지 못했어요. 다시 시도해 주세요.'
            : getErrorMessage(error, '카카오 로그인에 실패했어요.'),
        );
      });
  }, [code, navigate]);

  return (
    <AuthCard
      title="카카오 로그인"
      footer={
        errorMessage && (
          <Link
            to={ROUTES.LOGIN}
            replace
            className="rounded-sm font-medium text-dash-black underline underline-offset-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dash-muted"
          >
            로그인 화면으로 돌아가기
          </Link>
        )
      }
    >
      {errorMessage ? (
        <p role="alert" className="text-center text-sm leading-5 text-dash-error">
          {errorMessage}
        </p>
      ) : (
        <p role="status" className="text-center text-sm leading-5 text-dash-muted">
          카카오 계정으로 로그인하고 있어요.
        </p>
      )}
    </AuthCard>
  );
}

export default KakaoCallbackPage;
