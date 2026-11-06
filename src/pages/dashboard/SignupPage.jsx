import { useState } from 'react';
import AuthCard from '../../components/dashboard/AuthCard.jsx';
import Button from '../../components/dashboard/Button.jsx';
import TextInput from '../../components/dashboard/TextInput.jsx';
import {
  NAME_RULE_TEXT,
  PASSWORD_RULE_TEXT,
  validateEmail,
  validateName,
  validatePassword,
} from '../../utils/dashboard/validation.js';

function validateSignupForm({ email, password, name }) {
  return {
    email: validateEmail(email),
    password: validatePassword(password),
    name: validateName(name),
  };
}

function SignupPage() {
  const [values, setValues] = useState({ email: '', password: '', name: '' });
  // 첫 제출 전에는 null이고, 제출 후에는 입력할 때마다 다시 검사해 오류 상태를 갱신
  const [errors, setErrors] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    const nextValues = { ...values, [name]: value };
    setValues(nextValues);
    if (errors) setErrors(validateSignupForm(nextValues));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const nextErrors = validateSignupForm(values);
    setErrors(nextErrors);

    // 오류가 있으면 첫 번째 오류 입력 필드로 포커스를 이동
    const firstInvalidField = Object.keys(nextErrors).find((field) => nextErrors[field]);
    if (firstInvalidField) {
      event.currentTarget.elements.namedItem(firstInvalidField).focus();
      return;
    }

    // 회원가입 API 연동 전이므로 유효성 검사까지만 수행
  };

  return (
    <AuthCard
      title="회원가입"
      linkGuideText="이미 계정이 있으신가요?"
      linkLabel="로그인"
      linkTo="/login"
      className="gap-[28px]"
    >
      <form className="flex flex-col gap-[16px]" noValidate onSubmit={handleSubmit}>
        <TextInput
          type="email"
          name="email"
          label="이메일"
          hideLabel
          placeholder="이메일을 입력하세요"
          autoComplete="email"
          value={values.email}
          onChange={handleChange}
          error={errors?.email}
        />
        <TextInput
          type="password"
          name="password"
          label="비밀번호"
          hideLabel
          placeholder="비밀번호를 입력하세요"
          helperText={PASSWORD_RULE_TEXT}
          autoComplete="new-password"
          value={values.password}
          onChange={handleChange}
          error={errors?.password}
        />
        <TextInput
          name="name"
          label="이름"
          hideLabel
          placeholder="이름을 입력하세요"
          helperText={NAME_RULE_TEXT}
          autoComplete="name"
          value={values.name}
          onChange={handleChange}
          error={errors?.name}
        />
        <Button type="submit" className="w-full">
          회원가입
        </Button>
      </form>
    </AuthCard>
  );
}

export default SignupPage;
