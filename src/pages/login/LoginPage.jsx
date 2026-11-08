import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { getKakaoLoginUrl } from '../../api/authApi';
import { getErrorMessage } from '../../api/getErrorMessage';
import AuthLayout from '../../components/auth/AuthLayout';
import KakaoLoginButton from '../../components/auth/KakaoLoginButton';
import Button from '../../components/common/Button';
import TextInput from '../../components/common/TextInput';
import Toast from '../../components/common/Toast';
import { ROUTES } from '../../constants/routes';
import useAuth from '../../hooks/useAuth';

import './LoginPage.css';

const TOAST_DURATION = 3000;

function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  // 회원가입 완료 후 이동해 왔을 때 전달받은 메시지로 Toast를 표시
  const [toastMessage, setToastMessage] = useState(location.state?.toast ?? '');

  // 새로고침해도 Toast가 다시 뜨지 않도록 넘겨받은 상태를 지움
  useEffect(() => {
    if (location.state?.toast) {
      navigate(location.pathname, { replace: true, state: null });
    }
  }, [location.pathname, location.state, navigate]);

  // 일정 시간 뒤 Toast 숨김
  useEffect(() => {
    if (!toastMessage) return undefined;

    const timerId = setTimeout(() => setToastMessage(''), TOAST_DURATION);

    return () => clearTimeout(timerId);
  }, [toastMessage]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isSubmitting) return;

    if (!email.trim() || !password) {
      setErrorMessage('이메일과 비밀번호는 필수입니다');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      await login({ email: email.trim(), password });
      navigate(ROUTES.DASHBOARD, { replace: true });
    } catch (error) {
      setErrorMessage(getErrorMessage(error, '로그인에 실패했습니다.'));
      setIsSubmitting(false);
    }
  };

  // 카카오 로그인은 서버가 카카오 인증 페이지로 리다이렉트하므로 브라우저 이동으로 시작
  const handleKakaoLogin = () => {
    window.location.href = getKakaoLoginUrl();
  };

  return (
    <AuthLayout title="로그인" className="login-page">
      <form className="login-form" onSubmit={handleSubmit} noValidate>
        <TextInput
          type="email"
          name="email"
          aria-label="이메일"
          placeholder="이메일을 입력하세요"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <TextInput
          type="password"
          name="password"
          aria-label="비밀번호"
          placeholder="비밀번호를 입력하세요"
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />

        {errorMessage && (
          <span className="common-field__error" role="alert">
            {errorMessage}
          </span>
        )}

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? '로그인 중...' : '로그인'}
        </Button>
      </form>

      <div className="login-divider">
        <span className="login-divider__text">또는</span>
      </div>

      <KakaoLoginButton onClick={handleKakaoLogin} />

      <p className="login-signup">
        계정이 없으신가요?{' '}
        <Link to={ROUTES.SIGNUP} className="login-signup__link">
          회원가입
        </Link>
      </p>

      {toastMessage && (
        <div className="login-page__toast">
          <Toast message={toastMessage} />
        </div>
      )}
    </AuthLayout>
  );
}

export default LoginPage;
