import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AuthLayout from '../../components/auth/AuthLayout';
import Button from '../../components/dashboard/Button';
import TextField from '../../components/dashboard/TextField';
import { validateEmail, validateName, validatePassword } from '../../utils/validators';
import { ROUTES } from '../../constants/routes';
import { login, signup } from '../../api/auth';
import { getErrorMessage } from '../../api/client';
import { setToken } from '../../api/token';

const validators = {
  email: validateEmail,
  password: validatePassword,
  name: validateName,
};

function SignupPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const kakaoId = location.state?.kakaoId;
  const [values, setValues] = useState({ email: '', password: '', name: '' });
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: validators[name](value) }));
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = {
      email: validators.email(values.email),
      password: validators.password(values.password),
      name: validators.name(values.name),
    };
    setErrors(nextErrors);
    if (Object.values(nextErrors).some(Boolean)) return;

    setIsSubmitting(true);
    setSubmitError('');
    try {
      await signup({ ...values, kakaoId });
      const { accessToken } = await login(values);
      setToken(accessToken);
      navigate(ROUTES.DASHBOARD, { replace: true });
    } catch (err) {
      const message = getErrorMessage(err, '회원가입에 실패했습니다.');
      if (err.response?.status === 409) {
        setErrors((prev) => ({ ...prev, email: message }));
      } else {
        setSubmitError(message);
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AuthLayout title="회원가입" gap="gap-7">
      <form className="flex flex-col gap-4" noValidate onSubmit={handleSubmit}>
        {kakaoId && (
          <p className="text-center text-sm leading-5 text-gray-600">
            카카오 계정과 연결해 가입합니다.
          </p>
        )}
        <TextField
          type="email"
          name="email"
          aria-label="이메일"
          placeholder="이메일을 입력하세요"
          autoComplete="email"
          value={values.email}
          onChange={handleChange}
          error={errors.email}
        />
        <TextField
          type="password"
          name="password"
          aria-label="비밀번호"
          placeholder="비밀번호를 입력하세요"
          autoComplete="new-password"
          helperText="8자 이상, 영문/숫자/특수문자 포함"
          value={values.password}
          onChange={handleChange}
          error={errors.password}
        />
        <TextField
          name="name"
          aria-label="이름"
          placeholder="이름을 입력하세요"
          autoComplete="name"
          helperText="2자 이상 8자 이하"
          value={values.name}
          onChange={handleChange}
          error={errors.name}
        />
        {submitError && (
          <p role="alert" className="text-center text-sm leading-5 text-red-500">
            {submitError}
          </p>
        )}
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? '가입 중...' : '회원가입'}
        </Button>
      </form>

      <p className="text-center text-sm leading-5 text-gray-600">
        이미 계정이 있으신가요?{' '}
        <Link to={ROUTES.LOGIN} className="text-black underline">
          로그인
        </Link>
      </p>
    </AuthLayout>
  );
}

export default SignupPage;
