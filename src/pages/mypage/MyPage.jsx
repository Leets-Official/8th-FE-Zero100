import { useEffect, useState } from 'react';

import { updateName, updatePassword } from '../../api/authApi';
import { getErrorMessage } from '../../api/getErrorMessage';
import TextInput from '../../components/common/TextInput';
import Toast from '../../components/common/Toast';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import SettingsCard from '../../components/mypage/SettingsCard';
import useAuth from '../../hooks/useAuth';
import { isValidName, isValidPassword } from '../../utils/validators';

import './MyPage.css';

const INITIAL_PASSWORDS = { currentPassword: '', newPassword: '', confirmPassword: '' };
const TOAST_DURATION = 3000;

function MyPage() {
  const { updateUser } = useAuth();

  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');
  const [isNameSubmitting, setIsNameSubmitting] = useState(false);

  const [passwords, setPasswords] = useState(INITIAL_PASSWORDS);
  const [passwordErrors, setPasswordErrors] = useState({});
  const [isPasswordSubmitting, setIsPasswordSubmitting] = useState(false);

  const [toastMessage, setToastMessage] = useState('');

  // 일정 시간 뒤 Toast 숨김
  useEffect(() => {
    if (!toastMessage) return undefined;

    const timerId = setTimeout(() => setToastMessage(''), TOAST_DURATION);

    return () => clearTimeout(timerId);
  }, [toastMessage]);

  const handleNameChange = (event) => {
    setName(event.target.value);
    setNameError('');
  };

  const handlePasswordChange = (event) => {
    const { name: field, value } = event.target;

    setPasswords((previous) => ({ ...previous, [field]: value }));
    setPasswordErrors((previous) => ({ ...previous, [field]: undefined }));
  };

  const handleNameSubmit = async (event) => {
    event.preventDefault();
    if (isNameSubmitting) return;

    if (!isValidName(name)) {
      setNameError('2자 이상 8자 이하로 입력하세요');
      return;
    }

    setIsNameSubmitting(true);
    setNameError('');

    try {
      const updatedUser = await updateName(name.trim());
      // 헤더, 대시보드 등 화면 전체에 바뀐 이름을 반영
      updateUser(updatedUser);
      setName('');
      setToastMessage('이름이 변경되었습니다.');
    } catch (error) {
      setNameError(getErrorMessage(error, '이름을 변경하지 못했습니다.'));
    } finally {
      setIsNameSubmitting(false);
    }
  };

  const handlePasswordSubmit = async (event) => {
    event.preventDefault();
    if (isPasswordSubmitting) return;

    const errors = {};

    if (!passwords.currentPassword) {
      errors.currentPassword = '현재 비밀번호를 입력하세요';
    }
    if (!isValidPassword(passwords.newPassword)) {
      errors.newPassword = '8자 이상, 영문/숫자/특수문자를 포함해야 합니다';
    }
    // 새 비밀번호 확인은 API에 없는 값이라 요청 전에 클라이언트에서 검증
    if (passwords.confirmPassword !== passwords.newPassword) {
      errors.confirmPassword = '새 비밀번호가 일치하지 않습니다';
    }

    setPasswordErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setIsPasswordSubmitting(true);

    try {
      await updatePassword({
        currentPassword: passwords.currentPassword,
        newPassword: passwords.newPassword,
      });
      setPasswords(INITIAL_PASSWORDS);
      setToastMessage('비밀번호가 변경되었습니다.');
    } catch (error) {
      const message = getErrorMessage(error, '비밀번호를 변경하지 못했습니다.');

      // 401은 현재 비밀번호가 일치하지 않는 경우라 로그아웃하지 않고 입력창에 안내
      if (error.response?.status === 401) {
        setPasswordErrors({ currentPassword: message });
      } else {
        setPasswordErrors({ newPassword: message });
      }
    } finally {
      setIsPasswordSubmitting(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="mypage">
        <h2 className="mypage__title">마이페이지</h2>

        <SettingsCard title="이름 변경" isSubmitting={isNameSubmitting} onSubmit={handleNameSubmit}>
          <TextInput
            name="name"
            aria-label="이름"
            placeholder="텍스트를 입력하세요"
            autoComplete="name"
            value={name}
            onChange={handleNameChange}
            error={nameError}
          />
        </SettingsCard>

        <SettingsCard
          title="비밀번호 변경"
          isSubmitting={isPasswordSubmitting}
          onSubmit={handlePasswordSubmit}
        >
          <TextInput
            label="현재 비밀번호"
            type="password"
            name="currentPassword"
            placeholder="현재 비밀번호"
            autoComplete="current-password"
            value={passwords.currentPassword}
            onChange={handlePasswordChange}
            error={passwordErrors.currentPassword}
          />
          <TextInput
            label="새 비밀번호"
            type="password"
            name="newPassword"
            placeholder="새 비밀번호"
            autoComplete="new-password"
            value={passwords.newPassword}
            onChange={handlePasswordChange}
            error={passwordErrors.newPassword}
          />
          <TextInput
            label="새 비밀번호 확인"
            type="password"
            name="confirmPassword"
            placeholder="새 비밀번호 확인"
            autoComplete="new-password"
            value={passwords.confirmPassword}
            onChange={handlePasswordChange}
            error={passwordErrors.confirmPassword}
          />
        </SettingsCard>
      </div>

      {toastMessage && (
        <div className="mypage__toast">
          <Toast message={toastMessage} />
        </div>
      )}
    </DashboardLayout>
  );
}

export default MyPage;
