import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import AuthLayout from '../components/auth/AuthLayout.jsx';
import Button from '../components/common/Button.jsx';
import TextInput from '../components/common/TextInput.jsx';
import { useDashboard } from '../hooks/useDashboard.js';
import { API_BASE_URL, getApiError } from '../api/client.js';

function LoginPage() {
  const { login } = useDashboard();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [pending, setPending] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setPending(true);
    try {
      await login({ email: email.trim(), password });
      navigate('/', { replace: true });
    } catch (err) {
      setError(getApiError(err));
    } finally {
      setPending(false);
    }
  }

  function handleKakaoLogin() {
    if (window.location.origin !== 'http://localhost:5173') {
      setError('카카오 로그인은 현재 http://localhost:5173에서 사용할 수 있습니다.');
      return;
    }
    window.location.assign(`${API_BASE_URL}/api/auth/kakao`);
  }

  return (
    <AuthLayout
      title="로그인"
      footer={
        <>
          계정이 없으신가요?{' '}
          <Link to="/signup" className="font-medium text-[#212529] underline underline-offset-2">
            회원가입
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
          variant="auth"
          required
        />
        <TextInput
          label="비밀번호"
          hideLabel
          name="password"
          type="password"
          placeholder="비밀번호를 입력하세요"
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          variant="auth"
          required
        />
        {error && (
          <p role="alert" className="text-sm text-red-700">
            {error}
          </p>
        )}
        <Button type="submit" isLoading={pending} className="w-full rounded-[10px]">
          로그인
        </Button>
      </form>

      <div className="my-5 flex items-center gap-3 text-xs text-[#adb5bd]" aria-hidden="true">
        <span className="h-px flex-1 bg-[#e9ecef]" />
        <span>또는</span>
        <span className="h-px flex-1 bg-[#e9ecef]" />
      </div>

      <Button
        type="button"
        variant="kakao"
        className="w-full rounded-[10px]"
        onClick={handleKakaoLogin}
      >
        <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4 fill-current">
          <path d="M12 3.5c-5.25 0-9.5 3.41-9.5 7.62 0 2.48 1.47 4.69 3.75 6.07l-.93 3.2a.5.5 0 0 0 .72.57l3.83-2.02c.69.13 1.4.2 2.13.2 5.25 0 9.5-3.41 9.5-7.62S17.25 3.5 12 3.5Zm-4 8.37a1.05 1.05 0 1 1 0-2.1 1.05 1.05 0 0 1 0 2.1Zm4 0a1.05 1.05 0 1 1 0-2.1 1.05 1.05 0 0 1 0 2.1Zm4 0a1.05 1.05 0 1 1 0-2.1 1.05 1.05 0 0 1 0 2.1Z" />
        </svg>
        카카오 로그인
      </Button>
    </AuthLayout>
  );
}

export default LoginPage;
