import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import AuthLayout from '../components/auth/AuthLayout.jsx';
import Button from '../components/common/Button.jsx';
import TextInput from '../components/common/TextInput.jsx';
import { useDashboard } from '../hooks/useDashboard.js';
import { signup } from '../api/auth.js';
import { getApiError } from '../api/client.js';
import { isValidEmail, isValidPassword } from '../utils/validation.js';

function SignupPage() {
  const { showToast } = useDashboard();
  const navigate = useNavigate();
  const { state } = useLocation();
  const [serverError, setServerError] = useState('');
  const [pending, setPending] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [confirmationTouched, setConfirmationTouched] = useState(false);

  const emailError =
    emailTouched && !isValidEmail(email) ? '올바른 이메일 형식으로 입력해 주세요.' : '';
  const passwordError =
    passwordTouched && !isValidPassword(password)
      ? '8자 이상, 영문·숫자·특수문자를 포함해 주세요.'
      : '';
  const confirmationError =
    confirmationTouched && (!passwordConfirmation || password !== passwordConfirmation)
      ? '비밀번호가 일치하도록 입력해 주세요.'
      : '';

  async function handleSubmit(event) {
    event.preventDefault();
    setEmailTouched(true);
    setPasswordTouched(true);
    setConfirmationTouched(true);

    if (!isValidEmail(email) || !isValidPassword(password) || password !== passwordConfirmation)
      return;
    setServerError('');
    setPending(true);
    try {
      await signup({
        email: email.trim(),
        password,
        ...(state?.kakaoId ? { kakaoId: state.kakaoId } : {}),
      });
      showToast('회원가입이 완료되었습니다. 로그인해 주세요.');
      navigate('/login', { replace: true });
    } catch (error) {
      setServerError(getApiError(error));
    } finally {
      setPending(false);
    }
  }

  return (
    <AuthLayout
      title="회원가입"
      footer={
        <>
          이미 계정이 있으신가요?{' '}
          <Link to="/login" className="font-medium text-[#212529] underline underline-offset-2">
            로그인
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} noValidate className="space-y-3">
        <TextInput
          label="이메일"
          hideLabel
          name="email"
          type="email"
          placeholder="이메일을 입력하세요"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          onBlur={() => setEmailTouched(true)}
          error={emailError}
          variant="auth"
          required
        />
        <TextInput
          label="비밀번호"
          hideLabel
          name="password"
          type="password"
          placeholder="비밀번호를 입력하세요"
          autoComplete="new-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          onBlur={() => setPasswordTouched(true)}
          helperText={passwordError ? undefined : '8자 이상, 영문·숫자·특수문자를 포함해 주세요.'}
          error={passwordError}
          minLength={8}
          variant="auth"
          required
        />
        <TextInput
          label="비밀번호 확인"
          hideLabel
          name="passwordConfirmation"
          type="password"
          placeholder="비밀번호를 다시 입력하세요"
          autoComplete="new-password"
          value={passwordConfirmation}
          onChange={(event) => setPasswordConfirmation(event.target.value)}
          onBlur={() => setConfirmationTouched(true)}
          helperText={confirmationError ? undefined : '비밀번호가 일치해야 합니다.'}
          error={confirmationError}
          variant="auth"
          required
        />
        {serverError && (
          <p role="alert" className="text-sm text-red-700">
            {serverError}
          </p>
        )}
        <Button type="submit" isLoading={pending} className="w-full rounded-[10px]">
          회원가입
        </Button>
      </form>
    </AuthLayout>
  );
}

export default SignupPage;
