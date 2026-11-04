
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Login() {


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!email || !password) {
      alert('이메일과 비밀번호를 입력해 주세요.');
      return;
    }

    // API 연동 전 임시 로그인 처리
    alert('로그인 기능은 API 연동 후 사용할 수 있어요.');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-4 py-10">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg md:p-10">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-black">
            ZERO100
          </h1>

          <p className="mt-3 text-sm text-gray-500">
            ZERO100 Admin에 오신 것을 환영합니다.
          </p>
        </div>

        <div className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              이메일
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="이메일을 입력해 주세요."
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-black"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              비밀번호
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleLogin();
              }}
              placeholder="비밀번호를 입력해 주세요."
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-black"
            />
          </div>

          <button
            type="button"
            onClick={handleLogin}
            className="w-full rounded-lg bg-black py-3.5 text-sm font-semibold text-white transition hover:bg-gray-800"
          >
            로그인
          </button>
        </div>

        <div className="my-6 flex items-center gap-4">
          <div className="h-px flex-1 bg-gray-200" />
          <span className="text-xs text-gray-400">또는</span>
          <div className="h-px flex-1 bg-gray-200" />
        </div>

        <button
          type="button"
          onClick={() => alert('카카오 로그인은 추후 연동할 예정이에요.')}
          className="w-full rounded-lg bg-[#FEE500] py-3.5 text-sm font-semibold text-[#191919] transition hover:bg-[#f5dc00]"
        >
          카카오 로그인
        </button>

        <div className="mt-8 text-center text-sm text-gray-500">
          아직 회원이 아니신가요?{' '}
          <Link
            to="/signup"
            className="font-semibold text-black underline underline-offset-4 hover:text-gray-600"
          >
            회원가입
          </Link>
        </div>
      </div>
    </div>
  );
}
