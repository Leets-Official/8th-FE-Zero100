import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../lib/appStorage';

export default function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedName = name.trim();

    if (trimmedName.length < 2 || trimmedName.length > 8) {
      alert('이름은 2자 이상 8자 이하로 입력해 주세요.');
      return;
    }

    if (password.length < 8) {
      alert('비밀번호는 8자 이상 입력해 주세요.');
      return;
    }

    if (!/(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d])/.test(password)) {
      alert('비밀번호에 영문, 숫자, 특수문자를 모두 포함해 주세요.');
      return;
    }

    if (password !== passwordConfirm) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      registerUser({ name: trimmedName, email, password });
      navigate('/dashboard', { replace: true });
    } catch (error) {
      alert(error instanceof Error ? error.message : '회원가입에 실패했습니다.');
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-10">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-sm md:p-10"
      >
        <h1 className="mb-8 text-center text-3xl font-bold">회원가입</h1>

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
              placeholder="이메일을 입력하세요"
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
              autoComplete="new-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="영문, 숫자, 특수문자 포함 8자 이상"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-black"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              이름
            </label>
            <input
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="2자 이상 8자 이하"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-black"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-black py-3.5 text-sm font-semibold text-white hover:bg-gray-800"
          >
            회원가입
          </button>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          이미 계정이 있으신가요?{' '}
          <Link to="/login" className="font-semibold text-black underline">
            로그인
          </Link>
        </div>
      </form>
    </div>
  );
}
