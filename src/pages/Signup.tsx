
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Signup() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const handleSignup = () => {
    if (!name || !email || !password || !passwordConfirm) {
      alert('모든 항목을 입력해 주세요.');
      return;
    }

    if (password.length < 8) {
      alert('비밀번호는 8자 이상 입력해 주세요.');
      return;
    }

    if (password !== passwordConfirm) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    // API 연동 전 임시 회원가입 처리
    alert('회원가입 기능은 API 연동 후 사용할 수 있어요.');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-4 py-10">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg md:p-10">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-black">
            ZERO100
          </h1>

          <p className="mt-3 text-sm text-gray-500">
            ZERO100 Admin 회원가입
          </p>
        </div>

        <div className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              이름
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="이름을 입력해 주세요."
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-black"
            />
          </div>

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
              placeholder="8자 이상 입력해 주세요."
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-black"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              비밀번호 확인
            </label>

            <input
              type="password"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSignup();
              }}
              placeholder="비밀번호를 다시 입력해 주세요."
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-black"
            />
          </div>

          <button
            type="button"
            onClick={handleSignup}
            className="w-full rounded-lg bg-black py-3.5 text-sm font-semibold text-white transition hover:bg-gray-800"
          >
            회원가입
          </button>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          이미 회원이신가요?{' '}
          <Link
            to="/login"
            className="font-semibold text-black underline underline-offset-4 hover:text-gray-600"
          >
            로그인
          </Link>
        </div>
      </div>
    </div>
  );
}
