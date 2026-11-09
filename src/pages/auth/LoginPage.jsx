import { useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router';
import { login } from '../../api/authApi';
import AuthCard from '../../components/auth/AuthCard/AuthCard';
import KakaoLoginButton from '../../components/auth/KakaoLoginButton/KakaoLoginButton';
import Button from '../../components/dashboard/Button/Button';
import TextInput from '../../components/dashboard/TextInput/TextInput';
import { ROUTES } from '../../constants/routes';
import { getErrorMessage } from '../../utils/getErrorMessage';
import { isEmail } from '../../utils/isEmail';
import { getAccessToken, saveAccessToken } from '../../utils/tokenStorage';

const EMAIL_ERROR = '올바른 이메일 형식을 입력하세요';
const PASSWORD_ERROR = '비밀번호를 입력하세요';

function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });
  // 서버가 돌려준 실패 이유 (예: 이메일 또는 비밀번호가 일치하지 않을 때)
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  // 복사해서 붙여 넣을 때 딸려 온 앞뒤 공백 때문에 맞는 주소가 에러로 보이지 않도록 공백을 뺀 값으로 검사한다.
  const trimmedEmail = email.trim();

  // 입력 중에는 해당 칸의 에러를 지우고, 입력창에서 벗어나거나 로그인을 누를 때 검사한다.
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, email: '' }));
    setSubmitError('');
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, password: '' }));
    setSubmitError('');
  };

  const handleEmailBlur = () => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      email: trimmedEmail && !isEmail(trimmedEmail) ? EMAIL_ERROR : '',
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isSubmitting) return;

    const nextErrors = {
      email: isEmail(trimmedEmail) ? '' : EMAIL_ERROR,
      password: password ? '' : PASSWORD_ERROR,
    };
    setErrors(nextErrors);
    if (nextErrors.email || nextErrors.password) return;

    setIsSubmitting(true);
    try {
      // 검사한 값과 같은 trimmedEmail을 보낸다.
      const { accessToken } = await login({ email: trimmedEmail, password });
      saveAccessToken(accessToken);
      // 로그인이 필요해서 넘어온 경우에는 원래 가려던 페이지로 돌려보낸다.
      navigate(location.state?.from ?? ROUTES.DASHBOARD, { replace: true });
    } catch (error) {
      setSubmitError(getErrorMessage(error, '로그인하지 못했어요. 잠시 후 다시 시도해 주세요.'));
      setIsSubmitting(false);
    }
  };

  // 이미 로그인한 상태로 로그인 화면에 오면 대시보드로 보낸다.
  if (getAccessToken()) return <Navigate to={ROUTES.DASHBOARD} replace />;

  return (
    <AuthCard
      title="로그인"
      footer={
        <>
          계정이 없으신가요?{' '}
          <Link
            to={ROUTES.SIGNUP}
            className="rounded-sm font-medium text-dash-black underline underline-offset-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dash-muted"
          >
            회원가입
          </Link>
        </>
      }
    >
      <form className="flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
        {/* 디자인에는 라벨이 보이지 않으므로 aria-label로 입력칸 이름을 알려준다. */}
        <TextInput
          type="email"
          aria-label="이메일"
          placeholder="이메일을 입력하세요"
          autoComplete="email"
          value={email}
          onChange={handleEmailChange}
          onBlur={handleEmailBlur}
          error={errors.email}
        />
        <TextInput
          type="password"
          aria-label="비밀번호"
          placeholder="비밀번호를 입력하세요"
          autoComplete="current-password"
          value={password}
          onChange={handlePasswordChange}
          error={errors.password}
        />
        {submitError && (
          <p role="alert" className="text-center text-sm leading-5 text-dash-error">
            {submitError}
          </p>
        )}
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? '로그인 중...' : '로그인'}
        </Button>
      </form>

      <div className="mt-3 flex items-center gap-3 text-sm leading-5 text-dash-muted">
        <span className="h-px flex-1 bg-dash-line" />
        또는
        <span className="h-px flex-1 bg-dash-line" />
      </div>

      {/* 카카오 로그인도 API 연결 단계에서 동작을 붙인다. */}
      <KakaoLoginButton />
    </AuthCard>
  );
}

export default LoginPage;
