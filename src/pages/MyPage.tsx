import { useState } from 'react';
import {
  getCurrentUser,
  updateCurrentUserName,
  updateCurrentUserPassword,
} from '../lib/appStorage';

const inputClass =
  'w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-gray-400';

function MyPage() {
  const [user, setUser] = useState(getCurrentUser);
  const [name, setName] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  function handleNameChange() {
    if (!name.trim()) {
      alert('변경할 이름을 입력해 주세요.');
      return;
    }

    try {
      updateCurrentUserName(name);
      setUser(getCurrentUser());
      setName('');
      alert('이름이 변경되었습니다.');
    } catch (error) {
      alert(error instanceof Error ? error.message : '이름 변경에 실패했습니다.');
    }
  }

  function handlePasswordChange() {
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

    try {
      updateCurrentUserPassword(currentPassword, newPassword);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      alert('비밀번호가 변경되었습니다.');
    } catch (error) {
      alert(
        error instanceof Error ? error.message : '비밀번호 변경에 실패했습니다.',
      );
    }
  }

  return (
    <section className="mx-auto max-w-[672px]">
      <h1 className="mb-6 text-2xl font-bold">마이페이지</h1>

      <div className="mb-7 rounded-xl border border-gray-200 bg-white p-5">
        <h2 className="mb-4 text-lg font-bold">이름 변경</h2>
        <p className="mb-3 text-sm text-gray-600">
          현재 이름: <strong>{user?.name ?? '-'}</strong>
        </p>

        <input
          className={inputClass}
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="변경할 이름을 입력하세요"
        />

        <div className="mt-3 flex justify-end">
          <button
            type="button"
            onClick={handleNameChange}
            className="rounded-xl bg-black px-6 py-3 text-sm font-medium text-white hover:bg-gray-800"
          >
            변경
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
            className="rounded-xl bg-black px-6 py-3 text-sm font-medium text-white hover:bg-gray-800"
          >
            변경
          </button>
        </div>
      </div>
    </section>
  );
}

export default MyPage;
