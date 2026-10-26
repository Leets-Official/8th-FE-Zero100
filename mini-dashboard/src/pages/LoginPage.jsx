import { useState } from 'react';
import { Link } from 'react-router';
import AuthLayout from '../components/auth/AuthLayout.jsx';
import Button from '../components/common/Button.jsx';
import TextInput from '../components/common/TextInput.jsx';
import { useDashboard } from '../hooks/useDashboard.js';

function LoginPage() {
  const { showToast } = useDashboard();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    showToast('로그인 API는 화면 구현 후 연결할 예정입니다.');
  }

  function handleKakaoLogin() {
    showToast('카카오 로그인 API는 화면 구현 후 연결할 예정입니다.');
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
          className="!rounded-[10px] !bg-[#f9fafb]"
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
          className="!rounded-[10px] !bg-[#f9fafb]"
          required
        />
        <Button type="submit" className="w-full rounded-[10px]">
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
        variant="primary"
        className="w-full rounded-[10px] border-transparent !bg-[#fee500] !text-[#191919] hover:!bg-[#fada0a]"
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
