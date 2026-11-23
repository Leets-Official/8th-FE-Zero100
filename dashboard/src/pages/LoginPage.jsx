import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import KakaoLoginButton from '../components/KakaoLoginButton';
import { login } from '../api/auth';
import { getErrorMessage } from '../api/client';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const navigate = useNavigate();
  const { loginWithToken } = useAuth();
  const location = useLocation();
  const [email, setEmail] = useState(location.state?.email ?? '');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);
    try {
      const data = await login({ email, password });
      await loginWithToken(data.accessToken);
      navigate('/', { replace: true });
    } catch (error) {
      setErrorMessage(getErrorMessage(error, '로그인에 실패했습니다'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F9FAFB] px-4">
      <section className="flex w-full max-w-[448px] flex-col gap-[26px] rounded-[10px] border border-[#E5E7EB] bg-white p-8">
        <h1 className="text-center text-2xl font-bold text-black">로그인</h1>
        {location.state?.message && (
          <p className="text-center text-sm text-[#4A5565]">{location.state.message}</p>
        )}

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
          {errorMessage && (
            <p role="alert" className="text-sm text-red-500">
              {errorMessage}
            </p>
          )}
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? '로그인 중...' : '로그인'}
          </Button>
        </form>

        <div className="flex items-center gap-3">
          <span className="h-px flex-1 bg-[#E5E7EB]" />
          <span className="text-sm text-gray-500">또는</span>
          <span className="h-px flex-1 bg-[#E5E7EB]" />
        </div>

        <KakaoLoginButton
          onClick={() => {
            window.location.href = `${import.meta.env.VITE_API_BASE_URL}/api/auth/kakao`;
          }}
        />

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
