import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../../components/auth/AuthLayout';
import KakaoIcon from '../../components/auth/KakaoIcon';
import Button from '../../components/dashboard/Button';
import TextField from '../../components/dashboard/TextField';
import { ROUTES } from '../../constants/routes';
import { login } from '../../api/auth';
import { getErrorMessage } from '../../api/client';
import { setToken } from '../../api/token';
import { validateEmail } from '../../utils/validators';

function LoginPage() {
  const navigate = useNavigate();
  const [values, setValues] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (validateEmail(values.email) || !values.password) {
      setError('이메일과 비밀번호를 확인해주세요.');
      return;
    }

    setIsSubmitting(true);
    setError('');
    try {
      const { accessToken } = await login(values);
      setToken(accessToken);
      navigate(ROUTES.DASHBOARD, { replace: true });
    } catch (err) {
      setError(getErrorMessage(err, '로그인에 실패했습니다.'));
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleKakaoLogin() {
    window.location.href = `${import.meta.env.VITE_API_BASE_URL}/api/auth/kakao`;
  }

  return (
    <AuthLayout title="로그인">
      <form className="flex flex-col gap-6" noValidate onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4">
          <TextField
            type="email"
            name="email"
            aria-label="이메일"
            placeholder="이메일을 입력하세요"
            autoComplete="username"
            value={values.email}
            onChange={handleChange}
          />
          <TextField
            type="password"
            name="password"
            aria-label="비밀번호"
            placeholder="비밀번호를 입력하세요"
            autoComplete="current-password"
            value={values.password}
            onChange={handleChange}
          />
          {error && (
            <p role="alert" className="text-center text-sm leading-5 text-red-500">
              {error}
            </p>
          )}
        </div>
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? '로그인 중...' : '로그인'}
        </Button>
      </form>

      <div className="flex h-5 items-center gap-2">
        <div className="flex-1 border-t border-gray-200" />
        <span className="text-sm leading-5 text-gray-500">또는</span>
        <div className="flex-1 border-t border-gray-200" />
      </div>

      <button
        type="button"
        onClick={handleKakaoLogin}
        className="flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#FEE500] py-3 text-base leading-6 font-bold text-stone-800"
      >
        <KakaoIcon />
        카카오 로그인
      </button>

      <p className="text-center text-sm leading-5 text-gray-600">
        계정이 없으신가요?{' '}
        <Link to={ROUTES.SIGNUP} className="text-black underline">
          회원가입
        </Link>
      </p>
    </AuthLayout>
  );
}

export default LoginPage;
