import { useState } from 'react';
import { Link } from 'react-router';
import AuthLayout from '../components/auth/AuthLayout.jsx';
import Button from '../components/common/Button.jsx';
import TextInput from '../components/common/TextInput.jsx';
import { useDashboard } from '../hooks/useDashboard.js';

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function SignupPage() {
  const { showToast } = useDashboard();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [emailTouched, setEmailTouched] = useState(true);
  const [confirmationTouched, setConfirmationTouched] = useState(false);

  const emailError =
    emailTouched && !isValidEmail(email) ? '올바른 이메일 형식으로 입력해 주세요.' : '';
  const confirmationError =
    confirmationTouched && passwordConfirmation && password !== passwordConfirmation
      ? '비밀번호가 일치하지 않습니다.'
      : '';

  function handleSubmit(event) {
    event.preventDefault();
    setEmailTouched(true);
    setConfirmationTouched(true);

    if (!isValidEmail(email) || password.length < 8 || password !== passwordConfirmation) return;
    showToast('회원가입 API는 화면 구현 후 연결할 예정입니다.');
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
      <form onSubmit={handleSubmit} className="space-y-3">
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
          className="!rounded-[10px] !bg-[#f9fafb]"
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
          helperText="8자 이상 입력해 주세요."
          minLength={8}
          className="!rounded-[10px] !bg-[#f9fafb]"
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
          className="!rounded-[10px] !bg-[#f9fafb]"
          required
        />
        <Button type="submit" className="w-full rounded-[10px]">
          회원가입
        </Button>
      </form>
    </AuthLayout>
  );
}

export default SignupPage;
