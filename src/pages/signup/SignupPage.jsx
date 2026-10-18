import { useId, useState } from 'react';
import { Link } from 'react-router-dom';

import Button from '../../components/common/Button';
import TextInput from '../../components/common/TextInput';
import { ROUTES } from '../../constants/routes';

import './SignupPage.css';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;

const validate = ({ email, password, name }) => ({
  email: EMAIL_REGEX.test(email) ? '' : '올바른 이메일 형식을 입력하세요',
  password: PASSWORD_REGEX.test(password) ? '' : '8자 이상, 영문/숫자/특수문자를 포함해주세요',
  name: name.length >= 2 && name.length <= 8 ? '' : '2자 이상 8자 이하로 입력하세요',
});

function SignupPage() {
  const [values, setValues] = useState({ email: '', password: '', name: '' });
  // Figma 화면과 동일하게 이메일 에러가 처음부터 보이도록 email만 true로 시작
  const [touched, setTouched] = useState({ email: true, password: false, name: false });

  const emailId = useId();
  const emailErrorId = `${emailId}-error`;

  const errors = validate(values);
  const getError = (field) => (touched[field] ? errors[field] : '');
  const emailError = getError('email');

  const handleChange = (field) => (event) => {
    setValues((previous) => ({ ...previous, [field]: event.target.value }));
  };

  const handleBlur = (field) => () => {
    setTouched((previous) => ({ ...previous, [field]: true }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setTouched({ email: true, password: true, name: true });

    const hasError = Object.values(errors).some(Boolean);
    if (hasError) return;

    // TODO: UI 구현 완료 후 회원가입 API 연동
  };

  return (
    <main className="signup-page">
      <section className="signup-card">
        <h1 className="signup-title">회원가입</h1>

        <form className="signup-form" onSubmit={handleSubmit} noValidate>
          <div className="common-component common-field">
            <input
              id={emailId}
              type="email"
              name="email"
              aria-label="이메일"
              placeholder="이메일을 입력하세요"
              autoComplete="email"
              className="common-input"
              value={values.email}
              onChange={handleChange('email')}
              onBlur={handleBlur('email')}
              aria-invalid={Boolean(emailError)}
              aria-describedby={emailError ? emailErrorId : undefined}
            />

            {emailError && (
              <span id={emailErrorId} className="common-field__error" role="alert">
                {emailError}
              </span>
            )}
          </div>

          <TextInput
            type="password"
            name="password"
            aria-label="비밀번호"
            placeholder="비밀번호를 입력하세요"
            autoComplete="new-password"
            value={values.password}
            onChange={handleChange('password')}
            onBlur={handleBlur('password')}
            error={getError('password')}
            helperText="8자 이상, 영문/숫자/특수문자 포함"
          />
          <TextInput
            type="text"
            name="name"
            aria-label="이름"
            placeholder="비밀번호를 입력하세요"
            autoComplete="name"
            value={values.name}
            onChange={handleChange('name')}
            onBlur={handleBlur('name')}
            error={getError('name')}
            helperText="2자 이상 8자 이하"
          />
          <Button type="submit">회원가입</Button>
        </form>

        <p className="signup-login">
          이미 계정이 있으신가요?{' '}
          <Link to={ROUTES.LOGIN} className="signup-login__link">
            로그인
          </Link>
        </p>
      </section>
    </main>
  );
}

export default SignupPage;
