import { useState } from 'react';
import { Link } from 'react-router';
import { AdminButton, AdminTextInput } from '../components/admin/AdminUI.jsx';
import { ROUTES } from '../constants/routes.js';
import './login-page.css';

const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d\s]).{8,}$/;

function SignupPage() {
  const [values, setValues] = useState({ email: '', password: '', confirmation: '' });
  const [touched, setTouched] = useState({});
  const [message, setMessage] = useState('');

  const emailError = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)
    ? '올바른 이메일 형식을 입력해주세요'
    : '';
  const passwordError =
    touched.password && !passwordPattern.test(values.password)
      ? '8자 이상, 영문/숫자/특수문자를 포함해주세요'
      : '';
  const confirmationError =
    touched.confirmation && values.confirmation !== values.password
      ? '비밀번호가 일치하지 않습니다'
      : '';

  function updateValue(event) {
    const { name, value } = event.target;
    setValues((previous) => ({ ...previous, [name]: value }));
    setMessage('');
  }

  function handleBlur(event) {
    setTouched((previous) => ({ ...previous, [event.target.name]: true }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setTouched({ email: true, password: true, confirmation: true });

    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email) ||
      !passwordPattern.test(values.password) ||
      values.confirmation !== values.password
    ) {
      return;
    }

    setMessage('회원가입 서비스는 준비 중입니다.');
  }

  return (
    <main className="login-page signup-page">
      <section className="login-card signup-card" aria-labelledby="signup-title">
        <h1 id="signup-title">회원가입</h1>

        <form className="login-form signup-form" onSubmit={handleSubmit} noValidate>
          <AdminTextInput
            id="signup-email"
            aria-label="이메일"
            type="email"
            name="email"
            autoComplete="email"
            placeholder="이메일을 입력하세요"
            value={values.email}
            onChange={updateValue}
            onBlur={handleBlur}
            error={emailError}
          />
          <div className="signup-field">
            <AdminTextInput
              id="signup-password"
              aria-label="비밀번호"
              type="password"
              name="password"
              autoComplete="new-password"
              placeholder="비밀번호를 입력하세요"
              value={values.password}
              onChange={updateValue}
              onBlur={handleBlur}
              error={passwordError}
              aria-describedby={passwordError ? 'signup-password-error' : 'signup-password-help'}
            />
            {!passwordError && (
              <span className="signup-field__help" id="signup-password-help">
                8자 이상, 영문/숫자/특수문자 포함
              </span>
            )}
          </div>
          <div className="signup-field">
            <AdminTextInput
              id="signup-confirmation"
              aria-label="비밀번호 확인"
              type="password"
              name="confirmation"
              autoComplete="new-password"
              placeholder="비밀번호를 입력하세요"
              value={values.confirmation}
              onChange={updateValue}
              onBlur={handleBlur}
              error={confirmationError}
              aria-describedby={
                confirmationError ? 'signup-confirmation-error' : 'signup-confirmation-help'
              }
            />
            {!confirmationError && (
              <span className="signup-field__help" id="signup-confirmation-help">
                비밀번호를 다시 입력해주세요
              </span>
            )}
          </div>
          <AdminButton type="submit">회원가입</AdminButton>
        </form>

        <p className="login-signup">
          이미 계정이 있으신가요? <Link to={ROUTES.login}>로그인</Link>
        </p>
        <p className="login-message" role="status">
          {message}
        </p>
      </section>
    </main>
  );
}

export default SignupPage;
