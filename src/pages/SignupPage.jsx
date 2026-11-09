import { useRef, useState } from 'react';
import { Link } from 'react-router';

import Button from '../components/dashboard/Button';
import Input from '../components/dashboard/Input';
import { signup } from '../api/auth';
import { ROUTES } from '../constants/routes';
import { getApiErrorMessage } from '../utils/getApiErrorMessage';

const INITIAL_VALUES = {
  email: '',
  password: '',
  name: '',
};

function validateField(name, value) {
  switch (name) {
    case 'email':
      if (!value.trim()) {
        return '이메일을 입력해주세요.';
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
        return '올바른 이메일 형식을 입력하세요.';
      }

      return '';

    case 'password':
      if (!value) {
        return '비밀번호를 입력해주세요.';
      }

      if (
        value.length < 8 ||
        !/[A-Za-z]/.test(value) ||
        !/[0-9]/.test(value) ||
        !/[^A-Za-z0-9\s]/.test(value) ||
        /\s/.test(value)
      ) {
        return '공백 없이 8자 이상, 영문/숫자/특수문자를 포함해주세요.';
      }

      return '';

    case 'name': {
      const trimmedName = value.trim();

      if (trimmedName && (trimmedName.length < 2 || trimmedName.length > 8)) {
        return '이름은 2자 이상 8자 이하로 입력해주세요.';
      }

      return '';
    }

    default:
      return '';
  }
}

function SignupPage() {
  const [values, setValues] = useState(INITIAL_VALUES);
  const [errors, setErrors] = useState({});
  const [notice, setNotice] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submittingRef = useRef(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: '',
    }));

    setNotice('');
  }

  function handleBlur(event) {
    const { name, value } = event.target;

    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, value),
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (submittingRef.current) return;

    const nextErrors = {
      email: validateField('email', values.email),
      password: validateField('password', values.password),
      name: validateField('name', values.name),
    };

    setErrors(nextErrors);
    setNotice('');

    const firstInvalidField = Object.keys(nextErrors).find((name) => nextErrors[name]);

    if (firstInvalidField) {
      setNotice('입력 내용을 확인해주세요.');
      event.currentTarget.elements.namedItem(firstInvalidField)?.focus();
      return;
    }

    submittingRef.current = true;
    setIsSubmitting(true);

    try {
      await signup(values);

      setValues(INITIAL_VALUES);
      setErrors({});
      setNotice('회원가입이 완료되었습니다. 아래 로그인 링크로 로그인해주세요.');
    } catch (error) {
      setNotice(getApiErrorMessage(error, '회원가입에 실패했습니다. 다시 시도해주세요.'));
    } finally {
      submittingRef.current = false;
      setIsSubmitting(false);
    }
  }

  return (
    <section aria-labelledby="signup-title" className="flex flex-col gap-[26px]">
      <h1
        id="signup-title"
        className="text-center text-[24px] leading-[32px] font-bold text-[#000000]"
      >
        회원가입
      </h1>

      <form
        noValidate
        onSubmit={handleSubmit}
        aria-busy={isSubmitting}
        className="flex flex-col gap-[15.99px]"
      >
        <Input
          label="이메일"
          hideLabel
          type="email"
          name="email"
          autoComplete="email"
          placeholder="이메일을 입력하세요"
          value={values.email}
          error={errors.email}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={isSubmitting}
          required
        />

        <Input
          label="비밀번호"
          hideLabel
          type="password"
          name="password"
          autoComplete="new-password"
          placeholder="비밀번호를 입력하세요"
          helperText="8자 이상, 영문/숫자/특수문자 포함"
          value={values.password}
          error={errors.password}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={isSubmitting}
          required
        />

        <Input
          label="이름 (선택)"
          hideLabel
          name="name"
          autoComplete="name"
          placeholder="이름을 입력하세요 (선택)"
          helperText="입력 시 2자 이상 8자 이하"
          value={values.name}
          error={errors.name}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={isSubmitting}
        />

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? '가입 중...' : '회원가입'}
        </Button>
      </form>

      <p className="mt-[16px] text-center text-[14px] leading-[20px] text-[#374151]">
        이미 계정이 있으신가요?{' '}
        <Link
          to={ROUTES.LOGIN}
          className="text-[#000000] underline underline-offset-2 focus-visible:outline-2 focus-visible:outline-[#222222]"
        >
          로그인
        </Link>
      </p>

      <div role="status" aria-atomic="true" className={notice ? '' : 'sr-only'}>
        {notice && (
          <p className="text-center text-[12px] leading-[20px] text-[#364153]">{notice}</p>
        )}
      </div>
    </section>
  );
}

export default SignupPage;
