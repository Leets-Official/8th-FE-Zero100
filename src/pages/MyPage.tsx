import { useEffect, useState } from 'react';
import axios from 'axios';
import { api } from '../api/client';

type User = {
  id: string;
  email: string;
  name: string;
  created_at: string;
};

const inputClass =
  'w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-gray-400';

function getErrorMessage(error: unknown, fallback: string) {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.error ?? fallback;
  }
  return fallback;
}

function MyPage() {
  const [user, setUser] = useState<User | null>(null);

  const [name, setName] = useState('');
  const [isNameLoading, setIsNameLoading] = useState(false);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordLoading, setIsPasswordLoading] = useState(false);

  // 페이지가 열릴 때 내 정보 조회
  useEffect(() => {
    api
      .get('/api/auth/me')
      .then((res) => setUser(res.data.data))
      .catch((error) =>
        alert(getErrorMessage(error, '내 정보를 불러오지 못했습니다.')),
      );
  }, []);

  // 이름 수정
  async function handleNameChange() {
    const trimmedName = name.trim();

    if (!trimmedName) {
      alert('변경할 이름을 입력해 주세요.');
      return;
    }

    if (trimmedName.length < 2 || trimmedName.length > 8) {
      alert('이름은 2자 이상 8자 이하로 입력해 주세요.');
      return;
    }

    setIsNameLoading(true);

    try {
      const res = await api.patch('/api/auth/me', { name: trimmedName });
      setUser(res.data.data);
      setName('');
      alert('이름이 변경되었습니다.');
    } catch (error) {
      alert(getErrorMessage(error, '이름 변경에 실패했습니다.'));
    } finally {
      setIsNameLoading(false);
    }
  }

  // 비밀번호 수정
  async function handlePasswordChange() {
    if (!currentPassword || !newPassword || !confirmPassword) {
      alert('모든 비밀번호 항목을 입력해 주세요.');
      return;
    }

    if (newPassword.length < 8) {
      alert('새 비밀번호는 8자 이상이어야 합니다.');
      return;
    }

    if (newPassword !== confirmPassword) {
      alert('새 비밀번호가 일치하지 않습니다.');
      return;
    }

    setIsPasswordLoading(true);

    try {
      await api.patch('/api/auth/me/password', {
        currentPassword,
        newPassword,
      });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      alert('비밀번호가 변경되었습니다.');
    } catch (error) {
      alert(getErrorMessage(error, '비밀번호 변경에 실패했습니다.'));
    } finally {
      setIsPasswordLoading(false);
    }
  }

  return (
    <section className="mx-auto max-w-[672px]">
      <h1 className="mb-6 text-2xl font-bold">마이페이지</h1>

      <div className="mb-7 rounded-xl border border-gray-200 bg-white p-5">
        <h2 className="mb-4 text-lg font-bold">내 정보</h2>
        <p className="mb-2 text-sm text-gray-600">
          이름: <strong>{user?.name ?? '-'}</strong>
        </p>
        <p className="mb-2 text-sm text-gray-600">
          이메일: <strong>{user?.email ?? '-'}</strong>
        </p>
        <p className="text-sm text-gray-600">
          가입일: <strong>{user?.created_at ?? '-'}</strong>
        </p>
      </div>

      <div className="mb-7 rounded-xl border border-gray-200 bg-white p-5">
        <h2 className="mb-4 text-lg font-bold">이름 변경</h2>

        <input
          className={inputClass}
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="2자 이상 8자 이하로 입력하세요"
        />

        <div className="mt-3 flex justify-end">
          <button
            type="button"
            onClick={handleNameChange}
            disabled={isNameLoading}
            className="rounded-xl bg-black px-6 py-3 text-sm font-medium text-white hover:bg-gray-800 disabled:bg-gray-400"
          >
            {isNameLoading ? '변경 중...' : '변경'}
          </button>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-5">
        <h2 className="mb-4 text-lg font-bold">비밀번호 변경</h2>

        <div className="mb-3">
          <label className="mb-2 block text-sm font-medium">현재 비밀번호</label>
          <input
            type="password"
            autoComplete="current-password"
            className={inputClass}
            value={currentPassword}
            onChange={(event) => setCurrentPassword(event.target.value)}
            placeholder="현재 비밀번호"
          />
        </div>

        <div className="mb-3">
          <label className="mb-2 block text-sm font-medium">새 비밀번호</label>
          <input
            type="password"
            autoComplete="new-password"
            className={inputClass}
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
            placeholder="새 비밀번호"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            새 비밀번호 확인
          </label>
          <input
            type="password"
            autoComplete="new-password"
            className={inputClass}
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            placeholder="새 비밀번호 확인"
          />
        </div>

        <div className="mt-3 flex justify-end">
          <button
            type="button"
            onClick={handlePasswordChange}
            disabled={isPasswordLoading}
            className="rounded-xl bg-black px-6 py-3 text-sm font-medium text-white hover:bg-gray-800 disabled:bg-gray-400"
          >
            {isPasswordLoading ? '변경 중...' : '변경'}
          </button>
        </div>
      </div>
    </section>
  );
}

export default MyPage;
