
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function MyPage() {
  const [name, setName] = useState('사용자');
  const [newName, setNewName] = useState('');

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // 이름 변경
  const handleNameChange = () => {
    if (!newName.trim()) {
      alert('변경할 이름을 입력해 주세요.');
      return;
    }

    setName(newName.trim());
    setNewName('');
    alert('이름 변경이 완료되었습니다.');
  };

  // 비밀번호 변경
  const handlePasswordChange = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      alert('모든 비밀번호 항목을 입력해 주세요.');
      return;
    }

    if (newPassword.length < 8) {
      alert('새 비밀번호는 8자 이상 입력해 주세요.');
      return;
    }

    if (newPassword !== confirmPassword) {
      alert('새 비밀번호가 일치하지 않습니다.');
      return;
    }

    alert('비밀번호 변경 기능은 API 연동 후 사용할 수 있습니다.');

    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="min-h-screen bg-black px-5 py-10 md:px-10">
      <div className="mx-auto max-w-3xl">

        {/* 페이지 제목 */}
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-white">
            마이페이지
          </h1>

          <p className="mt-3 text-sm text-gray-400">
            내 정보를 확인하고 수정할 수 있습니다.
          </p>
        </header>

        {/* 현재 사용자 정보 */}
        <div className="mb-6 rounded-xl bg-white p-6 shadow-sm md:p-8">
          <h2 className="mb-2 text-xl font-bold text-gray-900">
            내 정보
          </h2>

          <p className="text-sm text-gray-500">
            현재 이름: {name}
          </p>
        </div>

        {/* 이름 변경 카드 */}
        <section className="mb-6 rounded-xl bg-white p-6 shadow-sm md:p-8">
          <h2 className="mb-6 text-xl font-bold text-gray-900">
            이름 변경
          </h2>

          <div>
            <label
              htmlFor="newName"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              새 이름
            </label>

            <input
              id="newName"
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="변경할 이름을 입력해 주세요."
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-black"
            />
          </div>

          <button
            type="button"
            onClick={handleNameChange}
            className="mt-5 w-full rounded-lg bg-black py-3 text-sm font-semibold text-white transition hover:bg-gray-800 sm:w-auto sm:px-8"
          >
            이름 변경
          </button>
        </section>

        {/* 비밀번호 변경 카드 */}
        <section className="rounded-xl bg-white p-6 shadow-sm md:p-8">
          <h2 className="mb-6 text-xl font-bold text-gray-900">
            비밀번호 변경
          </h2>

          <div className="space-y-5">

            {/* 현재 비밀번호 */}
            <div>
              <label
                htmlFor="currentPassword"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                현재 비밀번호
              </label>

              <input
                id="currentPassword"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="현재 비밀번호를 입력해 주세요."
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-black"
              />
            </div>

            {/* 새 비밀번호 */}
            <div>
              <label
                htmlFor="newPassword"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                새 비밀번호
              </label>

              <input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="새 비밀번호를 입력해 주세요."
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-black"
              />
            </div>

            {/* 새 비밀번호 확인 */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                새 비밀번호 확인
              </label>

              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="새 비밀번호를 다시 입력해 주세요."
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-black"
              />
            </div>

          </div>

          <button
            type="button"
            onClick={handlePasswordChange}
            className="mt-6 w-full rounded-lg bg-black py-3 text-sm font-semibold text-white transition hover:bg-gray-800 sm:w-auto sm:px-8"
          >
            비밀번호 변경
          </button>
        </section>

        {/* 대시보드 이동 */}
        <div className="mt-8 text-center">
          <Link
            to="/dashboard"
            className="text-sm text-gray-400 transition hover:text-white"
          >
            ← 대시보드로 돌아가기
          </Link>
        </div>

      </div>
    </div>
  );
}
