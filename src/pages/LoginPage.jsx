import { useState } from 'react';
import { Link } from 'react-router';
import { AdminButton, AdminTextInput } from '../components/admin/AdminUI.jsx';
import { ROUTES } from '../constants/routes.js';
import './login-page.css';

function LoginPage() {
  const [message, setMessage] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    setMessage('로그인 서비스는 준비 중입니다.');
  }

  return (
    <main className="login-page">
      <section className="login-card" aria-labelledby="login-title">
        <h1 id="login-title">로그인</h1>

        <form className="login-form" onSubmit={handleSubmit}>
          <AdminTextInput
            id="login-email"
            aria-label="이메일"
            type="email"
            name="email"
            autoComplete="username"
            placeholder="이메일을 입력하세요"
            required
          />
          <AdminTextInput
            id="login-password"
            aria-label="비밀번호"
            type="password"
            name="password"
            autoComplete="current-password"
            placeholder="비밀번호를 입력하세요"
            required
          />
          <AdminButton type="submit">로그인</AdminButton>
        </form>

        <div className="login-divider">
          <span>또는</span>
        </div>

        <button
          className="login-kakao"
          type="button"
          onClick={() => setMessage('카카오 로그인 서비스는 준비 중입니다.')}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
            <path
              fill="currentColor"
              d="M12 2C5.925 2 1 5.858 1 10.617c0 3.058 2.034 5.743 5.095 7.269l-1.036 3.87a.3.3 0 0 0 .449.329l4.535-2.998c.637.09 1.29.147 1.957.147 6.075 0 11-3.858 11-8.617S18.075 2 12 2Z"
            />
          </svg>
          카카오 로그인
        </button>

        <p className="login-signup">
          계정이 없으신가요? <Link to={ROUTES.signup}>회원가입</Link>
        </p>
        <p className="login-message" role="status">
          {message}
        </p>
      </section>
    </main>
  );
}

export default LoginPage;
