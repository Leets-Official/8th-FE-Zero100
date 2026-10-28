import { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../../components/auth/AuthLayout';
import Button from '../../components/dashboard/Button';
import Textarea from '../../components/dashboard/Textarea';
import { validateEmail, validateName, validatePassword } from '../../utils/validators';
import { ROUTES } from '../../constants/routes';

const validators = {
  email: validateEmail,
  password: validatePassword,
  name: validateName,
};

function SignupPage() {
  const [values, setValues] = useState({ email: '', password: '', name: '' });
  const [errors, setErrors] = useState({});

  function handleChange(event) {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: validators[name](value) }));
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    setErrors({
      email: validators.email(values.email),
      password: validators.password(values.password),
      name: validators.name(values.name),
    });
  }

  return (
    <AuthLayout title="회원가입" gap="gap-7">
      <form className="flex flex-col gap-4" noValidate onSubmit={handleSubmit}>
        <Textarea
          type="email"
          name="email"
          aria-label="이메일"
          placeholder="이메일을 입력하세요"
          value={values.email}
          onChange={handleChange}
          error={errors.email}
        />
        <Textarea
          type="password"
          name="password"
          aria-label="비밀번호"
          placeholder="비밀번호를 입력하세요"
          helperText="8자 이상, 영문/숫자/특수문자 포함"
          value={values.password}
          onChange={handleChange}
          error={errors.password}
        />
        <Textarea
          name="name"
          aria-label="이름"
          placeholder="이름을 입력하세요"
          helperText="2자 이상 8자 이하"
          value={values.name}
          onChange={handleChange}
          error={errors.name}
        />
        <Button type="submit" className="w-full">
          회원가입
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
