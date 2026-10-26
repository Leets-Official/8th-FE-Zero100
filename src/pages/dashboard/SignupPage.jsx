import { useState } from 'react';
import AuthCard from '../../components/dashboard/AuthCard.jsx';
import Button from '../../components/dashboard/Button.jsx';
import TextInput from '../../components/dashboard/TextInput.jsx';
import { validateEmail } from '../../utils/dashboard/validation.js';

// Figma 회원가입 디자인의 비밀번호 안내 문구. 조건을 만족하지 않으면 같은 문구를 오류 메시지로 표시
const PASSWORD_RULE_TEXT = '8자 이상, 영문/숫자/특수문자 포함';

function validatePassword(password) {
  if (!password) return '비밀번호를 입력하세요';

  const isValid =
    password.length >= 8 &&
    /[A-Za-z]/.test(password) &&
    /\d/.test(password) &&
    /[^A-Za-z0-9\s]/.test(password);
  return isValid ? '' : PASSWORD_RULE_TEXT;
}

function validatePasswordConfirm(passwordConfirm, password) {
  if (!passwordConfirm) return '비밀번호를 한 번 더 입력하세요';
  return passwordConfirm === password ? '' : '비밀번호가 일치하지 않습니다';
}

function validateSignupForm({ email, password, passwordConfirm }) {
  return {
    email: validateEmail(email),
    password: validatePassword(password),
    passwordConfirm: validatePasswordConfirm(passwordConfirm, password),
  };
}

function SignupPage() {
  const [values, setValues] = useState({ email: '', password: '', passwordConfirm: '' });
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
          type="password"
          name="passwordConfirm"
          label="비밀번호 확인"
          hideLabel
          placeholder="비밀번호를 입력하세요"
          autoComplete="new-password"
          value={values.passwordConfirm}
          onChange={handleChange}
          error={errors?.passwordConfirm}
        />
        <Button type="submit" className="w-full">
          회원가입
        </Button>
      </form>
    </AuthCard>
  );
}

export default SignupPage;
