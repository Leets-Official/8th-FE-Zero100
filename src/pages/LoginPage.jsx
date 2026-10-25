import { useState } from 'react';
import { Link } from 'react-router';

import Button from '../components/dashboard/Button';
import Input from '../components/dashboard/Input';
import { ROUTES } from '../constants/routes';
import kakaoLogin from '../assets/kakao-login.svg';

function LoginPage() {
  const [notice, setNotice] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    setNotice('로그인 기능은 API 연동 후 이용할 수 있습니다.');
  }

  function handleKakaoLogin() {
    setNotice('카카오 로그인은 연동 준비 중입니다.');
  }

  return (
    <section aria-labelledby="login-title" className="flex flex-col gap-[26px]">
      <h1
        id="login-title"
        className="text-center text-[24px] leading-[32px] font-bold text-[#000000]"
      >
        로그인
      </h1>

      <form onSubmit={handleSubmit} className="flex min-h-[179.61px] flex-col gap-[15.99px]">
        <Input
          label="이메일"
          hideLabel
          type="email"
          name="email"
          autoComplete="username"
          placeholder="이메일을 입력하세요"
          required
        />

        <Input
          label="비밀번호"
          hideLabel
          type="password"
          name="password"
          autoComplete="current-password"
          placeholder="비밀번호를 입력하세요"
          required
        />

        <Button type="submit" className="w-full">
          로그인
        </Button>
      </form>

      <div className="flex items-center gap-[8px]">
        <span aria-hidden="true" className="h-px flex-1 bg-[#e5e7eb]" />

        <span className="text-[14px] leading-[20px] text-[#6a7282]">또는</span>

        <span aria-hidden="true" className="h-px flex-1 bg-[#e5e7eb]" />
      </div>

      <button
        type="button"
        onClick={handleKakaoLogin}
        className="w-full cursor-pointer rounded-[8px] border-0 bg-[#fee500] p-0 hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-[#222222]"
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
          <p className="text-center text-[12px] leading-[20px] text-[#6a7282]">{notice}</p>
        )}
      </div>
    </section>
  );
}

export default LoginPage;
