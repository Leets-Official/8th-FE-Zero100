import { useId, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { signup } from '../../api/authApi';
import { getErrorMessage } from '../../api/getErrorMessage';
import AuthLayout from '../../components/auth/AuthLayout';
import Button from '../../components/common/Button';
import TextInput from '../../components/common/TextInput';
import { ROUTES } from '../../constants/routes';
import { isValidEmail, isValidName, isValidPassword } from '../../utils/validators';

import './SignupPage.css';

const validate = ({ email, password, name }) => ({
  email: isValidEmail(email) ? '' : '올바른 이메일 형식을 입력하세요',
  password: isValidPassword(password) ? '' : '8자 이상, 영문/숫자/특수문자를 포함해주세요',
  name: isValidName(name) ? '' : '2자 이상 8자 이하로 입력하세요',
});

function SignupPage() {
  const navigate = useNavigate();
  const location = useLocation();
  // 카카오 로그인에서 미가입 유저로 판정되어 넘어온 경우 kakaoId를 함께 보냄
  const kakaoId = location.state?.kakaoId;

  const [values, setValues] = useState({ email: '', password: '', name: '' });
  // Figma 화면과 동일하게 이메일 에러가 처음부터 보이도록 email만 true로 시작
  const [touched, setTouched] = useState({ email: true, password: false, name: false });
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const emailId = useId();
  const emailErrorId = `${emailId}-error`;

  const errors = validate(values);
  const getError = (field) => (touched[field] ? errors[field] : '');
  const emailError = getError('email');

  const handleChange = (field) => (event) => {
    setValues((previous) => ({ ...previous, [field]: event.target.value }));
    setSubmitError('');
  };

  const handleBlur = (field) => () => {
    setTouched((previous) => ({ ...previous, [field]: true }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isSubmitting) return;

    setTouched({ email: true, password: true, name: true });

    const hasError = Object.values(errors).some(Boolean);
    if (hasError) return;

    setIsSubmitting(true);
    setSubmitError('');

    try {
      await signup({
        email: values.email.trim(),
        password: values.password,
        name: values.name.trim(),
        kakaoId,
      });
      navigate(ROUTES.LOGIN, {
        replace: true,
        state: { toast: '회원가입이 완료되었습니다. 로그인해주세요.' },
      });
    } catch (error) {
      setSubmitError(getErrorMessage(error, '회원가입에 실패했습니다.'));
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout title="회원가입" className="signup-page">
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
          placeholder="이름을 입력하세요"
          autoComplete="name"
          value={values.name}
          onChange={handleChange('name')}
          onBlur={handleBlur('name')}
          error={getError('name')}
          helperText="2자 이상 8자 이하"
        />

        {submitError && (
          <span className="common-field__error" role="alert">
            {submitError}
          </span>
        )}

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? '가입 중...' : '회원가입'}
        </Button>
      </form>

      <p className="signup-login">
        이미 계정이 있으신가요?{' '}
        <Link to={ROUTES.LOGIN} className="signup-login__link">
          로그인
        </Link>
      </p>
    </AuthLayout>
  );
}

export default SignupPage;
