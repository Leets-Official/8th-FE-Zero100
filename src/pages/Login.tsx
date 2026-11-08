import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../lib/appStorage';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      loginUser(email, password);
      navigate('/dashboard', { replace: true });
    } catch (error) {
      alert(error instanceof Error ? error.message : '로그인에 실패했습니다.');
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-10">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-sm md:p-10"
      >
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-black">ZERO100</h1>
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
              required
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="이메일을 입력해 주세요."
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-black"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              비밀번호
            </label>
            <input
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="비밀번호를 입력해 주세요."
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-black"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-black py-3.5 text-sm font-semibold text-white hover:bg-gray-800"
          >
            로그인
          </button>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          아직 회원이 아니신가요?{' '}
          <Link to="/signup" className="font-semibold text-black underline">
            회원가입
          </Link>
        </div>
      </form>
    </div>
  );
}
