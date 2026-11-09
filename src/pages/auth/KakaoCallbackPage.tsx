import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router';
import { ApiError, getErrorMessage } from '../../services/axiosInstance.ts';
import { isKakaoUnregisteredError } from '../../features/auth/api/kakaoApi.ts';
import AuthCard from '../../features/auth/components/AuthCard.tsx';
import FormErrorMessage from '../../components/common/FormErrorMessage.tsx';
import { useAuth } from '../../features/auth/context/AuthContext.ts';
import type { KakaoCallbackParams, KakaoSignupState } from '../../features/auth/types.ts';

const KAKAO_CANCELED_MESSAGE = '카카오 로그인이 취소되었습니다.';
const KAKAO_AUTH_FAILED_MESSAGE = '카카오 인증에 실패했습니다. 다시 시도해주세요.';
const KAKAO_CODE_MISSING_MESSAGE = '카카오 인증 정보를 받지 못했습니다. 다시 시도해주세요.';
const KAKAO_LOGIN_FAILED_MESSAGE = '카카오 로그인에 실패했습니다. 다시 시도해주세요.';

// 카카오가 붙여 보낸 Query Parameter 중 로그인 처리에 필요한 값만 꺼낸다.
function getKakaoCallbackParams(searchParams: URLSearchParams): KakaoCallbackParams {
  return { code: searchParams.get('code'), error: searchParams.get('error') };
}

// 인가코드 없이 돌아온 경우의 안내 문구. 카카오의 error_description은 내부 정보일 수 있어 표시하지 않는다.
function getCallbackErrorMessage({ error }: KakaoCallbackParams): string {
  if (error === 'access_denied') return KAKAO_CANCELED_MESSAGE;
  if (error) return KAKAO_AUTH_FAILED_MESSAGE;
  return KAKAO_CODE_MISSING_MESSAGE;
}

// 미가입 유저가 아닌 401은 서버 error 값('unregistered')이 그대로 보이지 않도록 공통 문구로 바꾼다.
function getLoginErrorMessage(error: unknown): string {
  if (error instanceof ApiError && error.status === 401) return KAKAO_LOGIN_FAILED_MESSAGE;
  return getErrorMessage(error);
}

interface KakaoCallbackPageProps {
  // 카카오 계정으로 가입된 회원이 없어 회원가입 페이지로 이동할 때 호출
  onUnregistered: () => void;
}

// 카카오 redirect_uri(/auth/kakao/callback) 페이지
// 백엔드가 카카오 인증 후 이 경로로 code를 보내므로, code로 로그인 API를 호출해 인증 상태를 저장한다.
function KakaoCallbackPage({ onUnregistered }: KakaoCallbackPageProps) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();
  const { loginWithKakao } = useAuth();
  // 처음 진입한 URL의 값만 사용한다. (아래에서 URL의 Query Parameter를 지워도 유지)
  const [params] = useState(() => getKakaoCallbackParams(searchParams));
  const [errorMessage, setErrorMessage] = useState(() =>
    params.code ? '' : getCallbackErrorMessage(params),
  );
  // 인가코드는 한 번만 사용할 수 있어 StrictMode의 effect 재실행에도 한 번만 요청
  const hasHandledRef = useRef(false);

  useEffect(() => {
    if (hasHandledRef.current) return;
    hasHandledRef.current = true;

    // 인가코드가 주소창·방문 기록에 남지 않도록 Query Parameter를 바로 지운다.
    navigate(pathname, { replace: true });
    if (!params.code) return;

    loginWithKakao(params.code)
      .then(() => navigate('/dashboard', { replace: true }))
      .catch((error: unknown) => {
        if (error instanceof ApiError && isKakaoUnregisteredError(error.data)) {
          const state: KakaoSignupState = { kakaoId: error.data.kakaoId };
          onUnregistered();
          navigate('/signup', { replace: true, state });
          return;
        }
        setErrorMessage(getLoginErrorMessage(error));
      });
  }, [params, pathname, navigate, loginWithKakao, onUnregistered]);

  return (
    <AuthCard
      title="카카오 로그인"
      linkGuideText={errorMessage ? '다시 로그인하시겠어요?' : undefined}
      linkLabel="로그인 페이지로 이동"
      linkTo={errorMessage ? '/login' : undefined}
      className="gap-[26px]"
    >
      {errorMessage ? (
        <FormErrorMessage message={errorMessage} />
      ) : (
        <p
          role="status"
          className="m-0 font-[family-name:var(--font-family-base)] font-normal text-[14px] leading-[20px] tracking-[0px] text-center text-[#4a5565]"
        >
          카카오 로그인 중입니다...
        </p>
      )}
    </AuthCard>
  );
}

export default KakaoCallbackPage;
