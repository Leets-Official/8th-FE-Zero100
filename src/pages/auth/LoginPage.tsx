import { useEffect, useState, type ChangeEvent, type SubmitEvent } from 'react';
import { useNavigate } from 'react-router';
import { getErrorMessage } from '../../services/axiosInstance.ts';
import { redirectToKakaoAuth } from '../../features/auth/api/kakaoApi.ts';
import kakaoSymbol from '../../assets/kakao-symbol.svg';
import AuthCard from '../../features/auth/components/AuthCard.tsx';
import Button from '../../components/common/Button.tsx';
import FormErrorMessage from '../../components/common/FormErrorMessage.tsx';
import TextInput from '../../components/common/TextInput.tsx';
import { useAuth } from '../../features/auth/context/AuthContext.ts';
import { validateEmail } from '../../utils/validation.ts';
import { focusFirstInvalidField } from '../../utils/form.ts';

const KAKAO_BUTTON_CLASS_NAME =
  'w-full h-[48px] gap-[8px] border-[1px] border-solid border-[#fee500] rounded-[8px] bg-[#fee500] font-[family-name:Pretendard,var(--font-family-base)] font-bold text-[16px] leading-[1.45] tracking-[-0.064px] text-[#381e1f]';

const KAKAO_REDIRECT_ERROR_MESSAGE =
  '카카오 로그인 페이지로 이동하지 못했습니다. 다시 시도해주세요.';

function validatePassword(password: string) {
  return password ? '' : '비밀번호를 입력하세요';
}

function LoginPage() {
  const navigate = useNavigate();
  const { login, authError } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  // 로그인 요청 실패 메시지. 없으면 인증 만료 등 AuthProvider의 안내를 표시
  const [submitError, setSubmitError] = useState('');
  // 카카오 인증 페이지로 이동 중이면 중복 클릭을 막는다.
  const [isKakaoRedirecting, setIsKakaoRedirecting] = useState(false);
  const [kakaoError, setKakaoError] = useState('');

  // 제출 후 오류가 표시된 입력 필드만 입력할 때마다 다시 검사해 오류 상태를 갱신
  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setEmail(value);
    if (errors.email) setErrors((prev) => ({ ...prev, email: validateEmail(value) }));
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setPassword(value);
    if (errors.password) setErrors((prev) => ({ ...prev, password: validatePassword(value) }));
  };

  // 카카오 인증 페이지로 이동한 뒤 뒤로 가기로 돌아오면 페이지가 bfcache에서 복원되므로 버튼을 다시 활성화
  useEffect(() => {
    const handlePageShow = (event: PageTransitionEvent) => {
      if (event.persisted) setIsKakaoRedirecting(false);
    };
    window.addEventListener('pageshow', handlePageShow);
    return () => window.removeEventListener('pageshow', handlePageShow);
  }, []);

  // 서버의 GET /api/auth/kakao가 카카오 인증 페이지로 리다이렉트하므로 브라우저를 이동시킨다.
  const handleKakaoLogin = () => {
    if (isKakaoRedirecting || isSubmitting) return;
    setIsKakaoRedirecting(true);
    setKakaoError('');
    try {
      redirectToKakaoAuth();
    } catch {
      setKakaoError(KAKAO_REDIRECT_ERROR_MESSAGE);
      setIsKakaoRedirecting(false);
    }
  };

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting || isKakaoRedirecting) return;

    const nextErrors = { email: validateEmail(email), password: validatePassword(password) };
    setErrors(nextErrors);

    // 오류가 있으면 첫 번째 오류 입력 필드로 포커스를 이동하고 제출을 중단
    if (focusFirstInvalidField(event.currentTarget, nextErrors)) return;

    setIsSubmitting(true);
    setSubmitError('');
    try {
      await login({ email: email.trim(), password });
      navigate('/dashboard', { replace: true });
    } catch (error) {
      setSubmitError(getErrorMessage(error));
      setIsSubmitting(false);
    }
  };

  return (
    <AuthCard
      title="로그인"
      linkGuideText="계정이 없으신가요?"
      linkLabel="회원가입"
      linkTo="/signup"
      className="gap-[26px]"
    >
      {/* Figma의 Form 높이(179.61px)를 유지하고, 오류 메시지가 표시되면 그만큼 늘어나도록 min-height로 지정 */}
      <form
        className="flex flex-col gap-[16px] min-h-[179.61px]"
        noValidate
        onSubmit={handleSubmit}
      >
        <TextInput
          type="email"
          name="email"
          label="이메일"
          hideLabel
          placeholder="이메일을 입력하세요"
          autoComplete="email"
          value={email}
          onChange={handleEmailChange}
          error={errors.email}
        />
        <TextInput
          type="password"
          name="password"
          label="비밀번호"
          hideLabel
          placeholder="비밀번호를 입력하세요"
          autoComplete="current-password"
          value={password}
          onChange={handlePasswordChange}
          error={errors.password}
        />
        <FormErrorMessage message={submitError || authError} />
        <Button type="submit" className="w-full" disabled={isSubmitting} aria-busy={isSubmitting}>
          {isSubmitting ? '로그인 중...' : '로그인'}
        </Button>
      </form>

      <div className="relative flex flex-row justify-center before:absolute before:inset-x-0 before:top-[9.54px] before:border-0 before:border-t-[0.93px] before:border-solid before:border-[#e5e7eb] before:content-['']">
        <span className="relative px-[8px] bg-[#ffffff] font-[family-name:var(--font-family-base)] font-normal text-[14px] leading-[20px] tracking-[0px] text-[#6a7282]">
          또는
        </span>
      </div>

      <FormErrorMessage message={kakaoError} />
      <Button
        type="button"
        className={KAKAO_BUTTON_CLASS_NAME}
        onClick={handleKakaoLogin}
        disabled={isSubmitting || isKakaoRedirecting}
        aria-busy={isKakaoRedirecting}
      >
        <img src={kakaoSymbol} alt="" className="w-[18.505px] h-[17px]" />
        카카오 로그인
      </Button>
    </AuthCard>
  );
}

export default LoginPage;
