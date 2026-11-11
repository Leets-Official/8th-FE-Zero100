import { useState } from 'react';
import { useDashboard } from '../hooks/useDashboard.js';
import { getApiError } from '../api/client.js';
import Button from '../components/common/Button.jsx';
import TextInput from '../components/common/TextInput.jsx';
import PageHeading from '../components/layout/PageHeading.jsx';
import { isValidPassword } from '../utils/validation.js';

function ProfilePage() {
  const { data, updateProfile, changePassword } = useDashboard();
  const [name, setName] = useState(data.profile.name);
  const [nameError, setNameError] = useState('');
  const [namePending, setNamePending] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordPending, setPasswordPending] = useState(false);

  async function handleNameSubmit(event) {
    event.preventDefault();
    if (name.trim().length < 2 || name.trim().length > 8) {
      setNameError('이름은 2자 이상 8자 이하로 입력해 주세요.');
      return;
    }
    setNameError('');
    setNamePending(true);
    try {
      await updateProfile({ name });
    } catch (error) {
      setNameError(getApiError(error));
    } finally {
      setNamePending(false);
    }
  }
  async function handlePasswordSubmit(event) {
    event.preventDefault();
    if (!isValidPassword(newPassword)) {
      setPasswordError('새 비밀번호는 8자 이상, 영문·숫자·특수문자를 포함해야 합니다.');
      return;
    }
    if (currentPassword === newPassword) {
      setPasswordError('현재 비밀번호와 다른 비밀번호를 입력해 주세요.');
      return;
    }
    if (newPassword !== confirmation) {
      setPasswordError('새 비밀번호가 일치하지 않습니다.');
      return;
    }
    setPasswordError('');
    setPasswordPending(true);
    try {
      await changePassword(currentPassword, newPassword);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmation('');
    } catch (error) {
      setPasswordError(getApiError(error));
    } finally {
      setPasswordPending(false);
    }
  }
  return (
    <>
      <PageHeading title="마이페이지" />
      <form
        onSubmit={handleNameSubmit}
        className="max-w-2xl space-y-5 rounded-lg border border-line bg-white p-6 sm:p-8"
      >
        <h2 className="text-base font-semibold">내 정보</h2>
        <TextInput
          label="이름"
          value={name}
          onChange={(event) => setName(event.target.value)}
          maxLength={8}
          autoComplete="name"
          required
        />
        <TextInput label="이메일" value={data.profile.email} readOnly />
        <TextInput label="가입일" value={data.profile.joinedAt || '정보 없음'} readOnly />
        {nameError && (
          <p role="alert" className="text-sm text-red-700">
            {nameError}
          </p>
        )}
        <div className="flex justify-end gap-3">
          <Button
            variant="secondary"
            onClick={() => {
              setName(data.profile.name);
              setNameError('');
            }}
            disabled={namePending || name === data.profile.name}
          >
            취소
          </Button>
          <Button
            type="submit"
            isLoading={namePending}
            disabled={name.trim() === data.profile.name}
          >
            이름 변경
          </Button>
        </div>
      </form>
      <form
        onSubmit={handlePasswordSubmit}
        className="mt-6 max-w-2xl space-y-5 rounded-lg border border-line bg-white p-6 sm:p-8"
      >
        <h2 className="text-base font-semibold">비밀번호 변경</h2>
        <TextInput
          label="현재 비밀번호"
          type="password"
          autoComplete="current-password"
          value={currentPassword}
          onChange={(event) => setCurrentPassword(event.target.value)}
          required
        />
        <TextInput
          label="새 비밀번호"
          type="password"
          autoComplete="new-password"
          value={newPassword}
          onChange={(event) => setNewPassword(event.target.value)}
          helperText="8자 이상, 영문·숫자·특수문자 포함"
          required
        />
        <TextInput
          label="새 비밀번호 확인"
          type="password"
          autoComplete="new-password"
          value={confirmation}
          onChange={(event) => setConfirmation(event.target.value)}
          required
        />
        {passwordError && (
          <p role="alert" className="text-sm text-red-700">
            {passwordError}
          </p>
        )}
        <div className="flex justify-end">
          <Button type="submit" isLoading={passwordPending}>
            비밀번호 변경
          </Button>
        </div>
      </form>
    </>
  );
}
export default ProfilePage;
