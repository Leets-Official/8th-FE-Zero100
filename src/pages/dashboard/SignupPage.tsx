import { useState, type ChangeEvent, type SubmitEvent } from 'react';
import { useNavigate } from 'react-router';
import { signup } from '../../api/authApi.ts';
import { getErrorMessage } from '../../api/axiosInstance.ts';
import AuthCard from '../../components/dashboard/AuthCard.tsx';
import Button from '../../components/dashboard/Button.tsx';
import FormErrorMessage from '../../components/dashboard/FormErrorMessage.tsx';
import TextInput from '../../components/dashboard/TextInput.tsx';
import {
  NAME_RULE_TEXT,
  PASSWORD_RULE_TEXT,
  validateEmail,
  validateName,
  validatePassword,
} from '../../utils/dashboard/validation.ts';

interface SignupFormValues {
  email: string;
  password: string;
  name: string;
}

// 필드별 오류 메시지. 오류가 없으면 빈 문자열
type SignupFormErrors = Record<keyof SignupFormValues, string>;

function validateSignupForm({ email, password, name }: SignupFormValues): SignupFormErrors {
  return {
    email: validateEmail(email),
    password: validatePassword(password),
    name: validateName(name),
  };
}

interface SignupPageProps {
  onSignup: () => void;
}

function SignupPage({ onSignup }: SignupPageProps) {
  const navigate = useNavigate();
  const [values, setValues] = useState<SignupFormValues>({ email: '', password: '', name: '' });
  // 첫 제출 전에는 null이고, 제출 후에는 입력할 때마다 다시 검사해 오류 상태를 갱신
  const [errors, setErrors] = useState<SignupFormErrors | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  // 중복 계정, 네트워크 오류 등 회원가입 요청 실패 메시지
  const [submitError, setSubmitError] = useState('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const nextValues = { ...values, [name]: value };
    setValues(nextValues);
    if (errors) setErrors(validateSignupForm(nextValues));
  };

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    const nextErrors = validateSignupForm(values);
    setErrors(nextErrors);

    // 오류가 있으면 첫 번째 오류 입력 필드로 포커스를 이동
    const firstInvalidField = Object.entries(nextErrors).find(([, fieldError]) => fieldError)?.[0];
    if (firstInvalidField) {
      const field = event.currentTarget.elements.namedItem(firstInvalidField);
      if (field instanceof HTMLElement) field.focus();
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');
    try {
      await signup({
        email: values.email.trim(),
        password: values.password,
        name: values.name.trim(),
      });
      // Swagger의 회원가입 응답에 토큰이 없으므로 로그인 페이지로 이동해 로그인하도록 안내
      onSignup();
      navigate('/login', { replace: true });
    } catch (error) {
      setSubmitError(getErrorMessage(error));
      setIsSubmitting(false);
    }
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
        <FormErrorMessage message={submitError} />
        <Button type="submit" className="w-full" disabled={isSubmitting} aria-busy={isSubmitting}>
          {isSubmitting ? '가입 중...' : '회원가입'}
        </Button>
      </form>
    </AuthCard>
  );
}

export default SignupPage;
