import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router';

import Button from '../components/dashboard/Button';
import Input from '../components/dashboard/Input';
import { login } from '../api/auth';
import { ROUTES } from '../constants/routes';
import { setAccessToken } from '../utils/authStorage';
import { getApiErrorMessage } from '../utils/getApiErrorMessage';
import kakaoLogin from '../assets/kakao-login.svg';

function validateField(name, value) {
  if (name === 'email') {
    if (!value.trim()) {
      return '이메일을 입력해주세요.';
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
      return '올바른 이메일 형식을 입력하세요.';
    }
  }

  if (name === 'password' && !value) {
    return '비밀번호를 입력해주세요.';
  }

  return '';
}

function LoginPage() {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    email: '',
    password: '',
  });

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

    const trimmedEmail = values.email.trim();

    const nextErrors = {
      email: validateField('email', trimmedEmail),
      password: validateField('password', values.password),
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
      const result = await login({
        email: trimmedEmail,
        password: values.password,
      });

      if (typeof result?.accessToken !== 'string' || !result.accessToken.trim()) {
        setNotice('로그인 응답을 확인하지 못했습니다. 다시 시도해주세요.');
        return;
      }

      setAccessToken(result.accessToken);

      navigate(ROUTES.DASHBOARD, {
        replace: true,
      });
    } catch (error) {
      setNotice(getApiErrorMessage(error, '로그인에 실패했습니다. 다시 시도해주세요.'));
    } finally {
      submittingRef.current = false;
      setIsSubmitting(false);
    }
  }

  function handleKakaoLogin() {
    const baseUrl = import.meta.env.VITE_API_URL;

    window.location.assign(new URL('/api/auth/kakao', baseUrl).href);
  }

  return (
    <section aria-labelledby="login-title" className="flex flex-col gap-[26px]">
      <h1
        id="login-title"
        className="text-center text-[24px] leading-[32px] font-bold text-[#000000]"
      >
        로그인
      </h1>

      <form
        noValidate
        onSubmit={handleSubmit}
        aria-busy={isSubmitting}
        className="flex min-h-[179.61px] flex-col gap-[15.99px]"
      >
        <Input
          label="이메일"
          hideLabel
          type="email"
          name="email"
          autoComplete="username"
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
          autoComplete="current-password"
          placeholder="비밀번호를 입력하세요"
          value={values.password}
          error={errors.password}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={isSubmitting}
          required
        />

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? '로그인 중...' : '로그인'}
        </Button>
      </form>

      <div className="flex items-center gap-[8px]">
        <span aria-hidden="true" className="h-px flex-1 bg-[#E5E7EB]" />

        <span className="text-[14px] leading-[20px] text-[#6A7282]">또는</span>

        <span aria-hidden="true" className="h-px flex-1 bg-[#E5E7EB]" />
      </div>

      <button
        type="button"
        onClick={handleKakaoLogin}
        disabled={isSubmitting}
        className="w-full rounded-[8px] border-0 bg-[#FEE500] p-0 focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-[#222222] enabled:cursor-pointer enabled:hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <img
          src={kakaoLogin}
          alt="카카오 로그인"
          width="383"
          height="48"
          className="block h-auto w-full"
        />
      </button>

      <p className="text-center text-[14px] leading-[20px] text-[#374151]">
        계정이 없으신가요?{' '}
        <Link
          to={ROUTES.SIGNUP}
          className="text-[#000000] underline underline-offset-2 focus-visible:outline-2 focus-visible:outline-[#222222]"
        >
          회원가입
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

export default LoginPage;
