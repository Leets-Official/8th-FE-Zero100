import { useState } from 'react';
import { Link } from 'react-router-dom';

import AuthLayout from '../../components/auth/AuthLayout';
import KakaoLoginButton from '../../components/auth/KakaoLoginButton';
import Button from '../../components/common/Button';
import TextInput from '../../components/common/TextInput';
import { ROUTES } from '../../constants/routes';

import './LoginPage.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: UI 구현 완료 후 로그인 API 연동
  };

  const handleKakaoLogin = () => {
    // TODO: 카카오 로그인 연동
  };

  return (
    <AuthLayout title="로그인" className="login-page">
      <form className="login-form" onSubmit={handleSubmit}>
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
        <Button type="submit">로그인</Button>
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
    </AuthLayout>
  );
}

export default LoginPage;
