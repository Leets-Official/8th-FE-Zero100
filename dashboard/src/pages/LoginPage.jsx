import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import KakaoLoginButton from '../components/KakaoLoginButton';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // 로그인 API 연동은 다음 단계에서 구현
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F9FAFB] px-4">
      <section className="flex w-full max-w-[448px] flex-col gap-[26px] rounded-[10px] border border-[#E5E7EB] bg-white p-8">
        <h1 className="text-center text-2xl font-bold text-black">로그인</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <TextInput
            type="email"
            aria-label="이메일"
            placeholder="이메일을 입력하세요"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextInput
            type="password"
            aria-label="비밀번호"
            placeholder="비밀번호를 입력하세요"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" className="w-full">
            로그인
          </Button>
        </form>

        <div className="flex items-center gap-3">
          <span className="h-px flex-1 bg-[#E5E7EB]" />
          <span className="text-sm text-gray-500">또는</span>
          <span className="h-px flex-1 bg-[#E5E7EB]" />
        </div>

        <KakaoLoginButton />

        <p className="text-center text-sm text-[#4A5565]">
          계정이 없으신가요?{' '}
          <Link to="/signup" className="text-black underline">
            회원가입
          </Link>
        </p>
      </section>
    </div>
  );
};

export default LoginPage;
